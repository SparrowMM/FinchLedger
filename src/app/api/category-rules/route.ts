import { NextResponse } from "next/server";
import {
  listCategoryRules,
  upsertCategoryRule,
} from "@/lib/category-rules-db";
import type { TransactionType } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as TransactionType | null;
    const rules = await listCategoryRules(type ?? undefined);
    return NextResponse.json({ rules });
  } catch (e) {
    console.error("[CATEGORY-RULES] List failed", e);
    return NextResponse.json(
      { error: "获取分类规则列表失败。" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, merchantName, category, source } = body as {
      type?: string;
      merchantName?: string;
      category?: string;
      source?: string;
    };

    if (!type || !["expense", "income"].includes(type)) {
      return NextResponse.json(
        { error: "type 必须为 expense 或 income。" },
        { status: 400 }
      );
    }
    if (!merchantName?.trim()) {
      return NextResponse.json(
        { error: "merchantName 不能为空。" },
        { status: 400 }
      );
    }
    if (!category?.trim()) {
      return NextResponse.json(
        { error: "category 不能为空。" },
        { status: 400 }
      );
    }

    const rule = await upsertCategoryRule(
      type as TransactionType,
      merchantName.trim(),
      category.trim(),
      (source === "manual" ? "manual" : "learned") as "learned" | "manual"
    );

    return NextResponse.json({ rule });
  } catch (e) {
    console.error("[CATEGORY-RULES] Create/update failed", e);
    return NextResponse.json(
      { error: "创建/更新分类规则失败。" },
      { status: 500 }
    );
  }
}
