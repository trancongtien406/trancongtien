import type { RoomId } from "../lib/rooms";

export const BRAND = {
  name: "Hiên Mặn",
  full: "Hiên Mặn Villa",
  slogan: "Villa ven biển Sơn Trà, Đà Nẵng.",
  area: "Quận Sơn Trà · Đà Nẵng",
  /** Chỉ ghi khu vực chung, không địa chỉ thật. */
  contact: "xinchao@hienman.example",
  phone: "0236 000 0000",
};

export const NAV = [
  { href: "#phong", label: "Phòng nghỉ" },
  { href: "#bang-phong", label: "Bảng giá" },
  { href: "#lich-gia", label: "Lịch phòng" },
  { href: "#an-uong", label: "Ăn uống" },
  { href: "#trai-nghiem", label: "Hoạt động" },
  { href: "#vi-tri", label: "Vị trí" },
];

export const HERO_FACTS = [
  { k: "Giá từ", v: "2.040.000 ₫", s: "một phòng, một đêm" },
  { k: "Nhận / trả phòng", v: "14:00 / 12:00", s: "gửi hành lý miễn phí" },
  { k: "Sức chứa", v: "2 đến 16 khách", s: "7 phòng, có gói bao trọn" },
] as const;

export const STORY = [
  "Hiên Mặn là villa nghỉ dưỡng bảy phòng nằm ven biển bán đảo Sơn Trà, Đà Nẵng. Kiến trúc kính và gỗ mở ra bãi cỏ, hồ bơi dài nhìn ra biển và hàng dừa; từ hiên gỗ ra bãi mất khoảng bốn phút đi bộ.",
  "Bạn có thể đặt từng phòng (hai đến bốn khách mỗi phòng) hoặc bao trọn cả villa cho nhóm đến 16 người, dùng riêng hồ bơi, sân và bếp mở. Giờ yên tĩnh sau 22:00, nên hợp với những chuyến đi để nghỉ hơn là để tiệc tùng.",
];

export const STAY_FOR = [
  { t: "Gia đình hai thế hệ", d: "Phòng 2–4 khách, hồ bơi có người lớn đi cùng, bữa sáng tại hiên." },
  { t: "Nhóm bạn 6–16 người", d: "Bao trọn villa: 7 phòng, bếp mở, sân BBQ, tối thiểu 2 đêm." },
  { t: "Cặp đôi, làm việc từ xa", d: "Hiên Bình Minh có hiên riêng; Wi-Fi ổn định, bàn làm việc nhỏ." },
] as const;

export const FACTS = [
  { n: "7", l: "phòng nghỉ" },
  { n: "1", l: "hồ bơi nhìn biển" },
  { n: "16", l: "khách khi bao trọn" },
];

export interface TimeStop {
  from: number;
  time: string;
  title: string;
  text: string;
  todo: string;
  image: string;
  alt: string;
  pos: string;
  night?: boolean;
}

/** Bốn mốc trong ngày; ảnh đổi theo mốc, màu trời đổi liên tục theo giờ kéo. */
export const TIME_STOPS: TimeStop[] = [
  { from: 5 * 60, time: "05:50", title: "Ban mai", text: "Mặt trời lên trên mặt biển lúc khoảng 5:50. Hiên phòng hướng đông nên nắng sớm vào thẳng giường.", todo: "Ra bãi xem thuyền thúng vào bờ, hoặc chạy bộ ven bán đảo trước khi nắng lên.", image: "binh-minh-bien", alt: "Mặt trời mọc trên mặt biển Đà Nẵng, nền trời cam hồng", pos: "50% 60%" },
  { from: 10 * 60 + 30, time: "14:30", title: "Mặt nước", text: "Hồ bơi mở từ 6:00 đến 21:00. Buổi chiều là lúc hồ vắng nhất, sau giờ trả phòng và trước giờ ăn tối.", todo: "Xuống hồ, đọc sách bên bể, gọi nước uống ra hiên.", image: "ho-boi-hoang-hon", alt: "Hồ bơi và sàn gỗ dưới bầu trời tím cam", pos: "50% 55%" },
  { from: 16 * 60 + 30, time: "18:10", title: "Hoàng hôn", text: "Mặt trời lặn phía bán đảo lúc khoảng 18:10. Hiên gỗ là chỗ ngồi đẹp nhất để ngắm.", todo: "Ngồi hiên gỗ, ăn tối sớm tại villa hoặc đi quán hải sản gần đó.", image: "hoang-hon-hien-go", alt: "Mặt trời lặn nhìn từ hiên gỗ ven biển", pos: "50% 45%" },
  { from: 19 * 60 + 30, time: "21:00", title: "Đêm yên", text: "Hồ bơi đóng lúc 21:00. Sau 22:00 villa vào giờ yên tĩnh, không mở nhạc lớn.", todo: "Uống trà ngoài hiên, nghe sóng. Cần gì cứ nhắn lễ tân qua điện thoại.", image: "hoang-hon-hien-go", alt: "Hiên gỗ ven biển lúc trời tối", pos: "50% 45%", night: true },
];

