export const IMG = "/images/demos/nha-pho-anh-sang/";

export const SCENES = ["s0", "city", "tower", "facade", "loggia", "room"] as const;
export const SCENE_ALT = [
  "Khu đất trống ở Thảo Điền lúc hoàng hôn, hàng đèn đường và cây cọ (ảnh minh hoạ)",
  "Đường chân trời thành phố lúc hoàng hôn (ảnh minh hoạ)",
  "Toà tháp kính ánh đồng nhìn từ dưới lên (ảnh minh hoạ)",
  "Mặt đứng toà nhà sáng đèn lúc chạng vạng với các hiên kính (ảnh minh hoạ)",
  "Phòng khách nhìn qua cửa kính gấp ra hiên (ảnh minh hoạ)",
  "Phòng khách ấm với gỗ, đá và ánh sáng gián tiếp (ảnh minh hoạ)",
];

export const CHAPTERS = [
  { id: "site", name: "Khu đất" },
  { id: "tower", name: "Toà tháp" },
  { id: "seam", name: "Đường đá" },
  { id: "loggia", name: "Hiên nắng" },
  { id: "interior", name: "Nội thất" },
] as const;

export const CAPS = [
  { k: "02 / TOÀ THÁP", a: "TỪ KHOẢNG TRỐNG,", b: "một hình khối.", p: "Kính tối bên ngoài, đá sáng bên trong. Toà tháp mọc lên quanh một đường cắt duy nhất." },
  { k: "03 / ĐƯỜNG ĐÁ", a: "MỘT ĐƯỜNG", b: "đá sáng.", p: "Một sống đá màu nhạt chạy suốt chiều cao mặt đứng và mở mỗi căn hộ ra bầu trời." },
  { k: "04 / HIÊN NẮNG", a: "MỘT PHÒNG", b: "ngoài trời.", p: "Mỗi căn hộ mở ra một hiên sâu khoét vào khối đá, lơ lửng trên thành phố." },
  { k: "05 / NỘI THẤT", a: "THÀNH PHỐ,", b: "trong tĩnh lặng.", p: "Gỗ, đá và ánh sáng ấm. Ngoài kia xe cộ vẫn chạy; bên trong chỉ còn nhịp thở của một mái nhà." },
  { k: "06 / THAM QUAN", a: "ĐẾN XEM", b: "tận nơi.", p: "" },
] as const;

export const GESTURES = [
  { n: "01", t: "Đường đá", img: "tower", alt: "Toà tháp kính đồng nhìn từ dưới lên", p: "Một sống đá nhạt chải dọc toà tháp từ chân tới đỉnh. Nó cắt qua lớp kính, chia bóng đổ của toà nhà và phác lại hình khối từ phía bên kia thành phố." },
  { n: "02", t: "Hiên nắng", img: "loggia", alt: "Phòng khách nhìn ra hiên qua cửa kính", p: "Mỗi căn hộ có một phòng ngoài trời, khoét vào khối nhà và dựng khung bằng đá. Lan can kính giữ trọn tầm nhìn ra thành phố." },
  { n: "03", t: "Ngưỡng cửa", img: "room", alt: "Phòng khách ấm với ánh sáng gián tiếp", p: "Cửa kính gấp gọn vào tường, phòng khách và hiên hoà làm một không gian. Ngưỡng cửa gần như biến mất." },
] as const;

export const PLANS = [
  { code: "R-01", name: "Căn hộ Hiên Nắng", img: "plan1", alt: "Phòng khách căn hộ Hiên Nắng", spec: ["98 m² · 2 phòng ngủ", "Hiên 14 m²", "Tầng 3 - 14", "Từ 8,9 tỷ"], d: "Mặt bằng mở, sáng hai phía, hiên sâu nối phòng khách và bếp. Căn bán chạy nhất của dự án." },
  { code: "R-02", name: "Căn hộ Góc", img: "plan2", alt: "Phòng khách căn góc nhiều cửa kính", spec: ["132 m² · 3 phòng ngủ", "Hiên chữ L 22 m²", "Tầng 15 - 20", "Từ 13,5 tỷ"], d: "Hai mặt thoáng, góc nhìn ôm sông Sài Gòn. Phòng ngủ chính có phòng thay đồ và bồn tắm cạnh cửa kính." },
  { code: "R-03", name: "Penthouse", img: "room", alt: "Phòng khách penthouse", spec: ["285 m² · 4 phòng ngủ", "Sân thượng 110 m²", "Tầng 21 - 22", "Giá theo yêu cầu"], d: "Hai tầng liền kề, sân thượng riêng có bể nước nông và bếp ngoài trời. Thang máy mở thẳng vào sảnh căn hộ." },
] as const;

