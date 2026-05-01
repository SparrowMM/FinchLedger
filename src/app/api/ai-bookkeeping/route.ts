import { NextResponse } from "next/server";
import { resolveBookkeepingSystemPrompt } from "@/lib/ai-prompts-db";
import { getBookkeepingPromptVarsForChannel } from "@/lib/bookkeeping-prompt-vars";
import { safeErrorMeta } from "@/lib/api-logger";
import { parseJsonFromAiText } from "@/lib/ai-json";

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;
const DASHSCOPE_MODEL = process.env.DASHSCOPE_MODEL || "qwen-plus";

type SupportedChannel = "alipay" | "wechat" | "cmb" | "icbc";

type DashScopeErrorBody = {
  error?: {
    message?: string;
    error_msg?: string;
  };
  message?: string;
  /** 部分错误响应在根级携带 error_msg */
  error_msg?: string;
};

type DashScopeResponseBody = DashScopeErrorBody & {
  choices?: Array<{
    message?: { content?: string };
    text?: string;
  }>;
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

/**
 * 针对原始账单文本做一层通用脱敏，优先保护个人隐私信息。
 * 注意：这里只做「尽力而为」的敏感模式替换，并不能保证 100% 覆盖所有场景。
 */
function sanitizeRawContent(
  channel: SupportedChannel,
  content: string
): string {
  let sanitized = content;

  // 手机号（含带区号/86 的常见形式），要求左右都不是数字，避免误伤订单号等长串数字
  sanitized = sanitized.replace(
    /(?<!\d)(\+?86[-\s]*)?1[3-9]\d{9}(?!\d)/g,
    "[手机号码已隐藏]"
  );

  // 邮箱
  sanitized = sanitized.replace(
    /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,
    "[邮箱已隐藏]"
  );

  // 身份证号（18 位或 15 位）
  sanitized = sanitized.replace(
    /\b\d{6}(19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]\b/g,
    "[身份证号已隐藏]"
  );
  sanitized = sanitized.replace(/\b\d{15}\b/g, "[身份证号已隐藏]");

  // 银行卡 / 账户号（连续 12 位以上数字，避免过多误伤）
  sanitized = sanitized.replace(
    /\b\d{12,19}\b/g,
    "[卡号/账号已隐藏]"
  );

  // 像「账号:[158xxxx]」这种模式，整段替换为账号已隐藏
  sanitized = sanitized.replace(
    /(账号)\s*:\s*\[[^\]]+\]/g,
    "账号:[已隐藏]"
  );

  // 支付宝账号 ID（常见 2088 开头的一长串数字）
  if (channel === "alipay") {
    sanitized = sanitized.replace(
      /\b2088\d{6,}\b/g,
      "[支付宝账号ID已隐藏]"
    );

    // 支付宝导出结尾处的「用户:姓名」信息
    sanitized = sanitized.replace(
      /(用户)[：:\s]*[^\s，,]+/g,
      "用户:[已隐藏]"
    );
  }

  // 账户名字段后面的中文姓名或账号（支付宝/微信常见表头）
  sanitized = sanitized.replace(
    /(账户名|户名|姓名|我的账户|付款方账户|收款方账户)[：:\s]*[^\s，,]{2,15}/g,
    (m, p1) => `${p1}[已隐藏]`
  );

  // 支付宝、微信特有的一些「我的信息」字段
  if (channel === "alipay" || channel === "wechat") {
    sanitized = sanitized.replace(
      /(用户名称|登录账号|支付宝账户|微信昵称|微信号)[：:\s]*[^\s，,]{2,30}/g,
      (m, p1) => `${p1}[已隐藏]`
    );
  }

  return sanitized;
}

