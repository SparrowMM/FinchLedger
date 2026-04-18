import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseChinaDateTimeToUtc } from "@/lib/china-time";
import {
  DEFAULT_EXPENSE_CATEGORIES,
  normalizeExpenseCategoryFromList,
} from "@/lib/expense-categories";
import { listExpenseCategoryNames } from "@/lib/expense-categories-db";
import {
  DEFAULT_INCOME_CATEGORIES,
  normalizeIncomeCategoryFromList,
} from "@/lib/income-categories";
import { listIncomeCategoryNames } from "@/lib/income-categories-db";
import {
  DEFAULT_PAYMENT_METHODS,
  normalizePaymentMethodFromList,
} from "@/lib/payment-methods";
import { listPaymentMethodNames } from "@/lib/payment-methods-db";
import type { BookkeepingImportChannel } from "@/lib/import-channels";
import { resolveDefaultPaymentMethodNameForChannel } from "@/lib/import-channel-payment-db";
import { coercePaymentMethodAfterAiParse } from "@/lib/wechat-import-payment-coerce";
import {
  buildCategoryRuleMap,
  learnRulesFromTransactions,
} from "@/lib/category-rules-db";
import type { TransactionType } from "@prisma/client";

type Channel = "alipay" | "wechat" | "cmb" | "icbc";

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

type ImportFromAIBody = {
  channel: Channel;
  transactions: AITransaction[];
};

function nowMs() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

