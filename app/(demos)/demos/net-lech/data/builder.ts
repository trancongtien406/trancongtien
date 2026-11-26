export type ServiceId = "SV-01" | "SV-02" | "SV-03" | "SV-04" | "SV-05" | "SV-06" | "SV-07";
export type StylistId = "ST-01" | "ST-02" | "ST-03";
export type HairLength = "short" | "medium" | "long";

/** prices/minutes theo thứ tự [ngắn, vừa, dài]. Giá và thời gian là tham khảo cho stylist cơ bản. */
export interface HairService { id: ServiceId; tag: string; name: string; desc: string; prices: [number, number, number]; minutes: [number, number, number]; group: "shape" | "chem" | "care" }
export interface Stylist { id: StylistId; alias: string; level: string; role: string; blurb: string; multiplier: number }

export const SERVICES: HairService[] = [
  { id: "SV-07", tag: "WASH", name: "Gội dưỡng", group: "care", desc: "Gội, massage da đầu và sấy khô. Có thể làm riêng hoặc đi kèm các dịch vụ khác.", prices: [80000, 100000, 120000], minutes: [20, 25, 30] },
  { id: "SV-01", tag: "CUT", name: "Cắt & tạo kiểu", group: "shape", desc: "Tư vấn đường cắt theo chất tóc và khuôn mặt, cắt, gội, sấy và tạo kiểu hoàn thiện. Nam và nữ cùng bảng giá.", prices: [150000, 200000, 250000], minutes: [40, 50, 60] },
  { id: "SV-03", tag: "PERM", name: "Uốn", group: "chem", desc: "Uốn lọn, uốn phồng chân tóc hoặc uốn gợn sóng theo kiểu đã thống nhất. Giá chưa gồm cắt.", prices: [650000, 850000, 1100000], minutes: [120, 150, 180] },
  { id: "SV-05", tag: "STRAIGHT", name: "Duỗi", group: "chem", desc: "Duỗi thẳng hoặc duỗi cụp đuôi. Cần kiểm tra tình trạng tóc trước khi làm.", prices: [700000, 900000, 1200000], minutes: [120, 150, 180] },
  { id: "SV-02", tag: "COLOR", name: "Nhuộm màu", group: "chem", desc: "Nhuộm phủ bạc hoặc nhuộm màu thời trang trên nền tóc đã đủ sáng. Khả năng lên màu phụ thuộc nền tóc.", prices: [550000, 750000, 950000], minutes: [90, 120, 150] },
  { id: "SV-06", tag: "LIGHTEN", name: "Tẩy tóc", group: "chem", desc: "Nâng nền tóc trước khi nhuộm màu sáng hoặc màu nổi. Tính riêng, chưa gồm nhuộm.", prices: [450000, 650000, 850000], minutes: [60, 90, 120] },
  { id: "SV-04", tag: "CARE", name: "Phục hồi tóc", group: "care", desc: "Ủ dưỡng sâu cho tóc khô, xơ sau hoá chất. Cải thiện độ mềm, không đưa tóc hư tổn về trạng thái ban đầu.", prices: [350000, 500000, 650000], minutes: [45, 60, 75] },
];

export const STYLISTS: Stylist[] = [
  { id: "ST-01", alias: "Stylist cắt", level: "Stylist", role: "Đường cắt và tạo kiểu hằng ngày", blurb: "Cắt gọn, thực dụng, dễ tự tạo kiểu tại nhà. Giá theo bảng gốc.", multiplier: 1 },
  { id: "ST-02", alias: "Chuyên viên màu và uốn", level: "Senior Stylist", role: "Màu sắc, uốn, duỗi", blurb: "Phụ trách các dịch vụ hoá chất, kiểm tra nền tóc trước khi chọn kỹ thuật. Phụ thu 15%.", multiplier: 1.15 },
  { id: "ST-03", alias: "Giám đốc sáng tạo", level: "Creative Director", role: "Diện mạo và phong cách cá nhân", blurb: "Nhận đổi kiểu lớn và màu phức tạp, tư vấn từ ảnh tham khảo của bạn. Phụ thu 30%.", multiplier: 1.3 },
];

export const LENGTHS: { id: HairLength; label: string; hint: string; idx: 0 | 1 | 2 }[] = [
  { id: "short", label: "Ngắn", hint: "ngang cằm trở lên", idx: 0 },
  { id: "medium", label: "Vừa", hint: "qua cằm đến ngang vai", idx: 1 },
  { id: "long", label: "Dài", hint: "qua vai", idx: 2 },
];

