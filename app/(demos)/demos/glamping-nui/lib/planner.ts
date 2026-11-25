import { ACTIVITIES, TENTS, type Activity, type Tent } from "../data/content";

export type ActivityId = Activity["id"];
export type PlanInput = { nights: 1 | 2 | 3; tent: Tent["id"] | null; people: number; activities: ActivityId[]; extraTents: boolean };

export type PlanIssue = { field: "tent" | "people"; message: string };
export type Line = { label: string; amount: number };
export type Slot = { time: string; title: string; note?: string; activity?: ActivityId };
export type Day = { title: string; slots: Slot[] };
export type Plan = {
  issues: PlanIssue[];
  warnings: string[];
  tent: Tent | null;
  tentsNeeded: number;
  lines: Line[];
  total: number;
  days: Day[];
};

export const MAX_PEOPLE = 8;
const tentOf = (id: PlanInput["tent"]) => TENTS.find((t) => t.id === id) ?? null;
const actOf = (id: ActivityId) => ACTIVITIES.find((a) => a.id === id)!;

export function buildPlan(input: PlanInput): Plan {
  const issues: PlanIssue[] = [];
  const warnings: string[] = [];
  const tent = tentOf(input.tent);
  const people = input.people;
  if (!tent) issues.push({ field: "tent", message: "Vui lòng chọn loại lều để tiếp tục." });
  if (!Number.isFinite(people) || people < 1) issues.push({ field: "people", message: "Số người cần lớn hơn 0." });
  else if (people > MAX_PEOPLE) issues.push({ field: "people", message: "Số lượng khách này cần được tư vấn riêng." });
  if (issues.length) return { issues, warnings, tent, tentsNeeded: 0, lines: [], total: 0, days: [] };

  const t = tent!;
  const over = people > t.cap;
  const tentsNeeded = over && input.extraTents ? Math.ceil(people / t.cap) : 1;
  if (over && !input.extraTents) warnings.push("Số người đang vượt sức chứa tham khảo của loại lều này. Bạn có thể ghép thêm lều bên dưới.");
  if (input.activities.length === 0) warnings.push("Chưa có hoạt động nào được chọn. Bạn vẫn có thể tiếp tục với lịch trình nghỉ ngơi.");

  const lines: Line[] = [{ label: `${t.name}${tentsNeeded > 1 ? ` × ${tentsNeeded} lều` : ""} × ${input.nights} đêm`, amount: t.price * tentsNeeded * input.nights }];
  for (const id of input.activities) {
    const a = actOf(id);
    lines.push({ label: `${a.name} × ${people} người`, amount: a.price * people });
  }
  const total = lines.reduce((s, l) => s + l.amount, 0);
  return { issues, warnings, tent: t, tentsNeeded, lines, total, days: buildDays(input) };
}

const has = (input: PlanInput, id: ActivityId) => input.activities.includes(id);

