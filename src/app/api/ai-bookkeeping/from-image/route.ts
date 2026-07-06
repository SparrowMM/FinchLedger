import { NextRequest, NextResponse } from "next/server";
import {
  imageToBillTextWithStatus,
  missingVisionKeyHint,
} from "@/lib/bailian-client";
import {
  getBailianVisionApiKey,
  getBailianVisionModel,
} from "@/lib/env";

const SUPPORTED_CHANNELS = ["alipay", "wechat", "cmb", "icbc"] as const;

export async function POST(req: NextRequest) {
  if (!getBailianVisionApiKey()) {
    return NextResponse.json(
      { error: `${missingVisionKeyHint}，无法解析账单图片` },
      { status: 400 }
    );
  }
  if (!getBailianVisionModel()) {
    return NextResponse.json(
      { error: "缺少 BAILIAN_VISION_MODEL，无法解析账单图片" },
      { status: 400 }
    );
  }

  const channel = req.nextUrl.searchParams.get("channel")?.trim();
  if (!channel || !SUPPORTED_CHANNELS.includes(channel as (typeof SUPPORTED_CHANNELS)[number])) {
    return NextResponse.json(
      {
        error:
          "channel 必填，支持：alipay、wechat、cmb、icbc",
      },
      { status: 400 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "请上传 file 字段" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (!buf.length) {
    return NextResponse.json({ error: "图片内容为空" }, { status: 400 });
  }

  const mime = file.type || "image/png";
  if (!mime.startsWith("image/")) {
    return NextResponse.json({ error: "仅支持图片文件" }, { status: 400 });
  }

  const { content: text, error } = await imageToBillTextWithStatus(
    buf,
    mime,
    channel
  );
  if (error) {
    return NextResponse.json(
      {
        error: `AI 图片解析失败：${error}`,
      },
      { status: 500 }
    );
  }
  if (!text) {
    return NextResponse.json(
      {
        error: `AI 图片解析失败，请检查视觉模型可用性（当前: ${getBailianVisionModel()}）与 API Key 权限`,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, channel, text });
}
