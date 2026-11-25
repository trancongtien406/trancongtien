import type { FeatureNode } from "@/lib/estimator/dependencies";
import { calculatePricing, type PricingConfig } from "@/lib/estimator/pricing";
import type { AnswersMap } from "@/lib/estimator/types";

const PRIORITY_ORDER = [
  "NICE_TO_HAVE",
  "GROWTH",
  "SCALE",
  "SHOULD_HAVE",
  "MUST_HAVE",
] as const;

export type OptimizeResult = {
  selected: string[];
  deferred: string[];
  pricing: ReturnType<typeof calculatePricing>;
  message: string;
};

/**
 * Keep MUST_HAVE + core + customer-requested features.
 * Never defer explicitly requested capabilities (e.g. payment từ mô tả khách).
 */
export function optimizeForBudget(input: {
  budgetVnd: number;
  baseUnits: number;
  features: FeatureNode[];
  selectedKeys: string[];
  coreFeatureKeys: string[];
  protectedFeatureKeys?: string[];
  answers: AnswersMap;
  config: PricingConfig;
  integrationUnits?: number;
  productKey?: string | null;
}): OptimizeResult {
  const protectedKeys = new Set([
    ...input.coreFeatureKeys,
    ...(input.protectedFeatureKeys || []),
  ]);
  let selected = [...new Set([...input.selectedKeys, ...input.coreFeatureKeys])];
  const deferred: string[] = [];

  const byKey = new Map(input.features.map((f) => [f.key, f]));

  const priceOf = (keys: string[]) =>
    calculatePricing({
      baseUnits: input.baseUnits,
      features: input.features,
      selectedKeys: keys,
      answers: input.answers,
      config: input.config,
      integrationUnits: input.integrationUnits,
      coreFeatureKeys: input.coreFeatureKeys,
      productKey: input.productKey,
    });

  let pricing = priceOf(selected);
  if (pricing.minAmount <= input.budgetVnd) {
    return {
      selected,
      deferred,
      pricing,
      message: "Phạm vi hiện tại phù hợp ngân sách.",
    };
  }

  const removable = selected
    .filter((k) => {
      const f = byKey.get(k);
      if (!f) return false;
      if (protectedKeys.has(k)) return false;
      if (f.priority === "MUST_HAVE") return false;
      return true;
    })
    .sort((a, b) => {
      const fa = byKey.get(a)!;
      const fb = byKey.get(b)!;
      return (
        PRIORITY_ORDER.indexOf(fa.priority as (typeof PRIORITY_ORDER)[number]) -
        PRIORITY_ORDER.indexOf(fb.priority as (typeof PRIORITY_ORDER)[number])
      );
    });

  for (const key of removable) {
    if (pricing.minAmount <= input.budgetVnd) break;
    selected = selected.filter((k) => k !== key);
    deferred.push(key);
    pricing = priceOf(selected);
  }

  // Still over: only defer unprotected SHOULD_HAVE (never protected/extracted)
  if (pricing.minAmount > input.budgetVnd) {
    const shouldHaves = selected
      .filter(
        (k) =>
          !protectedKeys.has(k) && byKey.get(k)?.priority === "SHOULD_HAVE",
      )
      .sort(
        (a, b) => (byKey.get(b)?.baseUnits || 0) - (byKey.get(a)?.baseUnits || 0),
      );
    for (const key of shouldHaves) {
      if (pricing.minAmount <= input.budgetVnd) break;
      selected = selected.filter((k) => k !== key);
      deferred.push(key);
      pricing = priceOf(selected);
    }
  }

  const protectedStillOver =
    pricing.minAmount > input.budgetVnd &&
    [...protectedKeys].some((k) => selected.includes(k));

  const message =
    pricing.minAmount <= input.budgetVnd
      ? `Đã tối ưu phạm vi để khớp ngân sách ~${Math.round(input.budgetVnd / 1_000_000)}M. Một số tính năng growth chuyển Phase 2.`
      : protectedStillOver
        ? `Ngân sách ~${Math.round(input.budgetVnd / 1_000_000)}M thấp hơn phạm vi bạn yêu cầu rõ (đã giữ các tính năng bắt buộc/đã nêu). Cần technical consultation để chốt Phase 1.`
        : "Ngân sách thấp hơn core product tối thiểu. Cần technical consultation để điều chỉnh phạm vi.";

  return { selected, deferred, pricing, message };
}
