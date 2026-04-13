import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  appendAiPromptVersionSnapshot,
  getAiPromptVersionById,
  getAiPromptVersionDelegate,
} from "@/lib/ai-prompt-versions";
import {
  AI_PROMPT_KEY_BOOKKEEPING,
  AI_PROMPT_KEY_EXPENSE_ANALYSIS,
  validateBookkeepingPromptPlaceholders,
} from "@/lib/ai-prompts-defaults";

const KNOWN_KEYS = [
  AI_PROMPT_KEY_BOOKKEEPING,
  AI_PROMPT_KEY_EXPENSE_ANALYSIS,
] as const;

type KnownKey = (typeof KNOWN_KEYS)[number];

function isKnownKey(k: string): k is KnownKey {
  return (KNOWN_KEYS as readonly string[]).includes(k);
}

type AiPromptDelegate = {
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

function staleResponse(message: string) {
  return NextResponse.json({ error: message }, { status: 503 });
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "缺少版本 id。" }, { status: 400 });
  }
  if (!getAiPromptVersionDelegate()) {
    return staleResponse(
      "Prisma 客户端尚未包含 AiPromptVersion 模型。请执行 `npx prisma generate` 并重启开发服务器。"
    );
  }

  try {
    const row = await getAiPromptVersionById(id);
    if (!row) {
      return NextResponse.json({ error: "未找到该历史版本。" }, { status: 404 });
    }
    return NextResponse.json({
      id: row.id,
      promptKey: row.promptKey,
      content: row.content,
      createdAt: row.createdAt.toISOString(),
    });
  } catch (e) {
    console.error("[AI-PROMPTS-VERSION] GET failed", e);
    return NextResponse.json(
      { error: "读取历史版本失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

/** 将指定快照写回 AiPrompt（与面板「保存」相同校验），并追加为新历史快照。 */
export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "缺少版本 id。" }, { status: 400 });
  }

  const aiPrompt = getAiPromptDelegate();
  if (!aiPrompt) {
    return staleResponse(
      "Prisma 客户端尚未包含 AiPrompt 模型。请执行 `npx prisma generate` 并重启开发服务器。"
    );
  }
  if (!getAiPromptVersionDelegate()) {
    return staleResponse(
      "Prisma 客户端尚未包含 AiPromptVersion 模型。请执行 `npx prisma generate` 并重启开发服务器。"
    );
  }

  try {
    const row = await getAiPromptVersionById(id);
    if (!row) {
      return NextResponse.json({ error: "未找到该历史版本。" }, { status: 404 });
    }

    const key = row.promptKey;
    if (!isKnownKey(key)) {
      return NextResponse.json({ error: "未知的提示词 key。" }, { status: 400 });
    }

    const content = row.content;
    const trimmed = content.trim();
    if (trimmed === "") {
      return NextResponse.json({ error: "该快照内容为空，无法恢复。" }, { status: 400 });
    }

    if (key === AI_PROMPT_KEY_BOOKKEEPING) {
      const v = validateBookkeepingPromptPlaceholders(content);
      if (!v.ok) {
        return NextResponse.json(
          {
            error: `记账提示词缺少必要占位符：${v.missing.join("、")}。`,
          },
          { status: 400 }
        );
      }
    }

    await aiPrompt.upsert({
      where: { key },
      create: { key, content },
      update: { content },
    });

    await appendAiPromptVersionSnapshot(key, content);

    return NextResponse.json({ ok: true, key });
  } catch (e) {
    console.error("[AI-PROMPTS-VERSION] POST restore failed", e);
    return NextResponse.json(
      { error: "恢复历史版本失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
