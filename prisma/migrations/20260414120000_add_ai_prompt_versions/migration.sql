-- CreateTable
CREATE TABLE "AiPromptVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "promptKey" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "AiPromptVersion_promptKey_idx" ON "AiPromptVersion"("promptKey");
