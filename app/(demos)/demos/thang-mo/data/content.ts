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

export type Pkg = { id: PackageId; roman: string; name: string; blurb: string; price: number; hours: string; places: string; outfits: string; photographers: string; photos: number; album: string; delivery: string };
export const PACKAGES: Pkg[] = [
  { id: "TM-P01", roman: "I", name: "Một Ngày Nhỏ", blurb: "Một buổi chụp, một câu chuyện giản dị.", price: 5900000, hours: "4 giờ", places: "1 bối cảnh", outfits: "1 bộ", photographers: "1", photos: 25, album: "Không bao gồm album in", delivery: "14–21 ngày" },
  { id: "TM-P02", roman: "II", name: "Tháng Dịu Dàng", blurb: "Thêm thời gian cho những khung hình khác nhau.", price: 9900000, hours: "8 giờ", places: "Tối đa 2 bối cảnh", outfits: "Tối đa 2 bộ", photographers: "1", photos: 50, album: "Album 20×20 cm, 20 trang", delivery: "21–30 ngày" },
  { id: "TM-P03", roman: "III", name: "Một Đời Thương", blurb: "Một hành trình dài hơn, một cuốn album đầy hơn.", price: 15900000, hours: "12 giờ, chia 2 ngày", places: "Tối đa 3 bối cảnh", outfits: "Tối đa 3 bộ", photographers: "2", photos: 80, album: "Album 25×25 cm, 30 trang", delivery: "30–45 ngày" },
];
export const EXCLUDED = "Chưa bao gồm: trang điểm, thuê trang phục, hoa cưới, phí vào địa điểm, di chuyển ngoài khu vực dự kiến và các yêu cầu phát sinh.";

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
  { n: "01", title: "Hẹn một cuộc trò chuyện", text: "Hai bạn chia sẻ phong cách yêu thích, thời điểm dự kiến và những điều muốn có trong bộ ảnh. Từ đó, bối cảnh và gói chụp được phác thảo." },
  { n: "02", title: "Ngày của hai bạn", text: "Trang phục, lịch trình, thời tiết và các chi tiết cần chuẩn bị được thống nhất trước buổi chụp. Thời lượng phụ thuộc vào gói đã chọn." },
  { n: "03", title: "Chọn những điều muốn nhớ", text: "Hai bạn xem bộ ảnh dự kiến và chọn những khung hình muốn đưa vào danh sách chỉnh sửa hoặc album in." },
  { n: "04", title: "Một cuốn album để dành", text: "Ảnh được hoàn thiện theo cấu hình đã thống nhất. Nếu có album in, bố cục được duyệt trước khi sản xuất rồi mới giao." },
];

export const FAQ = [
  { q: "Các gói chụp trên website đã bao gồm váy cưới và trang điểm chưa?", a: "Chưa. Ba gói chỉ gồm các hạng mục trong bảng. Trang phục, trang điểm, hoa cưới và phụ kiện cần dự trù riêng." },
  { q: "Nên chuẩn bị trước buổi chụp bao lâu?", a: "Với một khung giờ ngoài trời, hai bạn nên bắt đầu hình dung phong cách và bối cảnh từ 4 đến 8 tuần trước. Đây là gợi ý để lập kế hoạch; thời gian thực tế tuỳ từng bối cảnh." },
  { q: "Nếu ngày chụp gặp trời mưa thì sao?", a: "Một kế hoạch tốt luôn có phương án dự phòng: đổi giờ, đổi bối cảnh trong nhà hoặc dời sang ngày kế. Phương án cụ thể sẽ được trao đổi trước buổi chụp." },
  { q: "Có thể kết hợp nhiều phong cách trong cùng một bộ ảnh không?", a: "Có thể. Gói nhiều bối cảnh hơn sẽ có nhiều chỗ để kết hợp, ví dụ một buổi chiều ven biển và một góc cổ điển trong nhà." },
  { q: "Hai bạn có được tự chọn ảnh để chỉnh sửa không?", a: "Trong quy trình, hai bạn xem bộ ảnh dự kiến rồi chọn số khung hình tương ứng với gói (25, 50 hoặc 80 ảnh)." },
  { q: "Bao lâu thì nhận được ảnh và album?", a: "Thời gian giao trong bảng gói là dự kiến: từ 14 đến 45 ngày tuỳ gói. Album in thường cần thêm thời gian duyệt bố cục." },
  { q: "Chi phí di chuyển và phí địa điểm được tính thế nào?", a: "Các khoản này nằm ngoài giá gói tham khảo và không được cộng tự động trong công cụ Moodboard." },
  { q: "Làm sao để trao đổi về buổi chụp?", a: "Bấm nút tư vấn để mở form liên hệ của website và chia sẻ nhu cầu của hai bạn. Công cụ moodboard trên trang không gửi dữ liệu đi." },
];

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n).replace(/\s/g, " ");
