/**
 * Ngày thuần (không múi giờ): chuỗi ISO "YYYY-MM-DD", tính bằng UTC để tránh lệch DST/múi giờ.
 * Toàn bộ module là hàm thuần, không đụng DOM/Date.now().
 */
export type ISODate = string;

const MS_DAY = 86_400_000;

export function parseISO(iso: ISODate): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toISO(date: Date): ISODate {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function makeISO(year: number, month1: number, day: number): ISODate {
  return toISO(new Date(Date.UTC(year, month1 - 1, day)));
}

export function addDays(iso: ISODate, n: number): ISODate {
  return toISO(new Date(parseISO(iso).getTime() + n * MS_DAY));
}

/** Số đêm từ `from` đến `to` (to là ngày trả phòng). Âm nếu to < from. */
export function diffDays(from: ISODate, to: ISODate): number {
  return Math.round((parseISO(to).getTime() - parseISO(from).getTime()) / MS_DAY);
}

/** 0 = Chủ nhật ... 6 = Thứ bảy */
export function weekday(iso: ISODate): number {
  return parseISO(iso).getUTCDay();
}

/** Thứ hai = 0 ... Chủ nhật = 6 (lịch kiểu Việt Nam, tuần bắt đầu thứ hai) */
export function weekdayMon0(iso: ISODate): number {
  return (weekday(iso) + 6) % 7;
}

export function daysInMonth(year: number, month1: number): number {
  return new Date(Date.UTC(year, month1, 0)).getUTCDate();
}

export function addMonths(year: number, month1: number, n: number): { year: number; month: number } {
  const idx = year * 12 + (month1 - 1) + n;
  return { year: Math.floor(idx / 12), month: (idx % 12) + 1 };
}

export function monthIndex(year: number, month1: number): number {
  return year * 12 + (month1 - 1);
}

export function eachNight(checkIn: ISODate, checkOut: ISODate): ISODate[] {
  const n = diffDays(checkIn, checkOut);
  const out: ISODate[] = [];
  for (let i = 0; i < n; i++) out.push(addDays(checkIn, i));
  return out;
}

export function compareISO(a: ISODate, b: ISODate): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

const WD = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
export function weekdayName(iso: ISODate): string {
  return WD[weekday(iso)];
}

/** "25/12/2026" */
export function formatVN(iso: ISODate): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** "T6, 25/12" */
export function formatShort(iso: ISODate): string {
  const [, m, d] = iso.split("-");
  const wd = weekday(iso);
  const label = wd === 0 ? "CN" : `T${wd + 1}`;
  return `${label}, ${d}/${m}`;
}
