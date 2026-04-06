import { NextResponse } from "next/server";
import { TransactionType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type DeleteScope = "all-expense" | "all-income" | "month";

type DeleteBody = {
  scope?: DeleteScope;
  month?: string;
};

function parseMonthRange(month: string) {
  const [yearStr, monthStr] = month.split("-");
  const year = Number(yearStr);
  const monthNumber = Number(monthStr);
  const isValid =
    Number.isInteger(year) &&
    Number.isInteger(monthNumber) &&
    monthNumber >= 1 &&
    monthNumber <= 12;
  if (!isValid) return null;
  const start = new Date(year, monthNumber - 1, 1);
  const end = new Date(year, monthNumber, 1);
  return { start, end };
}

export async function DELETE(req: Request) {
  let body: DeleteBody;
  try {
    body = (await req.json()) as DeleteBody;
  } catch {
    return NextResponse.json({ error: "请求体格式错误" }, { status: 400 });
  }

  const scope = body.scope;
  if (!scope) {
    return NextResponse.json({ error: "缺少删除范围 scope" }, { status: 400 });
  }

  try {
    if (scope === "all-expense") {
      const result = await prisma.transaction.deleteMany({
        where: { type: TransactionType.expense },
      });
      return NextResponse.json({
        ok: true,
        deletedCount: result.count,
        scope,
      });
    }

    if (scope === "all-income") {
      const result = await prisma.transaction.deleteMany({
        where: { type: TransactionType.income },
      });
      return NextResponse.json({
        ok: true,
        deletedCount: result.count,
        scope,
      });
    }

    if (scope === "month") {
      const month = body.month?.trim();
      if (!month) {
        return NextResponse.json(
          { error: "清空月流水时必须提供 month（格式 YYYY-MM）" },
          { status: 400 }
        );
      }
      const range = parseMonthRange(month);
      if (!range) {
        return NextResponse.json(
          { error: "month 格式错误，请使用 YYYY-MM" },
          { status: 400 }
        );
      }

      const result = await prisma.transaction.deleteMany({
        where: {
          date: {
            gte: range.start,
            lt: range.end,
          },
        },
      });

      return NextResponse.json({
        ok: true,
        deletedCount: result.count,
        scope,
        month,
      });
    }

    return NextResponse.json({ error: "不支持的 scope 类型" }, { status: 400 });
  } catch (e) {
    console.error("[TRANSACTIONS] Bulk delete failed", e);
    return NextResponse.json(
      { error: "批量删除失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
