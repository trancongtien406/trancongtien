import { HomePage } from "@/features/home/HomePage";
import {
  getProcessSteps,
  getPublishedProjects,
  getPublishedServices,
  getPublishedTestimonials,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: siteConfig.brand,
  description: siteConfig.description,
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
  );
}
