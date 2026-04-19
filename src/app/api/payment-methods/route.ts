import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  DEFAULT_PAYMENT_METHODS,
  PAYMENT_METHOD_COLOR_OPTIONS,
  PAYMENT_METHOD_ICON_OPTIONS,
} from "@/lib/payment-methods";
import {
  countPaymentMethods,
  listPaymentMethods,
} from "@/lib/payment-methods-db";
import { isTableMissingError } from "@/lib/prisma-errors";
import { runBootstrapOnce } from "@/lib/bootstrap-once";
import { z } from "zod";
import { parseJsonWithSchema } from "@/lib/api-request";

type PaymentMethodDto = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

async function ensureDefaultPaymentMethods() {
  try {
    const count = await countPaymentMethods();
    if (count > 0) return;
    await prisma.paymentMethod.createMany({ data: DEFAULT_PAYMENT_METHODS });
  } catch (error) {
    if (isTableMissingError(error)) {
      return;
    }
    throw error;
  }
}

export async function GET() {
  try {
    await runBootstrapOnce("seed:payment-methods", ensureDefaultPaymentMethods);
    const methods = await listPaymentMethods();
    return NextResponse.json({
      methods: methods as PaymentMethodDto[],
      colorOptions: PAYMENT_METHOD_COLOR_OPTIONS,
      iconOptions: PAYMENT_METHOD_ICON_OPTIONS,
    });
  } catch (e) {
    console.error("[PAYMENT_METHODS] Query failed", e);
    return NextResponse.json(
      { error: "查询支付方式失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const bodySchema = z.object({
    name: z.string().min(1).max(40),
    color: z.string().min(1).max(30),
    icon: z.string().min(1).max(10),
  });
  const parsedBody = await parseJsonWithSchema(req, bodySchema);
  if (!parsedBody.ok) return parsedBody.response;
  const name = parsedBody.data.name.trim();
  const color = parsedBody.data.color.trim();
  const icon = parsedBody.data.icon.trim();

  if (!name || !color || !icon) {
    return NextResponse.json(
      { error: "name、color、icon 均为必填项。" },
      { status: 400 }
    );
  }

  try {
    const delegate = (prisma as unknown as {
      paymentMethod?: {
        create: (args: {
          data: { name: string; color: string; icon: string };
        }) => Promise<PaymentMethodDto>;
      };
    }).paymentMethod;
    let created: PaymentMethodDto;
    if (delegate) {
      created = await delegate.create({ data: { name, color, icon } });
    } else {
      const id = crypto.randomUUID();
      await prisma.$executeRaw`
        INSERT INTO "PaymentMethod" ("id", "name", "color", "icon", "createdAt", "updatedAt")
        VALUES (${id}, ${name}, ${color}, ${icon}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;
      created = { id, name, color, icon };
    }
    return NextResponse.json(created, { status: 201 });
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string };
    if (err?.code === "P2002" || err?.message?.includes("UNIQUE constraint failed")) {
      return NextResponse.json({ error: "支付方式名称已存在。" }, { status: 409 });
    }
    if (isTableMissingError(e)) {
      return NextResponse.json(
        { error: "支付方式数据表不存在，请先执行数据库迁移。" },
        { status: 503 }
      );
    }
    console.error("[PAYMENT_METHODS] Create failed", e);
    return NextResponse.json(
      { error: "新增支付方式失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
