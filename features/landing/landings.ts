/**
 * Dữ liệu landing page theo từ khoá.
 * TODO(chủ site): `pricing` và thời gian trong `faqs` là SỐ DỰ KIẾN do trợ lý điền
 * tạm để hoàn thiện cấu trúc; hãy sửa theo giá và tiến độ thực tế trước khi quảng bá.
 */
export type Landing = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  keyword: string;
  deliverables: string[];
  audience: string[];
  steps: Array<{ title: string; text: string }>;
  pricing?: Array<{ name: string; range: string; note: string }>;
  faqs: Array<{ question: string; answer: string }>;
  /** Từ khoá (nguyên từ) để chọn dự án thật liên quan từ category, platform, tiêu đề, mô tả. */
  projectKeywords: string[];
  related: Array<{ href: string; label: string }>;
};

const steps = [
  { title: "Khám phá & tư vấn", text: "Trao đổi mục tiêu kinh doanh, người dùng và phạm vi; chốt ưu tiên trước khi viết dòng code nào." },
  { title: "Thiết kế UI/UX", text: "Wireframe và giao diện được duyệt trước khi phát triển để hạn chế sửa đi sửa lại." },
  { title: "Phát triển & kiểm thử", text: "Làm theo từng giai đoạn nhỏ, bạn xem được bản chạy thật sau mỗi mốc." },
  { title: "Triển khai & đồng hành", text: "Đưa lên production, cài đặt theo dõi và hỗ trợ tối ưu sau ra mắt." },
];

