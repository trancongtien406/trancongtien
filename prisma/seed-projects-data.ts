type CaseStudyHtml = (input: {
  problem: string;
  solution: string;
  result: string;
}) => string;

type SeedProjectItem = {
  slug: string;
  title: string;
  description: string;
  /** Đoạn tổng quan dài — hiện ở cột trái. */
  overview: string;
  problem: string;
  solutionText: string;
  features: string[];
  stack: string[];
  challenges: string[];
  /** Kết quả vận hành / business. */
  results: string[];
  /** Nội dung case study HTML phong phú (ưu tiên hơn template ngắn). */
  contentHtml: string;
  concept?: boolean;
  clientName?: string;
  timeframe?: string;
  platform?: string;
  role?: string;
};

const projectCoverAlts: Record<string, string> = {
  "smart-booking":
    "Giao diện Smart Booking đặt lịch spa/clinic đa nhân sự trên laptop với lịch ca trực quan",
  "lieu-trinh-wallet":
    "Giao diện Ví liệu trình quản lý gói buổi spa và thẻ check-in QR trên tablet và điện thoại",
  "lead-pipeline-bds":
    "Giao diện Pipeline lead môi giới BĐS với bảng Kanban chăm sóc khách hàng và nhắc SLA",
  "du-an-landing-utm":
    "Landing page mở bán dự án bất động sản kèm phễu đo lường nguồn UTM và cộng tác viên",
  "nhat-ky-cong-trinh":
    "Ứng dụng di động Nhật ký công trình ghi tiến độ và album ảnh hiện trường theo hạng mục",
  "phieu-vat-tu":
    "Giao diện quản lý phiếu xuất nhập vật tư công trình và cảnh báo vượt định mức trên tablet",
  "lich-kham-emr-nhe":
    "Hệ thống lịch khám theo bác sĩ và hồ sơ bệnh án tái khám EMR tối giản cho phòng khám tư",
  "hang-doi-goi-so":
    "Màn hình TV gọi số hàng đợi và kiosk lấy số thứ tự cho phòng khám hiện đại",
  "qr-order-kds":
    "Hệ thống QR order tại bàn trên điện thoại kết nối màn hình KDS bếp theo station",
  "fnb-ca-doanh-thu":
    "Dashboard đóng ca thu ngân và đối chiếu doanh thu tiền mặt, chuyển khoản đa chi nhánh F&B",
  "crm-tuyen-sinh":
    "Hệ thống CRM tuyển sinh trung tâm đào tạo với phễu học viên và lịch tư vấn",
  "lop-bai-tap-lite":
    "Giao diện LMS nhẹ quản lý lớp học, nộp bài tập và theo dõi điểm số học viên",
  "fashion-move":
    "Nền tảng thương mại điện tử thời trang Fashion Move hiển thị trên desktop và mobile",
  "don-da-kenh":
    "Console gom đơn đa kênh tập trung đồng bộ trạng thái vận chuyển cho shop bán lẻ",
  "dieu-phoi-chuyen":
    "Hệ thống điều phối chuyến vận tải theo tuyến bản đồ kết hợp ứng dụng tài xế di động",
  "tracking-b2b":
    "Portal tra cứu hành trình đơn hàng B2B kèm ảnh chứng từ giao hàng POD trực tuyến",
  "booking-truc-tiep":
    "Booking engine đặt phòng trực tiếp cho khách sạn boutique với bộ chọn ngày và thư viện phòng",
  "buong-phong-checklist":
    "Ứng dụng Housekeeping trên tablet cập nhật trạng thái dọn phòng khách sạn theo thời gian thực",
  "gym-checkin-goi":
    "Hệ thống check-in QR và quản lý gói hội viên phòng gym tại quầy lễ tân",
  "pt-session-wallet":
    "Ứng dụng lịch tập PT cá nhân và ví buổi tập theo dõi tiến độ trên tablet và điện thoại",
  "sales-crm":
    "Dashboard Sales CRM theo dõi pipeline cơ hội, doanh thu và hiệu suất đội ngũ kinh doanh",
  "portal-khach-agency":
    "Portal khách hàng agency quản lý tiến độ milestone, tài liệu bàn giao và ticket hỗ trợ",
  "ai-search":
    "Hệ thống AI Search tra cứu tài liệu nội bộ doanh nghiệp tích hợp trích dẫn nguồn chính xác",
  "phe-duyet-chi-phi":
    "Ứng dụng luồng phê duyệt đề xuất chi phí và chứng từ nội bộ đa cấp cho doanh nghiệp SME",
  "photo-booth":
    "Ứng dụng di động Photo Booth sự kiện với khung ảnh strip, bộ lọc và in Bluetooth tại chỗ",
};

const tones = [
  "bg-violet-50",
  "bg-orange-50",
  "bg-slate-900",
  "bg-rose-50",
  "bg-cyan-50",
  "bg-emerald-50",
];

