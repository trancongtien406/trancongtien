import {
  ACCESSORIES, BIKES, DELIVERIES, INSURANCES, MAX_DAYS,
  type Accessory, type Bike, type Delivery, type Insurance,
} from "../data/fleet";

/**
 * Logic giá thuê, thuần (không React, không DOM) để test được.
 * Quy tắc tiền xe: mỗi 7 ngày tính theo giá tuần; phần ngày lẻ tính theo giá ngày nhưng không bao giờ
 * vượt giá một tuần (ví dụ 6 ngày lẻ không đắt hơn 1 tuần). Giá tuần luôn rẻ hơn 7 lần giá ngày.
 */

export type PriceLine = {
  key: string;
  label: string;
  /** mô tả cách tính, ví dụ "2 tuần × 1.650.000" */
  detail: string;
  amount: number;
};

export type QuoteInput = {
  bikeId: string | null;
  days: number;
  deliveryId: string;
  accessoryIds: readonly string[];
  insuranceId: string;
};

export type QuoteError = "no-bike" | "bad-days" | "unknown";

export type Quote =
  | { ok: false; error: QuoteError; message: string }
  | {
      ok: true;
      bike: Bike;
      days: number;
      weeks: number;
      extraDays: number;
      /** true nếu phần ngày lẻ bị giới hạn bằng giá một tuần */
      capped: boolean;
      lines: PriceLine[];
      total: number;
      deposit: number;
      /** số tiền tiết kiệm so với tính toàn bộ theo giá ngày */
      saving: number;
      perDayAverage: number;
    };

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
const num = (n: number) => new Intl.NumberFormat("vi-VN").format(n);

export const getBike = (id: string | null | undefined): Bike | undefined => BIKES.find((b) => b.id === id);

/** Số ngày hợp lệ: số nguyên từ 1 đến MAX_DAYS. */
export const isValidDays = (d: number) => Number.isInteger(d) && d >= 1 && d <= MAX_DAYS;

/** Phân tách số ngày thành tuần + ngày lẻ và tính tiền xe. */
export function rentalCost(perDay: number, perWeek: number, days: number) {
  const weeks = Math.floor(days / 7);
  const extraDays = days % 7;
  const extraRaw = extraDays * perDay;
  const extra = Math.min(extraRaw, perWeek);
  return { weeks, extraDays, extra, capped: extraRaw > perWeek, amount: weeks * perWeek + extra, byDay: days * perDay };
}

export function buildQuote(input: QuoteInput): Quote {
  const bike = getBike(input.bikeId);
  if (!bike) return { ok: false, error: "no-bike", message: "Chọn một mẫu xe để xem bảng giá." };
  if (!isValidDays(input.days)) return { ok: false, error: "bad-days", message: `Số ngày thuê cần là số nguyên từ 1 đến ${MAX_DAYS}.` };

  const delivery: Delivery | undefined = DELIVERIES.find((d) => d.id === input.deliveryId);
  const insurance: Insurance | undefined = INSURANCES.find((i) => i.id === input.insuranceId);
  if (!delivery || !insurance) return { ok: false, error: "unknown", message: "Lựa chọn giao nhận hoặc bảo hiểm không hợp lệ." };

  const c = rentalCost(bike.perDay, bike.perWeek, input.days);
  const lines: PriceLine[] = [];
  if (c.weeks > 0) lines.push({ key: "weeks", label: `Thuê theo tuần`, detail: `${c.weeks} tuần × ${num(bike.perWeek)}`, amount: c.weeks * bike.perWeek });
  if (c.extraDays > 0) {
    lines.push({
      key: "days",
      label: c.weeks > 0 ? "Ngày lẻ" : "Thuê theo ngày",
      detail: c.capped ? `${c.extraDays} ngày × ${num(bike.perDay)}, tối đa bằng giá 1 tuần` : `${c.extraDays} ngày × ${num(bike.perDay)}`,
      amount: c.extra,
    });
  }
  lines.push({ key: "delivery", label: delivery.name, detail: delivery.price === 0 ? "Miễn phí" : "Một lần", amount: delivery.price });

  const seen = new Set<string>();
  const accs: Accessory[] = [];
  for (const id of input.accessoryIds) {
    const a = ACCESSORIES.find((x) => x.id === id);
    if (a && !seen.has(a.id)) { seen.add(a.id); accs.push(a); }
  }
  for (const a of accs) {
    const amount = a.unit === "day" ? a.price * input.days : a.price;
    lines.push({ key: `acc-${a.id}`, label: a.name, detail: a.unit === "day" ? `${input.days} ngày × ${num(a.price)}` : "Một lần", amount });
  }
  lines.push({
    key: "insurance",
    label: `Bảo hiểm ${insurance.name}`,
    detail: insurance.perDay === 0 ? "Đi kèm xe" : `${input.days} ngày × ${num(insurance.perDay)}`,
    amount: insurance.perDay * input.days,
  });

  const total = lines.reduce((s, l) => s + l.amount, 0);
  return {
    ok: true, bike, days: input.days, weeks: c.weeks, extraDays: c.extraDays, capped: c.capped, lines, total, deposit: bike.deposit,
    saving: c.byDay - c.amount, perDayAverage: Math.round(c.amount / input.days),
  };
}

/** Bản tóm tắt dạng chữ để sao chép hoặc dán vào form tư vấn. */
export function quoteSummary(q: Extract<Quote, { ok: true }>): string {
  const rows = q.lines.map((l) => `- ${l.label}: ${vnd(l.amount)} (${l.detail})`);
  return [
    `Xe: ${q.bike.name} (${q.bike.classLabel} ${q.bike.cc} cc)`,
    `Số ngày thuê: ${q.days}`,
    ...rows,
    `Tổng tiền thuê dự kiến: ${vnd(q.total)}`,
    `Tiền cọc hoàn lại khi trả xe: ${vnd(q.deposit)}`,
    "Giá tham khảo, cửa hàng xác nhận khi tư vấn.",
  ].join("\n");
}
