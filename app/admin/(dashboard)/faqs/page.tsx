import { EntityCrudManager } from "@/components/admin/EntityCrudManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const items = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <EntityCrudManager
      entity="faq"
      title="FAQ"
      searchKeys={["question", "answer"]}
      columns={[
        { key: "question", label: "Câu hỏi" },
        { key: "status", label: "Trạng thái" },
        { key: "sortOrder", label: "Thứ tự" },
      ]}
      fields={[
        { key: "question", label: "Câu hỏi", type: "textarea" },
        { key: "answer", label: "Trả lời", type: "textarea" },
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
      rows={items.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        status: f.status,
        sortOrder: f.sortOrder,
      }))}
    />
  );
}
