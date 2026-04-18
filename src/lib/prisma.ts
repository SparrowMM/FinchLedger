import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Supabase pooler（*.pooler.supabase.com）在事务模式下无法跨连接复用预处理语句，
 * Prisma 需 `pgbouncer=true`，否则会间歇性报错：prepared statement "sN" does not exist。
 * @see https://www.prisma.io/docs/orm/overview/databases/postgresql#using-pgbouncer
 */
function databaseUrlForRuntime(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  if (!/pooler\.supabase\.com/i.test(url)) return url;
  if (/[?&]pgbouncer=true(?:&|$)/i.test(url)) return url;
  return url.includes("?") ? `${url}&pgbouncer=true` : `${url}?pgbouncer=true`;
}

// Prisma 7 在部分环境中会默认使用 engine type "client"，
// 对于本地 Node 运行时，我们强制使用二进制引擎以避免需要 adapter/accelerateUrl。
if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = "binary";
}

const resolvedDatabaseUrl = databaseUrlForRuntime();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(resolvedDatabaseUrl !== undefined
      ? { datasources: { db: { url: resolvedDatabaseUrl } } }
      : {}),
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

