import { Prisma } from "@/lib/generated/prisma/client";

/** Hoa hồng = số tiền đã nhận × tỉ lệ % (không dùng float thuần). */
export function computeCommissionAmount(paymentAmount: number, ratePercent: number) {
  return Number(
    new Prisma.Decimal(paymentAmount).mul(ratePercent).div(100).toFixed(2),
  );
}
