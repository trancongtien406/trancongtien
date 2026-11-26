/**
 * Bảng đơn giá và công thức ước tính của công cụ cấu hình (không phụ thuộc React để kiểm thử được bằng node).
 *
 * Khoảng giá = Tiền kim loại + Công chế tác + Đá (+ công gắn đá) (+ xi rhodium cho vàng trắng).
 *  - Tiền kim loại = trọng lượng ước tính (g) × hàm lượng kim loại quý × đơn giá tham khảo (đ/g).
 *  - Trọng lượng ước tính = trọng lượng mẫu của dòng sản phẩm ở cỡ đã chọn × hệ số khối lượng riêng của hợp kim.
 *  - Mỗi khoản có biên độ riêng (kim loại ±5%, công ±10%, đá tổng hợp ±15%, đá tự nhiên ±40%) nên kết quả là một KHOẢNG.
 * Đơn giá vàng/bạc ở đây là mức tham khảo mặc định và người dùng có thể nhập đơn giá khác; không phải giá niêm yết.
 */

export type TypeId = "ring" | "pendant" | "earring" | "bracelet";
export type MaterialId = "g10" | "g14" | "g18" | "w14" | "w18" | "s925";
export type StoneId = "none" | "syn" | "nat";
export type FinishId = "gloss" | "satin" | "engrave";

export const DEFAULT_GOLD_24K_PER_GRAM = 4_000_000;
export const SILVER_PER_GRAM = 40_000;
/** Hàm lượng vàng 24K dùng cho bảng đơn giá (vàng ròng ≈ 99,9%). */
export const PURITY_24K = 0.999;

export const TYPES: ReadonlyArray<{ id: TypeId; label: string; sizeLabel: string; unit: string; sizes: readonly number[]; defaultSize: number; stones: number; hint: string }> = [
  { id: "ring", label: "Nhẫn", sizeLabel: "Cỡ tay", unit: "", sizes: [8, 10, 12, 14, 16, 18, 20], defaultSize: 12, stones: 1, hint: "Cỡ tay chỉ để ước tính trọng lượng; cỡ chính xác được đo khi tư vấn." },
  { id: "pendant", label: "Mặt dây", sizeLabel: "Dài dây", unit: "cm", sizes: [40, 45, 50, 60], defaultSize: 45, stones: 1, hint: "Gồm mặt dây và dây chuyền cùng chất liệu." },
  { id: "earring", label: "Bông tai", sizeLabel: "Đường kính", unit: "mm", sizes: [10, 14, 18, 24], defaultSize: 14, stones: 2, hint: "Giá tính cho một đôi." },
  { id: "bracelet", label: "Lắc tay", sizeLabel: "Dài lắc", unit: "cm", sizes: [16, 17, 18, 19, 20], defaultSize: 17, stones: 1, hint: "Một viên đá điểm nhấn ở mắt chính nếu chọn đá." },
];

export const MATERIALS: ReadonlyArray<{ id: MaterialId; label: string; short: string; purity: number; density: number; kind: "gold" | "silver"; note: string }> = [
  { id: "g10", label: "Vàng 10K", short: "10K", purity: 0.417, density: 0.89, kind: "gold", note: "41,7% vàng, cứng, giá mềm" },
  { id: "g14", label: "Vàng 14K", short: "14K", purity: 0.585, density: 1, kind: "gold", note: "58,5% vàng, cân bằng độ bền và giá" },
  { id: "g18", label: "Vàng 18K", short: "18K", purity: 0.75, density: 1.19, kind: "gold", note: "75% vàng, màu ấm đậm" },
  { id: "w14", label: "Vàng trắng 14K", short: "Trắng 14K", purity: 0.585, density: 1.03, kind: "gold", note: "58,5% vàng, phủ rhodium" },
  { id: "w18", label: "Vàng trắng 18K", short: "Trắng 18K", purity: 0.75, density: 1.22, kind: "gold", note: "75% vàng, phủ rhodium" },
  { id: "s925", label: "Bạc 925", short: "Bạc 925", purity: 0.925, density: 0.8, kind: "silver", note: "92,5% bạc, nhẹ, giá gọn" },
];

export const STONES: ReadonlyArray<{ id: StoneId; label: string; note: string; mult: number; spread: number }> = [
  { id: "none", label: "Không đá", note: "Kim loại trơn", mult: 0, spread: 0 },
  { id: "syn", label: "Đá tổng hợp", note: "Chế tạo trong phòng thí nghiệm", mult: 1, spread: 0.15 },
  { id: "nat", label: "Đá tự nhiên", note: "Khoảng giá rộng theo loại đá", mult: 3, spread: 0.4 },
];

/** Giá một viên đá tổng hợp theo đường kính (mm). Đá tự nhiên = ×3 trong bảng STONES. */
export const STONE_SIZES: ReadonlyArray<{ mm: number; price: number }> = [
  { mm: 2, price: 350_000 },
  { mm: 3, price: 900_000 },
  { mm: 4, price: 2_100_000 },
  { mm: 5, price: 4_200_000 },
  { mm: 6.5, price: 8_800_000 },
];
export const DEFAULT_STONE_MM = 4;
export const SETTING_FEE_PER_STONE = 150_000;
export const RHODIUM_FEE = 180_000;