export interface RoomInfo {
  id: RoomId;
  kind: string;
  name: string;
  area: string;
  bed: string;
  cap: string;
  count: string;
  meta: string;
  text: string;
  image: string;
  alt: string;
  pos: string;
  from: string;
  bullets: string[];
}

export const ROOM_INFO: RoomInfo[] = [
  {
    id: "bien-go",
    kind: "Phòng hướng biển",
    name: "Hiên Biển",
    area: "40 m²",
    bed: "1 giường King 1,8 m",
    cap: "2 khách, tối đa 3",
    count: "3 phòng",
    meta: "40 m² · 2–3 khách · 3 phòng",
    text: "Dải cửa sổ dài hướng thẳng ra biển, có bàn làm việc nhỏ cạnh cửa sổ.",
    image: "phong-ngu-cua-so-bien",
    alt: "Phòng ngủ gỗ ấm với dải cửa sổ nhìn ra biển",
    pos: "50% 55%",
    from: "Từ 2.040.000 ₫ / đêm",
    bullets: ["Giường King 1,8 m", "Bàn làm việc nhỏ", "Tầm nhìn biển"],
  },
  {
    id: "hien-sang",
    kind: "Phòng có hiên riêng",
    name: "Hiên Bình Minh",
    area: "46 m²",
    bed: "1 giường King 1,8 m",
    cap: "2 khách, tối đa 3",
    count: "2 phòng",
    meta: "46 m² · 2–3 khách · 2 phòng",
    text: "Cửa kính trượt mở ra hiên riêng, nắng sớm đi thẳng vào giường.",
    image: "phong-ngu-cua-kinh",
    alt: "Phòng ngủ sáng màu có cửa kính trượt mở ra phía biển",
    pos: "55% 55%",
    from: "Từ 2.640.000 ₫ / đêm",
    bullets: ["Hiên riêng", "Giường King 1,8 m", "Góc đọc sách"],
  },
  {
    id: "suite-ho-boi",
    kind: "Suite ra hồ bơi",
    name: "Suite Hồ Bơi",
    area: "68 m²",
    bed: "1 giường King + sofa giường",
    cap: "2 khách, tối đa 4",
    count: "2 phòng",
    meta: "68 m² · 2–4 khách · 2 phòng",
    text: "Phòng khách riêng, bồn tắm, bước ra là hồ bơi và đường chân trời.",
    image: "phong-khach-mo",
    alt: "Phòng khách mở rộng cửa ra biển, nội thất gỗ và vải lanh",
    pos: "50% 50%",
    from: "Từ 3.910.000 ₫ / đêm",
    bullets: ["Phòng khách riêng", "Lối ra hồ bơi", "Bồn tắm"],
  },
  {
    id: "tron-villa",
    kind: "Bao trọn villa",
    name: "Bao trọn villa",
    area: "Toàn bộ villa",
    bed: "7 phòng, 7 giường King",
    cap: "12 khách, tối đa 16",
    count: "1 gói",
    meta: "7 phòng · tối đa 16 khách",
    text: "Cả Hiên Mặn dành cho nhóm của bạn: hồ bơi, sân, bếp mở và bãi cỏ dùng riêng.",
    image: "kien-truc-kinh-go",
    alt: "Mặt tiền villa kính và gỗ nhìn ra bãi cỏ xanh",
    pos: "50% 50%",
    from: "Từ 16.830.000 ₫ / đêm",
    bullets: ["Dùng riêng hồ bơi", "Bếp mở và sân", "Tối thiểu 2 đêm"],
  },
];

