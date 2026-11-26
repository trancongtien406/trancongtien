/** Toàn bộ nội dung chữ của trang Tầng Xanh. Chuỗi ở dạng NFC. Giá là giá tham khảo (VND). */

export const IMG = "/images/demos/lan-bien";

export const NAV = [
  { href: "#chuong", label: "Tour lặn" },
  { href: "#khoa-hoc", label: "Khoá học" },
  { href: "#lich-khoi-hanh", label: "Lịch & giá" },
  { href: "#mua-bien", label: "Mùa biển" },
  { href: "#an-toan", label: "An toàn" },
  { href: "#dat-cho", label: "Đặt chỗ" },
] as const;

export const HERO_FACTS = [
  { k: "Lặn thử từ", v: "1.450.000 ₫", note: "một buổi, đã gồm thiết bị" },
  { k: "Tập trung", v: "06:30", note: "tour ngày, tại bến Sơn Trà" },
  { k: "Nhóm nhỏ", v: "tối đa 4 khách", note: "mỗi hướng dẫn viên khi lặn thử" },
] as const;

export const ABOUT = {
  lead: "Tầng Xanh là trung tâm lặn biển và thể thao nước đặt ở Quận Sơn Trà, Đà Nẵng. Chúng tôi dạy lặn từ buổi đầu tiên, tổ chức tour lặn ngắm san hô theo khu vực và cho thuê trang thiết bị cho người đã có chứng chỉ.",
  items: [
    { t: "Học từ con số 0", d: "Lặn thử cho người chưa từng lặn, rồi lên Open Water và Advanced theo chương trình đào tạo quốc tế." },
    { t: "Ra biển theo khu vực", d: "Bán đảo Sơn Trà ngay trong ngày, Cù Lao Chàm (Hội An) theo tour ngày. Điểm lặn cụ thể chọn theo sóng, gió, tầm nhìn." },
    { t: "Trang thiết bị tại chỗ", d: "Nạp khí, kiểm bình và rửa thiết bị ngay tại cơ sở. Có bán đồ thuê theo ngày cho người đã lặn." },
  ],
} as const;

export type Chapter = {
  id: string;
  n: string;
  depth: number;
  label: string;
  title: string;
  lead: string;
  where: string;
  time: string;
  who: string;
  price: string;
  cta: string;
  href: string;
  img: string;
  alt: string;
  pos?: string;
};

