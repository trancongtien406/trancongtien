const TZ = "Asia/Ho_Chi_Minh";

export type VnNow = { date: string; minutes: number };

/** Ngày + phút trong ngày theo giờ Việt Nam (không dùng toISOString). */
export function getVnNow(now: Date = new Date()): VnNow {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return { date: `${g("year")}-${g("month")}-${g("day")}`, minutes: Number(g("hour")) * 60 + Number(g("minute")) };
}

export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}-${String(t.getUTCDate()).padStart(2, "0")}`;
}

export function diffDays(from: string, to: string): number {
  const f = (s: string) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((f(to) - f(from)) / 86400000);
}

const WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
export function describeDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { weekday: WD[wd], day: String(d).padStart(2, "0"), month: `Th.${m}`, long: `${WD[wd]}, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}` };
}
