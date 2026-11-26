export type TreatKind = "cake" | "cupcake" | "tart" | "slice" | "choux" | "cookie" | "macaron" | "croissant" | "donut" | "cup";

export type MenuCategory = "banh-kem" | "banh-lanh" | "mi-ngot" | "cookie-macaron";

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  unit: string;
  cat: MenuCategory;
  kind: TreatKind;
  /** bảng màu cho nhãn dán vẽ tay: [nền bánh, kem, điểm nhấn] */
  colors: [string, string, string];
  tag?: string;
};

export const CATEGORIES: { id: MenuCategory; label: string; note: string }[] = [
  { id: "banh-kem", label: "Bánh kem", note: "Bánh kem nguyên chiếc 14cm có sẵn mẫu, đặt trước 2 ngày. Muốn size lớn hơn hoặc tự chọn vị, dùng phần dựng bánh bên dưới." },
  { id: "banh-lanh", label: "Bánh lạnh", note: "Bánh lạnh làm sáng hôm đó, để ngăn mát, dùng tốt nhất trong ngày." },
  { id: "mi-ngot", label: "Bánh mì & croissant", note: "Nướng theo mẻ từ sáng sớm, ngon nhất khi còn ấm." },
  { id: "cookie-macaron", label: "Cookie & macaron", note: "Bánh khô, để được vài ngày, hợp làm quà." },
];

