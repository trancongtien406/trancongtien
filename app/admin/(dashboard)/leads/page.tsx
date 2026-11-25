import { Suspense } from "react";
import {
  LeadsManager,
  type LeadRow,
  type PartnerOption,
} from "@/components/admin/LeadsManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const [leads, partners] = await Promise.all([
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        partner: { select: { id: true, code: true, name: true } },
        estimateSession: { select: { publicId: true, shareCode: true } },
        activities: { orderBy: { createdAt: "desc" }, take: 20 },
      },
    }),
    prisma.partner.findMany({
      where: { status: "APPROVED" },
      orderBy: { code: "asc" },
      select: { id: true, code: true, name: true },
    }),
  ]);

  const rows: LeadRow[] = leads.map((lead) => ({
    id: lead.id,
    leadNumber: lead.leadNumber,
    name: lead.name,
    company: lead.company || "",
    email: lead.email,
    phone: lead.phone || "",
    industry: lead.industry || "",
    projectType: lead.projectType || "",
    description: lead.description,
    budget: lead.estimatedBudget || "",
    timeline: lead.expectedTimeline || "",
    status: lead.status,
    priority: lead.priority,
    source: lead.source,
    partner: lead.partner ? `${lead.partner.code} · ${lead.partner.name}` : "",
    partnerId: lead.partnerId || "",
    hasPartner: Boolean(lead.partnerId),
    ownershipExpiresAt: lead.ownershipExpiresAt?.toLocaleString("vi-VN") || "",
    nextFollowUpAt: lead.nextFollowUpAt?.toISOString().slice(0, 16) || "",
    lostReason: lead.lostReason || "",
    createdAt: lead.createdAt.toLocaleString("vi-VN"),
    scoreBand: lead.scoreBand || "",
    leadScore: lead.leadScore ?? null,
    estimatePublicId: lead.estimateSession?.publicId || "",
    activities: lead.activities.map((activity) => ({
      id: activity.id,
      title: activity.title,
      body: activity.body || "",
      type: activity.type,
      createdAt: activity.createdAt.toLocaleString("vi-VN"),
    })),
  }));

  const partnerOptions: PartnerOption[] = partners.map((p) => ({
    id: p.id,
    label: `${p.code} · ${p.name}`,
  }));

  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Đang tải CRM...</p>}>
      <LeadsManager leads={rows} partners={partnerOptions} />
    </Suspense>
  );
}
