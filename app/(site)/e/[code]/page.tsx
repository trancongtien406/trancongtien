import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { OpenEstimateButton } from "@/components/floating/OpenEstimateButton";
import { Container, SectionEyebrow } from "@/components/common/Container";
import { EstimateResultView } from "@/features/estimator/EstimateResultView";
import { mapSessionToPublicView } from "@/features/estimator/publicResult";
import { getSessionByShareCode } from "@/lib/estimator/session";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return buildMetadata({
    title: `Estimate chia sẻ ${code.toUpperCase()}`,
    description: "Bản ước tính dự án được chia sẻ.",
    path: `/e/${code}`,
    noindex: true,
  });
}

export default async function SharedEstimatePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const session = await getSessionByShareCode(code);
  if (!session || !session.versions[0]) notFound();

  const result = await mapSessionToPublicView({
    ...session,
    lead: null,
  });
  if (!result) notFound();

  return (
    <section className="border-b border-border bg-surface-muted py-14 sm:py-20">
      <Container className="max-w-5xl">
        <SectionEyebrow>Bản chia sẻ · {session.shareCode}</SectionEyebrow>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">
          Ước tính dự án
        </h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Đây là bản estimate công khai theo mã chia sẻ. Chi tiết nội bộ và giá
          chốt không được hiển thị.
        </p>

        <div className="mt-10">
          <EstimateResultView result={result} showContactCta={false} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/lien-he" size="lg" iconRight={<ArrowRight className="size-4" />}>
            Trao đổi dự án
          </Button>
          <OpenEstimateButton>Tạo ước tính mới</OpenEstimateButton>
        </div>
      </Container>
    </section>
  );
}
