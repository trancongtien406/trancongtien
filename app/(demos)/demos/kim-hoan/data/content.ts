export const SLUG = "kim-hoan";
export const IMG = "/images/demos/kim-hoan";
export const ID = `${IMG}/identity`;

export type Img = { file: string; w: number; h: number; alt: string; pos?: string };

export const IMGS = {
  hero: { file: "nhan-solitaire", w: 2000, h: 2492, alt: "Nhẫn vàng gắn một viên đá lớn trên nền đen" },
  band: { file: "cap-nhan", w: 1662, h: 2493, alt: "Ba chiếc nhẫn vàng ánh lên trên nền đen", pos: "50% 74%" },
  ornate: { file: "nhan-hoa-van", w: 2000, h: 1348, alt: "Nhẫn vàng chạm hoa văn, đính đá nhỏ quanh mặt nhẫn" },
  pendant: { file: "mat-day", w: 2000, h: 3000, alt: "Mặt dây vàng dáng thuôn dài trên nền đen" },
  earring: { file: "bong-tai", w: 2000, h: 3000, alt: "Đôi bông tai vòng vàng đặt trên đĩa xám" },
  bracelet: { file: "lac-tay", w: 2000, h: 3000, alt: "Lắc tay vàng dạng xích trên nền xám sẫm" },
  bench: { file: "ban-tho", w: 2000, h: 1333, alt: "Bàn thợ kim hoàn: ngọn lửa hàn một chi tiết mặt dây" },
  loupe: { file: "kinh-lup", w: 2000, h: 3000, alt: "Hai bàn tay cầm kính lúp xem kỹ món trang sức", pos: "50% 40%" },
  gem: { file: "vien-da", w: 2000, h: 2500, alt: "Viên đá giác cắt đặt trên vải đen" },
  hand: { file: "ban-tay", w: 2000, h: 3000, alt: "Bàn tay xoè đỡ vài chiếc nhẫn vàng trên nền tối", pos: "50% 55%" },
  box: { file: "hop-nhan", w: 2000, h: 3000, alt: "Nhẫn vàng đính đá trong hộp đen", pos: "50% 55%" },
  close: { file: "nhan-ran", w: 2000, h: 2999, alt: "Nhẫn vàng hoạ tiết vảy trên nền đen", pos: "50% 46%" },
} as const satisfies Record<string, Img>;

