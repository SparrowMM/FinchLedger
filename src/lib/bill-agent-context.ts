import { prisma } from "@/lib/prisma";

const DETAIL_LIMIT = 800;

export type BillAgentContextPayload = {
  generatedAt: string;
  totalCount: number;
  detailIncluded: number;
  detailNote: string;
  summaryByType: { type: string; total: string; count: number }[];
  byMonth: { month: string; income: string; expense: string; count: number }[];
  topExpenseCategories: { category: string; total: string; count: number }[];
  topIncomeCategories: { category: string; total: string; count: number }[];
  /** 每条：YYYY-MM-DD<TAB>income|expense<TAB>金额<TAB>类目<TAB>名称<TAB>账户<TAB>备注 */
  transactionLines: string[];
};

function numFromSql(v: unknown): string {
  if (v == null) return "0";
  if (typeof v === "bigint") return v.toString();
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "0";
  const s = String(v).trim();
  return s === "" ? "0" : s;
}

export async function buildBillAgentContext(): Promise<BillAgentContextPayload> {
  const totalCount = await prisma.transaction.count();

  const summaryRows = await prisma.$queryRaw<
    { type: string; total: unknown; cnt: unknown }[]
  >`
    SELECT "type", printf("%.2f", SUM(CAST("amount" AS REAL))) AS total, COUNT(*) AS cnt
    FROM "Transaction"
    GROUP BY "type"
  `;

  const monthlyRows = await prisma.$queryRaw<
    { ym: string; type: string; total: unknown; cnt: unknown }[]
  >`
    SELECT strftime('%Y-%m', "date") AS ym, "type", printf("%.2f", SUM(CAST("amount" AS REAL))) AS total, COUNT(*) AS cnt
    FROM "Transaction"
    GROUP BY ym, "type"
    ORDER BY ym DESC
    LIMIT 120
  `;

  const monthMap = new Map<
    string,
    { income: number; expense: number; count: number }
  >();
  for (const row of monthlyRows) {
    const m = row.ym;
    if (!monthMap.has(m)) {
      monthMap.set(m, { income: 0, expense: 0, count: 0 });
    }
    const slot = monthMap.get(m)!;
    const t = Number(row.total) || 0;
    const c = Number(numFromSql(row.cnt)) || 0;
    slot.count += c;
    if (row.type === "income") slot.income += t;
    else if (row.type === "expense") slot.expense += t;
  }

  const byMonth = [...monthMap.entries()]
    .map(([month, v]) => ({
      month,
      income: v.income.toFixed(2),
      expense: v.expense.toFixed(2),
      count: v.count,
    }))
    .sort((a, b) => b.month.localeCompare(a.month));

  const catExpense = await prisma.$queryRaw<
    { category: string; total: unknown; cnt: unknown }[]
  >`
    SELECT "category", printf("%.2f", SUM(CAST("amount" AS REAL))) AS total, COUNT(*) AS cnt
    FROM "Transaction"
    WHERE "type" = 'expense'
    GROUP BY "category"
    ORDER BY SUM(CAST("amount" AS REAL)) DESC
    LIMIT 40
  `;

  const catIncome = await prisma.$queryRaw<
    { category: string; total: unknown; cnt: unknown }[]
  >`
    SELECT "category", printf("%.2f", SUM(CAST("amount" AS REAL))) AS total, COUNT(*) AS cnt
    FROM "Transaction"
    WHERE "type" = 'income'
    GROUP BY "category"
    ORDER BY SUM(CAST("amount" AS REAL)) DESC
    LIMIT 40
  `;

  const recent = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
    take: DETAIL_LIMIT,
    select: {
      date: true,
      type: true,
      amount: true,
      category: true,
      name: true,
      account: true,
      note: true,
    },
  });

  const transactionLines = recent.map((t) => {
    const d = t.date.toISOString().slice(0, 10);
    const amt = Number(t.amount).toFixed(2);
    const note = (t.note ?? "").replace(/\s+/g, " ").trim();
    return [d, t.type, amt, t.category, t.name, t.account, note].join("\t");
  });

  const omitted = Math.max(0, totalCount - recent.length);
  const detailNote =
    omitted > 0
      ? `以下明细仅包含按日期从新到旧的前 ${recent.length} 条；数据库中共有 ${totalCount} 条，另有 ${omitted} 条更早的记录未逐条列出，但已计入上方按月汇总与分类汇总。`
      : `以下明细包含全部 ${totalCount} 条记录（按日期从新到旧）。`;

  return {
    generatedAt: new Date().toISOString(),
    totalCount,
    detailIncluded: recent.length,
    detailNote,
    summaryByType: summaryRows.map((r) => ({
      type: r.type,
      total: numFromSql(r.total),
      count: Number(numFromSql(r.cnt)) || 0,
    })),
    byMonth,
    topExpenseCategories: catExpense.map((r) => ({
      category: r.category,
      total: numFromSql(r.total),
      count: Number(numFromSql(r.cnt)) || 0,
    })),
    topIncomeCategories: catIncome.map((r) => ({
      category: r.category,
      total: numFromSql(r.total),
      count: Number(numFromSql(r.cnt)) || 0,
    })),
    transactionLines,
  };
}