export const AMENITIES = [
  { t: "Hồ bơi nhìn biển", d: "Hồ dài, nước ngọt, mở 6:00–21:00. Trẻ em xuống hồ cần người lớn đi cùng; có phao và áo phao cỡ nhỏ." },
  { t: "Hiên gỗ và võng", d: "Hiên chung có bàn ăn ngoài trời, võng và ghế dài. Nơi ăn sáng và ngắm hoàng hôn." },
  { t: "Bếp mở và sân BBQ", d: "Bếp đủ nồi chảo, tủ lạnh lớn, lò nướng than ngoài sân. Dùng riêng khi bao trọn; đặt trước nếu muốn dùng khi ở lẻ." },
  { t: "Góc làm việc", d: "Wi-Fi phủ toàn villa, bàn làm việc trong phòng Hiên Biển và Hiên Bình Minh, ổ cắm đầu giường." },
  { t: "Riêng tư vừa đủ", d: "Chỉ bảy phòng, lối đi lát đá có đèn, giờ yên tĩnh sau 22:00." },
  { t: "Hỗ trợ tại chỗ", d: "Lễ tân trực 7:00–22:00, gọi được ngoài giờ qua điện thoại. Giặt ủi tính phí theo kg." },
];

export const IN_ROOM = ["Điều hòa", "Wi-Fi", "Phòng tắm riêng", "Máy sấy tóc", "Nước uống", "Khăn tắm", "Đồ vệ sinh thân thiện môi trường", "Dép đi trong nhà", "Ấm đun nước, trà và cà phê"];

export const DINING = [
  { t: "Bữa sáng ngoài hiên", time: "7:00 – 9:30", price: "120.000 ₫ / người", d: "Bánh mì nướng, trứng, trái cây theo mùa, cà phê phin. Đặt từ tối hôm trước; trẻ dưới 6 tuổi miễn phí." },
  { t: "BBQ hải sản tại sân", time: "Từ 18:00", price: "450.000 ₫ / người", d: "Từ 6 người, đặt trước một ngày. Hải sản mua theo mùa tại chợ Sơn Trà, nướng tại sân." },
  { t: "Đầu bếp nấu tại villa", time: "Theo giờ bạn chọn", price: "Báo giá theo thực đơn", d: "Dành cho nhóm bao trọn villa. Gửi thực đơn mong muốn và số người, villa báo giá trước khi đến." },
  { t: "Ăn ngoài, gần villa", time: "Hải sản, bún mì, cà phê", price: "Chủ yếu 10–20 phút đi xe", d: "Lễ tân gợi ý quán theo ngân sách và giờ bạn muốn; có thể gọi xe và đặt bàn giúp." },
] as const;

export const DIET_NOTE = "Ăn chay, dị ứng hải sản, đồ ăn cho trẻ nhỏ: báo khi đặt phòng để villa chuẩn bị.";

export const EXPERIENCES = [
  { time: "05:30", t: "Bình minh trên bãi", d: "Ra biển lúc thuyền thúng vào bờ, xem người làng chài kéo lưới." },
  { time: "07:30", t: "Bữa sáng trên hiên", d: "Bánh mì nướng, trái cây theo mùa, cà phê phin." },
  { time: "10:00", t: "Chạy bộ hoặc đạp xe", d: "Cung đường ven bán đảo; xe đạp cho mượn miễn phí, có bản đồ giấy." },
  { time: "16:30", t: "Chiều ở bể", d: "Đọc sách, ngủ trưa muộn hoặc không làm gì cả." },
  { time: "19:00", t: "Bữa tối hải sản", d: "Đi quán địa phương, hoặc BBQ và đầu bếp nấu tại villa (đặt trước)." },
];

