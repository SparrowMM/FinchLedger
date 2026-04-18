"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDateTimeInChina } from "@/lib/china-time";
import {
  type ApiTransaction,
  type ApiTransactionsResponse,
  type CategoryMeta,
  getDefaultMonthParam,
} from "@/lib/shared-types";

type AiTransaction = {
  type: "income" | "expense";
  date: string;
  time: string;
  amount: number;
  currency: string;
  category: string;
  merchant: string;
  method: string;
  note: string;
};

type AiAnalysisObject = {
  overview: string;
  byCategory: string;
  byTime: string;
  habitInsights: string;
  riskAlerts: string;
  suggestions: string;
};

type AiAnalysis = {
  transactions: AiTransaction[];
  analysis: AiAnalysisObject;
};
 
type CategoryChartItem = {
  name: string;
  value: number;
  color: string;
};

type PieTooltipPayload = {
  percent?: number;
};

type MonthlyTrendItem = {
  month: string;
  income: number;
  expense: number;
};

type ApiExpenseCategory = CategoryMeta;

type ApiPaymentMethod = CategoryMeta;

const CATEGORY_COLORS: string[] = [
  "#0ea5e9", // sky-500
  "#22c55e", // emerald-500
  "#f97316", // orange-500
  "#a855f7", // purple-500
  "#eab308", // yellow-500
  "#ec4899", // pink-500
  "#64748b", // slate-500
];