/** Mốc độ sâu là cách xếp tour theo cấp, không phải lời khuyên độ sâu cho từng người. */
export const CHAPTERS: Chapter[] = [
  {
    id: "anh-sang", n: "01", depth: 3, label: "Snorkeling",
    title: "Snorkeling ngắm san hô nông.",
    lead: "Nửa ngày trên mặt nước với áo phao, kính và ống thở. Hướng dẫn viên dẫn nhóm dọc rạn nông, chỉ sinh vật biển và nhắc quy tắc không chạm san hô.",
    where: "Bán đảo Sơn Trà, vùng nước nông ven bờ", time: "Nửa ngày, 3 giờ trên biển", who: "Người biết bơi, từ 8 tuổi, không cần chứng chỉ", price: "450.000 ₫ / người",
    cta: "Xem lịch snorkeling", href: "#lich-khoi-hanh",
    img: "nang-xuyen-nuoc", alt: "Ánh nắng gợn sóng trên nền cát nông dưới mặt nước trong xanh", pos: "50% 50%",
  },
  {
    id: "vuon-nho", n: "02", depth: 8, label: "Lặn thử",
    title: "Lặn thử có bình khí lần đầu.",
    lead: "Buổi làm quen dành cho người chưa có chứng chỉ: học cách thở, cân bằng tai và tín hiệu trên bờ, rồi xuống vùng nước nông cùng hướng dẫn viên, mỗi người một kèm.",
    where: "Sơn Trà, điểm nước nông chọn theo ngày", time: "Một buổi, khoảng 4 giờ cả chuẩn bị", who: "Từ 10 tuổi, khai báo sức khoẻ trước khi tham gia", price: "1.450.000 ₫ / người",
    cta: "Hỏi lịch lặn thử", href: "#lich-khoi-hanh",
    img: "ran-nong", alt: "Rạn san hô nông nhìn từ dưới nước, nắng xuyên mặt nước", pos: "50% 60%",
  },
  {
    id: "vuon-san-ho", n: "03", depth: 14, label: "Tour san hô",
    title: "Tour lặn ngắm san hô Cù Lao Chàm.",
    lead: "Chuyến ngày cho người đã có chứng chỉ Open Water: xe đưa từ Đà Nẵng ra bến, cano ra đảo, hai lần lặn có hướng dẫn quanh các rạn san hô và nghỉ trưa trên đảo.",
    where: "Cù Lao Chàm (Hội An), điểm lặn theo biển", time: "Cả ngày, 06:30 đến khoảng 16:30", who: "Có chứng chỉ Open Water, mang theo thẻ và nhật ký lặn", price: "2.300.000 ₫ / người, 2 lần lặn",
    cta: "Xem lịch tour đảo", href: "#lich-khoi-hanh",
    img: "ran-san-ho", alt: "Cá vẹt bơi trên rạn san hô nhiều màu", pos: "50% 50%",
  },
  {
    id: "xanh-tham", n: "04", depth: 22, label: "Lặn nâng cao",
    title: "Lặn nâng cao: sâu hơn, nhiều kỹ năng hơn.",
    lead: "Khoá Advanced Open Water gồm năm lần lặn có chủ đề: lặn sâu, định hướng, kiểm soát độ nổi và các nội dung chọn thêm như lặn đêm hay địa hình chìm, tuỳ điểm lặn.",
    where: "Sơn Trà và Cù Lao Chàm, tuỳ nội dung chọn", time: "2 ngày, 5 lần lặn", who: "Đã có Open Water, lặn gần đây, giữ được độ nổi ổn định", price: "6.500.000 ₫ / khoá",
    cta: "Xem khoá nâng cao", href: "#khoa-hoc",
    img: "tau-dam", alt: "Xác tàu chìm phủ rêu trong làn nước xanh thẫm", pos: "50% 50%",
  },
  {
    id: "tinh-lang", n: "05", depth: 30, label: "Lặn sâu",
    title: "Lặn sâu chỉ khi đủ điều kiện.",
    lead: "Những buổi lặn gần giới hạn độ sâu giải trí chỉ mở cho học viên đã qua đánh giá, trên chuyến riêng, có hướng dẫn viên và kế hoạch lặn viết trước. Không nhận khách tự chọn độ sâu.",
    where: "Vùng nước sâu hơn ngoài Cù Lao Chàm, tuỳ điều kiện", time: "Chuyến riêng, báo trước", who: "Học viên Advanced, qua đánh giá của huấn luyện viên", price: "Báo giá theo chuyến",
    cta: "Hỏi chuyến riêng", href: "#dat-cho",
    img: "vuc-sau", alt: "Bóng người lặn nhỏ bé trước vách rạn trong vùng nước xanh sâu", pos: "50% 55%",
  },
];

export type Course = {
  id: string;
  n: string;
  name: string;
  short: string;
  tag: string;
  summary: string;
  items: string[];
  facts: { k: string; v: string }[];
  note: string;
  cta: string;
  img: string;
  alt: string;
  pos?: string;
};

