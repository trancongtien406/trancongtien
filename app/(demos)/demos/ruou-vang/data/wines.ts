export type WineKind = "do" | "trang" | "hong" | "sui";
export type FoodKey = "bo" | "haisan" | "phomai" | "monviet" | "mi" | "trangmieng";
export type MoodKey = "henho" | "banbe" | "kyniem" | "thugian";

export type Wine = {
  id: string;
  /** tên theo phong cách nho/vùng chung, không phải nhãn hiệu */
  name: string;
  kind: WineKind;
  body: 1 | 2 | 3;
  sweet: 0 | 1 | 2;
  glass?: number;
  bottle: number;
  note: string;
  foods: FoodKey[];
  moods: MoodKey[];
};

export const KINDS: { id: WineKind; label: string; short: string; roman: string; grapes: string; note: string; pairs: string }[] = [
  { id: "do", label: "Vang đỏ", short: "Đỏ", roman: "I", grapes: "Pinot Noir · Merlot · Cabernet", note: "Từ mềm như quả mọng đến đậm như gỗ sồi và tiêu đen. Hợp bàn có thịt nướng, phô mai ủ lâu.", pairs: "Bò, cừu, phô mai cứng" },
  { id: "trang", label: "Vang trắng", short: "Trắng", roman: "II", grapes: "Sauvignon Blanc · Chardonnay", note: "Tươi, sáng, có độ chua dễ chịu. Hợp hải sản, rau thơm và những bữa trưa muộn.", pairs: "Hải sản, gà, món Việt thanh" },
  { id: "hong", label: "Vang hồng", short: "Hồng", roman: "III", grapes: "Grenache · Syrah hồng", note: "Giữa đỏ và trắng: mùi dâu, dưa lê, uống mát. Dễ gọi khi cả bàn mỗi người một món.", pairs: "Salad, gỏi, đồ nguội" },
  { id: "sui", label: "Vang sủi", short: "Sủi", roman: "IV", grapes: "Brut · Moscato", note: "Bọt nhỏ, mở đầu bữa hoặc đóng lại bằng món ngọt. Ly nào cũng thấy lễ.", pairs: "Món chiên, tráng miệng" },
];

export const WINES: Wine[] = [
  { id: "pinot", name: "Đỏ nhẹ kiểu Pinot Noir", kind: "do", body: 1, sweet: 0, glass: 150000, bottle: 780000, note: "Anh đào đỏ, hoa hồng khô, chát mềm.", foods: ["phomai", "monviet", "mi"], moods: ["henho", "banbe", "thugian"] },
  { id: "merlot", name: "Đỏ mềm kiểu Merlot", kind: "do", body: 2, sweet: 0, glass: 160000, bottle: 820000, note: "Mận chín, socola sữa, thân tròn.", foods: ["phomai", "mi", "monviet"], moods: ["banbe", "thugian"] },
  { id: "cabernet", name: "Đỏ đậm kiểu Cabernet Sauvignon", kind: "do", body: 3, sweet: 0, glass: 180000, bottle: 950000, note: "Lý chua đen, gỗ sồi, tannin rõ.", foods: ["bo"], moods: ["kyniem", "henho"] },
  { id: "malbec", name: "Đỏ đậm kiểu Malbec", kind: "do", body: 3, sweet: 0, glass: 180000, bottle: 920000, note: "Mận đen, hoa violet, chút khói.", foods: ["bo", "monviet"], moods: ["banbe", "kyniem"] },
  { id: "syrah", name: "Đỏ đậm kiểu Syrah", kind: "do", body: 3, sweet: 0, glass: 170000, bottle: 880000, note: "Tiêu đen, mận khô, thoảng thịt xông khói.", foods: ["bo", "mi"], moods: ["banbe", "thugian"] },
  { id: "reserve", name: "Đỏ ủ lâu kiểu Bordeaux", kind: "do", body: 3, sweet: 0, bottle: 1450000, note: "Tầng hương gỗ, da thuộc, kết thúc dài.", foods: ["bo", "phomai"], moods: ["kyniem"] },
  { id: "sauv", name: "Trắng tươi kiểu Sauvignon Blanc", kind: "trang", body: 1, sweet: 0, glass: 150000, bottle: 700000, note: "Chanh xanh, cỏ mới cắt, chua sạch.", foods: ["haisan", "monviet"], moods: ["thugian", "banbe"] },
  { id: "grigio", name: "Trắng nhẹ kiểu Pinot Grigio", kind: "trang", body: 1, sweet: 0, glass: 150000, bottle: 680000, note: "Táo xanh, lê, khô và gọn.", foods: ["haisan", "mi"], moods: ["thugian", "banbe"] },
  { id: "chard", name: "Trắng tròn kiểu Chardonnay", kind: "trang", body: 2, sweet: 0, glass: 180000, bottle: 880000, note: "Táo chín, bơ, chút vani từ thùng sồi.", foods: ["phomai", "haisan", "mi"], moods: ["henho", "kyniem"] },
  { id: "riesling", name: "Trắng thơm kiểu Riesling bán khô", kind: "trang", body: 1, sweet: 1, glass: 160000, bottle: 750000, note: "Đào trắng, vỏ chanh, ngọt nhẹ cân bằng độ chua.", foods: ["monviet", "trangmieng"], moods: ["banbe", "thugian"] },
  { id: "rose", name: "Hồng khô kiểu Provence", kind: "hong", body: 1, sweet: 0, glass: 160000, bottle: 780000, note: "Dâu tây, dưa lê, hoa cam.", foods: ["haisan", "monviet", "phomai"], moods: ["henho", "thugian"] },
  { id: "blush", name: "Hồng ngọt nhẹ kiểu Zinfandel", kind: "hong", body: 2, sweet: 1, glass: 150000, bottle: 650000, note: "Dâu chín, kẹo trái cây, uống rất mát.", foods: ["trangmieng", "mi"], moods: ["banbe", "thugian"] },
  { id: "brut", name: "Sủi khô kiểu Brut", kind: "sui", body: 1, sweet: 0, glass: 190000, bottle: 950000, note: "Táo xanh, bánh mì nướng, bọt mịn.", foods: ["haisan", "phomai", "monviet"], moods: ["kyniem", "henho"] },
  { id: "moscato", name: "Sủi ngọt nhẹ kiểu Moscato", kind: "sui", body: 1, sweet: 2, glass: 170000, bottle: 720000, note: "Đào, hoa cam, ngọt thanh, độ cồn thấp.", foods: ["trangmieng"], moods: ["banbe", "kyniem"] },
];

