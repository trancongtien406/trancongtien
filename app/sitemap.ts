import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

const absoluteImageUrl = (path: string) =>
  new URL(path, siteConfig.url).toString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true, coverUrl: true },
    }),
    prisma.project.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true, coverUrl: true },
    }),
  ]);

  const staticRoutes = [
    {
      path: "",
      priority: 1,
      images: [siteConfig.personImage, "/og-image.png"],
    },
    {
      path: "/dich-vu",
      priority: 0.8,
      images: ["/images/illustrations/services-devices.png"],
    },
    {
      path: "/du-an",
      priority: 0.8,
      images: ["/images/illustrations/projects-hero-devices.png"],
    },
    {
      path: "/quy-trinh",
      priority: 0.8,
      images: ["/images/illustrations/process-roadmap.png"],
    },
    { path: "/ve-toi", priority: 0.9, images: [siteConfig.personImage] },
    {
      path: "/tai-nguyen",
      priority: 0.8,
      images: ["/images/illustrations/blog-hero-desk.png"],
    },
    {
      path: "/blog",
      priority: 0.8,
      images: ["/images/illustrations/blog-hero-desk.png"],
    },
    { path: "/lien-he", priority: 0.8, images: [siteConfig.personImage] },
    { path: "/chinh-sach-bao-mat", priority: 0.4, images: [] },
    { path: "/dieu-khoan", priority: 0.4, images: [] },
  ].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route.priority,
    images: route.images.map(absoluteImageUrl),
  }));

  return [
    ...staticRoutes,
    ...posts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: p.coverUrl ? [absoluteImageUrl(p.coverUrl)] : [],
    })),
    ...projects.map((p) => ({
      url: `${siteConfig.url}/du-an/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: p.coverUrl ? [absoluteImageUrl(p.coverUrl)] : [],
    })),
  ];
}