export const COURSES: Course[] = [
  {
    id: "snorkeling", n: "01", name: "Snorkeling", short: "Nửa ngày trên mặt nước", tag: "Người mới",
    summary: "Làm quen với kính, ống thở, chân vịt và cách quan sát thế giới dưới mặt nước. Phù hợp với người muốn bắt đầu từ hoạt động gần mặt biển.",
    items: ["Làm quen thiết bị", "Kỹ thuật thở và nổi", "Quy tắc quan sát, không chạm sinh vật"],
    facts: [{ k: "Thời lượng", v: "3 giờ trên biển" }, { k: "Giá từ", v: "450.000 ₫" }, { k: "Điều kiện", v: "Biết bơi, từ 8 tuổi" }],
    note: "Luôn đi cùng hướng dẫn viên, mặc áo phao theo hướng dẫn.",
    cta: "Hỏi lịch snorkeling", img: "chan-nhai", alt: "Chân nhái, kính và ống thở xanh ngọc đặt trên cát trắng", pos: "50% 45%",
  },
  {
    id: "discover", n: "02", name: "Lặn thử (Discover Scuba)", short: "Lần đầu thử lặn", tag: "Chưa có chứng chỉ",
    summary: "Trải nghiệm làm quen với thiết bị lặn có bình khí dưới sự giám sát của hướng dẫn viên, sau khi được trao đổi và đánh giá điều kiện tham gia.",
    items: ["Giới thiệu thiết bị", "Hướng dẫn cơ bản trên bờ", "Một lần lặn nước nông cùng hướng dẫn viên"],
    facts: [{ k: "Thời lượng", v: "Một buổi, khoảng 4 giờ" }, { k: "Giá từ", v: "1.450.000 ₫" }, { k: "Điều kiện", v: "Từ 10 tuổi, khai báo sức khoẻ" }],
    note: "Buổi lặn thử không cấp chứng chỉ. Có thể tính vào khoá Open Water nếu bạn học tiếp, theo chính sách của tổ chức đào tạo.",
    cta: "Hỏi lịch lặn thử", img: "nguoi-lan", alt: "Bóng người lặn thả mình giữa nước xanh gần rạn", pos: "50% 40%",
  },
  {
    id: "owd", n: "03", name: "Open Water Diver", short: "Nền tảng lặn biển", tag: "Khoá nhập môn",
    summary: "Chương trình học lý thuyết, kỹ năng và thực hành để xây nền tảng lặn biển. Open Water là cấp độ phổ biến đầu tiên trong đào tạo lặn.",
    items: ["Lý thuyết học trước qua tài liệu, ôn trên lớp", "Kỹ năng ở vùng nước nông có kiểm soát", "Bốn lần lặn có hướng dẫn ngoài biển"],
    facts: [{ k: "Thời lượng", v: "4 ngày, gồm 4 lần lặn biển" }, { k: "Giá từ", v: "8.500.000 ₫" }, { k: "Điều kiện", v: "Từ 10 tuổi, biết bơi, khai báo sức khoẻ" }],
    note: "Giá gồm tài liệu, thiết bị và hướng dẫn. Phí cấp thẻ chứng chỉ theo quy định của tổ chức đào tạo, báo khi đăng ký.",
    cta: "Hỏi lịch khoá Open Water", img: "dan-ca", alt: "Đàn cá xanh bơi gần rạn san hô", pos: "50% 55%",
  },
  {
    id: "aowd", n: "04", name: "Advanced Open Water", short: "Mở rộng trải nghiệm", tag: "Cần có nền tảng",
    summary: "Dành cho người đã có nền tảng lặn phù hợp, muốn phát triển thêm kỹ năng và kiến thức qua các nội dung thực hành được chọn.",
    items: ["Rà lại kinh nghiệm và nhật ký lặn", "Chọn nội dung thực hành", "Đánh giá điều kiện trước từng buổi"],
    facts: [{ k: "Thời lượng", v: "2 ngày, 5 lần lặn" }, { k: "Giá từ", v: "6.500.000 ₫" }, { k: "Điều kiện", v: "Đã có Open Water, từ 12 tuổi" }],
    note: "Advanced không phải điều kiện tự động cho mọi buổi lặn sâu. Kế hoạch lặn do huấn luyện viên quyết định theo điều kiện ngày đó.",
    cta: "Hỏi lịch khoá Advanced", img: "binh-khi", alt: "Van bình khí lặn bên mặt biển xanh ngọc lấp lánh", pos: "50% 50%",
  },
  {
    id: "freediving", n: "05", name: "Freediving nhập môn", short: "Lắng nghe hơi thở", tag: "Theo đánh giá",
    summary: "Làm quen với lặn tự do qua kiến thức, kỹ thuật và thực hành có giám sát. Bộ môn này cần đào tạo riêng và tuân thủ nghiêm ngặt quy trình an toàn.",
    items: ["Kiến thức thở và thư giãn", "Kỹ thuật cơ bản", "Thực hành có người giám sát"],
    facts: [{ k: "Thời lượng", v: "2 ngày, học nhóm nhỏ" }, { k: "Giá từ", v: "4.800.000 ₫" }, { k: "Điều kiện", v: "Biết bơi, từ 12 tuổi, khai báo sức khoẻ" }],
    note: "Không tự luyện nín thở và không lặn một mình.",
    cta: "Hỏi lịch freediving", img: "rua-bien", alt: "Rùa biển bơi trong làn nước xanh trên nền cát", pos: "50% 45%",
  },
];

