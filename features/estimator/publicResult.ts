import { prisma } from "@/lib/db";
import type { EstimateResultPublic } from "@/lib/estimator/types";

type SessionLike = {
  publicId: string;
  shareCode: string;
  aiSummary: string | null;
  technicalReviewRequired: boolean;
  scoreBand: string | null;
  templateKey: string | null;
  product: { name: string; id: string } | null;
  versions: Array<{
    version: number;
    selectedFeatures: string;
    deferredFeatures: string;
    minAmount: unknown;
    maxAmount: unknown;
    currency: string;
    timelineWeeksMin: number;
    timelineWeeksMax: number;
    roadmap: string;
    architecture: string;
    recommendations: string;
    riskLevel: string;
  }>;
  lead?: { id: string; leadNumber: string } | null;
};

export type PublicEstimateView = EstimateResultPublic & {
  publicId: string;
  shareCode: string;
  hasLead: boolean;
};

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function mapSessionToPublicView(
  session: SessionLike | null,
): Promise<PublicEstimateView | null> {
  if (!session) return null;
  const latest = session.versions[0];
  if (!latest) return null;

  const selectedKeys = parseJson<string[]>(latest.selectedFeatures, []);
  const deferredKeys = parseJson<string[]>(latest.deferredFeatures, []);
  const featureRows =
    session.product?.id
      ? await prisma.estimatorFeature.findMany({
          where: { productId: session.product.id, key: { in: [...selectedKeys, ...deferredKeys] } },
          select: { key: true, name: true, priority: true },
        })
      : [];
  const byKey = new Map(featureRows.map((f) => [f.key, f]));

  const architecture = parseJson<{ key?: string; name?: string; stack?: string[] }>(
    latest.architecture,
    {},
  );

  return {
    publicId: session.publicId,
    shareCode: session.shareCode,
    hasLead: Boolean(session.lead),
    product: session.product?.name || "Sản phẩm",
    templateKey: session.templateKey,
    businessModel: null,
    features: selectedKeys.map((key) => ({
      key,
      name: byKey.get(key)?.name || key,
      priority: byKey.get(key)?.priority || "SHOULD_HAVE",
    })),
    deferredFeatures: deferredKeys.map((key) => ({
      key,
      name: byKey.get(key)?.name || key,
    })),
    range: {
      min: Number(latest.minAmount),
      max: Number(latest.maxAmount),
      currency: latest.currency || "VND",
    },
    timelineWeeks: {
      min: latest.timelineWeeksMin,
      max: latest.timelineWeeksMax,
    },
    roadmap: parseJson(latest.roadmap, []),
    architecture: {
      key: architecture.key || "custom",
      name: architecture.name || "Kiến trúc đề xuất",
      stack: Array.isArray(architecture.stack) ? architecture.stack : [],
    },
    recommendations: parseJson(latest.recommendations, []),
    riskLevel: latest.riskLevel,
    technicalReviewRequired: session.technicalReviewRequired,
    scoreBand: session.scoreBand,
    version: latest.version,
    aiSummary: session.aiSummary,
  };
}
