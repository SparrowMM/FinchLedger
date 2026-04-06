import { prisma } from "@/lib/prisma";

type PaymentMethodRow = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

type PaymentMethodDelegate = {
  count: () => Promise<number>;
  createMany: (args: {
    data: { name: string; color: string; icon: string }[];
  }) => Promise<unknown>;
  findMany: (args?: {
    select?: { name?: boolean };
    orderBy?: { createdAt: "asc" | "desc" };
  }) => Promise<
    Array<
      { id: string; name: string; color: string; icon: string } | { name: string }
    >
  >;
  findUnique: (args: {
    where: { id: string };
  }) => Promise<{ id: string; name: string; color: string; icon: string } | null>;
  create: (args: {
    data: { name: string; color: string; icon: string };
  }) => Promise<PaymentMethodRow>;
  update: (args: {
    where: { id: string };
    data: { name: string; color: string; icon: string };
  }) => Promise<PaymentMethodRow>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

function getPaymentMethodDelegate(): PaymentMethodDelegate | null {
  const client = prisma as unknown as { paymentMethod?: PaymentMethodDelegate };
  return client.paymentMethod ?? null;
}

export async function listPaymentMethods(): Promise<PaymentMethodRow[]> {
  const delegate = getPaymentMethodDelegate();
  if (delegate) {
    return (await delegate.findMany({
      orderBy: { createdAt: "asc" },
    })) as PaymentMethodRow[];
  }
  return prisma.$queryRaw<PaymentMethodRow[]>`
    SELECT id, name, color, icon FROM "PaymentMethod" ORDER BY "createdAt" ASC
  `;
}

export async function listPaymentMethodNames(): Promise<string[]> {
  const delegate = getPaymentMethodDelegate();
  if (delegate) {
    const rows = (await delegate.findMany({
      select: { name: true },
      orderBy: { createdAt: "asc" },
    })) as Array<{ name: string }>;
    return rows.map((r) => r.name);
  }
  const rows = await prisma.$queryRaw<Array<{ name: string }>>`
    SELECT name FROM "PaymentMethod" ORDER BY "createdAt" ASC
  `;
  return rows.map((r) => r.name);
}

export async function countPaymentMethods(): Promise<number> {
  const delegate = getPaymentMethodDelegate();
  if (delegate) {
    return delegate.count();
  }
  const rows = await prisma.$queryRaw<Array<{ count: number }>>`
    SELECT COUNT(*) as count FROM "PaymentMethod"
  `;
  return Number(rows[0]?.count ?? 0);
}