export type DayPlan = { day: string; short: string; rows: { time: string; name: string; place: string; note: string }[] };

/** Lịch khởi hành tuần: mô tả lịch thường lệ, xác nhận lại theo điều kiện biển. */
export const SCHEDULE: DayPlan[] = [
  { day: "Thứ Hai", short: "T2", rows: [
    { time: "06:30", name: "Snorkeling Sơn Trà", place: "Bến Sơn Trà", note: "Nửa ngày" },
    { time: "13:30", name: "Lặn thử có bình khí", place: "Bến Sơn Trà", note: "Một buổi" },
  ] },
  { day: "Thứ Ba", short: "T3", rows: [
    { time: "08:00", name: "Open Water: lý thuyết và kỹ năng", place: "Cơ sở Sơn Trà", note: "Ngày 1 của khoá" },
    { time: "13:30", name: "Lặn thử có bình khí", place: "Bến Sơn Trà", note: "Một buổi" },
  ] },
  { day: "Thứ Tư", short: "T4", rows: [
    { time: "06:30", name: "Tour lặn san hô Cù Lao Chàm", place: "Xe đón tại cơ sở", note: "Cả ngày, cần chứng chỉ" },
    { time: "08:00", name: "Open Water: kỹ năng nước nông", place: "Cơ sở Sơn Trà", note: "Ngày 2 của khoá" },
  ] },
  { day: "Thứ Năm", short: "T5", rows: [
    { time: "06:30", name: "Snorkeling Sơn Trà", place: "Bến Sơn Trà", note: "Nửa ngày" },
    { time: "08:00", name: "Open Water: hai lần lặn biển đầu", place: "Bến Sơn Trà", note: "Ngày 3 của khoá" },
  ] },
  { day: "Thứ Sáu", short: "T6", rows: [
    { time: "06:30", name: "Tour lặn san hô Cù Lao Chàm", place: "Xe đón tại cơ sở", note: "Cả ngày, cần chứng chỉ" },
    { time: "08:00", name: "Open Water: hai lần lặn biển cuối", place: "Bến Sơn Trà", note: "Ngày 4 của khoá" },
  ] },
  { day: "Thứ Bảy", short: "T7", rows: [
    { time: "06:30", name: "Tour snorkeling Cù Lao Chàm", place: "Xe đón tại cơ sở", note: "Cả ngày, không cần chứng chỉ" },
    { time: "07:00", name: "Advanced Open Water, ngày 1", place: "Bến Sơn Trà", note: "Theo đợt, báo trước" },
  ] },
  { day: "Chủ Nhật", short: "CN", rows: [
    { time: "06:30", name: "Tour lặn san hô Cù Lao Chàm", place: "Xe đón tại cơ sở", note: "Cả ngày, cần chứng chỉ" },
    { time: "07:00", name: "Advanced Open Water, ngày 2", place: "Bến Sơn Trà", note: "Theo đợt, báo trước" },
  ] },
];

export const SCHEDULE_NOTE = "Lịch thường lệ trong mùa biển êm. Giờ tập trung và điểm lặn được xác nhận lại với từng khách trước ngày đi, vì biển có thể đổi lịch.";

