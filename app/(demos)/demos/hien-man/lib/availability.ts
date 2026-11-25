import { type ISODate, addDays, compareISO, eachNight } from "./dates";
import { type RoomId, getRoom, ROOMS } from "./rooms";

/** Ngày tham chiếu cố định của demo (để SSR và client cho cùng kết quả). */
export const DEMO_TODAY: ISODate = "2026-11-25";
/** Lịch mở đặt đến hết ngày này (khoảng 12 tháng). */
export const LAST_BOOKABLE: ISODate = "2027-11-30";

/** Hash số nguyên xác định (không dùng Math.random) cho dữ liệu "đã đặt" giả định. */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 10_000;
}

/** Các đợt kín cứng (ví dụ bảo trì, sự kiện riêng) áp cho mọi loại phòng: [từ, đến] gồm cả hai đầu. */
export const HARD_BLOCKS: readonly (readonly [ISODate, ISODate, string])[] = [
  ["2026-12-06", "2026-12-07", "Bảo trì hồ bơi"],
];

/** Đêm kín toàn bộ villa theo dịp lễ/Tết: nhu cầu rất cao. */
const PEAK_FULL: readonly (readonly [ISODate, ISODate])[] = [
  ["2027-02-05", "2027-02-08"],
];

/** Số đơn vị đã có người đặt vào đêm `night` (giả định, xác định). */
export function bookedUnits(room: RoomId, night: ISODate): number {
  const type = getRoom(room);
  for (const [a, b] of HARD_BLOCKS) if (compareISO(night, a) >= 0 && compareISO(night, b) <= 0) return type.units;
  for (const [a, b] of PEAK_FULL) if (compareISO(night, a) >= 0 && compareISO(night, b) <= 0) return type.units;
  const wd = new Date(`${night}T00:00:00Z`).getUTCDay();
  const weekend = wd === 5 || wd === 6;
  const r = hash(`${room}|${night}`) % 100;
  if (type.units === 1) return r < (weekend ? 16 : 6) ? 1 : 0;
  // Kín hết ~4% đêm thường / ~14% đêm cuối tuần; sắp kín, có khách một phần: tăng dần.
  const fullT = weekend ? 14 : 4;
  const fewT = fullT + (weekend ? 22 : 8);
  const midT = fewT + (weekend ? 20 : 10);
  if (r < fullT) return type.units;
  if (r < fewT) return type.units - 1;
  if (r < midT) return 1;
  return 0;
}

/** Số đơn vị còn trống. "Bao trọn villa" chỉ trống khi mọi phòng khác cũng trống. */
export function unitsLeft(room: RoomId, night: ISODate): number {
  const type = getRoom(room);
  if (room === "tron-villa") {
    const anyBooked = ROOMS.filter((r) => r.id !== "tron-villa").some((r) => bookedUnits(r.id, night) > 0);
    return anyBooked ? 0 : bookedUnits("tron-villa", night) >= 1 ? 0 : 1;
  }
  const left = type.units - bookedUnits(room, night);
  // nếu villa đã bị bao trọn thì không còn phòng lẻ
  return bookedUnits("tron-villa", night) >= 1 ? 0 : Math.max(0, left);
}

export type DayStatus = "past" | "out-of-range" | "full" | "few" | "open";

export function dayStatus(room: RoomId, night: ISODate, today: ISODate = DEMO_TODAY): DayStatus {
  if (compareISO(night, today) < 0) return "past";
  if (compareISO(night, LAST_BOOKABLE) > 0) return "out-of-range";
  const left = unitsLeft(room, night);
  if (left <= 0) return "full";
  const total = getRoom(room).units;
  return total > 1 && left === 1 ? "few" : "open";
}

export function isNightAvailable(room: RoomId, night: ISODate, today: ISODate = DEMO_TODAY): boolean {
  const s = dayStatus(room, night, today);
  return s === "open" || s === "few";
}

/** Các đêm kín trong khoảng [checkIn, checkOut). */
export function blockedNights(room: RoomId, checkIn: ISODate, checkOut: ISODate, today: ISODate = DEMO_TODAY): ISODate[] {
  return eachNight(checkIn, checkOut).filter((n) => !isNightAvailable(room, n, today));
}

/** Tìm đêm trống tiếp theo từ `from` (gồm `from`), tối đa 120 ngày. */
export function nextOpenNight(room: RoomId, from: ISODate, today: ISODate = DEMO_TODAY): ISODate | null {
  let d = from;
  for (let i = 0; i < 120; i++) {
    if (isNightAvailable(room, d, today)) return d;
    d = addDays(d, 1);
  }
  return null;
}

/** Số đêm liên tiếp có thể ở tối đa kể từ `checkIn` (dùng để gợi ý khi vướng ngày kín). */
export function maxStayFrom(room: RoomId, checkIn: ISODate, cap = 30, today: ISODate = DEMO_TODAY): number {
  let n = 0;
  let d = checkIn;
  while (n < cap && isNightAvailable(room, d, today)) {
    n++;
    d = addDays(d, 1);
  }
  return n;
}
