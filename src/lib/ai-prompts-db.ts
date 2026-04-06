import { prisma } from "@/lib/prisma";
import {
  AI_PROMPT_KEY_BOOKKEEPING,
  AI_PROMPT_KEY_EXPENSE_ANALYSIS,
  applyBookkeepingPlaceholders,
  DEFAULT_BOOKKEEPING_TEMPLATE,
  DEFAULT_EXPENSE_ANALYSIS_SYSTEM,
  validateBookkeepingPromptPlaceholders,
  type BookkeepingPromptVars,
} from "@/lib/ai-prompts-defaults";

type AiPromptRow = { content: string };

type AiPromptFindDelegate = {
  findUnique: (args: {
    where: { key: string };
  }) => Promise<AiPromptRow | null>;
};

function aiPromptDelegate(): AiPromptFindDelegate | undefined {
  return (prisma as unknown as { aiPrompt?: AiPromptFindDelegate }).aiPrompt;
}

export async function resolveBookkeepingSystemPrompt(
  vars: BookkeepingPromptVars
): Promise<string> {
  const d = aiPromptDelegate();
  let row: AiPromptRow | null | undefined;
  if (d) {
    try {
      row = await d.findUnique({ where: { key: AI_PROMPT_KEY_BOOKKEEPING } });
    } catch {
      row = null;
    }
  }
  let template =
    row?.content?.trim() !== undefined && row.content.trim() !== ""
      ? row.content
      : DEFAULT_BOOKKEEPING_TEMPLATE;
  if (
    template !== DEFAULT_BOOKKEEPING_TEMPLATE &&
    !validateBookkeepingPromptPlaceholders(template).ok
  ) {
    console.warn(
      "[ai-prompts] 自定义记账提示词缺少新版占位符，已回退为内置默认模板"
    );
    template = DEFAULT_BOOKKEEPING_TEMPLATE;
  }
  return applyBookkeepingPlaceholders(template, vars);
}

export async function resolveExpenseAnalysisSystemPrompt(): Promise<string> {
  const d = aiPromptDelegate();
  let row: AiPromptRow | null | undefined;
  if (d) {
    try {
      row = await d.findUnique({ where: { key: AI_PROMPT_KEY_EXPENSE_ANALYSIS } });
    } catch {
      row = null;
    }
  }
  const raw =
    row?.content?.trim() !== undefined && row.content.trim() !== ""
      ? row.content
      : DEFAULT_EXPENSE_ANALYSIS_SYSTEM;
  return raw.trim();
}
