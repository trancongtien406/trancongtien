import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container, SectionEyebrow } from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getPublishedProjects } from "@/lib/content";
import { landings, type Landing } from "./landings";

export function landingMetadata(path: string) {
  const l = landings.find((x) => x.path === path)!;
  return buildMetadata({ title: l.seoTitle, description: l.seoDescription, path: l.path });
}

export async function LandingPage({ path }: { path: string }) {
  const l: Landing = landings.find((x) => x.path === path)!;
  const matcher = new RegExp(`(^|[^\\p{L}])(${l.projectKeywords.join("|")})($|[^\\p{L}])`, "iu");
  const projects = (await getPublishedProjects())
    .filter((p) => matcher.test(`${p.category} ${p.platform} ${p.title} ${p.description}`))
    .slice(0, 3);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: l.h1,
          serviceType: l.keyword,
          description: l.seoDescription,
          url: `${siteConfig.url}${l.path}`,
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: { "@type": "Country", name: "Việt Nam" },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: l.eyebrow, path: l.path },
        ])}
      />
      <JsonLd data={faqJsonLd(l.faqs)} />
      <section className="border-b border-border bg-surface-muted">
        <Container className="py-16 lg:py-24">
          <SectionEyebrow>{l.eyebrow}</SectionEyebrow>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {l.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">{l.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/lien-he" size="lg" iconRight={<ArrowRight className="size-4" />}>
              Đặt lịch tư vấn miễn phí
            </Button>
            <Button href="/du-an" variant="secondary" size="lg">
              Xem sản phẩm đã làm
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink">Bạn nhận được gì</h2>
            <ul className="mt-6 space-y-3">
              {l.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-ink-muted">
                  <Check className="mt-1 size-4 shrink-0 text-brand" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-ink">Phù hợp với ai</h2>
            <ul className="mt-6 space-y-3">
              {l.audience.map((a) => (
                <li key={a} className="rounded-2xl bg-surface-muted p-4 text-ink-muted">{a}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-16">
        <Container>
          <h2 className="font-display text-3xl font-bold text-ink">Quy trình làm việc</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {l.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-xs font-bold text-brand">Bước {i + 1}</p>
                <h3 className="mt-2 font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {projects.length > 0 ? (
        <section className="py-16">
          <Container>
            <h2 className="font-display text-3xl font-bold text-ink">Dự án liên quan</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {projects.map((p) => (
                <article key={p.id} className="flex flex-col rounded-3xl border border-border bg-surface p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">{p.category}</p>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-muted">{p.description}</p>
                  <Link href={`/du-an/${p.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-brand">
                    Xem case study <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {l.pricing?.length ? (
        <section className="py-16">
          <Container>
            <h2 className="font-display text-3xl font-bold text-ink">Khoảng chi phí tham khảo</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {l.pricing.map((p) => (
                <div key={p.name} className="rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-ink">{p.name}</h3>
                  <p className="mt-3 font-display text-2xl font-bold text-brand">{p.range}</p>
                  <p className="mt-3 text-sm text-ink-muted">{p.note}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-16">
        <Container className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-ink">Câu hỏi thường gặp</h2>
          <dl className="mt-8 space-y-6">
            {l.faqs.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-ink">{f.question}</dt>
                <dd className="mt-2 text-ink-muted">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-sm text-ink-muted">
            Xem thêm:{" "}
            {l.related.map((r, i) => (
              <span key={r.href}>
                {i > 0 ? " · " : ""}
                <Link href={r.href} className="font-semibold text-brand">{r.label}</Link>
              </span>
            ))}
          </p>
        </Container>
      </section>
      <CtaBanner title={`Trao đổi về ${l.keyword}`} />
    </>
  );
}