export const SERVICES = [
  { t: "Đưa đón sân bay Đà Nẵng", d: "Xe 4 chỗ hoặc 7 chỗ, tài xế đợi theo chuyến bay. Khoảng 20 phút từ sân bay.", p: "Từ 250.000 ₫ / chiều" },
  { t: "Thuê xe máy", d: "Xe số và xe ga, có mũ bảo hiểm. Trả xe trước 20:00.", p: "150.000 ₫ / ngày" },
  { t: "Xe đạp", d: "Cho mượn miễn phí, 6 xe, có khoá.", p: "Miễn phí" },
  { t: "Chuyến thuyền thúng buổi sáng", d: "Đi cùng ngư dân làng chài, khoảng 90 phút, tối thiểu 2 người, đặt trước một ngày.", p: "350.000 ₫ / người" },
  { t: "Massage tại villa", d: "Kỹ thuật viên đến tận phòng, 60 hoặc 90 phút, đặt trước một ngày.", p: "Từ 450.000 ₫ / giờ" },
  { t: "Trang trí sinh nhật, kỷ niệm", d: "Bàn tiệc nhỏ trên hiên, hoa, bóng, bánh kem đặt riêng.", p: "Từ 600.000 ₫" },
] as const;

export const LOCATION = [
  { k: "Khu vực", v: "Ven biển bán đảo Sơn Trà, Quận Sơn Trà, Đà Nẵng" },
  { k: "Sân bay Đà Nẵng", v: "Khoảng 20 phút đi xe" },
  { k: "Cầu Rồng, trung tâm", v: "Khoảng 20–25 phút" },
  { k: "Biển Mỹ Khê", v: "Khoảng 15 phút" },
  { k: "Chùa Linh Ứng", v: "Khoảng 15 phút" },
  { k: "Hội An", v: "Khoảng 45–50 phút" },
  { k: "Bãi biển gần villa", v: "Khoảng 4 phút đi bộ từ hiên gỗ" },
] as const;

export interface WalkStop {
  t: string;
  d: string;
  min: number;
  x: number;
  y: number;
}

/** Sơ đồ đường đi trong villa (toạ độ trong khung 800 × 440). */
export const WALK: WalkStop[] = [
  { t: "Cổng và chỗ đậu xe", d: "Đậu được 4 ô tô, xe máy đậu sát tường rào. Xe 7 chỗ vào được đến cổng.", min: 0, x: 70, y: 360 },
  { t: "Sảnh đón khách", d: "Nhận phòng từ 14:00, gửi hành lý miễn phí. Nước chào và khăn lạnh khi đến.", min: 1, x: 190, y: 292 },
  { t: "Sân cỏ và bếp mở", d: "Bãi cỏ và bếp dùng chung; dùng riêng khi bao trọn. Lò nướng than đặt ở góc sân.", min: 2, x: 320, y: 318 },
  { t: "Hồ bơi", d: "Mở 6:00–21:00, có ghế dài và dù. Lối ra hồ từ Suite Hồ Bơi chỉ vài bước.", min: 3, x: 450, y: 236 },
  { t: "Dãy phòng", d: "Hiên Biển, Hiên Bình Minh và Suite Hồ Bơi xếp dọc lối đi lát đá, có đèn tối.", min: 4, x: 560, y: 150 },
  { t: "Hiên gỗ nhìn biển", d: "Bàn ăn sáng, võng và chỗ ngắm hoàng hôn. Ăn sáng 7:00–9:30.", min: 5, x: 668, y: 118 },
  { t: "Lối xuống bãi", d: "Bậc đá xuống bãi, khoảng 4 phút đi bộ. Có vòi rửa chân ở chân bậc.", min: 9, x: 740, y: 214 },
];