function createRequestId(prefix: string) {
  const randomPart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${randomPart}`;
}

function normalizeAmount(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isNaN(value) ? null : value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;

    const normalized = trimmed.replace(/[,\s]/g, "").replace(/[¥￥]/g, "");
    const parsed = Number(normalized);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
}

function isCmbLifeRepayment(t: AITransaction) {
  const text = `${t.category ?? ""} ${t.merchant ?? ""} ${t.note ?? ""} ${t.method ?? ""}`;
  return text.includes("掌上生活") && text.includes("还款");
}

function resolveExpenseCategory(
  t: AITransaction,
  allowedExpenseCategoryNames: string[],
  ruleMap?: Map<string, string>
): string {
  // 1. Check learned/manual rules first (merchant name exact match)
  if (ruleMap) {
    const merchantKey = (t.merchant ?? "").trim().toLowerCase();
    if (merchantKey) {
      const ruleCategory = ruleMap.get(merchantKey);
      if (ruleCategory && allowedExpenseCategoryNames.includes(ruleCategory)) {
        return ruleCategory;
      }
    }
  }

  // 2. Hardcoded regex rules
  const text = `${t.category ?? ""} ${t.merchant ?? ""} ${t.note ?? ""}`;
  if (
    /(app\s*store|apple\.com\/bill|apple\s*services|icloud|i\s*cloud|itunes)/i.test(
      text
    ) &&
    allowedExpenseCategoryNames.includes("Apple")
  ) {
    return "Apple";
  }
  if (
    /(理发|剪发|洗剪吹|烫发|染发|护发|美发|发廊|toni&guy|barber|hair)/i.test(
      text
    ) &&
    allowedExpenseCategoryNames.includes("生活")
  ) {
    return "生活";
  }
  if (
    /停车|停车费|停车场|路侧停车/.test(text) &&
    allowedExpenseCategoryNames.includes("交通")
  ) {
    return "交通";
  }
  if (
    text.includes("亲情卡") &&
    allowedExpenseCategoryNames.includes("人情-亲人")
  ) {
    return "人情-亲人";
  }
  return normalizeExpenseCategoryFromList(t.category, allowedExpenseCategoryNames);
}

function resolveIncomeCategory(
  t: AITransaction,
  allowedIncomeCategoryNames: string[],
  ruleMap?: Map<string, string>
): string {
  if (ruleMap) {
    const merchantKey = (t.merchant ?? "").trim().toLowerCase();
    if (merchantKey) {
      const ruleCategory = ruleMap.get(merchantKey);
      if (ruleCategory && allowedIncomeCategoryNames.includes(ruleCategory)) {
        return ruleCategory;
      }
    }
  }
  return normalizeIncomeCategoryFromList(t.category, allowedIncomeCategoryNames);
}

export async function POST(req: Request) {
  const requestId = createRequestId("imp");
  const requestStart = nowMs();
  let body: ImportFromAIBody;

  try {
    const parseBodyStart = nowMs();
    body = await req.json();
    console.log("[TRANSACTIONS-IMPORT] Request body parsed", {
      requestId,
      parseBodyElapsedMs: Number((nowMs() - parseBodyStart).toFixed(2)),
    });
  } catch {
    return NextResponse.json(
      { error: "请求体格式错误，应为 JSON。" },
      { status: 400 }
    );
  }

  const { channel, transactions } = body;

  if (!channel || !["alipay", "wechat", "cmb", "icbc"].includes(channel)) {
    return NextResponse.json(
      { error: "缺少或不支持的渠道类型 channel。" },
      { status: 400 }
    );
  }

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return NextResponse.json(
      { error: "缺少要导入的交易列表 transactions。" },
      { status: 400 }
    );
  }

  try {
    const metaLoadStart = nowMs();
    const [categoryNames, incomeCategoryNames, paymentMethodNames, expenseRuleMap, incomeRuleMap] =
      await Promise.all([
        listExpenseCategoryNames().catch(() => []),
        listIncomeCategoryNames().catch(() => []),
        listPaymentMethodNames().catch(() => []),
        buildCategoryRuleMap("expense").catch(() => new Map<string, string>()),
        buildCategoryRuleMap("income").catch(() => new Map<string, string>()),
      ]);
    const metaLoadElapsedMs = nowMs() - metaLoadStart;
    const allowedExpenseCategoryNames =
      categoryNames.length > 0
        ? categoryNames
        : DEFAULT_EXPENSE_CATEGORIES.map((item) => item.name);
    const allowedIncomeCategoryNames =
      incomeCategoryNames.length > 0
        ? incomeCategoryNames
        : DEFAULT_INCOME_CATEGORIES.map((item) => item.name);
    const allowedPaymentMethods =
      paymentMethodNames.length > 0
        ? paymentMethodNames
        : DEFAULT_PAYMENT_METHODS.map((item) => item.name);

    const importDefaultMethodName =
      await resolveDefaultPaymentMethodNameForChannel(
        channel as BookkeepingImportChannel,
        allowedPaymentMethods
      );

    const normalizedTransactions = transactions
      .map((t) => ({
        ...t,
        normalizedAmount: normalizeAmount((t as { amount?: unknown }).amount),
      }))
      .filter(
        (t): t is (typeof t & { normalizedAmount: number }) =>
          t.normalizedAmount !== null
      );

    const buildDataStart = nowMs();
    const data = normalizedTransactions
      // 不将招商银行的「理财 / 基金申购 / 基金买入」类记录导入记账系统
      .filter((t) => {
        if (channel !== "cmb") return true;
        const text = `${t.category ?? ""} ${t.merchant ?? ""} ${t.note ?? ""}`;
        return (
          !text.includes("理财") &&
          !text.includes("基金申购") &&
          !text.includes("基金买入") &&
          !isCmbLifeRepayment(t)
        );
      })
      .map((t) => {
        const baseDate = t.date?.trim() || "";
        const timePart = t.time?.trim();

        const name =
          (t.merchant && t.merchant.trim()) ||
          (t.category && t.category.trim()) ||
          "未命名交易";

        const rawMethodHint = (t.method && t.method.trim()) || "";

        const coercedMethod = coercePaymentMethodAfterAiParse(
          channel,
          rawMethodHint || undefined,
          allowedPaymentMethods,
          importDefaultMethodName
        );

        const rawAccount =
          coercedMethod ||
          (channel === "alipay"
            ? "支付宝"
            : channel === "wechat"
            ? "微信"
            : channel === "cmb"
            ? "招商银行"
            : "工商银行");

        const prismaType: TransactionType =
          t.type === "income" ? "income" : "expense";

        const parsedDate = baseDate
          ? parseChinaDateTimeToUtc(baseDate, timePart)
          : new Date();

        return {
          date: parsedDate,
          name,
          type: prismaType,
          amount: t.normalizedAmount,
          category:
            prismaType === "expense"
              ? resolveExpenseCategory(t, allowedExpenseCategoryNames, expenseRuleMap)
              : resolveIncomeCategory(t, allowedIncomeCategoryNames, incomeRuleMap),
          account: normalizePaymentMethodFromList(
            rawAccount,
            allowedPaymentMethods
          ),
          note: t.note,
        };
      });
    const buildDataElapsedMs = nowMs() - buildDataStart;

    if (!data.length) {
      return NextResponse.json(
        { error: "没有可导入的有效交易记录。" },
        { status: 400 }
      );
    }

    const writeDbStart = nowMs();
    const result = await prisma.transaction.createMany({
      data,
    });
    const writeDbElapsedMs = nowMs() - writeDbStart;

    // Auto-learn category rules from imported transactions
    const learnStart = nowMs();
    let rulesLearned = 0;
    try {
      rulesLearned = await learnRulesFromTransactions(
        data.map((d) => ({
          type: d.type as TransactionType,
          merchantName: d.name,
          category: d.category,
        }))
      );
    } catch (e) {
      console.warn("[TRANSACTIONS-IMPORT] Rule learning failed (non-fatal)", e);
    }
    const learnElapsedMs = nowMs() - learnStart;

    console.log("[TRANSACTIONS-IMPORT] Import completed", {
      requestId,
      channel,
      inputTransactionsCount: transactions.length,
      normalizedTransactionsCount: normalizedTransactions.length,
      toInsertCount: data.length,
      insertedCount: result.count,
      rulesLearned,
      metaLoadElapsedMs: Number(metaLoadElapsedMs.toFixed(2)),
      buildDataElapsedMs: Number(buildDataElapsedMs.toFixed(2)),
      writeDbElapsedMs: Number(writeDbElapsedMs.toFixed(2)),
      learnElapsedMs: Number(learnElapsedMs.toFixed(2)),
      totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
    });

    return NextResponse.json({
      insertedCount: result.count,
      rulesLearned,
    });
  } catch (e) {
    console.error("[TRANSACTIONS-IMPORT] Import from AI failed", {
      requestId,
      error: e,
      totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
    });
    return NextResponse.json(
      { error: "保存交易到数据库时发生错误，请稍后重试。" },
      { status: 500 }
    );
  }
}

