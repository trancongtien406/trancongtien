import { DISHES, type Course, type Dish, type Taste } from "../data/menu";

export type ComposeInput = {
  guests: number;
  /** ngân sách tổng (VND) */
  budget: number;
  tastes: Taste[];
  noShellfish: boolean;
};

export type ComposeResult = {
  picks: Dish[];
  total: number;
  /** thiếu ngân sách cho số món chính khuyến nghị */
  short: boolean;
  /** không còn món nào hợp bộ lọc */
  empty: boolean;
  mainsWanted: number;
};

export function mainsFor(guests: number) {
  return Math.min(6, Math.max(1, Math.ceil(guests / 2.5)));
}

function score(d: Dish, tastes: Taste[]) {
  return d.taste.filter((t) => tastes.includes(t)).length;
}

/** Luật gợi ý: (1) đủ món chính theo số người, (2) một món rau, (3) khai vị, (4) cơm/lẩu từ 4 người. Khớp khẩu vị trước, rẻ hơn khi hoà. Không vượt ngân sách. */
export function compose(input: ComposeInput): ComposeResult {
  const pool = DISHES.filter((d) => !(input.noShellfish && d.shellfish));
  const mainsWanted = mainsFor(input.guests);
  if (pool.length === 0) return { picks: [], total: 0, short: false, empty: true, mainsWanted };

  const byCourse = (c: Course) =>
    pool
      .filter((d) => d.course === c)
      .sort((a, b) => score(b, input.tastes) - score(a, input.tastes) || a.price - b.price);

  const cheapest = (c: Course) => Math.min(...pool.filter((d) => d.course === c).map((d) => d.price), Infinity);

  const slots: Course[] = ["chinh", "rau", ...Array<Course>(Math.max(0, mainsWanted - 1)).fill("chinh"), "khai-vi", ...(input.guests >= 4 ? (["no"] as Course[]) : [])];
  const picks: Dish[] = [];
  let remaining = input.budget;
  let short = false;

  slots.forEach((course, i) => {
    const required = course === "chinh" || course === "rau";
    // dành chỗ cho các ô bắt buộc phía sau
    const reserve = slots
      .slice(i + 1)
      .filter((c) => c === "chinh" || c === "rau")
      .reduce((s, c) => s + (isFinite(cheapest(c)) ? cheapest(c) : 0), 0);
    const cand = byCourse(course).find((d) => !picks.includes(d) && d.price <= remaining - (required ? 0 : reserve));
    if (cand) {
      picks.push(cand);
      remaining -= cand.price;
    } else if (required && course === "chinh") {
      short = true;
    }
  });

  const total = picks.reduce((s, d) => s + d.price, 0);
  return { picks, total, short, empty: false, mainsWanted };
}