export interface BuilderState { selected: ServiceId[]; length: HairLength; stylist: StylistId; inspiration: string | null }
export const INITIAL_BUILDER: BuilderState = { selected: [], length: "medium", stylist: "ST-01", inspiration: null };
export const STORAGE_KEY = "nl:builder:v1";

export interface Line { id: ServiceId; name: string; price: number; minutes: number }
export interface Quote { lines: Line[]; total: number; minutes: number; conflict: boolean }

/** Làm tròn nửa lên đến 1.000đ; cộng epsilon để tránh sai số số thực (vd 402499.99999999994 phải là 402.500). */
const roundK = (n: number) => Math.round((n + 1e-6) / 1000) * 1000;

/** Giá từng dòng = làm tròn 1.000đ (giá theo độ dài x hệ số stylist); tổng = cộng các dòng đã làm tròn. */
export function priceOf(svc: HairService, length: HairLength, stylist: StylistId): number {
  const len = LENGTHS.find((l) => l.id === length) ?? LENGTHS[1];
  const sty = STYLISTS.find((x) => x.id === stylist) ?? STYLISTS[0];
  return roundK(svc.prices[len.idx] * sty.multiplier);
}
export function minutesOf(svc: HairService, length: HairLength): number {
  return svc.minutes[(LENGTHS.find((l) => l.id === length) ?? LENGTHS[1]).idx];
}
export function quote(state: Pick<BuilderState, "selected" | "length" | "stylist">): Quote {
  const lines = SERVICES.filter((s) => state.selected.includes(s.id)).map((s) => ({
    id: s.id,
    name: s.name,
    price: priceOf(s, state.length, state.stylist),
    minutes: minutesOf(s, state.length),
  }));
  const has = (id: ServiceId) => state.selected.includes(id);
  const shape = has("SV-03") || has("SV-05"), color = has("SV-02") || has("SV-06");
  return {
    lines,
    total: lines.reduce((a, l) => a + l.price, 0),
    minutes: lines.reduce((a, l) => a + l.minutes, 0),
    conflict: (has("SV-03") && has("SV-05")) || (shape && color),
  };
}

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export function formatDuration(min: number) {
  if (min <= 0) return "0 phút";
  const h = Math.floor(min / 60), m = min % 60;
  if (h === 0) return `${m} phút`;
  return m === 0 ? `${h} giờ` : `${h} giờ ${m} phút`;
}

const SERVICE_IDS = SERVICES.map((s) => s.id as string);
/** Kiểm tra dữ liệu lấy từ localStorage; sai thì trả về null để dùng mặc định. */
export function parseBuilder(raw: unknown): BuilderState | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as { v?: unknown; state?: Partial<BuilderState> };
  if (o.v !== 1 || !o.state) return null;
  const s = o.state;
  if (!Array.isArray(s.selected) || !s.selected.every((x) => typeof x === "string" && SERVICE_IDS.includes(x))) return null;
  if (!LENGTHS.some((l) => l.id === s.length)) return null;
  if (!STYLISTS.some((x) => x.id === s.stylist)) return null;
  const insp = typeof s.inspiration === "string" ? s.inspiration : null;
  return { selected: Array.from(new Set(s.selected)) as ServiceId[], length: s.length as HairLength, stylist: s.stylist as StylistId, inspiration: insp };
}

export function buildRequestText(state: BuilderState, q: Quote, lookName: string | null, date: string, period: string) {
  const len = LENGTHS.find((l) => l.id === state.length)!;
  const sty = STYLISTS.find((s) => s.id === state.stylist)!;
  return [
    "Tóm tắt lịch hẹn Nét Lệch (chưa xác nhận)",
    lookName ? `Kiểu tham khảo: ${lookName}` : null,
    `Dịch vụ: ${q.lines.map((l) => `${l.name} (${vnd(l.price)})`).join("; ")}`,
    `Độ dài tóc: ${len.label} (${len.hint})`,
    `Stylist: ${sty.alias} · ${sty.level}`,
    `Tổng tham khảo: ${vnd(q.total)} · ${formatDuration(q.minutes)}`,
    `Ngày mong muốn: ${date || "chưa chọn"} · Buổi: ${period}`,
  ].filter(Boolean).join("\n");
}
