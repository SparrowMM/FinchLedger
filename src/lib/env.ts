// 主用变量名为 BAILIAN_*；DASHSCOPE_* 作为向后兼容别名，任填其一即可。

/** 兼容 OpenAI 的基址只应到 `/v1`，代码内会拼接 `/chat/completions`。若误填完整路径则自动去尾。 */
export function normalizeOpenAiCompatibleBaseUrl(raw: string): string {
  let u = raw.trim().replace(/\/+$/, "");
  const suffix = "/chat/completions";
  if (u.toLowerCase().endsWith(suffix)) {
    u = u.slice(0, -suffix.length).replace(/\/+$/, "");
  }
  return u;
}

export function getBailianApiKey(): string {
  return process.env.BAILIAN_API_KEY || process.env.DASHSCOPE_API_KEY || "";
}

export function getBailianBaseUrl(): string {
  const raw =
    process.env.BAILIAN_BASE_URL ||
    process.env.DASHSCOPE_BASE_URL ||
    "https://dashscope.aliyuncs.com/compatible-mode/v1";
  return normalizeOpenAiCompatibleBaseUrl(raw);
}

export function getBailianVisionBaseUrl(): string {
  const raw =
    process.env.BAILIAN_VISION_BASE_URL ||
    process.env.DASHSCOPE_VISION_BASE_URL ||
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation";
  return raw.trim().replace(/\/+$/, "");
}

/** 视觉模型 key 若未单独配置，自动复用文本模型 key。 */
export function getBailianVisionApiKey(): string {
  return (
    process.env.BAILIAN_VISION_API_KEY ||
    process.env.DASHSCOPE_VISION_API_KEY ||
    getBailianApiKey()
  );
}

export function getBailianModel(): string {
  return process.env.BAILIAN_MODEL || process.env.DASHSCOPE_MODEL || "qwen3.7-max";
}

export function getBailianVisionModel(): string {
  return (
    process.env.BAILIAN_VISION_MODEL ||
    process.env.DASHSCOPE_VISION_MODEL ||
    "qwen3-vl-plus"
  );
}
