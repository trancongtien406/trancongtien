import type { WineKind } from "./wines";

export const AREA = "Quận Ngũ Hành Sơn, Đà Nẵng";

/** Giờ mở cửa theo thứ (0 = Chủ nhật). close tính theo phút từ 0:00; 1440 = nửa đêm. */
export const HOURS: { d: number; label: string; open: string; close: string; openMin: number; closeMin: number }[] = [
  { d: 1, label: "Thứ hai", open: "17:00", close: "23:00", openMin: 1020, closeMin: 1380 },
  { d: 2, label: "Thứ ba", open: "17:00", close: "23:00", openMin: 1020, closeMin: 1380 },
  { d: 3, label: "Thứ tư", open: "17:00", close: "23:00", openMin: 1020, closeMin: 1380 },
  { d: 4, label: "Thứ năm", open: "17:00", close: "23:00", openMin: 1020, closeMin: 1380 },
  { d: 5, label: "Thứ sáu", open: "17:00", close: "24:00", openMin: 1020, closeMin: 1440 },
  { d: 6, label: "Thứ bảy", open: "17:00", close: "24:00", openMin: 1020, closeMin: 1440 },
  { d: 0, label: "Chủ nhật", open: "16:00", close: "22:00", openMin: 960, closeMin: 1320 },
];

export const HAPPY = {
  days: "Thứ hai đến thứ sáu",
  time: "17:00 – 19:00",
  deal: "Mọi ly vang giảm 20%, kèm một đĩa hạt và bánh quy phô mai cho bàn từ hai khách.",
};

export const INFO = [
  ["Mở cửa", "17:00 – 23:00, cuối tuần đến 24:00"],
  ["Happy hour", "17:00 – 19:00, thứ hai đến thứ sáu"],
  ["Vang theo ly", "Từ 150.000₫ / ly 150 ml"],
  ["Độ tuổi", "Dành cho khách từ 18 tuổi"],
] as const;

export type Flight = { id: string; name: string; sub: string; price: number; glasses: { kind: WineKind; body: 1 | 2 | 3; label: string }[]; note: string };

/** Set thử rượu (flight): ba hoặc bốn ly 60 ml, sắp theo thứ tự từ nhẹ đến đậm. Tên theo phong cách nho, không nhãn hiệu. */
export const FLIGHTS: Flight[] = [
  {
    id: "khoi-dau",
    name: "Set khởi đầu",
    sub: "3 ly · 60 ml mỗi ly",
    price: 220000,
    glasses: [
      { kind: "sui", body: 1, label: "Sủi khô kiểu Brut" },
      { kind: "trang", body: 1, label: "Trắng tươi kiểu Sauvignon Blanc" },
      { kind: "hong", body: 1, label: "Hồng khô kiểu Provence" },
    ],
    note: "Hợp người mới thử: đi từ bọt, qua chua sạch, tới vị trái cây mát.",
  },
  {
    id: "do-nhe-den-dam",
    name: "Set đỏ từ nhẹ đến đậm",
    sub: "3 ly · 60 ml mỗi ly",
    price: 260000,
    glasses: [
      { kind: "do", body: 1, label: "Đỏ nhẹ kiểu Pinot Noir" },
      { kind: "do", body: 2, label: "Đỏ mềm kiểu Merlot" },
      { kind: "do", body: 3, label: "Đỏ đậm kiểu Cabernet Sauvignon" },
    ],
    note: "Thấy rõ vang đỏ đậm dần theo thân và tannin, ăn kèm bánh mì nướng.",
  },
  {
    id: "theo-phomai",
    name: "Set theo khay phô mai",
    sub: "4 ly · 60 ml mỗi ly · kèm khay phô mai nhỏ",
    price: 420000,
    glasses: [
      { kind: "sui", body: 1, label: "Sủi khô kiểu Brut" },
      { kind: "trang", body: 2, label: "Trắng tròn kiểu Chardonnay" },
      { kind: "do", body: 2, label: "Đỏ mềm kiểu Merlot" },
      { kind: "do", body: 3, label: "Đỏ ủ lâu kiểu Bordeaux" },
    ],
    note: "Mỗi ly đi cùng một loại phô mai trên khay, từ mềm đến ủ lâu.",
  },
];

export const BOARDS = [
  { name: "Khay thịt nguội và phô mai, 2 – 3 người", price: 380000, desc: "Ba loại thịt nguội, hai loại phô mai, bánh mì nướng, hạt, mứt trái cây." },
  { name: "Khay thịt nguội và phô mai, 4 – 6 người", price: 620000, desc: "Gấp rưỡi phần trên, thêm dưa chuột muối, nho và mật ong." },
] as const;

