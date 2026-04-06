import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { learnRulesFromTransactions } from "@/lib/category-rules-db";
import { EXPENSE_FALLBACK_CATEGORY } from "@/lib/expense-categories";
import { INCOME_FALLBACK_CATEGORY } from "@/lib/income-categories";
import type { TransactionType } from "@prisma/client";

/**
 * POST /api/category-rules/learn-from-history
 *
 * Scans all existing confirmed transactions (those whose category is NOT
 * "待确认"), groups them by (type, name), picks the most frequently used
 * category for each group, and upserts CategoryRule rows.
 *
 * This is a one-time bootstrap or periodic refresh action.
 */
export async function POST() {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        category: {
          notIn: [EXPENSE_FALLBACK_CATEGORY, INCOME_FALLBACK_CATEGORY],
        },
        name: { not: "未命名交易" },
      },
      select: { type: true, name: true, category: true },
    });

    // Group by (type, name) → count per category, pick the most common one
    const grouped = new Map<
      string,
      { type: TransactionType; name: string; counts: Map<string, number> }
    >();

    for (const t of transactions) {
      const key = `${t.type}::${t.name.toLowerCase()}`;
      let entry = grouped.get(key);
      if (!entry) {
        entry = { type: t.type, name: t.name, counts: new Map() };
        grouped.set(key, entry);
      }
      entry.counts.set(t.category, (entry.counts.get(t.category) ?? 0) + 1);
    }

    const items: Array<{
      type: TransactionType;
      merchantName: string;
      category: string;
    }> = [];

    for (const entry of grouped.values()) {
      let bestCategory = "";
      let bestCount = 0;
      for (const [cat, count] of entry.counts) {
        if (count > bestCount) {
          bestCount = count;
          bestCategory = cat;
        }
      }
      if (bestCategory) {
        items.push({
          type: entry.type,
          merchantName: entry.name,
          category: bestCategory,
        });
      }
    }

    const learnedCount = await learnRulesFromTransactions(items);

    return NextResponse.json({
      scannedTransactions: transactions.length,
      uniqueMerchants: grouped.size,
      rulesCreated: learnedCount,
    });
  } catch (e) {
    console.error("[CATEGORY-RULES] Learn from history failed", e);
    return NextResponse.json(
      { error: "从历史交易学习分类规则失败。" },
      { status: 500 }
    );
  }
}
