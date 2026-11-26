export const SLUG = "can-ho-ven-bien";
export const IMG = "/images/demos/can-ho-ven-bien";
export const BRAND = "Vọng Triều";

export const NAV = [
  { href: "#vi-tri", label: "Vị trí" },
  { href: "#tien-ich", label: "Tiện ích" },
  { href: "#loai-can", label: "Loại căn" },
  { href: "#mat-bang", label: "Mặt bằng" },
  { href: "#du-toan", label: "Thanh toán" },
  { href: "#tham-quan", label: "Nhà mẫu" },
] as const;

export const OVERVIEW = [
  { k: "Loại hình", v: "Căn hộ ven biển, một tháp 36 tầng" },
  { k: "Loại căn", v: "1PN, 2PN và 3PN, mặt bằng xem được ngay trên trang" },
  { k: "Hướng nhìn", v: "Đông, Đông Nam, Đông Bắc: biển ở phía trước, đô thị phía sau" },
  { k: "Bàn giao", v: "Hai mức: cơ bản hoặc đầy đủ nội thất" },
  { k: "Dành cho", v: "Gia đình trẻ, người mua để ở và người nghỉ dưỡng dài ngày" },
  { k: "Giấy tờ, tiến độ, phí quản lý", v: "Đội tư vấn gửi văn bản chính thức khi bạn liên hệ; trang này không đưa cam kết" },
] as const;

export const AMENITY_LEVELS = [
  { id: "san-thuong", label: "Tầng 36", from: 36, to: 36, name: "Sân thượng", text: "Ngắm bình minh và hoàng hôn, có góc ngồi và bàn chung. Mở theo giờ sinh hoạt của cư dân." },
  { id: "can-ho-cao", label: "Tầng 7 đến 35", from: 7, to: 35, name: "Các tầng căn hộ", text: "Ba loại căn 1PN, 2PN, 3PN xếp theo tầng thấp, tầng trung và tầng cao; mỗi tầng một đường chân trời khác nhau." },
  { id: "tien-ich-6", label: "Tầng 6", from: 6, to: 6, name: "Phòng tập, yoga, làm việc chung", text: "Phòng tập thiết bị, phòng yoga và khu làm việc chung có cửa kính cao, dùng được cả buổi sáng lẫn tối." },
  { id: "tien-ich-5", label: "Tầng 5", from: 5, to: 5, name: "Hồ bơi tràn bờ và vườn", text: "Hồ bơi tràn bờ nhìn ra biển, hồ nông cho trẻ nhỏ, dải ghế nằm và vườn nhiệt đới." },
  { id: "tien-ich-trep", label: "Tầng 1 đến 4", from: 1, to: 4, name: "Sảnh đón, thương mại và đỗ xe", text: "Sảnh đón có lễ tân, quầy cà phê và cửa hàng tiện lợi; các tầng đỗ xe cho cư dân và khách, có chỗ sạc xe điện." },
] as const;

export const VISIT_SLOTS = [
  { id: "sang", label: "Sáng", sub: "9:00 đến 11:30" },
  { id: "chieu", label: "Chiều", sub: "14:00 đến 17:00" },
  { id: "cuoi-tuan", label: "Cuối tuần", sub: "Cả ngày, hẹn trước" },
] as const;

export const VISIT_STEPS = [
  { t: "Chọn buổi và loại căn", d: "Cho đội tư vấn biết bạn quan tâm 1PN, 2PN hay 3PN và thời gian rảnh." },
  { t: "Gặp tư vấn tại nhà mẫu", d: "Xem căn mẫu, vật liệu hoàn thiện và mô hình toàn tháp." },
  { t: "Xem mặt bằng và hướng nhìn", d: "Đối chiếu mặt bằng thật với công cụ trên trang, hỏi về tầng và hướng." },
  { t: "Nhận bảng giá chính thức", d: "Kèm chính sách thanh toán hiện hành và các giấy tờ cần chuẩn bị." },
] as const;

