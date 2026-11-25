export type TreatKind = "cake" | "cupcake" | "tart" | "slice" | "choux" | "cookie" | "macaron" | "croissant" | "donut" | "cup";

export type MenuCategory = "banh-kem" | "banh-nho" | "macaron" | "mi-ngot" | "do-uong";

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  unit: string;
  cat: MenuCategory;
  kind: TreatKind;
  /** bảng màu cho nhãn dán minh hoạ vẽ tay: [nền bánh, kem, điểm nhấn] */
  colors: [string, string, string];
  tag?: string;
};

export const CATEGORIES: { id: MenuCategory | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "banh-kem", label: "Bánh kem" },
  { id: "banh-nho", label: "Bánh nhỏ" },
  { id: "macaron", label: "Macaron" },
  { id: "mi-ngot", label: "Bánh mì ngọt" },
  { id: "do-uong", label: "Đồ uống" },
];

export const MENU: MenuItem[] = [
  { id: "kem-dau-may", name: "Kem Dâu Mây", desc: "Cốt vani, kem tươi, dâu và mứt dâu nấu tại tiệm.", price: 320000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#F6D49B", "#FFE3EC", "#FF5E86"], tag: "Bán chạy" },
  { id: "socola-hat-de", name: "Socola Hạt Dẻ", desc: "Cốt socola đậm, ganache và lớp hạt dẻ rang giòn.", price: 350000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#7A4630", "#B5775A", "#FFE27D"] },
  { id: "xoai-chanh-day", name: "Xoài Chanh Dây", desc: "Mousse xoài chua nhẹ, lớp thạch chanh dây trên cốt bông lan.", price: 340000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#FFE08A", "#FFCB5C", "#8FE0BE"] },
  { id: "tra-xanh-mint", name: "Trà Xanh Mật Ong", desc: "Kem trà xanh thơm, cốt mềm, thoang thoảng mật ong.", price: 360000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#CDE9A8", "#8FE0BE", "#FFF3EC"] },
  { id: "red-velvet", name: "Nhung Đỏ", desc: "Cốt đỏ nhung ẩm mịn, kem phô mai chua dịu.", price: 350000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#C93A54", "#FFF3EC", "#FF8FAE"] },
  { id: "cupcake-keo-bong", name: "Cupcake Kẹo Bông", desc: "Cốt vani, đỉnh kem xoắn màu kẹo bông và cốm.", price: 45000, unit: "chiếc", cat: "banh-nho", kind: "cupcake", colors: ["#F6D49B", "#FF8FAE", "#8FE0BE"] },
  { id: "tart-dau", name: "Tart Dâu Kem Sữa", desc: "Vỏ bơ giòn, kem sữa trứng và dâu tươi theo mùa.", price: 65000, unit: "chiếc", cat: "banh-nho", kind: "tart", colors: ["#E7B66B", "#FFF3EC", "#FF5E86"] },
  { id: "mousse-mint-socola", name: "Mousse Mint Socola", desc: "Mousse bạc hà mát, đế socola giòn, vỏ socola bóng.", price: 62000, unit: "miếng", cat: "banh-nho", kind: "slice", colors: ["#8FE0BE", "#7A4630", "#FFF3EC"] },
  { id: "su-kem-vani", name: "Su Kem Vani", desc: "Vỏ su giòn nhẹ, kem vani trứng bơm đầy khi bạn gọi.", price: 90000, unit: "hộp 6 chiếc", cat: "banh-nho", kind: "choux", colors: ["#F2C98A", "#FFF3EC", "#FFB9A8"] },
  { id: "cookie-bo-dau-phong", name: "Cookie Bơ Đậu Phộng", desc: "Dày, mềm ở giữa, giòn ở rìa, chip socola sữa.", price: 38000, unit: "chiếc", cat: "banh-nho", kind: "cookie", colors: ["#D79A5B", "#7A4630", "#FFE27D"] },
  { id: "hop-macaron-6", name: "Hộp Macaron 6 vị", desc: "Dâu, mint, chanh dây, socola, hạt dẻ, vani. Xếp hộp quà.", price: 210000, unit: "hộp 6 chiếc", cat: "macaron", kind: "macaron", colors: ["#FF8FAE", "#8FE0BE", "#FFE27D"], tag: "Quà tặng" },
  { id: "croissant-bo", name: "Croissant Bơ", desc: "Nhiều lớp, bơ thơm, nướng lúc sáng sớm.", price: 48000, unit: "chiếc", cat: "mi-ngot", kind: "croissant", colors: ["#E7A04C", "#F6C97F", "#FFB9A8"] },
  { id: "croissant-hanh-nhan", name: "Croissant Hạnh Nhân", desc: "Nhân kem hạnh nhân, rắc lát hạnh nhân và đường bột.", price: 58000, unit: "chiếc", cat: "mi-ngot", kind: "croissant", colors: ["#D9893A", "#F6C97F", "#FFF3EC"] },
  { id: "donut-hong-com", name: "Donut Hồng Cốm", desc: "Bột men mềm, phủ đường hồng và cốm nhiều màu.", price: 42000, unit: "chiếc", cat: "mi-ngot", kind: "donut", colors: ["#E7A04C", "#FF8FAE", "#FFE27D"] },
  { id: "latte-vani", name: "Latte Vani", desc: "Espresso, sữa tươi và siro vani, nóng hoặc đá.", price: 52000, unit: "ly", cat: "do-uong", kind: "cup", colors: ["#B5775A", "#FFF3EC", "#8FE0BE"] },
  { id: "tra-dao-mint", name: "Trà Đào Mint", desc: "Trà đen ủ lạnh, đào ngâm, lá bạc hà tươi.", price: 48000, unit: "ly", cat: "do-uong", kind: "cup", colors: ["#FFB9A8", "#FFE3EC", "#8FE0BE"] },
];

export const fmtVnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