function list(items: string[]) {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

function projectArticle(opts: {
  why: string;
  pain: string[];
  approach: string;
  mvp: string[];
  architecture: string;
  screens: string[];
  challenges: string[];
  outcomes: string[];
  buildNote: string;
}) {
  return [
    `<h2>Bối cảnh</h2><p>${opts.why}</p>`,
    `<h2>Đau điểm</h2>${list(opts.pain)}`,
    `<h2>Hướng giải pháp</h2><p>${opts.approach}</p>`,
    `<h2>Phạm vi phiên bản đầu</h2>${list(opts.mvp)}`,
    `<h2>Kiến trúc</h2><p>${opts.architecture}</p>`,
    `<h2>Luồng & màn hình chính</h2>${list(opts.screens)}`,
    `<h2>Thách thức kỹ thuật</h2>${list(opts.challenges)}`,
    `<h2>Kết quả</h2>${list(opts.outcomes)}`,
    `<h2>Phạm vi & lưu ý</h2><p>${opts.buildNote}</p>`,
  ].join("");
}

function shippedArticle(opts: {
  context: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string[];
  results: string[];
}) {
  return [
    `<h2>Bối cảnh</h2><p>${opts.context}</p>`,
    `<h2>Bài toán</h2><p>${opts.problem}</p>`,
    `<h2>Giải pháp</h2><p>${opts.solution}</p>`,
    `<h2>Kiến trúc</h2><p>${opts.architecture}</p>`,
    `<h2>Thách thức</h2>${list(opts.challenges)}`,
    `<h2>Kết quả</h2>${list(opts.results)}`,
  ].join("");
}

/**
 * Mỗi ngành 2 dự án (ưu tiên một nền tảng: Web hoặc App).
 */
const projectsBySolution: Array<{
  solutionSlug: string;
  category: string;
  items: SeedProjectItem[];
}> = [
  {
    solutionSlug: "spa",
    category: "Spa & Wellness",
    items: [
      {
        slug: "smart-booking",
        title: "Smart Booking — đặt lịch spa/clinic",
        description:
          "Web đặt lịch multi-staff, nhắc lịch và dashboard doanh thu theo ca cho dịch vụ có nhiều kỹ thuật viên.",
        overview:
          "Hệ thống đặt lịch cho mô hình spa/clinic: nhiều nhân sự, nhiều dịch vụ, khung giờ chồng chéo. Trọng tâm là calendar thật (không phải form “chọn ngày” đơn giản) và reminder để giảm no-show.",
        problem:
          "Lễ tân xếp lịch trên Excel/Zalo; dễ double-book; chủ không thấy occupancy theo kỹ thuật viên.",
        solutionText:
          "Calendar theo nhân sự + dịch vụ, khóa slot, reminder, báo cáo theo ca.",
        features: [
          "Calendar multi-staff theo dịch vụ",
          "Khóa slot realtime khi giữ chỗ",
          "Reminder SMS/email trước lịch",
          "Dashboard occupancy & doanh thu ca",
        ],
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
        challenges: [
          "Tránh race condition khi hai người giữ cùng slot",
          "Mô hình thời lượng dịch vụ khác nhau trên cùng timeline",
          "Reminder đáng tin nhưng không spam",
        ],
        results: [
          "Một nguồn sự thật cho lịch chi nhánh",
          "Giảm double-book trong giờ cao điểm",
          "Chủ xem được doanh thu theo dịch vụ/nhân sự",
        ],
        contentHtml: shippedArticle({
          context:
            "Dịch vụ chăm sóc sắc đẹp/phòng khám nhỏ thường sống nhờ lịch hẹn. Khi đội ngũ tăng lên 5–15 kỹ thuật viên, Excel và group Zalo trở thành điểm nghẽn: trùng lịch, quên nhắc, và không có báo cáo ca.",
          problem:
            "Cần lịch multi-staff có khóa slot, gắn dịch vụ/thời lượng, và vòng lặp reminder trước giờ hẹn — đủ dùng production, không phình thành PMS doanh nghiệp.",
          solution:
            "Xây booking flow công khai + admin calendar. Mỗi booking bind staff + service duration. Redis/lock ngắn hạn khi giữ chỗ. Job reminder theo cửa sổ thời gian cấu hình được.",
          architecture:
            "Next.js app router, PostgreSQL cho booking/staff/service, Redis cho hold slot, hàng đợi nhẹ cho email/SMS. Phân quyền lễ tân vs chủ.",
          challenges: [
            "Đồng bộ hold/confirm/cancel không để orphan booking",
            "Timezone và giờ làm việc theo chi nhánh",
            "UX calendar trên desktop lễ tân vẫn phải nhanh bằng Excel",
          ],
          results: [
            "Lịch vận hành trên một hệ thống",
            "Giảm thao tác hỏi “ai trống lúc 14h”",
            "Có số liệu ca để tối ưu nhân sự",
          ],
        }),
        concept: false,
        timeframe: "11/2023 – 02/2024",
        platform: "Web",
        role: "Full Stack Developer",
      },
      {
        slug: "lieu-trinh-wallet",
        title: "Ví liệu trình — gói buổi & gia hạn",
        description:
          "khách giữ “ví buổi” liệu trình, check-in trừ buổi, CSKH gọi đúng người sắp hết hạn — thay sổ tay/thẻ giấy.",
        overview:
          "Sau khi có lịch hẹn, spa bán gói 5/10/20 buổi. Đây mới là nơi tiền nằm và cũng là nơi thất thoát: sổ tay, thẻ giấy, tin nhắn “còn bao nhiêu buổi vậy chị?”. Sản phẩm này tách phần membership/wallet khỏi calendar thuần — đủ nhỏ để ship, đủ đau để khách trả tiền.",
        problem:
          "Số buổi còn lại không tin cậy; CSKH không biết ai sắp hết hạn; khách mất niềm tin khi bị trừ nhầm.",
        solutionText:
          "Ví buổi theo khách + trừ khi check-in + hàng đợi gia hạn cho CSKH + portal khách xem số dư.",
        features: [
          "Ví buổi theo gói / liệu trình",
          "Check-in trừ buổi có dấu vết",
          "Danh sách sắp hết hạn + soft reminder",
          "Link khách tự xem số buổi còn lại",
          "Điều chỉnh tay có audit (lễ tân không “sửa im lặng”)",
        ],
        stack: ["Next.js", "PostgreSQL", "Resend", "PayOS"],
        challenges: [
          "Trừ buổi idempotent khi check-in/retry mạng",
          "Gói chuyển nhượng / tặng buổi giữa thành viên (nếu cho phép)",
          "Phân biệt “hết hạn theo ngày” vs “hết buổi”",
        ],
        results: [
          "CSKH có list gia hạn mỗi sáng thay vì lục sổ",
          "Khách tự kiểm tra số dư → bớt tin nhắn hỏi",
          "Mọi điều chỉnh buổi đều có người chịu trách nhiệm",
        ],
        contentHtml: projectArticle({
          why: "Spa đã có booking vẫn chảy tiền ở lớp membership. Ví liệu trình là sản phẩm “nhỏ nhưng dính tiền”: mỗi lần check-in là một giao dịch. Build đúng sẽ thành module bán được cho chuỗi spa/clinic nhỏ — và gắn tự nhiên với Smart Booking.",
          pain: [
            "Thẻ giấy / Excel: mất thẻ = mất số buổi; tranh cãi với khách",
            "CSKH không có danh sách “còn 1–2 buổi” để gọi gia hạn đúng lúc",
            "Trừ buổi bằng miệng → không audit, nhân viên mới không dám xử lý",
            "Khách muốn tự xem số dư nhưng không có chỗ nào ngoài hỏi lễ tân",
          ],
          approach:
            "Mô hình ledger: mỗi gói là account có số dư buổi; check-in tạo transaction trừ 1 (hoặc N theo dịch vụ). Không lưu “còn X” như field duy nhất — số dư = tổng ledger. Portal khách chỉ đọc. Admin có màn hình “sắp hết hạn” (theo buổi hoặc theo ngày hết gói) để CSKH gọi.",
          mvp: [
            "CRUD khách + gói (số buổi, ngày hết hạn tuỳ chọn)",
            "Check-in: chọn khách → xác nhận trừ buổi → biên lai ngắn",
            "Lịch sử giao dịch buổi (lọc theo khách)",
            "Queue “sắp hết hạn” + gửi email/Zalo OA (phase 1: email/link)",
            "Link magic cho khách xem số dư (không bắt buộc app)",
          ],
          architecture:
            "Monolith Next.js + PostgreSQL. Bảng MembershipPackage, WalletLedger, CheckIn. Transaction DB khi trừ buổi. Job hằng ngày đánh dấu sắp hết hạn. Thanh toán mua gói (PayOS) có thể làm sau; phiên bản đầu ghi nhận gói đã bán offline.",
          screens: [
            "Lễ tân: tìm khách → check-in → xác nhận số dư mới",
            "CSKH: bảng sắp hết hạn / chưa tái tục",
            "Admin: chỉnh buổi có lý do + audit log",
            "Khách: trang số dư + lịch sử trừ buổi (read-only)",
          ],
          challenges: [
            "Idempotency key cho check-in (tránh double-tap trừ 2 lần)",
            "Quyền: ai được cộng buổi thủ công?",
            "Gói liệu trình gắn dịch vụ cụ thể vs ví buổi generic",
          ],
          outcomes: [
            "Giảm tranh chấp số buổi",
            "Tăng tỷ lệ chủ động gọi gia hạn (quy trình, không phải “magic conversion”)",
            "Có dữ liệu thật để biết gói nào bán chạy",
          ],
          buildNote:
            "Nên làm sau hoặc song song Smart Booking để tái sử dụng Customer/Staff. Không bắt buộc app native — web trên tablet lễ tân là đủ.",
        }),
        concept: false,
        timeframe: "6–8 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "real-estate",
    category: "Bất động sản",
    items: [
      {
        slug: "lead-pipeline-bds",
        title: "Pipeline lead môi giới BĐS",
        description:
          "lead từ ads/landing vào pipeline có owner, SLA follow-up và gắn listing — hết lead “chết” trong group Zalo.",
        overview:
          "Môi giới BĐS sống nhờ tốc độ phản hồi lead nóng. Thực tế lead Facebook/Zalo rơi vào group, không có owner, sau vài giờ mất giá. Sản phẩm này là CRM mỏng đúng việc: nhận lead → gán → nhắc → ghi lịch sử — không biến thành Salesforce.",
        problem:
          "Lead không có owner; không SLA; quản lý không biết ai bỏ lead; tin đăng quan tâm không gắn với cuộc gọi.",
        solutionText:
          "Lead inbox + phân bổ + Kanban stage + nhắc follow-up + gắn listing quan tâm.",
        features: [
          "Inbox lead (form, import CSV, webhook ads)",
          "Round-robin / gán tay có audit",
          "Kanban stage + hoạt động (gọi, xem nhà, đề xuất)",
          "Nhắc SLA (ví dụ chưa gọi sau 15–30 phút)",
          "Gắn 1–n listing quan tâm",
        ],
        stack: ["Next.js", "PostgreSQL", "Redis", "Resend"],
        challenges: [
          "Dedup lead theo SĐT (nhiều form / CTV trùng)",
          "Phân bổ công bằng nhưng vẫn cho team lead ưu tiên",
          "Thông báo đủ nhanh trên mobile mà không cần app nặng",
        ],
        results: [
          "Mỗi lead có owner trong vài phút",
          "Quản lý thấy lead “đóng băng” trên pipeline",
          "Lịch sử chăm sóc không mất khi môi giới nghỉ",
        ],
        contentHtml: projectArticle({
          why: "Đây là sản phẩm bán được ngay cho sàn nhỏ/team 5–20 môi giới vì ROI rõ: giữ lead nóng. Đồng thời là xương sống để gắn mã CTV/ref trên site giải pháp BĐS của studio.",
          pain: [
            "Lead FB đổ Excel hoặc group Zalo — ai rảnh thì nhận, ai bận thì bỏ",
            "Trùng SĐT từ nhiều chiến dịch → gọi đè nhau",
            "Quản lý chỉ biết doanh số cuối tháng, không thấy tốc độ follow-up",
            "Khi môi giới nghỉ, lịch sử chăm sóc khách biến mất theo máy cá nhân",
          ],
          approach:
            "Lead là entity trung tâm. Mỗi lead có stage, owner, next_action_at. Mọi cuộc gọi/ghi chú là activity. Listing là catalog nhẹ (không cần full MLS). Webhook/form tạo lead kèm UTM + ref. Dedup theo phone normalized.",
          mvp: [
            "Form công khai + API tạo lead",
            "Inbox + gán owner + Kanban",
            "Activity timeline (note, call log đơn giản)",
            "Job nhắc SLA + email/push web",
            "Catalog listing tối giản (tiêu đề, giá, khu vực, link)",
          ],
          architecture:
            "Next.js + PostgreSQL. Bảng Lead, LeadActivity, Listing, AssignmentRule. Redis queue cho reminder. Auth theo role: admin sàn / môi giới. Mobile-first UI vì môi giới làm việc trên điện thoại.",
          screens: [
            "Inbox “lead mới” với đếm phút tuổi lead",
            "Kanban theo stage (Mới → Đang tư vấn → Xem nhà → Đàm phán → Chốt/Mất)",
            "Chi tiết lead: SĐT, nhu cầu, listing gắn, timeline",
            "Bảng công bằng: lead/owner theo tuần (admin)",
          ],
          challenges: [
            "Chuẩn hoá SĐT VN (+84/0) để dedup",
            "Tránh spam nhắc: snooze / hoàn thành next action",
            "Quyền xem SĐT (ẩn một phần với role thử việc nếu cần)",
          ],
          outcomes: [
            "Thời gian phản hồi lead đầu tiên giảm rõ (đo được bằng timestamp)",
            "Lead không “mồ côi” khi người nhận nghỉ",
            "Có dữ liệu nguồn (UTM/ref) để tính CTV sau này",
          ],
          buildNote:
            "Đừng làm email marketing phức tạp ngay từ đầu. Một inbox + SLA + timeline đánh bại 90% Excel hiện trường. Tích hợp Meta Lead Ads để phase 2.",
        }),
        concept: false,
        timeframe: "8–10 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
      {
        slug: "du-an-landing-utm",
        title: "Landing dự án + đo nguồn CTV",
        description:
          "landing bán dự án có gallery/bảng giá; lead gắn UTM và mã CTV — sales gọi đúng ngữ cảnh.",
        overview:
          "Mỗi đợt mở bán cần landing nhanh, đẹp vừa đủ, và quan trọng hơn: biết lead đến từ ads nào hay CTV nào. Sản phẩm này là “weapon” marketing có đo lường — ship trong vài tuần, gắn pipeline lead.",
        problem:
          "Landing làm xong nhưng lead đổ form chung; không tách nguồn; CTV không chứng minh được lead của mình.",
        solutionText:
          "Landing theo dự án + form ngắn + lưu UTM/ref + notify sales kèm ngữ cảnh.",
        features: [
          "Landing sections: hero, tiện ích, gallery, mặt bằng, bảng giá, CTA",
          "Form ngắn (tên, SĐT, khung giờ gọi)",
          "Capture UTM + ref CTV vào lead",
          "Trang cảm ơn + webhook/notify",
          "CMS nhẹ sửa copy/ảnh không cần deploy lại (phase 2)",
        ],
        stack: ["Next.js", "Tailwind", "PostgreSQL"],
        challenges: [
          "Landing nhanh nhưng vẫn SEO/LCP tốt với ảnh nặng",
          "Giữ attribution khi user đi lòng vòng rồi mới submit",
          "Tránh spam bot form mà không làm khó mobile",
        ],
        results: [
          "Sales nhận lead kèm tên dự án + nguồn",
          "CTV có dấu vết lead từ link /r/CODE",
          "Marketing so được chiến dịch theo UTM",
        ],
        contentHtml: projectArticle({
          why: "Đây là sản phẩm “ship nhanh – demo đẹp – gắn sales engine”. Phù hợp portfolio giải pháp BĐS và pilot CTV trên site. Thời gian build ngắn nhưng câu chuyện đo lường rõ.",
          pain: [
            "Dev bị kéo làm landing lặp lại mỗi chiến dịch",
            "Lead không mang context dự án → sales hỏi lại từ đầu",
            "CTV gửi link nhưng không chứng minh lead thuộc về mình",
          ],
          approach:
            "Template landing theo dự án (MDX hoặc CMS fields). Proxy/ref cookie đã có trên site studio được tái sử dụng. Submit tạo Lead với solutionSlug=real-estate + metadata dự án.",
          mvp: [
            "1 template landing + 1–2 dự án mẫu",
            "Form → Lead trong CRM (hoặc bảng Lead sẵn có)",
            "Hiển thị ref/UTM trong admin lead detail",
            "Notify email/Telegram khi có lead mới",
          ],
          architecture:
            "App Router page /du-an-bds/[slug] hoặc /solutions/real-estate/p/[slug]. Ảnh trên R2. Lead API dùng chung. Attribution cookie tct_ref.",
          screens: [
            "Hero dự án + CTA gọi lại",
            "Gallery / tiện ích / mặt bằng",
            "Form đăng ký tư vấn",
            "Admin: lead kèm project + ref",
          ],
          challenges: [
            "Ảnh mặt bằng lớn — cần responsive + blur placeholder",
            "Bot form: honeypot + rate limit theo IP/SĐT",
            "Đồng bộ copy pháp lý (“giá tham khảo”) theo yêu cầu chủ đầu tư",
          ],
          outcomes: [
            "Lead có ngữ cảnh → cuộc gọi đầu chất lượng hơn",
            "Attribution CTV chạy thật trên funnel BĐS",
            "Tái sử dụng template cho dự án mới trong ngày",
          ],
          buildNote:
            "Làm module này sau khi Lead model/admin đã ổn. Đây là lớp presentation + attribution, không phải CRM đầy đủ.",
        }),
        concept: false,
        timeframe: "3–4 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "construction",
    category: "Xây dựng",
    items: [
      {
        slug: "nhat-ky-cong-trinh",
        title: "Nhật ký công trình theo hạng mục",
        description:
          "giám sát ghi tiến độ + ảnh theo hạng mục; chủ đầu tư xem portal — hết hỏi Zalo “tuần này tới đâu”.",
        overview:
          "Công trình vừa/nhỏ ở VN vẫn chạy trên Zalo: ảnh tiến độ lẫn với tán gẫu, không gắn hạng mục, không có mốc nghiệm thu. Nhật ký số hoá đúng việc hiện trường — mobile-first cho giám sát, portal đọc cho chủ đầu tư.",
        problem:
          "Không có timeline hạng mục; ảnh rời; chủ đầu tư và nhà thầu tranh luận tiến độ vì thiếu nguồn sự thật.",
        solutionText:
          "Hạng mục → nhật ký theo ngày → ảnh → trạng thái; portal chủ đầu tư read-only.",
        features: [
          "Cây hạng mục theo công trình",
          "Nhật ký ngày + ảnh hiện trường",
          "Trạng thái: đang làm / chờ nghiệm / hoàn thành",
          "Portal chủ đầu tư (timeline + album)",
          "Phân quyền: giám sát ghi, chủ đầu tư đọc",
        ],
        stack: ["Next.js", "Flutter", "PostgreSQL", "R2"],
        challenges: [
          "Upload ảnh mạng công trường yếu (queue offline)",
          "Không để app nặng hơn thói quen chụp Zalo",
          "Mô hình hạng mục đủ linh hoạt cho nhà ở / fit-out",
        ],
        results: [
          "Mỗi hạng mục có timeline ảnh có ngày",
          "Giảm vòng hỏi tiến độ định kỳ",
          "Nghiệm thu có checklist + dấu vết",
        ],
        contentHtml: projectArticle({
          why: "Ít sản phẩm Việt làm tốt lớp “hiện trường ↔ chủ đầu tư” cho SME xây dựng. Đây là sản phẩm có story mạnh trên portfolio: offline-tolerant, ảnh, phân quyền — và bán được theo từng công trình.",
          pain: [
            "Ảnh tiến độ chìm trong Zalo, không search theo hạng mục",
            "Chủ đầu tư hỏi hàng tuần; giám sát mất giờ ghép ảnh báo cáo",
            "Nghiệm thu miệng → tranh chấp khối lượng/phát sinh",
            "Nhân sự hiện trường không muốn học phần mềm phức tạp",
          ],
          approach:
            "Công trình có danh sách hạng mục. Mỗi ngày giám sát chọn hạng mục → viết nhật ký ngắn → đính ảnh. Trạng thái kéo trên hạng mục. Chủ đầu tư login portal xem timeline, không sửa. Báo cáo tuần = export album + ghi chú.",
          mvp: [
            "Web admin tạo công trình + hạng mục",
            "App/mobile web: tạo nhật ký + upload ảnh",
            "Portal chủ đầu tư: timeline + lọc hạng mục",
            "Trạng thái hạng mục + lịch sử đổi",
            "Offline draft ảnh (phase 1: retry upload; phase 2: queue local)",
          ],
          architecture:
            "API Nest/Next + PostgreSQL. Object storage R2 cho ảnh. Flutter hoặc PWA cho hiện trường. Presigned upload. Thumbnail pipeline đơn giản.",
          screens: [
            "Danh sách công trình của giám sát",
            "Chi tiết hạng mục + feed nhật ký",
            "Composer: text + multi-ảnh + vị trí (tuỳ chọn)",
            "Portal chủ: timeline và album tuần",
          ],
          challenges: [
            "Nén ảnh trước upload trên mobile",
            "Quyền theo công trình (nhiều chủ / nhiều giám sát)",
            "Không biến thành BIM/PM phức tạp — giữ nhật ký",
          ],
          outcomes: [
            "Báo cáo tuần lấy từ hệ thống trong phút",
            "Tranh luận tiến độ dựa trên ảnh có timestamp",
            "Chủ đầu tư tự theo dõi → bớt họp status",
          ],
          buildNote:
            "Phiên bản đầu dùng App hiện trường + camera; mở rộng khi đã ổn thói quen dùng. Không làm Gantt đầy đủ ngay.",
        }),
        concept: false,
        timeframe: "10–12 tuần",
        platform: "App",
        role: "Product Engineer",
      },
      {
        slug: "phieu-vat-tu",
        title: "Phiếu xuất nhập vật tư công trình",
        description:
          "phiếu xuất nhập số theo công trình, tồn tạm và cảnh báo vượt định mức — thay sổ kho tay.",
        overview:
          "Thất thoát vật tư công trường thường đến từ việc không có biên bản số. Sản phẩm này hẹp: phiếu xuất/nhập, tồn theo công trình, định mức tham chiếu — đủ để quản lý đối chiếu, không làm ERP kho.",
        problem:
          "Xuất xi măng/thép ghi tay; không đối chiếu định mức; tranh chấp giữa kho và tổ đội.",
        solutionText:
          "Phiếu xuất nhập + tồn theo công trình + cảnh báo vượt định mức ở mức “cần kiểm tra”.",
        features: [
          "Phiếu nhập / phiếu xuất gắn công trình",
          "Danh mục vật tư + đơn vị",
          "Tồn theo công trình (tính từ phiếu)",
          "Định mức sơ bộ + cảnh báo vượt",
          "Export PDF/Excel biên bản",
        ],
        stack: ["Next.js", "PostgreSQL"],
        challenges: [
          "Đơn vị quy đổi (bao ↔ kg) đủ dùng hiện trường",
          "Sửa phiếu đã duyệt phải có luồng reverse",
          "UX tablet đội nắng / mạng chậm",
        ],
        results: [
          "Có biên bản số để đối chiếu",
          "Thấy sớm khi xuất vượt định mức",
          "Giảm tranh chấp kho ↔ tổ đội",
        ],
        contentHtml: projectArticle({
          why: "Đi cùng nhật ký công trình, đây là module “tiền & vật tư” mà chủ thầu quan tâm. Scope hẹp giúp ship và demo được ngay trên tablet.",
          pain: [
            "Sổ kho ướt / mất / không đọc được",
            "Không biết đã xuất bao nhiêu so với dự toán",
            "Cuối công trình mới phát hiện thiếu/thừa bất thường",
          ],
          approach:
            "Ledger tồn: mọi thay đổi qua phiếu. Định mức là ngân sách tham chiếu, không khoá cứng xuất (chỉ cảnh báo). Duyệt phiếu theo ca.",
          mvp: [
            "Danh mục vật tư",
            "Tạo phiếu nhập/xuất",
            "Xem tồn theo công trình",
            "Cảnh báo vượt định mức",
            "Export biên bản",
          ],
          architecture:
            "Next.js + PostgreSQL, báo cáo SQL đơn giản. Auth theo công trình. In PDF phía server.",
          screens: [
            "Danh sách phiếu hôm nay",
            "Form phiếu (vật tư, SL, người nhận)",
            "Bảng tồn + % định mức",
            "Chi tiết phiếu / PDF",
          ],
          challenges: [
            "Sửa sai số: reverse phiếu thay vì edit lịch sử",
            "Nhiều kho tạm trên cùng công trình (phase 2)",
          ],
          outcomes: [
            "Đối chiếu vật tư có số",
            "Cảnh báo sớm bất thường",
            "Thói quen xuất có phiếu thay vì “lấy trước ghi sau”",
          ],
          buildNote:
            "Có thể bắt đầu web-only. Tích hợp nhật ký công trình bằng projectId chung.",
        }),
        concept: false,
        timeframe: "6–8 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "clinic",
    category: "Phòng khám",
    items: [
      {
        slug: "lich-kham-emr-nhe",
        title: "Lịch khám + EMR tái khám gọn",
        description:
          "slot theo bác sĩ, hồ sơ tái khám tối giản, nhắc tái khám — cho phòng khám 2–5 bác sĩ, không phải hospital HIS.",
        overview:
          "Phòng khám tư nhân cần phần mềm “đủ nhẹ”: xếp lịch không chồng, mở nhanh lịch sử tái khám, nhắc bệnh nhân quay lại. Thiết kế từ chối tham vọng HIS đầy đủ — chỉ EMR gọn phục vụ tái khám và vận hành lễ tân.",
        problem:
          "Lịch chồng; bệnh án giấy chậm; bác sĩ không kịp xem lịch sử trước khi gọi bệnh nhân.",
        solutionText:
          "Booking slot theo bác sĩ + EMR tối giản + nhắc tái khám + quyền theo vai trò.",
        features: [
          "Lịch theo bác sĩ / phòng",
          "Tiếp nhận ngắn (lý do khám, dị ứng)",
          "EMR: chẩn đoán, toa, ghi chú, file đính kèm",
          "Nhắc tái khám theo phác đồ/ngày hẹn",
          "In/PDF toa & giấy hẹn",
        ],
        stack: ["Next.js", "PostgreSQL", "Redis", "R2"],
        challenges: [
          "Bảo mật dữ liệu sức khoẻ (mã hoá at rest, audit truy cập)",
          "EMR đủ dùng tái khám nhưng không phình thành HIS",
          "Đồng bộ lịch với walk-in giờ cao điểm",
        ],
        results: [
          "Lễ tân xếp slot rõ ràng theo bác sĩ",
          "Bác sĩ mở được lần khám trước trong vài giây",
          "Có quy trình nhắc tái khám có chủ đích",
        ],
        contentHtml: projectArticle({
          why: "Thị trường phòng khám nhỏ đang dùng phần mềm nặng hoặc Excel. Một EMR “đúng size” + lịch là sản phẩm có nhu cầu thật và ranh giới kỹ thuật thú vị (privacy, audit).",
          pain: [
            "Double-book bác sĩ vì lịch giấy/Zalo",
            "Tái khám phải lục tủ bệnh án",
            "Nhắc tái khám không hệ thống → mất doanh thu follow-up hợp lệ",
            "Sợ phần mềm bệnh viện phức tạp, train mãi không vào",
          ],
          approach:
            "Tách rõ: Scheduling | Encounter | Reminder. Encounter chỉ vài field bắt buộc + free-text lâm sàng. File đính kèm (xét nghiệm) lưu object storage. Mọi xem hồ sơ ghi access log.",
          mvp: [
            "Lịch bác sĩ + đặt/huỷ/đổi lịch",
            "Màn hình khám: mở encounter, ghi chú, kê toa đơn giản",
            "Timeline lần khám theo bệnh nhân",
            "Nhắc tái khám (email/SMS)",
            "Phân quyền lễ tân / bác sĩ / quản lý",
          ],
          architecture:
            "Next.js + PostgreSQL. Mã hoá cột nhạy cảm hoặc disk encryption. R2 private + signed URL. Session cứng, timeout ngắn trên máy lễ tân dùng chung.",
          screens: [
            "Calendar ngày của bác sĩ",
            "Hàng đợi bệnh nhân trong ca",
            "Encounter editor",
            "Hồ sơ bệnh nhân (timeline)",
          ],
          challenges: [
            "Máy lễ tân dùng chung tài khoản → cần PIN/fast switch user",
            "In toa theo mẫu phòng khám",
            "Tuân thủ lưu trữ / xoá dữ liệu theo chính sách",
          ],
          outcomes: [
            "Giảm chồng lịch",
            "Tái khám có ngữ cảnh",
            "Nhân sự mới onboard nhanh hơn Excel",
          ],
          buildNote:
            "Không claim “chuẩn Bộ Y tế” nếu chưa làm. Copy sản phẩm luôn nói rõ phạm vi phòng khám tư, EMR tối giản.",
        }),
        concept: false,
        timeframe: "10–12 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
      {
        slug: "hang-doi-goi-so",
        title: "Hàng đợi & màn hình gọi số",
        description:
          "lấy số, ưu tiên loại khám, TV display — giảm ùn lễ tân; ship độc lập hoặc gắn lịch khám.",
        overview:
          "Module hàng đợi là “quick win” có thể demo trong tuần: kiosk/lễ tân lấy số, phòng gọi số, TV hiển thị. Đứng riêng hoặc nối với lịch khám.",
        problem:
          "Bệnh nhân chen; lễ tân vừa ghi sổ vừa trả lời “còn bao lâu”.",
        solutionText:
          "Ticket số theo hàng / phòng, ưu tiên, TV board, thống kê thời gian chờ.",
        features: [
          "Lấy số (kiosk hoặc lễ tân)",
          "Nhiều hàng: thường / ưu tiên",
          "Console gọi số theo phòng",
          "TV display fullscreen",
          "Thống kê chờ trung bình theo ca",
        ],
        stack: ["Next.js", "WebSocket", "PostgreSQL"],
        challenges: [
          "Đồng bộ TV realtime ổn định trên mạng phòng khám",
          "Reset số theo ngày / ca",
          "Ưu tiên không phá công bằng cảm nhận của bệnh nhân",
        ],
        results: [
          "Có thứ tự rõ ràng trong giờ cao điểm",
          "Lễ tân bớt trả lời vị trí hàng đợi",
          "Có số liệu chờ để chỉnh lịch/nhân sự",
        ],
        contentHtml: projectArticle({
          why: "Sản phẩm nhỏ, demo mạnh (TV + tablet), dễ bán add-on cho phòng khám đã có lịch. Portfolio có visual rõ.",
          pain: [
            "Ùn cửa lễ tân",
            "Gọi tên dễ nhầm / bỏ sót",
            "Không đo được thời gian chờ thực",
          ],
          approach:
            "Mỗi ticket thuộc queue + counter. Sự kiện gọi số broadcast websocket tới TV. Ưu tiên = trọng số hoặc hàng riêng.",
          mvp: [
            "Lấy số + in nhiệt (tuỳ chọn) / hiện số trên màn",
            "Console gọi / bỏ qua / hoàn thành",
            "TV page fullscreen",
            "Báo cáo chờ theo ngày",
          ],
          architecture:
            "Next.js + PostgreSQL + Redis pub/sub hoặc socket server. TV là trang web kiosk.",
          screens: [
            "Kiosk lấy số",
            "Console phòng khám",
            "TV board",
            "Admin cấu hình hàng/phòng",
          ],
          challenges: [
            "TV sleep / trình duyệt crash → watchdog đơn giản",
            "Âm thanh gọi số (tuỳ chọn, dễ gây ồn)",
          ],
          outcomes: [
            "Trải nghiệm chờ có trật tự",
            "Dữ liệu chờ theo ca",
            "Upsell tự nhiên vào EMR/lịch",
          ],
          buildNote:
            "Có thể prototype TV + console trong vài ngày. Không cần kiosk phần cứng ngay từ đầu.",
        }),
        concept: false,
        timeframe: "4–5 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "fnb",
    category: "F&B",
    items: [
      {
        slug: "qr-order-kds",
        title: "QR order bàn + KDS bếp",
        description:
          "khách order QR; bếp chạy KDS theo station; thu ngân cùng trạng thái món — giảm sai món và chạy hỏi bếp.",
        overview:
          "Quán cafe/nhà hàng vừa muốn “QR cho hiện đại” nhưng chết ở khâu bếp: order Zalo/giấy, sai món, không biết món nào xong. Full-loop: QR → ticket → KDS → phục vụ/thu ngân. Đây là sản phẩm demo cực mạnh và rất sát vận hành quán.",
        problem:
          "Sai món; bếp và thu ngân lệch trạng thái; phục vụ chạy hỏi liên tục.",
        solutionText:
          "QR menu theo bàn, ticket vào KDS theo station, trạng thái món realtime, thu ngân theo dõi.",
        features: [
          "QR theo bàn / khu",
          "Menu + tuỳ chọn món (size, topping)",
          "KDS theo station (bar / bếp nóng / lạnh)",
          "Trạng thái: mới → đang làm → sẵn sàng → đã phục vụ",
          "Thu ngân: bill theo bàn, hủy món có lý do",
        ],
        stack: ["Next.js", "PostgreSQL", "WebSocket", "Redis"],
        challenges: [
          "Realtime ổn định khi giờ cao điểm (burst order)",
          "Đổi/hủy món khi bếp đã nhận",
          "In tem/bếp (phase 2) và đồng bộ số bàn",
        ],
        results: [
          "Ít sai món hơn nhờ ticket chuẩn",
          "Phục vụ biết món sẵn sàng mà không hỏi bếp",
          "Có dữ liệu món bán chạy theo khung giờ",
        ],
        contentHtml: projectArticle({
          why: "Đây là sản phẩm “wow” trên portfolio và sát nhu cầu F&B Việt. Vòng đời order rõ, visual KDS đẹp, có websocket — đủ depth kỹ thuật mà vẫn giải thích được cho chủ quán trong 2 phút.",
          pain: [
            "Order viết tay / gửi ảnh menu Zalo → sai topping",
            "Bếp không ưu tiên được ticket",
            "Thu ngân không biết món nào đã ra",
            "Giờ cao điểm: phục vụ và bếp to tiếng với nhau",
          ],
          approach:
            "Bàn có QR → session order. Mỗi line item vào station queue. KDS chỉ hiện ticket của station. Sự kiện trạng thái broadcast. Bill là tổng line theo bàn + thuế/VAT cấu hình nhẹ.",
          mvp: [
            "Menu + bàn + QR",
            "Order flow khách (không bắt login)",
            "KDS 1–2 station",
            "Màn hình phục vụ “sẵn sàng mang”",
            "Thu ngân đóng bàn / in hoá đơn cơ bản",
          ],
          architecture:
            "Next.js + PostgreSQL. Redis + WebSocket (hoặc SSE) cho KDS. Idempotent order submit. Âm thanh ticket mới trên tablet bếp.",
          screens: [
            "Menu QR mobile",
            "Giỏ & gửi bếp",
            "KDS columns theo trạng thái",
            "POS đóng bàn",
          ],
          challenges: [
            "Network tablet bếp yếu — reconnect + snapshot state",
            "Modifier món phức tạp (combo) — giữ data model sạch",
            "Phân quyền hủy món sau khi bếp nhận",
          ],
          outcomes: [
            "Chuẩn hoá order",
            "Giảm sai sót topping",
            "Chủ quán xem món bán theo giờ (báo cáo nhẹ)",
          ],
          buildNote:
            "Bắt đầu 1 quán 1 floor. Multi-branch để sau. Đừng tích hợp máy in nhiệt ngày đầu nếu chưa validate flow.",
        }),
        concept: false,
        timeframe: "8–10 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
      {
        slug: "fnb-ca-doanh-thu",
        title: "Đóng ca & doanh thu chi nhánh",
        description:
          "đóng ca thu ngân có đối chiếu tiền mặt/CK; chủ chuỗi nhỏ xem dashboard ngày — hết gửi ảnh sổ Zalo.",
        overview:
          "Module vận hành tiền cuối ca: đơn giản nhưng chủ quán trả tiền ngay vì đụng tiền mặt. Có thể đứng sau QR/POS hoặc nhập tay tổng ca.",
        problem:
          "Đối chiếu ca bằng ảnh sổ; chủ nhiều quán không thấy số cùng ngày.",
        solutionText:
          "Form đóng ca + khoá ca + dashboard so sánh chi nhánh.",
        features: [
          "Khai báo tiền mặt / CK / voucher",
          "Khác biệt vs doanh thu hệ thống (nếu có POS)",
          "Khoá ca + ghi chú lệch",
          "Dashboard ngày theo chi nhánh",
          "Lịch sử ca / export",
        ],
        stack: ["Next.js", "PostgreSQL"],
        challenges: [
          "Nhập tay vs đồng bộ từ POS — hai mode",
          "Chống sửa ca đã khoá",
          "Đa chi nhánh + timezone/ca đêm",
        ],
        results: [
          "Chủ xem số đóng ca trong ngày",
          "Lệch quỹ có ghi chú, không “xử lý miệng”",
          "Kế toán có biên bản số",
        ],
        contentHtml: projectArticle({
          why: "Ít glamorous hơn KDS nhưng bán dễ: đụng tiền. Build nhanh, gắn F&B solution page rất thuyết phục.",
          pain: [
            "Ảnh sổ Zalo cuối đêm",
            "Không biết quán nào lệch quỹ",
            "Ca đêm giao ca rối",
          ],
          approach:
            "Shift có open/close. Close yêu cầu đếm quỹ. Nếu có order system thì so với tổng bill. Lệch bắt buộc ghi chú.",
          mvp: [
            "Mở/đóng ca",
            "Form đếm tiền",
            "Dashboard 1–N chi nhánh",
            "Export CSV",
          ],
          architecture: "Next.js + PostgreSQL, role chủ/quản/ca.",
          screens: [
            "Mở ca",
            "Đóng ca",
            "Dashboard ngày",
            "Chi tiết lệch",
          ],
          challenges: [
            "Ca qua nửa đêm",
            "Quyền reopen ca",
          ],
          outcomes: [
            "Đối soát nhanh",
            "Thói quen khoá ca",
            "Nhìn được quán yếu hơn theo ngày",
          ],
          buildNote: "Có thể ship độc lập trước KDS; sau nối doanh thu tự động.",
        }),
        concept: false,
        timeframe: "5–6 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "education",
    category: "Giáo dục",
    items: [
      {
        slug: "crm-tuyen-sinh",
        title: "CRM tuyển sinh trung tâm",
        description:
          "lead ads → tư vấn → ghi danh → học phí kỳ đầu; tư vấn có list gọi mỗi ngày, kế toán thấy công nợ.",
        overview:
          "Trung tâm anh ngữ/kỹ năng sống nhờ tuyển sinh. Lead nóng chết vì Excel. CRM tuyển sinh khép funnel đến học phí kỳ 1 — gắn PayOS khi cần thu đặt cọc.",
        problem:
          "Lead không vào pipeline; quên follow; công nợ học phí mờ.",
        solutionText:
          "Pipeline tuyển sinh + lịch tư vấn + ghi danh + công nợ kỳ đầu.",
        features: [
          "Pipeline stage tuyển sinh",
          "Lịch hẹn tư vấn / trial",
          "Ghi danh lớp & khoá",
          "Công nợ / đặt cọc (PayOS phase 2)",
          "Nhắc tư vấn “cần gọi hôm nay”",
        ],
        stack: ["Next.js", "PostgreSQL", "PayOS", "Resend"],
        challenges: [
          "Trùng lead phụ huynh nhiều SĐT",
          "Chuyển giai đoạn có điều kiện (đã trial chưa?)",
          "Học phí nhiều kỳ — phiên bản đầu chỉ kỳ 1",
        ],
        results: [
          "Tư vấn có list ưu tiên mỗi ngày",
          "Quản lý thấy bottleneck stage",
          "Kế toán biết ai đặt cọc / còn thiếu",
        ],
        contentHtml: projectArticle({
          why: "Funnel rõ, gắn commercial engine (lead + payment) của chính site. Dễ demo cho chủ trung tâm và cho CTV giáo dục.",
          pain: [
            "Lead FB → Excel → quên",
            "Tư vấn không biết phụ huynh nào “nóng”",
            "Đóng học phí qua chuyển khoản rời, đối soát khổ",
          ],
          approach:
            "Lead → Opportunity tuyển sinh → Enrollment. Activity và task “gọi lại”. Khi ghi danh tạo invoice kỳ 1.",
          mvp: [
            "Pipeline + task",
            "Form/landing tạo lead",
            "Ghi danh gắn lớp",
            "Đánh dấu đã thu / link PayOS",
            "Báo cáo stage conversion sơ bộ",
          ],
          architecture:
            "Dùng lại mô hình Lead/Payment của studio nếu được. PostgreSQL, job reminder.",
          screens: [
            "Kanban tuyển sinh",
            "Hôm nay cần gọi",
            "Hồ sơ học viên/phụ huynh",
            "Công nợ kỳ 1",
          ],
          challenges: [
            "Phụ huynh vs học viên là 2 person",
            "Mùa tuyển sinh burst lead",
          ],
          outcomes: [
            "Follow-up có nhịp",
            "Đối soát đặt cọc dễ hơn",
            "Nhìn được stage chết lead",
          ],
          buildNote:
            "Đừng làm LMS trong CRM. Tách “tuyển sinh” và “học tập”.",
        }),
        concept: false,
        timeframe: "8–10 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
      {
        slug: "lop-bai-tap-lite",
        title: "LMS nhẹ — lớp, nộp bài, điểm",
        description:
          "lớp/buổi/bài tập/nộp file/điểm + cổng phụ huynh đọc — thay Drive và Zalo cho trung tâm vừa.",
        overview:
          "Sau tuyển sinh, trung tâm cần chỗ giao bài và chấm điểm không loạn Zalo. LMS nhẹ — không Coursera — đủ cho giáo viên và phụ huynh.",
        problem:
          "Bài tập rải Drive/Zalo; không biết ai thiếu; phụ huynh hỏi điểm liên tục.",
        solutionText:
          "Lớp → buổi → assignment → submission → grade; phụ huynh view read-only.",
        features: [
          "Quản lý lớp & buổi học",
          "Giao bài + hạn nộp",
          "Nộp file / link",
          "Chấm điểm + nhận xét ngắn",
          "Cổng phụ huynh: điểm danh & điểm",
        ],
        stack: ["Next.js", "PostgreSQL", "R2"],
        challenges: [
          "Upload bài lớn / nhiều file",
          "Quyền phụ huynh chỉ thấy con mình",
          "Giáo viên muốn chấm nhanh trên điện thoại",
        ],
        results: [
          "Có bảng nộp bài theo assignment",
          "Phụ huynh tự xem điểm",
          "Giảm tin nhắn hỏi lặp cho GVCN",
        ],
        contentHtml: projectArticle({
          why: "Bổ sung hoàn chỉnh cho education solution: tuyển sinh + vận hành học. Scope giữ “lite” để ship.",
          pain: [
            "Zalo group lớp loạn file",
            "Không có deadline rõ",
            "Phụ huynh không tin thông tin miệng",
          ],
          approach:
            "Course/Class/Session/Assignment/Submission. Grade là field trên submission. Parent account link student.",
          mvp: [
            "CRUD lớp, học viên",
            "Assignment + nộp bài",
            "Chấm điểm",
            "Portal phụ huynh",
            "Điểm danh buổi (checkbox)",
          ],
          architecture: "Next.js + R2 private files + signed download.",
          screens: [
            "Bảng lớp của giáo viên",
            "Chi tiết bài tập & danh sách nộp",
            "Form chấm",
            "App phụ huynh (mobile web)",
          ],
          challenges: [
            "Thông báo nộp bài — tránh spam",
            "Plagiarism? Không làm trong phiên bản đầu",
          ],
          outcomes: [
            "Vào nề nếp nộp bài",
            "Minh bạch điểm với phụ huynh",
            "Giáo viên giảm giờ hành chính",
          ],
          buildNote: "Mobile web trước. App native không cần cho v1.",
        }),
        concept: false,
        timeframe: "10–12 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "ecommerce",
    category: "Thương mại điện tử",
    items: [
      {
        slug: "fashion-move",
        title: "Fashion Move — marketplace thời trang",
        description:
          "Marketplace mobile-first: seller đăng bán, chat realtime, quản lý đơn — app Flutter + API NestJS.",
        overview:
          "Sàn thời trang tập trung trải nghiệm mobile cho seller và buyer: đăng sản phẩm, chat, theo dõi đơn. Đây là case shipped thể hiện full-stack mobile + realtime.",
        problem:
          "Seller cần bán trên mobile; buyer cần chat nhanh; web-only không đủ cho hiện trường.",
        solutionText:
          "Flutter apps + NestJS + chat Socket.io + dashboard seller.",
        features: [
          "Seller dashboard & đăng sản phẩm",
          "Realtime chat",
          "Quản lý đơn",
          "Upload media",
        ],
        stack: ["Flutter", "NestJS", "PostgreSQL", "Socket.io", "S3"],
        challenges: [
          "Chat realtime ổn định trên mạng yếu",
          "Pipeline ảnh sản phẩm",
          "Đồng bộ trạng thái đơn seller/buyer",
        ],
        results: [
          "Luồng bán–chat–đơn trên mobile",
          "Seller thao tác ngoài hiện trường được",
          "Nền tảng mở rộng thêm recommendation sau",
        ],
        contentHtml: shippedArticle({
          context:
            "Thời trang second-hand/local brand cần kênh mobile, không chỉ website. Seller thường chụp hàng và trả lời khách ngay trên điện thoại.",
          problem:
            "Thiếu trải nghiệm seller mobile-first kèm chat và đơn tập trung.",
          solution:
            "Xây app Flutter cho hai phía, API NestJS, chat Socket.io, lưu media S3, PostgreSQL cho catalog/order.",
          architecture:
            "Client Flutter, API NestJS modular, PostgreSQL, object storage, socket gateway tách process nếu cần scale.",
          challenges: [
            "Reconnect chat",
            "Moderation tin nhắn cơ bản",
            "Phân trang feed sản phẩm mượt",
          ],
          results: [
            "Hoàn thành vòng đời đăng bán–chat–đơn trên mobile",
            "Seller dùng được trong điều kiện thực tế",
          ],
        }),
        concept: false,
        clientName: "Fashion Move",
        timeframe: "03/2024 – 08/2024",
        platform: "iOS, Android",
        role: "Full-stack Developer",
      },
      {
        slug: "don-da-kenh",
        title: "Console gom đơn đa kênh",
        description:
          "gom đơn web/livestream/export sàn vào một inbox; in phiếu; timeline trạng thái cho CS và kho.",
        overview:
          "Shop Việt bán song song Shopee, livestream, web. Nỗi đau không phải “thêm storefront” — mà là vận hành đơn. Console gom đơn: một inbox, một timeline, in phiếu, gán kho.",
        problem:
          "Copy đơn tay; kho/CS lệch trạng thái; livestream về đêm dễ sót.",
        solutionText:
          "Inbox đơn đa nguồn, chuẩn hoá status, in phiếu, gán kho, timeline cho CS.",
        features: [
          "Import/webhook đơn đa kênh",
          "Inbox thống nhất + filter nguồn",
          "Gán kho / nhặt hàng",
          "In phiếu gửi",
          "Timeline status cho CS",
        ],
        stack: ["Next.js", "PostgreSQL", "Queue", "Redis"],
        challenges: [
          "Map trạng thái khác nhau giữa các kênh",
          "Idempotent import tránh trùng đơn",
          "In ấn và SKU thay đổi liên tục",
        ],
        results: [
          "Giảm nhập tay",
          "CS trả lời status trong một màn hình",
          "Kho có queue nhặt hàng rõ",
        ],
        contentHtml: projectArticle({
          why: "Điểm đau ecom thật ở VN nằm ở ops, không phải theme. Console đơn là sản phẩm B2B nhỏ bán được cho shop 50–500 đơn/ngày.",
          pain: [
            "Livestream chốt → Excel → nhập lại phần mềm",
            "CS hỏi kho trên Zalo từng đơn",
            "Trùng đơn khi import nhiều lần",
          ],
          approach:
            "Normalized Order model. Adapter theo kênh (CSV Shopee, form web, sheet livestream). State machine nội bộ. Event log cho timeline.",
          mvp: [
            "Import CSV + đơn web nội bộ",
            "Inbox + đổi trạng thái",
            "In phiếu (PDF)",
            "Gán kho đơn giản",
            "Timeline + note CS",
          ],
          architecture:
            "Next.js worker queue (BullMQ/Redis) cho import. PostgreSQL. Print template server-side.",
          screens: [
            "Inbox đơn",
            "Chi tiết đơn + timeline",
            "Hàng đợi kho",
            "Import job status",
          ],
          challenges: [
            "SKU mapping thiếu",
            "Đổi địa chỉ sau khi nhặt hàng",
            "Hoàn/huỷ một phần",
          ],
          outcomes: [
            "Một nguồn sự thật cho status",
            "Giảm sót đơn livestream",
            "CS tự tra cứu được",
          ],
          buildNote:
            "Bắt đầu 2 nguồn (web + CSV). API sàn chính thức để phase 2 vì OAuth/phê duyệt lâu.",
        }),
        concept: false,
        timeframe: "8–10 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "logistics",
    category: "Logistics",
    items: [
      {
        slug: "dieu-phoi-chuyen",
        title: "Điều phối chuyến & app tài xế",
        description:
          "board điều phối gán đơn→xe; app tài xế cập nhật stop; nội bộ theo dõi trạng thái thay vì gọi điện.",
        overview:
          "Đội giao hàng 5–30 xe vẫn điều phối bằng Excel và điện thoại. Hệ thống tập trung dispatch board + app tài xế cập nhật điểm dừng — realtime vừa đủ, không làm Uber.",
        problem:
          "Điều phối mù; tài xế báo status chậm; khách hỏi → CS gọi lại tài xế.",
        solutionText:
          "Dispatch board, assignment, app tài xế cập nhật stop/POD sơ bộ, status lô nội bộ.",
        features: [
          "Board đơn chưa gán / đã gán",
          "Gán xe & tài xế theo khu",
          "App tài xế: danh sách stop trong ngày",
          "Cập nhật đến / hoàn thành / lỗi giao",
          "Bản đồ đơn giản (phase 2: tối ưu route)",
        ],
        stack: ["Next.js", "Flutter", "PostgreSQL", "Redis"],
        challenges: [
          "Offline trên đường (queue cập nhật)",
          "Đổi chuyến giữa ngày",
          "Pin vị trí vs privacy tài xế",
        ],
        results: [
          "Điều phối thấy tải từng xe",
          "Giảm cuộc gọi hỏi status nội bộ",
          "Có dữ liệu hoàn thành theo stop",
        ],
        contentHtml: projectArticle({
          why: "Bài toán logistics SME rất thật ở VN. App tài xế + board là combo portfolio mạnh (mobile + ops) và có đường bán rõ.",
          pain: [
            "Excel điều phối vỡ khi tăng đơn",
            "Tài xế quên báo",
            "Không biết xe nào đang quá tải",
          ],
          approach:
            "Order/Stop/Route/Driver. Dispatcher gán route. Driver app chỉ việc của mình. Event status đẩy về board.",
          mvp: [
            "CRUD đơn & điểm dừng",
            "Gán tài xế",
            "App cập nhật status",
            "Board lọc theo trạng thái",
            "Ảnh POD optional",
          ],
          architecture:
            "API + Flutter. Redis pub/sub cho board. PostgreSQL. Upload POD R2.",
          screens: [
            "Dispatch board",
            "Chi tiết chuyến",
            "App tài xế — stop list",
            "Màn hình hoàn thành + ảnh",
          ],
          challenges: [
            "Đồng bộ offline",
            "SĐT khách hiện trên app — cần ẩn một phần",
            "Đa kho xuất",
          ],
          outcomes: [
            "Điều phối ít gọi hơn",
            "Đo được số stop/xe/ngày",
            "Nền tảng để mở portal khách",
          ],
          buildNote:
            "Không cần tối ưu lộ trình AI ngay. Gán tay + status đã đủ giá trị.",
        }),
        concept: false,
        timeframe: "12–14 tuần",
        platform: "App",
        role: "Product Engineer",
      },
      {
        slug: "tracking-b2b",
        title: "Portal tracking B2B + POD",
        description:
          "khách doanh nghiệp tự xem trạng thái lô và chữ ký nhận hàng — CS chỉ xử lý exception.",
        overview:
          "Add-on tự nhiên của điều phối: portal khách theo mã lô, timeline, POD. Giảm 50% câu hỏi status (mục tiêu quy trình, không claim metric ảo trên landing).",
        problem:
          "CS mất giờ trả lời “hàng tới đâu / ký chưa”.",
        solutionText:
          "Portal mã lô + timeline mốc + POD ảnh + notify khi giao xong.",
        features: [
          "Tra cứu mã lô / mã đơn",
          "Timeline mốc vận chuyển",
          "POD ảnh chữ ký",
          "Thông báo email khi hoàn thành",
          "Phân quyền theo công ty khách",
        ],
        stack: ["Next.js", "PostgreSQL", "R2"],
        challenges: [
          "Không lộ thông tin lô của khách khác",
          "Mã tra cứu đoán được → cần token",
          "Đồng bộ status từ hệ thống điều phối",
        ],
        results: [
          "Khách tự phục vụ status",
          "CS tập trung exception",
          "Có POD lưu trữ khi khiếu nại",
        ],
        contentHtml: projectArticle({
          why: "Ship nhanh nếu đã có status event từ điều phối. Demo B2B rất thuyết phục.",
          pain: [
            "Hotline hỏi status",
            "Mất chứng từ giao hàng",
            "Khách lớn muốn self-serve",
          ],
          approach:
            "Read model từ event status. Link magic theo shipment. POD lấy từ driver upload.",
          mvp: [
            "Trang tra cứu",
            "Timeline",
            "POD gallery",
            "Email notify",
          ],
          architecture: "Next.js read-only API, auth company user hoặc magic link.",
          screens: [
            "Login/portal list lô",
            "Chi tiết lô",
            "POD",
          ],
          challenges: [
            "Magic link hết hạn",
            "Watermark POD (tuỳ chọn)",
          ],
          outcomes: [
            "Giảm ticket hỏi status",
            "Khiếu nại có bằng chứng",
          ],
          buildNote: "Làm sau điều phối hoặc mock event để demo trước.",
        }),
        concept: false,
        timeframe: "5–6 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "hospitality",
    category: "Khách sạn",
    items: [
      {
        slug: "booking-truc-tiep",
        title: "Booking engine đặt phòng trực tiếp",
        description:
          "engine đặt phòng + đặt cọc cho boutique/homestay — giảm phụ thuộc OTA trên kênh direct.",
        overview:
          "Homestay/boutique 5–30 phòng muốn có booking trên site mình. Engine: tìm ngày, khoá tồn, đặt cọc PayOS, calendar lễ tân. Không làm channel manager đầy đủ ngay từ đầu.",
        problem:
          "OTA phí cao; đặt Zalo dễ double-book; không có tồn phòng tin cậy trên kênh direct.",
        solutionText:
          "Booking engine + inventory calendar + đặt cọc + calendar lễ tân (OTA nhập tay/import sau).",
        features: [
          "Tìm phòng theo ngày & loại",
          "Giá theo mùa / weekend",
          "Hold tồn + checkout đặt cọc",
          "Calendar lễ tân",
          "Email xác nhận / husy",
        ],
        stack: ["Next.js", "PostgreSQL", "PayOS", "Redis"],
        challenges: [
          "Overbooking khi hold hết hạn",
          "Giá phức tạp (ngày lễ, phụ thu thêm người)",
          "Đồng bộ OTA — cố ý để phase 2",
        ],
        results: [
          "Có kênh direct kiểm soát tồn",
          "Giảm double-book từ Zalo",
          "Thu đặt cọc tự động hơn",
        ],
        contentHtml: projectArticle({
          why: "Câu chuyện phí OTA gần với chủ khách sạn. Engine nhỏ + PayOS là combo demo thương mại đẹp cho studio.",
          pain: [
            "Phí OTA 15–25%",
            "Zalo double-book cuối tuần",
            "Không có payment flow chuyên nghiệp",
          ],
          approach:
            "RoomType + Inventory theo ngày. Hold TTL. Booking confirm khi thanh toán/đặt cọc thành công. Calendar aggregates bookings.",
          mvp: [
            "Search & book UI",
            "Hold + PayOS deposit",
            "Admin calendar",
            "Email confirmation",
            "Huỷ theo policy đơn giản",
          ],
          architecture:
            "Next.js + PostgreSQL + Redis hold. Webhook PayOS cập nhật booking.",
          screens: [
            "Search availability",
            "Checkout đặt cọc",
            "Confirmation",
            "Lễ tân calendar",
          ],
          challenges: [
            "Timezone check-in 14h",
            "Phụ thu trẻ em",
            "Hết phòng lúc thanh toán — UX rollback",
          ],
          outcomes: [
            "Direct booking chạy được",
            "Lễ tân thấy calendar",
            "Tiền cọc vào đúng booking",
          ],
          buildNote:
            "Phiên bản đầu không thay channel manager. Import iCal OTA là bước tiếp theo phổ biến.",
        }),
        concept: false,
        timeframe: "10–12 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
      {
        slug: "buong-phong-checklist",
        title: "Housekeeping — trạng thái buồng",
        description:
          "checklist dọn phòng dirty/clean/inspect; lễ tân chỉ bán phòng đã sẵn sàng.",
        overview:
          "Module vận hành buồng phòng: trạng thái sạch/bẩn/kiểm tra, checklist, phân công ca. Visual rõ, ship nhanh, gắn calendar booking.",
        problem:
          "Báo phòng sạch qua bộ đàm chậm; bán nhầm phòng chưa sẵn sàng.",
        solutionText:
          "Board trạng thái phòng + checklist + phân công + đồng bộ lễ tân.",
        features: [
          "Board phòng theo tầng",
          "Dirty → Clean → Inspected",
          "Checklist theo loại phòng",
          "Phân công nhân viên ca",
          "Lễ tân chỉ thấy phòng sẵn sàng",
        ],
        stack: ["Flutter", "NestJS", "PostgreSQL"],
        challenges: [
          "Cập nhật realtime tới lễ tân",
          "Ảnh chứng minh (tuỳ chọn) tốn storage",
          "Ca và bàn giao giữa các kíp",
        ],
        results: [
          "Giảm bán phòng chưa sẵn",
          "Buồng phòng có checklist chuẩn",
          "Quản lý thấy phòng tồn bẩn kéo dài",
        ],
        contentHtml: projectArticle({
          why: "Ops hotel rất trực quan để demo. Kết hợp booking engine thành story “direct book + vận hành”.",
          pain: [
            "Lễ tân và buồng phòng lệch thông tin",
            "Không có chuẩn checklist",
            "Phòng dirty tồn lâu không ai thấy",
          ],
          approach:
            "Room status state machine. Task assigned to housekeeper. Inspect bởi supervisor. Front desk reads inspected only.",
          mvp: [
            "Board trạng thái",
            "Checklist",
            "Assign ca",
            "Push/poll cập nhật lễ tân",
          ],
          architecture: "Mobile app + API. Web board cho supervisor.",
          screens: [
            "Board tầng",
            "Checklist phòng",
            "Front desk availability",
          ],
          challenges: [
            "Thiết bị cũ của nhân viên buồng",
            "Ngôn ngữ UI đơn giản",
          ],
          outcomes: [
            "Ít bán nhầm",
            "Chuẩn hoá dọn phòng",
          ],
          buildNote: "Có thể web mobile trước khi Flutter.",
        }),
        concept: false,
        timeframe: "6–7 tuần",
        platform: "App",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "fitness",
    category: "Fitness",
    items: [
      {
        slug: "gym-checkin-goi",
        title: "Check-in QR & gói hội viên",
        description:
          "gói tháng/năm, check-in QR trên tablet, list sắp hết hạn cho sales gọi gia hạn.",
        overview:
          "Phòng gym vừa: check-in nhanh + hội viên còn hạn + list gia hạn. Không cần app member ngay — QR/thẻ + tablet lễ tân.",
        problem:
          "Thẻ giấy; check-in chậm; không biết ai sắp hết hạn để gọi.",
        solutionText:
          "Membership + hạn gói + check-in QR + hàng đợi gia hạn + tần suất tập.",
        features: [
          "Gói hội viên & ngày hết hạn",
          "Check-in QR / mã thành viên",
          "Cảnh báo hết hạn",
          "Lịch sử tần suất tập",
          "Ghi chú sales khi gọi gia hạn",
        ],
        stack: ["Next.js", "PostgreSQL"],
        challenges: [
          "Check-in đột biến giờ peak",
          "Gói freeze / chuyển nhượng",
          "Thiết bị tablet shared",
        ],
        results: [
          "Check-in vài giây",
          "Sales có list gia hạn",
          "Thấy hội viên “rớt nhịp” tập",
        ],
        contentHtml: projectArticle({
          why: "Đau điểm rõ, demo nhanh (QR), gắn tiền gia hạn. Rất hợp solution fitness.",
          pain: [
            "Sổ giấy giờ peak",
            "Quên gọi gia hạn",
            "Không biết ai bỏ tập",
          ],
          approach:
            "Member + Plan + CheckIn events. Expiry job. Dashboard renewal.",
          mvp: [
            "CRUD hội viên/gói",
            "Check-in tablet",
            "List hết hạn 7/15 ngày",
            "Báo cáo tần suất",
          ],
          architecture: "Next.js + PostgreSQL, trang kiosk fullscreen.",
          screens: [
            "Kiosk check-in",
            "Hồ sơ hội viên",
            "Renewal queue",
          ],
          challenges: [
            "Fake check-in (bạn bè) — PIN nhẹ",
            "Nhiều chi nhánh (phase 2)",
          ],
          outcomes: [
            "Check-in nhanh",
            "Gia hạn có quy trình",
          ],
          buildNote: "Tách PT session wallet thành module kế tiếp.",
        }),
        concept: false,
        timeframe: "6–8 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
      {
        slug: "pt-session-wallet",
        title: "Lịch PT & ví buổi tập",
        description:
          "đặt lịch PT, ví buổi, nhật ký buổi — HLV và học viên cùng một số dư buổi.",
        overview:
          "PT bán gói buổi: double-book và tranh số buổi là chuyện hàng tuần. Hệ thống kết hợp scheduler + wallet giống spa liệu trình nhưng cho trainer.",
        problem:
          "Lịch PT lệch; số buổi trên giấy; học viên không tin số dư.",
        solutionText:
          "Scheduler PT + ví buổi + trừ khi hoàn thành session + nhật ký.",
        features: [
          "Lịch PT theo trainer",
          "Ví buổi học viên",
          "Check-out buổi → trừ ví",
          "Nhật ký buổi (nặng/cardio/note)",
          "Nhắc lịch buổi sắp tới",
        ],
        stack: ["Next.js", "PostgreSQL"],
        challenges: [
          "Huỷ buổi có trừ ví hay không (policy)",
          "Trainer đổi lịch hàng loạt",
          "Học viên tự book trong slot mở",
        ],
        results: [
          "Số buổi minh bạch",
          "Giảm double-book",
          "HLV giữ được lịch sử tập",
        ],
        contentHtml: projectArticle({
          why: "Reuse ý tưởng ví buổi từ spa — chứng tỏ pattern sản phẩm. Build nhanh nếu đã có membership gym.",
          pain: [
            "Tranh số buổi",
            "Trùng lịch trainer",
            "Mất nhật ký tập khi đổi HLV",
          ],
          approach:
            "Session booking + ledger buổi. Complete session → debit. Notes gắn session.",
          mvp: [
            "Calendar trainer",
            "Book session",
            "Complete + debit",
            "Số dư học viên",
          ],
          architecture: "Cùng stack gym membership, thêm Session entity.",
          screens: [
            "Calendar PT",
            "Chi tiết buổi",
            "Ví học viên",
          ],
          challenges: [
            "No-show policy",
            "Package gắn đúng trainer hay pooled",
          ],
          outcomes: [
            "Minh bạch buổi",
            "Vận hành PT chuyên nghiệp hơn",
          ],
          buildNote: "Nên là phase 2 của gym-checkin-goi.",
        }),
        concept: false,
        timeframe: "5–6 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "agency",
    category: "Agency",
    items: [
      {
        slug: "sales-crm",
        title: "Sales CRM Dashboard",
        description:
          "Kanban lead, KPI và timeline chăm sóc — pipeline có owner cho đội sales.",
        overview:
          "CRM sales tập trung pipeline và hoạt động hàng ngày: stage rõ, KPI tuần, timeline — giúp quản lý review không cần hỏi từng người.",
        problem:
          "Không ưu tiên được lead nóng; không thấy bottleneck pipeline.",
        solutionText:
          "Kanban, activity timeline, RBAC, chart KPI tuần.",
        features: [
          "Kanban pipeline",
          "KPI charts",
          "RBAC",
          "Activity timeline",
        ],
        stack: ["React", "Node.js", "MongoDB", "Chart.js"],
        challenges: [
          "Giữ UX nhanh hơn spreadsheet",
          "Quyền xem lead theo team",
          "KPI đủ tin cậy từ activity thật",
        ],
        results: [
          "Lead có bước tiếp theo",
          "Review pipeline theo tuần",
          "Onboard sales mới nhanh hơn",
        ],
        contentHtml: shippedArticle({
          context:
            "Đội sales cần công cụ nhẹ nhìn pipeline thay vì Excel và chat.",
          problem:
            "Thiếu nơi tập trung stage, activity và KPI tuần.",
          solution:
            "Dashboard Kanban + timeline + chart, phân quyền theo vai trò.",
          architecture:
            "React SPA, Node API, MongoDB, biểu đồ Chart.js.",
          challenges: [
            "Performance khi nhiều activity",
            "Thiết kế stage phù hợp quy trình bán",
          ],
          results: [
            "Pipeline nhìn được",
            "Quản lý có nhịp review",
          ],
        }),
        concept: false,
        timeframe: "06/2023 – 10/2023",
        platform: "Web",
        role: "Full Stack Developer",
      },
      {
        slug: "portal-khach-agency",
        title: "Portal khách — ticket & bàn giao",
        description:
          "khách xem ticket, asset bàn giao, milestone — hết “gửi lại file giúp em” trên Zalo.",
        overview:
          "Agency/freelancer mất giờ gửi lại file và trả lời tiến độ. Portal khách là lớp chuyên nghiệp: ticket, asset, milestone, trạng thái thanh toán — đúng bài toán studio cũng đang bán.",
        problem:
          "File/Zalo loạn; khách không biết ticket nào xong; bàn giao không có nơi chính thức.",
        solutionText:
          "Portal ticket + thư viện asset + milestone + trạng thái invoice đơn giản.",
        features: [
          "Ticket theo dự án (ưu tiên, status)",
          "Asset library có version nhẹ",
          "Milestone timeline",
          "Trạng thái thanh toán",
          "Comment theo ticket",
        ],
        stack: ["Next.js", "PostgreSQL", "R2"],
        challenges: [
          "Quyền khách chỉ thấy project của họ",
          "Version file không biến thành Drive clone",
          "Thông báo comment đủ dùng, không spam",
        ],
        results: [
          "Bàn giao có nguồn chính thức",
          "Giảm yêu cầu “gửi lại file”",
          "Khách tự theo dõi milestone",
        ],
        contentHtml: projectArticle({
          why: "Tự dùng được cho studio + bán cho agency khác. Gần với sản phẩm commercial hiện tại (lead/proposal/payment).",
          pain: [
            "Zalo là PMS",
            "Mất file bản final",
            "Khách hỏi tiến độ mỗi ngày",
          ],
          approach:
            "Project → Ticket/Asset/Milestone. Client users. File trên R2. Status thanh toán đọc từ Payment nếu có.",
          mvp: [
            "Login khách",
            "List ticket + chi tiết",
            "Upload asset",
            "Milestone board",
            "Comment",
          ],
          architecture:
            "Next.js multi-tenant nhẹ theo project membership. R2. Email on new comment.",
          screens: [
            "Project home",
            "Ticket detail",
            "Assets",
            "Billing status",
          ],
          challenges: [
            "Preview ảnh/PDF",
            "Giới hạn dung lượng theo gói",
          ],
          outcomes: [
            "Giao tiếp chuyên nghiệp hơn",
            "Giảm giờ hành chính",
            "Upsell retainer dễ hơn",
          ],
          buildNote:
            "Có thể prototype trên chính repo studio với role CLIENT.",
        }),
        concept: false,
        timeframe: "8–10 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
  {
    solutionSlug: "sme-ops",
    category: "Vận hành SME",
    items: [
      {
        slug: "ai-search",
        title: "AI Search — tra cứu tài liệu nội bộ",
        description:
          "Hỏi SOP/tài liệu bằng ngôn ngữ tự nhiên; trả lời kèm nguồn — hỗ trợ đội vận hành.",
        overview:
          "Khi tài liệu nội bộ tăng, search keyword không đủ. Pipeline ingest → embedding → vector search → trả lời có trích nguồn giúp nhân sự mới onboard nhanh hơn.",
        problem:
          "SOP rải Drive; hỏi lại người cũ; khó tìm đúng đoạn.",
        solutionText:
          "Ingest, embed, vector search, API trả lời kèm citation.",
        features: [
          "Semantic search",
          "Ingestion pipeline",
          "Trả lời có nguồn",
          "API nội bộ",
        ],
        stack: ["Python", "FastAPI", "Qdrant", "OpenAI"],
        challenges: [
          "Chunking tài liệu để citation đúng",
          "Cập nhật khi file đổi",
          "Không bịa nguồn (grounding)",
        ],
        results: [
          "Tra cứu nhanh hơn keyword",
          "Câu trả lời gắn file gốc",
          "Giảm hỏi lại quy trình đã có",
        ],
        contentHtml: shippedArticle({
          context:
            "Đội vận hành có nhiều tài liệu quy trình nhưng phân tán, nhân sự mới mất thời gian tìm.",
          problem:
            "Cần hỏi bằng ngôn ngữ tự nhiên và nhận câu trả lời có nguồn.",
          solution:
            "Pipeline ingest, embedding, lưu Qdrant, API FastAPI trả lời kèm citation.",
          architecture:
            "Python workers + FastAPI + Qdrant + OpenAI embeddings/chat. Docker deploy.",
          challenges: [
            "Chất lượng chunk",
            "Eval câu trả lời lệch nguồn",
          ],
          results: [
            "Search nội bộ theo nghĩa",
            "Onboard dựa trên tài liệu sẵn có",
          ],
        }),
        concept: false,
        timeframe: "09/2024 – 12/2024",
        platform: "Web",
        role: "AI Engineer",
      },
      {
        slug: "phe-duyet-chi-phi",
        title: "Phê duyệt đề xuất chi phí",
        description:
          "đề xuất mua hàng/chi phí multi-step approve + audit log — thay duyệt qua chat, kế toán giải trình được.",
        overview:
          "SME lớn dần vẫn duyệt chi trên Zalo. Workflow approve đơn giản: form → cấp duyệt → audit → export. Không phải BPMS doanh nghiệp.",
        problem:
          "Duyệt miệng/chat mất dấu; khó audit; tranh chấp “ai duyệt”.",
        solutionText:
          "Form đề xuất, multi-step approve, comment, audit log, export.",
        features: [
          "Form đề xuất (số tiền, hạng mục, đính kèm)",
          "Luồng duyệt 1–n cấp",
          "Comment & từ chối có lý do",
          "Audit log bất biến",
          "Export CSV/PDF cho kế toán",
        ],
        stack: ["Next.js", "PostgreSQL"],
        challenges: [
          "Đổi rule duyệt khi tổ chức đổi",
          "Uỷ quyền khi người duyệt nghỉ",
          "Đính kèm hoá đơn và đối soát sau chi",
        ],
        results: [
          "Mỗi khoản chi có dấu vết",
          "Kế toán export được lịch sử",
          "Giảm tranh chấp nội bộ",
        ],
        contentHtml: projectArticle({
          why: "Đau điểm phổ biến, scope kiểm soát được, dễ gắn SME ops solution. Cũng là xương sống nếu sau này làm ops hub.",
          pain: [
            "Duyệt Zalo mất thread",
            "Không biết trạng thái đề xuất",
            "Audit cuối tháng khổ",
          ],
          approach:
            "Request → Approvals[] → final status. Rule theo số tiền. Event log append-only.",
          mvp: [
            "Tạo đề xuất",
            "Duyệt/từ chối",
            "Inbox “cần tôi duyệt”",
            "Audit + export",
          ],
          architecture:
            "Next.js + PostgreSQL. Email notify. File R2.",
          screens: [
            "Tạo đề xuất",
            "Inbox duyệt",
            "Chi tiết + timeline",
            "Báo cáo theo tháng",
          ],
          challenges: [
            "Sửa đề xuất sau khi gửi",
            "Song song vs tuần tự duyệt",
          ],
          outcomes: [
            "Minh bạch duyệt chi",
            "Giảm thời gian truy vết",
          ],
          buildNote:
            "Bắt đầu 2 cấp duyệt. Không cần visual BPMN ngay từ đầu.",
        }),
        concept: false,
        timeframe: "5–6 tuần",
        platform: "Web",
        role: "Product Engineer",
      },
    ],
  },
];

const standaloneProjects: Array<SeedProjectItem & { category: string }> = [
  {
    slug: "photo-booth",
    title: "Photo Booth App",
    category: "Mobile App",
    description:
      "App sự kiện: filter, offline queue, in Bluetooth tại booth — chạy ổn khi mạng yếu.",
    overview:
      "Booth sự kiện không thể phụ thuộc cloud lúc cao điểm. App Flutter offline-first xử lý ảnh và hàng đợi in Bluetooth tại chỗ.",
    problem:
      "Mạng sự kiện yếu; cần in nhanh; không được mất ảnh khi mất kết nối.",
    solutionText:
      "Offline-first Flutter, queue in Bluetooth, quản lý event pack.",
    features: [
      "Camera filters",
      "Bluetooth print",
      "Offline queue",
      "Event packs",
    ],
    stack: ["Flutter", "Dart", "Hive", "Bluetooth"],
    challenges: [
      "Bluetooth stack khác nhau theo máy in",
      "Hàng đợi ảnh khi máy in kẹt giấy",
      "UX cho nhân viên booth không kỹ thuật",
    ],
    results: [
      "Booth chạy độc lập",
      "In tại chỗ check-in",
      "Ít phụ thuộc mạng sự kiện",
    ],
    contentHtml: shippedArticle({
      context:
        "Sự kiện cần booth ảnh hoạt động liên tục trong điều kiện mạng không đáng tin.",
      problem:
        "App phụ thuộc cloud sẽ chết khi đông khách; in phải tức thì.",
      solution:
        "Flutter offline-first, lưu local, queue lệnh in Bluetooth, đóng gói theo event.",
      architecture:
        "Flutter + Hive local store + Bluetooth printer integration + sync sau khi có mạng (nếu cần).",
      challenges: [
        "Driver máy in",
        "Performance camera trên Android phổ thông",
      ],
      results: [
        "Vận hành booth ổn định",
        "Trải nghiệm khách không chờ mạng",
      ],
    }),
    concept: false,
    timeframe: "01/2023 – 04/2023",
    platform: "iOS, Android",
    role: "Mobile Developer",
  },
];

export type SeedProjectRow = {
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  coverUrl: string;
  coverAlt: string;
  features: string;
  stack: string;
  role: string;
  timeframe: string | null;
  platform: string;
  tone: string;
  sortOrder: number;
  concept: boolean;
  clientName: string | null;
  overview: string;
  problem: string;
  solution: string;
  challenges: string;
  results: string;
  solutionSlug: string | null;
};

export function buildSeedProjects(caseStudyHtml: CaseStudyHtml): SeedProjectRow[] {
  let sortOrder = 1;
  const projects: SeedProjectRow[] = [];

  const push = (
    item: SeedProjectItem,
    category: string,
    solutionSlug: string | null,
  ) => {
    const coverUrl = `/images/projects/${item.slug}.webp`;
    const coverAlt =
      projectCoverAlts[item.slug] ||
      `Giao diện sản phẩm dự án ${item.title}`;
    const fallback = caseStudyHtml({
      problem: item.problem,
      solution: item.solutionText,
      result: item.results[0] || "",
    });
    projects.push({
      slug: item.slug,
      title: item.title,
      category,
      description: item.description,
      content: item.contentHtml || fallback,
      coverUrl,
      coverAlt,
      features: JSON.stringify(item.features),
      stack: JSON.stringify(item.stack),
      role: item.role || "Product Engineer",
      timeframe: item.timeframe || null,
      platform: item.platform || "Web",
      tone: tones[(sortOrder - 1) % tones.length],
      sortOrder,
      concept: item.concept ?? false,
      clientName: item.clientName || null,
      overview: item.overview,
      problem: item.problem,
      solution: item.solutionText,
      challenges: JSON.stringify(item.challenges),
      results: JSON.stringify(item.results),
      solutionSlug,
    });
    sortOrder += 1;
  };

  for (const group of projectsBySolution) {
    for (const item of group.items) {
      push(item, group.category, group.solutionSlug);
    }
  }
  for (const item of standaloneProjects) {
    push(item, item.category, null);
  }

  return projects;
}
