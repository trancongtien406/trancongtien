export type Region = "bac" | "trung" | "nam";

export interface ProductType {
  id: number;
  name: string;
  short: string;
  region: Region;
  color: string;
  accent: string;
  ink: string;
  size: [number, number, number];
  price: number;
  note: string;
}

export const REGION_LABEL: Record<Region, string> = {
  bac: "Miền Bắc",
  trung: "Miền Trung",
  nam: "Miền Nam & Tây Nguyên",
};

export const PRODUCTS: ProductType[] = [
  { id: 0, name: "Chè xanh Thái Nguyên 200g", short: "CHÈ XANH", region: "bac", color: "#2f8f4e", accent: "#d9f2c4", ink: "#ffffff", size: [0.2, 0.3, 0.1], price: 98000, note: "Búp non sao tay, hậu ngọt" },
  { id: 1, name: "Cốm làng Vòng 250g", short: "CỐM VÒNG", region: "bac", color: "#9fd36a", accent: "#2e6a2a", ink: "#1f4a1c", size: [0.22, 0.26, 0.1], price: 85000, note: "Dẻo thơm mùa lúa mới" },
  { id: 2, name: "Bánh đậu xanh Hải Dương", short: "ĐẬU XANH", region: "bac", color: "#f4d35e", accent: "#c0392b", ink: "#7a1d12", size: [0.24, 0.1, 0.16], price: 62000, note: "Hộp 12 chiếc" },
  { id: 3, name: "Mứt sen Hà Nội 300g", short: "MỨT SEN", region: "bac", color: "#f6b8c8", accent: "#8c2a4a", ink: "#6b1f3a", size: [0.2, 0.22, 0.12], price: 74000, note: "Ngọt thanh, ít đường" },
  { id: 4, name: "Mè xửng Huế 250g", short: "MÈ XỬNG", region: "trung", color: "#8a5a35", accent: "#f2d9a6", ink: "#ffffff", size: [0.2, 0.14, 0.14], price: 69000, note: "Dẻo dai, thơm mè" },
  { id: 5, name: "Mắm ruốc Huế 250g", short: "MẮM RUỐC", region: "trung", color: "#b3392c", accent: "#fbe3c0", ink: "#ffffff", size: [0.14, 0.2, 0.14], price: 45000, note: "Đậm đà, ăn cùng thịt luộc" },
  { id: 6, name: "Bánh ép Hội An 10 chiếc", short: "BÁNH ÉP", region: "trung", color: "#e7a33d", accent: "#fff2cf", ink: "#5b3a0a", size: [0.26, 0.08, 0.2], price: 52000, note: "Giòn tan, thơm mè" },
  { id: 7, name: "Nước mắm Nam Ô 500ml", short: "NƯỚC MẮM", region: "trung", color: "#7a3b17", accent: "#ffd37a", ink: "#ffe9b8", size: [0.12, 0.3, 0.12], price: 89000, note: "Cá cơm nguyên chất" },
  { id: 8, name: "Nước dừa Bến Tre 1 lít", short: "NƯỚC DỪA", region: "nam", color: "#38b6c9", accent: "#ffffff", ink: "#0b4f5c", size: [0.14, 0.32, 0.14], price: 38000, note: "Dừa xiêm, không đường" },
  { id: 9, name: "Gạo ST25 túi 5kg", short: "GẠO ST25", region: "nam", color: "#f5efe0", accent: "#c0392b", ink: "#7a1d12", size: [0.3, 0.42, 0.14], price: 215000, note: "Cơm dẻo thơm lá dứa" },
  { id: 10, name: "Cà phê Buôn Ma Thuột 500g", short: "CÀ PHÊ", region: "nam", color: "#3d2314", accent: "#e0b36b", ink: "#f4dfae", size: [0.18, 0.28, 0.1], price: 159000, note: "Rang vừa, hậu chocolate" },
  { id: 11, name: "Khô cá lóc U Minh 300g", short: "KHÔ CÁ LÓC", region: "nam", color: "#d96b27", accent: "#fff0d6", ink: "#ffffff", size: [0.24, 0.2, 0.12], price: 125000, note: "Phơi nắng, chiên giòn" },
];

export const fmtVnd = (n: number) => `${new Intl.NumberFormat("vi-VN").format(n)}đ`;

export interface Hotspot {
  pos: [number, number, number];
  type: number;
}

export const HOTSPOTS: Hotspot[] = [
  { pos: [-2.02, 1.26, -9], type: 0 },
  { pos: [2.02, 1.26, -15], type: 5 },
  { pos: [-2.02, 1.26, -22], type: 2 },
  { pos: [2.02, 0.76, -28], type: 7 },
  { pos: [-2.02, 1.76, -35], type: 3 },
  { pos: [2.02, 1.26, -40], type: 4 },
  { pos: [9, 1.26, -52.0], type: 10 },
  { pos: [15, 1.26, -46.0], type: 8 },
  { pos: [22, 1.26, -52.0], type: 9 },
  { pos: [28, 1.26, -46.0], type: 11 },
];
