export type StyleId = "coastal" | "garden" | "classic" | "minimal";
export type PackageId = "TM-P01" | "TM-P02" | "TM-P03";
export type PaletteId = "signature" | "soft";

export type Img = { file: string; alt: string };

/** 12 ảnh stock Pexels (xem credits.json). Alt mô tả khách quan, không gán là tác phẩm của studio. */
export const IMG: Record<string, Img> = {
  vay: { file: "vay-cua-so", alt: "Váy cưới ren và voan treo trước tấm rèm cửa sáng, không có người" },
  nhan: { file: "nhan-thiep", alt: "Hai chiếc nhẫn vàng đặt trên tấm thiệp giấy kem in hoạ tiết nhành lá" },
  hoang: { file: "hoang-hon-bong-dang", alt: "Bóng dáng hai người đứng gần nhau trên nền trời hoàng hôn màu cam, không thấy mặt" },
  hoa: { file: "hoa-cuoi", alt: "Cận cảnh bó hoa cưới hồng phấn và trắng nhạt với lá xanh" },
  lung: { file: "chi-tiet-vay-lung", alt: "Chi tiết lưng váy cưới ren và hàng khuy nhỏ, chỉ thấy cánh tay và voan" },
  codau: { file: "co-dau-quay-lung", alt: "Cô dâu nhìn từ phía sau, váy trắng dài và bó hoa trên con phố lát gạch" },
  cong: { file: "cong-vom-bien", alt: "Cổng vòm phủ hoa trắng và lá xanh nhìn ra biển dưới trời trong" },
  vuon: { file: "loi-di-vuon", alt: "Lối đi thảm cỏ giữa hai hàng ghế gỗ và hoa trắng, cổng vòm phía xa trong vườn" },
  ban: { file: "ban-tiec", alt: "Bàn tiệc tròn trải khăn trắng, khăn ăn xanh đậm, ly thuỷ tinh và hoa nhỏ, không có khách" },
  thiep: { file: "thiep-guong", alt: "Bộ thiệp giấy mỹ thuật, hai chiếc nhẫn và chiếc gương nhỏ cổ trên lớp voan xám xanh" },
  album: { file: "album-cu", alt: "Cuốn album ảnh cũ mở trên mặt bàn gỗ, tấm rèm vải phía sau" },
};

export type AlbumPage = { id: string; layout: "cover" | "full-photo" | "photo-note" | "closing"; imageIds: string[]; heading?: string; caption: string };
export type Album = { id: string; code: string; style: StyleId; chapter: string; title: string; description: string; pages: AlbumPage[] };

export const ALBUMS: Album[] = [
  {
    id: "coastal", code: "TM-A01", style: "coastal", chapter: "CH. 01 · BIỂN", title: "Một chiều bên biển",
    description: "Gió, nắng muộn và những bước chân song hành.",
    pages: [
      { id: "p1", layout: "cover", imageIds: ["hoang"], heading: "Một chiều bên biển.", caption: "Trang bìa" },
      { id: "p2", layout: "full-photo", imageIds: ["cong"], caption: "Đi cạnh nhau, theo hướng có gió." },
      { id: "p3", layout: "photo-note", imageIds: ["nhan", "hoa"], heading: "Gió kể một câu chuyện.", caption: "Những điều dịu dàng của một buổi chiều." },
      { id: "p4", layout: "closing", imageIds: ["codau"], caption: "Và những ngày sau đó." },
    ],
  },
  {
    id: "garden", code: "TM-A02", style: "garden", chapter: "CH. 02 · VƯỜN", title: "Dưới tán lá xanh",
    description: "Một khoảng xanh dịu dàng, nơi những điều tự nhiên lên tiếng.",
    pages: [
      { id: "p1", layout: "cover", imageIds: ["vuon"], heading: "Dưới tán lá xanh.", caption: "Trang bìa" },
      { id: "p2", layout: "full-photo", imageIds: ["codau"], caption: "Một ngày dành cho những điều tự nhiên." },
      { id: "p3", layout: "photo-note", imageIds: ["hoa", "thiep"], heading: "Hoa nở, ánh sáng đi qua.", caption: "Vài thứ nhỏ đặt cạnh nhau." },
      { id: "p4", layout: "closing", imageIds: ["cong"], caption: "Dịu dàng như một buổi sớm." },
    ],
  },
  {
    id: "classic", code: "TM-A03", style: "classic", chapter: "CH. 03 · CỔ ĐIỂN", title: "Những năm tháng cũ",
    description: "Sắc kem, những món đồ nhỏ và vẻ đẹp không vội vàng.",
    pages: [
      { id: "p1", layout: "cover", imageIds: ["album"], heading: "Những năm tháng cũ.", caption: "Trang bìa" },
      { id: "p2", layout: "full-photo", imageIds: ["ban"], caption: "Những chi tiết không vội vàng." },
      { id: "p3", layout: "photo-note", imageIds: ["nhan", "thiep"], heading: "Một lời hẹn viết trên giấy.", caption: "Có những điều càng lâu càng đẹp." },
      { id: "p4", layout: "closing", imageIds: ["vay"], caption: "Chiếc váy chờ bên cửa sổ." },
    ],
  },
  {
    id: "minimal", code: "TM-A04", style: "minimal", chapter: "CH. 04 · TỐI GIẢN", title: "Chỉ cần là chúng ta",
    description: "Ít chi tiết hơn, nhiều khoảng thở hơn, vừa đủ để nhớ.",
    pages: [
      { id: "p1", layout: "cover", imageIds: ["ban"], heading: "Chỉ cần là chúng ta.", caption: "Trang bìa" },
      { id: "p2", layout: "full-photo", imageIds: ["lung"], caption: "Khoảng lặng cũng có câu chuyện riêng." },
      { id: "p3", layout: "photo-note", imageIds: ["vay", "nhan"], heading: "Vừa đủ ánh sáng.", caption: "Không cần thêm điều gì nữa." },
      { id: "p4", layout: "closing", imageIds: ["hoa"], caption: "Một nhành hoa là đủ." },
    ],
  },
];

