export const EXPENSE_FALLBACK_CATEGORY = "待确认" as const;

export type DefaultExpenseCategory = {
  name: string;
  color: string;
  icon: string;
};

export const DEFAULT_EXPENSE_CATEGORIES: DefaultExpenseCategory[] = [
  { name: "缴费", color: "#0EA5E9", icon: "💡" },
  { name: "房贷", color: "#A855F7", icon: "🏠" },
  { name: "人情-亲人", color: "#EC4899", icon: "👨‍👩‍👧" },
  { name: "生活", color: "#22C55E", icon: "🧺" },
  { name: "Apple", color: "#111827", icon: "🍎" },
  { name: "育儿", color: "#F59E0B", icon: "🍼" },
  { name: "餐饮", color: "#F97316", icon: "🍜" },
  { name: "闲鱼", color: "#14B8A6", icon: "🐟" },
  { name: "人情-朋友", color: "#14B8A6", icon: "🤝" },
  { name: "AI", color: "#6366F1", icon: "🤖" },
  { name: "交通", color: "#3B82F6", icon: "🚇" },
  { name: "其他", color: "#64748B", icon: "📦" },
  { name: "服饰", color: "#E11D48", icon: "👕" },
  { name: "医疗", color: "#DC2626", icon: "🩺" },
  { name: EXPENSE_FALLBACK_CATEGORY, color: "#71717A", icon: "❓" },
];

export const EXPENSE_COLOR_OPTIONS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#84CC16",
  "#22C55E",
  "#14B8A6",
  "#06B6D4",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#64748B",
] as const;

export const EXPENSE_ICON_OPTIONS = [
  "💡",
  "🏠",
  "👨‍👩‍👧",
  "🧺",
  "🍎",
  "🍼",
  "🍜",
  "🐟",
  "🤝",
  "🤖",
  "🚇",
  "📦",
  "👕",
  "🩺",
  "❓",
  "📚",
  "🎮",
  "🛒",
] as const;

export function normalizeExpenseCategoryFromList(
  rawCategory: string | null | undefined,
  allowedCategoryNames: string[]
): string {
  const value = rawCategory?.trim();
  if (!value) return EXPENSE_FALLBACK_CATEGORY;
  return allowedCategoryNames.includes(value) ? value : EXPENSE_FALLBACK_CATEGORY;
}
