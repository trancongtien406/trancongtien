export type MenuCategory = "vietnamese" | "espresso" | "pour-over" | "cold-brew" | "non-coffee";
export type Intensity = 1 | 2 | 3;
export type Temperature = "hot" | "cold";
export type MilkOption = "with-milk" | "without-milk";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  intensity: Intensity | null;
  temperatures: Temperature[];
  milk: MilkOption;
  priceVnd: number;
  imageId: string;
  sortOrder: number;
};

export const CATEGORY_LABEL: Record<MenuCategory, string> = {
  vietnamese: "Cà phê Việt",
  espresso: "Espresso bar",
  "pour-over": "Pour-over",
  "cold-brew": "Cold Brew",
  "non-coffee": "Không cà phê",
};
export const INTENSITY_LABEL: Record<Intensity, string> = { 1: "Nhẹ", 2: "Vừa", 3: "Đậm" };
export const TEMP_LABEL: Record<Temperature, string> = { hot: "Nóng", cold: "Lạnh" };
export const MILK_LABEL: Record<MilkOption, string> = { "with-milk": "Có sữa", "without-milk": "Không sữa" };

const H: Temperature[] = ["hot"];
const C: Temperature[] = ["cold"];
const HC: Temperature[] = ["hot", "cold"];

/** 16 món, giá VNĐ tham khảo. */
export const MENU: readonly MenuItem[] = [
  { id: "M01", name: "Espresso", category: "espresso", description: "Một shot nhỏ, vị đậm, hậu cacao rõ ràng.", intensity: 3, temperatures: H, milk: "without-milk", priceVnd: 35000, imageId: "espresso", sortOrder: 1 },
  { id: "M02", name: "Americano", category: "espresso", description: "Espresso pha loãng, vị thanh hơn, dễ uống mỗi ngày.", intensity: 2, temperatures: HC, milk: "without-milk", priceVnd: 39000, imageId: "espresso", sortOrder: 2 },
  { id: "M03", name: "Cà phê đen", category: "vietnamese", description: "Cà phê phin mạnh mẽ, hậu vị đắng nhẹ.", intensity: 3, temperatures: HC, milk: "without-milk", priceVnd: 29000, imageId: "iced", sortOrder: 3 },
  { id: "M04", name: "Cà phê sữa", category: "vietnamese", description: "Cà phê phin và sữa đặc, đậm đà kiểu Việt.", intensity: 3, temperatures: HC, milk: "with-milk", priceVnd: 35000, imageId: "iced", sortOrder: 4 },
  { id: "M05", name: "Bạc xỉu", category: "vietnamese", description: "Nhiều sữa hơn, một chút cà phê, ngọt dịu.", intensity: 1, temperatures: HC, milk: "with-milk", priceVnd: 39000, imageId: "iced", sortOrder: 5 },
  { id: "M06", name: "Latte", category: "espresso", description: "Espresso cùng sữa mịn, cân bằng và nhẹ nhàng.", intensity: 1, temperatures: HC, milk: "with-milk", priceVnd: 49000, imageId: "latte", sortOrder: 6 },
  { id: "M07", name: "Flat White", category: "espresso", description: "Hai shot espresso, ít sữa hơn, hương cà phê rõ.", intensity: 2, temperatures: H, milk: "with-milk", priceVnd: 55000, imageId: "latte", sortOrder: 7 },
  { id: "M08", name: "Cappuccino", category: "espresso", description: "Espresso, sữa nóng và lớp bọt sữa mềm.", intensity: 2, temperatures: H, milk: "with-milk", priceVnd: 49000, imageId: "latte", sortOrder: 8 },
  { id: "M09", name: "Cold Brew nguyên bản", category: "cold-brew", description: "Cà phê chiết xuất lạnh, êm và ít vị gắt.", intensity: 2, temperatures: C, milk: "without-milk", priceVnd: 49000, imageId: "coldbrew", sortOrder: 9 },
  { id: "M10", name: "Cold Brew cam", category: "cold-brew", description: "Cold Brew kết hợp cam, tươi mát và sáng vị.", intensity: 1, temperatures: C, milk: "without-milk", priceVnd: 59000, imageId: "coldbrew", sortOrder: 10 },
  { id: "M11", name: "Matcha Latte", category: "non-coffee", description: "Matcha cùng sữa, vị trà rõ và béo nhẹ.", intensity: null, temperatures: HC, milk: "with-milk", priceVnd: 55000, imageId: "cup", sortOrder: 11 },
  { id: "M12", name: "Cacao sữa", category: "non-coffee", description: "Cacao thơm, sữa mềm, chút đắng dễ chịu.", intensity: null, temperatures: HC, milk: "with-milk", priceVnd: 45000, imageId: "cup", sortOrder: 12 },
  { id: "M13", name: "Cà phê muối", category: "vietnamese", description: "Cà phê phin, sữa đặc và lớp kem muối mặn nhẹ.", intensity: 2, temperatures: C, milk: "with-milk", priceVnd: 45000, imageId: "iced", sortOrder: 13 },
  { id: "M14", name: "Pour-over Nhiệt Sáng", category: "pour-over", description: "Một cốc lọc thủ công từ hạt rang sáng, thơm cam và hoa.", intensity: 1, temperatures: H, milk: "without-milk", priceVnd: 65000, imageId: "pour", sortOrder: 14 },
  { id: "M15", name: "Mocha", category: "espresso", description: "Espresso, cacao và sữa nóng, ngọt đắng hài hoà.", intensity: 2, temperatures: HC, milk: "with-milk", priceVnd: 55000, imageId: "latte", sortOrder: 15 },
  { id: "M16", name: "Espresso Tonic", category: "espresso", description: "Espresso rót lên tonic và đá, sảng khoái, vị chua thanh.", intensity: 1, temperatures: C, milk: "without-milk", priceVnd: 55000, imageId: "coldbrew", sortOrder: 16 },
  { id: "M17", name: "Cà phê dừa", category: "vietnamese", description: "Cà phê phin trộn cốt dừa xay đá, béo mát và thơm nhẹ.", intensity: 2, temperatures: C, milk: "with-milk", priceVnd: 49000, imageId: "iced", sortOrder: 17 },
  { id: "M18", name: "Cà phê trứng", category: "vietnamese", description: "Lớp kem trứng đánh bông trên nền cà phê phin nóng, ngọt béo.", intensity: 2, temperatures: H, milk: "with-milk", priceVnd: 55000, imageId: "latte", sortOrder: 18 },
];

