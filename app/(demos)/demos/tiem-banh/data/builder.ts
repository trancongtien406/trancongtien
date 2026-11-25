export type Flavor = { id: string; label: string; note: string; sponge: string; extra: number };
export type Size = { id: string; label: string; diameters: number[]; serves: [number, number]; price: number; tiers: 1 | 2 };
export type Cream = { id: string; label: string; color: string; ink: string; extra: number };
export type Finish = { id: string; label: string; note: string; extra: number };
export type Deco = { id: string; label: string; note: string; extra: number };

export const FLAVORS: Flavor[] = [
  { id: "vani-dau", label: "Vani dâu tươi", note: "Nhẹ, thơm bơ sữa", sponge: "#F6D49B", extra: 0 },
  { id: "socola", label: "Socola đậm", note: "Ẩm, hơi đắng dịu", sponge: "#7A4630", extra: 30000 },
  { id: "tra-xanh", label: "Trà xanh", note: "Thơm, ít ngọt", sponge: "#BFDF93", extra: 30000 },
  { id: "xoai", label: "Xoài chanh dây", note: "Chua nhẹ, mát", sponge: "#FFD36B", extra: 40000 },
  { id: "nhung-do", label: "Nhung đỏ", note: "Mềm ẩm, kem phô mai", sponge: "#C93A54", extra: 40000 },
];

export const SIZES: Size[] = [
  { id: "s14", label: "14cm", diameters: [150], serves: [4, 6], price: 320000, tiers: 1 },
  { id: "s18", label: "18cm", diameters: [190], serves: [8, 10], price: 480000, tiers: 1 },
  { id: "s22", label: "22cm", diameters: [230], serves: [12, 16], price: 680000, tiers: 1 },
  { id: "t2", label: "2 tầng", diameters: [230, 150], serves: [18, 24], price: 1150000, tiers: 2 },
];

export const CREAMS: Cream[] = [
  { id: "sua", label: "Kem sữa", color: "#FFF3EC", ink: "#46251A", extra: 0 },
  { id: "dau", label: "Kem dâu", color: "#FF9FBD", ink: "#46251A", extra: 0 },
  { id: "mint", label: "Kem bạc hà", color: "#8FE0BE", ink: "#46251A", extra: 0 },
  { id: "socola", label: "Kem socola", color: "#6B3F2E", ink: "#FFF3EC", extra: 10000 },
  { id: "bo", label: "Kem bơ vàng", color: "#FFE27D", ink: "#46251A", extra: 0 },
];

export const FINISHES: Finish[] = [
  { id: "min", label: "Phủ kín mịn", note: "Kem phủ nhẵn quanh bánh", extra: 0 },
  { id: "chay", label: "Kem chảy", note: "Kem tràn từ mặt xuống thân", extra: 40000 },
  { id: "bong", label: "Viền kem bông", note: "Cốt bánh lộ ra, viền kem xoắn", extra: 30000 },
];

export const DECOS: Deco[] = [
  { id: "com", label: "Cốm màu", note: "Rắc trên mặt bánh", extra: 15000 },
  { id: "dau", label: "Dâu tươi", note: "Dâu cắt đôi theo mùa", extra: 35000 },
  { id: "macaron", label: "Macaron", note: "3 chiếc mini", extra: 60000 },
  { id: "nen", label: "Nến và cờ", note: "3 nến, 1 chuỗi cờ", extra: 10000 },
  { id: "sao", label: "Sao kẹo", note: "Sao đường vàng", extra: 20000 },
  { id: "hoa", label: "Hoa kem", note: "Bông kem quanh chân bánh", extra: 35000 },
];

export const TEXT_EXTRA = 20000;
export const TEXT_MAX = 24;

export function recommendSize(servings: number): Size {
  return SIZES.find((s) => servings <= s.serves[1]) ?? SIZES[SIZES.length - 1];
}

export type BuilderState = {
  flavor: string;
  size: string;
  servings: number;
  cream: string;
  finish: string;
  text: string;
  decos: string[];
};

export const DEFAULT_STATE: BuilderState = { flavor: "vani-dau", size: "s18", servings: 8, cream: "dau", finish: "chay", text: "Chúc mừng sinh nhật", decos: ["com", "nen"] };

export function priceOf(st: BuilderState) {
  const size = SIZES.find((s) => s.id === st.size) ?? SIZES[1];
  const flavor = FLAVORS.find((f) => f.id === st.flavor) ?? FLAVORS[0];
  const cream = CREAMS.find((c) => c.id === st.cream) ?? CREAMS[0];
  const finish = FINISHES.find((f) => f.id === st.finish) ?? FINISHES[0];
  const lines: { label: string; amount: number }[] = [{ label: `Bánh ${size.label}`, amount: size.price }];
  if (flavor.extra) lines.push({ label: `Vị ${flavor.label.toLowerCase()}`, amount: flavor.extra });
  if (cream.extra) lines.push({ label: cream.label, amount: cream.extra });
  if (finish.extra) lines.push({ label: finish.label, amount: finish.extra });
  if (st.text.trim()) lines.push({ label: "Viết chữ lên bánh", amount: TEXT_EXTRA });
  for (const id of st.decos) {
    const d = DECOS.find((x) => x.id === id);
    if (d) lines.push({ label: d.label, amount: d.extra });
  }
  return { lines, total: lines.reduce((a, l) => a + l.amount, 0), size, flavor, cream, finish };
}
