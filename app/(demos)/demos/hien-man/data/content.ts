import type { RoomId } from "../lib/rooms";

export const BRAND = {
  name: "Hiên Mặn",
  full: "Hiên Mặn Villa",
  slogan: "Ở lại cùng nhịp biển.",
  area: "Sơn Trà · Đà Nẵng",
  /** Chỉ ghi khu vực chung, không địa chỉ thật. */
  contact: "xinchao@hienman.example",
};

export const NAV = [
  { href: "#ve-hien", label: "Về Hiên" },
  { href: "#phong", label: "Phòng nghỉ" },
  { href: "#khong-gian", label: "Không gian" },
  { href: "#trai-nghiem", label: "Quanh Hiên" },
  { href: "#lich-gia", label: "Lịch & giá" },
];

export const STORY =
  "Hiên Mặn bắt đầu từ một ý nghĩ giản dị: đôi khi, điều ta cần không phải một chuyến đi thật xa, mà là một nơi đủ yên để trở về với chính mình. Lấy cảm hứng từ những mái hiên ven biển Sơn Trà, Hiên Mặn được hình dung như một ngôi nhà mở ra với nắng, gió và khoảng xanh của đại dương. Gỗ mộc, đá tự nhiên, những tấm rèm nhẹ và khoảng sân ngập sáng tạo nên một không gian không cần nhiều lời giới thiệu. Ở đây, buổi sáng có thể bắt đầu bằng một tách cà phê, buổi chiều dành cho mặt nước, và buổi tối chỉ cần tiếng gió. Mọi thứ vừa đủ để chậm lại.";

export const FACTS = [
  { n: "7", l: "phòng nghỉ" },
  { n: "1", l: "hồ bơi nhìn biển" },
  { n: "16", l: "khách khi bao trọn" },
];

export interface Scene {
  time: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  pos: string;
}

export const SCENES: Scene[] = [
  { time: "05:50", title: "Ban mai", text: "Thức dậy cùng ánh sáng đầu ngày, thay vì tiếng chuông báo thức.", image: "binh-minh-bien", alt: "Mặt trời mọc trên mặt biển Đà Nẵng, nền trời cam hồng", pos: "50% 60%" },
  { time: "14:30", title: "Mặt nước", text: "Một khoảng nước xanh để dành cho những buổi chiều không có lịch trình.", image: "ho-boi-hoang-hon", alt: "Hồ bơi và sàn gỗ dưới bầu trời tím cam", pos: "50% 55%" },
  { time: "18:10", title: "Hoàng hôn", text: "Ngồi lại trên hiên gỗ, để gió biển đi qua một buổi tối chậm.", image: "hoang-hon-hien-go", alt: "Mặt trời lặn nhìn từ hiên gỗ ven biển", pos: "50% 45%" },
];

export interface RoomInfo {
  id: RoomId;
  kind: string;
  name: string;
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
    kind: "Ocean room",
    name: "Hiên Biển",
    meta: "40 m² · 2–3 khách · 3 phòng",
    text: "Dải cửa sổ dài hướng thẳng ra biển, dành cho những buổi sáng nhiều ánh sáng.",
    image: "phong-ngu-cua-so-bien",
    alt: "Phòng ngủ gỗ ấm với dải cửa sổ nhìn ra biển",
    pos: "50% 55%",
    from: "Từ 2.040.000 ₫ / đêm",
    bullets: ["Giường King 1,8 m", "Bàn làm việc nhỏ", "Tầm nhìn biển"],
  },
  {
    id: "hien-sang",
    kind: "Sunrise room",
    name: "Hiên Bình Minh",
    meta: "46 m² · 2–3 khách · 2 phòng",
    text: "Cửa kính trượt mở ra khoảng hiên riêng, nắng sớm đi thẳng vào giường.",
    image: "phong-ngu-cua-kinh",
    alt: "Phòng ngủ sáng màu có cửa kính trượt mở ra phía biển",
    pos: "55% 55%",
    from: "Từ 2.640.000 ₫ / đêm",
    bullets: ["Hiên riêng", "Giường King 1,8 m", "Góc đọc sách"],
  },
  {
    id: "suite-ho-boi",
    kind: "Pool suite",
    name: "Suite Hồ Bơi",
    meta: "68 m² · 2–4 khách · 2 phòng",
    text: "Phòng khách mở, gỗ và vải lanh, bước ra là mặt nước và đường chân trời.",
    image: "phong-khach-mo",
    alt: "Phòng khách mở rộng cửa ra biển, nội thất gỗ và vải lanh",
    pos: "50% 50%",
    from: "Từ 3.910.000 ₫ / đêm",
    bullets: ["Phòng khách riêng", "Lối ra hồ bơi", "Bồn tắm"],
  },
  {
    id: "tron-villa",
    kind: "Whole villa",
    name: "Bao trọn villa",
    meta: "7 phòng · tối đa 16 khách",
    text: "Cả Hiên Mặn thuộc về nhóm bạn: kính, gỗ, bãi cỏ và hồ bơi riêng cho cả đoàn.",
    image: "kien-truc-kinh-go",
    alt: "Mặt tiền villa kính và gỗ nhìn ra bãi cỏ xanh",
    pos: "50% 50%",
    from: "Từ 16.830.000 ₫ / đêm",
    bullets: ["Dùng riêng hồ bơi", "Bếp mở và sân", "Tối thiểu 2 đêm"],
  },
];

