-- Ensure "闲鱼" exists in expense categories for existing databases
INSERT INTO "ExpenseCategory" ("id", "name", "color", "icon", "createdAt", "updatedAt")
VALUES ('xianyu-expense-category', '闲鱼', '#14B8A6', '🐟', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("name") DO NOTHING;
