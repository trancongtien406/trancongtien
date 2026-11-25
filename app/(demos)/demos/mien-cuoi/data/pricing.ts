export type PriceRow = { service: string; unit: string; min: number; max?: number };
export const PRICES: PriceRow[] = [
  { service: "Khám tổng quát", unit: "Lượt", min: 150000 },
  { service: "Vệ sinh răng miệng", unit: "Lượt", min: 300000, max: 600000 },
  { service: "Trám răng", unit: "Răng", min: 350000, max: 800000 },
  { service: "Khám đau, ê buốt", unit: "Lượt khám", min: 200000 },
  { service: "Tư vấn chỉnh nha", unit: "Lượt tư vấn", min: 250000 },
  { service: "Tẩy trắng răng", unit: "Liệu trình", min: 2000000, max: 3500000 },
  { service: "Tư vấn nhổ răng", unit: "Lượt tư vấn", min: 200000 },
];
const vnd = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
export const fmtVnd = (n: number) => vnd.format(n).replace(/\s/g, " ");
export function fmtRange(r: { min: number; max?: number }) { return r.max ? `${fmtVnd(r.min)} đến ${fmtVnd(r.max)}` : fmtVnd(r.min); }
/** Giá tham khảo cho dịch vụ trong Scheduler (null nếu chưa xác định). */
export function priceForService(id: string): string | null {
  const m: Record<string, string> = { checkup: "Khám tổng quát", hygiene: "Vệ sinh răng miệng", orthodontics: "Tư vấn chỉnh nha", pain: "Khám đau, ê buốt", extraction: "Tư vấn nhổ răng" };
  const row = PRICES.find((p) => p.service === m[id]);
  return row ? fmtRange(row) : null;
}
