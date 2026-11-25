import { type ISODate, compareISO, diffDays, eachNight, weekday } from "./dates";
import { blockedNights, DEMO_TODAY, LAST_BOOKABLE } from "./availability";
import { type RoomId, getRoom } from "./rooms";

export type Season = "low" | "shoulder" | "high" | "holiday";

export const SEASON_LABEL: Record<Season, string> = {
  low: "Mùa thấp",
  shoulder: "Mùa thường",
  high: "Mùa cao",
  holiday: "Dịp lễ, Tết",
};

export const SEASON_MULT: Record<Season, number> = { low: 0.85, shoulder: 1, high: 1.3, holiday: 1.55 };
export const WEEKEND_MULT = 1.18;
export const SERVICE_RATE = 0.05;
export const CLEANING_FEE = 300_000;
export const CLEANING_FEE_VILLA = 800_000;
export const MAX_NIGHTS = 30;

/** Dịp lễ, Tết giả định: [từ, đến] gồm cả hai đầu. */
export const HOLIDAYS: readonly (readonly [ISODate, ISODate, string])[] = [
  ["2026-12-30", "2027-01-03", "Tết Dương lịch"],
  ["2027-02-04", "2027-02-14", "Tết Nguyên đán"],
  ["2027-04-29", "2027-05-03", "30/4 – 1/5"],
  ["2027-08-31", "2027-09-03", "Quốc khánh 2/9"],
];

export function holidayName(night: ISODate): string | null {
  for (const [a, b, name] of HOLIDAYS) if (compareISO(night, a) >= 0 && compareISO(night, b) <= 0) return name;
  return null;
}

export function seasonOf(night: ISODate): Season {
  if (holidayName(night)) return "holiday";
  const m = Number(night.slice(5, 7));
  if (m >= 5 && m <= 8) return "high";
  if (m === 9 || (m >= 2 && m <= 4)) return "shoulder";
  return "low"; // 10, 11, 12, 1
}

/** Đêm cuối tuần = đêm thứ sáu và thứ bảy (người ở ngủ qua đêm đó). */
export function isWeekendNight(night: ISODate): boolean {
  const d = weekday(night);
  return d === 5 || d === 6;
}

/** Làm tròn về 10.000 đ gần nhất cho giá hiển thị gọn. */
function round10k(v: number): number {
  return Math.round(v / 10_000) * 10_000;
}

export function nightRate(room: RoomId, night: ISODate): number {
  const base = getRoom(room).basePrice;
  const mult = SEASON_MULT[seasonOf(night)] * (isWeekendNight(night) ? WEEKEND_MULT : 1);
  return round10k(base * mult);
}

export function longStayDiscountPct(nights: number): number {
  if (nights >= 7) return 12;
  if (nights >= 5) return 8;
  if (nights >= 3) return 5;
  return 0;
}

export interface NightLine {
  date: ISODate;
  season: Season;
  holiday: string | null;
  weekend: boolean;
  /** đơn giá 1 phòng / đêm */
  unitRate: number;
  /** đơn giá × số phòng */
  rate: number;
  /** phụ thu khách thêm của đêm đó */
  extra: number;
}

export interface Quote {
  room: RoomId;
  qty: number;
  guests: number;
  checkIn: ISODate;
  checkOut: ISODate;
  nights: number;
  lines: NightLine[];
  roomSubtotal: number;
  discountPct: number;
  discount: number;
  extraGuests: number;
  extraTotal: number;
  service: number;
  cleaning: number;
  total: number;
  perNight: number;
}

export type QuoteErrorCode =
  | "no-dates"
  | "bad-range"
  | "past"
  | "too-far"
  | "too-long"
  | "blocked"
  | "min-nights"
  | "guests"
  | "qty";

export interface QuoteError {
  code: QuoteErrorCode;
  message: string;
  /** các đêm liên quan (ví dụ đêm kín) */
  nights?: ISODate[];
  minNights?: number;
}

export type QuoteResult = { ok: true; quote: Quote } | { ok: false; error: QuoteError };

export interface QuoteInput {
  room: RoomId;
  checkIn: ISODate | null;
  checkOut: ISODate | null;
  guests: number;
  qty: number;
  today?: ISODate;
}