export type Pkg = {
  id: PackageId; roman: string; kind: string; name: string; blurb: string; price: number; hours: string; places: string; outfits: string; photographers: string; photos: number; album: string; delivery: string;
  deliveryDays: [number, number]; includes: string[]; excludes: string[];
};
export const PACKAGES: Pkg[] = [
  { id: "TM-P01", roman: "I", kind: "Pre-wedding studio", name: "Studio Ánh Sáng Tự Nhiên", blurb: "Chụp trong studio có cửa sổ lớn, phông giấy và bộ phụ kiện. Hợp cặp đôi muốn gọn một buổi, không phụ thuộc thời tiết.", price: 5900000, hours: "3 giờ chụp", places: "1 phim trường trong studio", outfits: "2 bộ (thuê tại studio)", photographers: "1", photos: 30, album: "Không bao gồm album in", delivery: "14–21 ngày", deliveryDays: [14, 21],
    includes: ["Trang điểm cô dâu 2 kiểu, làm tóc chú rể", "Thuê 2 bộ váy/vest từ kho trang phục của studio", "Chọn ảnh trực tiếp tại studio sau buổi chụp", "30 ảnh chỉnh màu và dặm da, gửi qua đường link tải về", "1 ảnh in 40×60 cm đóng khung"],
    excludes: ["Album in (mua thêm)", "Hoa cầm tay", "Thêm giờ chụp"] },
  { id: "TM-P02", roman: "II", kind: "Pre-wedding ngoại cảnh", name: "Ngoại Cảnh Một Ngày", blurb: "Một buổi sáng sớm và một buổi chiều giờ vàng ở hai địa điểm khác nhau quanh Đà Nẵng: biển, bán đảo, vườn hoặc phố cũ.", price: 11900000, hours: "8 giờ, gồm di chuyển", places: "Tối đa 2 địa điểm ngoại cảnh", outfits: "3 bộ (thuê tại studio)", photographers: "1 chính, 1 phụ", photos: 60, album: "Album 20×20 cm, 20 trang", delivery: "21–30 ngày", deliveryDays: [21, 30],
    includes: ["Tư vấn concept và khảo sát địa điểm qua ảnh trước ngày chụp", "Trang điểm cô dâu 3 kiểu, chỉnh lại giữa buổi", "Thuê 3 bộ váy/vest", "Xe đưa đón trong nội thành Đà Nẵng", "60 ảnh chỉnh sửa + album 20×20 cm 20 trang", "Phương án dự phòng khi mưa"],
    excludes: ["Phí vào cổng địa điểm (nếu có)", "Di chuyển ngoài Đà Nẵng và Hội An", "Hoa cưới"] },
  { id: "TM-P03", roman: "III", kind: "Phóng sự cưới", name: "Phóng Sự Ngày Cưới", blurb: "Hai nhiếp ảnh đi cùng từ lúc chuẩn bị đến hết tiệc: lễ gia tiên, đón dâu, nghi thức, tiệc. Chụp tự nhiên, ít dàn dựng.", price: 15900000, hours: "10 giờ liên tục", places: "Nhà hai họ và nơi tổ chức tiệc trong Đà Nẵng", outfits: "Theo trang phục ngày cưới của hai bạn", photographers: "2", photos: 300, album: "Album 25×25 cm, 30 trang", delivery: "30–45 ngày", deliveryDays: [30, 45],
    includes: ["Trao đổi lịch trình ngày cưới trước 7 ngày", "2 nhiếp ảnh, ít nhất 1 người ở cạnh cô dâu chú rể suốt buổi", "300 ảnh chỉnh sửa, gửi theo từng phần (chuẩn bị, lễ, tiệc)", "Album 25×25 cm 30 trang, duyệt layout trước khi in", "Ảnh gia đình theo danh sách hai bạn đưa"],
    excludes: ["Quay phim", "Trang điểm ngày cưới", "Giờ chụp quá 10 giờ (tính thêm theo giờ)"] },
];
export const EXCLUDED = "Giá tham khảo, chưa gồm VAT nếu cần xuất hoá đơn. Mọi khoản ngoài phần \"Bao gồm\" của gói sẽ được báo trước khi chốt, không tính ngầm.";

