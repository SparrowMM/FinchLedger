-- Ensure "闲鱼" exists in expense categories for existing databases
INSERT OR IGNORE INTO "ExpenseCategory" ("id", "name", "color", "icon", "createdAt", "updatedAt")
VALUES (lower(hex(randomblob(16))), '闲鱼', '#14B8A6', '🐟', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
