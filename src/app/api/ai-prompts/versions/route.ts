import { NextResponse } from "next/server";
import {
  getAiPromptVersionDelegate,
  listAiPromptVersionSummaries,
} from "@/lib/ai-prompt-versions";
import {
  AI_PROMPT_KEY_BOOKKEEPING,
  AI_PROMPT_KEY_EXPENSE_ANALYSIS,
} from "@/lib/ai-prompts-defaults";

const KNOWN_KEYS = [
  AI_PROMPT_KEY_BOOKKEEPING,
  AI_PROMPT_KEY_EXPENSE_ANALYSIS,
] as const;

function isKnownKey(k: string): k is (typeof KNOWN_KEYS)[number] {
  return (KNOWN_KEYS as readonly string[]).includes(k);
}

function staleVersionDelegateResponse() {
  return NextResponse.json(
    {
      error:
        "Prisma 客户端尚未包含 AiPromptVersion 模型。请在项目根目录执行 `npx prisma generate`，然后重启 `npm run dev`。",
    },
    { status: 503 }
  );
}

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key")?.trim() ?? "";
  if (!key || !isKnownKey(key)) {
    return NextResponse.json(
      { error: "缺少或未知的 key。" },
      { status: 400 }
    );
  }

  if (!getAiPromptVersionDelegate()) {
    return staleVersionDelegateResponse();
  }

  try {
    const versions = await listAiPromptVersionSummaries(key);
    if (versions === null) {
      return staleVersionDelegateResponse();
    }
    return NextResponse.json({ versions });
  } catch (e) {
    console.error("[AI-PROMPTS-VERSIONS] GET failed", e);
    return NextResponse.json(
      { error: "读取历史版本失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