export const MENU: MenuItem[] = [
  { id: "kem-dau-may", name: "Kem Dâu Mây", desc: "Cốt vani, kem tươi, dâu và mứt dâu nấu tại tiệm.", price: 320000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#F6D49B", "#FFE3EC", "#FF5E86"], tag: "Bán chạy" },
  { id: "socola-hat-de", name: "Socola Hạt Dẻ", desc: "Cốt socola đậm, ganache và lớp hạt dẻ rang giòn.", price: 350000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#7A4630", "#B5775A", "#FFE27D"] },
  { id: "xoai-chanh-day", name: "Xoài Chanh Dây", desc: "Mousse xoài chua nhẹ, lớp thạch chanh dây trên cốt bông lan.", price: 340000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#FFE08A", "#FFCB5C", "#8FE0BE"] },
  { id: "tra-xanh-mint", name: "Trà Xanh Mật Ong", desc: "Kem trà xanh thơm, cốt mềm, thoang thoảng mật ong.", price: 360000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#CDE9A8", "#8FE0BE", "#FFF3EC"] },
  { id: "red-velvet", name: "Nhung Đỏ", desc: "Cốt đỏ nhung ẩm mịn, kem phô mai chua dịu.", price: 350000, unit: "bánh 14cm", cat: "banh-kem", kind: "cake", colors: ["#C93A54", "#FFF3EC", "#FF8FAE"] },
  { id: "cupcake-keo-bong", name: "Cupcake Kẹo Bông", desc: "Cốt vani, đỉnh kem xoắn màu kẹo bông và cốm.", price: 45000, unit: "chiếc", cat: "banh-kem", kind: "cupcake", colors: ["#F6D49B", "#FF8FAE", "#8FE0BE"] },
  { id: "tart-dau", name: "Tart Dâu Kem Sữa", desc: "Vỏ bơ giòn, kem sữa trứng và dâu tươi theo mùa.", price: 65000, unit: "chiếc", cat: "banh-lanh", kind: "tart", colors: ["#E7B66B", "#FFF3EC", "#FF5E86"] },
  { id: "mousse-mint-socola", name: "Mousse Mint Socola", desc: "Mousse bạc hà mát, đế socola giòn, vỏ socola bóng.", price: 62000, unit: "miếng", cat: "banh-lanh", kind: "slice", colors: ["#8FE0BE", "#7A4630", "#FFF3EC"] },
  { id: "su-kem-vani", name: "Su Kem Vani", desc: "Vỏ su giòn nhẹ, kem vani trứng bơm đầy khi bạn gọi.", price: 90000, unit: "hộp 6 chiếc", cat: "banh-lanh", kind: "choux", colors: ["#F2C98A", "#FFF3EC", "#FFB9A8"] },
  { id: "cookie-bo-dau-phong", name: "Cookie Bơ Đậu Phộng", desc: "Dày, mềm ở giữa, giòn ở rìa, chip socola sữa.", price: 38000, unit: "chiếc", cat: "cookie-macaron", kind: "cookie", colors: ["#D79A5B", "#7A4630", "#FFE27D"] },
  { id: "hop-macaron-6", name: "Hộp Macaron 6 vị", desc: "Dâu, mint, chanh dây, socola, hạt dẻ, vani. Xếp hộp quà.", price: 210000, unit: "hộp 6 chiếc", cat: "cookie-macaron", kind: "macaron", colors: ["#FF8FAE", "#8FE0BE", "#FFE27D"], tag: "Quà tặng" },
  { id: "croissant-bo", name: "Croissant Bơ", desc: "Nhiều lớp, bơ thơm, nướng lúc sáng sớm.", price: 48000, unit: "chiếc", cat: "mi-ngot", kind: "croissant", colors: ["#E7A04C", "#F6C97F", "#FFB9A8"] },
  { id: "croissant-hanh-nhan", name: "Croissant Hạnh Nhân", desc: "Nhân kem hạnh nhân, rắc lát hạnh nhân và đường bột.", price: 58000, unit: "chiếc", cat: "mi-ngot", kind: "croissant", colors: ["#D9893A", "#F6C97F", "#FFF3EC"] },
  { id: "donut-hong-com", name: "Donut Hồng Cốm", desc: "Bột men mềm, phủ đường hồng và cốm nhiều màu.", price: 42000, unit: "chiếc", cat: "mi-ngot", kind: "donut", colors: ["#E7A04C", "#FF8FAE", "#FFE27D"] },
  { id: "tiramisu-ly", name: "Tiramisu Ly", desc: "Bánh sữa ngón thấm cà phê, kem mascarpone, phủ bột cacao.", price: 65000, unit: "ly", cat: "banh-lanh", kind: "cup", colors: ["#B5775A", "#FFF3EC", "#7A4630"] },
  { id: "panna-cotta-xoai", name: "Panna Cotta Xoài", desc: "Kem sữa đông mềm, sốt xoài chín. Mùa xoài tiệm đổi sang vị khác.", price: 55000, unit: "ly", cat: "banh-lanh", kind: "cup", colors: ["#FFE08A", "#FFF3EC", "#FFCB5C"], tag: "Theo mùa" },
  { id: "cheesecake-chanh-day", name: "Cheesecake Chanh Dây", desc: "Phô mai kem mịn, đế bánh quy bơ, sốt chanh dây chua nhẹ.", price: 68000, unit: "miếng", cat: "banh-lanh", kind: "slice", colors: ["#FFE27D", "#FFF3EC", "#E7B66B"] },
  { id: "brioche-bo-duong", name: "Brioche Bơ Đường", desc: "Bánh mì ngọt nhiều bơ, mềm xốp, rắc đường hạt giòn trên mặt.", price: 38000, unit: "chiếc", cat: "mi-ngot", kind: "croissant", colors: ["#E7A04C", "#F6C97F", "#FFF3EC"] },
  { id: "banh-mi-sua-hokkaido", name: "Bánh Mì Sữa Nướng", desc: "Ổ mềm, thơm sữa, ăn không hoặc phết bơ mứt.", price: 45000, unit: "ổ nhỏ", cat: "mi-ngot", kind: "donut", colors: ["#F2C98A", "#FFF3EC", "#FFB9A8"] },
  { id: "cookie-socola-muoi", name: "Cookie Socola Muối Biển", desc: "Socola đen chảy, rắc chút muối biển, giòn rìa mềm ruột.", price: 36000, unit: "chiếc", cat: "cookie-macaron", kind: "cookie", colors: ["#7A4630", "#D79A5B", "#FFF3EC"] },
  { id: "macaron-le", name: "Macaron Lẻ", desc: "Chọn từng chiếc: dâu, mint, chanh dây, socola, hạt dẻ, vani.", price: 38000, unit: "chiếc", cat: "cookie-macaron", kind: "macaron", colors: ["#8FE0BE", "#FF8FAE", "#FFE27D"] },
];

export const fmtVnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