export const SEASONS = [
  { name: "Mùa thấp", range: "Tháng 10 đến tháng 1", mult: "−15%", note: "Biển động nhẹ, hồ bơi vẫn dễ chịu. Giá mềm nhất." },
  { name: "Mùa thường", range: "Tháng 2 đến tháng 4, tháng 9", mult: "giá gốc", note: "Trời dịu, ít khách." },
  { name: "Mùa cao", range: "Tháng 5 đến tháng 8", mult: "+30%", note: "Nắng và biển đẹp nhất." },
  { name: "Dịp lễ, Tết", range: "Theo lịch bên dưới", mult: "+55%", note: "Tối thiểu 3 đêm." },
];

export const POLICIES = [
  { t: "Nhận và trả phòng", d: "Nhận phòng từ 14:00, trả phòng trước 12:00. Gửi hành lý miễn phí; nhận sớm hoặc trả muộn tuỳ phòng trống, báo trước." },
  { t: "Đặt cọc và huỷ", d: "Cọc 30% khi giữ chỗ. Huỷ trước 7 ngày: hoàn cọc. Huỷ muộn hơn: giữ cọc cho đêm đầu." },
  { t: "Đêm tối thiểu", d: "Đêm thứ sáu và thứ bảy: tối thiểu 2 đêm. Dịp lễ, Tết: tối thiểu 3 đêm. Bao trọn villa: tối thiểu 2 đêm." },
  { t: "Trẻ em và khách thêm", d: "Trẻ dưới 6 tuổi ngủ chung giường bố mẹ, miễn phí. Khách thêm trong sức chứa tối đa: phụ thu theo đêm." },
  { t: "Giờ yên tĩnh", d: "Sau 22:00 không mở nhạc lớn. Không tổ chức tiệc đông người khi chưa báo trước." },
  { t: "Hút thuốc, thú cưng", d: "Không hút thuốc trong phòng, chỉ hút ngoài sân. Chưa nhận thú cưng trong phòng." },
];

export const FAQ = [
  { q: "Tôi xem giá và ngày trống ở đâu?", a: "Ở phần Lịch phòng & chi phí: chọn loại phòng, ngày nhận và trả phòng, số khách để xem tình trạng từng ngày và khoản tạm tính." },
  { q: "Lịch phòng trống có chính xác không?", a: "Lịch cho biết tình trạng phòng tham khảo theo từng ngày. Tình trạng chính thức được xác nhận khi bạn trao đổi để giữ chỗ." },
  { q: "Giá được tính thế nào?", a: "Giá gốc của loại phòng nhân hệ số mùa, cộng 18% cho đêm thứ sáu và thứ bảy, trừ giảm giá ở dài ngày (3 đêm giảm 5%, 5 đêm giảm 8%, 7 đêm giảm 12%), cộng phụ thu khách thêm, phí dịch vụ 5% và phí vệ sinh một lần. Bảng chi tiết từng đêm hiện ngay dưới lịch." },
  { q: "Villa có đón từ sân bay không?", a: "Có. Xe 4 chỗ hoặc 7 chỗ từ 250.000 ₫ một chiều, đợi theo chuyến bay. Báo số chuyến bay và giờ đến khi giữ chỗ." },
  { q: "Giá phòng đã gồm bữa sáng chưa?", a: "Chưa. Bữa sáng ngoài hiên 120.000 ₫ một người, đặt từ tối hôm trước; trẻ dưới 6 tuổi miễn phí." },
  { q: "Có thể bao trọn villa cho nhóm đông không?", a: "Có. Gói bao trọn dùng cả 7 phòng, tối đa 16 khách, tối thiểu 2 đêm. Chỉ chọn được khi tất cả phòng lẻ đều trống." },
  { q: "Villa nằm ở đâu?", a: "Ven biển bán đảo Sơn Trà, Quận Sơn Trà, Đà Nẵng. Địa chỉ chi tiết gửi khi bạn giữ chỗ." },
  { q: "Bấm Nhận tư vấn thì chuyện gì xảy ra?", a: "Bạn được chuyển tới form tư vấn của website chính để trao đổi về dự án website cho villa, homestay. Trang này không giữ chỗ và không gửi dữ liệu đặt phòng nào." },
];
