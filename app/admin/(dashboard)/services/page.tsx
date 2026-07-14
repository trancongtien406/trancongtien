import { EntityCrudManager } from "@/components/admin/EntityCrudManager";
import { parseJsonArray } from "@/lib/content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <EntityCrudManager
      entity="service"
      title="Dịch vụ"
      subtitle="CRUD dịch vụ trên SQLite"
      searchKeys={["title", "slug", "description"]}
      columns={[
        { key: "number", label: "#" },
        { key: "title", label: "Dịch vụ" },
        { key: "status", label: "Trạng thái" },
        { key: "sortOrder", label: "Thứ tự" },
      ]}
      fields={[
        { key: "number", label: "Số thứ tự hiển thị" },
        { key: "title", label: "Tiêu đề" },
        { key: "slug", label: "Slug", slugFrom: "title" },
        { key: "description", label: "Mô tả", type: "textarea" },
        { key: "items", label: "Checklist (phẩy)" },
        { key: "color", label: "Color class" },
        {
          key: "status",
          label: "Trạng thái",
          type: "select",
          options: [
            { value: "PUBLISHED", label: "PUBLISHED" },
            { value: "DRAFT", label: "DRAFT" },
          ],
        },
        { key: "sortOrder", label: "Thứ tự", type: "number" },
      ]}
      rows={services.map((s) => ({
        id: s.id,
        number: s.number,
        title: s.title,
        slug: s.slug,
        description: s.description,
        items: parseJsonArray(s.items).join(", "),
        color: s.color,
        status: s.status,
        sortOrder: s.sortOrder,
      }))}
    />
  );
}
