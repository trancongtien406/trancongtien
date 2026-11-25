/** Dữ liệu và luật tính của Bouquet Builder (thuần hàm, không phụ thuộc React). Giá là giá tham khảo theo cành. */

export type PaletteId = "cam-do" | "hong-sen" | "trang-kem" | "nhieu-mau";
export type OccasionId = "sinh-nhat" | "khai-truong" | "cuoi" | "xin-loi";
export type SizeId = "nho" | "vua" | "lon";
export type FlowerKind = "rose" | "ranunculus" | "peony" | "tulip" | "carnation" | "sunflower" | "daisy" | "baby" | "hydrangea" | "gerbera";

export type Flower = {
  id: string;
  label: string;
  note: string;
  price: number;
  kind: FlowerKind;
  filler: boolean;
  /** độ hợp màu theo tông 0..1 */
  pal: Record<PaletteId, number>;
  /** độ hợp theo dịp 0..1 */
  occ: Record<OccasionId, number>;
};

export const FLOWERS: readonly Flower[] = [
  { id: "hong", label: "Hoa hồng", note: "Cánh xoắn, hợp mọi dịp", price: 18000, kind: "rose", filler: false, pal: { "cam-do": 1, "hong-sen": 1, "trang-kem": 0.9, "nhieu-mau": 0.8 }, occ: { "sinh-nhat": 1, "khai-truong": 0.6, cuoi: 1, "xin-loi": 0.9 } },
  { id: "mao-luong", label: "Mao lương", note: "Nhiều lớp cánh mỏng như giấy", price: 32000, kind: "ranunculus", filler: false, pal: { "cam-do": 1, "hong-sen": 0.7, "trang-kem": 0.6, "nhieu-mau": 0.9 }, occ: { "sinh-nhat": 0.8, "khai-truong": 0.7, cuoi: 0.8, "xin-loi": 0.5 } },
  { id: "mau-don", label: "Mẫu đơn", note: "Bông lớn, xếp lớp như gấm", price: 70000, kind: "peony", filler: false, pal: { "cam-do": 0.3, "hong-sen": 1, "trang-kem": 0.9, "nhieu-mau": 0.6 }, occ: { "sinh-nhat": 0.6, "khai-truong": 0.3, cuoi: 1, "xin-loi": 0.7 } },
  { id: "tulip", label: "Tulip", note: "Dáng chén gọn, thanh", price: 34000, kind: "tulip", filler: false, pal: { "cam-do": 0.8, "hong-sen": 0.9, "trang-kem": 0.8, "nhieu-mau": 0.8 }, occ: { "sinh-nhat": 0.7, "khai-truong": 0.8, cuoi: 0.6, "xin-loi": 0.9 } },
  { id: "cam-chuong", label: "Cẩm chướng", note: "Viền cánh xù, bền bông", price: 12000, kind: "carnation", filler: false, pal: { "cam-do": 0.9, "hong-sen": 0.9, "trang-kem": 0.7, "nhieu-mau": 0.8 }, occ: { "sinh-nhat": 0.6, "khai-truong": 0.7, cuoi: 0.4, "xin-loi": 0.7 } },
  { id: "huong-duong", label: "Hướng dương", note: "Vàng ấm, bông to", price: 22000, kind: "sunflower", filler: false, pal: { "cam-do": 0.7, "hong-sen": 0.1, "trang-kem": 0.15, "nhieu-mau": 1 }, occ: { "sinh-nhat": 0.7, "khai-truong": 1, cuoi: 0.2, "xin-loi": 0.4 } },
  { id: "dong-tien", label: "Đồng tiền", note: "Cánh nan tươi, nhiều màu", price: 16000, kind: "gerbera", filler: false, pal: { "cam-do": 1, "hong-sen": 0.9, "trang-kem": 0.5, "nhieu-mau": 1 }, occ: { "sinh-nhat": 1, "khai-truong": 0.9, cuoi: 0.3, "xin-loi": 0.5 } },
  { id: "cam-tu-cau", label: "Cẩm tú cầu", note: "Chùm tròn đầy, tạo khối", price: 48000, kind: "hydrangea", filler: false, pal: { "cam-do": 0.2, "hong-sen": 0.9, "trang-kem": 1, "nhieu-mau": 0.5 }, occ: { "sinh-nhat": 0.5, "khai-truong": 0.6, cuoi: 0.9, "xin-loi": 0.7 } },
  { id: "cuc-tana", label: "Cúc tana", note: "Bông nhỏ trắng, lấp khoảng trống", price: 10000, kind: "daisy", filler: true, pal: { "cam-do": 0.6, "hong-sen": 0.7, "trang-kem": 1, "nhieu-mau": 0.8 }, occ: { "sinh-nhat": 0.8, "khai-truong": 0.7, cuoi: 0.7, "xin-loi": 0.9 } },
  { id: "baby", label: "Baby", note: "Chùm li ti, nhẹ như sương", price: 10000, kind: "baby", filler: true, pal: { "cam-do": 0.6, "hong-sen": 0.9, "trang-kem": 1, "nhieu-mau": 0.7 }, occ: { "sinh-nhat": 0.8, "khai-truong": 0.4, cuoi: 1, "xin-loi": 0.8 } },
] as const;

