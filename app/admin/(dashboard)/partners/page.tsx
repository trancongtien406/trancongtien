import { PartnersManager, type PartnerRow } from "@/components/admin/PartnersManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { leads: true } } } });
  const rows: PartnerRow[] = partners.map((partner) => ({
    id: partner.id, code: partner.code, name: partner.name, company: partner.company || "", email: partner.email,
    phone: partner.phone || "", type: partner.type, status: partner.status, commissionRate: Number(partner.commissionRate),
    ownershipDays: partner.ownershipDays, leadCount: partner._count.leads,
  }));
  return <PartnersManager partners={rows} />;
}
