import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import {
  getPostBySlug,
  getRelatedPosts,
  parseJsonArray,
} from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };


export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverUrl || "/images/illustrations/blog-hero-desk.webp",
    imageWidth: post.coverUrl?.startsWith("/images/blog/") ? 1600 : undefined,
    imageHeight: post.coverUrl?.startsWith("/images/blog/") ? 900 : undefined,
    type: "article",
    publishedTime: (post.publishedAt || post.createdAt).toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    tags: parseJsonArray(post.tags),
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cover = post.coverUrl || "/images/illustrations/blog-hero-desk.webp";
  const coverAlt = post.coverAlt || `Hình minh họa bài viết: ${post.title}`;
  const tags = parseJsonArray(post.tags);
  const relatedPosts = await getRelatedPosts(post.slug, post.categoryId);
  const date = (post.publishedAt || post.createdAt).toLocaleDateString("vi-VN");
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const imageUrl = new URL(cover, siteConfig.url).toString();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          inLanguage: "vi-VN",
          author: {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
            name: post.author?.name || siteConfig.fullName,
            url: `${siteConfig.url}/ve-toi`,
          },
          publisher: { "@id": `${siteConfig.url}/#organization` },
          image: imageUrl,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": postUrl,
          },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <article>
        <Container className="max-w-3xl py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subtle">
              <li>
                <Link href="/" className="hover:text-brand">
                  Trang chủ
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li className="truncate text-ink-muted" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand"
          >
            <ArrowLeft className="size-4" /> Quay lại Blog
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-brand">
            {post.category?.name || "Blog"}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-ink-subtle">
            {date} · {post.readTime} · {post.author?.name || siteConfig.fullName}
          </p>
          <div className="relative mt-8 aspect-video overflow-hidden rounded-3xl">
            <Image
              src={cover}
              alt={coverAlt}
              fill
              className="object-cover"
              preload
              sizes="768px"
            />
          </div>
          <div className="prose-article mt-8 space-y-4 text-base leading-relaxed text-ink-muted">
            <p>{post.excerpt}</p>
            <div
              className="admin-prose space-y-5 [&_a]:font-semibold [&_a]:text-brand [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:bg-brand-soft/50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:text-ink-muted [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-ink [&_h3]:pt-2 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink [&_img]:my-6 [&_img]:rounded-2xl [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-soft px-3 py-1 text-xs font-medium text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-8">
            <h2 className="font-display text-2xl font-bold text-ink">
              Bài viết liên quan
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="flex flex-col rounded-2xl border border-border bg-surface p-4"
                >
                  <p className="text-xs font-semibold text-brand">
                    {related.category?.name || "Kiến thức"}
                  </p>
                  <h3 className="mt-2 font-display font-bold leading-snug text-ink">
                    <Link
                      href={`/blog/${related.slug}`}
                      className="hover:text-brand"
                    >
                      {related.title}
                    </Link>
                  </h3>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand"
                  >
                    Đọc tiếp <ArrowRight className="size-3.5" />
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Cần áp dụng vào một sản phẩm cụ thể?{" "}
              <Link href="/dich-vu" className="font-semibold text-brand">
                Xem dịch vụ phát triển sản phẩm
              </Link>{" "}
              hoặc{" "}
              <Link href="/lien-he" className="font-semibold text-brand">
                đặt lịch trao đổi
              </Link>
              .
            </p>
          </div>
        </Container>
        <CtaBanner title="Muốn áp dụng những nguyên tắc này vào dự án của bạn?" />
      </article>
    </>
  );
}
