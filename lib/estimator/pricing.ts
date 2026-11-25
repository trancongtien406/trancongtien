import { COMPLEXITY_WEIGHT, type AnswersMap, type PricingBreakdown } from "@/lib/estimator/types";
import type { FeatureNode } from "@/lib/estimator/dependencies";

export type PricingConfig = {
  unitValueVnd: number;
  minimumProjectVnd: number;
  riskBufferLow: number;
  riskBufferMedium: number;
  riskBufferHigh: number;
  rushCoefficient: number;
  rangePadding: number;
  businessModelCoeffs: Record<string, number>;
  scaleCoeffs: Record<string, number>;
};

export type PricingInput = {
  baseUnits: number;
  features: FeatureNode[];
  selectedKeys: string[];
  integrationUnits?: number;
  answers: AnswersMap;
  config: PricingConfig;
  /** Core template keys — phạm vi chỉ core thì không nhân Premium/scale/SaaS. */
  coreFeatureKeys?: string[];
  /** WEBSITE / MOBILE_APP — dùng khi lean để neo MVP ~15M web / ~20M app. */
  productKey?: string | null;
};

/** Scope chỉ gồm tính năng core của template (app/web MVP), chưa thêm module. */
export function isLeanScope(selectedKeys: string[], coreFeatureKeys?: string[]) {
  if (!coreFeatureKeys?.length || selectedKeys.length === 0) return false;
  return selectedKeys.every((key) => coreFeatureKeys.includes(key));
}

/**
 * MVP lean: giảm đơn giá hiệu dụng để web ecommerce core ~15M, mobile core ~20M.
 * Thêm module ngoài core → không áp dụng (giá full).
 */
export function leanMvpFactor(productKey?: string | null) {
  if (productKey === "WEBSITE") return 0.42;
  if (productKey === "MOBILE_APP") return 0.68;
  return 0.55;
}

function parseJsonMap(raw: string): Record<string, number> {
  try {
    const parsed = JSON.parse(raw) as Record<string, number>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function pricingConfigFromVersion(version: {
  unitValueVnd: number;
  minimumProjectVnd: number;
  riskBufferLow: number;
  riskBufferMedium: number;
  riskBufferHigh: number;
  rushCoefficient: number;
  rangePadding: number;
  businessModelCoeffs: string;
  scaleCoeffs: string;
}): PricingConfig {
  return {
    unitValueVnd: version.unitValueVnd,
    minimumProjectVnd: version.minimumProjectVnd,
    riskBufferLow: version.riskBufferLow,
    riskBufferMedium: version.riskBufferMedium,
    riskBufferHigh: version.riskBufferHigh,
    rushCoefficient: version.rushCoefficient,
    rangePadding: version.rangePadding,
    businessModelCoeffs: parseJsonMap(version.businessModelCoeffs),
    scaleCoeffs: parseJsonMap(version.scaleCoeffs),
  };
}

function businessCoeff(answers: AnswersMap, map: Record<string, number>) {
  const model = String(answers.business_model || answers.businessModel || "SINGLE_SHOP");
  return map[model] ?? 1;
}

function scaleCoeff(answers: AnswersMap, map: Record<string, number>) {
  const band = String(answers.monthly_users || answers.scale_users || "LT_1K");
  return map[band] ?? 1;
}

function designCoeff(answers: AnswersMap) {
  const level = String(answers.design_level || "STANDARD");
  if (level === "PREMIUM") return 1.25;
  if (level === "BASIC") return 0.9;
  if (level === "CUSTOM") return 1.4;
  return 1;
}

function timelineCoeff(answers: AnswersMap, rush: number) {
  const timeline = String(answers.timeline || answers.expected_timeline || "STANDARD");
  if (timeline === "RUSH" || timeline === "ASAP") return rush;
  if (timeline === "FLEXIBLE") return 0.95;
  return 1;
}

function riskBuffer(
  features: FeatureNode[],
  selectedKeys: string[],
  answers: AnswersMap,
  config: PricingConfig,
) {
  const selected = features.filter((f) => selectedKeys.includes(f.key));
  const maxRisk = selected.reduce((max, f) => {
    const w = COMPLEXITY_WEIGHT[f.technicalRisk] || 2;
    return Math.max(max, w);
  }, COMPLEXITY_WEIGHT.LOW);

  const flags = [
    answers.needs_ai,
    answers.has_realtime,
    answers.has_payment,
    answers.high_scale,
  ];
  const flagged = flags.some((v) => v === true || v === "true" || v === "YES");

  if (maxRisk >= 8 || flagged || String(answers.monthly_users) === "GT_100K") {
    return config.riskBufferHigh;
  }
  if (maxRisk >= 5) return config.riskBufferMedium;
  return config.riskBufferLow;
}

function roundToMillion(n: number) {
  return Math.max(1_000_000, Math.round(n / 1_000_000) * 1_000_000);
}

export function calculatePricing(input: PricingInput): PricingBreakdown {
  const { config, answers, features, selectedKeys } = input;
  const selected = features.filter((f) => selectedKeys.includes(f.key));

  const featureUnits = selected.reduce((sum, f) => {
    const weight = COMPLEXITY_WEIGHT[f.complexity] || 3;
    return sum + f.baseUnits * (weight / 3);
  }, 0);

  const lean = isLeanScope(selectedKeys, input.coreFeatureKeys);
  const biz = lean ? 1 : businessCoeff(answers, config.businessModelCoeffs);
  const scale = lean ? 1 : scaleCoeff(answers, config.scaleCoeffs);
  const design = lean ? 1 : designCoeff(answers);
  const timeline = timelineCoeff(answers, config.rushCoefficient);
  const risk = riskBuffer(features, selectedKeys, answers, config);
  const integrationUnits = input.integrationUnits || 0;
  const unitValue = lean
    ? config.unitValueVnd * leanMvpFactor(input.productKey)
    : config.unitValueVnd;

  const subtotalUnits =
    (input.baseUnits + featureUnits + integrationUnits) * biz * scale * design * timeline;
  const withRisk = subtotalUnits * (1 + risk);
  const raw = withRisk * unitValue;
  const internalAmount = Math.max(config.minimumProjectVnd, roundToMillion(raw));
  const padding = config.rangePadding;
  const minAmount = Math.max(
    config.minimumProjectVnd,
    roundToMillion(internalAmount * (1 - padding)),
  );
  const maxAmount = roundToMillion(internalAmount * (1 + padding));

  return {
    baseUnits: input.baseUnits,
    featureUnits: Math.round(featureUnits * 100) / 100,
    integrationUnits,
    businessCoeff: biz,
    scaleCoeff: scale,
    designCoeff: design,
    timelineCoeff: timeline,
    riskBuffer: risk,
    subtotalUnits: Math.round(subtotalUnits * 100) / 100,
    unitValueVnd: Math.round(unitValue),
    internalAmount,
    minAmount,
    maxAmount,
  };
}

export function formatVndRange(min: number, max: number) {
  const fmt = (n: number) => {
    const m = n / 1_000_000;
    return Number.isInteger(m) ? `${m}M` : `${m.toFixed(1)}M`;
  };
  return `${fmt(min)}–${fmt(max)} VND`;
}
