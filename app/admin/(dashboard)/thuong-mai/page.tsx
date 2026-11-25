import { CommercialManager } from "@/components/admin/CommercialManager";
import { prisma } from "@/lib/db";
import { isPayosConfigured } from "@/lib/payments/payos";

export const dynamic = "force-dynamic";

function money(value: { toString(): string }) {
  return `${Number(value.toString()).toLocaleString("vi-VN")} ₫`;
}

export default async function AdminCommercialPage() {
  const [leads, proposals, payments, commissions] = await Promise.all([
    prisma.lead.findMany({
      orderBy: { updatedAt: "desc" },
      take: 100,
      include: { partner: { select: { code: true } } },
    }),
    prisma.proposal.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { lead: { select: { leadNumber: true, name: true } } },
    }),
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { lead: { select: { leadNumber: true, name: true } } },
    }),
    prisma.commission.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { partner: { select: { code: true, name: true } } },
    }),
  ]);

  return (
    <CommercialManager
      payosReady={await isPayosConfigured()}
      leads={leads.map((lead) => ({
        id: lead.id,
        leadNumber: lead.leadNumber,
        name: lead.name,
        partner: lead.partner?.code || "",
        status: lead.status,
      }))}
      proposals={proposals.map((item) => ({
        id: item.id,
        title: item.title,
        leadLabel: `${item.lead.leadNumber} · ${item.lead.name}`,
        version: item.version,
        amount: money(item.amount),
        status: item.status,
        createdAt: item.createdAt.toLocaleString("vi-VN"),
      }))}
      payments={payments.map((item) => ({
        id: item.id,
        leadLabel: `${item.lead.leadNumber} · ${item.lead.name}`,
        amount: money(item.amount),
        status: item.status,
        reference: item.reference || "",
        receivedAt: item.receivedAt?.toLocaleString("vi-VN") || "",
        checkoutUrl: item.checkoutUrl || "",
        provider: item.provider || "MANUAL",
      }))}
      commissions={commissions.map((item) => ({
        id: item.id,
        partner: `${item.partner.code} · ${item.partner.name}`,
        amount: money(item.amount),
        rate: item.rate.toString(),
        status: item.status,
        earnedAt: item.earnedAt?.toLocaleString("vi-VN") || "",
      }))}
    />
  );
}
