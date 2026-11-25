/** Toàn bộ nội dung chữ của trang Tầng Xanh. Chuỗi ở dạng NFC. */

export const IMG = "/images/demos/lan-bien";

export const NAV = [
  { href: "#chuong", label: "Khám phá đại dương" },
  { href: "#khoa-hoc", label: "Khoá học" },
  { href: "#hanh-trinh", label: "Hành trình" },
  { href: "#an-toan", label: "An toàn" },
] as const;

export type Chapter = {
  id: string;
  n: string;
  depth: number;
  label: string;
  title: string;
  lead: string;
  eco: string;
  exp: string;
  cta: string;
  href: string;
  img: string;
  alt: string;
  /** tỉ lệ khung hình trên desktop, w/h */
  pos?: string;
};

/** Độ sâu là ngôn ngữ kể chuyện của trang, không phải lời khuyên độ sâu cho từng người. */
export const CHAPTERS: Chapter[] = [
  {
    id: "anh-sang", n: "01", depth: 3, label: "Ánh sáng",
    title: "Nơi ánh sáng bắt đầu hành trình.",
    lead: "Ngay dưới mặt biển, nắng vỡ thành những dải chuyển động không ngừng. Nước trong, màu xanh đổi theo từng nhịp sóng và thế giới bên dưới bắt đầu hiện ra.",
    eco: "Vùng nước nông, ánh sáng và mặt biển.",
    exp: "Làm quen thiết bị nổi, snorkeling và kỹ năng cơ bản dưới nước.",
    cta: "Xem khoá snorkeling", href: "#khoa-hoc",
    img: "nang-xuyen-nuoc", alt: "Ánh nắng gợn sóng trên nền cát nông dưới mặt nước trong xanh", pos: "50% 50%",
  },
  {
    id: "vuon-nho", n: "02", depth: 8, label: "Những khu vườn nhỏ",
    title: "Một thế giới nhỏ đang chuyển động.",
    lead: "Những tảng san hô thấp, đàn cá nhỏ và vô số chuyển động tinh tế khiến vùng nước nông sống động hơn bạn tưởng. Càng quan sát kỹ, bạn càng thấy đại dương không bao giờ đứng yên.",
    eco: "Rạn nông và sinh vật nhỏ, tuỳ khu vực.",
    exp: "Snorkeling, nhận biết sinh vật biển và quan sát mà không chạm vào môi trường.",
    cta: "Đi tìm những chuyển động nhỏ", href: "#khoa-hoc",
    img: "ran-nong", alt: "Rạn san hô nông nhìn từ dưới nước, nắng xuyên mặt nước", pos: "50% 60%",
  },
  {
    id: "vuon-san-ho", n: "03", depth: 14, label: "Vườn san hô",
    title: "Những khu vườn không cần ai chăm sóc.",
    lead: "San hô dựng nên những cấu trúc kỳ lạ dưới nước. Giữa các nhánh san hô là cá nhỏ, sinh vật ẩn mình và vô số màu sắc chỉ hiện ra khi bạn quan sát thật chậm.",
    eco: "Rạn san hô và các sinh vật cùng sống.",
    exp: "Tìm hiểu lặn có bình khí theo điều kiện và cấp độ phù hợp. Đừng chạm, đừng mang gì rời khỏi biển.",
    cta: "Khám phá vườn san hô", href: "#khoa-hoc",
    img: "ran-san-ho", alt: "Cá vẹt bơi trên rạn san hô nhiều màu", pos: "50% 50%",
  },
  {
    id: "xanh-tham", n: "04", depth: 22, label: "Xanh thẫm",
    title: "Khi màu xanh trở nên sâu hơn.",
    lead: "Ánh sáng dần đổi. Những dải màu rực rỡ nhường chỗ cho xanh thẫm, và mỗi chuyển động đều đáng chú ý hơn. Đây là lúc kiến thức, kiểm soát độ nổi và sự phối hợp với hướng dẫn viên trở nên đặc biệt quan trọng.",
    eco: "Địa hình và công trình chìm dưới nước ở vùng sâu hơn, tuỳ địa điểm.",
    exp: "Học và thực hành ở cấp độ phù hợp với đào tạo, điều kiện biển và giới hạn cá nhân.",
    cta: "Tìm hiểu các cấp độ lặn", href: "#khoa-hoc",
    img: "tau-dam", alt: "Xác tàu chìm phủ rêu trong làn nước xanh thẫm", pos: "50% 50%",
  },
  {
    id: "tinh-lang", n: "05", depth: 30, label: "Tĩnh lặng",
    title: "Càng sâu, càng cần hiểu biết.",
    lead: "Ở vùng nước sâu hơn, ánh sáng, nhiệt độ, áp suất và thời gian đều là những điều phải cân nhắc. Đây không phải cuộc đua xuống sâu. Một hành trình đáng nhớ không đo bằng độ sâu, mà bằng cách ta khám phá và trở về có trách nhiệm.",
    eco: "Vách rạn và địa hình đáy biển ở vùng nước sâu, tuỳ khu vực.",
    exp: "Kiến thức nâng cao, chỉ dành cho người đáp ứng điều kiện đào tạo và kế hoạch lặn tương ứng.",
    cta: "Quay lại chọn hành trình", href: "#cong-cu",
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
  note: string;
  cta: string;
  img: string;
  alt: string;
  pos?: string;
};

export const COURSES: Course[] = [
  {
    id: "snorkeling", n: "01", name: "Snorkeling", short: "Chạm ngõ đại dương", tag: "Người mới",
    summary: "Làm quen với kính, ống thở, chân vịt và cách quan sát thế giới dưới mặt nước. Phù hợp với người muốn bắt đầu từ hoạt động gần mặt biển.",
    items: ["Làm quen thiết bị", "Kỹ thuật thở và nổi", "Quy tắc quan sát, không chạm sinh vật"],
    note: "Luôn đi cùng hướng dẫn viên, mặc áo phao theo hướng dẫn.",
    cta: "Tìm hiểu snorkeling", img: "chan-nhai", alt: "Chân nhái, kính và ống thở xanh ngọc đặt trên cát trắng", pos: "50% 45%",
  },
  {
    id: "discover", n: "02", name: "Discover Scuba", short: "Lần đầu thử lặn", tag: "Chưa có chứng chỉ",
    summary: "Trải nghiệm làm quen với thiết bị lặn có bình khí dưới sự giám sát của hướng dẫn viên, sau khi được trao đổi và đánh giá điều kiện tham gia.",
    items: ["Giới thiệu thiết bị", "Hướng dẫn cơ bản trên bờ", "Thực hành theo chương trình phù hợp"],
    note: "Cần khai báo sức khoẻ trung thực trước khi tham gia.",
    cta: "Tìm hiểu trải nghiệm", img: "nguoi-lan", alt: "Bóng người lặn thả mình giữa nước xanh gần rạn", pos: "50% 40%",
  },
  {
    id: "owd", n: "03", name: "Open Water Diver", short: "Nền tảng lặn biển", tag: "Khoá nhập môn",
    summary: "Chương trình học lý thuyết, kỹ năng và thực hành để xây nền tảng lặn biển. OWD là một cấp độ phổ biến trong đào tạo lặn.",
    items: ["Lý thuyết và kỹ năng", "Thực hành ở vùng nước nông", "Các buổi lặn có hướng dẫn"],
    note: "Nội dung và giới hạn thực hành theo chương trình đào tạo tương ứng.",
    cta: "Tìm hiểu khoá OWD", img: "dan-ca", alt: "Đàn cá xanh bơi gần rạn san hô", pos: "50% 55%",
  },
  {
    id: "aowd", n: "04", name: "Advanced Open Water", short: "Mở rộng trải nghiệm", tag: "Cần có nền tảng",
    summary: "Dành cho người đã có nền tảng lặn phù hợp, muốn phát triển thêm kỹ năng và kiến thức qua các nội dung thực hành được chọn. AOWD là một cấp độ phổ biến.",
    items: ["Rà lại kinh nghiệm và nhật ký lặn", "Chọn nội dung thực hành", "Đánh giá điều kiện trước từng buổi"],
    note: "AOWD không phải điều kiện tự động cho mọi buổi lặn sâu.",
    cta: "Tìm hiểu khoá AOWD", img: "binh-khi", alt: "Van bình khí lặn bên mặt biển xanh ngọc lấp lánh", pos: "50% 50%",
  },
  {
    id: "freediving", n: "05", name: "Freediving", short: "Lắng nghe hơi thở", tag: "Theo đánh giá",
    summary: "Làm quen với lặn tự do qua kiến thức, kỹ thuật và thực hành có giám sát. Bộ môn này cần đào tạo riêng và tuân thủ nghiêm ngặt quy trình an toàn.",
    items: ["Kiến thức thở và thư giãn", "Kỹ thuật cơ bản", "Thực hành có người giám sát"],
    note: "Không tự luyện nín thở và không lặn một mình.",
    cta: "Tìm hiểu freediving", img: "rua-bien", alt: "Rùa biển bơi trong làn nước xanh trên nền cát", pos: "50% 45%",
  },
];

export const JOURNEY = [
  { n: "01", title: "Lắng nghe nhu cầu", body: "Trao đổi về kinh nghiệm, mục tiêu và điều kiện tham gia của bạn." },
  { n: "02", title: "Kiểm tra sự phù hợp", body: "Xem lại sức khoẻ, thiết bị, chương trình và điều kiện biển trong ngày." },
  { n: "03", title: "Chuẩn bị và hướng dẫn", body: "Làm quen thiết bị, nghe phổ biến quy trình và tín hiệu trước khi xuống nước." },
  { n: "04", title: "Trải nghiệm và tổng kết", body: "Thực hiện hoạt động phù hợp, rồi cùng nhìn lại hành trình sau khi lên bờ." },
] as const;

export const SCHEDULE_STATES = [
  "Lịch tuỳ điều kiện biển",
  "Cần xác nhận trước khi tham gia",
  "Chương trình theo nhóm nhỏ",
  "Liên hệ để chọn lịch phù hợp",
] as const;

export const SAFETY = [
  { n: "01", title: "Sức khoẻ trước tiên", body: "Hãy khai báo trung thực và trao đổi với bác sĩ khi bạn có bệnh nền hoặc đang dùng thuốc. Một số tình trạng sức khoẻ không phù hợp để lặn." },
  { n: "02", title: "Luôn có hướng dẫn viên", body: "Mọi buổi lặn và snorkeling đều có người hướng dẫn, theo nhóm nhỏ và thống nhất tín hiệu trước khi xuống nước." },
  { n: "03", title: "Điều kiện biển quyết định", body: "Sóng, gió, tầm nhìn và dòng chảy có thể đổi trong ngày. Lịch có thể dời hoặc huỷ vì lý do biển mà không cần tranh luận." },
  { n: "04", title: "Biết giới hạn của mình", body: "Không có tầng nước nào đáng để vượt quá khả năng. Bạn có thể dừng hoặc lên bờ bất cứ lúc nào." },
] as const;

export const FAQ = [
  {
    q: "Tôi chưa biết lặn, có thể bắt đầu từ đâu?",
    a: "Bạn có thể bắt đầu từ snorkeling gần mặt nước hoặc một buổi làm quen có bình khí cùng hướng dẫn viên. Hãy dùng công cụ tìm cấp độ bên dưới để có gợi ý, rồi trao đổi thêm với chúng tôi trước khi chọn.",
  },
  {
    q: "Tôi có cần biết bơi không?",
    a: "Với hầu hết hoạt động, khả năng bơi và thoải mái trong nước là điều kiện cần. Mức yêu cầu cụ thể tuỳ chương trình; chúng tôi sẽ trao đổi rõ khi bạn liên hệ.",
  },
  {
    q: "Cần chuẩn bị gì về sức khoẻ?",
    a: "Bạn sẽ được hỏi một bảng khai báo sức khoẻ trước khi tham gia. Nếu có bệnh về tim, phổi, tai, xoang, hen suyễn, động kinh, đang mang thai hoặc dùng thuốc thường xuyên, hãy hỏi bác sĩ trước. Quyết định tham gia luôn cần sự đồng ý của người hướng dẫn.",
  },
  {
    q: "Lịch lặn có cố định không?",
    a: "Không. Lịch phụ thuộc thời tiết và điều kiện biển nên có thể thay đổi. Chúng tôi xác nhận lại với bạn trước ngày đi.",
  },
  {
    q: "Tôi đã có chứng chỉ, có được lặn sâu hơn ngay không?",
    a: "Chứng chỉ chỉ là một phần. Chúng tôi còn xem kinh nghiệm gần đây, thiết bị, điều kiện biển và kế hoạch lặn. Hãy mang theo nhật ký lặn nếu có để trao đổi cụ thể.",
  },
] as const;

export const FOOTER_LINKS = [
  { href: "#chuong", label: "Khám phá đại dương" },
  { href: "#khoa-hoc", label: "Khoá học" },
  { href: "#hanh-trinh", label: "Hành trình" },
  { href: "#cong-cu", label: "Tìm cấp độ" },
  { href: "#an-toan", label: "An toàn" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;
