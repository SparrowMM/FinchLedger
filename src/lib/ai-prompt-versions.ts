import { prisma } from "@/lib/prisma";

export const AI_PROMPT_VERSION_LIMIT = 50;

export type AiPromptVersionRow = {
  id: string;
  promptKey: string;
  content: string;
  createdAt: Date;
};

type AiPromptVersionDelegate = {
  findFirst: (args: {
    where: { promptKey: string };
    orderBy: { createdAt: "desc" };
    select: { content: true };
  }) => Promise<{ content: string } | null>;
  findMany: (args: {
    where: { promptKey: string };
    orderBy: { createdAt: "desc" };
    take?: number;
    skip?: number;
    select:
      | { id: true }
      | { id: true; createdAt: true; content: true };
  }) => Promise<
    { id: string; createdAt?: Date; content?: string }[]
  >;
  findUnique: (args: {
    where: { id: string };
  }) => Promise<AiPromptVersionRow | null>;
  create: (args: {
    data: { promptKey: string; content: string };
  }) => Promise<{ id: string }>;
  deleteMany: (args: {
    where: { id: { in: string[] } };
  }) => Promise<unknown>;
};

export function getAiPromptVersionDelegate(): AiPromptVersionDelegate | null {
  const d = (prisma as unknown as { aiPromptVersion?: AiPromptVersionDelegate })
    .aiPromptVersion;
  return d ?? null;
}

/** 在成功持久化 AiPrompt 后调用：追加快照并裁剪旧记录；内容与上一条相同时跳过。 */
export async function appendAiPromptVersionSnapshot(
  promptKey: string,
  content: string
): Promise<void> {
  const delegate = getAiPromptVersionDelegate();
  if (!delegate) return;

  const trimmed = content.trim();
  const last = await delegate.findFirst({
    where: { promptKey },
    orderBy: { createdAt: "desc" },
    select: { content: true },
  });
  if (last?.content === trimmed) return;

  await delegate.create({
    data: { promptKey, content: trimmed },
  });

  const extras = await delegate.findMany({
    where: { promptKey },
    orderBy: { createdAt: "desc" },
    skip: AI_PROMPT_VERSION_LIMIT,
    select: { id: true },
  });

  if (extras.length) {
    await delegate.deleteMany({
      where: { id: { in: extras.map((e) => e.id) } },
    });
  }
}

export type AiPromptVersionSummary = {
  id: string;
  createdAt: string;
  charCount: number;
  snippet: string;
};

export async function listAiPromptVersionSummaries(
  promptKey: string,
  take = 40
): Promise<AiPromptVersionSummary[] | null> {
  const delegate = getAiPromptVersionDelegate();
  if (!delegate) return null;

  const rows = await delegate.findMany({
    where: { promptKey },
    orderBy: { createdAt: "desc" },
    take,
    select: { id: true, createdAt: true, content: true },
  });

  return rows.map((r) => ({
    id: r.id,
    createdAt: r.createdAt!.toISOString(),
    charCount: r.content!.length,
    snippet: r.content!.slice(0, 160).replace(/\s+/g, " ").trim(),
  }));
}

export async function getAiPromptVersionById(
  id: string
): Promise<AiPromptVersionRow | null> {
  const delegate = getAiPromptVersionDelegate();
  if (!delegate) return null;
  return delegate.findUnique({ where: { id } });
}
