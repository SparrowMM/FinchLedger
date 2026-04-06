import { prisma } from "../src/lib/prisma";
import {
  ensureImportChannelPaymentMappings,
  listImportChannelPaymentRows,
} from "../src/lib/import-channel-payment-db";
import { getBookkeepingPromptVarsForChannel } from "../src/lib/bookkeeping-prompt-vars";

async function main() {
  await ensureImportChannelPaymentMappings();
  const rows = await listImportChannelPaymentRows();
  if (rows.length < 4) {
    throw new Error(`expected 4 import channel rows, got ${rows.length}`);
  }
  const vars = await getBookkeepingPromptVarsForChannel("cmb");
  if (!vars.importChannelDefaultGuide.includes("cmb")) {
    throw new Error("guide should mention cmb");
  }
  if (vars.currentChannel !== "cmb") {
    throw new Error("current channel mismatch");
  }
  if (!vars.allowedPaymentMethodText.includes(vars.currentChannelDefaultMethod)) {
    throw new Error("default method should appear in allowed list");
  }
  console.log("verify-import-channel: OK", rows.map((r) => r.paymentMethod.name).join(", "));
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