export const OCCASIONS: readonly { id: OccasionId; label: string; blurb: string }[] = [
  { id: "sinh-nhat", label: "Sinh nhật", blurb: "Tươi, nhiều màu, đủ vui" },
  { id: "khai-truong", label: "Khai trương", blurb: "Rực và đầy đặn, nhìn từ xa" },
  { id: "cuoi", label: "Cưới", blurb: "Nhẹ, mềm, nhiều lớp" },
  { id: "xin-loi", label: "Xin lỗi", blurb: "Dịu, gọn, không phô" },
];

export const PALETTES: readonly { id: PaletteId; label: string; swatch: string[] }[] = [
  { id: "cam-do", label: "Cam đỏ", swatch: ["#e5532d", "#f08a3c", "#b83a1f"] },
  { id: "hong-sen", label: "Hồng sen", swatch: ["#df8fa9", "#c4577a", "#f2b8c8"] },
  { id: "trang-kem", label: "Trắng kem", swatch: ["#f3eddf", "#fff8ec", "#e2d6b8"] },
  { id: "nhieu-mau", label: "Nhiều màu", swatch: ["#e5532d", "#df8fa9", "#f2b632"] },
];

export const SIZES: readonly { id: SizeId; label: string; stems: number; foliage: number; wrap: number; hint: string }[] = [
  { id: "nho", label: "Nhỏ", stems: 9, foliage: 24000, wrap: 40000, hint: "Cầm một tay, khoảng 9 cành" },
  { id: "vua", label: "Vừa", stems: 15, foliage: 36000, wrap: 60000, hint: "Ôm gọn, khoảng 15 cành" },
  { id: "lon", label: "Lớn", stems: 25, foliage: 54000, wrap: 90000, hint: "Đầy tay, khoảng 25 cành" },
];

export const BUDGETS = [300000, 500000, 700000, 1000000] as const;
export const BUDGET_MIN = 150000;
export const BUDGET_MAX = 5000000;
export const MAX_PICK = 4;
export const MSG_MAX = 80;

export const MESSAGES: Record<OccasionId, string[]> = {
  "sinh-nhat": [
    "Chúc bạn một tuổi mới nở thật nhiều điều dịu dàng.",
    "Sinh nhật vui nhé. Mong năm nay bạn được cười nhiều hơn.",
    "Một bó hoa cho một ngày của riêng bạn. Chúc mừng sinh nhật!",
  ],
  "khai-truong": [
    "Chúc cửa hàng mới khai trương thuận lợi, khách đến như hoa nở.",
    "Chúc mừng ngày mở cửa. Mong mọi điều khởi đầu đều đẹp.",
    "Khai trương rực rỡ, buôn bán nở rộ quanh năm.",
  ],
  cuoi: [
    "Chúc hai bạn một đời hoa nở, một nhà bình yên.",
    "Chúc mừng ngày cưới. Mong hai người luôn nắm tay nhau thật lâu.",
    "Trăm năm là một mùa hoa dài. Chúc hai bạn hạnh phúc.",
  ],
  "xin-loi": [
    "Mình xin lỗi. Mong bó hoa này nói giúp phần còn lại.",
    "Xin lỗi vì đã làm bạn buồn. Mình muốn được làm lại cho tốt hơn.",
    "Có những điều khó nói thành lời. Mình xin lỗi.",
  ],
};

export const fmtVnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n).replace(/\s/g, " ");

export type BuilderState = {
  occasion: OccasionId;
  budget: number;
  palette: PaletteId;
  flowers: string[];
  size: SizeId;
  msg: number;
};

export const DEFAULT_STATE: BuilderState = { occasion: "sinh-nhat", budget: 500000, palette: "cam-do", flowers: [], size: "vua", msg: 0 };

export type Line = { id: string; label: string; stems: number; price: number; sub: number; kind: FlowerKind };

export type Quote = {
  lines: Line[];
  stems: number;
  foliage: number;
  wrap: number;
  total: number;
  /** số cành đã giảm so với cỡ chuẩn để vừa ngân sách */
  trimmed: boolean;
  /** ngân sách không đủ cho bó nhỏ nhất của cỡ này */
  tooLow: boolean;
  /** ngân sách còn dư đáng kể */
  roomLeft: boolean;
  /** hoa được tự chọn (người dùng chưa chọn) */
  auto: boolean;
  minNeeded: number;
};

