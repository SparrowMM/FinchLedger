import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseChinaDateTimeToUtc } from "@/lib/china-time";

type RouteContext = {
  params: Promise<{
    id: string;
  }> | {
    id: string;
  };
};

type PatchBody = {
  date?: unknown;
  time?: unknown;
  name?: unknown;
  category?: unknown;
  account?: unknown;
  amount?: unknown;
  note?: unknown;
};

function toTransactionDto(t: {
  id: string;
  date: Date;
  name: string;
  type: "income" | "expense";
  amount: { toString(): string } | number;
  category: string;
  account: string;
  note: string | null;
}) {
  return {
    id: t.id,
    date: t.date.toISOString(),
    name: t.name,
    type: t.type,
    amount: Number(t.amount),
    category: t.category,
    account: t.account,
    note: t.note,
  };
}

export async function PATCH(req: Request, context: RouteContext) {
  const params = await Promise.resolve(context.params);
  const id = params?.id?.trim();
  if (!id) {
    return NextResponse.json({ error: "缺少交易记录 ID" }, { status: 400 });
  }

  let raw: PatchBody;
  try {
    raw = (await req.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: "请求体无效" }, { status: 400 });
  }

  const dateStr =
    typeof raw.date === "string" ? raw.date.trim() : "";
  const timeStr =
    typeof raw.time === "string" ? raw.time.trim() : "";
  const nameStr =
    typeof raw.name === "string" ? raw.name.trim() : "";
  const categoryStr =
    typeof raw.category === "string" ? raw.category.trim() : "";
  const accountStr =
    typeof raw.account === "string" ? raw.account.trim() : "";
  const amountRaw = raw.amount;
  const amountNum =
    typeof amountRaw === "number"
      ? amountRaw
      : typeof amountRaw === "string"
        ? Number.parseFloat(amountRaw)
        : NaN;

  let noteVal: string | null;
  if (raw.note === null || raw.note === undefined) {
    noteVal = null;
  } else if (typeof raw.note === "string") {
    const t = raw.note.trim();
    noteVal = t.length ? t : null;
  } else {
    return NextResponse.json({ error: "备注格式无效" }, { status: 400 });
  }

  if (!dateStr) {
    return NextResponse.json({ error: "缺少日期" }, { status: 400 });
  }
  if (!nameStr) {
    return NextResponse.json({ error: "缺少名称（商家或收入来源）" }, { status: 400 });
  }
  if (!categoryStr) {
    return NextResponse.json({ error: "缺少分类" }, { status: 400 });
  }
  if (!accountStr) {
    return NextResponse.json({ error: "缺少账户（支付方式）" }, { status: 400 });
  }
  if (!Number.isFinite(amountNum) || amountNum <= 0) {
    return NextResponse.json({ error: "金额须为大于 0 的数字" }, { status: 400 });
  }

  let parsedDate: Date;
  try {
    parsedDate = parseChinaDateTimeToUtc(
      dateStr,
      timeStr || undefined
    );
  } catch {
    return NextResponse.json(
      { error: "日期或时间格式无效，日期须为 YYYY-MM-DD。" },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "交易记录不存在" }, { status: 404 });
    }

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        date: parsedDate,
        name: nameStr,
        category: categoryStr,
        account: accountStr,
        amount: amountNum,
        note: noteVal,
      },
    });

    return NextResponse.json({
      transaction: toTransactionDto(updated),
    });
  } catch (e) {
    console.error("[TRANSACTIONS] Patch failed", e);
    return NextResponse.json(
      { error: "更新交易记录失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  const params = await Promise.resolve(context.params);
  const id = params?.id?.trim();
  if (!id) {
    return NextResponse.json({ error: "缺少交易记录 ID" }, { status: 400 });
  }

  try {
    const existed = await prisma.transaction.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existed) {
      return NextResponse.json({ error: "交易记录不存在" }, { status: 404 });
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[TRANSACTIONS] Delete failed", e);
    return NextResponse.json(
      { error: "删除交易记录失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
