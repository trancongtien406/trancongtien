export const IMG = "/images/demos/xe-dien-toc-do/";

export const PAINTS = [
  { id: "SAP", name: "Đen Sapphire", add: 0, color: "#0a0c12", tint: "" },
  { id: "BRK", name: "Xám Mây Mưa", add: 0, color: "#9aa4b8", tint: "#9aa8c4" },
  { id: "POR", name: "Xanh Cô Tô", add: 35, color: "#2150d6", tint: "#2f5fe8" },
  { id: "IOM", name: "Lục Cúc Phương", add: 49, color: "#13805d", tint: "#16946b" },
  { id: "RED", name: "Đỏ Chu Sa", add: 49, color: "#c01b3c", tint: "#d12a4a" },
] as const;

export const WHEELS = [
  { id: "BRZ", name: "Đen mờ", add: 0, color: "#17191f", ring: "#394055" },
  { id: "COP", name: "Đồng cổ", add: 30, color: "#b9814a", ring: "#e1a971" },
  { id: "SLV", name: "Bạc rèn", add: 20, color: "#c9d2e6", ring: "#eef2ff" },
] as const;

export const INTERIORS = [
  { id: "BLK", name: "Da Merino đen", d: "Da nguyên tấm, chỉ khâu hổ phách", add: 0, color: "#15171d" },
  { id: "KYA", name: "Cam Hoàng Hôn", d: "Hai tông, chi tiết đen · +62 triệu", add: 62, color: "#e0662c" },
  { id: "SIL", name: "Xám Sương", d: "Xám nhạt, ốp carbon · +38 triệu", add: 38, color: "#cdd3de" },
] as const;

export const BASE = 2390; // triệu đồng

export const BUILDS = [
  { name: "Mưa Rào", d: "Bản ra mắt", p: 0, w: 1, i: 0 },
  { name: "Cô Tô Đêm", d: "Bản chạy đường đua, xanh dương", p: 2, w: 2, i: 1 },
  { name: "Di Sản Lục", d: "Lời chào tới màu lục huyền thoại", p: 3, w: 2, i: 2 },
] as const;

export const fmt = (m: number) => `${(m / 1000).toFixed(3).replace(".", ",")} tỷ`;
export const fmtShort = (m: number) => `${(m / 1000).toFixed(2).replace(".", ",")} tỷ`;

export const HOTSPOTS = [
  { id: "intake", t: "Khe hút gió hông", d: "Khe carbon dẫn gió làm mát pin và hai mô-tơ phía sau.", x: "6%", y: "60%" },
  { id: "lamp", t: "Đèn pha laser", d: "84 điểm sáng độc lập, tự tránh xe ngược chiều trong mưa.", x: "88%", y: "58%" },
  { id: "wheel", t: "Mâm rèn 20 inch", d: "Hợp kim rèn nhẹ hơn 9 kg, kẹp phanh vàng sáu piston.", x: "65%", y: "76%" },
  { id: "mirror", t: "Gương camera", d: "Gương được thay bằng camera chống nước, rõ nét trong mưa lớn.", x: "42%", y: "43%" },
] as const;

export const SPECS: [string, string][] = [
  ["Công suất tối đa", "523 mã lực (385 kW)"],
  ["Mô-men xoắn", "650 Nm, tức thời từ 0 vòng/phút"],
  ["0 - 100 km/h", "3,4 giây"],
  ["Tốc độ tối đa", "290 km/h (giới hạn điện tử)"],
  ["Pin", "92 kWh, làm mát chất lỏng"],
  ["Quãng đường WLTP", "640 km"],
  ["Sạc nhanh DC", "350 kW, 10 - 80% trong 18 phút"],
  ["Dẫn động", "Hai cầu, ba mô-tơ, vi sai điện tử"],
  ["Khung gầm", "Thân CFRP, sàn nhôm đúc"],
  ["Phanh", "Gốm carbon, kẹp sáu piston"],
  ["Khối lượng", "1.890 kg, phân bổ 48:52"],
  ["Bảo hành", "4 năm hoặc 100.000 km, pin 8 năm"],
];

export const TECH = [
  { n: "01", t: "Pin 92 kWh", d: "Cell hình trụ xếp thành sàn xe, hạ thấp trọng tâm xuống 44 cm so với mặt đường." },
  { n: "02", t: "Ba mô-tơ", d: "Một mô-tơ trước, hai mô-tơ sau điều khiển riêng từng bánh để vào cua mà không cần phanh." },
  { n: "03", t: "Vi sai điện tử", d: "Chia mô-men 1.000 lần mỗi giây theo độ bám của từng bánh, kể cả khi đường ướt." },
  { n: "04", t: "Thân CFRP", d: "Mui, nắp ca-pô và cánh gió trước bằng sợi carbon, nhẹ hơn thép 38 kg." },
  { n: "05", t: "Phanh tái sinh", d: "Chế độ một bàn đạp thu hồi tới 0,45 g, giảm mòn má phanh và tăng thêm 12% quãng đường." },
  { n: "06", t: "Đèn pha laser", d: "Chùm sáng chia vùng, tự tránh xe ngược chiều và rọi rõ vạch sơn trong mưa lớn." },
] as const;

export const FAQ = [
  { q: "Sẽ có bao nhiêu chiếc Mưa Rào?", a: "Đúng năm mươi chiếc, đánh số trên bậc cửa. Mỗi cặp màu sơn và mâm chỉ được làm một lần duy nhất." },
  { q: "Tôi có đổi cấu hình sau khi đặt chỗ được không?", a: "Được, cho tới khi xe vào xưởng sơn. Mọi thay đổi đều có báo giá rõ ràng và không mất phí đổi." },
  { q: "Tiền đặt cọc là bao nhiêu và có hoàn lại không?", a: "50 triệu đồng, hoàn lại đầy đủ trong 14 ngày hoặc khi bạn huỷ trước khi sản xuất." },
  { q: "Xe được giao như thế nào?", a: "Giao tận cửa bằng xe kín, kèm bốn năm bảo dưỡng và một buổi lái thử trên đường đua ướt. Bạn xem xe di chuyển trên bản đồ trực tiếp từ nhà máy." },
  { q: "Trạm sạc nhà có được lắp kèm không?", a: "Có. Bộ sạc treo tường 22 kW được lắp tại nhà hoặc văn phòng của bạn trong vòng 10 ngày sau khi nhận xe." },
  { q: "Xe có chạy được trong mưa ngập không?", a: "Pin đạt chuẩn IP67 và xe lội nước tới 30 cm. Chế độ Mưa Rào giảm mô-men và tăng độ nhạy của vi sai để giữ xe ổn định." },
] as const;

export const VOICES = [
  { q: "Cuộn một lần là thấy đủ: đèn bật, đồng hồ chạy, đường ướt phản chiếu. Chưa lên xe đã thấy mình đang lái.", n: "Người lái thử minh hoạ, Hà Nội" },
  { q: "Điều làm tôi bất ngờ là cái yên tĩnh. 523 mã lực mà trong xe chỉ nghe tiếng mưa.", n: "Nhà báo ô tô minh hoạ, TP. Hồ Chí Minh" },
  { q: "Cấu hình xong là thấy rõ giá. Không có chi phí nào bị giấu ở cuối trang.", n: "Khách đặt chỗ minh hoạ, Đà Nẵng" },
] as const;

export const STATIONS = ["Hà Nội", "Ninh Bình", "Vinh", "Huế", "Đà Nẵng", "Quy Nhơn", "Nha Trang", "TP. Hồ Chí Minh"] as const;
