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
      images: [siteConfig.personImage, "/og-image.png"],
    },
    {
      path: "/dich-vu",
      images: ["/images/illustrations/services-devices.webp"],
    },
    {
      path: "/du-an",
      images: ["/images/illustrations/projects-hero-devices.webp"],
    },
    {
      path: "/quy-trinh",
      images: ["/images/illustrations/process-roadmap.webp"],
    },
    { path: "/ve-toi", images: [siteConfig.personImage] },
    {
      path: "/tai-nguyen",
      images: ["/images/illustrations/blog-hero-desk.webp"],
    },
    {
      path: "/blog",
      images: ["/images/illustrations/blog-hero-desk.webp"],
    },
    { path: "/lien-he", images: [siteConfig.personImage] },
    { path: "/chinh-sach-bao-mat", images: [] },
    { path: "/dieu-khoan", images: [] },
  ].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    images: route.images.map(absoluteImageUrl),
  }));

  return [
    ...staticRoutes,
    ...posts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      images: p.coverUrl ? [absoluteImageUrl(p.coverUrl)] : [],
    })),
    ...projects.map((p) => ({
      url: `${siteConfig.url}/du-an/${p.slug}`,
      lastModified: p.updatedAt,
      images: p.coverUrl ? [absoluteImageUrl(p.coverUrl)] : [],
    })),
  ];
}
