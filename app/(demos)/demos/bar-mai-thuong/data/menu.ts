export type Drink = {
  id: string;
  name: string;
  kind: "cocktail" | "mocktail" | "bite";
  group: "signature" | "classic" | "zero" | "bite";
  alcohol: boolean;
  price: number; // VND, giá tham khảo
  desc: string;
  /** điểm vị 0-3 */
  sweet: number;
  sour: number;
  bitter: number;
  smoke: number;
  /** độ mạnh 0-3 (0 = không cồn) */
  strength: number;
  tone: "pink" | "cyan" | "violet" | "amber";
};

export const FLAVORS = [
  { key: "sweet", label: "Ngọt", hint: "Mềm, tròn vị" },
  { key: "sour", label: "Chua", hint: "Tươi, bật vị" },
  { key: "bitter", label: "Đắng", hint: "Sâu, đọng lâu" },
  { key: "smoke", label: "Khói", hint: "Ấm, hơi cháy" },
] as const;
export type FlavorKey = (typeof FLAVORS)[number]["key"];

export const DRINKS: Drink[] = [
  { id: "hoang-hon-son-tra", name: "Hoàng Hôn Sơn Trà", kind: "cocktail", group: "signature", alcohol: true, price: 150000, desc: "Rum trắng, chanh dây, cam vắt, viền muối hồng. Chua ngọt rõ ràng, uống nhanh.", sweet: 3, sour: 2, bitter: 0, smoke: 0, strength: 2, tone: "amber" },
  { id: "cyan-2099", name: "Cyan 2099", kind: "cocktail", group: "signature", alcohol: true, price: 160000, desc: "Gin, bưởi hồng, tonic và hoa đậu biếc đổi màu từ xanh sang tím.", sweet: 1, sour: 2, bitter: 2, smoke: 0, strength: 2, tone: "cyan" },
  { id: "khoi-muc", name: "Khói Mực", kind: "cocktail", group: "signature", alcohol: true, price: 180000, desc: "Mezcal, dứa nướng, chút ớt, phủ khói gỗ dưới nắp thuỷ tinh.", sweet: 2, sour: 1, bitter: 1, smoke: 3, strength: 3, tone: "violet" },
  { id: "hong-neon", name: "Hồng Neon", kind: "cocktail", group: "signature", alcohol: true, price: 150000, desc: "Vodka, vải, nước hoa hồng, chanh. Thơm, nhẹ và rất dễ uống.", sweet: 3, sour: 1, bitter: 0, smoke: 0, strength: 1, tone: "pink" },
  { id: "nua-dem-ca-phe", name: "Nửa Đêm Cà Phê", kind: "cocktail", group: "signature", alcohol: true, price: 160000, desc: "Rum, espresso, vani và bọt mịn. Đắng đầu, ngọt cuối.", sweet: 2, sour: 0, bitter: 3, smoke: 0, strength: 2, tone: "amber" },
  { id: "duong-ham-gio", name: "Đường Hầm Gió", kind: "cocktail", group: "classic", alcohol: true, price: 170000, desc: "Gin, vermouth đỏ và bitter cam, khuấy lạnh. Đắng gọn, thơm vỏ cam.", sweet: 1, sour: 0, bitter: 3, smoke: 0, strength: 3, tone: "pink" },
  { id: "whisky-sour-bui-sao", name: "Bụi Sao Whisky Sour", kind: "cocktail", group: "signature", alcohol: true, price: 170000, desc: "Whisky, chanh vàng, mật ong, bọt trứng. Chua mượt, hậu ấm.", sweet: 2, sour: 3, bitter: 0, smoke: 1, strength: 3, tone: "amber" },
  { id: "rooftop-spritz", name: "Rooftop Spritz", kind: "cocktail", group: "classic", alcohol: true, price: 140000, desc: "Vang sủi, bitter cam, soda và lát cam. Nhẹ, hợp khởi động buổi tối.", sweet: 1, sour: 1, bitter: 2, smoke: 0, strength: 1, tone: "pink" },
  { id: "than-hong", name: "Than Hồng", kind: "cocktail", group: "signature", alcohol: true, price: 190000, desc: "Whisky ngâm trà đen khói, đường nâu, bitter socola. Chậm và đậm.", sweet: 1, sour: 0, bitter: 2, smoke: 3, strength: 3, tone: "violet" },
  { id: "man-bien-mojito", name: "Mặn Biển Mojito", kind: "cocktail", group: "classic", alcohol: true, price: 140000, desc: "Rum, bạc hà, chanh xanh và một nhúm muối biển. Mát, chua sảng khoái.", sweet: 1, sour: 3, bitter: 0, smoke: 0, strength: 1, tone: "cyan" },
  { id: "tim-hem", name: "Tím Hẻm", kind: "cocktail", group: "signature", alcohol: true, price: 160000, desc: "Gin, nho tím, oải hương và chút chanh. Thơm hoa, ngọt vừa, hậu se nhẹ.", sweet: 2, sour: 1, bitter: 1, smoke: 0, strength: 2, tone: "violet" },
  { id: "ho-quang-0", name: "Hồ Quang 0%", kind: "mocktail", group: "zero", alcohol: false, price: 90000, desc: "Cam, gừng, chanh dây và soda. Chua ngọt có chút cay nhẹ ở cuối.", sweet: 2, sour: 2, bitter: 0, smoke: 0, strength: 0, tone: "amber" },
  { id: "tra-khoi-dem", name: "Trà Khói Đêm", kind: "mocktail", group: "zero", alcohol: false, price: 90000, desc: "Trà đen xông khói, mật ong, chanh. Ấm, đắng nhẹ, thơm gỗ.", sweet: 1, sour: 1, bitter: 2, smoke: 3, strength: 0, tone: "violet" },
  { id: "bien-zero", name: "Biển Zero", kind: "mocktail", group: "zero", alcohol: false, price: 90000, desc: "Bưởi hồng, tonic, hoa đậu biếc và rau mùi tây. Tỉnh táo, đắng chua gọn.", sweet: 1, sour: 2, bitter: 2, smoke: 0, strength: 0, tone: "cyan" },
  { id: "muc-rim-me", name: "Mực rim me", kind: "bite", group: "bite", alcohol: false, price: 110000, desc: "Mực một nắng rim me, ớt và hành phi. Nhắm cùng ly chua.", sweet: 0, sour: 0, bitter: 0, smoke: 0, strength: 0, tone: "amber" },
  { id: "phomai-mat-ong", name: "Phô mai chiên mật ong", kind: "bite", group: "bite", alcohol: false, price: 95000, desc: "Phô mai giòn vỏ, rưới mật ong và tiêu đen, dùng nóng.", sweet: 0, sour: 0, bitter: 0, smoke: 0, strength: 0, tone: "pink" },
  { id: "old-fashioned", name: "Old Fashioned", kind: "cocktail", group: "classic", alcohol: true, price: 150000, desc: "Whisky, đường nâu, bitter thơm và vỏ cam đốt nhẹ. Khuấy chậm, uống chậm.", sweet: 1, sour: 0, bitter: 2, smoke: 1, strength: 3, tone: "amber" },
  { id: "margarita", name: "Margarita", kind: "cocktail", group: "classic", alcohol: true, price: 140000, desc: "Tequila, cam ngọt, chanh xanh, viền muối. Chua gọn, mát và tỉnh.", sweet: 1, sour: 3, bitter: 0, smoke: 0, strength: 2, tone: "cyan" },
  { id: "espresso-martini", name: "Espresso Martini", kind: "cocktail", group: "classic", alcohol: true, price: 160000, desc: "Vodka, espresso, rượu cà phê, lắc lạnh cho lớp bọt mịn. Đắng thơm, ngọt cuối.", sweet: 2, sour: 0, bitter: 3, smoke: 0, strength: 2, tone: "violet" },
  { id: "vuon-sau-mua", name: "Vườn Sau Mưa", kind: "mocktail", group: "zero", alcohol: false, price: 80000, desc: "Dưa leo, bạc hà, chanh xanh và soda. Xanh, mát, rất nhẹ.", sweet: 1, sour: 2, bitter: 0, smoke: 0, strength: 0, tone: "cyan" },
  { id: "dao-hoang-hon", name: "Đào Hoàng Hôn", kind: "mocktail", group: "zero", alcohol: false, price: 85000, desc: "Trà đào, chanh dây, lát đào ngâm và đá bào. Ngọt thơm, hợp ly đầu tiên.", sweet: 3, sour: 1, bitter: 0, smoke: 0, strength: 0, tone: "pink" },
  { id: "khoai-toi-ot", name: "Khoai tây chiên tỏi ớt", kind: "bite", group: "bite", alcohol: false, price: 85000, desc: "Khoai cắt dày chiên giòn, lắc tỏi phi và ớt khô, kèm sốt mayo chanh.", sweet: 0, sour: 0, bitter: 0, smoke: 0, strength: 0, tone: "amber" },
  { id: "canh-ga-me", name: "Cánh gà sốt me", kind: "bite", group: "bite", alcohol: false, price: 120000, desc: "Sáu cánh gà chiên, áo sốt me chua ngọt, rắc mè rang.", sweet: 0, sour: 0, bitter: 0, smoke: 0, strength: 0, tone: "pink" },
  { id: "dia-phomai-trai-cay", name: "Đĩa phô mai & trái cây", kind: "bite", group: "bite", alcohol: false, price: 180000, desc: "Ba loại phô mai, nho, táo, hạnh nhân và mật ong. Dành cho 2 đến 4 người chia.", sweet: 0, sour: 0, bitter: 0, smoke: 0, strength: 0, tone: "violet" },
  { id: "bap-rang-trung-muoi", name: "Bắp rang trứng muối", kind: "bite", group: "bite", alcohol: false, price: 70000, desc: "Bắp rang bơ lắc bột trứng muối, mặn béo, nhắm cùng ly chua.", sweet: 0, sour: 0, bitter: 0, smoke: 0, strength: 0, tone: "cyan" },
];

export const SIGNATURES = [
  { id: "khoi-muc", img: "smoke-red", tag: "Vị khói", alt: "Ly cocktail đỏ có khói bốc lên trên nền tối" },
  { id: "hong-neon", img: "pink-coupes", tag: "Vị ngọt hoa", alt: "Hai ly coupe cocktail hồng trước nền kim tuyến" },
  { id: "cyan-2099", img: "pour-blue", tag: "Vị chua đắng", alt: "Tay bartender rót cocktail xanh qua dụng cụ lọc vào ly" },
] as const;

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);


export const GROUPS = [
  { id: "signature", label: "Signature", note: "Ly do bếp pha chế đặt tên, đổi theo mùa nguyên liệu." },
  { id: "classic", label: "Cổ điển", note: "Công thức quen thuộc, pha đúng chuẩn." },
  { id: "zero", label: "Không cồn", note: "Mocktail nhiều lớp vị, không rượu." },
  { id: "bite", label: "Đồ ăn nhẹ", note: "Món nhắm và đĩa chia cho cả bàn." },
] as const;
export type GroupId = (typeof GROUPS)[number]["id"];
