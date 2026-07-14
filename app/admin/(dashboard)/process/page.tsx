import { EntityCrudManager } from "@/components/admin/EntityCrudManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminProcessPage() {
  const steps = await prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <EntityCrudManager
      entity="processStep"
      title="Quy trình"
      searchKeys={["title", "step", "tasks"]}
      columns={[
        { key: "step", label: "Bước" },
        { key: "title", label: "Tiêu đề" },
        { key: "time", label: "Thời gian" },
        { key: "status", label: "Trạng thái" },
      ]}
      fields={[
        { key: "step", label: "Mã bước (01, 02…)" },
        { key: "title", label: "Tiêu đề" },
        { key: "tasks", label: "Công việc", type: "textarea" },
        { key: "time", label: "Thời lượng" },
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
      rows={steps.map((s) => ({
        id: s.id,
        step: s.step,
        title: s.title,
        tasks: s.tasks,
        time: s.time,
        status: s.status,
        sortOrder: s.sortOrder,
      }))}
    />
  );
}
