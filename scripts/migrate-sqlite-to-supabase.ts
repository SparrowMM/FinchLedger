import { Prisma, PrismaClient as TargetPrisma } from "@prisma/client";
import { withPgbouncerParamForPooler } from "../src/lib/database-connection-url";
import { PrismaClient as SourcePrisma } from "../src/generated/prisma-sqlite";

type BatchResult = { count: number };

/** 旧版本地 SQLite 可能缺少后来迁移才加的表 */
function isPrismaMissingTable(e: unknown): boolean {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    (e as { code: string }).code === "P2021"
  );
}

async function safeSourceCount(label: string, fn: () => Promise<number>): Promise<number> {
  try {
    return await fn();
  } catch (e) {
    if (isPrismaMissingTable(e)) {
      console.warn(`[migrate] ${label}: SQLite 中无此表，行数按 0`);
      return 0;
    }
    throw e;
  }
}

async function safeSourceRows<T>(label: string, fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn();
  } catch (e) {
    if (isPrismaMissingTable(e)) {
      console.warn(`[migrate] ${label}: SQLite 中无此表，跳过复制`);
      return [];
    }
    throw e;
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

async function copyTable(
  label: string,
  rows: unknown[],
  createMany: (rows: unknown[]) => Promise<BatchResult>
) {
  if (rows.length === 0) {
    console.log(`[migrate] ${label}: no rows`);
    return;
  }
  const res = await createMany(rows);
  console.log(`[migrate] ${label}: inserted ${res.count}/${rows.length}`);
}

async function main() {
  const databaseUrl = requireEnv("DATABASE_URL");
  const sqliteSourceUrl = requireEnv("SQLITE_SOURCE_URL");
  const targetUrl = withPgbouncerParamForPooler(databaseUrl) ?? databaseUrl;

  const source = new SourcePrisma({
    datasources: { db: { url: sqliteSourceUrl } },
  });
  const target = new TargetPrisma({
    datasources: { db: { url: targetUrl } },
  });

  try {
    const sourceCounts = await Promise.all([
      safeSourceCount("Transaction", () => source.transaction.count()),
      safeSourceCount("MonthlyExpenseAnalysis", () => source.monthlyExpenseAnalysis.count()),
      safeSourceCount("ExpenseCategory", () => source.expenseCategory.count()),
      safeSourceCount("IncomeCategory", () => source.incomeCategory.count()),
      safeSourceCount("PaymentMethod", () => source.paymentMethod.count()),
      safeSourceCount("ImportChannelPayment", () => source.importChannelPayment.count()),
      safeSourceCount("AiPrompt", () => source.aiPrompt.count()),
      safeSourceCount("AiPromptVersion", () => source.aiPromptVersion.count()),
      safeSourceCount("CategoryRule", () => source.categoryRule.count()),
    ]);

    console.log(
      "[migrate] source row counts (tx, monthlyAnalysis, expCat, incCat, pay, importCh, aiPrompt, aiPromptVer, catRule):",
      sourceCounts.join(", ")
    );

    await copyTable(
      "ExpenseCategory",
      await safeSourceRows("ExpenseCategory", () => source.expenseCategory.findMany()),
      (rows) =>
      target.expenseCategory.createMany({
        data: rows as Prisma.ExpenseCategoryCreateManyInput[],
        skipDuplicates: true,
      })
    );

    await copyTable(
      "IncomeCategory",
      await safeSourceRows("IncomeCategory", () => source.incomeCategory.findMany()),
      (rows) =>
      target.incomeCategory.createMany({
        data: rows as Prisma.IncomeCategoryCreateManyInput[],
        skipDuplicates: true,
      })
    );

    await copyTable(
      "PaymentMethod",
      await safeSourceRows("PaymentMethod", () => source.paymentMethod.findMany()),
      (rows) =>
      target.paymentMethod.createMany({
        data: rows as Prisma.PaymentMethodCreateManyInput[],
        skipDuplicates: true,
      })
    );

    await copyTable(
      "ImportChannelPayment",
      await safeSourceRows("ImportChannelPayment", () => source.importChannelPayment.findMany()),
      (rows) =>
      target.importChannelPayment.createMany({
        data: rows as Prisma.ImportChannelPaymentCreateManyInput[],
        skipDuplicates: true,
      })
    );

    await copyTable(
      "AiPrompt",
      await safeSourceRows("AiPrompt", () => source.aiPrompt.findMany()),
      (rows) =>
      target.aiPrompt.createMany({
        data: rows as Prisma.AiPromptCreateManyInput[],
        skipDuplicates: true,
      })
    );

    await copyTable(
      "AiPromptVersion",
      await safeSourceRows("AiPromptVersion", () => source.aiPromptVersion.findMany()),
      (rows) =>
      target.aiPromptVersion.createMany({
        data: rows as Prisma.AiPromptVersionCreateManyInput[],
        skipDuplicates: true,
      })
    );

    await copyTable(
      "CategoryRule",
      await safeSourceRows("CategoryRule", () => source.categoryRule.findMany()),
      (rows) =>
      target.categoryRule.createMany({
        data: rows as Prisma.CategoryRuleCreateManyInput[],
        skipDuplicates: true,
      })
    );

    await copyTable(
      "MonthlyExpenseAnalysis",
      await safeSourceRows("MonthlyExpenseAnalysis", () => source.monthlyExpenseAnalysis.findMany()),
      (rows) =>
      target.monthlyExpenseAnalysis.createMany({
        data: rows as Prisma.MonthlyExpenseAnalysisCreateManyInput[],
        skipDuplicates: true,
      })
    );

    await copyTable(
      "Transaction",
      await safeSourceRows("Transaction", () => source.transaction.findMany()),
      (rows) =>
      target.transaction.createMany({
        data: rows as Prisma.TransactionCreateManyInput[],
        skipDuplicates: true,
      })
    );

    console.log("[migrate] done");
  } finally {
    await source.$disconnect();
    await target.$disconnect();
  }
}

main().catch((e) => {
  console.error("[migrate] failed:", e);
  process.exit(1);
});