export type Mood = {
  id: StyleId; name: string; title: string; description: string; main: string; detail: string;
  signature: string[]; colorNames: string[]; locations: { id: string; label: string; note: string }[];
};
export const MOODS: Mood[] = [
  { id: "coastal", name: "Biển", title: "Biển, một bản phác thảo.", description: "Ánh chiều, gió tự nhiên, linen và những gam xanh xám.", main: "hoang", detail: "cong",
    signature: ["#E9DDC9", "#B4C5C6", "#67838C", "#D6A58B"], colorNames: ["Cát", "Xanh sương", "Xanh biển xám", "Đào nhạt"],
    locations: [{ id: "beach", label: "Bãi biển", note: "Loại hình: bãi cát mở, nhiều gió, giờ vàng cuối chiều." }, { id: "headland", label: "Bán đảo ven biển", note: "Loại hình: đường mòn và vách đá nhìn ra khơi." }] },
  { id: "garden", name: "Vườn", title: "Vườn, một bản phác thảo.", description: "Hoa tự nhiên, thảm cỏ, tán lá và ánh sáng mềm.", main: "vuon", detail: "hoa",
    signature: ["#F2E9D8", "#8B9B76", "#CED0AD", "#C89F98"], colorNames: ["Kem", "Xanh lá cây", "Xanh rêu nhạt", "Hồng khô"],
    locations: [{ id: "garden", label: "Khu vườn", note: "Loại hình: sân vườn có cổng vòm và lối đi cỏ." }, { id: "greenery", label: "Không gian nhiều cây xanh", note: "Loại hình: công viên hoặc nhà vườn bóng mát." }] },
  { id: "classic", name: "Cổ điển", title: "Cổ điển, một bản phác thảo.", description: "Giấy, gỗ, ngọc trai và những gam màu trầm.", main: "album", detail: "thiep",
    signature: ["#E9DCC6", "#765448", "#B39A68", "#C6B1A1"], colorNames: ["Giấy kem", "Nâu gỗ", "Vàng đồng", "Be hồng"],
    locations: [{ id: "villa", label: "Biệt thự cổ", note: "Loại hình: nhà xưa, cửa gỗ, nền gạch hoa." }, { id: "oldstreet", label: "Phố mang nét hoài cổ", note: "Loại hình: phố cũ, tường vàng, hàng hiên." }] },
  { id: "minimal", name: "Tối giản", title: "Tối giản, một bản phác thảo.", description: "Khoảng trống, hình khối và chi tiết tiết chế.", main: "ban", detail: "vay",
    signature: ["#F5F3ED", "#CCC6BA", "#96928A", "#302B27"], colorNames: ["Trắng ngà", "Xám cát", "Xám khói", "Mực than"],
    locations: [{ id: "studio", label: "Studio ánh sáng tự nhiên", note: "Loại hình: không gian trong nhà có cửa sổ lớn." }, { id: "architecture", label: "Kiến trúc tối giản", note: "Loại hình: tường trắng, hành lang, bóng đổ." }] },
];

