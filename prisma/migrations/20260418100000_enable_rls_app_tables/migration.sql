-- 业务数据仅通过服务端 Prisma（数据库直连）访问；对 PostgREST 使用的 anon/authenticated 角色默认拒绝访问。
-- 表所有者 / superuser 仍不受 RLS 限制，不影响 Prisma migrate 与日常读写。
ALTER TABLE "Transaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MonthlyExpenseAnalysis" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ExpenseCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "IncomeCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PaymentMethod" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ImportChannelPayment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AiPrompt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AiPromptVersion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CategoryRule" ENABLE ROW LEVEL SECURITY;
