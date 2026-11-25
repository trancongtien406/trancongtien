import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/common/Button";
import { OpenEstimateButton } from "@/components/floating/OpenEstimateButton";
import { Container, SectionEyebrow } from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import {
  getProcessSteps,
  getProjectsBySolutionSlug,
  getSolutionBySlug,
  parseJsonArray,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { DemoCard } from "@/features/showroom/DemoCard";
import { DEMOS } from "@/features/showroom/registry";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  return solution
    ? buildMetadata({
        title: solution.title,
        description: solution.excerpt,
        path: `/solutions/${slug}`,
      })
    : {};
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [solution, process, relatedProjects] = await Promise.all([
    getSolutionBySlug(slug),
    getProcessSteps(),
    getProjectsBySolutionSlug(slug, 3),
  ]);
  if (!solution) notFound();

  const problems = parseJsonArray(solution.problems);
  const capabilities = parseJsonArray(solution.capabilities);
  const packageItems = parseJsonArray(solution.packageItems);
  const demos = DEMOS.filter((d) => d.solutionSlug === solution.slug);
  const contactHref = `/lien-he?industry=${encodeURIComponent(solution.industry)}&solution=${solution.slug}`;

  return (
    <>
      <section className="border-b border-border bg-surface-muted">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
          <div>
            <SectionEyebrow>{solution.industry}</SectionEyebrow>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">
              {solution.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
              {solution.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={contactHref} size="lg" iconRight={<ArrowRight className="size-4" />}>
                Trao đổi dự án
              </Button>
              <OpenEstimateButton productKey="WEBSITE">Ước tính nhanh</OpenEstimateButton>
              <Button href="/du-an" variant="secondary" size="lg">
                Xem sản phẩm đã làm
              </Button>
            </div>
          </div>
          <aside className="rounded-3xl bg-ink p-7 text-white sm:p-9">
            <p className="text-sm font-semibold text-white/60">Vấn đề kinh doanh</p>
            <ul className="mt-5 space-y-4">
              {problems.map((problem) => (
                <li key={problem} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  {problem}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Giải pháp đề xuất</SectionEyebrow>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold text-ink">
              Một nền tảng bám sát quy trình thực tế
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-muted">{solution.excerpt}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {capabilities.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-2xl bg-surface-muted p-4">
                  <Check className="size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-surface-muted p-7 sm:p-9">
            <p className="text-sm font-semibold text-brand">Xem trước sản phẩm</p>
            <h2 className="mt-3 text-2xl font-bold text-ink">
              Landing + admin + quy trình chăm sóc
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-muted">
              Các màn hình chính xoay quanh tiếp cận khách, thu lead, vận hành
              nội bộ và báo cáo. Phạm vi chi tiết được chốt sau bước khám phá.
            </p>
            {demos.length > 0 ? (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {demos.map((demo) => (
                  <li key={demo.slug}>
                    <DemoCard demo={demo} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-ink-muted">
                Demo cho ngành này đang được chuẩn bị. Xem{" "}
                <Link href="/demos" className="font-semibold text-brand">các demo hiện có</Link>.
              </p>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-border bg-surface p-7 sm:p-9">
            <p className="text-sm font-semibold text-brand">Gói khởi đầu đề xuất</p>
            <h2 className="mt-3 text-2xl font-bold text-ink">
              Đủ để đưa quy trình cốt lõi lên production
            </h2>
            <ul className="mt-6 space-y-3">
              {packageItems.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-border pb-3 last:border-0">
                  <Check className="size-4 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-ink-muted">
              Phạm vi, timeline và chi phí được xác định sau khám phá; không ước
              lượng kỹ thuật chỉ từ trang landing.
            </p>
          </div>
          <div>
            <SectionEyebrow>Quy trình</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink">
              Khám phá → Thiết kế → Phát triển → Ra mắt
            </h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {process.slice(0, 4).map((step) => (
                <li key={step.id} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-xs font-bold text-brand">{step.step}</p>
                  <h3 className="mt-2 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{step.tasks}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionEyebrow>Case study liên quan</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink">
              Dự án minh hoạ cho ngành {solution.industry}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedProjects.map((project) => (
                <article
                  key={project.id}
                  className="flex flex-col rounded-3xl border border-border bg-surface p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">
                    {project.category}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-muted">
                    {project.description}
                  </p>
                  <Link
                    href={`/du-an/${project.slug}`}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-brand"
                  >
                    Xem case study <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        title={`Trao đổi dự án ngành ${solution.industry}`}
        href={contactHref}
      />
    </>
  );
}
