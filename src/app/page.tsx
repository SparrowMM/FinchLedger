export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          总览 Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          快速查看本月收入、支出与结余，以及分类分布和每日趋势。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs font-medium text-zinc-500">本月收入</div>
          <div className="mt-2 text-2xl font-semibold">¥ 0.00</div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs font-medium text-zinc-500">本月支出</div>
          <div className="mt-2 text-2xl font-semibold">¥ 0.00</div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-xs font-medium text-zinc-500">本月结余</div>
          <div className="mt-2 text-2xl font-semibold">¥ 0.00</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">支出分类分布</h2>
              <p className="mt-1 text-xs text-zinc-500">
                使用 Recharts 展示各分类占比。
              </p>
            </div>
          </div>
          <div className="mt-4 flex h-56 items-center justify-center text-xs text-zinc-400">
            图表占位：接下来接入 Recharts
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium">每日支出趋势</h2>
              <p className="mt-1 text-xs text-zinc-500">
                使用折线图展示本月每日支出。
              </p>
            </div>
          </div>
          <div className="mt-4 flex h-56 items-center justify-center text-xs text-zinc-400">
            图表占位：接下来接入 Recharts
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium">最近交易记录</h2>
            <p className="mt-1 text-xs text-zinc-500">
              创建交易后，这里会展示最近几笔收入和支出。
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-zinc-200 p-6 text-center text-xs text-zinc-400 dark:border-zinc-800">
          暂无记录，请先在「支出流水 / 收入流水 / AI 自动记账」中新增交易。
        </div>
      </div>
    </div>
  );
}
