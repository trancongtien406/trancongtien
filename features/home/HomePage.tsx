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
  process: Array<{ step: string; title: string; description: string }>;
  testimonials: Array<{ quote: string; name: string; role: string }>;
};

export function HomePage({ data }: { data: HomeData }) {
  const trustItems = [
    { label: `${siteConfig.stats.projects} Dự án hoàn thành` },
    { label: `${siteConfig.stats.domains} Lĩnh vực đã triển khai` },
    { label: "Toàn diện Web, Mobile, AI & Cloud" },
    { label: "Đồng hành hậu mãi & phát triển bền vững" },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-brand-soft/60 via-surface to-surface">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div className="animate-fade-up space-y-6">
            <span className="inline-flex rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Studio kỹ thuật sản phẩm
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              <span className="text-brand">{siteConfig.fullName}</span>
              <span className="mt-2 block text-2xl sm:text-3xl lg:text-4xl">
                Full-stack Developer &amp; AI Agent Builder
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Biến ý tưởng thành sản phẩm thực tế — đồng hành cùng startup và
              doanh nghiệp từ khám phá, thiết kế đến phát triển và tối ưu sản phẩm số.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/lien-he" size="lg" iconRight={<ArrowRight className="size-4" />}>
                Đặt lịch tư vấn miễn phí
              </Button>
              <Button href="/du-an" variant="secondary" size="lg" iconLeft={<Play className="size-4" />}>
                Xem dự án của tôi
              </Button>
            </div>
            <ul className="grid gap-3 pt-2 sm:grid-cols-2">
              {trustItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-ink-muted">
                  <span className="size-1.5 shrink-0 rounded-full bg-brand" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 rounded-4xl bg-linear-to-br from-brand/20 via-violet-200/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 shadow-2xl shadow-brand/20">
              <Image
                src={siteConfig.personImage}
                alt="Trần Công Tiến, Full-stack Developer và AI Agent Builder tại Đà Nẵng"
                width={720}
                height={900}
                loading="eager"
                fetchPriority="high"
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

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Giải pháp phát triển sản phẩm toàn diện"
            action={
              <Link href="/dich-vu" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                Xem tất cả dịch vụ <ArrowRight className="size-4" />
              </Link>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {data.services.map((service) => (
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
          <SectionHeading
            title="Những sản phẩm tôi đã xây dựng"
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
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">{project.category}</p>
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

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Quy trình rõ ràng – kết quả vượt mong đợi"
            action={
              <Link href="/quy-trinh" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                Tìm hiểu chi tiết <ArrowRight className="size-4" />
              </Link>
            }
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {data.process.map((step, index) => (
              <li key={step.step} className="relative text-center">
                {index < data.process.length - 1 ? (
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

      <section className="bg-surface-muted py-16 sm:py-20">
        <Container>
          <SectionHeading title="Sự tin tưởng của khách hàng là động lực của tôi" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {data.testimonials.map((item) => (
              <blockquote key={item.name} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <p className="text-4xl font-bold leading-none text-brand/30">&ldquo;</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.quote}</p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-semibold text-ink">{item.name}</cite>
                    <p className="text-xs text-ink-subtle">{item.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner title="Bạn có ý tưởng gì? Hãy cùng nhau biến nó thành sản phẩm tuyệt vời." />
    </>
  );
}