export const MATERIALS = [
  { n: "Đá travertine mài mờ", d: "Sàn và vách sảnh, lát liền mạch, hơi ấm như sàn nhà cũ." },
  { n: "Đồng thau mờ", d: "Khung cửa kính, tay nắm và các chi tiết sáng ở bếp, ngả màu theo năm tháng." },
  { n: "Gỗ óc chó tối", d: "Ốp tường, tủ bếp, kệ sách. Vân gỗ chạy dọc, mối nối giấu kín." },
  { n: "Vải lanh nhạt", d: "Rèm hai lớp, ghế và tấm ốp, giữ ánh sáng mềm ở mọi giờ trong ngày." },
] as const;

export const AMENITIES = [
  { t: "Hồ bơi tầng 5", d: "Hồ 25 m ngoài trời giữa vườn cọ, đèn nước ấm sau 6 giờ chiều." },
  { t: "Phòng tập và spa", d: "Phòng tập, sauna khô và hai phòng trị liệu có huấn luyện viên theo hẹn." },
  { t: "Phòng chiếu riêng", d: "Hai phòng chiếu 8 chỗ ngồi, đặt theo giờ, âm thanh cách ly hoàn toàn." },
  { t: "Quản gia 24/7", d: "Đón khách, nhận hàng, đặt xe và giữ chìa khoá khi bạn vắng nhà." },
  { t: "Hầm rượu và bếp chung", d: "Tủ rượu riêng từng căn và bếp chung có đầu bếp thuê theo bữa." },
  { t: "Vườn trên mái", d: "Khu vườn 600 m² với lối đi đá, ghế dài và chòi trà nhìn ra sông." },
] as const;

export const JOURNEY = [
  { y: "2024", t: "Khởi công phần móng", d: "Khoan cọc nhồi và xử lý nền đất yếu bên bờ sông, hoàn tất trong 5 tháng." },
  { y: "2025", t: "Dựng lõi bê tông", d: "Lõi thang máy và đường đá nhạt vươn lên, mỗi chu kỳ 6 ngày một tầng." },
  { y: "2026", t: "Lắp mặt dựng kính đồng", d: "Từng tấm kính hai lớp lắp theo mô-đun, đồng thời xây hiên và lan can kính." },
  { y: "2027", t: "Hoàn thiện nội thất", d: "Ốp gỗ, lát đá, lắp cửa gấp. Khách mua có thể chọn vật liệu cho tới khi bắt đầu hoàn thiện." },
  { y: "2028", t: "Bàn giao", d: "Bàn giao từng tầng, kèm chuyến tham quan riêng và bộ chìa khoá bằng đồng." },
] as const;

export const TEAM = [
  { n: "Lâm Thuỵ Anh", r: "Kiến trúc sư chủ trì", d: "20 năm thiết kế nhà ở cao tầng. Tin rằng mỗi căn hộ cần một nơi để đứng ngoài trời." },
  { n: "Đoàn Minh Khôi", r: "Thiết kế nội thất", d: "Chọn vật liệu theo ánh sáng buổi chiều. Mỗi căn có một bảng màu riêng, không lặp lại." },
  { n: "Phạm Hồng Nhung", r: "Kiến trúc cảnh quan", d: "Dựng vườn trên mái bằng cây bản địa, chịu gió và ít nước." },
] as const;

export const FAQ = [
  { q: "Dự án có bao nhiêu căn hộ và khi nào bàn giao?", a: "48 căn hộ riêng tư trên 22 tầng, mỗi tầng 2 đến 3 căn. Dự kiến bàn giao theo từng tầng từ quý 2 năm 2028." },
  { q: "Tôi có thể tuỳ chỉnh vật liệu hoàn thiện không?", a: "Có. Bạn chọn đá, gỗ, kim loại và màu tường trong bộ vật liệu của dự án cho tới khi giai đoạn hoàn thiện bắt đầu. Mỗi lựa chọn đều có mẫu thật ở căn hộ mẫu." },
  { q: "Phương thức thanh toán và đặt cọc như thế nào?", a: "Giữ chỗ bằng khoản cọc có hoàn lại trong 14 ngày, sau đó chia 6 đợt theo tiến độ xây dựng. Bạn nhận lịch thanh toán chi tiết khi xem căn hộ mẫu." },
  { q: "Có được nuôi thú cưng và sử dụng hiên cho tiệc nhỏ không?", a: "Được nuôi thú cưng cỡ nhỏ và vừa. Hiên dùng cho bữa tối hoặc tiệc nhỏ dưới 12 khách, nội quy chi tiết nằm trong bộ tài liệu bán hàng." },
  { q: "Chủ sở hữu nước ngoài có mua được không?", a: "Công dân nước ngoài đủ điều kiện theo quy định hiện hành có thể sở hữu căn hộ trong giới hạn tỷ lệ cho phép. Đội ngũ sẽ giải thích cụ thể trong buổi xem riêng." },
  { q: "Đặt lịch xem riêng mất bao lâu?", a: "Bạn để lại thông tin, chúng tôi phản hồi trong một ngày làm việc và sắp xếp một buổi 60 phút tại căn hộ mẫu, có người dẫn đi qua từng không gian." },
] as const;
