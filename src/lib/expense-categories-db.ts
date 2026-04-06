import { prisma } from "@/lib/prisma";

type ExpenseCategoryRow = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

type ExpenseCategoryDelegate = {
  count: () => Promise<number>;
  createMany: (args: { data: { name: string; color: string; icon: string }[] }) => Promise<unknown>;
  findMany: (args?: {
    select?: { name?: boolean };
    orderBy?: { createdAt: "asc" | "desc" };
  }) => Promise<Array<{ id: string; name: string; color: string; icon: string } | { name: string }>>;
  findUnique: (args: { where: { id: string } }) => Promise<{ id: string; name: string; color: string; icon: string } | null>;
  findFirst: (args: { where: { name: string } }) => Promise<{ id: string; name: string; color: string; icon: string } | null>;
  create: (args: { data: { name: string; color: string; icon: string } }) => Promise<ExpenseCategoryRow>;
  update: (args: {
    where: { id: string };
    data: { name: string; color: string; icon: string };
  }) => Promise<ExpenseCategoryRow>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

function getExpenseCategoryDelegate(): ExpenseCategoryDelegate | null {
  const client = prisma as unknown as { expenseCategory?: ExpenseCategoryDelegate };
  return client.expenseCategory ?? null;
}

export async function listExpenseCategories(): Promise<ExpenseCategoryRow[]> {
  const delegate = getExpenseCategoryDelegate();
  if (delegate) {
    return (await delegate.findMany({
      orderBy: { createdAt: "asc" },
    })) as ExpenseCategoryRow[];
  }

  return prisma.$queryRaw<
    ExpenseCategoryRow[]
  >`SELECT id, name, color, icon FROM "ExpenseCategory" ORDER BY "createdAt" ASC`;
}

export async function listExpenseCategoryNames(): Promise<string[]> {
  const delegate = getExpenseCategoryDelegate();
  if (delegate) {
    const rows = (await delegate.findMany({
      select: { name: true },
      orderBy: { createdAt: "asc" },
    })) as Array<{ name: string }>;
    return rows.map((r) => r.name);
  }

  const rows = await prisma.$queryRaw<Array<{ name: string }>>`SELECT name FROM "ExpenseCategory" ORDER BY "createdAt" ASC`;
  return rows.map((r) => r.name);
}

export async function countExpenseCategories(): Promise<number> {
  const delegate = getExpenseCategoryDelegate();
  if (delegate) {
    return delegate.count();
  }
  const rows = await prisma.$queryRaw<Array<{ count: number }>>`SELECT COUNT(*) as count FROM "ExpenseCategory"`;
  return Number(rows[0]?.count ?? 0);
}
