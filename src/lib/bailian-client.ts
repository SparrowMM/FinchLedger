import {
  getBailianApiKey,
  getBailianBaseUrl,
  getBailianModel,
  getBailianVisionApiKey,
  getBailianVisionBaseUrl,
  getBailianVisionModel,
  normalizeOpenAiCompatibleBaseUrl,
} from "@/lib/env";

type ChatContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export type ChatMessage =
  | { role: string; content: string }
  | { role: string; content: ChatContentPart[] };

export type ChatOptions = {
  temperature?: number;
  scenario?: string;
  model?: string;
  baseUrlOverride?: string;
  apiKeyOverride?: string;
  timeoutSec?: number;
  maxTokens?: number | null;
  stream?: boolean;
};

type DashScopeErrorBody = {
  error?: { message?: string; error_msg?: string };
  message?: string;
  error_msg?: string;
};

function convertMessagesForDashscopeMm(rawMessages: ChatMessage[]) {
  const converted: { role: string; content: Array<{ text?: string; image?: string }> }[] = [];
  for (const msg of rawMessages) {
    const role = String(msg.role || "user");
    const content = msg.content;
    if (typeof content === "string") {
      converted.push({ role, content: [{ text: content }] });
      continue;
    }
    const parts: Array<{ text?: string; image?: string }> = [];
    for (const item of content) {
      if (item.type === "text" && item.text) {
        parts.push({ text: item.text });
      } else if (item.type === "image_url" && item.image_url?.url) {
        parts.push({ image: item.image_url.url });
      }
    }
    if (parts.length) {
      converted.push({ role, content: parts });
    }
  }
  return converted;
}

function isMultimodalBaseUrl(baseUrl: string): boolean {
  try {
    const url = new URL(baseUrl);
    return url.pathname
      .replace(/\/+$/, "")
      .endsWith("/api/v1/services/aigc/multimodal-generation");
  } catch {
    return baseUrl
      .replace(/\/+$/, "")
      .includes("/api/v1/services/aigc/multimodal-generation");
  }
}

function buildHeaders(apiKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

function parseNonStreamContent(
  data: Record<string, unknown>,
  baseUrl: string
): string {
  if (isMultimodalBaseUrl(baseUrl)) {
    const choices = (data.output as Record<string, unknown> | undefined)?.choices as
      | Array<{ message?: { content?: unknown } }>
      | undefined;
    const mmContent = choices?.[0]?.message?.content;
    if (Array.isArray(mmContent)) {
      return mmContent
        .map((x) =>
          typeof x === "object" && x && "text" in x
            ? String((x as { text?: string }).text ?? "")
            : ""
        )
        .join("\n")
        .trim();
    }
    return "";
  }

  const choices = data.choices as Array<{ message?: { content?: string } }> | undefined;
  return (choices?.[0]?.message?.content ?? "").trim();
}

export async function parseDashScopeError(resp: Response): Promise<string> {
  try {
    const body = (await resp.json()) as DashScopeErrorBody;
    return (
      body?.error?.message ||
      body?.error?.error_msg ||
      body?.message ||
      body?.error_msg ||
      "调用百炼失败，请稍后重试。"
    );
  } catch {
    return "调用百炼失败，请稍后重试。";
  }
}

export async function fetchChatCompletions(
  messages: ChatMessage[],
  options: ChatOptions = {}
): Promise<Response> {
  const temperature = options.temperature ?? 0.3;
  const modelName = options.model ?? getBailianModel();
  const apiKey = options.apiKeyOverride ?? getBailianApiKey();
  const stream = options.stream ?? false;

  if (!apiKey) {
    throw new Error("missing_api_key");
  }

  const baseUrl = normalizeOpenAiCompatibleBaseUrl(
    options.baseUrlOverride ?? getBailianBaseUrl()
  );
  const headers = buildHeaders(apiKey);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), (options.timeoutSec ?? 120) * 1000);

  try {
    if (isMultimodalBaseUrl(baseUrl)) {
      const mmPayload: Record<string, unknown> = {
        model: modelName,
        input: { messages: convertMessagesForDashscopeMm(messages) },
        parameters: { temperature },
      };
      if (options.maxTokens != null) {
        (mmPayload.parameters as Record<string, unknown>).max_tokens = options.maxTokens;
      }
      const mmUrl = baseUrl.endsWith("/generation") ? baseUrl : `${baseUrl}/generation`;
      return await fetch(mmUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(mmPayload),
        signal: ctrl.signal,
      });
    }

    const payload: Record<string, unknown> = {
      model: modelName,
      messages,
      temperature,
      stream,
    };
    if (options.maxTokens != null) {
      payload.max_tokens = options.maxTokens;
    }

    return await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function chatWithStatus(
  messages: ChatMessage[],
  options: ChatOptions = {}
): Promise<{ content: string; error: string }> {
  const apiKey = options.apiKeyOverride ?? getBailianApiKey();
  const baseUrl = normalizeOpenAiCompatibleBaseUrl(
    options.baseUrlOverride ?? getBailianBaseUrl()
  );

  if (!apiKey) {
    return { content: "", error: "missing_api_key" };
  }

  if (options.stream) {
    return { content: "", error: "stream_not_supported_in_chatWithStatus" };
  }

  try {
    const resp = await fetchChatCompletions(messages, options);
    if (!resp.ok) {
      return { content: "", error: await parseDashScopeError(resp) };
    }

    const data = (await resp.json()) as Record<string, unknown>;
    const content = parseNonStreamContent(data, baseUrl);
    return { content, error: content ? "" : "模型返回空内容" };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === "missing_api_key") {
      return { content: "", error: "missing_api_key" };
    }
    return { content: "", error: msg };
  }
}

