import { NextResponse } from "next/server";
import { DEFAULT_EXPENSE_CATEGORIES } from "@/lib/expense-categories";
import { listExpenseCategoryNames } from "@/lib/expense-categories-db";
import { DEFAULT_INCOME_CATEGORIES } from "@/lib/income-categories";
import { listIncomeCategoryNames } from "@/lib/income-categories-db";
import { DEFAULT_PAYMENT_METHODS } from "@/lib/payment-methods";
import { listPaymentMethodNames } from "@/lib/payment-methods-db";

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;
const DASHSCOPE_MODEL = process.env.DASHSCOPE_MODEL || "qwen-plus";

type SupportedChannel = "alipay" | "wechat" | "cmb" | "icbc";

type DashScopeErrorBody = {
  error?: {
    message?: string;
    error_msg?: string;
  };
  message?: string;
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
  const categoryNames = await listExpenseCategoryNames().catch(() => []);
  const incomeCategoryNames = await listIncomeCategoryNames().catch(() => []);
  const paymentMethodNames = await listPaymentMethodNames().catch(() => []);
  const categoriesElapsedMs = nowMs() - categoriesStart;
  const allowedExpenseCategories =
    categoryNames.length > 0
      ? categoryNames
      : DEFAULT_EXPENSE_CATEGORIES.map((item) => item.name);
  const allowedIncomeCategories =
    incomeCategoryNames.length > 0
      ? incomeCategoryNames
      : DEFAULT_INCOME_CATEGORIES.map((item) => item.name);
  const allowedPaymentMethods =
    paymentMethodNames.length > 0
      ? paymentMethodNames
      : DEFAULT_PAYMENT_METHODS.map((item) => item.name);
  const allowedExpenseCategoryText = allowedExpenseCategories
    .map((name) => `"${name}"`)
    .join("、");
  const allowedIncomeCategoryText = allowedIncomeCategories
    .map((name) => `"${name}"`)
    .join("、");
  const allowedPaymentMethodText = allowedPaymentMethods
    .map((name) => `"${name}"`)
    .join("、");

  const systemPrompt = `
你是一个专业的个人记账助手，擅长从各个平台导出的「账单/流水文本」中解析多条收支记录，并统一为结构化数据。

用户会告诉你一个渠道类型（channel）以及一段原始账单文本（rawContent）。目前的渠道包括：
- "alipay": 支付宝账单导出（通常为 CSV 或表格文本，包含「交易创建时间、付款时间、交易对方、商品说明、收/支、金额、收/付款方式、交易状态」等）。
- "wechat": 微信支付账单导出（通常源自 Excel/xlsx 模板，在转换为文本后首行是表头，常见列包括「交易时间、交易类型、交易对方、商品、收/支、金额(元)、支付方式、当前状态、交易单号、商户单号、备注、收款方信息、收/付款账户、收/付款方银行账户、币种、收/付款渠道」等）。
- "cmb": 招商银行流水（包含「交易日期、时间、摘要、交易金额、余额、对方户名/账号」等）。
- "icbc": 工商银行流水（包含「记账日期、交易时间、借方/贷方金额、余额、对手户名/账号、摘要」等）。

当 channel 不同时，请严格按照该渠道自己的模板独立解析，不要把不同渠道的表头或字段规则混在一起。可以参考本地为该渠道准备的示例模板来理解列含义，但不要假设支付宝和微信的列顺序或命名完全相同。

- 对于支付宝（alipay），通常从包含表头的一行开始，后面每一行都是一笔交易，重点字段包括：交易创建时间/付款时间（日期时间）、收/支（支出/收入/不计收支）、金额（元）、交易对方、商品名称、收/付款方式、备注、资金状态等。
- 对于微信支付（wechat），请单独基于微信的表头含义进行解析：从表头之后的每一行都是一笔交易，重点根据以下字段进行映射（不要直接沿用支付宝的字段语义）：
  - 「交易时间」拆成 date（YYYY-MM-DD）和 time（HH:MM）。
  - 「收/支」列为「支出」时，type = "expense"；为「收入」或「入账」时，type = "income"；为「不计收支」「零钱充值」「零钱提现」「转账」「红包退回」等可视为资金转移，根据上下文合理归类为支出或收入，或设置为与金额符号一致的类型。
  - 「金额(元)」为 amount（数字），不包含正负号；币种默认 "CNY"。
  - 「交易类型」和「商品」可以用来推断 category（如餐饮、交通、购物、转账、理财、通信等），同时可作为 note 的补充说明。
  - 「交易对方」/「收款方信息」可作为 merchant。
  - 「支付方式」列决定 method：须归并到系统允许的支付方式名称（如「零钱」「亲属卡」「分付」等微信侧方式 →「微信」；「招商银行信用卡」等明确招行卡 →「招商银行」），不要原样输出账单里的长描述。
  - 「当前状态」为「支付成功」「交易成功」「已入账」等才认为是有效交易；退款成功、关闭等特殊状态要结合「交易类型」和金额说明，按一笔正常支出/收入或冲正处理。

你的任务是：根据 channel 识别账单格式，从 rawContent 中提取「一条或多条」交易记录。每条记录至少需要包含：
- type: "expense" 或 "income"
- date: 记账日期，字符串，格式 "YYYY-MM-DD"（按用户描述推断，若无则用今天的日期）
- time: 可选，时间字符串，格式 "HH:MM"
- amount: 金额，数字
- currency: 币种，中文环境默认 "CNY"
- category: 分类
- merchant: 可选，商家或地点名称，例如 "海底捞"、"滴滴出行"
- method: 可选，支付方式，例如 "微信支付"、"支付宝"、"信用卡"、"银行卡"、"现金"
- note: 可选，补充说明，比如「和同事聚餐」、「公司发工资」

请只输出一个 JSON 对象，不能包含任何多余说明文字，结构如下：
{
  "transactions": [
    {
      "type": "expense" | "income",
      "date": "YYYY-MM-DD",
      "time": "HH:MM" | "",
      "amount": number,
      "currency": "CNY",
      "category": string,
      "merchant": string,
      "method": string,
      "note": string
    }
  ],
  "summary": string
}

注意：
- 如果账单文本中包含多条交易（例如多行 CSV 或表格），要拆成多条 transactions。
- summary 用中文简要概括本次收支情况，比如「共 5 笔支出和 1 笔收入，总金额支出 532 元，主要为餐饮和交通」。
- 如果无法识别某字段，用合理的默认值或空字符串，不要省略字段本身。
- 账单中常见的「支出/支出金额/借方」都对应为 type: "expense"，而「收入/收款/贷方/入账」对应为 type: "income"。
- 若交易文本（如交易对方、商品说明、备注等）出现「亲情卡」且该笔为支出，则 category 优先归类为「人情-亲人」。
- 若交易文本（如交易对方、商品说明、备注等）出现「停车」「停车费」「停车场」「路侧停车」且该笔为支出，则 category 必须归类为「交通」，不能归类为「生活」。
- 若交易文本出现「App Store」「iCloud」「iTunes」「Apple Services」「apple.com/bill」且该笔为支出，则 category 必须归类为「Apple」。
- 若交易文本出现「理发」「剪发」「洗剪吹」「烫发」「染发」「护发」「美发」「发廊」且该笔为支出，则 category 必须归类为「生活」。
- 当 type = "expense" 时，category 只能从以下类目中选择：
  ${allowedExpenseCategoryText}。
- 当 type = "expense" 且无法确定分类时，category 必须填 "待确认"。
- 严禁新增任何未在上述列表中的支出类目。
- 当 type = "income" 时，category 只能从以下类目中选择：
  ${allowedIncomeCategoryText}。
- 当 type = "income" 且无法确定分类时，category 必须填 "待确认"。
- 严禁新增任何未在上述列表中的收入类目。
- method 只能从以下支付方式中选择：${allowedPaymentMethodText}。
- 归并提示：与支付宝体系相关的（余额宝、余额、花呗、网商银行等）→「支付宝」；微信体系内的（零钱、亲属卡、分付、微信支付等）→「微信」；支付方式文字明确含招商/招行且为银行卡或信用卡的 →「招商银行」；明确含工商/工行的 →「工商银行」。
- 当 channel = "wechat" 时：method **仅**能依据「支付方式」（及同义表头，如「收/付款方式」）列判定；**禁止**仅因为「收/付款方银行账户」「收/付款账户」等列出现「招商银行」「工商银行」等字样就填对应银行——那些列表示账户信息，不是扣款渠道。若「支付方式」为空、难以辨认或属于微信生态内支付，method 必须填「微信」；仅当「支付方式」列明确为招行/工行卡时才填「招商银行」或「工商银行」。
- 当 channel = "alipay" 且难以判断 method 时，默认填「支付宝」。
- 当 channel = "cmb" 且难以判断 method 时，默认填「招商银行」。
- 当 channel = "icbc" 且难以判断 method 时，默认填「工商银行」。
`;

  const basePayload = {
    model: DASHSCOPE_MODEL,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `channel: ${channel}\n\nrawContent（已做隐私脱敏）:\n${sanitizedRawContent}`,
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
          body: errorBody,
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

    let parsed;
    try {
      const parseStart = nowMs();
      parsed = JSON.parse(content);
      const parseElapsedMs = nowMs() - parseStart;
      console.log("[AI-BOOKKEEPING] JSON parse done", {
        requestId,
        parseElapsedMs: Number(parseElapsedMs.toFixed(2)),
        contentLength: content.length,
      });
    } catch {
      console.error("[AI-BOOKKEEPING] Failed to parse DashScope content as JSON", {
        requestId,
        contentSnippet: content.slice(0, 500),
      });
      return NextResponse.json(
        {
          error:
            "百炼返回的不是合法 JSON，请稍后重试或调整提示词。",
          raw: content,
        },
        { status: 500 }
      );
    }

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
      error: e,
      totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
    });
    return NextResponse.json(
      { error: "调用百炼接口时发生错误，请稍后重试。" },
      { status: 500 }
    );
  }
}

