import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_PAYMENT_METHOD } from "@/lib/payment-methods";
import { listPaymentMethods } from "@/lib/payment-methods-db";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  let body: { name?: string; color?: string; icon?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求体格式错误。" }, { status: 400 });
  }

  const name = body.name?.trim();
  const color = body.color?.trim();
  const icon = body.icon?.trim();
  if (!name || !color || !icon) {
    return NextResponse.json(
      { error: "name、color、icon 均为必填项。" },
      { status: 400 }
    );
  }

  try {
    const delegate = (prisma as unknown as {
      paymentMethod?: {
        update: (args: {
          where: { id: string };
          data: { name: string; color: string; icon: string };
        }) => Promise<{ id: string; name: string; color: string; icon: string }>;
      };
    }).paymentMethod;
    let updated: { id: string; name: string; color: string; icon: string } | null =
      null;
    if (delegate) {
      updated = await delegate.update({
        where: { id },
        data: { name, color, icon },
      });
    } else {
      const changed = await prisma.$executeRaw`
        UPDATE "PaymentMethod"
        SET "name" = ${name}, "color" = ${color}, "icon" = ${icon}, "updatedAt" = CURRENT_TIMESTAMP
        WHERE "id" = ${id}
      `;
      if (Number(changed) > 0) {
        updated = { id, name, color, icon };
      }
    }
    if (!updated) {
      return NextResponse.json({ error: "支付方式不存在。" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string };
    if (err?.code === "P2025") {
      return NextResponse.json({ error: "支付方式不存在。" }, { status: 404 });
    }
    if (err?.code === "P2002" || err?.message?.includes("UNIQUE constraint failed")) {
      return NextResponse.json({ error: "支付方式名称已存在。" }, { status: 409 });
    }
    console.error("[PAYMENT_METHODS] Update failed", e);
    return NextResponse.json(
      { error: "更新支付方式失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const delegate = (prisma as unknown as {
      paymentMethod?: {
        findUnique: (args: { where: { id: string } }) => Promise<{ id: string; name: string } | null>;
        delete: (args: { where: { id: string } }) => Promise<unknown>;
      };
    }).paymentMethod;
    let method: { id: string; name: string } | null = null;
    if (delegate) {
      method = await delegate.findUnique({ where: { id } });
    } else {
      const rows = await prisma.$queryRaw<Array<{ id: string; name: string }>>`
        SELECT "id", "name" FROM "PaymentMethod" WHERE "id" = ${id} LIMIT 1
      `;
      method = rows[0] ?? null;
    }
    if (!method) {
      return NextResponse.json({ error: "支付方式不存在。" }, { status: 404 });
    }

    const methods = await listPaymentMethods();
    if (methods.length <= 1) {
      return NextResponse.json(
        { error: "至少保留一个支付方式，无法删除最后一项。" },
        { status: 400 }
      );
    }
    const fallback =
      methods.find((item) => item.name === DEFAULT_PAYMENT_METHOD && item.id !== id) ??
      methods.find((item) => item.id !== id);
    if (!fallback) {
      return NextResponse.json(
        { error: "未找到可用的替代支付方式，无法删除。" },
        { status: 500 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.transaction.updateMany({
        where: { account: method.name },
        data: { account: fallback.name },
      });
      if (delegate) {
        await delegate.delete({ where: { id } });
      } else {
        await tx.$executeRaw`DELETE FROM "PaymentMethod" WHERE "id" = ${id}`;
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[PAYMENT_METHODS] Delete failed", e);
    return NextResponse.json(
      { error: "删除支付方式失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
