export type SwatchId =
  | "hong" | "chanh" | "cobalt" | "den" | "trang" | "cam" | "cherry" | "tim" | "bac-ha" | "troi" | "nude" | "mo";

export const SWATCHES: { id: SwatchId; name: string; hex: string }[] = [
  { id: "hong", name: "Hồng nóng", hex: "#ff2e93" },
  { id: "chanh", name: "Vàng chanh", hex: "#e6ff00" },
  { id: "cobalt", name: "Xanh cobalt", hex: "#1f3bff" },
  { id: "den", name: "Đen mực", hex: "#0d0d0f" },
  { id: "trang", name: "Trắng sữa", hex: "#ffffff" },
  { id: "cam", name: "Cam cháy", hex: "#ff7a1a" },
  { id: "cherry", name: "Đỏ cherry", hex: "#e0112b" },
  { id: "tim", name: "Tím oải hương", hex: "#b28dff" },
  { id: "bac-ha", name: "Xanh bạc hà", hex: "#5ef2c4" },
  { id: "troi", name: "Xanh trời", hex: "#4cc9ff" },
  { id: "nude", name: "Nude hồng", hex: "#f1c4b0" },
  { id: "mo", name: "Vàng mơ", hex: "#ffc94d" },
];

export const swatchById = (id: SwatchId) => SWATCHES.find((s) => s.id === id)!;

export type Shape = "vuong" | "oval" | "almond" | "coffin";
export type Len = "ngan" | "vua" | "dai";
export type Pattern = "tron" | "ombre" | "french" | "chrome" | "cham";
export type Charm = "khong" | "sao" | "ngoc" | "tim";

export const SHAPES: { id: Shape; name: string; note: string; price: number; min: number }[] = [
  { id: "vuong", name: "Vuông", note: "Gọn, khoẻ, hợp móng ngắn", price: 0, min: 0 },
  { id: "oval", name: "Oval", note: "Bo tròn, dễ chịu khi gõ phím", price: 0, min: 5 },
  { id: "almond", name: "Almond", note: "Thon như hạt hạnh nhân", price: 20, min: 10 },
  { id: "coffin", name: "Coffin", note: "Đầu vuông, thân thon, nổi bật", price: 30, min: 10 },
];

export const LENGTHS: { id: Len; name: string; price: number; min: number }[] = [
  { id: "ngan", name: "Ngắn", price: 0, min: 0 },
  { id: "vua", name: "Vừa", price: 40, min: 10 },
  { id: "dai", name: "Dài", price: 90, min: 30 },
];

export const PATTERNS: { id: Pattern; name: string; note: string; price: number; min: number; accent: boolean }[] = [
  { id: "tron", name: "Trơn", note: "Một màu bóng", price: 0, min: 0, accent: false },
  { id: "ombre", name: "Ombre", note: "Loang từ màu gốc sang màu phụ", price: 60, min: 15, accent: true },
  { id: "french", name: "French", note: "Viền đầu móng màu phụ", price: 50, min: 20, accent: true },
  { id: "chrome", name: "Chrome", note: "Lớp tráng gương ánh kim", price: 90, min: 20, accent: false },
  { id: "cham", name: "Chấm bi", note: "Chấm màu phụ rải trên móng", price: 60, min: 25, accent: true },
];

export const CHARMS: { id: Charm; name: string }[] = [
  { id: "khong", name: "Không charm" },
  { id: "sao", name: "Ngôi sao" },
  { id: "ngoc", name: "Ngọc trai" },
  { id: "tim", name: "Trái tim" },
];

export const BASE_PRICE = 160; // nghìn đồng
export const BASE_MIN = 45;
export const CHARM_PRICE = 15;
export const CHARM_MIN = 4;

