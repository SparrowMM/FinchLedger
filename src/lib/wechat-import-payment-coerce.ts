import { normalizePaymentMethodFromList } from "@/lib/payment-methods";

export type BookkeepingImportChannelForCoerce =
  | "alipay"
  | "wechat"
  | "cmb"
  | "icbc";

/**
 * 微信账单常在「收/付款方银行账户」等列出现「招商银行」，模型易误判。
 * 在 channel=wechat 时，若归并结果为招行/工行但原始 method 未明确「卡类型+银行」，则改回该导入类型配置的默认支付方式（一般为「微信」）。
 */
export function coercePaymentMethodAfterAiParse(
  channel: BookkeepingImportChannelForCoerce,
  methodFromAi: string | undefined,
  allowedNames: string[],
  importChannelDefaultMethodName: string
): string {
  const raw = (methodFromAi ?? "").trim();

  if (channel !== "wechat") {
    return normalizePaymentMethodFromList(
      raw,
      allowedNames,
      importChannelDefaultMethodName
    );
  }

  const looksLikeExplicitCardInPaymentColumn =
    /信用卡|借记卡|储蓄卡|银行卡/.test(raw) &&
    (/招商|招行/.test(raw) || /工行|工商/.test(raw));

  if (looksLikeExplicitCardInPaymentColumn) {
    if (/招商|招行/.test(raw) && allowedNames.includes("招商银行")) {
      return "招商银行";
    }
    if (/工行|工商/.test(raw) && allowedNames.includes("工商银行")) {
      return "工商银行";
    }
    return normalizePaymentMethodFromList(
      raw,
      allowedNames,
      importChannelDefaultMethodName
    );
  }

  const normalized = normalizePaymentMethodFromList(
    raw,
    allowedNames,
    importChannelDefaultMethodName
  );

  if (normalized === "招商银行" || normalized === "工商银行") {
    return normalizePaymentMethodFromList(
      importChannelDefaultMethodName,
      allowedNames,
      allowedNames[0] ?? importChannelDefaultMethodName
    );
  }

  return normalized;
}
