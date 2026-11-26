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
  { href: "#danh-muc", label: "Danh mục" },
  { href: "#cach-tinh", label: "Cách tính giá" },
  { href: "#dich-vu", label: "Dịch vụ" },
  { href: "#che-tac", label: "Đặt làm" },
  { href: "#gio-mo-cua", label: "Giờ mở cửa" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const ABOUT =
  "Kim Nguyệt là tiệm kim hoàn nhỏ ở Quận Hải Châu, Đà Nẵng. Chúng tôi bán nhẫn cưới, nhẫn đính hôn, dây chuyền, bông tai, lắc và vòng; làm sẵn hoặc đặt theo ý bạn. Giá được viết ra từng khoản: vàng bao nhiêu gam, công bao nhiêu, đá bao nhiêu, để bạn so sánh trước khi quyết định.";

export const ABOUT_POINTS = [
  { t: "Cặp đôi chuẩn bị cưới", d: "Nhẫn cưới đôi, nhẫn đính hôn, bộ trang sức cô dâu. Có thể khắc tên và ngày cưới bên trong lòng nhẫn." },
  { t: "Người tìm một món quà", d: "Mặt dây, bông tai, lắc tay cho mẹ, cho người thương hoặc cho chính mình, kèm hộp và phiếu ghi chất liệu." },
  { t: "Người muốn làm lại món cũ", d: "Nới hoặc thu cỡ, đánh bóng, xi lại, hàn chấu, hoặc thu đổi món vàng cũ lấy món mới." },
] as const;

export type Product = {
  id: string;
  name: string;
  kind: string;
  blurb: string;
  specs: string[];
  img?: Img;
  preset: { type: "ring" | "pendant" | "earring" | "bracelet"; material: string; stone: string; size: number; stoneMm?: number };
};

/** Danh mục theo nhóm. Tên mẫu (Trăng Rằm, Sương Đêm...) là dòng mẫu của tiệm; giá "từ" được tính ở Sections từ bảng đơn giá. */
export const PRODUCTS: Product[] = [
  {
    id: "nhan",
    name: "Nhẫn cưới & nhẫn đính hôn",
    kind: "Dòng Trăng Rằm",
    blurb: "Nhẫn cưới đôi trơn hoặc chạm hoa văn, nhẫn đính hôn gắn một viên đá chủ, viền đá nhỏ quanh mặt như quầng trăng. Mỗi chiếc làm theo cỡ tay của từng người, khắc chữ bên trong nếu bạn muốn.",
    specs: ["Vàng 10K · 14K · 18K, vàng trắng", "Đá tổng hợp hoặc tự nhiên", "Cỡ tay 8 – 20, đo trực tiếp tại tiệm"],
    img: IMGS.ornate,
    preset: { type: "ring", material: "g18", stone: "syn", size: 12, stoneMm: 3 },
  },
  {
    id: "day-chuyen",
    name: "Dây chuyền & mặt dây",
    kind: "Dòng Sương Đêm",
    blurb: "Mặt dây dáng thuôn dài, từng đốt chạm tay, rủ nhẹ trên dây chuyền mảnh. Chọn độ dài dây theo cổ và theo cổ áo bạn hay mặc.",
    specs: ["Vàng 10K · 14K · 18K", "Dây 40 – 60 cm", "Có thể gắn một viên đá"],
    img: IMGS.pendant,
    preset: { type: "pendant", material: "g14", stone: "none", size: 45 },
  },
  {
    id: "bong-tai",
    name: "Bông tai",
    kind: "Dòng Vành Trăng",
    blurb: "Đôi vành nhỏ gọn, bề mặt chạm vảy mịn. Có kiểu bấm, kiểu móc và kiểu khuyên tròn; kiểu nào cũng làm nhẹ để đeo cả ngày.",
    specs: ["Vàng 14K · vàng trắng", "Đường kính 10 – 24 mm", "Giá tính theo đôi"],
    img: IMGS.earring,
    preset: { type: "earring", material: "w14", stone: "none", size: 14 },
  },
  {
    id: "lac",
    name: "Lắc & vòng tay",
    kind: "Dòng Dải Ngân",
    blurb: "Lắc xích mắt lớn xen mắt dài, nặng tay vừa đủ để cảm thấy mỗi lần nhấc cổ tay. Chọn kiểu khoá khi tư vấn; chiều dài được đo theo cổ tay thật.",
    specs: ["Vàng 14K · 18K", "Dài 16 – 20 cm", "Chọn kiểu khoá khi tư vấn"],
    img: IMGS.bracelet,
    preset: { type: "bracelet", material: "g14", stone: "none", size: 17 },
  },
];

export const HERO_PRESET = { type: "ring", material: "g18", stone: "syn", size: 12, stoneMm: 5 } as const;

export const CUSTOM = {
  name: "Trang sức theo yêu cầu",
  blurb: "Mang một hình tham khảo, một món cũ muốn làm lại hoặc chỉ một câu chuyện. Thợ vẽ phác, báo giá từng khoản, bạn duyệt rồi mới chế tác.",
  points: ["Làm lại từ vàng cũ của bạn", "Đổi đá chủ, đổi dáng, thêm hoa văn", "Bộ nhẫn cưới đôi cùng một dáng"],
} as const;

export const SERVICES = [
  { id: "thiet-ke", t: "Thiết kế theo yêu cầu", d: "Bạn mang hình tham khảo hoặc mô tả mong muốn. Thợ vẽ phác tay, đề xuất tuổi vàng và loại đá, báo khoảng giá trước khi chế tác. Phác thảo được chỉnh tới khi bạn gật đầu.", note: "Đặt cọc khi chốt thiết kế, mức cọc báo cụ thể trên phiếu." },
  { id: "khac-chu", t: "Khắc chữ", d: "Khắc tên, ngày cưới hoặc một câu ngắn ở mặt trong nhẫn, mặt sau mặt dây hay lắc. Xem thử dòng chữ chạy qua dải bên dưới trước khi quyết định.", note: "Tối đa khoảng 14 ký tự trên nhẫn; mặt dây và lắc nhiều chỗ hơn." },
  { id: "sua-chua", t: "Sửa chữa, đánh bóng, nới size", d: "Đánh bóng lại bề mặt, xi vàng trắng, hàn chấu lỏng, nối dây đứt, nới hoặc thu cỡ nhẫn. Tiệm xem món trước rồi báo công và thời gian.", note: "Nới hoặc thu thường được 1 – 2 cỡ, tuỳ độ dày thành nhẫn và vị trí đá." },
  { id: "thu-doi", t: "Thu đổi", d: "Món mua tại tiệm có thể mang lại để thu hoặc đổi sang món mới. Giá thu tính theo hàm lượng vàng tại ngày thu, trừ hao phần đá và phần công đã làm; đổi món thì chỉ trả phần chênh lệch.", note: "Mang theo phiếu mua hoặc món còn dấu tuổi vàng; điều kiện cụ thể ghi trên phiếu." },
] as const;

export const STEPS = [
  { n: "01", title: "Tư vấn & chọn mẫu", text: "Bạn kể món trang sức dành cho dịp nào, ngân sách và thói quen đeo. Tiệm đo cỡ tay, cho thử mẫu có sẵn và ghi lại mong muốn." },
  { n: "02", title: "Phác thảo & báo giá", text: "Thợ vẽ dáng, đề xuất tuổi vàng, loại đá. Khoảng giá được tính ra từng khoản: vàng, công, đá để bạn so sánh trước khi chốt." },
  { n: "03", title: "Chốt & đặt cọc", text: "Bạn duyệt bản phác và khoảng giá, đặt cọc theo phiếu. Phiếu ghi thiết kế, chất liệu, cỡ, ngày hẹn dự kiến.", img: IMGS.bench },
  { n: "04", title: "Chế tác", text: "Vàng được nấu, cán, uốn và hàn trên bàn thợ. Đá được gắn bằng chấu tay, soi lại độ chắc trước khi đánh bóng. Thời gian thường 7 – 14 ngày tuỳ mẫu." },
  { n: "05", title: "Nhận hàng & bảo hành", text: "Món được soi dưới kính lúp: đường hàn, chấu, mặt trong lòng nhẫn. Bạn thử, cân lại trọng lượng thật và nhận phiếu ghi chất liệu cùng điều kiện bảo hành.", img: IMGS.loupe },
] as const;

export const KARATS = [
  { k: "10K", pct: 41.7, use: "Cứng, giá mềm. Hợp món đeo hằng ngày, dễ chạm va." },
  { k: "14K", pct: 58.5, use: "Cân bằng giữa độ bền và hàm lượng vàng. Lựa chọn phổ biến cho nhẫn cưới." },
  { k: "18K", pct: 75, use: "Màu vàng ấm đậm hơn, mềm hơn. Hợp mặt nhẫn đính đá chính, món để dành." },
  { k: "24K", pct: 99.9, use: "Vàng ròng, rất mềm. Hợp tích trữ hoặc món ít va chạm hơn là món đeo hằng ngày." },
] as const;

export const CARE = [
  { t: "Vệ sinh tại nhà", d: "Ngâm nước ấm pha chút xà phòng dịu, chải nhẹ bằng bàn chải lông mềm rồi lau khô. Tránh clo, nước hoa và hoá chất tẩy rửa." },
  { t: "Cất giữ", d: "Mỗi món một ngăn hoặc một túi vải riêng để không xước nhau. Tháo trang sức khi tắm biển, tập nặng hoặc dọn dẹp." },
  { t: "Kiểm tra định kỳ", d: "Mang món trang sức đến để xem lại chấu giữ đá, khoá, mắt xích và độ sáng của bề mặt. Phát hiện sớm thì sửa nhỏ." },
] as const;

export const POLICIES = [
  { t: "Bảo hành", d: "Bảo hành lỗi chế tác như đường hàn, chấu lỏng, khoá hỏng trong 12 tháng kể từ ngày nhận. Không gồm hư hỏng do va đập, biến dạng hoặc hoá chất." },
  { t: "Đặt cọc khi đặt làm", d: "Món đặt làm theo yêu cầu đặt cọc sau khi duyệt bản phác. Mức cọc và ngày hẹn ghi trên phiếu; huỷ sau khi vàng đã được nấu thì giữ lại phần công đã làm." },
  { t: "Thu đổi", d: "Thu đổi món đã mua tại tiệm theo giá vàng tại ngày thu, trừ hao phần đá và công. Đổi sang món mới chỉ trả phần chênh lệch." },
  { t: "Phiếu và ghi chú chất liệu", d: "Mỗi món có phiếu ghi tuổi vàng, loại đá (tổng hợp hay tự nhiên), trọng lượng thật và ngày nhận." },
] as const;

export const HOURS = [
  { d: 1, label: "Thứ hai", open: "9:00", close: "20:00" },
  { d: 2, label: "Thứ ba", open: "9:00", close: "20:00" },
  { d: 3, label: "Thứ tư", open: "9:00", close: "20:00" },
  { d: 4, label: "Thứ năm", open: "9:00", close: "20:00" },
  { d: 5, label: "Thứ sáu", open: "9:00", close: "20:00" },
  { d: 6, label: "Thứ bảy", open: "9:00", close: "20:00" },
  { d: 0, label: "Chủ nhật", open: "9:00", close: "18:00" },
] as const;

export const FAQ = [
  { q: "Vàng 10K, 14K, 18K và 24K khác nhau thế nào?", a: "Khác nhau ở hàm lượng vàng nguyên chất: 10K ≈ 41,7%, 14K ≈ 58,5%, 18K = 75%, 24K ≈ 99,9%. Số K càng cao thì vàng càng nhiều, màu ấm đậm hơn, mềm hơn và giá cao hơn; số K thấp thì cứng hơn, hợp món hay va chạm." },
  { q: "Giá được tính thế nào? Có phải giá vàng hôm nay không?", a: "Giá = trọng lượng × hàm lượng vàng × đơn giá + công chế tác + đá (+ công gắn đá). Đơn giá trên trang là mức tham khảo bạn chỉnh được, không phải giá vàng thời gian thực. Giá chính thức báo tại tiệm theo đơn giá ngày bạn chốt." },
  { q: "Khoảng giá trên công cụ có phải giá cuối không?", a: "Không. Đó là khoảng tham khảo tính từ trọng lượng ước tính, đơn giá bạn nhập, công và đá. Giá chính thức được báo sau khi thống nhất thiết kế, trọng lượng thật và vật liệu." },
  { q: "Đặt làm một món mất bao lâu?", a: "Thường 7 – 14 ngày tuỳ mẫu và độ phức tạp; nhẫn cưới đôi hoặc món gắn nhiều đá có thể lâu hơn. Ngày hẹn dự kiến được ghi trên phiếu khi bạn chốt thiết kế." },
  { q: "Tôi có thể khắc chữ lên nhẫn không?", a: "Có. Khắc mặt trong nhẫn tối đa khoảng 14 ký tự, gồm tên, ngày hoặc một câu ngắn. Mặt dây và lắc có thể khắc dài hơn. Bạn xem thử dòng chữ trước khi khắc." },
  { q: "Nhẫn chật hoặc rộng thì sửa được không?", a: "Thường nới hoặc thu được 1 – 2 cỡ. Nhẫn đính đá quanh vòng hoặc thành rất mỏng có thể hạn chế hơn; tiệm xem món rồi báo công và thời gian." },
  { q: "Đá tổng hợp và đá tự nhiên khác nhau ra sao?", a: "Đá tổng hợp được tạo trong phòng thí nghiệm, đồng đều và giá ổn định. Đá tự nhiên hình thành trong lòng đất, mỗi viên mỗi khác nên khoảng giá rộng hơn nhiều. Loại đá được ghi rõ trên phiếu." },
  { q: "Món mua rồi có thu đổi lại được không?", a: "Được, với món mua tại tiệm. Giá thu tính theo hàm lượng vàng tại ngày thu, trừ hao phần đá và công đã làm; đổi sang món mới chỉ trả phần chênh lệch. Điều kiện cụ thể ghi trên phiếu." },
  { q: "Tôi nên chọn cỡ nhẫn thế nào?", a: "Cỡ tay trong công cụ chỉ giúp ước tính trọng lượng. Cỡ chính xác nên được đo trực tiếp vào buổi chiều, khi ngón tay không quá lạnh hay phù nề. Tiệm đo giúp bạn miễn phí." },
] as const;

export const CONTACT = {
  place: "Quận Hải Châu, Đà Nẵng",
  phone: "0236 000 0000",
  email: "xinchao@kimnguyet.example",
  social: "instagram.com/kimnguyet.example",
};
