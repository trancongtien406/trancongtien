import { enumLabel } from "@/lib/enums";

/** Nhãn trạng thái lead an toàn cho partner / UI công khai. */
export function partnerSafeLeadStatus(status: string) {
  return enumLabel(status);
}

export const PARTNER_VISIBLE_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "MEETING",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const;