export type ChapterData = {
  id: string;
  no: string;
  sheet: string;
  title: string;
  lead: string;
  points: { k: string; v: string }[];
  photo: string;
  alt: string;
  pos: string;
};

export const CHAPTERS: ChapterData[] = [
  {
    id: "vi-tri",
    no: "01",
    sheet: "Bản vẽ A-01 · Vị trí và kết nối",
    title: "Mặt tiền hướng biển, lưng tựa đô thị.",
    lead: "Toà tháp đứng ở dải ven biển phía Đông Đà Nẵng, giữa bãi cát dài và những con phố quen. Thông tin dưới đây ở mức khu vực; vị trí chính xác và lộ trình được đội tư vấn gửi khi bạn đặt lịch xem nhà mẫu.",
    points: [
      { k: "Ra biển", v: "Đi bộ khoảng 5 phút từ sảnh tới bãi cát, qua vườn ven bờ." },
      { k: "Vào thành phố", v: "Trung tâm Đà Nẵng và cầu sông Hàn trong khoảng 10 đến 15 phút đi xe." },
      { k: "Sân bay, bệnh viện", v: "Sân bay quốc tế khoảng 15 đến 20 phút; bệnh viện, trường học, siêu thị nằm trong vài km quanh khu." },
    ],
    photo: "bo-bien",
    alt: "Đường bờ biển và dải đô thị cao tầng nhìn từ trên cao lúc bình minh",
    pos: "50% 55%",
  },
  {
    id: "chuong-tien-ich",
    no: "02",
    sheet: "Bản vẽ A-02 · Tiện ích",
    title: "Tiện ích nội khu xếp theo nhịp một ngày.",
    lead: "Bơi sớm, làm việc giữa buổi, tập yoga lúc chiều, rồi lên sân thượng nhìn ánh đèn thành phố. Mặt cắt từng tầng nằm ở phần tiện ích bên dưới.",
    points: [
      { k: "Tầng 5", v: "Hồ bơi tràn bờ nhìn ra biển, dải ghế nằm và vườn nhiệt đới." },
      { k: "Tầng 6", v: "Phòng tập, phòng yoga và khu làm việc chung có cửa kính cao." },
      { k: "Tầng 36", v: "Sân thượng ngắm bình minh và hoàng hôn, mở theo giờ sinh hoạt." },
    ],
    photo: "ho-boi",
    alt: "Hồ bơi tràn bờ lúc chạng vạng, nước phản chiếu bầu trời xanh và hồng",
    pos: "50% 62%",
  },
  {
    id: "can-ho",
    no: "03",
    sheet: "Bản vẽ A-03 · Loại căn",
    title: "Ba loại căn, một cách nhìn ra biển.",
    lead: "Từ căn một phòng ngủ gọn gàng đến căn ba phòng ngủ rộng rãi, phòng khách luôn nằm sát ban công và hướng ra phía biển. Phòng ngủ lùi về sau, yên tĩnh và đón ánh sáng dịu.",
    points: [
      { k: "1PN", v: "Một phòng ngủ, bếp mở, ban công dài cho buổi sáng." },
      { k: "2PN", v: "Hai phòng ngủ, phòng khách rộng, phù hợp gia đình nhỏ." },
      { k: "3PN", v: "Ba phòng ngủ, hai phòng tắm riêng, ban công liền phòng khách." },
    ],
    photo: "ban-cong-bien",
    alt: "Ban công căn hộ nhìn ra mặt biển xanh ngọc từ trên cao",
    pos: "50% 50%",
  },
  {
    id: "hoan-thien",
    no: "04",
    sheet: "Bản vẽ A-04 · Hoàn thiện",
    title: "Vật liệu chọn theo ánh sáng.",
    lead: "Đá, gỗ sồi, đồng thau và kính low-e được chọn để hợp với nắng biển: ấm vào buổi sáng, trầm vào buổi chiều, không chói và không lạnh. Có thể chọn bàn giao cơ bản hoặc nội thất đầy đủ.",
    points: [
      { k: "Cơ bản", v: "Sàn, bếp, thiết bị vệ sinh và hệ cửa kính hoàn thiện." },
      { k: "Đầy đủ", v: "Thêm giường, sofa, tủ áo, đèn và rèm theo bản phối đã chọn." },
      { k: "Mặt tiền", v: "Kính hai lớp, lam chắn nắng đồng đặt đúng hướng." },
    ],
    photo: "phong-khach",
    alt: "Phòng khách cửa kính lớn nhìn ra biển, ghế sofa tối màu",
    pos: "50% 45%",
  },
];

