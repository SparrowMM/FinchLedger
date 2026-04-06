"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { coercePaymentMethodAfterAiParse } from "@/lib/wechat-import-payment-coerce";
import { parseSseStream } from "@/lib/sse-stream";

const IMPORT_CHANNEL_DEFAULT_FALLBACK: Record<
  "alipay" | "wechat" | "cmb" | "icbc",
  string
> = {
  alipay: "支付宝",
  wechat: "微信",
  cmb: "招商银行",
  icbc: "工商银行",
};

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

function sanitizeClientRawContent(
  channel: "alipay" | "wechat" | "cmb" | "icbc",
  content: string
): string {
  let sanitized = content;

  // 「账号:[158xxxx]」整段隐藏
  sanitized = sanitized.replace(
    /(账号)\s*:\s*\[[^\]]+\]/g,
    "账号:[已隐藏]"
  );

  // 支付宝导出结尾处的「用户:姓名」信息
  if (channel === "alipay") {
    sanitized = sanitized.replace(
      /(用户)[：:\s]*[^\s，,]+/g,
      "用户:[已隐藏]"
    );
  }

  if (channel === "cmb") {
    // 手机号（11 位）
    sanitized = sanitized.replace(
      /(\+?86[-\s]*)?1[3-9]\d{9}/g,
      "[手机号码已隐藏]"
    );

    // 身份证号（18 位或 15 位）
    sanitized = sanitized.replace(
      /\b(\d{3})\d{11}(\d{4}|\d{3}[\dXx])\b/g,
      (_, p1: string, p2: string) => `${p1}***********${p2}`
    );

    // 银行卡号 / 账户号（12–24 位连续数字）
    sanitized = sanitized.replace(
      /\b(\d{4})\d{4,16}(\d{4})\b/g,
      (_, p1: string, p2: string) => `${p1}****${"****"}${p2}`
    );

    // 邮箱
    sanitized = sanitized.replace(
      /\b([A-Za-z0-9._%+-])[^@\s]{0,20}(@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g,
      (_, p1: string, p2: string) => `${p1}***${p2}`
    );

    // 整块去掉招行账单抬头和个人信息行
    const headerKeywords = [
      "招商银行交易流水",
      "Transaction Statement of China Merchants Bank",
      "户      名",
      "Name",
      "账户类型",
      "Account Type",
      "申请时间",
      "Date",
      "账号",
      "Account No",
      "开 户 行",
      "Sub Branch",
      "验 证 码",
      "Verification Code",
    ];

    const lines = sanitized.split(/\r?\n/);
    const filteredLines = lines.filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      return !headerKeywords.some((kw) => trimmed.includes(kw));
    });

    sanitized = filteredLines.join("\n");
  }

  if (channel === "icbc") {
    // 去掉工商银行电子版抬头和卡号、户名等个人信息行
    const headerKeywords = [
      "中国工商银行借记账户历史明细（电子版）",
      "借记账户历史明细（电子版）",
      "请扫描二维码",
      "识别明细真伪",
      "卡号",
      "户名",
      "起止日期",
    ];

    const lines = sanitized.split(/\r?\n/);
    const filteredLines = lines.filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      return !headerKeywords.some((kw) => trimmed.includes(kw));
    });

    sanitized = filteredLines.join("\n");
  }

  // 前端预览时，支付宝 / 微信也顺便隐藏手机号
  if (channel === "alipay" || channel === "wechat") {
    sanitized = sanitized.replace(
      // 要求手机号左右都不是数字，避免把长订单号里的 11 位片段当成手机号
      /(?<!\d)(\+?86[-\s]*)?1[3-9]\d{9}(?!\d)/g,
      "[手机号码已隐藏]"
    );
  }

  return sanitized;
}

type AIParseResult = {
  transactions: AITransaction[];
  summary?: string;
};

type PaymentMethodMeta = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

