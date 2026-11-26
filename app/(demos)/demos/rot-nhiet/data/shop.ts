/** Thông tin vận hành của quán Rót Nhiệt (khu vực cấp quận, liên hệ không gọi được). */
export const SHOP = {
  name: "Rót Nhiệt Coffee Roasters",
  area: "Quận Sơn Trà, Đà Nẵng",
  phone: "0236 000 0000",
  email: "hello@rotnhiet.example",
};

/** Giờ mở cửa theo thứ (0 = Chủ nhật). Phút trong ngày. */
export const HOURS: { days: number[]; label: string; open: number; close: number }[] = [
  { days: [1, 2, 3, 4, 5], label: "Thứ hai đến thứ sáu", open: 6 * 60 + 30, close: 21 * 60 + 30 },
  { days: [6, 0], label: "Thứ bảy, Chủ nhật", open: 7 * 60, close: 22 * 60 },
];
export const DAY_NAME = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
export const fmtHM = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export const ZONES: { id: string; name: string; desc: string; x: number; y: number; w: number; h: number }[] = [
  { id: "bar", name: "Quầy bar", desc: "Pha espresso, latte, cà phê phin và pour-over tại quầy; gọi món và nhận ly ở đây.", x: 40, y: 40, w: 250, h: 70 },
  { id: "rang", name: "Góc rang", desc: "Máy rang nhỏ đặt sau kính, rang theo mẻ vào các buổi sáng; khách nhìn thấy hạt đổi màu.", x: 330, y: 40, w: 230, h: 120 },
  { id: "ban-dai", name: "Bàn dài", desc: "Một bàn gỗ dài ngồi chung, có ổ điện, hợp làm việc nhóm nhỏ.", x: 40, y: 140, w: 250, h: 70 },
  { id: "cua-so", name: "Dãy cửa sổ", desc: "Ghế đôi sát cửa sổ nhìn ra phố, hợp ngồi một mình hoặc hai người.", x: 40, y: 250, w: 300, h: 62 },
  { id: "quay-hat", name: "Kệ bán hạt", desc: "Kệ túi hạt 250g, phin và dụng cụ pha; nhân viên xay giúp theo cách pha của bạn.", x: 410, y: 200, w: 150, h: 112 },
];

export type Tier = { id: string; bean: string; retail: number; wholesale: number };
export const WHOLESALE: Tier[] = [
  { id: "B01", bean: "Nhiệt Đậm (Robusta, rang medium-dark)", retail: 660000, wholesale: 540000 },
  { id: "B02", bean: "Nhiệt Vừa (blend Arabica và Robusta)", retail: 780000, wholesale: 640000 },
  { id: "B03", bean: "Nhiệt Sáng (Arabica, rang sáng)", retail: 940000, wholesale: 780000 },
];

export const GIFTS: { id: string; name: string; desc: string; price: number; note?: string }[] = [
  { id: "G1", name: "Hộp ba vị", desc: "Ba túi 250g: Nhiệt Đậm, Nhiệt Vừa, Nhiệt Sáng, trong hộp giấy kèm thiệp.", price: 560000 },
  { id: "G2", name: "Túi quà một vị", desc: "Một túi 250g tuỳ chọn, gói giấy kraft, thiệp viết tay tại quán.", price: 10000, note: "Phí gói quà, cộng vào giá túi" },
  { id: "G3", name: "Quà văn phòng", desc: "Từ 10 hộp trở lên: in lời chúc theo mẫu và giao đến văn phòng ở Đà Nẵng.", price: 0, note: "Báo giá theo số lượng" },
];

export const SPECS = [
  { k: "Mở cửa", v: "06:30–21:30", s: "thứ hai đến thứ sáu; cuối tuần 07:00–22:00" },
  { k: "Ly từ", v: "29.000 ₫", s: "cà phê phin; espresso từ 35.000 ₫" },
  { k: "Hạt 250g từ", v: "165.000 ₫", s: "ba mức rang, xay theo cách pha của bạn" },
];