export const AMENITIES = [
  { t: "Một buổi sáng ngoài hiên", d: "Bữa sáng nhẹ, một tách cà phê và những khoảng trò chuyện không vội." },
  { t: "Chất liệu gần gũi", d: "Gỗ, đá, vải thô và ánh sáng tự nhiên tạo nên cảm giác ấm áp." },
  { t: "Một khoảng nước xanh", d: "Hồ bơi dài nhìn ra biển, mở từ sáng sớm đến chín giờ tối." },
  { t: "Khoảng xanh để nghỉ", d: "Góc nhỏ dành cho việc đọc sách, ngồi yên hoặc đơn giản là nhìn cây." },
  { t: "Riêng tư vừa đủ", d: "Chỉ bảy phòng, lối đi riêng, giờ yên tĩnh sau 22:00." },
  { t: "Việc nhỏ có người lo", d: "Đón sân bay, thuê xe máy, gợi ý bàn hải sản: nhắn một lần là xong." },
];

export const IN_ROOM = ["Điều hòa", "Wi-Fi", "Phòng tắm riêng", "Máy sấy tóc", "Nước uống", "Khăn tắm", "Đồ vệ sinh thân thiện môi trường", "Dép đi trong nhà"];

export const EXPERIENCES = [
  { time: "05:30", t: "Bình minh trên bãi", d: "Ra biển cùng người dân làng chài, nhìn thuyền thúng vào bờ." },
  { time: "07:30", t: "Bữa sáng trên hiên", d: "Bánh mì nướng, trái cây theo mùa, cà phê phin." },
  { time: "10:00", t: "Chạy bộ hoặc đạp xe", d: "Cung đường ven bán đảo, đồ nghề cho mượn, có bản đồ giấy." },
  { time: "16:30", t: "Chiều ở bể", d: "Đọc sách, ngủ trưa muộn hoặc không làm gì cả." },
  { time: "19:00", t: "Bữa tối hải sản", d: "Gợi ý nhà hàng địa phương, hoặc đầu bếp nấu tại villa (đặt trước)." },
];

export const SEASONS = [
  { name: "Mùa thấp", range: "Tháng 10 đến tháng 1", mult: "−15%", note: "Biển động nhẹ, hồ bơi vẫn dễ chịu. Giá mềm nhất." },
  { name: "Mùa thường", range: "Tháng 2 đến tháng 4, tháng 9", mult: "giá gốc", note: "Trời dịu, ít khách." },
  { name: "Mùa cao", range: "Tháng 5 đến tháng 8", mult: "+30%", note: "Nắng và biển đẹp nhất." },
  { name: "Dịp lễ, Tết", range: "Theo lịch bên dưới", mult: "+55%", note: "Tối thiểu 3 đêm." },
];

export const POLICIES = [
  { t: "Nhận và trả phòng", d: "Nhận phòng từ 14:00, trả phòng trước 12:00. Có thể gửi hành lý miễn phí." },
  { t: "Đặt cọc và huỷ", d: "Cọc 30% khi giữ chỗ. Huỷ trước 7 ngày: hoàn cọc. Huỷ muộn hơn: giữ cọc cho đêm đầu." },
  { t: "Đêm tối thiểu", d: "Đêm thứ sáu và thứ bảy: tối thiểu 2 đêm. Dịp lễ, Tết: tối thiểu 3 đêm. Bao trọn villa: tối thiểu 2 đêm." },
  { t: "Trẻ em và khách thêm", d: "Trẻ dưới 6 tuổi ngủ chung giường bố mẹ, miễn phí. Khách thêm trong sức chứa tối đa: phụ thu theo đêm." },
  { t: "Giờ yên tĩnh", d: "Sau 22:00 không mở nhạc lớn. Không tổ chức tiệc đông người khi chưa báo trước." },
  { t: "Thú cưng", d: "Chưa nhận thú cưng trong phòng. Xin báo trước nếu bạn cần hỗ trợ đặc biệt." },
];

export const FAQ = [
  { q: "Tôi xem giá và ngày trống ở đâu?", a: "Ở phần Lịch & giá: chọn loại phòng, ngày nhận và trả phòng, số khách để xem tình trạng từng ngày và khoản tạm tính." },
  { q: "Lịch phòng trống có chính xác không?", a: "Lịch cho biết tình trạng phòng tham khảo theo từng ngày. Tình trạng chính thức được xác nhận khi bạn trao đổi để giữ chỗ." },
  { q: "Giá được tính thế nào?", a: "Giá gốc của loại phòng nhân hệ số mùa, cộng 18% cho đêm thứ sáu và thứ bảy, trừ giảm giá ở dài ngày (3 đêm giảm 5%, 5 đêm giảm 8%, 7 đêm giảm 12%), cộng phụ thu khách thêm, phí dịch vụ 5% và phí vệ sinh một lần. Bảng chi tiết từng đêm hiện ngay dưới lịch." },
  { q: "Bấm Nhận tư vấn thì chuyện gì xảy ra?", a: "Bạn được chuyển tới form tư vấn của website chính để trao đổi về dự án website cho villa, homestay. Trang này không giữ chỗ và không gửi dữ liệu đặt phòng nào." },
  { q: "Villa nằm ở đâu?", a: "Khu vực ven biển bán đảo Sơn Trà, Đà Nẵng. Địa chỉ cụ thể sẽ được gửi khi bạn trao đổi để giữ chỗ." },
  { q: "Có thể bao trọn villa cho nhóm đông không?", a: "Có. Gói bao trọn dùng cả 7 phòng, tối đa 16 khách, tối thiểu 2 đêm. Chỉ chọn được khi tất cả phòng lẻ đều trống." },
];
