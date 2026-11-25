/**
 * Seat & Plan Picker: luật tính gói và chi phí tham khảo mỗi tháng (VND).
 * Thuần hàm để kiểm thử bằng node. Giá tham khảo, xác nhận khi tư vấn.
 */
import { SEATS, freeThrough, type Seat, type SeatKind } from "./seatmap";

export type Block = "morning" | "afternoon" | "full" | "evening";

export const BLOCKS: { id: Block; label: string; range: string; from: number; to: number; session: number; mapHour: number }[] = [
  { id: "morning", label: "Buổi sáng", range: "08:00 đến 12:00", from: 8, to: 12, session: 4, mapHour: 9 },
  { id: "afternoon", label: "Buổi chiều", range: "13:00 đến 17:00", from: 13, to: 17, session: 4, mapHour: 14 },
  { id: "full", label: "Cả ngày", range: "08:00 đến 17:00", from: 8, to: 17, session: 8, mapHour: 10 },
  { id: "evening", label: "Buổi tối", range: "18:00 đến 21:00", from: 18, to: 21, session: 3, mapHour: 19 },
];

export const KINDS: { id: SeatKind; label: string; hint: string }[] = [
  { id: "hot", label: "Hot desk", hint: "Ngồi chỗ trống trong khu mở" },
  { id: "fixed", label: "Bàn cố định", hint: "Một bàn riêng, có tủ cá nhân" },
  { id: "meeting", label: "Phòng họp", hint: "Thuê theo giờ" },
  { id: "private", label: "Phòng riêng", hint: "Cả phòng khoá riêng cho nhóm" },
];

export const RATES = {
  hotDay: 120_000,
  hotHalf: 80_000,
  hot12: 1_290_000,
  hot12Extra: 100_000,
  hotUnlimited: 1_890_000,
  fixed: 2_790_000,
  meetS: 260_000,
  meetL: 420_000,
  meetPackHours: 20,
  meetPackDiscount: 0.15,
  private: { 2: 7_200_000, 4: 12_500_000, 6: 17_900_000, 8: 22_800_000 } as Record<number, number>,
} as const;

export type PlanId = "hot-pass" | "hot-12" | "hot-unlimited" | "fixed" | "meet-hourly" | "meet-pack" | "private";

export type PickInput = { people: number; days: number; kind: SeatKind; block: Block };

export type Plan = {
  id: PlanId;
  name: string;
  /** loại chỗ trên sơ đồ để tô sáng */
  kind: SeatKind;
  monthly: number;
  perPerson: number;
  detail: string;
  pros: string[];
  cons: string[];
  /** có đủ chỗ theo điều kiện (ví dụ phòng họp tối đa 10 người) */
  ok: boolean;
  /** cần tư vấn riêng (quy mô lớn) */
  consult: boolean;
};

export type Pick = {
  input: PickInput;
  monthlyDays: number;
  plans: Plan[];
  recommended: Plan;
  reason: string;
  error: string | null;
};

export const clampInt = (v: number, a: number, b: number) => (Number.isFinite(v) ? Math.min(b, Math.max(a, Math.round(v))) : a);

export function monthlyDaysOf(daysPerWeek: number) {
  return Math.round(clampInt(daysPerWeek, 1, 7) * 4.3);
}

export function privateRooms(people: number): { rooms: number[]; price: number } {
  const caps = [8, 6, 4, 2];
  let left = people;
  const rooms: number[] = [];
  while (left > 8) { rooms.push(8); left -= 8; }
  const fit = caps.slice().reverse().find((c) => c >= left) ?? 8;
  rooms.push(fit);
  return { rooms, price: rooms.reduce((s, c) => s + RATES.private[c], 0) };
}

function meetRate(people: number) {
  return people <= 6 ? RATES.meetS : RATES.meetL;
}

