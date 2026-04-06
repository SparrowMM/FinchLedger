/**
 * 验证 AI 记账提示词占位符与替换逻辑（不启动 Next、不访问数据库）。
 * 运行：npm run verify:ai-prompts
 */
import assert from "node:assert/strict";
import {
  applyBookkeepingPlaceholders,
  BOOKKEEPING_PLACEHOLDER_EXPENSE,
  BOOKKEEPING_PLACEHOLDER_IMPORT_GUIDE,
  DEFAULT_BOOKKEEPING_TEMPLATE,
  validateBookkeepingPromptPlaceholders,
} from "../src/lib/ai-prompts-defaults";
import { coercePaymentMethodAfterAiParse } from "../src/lib/wechat-import-payment-coerce";

const vars = {
  allowedExpenseCategoryText: '"餐饮"',
  allowedIncomeCategoryText: '"工资"',
  allowedPaymentMethodText: '"微信"',
  importChannelDefaultGuide: "- channel = \"wechat\" → 默认「微信」",
  currentChannel: "wechat",
  currentChannelDefaultMethod: "微信",
};

{
  const v = validateBookkeepingPromptPlaceholders(DEFAULT_BOOKKEEPING_TEMPLATE);
  assert.equal(v.ok, true);
}

{
  const broken = DEFAULT_BOOKKEEPING_TEMPLATE.replaceAll(
    BOOKKEEPING_PLACEHOLDER_EXPENSE,
    ""
  );
  const v = validateBookkeepingPromptPlaceholders(broken);
  assert.equal(v.ok, false);
  if (!v.ok) {
    assert.ok(v.missing.includes("{{ALLOWED_EXPENSE}}"));
  }
}

const out = applyBookkeepingPlaceholders(DEFAULT_BOOKKEEPING_TEMPLATE, vars);
assert.ok(!out.includes("{{ALLOWED_EXPENSE}}"));
assert.ok(!out.includes("{{ALLOWED_INCOME}}"));
assert.ok(!out.includes("{{ALLOWED_PAYMENT}}"));
assert.ok(!out.includes(BOOKKEEPING_PLACEHOLDER_IMPORT_GUIDE));
assert.ok(!out.includes("{{CURRENT_CHANNEL}}"));
assert.ok(!out.includes("{{CURRENT_CHANNEL_DEFAULT_METHOD}}"));
assert.ok(out.includes('"餐饮"'));
assert.ok(out.includes('"工资"'));
assert.ok(out.includes('"微信"'));
assert.ok(out.includes("wechat"));
assert.ok(out.includes("- channel = \"wechat\""));

{
  const allowed = ["微信", "招商银行", "工商银行"];
  assert.equal(
    coercePaymentMethodAfterAiParse("wechat", "招商银行", allowed, "微信"),
    "微信"
  );
  assert.equal(
    coercePaymentMethodAfterAiParse(
      "wechat",
      "招商银行信用卡",
      allowed,
      "微信"
    ),
    "招商银行"
  );
  assert.equal(
    coercePaymentMethodAfterAiParse("cmb", "招商银行", allowed, "招商银行"),
    "招商银行"
  );
}

console.log("verify-ai-prompts: OK");
