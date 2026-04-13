"use client";

import { type FormEvent, useEffect, useState } from "react";
import type { ApiTransaction, CategoryMeta } from "@/lib/shared-types";

export type EditDialogInitial = {
  id: string;
  date: string;
  time?: string;
  title: string;
  category: string;
  method: string;
  amount: number;
  note?: string;
};

type Props = {
  open: boolean;
  variant: "expense" | "income";
  categoryMetas: CategoryMeta[];
  paymentMethodMetas: CategoryMeta[];
  initial: EditDialogInitial | null;
  onClose: () => void;
  onSaved: (tx: ApiTransaction) => void;
};

function categorySelectNames(
  metas: CategoryMeta[],
  current: string
): string[] {
  const set = new Set(metas.map((m) => m.name));
  if (current && !set.has(current)) {
    set.add(current);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function paymentSelectNames(
  metas: CategoryMeta[],
  current: string
): string[] {
  const set = new Set(metas.map((m) => m.name));
  if (current && !set.has(current)) {
    set.add(current);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function TransactionEditDialog({
  open,
  variant,
  categoryMetas,
  paymentMethodMetas,
  initial,
  onClose,
  onSaved,
}: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !initial) return;
    setDate(initial.date);
    setTime(initial.time?.trim() || "");
    setTitle(initial.title);
    setCategory(initial.category);
    setMethod(initial.method || "");
    setAmount(String(initial.amount));
    setNote(initial.note ?? "");
    setError(null);
  }, [open, initial]);

  if (!open || !initial) {
    return null;
  }

  const categoryNames = categorySelectNames(categoryMetas, category);
  const methodNames = paymentSelectNames(paymentMethodMetas, method);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!initial) {
      return;
    }
    const transactionId = initial.id;

    const amountNum = Number.parseFloat(amount);
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      setError("请输入有效的金额（大于 0）。");
      return;
    }

    const nameTrim = title.trim();
    if (!nameTrim) {
      setError(variant === "expense" ? "请填写商家或摘要。" : "请填写收入来源。");
      return;
    }

    const categoryTrim = category.trim();
    if (!categoryTrim) {
      setError("请选择或填写分类。");
      return;
    }

    const methodTrim = method.trim();
    if (!methodTrim) {
      setError(
        variant === "expense" ? "请选择支付方式。" : "请选择收款方式。"
      );
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        `/api/transactions/${encodeURIComponent(transactionId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            time: time.trim() || undefined,
            name: nameTrim,
            category: categoryTrim,
            account: methodTrim,
            amount: amountNum,
            note: note.trim() || null,
          }),
        }
      );
      const payload = (await res.json().catch(() => null)) as
        | { error?: string; transaction?: ApiTransaction }
        | null;
      if (!res.ok) {
        throw new Error(payload?.error || "保存失败");
      }
      if (!payload?.transaction) {
        throw new Error("保存失败：响应数据不完整");
      }
      onSaved(payload.transaction);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        aria-label="关闭"
        onClick={() => !saving && onClose()}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {variant === "expense" ? "编辑支出" : "编辑收入"}
        </h2>
        <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
          修改已保存到数据库的流水记录（含从 AI 导入的条目）。
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-[11px] text-zinc-600 dark:text-zinc-400">
              日期
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </label>
            <label className="block text-[11px] text-zinc-600 dark:text-zinc-400">
              时间（可选）
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </label>
          </div>

          <label className="block text-[11px] text-zinc-600 dark:text-zinc-400">
            {variant === "expense" ? "商家 / 摘要" : "收入来源"}
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </label>

          <label className="block text-[11px] text-zinc-600 dark:text-zinc-400">
            分类
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {categoryNames.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-[11px] text-zinc-600 dark:text-zinc-400">
            {variant === "expense" ? "支付方式" : "收款方式"}
            <select
              required
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {methodNames.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-[11px] text-zinc-600 dark:text-zinc-400">
            金额（元）
            <input
              type="number"
              required
              min={0.01}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </label>

          <label className="block text-[11px] text-zinc-600 dark:text-zinc-400">
            备注（可选）
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </label>

          {error && (
            <p className="text-[11px] text-red-500" role="alert">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => onClose()}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-[11px] text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-zinc-900 px-3 py-1.5 text-[11px] text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {saving ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
