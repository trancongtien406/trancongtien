import { ProjectsPage } from "@/features/projects/ProjectsPage";
import { getPublishedProjects, parseJsonArray } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Dự án",
  description:
    "Portfolio sản phẩm: Marketplace, Booking, CRM/SaaS, Mobile App và AI Solution do Trần Công Tiến xây dựng.",
  path: "/du-an",
  image: "/images/illustrations/projects-hero-devices.png",
});

export default async function Page() {
  const rows = await getPublishedProjects();
  const projects = rows.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    description: p.description,
    features: parseJsonArray(p.features),
    stack: parseJsonArray(p.stack),
    role: p.role || "",
    timeframe: p.timeframe || "",
    platform: p.platform || "",
    tone: p.tone,
    coverUrl: p.coverUrl || "/images/illustrations/services-devices.png",
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Dự án", path: "/du-an" },
        ])}
      />
      <ProjectsPage projects={projects} />
    </>
  );
}
