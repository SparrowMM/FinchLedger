import { prisma } from "@/lib/prisma";
import { runBootstrapOnce } from "@/lib/bootstrap-once";
import {
  BOOKKEEPING_IMPORT_CHANNELS,
  type BookkeepingImportChannel,
} from "@/lib/import-channels";
const DEFAULT_NAME_BY_CHANNEL: Record<BookkeepingImportChannel, string> = {
  alipay: "支付宝",
  wechat: "微信",
  cmb: "招商银行",
  icbc: "工商银行",
};

/** 首次使用时按支付方式名称补齐映射行 */
export async function ensureImportChannelPaymentMappings(): Promise<void> {
  for (const { key } of BOOKKEEPING_IMPORT_CHANNELS) {
    const existing = await prisma.importChannelPayment.findUnique({
      where: { channel: key },
    });
    if (existing) continue;
    const wantName = DEFAULT_NAME_BY_CHANNEL[key];
    let pm = await prisma.paymentMethod.findFirst({
      where: { name: wantName },
    });
    if (!pm) {
      pm = await prisma.paymentMethod.findFirst({
        orderBy: { createdAt: "asc" },
      });
    }
    if (!pm) continue;
    await prisma.importChannelPayment.create({
      data: { channel: key, paymentMethodId: pm.id },
    });
  }
}

export type ImportChannelPaymentRow = {
  channel: string;
  paymentMethodId: string;
  paymentMethod: { id: string; name: string };
};

export async function listImportChannelPaymentRows(): Promise<
  ImportChannelPaymentRow[]
> {
  await runBootstrapOnce(
    "seed:import-channel-payments",
    ensureImportChannelPaymentMappings
  );
  return prisma.importChannelPayment.findMany({
    include: { paymentMethod: { select: { id: true, name: true } } },
    orderBy: { channel: "asc" },
  });
}

export async function updateImportChannelPayment(
  channel: string,
  paymentMethodId: string
): Promise<void> {
  if (!BOOKKEEPING_IMPORT_CHANNELS.some((c) => c.key === channel)) {
    throw new Error("不支持的导入类型。");
  }
  const pm = await prisma.paymentMethod.findUnique({
    where: { id: paymentMethodId },
  });
  if (!pm) {
    throw new Error("支付方式不存在。");
  }
  await prisma.importChannelPayment.upsert({
    where: { channel },
    create: { channel, paymentMethodId: pm.id },
    update: { paymentMethodId: pm.id },
  });
}

/** 供系统提示词使用：各 channel 的默认支付方式说明块 */
export function buildImportChannelDefaultGuideText(
  rows: ImportChannelPaymentRow[]
): string {
  const byChannel = new Map(rows.map((r) => [r.channel, r.paymentMethod.name]));
  return BOOKKEEPING_IMPORT_CHANNELS.map(({ key, label }) => {
    const name =
      byChannel.get(key) ??
      DEFAULT_NAME_BY_CHANNEL[key as BookkeepingImportChannel];
    return `- channel = "${key}"（${label}）：账单未明确支付方式时，method 默认使用「${name}」（名称须与下方支付方式列表中的某项完全一致）。`;
  }).join("\n");
}

export async function resolveDefaultPaymentMethodNameForChannel(
  channel: BookkeepingImportChannel,
  allowedPaymentMethodNames: string[]
): Promise<string> {
  await runBootstrapOnce(
    "seed:import-channel-payments",
    ensureImportChannelPaymentMappings
  );
  const row = await prisma.importChannelPayment.findUnique({
    where: { channel },
    include: { paymentMethod: { select: { name: true } } },
  });
  const fromMap = row?.paymentMethod?.name;
  if (fromMap && allowedPaymentMethodNames.includes(fromMap)) {
    return fromMap;
  }
  const fallbackName =
    DEFAULT_NAME_BY_CHANNEL[channel] ?? allowedPaymentMethodNames[0] ?? "";
  if (allowedPaymentMethodNames.includes(fallbackName)) {
    return fallbackName;
  }
  return allowedPaymentMethodNames[0] ?? fallbackName;
}
