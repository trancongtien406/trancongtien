import { ResourcesPage } from "@/features/resources/ResourcesPage";
import { getPublishedPosts, getPublishedResources } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Tài nguyên",
  description:
    "Kiến thức, template miễn phí, UI Kit, checklist và công cụ hỗ trợ full-stack development, thiết kế app, AI Agent — PRD, estimate, architecture guide.",
  path: "/tai-nguyen",
});

export default async function Page() {
  const [resources, posts] = await Promise.all([
    getPublishedResources(),
    getPublishedPosts(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Tài nguyên", path: "/tai-nguyen" },
        ])}
      />
      <ResourcesPage
        resources={resources.map((r) => ({
          title: r.title,
          category: r.category,
          description: r.description,
          meta: r.meta,
          free: r.free,
        }))}
        posts={posts.slice(0, 4).map((p) => ({
          slug: p.slug,
          title: p.title,
          category: p.category?.name || "Blog",
          image: p.coverUrl || "/images/illustrations/blog-hero-desk.png",
          date: (p.publishedAt || p.createdAt).toLocaleDateString("vi-VN"),
          readTime: p.readTime,
        }))}
      />
    </>
  );
}
