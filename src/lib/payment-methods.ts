export const DEFAULT_PAYMENT_METHOD = "支付宝" as const;

export type DefaultPaymentMethod = {
  name: string;
  color: string;
  icon: string;
};

export const DEFAULT_PAYMENT_METHODS: DefaultPaymentMethod[] = [
  { name: "支付宝", color: "#1677FF", icon: "🅰️" },
  { name: "微信", color: "#22C55E", icon: "💬" },
  { name: "招商银行", color: "#E11D48", icon: "🏦" },
  { name: "工商银行", color: "#DC2626", icon: "🏛️" },
];

export const PAYMENT_METHOD_COLOR_OPTIONS = [
  "#1677FF",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F97316",
  "#EF4444",
  "#64748B",
] as const;

export const PAYMENT_METHOD_ICON_OPTIONS = [
  "🅰️",
  "💬",
  "🏦",
  "🏛️",
  "💳",
  "📱",
  "💵",
  "🧾",
  "🏷️",
] as const;

export function normalizePaymentMethodFromList(
  rawMethod: string | null | undefined,
  allowedMethodNames: string[],
  fallbackMethodName: string = DEFAULT_PAYMENT_METHOD
): string {
  const value = rawMethod?.trim();
  if (value && allowedMethodNames.includes(value)) {
    return value;
  }
  if (allowedMethodNames.includes(fallbackMethodName)) {
    return fallbackMethodName;
  }
  return allowedMethodNames[0] ?? fallbackMethodName;
}
