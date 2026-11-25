/**
 * Sơ đồ chỗ ngồi Ô Lưới: hình học SVG + mật độ thường gặp theo ngày/giờ.
 * Thuần hàm, không phụ thuộc React. Trạng thái là mật độ thường gặp (xác định theo ngày + giờ), không phải dữ liệu đặt chỗ trực tiếp.
 */

export type ZoneId = "A" | "B" | "C" | "D" | "E";
export type SeatKind = "hot" | "fixed" | "meeting" | "private";
export type SeatState = "free" | "busy" | "held";

export type Seat = {
  id: string;
  zone: ZoneId;
  kind: SeatKind;
  x: number;
  y: number;
  w: number;
  h: number;
  /** số chỗ ngồi (phòng) */
  cap: number;
  /** nhóm liền kề (cùng dãy bàn / cùng hàng) để gợi ý chỗ ngồi gần nhau */
  group: string;
  note: string;
};

export const MAP_W = 960;
export const MAP_H = 560;
export const CELL = 40;
export const ORIGIN = 40;

export const HOURS_MIN = 7;
export const HOURS_MAX = 21;

export const ZONES: { id: ZoneId; name: string; kind: SeatKind | "service"; x: number; y: number; w: number; h: number; label: string }[] = [
  { id: "A", name: "Khu mở", kind: "hot", x: 60, y: 62, w: 500, h: 250, label: "A · KHU MỞ · HOT DESK" },
  { id: "B", name: "Bàn cố định", kind: "fixed", x: 590, y: 62, w: 310, h: 250, label: "B · BÀN CỐ ĐỊNH" },
  { id: "C", name: "Phòng họp", kind: "meeting", x: 60, y: 336, w: 290, h: 170, label: "C · PHÒNG HỌP" },
  { id: "D", name: "Phòng riêng", kind: "private", x: 372, y: 336, w: 420, h: 170, label: "D · PHÒNG RIÊNG" },
  { id: "E", name: "Cà phê và in ấn", kind: "service", x: 810, y: 336, w: 90, h: 170, label: "E · CÀ PHÊ" },
];

function build(): Seat[] {
  const seats: Seat[] = [];
  // Zone A: 4 dãy bàn, mỗi dãy hai hàng 5 chỗ (40 chỗ hot desk)
  const benchesX = [80, 330];
  const benchesY = [92, 214];
  let n = 1;
  benchesX.forEach((bx, bi) => {
    benchesY.forEach((by, bj) => {
      const group = `A${bi}${bj}`;
      for (const [row, dy] of [["t", 0], ["b", 58]] as const) {
        for (let i = 0; i < 5; i++) {
          const id = `A-${String(n).padStart(2, "0")}`;
          seats.push({
            id, zone: "A", kind: "hot", x: bx + i * 44, y: by + dy, w: 34, h: 26, cap: 1, group: `${group}${row}`,
            note: bi === 0 && bj === 0 ? "Gần cửa sổ lớn" : bi === 1 && bj === 1 ? "Gần khu cà phê" : "Dãy bàn chung",
          });
          n++;
        }
      }
    });
  });
  // Zone B: 16 bàn cố định (4 x 4)
  let f = 1;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      seats.push({
        id: `B-${String(f).padStart(2, "0")}`, zone: "B", kind: "fixed", x: 606 + c * 72, y: 80 + r * 56, w: 60, h: 40, cap: 1, group: `B${r}`,
        note: c === 3 ? "Sát tường, có tủ cá nhân" : "Có tủ cá nhân và ổ cắm riêng",
      });
      f++;
    }
  }
  // Zone C: 2 phòng họp
  seats.push({ id: "M-1", zone: "C", kind: "meeting", x: 76, y: 356, w: 100, h: 134, cap: 6, group: "C", note: "Màn hình trình chiếu, bảng viết" });
  seats.push({ id: "M-2", zone: "C", kind: "meeting", x: 192, y: 356, w: 142, h: 134, cap: 10, group: "C", note: "Màn hình trình chiếu, bảng viết, vách kính" });
  // Zone D: 4 phòng riêng
  const rooms: [string, number, number][] = [["P-1", 388, 2], ["P-2", 462, 4], ["P-3", 556, 6], ["P-4", 670, 8]];
  const widths = [64, 86, 106, 106];
  rooms.forEach(([id, x, cap], i) =>
    seats.push({ id, zone: "D", kind: "private", x, y: 356, w: widths[i], h: 134, cap, group: "D", note: `Phòng ${cap} chỗ, khoá riêng` }),
  );
  return seats;
}

