import { NextResponse } from "next/server";
import { TransactionType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { parseJsonWithSchema } from "@/lib/api-request";

type DeleteScope = "all-expense" | "all-income" | "month";

const deleteBodySchema = z.object({
  scope: z.enum(["all-expense", "all-income", "month"]),
  month: z.string().optional(),
});

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
  const parsedBody = await parseJsonWithSchema(req, deleteBodySchema);
  if (!parsedBody.ok) return parsedBody.response;
  const { scope, month } = parsedBody.data;

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
      const monthValue = month?.trim();
      if (!monthValue) {
        return NextResponse.json(
          { error: "清空月流水时必须提供 month（格式 YYYY-MM）" },
          { status: 400 }
        );
      }
      const range = parseMonthRange(monthValue);
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
        month: monthValue,
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
