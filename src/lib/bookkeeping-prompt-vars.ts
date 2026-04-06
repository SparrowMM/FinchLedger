import { DEFAULT_EXPENSE_CATEGORIES } from "@/lib/expense-categories";
import { listExpenseCategoryNames } from "@/lib/expense-categories-db";
import { DEFAULT_INCOME_CATEGORIES } from "@/lib/income-categories";
import { listIncomeCategoryNames } from "@/lib/income-categories-db";
import { DEFAULT_PAYMENT_METHODS } from "@/lib/payment-methods";
import { listPaymentMethodNames } from "@/lib/payment-methods-db";
import type { BookkeepingPromptVars } from "@/lib/ai-prompts-defaults";
import type { BookkeepingImportChannel } from "@/lib/import-channels";
import {
  buildImportChannelDefaultGuideText,
  listImportChannelPaymentRows,
  resolveDefaultPaymentMethodNameForChannel,
} from "@/lib/import-channel-payment-db";

/** 与 AI 记账接口一致：类目、支付方式列表 + 导入类型默认支付方式（来自数据库映射） */
export async function getBookkeepingPromptVarsForChannel(
  channel: BookkeepingImportChannel
): Promise<BookkeepingPromptVars> {
  const categoryNames = await listExpenseCategoryNames().catch(() => []);
  const incomeCategoryNames = await listIncomeCategoryNames().catch(() => []);
  const paymentMethodNames = await listPaymentMethodNames().catch(() => []);
  const allowedExpenseCategories =
    categoryNames.length > 0
      ? categoryNames
      : DEFAULT_EXPENSE_CATEGORIES.map((item) => item.name);
  const allowedIncomeCategories =
    incomeCategoryNames.length > 0
      ? incomeCategoryNames
      : DEFAULT_INCOME_CATEGORIES.map((item) => item.name);
  const allowedPaymentMethods =
    paymentMethodNames.length > 0
      ? paymentMethodNames
      : DEFAULT_PAYMENT_METHODS.map((item) => item.name);

  const rows = await listImportChannelPaymentRows();
  const guide = buildImportChannelDefaultGuideText(rows);
  const currentChannelDefaultMethod =
    await resolveDefaultPaymentMethodNameForChannel(
      channel,
      allowedPaymentMethods
    );

  return {
    allowedExpenseCategoryText: allowedExpenseCategories
      .map((name) => `"${name}"`)
      .join("、"),
    allowedIncomeCategoryText: allowedIncomeCategories
      .map((name) => `"${name}"`)
      .join("、"),
    allowedPaymentMethodText: allowedPaymentMethods
      .map((name) => `"${name}"`)
      .join("、"),
    importChannelDefaultGuide: guide,
    currentChannel: channel,
    currentChannelDefaultMethod: currentChannelDefaultMethod,
  };
}
