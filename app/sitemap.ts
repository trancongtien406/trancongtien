import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.project.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticRoutes = [
    "",
    "/dich-vu",
    "/du-an",
    "/quy-trinh",
    "/ve-toi",
    "/tai-nguyen",
    "/blog",
    "/lien-he",
    "/chinh-sach-bao-mat",
    "/dieu-khoan",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...posts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...projects.map((p) => ({
      url: `${siteConfig.url}/du-an/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
