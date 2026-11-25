import { z } from "zod";

export const COMPLEXITY_WEIGHT: Record<string, number> = {
  VERY_LOW: 1,
  LOW: 2,
  MEDIUM: 3,
  HIGH: 5,
  VERY_HIGH: 8,
};

export const SECTIONS = [
  { key: "idea", label: "Ý tưởng", order: 1 },
  { key: "business", label: "Mô hình", order: 2 },
  { key: "users", label: "Người dùng", order: 3 },
  { key: "features", label: "Tính năng", order: 4 },
  { key: "scale", label: "Quy mô", order: 5 },
  { key: "integration", label: "Tích hợp", order: 6 },
  { key: "design", label: "Thiết kế", order: 7 },
  { key: "timeline", label: "Thời gian", order: 8 },
  { key: "budget", label: "Ngân sách", order: 9 },
  { key: "recommendation", label: "Đề xuất", order: 10 },
] as const;

export type AnswerValue = string | number | boolean | string[] | null;

export type AnswersMap = Record<string, AnswerValue>;

export const createSessionSchema = z.object({
  productKey: z.string().optional(),
  landingPath: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referralCode: z.string().optional(),
  /** true = bỏ phiên cookie, tạo phiên mới (nút bắt đầu lại). */
  fresh: z.boolean().optional(),
});

export const answerSchema = z.object({
  questionKey: z.string().min(1),
  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.array(z.string()),
    z.null(),
  ]),
});

export const featuresSchema = z.object({
  featureKeys: z.array(z.string()).min(0),
});

export const customRequirementSchema = z.object({
  text: z.string().min(3).max(4000),
});

export const optimizeSchema = z.object({
  budgetVnd: z.number().int().positive().optional(),
});

export const captureLeadSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().max(160).optional(),
  email: z.string().email(),
  phone: z.string().min(8).max(30),
  zalo: z.string().max(60).optional(),
  preferredContact: z.string().max(40).optional(),
});

export type PricingBreakdown = {
  baseUnits: number;
  featureUnits: number;
  integrationUnits: number;
  businessCoeff: number;
  scaleCoeff: number;
  designCoeff: number;
  timelineCoeff: number;
  riskBuffer: number;
  subtotalUnits: number;
  unitValueVnd: number;
  internalAmount: number;
  minAmount: number;
  maxAmount: number;
};

export type EstimateResultPublic = {
  product: string;
  templateKey: string | null;
  businessModel: string | null;
  features: Array<{ key: string; name: string; priority: string }>;
  deferredFeatures: Array<{ key: string; name: string }>;
  range: { min: number; max: number; currency: string };
  timelineWeeks: { min: number; max: number };
  roadmap: Array<{ phase: string; items: string[] }>;
  architecture: { key: string; name: string; stack: string[] };
  recommendations: Array<{ title: string; body: string }>;
  riskLevel: string;
  technicalReviewRequired: boolean;
  scoreBand: string | null;
  version: number;
  aiSummary: string | null;
};

export type EstimateResultInternal = EstimateResultPublic & {
  internalAmount: number;
  breakdown: PricingBreakdown;
};
