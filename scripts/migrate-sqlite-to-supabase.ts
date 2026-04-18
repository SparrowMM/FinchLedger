import { PrismaClient as TargetPrisma } from "@prisma/client";
import { PrismaClient as SourcePrisma } from "../src/generated/prisma-sqlite";

type BatchResult = { count: number };

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

  const source = new SourcePrisma({
    datasources: { db: { url: sqliteSourceUrl } },
  });
  const target = new TargetPrisma({
    datasources: { db: { url: databaseUrl } },
  });

  try {
    const sourceCounts = await Promise.all([
      source.transaction.count(),
      source.monthlyExpenseAnalysis.count(),
      source.expenseCategory.count(),
      source.incomeCategory.count(),
      source.paymentMethod.count(),
      source.importChannelPayment.count(),
      source.aiPrompt.count(),
      source.aiPromptVersion.count(),
      source.categoryRule.count(),
    ]);

    console.log("[migrate] source row counts:", sourceCounts.join(", "));

    await copyTable("ExpenseCategory", await source.expenseCategory.findMany(), (rows) =>
      target.expenseCategory.createMany({
        data: rows as Parameters<typeof target.expenseCategory.createMany>[0]["data"],
        skipDuplicates: true,
      })
    );

    await copyTable("IncomeCategory", await source.incomeCategory.findMany(), (rows) =>
      target.incomeCategory.createMany({
        data: rows as Parameters<typeof target.incomeCategory.createMany>[0]["data"],
        skipDuplicates: true,
      })
    );

    await copyTable("PaymentMethod", await source.paymentMethod.findMany(), (rows) =>
      target.paymentMethod.createMany({
        data: rows as Parameters<typeof target.paymentMethod.createMany>[0]["data"],
        skipDuplicates: true,
      })
    );

    await copyTable("ImportChannelPayment", await source.importChannelPayment.findMany(), (rows) =>
      target.importChannelPayment.createMany({
        data: rows as Parameters<typeof target.importChannelPayment.createMany>[0]["data"],
        skipDuplicates: true,
      })
    );

    await copyTable("AiPrompt", await source.aiPrompt.findMany(), (rows) =>
      target.aiPrompt.createMany({
        data: rows as Parameters<typeof target.aiPrompt.createMany>[0]["data"],
        skipDuplicates: true,
      })
    );

    await copyTable("AiPromptVersion", await source.aiPromptVersion.findMany(), (rows) =>
      target.aiPromptVersion.createMany({
        data: rows as Parameters<typeof target.aiPromptVersion.createMany>[0]["data"],
        skipDuplicates: true,
      })
    );

    await copyTable("CategoryRule", await source.categoryRule.findMany(), (rows) =>
      target.categoryRule.createMany({
        data: rows as Parameters<typeof target.categoryRule.createMany>[0]["data"],
        skipDuplicates: true,
      })
    );

    await copyTable("MonthlyExpenseAnalysis", await source.monthlyExpenseAnalysis.findMany(), (rows) =>
      target.monthlyExpenseAnalysis.createMany({
        data: rows as Parameters<typeof target.monthlyExpenseAnalysis.createMany>[0]["data"],
        skipDuplicates: true,
      })
    );

    await copyTable("Transaction", await source.transaction.findMany(), (rows) =>
      target.transaction.createMany({
        data: rows as Parameters<typeof target.transaction.createMany>[0]["data"],
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