/** Số đêm tối thiểu theo luật: hạng phòng, có đêm cuối tuần (2), có đêm lễ (3). */
export function requiredMinNights(room: RoomId, nights: readonly ISODate[]): number {
  let min = getRoom(room).minNights;
  if (nights.some(isWeekendNight)) min = Math.max(min, 2);
  if (nights.some((n) => holidayName(n))) min = Math.max(min, 3);
  return min;
}

export function computeQuote(input: QuoteInput): QuoteResult {
  const today = input.today ?? DEMO_TODAY;
  const { room, checkIn, checkOut, guests } = input;
  const type = getRoom(room);
  if (!checkIn || !checkOut) return { ok: false, error: { code: "no-dates", message: "Chọn ngày nhận và trả phòng trên lịch để xem giá." } };
  const nights = diffDays(checkIn, checkOut);
  if (nights < 1) return { ok: false, error: { code: "bad-range", message: "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 đêm." } };
  if (compareISO(checkIn, today) < 0) return { ok: false, error: { code: "past", message: "Ngày nhận phòng đã qua. Hãy chọn ngày từ hôm nay trở đi." } };
  if (compareISO(checkOut, LAST_BOOKABLE) > 0) return { ok: false, error: { code: "too-far", message: "Lịch hiện chỉ mở đến cuối tháng 11/2027." } };
  if (nights > MAX_NIGHTS) return { ok: false, error: { code: "too-long", message: `Mỗi lần xem giá tối đa ${MAX_NIGHTS} đêm. Với kỳ lưu trú dài hơn, hãy nhờ tư vấn.` } };
  const qty = room === "tron-villa" ? 1 : input.qty;
  if (!Number.isInteger(qty) || qty < 1 || qty > type.units) return { ok: false, error: { code: "qty", message: `Số phòng phải từ 1 đến ${type.units}.` } };
  const capacity = qty * type.maxGuests;
  if (!Number.isInteger(guests) || guests < 1 || guests > capacity) {
    return { ok: false, error: { code: "guests", message: `${type.name} nhận tối đa ${capacity} khách cho ${qty} phòng. Số khách phải từ 1 đến ${capacity}.` } };
  }
  const nightList = eachNight(checkIn, checkOut);
  const blocked = blockedNights(room, checkIn, checkOut, today);
  if (blocked.length) {
    return { ok: false, error: { code: "blocked", message: `Có ${blocked.length} đêm đã kín trong khoảng này.`, nights: blocked } };
  }
  const min = requiredMinNights(room, nightList);
  if (nights < min) {
    return { ok: false, error: { code: "min-nights", message: `Khoảng ngày này cần ở tối thiểu ${min} đêm (đêm cuối tuần: 2, dịp lễ: 3).`, minNights: min } };
  }

  const extraGuests = Math.max(0, guests - qty * type.baseGuests);
  const lines: NightLine[] = nightList.map((date) => {
    const unitRate = nightRate(room, date);
    return {
      date,
      season: seasonOf(date),
      holiday: holidayName(date),
      weekend: isWeekendNight(date),
      unitRate,
      rate: unitRate * qty,
      extra: extraGuests * type.extraGuestFee,
    };
  });
  const roomSubtotal = lines.reduce((s, l) => s + l.rate, 0);
  const extraTotal = lines.reduce((s, l) => s + l.extra, 0);
  const discountPct = longStayDiscountPct(nights);
  const discount = Math.round((roomSubtotal * discountPct) / 100 / 1000) * 1000;
  const service = Math.round(((roomSubtotal - discount + extraTotal) * SERVICE_RATE) / 1000) * 1000;
  const cleaning = room === "tron-villa" ? CLEANING_FEE_VILLA : CLEANING_FEE * qty;
  const total = roomSubtotal - discount + extraTotal + service + cleaning;
  return {
    ok: true,
    quote: {
      room, qty, guests, checkIn, checkOut, nights, lines,
      roomSubtotal, discountPct, discount, extraGuests, extraTotal, service, cleaning, total,
      perNight: Math.round(total / nights / 1000) * 1000,
    },
  };
}

export function formatVND(v: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(v).replace(/\s/g, " ");
}
