import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { parseJsonWithSchema } from "@/lib/api-request";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  const bodySchema = z.object({
    name: z.string().min(1).max(40),
    color: z.string().min(1).max(30),
    icon: z.string().min(1).max(10),
  });
  const parsedBody = await parseJsonWithSchema(req, bodySchema);
  if (!parsedBody.ok) return parsedBody.response;
  const name = parsedBody.data.name.trim();
  const color = parsedBody.data.color.trim();
  const icon = parsedBody.data.icon.trim();

  if (!name || !color || !icon) {
    return NextResponse.json(
      { error: "name、color、icon 均为必填项。" },
      { status: 400 }
    );
  }

  try {
    const delegate = (prisma as unknown as {
      incomeCategory?: {
        update: (args: {
          where: { id: string };
          data: { name: string; color: string; icon: string };
        }) => Promise<{ id: string; name: string; color: string; icon: string }>;
      };
    }).incomeCategory;
    let updated: { id: string; name: string; color: string; icon: string } | null = null;
    if (delegate) {
      updated = await delegate.update({
        where: { id },
        data: { name, color, icon },
      });
    } else {
      const changed = await prisma.$executeRaw`
        UPDATE "IncomeCategory"
        SET "name" = ${name}, "color" = ${color}, "icon" = ${icon}, "updatedAt" = CURRENT_TIMESTAMP
        WHERE "id" = ${id}
      `;
      if (Number(changed) > 0) {
        updated = { id, name, color, icon };
      }
    }
    if (!updated) {
      return NextResponse.json({ error: "类目不存在。" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string };
    if (err?.code === "P2025") {
      return NextResponse.json({ error: "类目不存在。" }, { status: 404 });
    }
    if (err?.code === "P2002" || err?.message?.includes("UNIQUE constraint failed")) {
      return NextResponse.json({ error: "类目名称已存在。" }, { status: 409 });
    }
    console.error("[INCOME_CATEGORIES] Update failed", e);
    return NextResponse.json(
      { error: "更新收入类目失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;

  try {
    const delegate = (prisma as unknown as {
      incomeCategory?: {
        findUnique: (args: { where: { id: string } }) => Promise<{ id: string; name: string } | null>;
        findFirst: (args: { where: { name: string } }) => Promise<{ id: string; name: string } | null>;
        delete: (args: { where: { id: string } }) => Promise<unknown>;
      };
    }).incomeCategory;
    let category: { id: string; name: string } | null = null;
    if (delegate) {
      category = await delegate.findUnique({ where: { id } });
    } else {
      const rows = await prisma.$queryRaw<Array<{ id: string; name: string }>>`
        SELECT "id", "name" FROM "IncomeCategory" WHERE "id" = ${id} LIMIT 1
      `;
      category = rows[0] ?? null;
    }
    if (!category) {
      return NextResponse.json({ error: "类目不存在。" }, { status: 404 });
    }
    if (category.name === "待确认") {
      return NextResponse.json(
        { error: "“待确认”是系统兜底类目，不能删除。" },
        { status: 400 }
      );
    }

    const fallback = delegate
      ? await delegate.findFirst({ where: { name: "待确认" } })
      : (
          await prisma.$queryRaw<Array<{ id: string; name: string }>>`
            SELECT "id", "name" FROM "IncomeCategory" WHERE "name" = ${"待确认"} LIMIT 1
          `
        )[0] ?? null;
    if (!fallback) {
      return NextResponse.json(
        { error: "系统缺少“待确认”类目，无法删除。" },
        { status: 500 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.transaction.updateMany({
        where: { type: "income", category: category.name },
        data: { category: fallback.name },
      });
      if (delegate) {
        await delegate.delete({ where: { id } });
      } else {
        await tx.$executeRaw`DELETE FROM "IncomeCategory" WHERE "id" = ${id}`;
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[INCOME_CATEGORIES] Delete failed", e);
    return NextResponse.json(
      { error: "删除收入类目失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
