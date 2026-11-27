import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container, SectionEyebrow } from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import { getPublishedSolutions, parseJsonArray } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Giải pháp website & phần mềm theo ngành",
  description:
    "Bộ giải pháp website, CRM và phần mềm vận hành theo bài toán Spa, BĐS, Xây dựng, F&B, Giáo dục, Logistics và nhiều ngành khác.",
  path: "/solutions",
});

export default async function SolutionsPage() {
  const solutions = await getPublishedSolutions();

  return (
    <>
      <section className="border-b border-border bg-surface-muted">
        <Container className="py-16 sm:py-24">
          <SectionEyebrow>Giải pháp theo ngành</SectionEyebrow>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            Bắt đầu từ cách doanh nghiệp đang vận hành
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
            {solutions.length} giải pháp sẵn sàng để đối tác gửi khách — mỗi trang
            gắn workflow thật, không bắt đầu bằng danh sách công nghệ.
          </p>
          <div className="mt-8">
            <Button href="/lien-he" size="lg" iconRight={<ArrowRight className="size-4" />}>
              Trao đổi dự án
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution, index) => {
              const problems = parseJsonArray(solution.problems).slice(0, 3);
              const featured = index < 3;
              return (
                <article
                  key={solution.id}
                  className={`group flex flex-col rounded-3xl border border-border bg-surface p-7 transition hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 ${
                    featured ? "md:col-span-1" : ""
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">
                    {solution.industry}
                  </p>
                  <h2 className="mt-3 text-balance font-display text-2xl font-bold text-ink">
                    {solution.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-muted">
                    {solution.excerpt}
                  </p>
                  {problems.length > 0 ? (
                    <ul className="mt-5 space-y-2 border-t border-border pt-5">
                      {problems.map((problem) => (
                        <li
                          key={problem}
                          className="flex gap-2 text-sm text-ink-muted"
                        >
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                          {problem}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-brand transition group-hover:gap-3"
                  >
                    Xem giải pháp <ArrowRight className="size-4" />
                  </Link>
                </article>
              );
            })}
          </div>
          {solutions.length === 0 ? (
            <p className="text-center text-ink-muted">
              Các giải pháp đang được cập nhật.
            </p>
          ) : null}
        </Container>
      </section>

      <CtaBanner title="Chưa thấy ngành của bạn? Hãy trao đổi để dựng solution phù hợp." />
    </>
  );
}