const byId = (id: string) => FLOWERS.find((f) => f.id === id);

export function autoPick(occasion: OccasionId, palette: PaletteId): string[] {
  const ranked = [...FLOWERS].sort((a, b) => b.occ[occasion] * (0.3 + b.pal[palette]) - a.occ[occasion] * (0.3 + a.pal[palette]));
  const focal = ranked.filter((f) => !f.filler).slice(0, 2).map((f) => f.id);
  const filler = ranked.find((f) => f.filler);
  return filler ? [...focal, filler.id] : focal;
}

/** Chia `total` cành theo trọng số, mỗi loại tối thiểu 1 (phương pháp phần dư lớn nhất). */
function distribute(ids: string[], total: number, occasion: OccasionId, palette: PaletteId): number[] {
  const w = ids.map((id) => {
    const f = byId(id)!;
    return f.occ[occasion] * (0.35 + f.pal[palette]) * (f.filler ? 1.15 : 1);
  });
  const sum = w.reduce((a, b) => a + b, 0) || 1;
  const raw = w.map((x) => (x / sum) * total);
  const out = raw.map((x) => Math.max(1, Math.floor(x)));
  let left = total - out.reduce((a, b) => a + b, 0);
  const order = raw.map((x, i) => [x - Math.floor(x), i] as const).sort((a, b) => b[0] - a[0]);
  for (let k = 0; left > 0; k = (k + 1) % order.length, left--) out[order[k][1]]++;
  for (let k = out.length - 1; left < 0 && k >= 0; k--) { while (left < 0 && out[k] > 1) { out[k]--; left++; } if (k === 0 && left < 0) break; }
  return out;
}

function build(ids: string[], total: number, size: (typeof SIZES)[number], occasion: OccasionId, palette: PaletteId) {
  const counts = distribute(ids, total, occasion, palette);
  const lines: Line[] = ids.map((id, i) => {
    const f = byId(id)!;
    return { id, label: f.label, stems: counts[i], price: f.price, sub: counts[i] * f.price, kind: f.kind };
  });
  const stems = lines.reduce((a, l) => a + l.stems, 0);
  const total$ = lines.reduce((a, l) => a + l.sub, 0) + size.foliage + size.wrap;
  return { lines, stems, total: total$ };
}

export function quote(st: BuilderState): Quote {
  const size = SIZES.find((s) => s.id === st.size) ?? SIZES[1];
  const picked = st.flowers.filter((id) => byId(id));
  const auto = picked.length === 0;
  const ids = auto ? autoPick(st.occasion, st.palette) : picked.slice(0, MAX_PICK);
  const minStems = Math.max(ids.length, 5);
  let target = Math.max(size.stems, ids.length);
  let b = build(ids, target, size, st.occasion, st.palette);
  let trimmed = false;
  while (b.total > st.budget && target > minStems) {
    target--;
    trimmed = true;
    b = build(ids, target, size, st.occasion, st.palette);
  }
  const tooLow = b.total > st.budget;
  const roomLeft = !trimmed && !tooLow && st.size !== "lon" && st.budget - b.total > b.total * 0.45;
  return { lines: b.lines, stems: b.stems, foliage: size.foliage, wrap: size.wrap, total: b.total, trimmed, tooLow, roomLeft, auto, minNeeded: tooLow ? b.total : 0 };
}

export function messageFor(st: BuilderState): string {
  const list = MESSAGES[st.occasion];
  return list[((st.msg % list.length) + list.length) % list.length];
}

/** Phân tích ô nhập ngân sách tuỳ chỉnh (chấp nhận "650000", "650.000", "650k"). */
export function parseBudget(raw: string): { ok: true; value: number } | { ok: false; error: string } {
  const t = raw.trim().toLowerCase().replace(/\s|\./g, "").replace(",", ".");
  if (!t) return { ok: false, error: "Nhập ngân sách, ví dụ 650000 hoặc 650k." };
  const m = /^(\d+(?:\.\d+)?)(k|nghin|nghìn|tr|trieu|triệu)?$/.exec(t);
  if (!m) return { ok: false, error: "Chỉ nhập số, ví dụ 650000 hoặc 650k." };
  let v = parseFloat(m[1]);
  const u = m[2];
  if (u === "k" || u === "nghin" || u === "nghìn") v *= 1000;
  else if (u === "tr" || u === "trieu" || u === "triệu") v *= 1000000;
  else if (v < 1000) v *= 1000;
  v = Math.round(v);
  if (v < BUDGET_MIN) return { ok: false, error: `Ngân sách tối thiểu ${fmtVnd(BUDGET_MIN)}.` };
  if (v > BUDGET_MAX) return { ok: false, error: `Với trên ${fmtVnd(BUDGET_MAX)} nên nhắn tiệm để được tư vấn riêng.` };
  return { ok: true, value: v };
}