export async function POST(req: Request) {
  const requestId = createRequestId("abk");
  const requestStart = nowMs();
  const { searchParams } = new URL(req.url);
  const streamMode = searchParams.get("stream") === "1";
  if (!DASHSCOPE_API_KEY) {
    return NextResponse.json(
      { error: "服务器未配置百炼 API Key，请先设置 DASHSCOPE_API_KEY。" },
      { status: 500 }
    );
  }

  let body: { channel?: string; rawContent?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "请求体格式错误，应为 JSON。" },
      { status: 400 }
    );
  }

  const channel = body.channel?.trim() as SupportedChannel | undefined;
  const rawContent = body.rawContent?.trim();

  // 只记录长度，避免把原始账单全文打到日志里
  console.log("[AI-BOOKKEEPING] Incoming request", {
    requestId,
    channel,
    rawContentLength: rawContent?.length ?? 0,
    streamMode,
  });

  const supportedChannels: SupportedChannel[] = [
    "alipay",
    "wechat",
    "cmb",
    "icbc",
  ];

  if (!channel || !supportedChannels.includes(channel)) {
    return NextResponse.json(
      {
        error:
          "缺少或不支持的渠道类型 channel，目前支持：alipay（支付宝）、wechat（微信）、cmb（招商银行）、icbc（工商银行）。",
      },
      { status: 400 }
    );
  }

  if (!rawContent) {
    return NextResponse.json(
      { error: "缺少流水内容 rawContent。" },
      { status: 400 }
    );
  }

  // 在进入大模型前统一进行脱敏处理
  const sanitizeStart = nowMs();
  const sanitizedRawContent = sanitizeRawContent(channel, rawContent);
  const sanitizeElapsedMs = nowMs() - sanitizeStart;

  const categoriesStart = nowMs();
  const promptVars = await getBookkeepingPromptVarsForChannel(channel);
  const categoriesElapsedMs = nowMs() - categoriesStart;

  const systemPrompt = await resolveBookkeepingSystemPrompt(promptVars);

  const basePayload = {
    model: DASHSCOPE_MODEL,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `你必须只返回合法 JSON 对象，不要使用 Markdown 代码块（不要输出 \`\`\`json），也不要输出任何额外说明文本。\n\nchannel: ${channel}\n\nrawContent（已做隐私脱敏）:\n${sanitizedRawContent}`,
      },
    ],
    temperature: 0.3,
  } as const;

  const dashscopePayload = streamMode
    ? { ...basePayload, stream: true }
    : basePayload;

  try {
    const payloadBuildStart = nowMs();
    const payloadJson = JSON.stringify(dashscopePayload);
    const payloadBuildElapsedMs = nowMs() - payloadBuildStart;

    console.log("[AI-BOOKKEEPING] Calling DashScope (OpenAI compatible)", {
      requestId,
      model: DASHSCOPE_MODEL,
      endpoint: "https://coding.dashscope.aliyuncs.com/v1/chat/completions",
      streamMode,
      rawContentLength: rawContent.length,
      sanitizedRawContentLength: sanitizedRawContent.length,
      promptLength: systemPrompt.length,
      payloadBytes: Buffer.byteLength(payloadJson, "utf8"),
      sanitizeElapsedMs: Number(sanitizeElapsedMs.toFixed(2)),
      categoriesElapsedMs: Number(categoriesElapsedMs.toFixed(2)),
      payloadBuildElapsedMs: Number(payloadBuildElapsedMs.toFixed(2)),
    });

    const dashscopeStart = nowMs();
    const resp = await fetch(
      "https://coding.dashscope.aliyuncs.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DASHSCOPE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: payloadJson,
      }
    );
    const dashscopeElapsedMs = nowMs() - dashscopeStart;

    if (streamMode) {
      if (!resp.ok) {
        let errorBody: DashScopeErrorBody | null = null;
        try {
          errorBody = await resp.json();
        } catch {
          // ignore
        }
        const message =
          errorBody?.error?.message ||
          errorBody?.message ||
          "调用百炼失败，请稍后重试。";
        console.error("[AI-BOOKKEEPING] DashScope stream error", {
          requestId,
          httpStatus: resp.status,
          error: errorBody?.error?.message || errorBody?.message || "dashscope_error",
          dashscopeElapsedMs: Number(dashscopeElapsedMs.toFixed(2)),
        });
        return NextResponse.json({ error: message }, { status: 500 });
      }

      if (!resp.body) {
        console.error("[AI-BOOKKEEPING] DashScope stream has no body");
        return NextResponse.json(
          { error: "百炼返回为空流，请稍后重试。" },
          { status: 500 }
        );
      }

      return new Response(resp.body, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    const data = (await resp.json()) as DashScopeResponseBody;
    const totalElapsedMs = nowMs() - requestStart;

    console.log("[AI-BOOKKEEPING] DashScope response meta", {
      requestId,
      httpStatus: resp.status,
      ok: resp.ok,
      error: data?.error,
      dashscopeElapsedMs: Number(dashscopeElapsedMs.toFixed(2)),
      totalElapsedMs: Number(totalElapsedMs.toFixed(2)),
    });

    if (!resp.ok || data?.error) {
      const errorObj = data?.error ?? data;
      const message =
        errorObj?.message ||
        errorObj?.error_msg ||
        "调用百炼失败，请稍后重试。";
      console.error("[AI-BOOKKEEPING] DashScope error", {
        requestId,
        httpStatus: resp.status,
        error: errorObj,
        dashscopeElapsedMs: Number(dashscopeElapsedMs.toFixed(2)),
      });
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const content =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      "";

    if (typeof content !== "string" || !content.trim()) {
      console.error("[AI-BOOKKEEPING] Empty or invalid content from DashScope", {
        contentType: typeof content,
      });
      return NextResponse.json(
        { error: "百炼返回内容为空或格式不正确。" },
        { status: 500 }
      );
    }

    const parseStart = nowMs();
    const parsed = parseJsonFromAiText<{ transactions?: unknown; summary?: unknown }>(
      content
    );
    const parseElapsedMs = nowMs() - parseStart;

    if (!parsed) {
      console.error("[AI-BOOKKEEPING] Failed to parse DashScope content as JSON", {
        requestId,
        contentLength: content.length,
      });
      return NextResponse.json(
        {
          error:
            "百炼返回的不是合法 JSON，请稍后重试或调整提示词。",
        },
        { status: 500 }
      );
    }

    if (!Array.isArray(parsed.transactions)) {
      console.error("[AI-BOOKKEEPING] Parsed JSON missing transactions array", {
        requestId,
        parsedSnippet: JSON.stringify(parsed).slice(0, 500),
      });
      return NextResponse.json(
        {
          error: "AI 返回 JSON 缺少 transactions 数组，请稍后重试。",
        },
        { status: 500 }
      );
    }

    console.log("[AI-BOOKKEEPING] JSON parse done", {
      requestId,
      parseElapsedMs: Number(parseElapsedMs.toFixed(2)),
      contentLength: content.length,
    });

    console.log("[AI-BOOKKEEPING] Parsed AI result", {
      requestId,
      transactionsCount: Array.isArray(parsed?.transactions)
        ? parsed.transactions.length
        : null,
      hasSummary: typeof parsed?.summary === "string",
      totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
    });

    return NextResponse.json(parsed);
  } catch (e) {
    const isTimeoutError =
      e instanceof Error &&
      (e.name === "TimeoutError" ||
        e.name === "AbortError" ||
        e.message.includes("aborted"));
    if (isTimeoutError) {
      console.error("[AI-BOOKKEEPING] DashScope request timeout", {
        requestId,
        totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
      });
      return NextResponse.json(
        { error: "AI 解析超时，请缩短文本后重试。" },
        { status: 504 }
      );
    }
    console.error("[AI-BOOKKEEPING] Unhandled error", {
      requestId,
      error: safeErrorMeta(e),
      totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
    });
    return NextResponse.json(
      { error: "调用百炼接口时发生错误，请稍后重试。" },
      { status: 500 }
    );
  }
}

