import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import { TechBadge } from "@/components/common/TechBadge";
import { getProjectBySlug, parseJsonArray } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/du-an/${project.slug}`,
    image: project.coverUrl || "/images/illustrations/projects-hero-devices.png",
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const features = parseJsonArray(project.features);
  const stack = parseJsonArray(project.stack);
  const cover =
    project.coverUrl || "/images/illustrations/projects-hero-devices.png";
  const coverAlt = project.coverAlt || `Mockup chi tiết dự án ${project.title}`;
  const projectUrl = `${siteConfig.url}/du-an/${project.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": `${projectUrl}/#creative-work`,
          name: project.title,
          description: project.description,
          url: projectUrl,
          inLanguage: "vi-VN",
          dateCreated: project.createdAt.toISOString(),
          dateModified: project.updatedAt.toISOString(),
          image: new URL(cover, siteConfig.url).toString(),
          author: {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
            name: siteConfig.fullName,
            url: `${siteConfig.url}/ve-toi`,
          },
          mainEntityOfPage: projectUrl,
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Dự án", path: "/du-an" },
          { name: project.title, path: `/du-an/${project.slug}` },
        ])}
      />
      <article>
        <Container className="py-12 sm:py-16">
          <Link
            href="/du-an"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand"
          >
            <ArrowLeft className="size-4" /> Tất cả dự án
          </Link>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                {project.category}
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold text-ink">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-ink-muted">{project.description}</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-ink-subtle">Vai trò</dt>
                  <dd className="font-semibold">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-subtle">Thời gian</dt>
                  <dd className="font-semibold">{project.timeframe}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-subtle">Nền tảng</dt>
                  <dd className="font-semibold">{project.platform}</dd>
                </div>
              </dl>
              <h2 className="mt-8 font-display text-xl font-bold">Tính năng</h2>
              <ul className="mt-3 space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-ink-muted">
                    <span className="mt-1.5 size-1.5 rounded-full bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>
              <h2 className="mt-8 font-display text-xl font-bold">Công nghệ</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {stack.map((t) => (
                  <TechBadge key={t} name={t} size="sm" />
                ))}
              </div>
              <Button
                href="/lien-he"
                className="mt-8"
                iconRight={<ArrowRight className="size-4" />}
              >
                Trao đổi về dự án tương tự
              </Button>
            </div>
            <div className={`overflow-hidden rounded-3xl ${project.tone}`}>
              <Image
                src={cover}
                alt={coverAlt}
                width={900}
                height={700}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="prose-article mt-12 max-w-3xl space-y-4 text-ink-muted">
            <h2 className="font-display text-2xl font-bold text-ink">
              Case study
            </h2>
            <div
              className="admin-prose space-y-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink [&_img]:my-4 [&_img]:rounded-2xl [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        </Container>
        <CtaBanner title="Bạn muốn xây sản phẩm tương tự?" />
      </article>
    </>
  );
}