export const landings: Landing[] = [
  {
    path: "/thiet-ke-website-da-nang",
    seoTitle: "Thiết kế website Đà Nẵng chuẩn SEO, chạy nhanh",
    seoDescription:
      "Thiết kế website tại Đà Nẵng: giới thiệu doanh nghiệp, bán hàng, đặt lịch, CRM. Chuẩn SEO, tối ưu tốc độ và di động. Tư vấn miễn phí cùng Trần Công Tiến.",
    eyebrow: "Thiết kế website tại Đà Nẵng",
    h1: "Thiết kế website Đà Nẵng cho doanh nghiệp muốn có khách thật",
    lead: "Website không chỉ để đẹp: cần lên Google, tải nhanh trên điện thoại và có đường dẫn rõ ràng để khách để lại thông tin. Mình làm trọn từ tư vấn, thiết kế đến vận hành.",
    keyword: "thiết kế website Đà Nẵng",
    deliverables: [
      "Website giới thiệu, landing page và website bán hàng",
      "Hệ thống đặt lịch, quản lý khách hàng (CRM) đi kèm",
      "Chuẩn SEO kỹ thuật: metadata, sitemap, dữ liệu có cấu trúc",
      "Tối ưu tốc độ và hiển thị tốt trên điện thoại",
      "Trang quản trị để tự cập nhật nội dung",
    ],
    audience: ["Doanh nghiệp nhỏ và cửa hàng tại Đà Nẵng", "Spa, nhà hàng, homestay, phòng khám", "Startup cần bản đầu tiên để thử thị trường"],
    steps,
    pricing: [
      { name: "Landing page", range: "5 – 12 triệu", note: "Một trang giới thiệu hoặc chiến dịch, chuẩn SEO cơ bản, tối ưu di động." },
      { name: "Website doanh nghiệp", range: "12 – 35 triệu", note: "Nhiều trang, trang quản trị nội dung, blog và dữ liệu SEO có cấu trúc." },
      { name: "Website bán hàng / đặt lịch", range: "30 – 80 triệu", note: "Giỏ hàng hoặc đặt lịch, thanh toán, quản lý khách hàng và báo cáo." },
    ],
    faqs: [
      { question: "Thiết kế website ở Đà Nẵng mất bao lâu?", answer: "Landing page thường mất 1–2 tuần, website doanh nghiệp 3–5 tuần, website bán hàng hoặc đặt lịch 6–10 tuần. Lộ trình cụ thể được chốt sau buổi tư vấn." },
      { question: "Website có lên được Google không?", answer: "Website được dựng chuẩn SEO kỹ thuật từ đầu. Thứ hạng còn phụ thuộc nội dung và cạnh tranh từ khoá, nên mình tư vấn cả hướng nội dung." },
      { question: "Tôi có tự cập nhật nội dung được không?", answer: "Có. Website đi kèm trang quản trị để bạn đăng bài, đổi hình ảnh và quản lý khách đăng ký." },
    ],
    projectKeywords: ["web","website","landing"],
    related: [
      { href: "/du-an", label: "Xem dự án đã làm" },
      { href: "/blog/chi-phi-thiet-ke-website-da-nang", label: "Chi phí thiết kế website Đà Nẵng" },
      { href: "/demos", label: "Website demo theo ngành" },
    ],
  },
  {
    path: "/lap-trinh-app-mobile-flutter",
    seoTitle: "Lập trình app mobile Flutter iOS & Android theo yêu cầu",
    seoDescription:
      "Thiết kế và lập trình ứng dụng di động bằng Flutter cho iOS và Android: một codebase, phát triển nhanh, tích hợp API và thanh toán. Tư vấn cùng Trần Công Tiến.",
    eyebrow: "Phát triển ứng dụng di động",
    h1: "Lập trình app mobile Flutter cho iOS và Android từ một codebase",
    lead: "Từ ý tưởng đến ứng dụng trên App Store và Google Play: thiết kế giao diện, xây backend, kết nối API và thanh toán, rồi đồng hành sau khi phát hành.",
    keyword: "lập trình app mobile Flutter",
    deliverables: [
      "Ứng dụng Flutter chạy cả iOS và Android",
      "Backend và API (Node.js, NestJS, Python)",
      "Đăng nhập, thông báo đẩy, thanh toán, bản đồ",
      "Trang quản trị web đi kèm",
      "Hỗ trợ đưa lên App Store và Google Play",
    ],
    audience: ["Startup cần MVP trên di động", "Doanh nghiệp muốn app đặt lịch, bán hàng, chăm sóc khách", "Đội ngũ cần thêm người làm mobile"],
    steps,
    pricing: [
      { name: "MVP di động", range: "40 – 90 triệu", note: "Các tính năng cốt lõi trên iOS và Android để thử thị trường." },
      { name: "App đầy đủ", range: "90 – 250 triệu", note: "Backend, trang quản trị, thanh toán, thông báo đẩy." },
      { name: "Bảo trì & mở rộng", range: "Từ 3 triệu/tháng", note: "Theo dõi lỗi, cập nhật phiên bản, bổ sung tính năng." },
    ],
    faqs: [
      { question: "Vì sao chọn Flutter?", answer: "Một codebase cho cả iOS và Android giúp rút ngắn thời gian và giảm chi phí bảo trì so với làm hai app riêng." },
      { question: "Bạn có làm cả backend không?", answer: "Có. Mình làm full-stack nên phụ trách cả ứng dụng, API và cơ sở dữ liệu." },
      { question: "Có hỗ trợ sau khi phát hành không?", answer: "Có. Sau ra mắt mình vẫn theo dõi lỗi, cập nhật phiên bản và bổ sung tính năng. MVP thường mất 6–10 tuần, app đầy đủ 3–5 tháng tuỳ phạm vi." },
    ],
    projectKeywords: ["mobile","flutter","app"],
    related: [
      { href: "/du-an?cat=mobile", label: "Dự án ứng dụng di động" },
      { href: "/blog/chon-web-app-mobile-app-hay-landing-page", label: "Chọn web app, mobile app hay landing page" },
      { href: "/blog/mvp-web-app-6-tuan-roadmap-startup", label: "Lộ trình MVP 6 tuần" },
    ],
  },
  {
    path: "/ai-agent-tu-dong-hoa",
    seoTitle: "Xây AI Agent & tự động hoá quy trình cho doanh nghiệp",
    seoDescription:
      "Xây AI Agent và tự động hoá quy trình cho doanh nghiệp nhỏ: chăm sóc khách, xử lý đơn, báo cáo, tích hợp CRM. Tư vấn thực tế cùng Trần Công Tiến.",
    eyebrow: "AI Agent & tự động hoá",
    h1: "Xây AI Agent và tự động hoá quy trình cho doanh nghiệp nhỏ",
    lead: "Chọn đúng việc lặp lại để giao cho AI: trả lời khách, phân loại yêu cầu, tổng hợp báo cáo, đồng bộ dữ liệu giữa các hệ thống. Bắt đầu nhỏ, đo được hiệu quả rồi mới mở rộng.",
    keyword: "AI Agent tự động hoá doanh nghiệp",
    deliverables: [
      "AI Agent trả lời và phân loại khách hàng",
      "Tự động hoá quy trình giữa CRM, form, email, Zalo",
      "Báo cáo và tóm tắt dữ liệu tự động",
      "Tích hợp vào website hoặc phần mềm có sẵn",
      "Kiểm soát chất lượng và giới hạn quyền của AI",
    ],
    audience: ["Doanh nghiệp nhỏ muốn bớt việc thủ công", "Đội sales và chăm sóc khách hàng", "Startup muốn thêm tính năng AI vào sản phẩm"],
    steps,
    pricing: [
      { name: "Bản thử (PoC)", range: "10 – 25 triệu", note: "Một quy trình lặp lại, đo hiệu quả trước khi đầu tư lớn." },
      { name: "AI Agent tích hợp", range: "25 – 80 triệu", note: "Kết nối CRM, website, Zalo/email; phân quyền và giám sát." },
      { name: "Vận hành & tinh chỉnh", range: "Từ 3 triệu/tháng", note: "Theo dõi chất lượng, cập nhật dữ liệu và chi phí mô hình." },
    ],
    faqs: [
      { question: "AI Agent khác chatbot thường ở đâu?", answer: "Agent có thể thực hiện hành động như tra cứu dữ liệu, tạo đơn, cập nhật CRM, không chỉ trả lời câu hỏi." },
      { question: "Dữ liệu của doanh nghiệp có an toàn không?", answer: "Mình thiết kế phân quyền và giới hạn dữ liệu AI được truy cập, và trao đổi rõ phương án trước khi triển khai." },
      { question: "Bắt đầu từ đâu?", answer: "Chọn một quy trình lặp lại rõ ràng và làm bản thử trong khoảng 2–3 tuần, đo hiệu quả rồi mới mở rộng." },
    ],
    projectKeywords: ["ai","agent","chatbot"],
    related: [
      { href: "/blog/ai-agent-cho-doanh-nghiep-nho", label: "AI Agent cho doanh nghiệp nhỏ" },
      { href: "/du-an?cat=ai", label: "Dự án AI Agent" },
      { href: "/solutions", label: "Giải pháp theo ngành" },
    ],
  },
  {
    path: "/thue-lap-trinh-vien-freelance",
    seoTitle: "Thuê lập trình viên freelance full-stack làm website, app",
    seoDescription:
      "Thuê lập trình viên freelance full-stack tại Đà Nẵng: làm website, backend, mobile app, CRM, booking. Làm việc theo dự án, giao tiếp rõ ràng. Trần Công Tiến.",
    eyebrow: "Freelance full-stack",
    h1: "Thuê lập trình viên freelance full-stack theo dự án",
    lead: "Một người phụ trách từ thiết kế, frontend, backend đến triển khai: ít khâu trung gian, trao đổi trực tiếp, tiến độ minh bạch.",
    keyword: "thuê lập trình viên freelance",
    deliverables: [
      "Làm trọn dự án hoặc theo từng giai đoạn",
      "Frontend Next.js, backend Node.js/NestJS, Flutter",
      "Cơ sở dữ liệu PostgreSQL, MySQL, MongoDB",
      "Báo cáo tiến độ và bàn giao tài liệu",
      "Hợp đồng và mốc thanh toán rõ ràng",
    ],
    audience: ["Chủ doanh nghiệp cần một người làm trọn gói", "Startup cần bổ sung nhân lực kỹ thuật", "Agency cần đối tác làm theo yêu cầu"],
    steps,
    pricing: [
      { name: "Theo giờ", range: "Từ 300 nghìn/giờ", note: "Sửa lỗi, tư vấn kỹ thuật, việc nhỏ lẻ." },
      { name: "Theo dự án", range: "Báo giá theo phạm vi", note: "Chốt phạm vi, mốc bàn giao và giá cố định sau tư vấn." },
      { name: "Theo tháng", range: "Từ 20 triệu/tháng", note: "Đồng hành dài hạn như một thành viên kỹ thuật của đội." },
    ],
    faqs: [
      { question: "Làm freelance có đảm bảo tiến độ không?", answer: "Dự án được chia thành các mốc nhỏ có bản chạy thật để bạn kiểm tra, nên tiến độ luôn nhìn thấy được." },
      { question: "Mã nguồn thuộc về ai?", answer: "Điều khoản bản quyền mã nguồn được ghi rõ trong hợp đồng; thông thường thanh toán chia theo mốc và mã nguồn được bàn giao khi hoàn tất." },
      { question: "Có nhận làm từ xa không?", answer: "Có. Mình làm việc tại Đà Nẵng nhưng nhận dự án trên toàn Việt Nam." },
    ],
    projectKeywords: ["web","mobile","ai","crm"],
    related: [
      { href: "/blog/thue-lap-trinh-vien-lam-website-app", label: "Thuê lập trình viên làm website, app" },
      { href: "/ve-toi", label: "Về Trần Công Tiến" },
      { href: "/du-an", label: "Dự án đã làm" },
    ],
  },
];
