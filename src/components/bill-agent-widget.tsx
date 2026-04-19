"use client";

import { ChatBubbleIcon, Cross2Icon } from "@radix-ui/react-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { parseSseStream } from "@/lib/sse-stream";

type Role = "user" | "assistant";

type ChatTurn = { role: Role; content: string };

export function BillAgentWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open, streaming]);

  // Esc 关闭对话面板
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setError(null);
    setInput("");
    const nextHistory: ChatTurn[] = [...messages, { role: "user", content: text }];
    setMessages(nextHistory);
    setStreaming(true);

    const assistantPlaceholder: ChatTurn = {
      role: "assistant",
      content: "",
    };
    setMessages([...nextHistory, assistantPlaceholder]);

    try {
      const res = await fetch("/api/bill-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "请求失败，请稍后重试。");
      }
      if (!res.body) {
        throw new Error("接口返回为空，请稍后重试。");
      }

      await parseSseStream(res.body, (full) => {
        setMessages([...nextHistory, { role: "assistant", content: full }]);
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "发送失败，请稍后重试。";
      setError(msg);
      setMessages(nextHistory);
    } finally {
      setStreaming(false);
    }
  }, [input, messages, streaming]);

  const clearChat = useCallback(() => {
    if (streaming) return;
    setMessages([]);
    setError(null);
  }, [streaming]);

  return (
    <>
      <button
        type="button"
        aria-label="打开账单助手"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 ring-2 ring-white/20 transition hover:scale-105 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 dark:ring-zinc-900 dark:focus-visible:ring-offset-zinc-900"
      >
        <span className="relative inline-flex">
          <ChatBubbleIcon className="h-8 w-8" aria-hidden />
          <span
            className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-900"
            aria-hidden
          >
            <span className="sr-only">新</span>
          </span>
        </span>
      </button>

      {open ? (
        <div
          className="fixed bottom-[5.75rem] right-5 z-[100] flex max-h-[min(80vh,720px)] w-[min(calc(100vw-2rem),560px)] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          role="dialog"
          aria-label="账单助手对话"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div>
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                账单助手
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                基于全库汇总与最近流水，模型与「AI 自动记账」一致
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                disabled={streaming || messages.length === 0}
                className="rounded-full px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-100 disabled:opacity-40 dark:hover:bg-zinc-900"
              >
                清空
              </button>
              <button
                type="button"
                aria-label="关闭"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <Cross2Icon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={listRef}
            className="min-h-[240px] flex-1 space-y-3 overflow-y-auto px-4 py-3"
          >
            {messages.length === 0 && !error ? (
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                你好！我可以根据你的收支流水回答问题，例如：本月支出最多的类目、某个月的结余、餐饮花了多少等。
              </p>
            ) : null}
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {m.content || (streaming && m.role === "assistant" ? "…" : "\u00a0")}
                </div>
              </div>
            ))}
            {error ? (
              <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
            ) : null}
          </div>

          <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
            <textarea
              ref={inputRef}
              rows={2}
              value={input}
              disabled={streaming}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="输入问题，Enter 发送，Shift+Enter 换行"
              className="mb-2 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
            <button
              type="button"
              disabled={streaming || !input.trim()}
              onClick={() => void send()}
              className="w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {streaming ? "正在思考…" : "发送"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
