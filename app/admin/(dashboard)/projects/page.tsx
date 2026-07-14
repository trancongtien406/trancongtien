import { EntityCrudManager } from "@/components/admin/EntityCrudManager";
import { parseJsonArray } from "@/lib/content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <EntityCrudManager
      entity="project"
      title="Dự án"
      subtitle="CRUD đầy đủ — dữ liệu lưu SQLite"
      searchKeys={["title", "slug", "category", "description"]}
      columns={[
        { key: "title", label: "Dự án" },
        { key: "category", label: "Loại" },
        { key: "status", label: "Trạng thái" },
        { key: "sortOrder", label: "Thứ tự" },
      ]}
      fields={[
        { key: "title", label: "Tiêu đề" },
        { key: "slug", label: "Slug", slugFrom: "title" },
        { key: "category", label: "Loại" },
        { key: "description", label: "Mô tả ngắn", type: "textarea" },
        { key: "content", label: "Case study / nội dung", type: "textarea" },
        { key: "coverUrl", label: "Ảnh cover", type: "upload" },
        { key: "features", label: "Features (phẩy)", placeholder: "A, B, C" },
        { key: "stack", label: "Stack (phẩy)", placeholder: "Next.js, NestJS" },
        { key: "role", label: "Vai trò" },
        { key: "timeframe", label: "Thời gian" },
        { key: "platform", label: "Nền tảng" },
        { key: "tone", label: "Tone CSS class" },
        {
          key: "status",
          label: "Trạng thái",
          type: "select",
          options: [
            { value: "PUBLISHED", label: "PUBLISHED" },
            { value: "DRAFT", label: "DRAFT" },
            { value: "ARCHIVED", label: "ARCHIVED" },
          ],
        },
        { key: "sortOrder", label: "Thứ tự", type: "number" },
      ]}
      rows={projects.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        description: p.description,
        content: p.content,
        coverUrl: p.coverUrl || "",
        features: parseJsonArray(p.features).join(", "),
        stack: parseJsonArray(p.stack).join(", "),
        role: p.role || "",
        timeframe: p.timeframe || "",
        platform: p.platform || "",
        tone: p.tone,
        status: p.status,
        sortOrder: p.sortOrder,
      }))}
    />
  );
}
