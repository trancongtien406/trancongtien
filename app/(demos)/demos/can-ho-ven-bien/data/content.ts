export const SLUG = "can-ho-ven-bien";
export const IMG = "/images/demos/can-ho-ven-bien";
export const BRAND = "Vọng Triều";

export const NAV = [
  { href: "#vi-tri", label: "Vị trí" },
  { href: "#mat-tien", label: "Mặt tiền" },
  { href: "#mat-bang", label: "Mặt bằng" },
  { href: "#du-toan", label: "Thanh toán" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const HERO_STATS = [
  { value: 36, suffix: "", label: "tầng thiết kế" },
  { value: 3, suffix: "", label: "loại căn, 1 đến 3 phòng ngủ" },
  { value: 3, suffix: "", label: "hướng nhìn ra biển và đô thị" },
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
    sheet: "Bản vẽ A-01 · Vị trí",
    title: "Mặt tiền hướng biển, lưng tựa đô thị.",
    lead: "Toà tháp đứng ở dải ven biển Đà Nẵng, nơi buổi sáng đến từ phía mặt nước và buổi tối trở về phía thành phố. Bạn ở giữa hai nhịp đó: một bên là bãi cát dài, một bên là những con phố quen.",
    points: [
      { k: "Phía Đông", v: "Mặt biển mở rộng, nắng sớm đi thẳng vào phòng khách." },
      { k: "Phía Tây", v: "Dải đô thị và những ngọn núi xa, đẹp nhất lúc chiều muộn." },
      { k: "Dưới chân tháp", v: "Lối xuống bờ biển và vườn ven bờ, đi bộ được trong tích tắc." },
    ],
    photo: "bo-bien",
    alt: "Đường bờ biển và dải đô thị cao tầng nhìn từ trên cao lúc bình minh",
    pos: "50% 55%",
  },
  {
    id: "tien-ich",
    no: "02",
    sheet: "Bản vẽ A-02 · Tiện ích",
    title: "Những tầng dành cho thở chậm.",
    lead: "Tiện ích được xếp theo nhịp của một ngày: bơi sớm, làm việc giữa buổi, đọc sách lúc chiều, rồi ra sân thượng nhìn ánh đèn thành phố. Mỗi không gian đều có tầm nhìn riêng.",
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
    sheet: "Bản vẽ A-03 · Căn hộ",
    title: "Ba loại căn, một cách nhìn ra biển.",
    lead: "Từ căn một phòng ngủ gọn gàng đến căn ba phòng ngủ rộng rãi, phòng khách luôn nằm sát ban công và hướng ra phía biển. Phòng ngủ nằm lùi về sau, yên tĩnh và đón ánh sáng dịu.",
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
    q: "Diện tích trong công cụ được tính thế nào?",
    a: "Là diện tích sử dụng ước tính trong lòng căn hộ, cộng các phòng bên trong. Ban công được tách riêng và không nằm trong tổng. Con số chính thức sẽ nằm trong bản vẽ và hợp đồng do đội tư vấn cung cấp.",
  },
  {
    q: "Giá hiển thị có phải bảng giá chính thức không?",
    a: "Không. Đó là giá tham khảo để bạn hình dung mức đầu tư theo loại căn, tầng, hướng và nội thất. Bảng giá chính thức và chính sách hiện hành được đội tư vấn gửi trực tiếp khi bạn liên hệ.",
  },
  {
    q: "Công cụ có lưu hay gửi thông tin của tôi đi đâu không?",
    a: "Không. Mọi lựa chọn và số bạn nhập chỉ nằm trong trình duyệt của bạn. Chỉ khi bạn bấm sang trang tư vấn và tự điền biểu mẫu thì thông tin mới được gửi.",
  },
  {
    q: "Khoản vay tham khảo được tính ra sao?",
    a: "Theo công thức trả đều hàng tháng (annuity) với lãi suất cố định do chính bạn nhập. Công thức hiển thị ngay dưới kết quả. Điều kiện vay thực tế phụ thuộc ngân hàng bạn chọn.",
  },
] as const;

export const FINISHES = [
  { name: "Đá xám", hatch: "stone" },
  { name: "Gỗ sồi", hatch: "wood" },
  { name: "Đồng thau", hatch: "brass" },
  { name: "Kính low-e", hatch: "glass" },
] as const;

export const SUN_NOTE = "Kéo thanh giờ để xem nắng đi quanh mặt tiền. Phía Đông đón bình minh, phía Tây giữ nắng chiều.";
