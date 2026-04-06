import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BOOKKEEPING_IMPORT_CHANNELS } from "@/lib/import-channels";
import {
  ensureImportChannelPaymentMappings,
  listImportChannelPaymentRows,
  updateImportChannelPayment,
} from "@/lib/import-channel-payment-db";
import {
  countPaymentMethods,
  listPaymentMethods,
} from "@/lib/payment-methods-db";
import {
  DEFAULT_PAYMENT_METHODS,
  PAYMENT_METHOD_COLOR_OPTIONS,
  PAYMENT_METHOD_ICON_OPTIONS,
} from "@/lib/payment-methods";

async function ensureDefaultPaymentMethods() {
  const count = await countPaymentMethods();
  if (count > 0) return;
  const delegate = (
    prisma as unknown as {
      paymentMethod?: {
        createMany: (args: { data: typeof DEFAULT_PAYMENT_METHODS }) => Promise<unknown>;
      };
    }
  ).paymentMethod;
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
    await ensureImportChannelPaymentMappings();
    const rows = await listImportChannelPaymentRows();
    const methods = await listPaymentMethods();
    const byChannel = new Map(rows.map((r) => [r.channel, r]));
    const mappings = BOOKKEEPING_IMPORT_CHANNELS.map(({ key, label }) => {
      const row = byChannel.get(key);
      return {
        channel: key,
        label,
        paymentMethodId: row?.paymentMethodId ?? null,
        paymentMethodName: row?.paymentMethod.name ?? null,
      };
    });
    return NextResponse.json({
      channels: [...BOOKKEEPING_IMPORT_CHANNELS],
      mappings,
      methods,
      colorOptions: PAYMENT_METHOD_COLOR_OPTIONS,
      iconOptions: PAYMENT_METHOD_ICON_OPTIONS,
    });
  } catch (e) {
    console.error("[IMPORT_CHANNEL_PAYMENTS] GET failed", e);
    return NextResponse.json(
      { error: "读取导入类型映射失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  let body: { channel?: string; paymentMethodId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求体应为 JSON。" }, { status: 400 });
  }
  const channel = typeof body.channel === "string" ? body.channel.trim() : "";
  const paymentMethodId =
    typeof body.paymentMethodId === "string"
      ? body.paymentMethodId.trim()
      : "";
  if (!channel || !paymentMethodId) {
    return NextResponse.json(
      { error: "channel 与 paymentMethodId 均为必填。" },
      { status: 400 }
    );
  }
  try {
    await updateImportChannelPayment(channel, paymentMethodId);
    const rows = await listImportChannelPaymentRows();
    return NextResponse.json({ ok: true, rows });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "保存失败";
    if (msg.includes("不支持") || msg.includes("不存在")) {
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    console.error("[IMPORT_CHANNEL_PAYMENTS] PUT failed", e);
    return NextResponse.json(
      { error: "保存导入类型映射失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
