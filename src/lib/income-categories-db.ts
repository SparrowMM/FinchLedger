import { prisma } from "@/lib/prisma";
import type { IncomeCategory } from "@prisma/client";
import { isTableMissingError } from "@/lib/prisma-errors";

export async function listIncomeCategories(): Promise<IncomeCategory[]> {
  try {
    return await prisma.incomeCategory.findMany({
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    if (isTableMissingError(error)) {
      return [];
    }
    throw error;
  }
}

export async function listIncomeCategoryNames(): Promise<string[]> {
  try {
    const rows = await prisma.incomeCategory.findMany({
      select: { name: true },
      orderBy: { createdAt: "asc" },
    });
    return rows.map((r) => r.name);
  } catch (error) {
    if (isTableMissingError(error)) {
      return [];
    }
    throw error;
  }
}

export async function countIncomeCategories(): Promise<number> {
  try {
    return await prisma.incomeCategory.count();
  } catch (error) {
    if (isTableMissingError(error)) {
      return 0;
    }
    throw error;
  }
}