/** Mỗi hoạt động chỉ xếp một lần, không trùng giờ. */
function buildDays(input: PlanInput): Day[] {
  const n = input.nights;
  const days: Day[] = [];
  const free = (time: string, note: string): Slot => ({ time, title: "Thời gian tự do", note });

  // Ngày 1
  const d1: Slot[] = [
    { time: "15:00", title: "Nhận lều, nghỉ ngơi", note: "Làm quen khu lều, uống một ly trà nóng." },
    { time: "16:30", title: "Ngắm hoàng hôn", note: "Đi dạo gần khu lều khi nắng chuyển màu." },
    has(input, "bbq")
      ? { time: "19:00", title: "BBQ và lửa trại", note: "Cùng chuẩn bị và nướng ngoài trời.", activity: "bbq" }
      : { time: "19:00", title: "Bữa tối bên lửa", note: "Bữa tối nhẹ, ngồi lại quanh bếp lửa." },
  ];
  const starsDay = n === 1 ? 1 : 2; // ngày diễn ra "đêm sao"
  if (has(input, "stars") && starsDay === 1) d1.push({ time: "21:00", title: "Ngắm sao", note: "Tắt bớt đèn, tìm góc tối để nhìn trời.", activity: "stars" });
  else d1.push({ time: "21:00", title: "Nghỉ đêm", note: "Về lều, nghe tiếng rừng." });
  days.push({ title: "Ngày 1 · Về với rừng", slots: d1 });

  // Ngày giữa
  for (let k = 2; k <= n; k++) {
    const s: Slot[] = [{ time: "07:00", title: "Bữa sáng", note: "Cà phê và bữa sáng ngoài trời." }];
    if (k === 2) {
      if (has(input, "trek")) s.push({ time: "09:00", title: "Trekking nhẹ", note: "Theo lối mòn trong rừng, có người dẫn.", activity: "trek" });
      else s.push(free("09:00", "Dạo quanh khu lều hoặc đọc sách."));
      if (has(input, "atv")) s.push({ time: "14:00", title: "Xe địa hình theo tuyến", note: "Tuỳ điều kiện đường và thời tiết.", activity: "atv" });
      else s.push({ time: "14:00", title: "Nghỉ ngơi bên võng", note: "Đọc sách, ngủ trưa, nghe gió." });
    } else {
      s.push(free("09:00", "Chọn một buổi chậm: võng, trà, hoặc đi dạo."));
      s.push({ time: "14:00", title: "Thư giãn", note: "Nghỉ ngơi tại lều." });
    }
    s.push({ time: "16:30", title: "Ngắm hoàng hôn", note: "Nắng cuối ngày trên triền núi." });
    s.push(k === 2 && n >= 2 && has(input, "stars")
      ? { time: "19:00", title: "Bữa tối", note: "Ăn sớm để còn thời gian ngắm sao." }
      : { time: "19:00", title: "Bữa tối bên lửa", note: "Ngồi lại, kể chuyện." });
    if (k === 2 && has(input, "stars") && starsDay === 2) s.push({ time: "21:00", title: "Ngắm sao", note: "Tắt bớt đèn, tìm góc tối để nhìn trời.", activity: "stars" });
    else s.push({ time: "21:00", title: "Nghỉ đêm", note: "Về lều sớm để thức dậy cùng sương." });
    days.push({ title: `Ngày ${k} · ${k === 2 ? "Đi sâu vào rừng" : "Một ngày chậm"}`, slots: s });
  }

  // Ngày cuối
  const last: Slot[] = [
    { time: "06:00", title: "Đón bình minh", note: "Mở cửa lều, ngắm sương lên." },
    { time: "07:30", title: "Bữa sáng", note: "Cà phê nóng và bữa sáng giản dị." },
  ];
  if (n === 1) {
    if (has(input, "trek")) last.push({ time: "08:30", title: "Trekking nhẹ", note: "Một vòng ngắn quanh khu lều.", activity: "trek" });
    if (has(input, "atv")) last.push({ time: "09:30", title: "Xe địa hình theo tuyến", note: "Tuỳ điều kiện đường và thời tiết.", activity: "atv" });
  }
  last.push({ time: "11:00", title: "Thu dọn, trả lều", note: "Chia tay khu rừng." });
  days.push({ title: `Ngày ${n + 1} · Chào buổi sáng`, slots: last });
  return days;
}

export function summaryText(input: PlanInput, plan: Plan, fmt: (n: number) => string): string {
  if (!plan.tent) return "";
  const out = [`Chuyến đi Rừng Thức: ${input.nights} đêm · ${plan.tent.name} · ${input.people} người`];
  out.push(`Hoạt động: ${input.activities.length ? input.activities.map((id) => actOf(id).name).join(", ") : "nghỉ ngơi, không thêm hoạt động"}`);
  for (const d of plan.days) {
    out.push("", d.title);
    for (const s of d.slots) out.push(`${s.time ? s.time + " " : ""}${s.title}`);
  }
  out.push("", ...plan.lines.map((l) => `${l.label}: ${fmt(l.amount)}`), `Tổng tham khảo: ${fmt(plan.total)}`);
  return out.join("\n");
}
