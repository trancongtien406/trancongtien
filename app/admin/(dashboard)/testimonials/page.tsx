import { EntityCrudManager } from "@/components/admin/EntityCrudManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <EntityCrudManager
      entity="testimonial"
      title="Testimonials"
      searchKeys={["name", "role", "quote"]}
      columns={[
        { key: "name", label: "Tên" },
        { key: "role", label: "Vai trò" },
        { key: "status", label: "Trạng thái" },
      ]}
      fields={[
        { key: "name", label: "Tên" },
        { key: "role", label: "Chức danh" },
        { key: "quote", label: "Nội dung", type: "textarea" },
        { key: "avatarUrl", label: "Avatar", type: "upload" },
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
      rows={items.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        quote: t.quote,
        avatarUrl: t.avatarUrl || "",
        status: t.status,
        sortOrder: t.sortOrder,
      }))}
    />
  );
}
