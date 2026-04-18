import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TransactionType } from "@prisma/client";
import { isTableMissingError } from "@/lib/prisma-errors";

type TransactionDto = {
  id: string;
  date: string;
  name: string;
  type: TransactionType;
  amount: number;
  category: string;
  account: string;
  note?: string | null;
};

type TransactionsResponse = {
  transactions: TransactionDto[];
  summary: {
    income: number;
    expense: number;
    balance: number;
  };
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const typeParam = searchParams.get("type");
  const monthParam = searchParams.get("month"); // YYYY-MM
  const limitParam = searchParams.get("limit");

  const where: {
    type?: TransactionType;
    date?: {
      gte?: Date;
      lt?: Date;
    };
  } = {};

  if (typeParam === "income" || typeParam === "expense") {
    where.type = typeParam;
  }

  if (monthParam) {
    const [yearStr, monthStr] = monthParam.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    if (
      Number.isInteger(year) &&
      Number.isInteger(month) &&
      month >= 1 &&
      month <= 12
    ) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      where.date = { gte: start, lt: end };
    }
  }

  const takeRaw = limitParam ? Number(limitParam) : 200;
  const take =
    Number.isFinite(takeRaw) && takeRaw > 0
      ? Math.min(Math.floor(takeRaw), 500)
      : 200;

  try {
    const rows = await prisma.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      take,
    });

    const transactions: TransactionDto[] = rows.map((t) => ({
      id: t.id,
      date: t.date.toISOString(),
      name: t.name,
      type: t.type,
      amount: Number(t.amount),
      category: t.category,
      account: t.account,
      note: t.note,
    }));

    let income = 0;
    let expense = 0;
    for (const t of rows) {
      const amt = Number(t.amount);
      if (t.type === "income") {
        income += amt;
      } else if (t.type === "expense") {
        expense += amt;
      }
    }

    const payload: TransactionsResponse = {
      transactions,
      summary: {
        income,
        expense,
        balance: income - expense,
      },
    };

    return NextResponse.json(payload);
  } catch (e) {
    if (isTableMissingError(e)) {
      const payload: TransactionsResponse = {
        transactions: [],
        summary: {
          income: 0,
          expense: 0,
          balance: 0,
        },
      };
      return NextResponse.json(payload);
    }
    console.error("[TRANSACTIONS] Query failed", e);
    return NextResponse.json(
      { error: "查询交易记录失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

