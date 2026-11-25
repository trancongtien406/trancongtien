import { randomBytes } from "crypto";
import type { Partner } from "@/lib/generated/prisma/client";

export type ConsultationInput = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  industry?: string;
  projectType?: string;
  message: string;
  budget?: string;
  timeline?: string;
  scheduledAt?: string;
  landingPath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export function nextLeadNumber(now = new Date()) {
  return `LEAD-${now.getUTCFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export function ownershipExpiry(
  partner: Pick<Partner, "ownershipDays">,
  from = new Date(),
) {
  return new Date(from.getTime() + partner.ownershipDays * 86_400_000);
}
