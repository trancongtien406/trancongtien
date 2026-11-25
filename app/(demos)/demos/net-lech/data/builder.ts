export type ServiceId = "SV-01" | "SV-02" | "SV-03" | "SV-04";
export type StylistId = "ST-01" | "ST-02" | "ST-03";
export type HairLength = "short" | "medium" | "long";

export interface HairService { id: ServiceId; tag: string; name: string; desc: string; basePrice: number; baseMinutes: number; isCut: boolean }
export interface Stylist { id: StylistId; alias: string; level: string; role: string; blurb: string; multiplier: number }

export const SERVICES: HairService[] = [
  { id: "SV-01", tag: "CUT", name: "Cắt & tạo kiểu", desc: "Định hình đường cắt theo chất tóc và phong cách mong muốn, hoàn thiện kiểu bằng sấy và sản phẩm tạo kiểu.", basePrice: 250000, baseMinutes: 45, isCut: true },
  { id: "SV-02", tag: "COLOR", name: "Nhuộm màu", desc: "Thử một màu tóc mới, từ sắc độ tự nhiên đến lựa chọn nổi bật. Khả năng lên màu phụ thuộc nền tóc.", basePrice: 650000, baseMinutes: 120, isCut: false },
  { id: "SV-03", tag: "TEXTURE", name: "Uốn & tạo kết cấu", desc: "Tạo độ chuyển động, độ phồng hoặc lọn tóc theo định hướng tạo kiểu đã trao đổi.", basePrice: 750000, baseMinutes: 150, isCut: false },
  { id: "SV-04", tag: "CARE", name: "Chăm sóc tóc", desc: "Chăm sóc bề mặt tóc, hướng tới cảm giác mềm và dễ chải hơn. Không phải liệu trình phục hồi tuyệt đối.", basePrice: 350000, baseMinutes: 45, isCut: false },
];

export const STYLISTS: Stylist[] = [
  { id: "ST-01", alias: "The Cutter", level: "Stylist", role: "Đường cắt và tạo kiểu hằng ngày", blurb: "Hướng cắt gọn, thực dụng, dễ tự tạo kiểu tại nhà.", multiplier: 1 },
  { id: "ST-02", alias: "The Colorist", level: "Senior Stylist", role: "Màu sắc và kết cấu tóc", blurb: "Hướng màu và kết cấu, cân nhắc nền tóc trước khi chọn kỹ thuật.", multiplier: 1.15 },
  { id: "ST-03", alias: "The Creator", level: "Creative Director", role: "Diện mạo và phong cách cá nhân", blurb: "Hướng thử nghiệm, từ ý tưởng tham khảo tới một đường nét riêng.", multiplier: 1.3 },
];

export const LENGTHS: { id: HairLength; label: string; hint: string; priceX: number; cutExtra: number; otherExtra: number }[] = [
  { id: "short", label: "Ngắn", hint: "ngang cằm trở lên", priceX: 1, cutExtra: 0, otherExtra: 0 },
  { id: "medium", label: "Vừa", hint: "qua cằm đến ngang vai", priceX: 1.2, cutExtra: 5, otherExtra: 15 },
  { id: "long", label: "Dài", hint: "qua vai", priceX: 1.4, cutExtra: 10, otherExtra: 30 },
];

export interface BuilderState { selected: ServiceId[]; length: HairLength; stylist: StylistId; inspiration: string | null }
export const INITIAL_BUILDER: BuilderState = { selected: [], length: "medium", stylist: "ST-01", inspiration: null };
export const STORAGE_KEY = "nl:builder:v1";

export interface Line { id: ServiceId; name: string; price: number; minutes: number }
export interface Quote { lines: Line[]; total: number; minutes: number; conflict: boolean }

/** Làm tròn nửa lên đến 1.000đ; cộng epsilon để tránh sai số số thực (vd 402499.99999999994 phải là 402.500). */
const roundK = (n: number) => Math.round((n + 1e-6) / 1000) * 1000;

/** Giá từng dòng = làm tròn 1.000đ (giá gốc x hệ số độ dài x hệ số stylist); tổng = cộng các dòng đã làm tròn. */
export function quote(state: Pick<BuilderState, "selected" | "length" | "stylist">): Quote {
  const len = LENGTHS.find((l) => l.id === state.length) ?? LENGTHS[1];
  const sty = STYLISTS.find((s) => s.id === state.stylist) ?? STYLISTS[0];
  const lines = SERVICES.filter((s) => state.selected.includes(s.id)).map((s) => ({
    id: s.id,
    name: s.name,
    price: roundK(s.basePrice * len.priceX * sty.multiplier),
    minutes: s.baseMinutes + (s.isCut ? len.cutExtra : len.otherExtra),
  }));
  return {
    lines,
    total: lines.reduce((a, l) => a + l.price, 0),
    minutes: lines.reduce((a, l) => a + l.minutes, 0),
    conflict: state.selected.includes("SV-02") && state.selected.includes("SV-03"),
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
