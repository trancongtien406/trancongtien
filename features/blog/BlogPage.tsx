"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Search } from "lucide-react";
import {
  Container,
  SectionEyebrow,
} from "@/components/common/Container";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  image: string;
  imageAlt: string;
};

const categories = [
  "Tất cả bài viết",
  "Tự duy sản phẩm",
  "Kiến trúc hệ thống",
  "Frontend",
  "AI Agent",
] as const;

const popularTopics = [
  "Tự duy sản phẩm",
  "Kiến trúc hệ thống",
  "Next.js",
  "Clean Code",
  "AI Agent",
];

export function BlogPage({ posts }: { posts: BlogListItem[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>(
    "Tất cả bài viết",
  );
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchCat =
        filter === "Tất cả bài viết" || post.category === filter;
      const matchQuery =
        !query ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [filter, query, posts]);

  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-soft/40 to-surface">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="space-y-6">
            <SectionEyebrow>Blog</SectionEyebrow>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Chia sẻ kiến thức, kinh nghiệm thực chiến
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Ghi chép từ các dự án full-stack thực tế — kiến trúc,
              frontend, thiết kế app, AI Agent và tư duy sản phẩm.
            </p>
            <label className="relative block max-w-lg">
              <span className="sr-only">Tìm bài viết</span>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                type="search"
                placeholder="Tìm kiếm bài viết..."
                className="h-12 w-full rounded-2xl border border-border bg-white px-4 pr-12 text-sm outline-none ring-brand/30 focus:ring-2"
              />
              <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
            </label>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-ink-subtle">
                Popular Topics:
              </span>
              {popularTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    setFilter(
                      categories.includes(topic as (typeof categories)[number])
                        ? (topic as (typeof categories)[number])
                        : "Tất cả bài viết",
                    );
                    setQuery(topic);
                  }}
                  className="rounded-full bg-surface-soft px-2.5 py-1 text-xs font-medium text-ink-muted hover:bg-brand-soft hover:text-brand"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/illustrations/blog-hero-desk.png"
              alt="Không gian làm việc với laptop hiển thị dashboard phân tích dữ liệu"
              width={900}
              height={700}
              className="aspect-4/3 w-full object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setFilter(cat);
                    setPage(1);
                  }}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    filter === cat
                      ? "bg-brand text-white"
                      : "border border-border text-ink-muted hover:border-brand/40",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              {filtered.map((post) => (
                <article
                  key={post.slug}
                  className="grid gap-5 overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-sm sm:grid-cols-[220px_1fr] sm:p-5"
                >
                  <div className="relative aspect-16/11 overflow-hidden rounded-xl sm:aspect-auto sm:min-h-40">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-ink-subtle">
                      {post.date} · {post.readTime}
                    </p>
                    <h2 className="mt-2 font-display text-xl font-bold text-ink">
                      <Link href={`/blog/${post.slug}`} className="hover:text-brand">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-surface-soft px-2.5 py-1 text-xs text-ink-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Image
                        src="/images/avatars/avatar.png"
                        alt={siteConfig.fullName}
                        width={28}
                        height={28}
                        className="size-7 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-ink">
                        {siteConfig.fullName}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <nav
              className="mt-10 flex items-center justify-center gap-2"
              aria-label="Phân trang blog"
            >
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full text-sm font-semibold",
                    page === n
                      ? "bg-brand text-white"
                      : "border border-border text-ink-muted hover:border-brand/40",
                  )}
                >
                  {n}
                </button>
              ))}
            </nav>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-5 text-center">
              <Image
                src="/images/avatars/avatar.png"
                alt={`Giới thiệu ${siteConfig.fullName}`}
                width={80}
                height={80}
                className="mx-auto size-20 rounded-full object-cover"
              />
              <h2 className="mt-3 font-semibold text-ink">Giới thiệu</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Full-stack Developer — giúp startup biến ý tưởng thành website, app và AI Agent thực tế.
              </p>
              <Link
                href="/ve-toi"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand"
              >
                Tìm hiểu thêm <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h2 className="font-semibold text-ink">Danh mục</h2>
              <ul className="mt-3 space-y-2">
                {categories.slice(1).map((cat) => {
                  const count = posts.filter((p) => p.category === cat).length;
                  return (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => setFilter(cat)}
                        className="flex w-full items-center justify-between text-sm text-ink-muted hover:text-brand"
                      >
                        <span>{cat}</span>
                        <span className="rounded-full bg-surface-soft px-2 py-0.5 text-xs">
                          {count || 1}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <h2 className="font-semibold text-ink">Bài viết nổi bật</h2>
              <ul className="mt-4 space-y-4">
                {posts.slice(0, 3).map((post) => (
                  <li key={post.slug} className="flex gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand"
                      >
                        {post.title}
                      </Link>
                      <p className="mt-1 text-xs text-ink-subtle">{post.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand/20 bg-brand-soft p-5">
              <h2 className="font-semibold text-ink">Đăng ký nhận bài viết mới</h2>
              <form
                className="mt-3 space-y-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="Email của bạn"
                  className="h-10 w-full rounded-xl border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
                <button
                  type="submit"
                  className="h-10 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand-dark"
                >
                  Đăng ký
                </button>
              </form>
              <div className="mt-3 flex gap-3 text-xs text-ink-muted">
                <span className="inline-flex items-center gap-1">
                  <Check className="size-3 text-success" /> Spam-free
                </span>
                <span className="inline-flex items-center gap-1">
                  <Check className="size-3 text-success" /> Hủy bất kỳ lúc nào
                </span>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
