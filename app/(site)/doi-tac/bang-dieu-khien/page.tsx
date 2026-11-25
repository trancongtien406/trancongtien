import { redirect } from "next/navigation";
import { PartnerDashboard } from "@/features/partner/PartnerDashboard";
import { getSessionPartner } from "@/lib/partners/auth";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Bảng điều khiển đối tác",
  description: "Đăng ký lead và theo dõi trạng thái chương trình đối tác.",
  path: "/doi-tac/bang-dieu-khien",
});

export default async function PartnerDashboardPage() {
  const partner = await getSessionPartner();
  if (!partner) redirect("/doi-tac");

  const [leads, commissions] = await Promise.all([
    prisma.lead.findMany({
      where: { partnerId: partner.id },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        leadNumber: true,
        name: true,
        company: true,
        status: true,
        industry: true,
        projectType: true,
        createdAt: true,
        scoreBand: true,
        leadScore: true,
        estimatedBudget: true,
        source: true,
        estimateSession: {
          select: {
            publicId: true,
            shareCode: true,
            versions: {
              orderBy: { version: "desc" },
              take: 1,
              select: { minAmount: true, maxAmount: true },
            },
          },
        },
      },
    }),
    prisma.commission.findMany({
      where: { partnerId: partner.id },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
  ]);

  return (
    <PartnerDashboard
      partner={{
        code: partner.code,
        name: partner.name,
        type: partner.type,
        commissionRate: Number(partner.commissionRate),
        ownershipDays: partner.ownershipDays,
      }}
      leads={leads.map((lead) => ({
        id: lead.id,
        leadNumber: lead.leadNumber,
        name: lead.name,
        company: lead.company,
        status: lead.status,
        industry: lead.industry,
        projectType: lead.projectType,
        createdAt: lead.createdAt.toISOString(),
        scoreBand: lead.scoreBand,
        leadScore: lead.leadScore,
        estimatedBudget: lead.estimatedBudget,
        source: lead.source,
        estimateRange: lead.estimateSession?.versions[0]
          ? {
              min: Number(lead.estimateSession.versions[0].minAmount),
              max: Number(lead.estimateSession.versions[0].maxAmount),
              shareCode: lead.estimateSession.shareCode,
              publicId: lead.estimateSession.publicId,
            }
          : null,
      }))}
      commissions={commissions.map((item) => ({
        id: item.id,
        amount: Number(item.amount),
        rate: Number(item.rate),
        status: item.status,
        earnedAt: item.earnedAt?.toISOString() || null,
        paidAt: item.paidAt?.toISOString() || null,
      }))}
    />
  );
}
