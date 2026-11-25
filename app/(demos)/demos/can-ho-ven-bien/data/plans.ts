export type UnitId = "1pn" | "2pn" | "3pn";
export type SlotId = "balcony" | "living" | "kitchen" | "entry" | "bed1" | "bath1" | "bed2" | "bath2" | "bed3";
export type Rect = { x: number; y: number; w: number; h: number };

/** Một mét = 44 đơn vị trong viewBox 600 x 520 (lệch tâm bằng PLAN_OX/OY). */
export const SCALE = 44;
export const PLAN_VIEW = { w: 600, h: 520 };

export const SLOTS: SlotId[] = ["balcony", "living", "kitchen", "entry", "bed1", "bath1", "bed2", "bath2", "bed3"];

/** Toạ độ theo mét. y = 0 là cạnh ban công (phía biển). Trong lòng căn bắt đầu từ y = 1,6. */
const PLANS: Record<UnitId, Partial<Record<SlotId, Rect>>> = {
  "1pn": {
    balcony: { x: 0, y: 0, w: 5, h: 1.6 },
    living: { x: 0, y: 1.6, w: 4.6, h: 3.0 },
    kitchen: { x: 0, y: 4.6, w: 3.0, h: 3.0 },
    entry: { x: 3.0, y: 4.6, w: 1.6, h: 3.0 },
    bed1: { x: 4.6, y: 1.6, w: 3.4, h: 4.2 },
    bath1: { x: 4.6, y: 5.8, w: 3.4, h: 1.8 },
  },
  "2pn": {
    balcony: { x: 0, y: 0, w: 6.4, h: 1.6 },
    living: { x: 0, y: 1.6, w: 5.4, h: 3.6 },
    kitchen: { x: 0, y: 5.2, w: 3.4, h: 3.2 },
    entry: { x: 3.4, y: 5.2, w: 2.0, h: 3.2 },
    bed1: { x: 5.4, y: 1.6, w: 5.0, h: 3.0 },
    bath1: { x: 5.4, y: 4.6, w: 2.2, h: 3.8 },
    bed2: { x: 7.6, y: 4.6, w: 2.8, h: 3.8 },
  },
  "3pn": {
    balcony: { x: 0, y: 0, w: 7.4, h: 1.6 },
    living: { x: 0, y: 1.6, w: 6.0, h: 4.0 },
    kitchen: { x: 0, y: 5.6, w: 3.8, h: 4.4 },
    entry: { x: 3.8, y: 5.6, w: 2.2, h: 4.4 },
    bed1: { x: 6.0, y: 1.6, w: 6.0, h: 3.0 },
    bath1: { x: 6.0, y: 4.6, w: 2.2, h: 2.4 },
    bath2: { x: 6.0, y: 7.0, w: 2.2, h: 3.0 },
    bed2: { x: 8.2, y: 4.6, w: 3.8, h: 2.8 },
    bed3: { x: 8.2, y: 7.4, w: 3.8, h: 2.6 },
  },
};

export type UnitMeta = {
  id: UnitId;
  label: string;
  name: string;
  blurb: string;
  /** bề rộng/chiều cao lòng căn theo mét, để vẽ khung tường */
  inner: { w: number; h: number };
  originX: number; // đơn vị viewBox
  originY: number;
};

export const UNITS: UnitMeta[] = [
  { id: "1pn", label: "1PN", name: "Căn một phòng ngủ", blurb: "Gọn, bếp mở, ban công dài cho buổi sáng.", inner: { w: 8, h: 6 }, originX: 124, originY: 80 },
  { id: "2pn", label: "2PN", name: "Căn hai phòng ngủ", blurb: "Phòng khách rộng, hai phòng ngủ tách khỏi khu sinh hoạt.", inner: { w: 10.4, h: 6.8 }, originX: 70, originY: 62 },
  { id: "3pn", label: "3PN", name: "Căn ba phòng ngủ", blurb: "Hai phòng tắm riêng, ban công liền phòng khách.", inner: { w: 12, h: 8.4 }, originX: 36, originY: 30 },
];