export const SERVICES = [
  {
    id: "gel-co-ban", mins: 60, name: "Sơn gel cơ bản", desc: "Một màu bóng gương, viền móng gọn, giữ màu đều.", time: "45 – 60 phút", price: "150.000 – 220.000 ₫",
    flood: "#ff2e93", on: "#0d0d0f", preset: { pattern: "tron", length: "ngan" },
  },
  {
    id: "gel-design", mins: 90, name: "Gel design", desc: "Ombre, french, chấm bi: phối màu theo tâm trạng của bạn.", time: "60 – 90 phút", price: "220.000 – 350.000 ₫",
    flood: "#e6ff00", on: "#0d0d0f", preset: { pattern: "ombre", length: "vua" },
  },
  {
    id: "nail-art", mins: 150, name: "Nail art vẽ tay", desc: "Mang moodboard của bạn tới, tụi mình vẽ lại trên từng móng.", time: "90 – 150 phút", price: "350.000 – 550.000 ₫",
    flood: "#1f3bff", on: "#ffffff", preset: { pattern: "cham", length: "vua", charm: "sao" },
  },
  {
    id: "dap-gel", mins: 120, name: "Đắp gel nối móng", desc: "Tạo độ dài và dáng móng như ý: vuông, almond hay coffin.", time: "90 – 120 phút", price: "350.000 – 500.000 ₫",
    flood: "#ff7a1a", on: "#0d0d0f", preset: { pattern: "tron", length: "dai", shape: "coffin" },
  },
  {
    id: "chrome", mins: 90, name: "Chrome và mắt mèo", desc: "Ánh kim bắt sáng, đổi tông theo góc nhìn.", time: "60 – 90 phút", price: "250.000 – 350.000 ₫",
    flood: "#4cc9ff", on: "#0d0d0f", preset: { pattern: "chrome", length: "vua" },
  },
  {
    id: "thao-gel", mins: 45, name: "Tháo gel và chăm sóc", desc: "Tháo lớp cũ nhẹ tay, dưỡng viền móng trước khi lên bộ mới.", time: "30 – 45 phút", price: "80.000 – 150.000 ₫",
    flood: "#0d0d0f", on: "#e6ff00", preset: { pattern: "tron", length: "ngan" },
  },
] as const;

export const FAQ = [
  { q: "Có cần đặt lịch trước không?", a: "Nên đặt trước để tụi mình giữ chỗ đủ thời gian cho bộ bạn chọn. Chọn khung giờ ở mục Đặt lịch rồi gửi yêu cầu qua form tư vấn; khách đi lẻ vẫn được nhận nếu còn trống." },
  { q: "Đặt cọc bao nhiêu, khi nào mất cọc?", a: "Nail art và đắp gel đặt cọc 100.000 ₫, trừ vào tổng khi thanh toán. Báo đổi hoặc huỷ trước ít nhất 4 giờ thì không mất cọc; báo muộn hơn, cọc được giữ cho lần đặt kế tiếp trong 14 ngày." },
  { q: "Mang mẫu của riêng mình tới được không?", a: "Được. Gửi ảnh tham khảo trước, tụi mình sẽ điều chỉnh theo dáng và độ dài móng thật của bạn để bộ móng lên tay đẹp." },
  { q: "Làm một bộ mất bao lâu?", a: "Thường từ 45 đến 150 phút tuỳ dịch vụ, hoạ tiết và độ dài. Công cụ dựng móng cho bạn thời gian ước tính theo lựa chọn." },
  { q: "Bộ móng giữ được bao lâu, bong thì sao?", a: "Độ bền phụ thuộc thói quen sinh hoạt và tốc độ mọc móng của mỗi người. Trong 5 ngày sau khi làm, nếu móng bong hoặc sứt do kỹ thuật, tụi mình chỉnh lại miễn phí." },
  { q: "Tháo gel cũ có mất thêm phí không?", a: "Có dịch vụ tháo gel riêng. Nếu bạn đang đeo bộ cũ, hãy báo trước để tụi mình cộng thêm thời gian vào lịch." },
  { q: "Mình dị ứng hoá chất thì sao?", a: "Hãy báo trước nếu bạn dị ứng hoá chất, keo, gel hay acrylic. Tụi mình sẽ trao đổi về sản phẩm sẽ dùng và cùng bạn quyết định có phù hợp để làm hay không." },
  { q: "Dụng cụ được vệ sinh thế nào?", a: "Dụng cụ kim loại được làm sạch và xử lý sau mỗi khách theo quy trình của tiệm, vật dụng dùng một lần được thay mới. Tụi mình không cam kết vô trùng tuyệt đối; nếu bạn có yêu cầu riêng, hãy nói trước khi làm." },
] as const;

export const STEPS = [
  { t: "Chọn màu, chọn dáng", d: "Ngồi lại với bảng mẫu hoặc dựng bộ móng trong công cụ. Bạn chọn dáng, độ dài, màu gốc và hoạ tiết." },
  { t: "Chuẩn bị móng", d: "Làm sạch viền móng, tạo dáng và lớp nền. Nếu có dị ứng hoá chất, đây là lúc bạn báo để đổi sản phẩm." },
  { t: "Lên màu và hoạ tiết", d: "Sơn từng lớp, vẽ ombre, french hay chấm bi, đính charm. Mỗi lớp được sấy đèn riêng." },
  { t: "Phủ bóng, dặn dò", d: "Phủ lớp bóng cuối, dưỡng viền móng và dặn cách giữ bộ móng bền màu." },
] as const;