export const PROCESS = [
  { n: "01", title: "Tư vấn", when: "Trong ngày làm việc", text: "Hai bạn nhắn qua form hoặc gọi, cho biết ngày cưới, phong cách thích và ngân sách. Studio gợi ý gói và địa điểm phù hợp." },
  { n: "02", title: "Chọn concept, giữ lịch", when: "Trước ngày chụp 2–4 tuần", text: "Chốt phong cách, bảng màu, trang phục. Đặt cọc 30% giá gói để giữ ngày chụp." },
  { n: "03", title: "Ngày chụp", when: "3–10 giờ tuỳ gói", text: "Trang điểm, thay trang phục, chụp theo kịch bản đã thống nhất. Ngoại cảnh chụp sáng sớm và giờ vàng cuối chiều." },
  { n: "04", title: "Chọn ảnh", when: "Trong 7 ngày sau chụp", text: "Hai bạn xem ảnh gốc qua đường link và chọn đúng số ảnh của gói để chỉnh sửa." },
  { n: "05", title: "Hậu kỳ", when: "7–21 ngày", text: "Chỉnh màu, dặm da, cân bằng ánh sáng. Gửi bản xem trước 3 ảnh để hai bạn góp ý tông màu trước khi chỉnh hàng loạt." },
  { n: "06", title: "Duyệt album", when: "3–5 ngày", text: "Studio dàn trang album và gửi bản PDF. Hai bạn sửa tối đa 2 lần trước khi in." },
  { n: "07", title: "In và giao", when: "7–14 ngày", text: "In album, đóng khung ảnh, giao tại studio hoặc gửi trong Đà Nẵng. File ảnh chỉnh sửa gửi qua link tải về." },
];

export const FAQ = [
  { q: "Giá gói đã gồm váy cưới và trang điểm chưa?", a: "Hai gói pre-wedding đã gồm thuê trang phục từ kho studio và trang điểm cô dâu theo số kiểu ghi trong gói. Gói phóng sự ngày cưới không gồm trang điểm vì hai bạn thường có đội trang điểm riêng." },
  { q: "Nên đặt lịch trước ngày chụp bao lâu?", a: "Pre-wedding nên đặt trước 3–4 tuần, mùa cưới (tháng 9–12) nên trước 6–8 tuần. Phóng sự ngày cưới nên giữ lịch càng sớm càng tốt vì mỗi ngày studio chỉ nhận một đám." },
  { q: "Đặt cọc bao nhiêu và có hoàn lại không?", a: "Cọc 30% giá gói để giữ lịch. Nếu huỷ trước ngày chụp ít nhất 14 ngày, khoản cọc được bảo lưu để dùng cho một ngày chụp khác trong 6 tháng. Huỷ muộn hơn, cọc không được hoàn." },
  { q: "Dời lịch chụp được không?", a: "Được một lần miễn phí nếu báo trước ít nhất 3 ngày, tuỳ lịch còn trống. Từ lần dời thứ hai tính phí 500.000 đ." },
  { q: "Ngày chụp ngoại cảnh gặp mưa thì sao?", a: "Studio theo dõi dự báo từ 2 ngày trước và quyết định cùng hai bạn trước giờ chụp ít nhất 6 giờ: dời sang ngày kế gần nhất không mất phí, hoặc chuyển sang chụp trong studio và địa điểm có mái che." },
  { q: "Bao lâu thì nhận ảnh và album?", a: "Ảnh chỉnh sửa nhận sau 14–45 ngày tuỳ gói. Album in cần thêm khoảng 10–19 ngày cho duyệt layout, in và đóng bìa. Công cụ Lịch giao ảnh trên trang giúp ước tính theo ngày chụp." },
  { q: "Hai bạn có được tự chọn ảnh không?", a: "Có. Sau buổi chụp hai bạn nhận link ảnh gốc, chọn đúng số ảnh của gói. Muốn thêm ảnh chỉnh sửa tính 120.000 đ mỗi ảnh." },
  { q: "Có nhận file ảnh gốc chưa chỉnh không?", a: "Có, như một dịch vụ mua thêm (xem bảng Album, ảnh in và file). Studio vẫn giữ quyền chọn ảnh để chỉnh sửa theo phong cách chung của bộ ảnh." },
  { q: "Chụp ngoài Đà Nẵng có được không?", a: "Hội An và các điểm trong bán kính khoảng 40 km nhận được, phụ phí di chuyển báo trước. Xa hơn cần trao đổi riêng." },
  { q: "Studio có đăng ảnh của hai bạn lên mạng không?", a: "Chỉ khi hai bạn đồng ý bằng văn bản trong phiếu thoả thuận. Không đồng ý thì ảnh chỉ nằm trong bộ giao cho hai bạn." },
  { q: "Cả gia đình có chụp thêm được không?", a: "Ngày cưới, ảnh gia đình theo danh sách hai bạn đưa đã nằm trong gói phóng sự. Với pre-wedding, thêm người chụp cùng tính theo thoả thuận." },
  { q: "Làm sao để trao đổi về buổi chụp?", a: "Bấm Đặt lịch tư vấn để mở form liên hệ của website. Công cụ Moodboard và Lịch giao ảnh trên trang chỉ chạy trên trình duyệt, không gửi dữ liệu đi." },
];

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n).replace(/\s/g, " ");
