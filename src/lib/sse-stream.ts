/**
 * 通用 SSE (Server-Sent Events) 文本流解析器。
 * 用于 DashScope OpenAI 兼容格式的流式 chat 响应。
 */

type StreamChunk = {
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

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const event of events) {
      const line = event.trim();
      if (!line.startsWith("data:")) continue;
      const dataStr = line.slice(5).trim();
      if (!dataStr || dataStr === "[DONE]") continue;

      let parsed: StreamChunk;
      try {
        parsed = JSON.parse(dataStr);
      } catch {
        continue;
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
  }

  return full;
}
