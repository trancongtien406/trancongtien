import { ProcessPage } from "@/features/process/ProcessPage";
import { getProcessSteps } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Quy trình làm việc",
  description:
    "Quy trình 6 bước phát triển sản phẩm: khám phá, lập kế hoạch, thiết kế, phát triển, triển khai và tối ưu liên tục.",
  path: "/quy-trinh",
  image: "/images/illustrations/process-roadmap.png",
});

export default async function Page() {
  const steps = await getProcessSteps();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Quy trình", path: "/quy-trinh" },
        ])}
      />
      <ProcessPage
        steps={steps.map((s) => ({
          step: s.step,
          title: s.title,
          tasks: s.tasks,
          time: s.time,
        }))}
      />
    </>
  );
}
