import { pickArchitecture } from "@/lib/estimator/architecture";
import {
  resolveFeatureDependencies,
  type FeatureNode,
} from "@/lib/estimator/dependencies";
import {
  buildConsultantMessage,
  extractedFeatureKeys,
  filterFeaturesForTemplate,
  inferWebsiteSubtype,
} from "@/lib/estimator/intelligence";
import { optimizeForBudget } from "@/lib/estimator/optimizer";
import {
  calculatePricing,
  pricingConfigFromVersion,
} from "@/lib/estimator/pricing";
import { buildRecommendations } from "@/lib/estimator/recommendation";
import { collectVisibleQuestionKeys } from "@/lib/estimator/rules";
import { scoreLead } from "@/lib/estimator/scoring";
import { buildRoadmap, estimateTimelineWeeks } from "@/lib/estimator/timeline";
import type {
  AnswersMap,
  EstimateResultInternal,
  EstimateResultPublic,
} from "@/lib/estimator/types";
import { SECTIONS } from "@/lib/estimator/types";
import { nextLeadNumber, ownershipExpiry } from "@/lib/leads/helpers";
import { resolveApprovedPartner } from "@/lib/partners";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/db";

export const EST_COOKIE = "tct_est";

export function nextPublicId() {
  return `EST-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export function nextShareCode() {
  return randomBytes(4).toString("hex").toUpperCase();
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function createSessionToken() {
  return randomBytes(24).toString("hex");
}

function parseAnswers(raw: string): AnswersMap {
  try {
    return JSON.parse(raw) as AnswersMap;
  } catch {
    return {};
  }
}

function parseStringArray(raw: string): string[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function isQuestionAnswered(
  type: string,
  key: string,
  answers: AnswersMap,
) {
  if (type === "FEATURE_SELECTOR") {
    return answers.feature_selector_confirmed === true;
  }
  const val = answers[key];
  return val != null && val !== "" && !(Array.isArray(val) && val.length === 0);
}

function formatHistoryLabel(
  type: string,
  value: AnswersMap[string],
  options: Array<{ value: string; label: string }>,
  featureNames: Map<string, string>,
  selectedFeatures: string[],
) {
  if (type === "BOOLEAN") {
    return value === true || value === "true" ? "Có" : "Không";
  }
  if (type === "BUDGET" && typeof value === "number") {
    return `${value.toLocaleString("vi-VN")} ₫`;
  }
  if (type === "FEATURE_SELECTOR") {
    const names = selectedFeatures
      .map((key) => featureNames.get(key) || key)
      .slice(0, 8);
    const more = selectedFeatures.length > 8 ? ` (+${selectedFeatures.length - 8})` : "";
    return `Đã chọn ${selectedFeatures.length} tính năng: ${names.join(", ")}${more}`;
  }
  if (Array.isArray(value)) {
    return value
      .map((v) => options.find((o) => o.value === v)?.label || String(v))
      .join(", ");
  }
  if (typeof value === "string") {
    return options.find((o) => o.value === value)?.label || value;
  }
  return String(value ?? "");
}

async function activePricingVersion() {
  const active = await prisma.pricingVersion.findFirst({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  if (active) return active;
  return prisma.pricingVersion.findFirst({ orderBy: { createdAt: "desc" } });
}

export async function createEstimateSession(input: {
  productKey?: string;
  landingPath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referralCode?: string;
}) {
  const token = createSessionToken();
  const pricing = await activePricingVersion();
  let productId: string | null = null;
  if (input.productKey) {
    const product = await prisma.estimatorProduct.findUnique({
      where: { key: input.productKey },
    });
    productId = product?.id || null;
  }

  const session = await prisma.estimateSession.create({
    data: {
      publicId: nextPublicId(),
      shareCode: nextShareCode(),
      tokenHash: hashToken(token),
      productId,
      pricingVersionId: pricing?.id,
      landingPath: input.landingPath || null,
      utmSource: input.utmSource || null,
      utmMedium: input.utmMedium || null,
      utmCampaign: input.utmCampaign || null,
      referralCode: input.referralCode || null,
      answers: input.productKey
        ? JSON.stringify({ product_type: input.productKey })
        : "{}",
    },
  });

  return { session, token };
}

export async function getSessionByPublicId(publicId: string, token?: string) {
  const session = await prisma.estimateSession.findUnique({
    where: { publicId },
    include: {
      product: true,
      pricingVersion: true,
      versions: { orderBy: { version: "desc" }, take: 1 },
      lead: { select: { id: true, leadNumber: true } },
    },
  });
  if (!session) return null;
  if (token && session.tokenHash !== hashToken(token)) return null;
  return session;
}

export async function getSessionByShareCode(shareCode: string) {
  return prisma.estimateSession.findUnique({
    where: { shareCode: shareCode.toUpperCase() },
    include: {
      product: true,
      versions: { orderBy: { version: "desc" }, take: 1 },
    },
  });
}

export async function saveAnswer(
  publicId: string,
  questionKey: string,
  value: AnswersMap[string],
  token?: string,
) {
  const session = await getSessionByPublicId(publicId, token);
  if (!session) throw new Error("NOT_FOUND");

  const answers = parseAnswers(session.answers);
  answers[questionKey] = value;
  answers._last_question = questionKey;

  let productId = session.productId;
  let templateKey = session.templateKey;

  if (questionKey === "product_type" && typeof value === "string") {
    const product = await prisma.estimatorProduct.findUnique({
      where: { key: value },
    });
    productId = product?.id || productId;
  }
  if (questionKey === "website_subtype" || questionKey === "template_key") {
    templateKey = String(value);
  }
  if (questionKey === "idea_summary" && typeof value === "string") {
    const suggested = inferWebsiteSubtype(value);
    if (suggested) {
      answers._suggested_subtype = suggested;
    }
  }

  return prisma.estimateSession.update({
    where: { id: session.id },
    data: {
      answers: JSON.stringify(answers),
      productId,
      templateKey,
    },
  });
}

export async function saveFeatures(
  publicId: string,
  featureKeys: string[],
  token?: string,
  options?: { confirm?: boolean },
) {
  const session = await getSessionByPublicId(publicId, token);
  if (!session) throw new Error("NOT_FOUND");
  if (!session.productId) throw new Error("NO_PRODUCT");

  const features = await prisma.estimatorFeature.findMany({
    where: { productId: session.productId, active: true },
    include: {
      dependenciesFrom: { include: { toFeature: true } },
    },
  });

  const nodes: FeatureNode[] = features.map((f) => ({
    id: f.id,
    key: f.key,
    name: f.name,
    priority: f.priority,
    complexity: f.complexity,
    baseUnits: f.baseUnits,
    technicalRisk: f.technicalRisk,
    optional: f.optional,
  }));

  const edges = features.flatMap((f) =>
    f.dependenciesFrom.map((d) => ({
      fromKey: f.key,
      toKey: d.toFeature.key,
      type: d.type,
      message: d.message,
    })),
  );

  const resolved = resolveFeatureDependencies(featureKeys, nodes, edges);

  const answers = parseAnswers(session.answers);
  answers.feature_selector = resolved.selected;
  if (options?.confirm) {
    answers.feature_selector_confirmed = true;
  }

  await prisma.estimateSession.update({
    where: { id: session.id },
    data: {
      selectedFeatures: JSON.stringify(resolved.selected),
      answers: JSON.stringify(answers),
    },
  });

  return resolved;
}

export async function getNextStep(publicId: string, token?: string) {
  const session = await getSessionByPublicId(publicId, token);
  if (!session) throw new Error("NOT_FOUND");

  const answers = parseAnswers(session.answers);
  const questions = await prisma.estimatorQuestion.findMany({
    where: {
      active: true,
      OR: [{ productId: null }, ...(session.productId ? [{ productId: session.productId }] : [])],
    },
    include: { options: { orderBy: { sortOrder: "asc" } }, rules: true },
    orderBy: [{ sortOrder: "asc" }],
  });

  const productKeys = questions
    .filter((q) => !q.productId || q.productId === session.productId)
    .map((q) => q.key);

  const rules = questions.flatMap((q) =>
    q.rules.map((r) => ({
      questionKey: q.key,
      definition: r.definition,
      active: r.active,
    })),
  );

  const visible = collectVisibleQuestionKeys(
    questions.map((q) => q.key),
    rules,
    answers,
    productKeys,
  );

  const unanswered = questions
    .filter((q) => visible.has(q.key))
    .filter((q) => {
      if (q.type === "FEATURE_SELECTOR") {
        // Always require explicit confirmation — even if extract đã prefill features
        return answers.feature_selector_confirmed !== true;
      }
      const val = answers[q.key];
      return val == null || val === "" || (Array.isArray(val) && val.length === 0);
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const totalVisible = questions.filter((q) => visible.has(q.key)).length;
  const answeredCount = totalVisible - unanswered.length;
  const progress = totalVisible
    ? Math.round((answeredCount / totalVisible) * 100)
    : 0;

  const features =
    session.productId
      ? await prisma.estimatorFeature.findMany({
          where: { productId: session.productId, active: true },
          orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
        })
      : [];

  const next = unanswered[0] || null;
  const sectionKeys = [...new Set(questions.filter((q) => visible.has(q.key)).map((q) => q.section))];
  const completedSections = sectionKeys.filter((section) =>
    questions
      .filter((q) => q.section === section && visible.has(q.key))
      .every((q) => {
        if (q.type === "FEATURE_SELECTOR") {
          return answers.feature_selector_confirmed === true;
        }
        const val = answers[q.key];
        return val != null && val !== "" && !(Array.isArray(val) && val.length === 0);
      }),
  );

  const extracted = extractedFeatureKeys(answers);
  const templateKey = session.templateKey || String(answers.website_subtype || "");
  const filteredFeatures = filterFeaturesForTemplate(
    templateKey,
    features,
    extracted,
  );

  const lastKey = String(answers._last_question || "");
  const botMessage = buildConsultantMessage({
    lastQuestionKey: lastKey || null,
    answers,
    extractedFeatures: extracted,
    suggestedSubtype:
      typeof answers._suggested_subtype === "string"
        ? answers._suggested_subtype
        : null,
  });

  return {
    session: {
      publicId: session.publicId,
      shareCode: session.shareCode,
      status: session.status,
      productKey: session.product?.key || null,
      templateKey: session.templateKey,
      answers,
      selectedFeatures: parseStringArray(session.selectedFeatures),
      currentVersion: session.currentVersion,
      hasLead: Boolean(session.lead),
    },
    progress: {
      percent: progress,
      answered: answeredCount,
      total: totalVisible,
      sections: SECTIONS.map((s) => ({
        ...s,
        done: completedSections.includes(s.key),
      })),
      completionRatio: totalVisible ? answeredCount / totalVisible : 0,
    },
    nextQuestion: next
      ? {
          key: next.key,
          type: next.type,
          section: next.section,
          title:
            next.type === "FEATURE_SELECTOR" && extracted.length
              ? "Xác nhận tính năng (đã gợi ý từ mô tả của bạn)"
              : next.title,
          description:
            next.type === "FEATURE_SELECTOR" && extracted.length
              ? "Các mục được chọn sẵn đến từ mô tả ý tưởng. Hãy bỏ/bật lại trước khi tiếp tục."
              : next.description,
          required: next.required,
          config: parseAnswers(next.config || "{}"),
          options: next.options.map((o) => ({
            value: o.value,
            label: o.label,
            meta: parseAnswers(o.meta || "{}"),
          })),
        }
      : null,
    features: filteredFeatures.map((f) => ({
      key: f.key,
      name: f.name,
      description: f.description,
      category: f.category,
      complexity: f.complexity,
      priority: f.priority,
      optional: f.optional,
      baseUnits: f.baseUnits,
    })),
    history: questions
      .filter((q) => visible.has(q.key) && isQuestionAnswered(q.type, q.key, answers))
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((q) => ({
        key: q.key,
        type: q.type,
        section: q.section,
        title: q.title,
        description: q.description,
        label: formatHistoryLabel(
          q.type,
          answers[q.key],
          q.options,
          new Map(features.map((f) => [f.key, f.name])),
          parseStringArray(session.selectedFeatures),
        ),
      })),
    botMessage,
    done: !next,
  };
}

export async function getLatestPublicResult(
  publicId: string,
  token?: string,
): Promise<EstimateResultPublic | null> {
  const session = await getSessionByPublicId(publicId, token);
  if (!session) return null;
  const latest = session.versions[0];
  if (!latest) return null;

  const featureRows = session.productId
    ? await prisma.estimatorFeature.findMany({
        where: { productId: session.productId },
        select: { key: true, name: true, priority: true },
      })
    : [];
  const names = new Map(featureRows.map((f) => [f.key, f]));
  const selected = parseStringArray(latest.selectedFeatures);
  const deferred = parseStringArray(latest.deferredFeatures);

  const parseJson = <T,>(raw: string, fallback: T): T => {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  };

  return {
    product: session.product?.name || "Sản phẩm",
    templateKey: session.templateKey,
    businessModel: null,
    features: selected.map((key) => ({
      key,
      name: names.get(key)?.name || key,
      priority: names.get(key)?.priority || "SHOULD_HAVE",
    })),
    deferredFeatures: deferred.map((key) => ({
      key,
      name: names.get(key)?.name || key,
    })),
    range: {
      min: Number(latest.minAmount),
      max: Number(latest.maxAmount),
      currency: latest.currency,
    },
    timelineWeeks: {
      min: latest.timelineWeeksMin,
      max: latest.timelineWeeksMax,
    },
    roadmap: parseJson<EstimateResultPublic["roadmap"]>(latest.roadmap || "[]", []),
    architecture: parseJson<EstimateResultPublic["architecture"]>(latest.architecture || "{}", {
      key: "",
      name: "",
      stack: [],
    }),
    recommendations: parseJson<EstimateResultPublic["recommendations"]>(
      latest.recommendations || "[]",
      [],
    ),
    riskLevel: latest.riskLevel,
    technicalReviewRequired: session.technicalReviewRequired,
    scoreBand: session.scoreBand,
    version: latest.version,
    aiSummary: session.aiSummary,
  };
}

async function loadFeatureNodes(productId: string): Promise<FeatureNode[]> {
  const features = await prisma.estimatorFeature.findMany({
    where: { productId, active: true },
  });
  return features.map((f) => ({
    id: f.id,
    key: f.key,
    name: f.name,
    priority: f.priority,
    complexity: f.complexity,
    baseUnits: f.baseUnits,
    technicalRisk: f.technicalRisk,
    optional: f.optional,
  }));
}

export async function calculateEstimate(
  publicId: string,
  options?: { optimizeBudget?: number; token?: string; label?: string },
): Promise<EstimateResultInternal> {
  const session = await getSessionByPublicId(publicId, options?.token);
  if (!session) throw new Error("NOT_FOUND");
  if (!session.productId || !session.product) throw new Error("NO_PRODUCT");

  const pricingVersion =
    session.pricingVersion || (await activePricingVersion());
  if (!pricingVersion) throw new Error("NO_PRICING");

  const answers = parseAnswers(session.answers);
  let selectedKeys = parseStringArray(session.selectedFeatures);
  const features = await loadFeatureNodes(session.productId);
  const config = pricingConfigFromVersion(pricingVersion);

  const template = session.templateKey
    ? await prisma.productTemplate.findFirst({
        where: {
          productId: session.productId,
          key: session.templateKey,
        },
      })
    : await prisma.productTemplate.findFirst({
        where: { productId: session.productId, active: true },
        orderBy: { sortOrder: "asc" },
      });

  const coreKeys = template ? parseStringArray(template.coreFeatureKeys) : [];
  selectedKeys = [...new Set([...selectedKeys, ...coreKeys])];

  const deps = await prisma.featureDependency.findMany({
    where: {
      fromFeature: { productId: session.productId },
    },
    include: { fromFeature: true, toFeature: true },
  });
  const resolved = resolveFeatureDependencies(
    selectedKeys,
    features,
    deps.map((d) => ({
      fromKey: d.fromFeature.key,
      toKey: d.toFeature.key,
      type: d.type,
      message: d.message,
    })),
  );
  selectedKeys = resolved.selected;

  let deferred: string[] = [];
  let pricing = calculatePricing({
    baseUnits: session.product.baseUnits,
    features,
    selectedKeys,
    answers,
    config,
    coreFeatureKeys: coreKeys,
    productKey: session.product.key,
  });

  const protectedKeys = [
    ...coreKeys,
    ...extractedFeatureKeys(answers),
  ];

  const budget =
    options?.optimizeBudget ??
    (typeof answers.budget_vnd === "number" ? answers.budget_vnd : null);

  let optimized = false;
  let optimizeMessage = "";
  if (budget && pricing.minAmount > budget) {
    const opt = optimizeForBudget({
      budgetVnd: budget,
      baseUnits: session.product.baseUnits,
      features,
      selectedKeys,
      coreFeatureKeys: coreKeys,
      protectedFeatureKeys: protectedKeys,
      answers,
      config,
      productKey: session.product.key,
    });
    selectedKeys = opt.selected;
    deferred = opt.deferred;
    pricing = opt.pricing;
    optimized = true;
    optimizeMessage = opt.message;
  }

  const selectedFeatures = features.filter((f) => selectedKeys.includes(f.key));
  const deferredFeatures = features.filter((f) => deferred.includes(f.key));
  const timeline = estimateTimelineWeeks({
    selectedFeatures,
    answers,
    optimized,
  });
  const roadmap = buildRoadmap({
    productKey: session.product.key,
    selectedFeatures,
    deferredFeatures,
  });
  const dbRecs = await prisma.recommendationRule.findMany({
    where: { active: true },
  });
  const recommendations = buildRecommendations({
    answers,
    selectedFeatures: selectedKeys,
    dbRules: dbRecs,
  });
  if (optimized && deferred.length) {
    recommendations.unshift({
      key: "budget_optimized",
      title: "Đã tối ưu theo ngân sách",
      body:
        optimizeMessage ||
        `Một số tính năng chuyển Phase 2: ${deferredFeatures.map((f) => f.name).join(", ")}`,
    });
  } else if (optimized && !deferred.length) {
    recommendations.unshift({
      key: "budget_tight",
      title: "Ngân sách thấp hơn phạm vi yêu cầu",
      body: optimizeMessage || "Cần technical consultation để chốt Phase 1.",
    });
  }

  const architecture = pickArchitecture({
    productKey: session.product.key,
    templateKey: session.templateKey || template?.key,
    answers,
    selectedFeatures: selectedKeys,
    dbTemplates: await prisma.architectureTemplate.findMany(),
  });

  const technicalReviewRequired =
    answers.needs_ai === true ||
    selectedKeys.includes("ai_assistant") ||
    selectedKeys.includes("realtime") ||
    String(answers.monthly_users) === "GT_100K" ||
    selectedFeatures.some((f) => f.technicalRisk === "HIGH" || f.technicalRisk === "VERY_HIGH");

  const riskLevel = technicalReviewRequired
    ? "HIGH"
    : selectedFeatures.some((f) => f.technicalRisk === "MEDIUM")
      ? "MEDIUM"
      : "LOW";

  const nextVersion = session.currentVersion + 1;
  await prisma.$transaction([
    prisma.estimateVersion.create({
      data: {
        sessionId: session.id,
        version: nextVersion,
        label: options?.label || (optimized ? "Optimized" : "Estimate"),
        selectedFeatures: JSON.stringify(selectedKeys),
        answersSnapshot: JSON.stringify(answers),
        internalAmount: pricing.internalAmount,
        minAmount: pricing.minAmount,
        maxAmount: pricing.maxAmount,
        timelineWeeksMin: timeline.min,
        timelineWeeksMax: timeline.max,
        roadmap: JSON.stringify(roadmap),
        architecture: JSON.stringify(architecture),
        recommendations: JSON.stringify(recommendations),
        optimized,
        deferredFeatures: JSON.stringify(deferred),
        riskLevel,
        breakdown: JSON.stringify(pricing),
      },
    }),
    prisma.estimateSession.update({
      where: { id: session.id },
      data: {
        selectedFeatures: JSON.stringify(selectedKeys),
        currentVersion: nextVersion,
        status: optimized ? "OPTIMIZED" : "CALCULATED",
        technicalReviewRequired,
      },
    }),
  ]);

  const publicResult: EstimateResultPublic = {
    product: session.product.name,
    templateKey: session.templateKey || template?.key || null,
    businessModel: answers.business_model ? String(answers.business_model) : null,
    features: selectedFeatures.map((f) => ({
      key: f.key,
      name: f.name,
      priority: f.priority,
    })),
    deferredFeatures: deferredFeatures.map((f) => ({
      key: f.key,
      name: f.name,
    })),
    range: {
      min: pricing.minAmount,
      max: pricing.maxAmount,
      currency: "VND",
    },
    timelineWeeks: timeline,
    roadmap,
    architecture: {
      key: architecture.key,
      name: architecture.name,
      stack: architecture.stack,
    },
    recommendations,
    riskLevel,
    technicalReviewRequired,
    scoreBand: null,
    version: nextVersion,
    aiSummary: session.aiSummary,
  };

  return {
    ...publicResult,
    internalAmount: pricing.internalAmount,
    breakdown: pricing,
  };
}

export async function captureEstimateLead(
  publicId: string,
  contact: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    zalo?: string;
  },
  token?: string,
) {
  const session = await getSessionByPublicId(publicId, token);
  if (!session) throw new Error("NOT_FOUND");

  if (session.lead) {
    return { lead: session.lead, alreadyCaptured: true };
  }

  // Ensure we have an estimate version
  let latest: (typeof session.versions)[number] | null =
    session.versions[0] ?? null;
  if (!latest) {
    await calculateEstimate(publicId, { token });
    const refreshed = await getSessionByPublicId(publicId, token);
    latest = refreshed?.versions[0] ?? null;
  }
  if (!latest) throw new Error("NO_ESTIMATE");

  const answers = parseAnswers(session.answers);
  const step = await getNextStep(publicId, token);
  const budget =
    typeof answers.budget_vnd === "number" ? answers.budget_vnd : null;
  const scored = scoreLead({
    answers,
    hasContact: true,
    completionRatio: step.progress.completionRatio,
    estimateMin: Number(latest.minAmount),
    budgetVnd: budget,
  });

  const partner = session.referralCode
    ? await resolveApprovedPartner(session.referralCode)
    : null;

  const now = new Date();
  const description = [
    `Estimate ${session.publicId} v${latest.version}`,
    `Sản phẩm: ${session.product?.name || "N/A"}`,
    `Khoảng giá: ${Number(latest.minAmount).toLocaleString("vi-VN")} – ${Number(latest.maxAmount).toLocaleString("vi-VN")} VND`,
    session.customRequirements
      ? `Yêu cầu tuỳ chỉnh: ${session.customRequirements}`
      : null,
    contact.zalo ? `Zalo: ${contact.zalo}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const lead = await prisma.$transaction(async (tx) => {
    const created = await tx.lead.create({
      data: {
        leadNumber: nextLeadNumber(now),
        name: contact.name,
        company: contact.company || null,
        email: contact.email,
        phone: contact.phone,
        projectType: session.product?.name || null,
        description,
        estimatedBudget: budget
          ? `${Math.round(budget / 1_000_000)}M`
          : `${Math.round(Number(latest.minAmount) / 1_000_000)}–${Math.round(Number(latest.maxAmount) / 1_000_000)}M`,
        expectedTimeline: answers.timeline ? String(answers.timeline) : null,
        source: "ESTIMATOR",
        sourceDetail: session.publicId,
        landingPath: session.landingPath,
        utmSource: session.utmSource,
        utmMedium: session.utmMedium,
        utmCampaign: session.utmCampaign,
        referralCode: partner?.code || session.referralCode,
        partnerId: partner?.id,
        ownershipExpiresAt: partner ? ownershipExpiry(partner, now) : null,
        estimatedValue: latest.internalAmount,
        leadScore: scored.score,
        scoreBand: scored.band,
        priority: scored.band === "HOT" ? "HIGH" : scored.band === "WARM" ? "NORMAL" : "LOW",
        estimateSessionId: session.id,
        activities: {
          create: {
            type: "CREATED",
            title: "Lead từ AI Estimator",
            body: scored.reasons.join("; "),
            meta: JSON.stringify({
              estimateId: session.publicId,
              version: latest.version,
              score: scored.score,
              band: scored.band,
            }),
          },
        },
      },
    });

    await tx.estimateSession.update({
      where: { id: session.id },
      data: {
        status: "CONTACT_CAPTURED",
        contactName: contact.name,
        contactCompany: contact.company || null,
        contactEmail: contact.email,
        contactPhone: contact.phone,
        contactZalo: contact.zalo || null,
        leadScore: scored.score,
        scoreBand: scored.band,
      },
    });

    return created;
  });

  return { lead, alreadyCaptured: false, score: scored };
}

export function toPublicResult(
  result: EstimateResultInternal,
): EstimateResultPublic {
  const {
    internalAmount: _i,
    breakdown: _b,
    ...pub
  } = result;
  return pub;
}
