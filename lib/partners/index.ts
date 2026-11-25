import { prisma } from "@/lib/db";
import {
  isValidReferralFormat,
  normalizeReferralCode,
} from "@/lib/partners/codes";

export {
  REF_COOKIE,
  REF_CODE_RE,
  isValidReferralFormat,
  normalizeReferralCode,
} from "@/lib/partners/codes";

/** Resolve an APPROVED partner by referral code. Never trust client-only input. */
export async function resolveApprovedPartner(code: string | null | undefined) {
  const normalized = normalizeReferralCode(code);
  if (!normalized || !isValidReferralFormat(normalized)) return null;
  return prisma.partner.findFirst({
    where: { code: normalized, status: "APPROVED" },
  });
}

export async function isApprovedReferralCode(code: string) {
  const partner = await resolveApprovedPartner(code);
  return Boolean(partner);
}
