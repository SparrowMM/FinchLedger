import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formatDateTimeInChina } from "@/lib/china-time";
import { TransactionType } from "@prisma/client";
import { resolveExpenseAnalysisSystemPrompt } from "@/lib/ai-prompts-db";
import { parseSseStream } from "@/lib/sse-stream";
import {
  fetchChatCompletions,
  missingKeyHint,
  parseDashScopeError,
} from "@/lib/bailian-client";
import { getBailianApiKey, getBailianBaseUrl, getBailianModel } from "@/lib/env";

function getMonthRange(monthParam?: string) {
  if (!monthParam) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 1);
    const label = `${year}-${String(month + 1).padStart(2, "0")}`;
    return { start, end, label };
  }

  const [yearStr, monthStr] = monthParam.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    throw new Error("月份参数格式错误，应为 YYYY-MM。");
  }
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
  const label = `${year}-${String(month).padStart(2, "0")}`;
  return { start, end, label };
}

function isInvestmentLike(t: {
  account: string;
  category: string;
  name: string;
  note: string | null;
}) {
  const category = t.category || "";
  const name = t.name || "";
  const note = t.note || "";
  const account = t.account || "";

  const hasInvestmentKeyword =
    category.includes("理财") ||
    category.includes("基金申购") ||
    category.includes("基金买入") ||
    note.includes("理财申购") ||
    note.includes("基金申购") ||
    note.includes("基金买入") ||
    name.includes("理财");

  const looksLikeBankInvestment =
    account.includes("招商银行") ||
    account.includes("储蓄卡") ||
    account.includes("银行卡");

  return hasInvestmentKeyword && looksLikeBankInvestment;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const monthParam = searchParams.get("month") || undefined;

  try {
    const { label } = getMonthRange(monthParam);

    const latest = await prisma.monthlyExpenseAnalysis.findFirst({
      where: {
        month: label,
        type: "expense",
      },
      orderBy: { createdAt: "desc" },
    });

    if (!latest) {
      return NextResponse.json(
        { month: label, hasAnalysis: false, analysis: null },
        { status: 200 }
      );
    }

    let parsedContent: unknown = latest.content;
    if (typeof latest.content === "string") {
      try {
        parsedContent = JSON.parse(latest.content);
      } catch {
        parsedContent = latest.content;
      }
    }

    return NextResponse.json({
      month: label,
      hasAnalysis: true,
      analysis: parsedContent,
      createdAt: latest.createdAt.toISOString(),
      id: latest.id,
    });
  } catch (e) {
    console.error("[AI-EXPENSE-ANALYSIS] GET failed", e);
    return NextResponse.json(
      { error: "查询月度支出分析失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!getBailianApiKey()) {
    return NextResponse.json(
      { error: `服务器未配置百炼 API Key，请先设置 ${missingKeyHint}。` },
      { status: 500 }
    );
  }

  let monthFromBody: string | undefined;
  try {
    const body = await req.json().catch(() => null);
    if (body && typeof body.month === "string") {
      monthFromBody = body.month;
    }
  } catch {
    // ignore
  }

  const { start, end, label } = getMonthRange(monthFromBody);

  try {
    const rows = await prisma.transaction.findMany({
      where: {
        date: {
          gte: start,
          lt: end,
        },
      },
      orderBy: { date: "asc" },
      take: 1000,
    });

    const filteredRows = rows.filter((t) => !isInvestmentLike(t));

    if (!filteredRows.length) {
      return NextResponse.json(
        { error: "该月份暂无可分析的交易记录。", month: label },
        { status: 400 }
      );
    }

    const plainSummaryLines = filteredRows.map((t) => {
      const { date: dateStr, time: timeStr } = formatDateTimeInChina(t.date);
      const typeLabel = t.type === TransactionType.income ? "收入" : "支出";
      const parts = [
        `${dateStr} ${timeStr}`,
        `类型: ${typeLabel}`,
        `分类: ${t.category || "未分类"}`,
        `商家/名称: ${t.name}`,
        `账户: ${t.account}`,
        `金额: ${Number(t.amount).toFixed(2)} CNY`,
      ];
      if (t.note) {
        parts.push(`备注: ${t.note}`);
      }
      return parts.join(" | ");
    });

    const systemPrompt = await resolveExpenseAnalysisSystemPrompt();

    const userPrompt = `
分析月份：${label}
以下是该月份按时间排序的账单文本（每行一笔）：

${plainSummaryLines.join("\n")}
`;

    const model = getBailianModel();
    const endpoint = `${getBailianBaseUrl()}/chat/completions`;

    console.log("[AI-EXPENSE-ANALYSIS] Calling Bailian", {
      model,
      endpoint,
      month: label,
      count: filteredRows.length,
    });

    const resp = await fetchChatCompletions(
      [
        { role: "system", content: systemPrompt.trim() },
        { role: "user", content: userPrompt.trim() },
      ],
      { temperature: 0.3, stream: true, timeoutSec: 120 }
    );

    if (!resp.ok) {
      const message = await parseDashScopeError(resp);
      console.error("[AI-EXPENSE-ANALYSIS] Bailian error", {
        httpStatus: resp.status,
        error: message,
      });
      return NextResponse.json({ error: message }, { status: 500 });
    }

    if (!resp.body) {
      console.error("[AI-EXPENSE-ANALYSIS] Bailian stream has no body");
      return NextResponse.json(
        { error: "百炼返回为空流，请稍后重试。" },
        { status: 500 }
      );
    }

    const content = await parseSseStream(resp.body, () => {});

    if (typeof content !== "string" || !content.trim()) {
      console.error(
        "[AI-EXPENSE-ANALYSIS] Empty or invalid content from Bailian",
        {
          contentType: typeof content,
        }
      );
      return NextResponse.json(
        { error: "百炼返回内容为空或格式不正确。" },
        { status: 500 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error(
        "[AI-EXPENSE-ANALYSIS] Failed to parse Bailian content as JSON",
        {
          contentSnippet: content.slice(0, 500),
        }
      );
      return NextResponse.json(
        {
          error: "百炼返回的不是合法 JSON，请稍后重试或调整提示词。",
        },
        { status: 500 }
      );
    }

    const record = await prisma.monthlyExpenseAnalysis.create({
      data: {
        month: label,
        type: "expense",
        content: JSON.stringify(parsed),
      },
    });

    return NextResponse.json({
      month: label,
      analysis: parsed,
      id: record.id,
      createdAt: record.createdAt.toISOString(),
    });
  } catch (e) {
    console.error("[AI-EXPENSE-ANALYSIS] POST failed", e);
    if (e instanceof Error && e.message.includes("月份参数格式错误")) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "生成月度支出分析时发生错误，请稍后重试。" },
      { status: 500 }
    );
  }
}
