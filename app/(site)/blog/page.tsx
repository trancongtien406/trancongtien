import { BlogPage } from "@/features/blog/BlogPage";
import { getPublishedPosts, parseJsonArray } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Blog kiến thức thực chiến về product engineering: kiến trúc hệ thống, Next.js, Clean Code, AI và tư duy sản phẩm.",
  path: "/blog",
  image: "/images/illustrations/blog-hero-desk.png",
});

export default async function Page() {
  const rows = await getPublishedPosts();
  const posts = rows.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: (p.publishedAt || p.createdAt).toLocaleDateString("vi-VN"),
    readTime: p.readTime,
    tags: parseJsonArray(p.tags),
    category: p.category?.name || "Kiến thức",
    image: p.coverUrl || "/images/illustrations/blog-hero-desk.png",
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <BlogPage posts={posts} />
    </>
  );
}
