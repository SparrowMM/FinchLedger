import { NextResponse } from "next/server";

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;
const DASHSCOPE_MODEL = process.env.DASHSCOPE_MODEL || "qwen-plus";

export async function POST(req: Request) {
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

  const channel = body.channel?.trim();
  const rawContent = body.rawContent?.trim();

  const supportedChannels = ["alipay", "wechat", "cmb", "icbc"] as const;

  if (!channel || !supportedChannels.includes(channel as any)) {
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

  const systemPrompt = `
你是一个专业的个人记账助手，擅长从各个平台导出的「账单/流水文本」中解析多条收支记录，并统一为结构化数据。

用户会告诉你一个渠道类型（channel）以及一段原始账单文本（rawContent）。目前的渠道包括：
- "alipay": 支付宝账单导出（通常为 CSV 或表格文本，包含「交易创建时间、付款时间、交易对方、商品说明、收/支、金额、收/付款方式、交易状态」等）
- "wechat": 微信支付账单导出（通常包含「交易时间、交易类型、对方账户、商品、收/支、金额(元)、支付方式、当前状态」等）
- "cmb": 招商银行流水（包含「交易日期、时间、摘要、交易金额、余额、对方户名/账号」等）
- "icbc": 工商银行流水（包含「记账日期、交易时间、借方/贷方金额、余额、对手户名/账号、摘要」等）

你的任务是：根据 channel 识别账单格式，从 rawContent 中提取「一条或多条」交易记录。每条记录至少需要包含：
- type: "expense" 或 "income"
- date: 记账日期，字符串，格式 "YYYY-MM-DD"（按用户描述推断，若无则用今天的日期）
- time: 可选，时间字符串，格式 "HH:MM"
- amount: 金额，数字
- currency: 币种，中文环境默认 "CNY"
- category: 分类，例如 "餐饮"、"交通"、"购物"、"工资"、"转账" 等
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
`;

  const dashscopePayload = {
    model: DASHSCOPE_MODEL,
    input: {
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `channel: ${channel}\n\nrawContent:\n${rawContent}`,
        },
      ],
    },
    parameters: {
      result_format: "message",
      temperature: 0.3,
    },
  };

  try {
    const resp = await fetch(
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DASHSCOPE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dashscopePayload),
      }
    );

    const data = await resp.json();

    if (!resp.ok || data.status_code && data.status_code !== 200) {
      const message =
        data?.message || data?.error_msg || "调用百炼失败，请稍后重试。";
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const content =
      data?.output?.choices?.[0]?.message?.content ??
      data?.output?.text ??
      "";

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "百炼返回内容为空或格式不正确。" },
        { status: 500 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        {
          error:
            "百炼返回的不是合法 JSON，请稍后重试或调整提示词。",
          raw: content,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (e) {
    console.error("AI bookkeeping error", e);
    return NextResponse.json(
      { error: "调用百炼接口时发生错误，请稍后重试。" },
      { status: 500 }
    );
  }
}