export const SEATS: Seat[] = build();
export const SEAT_BY_ID: Record<string, Seat> = Object.fromEntries(SEATS.map((s) => [s.id, s]));

/* ------------------------------------------------------------------ mật độ */

/** hash xác định 0..1 */
export function rnd(...parts: (string | number)[]): number {
  let h = 2166136261;
  const s = parts.join("|");
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 13;
  h = Math.imul(h, 1274126177);
  h ^= h >>> 16;
  return ((h >>> 0) % 100000) / 100000;
}

/** đường cong mật độ thường gặp, 7h..21h */
const CURVE = [0.1, 0.34, 0.6, 0.76, 0.7, 0.46, 0.5, 0.7, 0.78, 0.66, 0.46, 0.32, 0.24, 0.17, 0.1];
/** 0 = Thứ 2 ... 6 = Chủ nhật */
const DAY_FACTOR = [0.95, 1.05, 1.1, 1.05, 0.9, 0.5, 0.28];

export const DAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
export const DAY_NAMES = ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"];

export function density(day: number, hour: number): number {
  const i = Math.min(HOURS_MAX, Math.max(HOURS_MIN, hour)) - HOURS_MIN;
  return Math.min(0.95, CURVE[i] * DAY_FACTOR[day]);
}

export function stateOf(seat: Seat, day: number, hour: number): SeatState {
  const p = density(day, hour);
  if (seat.kind === "hot") return rnd(seat.id, day) < p ? "busy" : "free";
  if (seat.kind === "fixed") {
    const owned = !FIXED_FREE.has(seat.id);
    if (!owned) return "free";
    return rnd(seat.id, day, "in") < Math.min(0.95, p * 1.25) ? "busy" : "held";
  }
  if (seat.kind === "meeting") {
    const open = hour >= 8 && hour <= 20;
    return open && rnd(seat.id, day, hour) < 0.18 + p * 0.5 ? "busy" : "free";
  }
  // phòng riêng: P-1, P-3 đã thuê dài hạn; P-2, P-4 còn trống để thuê
  if (seat.id === "P-1" || seat.id === "P-3") return rnd(seat.id, day, "in") < p * 1.1 ? "busy" : "held";
  return "free";
}

/** bàn cố định chưa có người thuê (còn cho thuê) */
const FIXED_FREE = new Set(["B-03", "B-04", "B-09", "B-10", "B-13", "B-14", "B-15"]);

export const STATE_LABEL: Record<SeatState, string> = { free: "Trống", busy: "Đang dùng", held: "Đã giữ chỗ" };

/** giờ kế tiếp (trong 7..21) mà trạng thái đổi; null nếu không đổi tới hết ngày */
export function nextChange(seat: Seat, day: number, hour: number): number | null {
  const cur = stateOf(seat, day, hour);
  for (let h = hour + 1; h <= HOURS_MAX; h++) if (stateOf(seat, day, h) !== cur) return h;
  return null;
}

export function countsFor(zone: ZoneId, day: number, hour: number) {
  const c = { free: 0, busy: 0, held: 0, total: 0 };
  for (const s of SEATS) {
    if (s.zone !== zone) continue;
    c[stateOf(s, day, hour)]++;
    c.total++;
  }
  return c;
}

/** chỗ trống suốt khung giờ [from, to) */
export function freeThrough(seat: Seat, day: number, from: number, to: number): boolean {
  for (let h = from; h < to; h++) if (stateOf(seat, day, h) !== "free") return false;
  return true;
}

export function colLetter(x: number): string {
  const i = Math.max(0, Math.min(21, Math.floor((x - ORIGIN) / CELL)));
  return String.fromCharCode(65 + i);
}
export function rowNumber(y: number): number {
  return Math.max(1, Math.min(12, Math.floor((y - ORIGIN) / CELL) + 1));
}
export function cellOf(x: number, y: number): string {
  return `${colLetter(x)}${rowNumber(y)}`;
}

/** Vietnam time (UTC+7, không DST) */
export function vnNow(now = new Date()) {
  const t = new Date(now.getTime() + 7 * 3600 * 1000);
  const js = t.getUTCDay();
  return { day: (js + 6) % 7, hour: t.getUTCHours(), minute: t.getUTCMinutes(), second: t.getUTCSeconds() };
}
