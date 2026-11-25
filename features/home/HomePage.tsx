import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Lightbulb,
  Play,
  Target,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container, SectionHeading } from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import { siteConfig } from "@/lib/site";

const heroHighlights = [
  { icon: Lightbulb, title: "Tư duy sản phẩm", text: "Bắt đầu từ bài toán thật" },
  { icon: Code2, title: "Công nghệ hiện đại", text: "Stack sẵn sàng scale" },
  { icon: Target, title: "Tập trung kết quả", text: "Ship đúng mục tiêu" },
];

const outcomes = [
  {
    title: "Giảm thao tác thủ công",
    text: "Booking, lead, báo cáo và follow-up không còn nằm rải rác trên chat.",
  },
  {
    title: "Một nguồn dữ liệu chung",
    text: "Sales, vận hành và quản lý nhìn cùng trạng thái khách hàng và tiến độ.",
  },
  {
    title: "Đưa lên production có kiểm soát",
    text: "Scope, kiến trúc và kế hoạch release rõ trước khi viết code.",
  },
];

export type HomeData = {
  services: Array<{
    id: string;
    number: string;
    title: string;
    description: string;
    color: string;
    slug: string;
  }>;
  projects: Array<{
    slug: string;
    category: string;
    title: string;
    description: string;
    coverUrl: string;
    coverAlt: string;
  }>;
  solutions: Array<{
    slug: string;
    title: string;
    industry: string;
    excerpt: string;
  }>;
  process: Array<{ step: string; title: string; description: string }>;
};

export function HomePage({ data }: { data: HomeData }) {
  const trustItems = [
    { label: "Website & nền tảng web" },
    { label: "Ứng dụng di động" },
    { label: "Phần mềm vận hành" },
    { label: "AI & tự động hoá" },
    { label: "Triển khai production" },
    { label: "Bảo trì & cải tiến" },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-brand-soft/60 via-surface to-surface">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div className="animate-fade-up space-y-6">
            <span className="inline-flex rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Xưởng kỹ thuật sản phẩm
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Xây sản phẩm số giải quyết vấn đề kinh doanh thực tế
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Website, ứng dụng di động, hệ thống vận hành và giải pháp AI cho
              startup cùng doanh nghiệp đang tăng trưởng.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/lien-he" size="lg" iconRight={<ArrowRight className="size-4" />}>
                Trao đổi dự án
              </Button>
              <Button href="/du-an" variant="secondary" size="lg" iconLeft={<Play className="size-4" />}>
                Xem sản phẩm đã làm
              </Button>
            </div>
            <ul className="grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3">
              {trustItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-ink-muted">
                  <span className="size-1.5 shrink-0 rounded-full bg-brand" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 rounded-4xl bg-linear-to-br from-brand/20 via-sky-200/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 shadow-2xl shadow-brand/20">
              <Image
                src={siteConfig.personImage}
                alt="Trần Công Tiến, xưởng kỹ thuật sản phẩm tại Đà Nẵng"
                width={720}
                height={900}
                loading="eager"
                sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"
                className="aspect-4/5 w-full object-cover object-top"
              />
            </div>
            <div className="absolute -right-2 top-10 hidden w-48 space-y-3 sm:block lg:-right-4">
              {heroHighlights.map((item, i) => (
                <div
                  key={item.title}
                  className={`animate-float${i === 1 ? "-delay" : ""} flex items-center gap-3 rounded-2xl border border-border bg-white p-3 shadow-lg shadow-slate-200/60`}
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <item.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="text-xs text-ink-subtle">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-muted py-12 sm:py-16">
        <Container className="max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Không bắt đầu bằng framework. Bắt đầu bằng quy trình cần thay đổi.
          </h2>
          <p className="mt-5 text-base leading-8 text-ink-muted sm:text-lg">
            Mỗi dự án bắt đầu bằng việc làm rõ người dùng, quy trình hiện tại,
            điểm nghẽn và tiêu chí thành công. Công nghệ là công cụ phía sau;
            kết quả vận hành mới là thứ cần nhìn thấy sau khi ra mắt.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Bốn nhóm dịch vụ"
            action={
              <Link href="/dich-vu" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                Xem tất cả dịch vụ <ArrowRight className="size-4" />
              </Link>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.services.slice(0, 4).map((service) => (
              <article
                key={service.id}
                className="group flex flex-col rounded-2xl border border-border bg-surface p-5 transition hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
              >
                <div className={`mb-4 flex size-11 items-center justify-center rounded-xl text-sm font-bold ${service.color}`}>
                  {service.number}
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{service.description}</p>
                <Link href={`/dich-vu#${service.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Tìm hiểu thêm <ArrowRight className="size-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <Container>
          <SectionHeading title="Vấn đề → kết quả điển hình" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {outcomes.map((item) => (
              <article key={item.title} className="border-l-2 border-brand/40 pl-5">
                <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Case study nổi bật"
            action={
              <Link href="/du-an" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                Xem tất cả dự án <ArrowRight className="size-4" />
              </Link>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.projects.map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-2xl border border-border bg-surface transition hover:shadow-lg">
                <div className="relative aspect-8/5 overflow-hidden bg-surface-soft">
                  <Image
                    src={project.coverUrl}
                    alt={project.coverAlt}
                    width={1200}
                    height={800}
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.description}</p>
                  <Link href={`/du-an/${project.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Xem case study <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {data.solutions.length > 0 ? (
        <section className="bg-surface-muted py-16 sm:py-20">
          <Container>
            <SectionHeading
              title="Giải pháp theo ngành"
              action={
                <Link href="/solutions" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                  Xem tất cả <ArrowRight className="size-4" />
                </Link>
              }
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.solutions.map((solution) => (
                <article key={solution.slug} className="rounded-3xl border border-border bg-surface p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">{solution.industry}</p>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">{solution.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted line-clamp-3">{solution.excerpt}</p>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand"
                  >
                    Xem giải pháp <ArrowRight className="size-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Khám phá → Thiết kế → Phát triển → Ra mắt"
            action={
              <Link href="/quy-trinh" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                Tìm hiểu chi tiết <ArrowRight className="size-4" />
              </Link>
            }
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.process.slice(0, 4).map((step, index) => (
              <li key={step.step} className="relative text-center">
                {index < Math.min(data.process.length, 4) - 1 ? (
                  <span className="absolute left-[calc(50%+28px)] top-7 hidden h-px w-[calc(100%-56px)] border-t border-dashed border-border lg:block" aria-hidden />
                ) : null}
                <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-brand/20 bg-brand-soft text-brand">
                  <span className="text-sm font-bold">{step.step}</span>
                </div>
                <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm text-ink-subtle">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-border bg-ink py-16 text-white sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
              Năng lực kỹ thuật
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Hệ thống một khối, sẵn sàng chạy production
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              Next.js, PostgreSQL, Prisma, Cloudflare R2 và SMTP được nối thành
              một hệ thống vận hành trên VPS — không tách microservices khi chưa
              cần.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "App Router & Server Components",
              "CRM lead & gắn nguồn đối tác",
              "Đường media R2",
              "SMTP không chặn chuyển đổi",
            ].map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner title="Trao đổi dự án — biến ý tưởng thành sản phẩm chạy thật." />
    </>
  );
}
