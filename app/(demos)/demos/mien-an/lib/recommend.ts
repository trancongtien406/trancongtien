import type { Ritual, RitualFinderAnswers } from "../data/types";

export type Recommendation = { ritual: Ritual; score: number };

/** Rule engine thuần, xác định (không AI). Không tự nới lỏng điều kiện của người dùng. */
export function recommendRituals(rituals: readonly Ritual[], a: RitualFinderAnswers): Recommendation[] {
  if (!a.goal || !a.maxDuration) return [];
  const goal = a.goal;
  const max = a.maxDuration;
  return rituals
    .filter(
      (r) =>
        r.goals.includes(goal) &&
        r.durationMinutes <= max &&
        (a.pressure === "any" || r.pressures.includes(a.pressure)) &&
        (!a.avoidHotStone || !r.usesHotStone) &&
        (!a.unscented || r.supportsUnscented),
    )
    .map((ritual) => ({
      ritual,
      score: 60 + (ritual.primaryGoal === goal ? 20 : 0) + (a.pressure !== "any" ? 10 : 0) + Math.round((10 * ritual.durationMinutes) / max),
    }))
    .sort((x, y) => y.score - x.score || x.ritual.priceVnd - y.ritual.priceVnd || x.ritual.id.localeCompare(y.ritual.id))
    .slice(0, 3);
}
