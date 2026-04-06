/** 与 AI 记账 /import-from-ai 的 channel 一致 */
export const BOOKKEEPING_IMPORT_CHANNELS = [
  { key: "alipay", label: "支付宝流水" },
  { key: "wechat", label: "微信支付流水" },
  { key: "cmb", label: "招商银行流水" },
  { key: "icbc", label: "工商银行流水" },
] as const;

export type BookkeepingImportChannel =
  (typeof BOOKKEEPING_IMPORT_CHANNELS)[number]["key"];

export function isBookkeepingImportChannel(
  v: string
): v is BookkeepingImportChannel {
  return BOOKKEEPING_IMPORT_CHANNELS.some((c) => c.key === v);
}
