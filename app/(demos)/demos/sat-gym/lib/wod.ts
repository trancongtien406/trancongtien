import { MOVES, type Equip, type Level, type Move, type Pattern } from "../data/moves";

export type Goal = "suc-manh" | "the-luc" | "linh-hoat" | "tong-hop";
export type Format = "tabata" | "emom";
export type Minutes = 15 | 20 | 30;

export const GOALS: { id: Goal; label: string; hint: string }[] = [
  { id: "suc-manh", label: "Sức mạnh", hint: "Ít lần hơn, tải vừa sức, giữ kỹ thuật" },
  { id: "the-luc", label: "Thể lực", hint: "Nhịp liên tục, tim phổi và sức bền" },
  { id: "tong-hop", label: "Tổng hợp", hint: "Đủ đẩy, kéo, squat, hông và bụng" },
  { id: "linh-hoat", label: "Kỹ thuật & linh hoạt", hint: "Chậm, kiểm soát, làm quen chuyển động" },
];

export const TIMES: { id: Minutes; label: string }[] = [
  { id: 15, label: "15 phút" },
  { id: 20, label: "20 phút" },
  { id: 30, label: "30 phút" },
];

export type Params = { goal: Goal; time: Minutes; level: Level; equip: Equip[] };

export type Prescribed = { move: Move; reps: number; text: string };

export type Wod = {
  params: Params;
  format: Format;
  moves: Prescribed[];
  /** bộ lọc không đủ động tác nên đã mở rộng sang bài chỉ cơ thể */
  adjusted: boolean;
};

export type Seg = {
  kind: "prep" | "work" | "rest" | "emom";
  seconds: number;
  /** vị trí động tác trong WOD (prep trỏ tới động tác đầu) */
  moveIdx: number;
  /** thứ tự hiệp, bắt đầu từ 1 (prep = 0) */
  round: number;
};

const SLOTS: Record<Goal, Pattern[]> = {
  "suc-manh": ["squat", "hinge", "push", "pull", "core", "carry"],
  "the-luc": ["cardio", "squat", "push", "hinge", "core", "cardio"],
  "tong-hop": ["squat", "push", "hinge", "pull", "core", "cardio"],
  "linh-hoat": ["mobility", "squat", "hinge", "push", "core", "mobility"],
};

const FALLBACK: Record<Pattern, Pattern[]> = {
  squat: ["hinge", "cardio"],
  hinge: ["squat", "core"],
  push: ["core", "cardio"],
  pull: ["hinge", "core"],
  core: ["mobility", "hinge"],
  cardio: ["squat", "core"],
  carry: ["core", "cardio"],
  mobility: ["core", "squat"],
};

export function defaultFormat(goal: Goal, time: Minutes): Format {
  if (goal === "the-luc") return "tabata";
  if (goal === "tong-hop") return time <= 20 ? "tabata" : "emom";
  return "emom";
}

/** PRNG nhỏ, đủ để xáo trộn có hạt giống. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function prescribe(m: Move, level: Level, goal: Goal): Prescribed {
  let reps = m.reps[level - 1];
  if (!m.fixed) {
    if (goal === "suc-manh") reps = Math.max(3, Math.round(reps * 0.6));
    else if (goal === "linh-hoat") reps = Math.max(3, Math.round(reps * 0.75));
  }
  const text = m.unit === "giây" ? `giữ ${reps} giây` : `${reps} ${m.unit}`;
  return { move: m, reps, text };
}

export type WodResult = { ok: true; wod: Wod } | { ok: false; error: string };

export function generateWod(params: Params, shuffle = 0, format?: Format): WodResult {
  const { goal, time, level } = params;
  const equip = params.equip.length ? params.equip : (["tay"] as Equip[]);
  const allowed = new Set<Equip>([...equip, "tay"]);
  const cap = (goal === "linh-hoat" ? Math.min(level, 2) : level) as Level;
  const rand = rng(hash(`${goal}|${time}|${level}|${[...equip].sort().join(",")}|${shuffle}`));
  const count = time >= 30 ? 6 : 5;
  const slots = SLOTS[goal].slice(0, count);
  const used = new Set<string>();
  const picked: Move[] = [];
  let adjusted = false;

  const pick = (pattern: Pattern, strictLevel: boolean): Move | null => {
    const pool = MOVES.filter((m) => m.pattern === pattern && allowed.has(m.equip) && !used.has(m.id) && (strictLevel ? m.level <= cap : m.level <= Math.max(cap, 1)));
    if (!pool.length) return null;
    const own = goal === "linh-hoat" ? 0.6 : 2.4;
    const scored = pool.map((m) => ({ m, s: (m.equip !== "tay" ? own : 0) + (m.level === cap ? 1.4 : 0) + rand() * 1.3 }));
    scored.sort((a, b) => b.s - a.s);
    return scored[0].m;
  };

  for (const slot of slots) {
    let m = pick(slot, true);
    if (!m) {
      for (const fb of FALLBACK[slot]) {
        m = pick(fb, true);
        if (m) { adjusted = true; break; }
      }
    }
    if (m) { used.add(m.id); picked.push(m); }
  }
  // thiếu chỗ thì lấy thêm bài chỉ cơ thể cùng trình độ
  if (picked.length < count) {
    const extra = MOVES.filter((m) => m.equip === "tay" && m.level <= cap && !used.has(m.id)).sort(() => rand() - 0.5);
    for (const m of extra) {
      if (picked.length >= count) break;
      picked.push(m); used.add(m.id); adjusted = true;
    }
  }
  if (picked.length < 5) return { ok: false, error: "Chưa đủ động tác phù hợp với lựa chọn này. Thử đổi trình độ hoặc thêm dụng cụ." };

  const moves = picked.map((m) => prescribe(m, level, goal));
  return { ok: true, wod: { params: { ...params, equip }, format: format ?? defaultFormat(goal, time), moves, adjusted } };
}

export const PREP_SECONDS = 10;
export const TABATA_WORK = 20;
export const TABATA_REST = 10;

export function buildPlan(wod: Wod): Seg[] {
  const n = wod.moves.length;
  const segs: Seg[] = [{ kind: "prep", seconds: PREP_SECONDS, moveIdx: 0, round: 0 }];
  if (wod.format === "tabata") {
    const rounds = wod.params.time * 2;
    for (let r = 0; r < rounds; r++) {
      segs.push({ kind: "work", seconds: TABATA_WORK, moveIdx: r % n, round: r + 1 });
      if (r < rounds - 1) segs.push({ kind: "rest", seconds: TABATA_REST, moveIdx: (r + 1) % n, round: r + 1 });
    }
  } else {
    for (let r = 0; r < wod.params.time; r++) segs.push({ kind: "emom", seconds: 60, moveIdx: r % n, round: r + 1 });
  }
  return segs;
}

export const totalSeconds = (segs: Seg[]) => segs.filter((s) => s.kind !== "prep").reduce((a, s) => a + s.seconds, 0);

export const mmss = (sec: number) => {
  const s = Math.max(0, Math.ceil(sec));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

export function formatLabel(f: Format, time: Minutes) {
  return f === "tabata" ? `Tabata xoay vòng 20/10, ${time} phút` : `EMOM ${time} phút, mỗi phút một động tác`;
}

export function goalLabel(g: Goal) {
  return GOALS.find((x) => x.id === g)?.label ?? g;
}