export default function Home() {
  const [month, setMonth] = useState<string>(getDefaultMonthParam());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiTransactionsResponse | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysis | null>(null);
  const [aiCreatedAt, setAiCreatedAt] = useState<string | null>(null);
  const [expenseCategories, setExpenseCategories] = useState<ApiExpenseCategory[]>(
    []
  );
  const [paymentMethods, setPaymentMethods] = useState<ApiPaymentMethod[]>([]);
  const monthLabel = month ? `${month} 月` : "全部月份";

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (month) {
          params.set("month", month);
        }
        const query = params.toString();
        const url = query ? `/api/transactions?${query}` : "/api/transactions";
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("加载交易数据失败");
        }
        const json: ApiTransactionsResponse = await res.json();
        setData(json);
      } catch (e) {
        if (controller.signal.aborted) {
          return;
        }
        setError(e instanceof Error ? e.message : "加载交易数据失败");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      controller.abort();
    };
  }, [month]);

  useEffect(() => {
    let cancelled = false;
    async function loadCategories() {
      try {
        const res = await fetch("/api/expense-categories");
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.categories) return;
        if (!cancelled) {
          setExpenseCategories(json.categories as ApiExpenseCategory[]);
        }
      } catch {
        // ignore category meta load errors in dashboard
      }
    }
    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadPaymentMethods() {
      try {
        const res = await fetch("/api/payment-methods");
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.methods) return;
        if (!cancelled) {
          setPaymentMethods(json.methods as ApiPaymentMethod[]);
        }
      } catch {
        // ignore payment method meta load errors in dashboard
      }
    }
    loadPaymentMethods();
    return () => {
      cancelled = true;
    };
  }, []);

  const expenseCategoryColorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of expenseCategories) {
      map.set(item.name, item.color);
    }
    return map;
  }, [expenseCategories]);

  const paymentMethodMap = useMemo(() => {
    const map = new Map<string, ApiPaymentMethod>();
    for (const item of paymentMethods) {
      map.set(item.name, item);
    }
    return map;
  }, [paymentMethods]);

  const income = data?.summary.income ?? 0;
  const expense = data?.summary.expense ?? 0;
  const balance = data?.summary.balance ?? 0;

  const expenseCategoryData: CategoryChartItem[] = useMemo(() => {
    if (!data?.transactions.length) return [];
    const expenseTx = data.transactions.filter((t) => t.type === "expense");
    if (!expenseTx.length) return [];

    const map = new Map<string, number>();
    for (const t of expenseTx) {
      const key = t.category || "未分类";
      map.set(key, (map.get(key) ?? 0) + t.amount);
    }

    const entries = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

    return entries.map(([name, value], idx) => ({
      name,
      value,
      color:
        expenseCategoryColorMap.get(name) ??
        CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
    }));
  }, [data, expenseCategoryColorMap]);

  const incomeCategoryData: CategoryChartItem[] = useMemo(() => {
    if (!data?.transactions.length) return [];
    const incomeTx = data.transactions.filter((t) => t.type === "income");
    if (!incomeTx.length) return [];

    const map = new Map<string, number>();
    for (const t of incomeTx) {
      const key = t.category || "未分类";
      map.set(key, (map.get(key) ?? 0) + t.amount);
    }

    const entries = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

    return entries.map(([name, value], idx) => ({
      name,
      value,
      color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
    }));
  }, [data]);

  const monthlyTrendData: MonthlyTrendItem[] = useMemo(() => {
    if (!data?.transactions.length) return [];

    const expenseMap = new Map<string, number>();
    const incomeMap = new Map<string, number>();

    for (const t of data.transactions) {
      const { date } = formatDateTimeInChina(new Date(t.date));
      const monthLabel = date.slice(0, 7); // YYYY-MM
      if (t.type === "expense") {
        expenseMap.set(
          monthLabel,
          (expenseMap.get(monthLabel) ?? 0) + t.amount
        );
      } else if (t.type === "income") {
        incomeMap.set(monthLabel, (incomeMap.get(monthLabel) ?? 0) + t.amount);
      }
    }

    const labelSet = new Set<string>([
      ...Array.from(expenseMap.keys()),
      ...Array.from(incomeMap.keys()),
    ]);
    const labels = Array.from(labelSet).sort();

    return labels.map((label) => {
      const month = label.split("-")[1]?.replace(/^0/, "") ?? label;
      return {
        month: `${month}月`,
        income: incomeMap.get(label) ?? 0,
        expense: expenseMap.get(label) ?? 0,
      };
    });
  }, [data]);

  const recentTransactions: ApiTransaction[] =
    data?.transactions.slice(0, 5) ?? [];

  async function handleLoadAiAnalysis() {
    setAiLoading(true);
    setAiError(null);
    try {
      const params: Record<string, string> = {};
      if (month) {
        params.month = month;
      }
      const query = new URLSearchParams(params).toString();
      const url = query
        ? `/api/ai-expense-analysis?${query}`
        : "/api/ai-expense-analysis";
      const res = await fetch(url);
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.error || "加载 AI 分析失败");
      }
      if (json?.analysis) {
        setAiAnalysis(json.analysis as AiAnalysis);
        setAiCreatedAt(
          typeof json.createdAt === "string" ? json.createdAt : null
        );
      } else {
        setAiAnalysis(null);
        setAiCreatedAt(null);
      }
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "加载 AI 分析失败");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleGenerateAiAnalysis() {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai-expense-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ month: month || undefined }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.error || "生成 AI 分析失败");
      }
      setAiAnalysis((json?.analysis as AiAnalysis) ?? null);
      setAiCreatedAt(
        typeof json?.createdAt === "string" ? json.createdAt : null
      );
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "生成 AI 分析失败");
    } finally {
      setAiLoading(false);
    }
  }

  const aiExpenseCategorySummary = useMemo(() => {
    if (!aiAnalysis?.transactions?.length) return [];
    const expenses = aiAnalysis.transactions.filter(
      (t) => t.type === "expense"
    );
    if (!expenses.length) return [];
    const map = new Map<string, number>();
    for (const t of expenses) {
      const key = t.category || "未分类";
      map.set(key, (map.get(key) ?? 0) + t.amount);
    }
    const entries = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    const top = entries.slice(0, 5);
    const total = top.reduce((sum, [, v]) => sum + v, 0);
    return top.map(([name, value]) => ({
      name,
      value,
      percent: total ? (value / total) * 100 : 0,
    }));
  }, [aiAnalysis]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            总览
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            快速查看所选月份的收入、支出与结余，以及分类分布和按月趋势，所有数据均来自数据库中的真实交易记录。
          </p>
          {loading && (
            <p className="mt-1 text-xs text-zinc-400">正在加载最新数据...</p>
          )}
          {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              选择月份
            </span>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-8 rounded-full border border-zinc-200 bg-white px-3 text-xs outline-none ring-0 ring-offset-0 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500"
            />
          </div>
          <button
            type="button"
            onClick={() => setMonth("")}
            className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            查看全部月份
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs font-medium text-zinc-500">{monthLabel}收入</div>
          <div className="mt-2 text-2xl font-semibold">
            ¥ {income.toFixed(2)}
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs font-medium text-zinc-500">{monthLabel}支出</div>
          <div className="mt-2 text-2xl font-semibold text-red-500">
            -¥ {expense.toFixed(2)}
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs font-medium text-zinc-500">{monthLabel}结余</div>
          <div className="mt-2 text-2xl font-semibold">
            ¥ {balance.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-medium text-zinc-500">
              AI 月度收支分析
            </div>
            <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
              基于数据库中当前月份的真实收入与支出流水，由 AI 生成总结与现金流建议，并将结果落入数据库方便后续查看。
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleLoadAiAnalysis}
                disabled={aiLoading}
                className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                {aiLoading ? "加载中..." : "查看已有分析"}
              </button>
              <button
                type="button"
                onClick={handleGenerateAiAnalysis}
                disabled={aiLoading}
                className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
              >
                {aiLoading ? "AI 正在分析..." : "生成 / 更新本月 AI 分析"}
              </button>
            </div>
            {aiCreatedAt && (
              <span className="text-[10px] text-zinc-400">
                最近生成时间：{new Date(aiCreatedAt).toLocaleString()}
              </span>
            )}
            {aiError && (
              <span className="text-[10px] text-red-500">{aiError}</span>
            )}
          </div>
        </div>
        {aiAnalysis && (
          <div className="mt-3 grid gap-4 text-sm md:grid-cols-2">
            <div className="space-y-2 rounded-xl bg-zinc-50 p-3 leading-relaxed text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
              <div>
                <div className="text-xs font-semibold text-zinc-500">
                  总览
                </div>
                <p className="mt-1 whitespace-pre-wrap">
                  {aiAnalysis.analysis.overview}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-500">
                  分类结构
                </div>
                <p className="mt-1 whitespace-pre-wrap">
                  {aiAnalysis.analysis.byCategory}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-500">
                  时间特征
                </div>
                <p className="mt-1 whitespace-pre-wrap">
                  {aiAnalysis.analysis.byTime}
                </p>
              </div>
            </div>
            <div className="space-y-3 rounded-xl bg-zinc-50 p-3 leading-relaxed text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
              <div>
                <div className="text-xs font-semibold text-zinc-500">
                  消费习惯洞察
                </div>
                <p className="mt-1 whitespace-pre-wrap">
                  {aiAnalysis.analysis.habitInsights}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-500">
                  风险提示
                </div>
                <p className="mt-1 whitespace-pre-wrap">
                  {aiAnalysis.analysis.riskAlerts}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-500">
                  优化建议
                </div>
                <p className="mt-1 whitespace-pre-wrap">
                  {aiAnalysis.analysis.suggestions}
                </p>
              </div>
              {aiExpenseCategorySummary.length > 0 && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-500">
                      AI 视角下的重点支出分类
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {aiExpenseCategorySummary.map((item) => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">{item.name}</span>
                          <span className="text-xs text-zinc-500">
                            {item.percent.toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-0.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800">
                          <div
                            className="h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"
                            style={{ width: `${Math.min(item.percent, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">收入分类分布</h2>
              <p className="mt-1 text-xs text-zinc-500">
                使用 Recharts 展示本月各分类收入占比。
              </p>
            </div>
          </div>
          <div className="mt-4 h-72">
            {incomeCategoryData.length ? (
              <div className="grid h-full gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incomeCategoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      cornerRadius={6}
                      labelLine={false}
                    >
                      {incomeCategoryData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name, props) => {
                        const amount = value as number;
                        const payload = (props as { payload?: PieTooltipPayload })
                          ?.payload;
                        const percent =
                          typeof payload?.percent === "number"
                            ? payload.percent * 100
                            : NaN;
                        const percentText = Number.isNaN(percent)
                          ? ""
                          : ` (${percent.toFixed(1)}%)`;
                        return [
                          `¥ ${amount.toFixed(2)}${percentText}`,
                          "金额",
                        ];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex max-h-64 flex-col space-y-2 overflow-y-auto pr-1 text-xs">
                  {(() => {
                    const total = incomeCategoryData.reduce((sum, item) => sum + item.value, 0);
                    const items = incomeCategoryData.slice(0, 8);
                    return items.map((item) => {
                      const percent = total
                        ? (item.value / total) * 100
                        : 0;
                      return (
                        <div
                          key={item.name}
                          className="flex items-center justify-between gap-3 rounded-lg bg-zinc-50 px-2 py-1.5 dark:bg-zinc-900"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="truncate text-[11px]">
                              {item.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] font-medium">
                              ¥ {item.value.toFixed(2)}
                            </div>
                            <div className="text-[10px] text-zinc-500">
                              {percent.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                暂无收入数据
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">支出分类分布</h2>
              <p className="mt-1 text-xs text-zinc-500">
                使用 Recharts 展示本月各分类支出占比。
              </p>
            </div>
          </div>
          <div className="mt-4 h-72">
            {expenseCategoryData.length ? (
              <div className="grid h-full gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseCategoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      cornerRadius={6}
                      labelLine={false}
                    >
                      {expenseCategoryData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name, props) => {
                        const amount = value as number;
                        const payload = (props as { payload?: PieTooltipPayload })
                          ?.payload;
                        const percent =
                          typeof payload?.percent === "number"
                            ? payload.percent * 100
                            : NaN;
                        const percentText = Number.isNaN(percent)
                          ? ""
                          : ` (${percent.toFixed(1)}%)`;
                        return [
                          `¥ ${amount.toFixed(2)}${percentText}`,
                          "金额",
                        ];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex max-h-64 flex-col space-y-2 overflow-y-auto pr-1 text-xs">
                  {(() => {
                    const total = expenseCategoryData.reduce((sum, item) => sum + item.value, 0);
                    const items = expenseCategoryData.slice(0, 8);
                    return items.map((item) => {
                      const percent = total
                        ? (item.value / total) * 100
                        : 0;
                      return (
                        <div
                          key={item.name}
                          className="flex items-center justify-between gap-3 rounded-lg bg-zinc-50 px-2 py-1.5 dark:bg-zinc-900"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="truncate text-[11px]">
                              {item.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] font-medium">
                              ¥ {item.value.toFixed(2)}
                            </div>
                            <div className="text-[10px] text-zinc-500">
                              {percent.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                暂无支出数据
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">按月收支趋势</h2>
              <p className="mt-1 text-xs text-zinc-500">
                使用折线图展示最近数月的收入与支出走势，适合按月查看现金流节奏。
              </p>
            </div>
          </div>
          <div className="mt-4 h-56">
            {monthlyTrendData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-zinc-100 dark:stroke-zinc-800"
                  />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `¥${value}`}
                  />
                  <Tooltip
                    formatter={(value: number, name) => {
                      const label =
                        name === "income"
                          ? "收入"
                          : name === "expense"
                            ? "支出"
                            : name;
                      return [`¥ ${value.toFixed(2)}`, label];
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    name="收入"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    name="支出"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                当前筛选条件暂无可展示的月度趋势
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium">最近交易记录</h2>
            <p className="mt-1 text-xs text-zinc-500">
                创建交易后，这里会展示最近几笔收入和支出，数据来自数据库中的最新记录。
            </p>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 p-4 text-xs dark:border-zinc-800">
          {recentTransactions.length ? (
            <table className="min-w-full text-left">
              <thead className="border-b border-zinc-100 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <tr>
                  <th className="py-2 pr-4">日期</th>
                  <th className="py-2 pr-4">时间</th>
                  <th className="py-2 pr-4">名称</th>
                  <th className="py-2 pr-4">账户</th>
                  <th className="py-2 text-right">金额</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {recentTransactions.map((t) => {
                  const { date: datePart, time: timePart } =
                    formatDateTimeInChina(new Date(t.date));
                  const isIncome = t.type === "income";
                  return (
                    <tr key={t.id}>
                      <td className="py-2 pr-4">{datePart}</td>
                      <td className="py-2 pr-4">
                        {timePart || (
                          <span className="text-[10px] text-zinc-400">—</span>
                        )}
                      </td>
                      <td className="py-2 pr-4">{t.name}</td>
                      <td className="py-2 pr-4">
                        {(() => {
                          const method = paymentMethodMap.get(t.account);
                          if (!method) {
                            return (
                              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                                {t.account}
                              </span>
                            );
                          }
                          return (
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] text-white"
                              style={{ backgroundColor: method.color }}
                            >
                              <span>{method.icon}</span>
                              <span>{method.name}</span>
                            </span>
                          );
                        })()}
                      </td>
                      <td className="py-2 text-right">
                        <span
                          className={
                            "font-medium " +
                            (isIncome ? "text-emerald-500" : "text-red-500")
                          }
                        >
                          {isIncome ? "+" : "-"}
                          {t.amount.toFixed(2)} CNY
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="py-6 text-center text-xs text-zinc-400">
              暂无记录，请先在「支出流水 / 收入流水 / AI 自动记账」中新增交易。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
