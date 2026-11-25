import {
  EstimatorManager,
  type EstimatorProductRow,
  type EstimatorSessionRow,
  type PricingVersionRow,
} from "@/components/admin/EstimatorManager";
import { getLlmStatus } from "@/lib/ai/llm-gateway";
import { prisma } from "@/lib/db";
import { formatVndRange } from "@/lib/estimator/pricing";

export const dynamic = "force-dynamic";

export default async function AdminEstimatorPage() {
  const [
    products,
    pricingVersions,
    questionCount,
    sessionGroups,
    recentSessions,
    llmStatus,
  ] = await Promise.all([
    prisma.estimatorProduct.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { features: true, questions: true, sessions: true } },
      },
    }),
    prisma.pricingVersion.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.estimatorQuestion.count(),
    prisma.estimateSession.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
    prisma.estimateSession.findMany({
      orderBy: { updatedAt: "desc" },
      take: 30,
      include: {
        product: { select: { name: true } },
        lead: { select: { id: true, leadNumber: true } },
        versions: {
          orderBy: { version: "desc" },
          take: 1,
          select: { minAmount: true, maxAmount: true },
        },
      },
    }),
    getLlmStatus(),
  ]);

  const productRows: EstimatorProductRow[] = products.map((p) => ({
    id: p.id,
    key: p.key,
    name: p.name,
    description: p.description,
    baseUnits: p.baseUnits,
    active: p.active,
    sortOrder: p.sortOrder,
    featureCount: p._count.features,
    questionCount: p._count.questions,
    sessionCount: p._count.sessions,
  }));

  const pricingRows: PricingVersionRow[] = pricingVersions.map((v) => ({
    id: v.id,
    key: v.key,
    name: v.name,
    active: v.active,
    unitValueVnd: v.unitValueVnd,
    minimumProjectVnd: v.minimumProjectVnd,
    notes: v.notes,
    updatedAt: v.updatedAt.toLocaleString("vi-VN"),
  }));

  const sessionCounts = Object.fromEntries(
    sessionGroups.map((g) => [g.status, g._count._all]),
  ) as Record<string, number>;

  const sessionRows: EstimatorSessionRow[] = recentSessions.map((s) => {
    const latest = s.versions[0];
    return {
      id: s.id,
      publicId: s.publicId,
      status: s.status,
      contactEmail: s.contactEmail || "",
      updatedAt: s.updatedAt.toLocaleString("vi-VN"),
      productName: s.product?.name || "",
      leadId: s.lead?.id || "",
      leadNumber: s.lead?.leadNumber || "",
      rangeLabel: latest
        ? formatVndRange(Number(latest.minAmount), Number(latest.maxAmount))
        : "",
    };
  });

  return (
    <EstimatorManager
      products={productRows}
      pricingVersions={pricingRows}
      questionCount={questionCount}
      sessionCounts={sessionCounts}
      recentSessions={sessionRows}
      llmStatus={llmStatus}
    />
  );
}
