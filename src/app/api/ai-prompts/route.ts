import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  AI_PROMPT_KEY_BOOKKEEPING,
  AI_PROMPT_KEY_EXPENSE_ANALYSIS,
  BOOKKEEPING_PLACEHOLDER_CURRENT_CHANNEL,
  BOOKKEEPING_PLACEHOLDER_CURRENT_METHOD,
  BOOKKEEPING_PLACEHOLDER_EXPENSE,
  BOOKKEEPING_PLACEHOLDER_IMPORT_GUIDE,
  BOOKKEEPING_PLACEHOLDER_INCOME,
  BOOKKEEPING_PLACEHOLDER_PAYMENT,
  DEFAULT_BOOKKEEPING_TEMPLATE,
  DEFAULT_EXPENSE_ANALYSIS_SYSTEM,
  validateBookkeepingPromptPlaceholders,
} from "@/lib/ai-prompts-defaults";

const KNOWN_KEYS = [AI_PROMPT_KEY_BOOKKEEPING, AI_PROMPT_KEY_EXPENSE_ANALYSIS] as const;

type KnownKey = (typeof KNOWN_KEYS)[number];

function isKnownKey(k: string): k is KnownKey {
  return (KNOWN_KEYS as readonly string[]).includes(k);
}

type AiPromptDelegate = {
  findMany: (args: {
    where: { key: { in: string[] } };
  }) => Promise<
    { key: string; content: string; updatedAt: Date }[]
  >;
  deleteMany: (args: { where: { key: string } }) => Promise<unknown>;
  upsert: (args: {
    where: { key: string };
    create: { key: string; content: string };
    update: { content: string };
  }) => Promise<unknown>;
};

function getAiPromptDelegate(): AiPromptDelegate | null {
  const d = (prisma as unknown as { aiPrompt?: AiPromptDelegate }).aiPrompt;
  return d ?? null;
}

function stalePrismaClientResponse() {
  return NextResponse.json(
    {
      error:
        "Prisma 客户端尚未包含 AiPrompt 模型。请在项目根目录执行 `npx prisma generate`，然后重启 `npm run dev`（仅 generate 不够，需重启开发服务器）。",
    },
    { status: 503 }
  );
}

const META: Record<
  KnownKey,
  { label: string; hint: string }
> = {
  [AI_PROMPT_KEY_BOOKKEEPING]: {
    label: "AI 自动记账 · 系统提示词",
    hint: `保存前请保留占位符：${BOOKKEEPING_PLACEHOLDER_EXPENSE}、${BOOKKEEPING_PLACEHOLDER_INCOME}、${BOOKKEEPING_PLACEHOLDER_PAYMENT}、${BOOKKEEPING_PLACEHOLDER_IMPORT_GUIDE}、${BOOKKEEPING_PLACEHOLDER_CURRENT_CHANNEL}、${BOOKKEEPING_PLACEHOLDER_CURRENT_METHOD}。导入类型与默认支付方式的映射在「支出分类管理 → 支付方式」中配置。`,
  },
  [AI_PROMPT_KEY_EXPENSE_ANALYSIS]: {
    label: "月度账单分析 · 系统提示词",
    hint: "用于 /api/ai-expense-analysis 的系统提示词；无占位符，可直接整段编辑。",
  },
};

export async function GET() {
  const aiPrompt = getAiPromptDelegate();
  if (!aiPrompt) {
    return stalePrismaClientResponse();
  }

  try {
    const rows = await aiPrompt.findMany({
      where: { key: { in: [...KNOWN_KEYS] } },
    });
    const byKey = new Map(rows.map((r) => [r.key, r]));

    const prompts = KNOWN_KEYS.map((key) => {
      const row = byKey.get(key);
      const defaultContent =
        key === AI_PROMPT_KEY_BOOKKEEPING
          ? DEFAULT_BOOKKEEPING_TEMPLATE.trim()
          : DEFAULT_EXPENSE_ANALYSIS_SYSTEM.trim();
      const stored = row?.content;
      const fromDatabase = Boolean(stored && stored.trim() !== "");
      const content = fromDatabase ? stored!.trim() : defaultContent;
      return {
        key,
        label: META[key].label,
        hint: META[key].hint,
        content,
        defaultContent,
        fromDatabase,
        updatedAt: row?.updatedAt?.toISOString() ?? null,
      };
    });

    return NextResponse.json({ prompts });
  } catch (e) {
    console.error("[AI-PROMPTS] GET failed", e);
    return NextResponse.json(
      { error: "读取 AI 提示词失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  let body: { key?: string; content?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求体应为 JSON。" }, { status: 400 });
  }

  const key = typeof body.key === "string" ? body.key.trim() : "";
  const content = typeof body.content === "string" ? body.content : "";

  if (!key || !isKnownKey(key)) {
    return NextResponse.json(
      { error: "缺少或未知的 key。" },
      { status: 400 }
    );
  }

  const aiPrompt = getAiPromptDelegate();
  if (!aiPrompt) {
    return stalePrismaClientResponse();
  }

  try {
    const trimmed = content.trim();
    if (trimmed === "") {
      await aiPrompt.deleteMany({ where: { key } });
      return NextResponse.json({ ok: true, key, reverted: true });
    }

    if (key === AI_PROMPT_KEY_BOOKKEEPING) {
      const v = validateBookkeepingPromptPlaceholders(content);
      if (!v.ok) {
        return NextResponse.json(
          {
            error: `记账提示词缺少必要占位符：${v.missing.join("、")}。请保留这三段，以便注入当前支出类目、收入类目与支付方式列表。`,
          },
          { status: 400 }
        );
      }
    }

    await aiPrompt.upsert({
      where: { key },
      create: { key, content: content },
      update: { content: content },
    });

    return NextResponse.json({ ok: true, key, reverted: false });
  } catch (e) {
    console.error("[AI-PROMPTS] PUT failed", e);
    return NextResponse.json(
      { error: "保存 AI 提示词失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