type CategoryMeta = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export default function AIBookkeepingPage() {
  const [channel, setChannel] = useState<"alipay" | "wechat" | "cmb" | "icbc">(
    "alipay"
  );
  const [rawContent, setRawContent] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<AIParseResult | null>(null);
  const [draftTransactions, setDraftTransactions] = useState<AITransaction[]>([]);
  const [aiRaw, setAiRaw] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<"date" | "amount" | "category">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [paymentMethodMetas, setPaymentMethodMetas] = useState<PaymentMethodMeta[]>(
    []
  );
  const [expenseCategories, setExpenseCategories] = useState<CategoryMeta[]>([]);
  const [incomeCategories, setIncomeCategories] = useState<CategoryMeta[]>([]);
  const [importPaymentDefaults, setImportPaymentDefaults] = useState<
    Record<string, string>
  >({});

  const paymentMethodMetaMap = useMemo(
    () => new Map(paymentMethodMetas.map((item) => [item.name, item] as const)),
    [paymentMethodMetas]
  );

  const allowedPaymentMethodNames = useMemo(
    () => paymentMethodMetas.map((m) => m.name),
    [paymentMethodMetas]
  );

  const importDefaultForCurrentChannel = useMemo(() => {
    return (
      importPaymentDefaults[channel] ?? IMPORT_CHANNEL_DEFAULT_FALLBACK[channel]
    );
  }, [importPaymentDefaults, channel]);

  const fileAccept =
    channel === "alipay"
      ? ".csv,.txt"
      : channel === "wechat" || channel === "cmb"
      ? ".xlsx,.xls"
      : ".pdf,.xlsx,.xls";

  const sortedTransactions = useMemo(() => {
    const transactions = draftTransactions.map((item, index) => ({
      item,
      index,
    }));
    return [...transactions].sort((a, b) => {
      const left = a.item;
      const right = b.item;
      if (sortKey === "category") {
        const categoryCompare = left.category.localeCompare(right.category, "zh-CN");
        if (categoryCompare !== 0) {
          return sortDirection === "asc" ? categoryCompare : -categoryCompare;
        }
        const aTime = new Date(`${left.date}T${left.time || "00:00"}`).getTime();
        const bTime = new Date(`${right.date}T${right.time || "00:00"}`).getTime();
        return bTime - aTime;
      }

      if (sortKey === "amount") {
        return sortDirection === "asc"
          ? left.amount - right.amount
          : right.amount - left.amount;
      }

      const aTime = new Date(`${left.date}T${left.time || "00:00"}`).getTime();
      const bTime = new Date(`${right.date}T${right.time || "00:00"}`).getTime();
      return sortDirection === "asc" ? aTime - bTime : bTime - aTime;
    });
  }, [draftTransactions, sortDirection, sortKey]);

  function handleSort(key: "date" | "amount" | "category") {
    if (sortKey === key) {
      setSortDirection((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("desc");
  }

  useEffect(() => {
    let cancelled = false;
    async function loadPaymentMethodMetas() {
      try {
        const res = await fetch("/api/payment-methods");
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.methods) return;
        if (!cancelled) {
          setPaymentMethodMetas(json.methods as PaymentMethodMeta[]);
        }
      } catch {
        // ignore payment method meta load errors on AI page
      }
    }
    loadPaymentMethodMetas();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadImportDefaults() {
      try {
        const res = await fetch("/api/import-channel-payments");
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.mappings) return;
        const map: Record<string, string> = {};
        for (const m of json.mappings as Array<{
          channel: string;
          paymentMethodName: string | null;
        }>) {
          if (m.paymentMethodName) {
            map[m.channel] = m.paymentMethodName;
          }
        }
        if (!cancelled) {
          setImportPaymentDefaults(map);
        }
      } catch {
        // ignore
      }
    }
    void loadImportDefaults();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadExpenseCategories() {
      try {
        const res = await fetch("/api/expense-categories");
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.categories) return;
        if (!cancelled) {
          setExpenseCategories(json.categories as CategoryMeta[]);
        }
      } catch {
        // ignore category meta load errors on AI page
      }
    }
    async function loadIncomeCategories() {
      try {
        const res = await fetch("/api/income-categories");
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.categories) return;
        if (!cancelled) {
          setIncomeCategories(json.categories as CategoryMeta[]);
        }
      } catch {
        // ignore category meta load errors on AI page
      }
    }
    void loadExpenseCategories();
    void loadIncomeCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSaveMessage(null);
    setResult(null);
    setDraftTransactions([]);
    setFileName(file.name);

    const lowerName = file.name.toLowerCase();
    const isCsv = lowerName.endsWith(".csv");
    const isXlsx = lowerName.endsWith(".xlsx") || lowerName.endsWith(".xls");
    const isPdf = lowerName.endsWith(".pdf");
    const isAlipayCsv = channel === "alipay" && isCsv;

    // 微信 / 招商 / 工商银行官方导出的账单多为 xlsx，这里直接在前端解析为可读文本
    if ((channel === "wechat" || channel === "cmb" || channel === "icbc") && isXlsx) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = reader.result as ArrayBuffer;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          // 转成 TSV 文本，便于后续 AI 解析
          const tsv = XLSX.utils.sheet_to_csv(sheet, { FS: "\t" });
          setRawContent(sanitizeClientRawContent(channel, tsv));
        } catch (err) {
          console.error("Failed to parse xlsx bill", err);
          setError(
            channel === "wechat"
              ? "解析微信账单 xlsx 文件失败，请尝试重新导出或改为复制表格文本。"
              : "解析招商银行账单 xlsx 文件失败，请尝试重新导出或改为复制表格文本。"
          );
        }
      };
      reader.onerror = () => {
        setError(
          channel === "wechat"
            ? "读取微信账单文件失败，请重试或尝试手动复制内容。"
            : "读取招商银行账单文件失败，请重试或尝试手动复制内容。"
        );
      };
      reader.readAsArrayBuffer(file);
      return;
    }

    // 工商银行 PDF：上传到后端做文本抽取
    if (channel === "icbc" && isPdf) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer;
          const res = await fetch("/api/pdf-extract-text", {
            method: "POST",
            headers: {
              "Content-Type": "application/pdf",
            },
            body: arrayBuffer,
          });

          const data = await res.json().catch(() => null);

          if (!res.ok) {
            throw new Error(
              data?.error ||
                "解析工商银行 PDF 失败，请确认为正常的对账单后重试。"
            );
          }

          if (!data?.text || typeof data.text !== "string") {
            throw new Error("未能从 PDF 中提取到可读文本。");
          }

          setRawContent(sanitizeClientRawContent(channel, data.text));
          setError(null);
        } catch (err) {
          console.error("Failed to extract text from bank pdf", err);
          setError(
            err instanceof Error
              ? err.message
              : "解析银行 PDF 文件失败，请稍后重试。"
          );
        }
      };
      reader.onerror = () => {
        setError("读取文件失败，请重试或尝试手动复制内容。");
      };
      reader.readAsArrayBuffer(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setRawContent(sanitizeClientRawContent(channel, text));
    };
    reader.onerror = () => {
      setError("读取文件失败，请重试或尝试手动复制内容。");
    };

    try {
      // 支付宝 CSV 按 GBK 解码，其它走 UTF-8
      // @ts-expect-error 浏览器环境下支持传入编码参数
      reader.readAsText(file, isAlipayCsv ? "gbk" : "utf-8");
    } catch {
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (!rawContent.trim()) return;
    setLoading(true);
    setError(null);
    setSaveMessage(null);
    setResult(null);
    setDraftTransactions([]);
    setAiRaw(null);

    try {
      const safeContent = sanitizeClientRawContent(channel, rawContent);
      const res = await fetch("/api/ai-bookkeeping?stream=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channel, rawContent: safeContent }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "AI 解析失败，请稍后重试。");
      }

      if (!res.body) {
        throw new Error("AI 接口返回为空，请稍后重试。");
      }

      const fullContent = await parseSseStream(res.body, (text) => {
        setAiRaw(text);
      });

      if (!fullContent.trim()) {
        throw new Error("AI 返回内容为空，请稍后重试。");
      }

      let parsedResult: AIParseResult;
      try {
        parsedResult = JSON.parse(fullContent);
      } catch {
        throw new Error("AI 返回的不是合法 JSON，请稍后重试。");
      }

      setResult(parsedResult);
      const namesForCoerce =
        allowedPaymentMethodNames.length > 0
          ? allowedPaymentMethodNames
          : [
              "支付宝",
              "微信",
              "招商银行",
              "工商银行",
            ];
      setDraftTransactions(
        (parsedResult.transactions ?? []).map((t) => ({
          ...t,
          method: coercePaymentMethodAfterAiParse(
            channel,
            t.method,
            namesForCoerce,
            importDefaultForCurrentChannel
          ),
        }))
      );
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "AI 解析失败，请稍后重试。"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToLedger = async () => {
    if (!draftTransactions.length || savingRef.current) return;

    savingRef.current = true;
    setSaving(true);
    setError(null);
    setSaveMessage(null);

    try {
      const res = await fetch("/api/transactions/import-from-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel,
          transactions: draftTransactions,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "保存到记账系统失败，请稍后重试。");
      }

      const count = data?.insertedCount ?? draftTransactions.length;
      setSaveMessage(`已将 ${count} 条交易保存到记账系统。`);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "保存到记账系统失败，请稍后重试。"
      );
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  function handleDraftCategoryChange(index: number, category: string) {
    setDraftTransactions((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, category } : item))
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          AI 流水导入解析
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          将从「支付宝、微信支付、招商银行、工商银行」导出的流水粘贴在下面，由 AI 统一解析成标准化的交易记录，方便导入记账系统。
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          收支类目会按「类目管理」中的配置进行约束；无法判断时归为待确认。
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="font-medium">选择流水渠道</div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              当前支持：支付宝、微信支付、招商银行、工商银行。
              {channel === "wechat"
                ? " 微信渠道推荐上传 xlsx 模板文件（或复制表格文本），其他渠道推荐上传 CSV 文件或复制账单文本到下方输入框。"
                : channel === "cmb"
                ? " 招商银行推荐上传官方导出的 xlsx 对账单文件（或复制表格文本）到下方输入框。"
                : channel === "icbc"
                ? " 工商银行推荐上传官方导出的 xlsx 或 PDF 对账单模板，在其他工具中完成脱敏后，将账单正文复制粘贴到下方输入框。"
                : " 支付宝推荐上传 CSV 文件，或手动复制账单文本到下方输入框。"}
            </div>
          </div>
          <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3">
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
            <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-dashed border-zinc-300 px-3 py-1.5 text-[11px] font-medium text-zinc-600 hover:border-zinc-400 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500">
              <span>
                {fileName
                  ? `已选择：${fileName}`
                  : channel === "wechat"
                  ? "上传微信账单 xlsx 文件"
                  : channel === "cmb"
                  ? "上传招商银行账单 xlsx 文件"
                  : channel === "icbc"
                  ? "上传工商银行 xlsx/PDF 对账单（或复制账单文本）"
                  : "上传支付宝账单 CSV 文件"}
              </span>
              <input
                type="file"
                accept={fileAccept}
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <textarea
          value={rawContent}
          onChange={(e) =>
            setRawContent(sanitizeClientRawContent(channel, e.target.value))
          }
          rows={8}
          className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono text-xs outline-none ring-0 ring-offset-0 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
          placeholder={`你可以：
- ${
            channel === "alipay"
              ? "上传支付宝导出的 CSV 文件，系统会自动读取其文本内容；"
              : channel === "wechat"
              ? "上传微信账单 xlsx 模板文件（或复制表格文本），系统会自动读取其文本内容；"
              : channel === "cmb"
              ? "上传招商银行导出的 xlsx 对账单文件（或复制表格文本），系统会自动读取其文本内容；"
              : "上传工商银行导出的 xlsx/PDF 对账单文件（或在本地打开后完成脱敏处理，将账单正文整体复制粘贴到这里）；"
          }
- 也可以直接将任意账单文本整体复制粘贴到这里，由 AI 解析。`}
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
      {saveMessage && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
          {saveMessage}
        </div>
      )}

      {aiRaw && !result && (
        <div className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-3 text-xs shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-700 dark:text-zinc-100">
              AI 实时解析中...
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              文本长度：{aiRaw.length} 字符
            </span>
          </div>
          <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-zinc-50 p-2 font-mono text-[11px] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            {aiRaw}
          </pre>
        </div>
      )}

      {result && (
        <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">AI 生成的记账草稿</h2>
            <div className="flex items-center gap-3">
              {result.summary && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {result.summary}
                </span>
              )}
              <button
                type="button"
                onClick={handleSaveToLedger}
                disabled={saving || !draftTransactions.length}
                className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-medium text-emerald-50 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:disabled:bg-emerald-700"
              >
                {saving ? "正在保存..." : "一键保存到记账"}
              </button>
            </div>
          </div>

          {result.transactions?.length ? (
            <div className="overflow-x-auto">
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
                    <th className="py-2 pr-4">类型</th>
                    <th className="py-2 pr-4">
                      <button
                        type="button"
                        className="flex items-center gap-1"
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
                    <th className="py-2">支付方式</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {sortedTransactions.map(({ item: t, index }) => (
                    <tr key={`${t.date}-${t.amount}-${index}`} className="align-top">
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
                      <td className="py-2 pr-4">
                        <select
                          value={t.category}
                          onChange={(e) =>
                            handleDraftCategoryChange(index, e.target.value)
                          }
                          className="min-w-24 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-500"
                        >
                          {(t.type === "expense"
                            ? expenseCategories
                            : incomeCategories
                          ).map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                          {(t.type === "expense"
                            ? expenseCategories
                            : incomeCategories
                          ).some((cat) => cat.name === t.category) ? null : (
                            <option value={t.category}>{t.category}</option>
                          )}
                        </select>
                      </td>
                      <td className="py-2 pr-4">
                        <div>{t.merchant || "—"}</div>
                        {t.note && (
                          <div className="mt-0.5 text-[10px] text-zinc-400">
                            {t.note}
                          </div>
                        )}
                      </td>
                      <td className="py-2">
                        {(() => {
                          const meta = paymentMethodMetaMap.get(t.method || "");
                          if (!meta) {
                            return (
                              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                                {t.method || "未识别"}
                              </span>
                            );
                          }
                          return (
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] text-white"
                              style={{ backgroundColor: meta.color }}
                            >
                              <span>{meta.icon}</span>
                              <span>{meta.name}</span>
                            </span>
                          );
                        })()}
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
