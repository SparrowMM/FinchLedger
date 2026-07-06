/**
 * 通用 SSE (Server-Sent Events) 文本流解析器。
 * 用于 DashScope OpenAI 兼容格式的流式 chat 响应。
 */

type StreamChunk = {
  error?: { message?: string; error_msg?: string };
  message?: string;
  error_msg?: string;
  choices?: Array<{
    delta?: { content?: string };
    message?: { content?: string };
    text?: string;
  }>;
};

/**
 * 从 ReadableStream 中逐 token 解析 SSE，每收到一段新 delta 就通过
 * `onDelta(accumulatedText)` 回调通知调用方（传入的是拼接后的完整文本）。
 *
 * @returns 最终拼接好的完整文本
 */
export async function parseSseStream(
  body: ReadableStream<Uint8Array>,
  onDelta: (accumulated: string) => void
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let full = "";

  function handleEvent(event: string) {
    const dataStr = event
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim())
      .join("\n")
      .trim();
    if (!dataStr || dataStr === "[DONE]") return;

    let parsed: StreamChunk;
    try {
      parsed = JSON.parse(dataStr);
    } catch {
      return;
    }

    const errorMessage =
      parsed.error?.message ||
      parsed.error?.error_msg ||
      parsed.message ||
      parsed.error_msg;
    if (errorMessage) {
      throw new Error(errorMessage);
    }

    const delta =
      parsed.choices?.[0]?.delta?.content ??
      parsed.choices?.[0]?.message?.content ??
      parsed.choices?.[0]?.text ??
      "";
    if (typeof delta === "string" && delta) {
      full += delta;
      onDelta(full);
    }
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const event of events) {
      handleEvent(event);
    }
  }

  if (buffer.trim()) {
    handleEvent(buffer);
  }

  return full;
}