export const FINISHES: ReadonlyArray<{ id: FinishId; label: string; mult: number }> = [
  { id: "gloss", label: "Bóng gương", mult: 1 },
  { id: "satin", label: "Mờ sa-tanh", mult: 1.05 },
  { id: "engrave", label: "Chạm hoa văn", mult: 1.45 },
];

export const LABOR_BASE: Record<TypeId, number> = { ring: 1_400_000, pendant: 1_000_000, earring: 1_300_000, bracelet: 1_800_000 };
const SILVER_LABOR_FACTOR = 0.55;
const SPREAD = { metal: 0.05, labor: 0.1, weight: 0.08 };

/** Trọng lượng mẫu (gam) ở mức hợp kim 14K. */
export function baseWeight(type: TypeId, size: number): number {
  switch (type) {
    case "ring": return 2.0 + 0.2 * (size - 8);
    case "pendant": return 1.2 + 0.022 * size;
    case "earring": return 0.9 + 0.12 * (size - 10);
    case "bracelet": return 0.34 * size;
  }
}

export type Config = {
  type: TypeId;
  material: MaterialId;
  stone: StoneId;
  stoneMm: number;
  size: number;
  finish: FinishId;
  goldPerGram: number;
};

export type Quote =
  | { ok: false; reason: "gold-price" | "size" | "stone" }
  | {
      ok: true;
      weight: number;
      weightMin: number;
      weightMax: number;
      pure: number;
      metal: number;
      labor: number;
      stone: number;
      setting: number;
      extra: number;
      min: number;
      max: number;
      mid: number;
    };

const roundDown = (n: number, step = 10_000) => Math.floor(n / step) * step;
const roundUp = (n: number, step = 10_000) => Math.ceil(n / step) * step;
const find = <T extends { id: string }>(list: ReadonlyArray<T>, id: string) => list.find((x) => x.id === id);

export function quote(c: Config): Quote {
  const t = find(TYPES, c.type);
  const m = find(MATERIALS, c.material);
  const st = find(STONES, c.stone);
  const f = find(FINISHES, c.finish);
  if (!t || !m || !st || !f || !t.sizes.includes(c.size)) return { ok: false, reason: "size" };
  const isGold = m.kind === "gold";
  if (isGold && !(Number.isFinite(c.goldPerGram) && c.goldPerGram > 0)) return { ok: false, reason: "gold-price" };
  const stoneRow = STONE_SIZES.find((s) => s.mm === c.stoneMm);
  if (c.stone !== "none" && !stoneRow) return { ok: false, reason: "stone" };

  const weight = baseWeight(c.type, c.size) * m.density;
  const rate = isGold ? c.goldPerGram : SILVER_PER_GRAM;
  const metal = weight * m.purity * rate;
  const labor = LABOR_BASE[c.type] * f.mult * (isGold ? 1 : SILVER_LABOR_FACTOR);
  const count = c.stone === "none" ? 0 : t.stones;
  const stone = stoneRow ? stoneRow.price * st.mult * count : 0;
  const setting = SETTING_FEE_PER_STONE * count;
  const extra = c.material === "w14" || c.material === "w18" ? RHODIUM_FEE : 0;

  const min = metal * (1 - SPREAD.metal) + (labor + setting + extra) * (1 - SPREAD.labor) + stone * (1 - st.spread);
  const max = metal * (1 + SPREAD.metal) + (labor + setting + extra) * (1 + SPREAD.labor) + stone * (1 + st.spread);
  const mid = metal + labor + setting + extra + stone;
  return {
    ok: true,
    weight,
    weightMin: weight * (1 - SPREAD.weight),
    weightMax: weight * (1 + SPREAD.weight),
    pure: weight * m.purity,
    metal,
    labor,
    stone,
    setting,
    extra,
    min: roundDown(min),
    max: roundUp(max),
    mid,
  };
}

const vnd = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
export const formatVnd = (n: number) => vnd.format(Math.round(n));
const gram = new Intl.NumberFormat("vi-VN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const formatGram = (n: number) => gram.format(n);

export function summaryText(c: Config, q: Quote): string {
  const t = find(TYPES, c.type)!;
  const m = find(MATERIALS, c.material)!;
  const st = find(STONES, c.stone)!;
  const f = find(FINISHES, c.finish)!;
  const lines = [
    `Kim Nguyệt · Tóm tắt cấu hình`,
    `Loại: ${t.label}`,
    `Chất liệu: ${m.label}`,
    `Đá: ${c.stone === "none" ? st.label : `${st.label}, ${String(c.stoneMm).replace(".", ",")} mm`}`,
    `${t.sizeLabel}: ${c.size}${t.unit ? ` ${t.unit}` : ""}`,
    `Hoàn thiện: ${f.label}`,
  ];
  if (q.ok) {
    lines.push(`Trọng lượng ước tính: ${formatGram(q.weightMin)} – ${formatGram(q.weightMax)} g`);
    lines.push(`Khoảng giá tham khảo: ${formatVnd(q.min)} – ${formatVnd(q.max)}`);
  }
  lines.push("Giá tham khảo, được xác nhận sau khi thống nhất thiết kế và vật liệu.");
  return lines.join("\n");
}
