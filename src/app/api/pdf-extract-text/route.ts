import { NextResponse } from "next/server";
import * as pdf from "pdf-parse";

export const runtime = "nodejs";

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

export async function POST(req: Request) {
  const requestId = createRequestId("pdf");
  const requestStart = nowMs();
  try {
    const headerCheckStart = nowMs();
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("pdf")) {
      return NextResponse.json(
        { error: "请求内容类型必须为 PDF（application/pdf）。" },
        { status: 400 }
      );
    }
    const headerCheckElapsedMs = nowMs() - headerCheckStart;

    const readBodyStart = nowMs();
    const arrayBuffer = await req.arrayBuffer();
    const readBodyElapsedMs = nowMs() - readBodyStart;
    const buffer = Buffer.from(arrayBuffer);

    let text = "";
    let fallbackUsed = false;
    let extractElapsedMs = 0;

    try {
      const extractStart = nowMs();
      // 优先使用 pdf-parse 做结构化文本抽取
      const pdfFn = (pdf as any).default ?? (pdf as any);
      const result = await pdfFn(buffer);
      text = (result.text || "").trim();
      extractElapsedMs = nowMs() - extractStart;
    } catch (e) {
      console.error("[PDF-EXTRACT] pdf-parse failed, fallback to plain decode", e);
      // 回退策略：直接用文本解码，交给后续 AI 在 PDF 语法中提取有用内容
      fallbackUsed = true;
      const fallbackStart = nowMs();
      try {
        text = new TextDecoder("utf-8").decode(buffer);
      } catch {
        text = buffer.toString("utf-8");
      }
      extractElapsedMs = nowMs() - fallbackStart;
    }

    text = text.trim();

    if (!text) {
      return NextResponse.json(
        {
          error:
            "未能从 PDF 中提取到可读文本，可能是纯图片扫描件，请尝试在本地通过 OCR 转成文本后再导入。",
        },
        { status: 400 }
      );
    }

    console.log("[PDF-EXTRACT] Parse completed", {
      requestId,
      contentType,
      pdfBytes: buffer.byteLength,
      extractedTextLength: text.length,
      fallbackUsed,
      headerCheckElapsedMs: Number(headerCheckElapsedMs.toFixed(2)),
      readBodyElapsedMs: Number(readBodyElapsedMs.toFixed(2)),
      extractElapsedMs: Number(extractElapsedMs.toFixed(2)),
      totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
    });

    return NextResponse.json({ text });
  } catch (e) {
    console.error("[PDF-EXTRACT] Failed to parse PDF", {
      requestId,
      error: e,
      totalElapsedMs: Number((nowMs() - requestStart).toFixed(2)),
    });
    return NextResponse.json(
      {
        error:
          "解析 PDF 文件失败，请确认文件为正常的招商/工商银行对账单 PDF，再重试。",
      },
      { status: 500 }
    );
  }
}

