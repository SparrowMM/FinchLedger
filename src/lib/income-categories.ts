export const INCOME_FALLBACK_CATEGORY = "待确认" as const;

export type DefaultIncomeCategory = {
  name: string;
  color: string;
  icon: string;
};

export const DEFAULT_INCOME_CATEGORIES: DefaultIncomeCategory[] = [
  { name: "工资", color: "#22C55E", icon: "💼" },
  { name: "闲鱼", color: "#F97316", icon: "🐟" },
  { name: "育儿", color: "#0EA5E9", icon: "🍼" },
  { name: "红包", color: "#EF4444", icon: "🧧" },
  { name: "其他", color: "#64748B", icon: "📦" },
  { name: INCOME_FALLBACK_CATEGORY, color: "#71717A", icon: "❓" },
];

export const INCOME_COLOR_OPTIONS = [
  "#22C55E",
  "#14B8A6",
  "#06B6D4",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F97316",
  "#EF4444",
  "#F59E0B",
  "#64748B",
] as const;

export const INCOME_ICON_OPTIONS = [
  "💼",
  "🐟",
  "🍼",
  "🧧",
  "📦",
  "❓",
  "💰",
  "🎁",
  "🏦",
  "💳",
  "🪙",
] as const;

export function normalizeIncomeCategoryFromList(
  rawCategory: string | null | undefined,
  allowedCategoryNames: string[]
): string {
  const value = rawCategory?.trim();
  if (value && allowedCategoryNames.includes(value)) {
    return value;
  }
  if (allowedCategoryNames.includes(INCOME_FALLBACK_CATEGORY)) {
    return INCOME_FALLBACK_CATEGORY;
  }
  return allowedCategoryNames[0] ?? INCOME_FALLBACK_CATEGORY;
}
