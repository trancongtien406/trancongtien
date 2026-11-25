import { DRINKS, FLAVORS, type Drink, type FlavorKey } from "../data/menu";

export type Strength = "light" | "mid" | "strong";
export type AlcoholPref = "yes" | "no" | "any";
export type MatchInput = { flavors: FlavorKey[]; strength: Strength; alcohol: AlcoholPref };
export type MatchResult = { drink: Drink; percent: number; reasons: string[] };

const STRENGTH_TARGET: Record<Strength, number> = { light: 1, mid: 2, strong: 3 };
const STRENGTH_LABEL: Record<Strength, string> = { light: "nhẹ", mid: "vừa", strong: "mạnh" };
const LEVEL = ["không có", "thoảng nhẹ", "rõ", "đậm"] as const;

export function validate(input: MatchInput): string | null {
  if (input.flavors.length === 0) return "Chọn ít nhất một vị bạn thích.";
  return null;
}

/** Điểm: +3 mỗi điểm vị trùng, -1 nếu có vị nổi bật (3) mà bạn không chọn, -2 mỗi bậc lệch độ mạnh (chỉ khi có cồn). */
export function match(input: MatchInput): MatchResult[] {
  const picked = new Set(input.flavors);
  const pool = DRINKS.filter((d) => d.kind !== "bite" && (input.alcohol === "any" || (input.alcohol === "yes") === d.alcohol));
  const maxScore = input.flavors.length * 3 * 3;
  const scored = pool.map((d) => {
    let s = 0;
    for (const f of FLAVORS) {
      const v = d[f.key];
      if (picked.has(f.key)) s += v * 3;
      else if (v === 3) s -= 1;
    }
    if (d.alcohol) s -= Math.abs(d.strength - STRENGTH_TARGET[input.strength]) * 2;
    const percent = Math.max(8, Math.min(99, Math.round((Math.max(0, s) / maxScore) * 100)));
    return { d, s, percent };
  });
  scored.sort((a, b) => b.s - a.s || a.d.price - b.d.price || a.d.name.localeCompare(b.d.name, "vi"));
  return scored.slice(0, 3).map(({ d, percent }) => ({ drink: d, percent, reasons: explain(d, input) }));
}

function explain(d: Drink, input: MatchInput): string[] {
  const out: string[] = [];
  const hits = FLAVORS.filter((f) => input.flavors.includes(f.key) && d[f.key] >= 2).sort((a, b) => d[b.key] - d[a.key]);
  for (const f of hits.slice(0, 2)) out.push(`Vị ${f.label.toLowerCase()} ở mức ${LEVEL[d[f.key]]}, đúng thứ bạn chọn.`);
  if (!hits.length) {
    const f = FLAVORS.filter((x) => input.flavors.includes(x.key)).sort((a, b) => d[b.key] - d[a.key])[0];
    if (f) out.push(`Gần với vị ${f.label.toLowerCase()} bạn chọn (mức ${LEVEL[d[f.key]]}), cân bằng bằng các vị còn lại.`);
  }
  if (!d.alcohol) out.push("Không cồn, vẫn đủ lớp vị để uống chậm.");
  else if (Math.abs(d.strength - STRENGTH_TARGET[input.strength]) === 0) out.push(`Độ mạnh ${STRENGTH_LABEL[input.strength]}, đúng mức bạn muốn.`);
  else out.push(`Độ mạnh ${["", "nhẹ", "vừa", "mạnh"][d.strength]}, gần với mức ${STRENGTH_LABEL[input.strength]} bạn chọn.`);
  return out.slice(0, 3);
}
