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

type Income = {
  id: string;
  date: string;
  time?: string;
  source: string;
  category: string;
  method?: string;
  amount: number;
  currency: string;
  note?: string;
};

export default function IncomePage() {
  const [month, setMonth] = useState<string>(getDefaultMonthParam());
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalFromApi, setTotalFromApi] = useState<number>(0);
  const [sortKey, setSortKey] = useState<"date" | "amount" | "category">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editInitial, setEditInitial] = useState<EditDialogInitial | null>(
    null
  );
  const [incomeCategoryMetas, setIncomeCategoryMetas] = useState<
    CategoryMeta[]
  >([]);
  const [paymentMethodMetas, setPaymentMethodMetas] = useState<CategoryMeta[]>(
    []
  );

  const incomeLoadIdRef = useRef(0);

  const runIncomeLoad = useCallback(async () => {
    const loadId = ++incomeLoadIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("type", "income");
      if (month) {
        params.set("month", month);
      }
      const res = await fetch(`/api/transactions?${params.toString()}`);
      if (!res.ok) {
        throw new Error("加载收入数据失败");
      }
      const data: ApiTransactionsResponse = await res.json();

      if (loadId !== incomeLoadIdRef.current) {
        return;
      }

      const mapped: Income[] = data.transactions.map((t) => {
        const { date: datePart, time: timePart } = formatDateTimeInChina(
          new Date(t.date)
        );
        return {
          id: t.id,
          date: datePart,
          time: timePart,
          source: t.name,
          category: t.category,
          method: t.account,
          amount: t.amount,
          currency: "CNY",
          note: t.note ?? undefined,
        };
      });

      setIncomes(mapped);
      setTotalFromApi(data.summary.income);
    } catch (e) {
      if (loadId !== incomeLoadIdRef.current) {
        return;
      }
      setError(e instanceof Error ? e.message : "加载收入数据失败");
    } finally {
      if (loadId === incomeLoadIdRef.current) {
        setLoading(false);
      }
    }
  }, [month]);

  useEffect(() => {
    void runIncomeLoad();
  }, [runIncomeLoad]);

  useEffect(() => {
    let cancelled = false;
    async function loadIncomeCategoryMetas() {
      try {
        const res = await fetch("/api/income-categories");
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.categories) return;
        if (!cancelled) {
          setIncomeCategoryMetas(json.categories as CategoryMeta[]);
        }
      } catch {
        // ignore category meta load errors on list page
      }
    }
    loadIncomeCategoryMetas();
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

  const paymentMethodMetaMap = useMemo(
    () => new Map(paymentMethodMetas.map((item) => [item.name, item] as const)),
    [paymentMethodMetas]
  );
  const incomeCategoryMetaMap = useMemo(
    () => new Map(incomeCategoryMetas.map((item) => [item.name, item] as const)),
    [incomeCategoryMetas]
  );
  const categoryOptions = Array.from(
    new Set(incomes.map((item) => item.category))
  ).sort((a, b) => a.localeCompare(b, "zh-CN"));

  const filtered = incomes.filter((i) => {
    if (month && !i.date.startsWith(month)) {
      return false;
    }
    if (selectedCategory !== "all" && i.category !== selectedCategory) {
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

  async function handleDelete(income: Income) {
    const ok = window.confirm(
      `确认删除这笔收入吗？\n\n${income.date} ${income.time || ""}\n${
        income.source || "未命名"
      }\n+${income.amount.toFixed(2)} ${income.currency}`
    );
    if (!ok) return;

    setDeletingId(income.id);
    try {
      const res = await fetch(
        `/api/transactions/${encodeURIComponent(income.id)}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || "删除收入失败");
      }
      setIncomes((prev) => prev.filter((item) => item.id !== income.id));
      setTotalFromApi((prev) => Math.max(0, prev - income.amount));
    } catch (e) {
      setError(e instanceof Error ? e.message : "删除收入失败");
    } finally {
      setDeletingId(null);
    }
  }

  const total =
    filtered.length > 0
      ? filtered.reduce((sum, i) => sum + i.amount, 0)
      : totalFromApi;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            收入流水
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            汇总你的工资、奖金、副业等收入，方便后续做结余和现金流分析。
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
          <div className="text-xs font-medium text-zinc-500">当前筛选收入</div>
          <div className="mt-2 text-2xl font-semibold text-emerald-500">
            +¥ {total.toFixed(2)}
          </div>
          <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            共 {filtered.length} 笔
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">收入明细</h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                这里可以拓展为导入工资条、发票数据，或从 AI
                自动记账结果中一键同步。
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
                  <th className="py-2 pr-4">收入来源</th>
                  <th className="py-2 pr-4">备注</th>
                  <th className="py-2 pr-4">收款方式</th>
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
                {error ? (
                  <tr>
                    <td
                      className="py-6 text-center text-xs text-red-500"
                      colSpan={8}
                    >
                      {error}
                    </td>
                  </tr>
                ) : filtered.length ? (
                  sorted.map((i) => (
                    <tr key={i.id}>
                      <td className="py-2 pr-4">{i.date}</td>
                      <td className="py-2 pr-4">
                        {i.time || (
                          <span className="text-[10px] text-zinc-400">—</span>
                        )}
                      </td>
                      <td className="py-2 pr-4">
                        {(() => {
                          const meta = incomeCategoryMetaMap.get(i.category);
                          if (!meta) {
                            return (
                              <div className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-[10px] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                                {i.category}
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
                      <td className="py-2 pr-4">{i.source}</td>
                      <td className="py-2 pr-4">
                        {i.note || (
                          <span className="text-[10px] text-zinc-400">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-4">
                        {(() => {
                          const meta = paymentMethodMetaMap.get(i.method || "");
                          if (!meta) {
                            return (
                              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                                {i.method || "未记录"}
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
                        <span className="font-medium text-emerald-500">
                          +{i.amount.toFixed(2)} {i.currency}
                        </span>
                      </td>
                      <td className="py-2 pl-4 text-right">
                        <div className="flex flex-wrap justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setEditInitial({
                                id: i.id,
                                date: i.date,
                                time: i.time,
                                title: i.source || "",
                                category: i.category,
                                method: i.method || "",
                                amount: i.amount,
                                note: i.note,
                              })
                            }
                            className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                          >
                            编辑
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(i)}
                            disabled={deletingId === i.id}
                            className="rounded-full border border-red-200 px-2 py-0.5 text-[10px] text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/40 dark:hover:bg-red-950/40"
                          >
                            {deletingId === i.id ? "删除中..." : "删除"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="py-6 text-center text-xs text-zinc-400"
                      colSpan={8}
                    >
                      当前筛选条件下暂无收入记录，可以在此创建或从 AI
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
        variant="income"
        categoryMetas={incomeCategoryMetas}
        paymentMethodMetas={paymentMethodMetas}
        initial={editInitial}
        onClose={() => setEditInitial(null)}
        onSaved={() => {
          void runIncomeLoad();
        }}
      />
    </div>
  );
}

