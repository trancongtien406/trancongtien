import { TOURS, type Companion, type Interest, type Tour, type TourId } from "../data/tours";

export type DurationOption = "half-day" | "one-day" | "two-days" | "three-plus";
export type FinderInput = { duration: DurationOption | null; maxBudget: number; interests: Interest[]; companion: Companion | null };
export const BUDGET_MIN = 300000;
export const BUDGET_MAX = 6000000;
export const BUDGET_STEP = 50000;
export const MAX_INTERESTS = 5;

export type Reason = "interest" | "budget" | "companion" | "exact-time" | "shorter";
export type Match = { tour: Tour; id: TourId; score: number; cost: number; reasons: Reason[]; remaining: number };
export type FinderErrors = { duration?: true; companion?: true; budget?: true };

export const estimatedAdultCost = (t: Tour) => t.pricing.adultBase + t.pricing.adultAdmission;

export function validateFinder(i: FinderInput): FinderErrors {
  const e: FinderErrors = {};
  if (!i.duration) e.duration = true;
  if (!i.companion) e.companion = true;
  if (!Number.isFinite(i.maxBudget) || !Number.isInteger(i.maxBudget) || i.maxBudget < BUDGET_MIN || i.maxBudget > BUDGET_MAX) e.budget = true;
  return e;
}

function eligible(d: DurationOption, t: Tour): boolean {
  if (d === "half-day") return t.durationKind === "half-day";
  if (d === "one-day" || d === "two-days") return t.durationKind !== "multi-day";
  return true;
}
function exactDuration(d: DurationOption, t: Tour): boolean {
  if (d === "half-day") return t.durationKind === "half-day";
  if (d === "one-day") return t.durationKind === "one-day";
  if (d === "three-plus") return t.durationKind === "multi-day";
  return false;
}

/** Lọc cứng theo thời gian + ngân sách (đã gồm vé), chấm điểm theo công thức, tối đa 3 kết quả. */
export function findTrips(i: FinderInput): Match[] {
  if (!i.duration || !i.companion) return [];
  const out: Match[] = [];
  for (const t of TOURS) {
    const cost = estimatedAdultCost(t);
    if (!eligible(i.duration, t) || cost > i.maxBudget) continue;
    const matched = i.interests.filter((x) => t.interests.includes(x)).length;
    const interestScore = i.interests.length === 0 ? 55 : 55 * (matched / i.interests.length);
    const companionOk = t.companions.includes(i.companion);
    const exact = exactDuration(i.duration, t);
    const score = interestScore + (companionOk ? 20 : 5) + (exact ? 15 : 8) + 10 * (1 - cost / i.maxBudget);
    const reasons: Reason[] = [];
    if (i.interests.length === 0 || matched > 0) reasons.push("interest");
    reasons.push("budget");
    if (companionOk) reasons.push("companion");
    reasons.push(exact ? "exact-time" : "shorter");
    out.push({ tour: t, id: t.id, score, cost, reasons, remaining: i.maxBudget - cost });
  }
  out.sort((a, b) => b.score - a.score || a.cost - b.cost || a.id.localeCompare(b.id));
  return out.slice(0, 3);
}
