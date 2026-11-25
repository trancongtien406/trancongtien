/**
 * Giờ hoàng hôn xấp xỉ cho Đà Nẵng (16.05°N, 108.2°E) theo thuật toán Almanac (độ chính xác vài phút).
 * Không hardcode: tính theo ngày hiện tại.
 */
const RAD = Math.PI / 180;
const LAT = 16.054;
const LON = 108.202;
const TZ = 7;

const dayOfYear = (y: number, m: number, d: number) => {
  const a = Date.UTC(y, m, d), b = Date.UTC(y, 0, 0);
  return Math.floor((a - b) / 86_400_000);
};

/** Hoàng hôn của ngày địa phương (y, m0, d) → timestamp ms (UTC). */
export function sunsetOf(y: number, m0: number, d: number): number {
  const N = dayOfYear(y, m0, d);
  const lngHour = LON / 15;
  const t = N + (18 - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  let L = M + 1.916 * Math.sin(M * RAD) + 0.02 * Math.sin(2 * M * RAD) + 282.634;
  L = ((L % 360) + 360) % 360;
  let RA = Math.atan(0.91764 * Math.tan(L * RAD)) / RAD;
  RA = ((RA % 360) + 360) % 360;
  RA += Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90;
  RA /= 15;
  const sinDec = 0.39782 * Math.sin(L * RAD);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(90.833 * RAD) - sinDec * Math.sin(LAT * RAD)) / (cosDec * Math.cos(LAT * RAD));
  const H = Math.acos(Math.max(-1, Math.min(1, cosH))) / RAD / 15;
  const T = H + RA - 0.06571 * t - 6.622;
  const UT = (((T - lngHour) % 24) + 24) % 24;
  // Hoàng hôn Đà Nẵng rơi vào khoảng 10-11h UTC cùng ngày UTC với ngày địa phương.
  return Date.UTC(y, m0, d) + UT * 3_600_000;
}

export type SunState = { phase: "before" | "during" | "after"; remainingMs: number; sunsetMs: number; progress: number };

/** Ngày địa phương (UTC+7) của một timestamp. */
const localParts = (ms: number) => {
  const d = new Date(ms + TZ * 3_600_000);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate() };
};

export function sunState(now: number): SunState {
  const p = localParts(now);
  let sunset = sunsetOf(p.y, p.m, p.d);
  const WINDOW = 40 * 60_000; // "Hoàng hôn đang bắt đầu" trong 40 phút sau mốc
  if (now >= sunset + WINDOW) {
    const n = localParts(now + 86_400_000);
    sunset = sunsetOf(n.y, n.m, n.d);
  }
  const remaining = sunset - now;
  const phase = remaining > 0 ? "before" : "during";
  const sunrise = sunset - 11.6 * 3_600_000;
  const progress = Math.min(1, Math.max(0, (now - sunrise) / (sunset - sunrise)));
  return { phase, remainingMs: Math.max(0, remaining), sunsetMs: sunset, progress };
}

export const hhmm = (ms: number) => {
  const d = new Date(ms + TZ * 3_600_000);
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
};
