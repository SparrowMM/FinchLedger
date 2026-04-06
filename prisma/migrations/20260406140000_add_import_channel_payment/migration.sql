-- CreateTable
CREATE TABLE "ImportChannelPayment" (
    "channel" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    CONSTRAINT "ImportChannelPayment_pkey" PRIMARY KEY ("channel"),
    CONSTRAINT "ImportChannelPayment_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ImportChannelPayment_paymentMethodId_idx" ON "ImportChannelPayment"("paymentMethodId");
