import { HomePage } from "@/features/home/HomePage";
import {
  getProcessSteps,
  getPublishedProjects,
  getPublishedServices,
  getPublishedSolutions,
} from "@/lib/content";
import { buildMetadata, homePageJsonLd, JsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Thiết kế website, app & AI Agent Đà Nẵng | Trần Công Tiến",
  absoluteTitle: true,
  description:
    "Xây website, ứng dụng di động, phần mềm vận hành và AI từ khám phá đến production cho startup và doanh nghiệp Việt Nam.",
  path: "/",
});

export default async function Page() {
  const [services, projects, process, solutions] = await Promise.all([
    getPublishedServices(),
    getPublishedProjects(),
    getProcessSteps(),
    getPublishedSolutions(),
  ]);

  return (
    <>
      <JsonLd data={homePageJsonLd()} />
      <HomePage
        data={{
          services: services.map((s) => ({
            id: s.id,
            number: s.number,
            title: s.title,
            description: s.description,
            color: s.color,
            slug: s.slug,
          })),
          projects: projects.slice(0, 6).map((p) => ({
            slug: p.slug,
            category: p.category,
            title: p.title,
            description: p.description,
            coverUrl: p.coverUrl || "/images/illustrations/services-devices.webp",
            coverAlt: p.coverAlt || `Giao diện dự án ${p.title}`,
          })),
          solutions: solutions.slice(0, 6).map((s) => ({
            slug: s.slug,
            title: s.title,
            industry: s.industry,
            excerpt: s.excerpt,
          })),
          process: process.map((s) => ({
            step: s.step,
            title: s.title,
            description: s.tasks,
          })),
        }}
      />
    </>
  );
}
