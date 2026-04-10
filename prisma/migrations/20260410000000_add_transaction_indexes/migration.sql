-- CreateIndex: 按日期+类型查询加速（月份筛选 + 收入/支出分类）
CREATE INDEX IF NOT EXISTS "Transaction_date_type_idx" ON "Transaction"("date", "type");

-- CreateIndex: 按类型+分类查询加速（分类统计/筛选）
CREATE INDEX IF NOT EXISTS "Transaction_type_category_idx" ON "Transaction"("type", "category");
