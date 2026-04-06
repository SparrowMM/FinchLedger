import { NextResponse } from "next/server";
import {
  AI_PROMPT_KEY_BOOKKEEPING,
  AI_PROMPT_KEY_EXPENSE_ANALYSIS,
  applyBookkeepingPlaceholders,
  validateBookkeepingPromptPlaceholders,
} from "@/lib/ai-prompts-defaults";
import { resolveBookkeepingSystemPrompt, resolveExpenseAnalysisSystemPrompt } from "@/lib/ai-prompts-db";
import { getBookkeepingPromptVarsForChannel } from "@/lib/bookkeeping-prompt-vars";
import {
  isBookkeepingImportChannel,
  type BookkeepingImportChannel,
} from "@/lib/import-channels";

const KEYS = [AI_PROMPT_KEY_BOOKKEEPING, AI_PROMPT_KEY_EXPENSE_ANALYSIS] as const;
type Key = (typeof KEYS)[number];

function isKey(k: string): k is Key {
  return (KEYS as readonly string[]).includes(k);
}

/**
 * POST { key, template?: string | null, channel?: string }
 * - 记账类可传 channel（alipay|wechat|cmb|icbc），用于「当前导入类型」占位符与默认支付方式；缺省为 alipay
 * - template 缺省或 null：返回当前「生效」系统提示（库内或内置默认 + 占位符替换）
 * - template 有值：按该字符串预览替换后的结果（记账会校验占位符；分析类为整段原文）
 */
export async function POST(req: Request) {
  let body: { key?: string; template?: string | null; channel?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求体应为 JSON。" }, { status: 400 });
  }

  const key = typeof body.key === "string" ? body.key.trim() : "";
  const hasTemplate =
    typeof body.template === "string" && body.template.length > 0;
  const channelRaw =
    typeof body.channel === "string" ? body.channel.trim() : "alipay";
  const previewChannel: BookkeepingImportChannel = isBookkeepingImportChannel(
    channelRaw
  )
    ? channelRaw
    : "alipay";

  if (!key || !isKey(key)) {
    return NextResponse.json({ error: "缺少或未知的 key。" }, { status: 400 });
  }

  try {
    if (key === AI_PROMPT_KEY_BOOKKEEPING) {
      const vars = await getBookkeepingPromptVarsForChannel(previewChannel);
      if (!hasTemplate) {
        const resolved = await resolveBookkeepingSystemPrompt(vars);
        return NextResponse.json({
          key,
          mode: "effective" as const,
          channel: previewChannel,
          resolved,
          charCount: resolved.length,
        });
      }
      const v = validateBookkeepingPromptPlaceholders(body.template!);
      if (!v.ok) {
        return NextResponse.json(
          {
            error: `草稿缺少占位符：${v.missing.join("、")}。`,
          },
          { status: 400 }
        );
      }
      const resolved = applyBookkeepingPlaceholders(body.template!, vars);
      return NextResponse.json({
        key,
        mode: "draft" as const,
        channel: previewChannel,
        resolved,
        charCount: resolved.length,
      });
    }

    // expense_analysis_system
    if (!hasTemplate) {
      const resolved = await resolveExpenseAnalysisSystemPrompt();
      return NextResponse.json({
        key,
        mode: "effective" as const,
        resolved,
        charCount: resolved.length,
      });
    }
    const resolved = body.template!.trim();
    return NextResponse.json({
      key,
      mode: "draft" as const,
      resolved,
      charCount: resolved.length,
    });
  } catch (e) {
    console.error("[AI-PROMPTS-PREVIEW] POST failed", e);
    return NextResponse.json(
      { error: "生成预览失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
