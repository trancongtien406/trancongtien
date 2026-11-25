export const NAV = [
  { href: "#khong-gian", label: "Không gian" },
  { href: "#so-do", label: "Sơ đồ" },
  { href: "#gia", label: "Bảng giá" },
  { href: "#tien-ich", label: "Tiện ích" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
];

export const IMG = (f: string, w: 600 | 1200 | 2000 = 1200) => `/images/demos/cowork-grid/${f}-${w}.webp`;

export const HERO = {
  kicker: "KHÔNG GIAN LÀM VIỆC CHUNG · ĐÀ NẴNG",
  h1: ["Chọn đúng ô.", "Làm đúng việc"],
  lead: "Ô Lưới chia không gian làm việc thành từng ô rõ ràng: hot desk, bàn cố định, phòng họp, phòng riêng. Xem sơ đồ chỗ ngồi, chọn gói, rồi ghé ngồi thử một buổi.",
  chips: ["Hot desk", "Bàn cố định", "Phòng họp", "Phòng riêng"],
};

export const SPECS = [
  { k: "A1", label: "Chỗ hot desk", value: 40 },
  { k: "B2", label: "Bàn cố định", value: 16 },
  { k: "C3", label: "Phòng họp", value: 2 },
  { k: "D4", label: "Phòng riêng", value: 4 },
];

export const MANIFESTO =
  "Làm việc tốt bắt đầu từ một chỗ ngồi đúng. Ở Ô Lưới, mỗi mét vuông đều có toạ độ, mỗi chỗ ngồi đều có tên, và bạn thấy chỗ nào còn trống trước khi bước vào.";

export const ZONES = [
  { code: "A1", name: "Khu mở", tag: "Hot desk", text: "Dãy bàn dài cạnh cửa sổ lớn. Ngồi chỗ nào còn trống, ổ cắm và đèn bàn có ở từng chỗ.", img: "khong-gian-trang", alt: "Không gian làm việc mở, bàn trắng, cây xanh và nắng chiều" },
  { code: "B2", name: "Bàn cố định", tag: "Bàn riêng", text: "Một bàn của riêng bạn, kèm tủ cá nhân. Sáng đến là ngồi làm, chiều về để đồ lại.", img: "khu-lam-viec-mo", alt: "Sàn làm việc rộng với bàn nâng hạ và cửa sổ lớn" },
  { code: "C3", name: "Phòng họp", tag: "Theo giờ", text: "Hai phòng vách kính cho 6 và 10 người, có màn hình trình chiếu và bảng viết.", img: "phong-hop-kinh", alt: "Phòng họp vách kính, bàn dài và màn hình treo tường" },
  { code: "D4", name: "Phòng riêng", tag: "Theo tháng", text: "Bốn phòng khoá riêng từ 2 đến 8 chỗ cho đội nhóm cần không gian của mình.", img: "phong-hop-nang-chieu", alt: "Phòng họp lúc chiều muộn, nắng đổ dài trên sàn" },
] as const;

export const VALUES = [
  { n: "01", t: "Linh hoạt", d: "Thuê theo ngày, theo tháng hoặc theo giờ họp. Đổi gói khi nhu cầu đổi." },
  { n: "02", t: "Tập trung", d: "Bàn rộng, đèn bàn, ổ cắm từng chỗ và những góc ít người qua lại." },
  { n: "03", t: "Kết nối", d: "Ngồi cạnh freelancer, đội sản phẩm, studio nhỏ. Có chỗ trò chuyện, có chỗ im lặng." },
  { n: "04", t: "Sẵn sàng", d: "Mạng, điện, cà phê và máy in đã có sẵn. Mang laptop đến là làm được." },
];

export const DAY_BEATS = [
  { from: 7, to: 10, t: "Sáng yên tĩnh", d: "Khu mở còn thưa. Giờ tốt cho việc cần tập trung sâu." },
  { from: 10, to: 12, t: "Vào nhịp", d: "Dãy bàn chung đầy dần. Phòng họp bắt đầu có lịch." },
  { from: 12, to: 14, t: "Nghỉ trưa", d: "Khu cà phê đông nhất, khu mở dịu lại." },
  { from: 14, to: 17, t: "Chiều làm việc nhóm", d: "Phòng họp và phòng riêng sôi động, góc cửa sổ nắng nghiêng." },
  { from: 17, to: 21, t: "Tối thưa dần", d: "Còn lại những người làm nốt việc. Chỗ dễ chọn, tiếng ồn thấp." },
];

export const AMENITIES = [
  { k: "wifi", t: "Mạng Wi-Fi toàn khu", d: "Có cổng mạng dây ở bàn cố định và phòng riêng." },
  { k: "coffee", t: "Cà phê và trà", d: "Quầy tự phục vụ ở góc E, thêm đồ uống pha tại quầy." },
  { k: "print", t: "In ấn và scan", d: "Máy in dùng chung, tính theo trang." },
  { k: "plug", t: "Ổ cắm từng chỗ", d: "Ổ điện và cổng sạc USB-C ở mỗi vị trí ngồi." },
  { k: "locker", t: "Tủ cá nhân", d: "Đi kèm bàn cố định; hot desk dùng tủ khoá tạm." },
  { k: "booth", t: "Phòng gọi điện", d: "Buồng nhỏ cho cuộc gọi cần yên tĩnh." },
  { k: "air", t: "Điều hoà", d: "Toàn khu làm việc, chỉnh nhiệt theo từng khu." },
  { k: "mail", t: "Nhận thư và bưu kiện", d: "Nhận hộ cho thành viên bàn cố định và phòng riêng." },
];

export type PlanCard = {
  code: string; name: string; unit: string; price: string; from?: boolean; note: string; items: string[]; fit: string; feature?: boolean;
};
export const PLAN_CARDS: PlanCard[] = [
  {
    code: "01", name: "Hot desk", price: "1.290.000", unit: "đ mỗi người mỗi tháng · 12 ngày", from: false,
    note: "Ngồi bất cứ chỗ trống nào trong khu mở. Lẻ từ 120.000 đ mỗi ngày.",
    items: ["Chỗ ngồi linh hoạt khu A", "Wi-Fi, cà phê, máy in dùng chung", "Tủ khoá tạm trong ngày"], fit: "1 người · 2 đến 3 ngày mỗi tuần",
  },
  {
    code: "02", name: "Bàn cố định", price: "2.790.000", unit: "đ mỗi người mỗi tháng", feature: true,
    note: "Bàn riêng ở khu B, tủ cá nhân và ổ cắm riêng. Ngồi cùng chỗ mỗi ngày.",
    items: ["Bàn và tủ cá nhân", "Cổng mạng dây tại bàn", "Nhận thư và bưu kiện"], fit: "1 đến 3 người · 5 ngày mỗi tuần",
  },
  {
    code: "03", name: "Phòng riêng", price: "7.200.000", unit: "đ mỗi phòng mỗi tháng", from: true,
    note: "Phòng khoá riêng 2, 4, 6 hoặc 8 chỗ. Giá khởi điểm cho phòng 2 chỗ.",
    items: ["Phòng khoá riêng khu D", "Bàn ghế cho cả nhóm", "Dùng chung khu cà phê và in ấn"], fit: "Đội 2 đến 8 người",
  },
];

export const ROOM_ROWS = [
  { name: "Phòng 2 chỗ (P-1)", price: "7.200.000" },
  { name: "Phòng 4 chỗ (P-2)", price: "12.500.000" },
  { name: "Phòng 6 chỗ (P-3)", price: "17.900.000" },
  { name: "Phòng 8 chỗ (P-4)", price: "22.800.000" },
];
export const MEET_ROWS = [
  { name: "Phòng họp 6 người (M-1)", price: "260.000", unit: "đ mỗi giờ" },
  { name: "Phòng họp 10 người (M-2)", price: "420.000", unit: "đ mỗi giờ" },
  { name: "Gói 20 giờ họp", price: "giảm 15%", unit: "so với giá giờ" },
];

export const STEPS = [
  { n: "01", t: "Chọn trên sơ đồ", d: "Chọn số người, số ngày và loại chỗ. Sơ đồ tô sáng ô phù hợp." },
  { n: "02", t: "Đặt lịch ghé xem", d: "Gửi tóm tắt cho đội tư vấn, hẹn một buổi tham quan." },
  { n: "03", t: "Ngồi thử một buổi", d: "Làm việc tại đúng chỗ bạn chọn để biết có hợp không." },
  { n: "04", t: "Bắt đầu theo tháng", d: "Chốt gói, nhận chìa tủ và thẻ vào cửa. Đổi gói khi cần." },
];

export const FAQ = [
  { q: "Tôi thuê theo ngày được không?", a: "Được. Hot desk có vé lẻ theo ngày, nửa ngày giá thấp hơn. Nếu đi nhiều hơn 12 ngày mỗi tháng, gói tháng thường rẻ hơn." },
  { q: "Hot desk và bàn cố định khác nhau thế nào?", a: "Hot desk là ngồi bất cứ chỗ trống nào ở khu mở, mỗi ngày có thể một chỗ khác. Bàn cố định là một bàn của riêng bạn, có tủ cá nhân, giữ nguyên trong thời hạn đăng ký." },
  { q: "Sơ đồ chỗ ngồi có phải tình trạng đặt chỗ trực tiếp không?", a: "Sơ đồ cho thấy mật độ thường gặp theo ngày và giờ để bạn hình dung nhịp của không gian. Chỗ cụ thể còn trống hay không, đội tư vấn sẽ xác nhận khi bạn đặt lịch ghé xem." },
  { q: "Có thuê phòng riêng cho nhóm nhỏ được không?", a: "Có bốn phòng 2, 4, 6 và 8 chỗ. Cho biết số người và thời gian dự kiến để chọn phòng phù hợp, nhóm trên 8 người có thể ghép phòng liền kề." },
  { q: "Phòng họp có nằm trong gói thành viên không?", a: "Phòng họp tính theo giờ. Gói 20 giờ mỗi tháng giảm 15% so với giá giờ. Chi phí được báo trước khi đặt." },
  { q: "Tôi có thể ghé xem trước khi đăng ký không?", a: "Được. Đặt lịch tham quan qua biểu mẫu tư vấn, bạn có thể ngồi thử một buổi tại đúng loại chỗ đang cân nhắc." },
];

export const CLOSING = {
  kicker: "KẾT THÚC CẤU HÌNH",
  h: "Một chỗ ngồi đúng bắt đầu từ một lựa chọn đúng.",
  p: "Gửi tóm tắt vừa chọn cho đội tư vấn của Ô Lưới và hẹn một buổi ghé xem.",
  cta: "Đặt lịch tham quan",
};

export const FOOT = {
  contact: "chao@o-luoi.example",
  phone: "0236 000 0000",
  area: "Đà Nẵng, Việt Nam",
};
