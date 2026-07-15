"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Code2,
  Download,
  FileText,
  LayoutTemplate,
  ListChecks,
  Search,
  Star,
  Video,
} from "lucide-react";
import {
  Breadcrumbs,
  Container,
  SectionEyebrow,
  SectionHeading,
} from "@/components/common/Container";
type ResourceItem = {
  title: string;
  category: string;
  description: string;
  meta: string | null;
  free: boolean;
};

type PostItem = {
  slug: string;
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
};

const categories = [
  {
    icon: BookOpen,
    title: "Hướng dẫn & Kiến thức",
    text: "Bài viết thực chiến về product & engineering.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FileText,
    title: "Mẫu tài liệu",
    text: "PRD, SRS, estimate sheet sẵn sàng dùng.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Code2,
    title: "Công cụ & Resources",
    text: "Boilerplate, snippets và tooling hữu ích.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: LayoutTemplate,
    title: "UI Kit & Template",
    text: "Design system và template Figma.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Video,
    title: "Video & Presentation",
    text: "Slide và video chia sẻ kiến thức.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Star,
    title: "Checklist",
    text: "Launch, QA và discovery checklist.",
    color: "bg-amber-50 text-amber-600",
  },
];

const trending = [
  "PRD Template",
  "SRS Template",
  "UI Kit",
  "Next.js",
  "System Design",
];

const freeTools = [
  "Excel Estimate",
  "Google Docs PRD",
  "Notion Launch Kit",
  "Figma UI Kit",
  "Architecture Checklist",
];

export function ResourcesPage({
  resources,
  posts,
}: {
  resources: ResourceItem[];
  posts: PostItem[];
}) {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-soft/40 to-surface">
        <Container className="py-14 lg:py-20">
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Tài nguyên" },
            ]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <SectionEyebrow>Tài nguyên</SectionEyebrow>
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Kiến thức, công cụ và mẫu miễn phí dành cho bạn
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Chia sẻ kiến thức thực chiến, template chất lượng và checklist
                giúp team ship sản phẩm nhanh hơn, ít sai sót hơn.
              </p>
              <label className="relative block max-w-lg">
                <span className="sr-only">Tìm tài nguyên</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
                <input
                  type="search"
                  placeholder="Tìm PRD, UI Kit, checklist..."
                  className="h-12 w-full rounded-2xl border border-border bg-white pl-11 pr-4 text-sm outline-none ring-brand/30 transition focus:ring-2"
                />
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-ink-subtle">
                  Xu hướng:
                </span>
                {trending.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-soft px-2.5 py-1 text-xs font-medium text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustrations/blog-hero-desk.png"
                alt="Laptop hiển thị dashboard cùng các thẻ tài nguyên nổi bật"
                width={900}
                height={700}
                className="w-full rounded-3xl object-cover shadow-xl"
                priority
              />
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 sm:inset-x-auto sm:right-4 sm:top-4 sm:bottom-auto sm:w-48 sm:grid-cols-1">
                {["PRD Template", "UI Kit", "Estimate Sheet", "Architecture Guide"].map(
                  (label) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/40 bg-white/90 px-3 py-2 text-xs font-semibold text-ink shadow-sm backdrop-blur"
                    >
                      {label}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14" id="guides">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-subtle">
            Danh mục tài nguyên
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categories.map((cat) => (
              <article
                key={cat.title}
                className="rounded-2xl border border-border bg-surface p-5 text-center"
              >
                <div
                  className={`mx-auto flex size-12 items-center justify-center rounded-2xl ${cat.color}`}
                >
                  <cat.icon className="size-5" />
                </div>
                <h2 className="mt-3 text-sm font-bold text-ink">{cat.title}</h2>
                <p className="mt-1 text-xs text-ink-muted">{cat.text}</p>
                <Link
                  href="#featured"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand"
                >
                  Xem tất cả <ArrowRight className="size-3" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-14" id="featured">
        <Container>
          <SectionHeading
            eyebrow="Tài nguyên nổi bật"
            title="Mẫu và kit sẵn sàng sử dụng"
            action={
              <Link href="/lien-he" className="text-sm font-semibold text-brand">
                Xem tất cả tài nguyên
              </Link>
            }
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {resources.map((resource) => (
              <article
                key={resource.title}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="flex aspect-4/3 items-center justify-center bg-brand-soft">
                  <FileText className="size-10 text-brand" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                    {resource.category}
                  </p>
                  <h3 className="mt-1 font-semibold text-ink">{resource.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    {resource.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-ink-subtle">
                    <span>{resource.meta}</span>
                    {resource.free ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-success">
                        <Download className="size-3" /> Miễn phí
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14" id="ui-kit">
        <Container>
          <SectionHeading
            eyebrow="Bài viết mới nhất"
            title="Kiến thức từ thực chiến"
            action={
              <Link href="/blog" className="text-sm font-semibold text-brand">
                Xem tất cả bài viết
              </Link>
            }
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {posts.slice(0, 4).map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-8/5">
                    <Image
                      src={post.image}
                      alt={`Hình minh họa bài viết: ${post.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                      {post.category}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs text-ink-subtle">
                      {post.date} · {post.readTime}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-12" id="checklist">
        <Container>
          <SectionHeading title="Công cụ & mẫu miễn phí khác" />
          <div className="mt-6 flex flex-wrap gap-3">
            {freeTools.map((tool) => (
              <div
                key={tool}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink-muted"
              >
                <ListChecks className="size-4 text-brand" />
                {tool}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="flex flex-col gap-6 rounded-3xl bg-footer px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div className="flex items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-brand">
                <MailIcon />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  Nhận tài nguyên mới nhất qua email
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Template, checklist và bài viết thực chiến — gửi định kỳ, không spam.
                </p>
              </div>
            </div>
            <form
              className="flex w-full max-w-md flex-col gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email của bạn"
                  className="h-11 flex-1 rounded-xl border-0 px-4 text-sm text-ink outline-none"
                />
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark"
                >
                  Đăng ký ngay
                </button>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                {["Miễn phí", "Hủy bất kỳ lúc nào", "Chỉ gửi nội dung hữu ích"].map(
                  (item) => (
                    <span key={item} className="inline-flex items-center gap-1">
                      <Check className="size-3 text-success" /> {item}
                    </span>
                  ),
                )}
              </div>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-white" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
