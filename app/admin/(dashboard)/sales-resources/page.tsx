import {
  SalesResourcesManager,
  type SalesResourceRow,
} from "@/components/admin/SalesResourcesManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminSalesResourcesPage() {
  const items = await prisma.salesResource.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });
  const rows: SalesResourceRow[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    description: item.description,
    body: item.body,
    fileUrl: item.fileUrl || "",
    partnerVisible: item.partnerVisible,
    status: item.status,
    sortOrder: item.sortOrder,
  }));
  return <SalesResourcesManager items={rows} />;
}
