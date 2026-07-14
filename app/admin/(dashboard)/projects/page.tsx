import { EntityCrudManager } from "@/components/admin/EntityCrudManager";
import { parseJsonArray } from "@/lib/content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const projectCategories = [
  "Web App",
  "Mobile App",
  "Marketplace",
  "CRM / SaaS",
  "Booking",
  "AI Agent",
  "Automation",
] as const;

const projectStackOptions = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "FastAPI",
  "Python",
  "Flutter",
  "Dart",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "Docker",
  "AWS",
  "AWS S3",
  "OpenAI",
  "Qdrant",
  "Figma",
  "Stripe",
  "Socket.io",
  "Chart.js",
  "Bluetooth",
  "Hive",
  "Provider",
] as const;

const toneOptions = [
  { value: "bg-blue-50", label: "Blue" },
  { value: "bg-violet-50", label: "Violet" },
  { value: "bg-emerald-50", label: "Emerald" },
  { value: "bg-cyan-50", label: "Cyan" },
  { value: "bg-orange-50", label: "Orange" },
  { value: "bg-rose-50", label: "Rose" },
  { value: "bg-slate-900", label: "Dark" },
];

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <EntityCrudManager
      entity="project"
      title="Dự án"
      subtitle="Quản lý case study, stack công nghệ và nội dung hiển thị ngoài site"
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
        {
          key: "category",
          label: "Loại dự án",
          type: "select",
          options: projectCategories.map((category) => ({
            value: category,
            label: category,
          })),
        },
        {
          key: "description",
          label: "Mô tả ngắn",
          type: "textarea",
          placeholder:
            "Ví dụ: Thiết kế và phát triển web app đặt lịch với dashboard quản trị, nhắc lịch tự động và báo cáo doanh thu.",
        },
        {
          key: "content",
          label: "Case study / nội dung",
          type: "richtext",
          placeholder:
            "Viết case study: bài toán, giải pháp, kết quả, hình ảnh minh họa...",
        },
        {
          key: "coverUrl",
          label: "Ảnh cover",
          type: "upload",
          altKey: "coverAlt",
          promptAlt: true,
        },
        {
          key: "coverAlt",
          label: "Alt ảnh cover",
          type: "textarea",
          placeholder:
            "Ví dụ: Giao diện dashboard CRM SaaS với biểu đồ doanh thu và pipeline khách hàng.",
        },
        {
          key: "features",
          label: "Tính năng nổi bật",
          type: "textarea",
          placeholder:
            "Nhập mỗi tính năng cách nhau bằng dấu phẩy: Dashboard, Booking flow, Email reminder",
        },
        {
          key: "stack",
          label: "Stack công nghệ",
          type: "multi-select",
          options: projectStackOptions.map((stack) => ({
            value: stack,
            label: stack,
          })),
          placeholder: "Chọn stack dùng trong dự án",
        },
        {
          key: "role",
          label: "Vai trò",
          type: "select",
          options: [
            { value: "Full-stack Developer", label: "Full-stack Developer" },
            { value: "Frontend Developer", label: "Frontend Developer" },
            { value: "Backend Developer", label: "Backend Developer" },
            { value: "Mobile Developer", label: "Mobile Developer" },
            { value: "AI Agent Builder", label: "AI Agent Builder" },
            { value: "UI/UX Designer", label: "UI/UX Designer" },
          ],
        },
        { key: "timeframe", label: "Thời gian", placeholder: "03/2024 – 08/2024" },
        {
          key: "platform",
          label: "Nền tảng",
          type: "select",
          options: [
            { value: "Web", label: "Web" },
            { value: "iOS, Android", label: "iOS, Android" },
            { value: "iOS, Android, Web", label: "iOS, Android, Web" },
            { value: "Web, API", label: "Web, API" },
            { value: "Automation", label: "Automation" },
          ],
        },
        {
          key: "tone",
          label: "Tone màu",
          type: "select",
          options: toneOptions,
        },
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
        coverAlt: p.coverAlt || "",
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
