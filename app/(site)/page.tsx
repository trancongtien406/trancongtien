import { HomePage } from "@/features/home/HomePage";
import {
  getProcessSteps,
  getPublishedProjects,
  getPublishedServices,
  getPublishedTestimonials,
} from "@/lib/content";
import { buildMetadata, homePageJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: siteConfig.fullName,
  description: `${siteConfig.fullName} (${siteConfig.name}) — Full-stack Developer tại Đà Nẵng, thiết kế website, app ứng dụng, hệ thống AI Agent, Web, Mobile & Cloud cho startup và doanh nghiệp.`,
  path: "/",
});

export default async function Page() {
  const [services, projects, process, testimonials] = await Promise.all([
    getPublishedServices(),
    getPublishedProjects(),
    getProcessSteps(),
    getPublishedTestimonials(),
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
          coverUrl: p.coverUrl || "/images/illustrations/services-devices.png",
          coverAlt: p.coverAlt || `Giao diện dự án ${p.title}`,
        })),
        process: process.map((s) => ({
          step: s.step,
          title: s.title,
          description: s.tasks,
        })),
        testimonials: testimonials.map((t) => ({
          quote: t.quote,
          name: t.name,
          role: t.role,
        })),
        }}
      />
    </>
  );
}
