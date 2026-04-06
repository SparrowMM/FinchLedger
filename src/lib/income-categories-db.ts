import { prisma } from "@/lib/prisma";

type IncomeCategoryRow = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

type IncomeCategoryDelegate = {
  count: () => Promise<number>;
  createMany: (args: { data: { name: string; color: string; icon: string }[] }) => Promise<unknown>;
  findMany: (args?: {
    select?: { name?: boolean };
    orderBy?: { createdAt: "asc" | "desc" };
  }) => Promise<Array<{ id: string; name: string; color: string; icon: string } | { name: string }>>;
  findUnique: (args: { where: { id: string } }) => Promise<{ id: string; name: string; color: string; icon: string } | null>;
  findFirst: (args: { where: { name: string } }) => Promise<{ id: string; name: string; color: string; icon: string } | null>;
  create: (args: { data: { name: string; color: string; icon: string } }) => Promise<IncomeCategoryRow>;
  update: (args: {
    where: { id: string };
    data: { name: string; color: string; icon: string };
  }) => Promise<IncomeCategoryRow>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

function getIncomeCategoryDelegate(): IncomeCategoryDelegate | null {
  const client = prisma as unknown as { incomeCategory?: IncomeCategoryDelegate };
  return client.incomeCategory ?? null;
}

async function ensureIncomeCategoryTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "IncomeCategory" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "color" TEXT NOT NULL,
      "icon" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "IncomeCategory_name_key" ON "IncomeCategory"("name")
  `);
}

export async function listIncomeCategories(): Promise<IncomeCategoryRow[]> {
  await ensureIncomeCategoryTable();
  const delegate = getIncomeCategoryDelegate();
  if (delegate) {
    return (await delegate.findMany({
      orderBy: { createdAt: "asc" },
    })) as IncomeCategoryRow[];
  }

  return prisma.$queryRaw<
    IncomeCategoryRow[]
  >`SELECT id, name, color, icon FROM "IncomeCategory" ORDER BY "createdAt" ASC`;
}

export async function listIncomeCategoryNames(): Promise<string[]> {
  await ensureIncomeCategoryTable();
  const delegate = getIncomeCategoryDelegate();
  if (delegate) {
    const rows = (await delegate.findMany({
      select: { name: true },
      orderBy: { createdAt: "asc" },
    })) as Array<{ name: string }>;
    return rows.map((r) => r.name);
  }

  const rows = await prisma.$queryRaw<Array<{ name: string }>>`SELECT name FROM "IncomeCategory" ORDER BY "createdAt" ASC`;
  return rows.map((r) => r.name);
}

export async function countIncomeCategories(): Promise<number> {
  await ensureIncomeCategoryTable();
  const delegate = getIncomeCategoryDelegate();
  if (delegate) {
    return delegate.count();
  }
  const rows = await prisma.$queryRaw<Array<{ count: number }>>`SELECT COUNT(*) as count FROM "IncomeCategory"`;
  return Number(rows[0]?.count ?? 0);
}
