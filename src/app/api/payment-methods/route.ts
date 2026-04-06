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

type PaymentMethodDto = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

async function ensureDefaultPaymentMethods() {
  const count = await countPaymentMethods();
  if (count > 0) return;
  const delegate = (prisma as unknown as {
    paymentMethod?: {
      createMany: (args: { data: typeof DEFAULT_PAYMENT_METHODS }) => Promise<unknown>;
    };
  }).paymentMethod;
  if (delegate) {
    await delegate.createMany({ data: DEFAULT_PAYMENT_METHODS });
    return;
  }
  for (const item of DEFAULT_PAYMENT_METHODS) {
    await prisma.$executeRaw`
      INSERT OR IGNORE INTO "PaymentMethod" ("id", "name", "color", "icon", "createdAt", "updatedAt")
      VALUES (${crypto.randomUUID()}, ${item.name}, ${item.color}, ${item.icon}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;
  }
}

export async function GET() {
  try {
    await ensureDefaultPaymentMethods();
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
    console.error("[PAYMENT_METHODS] Create failed", e);
    return NextResponse.json(
      { error: "新增支付方式失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
