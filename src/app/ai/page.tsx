"use client";

import { useState } from "react";

type AITransaction = {
  type: "expense" | "income";
  date: string;
  time?: string;
  amount: number;
  currency: string;
  category: string;
  merchant?: string;
  method?: string;
  note?: string;
};

type AIParseResult = {
  transactions: AITransaction[];
  summary?: string;
};

export default function AIBookkeepingPage() {
  const [channel, setChannel] = useState<"alipay" | "wechat" | "cmb" | "icbc">(
    "alipay"
  );
  const [rawContent, setRawContent] = useState("");
  const [result, setResult] = useState<AIParseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!rawContent.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai-bookkeeping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channel, rawContent }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "AI 解析失败，请稍后重试。");
      }

      const data: AIParseResult = await res.json();
      setResult(data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "AI 解析失败，请稍后重试。"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          AI 流水导入解析
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          将从「支付宝、微信支付、招商银行、工商银行」导出的流水粘贴在下面，由 AI 统一解析成标准化的交易记录，方便导入记账系统。
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="font-medium">选择流水渠道</div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              当前支持：支付宝、微信支付、招商银行、工商银行。请先在对应 App/网银中导出流水（CSV/文本），再粘贴到下面。
            </div>
          </div>
          <select
            className="w-full max-w-xs rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs outline-none ring-0 ring-offset-0 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
            value={channel}
            onChange={(e) =>
              setChannel(e.target.value as "alipay" | "wechat" | "cmb" | "icbc")
            }
          >
            <option value="alipay">支付宝流水</option>
            <option value="wechat">微信支付流水</option>
            <option value="cmb">招商银行流水</option>
            <option value="icbc">工商银行流水</option>
          </select>
        </div>

        <textarea
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          rows={8}
          className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono text-xs outline-none ring-0 ring-offset-0 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
          placeholder={`请将从「${
            channel === "alipay"
              ? "支付宝"
              : channel === "wechat"
              ? "微信支付"
              : channel === "cmb"
              ? "招商银行"
              : "工商银行"
          }」导出的流水（CSV 或文本）整体复制粘贴到这里。`}
        />
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>AI 会根据不同渠道的账单格式，识别日期、金额、收支类型、对方账户/商户、摘要等信息。</span>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !rawContent.trim()}
            className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
          >
            {loading ? "AI 正在解析..." : "解析流水"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">AI 生成的记账草稿</h2>
            {result.summary && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {result.summary}
              </span>
            )}
          </div>

          {result.transactions?.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="border-b border-zinc-100 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <tr>
                    <th className="py-2 pr-4">日期</th>
                    <th className="py-2 pr-4">类型</th>
                    <th className="py-2 pr-4">金额</th>
                    <th className="py-2 pr-4">分类</th>
                    <th className="py-2 pr-4">商家 / 备注</th>
                    <th className="py-2">支付方式</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {result.transactions.map((t, idx) => (
                    <tr key={idx} className="align-top">
                      <td className="py-2 pr-4">
                        <div>{t.date}</div>
                        {t.time && (
                          <div className="text-[10px] text-zinc-400">
                            {t.time}
                          </div>
                        )}
                      </td>
                      <td className="py-2 pr-4">
                        {t.type === "expense" ? "支出" : "收入"}
                      </td>
                      <td className="py-2 pr-4">
                        <span
                          className={
                            t.type === "expense"
                              ? "text-red-500"
                              : "text-emerald-500"
                          }
                        >
                          {t.type === "expense" ? "-" : "+"}
                          {t.amount.toFixed(2)} {t.currency || "CNY"}
                        </span>
                      </td>
                      <td className="py-2 pr-4">{t.category}</td>
                      <td className="py-2 pr-4">
                        <div>{t.merchant || "—"}</div>
                        {t.note && (
                          <div className="mt-0.5 text-[10px] text-zinc-400">
                            {t.note}
                          </div>
                        )}
                      </td>
                      <td className="py-2">
                        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                          {t.method || "未识别"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              没有识别到有效的交易，请尝试描述得更清晰一些（包括金额、日期和用途）。
            </div>
          )}
        </div>
      )}
    </div>
  );
}
