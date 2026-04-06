"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import React from "react";
import { BillAgentWidget } from "./bill-agent-widget";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/expenses", label: "支出流水" },
  { href: "/income", label: "收入流水" },
  { href: "/categories", label: "支出分类管理" },
  { href: "/admin", label: "管理员" },
  { href: "/prompts", label: "AI 提示词" },
  { href: "/ai", label: "AI 自动记账" },
];

export function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 dark:from-zinc-50 dark:via-zinc-300 dark:to-zinc-500" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                FinchLedger
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                AI 个人财务助理
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-4 text-sm md:flex">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    active
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="切换主题"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              <SunIcon className="h-4 w-4 dark:hidden" />
              <MoonIcon className="hidden h-4 w-4 dark:block" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>

      <BillAgentWidget />
    </div>
  );
}

