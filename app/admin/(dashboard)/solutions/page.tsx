import { EntityCrudManager } from "@/components/admin/EntityCrudManager";
import { parseJsonArray } from "@/lib/content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminSolutionsPage() {
  const solutions = await prisma.solution.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <EntityCrudManager
      entity="solution"
      title="Giải pháp theo ngành"
      subtitle="Landing page theo ngành để đối tác gửi khách"
      searchKeys={["title", "slug", "industry", "excerpt"]}
      columns={[
        { key: "title", label: "Solution" },
        { key: "industry", label: "Ngành" },
        { key: "status", label: "Trạng thái" },
        { key: "sortOrder", label: "Thứ tự" },
      ]}
      fields={[
        { key: "title", label: "Tiêu đề" },
        { key: "slug", label: "Slug", slugFrom: "title" },
        { key: "industry", label: "Ngành" },
        { key: "excerpt", label: "Excerpt", type: "textarea", span: "full" },
        { key: "heroTitle", label: "Hero title", span: "full" },
        { key: "heroDescription", label: "Hero description", type: "textarea", span: "full" },
        { key: "problems", label: "Problems (phẩy)", span: "full" },
        { key: "capabilities", label: "Capabilities (phẩy)", span: "full" },
        { key: "packageItems", label: "Package items (phẩy)", span: "full" },
        { key: "coverUrl", label: "Cover URL", type: "upload", altKey: "coverAlt" },
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
      rows={solutions.map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        industry: s.industry,
        excerpt: s.excerpt,
        heroTitle: s.heroTitle,
        heroDescription: s.heroDescription,
        problems: parseJsonArray(s.problems).join(", "),
        capabilities: parseJsonArray(s.capabilities).join(", "),
        packageItems: parseJsonArray(s.packageItems).join(", "),
        coverUrl: s.coverUrl,
        coverAlt: s.coverAlt,
        status: s.status,
        sortOrder: s.sortOrder,
      }))}
    />
  );
}
