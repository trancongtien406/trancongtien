import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import { getPostBySlug, parseJsonArray } from "@/lib/content";
import { buildMetadata, JsonLd } from "@/lib/seo";
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
    image: post.coverUrl || "/images/illustrations/blog-hero-desk.png",
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cover = post.coverUrl || "/images/illustrations/blog-hero-desk.png";
  const coverAlt = post.coverAlt || `Hình minh họa bài viết: ${post.title}`;
  const tags = parseJsonArray(post.tags);
  const date = (post.publishedAt || post.createdAt).toLocaleDateString("vi-VN");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
          author: {
            "@type": "Person",
            name: post.author?.name || siteConfig.fullName,
          },
          image: `${siteConfig.url}${cover}`,
          mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
        }}
      />
      <article>
        <Container className="max-w-3xl py-12 sm:py-16">
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
              priority
              sizes="768px"
            />
          </div>
          <div className="prose-article mt-8 space-y-4 text-base leading-relaxed text-ink-muted">
            <p>{post.excerpt}</p>
            <div
              className="admin-prose space-y-5 [&_a]:font-semibold [&_a]:text-brand [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:bg-brand-soft/50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:text-ink-muted [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-ink [&_h3]:pt-2 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink [&_img]:my-6 [&_img]:rounded-2xl [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <h2 className="font-display text-2xl font-bold text-ink">
              Câu hỏi thường gặp
            </h2>
            <p>
              <strong>Khi nào nên áp dụng?</strong> Khi bạn đã có bài toán người
              dùng rõ ràng và cần khung ra quyết định kỹ thuật có kiểm soát rủi
              ro.
            </p>
            <p>
              <strong>Bước tiếp theo?</strong>{" "}
              <Link href="/lien-he" className="font-semibold text-brand">
                Đặt lịch tư vấn
              </Link>{" "}
              để áp dụng vào dự án cụ thể.
            </p>
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
        </Container>
        <CtaBanner title="Muốn áp dụng những nguyên tắc này vào dự án của bạn?" />
      </article>
    </>
  );
}
