/** 无法识别商户/来源时使用的占位名称 */
export const UNNAMED_TRANSACTION = "未命名交易" as const;

/** 与 /api/transactions 响应体对应的客户端类型 */
export type ApiTransaction = {
  id: string;
  date: string;
  name: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  account: string;
  note?: string | null;
};

export type ApiTransactionSummary = {
  income: number;
  expense: number;
  balance: number;
};

export type ApiTransactionsResponse = {
  transactions: ApiTransaction[];
  summary: ApiTransactionSummary;
};

/** 分类 / 支付方式的通用元数据 */
export type CategoryMeta = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

/**
 * 默认月份参数（上一个自然月），格式 YYYY-MM。
 * Dashboard / 支出 / 收入 / 管理员 等页面共用。
 */
export function getDefaultMonthParam() {
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const y = prev.getFullYear();
  const m = String(prev.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/**
 * 将 hex 颜色（如 #0ea5e9）转为 rgba 字符串。
 * 格式非法时返回灰色。
 */
export function hexToRgba(hex: string, alpha: number) {
  const cleaned = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return `rgba(113,113,122,${alpha})`;
  }
  const r = Number.parseInt(cleaned.slice(0, 2), 16);
  const g = Number.parseInt(cleaned.slice(2, 4), 16);
  const b = Number.parseInt(cleaned.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
