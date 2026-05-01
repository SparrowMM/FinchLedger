-- Ensure "出租" exists in income categories for existing databases
INSERT INTO "IncomeCategory" ("id", "name", "color", "icon", "createdAt", "updatedAt")
VALUES ('rent-income-category', '出租', '#06B6D4', '🏠', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("name") DO NOTHING;
