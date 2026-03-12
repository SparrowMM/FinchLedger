 "use client";

import { useState } from "react";

type Income = {
  date: string;
  time?: string;
  source: string;
  method?: string;
  amount: number;
  currency: string;
  note?: string;
};

export default function IncomePage() {
  const [month, setMonth] = useState<string>("");
  const [incomes] = useState<Income[]>([]);

  const filtered = incomes.filter((i) =>
    month ? i.date.startsWith(month) : true
  );

  const total = filtered.reduce((sum, i) => sum + i.amount, 0);

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
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            暂无示例数据，后续可以接入数据库或 AI 解析结果。
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
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-50 transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              新增收入（占位）
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-zinc-100 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <tr>
                  <th className="py-2 pr-4">日期</th>
                  <th className="py-2 pr-4">时间</th>
                  <th className="py-2 pr-4">收入来源</th>
                  <th className="py-2 pr-4">备注</th>
                  <th className="py-2 pr-4">收款方式</th>
                  <th className="py-2 text-right">金额</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filtered.length ? (
                  filtered.map((i, idx) => (
                    <tr key={idx}>
                      <td className="py-2 pr-4">{i.date}</td>
                      <td className="py-2 pr-4">
                        {i.time || (
                          <span className="text-[10px] text-zinc-400">—</span>
                        )}
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
                        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                          {i.method || "未记录"}
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <span className="font-medium text-emerald-500">
                          +{i.amount.toFixed(2)} {i.currency}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="py-6 text-center text-xs text-zinc-400"
                      colSpan={6}
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
    </div>
  );
}