export const FOODS: { key: FoodKey; label: string; dish: string }[] = [
  { key: "bo", label: "Bò, thịt nướng", dish: "Bít tết thăn áp chảo, khoai nghiền và sốt tiêu xanh" },
  { key: "haisan", label: "Hải sản", dish: "Hàu lạnh với chanh, hoặc tôm áp chảo bơ tỏi" },
  { key: "phomai", label: "Phô mai", dish: "Khay ba loại phô mai, nho và mật ong" },
  { key: "monviet", label: "Món Việt", dish: "Gỏi bò, nem nướng hoặc cá nướng riềng mẻ" },
  { key: "mi", label: "Mì Ý, pasta", dish: "Pasta sốt cà chua nướng và húng quế" },
  { key: "trangmieng", label: "Tráng miệng", dish: "Bánh chocolate đắng hoặc panna cotta quả mọng" },
];

export const MOODS: { key: MoodKey; label: string }[] = [
  { key: "henho", label: "Hẹn hò" },
  { key: "banbe", label: "Bạn bè" },
  { key: "kyniem", label: "Kỷ niệm" },
  { key: "thugian", label: "Thư giãn" },
];

export const BUDGETS: { key: string; label: string; max: number }[] = [
  { key: "any", label: "Chưa nghĩ tới", max: Infinity },
  { key: "b1", label: "Dưới 750.000đ", max: 750000 },
  { key: "b2", label: "Đến 900.000đ", max: 900000 },
  { key: "b3", label: "Đến 1.200.000đ", max: 1200000 },
  { key: "b4", label: "Trên 1.200.000đ", max: Infinity },
];

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n).replace(/\s/g, " ");

export const PLATES = [
  { name: "Khay ba phô mai", desc: "Một loại mềm, một loại ủ lâu, một loại xanh; kèm nho, hạt và mật ong.", price: 280000, with: "Hợp đỏ mềm và trắng tròn" },
  { name: "Thịt nguội và dưa chuột muối", desc: "Giăm bông, salami, bánh mì nướng giòn.", price: 240000, with: "Hợp hồng khô và sủi Brut" },
  { name: "Pâté gan gà, bánh mì nướng", desc: "Mịn, béo, thêm mứt hành caramel.", price: 190000, with: "Hợp đỏ nhẹ và trắng thơm" },
  { name: "Hàu lạnh, chanh và tiêu", desc: "Ăn ngay khi vừa mở, không sốt nặng.", price: 260000, with: "Hợp trắng tươi và sủi khô" },
  { name: "Bánh chocolate đắng", desc: "Đặc, ít ngọt, kèm quả mọng.", price: 140000, with: "Hợp sủi ngọt nhẹ" },
];