export const MOODBOARD = [
  { file: "tay-vang-ao-xanh", alt: "Bàn tay móng sơn cam trong tay áo xanh lá trên nền vàng", label: "Cam sữa trên nền chanh", w: 1200, h: 1800 },
  { file: "chuoi-xanh-cobalt", alt: "Bàn tay móng vẽ họa tiết zebra cầm chùm chuối xanh cobalt trên nền xanh", label: "Zebra trắng đen", w: 1200, h: 1800 },
  { file: "la-monstera-nen-hong", alt: "Bàn tay móng nhiều màu cầm chiếc lá monstera trên nền hồng", label: "Mỗi ngón một màu", w: 1200, h: 1800 },
  { file: "tay-nen-xanh-la", alt: "Bàn tay xoè với móng nhiều màu dưới bóng nắng trên nền xanh lá", label: "Bóng nắng, móng tươi", w: 1200, h: 1800 },
  { file: "hai-tay-bong-do", alt: "Hai bàn tay xoè đổ bóng trên nền xanh lá, móng nhiều màu", label: "Hai tay, một mood", w: 1200, h: 800 },
] as const;

export const STUDIO = {
  area: "Quận Hải Châu, Đà Nẵng",
  hours: "9:00 – 20:00, mỗi ngày",
  deposit: "100.000 ₫",
} as const;

export const HERO_FACTS = [
  { k: "Giá từ", v: "150.000 ₫", sub: "sơn gel một màu, 45 – 60 phút" },
  { k: "Mở cửa", v: "9:00 – 20:00", sub: "mỗi ngày, nên đặt lịch trước" },
  { k: "Đặt cọc", v: "100.000 ₫", sub: "chỉ nail art và đắp gel, trừ vào tổng" },
] as const;

export const POLICIES = [
  { t: "Đặt lịch và đặt cọc", d: "Giữ chỗ qua form tư vấn. Nail art và đắp gel cần cọc 100.000 ₫, trừ vào tổng khi thanh toán. Sơn gel cơ bản và tháo gel không cần cọc." },
  { t: "Đổi hoặc huỷ lịch", d: "Báo trước ít nhất 4 giờ thì đổi sang khung khác hoặc huỷ không mất cọc. Báo muộn hơn, cọc được giữ cho lần đặt kế tiếp trong 14 ngày." },
  { t: "Đến trễ", d: "Trễ đến 15 phút vẫn giữ lịch. Trễ hơn, tụi mình có thể rút gọn hoạ tiết hoặc dời sang khung gần nhất còn trống." },
  { t: "Chỉnh sửa miễn phí", d: "Trong 5 ngày sau khi làm, móng bong hoặc sứt do kỹ thuật sẽ được chỉnh lại miễn phí. Không áp dụng khi móng bị va đập mạnh hoặc tự gỡ." },
  { t: "Dị ứng và sức khoẻ móng", d: "Hãy báo trước nếu bạn dị ứng hoá chất, keo, gel. Móng đang viêm, có vết thương hoặc nghi nhiễm nấm nên hoãn làm. Tụi mình không tư vấn y tế." },
  { t: "Dụng cụ và vệ sinh", d: "Dụng cụ kim loại được làm sạch và xử lý sau mỗi khách; giũa giấy, que gỗ dùng một lần được thay mới. Tụi mình không cam kết vô trùng tuyệt đối." },
] as const;

/* ---- Đặt lịch: khung giờ ---- */
export const BOOK_DAYS = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ nhật"] as const;
export const OPEN_MIN = 9 * 60;
export const CLOSE_MIN = 20 * 60;
export const SLOT_MIN = 30;
/** Khung giờ đã có khách, theo ngày (chỉ số 0 = Thứ Hai), tính bằng chỉ số ô 30 phút từ 9:00. */
export const BUSY: Record<number, number[]> = {
  0: [0, 1, 2, 9, 10, 11, 12],
  1: [4, 5, 6, 7, 16, 17],
  2: [2, 3, 8, 9, 10, 18, 19, 20],
  3: [0, 1, 6, 7, 8, 13, 14],
  4: [5, 6, 7, 8, 9, 10, 11, 12, 13],
  5: [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 14, 15, 16],
  6: [2, 3, 4, 5, 6, 12, 13, 14, 15],
};

export const FEE_NOTE = "Phụ phí tính trên một bộ móng 10 ngón (nghìn đồng), cộng vào giá dịch vụ cơ bản.";