export function pick(input: PickInput): Pick {
  const people = clampInt(input.people, 1, 20);
  const days = clampInt(input.days, 1, 7);
  const { kind, block } = input;
  const b = BLOCKS.find((x) => x.id === block) ?? BLOCKS[2];
  const md = monthlyDaysOf(days);
  const half = b.session <= 4;

  const hotPass: Plan = (() => {
    const per = md * (half ? RATES.hotHalf : RATES.hotDay);
    return {
      id: "hot-pass", name: "Hot desk lẻ", kind: "hot", monthly: per * people, perPerson: per,
      detail: `${md} lượt mỗi tháng, trả theo ngày dùng`,
      pros: ["Không cam kết, dùng ngày nào trả ngày đó", "Hợp khi lịch hay thay đổi"],
      cons: ["Không có chỗ cố định", "Đắt dần khi đi nhiều ngày"],
      ok: true, consult: false,
    };
  })();
  const hot12: Plan = (() => {
    const extra = Math.max(0, md - 12) * RATES.hot12Extra;
    const per = RATES.hot12 + extra;
    return {
      id: "hot-12", name: "Hot desk 12 ngày", kind: "hot", monthly: per * people, perPerson: per,
      detail: md > 12 ? `12 ngày kèm ${md - 12} ngày thêm` : "12 ngày dùng trong tháng",
      pros: ["Giá mỗi ngày thấp hơn gói lẻ", "Ngày chưa dùng không bị tính thêm"],
      cons: ["Vẫn là chỗ không cố định"],
      ok: true, consult: false,
    };
  })();
  const hotUnl: Plan = {
    id: "hot-unlimited", name: "Hot desk không giới hạn", kind: "hot", monthly: RATES.hotUnlimited * people, perPerson: RATES.hotUnlimited,
    detail: "Dùng mỗi ngày, mọi khung giờ",
    pros: ["Không đếm ngày", "Dùng được buổi tối"],
    cons: ["Chỗ ngồi thay đổi mỗi ngày"],
    ok: true, consult: false,
  };
  const fixed: Plan = {
    id: "fixed", name: "Bàn cố định", kind: "fixed", monthly: RATES.fixed * people, perPerson: RATES.fixed,
    detail: "Một bàn riêng, tủ cá nhân, ổ cắm riêng",
    pros: ["Chỗ ngồi giữ nguyên mỗi ngày", "Để đồ lại, bắt đầu làm ngay"],
    cons: ["Chi phí cao hơn hot desk"],
    ok: true, consult: false,
  };
  const pr = privateRooms(people);
  const priv: Plan = {
    id: "private", name: pr.rooms.length > 1 ? `Phòng riêng (${pr.rooms.length} phòng)` : `Phòng riêng ${pr.rooms[0]} chỗ`, kind: "private",
    monthly: pr.price, perPerson: Math.round(pr.price / people),
    detail: pr.rooms.length > 1 ? `Ghép ${pr.rooms.join(" + ")} chỗ` : "Khoá riêng, dùng cả tháng",
    pros: ["Không gian riêng cho cả nhóm", "Họp tại chỗ, để tài liệu lại"],
    cons: ["Cam kết theo tháng"],
    ok: true, consult: people > 8,
  };
  const hours = md * b.session;
  const rate = meetRate(people);
  const meetOk = people <= 10;
  const meetHourly: Plan = {
    id: "meet-hourly", name: "Phòng họp theo giờ", kind: "meeting", monthly: hours * rate, perPerson: Math.round((hours * rate) / people),
    detail: `${hours} giờ mỗi tháng, ${new Intl.NumberFormat("vi-VN").format(rate)} đ mỗi giờ`,
    pros: ["Chỉ trả giờ dùng", "Có màn hình trình chiếu, bảng viết"],
    cons: ["Cần đặt lịch trước"],
    ok: meetOk, consult: false,
  };
  const packHours = Math.max(hours, RATES.meetPackHours);
  const meetPack: Plan = {
    id: "meet-pack", name: "Gói 20 giờ phòng họp", kind: "meeting",
    monthly: Math.round(packHours * rate * (1 - RATES.meetPackDiscount)), perPerson: Math.round((packHours * rate * (1 - RATES.meetPackDiscount)) / people),
    detail: `Giảm ${RATES.meetPackDiscount * 100}% khi từ ${RATES.meetPackHours} giờ mỗi tháng`,
    pros: ["Giá giờ thấp hơn", "Ưu tiên chọn khung giờ"],
    cons: hours < RATES.meetPackHours ? [`Tính tối thiểu ${RATES.meetPackHours} giờ`] : ["Cam kết số giờ theo tháng"],
    ok: meetOk, consult: false,
  };

  let plans: Plan[];
  let recommended: Plan;
  let reason: string;
  const min = (a: Plan[]) => a.slice().sort((x, y) => x.monthly - y.monthly)[0];

  if (kind === "hot") {
    plans = [hotPass, hot12, hotUnl];
    recommended = min(plans);
    reason = `Với ${people} người, ${days} ngày mỗi tuần (khoảng ${md} ngày mỗi tháng), ${recommended.name} cho tổng thấp nhất trong ba lựa chọn hot desk.`;
  } else if (kind === "fixed") {
    plans = [fixed, hotUnl, priv];
    recommended = fixed;
    if (people >= 4 && priv.monthly <= fixed.monthly * 1.1) {
      recommended = priv;
      reason = `Từ ${people} người, phòng riêng chỉ chênh khoảng ${Math.round((priv.monthly / fixed.monthly - 1) * 100)}% so với bàn cố định nhưng có không gian khoá riêng.`;
    } else {
      reason = `Bạn cần chỗ ngồi giữ nguyên ${days} ngày mỗi tuần, nên bàn cố định hợp nhất; hot desk không giới hạn là phương án tiết kiệm hơn.`;
    }
  } else if (kind === "private") {
    plans = [priv, fixed, hotUnl];
    recommended = priv;
    reason = people > 8 ? `Nhóm ${people} người cần ghép nhiều phòng; cần tư vấn để chọn bố trí liền kề.` : `Nhóm ${people} người vừa với phòng ${pr.rooms[0]} chỗ, có khoá riêng và dùng cả tháng.`;
  } else {
    plans = [meetHourly, meetPack, priv];
    recommended = hours >= 17 ? meetPack : meetHourly;
    reason = meetOk
      ? `Khoảng ${hours} giờ họp mỗi tháng cho ${people} người: ${recommended.name} là cách trả hợp lý nhất. Nếu họp gần như mỗi ngày, phòng riêng có thể tiết kiệm hơn.`
      : `Phòng họp lớn nhất chứa 10 người. Với ${people} người, phòng riêng hoặc tư vấn bố trí là phương án phù hợp.`;
    if (!meetOk) recommended = priv;
  }
  const error = people > 10 && kind === "meeting" ? "Phòng họp chứa tối đa 10 người. Hãy giảm số người hoặc chọn phòng riêng." : null;
  return { input: { people, days, kind, block }, monthlyDays: md, plans, recommended, reason, error };
}