export const PACKAGES = [
  { name: "Snorkeling Sơn Trà", price: "450.000 ₫", unit: "người", incl: ["Áo phao, kính, ống thở, chân vịt", "Hướng dẫn viên và thuyền ra rạn", "Nước uống, khăn"], excl: ["Ảnh, video dưới nước", "Đưa đón ngoài khu vực Sơn Trà"] },
  { name: "Lặn thử có bình khí", price: "1.450.000 ₫", unit: "người", incl: ["Toàn bộ thiết bị lặn", "Một hướng dẫn viên kèm tối đa 4 khách", "Phổ biến an toàn trên bờ, nước uống"], excl: ["Chứng chỉ (buổi thử không cấp thẻ)", "Ảnh, video dưới nước"] },
  { name: "Tour lặn Cù Lao Chàm", price: "2.300.000 ₫", unit: "người, 2 lần lặn", incl: ["Xe đưa đón từ cơ sở, cano ra đảo", "Hai lần lặn có hướng dẫn, bình khí và chì", "Bữa trưa trên đảo, nước uống"], excl: ["Vé tham quan và phí khu bảo tồn", "Thuê đồ lặn cá nhân nếu bạn cần (xem bảng thuê)"] },
  { name: "Khoá Open Water", price: "8.500.000 ₫", unit: "khoá, 4 ngày", incl: ["Tài liệu học và hướng dẫn kèm", "Thiết bị, bình khí, xe và thuyền ra biển", "Bốn lần lặn biển có huấn luyện viên"], excl: ["Phí cấp thẻ của tổ chức đào tạo", "Ăn uống ngoài bữa nhẹ", "Chỗ ở nếu bạn ở xa"] },
] as const;

export const GEAR = [
  { item: "Kính, ống thở, chân vịt", price: "60.000 ₫ / ngày", note: "Bộ riêng cho từng người, rửa sạch sau mỗi lượt" },
  { item: "Áo lặn 3 mm", price: "100.000 ₫ / ngày", note: "Nhiều cỡ, thử trước khi nhận" },
  { item: "Bộ BCD và bộ điều áp", price: "350.000 ₫ / ngày", note: "Kiểm tra theo lịch bảo dưỡng của cơ sở" },
  { item: "Máy tính lặn", price: "150.000 ₫ / ngày", note: "Hướng dẫn cài đặt trước khi xuống nước" },
  { item: "Bình khí và nạp khí", price: "180.000 ₫ / bình", note: "Chỉ cho người đã có chứng chỉ" },
  { item: "Đèn lặn", price: "100.000 ₫ / ngày", note: "Cho lặn đêm hoặc hang, vách tối" },
] as const;

export const GEAR_NOTE = "Giá tham khảo, xác nhận khi đặt. Thiết bị cho thuê chỉ giao cho người đã có chứng chỉ phù hợp hoặc khách đi cùng hướng dẫn viên.";

/** Mức 1 (khó) đến 4 (thuận lợi), mô tả chung nhiều năm, không phải dự báo. */
export const MONTHS = [
  { m: "T1", calm: 1, vis: 2, note: "Gió mùa đông bắc, sóng thường lớn, tour đảo hay phải dời." },
  { m: "T2", calm: 2, vis: 2, note: "Sóng giảm dần. Còn nhiều ngày biển động." },
  { m: "T3", calm: 3, vis: 3, note: "Biển bắt đầu êm, nước trong dần. Thời điểm mở mùa lặn." },
  { m: "T4", calm: 4, vis: 4, note: "Thường êm và trong. Ngày nắng đẹp nhiều." },
  { m: "T5", calm: 4, vis: 4, note: "Nắng nhiều, biển êm. Nước ấm, đông khách." },
  { m: "T6", calm: 4, vis: 4, note: "Biển êm. Trời nóng, nên lặn buổi sáng." },
  { m: "T7", calm: 4, vis: 3, note: "Êm, đôi lúc nước kém trong sau nhiều ngày nắng." },
  { m: "T8", calm: 3, vis: 3, note: "Còn thuận lợi, bắt đầu có ngày mưa dông." },
  { m: "T9", calm: 2, vis: 2, note: "Mưa nhiều hơn, bão có thể ảnh hưởng. Lịch hay đổi." },
  { m: "T10", calm: 1, vis: 1, note: "Mưa bão, sóng cao, tầm nhìn kém. Hầu hết tour đảo tạm nghỉ." },
  { m: "T11", calm: 1, vis: 1, note: "Gió mùa và sóng lớn. Chủ yếu dạy kỹ năng ở nước nông, hồ." },
  { m: "T12", calm: 1, vis: 2, note: "Lạnh, sóng lớn. Chỉ lặn khi có ngày biển lặng." },
] as const;

