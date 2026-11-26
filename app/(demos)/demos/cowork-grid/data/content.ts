export const NAV = [
  { href: "#gia", label: "Bảng giá" },
  { href: "#khong-gian", label: "Không gian" },
  { href: "#so-do", label: "Sơ đồ chỗ" },
  { href: "#dung-thu", label: "Dùng thử 1 ngày" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
];

export const IMG = (f: string, w: 600 | 1200 | 2000 = 1200) => `/images/demos/cowork-grid/${f}-${w}.webp`;

export const HERO = {
  kicker: "KHÔNG GIAN LÀM VIỆC CHUNG · QUẬN HẢI CHÂU, ĐÀ NẴNG",
  h1: ["Chỗ làm việc chung", "ở Hải Châu, Đà Nẵng"],
  lead: "Hot desk, bàn cố định, phòng riêng và phòng họp cho freelancer, đội nhỏ và người làm việc từ xa. Thuê theo ngày, tuần hoặc tháng; lần đầu đến được ngồi thử một ngày miễn phí.",
  chips: ["Hot desk", "Bàn cố định", "Phòng riêng", "Phòng họp"],
};

/** Ba sự thật ở hero (mã ô A1/B2/C3 theo ngôn ngữ lưới). */
export const FACTS = [
  { k: "A1", label: "Hot desk từ", value: 120000, suffix: " đ/ngày", note: "Nửa ngày 80.000 đ" },
  { k: "B2", label: "Giờ mở cửa", text: "07:00 – 21:00", note: "Thứ hai đến thứ sáu; thứ bảy 08:00 – 17:00" },
  { k: "C3", label: "Dùng thử", text: "1 ngày miễn phí", note: "Hot desk, lần đầu, đặt trước một ngày" },
];

export const SPECS = [
  { k: "A1", label: "Chỗ hot desk", value: 40 },
  { k: "B2", label: "Bàn cố định", value: 16 },
  { k: "C3", label: "Phòng họp", value: 2 },
  { k: "D4", label: "Phòng riêng", value: 4 },
];

export const MANIFESTO =
  "Ô Lưới là không gian làm việc chung một tầng tại Quận Hải Châu, Đà Nẵng. Mỗi chỗ ngồi có mã riêng trên sơ đồ, bạn xem trước khu nào đang thưa, khu nào đang đông rồi mới quyết định thuê ngày, tuần hay tháng.";

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

export const PRICE_TABLE = [
  { name: "Hot desk", day: "120.000 đ", week: "550.000 đ", month: "1.290.000 đ", extra: "12 ngày/tháng; không giới hạn 1.890.000 đ" },
  { name: "Bàn cố định", day: "Không áp dụng", week: "850.000 đ", month: "2.790.000 đ", extra: "Tuần thuê tối thiểu 2 tuần" },
  { name: "Phòng riêng 2 chỗ", day: "Không áp dụng", week: "Không áp dụng", month: "7.200.000 đ", extra: "Phòng 4, 6, 8 chỗ ở bảng bên dưới" },
];

export const HOURS = [
  { days: [0, 1, 2, 3, 4], label: "Thứ hai đến thứ sáu", open: 7, close: 21, who: "Mọi thành viên và khách dùng thử" },
  { days: [5], label: "Thứ bảy", open: 8, close: 17, who: "Mọi thành viên và khách dùng thử" },
  { days: [6], label: "Chủ nhật", open: 8, close: 17, who: "Chỉ bàn cố định và phòng riêng (thẻ ra vào)" },
];

export const RULES = [
  { t: "Giờ yên tĩnh ở khu A", d: "Khu mở không gọi điện thoại loa ngoài hay họp video; dùng buồng gọi điện hoặc phòng họp." },
  { t: "Khách mời", d: "Mỗi thành viên mời tối đa 2 khách mỗi ngày, đăng ký ở quầy và ngồi khu cà phê hoặc phòng họp, không ngồi hot desk." },
  { t: "Ăn uống", d: "Đồ uống có nắp mang vào khu mở được; đồ ăn dùng tại khu cà phê, không ăn món nặng mùi ở bàn." },
  { t: "Gửi xe", d: "Có chỗ gửi xe máy ở tầng trệt toà nhà theo quy định của toà nhà; ô tô gửi tại bãi gần đó, phí theo bãi." },
  { t: "Thẻ ra vào", d: "Thành viên tháng nhận thẻ ra vào; khách ngày và khách dùng thử nhận thẻ tạm khi check-in, trả lại cuối ngày." },
  { t: "Phòng họp", d: "Đặt theo giờ, giữ chỗ tới 10 phút đầu giờ; huỷ trước 2 giờ không tính phí." },
];

export const TRIAL = {
  h: "Ngồi thử một ngày trước khi chọn gói.",
  p: "Lần đầu đến Ô Lưới, bạn được dùng một ngày hot desk miễn phí để thử Wi-Fi, ghế, tiếng ồn và giờ giấc có hợp công việc của mình không.",
  rules: [
    "Áp dụng một lần cho mỗi người, cho hot desk ở khu A.",
    "Đặt lịch trước ít nhất một ngày; xuất trình giấy tờ tuỳ thân khi check-in.",
    "Dùng từ 08:30 đến 17:30; không gồm phòng họp, in ấn tính theo trang.",
    "Nếu đăng ký gói tháng ngay trong ngày thử, giá vé ngày 120.000 đ được trừ vào gói.",
  ],
  steps: [
    { t: "Đặt lịch", d: "Chọn ngày ghé qua biểu mẫu tư vấn." },
    { t: "Check-in 08:30", d: "Nhận thẻ khách, được dẫn đi một vòng 15 phút." },
    { t: "Làm việc", d: "Ngồi chỗ trống ở khu A, dùng cà phê, Wi-Fi, ổ cắm." },
    { t: "Quyết định", d: "Cuối ngày chọn gói hoặc không, không ràng buộc." },
  ],
};

export const COMMUNITY = {
  p: "Ô Lưới giữ nhịp cộng đồng ở quy mô nhỏ: vài buổi nhẹ mỗi tháng cho thành viên làm quen nhau, không phải chương trình sự kiện lớn. Lịch dưới đây tự cập nhật theo tháng hiện tại.",
  events: [
    { id: "cafe", t: "Cà phê sáng thành viên", rule: "Thứ năm đầu tiên của tháng", time: "08:30 – 09:30", d: "Cà phê ở khu E, gặp thành viên mới, chia sẻ việc đang làm." },
    { id: "share", t: "Chia sẻ chiều thứ sáu", rule: "Thứ sáu thứ hai của tháng", time: "16:30 – 17:30", d: "Một thành viên nói 15 phút về một kỹ năng hay công cụ, hỏi đáp sau đó." },
    { id: "quiet", t: "Thứ tư yên tĩnh", rule: "Mỗi thứ tư", time: "Cả ngày", d: "Khu mở A không gọi điện, ưu tiên làm việc sâu; cuộc gọi dùng buồng riêng." },
    { id: "party", t: "Tiệc nhẹ cuối tháng", rule: "Thứ sáu cuối cùng của tháng", time: "17:30 – 19:00", d: "Đồ ăn nhẹ, nhạc nhỏ, dọn bàn cho tháng mới." },
  ],
  note: "Cần tổ chức workshop hoặc buổi gặp riêng của nhóm bạn? Thuê phòng họp ngoài giờ cao điểm, cho biết số người và nhu cầu khi đặt lịch.",
};

export const BOOKING = [
  { n: "01", t: "Chọn trên sơ đồ", d: "Chọn số người, số ngày và loại chỗ. Sơ đồ tô sáng ô phù hợp." },
  { n: "02", t: "Đặt lịch tham quan", d: "Gửi tóm tắt qua biểu mẫu tư vấn. Tham quan 20 phút, giờ nhận: 09:00 – 11:00 và 14:00 – 17:00, thứ hai đến thứ bảy." },
  { n: "03", t: "Dùng thử một ngày", d: "Làm việc tại đúng khu bạn chọn để biết có hợp không." },
  { n: "04", t: "Bắt đầu theo tháng", d: "Chốt gói, nhận thẻ ra vào và chìa tủ. Đổi gói hoặc dừng gói theo chính sách ghi trong hợp đồng." },
];

export const POLICY = [
  { t: "Đặt cọc", d: "Gói tháng đặt cọc một tháng, trừ vào kỳ cuối. Hot desk lẻ và dùng thử không đặt cọc." },
  { t: "Đổi gói", d: "Đổi từ hot desk lên bàn cố định bất kỳ lúc nào; đổi xuống áp dụng từ kỳ sau." },
  { t: "Tạm dừng", d: "Bàn cố định và phòng riêng báo trước 7 ngày để tạm dừng theo thoả thuận." },
];

export const FAQ = [
  { q: "Tôi thuê theo ngày được không?", a: "Được. Hot desk có vé lẻ theo ngày (120.000 đ) và nửa ngày (80.000 đ). Nếu đi nhiều hơn 12 ngày mỗi tháng, gói tháng thường rẻ hơn." },
  { q: "Hot desk và bàn cố định khác nhau thế nào?", a: "Hot desk là ngồi bất cứ chỗ trống nào ở khu mở, mỗi ngày có thể một chỗ khác. Bàn cố định là một bàn của riêng bạn, có tủ cá nhân, giữ nguyên trong thời hạn đăng ký." },
  { q: "Internet ở đây thế nào?", a: "Wi-Fi phủ toàn khu và dùng chung giữa các thành viên; bàn cố định và phòng riêng có cổng mạng dây. Chúng tôi không cam kết một tốc độ cụ thể; nếu việc của bạn cần đường truyền riêng (livestream, dựng phim nặng), hãy nói khi đặt lịch để xem phòng riêng có đáp ứng không." },
  { q: "In ấn và scan tính thế nào?", a: "Máy in và máy scan dùng chung, tính theo trang, bảng giá niêm yết tại quầy. Mang tài liệu bằng USB hoặc gửi qua email, không in được từ thiết bị lạ." },
  { q: "Tôi mời khách đến làm việc được không?", a: "Được, tối đa 2 khách mỗi thành viên mỗi ngày, đăng ký ở quầy và ngồi khu cà phê hoặc phòng họp. Họp với khách thường xuyên nên đặt phòng họp theo giờ." },
  { q: "Gửi xe ở đâu, có tính phí không?", a: "Xe máy gửi ở tầng trệt toà nhà theo quy định của toà nhà; ô tô gửi ở bãi gần đó. Phí gửi xe tính theo nơi gửi, không nằm trong giá chỗ ngồi." },
  { q: "Sơ đồ chỗ ngồi có phải tình trạng đặt chỗ trực tiếp không?", a: "Sơ đồ cho thấy mật độ thường gặp theo ngày và giờ để bạn hình dung nhịp của không gian. Chỗ cụ thể còn trống hay không, đội tư vấn xác nhận khi bạn đặt lịch." },
  { q: "Có thuê phòng riêng cho nhóm nhỏ được không?", a: "Có bốn phòng 2, 4, 6 và 8 chỗ, thuê theo tháng. Cho biết số người và thời gian dự kiến để chọn phòng phù hợp; nhóm trên 8 người có thể ghép phòng liền kề." },
  { q: "Phòng họp có nằm trong gói thành viên không?", a: "Phòng họp tính theo giờ (260.000 đ phòng 6 người, 420.000 đ phòng 10 người). Gói 20 giờ mỗi tháng giảm 15% so với giá giờ." },
  { q: "Tôi có thể ghé xem trước khi đăng ký không?", a: "Được. Đặt lịch tham quan qua biểu mẫu tư vấn, hoặc đăng ký dùng thử một ngày nếu muốn ngồi làm việc thật." },
];

export const CLOSING = {
  kicker: "ĐẶT LỊCH",
  h: "Ghé xem một vòng, ngồi thử một ngày.",
  p: "Gửi tóm tắt vừa chọn cho đội tư vấn của Ô Lưới để hẹn giờ tham quan hoặc ngày dùng thử.",
  cta: "Đặt lịch tham quan",
};

export const FOOT = {
  contact: "chao@o-luoi.example",
  phone: "0236 000 0000",
  area: "Quận Hải Châu, Đà Nẵng",
};
