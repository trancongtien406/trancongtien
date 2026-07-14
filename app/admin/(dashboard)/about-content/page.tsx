import { EntityCrudManager } from "@/components/admin/EntityCrudManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminAboutContentPage() {
  const [values, journey] = await Promise.all([
    prisma.coreValue.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.journeyItem.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div className="space-y-10">
      <EntityCrudManager
        entity="coreValue"
        title="Giá trị cốt lõi"
        searchKeys={["title", "description"]}
        columns={[
          { key: "title", label: "Tiêu đề" },
          { key: "status", label: "Trạng thái" },
        ]}
        fields={[
          { key: "title", label: "Tiêu đề" },
          { key: "description", label: "Mô tả", type: "textarea" },
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
        rows={values.map((v) => ({
          id: v.id,
          title: v.title,
          description: v.description,
          status: v.status,
          sortOrder: v.sortOrder,
        }))}
      />

      <EntityCrudManager
        entity="journeyItem"
        title="Hành trình"
        searchKeys={["year", "title", "description"]}
        columns={[
          { key: "year", label: "Năm" },
          { key: "title", label: "Tiêu đề" },
          { key: "status", label: "Trạng thái" },
        ]}
        fields={[
          { key: "year", label: "Năm" },
          { key: "title", label: "Tiêu đề" },
          { key: "description", label: "Mô tả", type: "textarea" },
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
        rows={journey.map((j) => ({
          id: j.id,
          year: j.year,
          title: j.title,
          description: j.description,
          status: j.status,
          sortOrder: j.sortOrder,
        }))}
      />
    </div>
  );
}
