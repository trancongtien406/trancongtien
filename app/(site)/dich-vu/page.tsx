import { ServicesPage } from "@/features/services/ServicesPage";
import {
  getProcessSteps,
  getPublishedServices,
  parseJsonArray,
} from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Dịch vụ",
  description:
    "Giải pháp phát triển sản phẩm toàn diện: khám phá, thiết kế UI/UX, phát triển Web/Mobile, triển khai DevOps và tối ưu tăng trưởng.",
  path: "/dich-vu",
});

export default async function Page() {
  const [services, process] = await Promise.all([
    getPublishedServices(),
    getProcessSteps(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Dịch vụ", path: "/dich-vu" },
        ])}
      />
      <ServicesPage
        services={services.map((s) => ({
          id: s.id,
          number: s.number,
          title: s.title,
          slug: s.slug,
          items: parseJsonArray(s.items),
          color: s.color,
        }))}
        process={process.map((s) => ({
          step: s.step,
          title: s.title,
          description: s.tasks,
        }))}
      />
    </>
  );
}
