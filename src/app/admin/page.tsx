"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getDefaultMonthParam } from "@/lib/shared-types";

type DeleteScope = "all-expense" | "all-income" | "month";

type ConfirmAction = {
  scope: DeleteScope;
  month?: string;
} | null;

type DeleteResult = {
  deletedCount: number;
  scope: DeleteScope;
  month?: string;
};

function getActionLabel(scope: DeleteScope, month?: string) {
  if (scope === "all-expense") return "清空全部支出流水";
  if (scope === "all-income") return "清空全部收入流水";
  return `清空 ${month || "指定月份"} 的全部流水`;
}

export default function AdminPage() {
  const [month, setMonth] = useState<string>(getDefaultMonthParam());
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [ackChecked, setAckChecked] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DeleteResult | null>(null);

  const canSubmit = useMemo(() => {
    return Boolean(confirmAction) && ackChecked && confirmText.trim() === "DELETE";
  }, [confirmAction, ackChecked, confirmText]);

  function openConfirm(scope: DeleteScope) {
    setError(null);
    setResult(null);
    setAckChecked(false);
    setConfirmText("");
    if (scope === "month") {
      setConfirmAction({ scope, month });
      return;
    }
    setConfirmAction({ scope });
  }

  function closeConfirm() {
    setConfirmAction(null);
    setAckChecked(false);
    setConfirmText("");
  }

  async function handleSubmit() {
    if (!confirmAction || !canSubmit) return;
    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/transactions/bulk-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(confirmAction),
      });
      const json = (await res.json().catch(() => null)) as
        | {
            error?: string;
            deletedCount?: number;
            scope?: DeleteScope;
            month?: string;
          }
        | null;
      if (!res.ok) {
        throw new Error(json?.error || "批量删除失败");
      }
      setResult({
        deletedCount: json?.deletedCount ?? 0,
        scope: (json?.scope as DeleteScope) || confirmAction.scope,
        month: json?.month,
      });
      closeConfirm();
    } catch (e) {
      setError(e instanceof Error ? e.message : "批量删除失败");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          数据管理
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          AI 系统提示词请在{" "}
          <Link
            href="/prompts"
            className="text-zinc-800 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-zinc-600"
          >
            AI 提示词
          </Link>{" "}
          页面预览与编辑。本页为危险操作区：支持清空全部支出、全部收入，或清空某个月的全部流水。为避免误删，执行前需要二次确认。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-red-200 bg-white p-4 shadow-sm dark:border-red-900/40 dark:bg-zinc-950">
          <h2 className="text-sm font-medium text-red-600 dark:text-red-400">
            清空全部支出流水
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            删除所有 `type=expense` 的交易记录。
          </p>
          <button
            type="button"
            onClick={() => openConfirm("all-expense")}
            disabled={submitting}
            className="mt-4 rounded-full border border-red-300 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40"
          >
            执行清空
          </button>
        </div>

        <div className="rounded-2xl border border-red-200 bg-white p-4 shadow-sm dark:border-red-900/40 dark:bg-zinc-950">
          <h2 className="text-sm font-medium text-red-600 dark:text-red-400">
            清空全部收入流水
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            删除所有 `type=income` 的交易记录。
          </p>
          <button
            type="button"
            onClick={() => openConfirm("all-income")}
            disabled={submitting}
            className="mt-4 rounded-full border border-red-300 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40"
          >
            执行清空
          </button>
        </div>

        <div className="rounded-2xl border border-red-200 bg-white p-4 shadow-sm dark:border-red-900/40 dark:bg-zinc-950">
          <h2 className="text-sm font-medium text-red-600 dark:text-red-400">
            清空某个月的流水
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            删除该月份全部收入与支出交易记录。
          </p>
          <div className="mt-3">
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-8 rounded-full border border-zinc-200 bg-white px-3 text-xs outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500"
            />
          </div>
          <button
            type="button"
            onClick={() => openConfirm("month")}
            disabled={submitting || !month}
            className="mt-4 rounded-full border border-red-300 px-3 py-1 text-xs text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40"
          >
            执行清空
          </button>
        </div>
      </div>

      {(confirmAction || error || result) && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          {confirmAction && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                  二次确认
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  你正在执行：{getActionLabel(confirmAction.scope, confirmAction.month)}
                </p>
              </div>

              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={ackChecked}
                  onChange={(e) => setAckChecked(e.target.checked)}
                />
                我已确认该操作不可恢复，并愿意承担误删风险
              </label>

              <div>
                <p className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                  请输入 `DELETE` 以完成第二次确认
                </p>
                <input
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="请输入 DELETE"
                  className="h-8 w-full max-w-xs rounded-md border border-zinc-200 bg-white px-3 text-xs outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                  className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "执行中..." : "确认执行删除"}
                </button>
                <button
                  type="button"
                  onClick={closeConfirm}
                  disabled={submitting}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-500">{error}</p>}

          {result && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              已完成：{getActionLabel(result.scope, result.month)}，共删除{" "}
              {result.deletedCount} 条流水记录。
            </p>
          )}
        </div>
      )}
    </div>
  );
}