export async function chat(
  messages: ChatMessage[],
  options: ChatOptions = {}
): Promise<string> {
  const { content } = await chatWithStatus(messages, options);
  return content;
}

const CHANNEL_LABELS: Record<string, string> = {
  alipay: "支付宝",
  wechat: "微信支付",
  cmb: "招商银行",
  icbc: "工商银行",
};

export async function imageToBillText(
  imageBytes: Buffer,
  mimeType: string,
  channel: string
): Promise<string> {
  const { content } = await imageToBillTextWithStatus(imageBytes, mimeType, channel);
  return content;
}

export async function imageToBillTextWithStatus(
  imageBytes: Buffer,
  mimeType: string,
  channel: string
): Promise<{ content: string; error: string }> {
  const channelLabel = CHANNEL_LABELS[channel] ?? channel;
  const prompt = `请识别这张${channelLabel}账单截图中的全部交易明细，输出为纯文本（TSV 或逐行描述均可）。

要求：
1) 仅输出账单正文，不要输出额外解释或 Markdown 代码块；
2) 尽量保留日期、时间、金额、收支方向、对方账户/商户、摘要/备注等字段；
3) 按时间顺序列出所有可见交易，不要遗漏；
4) 禁止编造截图中未出现的金额、商户名或日期；
5) 若某字段在截图中不可见，可省略该字段，不要猜测。`;

  const base64Image = imageBytes.toString("base64");
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: "你是专业财务助理，擅长从账单截图中提取结构化交易文本。",
    },
    {
      role: "user",
      content: [
        { type: "text", text: prompt },
        {
          type: "image_url",
          image_url: { url: `data:${mimeType};base64,${base64Image}` },
        },
      ],
    },
  ];

  return chatWithStatus(messages, {
    temperature: 0.1,
    scenario: "image_to_bill_text",
    model: getBailianVisionModel(),
    baseUrlOverride: getBailianVisionBaseUrl(),
    apiKeyOverride: getBailianVisionApiKey(),
    timeoutSec: 90,
  });
}

export const missingKeyHint =
  "缺少 BAILIAN_API_KEY（旧别名 DASHSCOPE_API_KEY 亦可）";

export const missingVisionKeyHint =
  "缺少 BAILIAN_VISION_API_KEY，或可复用的 BAILIAN_API_KEY（旧别名 DASHSCOPE_* 亦可）";

export async function probeTextModel(): Promise<{ ok: boolean; error: string }> {
  if (!getBailianApiKey()) {
    return { ok: false, error: missingKeyHint };
  }
  const { content, error } = await chatWithStatus(
    [
      { role: "system", content: "你是健康检查助手。" },
      { role: "user", content: "请只回复 OK" },
    ],
    {
      temperature: 0,
      scenario: "health_probe_text",
      model: getBailianModel(),
      timeoutSec: 8,
      maxTokens: 8,
    }
  );
  if (error === "missing_api_key") {
    return { ok: false, error: missingKeyHint };
  }
  if (error) {
    return { ok: false, error };
  }
  return { ok: Boolean(content), error: content ? "" : "模型返回空内容" };
}

export async function probeVisionModel(): Promise<{ ok: boolean; error: string }> {
  if (!getBailianVisionApiKey()) {
    return { ok: false, error: missingVisionKeyHint };
  }
  if (!getBailianVisionModel()) {
    return {
      ok: false,
      error: "缺少 BAILIAN_VISION_MODEL（旧别名 DASHSCOPE_VISION_MODEL 亦可）",
    };
  }
  const sampleImageUrl =
    "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg";
  const { content, error } = await chatWithStatus(
    [
      { role: "system", content: "你是健康检查助手。" },
      {
        role: "user",
        content: [
          { type: "text", text: "请识别图片，并仅回复 OK。" },
          { type: "image_url", image_url: { url: sampleImageUrl } },
        ],
      },
    ],
    {
      temperature: 0,
      scenario: "health_probe_vision",
      model: getBailianVisionModel(),
      baseUrlOverride: getBailianVisionBaseUrl(),
      apiKeyOverride: getBailianVisionApiKey(),
      timeoutSec: 10,
      maxTokens: 8,
    }
  );
  if (error === "missing_api_key") {
    return { ok: false, error: missingVisionKeyHint };
  }
  if (error) {
    return { ok: false, error };
  }
  return { ok: Boolean(content), error: content ? "" : "模型返回空内容" };
}
