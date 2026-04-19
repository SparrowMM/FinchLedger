import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  DEFAULT_EXPENSE_CATEGORIES,
  EXPENSE_COLOR_OPTIONS,
  EXPENSE_ICON_OPTIONS,
} from "@/lib/expense-categories";
import {
  countExpenseCategories,
  listExpenseCategories,
} from "@/lib/expense-categories-db";
import { runBootstrapOnce } from "@/lib/bootstrap-once";
import { z } from "zod";
import { parseJsonWithSchema } from "@/lib/api-request";

type ExpenseCategoryDto = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

async function ensureDefaultCategories() {
  const delegate = (prisma as unknown as { expenseCategory?: { createMany: (args: { data: typeof DEFAULT_EXPENSE_CATEGORIES }) => Promise<unknown> } }).expenseCategory;
  if (delegate) {
    const count = await countExpenseCategories();
    if (count === 0) {
      await delegate.createMany({ data: DEFAULT_EXPENSE_CATEGORIES });
    }
    return;
  }

  const count = await countExpenseCategories();
  if (count > 0) {
    return;
  }

  for (const item of DEFAULT_EXPENSE_CATEGORIES) {
    await prisma.$executeRaw`
        INSERT INTO "ExpenseCategory" ("id", "name", "color", "icon", "createdAt", "updatedAt")
        VALUES (${crypto.randomUUID()}, ${item.name}, ${item.color}, ${item.icon}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT ("name") DO NOTHING
      `;
  }
}

export async function GET() {
  try {
    await runBootstrapOnce("seed:expense-categories", ensureDefaultCategories);
    const categories = await listExpenseCategories();
    return NextResponse.json({
      categories: categories as ExpenseCategoryDto[],
      colorOptions: EXPENSE_COLOR_OPTIONS,
      iconOptions: EXPENSE_ICON_OPTIONS,
    });
  } catch (e) {
    console.error("[EXPENSE_CATEGORIES] Query failed", e);
    return NextResponse.json(
      { error: "查询类目失败，请稍后重试。" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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
      expenseCategory?: {
        create: (args: { data: { name: string; color: string; icon: string } }) => Promise<ExpenseCategoryDto>;
      };
    }).expenseCategory;
    let created: ExpenseCategoryDto;
    if (delegate) {
      created = await delegate.create({ data: { name, color, icon } });
    } else {
      const id = crypto.randomUUID();
      await prisma.$executeRaw`
        INSERT INTO "ExpenseCategory" ("id", "name", "color", "icon", "createdAt", "updatedAt")
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
    console.error("[EXPENSE_CATEGORIES] Create failed", e);
    return NextResponse.json(
      { error: "新增类目失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