export const NAV = [
  { href: "#bo-suu-tap", label: "Bộ sưu tập" },
  { href: "#cau-hinh", label: "Thiết kế riêng" },
  { href: "#che-tac", label: "Chế tác" },
  { href: "#tuoi-vang", label: "Chất liệu" },
  { href: "#cham-soc", label: "Chăm sóc" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const MARQUEE = ["Vàng 10K", "Vàng 14K", "Vàng 18K", "Vàng trắng", "Bạc 925", "Đá tổng hợp", "Đá tự nhiên", "Chế tác theo yêu cầu"];

export const MANIFESTO =
  "Một món trang sức đẹp không cần nói to. Nó nằm yên trên da, bắt một chút ánh sáng và nhắc bạn nhớ một ngày nào đó. Chúng tôi làm chậm, chọn kỹ chất liệu và để bạn nhìn thấy từng thứ làm nên giá của nó.";

export type Product = {
  id: string;
  name: string;
  kind: string;
  blurb: string;
  specs: string[];
  img: Img;
  preset: { type: "ring" | "pendant" | "earring" | "bracelet"; material: string; stone: string; size: number; stoneMm?: number };
};

export const PRODUCTS: Product[] = [
  {
    id: "trang-ram",
    name: "Trăng Rằm",
    kind: "Nhẫn",
    blurb: "Mặt nhẫn chạm lưới hoa văn, đá nhỏ đính viền quanh như quầng trăng. Hợp dịp trọng đại, đeo một mình đã đủ đầy.",
    specs: ["Vàng 14K · 18K", "Đá tổng hợp hoặc tự nhiên", "Cỡ tay 8 – 20"],
    img: IMGS.ornate,
    preset: { type: "ring", material: "g18", stone: "syn", size: 12, stoneMm: 3 },
  },
  {
    id: "suong-dem",
    name: "Sương Đêm",
    kind: "Mặt dây",
    blurb: "Mặt dây dáng thuôn dài, từng đốt chạm tay. Rủ nhẹ trên dây chuyền mảnh, thấy rõ nhất khi bạn cử động.",
    specs: ["Vàng 10K · 14K · 18K", "Dây 40 – 60 cm", "Có thể gắn một viên đá"],
    img: IMGS.pendant,
    preset: { type: "pendant", material: "g14", stone: "none", size: 45 },
  },
  {
    id: "vanh-trang",
    name: "Vành Trăng",
    kind: "Bông tai",
    blurb: "Đôi vành nhỏ gọn, bề mặt chạm vảy mịn. Một chiếc đủ làm điểm nhấn, một đôi đủ thành phong cách.",
    specs: ["Vàng 14K · vàng trắng", "Đường kính 10 – 24 mm", "Giá tính theo đôi"],
    img: IMGS.earring,
    preset: { type: "earring", material: "w14", stone: "none", size: 14 },
  },
  {
    id: "dai-ngan",
    name: "Dải Ngân",
    kind: "Lắc tay",
    blurb: "Xích mắt lớn xen mắt dài, nặng tay vừa đủ để cảm thấy mỗi lần nhấc cổ tay.",
    specs: ["Vàng 14K · 18K", "Dài 16 – 20 cm", "Chọn kiểu khoá khi tư vấn"],
    img: IMGS.bracelet,
    preset: { type: "bracelet", material: "g14", stone: "none", size: 17 },
  },
];

export const HERO_PRESET = { type: "ring", material: "g18", stone: "syn", size: 12, stoneMm: 5 } as const;

export const STEPS = [
  { n: "01", title: "Lắng nghe", text: "Bạn kể món trang sức sẽ đi cùng dịp nào, đeo hằng ngày hay chỉ vài lần trong năm. Chúng tôi ghi lại ngân sách, màu da, thói quen đeo." },
  { n: "02", title: "Phác thảo", text: "Từ ý bạn, thợ vẽ dáng và đề xuất chất liệu, tuổi vàng, loại đá. Khoảng giá được tính ra từng khoản để bạn so sánh trước khi chốt." },
  { n: "03", title: "Chế tác", text: "Vàng được nấu, cán, uốn và hàn trên bàn thợ. Đá được gắn bằng chấu tay, soi lại độ chắc trước khi đánh bóng.", img: IMGS.bench },
  { n: "04", title: "Hoàn thiện", text: "Món trang sức được soi dưới kính lúp: đường hàn, chấu, mặt trong lòng nhẫn. Khi bạn nhận, thông tin chất liệu được ghi rõ trên phiếu.", img: IMGS.loupe },
] as const;

export const KARATS = [
  { k: "10K", pct: 41.7, use: "Cứng, giá mềm. Hợp món đeo hằng ngày, dễ chạm va." },
  { k: "14K", pct: 58.5, use: "Cân bằng giữa độ bền và hàm lượng vàng. Lựa chọn phổ biến cho nhẫn cưới." },
  { k: "18K", pct: 75, use: "Màu vàng ấm đậm hơn, mềm hơn. Hợp mặt nhẫn đính đá chính, món để dành." },
] as const;

export const CARE = [
  { t: "Vệ sinh tại nhà", d: "Ngâm nước ấm pha chút xà phòng dịu, chải nhẹ bằng bàn chải lông mềm rồi lau khô. Tránh clo, nước hoa và hoá chất tẩy rửa." },
  { t: "Kiểm tra định kỳ", d: "Mang món trang sức đến để xem lại chấu giữ đá, khoá, mắt xích và độ sáng của bề mặt. Phát hiện sớm thì sửa nhỏ." },
  { t: "Làm mới và sửa chữa", d: "Đánh bóng, xi lại vàng trắng, nới hoặc thu cỡ nhẫn khi cần. Điều kiện bảo hành được ghi trên phiếu khi bạn nhận hàng." },
] as const;

export const FAQ = [
  { q: "Vàng 10K, 14K và 18K khác nhau thế nào?", a: "Khác nhau chủ yếu ở hàm lượng vàng nguyên chất: 10K ≈ 41,7%, 14K ≈ 58,5%, 18K = 75%. Số K càng cao thì vàng càng nhiều, màu ấm đậm hơn và giá cao hơn; số K thấp thì cứng hơn, hợp món hay va chạm." },
  { q: "Khoảng giá trên công cụ có phải giá cuối không?", a: "Không. Đó là khoảng giá tham khảo tính từ trọng lượng ước tính, đơn giá kim loại bạn nhập, công chế tác và đá. Giá chính thức được báo sau khi thống nhất thiết kế, trọng lượng thật và vật liệu." },
  { q: "Tôi có thể đặt thiết kế riêng không?", a: "Có. Bạn gửi ý tưởng, hình tham khảo hoặc mô tả mong muốn, chúng tôi trao đổi khả năng thực hiện, chất liệu và khoảng giá trước khi bắt đầu." },
  { q: "Đá tổng hợp và đá tự nhiên khác nhau ra sao?", a: "Đá tổng hợp được tạo trong phòng thí nghiệm, đồng đều và giá ổn định. Đá tự nhiên hình thành trong lòng đất, mỗi viên mỗi khác nên khoảng giá rộng hơn nhiều. Chúng tôi nói rõ loại đá trên phiếu." },
  { q: "Tôi nên chọn cỡ nhẫn thế nào?", a: "Cỡ tay trong công cụ chỉ giúp ước tính trọng lượng. Cỡ chính xác nên được đo trực tiếp vào buổi chiều, khi ngón tay không quá lạnh hay phù nề. Chúng tôi hướng dẫn đo khi tư vấn." },
  { q: "Chế tác một món mất bao lâu?", a: "Tuỳ mẫu và độ phức tạp. Thời gian dự kiến được báo cụ thể khi bạn chốt thiết kế." },
] as const;

export const CONTACT = {
  place: "Đà Nẵng",
  phone: "0236 000 0000",
  email: "xinchao@kimnguyet.example",
  social: "instagram.com/kimnguyet.example",
};
