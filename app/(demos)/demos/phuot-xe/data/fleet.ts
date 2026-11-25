/** Dữ liệu xe, phụ kiện, bảo hiểm, giao nhận. Giá tham khảo (VND), cửa hàng xác nhận khi tư vấn. */

export type BikeClass = "so" | "ga" | "con";

export type Bike = {
  id: string;
  name: string;
  cls: BikeClass;
  classLabel: string;
  /** dung tích (cc) */
  cc: number;
  gearbox: string;
  seatMm: number;
  tankL: number;
  /** số chỗ ngồi */
  seats: 1 | 2;
  /** mức tiêu thụ tham khảo, lít/100 km */
  fuel: string;
  /** hợp với */
  fit: string;
  note: string;
  perDay: number;
  perWeek: number;
  /** tiền cọc hoàn lại khi trả xe nguyên trạng */
  deposit: number;
};

export const CLASS_LABEL: Record<BikeClass, string> = { so: "Xe số", ga: "Tay ga", con: "Côn tay" };

export const BIKES: readonly Bike[] = [
  {
    id: "so-110", name: "Số 110 Gọn", cls: "so", classLabel: "Xe số", cc: 110, gearbox: "4 số tròn", seatMm: 765, tankL: 4.2, seats: 2, fuel: "≈ 1,9", fit: "Phố, Sơn Trà, đường bằng",
    note: "Bền, dễ lái, ít hao xăng. Hợp người mới thuê xe lần đầu.", perDay: 130000, perWeek: 750000, deposit: 2000000,
  },
  {
    id: "so-125", name: "Số 125 Bền", cls: "so", classLabel: "Xe số", cc: 125, gearbox: "4 số tròn", seatMm: 775, tankL: 4.0, seats: 2, fuel: "≈ 2,1", fit: "Đi xa, chở thêm hành lý",
    note: "Máy khỏe hơn bản 110, leo dốc nhẹ nhàng, giá đỡ sau rộng.", perDay: 150000, perWeek: 880000, deposit: 2500000,
  },
  {
    id: "ga-110", name: "Tay ga 110 Phố", cls: "ga", classLabel: "Tay ga", cc: 110, gearbox: "Vô cấp CVT", seatMm: 760, tankL: 4.0, seats: 2, fuel: "≈ 1,8", fit: "Phố, Hội An, đường biển",
    note: "Gọn nhẹ, cốp rộng, không cần sang số. Dễ dừng đỗ để chụp ảnh.", perDay: 150000, perWeek: 880000, deposit: 3000000,
  },
  {
    id: "ga-125", name: "Tay ga 125 Biển", cls: "ga", classLabel: "Tay ga", cc: 125, gearbox: "Vô cấp CVT", seatMm: 780, tankL: 5.5, seats: 2, fuel: "≈ 2,0", fit: "Biển, Hội An, Sơn Trà",
    note: "Êm, yên rộng, bình xăng dài hơi cho cả ngày dạo biển.", perDay: 180000, perWeek: 1050000, deposit: 3000000,
  },
  {
    id: "ga-155", name: "Tay ga 155 Đèo", cls: "ga", classLabel: "Tay ga", cc: 155, gearbox: "Vô cấp CVT", seatMm: 790, tankL: 8.1, seats: 2, fuel: "≈ 2,4", fit: "Hải Vân, Bà Nà, hai người",
    note: "Có phanh ABS, kính chắn gió thấp, đủ lực lên đèo khi chở hai người.", perDay: 280000, perWeek: 1650000, deposit: 4000000,
  },
  {
    id: "con-150", name: "Côn 150 Sprint", cls: "con", classLabel: "Côn tay", cc: 150, gearbox: "6 số, côn tay", seatMm: 795, tankL: 4.5, seats: 2, fuel: "≈ 2,6", fit: "Cua đèo, chạy nhanh vừa phải",
    note: "Dáng thể thao, phản hồi nhạy. Dành cho người đã quen sang số côn.", perDay: 330000, perWeek: 1950000, deposit: 5000000,
  },
  {
    id: "con-175", name: "Côn 175 Rally", cls: "con", classLabel: "Côn tay", cc: 175, gearbox: "6 số, côn tay", seatMm: 810, tankL: 10, seats: 2, fuel: "≈ 3,0", fit: "Đường dài, đèo dốc",
    note: "Gầm cao hơn, giảm xóc hành trình dài, hợp cung đường xấu xen kẽ.", perDay: 420000, perWeek: 2500000, deposit: 6000000,
  },
  {
    id: "adv-250", name: "Phượt 250 Adventure", cls: "con", classLabel: "Côn tay", cc: 250, gearbox: "6 số, côn tay", seatMm: 830, tankL: 14, seats: 2, fuel: "≈ 3,6", fit: "Đường trường nhiều ngày",
    note: "Bình xăng lớn, kính chắn gió cao, yên 830 mm. Dung tích lớn có thể cần hạng bằng lái tương ứng.", perDay: 650000, perWeek: 3900000, deposit: 8000000,
  },
] as const;

