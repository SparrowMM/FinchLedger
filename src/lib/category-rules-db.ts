import { prisma } from "@/lib/prisma";
import type { TransactionType } from "@prisma/client";
import { UNNAMED_TRANSACTION } from "@/lib/shared-types";

export type CategoryRuleRecord = {
  id: string;
  type: TransactionType;
  merchantName: string;
  category: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function listCategoryRules(
  type?: TransactionType
): Promise<CategoryRuleRecord[]> {
  return prisma.categoryRule.findMany({
    where: type ? { type } : undefined,
    orderBy: { updatedAt: "desc" },
  });
}

/**
 * Build an in-memory lookup map: lowercased merchantName → category.
 * Intended for batch use during import so we only hit the DB once.
 */
export async function buildCategoryRuleMap(
  type: TransactionType
): Promise<Map<string, string>> {
  const rules = await prisma.categoryRule.findMany({
    where: { type },
    select: { merchantName: true, category: true },
  });
  const map = new Map<string, string>();
  for (const r of rules) {
    map.set(r.merchantName.toLowerCase(), r.category);
  }
  return map;
}

/**
 * Upsert a single rule. If a rule for the same (type, merchantName) already
 * exists it is updated; otherwise a new one is created.
 */
export async function upsertCategoryRule(
  type: TransactionType,
  merchantName: string,
  category: string,
  source: "learned" | "manual" = "learned"
) {
  return prisma.categoryRule.upsert({
    where: {
      type_merchantName: { type, merchantName },
    },
    update: { category, source, updatedAt: new Date() },
    create: { type, merchantName, category, source },
  });
}

/**
 * Batch-learn rules from a list of transactions that have been confirmed.
 * Skips entries whose category is a fallback ("待确认") or whose merchant name
 * is empty / "未命名交易".
 */
export async function learnRulesFromTransactions(
  items: Array<{
    type: TransactionType;
    merchantName: string;
    category: string;
  }>,
  fallbackCategories: string[] = ["待确认"]
) {
  const seen = new Set<string>();
  const toUpsert: Array<{
    type: TransactionType;
    merchantName: string;
    category: string;
  }> = [];

  for (const item of items) {
    const name = item.merchantName.trim();
    if (!name || name === UNNAMED_TRANSACTION) continue;
    if (fallbackCategories.includes(item.category)) continue;

    const key = `${item.type}::${name.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    toUpsert.push(item);
  }

  if (!toUpsert.length) return 0;

  await prisma.$transaction(
    toUpsert.map((item) =>
      prisma.categoryRule.upsert({
        where: {
          type_merchantName: {
            type: item.type,
            merchantName: item.merchantName,
          },
        },
        update: { category: item.category, updatedAt: new Date() },
        create: {
          type: item.type,
          merchantName: item.merchantName,
          category: item.category,
          source: "learned",
        },
      })
    )
  );

  return toUpsert.length;
}

export async function deleteCategoryRule(id: string) {
  return prisma.categoryRule.delete({ where: { id } });
}

export async function deleteAllCategoryRules() {
  return prisma.categoryRule.deleteMany();
}
