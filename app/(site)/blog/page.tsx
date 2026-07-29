import { BlogPage } from "@/features/blog/BlogPage";
import { getPublishedPosts, parseJsonArray } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Blog kiến thức thực chiến về full-stack development: kiến trúc hệ thống, Next.js, Clean Code, thiết kế app, AI Agent và tư duy sản phẩm.",
  path: "/blog",
  image: "/images/illustrations/blog-hero-desk.webp",
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
    image: p.coverUrl || "/images/illustrations/blog-hero-desk.webp",
    imageAlt: p.coverAlt || `Ảnh minh họa bài viết ${p.title}`,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${siteConfig.url}/blog#webpage`,
          url: `${siteConfig.url}/blog`,
          name: "Blog kiến thức Full-stack, sản phẩm và AI Agent",
          description:
            "Chia sẻ kiến thức thực chiến về phát triển web/app, kiến trúc hệ thống, UI/UX, startup và AI Agent.",
          inLanguage: "vi-VN",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: posts.length,
            itemListElement: posts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteConfig.url}/blog/${post.slug}`,
              name: post.title,
            })),
          },
        }}
      />
      <BlogPage posts={posts} />
    </>
  );
}
