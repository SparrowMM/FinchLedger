import { NextResponse } from "next/server";
import { buildBillAgentContext } from "@/lib/bill-agent-context";
import {
  fetchChatCompletions,
  missingKeyHint,
  parseDashScopeError,
} from "@/lib/bailian-client";
import { getBailianApiKey, getBailianBaseUrl, getBailianModel } from "@/lib/env";

type ChatMessage = { role: string; content: string };

function nowMs() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

function createRequestId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? `bag-${crypto.randomUUID().slice(0, 8)}`
    : `bag-${Math.random().toString(36).slice(2, 10)}`;
}

const SYSTEM_INSTRUCTIONS = `你是 FinchLedger 的个人账单助手「账单 Agent」。用户在同一台服务器上的本地账本数据会以 JSON 形式提供；你必须基于这些数据回答，不要编造不存在的交易。
规则：
- 金额单位为人民币（CNY）；未说明时默认指账本中的数值。
- 若问题需要的粒度比提供的数据更细（例如要求某条不在明细里的具体记录），说明当前数据范围，并建议用户换问法或去「支出流水 / 收入流水」页核对。
- 回答使用简体中文，条理清晰；可做合理归纳与建议，但与金额、笔数、日期相关的陈述必须以提供的数据为准。
- 明细行为制表符分隔字段：日期、类型(income/expense)、金额、类目、名称/对方、账户/方式、备注。`;

function normalizeMessages(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw)) return null;
  const out: ChatMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    if (trimmed.length > 12000) {
      out.push({ role, content: trimmed.slice(0, 12000) });
    } else {
      out.push({ role, content: trimmed });
    }
  }
  return out;
}

export async function POST(req: Request) {
  const requestId = createRequestId();
  const requestStart = nowMs();

  if (!getBailianApiKey()) {
    return NextResponse.json(
      { error: `服务器未配置百炼 API Key，请先设置 ${missingKeyHint}。` },
      { status: 500 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "请求体格式错误，应为 JSON。" },
      { status: 400 }
    );
  }

  const messages = normalizeMessages(body.messages);
  if (!messages || messages.length === 0) {
    return NextResponse.json(
      { error: "请提供非空的 messages 数组（仅支持 user / assistant 角色）。" },
      { status: 400 }
    );
  }

  const lastMustBeUser = messages[messages.length - 1]?.role === "user";
  if (!lastMustBeUser) {
    return NextResponse.json(
      { error: "最后一条消息须为用户问题（role: user）。" },
      { status: 400 }
    );
  }

  const history = messages.slice(-24);

  let contextJson: string;
  try {
    const ctx = await buildBillAgentContext();
    contextJson = JSON.stringify(ctx);
  } catch (e) {
    console.error("[BILL-AGENT] Context build failed", { requestId, error: e });
    return NextResponse.json(
      { error: "读取账本数据失败，请稍后重试。" },
      { status: 500 }
    );
  }

  const systemContent = `${SYSTEM_INSTRUCTIONS}\n\n当前账本快照（JSON）：\n${contextJson}`;
  const model = getBailianModel();
  const endpoint = `${getBailianBaseUrl()}/chat/completions`;

  try {
    console.log("[BILL-AGENT] Calling Bailian", {
      requestId,
      model,
      endpoint,
      historyTurns: history.length,
      contextBytes: Buffer.byteLength(contextJson, "utf8"),
    });

    const dashscopeStart = nowMs();
    const resp = await fetchChatCompletions(
      [
        { role: "system", content: systemContent },
        ...history.map((m) => ({ role: m.role, content: m.content })),
      ],
      { temperature: 0.4, stream: true, timeoutSec: 120 }
    );
    const dashscopeElapsedMs = nowMs() - dashscopeStart;

    if (!resp.ok) {
      const message = await parseDashScopeError(resp);
      console.error("[BILL-AGENT] Bailian error", {
        requestId,
        httpStatus: resp.status,
        message,
        dashscopeElapsedMs: Number(dashscopeElapsedMs.toFixed(2)),
      });
      return NextResponse.json({ error: message }, { status: 500 });
    }

    if (!resp.body) {
      return NextResponse.json(
        { error: "百炼返回为空流，请稍后重试。" },
        { status: 500 }
      );
    }

    console.log("[BILL-AGENT] Stream started", {
      requestId,
      dashscopeElapsedMs: Number(dashscopeElapsedMs.toFixed(2)),
      totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
    });

    return new Response(resp.body, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.error("[BILL-AGENT] Unhandled error", {
      requestId,
      error: e,
      totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
    });
    return NextResponse.json(
      { error: "调用百炼接口时发生错误，请稍后重试。" },
      { status: 500 }
    );
  }
}
