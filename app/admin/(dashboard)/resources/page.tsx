import { EntityCrudManager } from "@/components/admin/EntityCrudManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const items = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <EntityCrudManager
      entity="resource"
      title="Tài nguyên"
      searchKeys={["title", "slug", "category", "description"]}
      columns={[
        { key: "title", label: "Tên" },
        { key: "category", label: "Danh mục" },
        { key: "status", label: "Trạng thái" },
      ]}
      fields={[
        { key: "title", label: "Tiêu đề" },
        { key: "slug", label: "Slug", slugFrom: "title" },
        { key: "category", label: "Danh mục" },
        { key: "description", label: "Mô tả", type: "textarea" },
        { key: "meta", label: "Meta (DOCX · 12 trang)" },
        { key: "coverUrl", label: "Cover", type: "upload" },
        { key: "downloadUrl", label: "Download URL (tùy chọn)" },
        { key: "free", label: "Miễn phí", type: "checkbox" },
        {
          key: "status",
          label: "Trạng thái",
          type: "select",
          options: [
            { value: "PUBLISHED", label: "PUBLISHED" },
            { value: "DRAFT", label: "DRAFT" },
          ],
        },
      ]}
      rows={items.map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        category: r.category,
        description: r.description,
        meta: r.meta || "",
        coverUrl: r.coverUrl || "",
        downloadUrl: r.downloadUrl || "",
        free: r.free ? "true" : "false",
        status: r.status,
      }))}
    />
  );
}
