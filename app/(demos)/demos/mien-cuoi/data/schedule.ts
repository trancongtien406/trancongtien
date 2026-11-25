/** Appointment Scheduler: dữ liệu mock + thuật toán lịch (phút từ đầu ngày). Không có đặt lịch thật. */
export type Interval = { start: number; end: number };

export const SERVICES = [
  { id: "checkup", name: "Khám tổng quát", duration: 30, price: "150000" },
  { id: "hygiene", name: "Tư vấn vệ sinh răng miệng", duration: 30, price: "300000-600000" },
  { id: "restoration", name: "Tư vấn phục hồi", duration: 30, price: null },
  { id: "orthodontics", name: "Tư vấn chỉnh nha", duration: 45, price: "250000" },
  { id: "whitening", name: "Tư vấn tẩy trắng", duration: 30, price: null },
  { id: "pain", name: "Khám đau, ê buốt", duration: 30, price: "200000" },
  { id: "extraction", name: "Tư vấn nhổ răng", duration: 45, price: "200000" },
] as const;
export type ServiceId = (typeof SERVICES)[number]["id"];

export const DOCTORS = [
  { id: "minh-an", name: "BS. Minh An", role: "Nha khoa tổng quát", services: ["checkup", "hygiene", "pain"], days: [1, 2, 3, 4, 5, 6], dayLabel: "Thứ 2 đến Thứ 7" },
  { id: "thanh-lam", name: "BS. Thanh Lam", role: "Tư vấn chỉnh nha", services: ["orthodontics", "whitening"], days: [1, 3, 5], dayLabel: "Thứ 2, 4, 6" },
  { id: "hoai-nam", name: "BS. Hoài Nam", role: "Tư vấn phục hồi răng", services: ["restoration", "extraction", "pain"], days: [2, 4, 6], dayLabel: "Thứ 3, 5, 7" },
] as const;
export type DoctorId = (typeof DOCTORS)[number]["id"] | "any";

export const WINDOWS: Interval[] = [{ start: 480, end: 690 }, { start: 810, end: 1020 }];
const t = (h: number, m = 0) => h * 60 + m;
const PATTERNS: Interval[][] = [
  [{ start: t(9), end: t(9, 45) }, { start: t(15), end: t(16) }],
  [{ start: t(8, 30), end: t(9, 30) }, { start: t(14), end: t(14, 45) }],
  [{ start: t(10), end: t(11) }, { start: t(16), end: t(17) }],
  [{ start: t(8), end: t(11, 30) }, { start: t(13, 30), end: t(17) }], // D: ngày hết lịch
];

export function overlaps(a: Interval, b: Interval) { return a.start < b.end && b.start < a.end; }

export function generateSlots(duration: number, windows: Interval[], blocked: Interval[], earliestStart = 0): Interval[] {
  if (!Number.isInteger(duration) || duration <= 0) return [];
  const out: Interval[] = [];
  for (const w of windows) {
    for (let start = w.start; start + duration <= w.end; start += 15) {
      const slot = { start, end: start + duration };
      if (start < earliestStart) continue;
      if (blocked.some((b) => overlaps(b, slot))) continue;
      out.push(slot);
    }
  }
  return out;
}

/** Hash xác định (không Math.random) theo `${doctorId}:${dateISO}`. */
function hash(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
export function blockedFor(doctorId: string, dateISO: string): Interval[] {
  const h = hash(`${doctorId}:${dateISO}`);
  const n = h % 11;
  const p = n === 0 ? 3 : n % 3; // pattern D hiếm (1/11)
  return PATTERNS[p];
}

export function weekday(dateISO: string) { const [y, m, d] = dateISO.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); }
export function eligibleDoctors(serviceId: string) { return DOCTORS.filter((d) => (d.services as readonly string[]).includes(serviceId)); }
export function doctorsWorking(serviceId: string, dateISO: string, doctorId: DoctorId) {
  const wd = weekday(dateISO);
  return eligibleDoctors(serviceId).filter((d) => (doctorId === "any" || d.id === doctorId) && (d.days as readonly number[]).includes(wd));
}

/** Slot trong ngày, mỗi slot kèm danh sách bác sĩ còn trống. earliestStart: phút (áp cho hôm nay). */
export function slotsForDay(serviceId: string, dateISO: string, doctorId: DoctorId, earliestStart: number) {
  const svc = SERVICES.find((s) => s.id === serviceId);
  if (!svc) return { status: "none" as const, slots: [] as { slot: Interval; doctors: string[] }[] };
  const docs = doctorsWorking(serviceId, dateISO, doctorId);
  if (docs.length === 0) return { status: "off" as const, slots: [] };
  const map = new Map<number, { slot: Interval; doctors: string[] }>();
  for (const d of docs) {
    for (const s of generateSlots(svc.duration, WINDOWS, blockedFor(d.id, dateISO), earliestStart)) {
      const e = map.get(s.start) ?? { slot: s, doctors: [] };
      e.doctors.push(d.id); map.set(s.start, e);
    }
  }
  const slots = [...map.values()].sort((a, b) => a.slot.start - b.slot.start);
  return { status: slots.length ? ("ok" as const) : ("full" as const), slots };
}

export const fmtTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Thời điểm hiện tại theo Asia/Ho_Chi_Minh. */
export function nowHCM(base = new Date()) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(base);
  const g = (k: string) => p.find((x) => x.type === k)!.value;
  return { dateISO: `${g("year")}-${g("month")}-${g("day")}`, minutes: Number(g("hour")) * 60 + Number(g("minute")) };
}
export function addDays(dateISO: string, n: number) {
  const [y, m, d] = dateISO.split("-").map(Number); const dt = new Date(Date.UTC(y, m - 1, d + n));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}
export const WEEKDAY_VI = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
export const WEEKDAY_LONG = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
export function fmtDate(dateISO: string) { const [, m, d] = dateISO.split("-"); return `${d}/${m}`; }