export type Accessory = { id: string; name: string; desc: string; price: number; unit: "day" | "once" };

export const ACCESSORIES: readonly Accessory[] = [
  { id: "mu-2", name: "Mũ bảo hiểm thứ hai", desc: "Cho người ngồi sau, nửa đầu, có quai cài chắc", price: 15000, unit: "day" },
  { id: "mu-full", name: "Mũ fullface", desc: "Kèm kính chống chói, size M hoặc L", price: 30000, unit: "day" },
  { id: "ao-mua", name: "Áo mưa bộ", desc: "Áo và quần, đóng gói gọn trong cốp", price: 20000, unit: "once" },
  { id: "gia-dt", name: "Giá đỡ điện thoại và sạc", desc: "Giá kẹp chống rung và cáp sạc USB", price: 30000, unit: "once" },
  { id: "balo", name: "Balo chống nước 20 L", desc: "Cho đồ dùng cá nhân khi đi đèo", price: 50000, unit: "once" },
  { id: "bao-ho", name: "Găng tay và bảo hộ đầu gối", desc: "Một bộ, size theo yêu cầu", price: 40000, unit: "day" },
] as const;

export type Insurance = { id: string; name: string; desc: string; perDay: number };

export const INSURANCES: readonly Insurance[] = [
  { id: "co-ban", name: "Cơ bản", desc: "Đi kèm xe. Hư hỏng, mất mát theo điều khoản thuê xe.", perDay: 0 },
  { id: "yen-tam", name: "Yên tâm", desc: "Giảm mức khách chịu khi trầy xước, đổ xe nhẹ. Chi tiết ghi trong thỏa thuận thuê.", perDay: 30000 },
  { id: "tron-hanh-trinh", name: "Trọn hành trình", desc: "Như gói Yên tâm, thêm hỗ trợ cứu hộ xe trong khu vực Đà Nẵng, Hội An, Huế.", perDay: 55000 },
] as const;

export type Delivery = { id: string; name: string; desc: string; price: number };

export const DELIVERIES: readonly Delivery[] = [
  { id: "tai-cua-hang", name: "Tự đến nhận tại cửa hàng", desc: "Nhận và trả xe tại cửa hàng ở Đà Nẵng", price: 0 },
  { id: "giao-1-chieu", name: "Giao xe tận nơi", desc: "Giao tại khách sạn hoặc nhà trong nội thành, trả tại cửa hàng", price: 50000 },
  { id: "giao-2-chieu", name: "Giao và nhận lại tận nơi", desc: "Hai chiều trong nội thành Đà Nẵng", price: 90000 },
  { id: "san-bay", name: "Giao tại sân bay hoặc ga", desc: "Hai chiều, hẹn giờ trước", price: 120000 },
] as const;

export const MAX_DAYS = 30;