export const EVENTS = [
  { t: "Bàn nhóm 6 – 12 khách", d: "Giữ một bàn dài cho nhóm bạn hoặc buổi họp mặt nhỏ. Gọi chai theo bàn, ra đĩa nhắm theo đợt.", meta: ["Đặt trước ít nhất 24 giờ", "Mức chi tối thiểu tham khảo 400.000₫ mỗi khách", "Cọc 30%"] },
  { t: "Đêm thử vang, tối thứ sáu", d: "Sáu ly 60 ml theo một chủ đề mỗi tuần, như một kiểu nho nhìn qua ba cách làm. Có người rót giải thích ngắn và đồ nhắm nhỏ.", meta: ["19:30 – 21:30", "480.000₫ mỗi khách", "Tối đa 16 khách, đăng ký trước"] },
  { t: "Tiệc nhỏ bao nguyên quán", d: "Sinh nhật, kỷ niệm hay họp mặt công ty nhỏ. Tiệm chuẩn bị bảng vang, khay nhắm và sắp chỗ ngồi theo yêu cầu.", meta: ["20 – 30 khách", "Mức chi tối thiểu tham khảo 12.000.000₫", "Cọc 30%, báo trước 3 ngày"] },
] as const;

export const TAKEAWAY = [
  { t: "Chai mang về", d: "Mọi chai trong thực đơn còn hàng đều mang về được, giá chai giảm 10% so với dùng tại quán. Đóng túi giấy và nút bảo quản.", price: "Giảm 10% giá chai" },
  { t: "Hộp quà hai chai", d: "Chọn hai chai cùng hoặc khác phong cách, kèm gói hạt và bánh quy phô mai, thiệp viết tay.", price: "Tổng hai chai + 180.000₫" },
  { t: "Thẻ quà tặng", d: "Mệnh giá 500.000₫ hoặc 1.000.000₫, dùng tại quán trong 6 tháng, không đổi thành tiền mặt.", price: "500.000₫ · 1.000.000₫" },
] as const;

export const RULES = [
  { t: "Từ 18 tuổi", d: "Quán chỉ phục vụ khách từ 18 tuổi trở lên và có thể xin xem giấy tờ tuỳ thân khi cần." },
  { t: "Uống có trách nhiệm", d: "Không lái xe sau khi uống. Tiệm sẵn lòng gọi xe giúp bạn, và luôn có nước lọc cùng đồ uống không cồn." },
  { t: "Giữ bàn và đặt cọc", d: "Bàn giữ 15 phút so với giờ hẹn. Nhóm từ 6 khách cọc 30%, huỷ trước 24 giờ được hoàn cọc." },
  { t: "Mang rượu riêng", d: "Được mang tối đa một chai mỗi bàn, phí mở chai 200.000₫. Không áp dụng cho chai đã có trong thực đơn." },
  { t: "Không gian chung", d: "Không hút thuốc trong nhà, nói chuyện vừa phải để cả phòng giữ được không khí yên tĩnh." },
] as const;

export const FAQ: [string, string][] = [
  ["Mình không rành về vang, có hợp không?", "Rất hợp. Bạn chỉ cần nói món và dịp, hoặc dùng phần Gợi ý ly theo món ở dưới để ra ba gợi ý theo phong cách. Người rót sẽ giải thích ngắn gọn, không dùng thuật ngữ."],
  ["Giá theo ly và theo chai khác nhau thế nào?", "Một ly là 150 ml, một chai là 750 ml, tức khoảng năm ly. Gọi chai thường lợi hơn từ ba ly trở lên; một số chai ủ lâu chỉ bán nguyên chai."],
  ["Set thử rượu gồm những gì?", "Ba hoặc bốn ly 60 ml sắp từ nhẹ đến đậm. Chọn set ở phần Set thử rượu, giá ghi theo mỗi set, có kèm khay phô mai nhỏ ở set bốn ly."],
  ["Happy hour áp dụng khi nào?", "Từ thứ hai đến thứ sáu, 17:00 – 19:00: mọi ly vang giảm 20%. Không áp dụng cho chai và set thử rượu."],
  ["Nhóm đông có đặt được không?", "Bàn nhóm 6 – 12 khách đặt trước ít nhất 24 giờ, cọc 30%. Nhóm 20 – 30 khách có thể bao nguyên quán."],
  ["Có đồ uống không cồn không?", "Có. Danh sách không cồn gồm nước ép, trà lạnh và soda tự pha; bạn có thể gọi cùng bàn vang."],
  ["Có mang chai về hoặc làm quà được không?", "Được. Chai mang về giảm 10%, hộp quà hai chai kèm thiệp viết tay, và có thẻ quà tặng 500.000₫ hoặc 1.000.000₫."],
  ["Đặt bàn có mất phí không?", "Bàn dưới 6 khách không cọc. Tóm tắt trên trang chỉ giúp bạn chuẩn bị thông tin; yêu cầu thật được gửi qua form tư vấn của website."],
];
