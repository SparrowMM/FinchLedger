"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TransactionEditDialog,
  type EditDialogInitial,
} from "@/components/transaction-edit-dialog";
import { formatDateTimeInChina } from "@/lib/china-time";
import {
  type ApiTransactionsResponse,
  type CategoryMeta,
  getDefaultMonthParam,
  hexToRgba,
} from "@/lib/shared-types";

type Expense = {
  id: string;
  date: string;
  time?: string;
  category: string;
  merchant?: string;
  method?: string;
  amount: number;
  currency: string;
  note?: string;
};

export default function ExpensesPage() {
  const [month, setMonth] = useState<string>(getDefaultMonthParam());
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalFromApi, setTotalFromApi] = useState<number>(0);
  const [sortKey, setSortKey] = useState<"date" | "amount" | "category">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editInitial, setEditInitial] = useState<EditDialogInitial | null>(null);
  const [categoryMetas, setCategoryMetas] = useState<CategoryMeta[]>([]);
  const [paymentMethodMetas, setPaymentMethodMetas] = useState<CategoryMeta[]>(
    []
  );

  const expenseLoadIdRef = useRef(0);

  const runExpenseLoad = useCallback(async () => {
    const loadId = ++expenseLoadIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("type", "expense");
      if (month) {
        params.set("month", month);
      }
      const res = await fetch(`/api/transactions?${params.toString()}`);
      if (!res.ok) {
        throw new Error("加载支出数据失败");
      }
      const data: ApiTransactionsResponse = await res.json();

      if (loadId !== expenseLoadIdRef.current) {
        return;
      }

      const mapped: Expense[] = data.transactions.map((t) => {
        const { date: datePart, time: timePart } = formatDateTimeInChina(
          new Date(t.date)
        );
        return {
          id: t.id,
          date: datePart,
          time: timePart,
          category: t.category,
          merchant: t.name,
          method: t.account,
          amount: t.amount,
          currency: "CNY",
          note: t.note ?? undefined,
        };
      });

      setExpenses(mapped);
      setTotalFromApi(data.summary.expense);
    } catch (e) {
      if (loadId !== expenseLoadIdRef.current) {
        return;
      }
      setError(e instanceof Error ? e.message : "加载支出数据失败");
    } finally {
      if (loadId === expenseLoadIdRef.current) {
        setLoading(false);
      }
    }
  }, [month]);

  useEffect(() => {
    void runExpenseLoad();
  }, [runExpenseLoad]);

  useEffect(() => {
    let cancelled = false;
    async function loadCategoryMetas() {
      try {
        const res = await fetch("/api/expense-categories");
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.categories) return;
        if (!cancelled) {
          setCategoryMetas(json.categories as CategoryMeta[]);
        }
      } catch {
        // ignore category meta load errors on list page
      }
    }
    loadCategoryMetas();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadPaymentMethodMetas() {
      try {
        const res = await fetch("/api/payment-methods");
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.methods) return;
        if (!cancelled) {
          setPaymentMethodMetas(json.methods as CategoryMeta[]);
        }
      } catch {
        // ignore payment method meta load errors on list page
      }
    }
    loadPaymentMethodMetas();
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryMetaMap = useMemo(
    () => new Map(categoryMetas.map((item) => [item.name, item] as const)),
    [categoryMetas]
  );
  const paymentMethodMetaMap = useMemo(
    () => new Map(paymentMethodMetas.map((item) => [item.name, item] as const)),
    [paymentMethodMetas]
  );

  const categoryOptions = Array.from(
    new Set(expenses.map((item) => item.category))
  ).sort((a, b) => a.localeCompare(b, "zh-CN"));

  const filtered = expenses.filter((e) => {
    if (month && !e.date.startsWith(month)) {
      return false;
    }
    if (selectedCategory !== "all" && e.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === "category") {
      const categoryCompare = a.category.localeCompare(b.category, "zh-CN");
      if (categoryCompare !== 0) {
        return sortDirection === "asc" ? categoryCompare : -categoryCompare;
      }
      const aDate = new Date(`${a.date}T${a.time || "00:00"}`).getTime();
      const bDate = new Date(`${b.date}T${b.time || "00:00"}`).getTime();
      return bDate - aDate;
    }

    if (sortKey === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }

    const aDate = new Date(`${a.date}T${a.time || "00:00"}`).getTime();
    const bDate = new Date(`${b.date}T${b.time || "00:00"}`).getTime();
    return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
  });

  function handleSort(key: "date" | "amount" | "category") {
    if (sortKey === key) {
      setSortDirection((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("desc");
  }

  async function handleDelete(expense: Expense) {
    const ok = window.confirm(
      `确认删除这笔支出吗？\n\n${expense.date} ${expense.time || ""}\n${
        expense.merchant || "未命名"
      }\n-${expense.amount.toFixed(2)} ${expense.currency}`
    );
    if (!ok) return;

    setDeletingId(expense.id);
    try {
      const res = await fetch(
        `/api/transactions/${encodeURIComponent(expense.id)}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || "删除支出失败");
      }
      setExpenses((prev) => prev.filter((item) => item.id !== expense.id));
      setTotalFromApi((prev) => Math.max(0, prev - expense.amount));
    } catch (e) {
      setError(e instanceof Error ? e.message : "删除支出失败");
    } finally {
      setDeletingId(null);
    }
  }

  const total =
    filtered.length > 0
      ? filtered.reduce((sum, e) => sum + e.amount, 0)
      : totalFromApi;
  const isInitialLoading = loading && expenses.length === 0 && !error;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            支出流水
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            按时间和分类查看你的支出记录，后续可以与 AI
            解析结果打通并接入真实数据源。
          </p>
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
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              分类筛选
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-8 rounded-full border border-zinc-200 bg-white px-3 text-xs outline-none ring-0 ring-offset-0 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500"
            >
              <option value="all">全部分类</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            列表支持编辑、删除已导入或手动的记录。
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-1">
          <div className="text-xs font-medium text-zinc-500">当前筛选支出</div>
          <div className="mt-2 text-2xl font-semibold text-red-500">
            -¥ {total.toFixed(2)}
          </div>
          <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            共 {filtered.length} 笔
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">支出明细</h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                显示来自数据库的真实支出记录，后续可以在这里接入分页、搜索、导出等功能。
              </p>
            </div>
            {loading && (
              <span className="text-[11px] text-zinc-400">加载中...</span>
            )}
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-zinc-100 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <tr>
                  <th className="py-2 pr-4">
                    <button
                      type="button"
                      className="flex items-center gap-1"
                      onClick={() => handleSort("date")}
                    >
                      <span>日期</span>
                      <span className="text-[10px] text-zinc-400">
                        {sortKey === "date"
                          ? sortDirection === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="py-2 pr-4">时间</th>
                  <th className="py-2 pr-4">
                    <button
                      type="button"
                      className="flex items-center gap-1"
                      onClick={() => handleSort("category")}
                    >
                      <span>分类</span>
                      <span className="text-[10px] text-zinc-400">
                        {sortKey === "category"
                          ? sortDirection === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="py-2 pr-4">商家 / 备注</th>
                  <th className="py-2 pr-4">支付方式</th>
                  <th className="py-2 text-right">
                    <button
                      type="button"
                      className="flex w-full items-center justify-end gap-1"
                      onClick={() => handleSort("amount")}
                    >
                      <span>金额</span>
                      <span className="text-[10px] text-zinc-400">
                        {sortKey === "amount"
                          ? sortDirection === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="py-2 pl-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {isInitialLoading ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <tr key={`expense-loading-${idx}`}>
                      <td colSpan={7} className="py-2">
                        <div className="h-8 w-full animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-900" />
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  <tr>
                    <td
                      className="py-6 text-center text-xs text-red-500"
                      colSpan={7}
                    >
                      {error}
                    </td>
                  </tr>
                ) : filtered.length ? (
                  sorted.map((e) => (
                    <tr key={e.id}>
                      <td className="py-2 pr-4">{e.date}</td>
                      <td className="py-2 pr-4">
                        {e.time || (
                          <span className="text-[10px] text-zinc-400">—</span>
                        )}
                      </td>
                      <td className="py-2 pr-4">
                        {(() => {
                          const meta = categoryMetaMap.get(e.category);
                          if (!meta) {
                            return (
                              <div className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-[10px] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                                {e.category}
                              </div>
                            );
                          }
                          return (
                            <div
                              className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-medium"
                              style={{
                                backgroundColor: hexToRgba(meta.color, 0.15),
                                borderColor: hexToRgba(meta.color, 0.35),
                                color: meta.color,
                              }}
                            >
                              <span>{meta.icon}</span>
                              <span>{meta.name}</span>
                            </div>
                          );
                        })()}
                      </td>
                      <td className="py-2 pr-4">
                        <div>{e.merchant || "—"}</div>
                        {e.note && (
                          <div className="mt-0.5 text-[10px] text-zinc-400">
                            {e.note}
                          </div>
                        )}
                      </td>
                      <td className="py-2 pr-4">
                        {(() => {
                          const meta = paymentMethodMetaMap.get(e.method || "");
                          if (!meta) {
                            return (
                              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                                {e.method || "未记录"}
                              </span>
                            );
                          }
                          return (
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] text-white"
                              style={{ backgroundColor: meta.color }}
                            >
                              <span>{meta.icon}</span>
                              <span>{meta.name}</span>
                            </span>
                          );
                        })()}
                      </td>
                      <td className="py-2 text-right">
                        <span className="font-medium text-red-500">
                          -{e.amount.toFixed(2)} {e.currency}
                        </span>
                      </td>
                      <td className="py-2 pl-4 text-right">
                        <div className="flex flex-wrap justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setEditInitial({
                                id: e.id,
                                date: e.date,
                                time: e.time,
                                title: e.merchant || "",
                                category: e.category,
                                method: e.method || "",
                                amount: e.amount,
                                note: e.note,
                              })
                            }
                            className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                          >
                            编辑
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(e)}
                            disabled={deletingId === e.id}
                            className="rounded-full border border-red-200 px-2 py-0.5 text-[10px] text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/40 dark:hover:bg-red-950/40"
                          >
                            {deletingId === e.id ? "删除中..." : "删除"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="py-6 text-center text-xs text-zinc-400"
                      colSpan={7}
                    >
                      当前筛选条件下暂无支出记录，后续可在此创建或从 AI
                      解析结果一键导入。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TransactionEditDialog
        open={editInitial !== null}
        variant="expense"
        categoryMetas={categoryMetas}
        paymentMethodMetas={paymentMethodMetas}
        initial={editInitial}
        onClose={() => setEditInitial(null)}
        onSaved={() => {
          void runExpenseLoad();
        }}
      />
    </div>
  );
}