/* ------------------------------------------------------------------ chọn chỗ tô sáng */

export function highlightSeats(input: PickInput, kind: SeatKind, day: number): { ids: string[]; shortage: number; poolFree: number } {
  const b = BLOCKS.find((x) => x.id === input.block) ?? BLOCKS[2];
  const people = clampInt(input.people, 1, 20);
  const pool = SEATS.filter((s) => s.kind === kind);
  const free = pool.filter((s) => freeThrough(s, day, b.from, b.to));
  if (kind === "meeting" || kind === "private") {
    const sorted = free.slice().sort((x, y) => x.cap - y.cap);
    const one = sorted.find((s) => s.cap >= people);
    if (one) return { ids: [one.id], shortage: 0, poolFree: free.length };
    if (kind === "private" && people > 8) {
      const ids = sorted.slice(-2).map((s) => s.id);
      return { ids, shortage: Math.max(0, people - ids.reduce((n, id) => n + (pool.find((s) => s.id === id)?.cap ?? 0), 0)), poolFree: free.length };
    }
    return { ids: [], shortage: people, poolFree: free.length };
  }
  // hot / fixed: ưu tiên nhóm liền kề đủ chỗ
  const byGroup = new Map<string, Seat[]>();
  free.forEach((s) => byGroup.set(s.group, [...(byGroup.get(s.group) ?? []), s]));
  const groups = [...byGroup.values()].sort((a, c) => c.length - a.length);
  const ids: string[] = [];
  for (const g of groups) {
    for (const s of g) if (ids.length < people) ids.push(s.id);
    if (ids.length >= people) break;
  }
  return { ids, shortage: Math.max(0, people - ids.length), poolFree: free.length };
}

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export function summaryText(p: Pick, dayName: string, ids: string[]): string {
  const b = BLOCKS.find((x) => x.id === p.input.block) ?? BLOCKS[2];
  const k = KINDS.find((x) => x.id === p.input.kind)?.label ?? "";
  return [
    "Ô Lưới, tóm tắt chọn chỗ",
    `Số người: ${p.input.people}`,
    `Tần suất: ${p.input.days} ngày mỗi tuần`,
    `Loại chỗ: ${k}`,
    `Khung giờ: ${b.label} (${b.range})`,
    `Gói gợi ý: ${p.recommended.name}`,
    `Chi phí tham khảo: ${vnd(p.recommended.monthly)} mỗi tháng`,
    ids.length ? `Chỗ đề xuất trên sơ đồ (${dayName}): ${ids.join(", ")}` : "Chỗ đề xuất trên sơ đồ: cần xác nhận khi tham quan",
    "Giá tham khảo, xác nhận khi tư vấn.",
  ].join("\n");
}
