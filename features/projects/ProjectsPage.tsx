"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Container,
  SectionEyebrow,
} from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import { TechBadge } from "@/components/common/TechBadge";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ProjectListItem = {
  slug: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  stack: string[];
  role: string;
  timeframe: string;
  platform: string;
  tone: string;
  coverUrl: string;
  coverAlt: string;
};

const filters = [
  "Tất cả dự án",
  "Marketplace",
  "Booking",
  "CRM / SaaS",
  "Mobile App",
  "AI Agent",
  "Web App",
] as const;

const stats = [
  { value: siteConfig.stats.projects, label: "Dự án hoàn thành" },
  { value: siteConfig.stats.domains, label: "Lĩnh vực" },
  { value: `${siteConfig.stats.years} năm`, label: "Kinh nghiệm" },
  { value: siteConfig.stats.satisfaction, label: "Cam kết chất lượng" },
];

export function ProjectsPage({ projects }: { projects: ProjectListItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tất cả dự án");

  const filtered = useMemo(() => {
    if (filter === "Tất cả dự án") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-soft/40 to-surface">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="space-y-6">
            <SectionEyebrow>Dự án</SectionEyebrow>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Những sản phẩm tôi đã xây dựng.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Đồng hành cùng startup và doanh nghiệp để biến ý tưởng thành sản
              phẩm số thực tế, mang lại giá trị và tạo ra tác động.
            </p>
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-bold text-brand sm:text-3xl">
                    {stat.value}
                  </dd>
                  <p className="mt-1 text-xs text-ink-subtle sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <Image
              src="/images/illustrations/projects-hero-devices.png"
              alt="Tổng hợp mockup thiết bị của các sản phẩm đã xây dựng"
              width={900}
              height={600}
              className="w-full rounded-3xl object-cover shadow-xl"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Lọc dự án theo loại"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  filter === item
                    ? "bg-brand text-white"
                    : "bg-surface-soft text-ink-muted hover:bg-brand-soft hover:text-brand",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 space-y-6">
            {filtered.map((project) => (
              <article
                key={project.slug}
                id={project.slug}
                className="grid overflow-hidden rounded-3xl border border-border bg-surface shadow-sm lg:grid-cols-[280px_1fr_220px]"
              >
                <div
                  className={cn(
                    "relative min-h-50 p-6 lg:min-h-full",
                    project.tone,
                  )}
                >
                  <Image
                    src={project.coverUrl}
                    alt={project.coverAlt}
                    fill
                    className="object-cover opacity-90"
                    sizes="280px"
                  />
                </div>
                <div className="space-y-4 p-6 lg:p-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">
                    {project.category}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {project.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {project.description}
                  </p>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-ink-muted"
                      >
                        <span className="size-1.5 rounded-full bg-brand" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.stack.map((tech) => (
                      <TechBadge key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between border-t border-border p-6 lg:border-l lg:border-t-0 lg:p-8">
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-ink-subtle">Vai trò</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {project.role}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-subtle">Thời gian</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {project.timeframe}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-subtle">Nền tảng</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {project.platform}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={`/du-an/${project.slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand"
                  >
                    Xem chi tiết dự án <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        variant="blue"
        title="Bạn có ý tưởng dự án tiếp theo?"
        description="Cùng làm rõ phạm vi, timeline và cách tiếp cận phù hợp trong buổi tư vấn miễn phí."
      />
    </>
  );
}