export const SEASON_NOTE = "Đây là mô tả chung cho khu vực, không phải dự báo. Biển thay đổi theo ngày và từng điểm lặn; huấn luyện viên quyết định lặn hay dời lịch vào sáng hôm đó.";

export const JOURNEY = [
  { n: "06:30", title: "Tập trung và khai báo", body: "Gặp hướng dẫn viên tại cơ sở hoặc bến, điền phiếu khai báo sức khoẻ, nhận đồ theo cỡ." },
  { n: "07:15", title: "Phổ biến trên bờ", body: "Nghe kế hoạch lặn, tín hiệu tay, cách cân bằng tai và điều kiện biển trong ngày." },
  { n: "08:00", title: "Ra điểm lặn", body: "Lên thuyền hoặc cano, kiểm tra thiết bị theo cặp, xuống nước theo nhóm." },
  { n: "12:00", title: "Lên bờ, nghỉ và ghi nhật ký", body: "Rửa thiết bị, ăn nhẹ, ghi nhật ký lặn cùng hướng dẫn viên trước khi về." },
] as const;

export const CREW = [
  { role: "Huấn luyện viên lặn", d: "Dạy khoá từ lặn thử đến Advanced, quyết định buổi lặn có đi hay dời.", icon: "mask" },
  { role: "Hướng dẫn viên dẫn nhóm", d: "Dẫn nhóm dưới nước, giữ khoảng cách và theo dõi từng khách.", icon: "flag" },
  { role: "Thuyền trưởng và phụ tàu", d: "Đọc sóng, gió, chọn điểm neo và đưa đón khách an toàn.", icon: "wheel" },
  { role: "Kỹ thuật viên thiết bị", d: "Nạp khí, kiểm bình, bảo dưỡng bộ điều áp và áo BCD.", icon: "gauge" },
  { role: "Điều phối đặt chỗ", d: "Nhận đặt chỗ, xếp nhóm theo cấp độ và báo lại khi lịch đổi.", icon: "cal" },
] as const;

export const SAFETY = [
  { n: "01", title: "Sức khoẻ trước tiên", body: "Hãy khai báo trung thực và trao đổi với bác sĩ khi bạn có bệnh nền hoặc đang dùng thuốc. Một số tình trạng sức khoẻ không phù hợp để lặn." },
  { n: "02", title: "Luôn có hướng dẫn viên", body: "Mọi buổi lặn và snorkeling đều có người hướng dẫn, theo nhóm nhỏ và thống nhất tín hiệu trước khi xuống nước." },
  { n: "03", title: "Điều kiện biển quyết định", body: "Sóng, gió, tầm nhìn và dòng chảy có thể đổi trong ngày. Lịch có thể dời hoặc huỷ vì lý do biển, và chúng tôi hướng dẫn cách đổi lịch." },
  { n: "04", title: "Biết giới hạn của mình", body: "Không có tầng nước nào đáng để vượt quá khả năng. Bạn có thể dừng hoặc lên bờ bất cứ lúc nào." },
] as const;

export const HEALTH = [
  "Bệnh tim, huyết áp cao chưa kiểm soát",
  "Hen suyễn hoặc bệnh phổi, từng bị xẹp phổi",
  "Viêm tai giữa, viêm xoang, khó cân bằng tai",
  "Động kinh, ngất hoặc chóng mặt tái diễn",
  "Đang mang thai",
  "Đang dùng thuốc an thần hoặc có dùng rượu bia trong 12 giờ trước",
] as const;

