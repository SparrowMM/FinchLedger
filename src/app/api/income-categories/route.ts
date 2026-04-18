import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  DEFAULT_INCOME_CATEGORIES,
  INCOME_COLOR_OPTIONS,
  INCOME_ICON_OPTIONS,
} from "@/lib/income-categories";
import {
  countIncomeCategories,
  listIncomeCategories,
} from "@/lib/income-categories-db";
import { isTableMissingError } from "@/lib/prisma-errors";
import { runBootstrapOnce } from "@/lib/bootstrap-once";

type IncomeCategoryDto = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

async function ensureDefaultCategories() {
  try {
    const count = await countIncomeCategories();
    if (count === 0) {
      await prisma.incomeCategory.createMany({ data: DEFAULT_INCOME_CATEGORIES });
      return;
    }
  } catch (error) {
    if (isTableMissingError(error)) {
      return;
    }
    throw error;
  }
}

export async function GET() {
  try {
    await runBootstrapOnce("seed:income-categories", ensureDefaultCategories);
    const categories = await listIncomeCategories();
    return NextResponse.json({
      categories: categories as IncomeCategoryDto[],
      colorOptions: INCOME_COLOR_OPTIONS,
      iconOptions: INCOME_ICON_OPTIONS,
    });
  } catch (e) {
    console.error("[INCOME_CATEGORIES] Query failed", e);
    return NextResponse.json(
      { error: "查询收入类目失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  let body: { name?: string; color?: string; icon?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求体格式错误。" }, { status: 400 });
  }

  const name = body.name?.trim();
  const color = body.color?.trim();
  const icon = body.icon?.trim();

  if (!name || !color || !icon) {
    return NextResponse.json(
      { error: "name、color、icon 均为必填项。" },
      { status: 400 }
    );
  }

  try {
    const delegate = (prisma as unknown as {
      incomeCategory?: {
        create: (args: { data: { name: string; color: string; icon: string } }) => Promise<IncomeCategoryDto>;
      };
    }).incomeCategory;
    let created: IncomeCategoryDto;
    if (delegate) {
      created = await delegate.create({ data: { name, color, icon } });
    } else {
      const id = crypto.randomUUID();
      await prisma.$executeRaw`
        INSERT INTO "IncomeCategory" ("id", "name", "color", "icon", "createdAt", "updatedAt")
        VALUES (${id}, ${name}, ${color}, ${icon}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;
      created = { id, name, color, icon };
    }
    return NextResponse.json(created, { status: 201 });
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string };
    if (err?.code === "P2002" || err?.message?.includes("UNIQUE constraint failed")) {
      return NextResponse.json({ error: "类目名称已存在。" }, { status: 409 });
    }
    if (isTableMissingError(e)) {
      return NextResponse.json(
        { error: "收入类目数据表不存在，请先执行数据库迁移。" },
        { status: 503 }
      );
    }
    console.error("[INCOME_CATEGORIES] Create failed", e);
    return NextResponse.json(
      { error: "新增收入类目失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
