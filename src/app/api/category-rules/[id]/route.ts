import { NextResponse } from "next/server";
import { deleteCategoryRule } from "@/lib/category-rules-db";

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

export async function DELETE(_req: Request, context: RouteContext) {
  const params = await Promise.resolve(context.params);
  const id = params?.id?.trim();
  if (!id) {
    return NextResponse.json({ error: "缺少规则 ID" }, { status: 400 });
  }

  try {
    await deleteCategoryRule(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[CATEGORY-RULES] Delete failed", e);
    return NextResponse.json(
      { error: "删除分类规则失败。" },
      { status: 500 }
    );
  }
}
