import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { OpenEstimateButton } from "@/components/floating/OpenEstimateButton";
import { Container, SectionEyebrow } from "@/components/common/Container";
import { EstimateResultView } from "@/features/estimator/EstimateResultView";
import { mapSessionToPublicView } from "@/features/estimator/publicResult";
import { getSessionByPublicId } from "@/lib/estimator/session";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return buildMetadata({
    title: `Estimate ${id}`,
    description: "Kết quả ước tính phạm vi và ngân sách dự án.",
    path: `/estimate/${id}`,
    noindex: true,
  });
}

export default async function EstimateResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSessionByPublicId(id);
  if (!session) notFound();

  const result = await mapSessionToPublicView(session);

  return (
    <section className="border-b border-border bg-surface-muted py-14 sm:py-20">
      <Container className="max-w-5xl">
        <SectionEyebrow>Estimate · {session.publicId}</SectionEyebrow>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">
          Kết quả ước tính
        </h1>

        {!result ? (
          <div className="mt-8 rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <p className="text-ink-muted">
              Phiên này chưa có bản estimate. Tiếp tục trả lời câu hỏi để tính
              khoảng giá và roadmap.
            </p>
            <div className="mt-6">
              <OpenEstimateButton variant="primary">Tiếp tục ước tính</OpenEstimateButton>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            <EstimateResultView result={result} showContactCta />

            {!result.hasLead ? (
              <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-ink">
                  Chưa có thông tin liên hệ
                </h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Quay lại công cụ ước tính để gửi liên hệ, hoặc trao đổi trực tiếp.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <OpenEstimateButton>Mở lại trợ lý ước tính</OpenEstimateButton>
                  <Button href="/lien-he" iconRight={<ArrowRight className="size-4" />}>
                    Liên hệ tư vấn
                  </Button>
                </div>
                <p className="mt-4 text-sm text-ink-muted">
                  Hoặc{" "}
                  <Link href="/lien-he" className="font-semibold text-brand hover:underline">
                    mở form liên hệ đầy đủ
                  </Link>
                  .
                </p>
              </div>
            ) : null}
          </div>
        )}
      </Container>
    </section>
  );
}
