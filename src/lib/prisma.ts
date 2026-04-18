import { PrismaClient } from "@prisma/client";
import { withPgbouncerParamForPooler } from "@/lib/database-connection-url";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Prisma 7 在部分环境中会默认使用 engine type "client"，
// 对于本地 Node 运行时，我们强制使用二进制引擎以避免需要 adapter/accelerateUrl。
if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = "binary";
}

const resolvedDatabaseUrl = withPgbouncerParamForPooler(process.env.DATABASE_URL);

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

