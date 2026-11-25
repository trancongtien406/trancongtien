import type { Partner, Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/db";
import {
  nextLeadNumber,
  ownershipExpiry,
  type ConsultationInput,
} from "@/lib/leads/helpers";

export {
  nextLeadNumber,
  ownershipExpiry,
  type ConsultationInput,
} from "@/lib/leads/helpers";

export async function findDuplicateLeads(email: string, phone: string) {
  return prisma.lead.findMany({
    where: {
      OR: [{ email }, ...(phone ? [{ phone }] : [])],
    },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      leadNumber: true,
      status: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });
}

export async function createConsultationLead(
  data: ConsultationInput,
  partner: Partner | null,
) {
  const now = new Date();
  const leadNumber = nextLeadNumber(now);
  const ownershipExpiresAt = partner ? ownershipExpiry(partner, now) : null;
  const meetingAt = data.scheduledAt ? new Date(data.scheduledAt) : null;

  return prisma.lead.create({
    data: {
      leadNumber,
      name: data.name,
      company: data.company || null,
      email: data.email,
      phone: data.phone,
      industry: data.industry || null,
      projectType: data.projectType || null,
      description: data.message,
      estimatedBudget: data.budget || null,
      expectedTimeline: data.timeline || null,
      source: partner ? "PARTNER" : "WEBSITE",
      landingPath: data.landingPath || null,
      utmSource: data.utmSource || null,
      utmMedium: data.utmMedium || null,
      utmCampaign: data.utmCampaign || null,
      referralCode: partner?.code || null,
      partnerId: partner?.id,
      ownershipExpiresAt,
      meetingAt,
      status: meetingAt ? "MEETING" : "NEW",
      activities: {
        create: {
          type: "CREATED",
          title: "Lead được tạo từ form tư vấn",
          meta: JSON.stringify({ partnerCode: partner?.code || null }),
        },
      },
    },
  });
}

export async function extendOwnershipIfNeeded(
  tx: Prisma.TransactionClient,
  leadId: string,
  actorId: string | null,
  hasFollowUp: boolean,
) {
  if (!hasFollowUp) return;
  const lead = await tx.lead.findUnique({
    where: { id: leadId },
    include: { partner: true },
  });
  if (!lead?.partner) return;
  const nextExpiry = ownershipExpiry(lead.partner);
  await tx.lead.update({
    where: { id: leadId },
    data: { ownershipExpiresAt: nextExpiry },
  });
  await tx.leadActivity.create({
    data: {
      leadId,
      actorId,
      type: "OWNERSHIP",
      title: "Gia hạn quyền sở hữu đối tác",
      body: `Quyền sở hữu đến ${nextExpiry.toLocaleString("vi-VN")}`,
    },
  });
}

export async function releaseLeadOwnership(
  leadId: string,
  actorId: string,
  reason?: string,
) {
  return prisma.$transaction(async (tx) => {
    const lead = await tx.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new Error("NOT_FOUND");
    await tx.lead.update({
      where: { id: leadId },
      data: { partnerId: null, ownershipExpiresAt: null },
    });
    await tx.leadActivity.create({
      data: {
        leadId,
        actorId,
        type: "OWNERSHIP",
        title: "Giải phóng quyền sở hữu",
        body: reason || "Admin giải phóng quyền sở hữu đối tác",
      },
    });
  });
}

export async function reassignLeadPartner(
  leadId: string,
  partnerId: string,
  actorId: string,
) {
  return prisma.$transaction(async (tx) => {
    const [lead, partner] = await Promise.all([
      tx.lead.findUnique({
        where: { id: leadId },
        include: { partner: { select: { code: true, name: true } } },
      }),
      tx.partner.findUnique({ where: { id: partnerId } }),
    ]);
    if (!lead) throw new Error("NOT_FOUND");
    if (!partner) throw new Error("PARTNER_NOT_FOUND");
    if (partner.status !== "APPROVED") throw new Error("PARTNER_NOT_APPROVED");

    const previousLabel = lead.partner
      ? `${lead.partner.code} · ${lead.partner.name}`
      : "không có";
    const ownershipExpiresAt = ownershipExpiry(partner);

    await tx.lead.update({
      where: { id: leadId },
      data: {
        partnerId: partner.id,
        referralCode: partner.code,
        ownershipExpiresAt,
        source: lead.source === "WEBSITE" ? "PARTNER" : lead.source,
      },
    });
    await tx.leadActivity.create({
      data: {
        leadId,
        actorId,
        type: "OWNERSHIP",
        title: "Gán lại đối tác",
        body: `${previousLabel} → ${partner.code} · ${partner.name}. Ownership đến ${ownershipExpiresAt.toLocaleString("vi-VN")}`,
        meta: JSON.stringify({
          previousPartnerId: lead.partnerId,
          partnerId: partner.id,
        }),
      },
    });
  });
}
