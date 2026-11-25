-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "provider" TEXT,
ADD COLUMN     "providerOrderCode" BIGINT,
ADD COLUMN     "providerLinkId" TEXT,
ADD COLUMN     "checkoutUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_providerOrderCode_key" ON "Payment"("providerOrderCode");

-- CreateIndex
CREATE INDEX "Payment_providerLinkId_idx" ON "Payment"("providerLinkId");