export type RoomInfo = { name: string; use: string };
export const ROOM_INFO: Record<SlotId, (u: UnitId) => RoomInfo> = {
  balcony: () => ({ name: "Ban công", use: "Nhìn thẳng ra biển, đặt được bàn nhỏ và hai ghế. Kính lan can trong suốt." }),
  living: (u) => ({ name: "Phòng khách", use: u === "1pn" ? "Khu ngồi và ăn nhẹ liền bếp, mở ra ban công." : "Khu sinh hoạt chung, cửa kính trượt mở trọn ra ban công." }),
  kitchen: () => ({ name: "Bếp", use: "Bếp chữ L có đảo nhỏ, chỗ đặt tủ lạnh lớn và khu giặt kín sau cánh tủ." }),
  entry: () => ({ name: "Lối vào", use: "Tủ giày, chỗ treo áo khoác và hành lang dẫn tới các phòng." }),
  bed1: (u) => ({ name: u === "1pn" ? "Phòng ngủ" : "Phòng ngủ chính", use: "Đón ánh sáng dịu, cửa sổ nhìn ra biển, có tủ áo âm tường." }),
  bath1: (u) => ({ name: u === "1pn" ? "Phòng tắm" : "Phòng tắm chính", use: "Vòi sen kính, bồn rửa đá, cửa thông gió riêng." }),
  bed2: () => ({ name: "Phòng ngủ 2", use: "Cho con, khách hoặc phòng làm việc tại nhà, cửa sổ lấy sáng." }),
  bath2: () => ({ name: "Phòng tắm 2", use: "Phòng tắm dùng chung, tách khỏi khu ngủ bằng hành lang ngắn." }),
  bed3: () => ({ name: "Phòng ngủ 3", use: "Phòng nhỏ yên tĩnh, hợp làm phòng đọc hoặc phòng ngủ khách." }),
};

export const area = (r: Rect) => r.w * r.h;
export const planOf = (u: UnitId) => PLANS[u];
export const slotsOf = (u: UnitId) => SLOTS.filter((s) => PLANS[u][s]);
export const innerArea = (u: UnitId) => slotsOf(u).filter((s) => s !== "balcony").reduce((n, s) => n + area(PLANS[u][s]!), 0);
export const balconyArea = (u: UnitId) => area(PLANS[u].balcony!);

export type Tier = "thap" | "trung" | "cao";
export type Facing = "dong" | "dong-nam" | "dong-bac";
export type Furnish = "co-ban" | "day-du";

export const TIERS: { id: Tier; label: string; floors: string; ppm: number; offset: number; width: number; note: string; city: number }[] = [
  { id: "thap", label: "Tầng thấp", floors: "Tầng 7 đến 14", ppm: 62, offset: -16, width: 56, city: 0, note: "Gần mặt đất hơn: thấy tán cây ven biển và nhịp phố bên dưới, biển hiện sau những mái nhà thấp." },
  { id: "trung", label: "Tầng trung", floors: "Tầng 15 đến 26", ppm: 70, offset: 0, width: 84, city: 34, note: "Đường chân trời nâng lên, mặt biển chiếm phần lớn khung cửa, phố nằm ở góc dưới." },
  { id: "cao", label: "Tầng cao", floors: "Tầng 27 đến 36", ppm: 82, offset: 14, width: 120, city: 70, note: "Cả vịnh mở ra, thấy rõ đường cong bờ biển và những cánh buồm xa." },
];
export const FACINGS: { id: Facing; label: string; bearing: number; adj: number; sub: string }[] = [
  { id: "dong", label: "Đông", bearing: 90, adj: 0.05, sub: "Biển trực diện" },
  { id: "dong-nam", label: "Đông Nam", bearing: 135, adj: 0.03, sub: "Biển và bờ cong" },
  { id: "dong-bac", label: "Đông Bắc", bearing: 45, adj: 0, sub: "Biển và đô thị" },
];
export const FURNISH: { id: Furnish; label: string; per: number; sub: string }[] = [
  { id: "co-ban", label: "Cơ bản", per: 0, sub: "Sàn, bếp, vệ sinh" },
  { id: "day-du", label: "Đầy đủ", per: 4.5, sub: "Thêm nội thất rời" },
];

/** Cung biển nằm ở phía Đông (độ, theo kim đồng hồ từ Bắc). */
export const SEA_ARC: [number, number] = [35, 160];

export function viewOverlap(center: number, width: number) {
  const a = center - width / 2, b = center + width / 2;
  const lo = Math.max(a, SEA_ARC[0]), hi = Math.min(b, SEA_ARC[1]);
  return Math.max(0, hi - lo) / width;
}

export type Config = { unit: UnitId; tier: Tier; facing: Facing; furnish: Furnish };
export const DEFAULT_CONFIG: Config = { unit: "2pn", tier: "trung", facing: "dong", furnish: "day-du" };

export function quote(c: Config) {
  const t = TIERS.find((x) => x.id === c.tier)!;
  const f = FACINGS.find((x) => x.id === c.facing)!;
  const fu = FURNISH.find((x) => x.id === c.furnish)!;
  const a = innerArea(c.unit);
  const perM2 = t.ppm * (1 + f.adj) + fu.per; // triệu đồng / m²
  const total = a * perM2 * 1_000_000;
  const center = f.bearing + t.offset;
  return { area: a, balcony: balconyArea(c.unit), perM2, total, center, width: t.width, sea: viewOverlap(center, t.width), tier: t, facing: f, furnish: fu };
}