export const FAQ = [
  {
    q: "Dự án có những loại căn nào, diện tích bao nhiêu?",
    a: "Ba loại: 1PN khoảng 48 m², 2PN khoảng 71 m² và 3PN khoảng 101 m² diện tích sử dụng, chưa gồm ban công. Con số chính thức nằm trong bản vẽ và hợp đồng do đội tư vấn cung cấp.",
  },
  {
    q: "Giá trên trang có phải bảng giá chính thức không?",
    a: "Không. Đó là giá tham khảo để bạn hình dung mức đầu tư theo loại căn, tầng, hướng và nội thất. Bảng giá và chính sách hiện hành do đội tư vấn gửi trực tiếp.",
  },
  {
    q: "Tiến độ thanh toán và vay ngân hàng được tính thế nào?",
    a: "Trang đưa hai phương án chia đợt để bạn xem dòng tiền, cùng công thức trả đều hàng tháng với lãi suất do bạn tự nhập. Đây không phải tư vấn tài chính; điều kiện vay thực tế phụ thuộc ngân hàng bạn chọn.",
  },
  {
    q: "Khi nào bàn giao, giấy tờ của dự án gồm những gì?",
    a: "Trang này không đưa ngày bàn giao hay cam kết nào về giấy tờ. Mọi thông tin chính thức về giấy tờ, tiến độ và phí quản lý được đội tư vấn cung cấp bằng văn bản khi bạn liên hệ.",
  },
  {
    q: "Tôi muốn xem nhà mẫu thì đặt lịch thế nào?",
    a: "Chọn buổi sáng, chiều hoặc cuối tuần và loại căn bạn quan tâm ở phần đặt lịch, rồi gửi qua form tư vấn. Đội tư vấn xác nhận giờ và hướng dẫn đường tới nhà mẫu.",
  },
  {
    q: "Căn hộ bàn giao cơ bản và đầy đủ nội thất khác nhau thế nào?",
    a: "Cơ bản gồm sàn, bếp, thiết bị vệ sinh và hệ cửa kính. Đầy đủ thêm giường, sofa, tủ áo, đèn và rèm theo bản phối đã chọn. Giá tham khảo trên trang tính riêng hai mức này.",
  },
  {
    q: "Công cụ trên trang có lưu hay gửi thông tin của tôi đi đâu không?",
    a: "Không. Lựa chọn và số bạn nhập chỉ nằm trong trình duyệt. Chỉ khi bạn bấm sang trang tư vấn và tự điền biểu mẫu thì thông tin mới được gửi.",
  },
  {
    q: "Hướng nhìn và tầng ảnh hưởng thế nào tới giá và tầm nhìn?",
    a: "Tầng cao thấy cả vịnh và đường cong bờ biển, tầng thấp gần vườn ven bờ hơn. Hướng Đông nhìn thẳng ra biển; Đông Nam và Đông Bắc thêm bờ cong hoặc đô thị. La bàn trong phần mặt bằng cho bạn thấy tỉ lệ khung cửa nhìn ra biển.",
  },
] as const;

export const FINISHES = [
  { name: "Đá xám", hatch: "stone" },
  { name: "Gỗ sồi", hatch: "wood" },
  { name: "Đồng thau", hatch: "brass" },
  { name: "Kính low-e", hatch: "glass" },
] as const;

export const SUN_NOTE = "Kéo thanh giờ để xem nắng đi quanh mặt tiền. Phía Đông đón bình minh, phía Tây giữ nắng chiều.";