export const MENU_IMAGES: Record<string, { src: string; alt: string; position: string; zoom?: number }> = {
  espresso: { src: "espresso-chiet-xuat", alt: "Dòng espresso chảy từ tay cầm pha vào ly", position: "50% 40%" },
  iced: { src: "ca-phe-sua-da", alt: "Ly cà phê sữa đá trên quầy bar tối", position: "50% 55%" },
  latte: { src: "latte-art-tay", alt: "Hai bàn tay cầm ly latte có hoa văn bọt sữa", position: "50% 55%" },
  coldbrew: { src: "sua-ca-phe-da", alt: "Ly cao cà phê đá, sữa xoáy loang trong ly", position: "50% 55%" },
  cup: { src: "ly-giay-tay", alt: "Hai tay ôm ly giấy đồ uống nóng", position: "50% 55%" },
  pour: { src: "pour-over-tay", alt: "Bàn tay rót nước từ ấm cổ ngỗng vào phễu pour-over", position: "70% 40%" },
};

export const MENU_MAP = new Map(MENU.map((m) => [m.id, m]));
export const MAX_LINE_QTY = 9;
export const MAX_TRAY_QTY = 30;

export type MenuFilters = {
  category: MenuCategory | "all";
  intensity: Intensity | "all";
  temperature: Temperature | "all";
  milk: MilkOption | "all";
};
export const DEFAULT_FILTERS: MenuFilters = { category: "all", intensity: "all", temperature: "all", milk: "all" };

export function filterMenu(items: readonly MenuItem[], f: MenuFilters): MenuItem[] {
  return items
    .filter(
      (i) =>
        (f.category === "all" || i.category === f.category) &&
        (f.intensity === "all" || i.intensity === f.intensity) &&
        (f.temperature === "all" || i.temperatures.includes(f.temperature)) &&
        (f.milk === "all" || i.milk === f.milk),
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

const vnd = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
export const formatVnd = (n: number) => vnd.format(n).replace(/\s/g, " ");

/** Mỗi món dùng một khung cắt riêng từ cùng bộ ảnh để menu không lặp ảnh y hệt. */
export const MENU_CROP: Record<string, { position: string; zoom: number }> = {
  M01: { position: "45% 50%", zoom: 1 },
  M02: { position: "92% 25%", zoom: 1.7 },
  M03: { position: "50% 60%", zoom: 1.15 },
  M04: { position: "50% 70%", zoom: 1.05 },
  M05: { position: "50% 45%", zoom: 1.7 },
  M06: { position: "50% 55%", zoom: 1 },
  M07: { position: "45% 45%", zoom: 1.8 },
  M08: { position: "50% 70%", zoom: 1.35 },
  M09: { position: "50% 40%", zoom: 1.2 },
  M10: { position: "50% 80%", zoom: 1.8 },
  M11: { position: "50% 60%", zoom: 1 },
  M12: { position: "60% 40%", zoom: 1.3 },
  M13: { position: "40% 60%", zoom: 2.2 },
  M14: { position: "70% 40%", zoom: 1 },
  M15: { position: "50% 45%", zoom: 1.1 },
  M16: { position: "50% 60%", zoom: 1.35 },
  M17: { position: "50% 70%", zoom: 1.5 },
  M18: { position: "50% 20%", zoom: 1.2 },
};
