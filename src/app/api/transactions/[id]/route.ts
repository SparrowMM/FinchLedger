import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }> | {
    id: string;
  };
};

export async function DELETE(_req: Request, context: RouteContext) {
  const params = await Promise.resolve(context.params);
  const id = params?.id?.trim();
  if (!id) {
    return NextResponse.json({ error: "缺少交易记录 ID" }, { status: 400 });
  }

  try {
    const existed = await prisma.transaction.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existed) {
      return NextResponse.json({ error: "交易记录不存在" }, { status: 404 });
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[TRANSACTIONS] Delete failed", e);
    return NextResponse.json(
      { error: "删除交易记录失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
