/**
 * 一次性补录：支付宝闲鱼卖出收入（用户截图 2026-03-18 +35）
 * 用法（项目根目录；SQLite 路径相对 prisma 目录）：
 *   DATABASE_URL="file:./dev.db" npx tsx scripts/backfill-xianyu-income-20260318.ts
 * 已存在相同订单号备注时自动跳过。
 */
import { PrismaClient } from "@prisma/client";
import { parseChinaDateTimeToUtc } from "../src/lib/china-time";

const ORDER_NO = "2026031822001168501441265206";
const MERCHANT_NO = "T200P2701756311053041188";

async function main() {
  const prisma = new PrismaClient();
  try {
    const dup = await prisma.transaction.findFirst({
      where: { note: { contains: ORDER_NO } },
    });
    if (dup) {
      console.log("[backfill] 已存在含该订单号的记录，跳过。", dup.id);
      return;
    }

    const row = await prisma.transaction.create({
      data: {
        date: parseChinaDateTimeToUtc("2026-03-18", "19:35"),
        name: "闲鱼",
        type: "income",
        amount: 35,
        category: "闲鱼",
        account: "支付宝",
        note: `闲鱼卖出（补录）。只剩下1/4，我化妆品太多了，最近不用了，给有缘人。订单号 ${ORDER_NO}；商户单号 ${MERCHANT_NO}`,
      },
    });
    console.log("[backfill] 已写入收入一笔。", row.id);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