export const FAQ = [
  {
    q: "Tôi chưa biết lặn, có thể bắt đầu từ đâu?",
    a: "Bạn có thể bắt đầu từ snorkeling gần mặt nước hoặc một buổi lặn thử có bình khí cùng hướng dẫn viên. Hãy dùng công cụ chọn khoá bên dưới để có gợi ý, rồi trao đổi thêm với chúng tôi trước khi chọn.",
  },
  {
    q: "Tôi có cần biết bơi không?",
    a: "Với hầu hết hoạt động, khả năng bơi và thoải mái trong nước là điều kiện cần. Khoá Open Water có bài kiểm tra bơi và nổi ở nước nông. Mức yêu cầu cụ thể chúng tôi sẽ nói rõ khi bạn liên hệ.",
  },
  {
    q: "Cần chuẩn bị gì về sức khoẻ?",
    a: "Bạn sẽ được hỏi một bảng khai báo sức khoẻ trước khi tham gia. Nếu có bệnh về tim, phổi, tai, xoang, hen suyễn, động kinh, đang mang thai hoặc dùng thuốc thường xuyên, hãy hỏi bác sĩ trước. Quyết định tham gia luôn cần sự đồng ý của huấn luyện viên.",
  },
  {
    q: "Tôi nên đến vào tháng nào?",
    a: "Mùa biển êm thường từ khoảng tháng 3 đến tháng 8. Từ tháng 10 đến tháng 12 sóng gió nhiều nên tour đảo hay dời. Đây là mô tả chung, lịch cụ thể xác nhận trước ngày đi.",
  },
  {
    q: "Nếu biển động thì sao?",
    a: "Nếu huấn luyện viên và thuyền trưởng nhận định biển không phù hợp, buổi lặn được dời sang ngày khác hoặc đổi sang nội dung trên bờ và hồ bơi. Cách đổi lịch và hoàn tiền cọc chúng tôi ghi rõ khi xác nhận đặt chỗ.",
  },
  {
    q: "Giá đã gồm những gì?",
    a: "Mỗi gói ghi rõ phần bao gồm và không bao gồm trong mục Lịch và giá. Thông thường thiết bị, hướng dẫn viên và nước uống đã gồm; ảnh, video, vé tham quan và phí chứng chỉ tính riêng.",
  },
  {
    q: "Tôi đã có chứng chỉ, có được lặn sâu hơn ngay không?",
    a: "Chứng chỉ chỉ là một phần. Chúng tôi còn xem kinh nghiệm gần đây, thiết bị, điều kiện biển và kế hoạch lặn. Hãy mang theo nhật ký lặn nếu có để trao đổi cụ thể.",
  },
  {
    q: "Trẻ em và người lớn tuổi tham gia được không?",
    a: "Trẻ từ 8 tuổi có thể snorkeling, từ 10 tuổi có thể lặn thử, có giới hạn độ sâu và cần người giám hộ ký xác nhận. Người lớn tuổi cần khai báo sức khoẻ và có thể được đề nghị hỏi bác sĩ trước.",
  },
] as const;

export const BOOKING_STEPS = [
  { n: "1", t: "Gửi yêu cầu", d: "Chọn chương trình, ngày mong muốn và số người qua form tư vấn." },
  { n: "2", t: "Nhận xác nhận", d: "Điều phối viên trả lời về chỗ, giờ tập trung và bảng khai báo sức khoẻ." },
  { n: "3", t: "Giữ chỗ", d: "Đặt cọc theo chương trình. Đổi hoặc dời lịch miễn phí nếu biển không phù hợp." },
] as const;

export const FOOTER_LINKS = [
  { href: "#chuong", label: "Tour lặn" },
  { href: "#khoa-hoc", label: "Khoá học" },
  { href: "#lich-khoi-hanh", label: "Lịch và giá" },
  { href: "#mua-bien", label: "Mùa biển" },
  { href: "#cong-cu", label: "Chọn khoá phù hợp" },
  { href: "#an-toan", label: "An toàn" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
  { href: "#dat-cho", label: "Đặt chỗ" },
] as const;
