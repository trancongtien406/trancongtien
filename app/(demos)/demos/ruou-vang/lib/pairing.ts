import { BUDGETS, FOODS, MOODS, WINES, type FoodKey, type MoodKey, type Wine, type WineKind } from "../data/wines";

export type Body = 1 | 2 | 3;
export type Sweet = 0 | 1 | 2;
export type PairInput = {
  food: FoodKey | null;
  mood: MoodKey | null;
  kind: WineKind | "any";
  body: Body | 0; // 0 = chưa chọn
  sweet: Sweet | -1; // -1 = chưa chọn
  budget: string;
};
export type PairResult = { wine: Wine; percent: number; reasons: string[]; overBudget: boolean; dish: string };

export const BODY_LABEL = ["", "nhẹ", "vừa", "đậm"] as const;
export const SWEET_LABEL = ["khô", "bán khô", "ngọt nhẹ"] as const;

export function validate(i: PairInput): string | null {
  if (!i.food) return "Chọn món bạn định gọi để mình ghép vang cho đúng.";
  return null;
}

export function pair(i: PairInput): PairResult[] {
  const max = BUDGETS.find((b) => b.key === i.budget)?.max ?? Infinity;
  const min = i.budget === "b4" ? 1200000 : 0;
  const scored = WINES.map((w) => {
    let s = 0;
    if (i.kind !== "any") s += w.kind === i.kind ? 6 : -5;
    if (i.food && w.foods.includes(i.food)) s += 5;
    if (i.mood && w.moods.includes(i.mood)) s += 2;
    if (i.body) {
      const d = Math.abs(w.body - i.body);
      s += 3 - d * 2;
    }
    if (i.sweet >= 0) {
      const d = Math.abs(w.sweet - i.sweet);
      s += 3 - d * 2;
    }
    const over = w.bottle > max || w.bottle < min;
    if (i.budget !== "any") s += over ? -3 : 2;
    return { w, s, over };
  });
  scored.sort((a, b) => b.s - a.s || a.w.bottle - b.w.bottle || a.w.name.localeCompare(b.w.name, "vi"));
  const top = scored.slice(0, 3);
  const best = Math.max(1, top[0].s);
  return top.map(({ w, s, over }) => ({
    wine: w,
    percent: Math.max(12, Math.min(99, Math.round((Math.max(0, s) / Math.max(best, 10)) * 96))),
    reasons: reasons3(w, i),
    overBudget: over && i.budget !== "any",
    dish: FOODS.find((f) => f.key === (i.food && w.foods.includes(i.food) ? i.food : w.foods[0]))!.dish,
  }));
}

function reasons3(w: Wine, i: PairInput): string[] {
  const out: string[] = [];
  if (i.food && w.foods.includes(i.food)) out.push(`Hợp với ${FOODS.find((f) => f.key === i.food)!.label.toLowerCase()}.`);
  else if (i.food) out.push("Không phải lựa chọn quen cho món này, nhưng cân bằng được bằng độ tươi và thân vang.");
  if (i.mood && w.moods.includes(i.mood)) out.push(`Dễ chọn cho dịp ${MOODS.find((m) => m.key === i.mood)!.label.toLowerCase()}.`);
  if (i.body && w.body === i.body) out.push(`Độ đậm ${BODY_LABEL[w.body]}, đúng mức bạn muốn.`);
  if (i.sweet >= 0 && w.sweet === i.sweet) out.push(`Vị ${SWEET_LABEL[w.sweet]}, như bạn chọn.`);
  if (!out.length) out.push(w.note);
  return out.slice(0, 3);
}
