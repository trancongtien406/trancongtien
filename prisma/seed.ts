import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import "dotenv/config";
import {
  ContentStatus,
  PrismaClient,
} from "../lib/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@trancongtien.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@123456";
  const name = process.env.ADMIN_NAME || "Trần Công Tiến";

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash },
    create: {
      email,
      name,
      passwordHash,
      role: "ADMIN",
      avatarUrl: "/images/avatars/avatar.png",
    },
  });

  const caseStudyHtml = ({
    problem,
    solution,
    result,
  }: {
    problem: string;
    solution: string;
    result: string;
  }) =>
    `<h2>Bài toán</h2><p>${problem}</p><h2>Giải pháp</h2><p>${solution}</p><h2>Kết quả</h2><p>${result}</p>`;

  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      notifyEmail: process.env.NOTIFY_EMAIL || email,
      notifyPhone: process.env.NOTIFY_PHONE || "+84382802406",
      logoUrl: "/icon.png",
      faviconUrl: "/favicon.ico",
      seoTitle: "TRAN CONG TIEN | Full-stack Developer & AI Agent Builder",
      seoDescription:
        "Full-stack developer tại Đà Nẵng chuyên thiết kế website, app ứng dụng và hệ thống AI Agent thực tế.",
    },
  });

  const cats = [
    { name: "Tự duy sản phẩm", slug: "tu-duy-san-pham" },
    { name: "Kiến trúc hệ thống", slug: "kien-truc-he-thong" },
    { name: "Frontend", slug: "frontend" },
    { name: "AI Agent", slug: "ai-san-pham" },
  ];
  for (const c of cats) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
  }

  const arch = await prisma.category.findUnique({
    where: { slug: "kien-truc-he-thong" },
  });
  const frontend = await prisma.category.findUnique({
    where: { slug: "frontend" },
  });
  const product = await prisma.category.findUnique({
    where: { slug: "tu-duy-san-pham" },
  });
  const ai = await prisma.category.findUnique({ where: { slug: "ai-san-pham" } });

  const legacyPostSlugs = [
    "kien-truc-microservices",
    "nextjs-14-app-router",
    "clean-code-product",
    "ai-trong-product",
    "mvp-roadmap",
  ];

  await prisma.post.updateMany({
    where: { slug: { in: legacyPostSlugs } },
    data: { status: ContentStatus.ARCHIVED },
  });

  const posts = [
    {
      slug: "mvp-web-app-6-tuan-roadmap-startup",
      title: "Xây MVP web/app trong 6 tuần: Roadmap thực tế cho startup Việt",
      excerpt:
        "Một lộ trình gọn để startup biến ý tưởng thành bản web/app đầu tiên: rõ scope, có dashboard, đo được kết quả và tránh trượt ngân sách.",
      content: `<h2>Vì sao MVP cần gọn nhưng không được cẩu thả</h2>
<p>MVP không phải là bản làm cho có. Với startup, MVP là phiên bản nhỏ nhất đủ để kiểm chứng giả định kinh doanh: người dùng có cần sản phẩm này không, họ có sẵn sàng dùng không và tính năng nào thật sự tạo ra giá trị.</p>
<p>Sai lầm phổ biến là gom quá nhiều tính năng vào bản đầu tiên. Khi mọi thứ đều quan trọng, team sẽ mất tốc độ, ngân sách phình ra và ngày launch cứ trôi xa. Một MVP tốt nên có một luồng chính thật rõ, một nhóm người dùng mục tiêu cụ thể và một chỉ số thành công có thể đo được.</p>
<h2>Tuần 1: Discovery và chốt phạm vi</h2>
<p>Tuần đầu tiên dùng để trả lời bốn câu hỏi: sản phẩm phục vụ ai, họ đang đau ở đâu, hành động quan trọng nhất trong app là gì và sau launch sẽ đo bằng chỉ số nào.</p>
<p>Đầu ra nên có:</p>
<ul><li>chân dung người dùng chính</li><li>user flow từ lúc vào app đến lúc hoàn thành tác vụ</li><li>danh sách tính năng must-have và nice-to-have</li><li>rủi ro kỹ thuật, dữ liệu, vận hành</li><li>tiêu chí nghiệm thu cho bản launch</li></ul>
<p>Ở giai đoạn này, tôi thường khuyên founder bỏ bớt tính năng hơn là thêm. Bỏ đúng giúp sản phẩm nhanh ra thị trường mà vẫn giữ được phần lõi.</p>
<h2>Tuần 2: Wireframe, UI và kiến trúc</h2>
<p>Khi flow rõ, tuần thứ hai chuyển sang wireframe và prototype. Đây là lúc nhìn thấy sản phẩm trước khi code. Những màn hình như đăng nhập, onboarding, dashboard, form tạo dữ liệu, trạng thái rỗng, lỗi và loading cần được thiết kế từ đầu.</p>
<p>Song song, team kỹ thuật nên chốt kiến trúc: frontend, backend, database, auth, upload file, email, logging và môi trường deploy. Với MVP, một monolith có tổ chức thường hợp lý hơn microservices vì dễ ship, dễ debug và ít chi phí vận hành.</p>
<h2>Tuần 3-5: Build theo luồng chính</h2>
<p>Ba tuần build nên đi theo vertical slice: hoàn thiện từng luồng end-to-end thay vì làm rời rạc từng lớp. Ví dụ với booking app, hãy làm xong luồng khách đặt lịch, admin nhận lịch, hệ thống gửi thông báo rồi mới mở rộng quản lý nhân sự hoặc báo cáo.</p>
<p>Các phần nên có trong MVP nghiêm túc:</p>
<ul><li>auth và phân quyền cơ bản</li><li>CRUD dữ liệu lõi</li><li>dashboard quản trị</li><li>tracking sự kiện quan trọng</li><li>backup dữ liệu và log lỗi</li><li>SEO cơ bản nếu có landing/public page</li></ul>
<h2>Tuần 6: QA, deploy và đo lường</h2>
<p>Tuần cuối không nên dùng để nhồi thêm tính năng. Đây là tuần kiểm thử, sửa edge case, deploy production, đo performance, gắn analytics và chuẩn bị kế hoạch iteration.</p>
<p>Sau launch, câu hỏi không phải "còn thiếu gì" mà là "dữ liệu nói gì". Nếu người dùng dừng ở bước onboarding, sửa onboarding. Nếu họ tạo tài khoản nhưng không quay lại, cần xem lại giá trị cốt lõi. MVP chỉ có ý nghĩa khi nó tạo ra dữ liệu thật.</p>
<h2>Kết luận</h2>
<p>Một MVP web/app trong 6 tuần hoàn toàn khả thi nếu scope đủ sắc. Điều quan trọng không phải build nhiều, mà là build đúng phần giúp founder học nhanh nhất từ thị trường.</p>`,
      coverUrl: "/images/blog/mvp-web-app-6-tuan-roadmap-startup.webp",
      coverAlt:
        "Laptop hiển thị roadmap xây MVP web app trong 6 tuần cho startup Việt",
      tags: JSON.stringify(["MVP", "Startup", "Web App", "Product"]),
      categoryId: product?.id,
      readTime: "9 phút đọc",
    },
    {
      slug: "thue-lap-trinh-vien-lam-website-app",
      title: "Thuê lập trình viên làm website/app cần chuẩn bị gì để không mất tiền oan?",
      excerpt:
        "Checklist thực tế giúp chủ doanh nghiệp và founder chuẩn bị brief, phạm vi, ngân sách và tiêu chí nghiệm thu trước khi thuê dev.",
      content: `<h2>Đừng bắt đầu bằng câu "làm app này hết bao nhiêu?"</h2>
<p>Một website hoặc app không thể báo giá chính xác nếu chưa rõ mục tiêu, phạm vi và mức độ hoàn thiện. Cùng là "app booking", một bản đơn giản chỉ có đặt lịch và quản trị có thể rất khác với bản có thanh toán, nhắc lịch, phân quyền nhiều chi nhánh và dashboard doanh thu.</p>
<p>Trước khi thuê lập trình viên, bạn càng chuẩn bị rõ thì càng giảm rủi ro đổi scope, chậm tiến độ và phát sinh chi phí.</p>
<h2>1. Viết brief bằng ngôn ngữ kinh doanh</h2>
<p>Brief không cần quá kỹ thuật. Bạn chỉ cần mô tả:</p>
<ul><li>doanh nghiệp đang gặp vấn đề gì</li><li>ai sẽ dùng sản phẩm</li><li>họ cần hoàn thành việc gì</li><li>hiện tại đang xử lý bằng Excel, Zalo, giấy tờ hay phần mềm khác</li><li>kết quả mong muốn sau khi có hệ thống</li></ul>
<p>Một brief tốt giúp developer hiểu bài toán trước khi nói về framework.</p>
<h2>2. Chia tính năng thành must-have và later</h2>
<p>Không phải tính năng nào cũng nên làm ở version đầu. Hãy chia thành ba nhóm:</p>
<ul><li>Must-have: không có thì sản phẩm không chạy được</li><li>Should-have: nên có nhưng có thể làm sau launch</li><li>Nice-to-have: đẹp, tiện, nhưng chưa chứng minh được giá trị</li></ul>
<p>Ví dụ với website bán dịch vụ, must-have có thể là landing page, form liên hệ, quản trị nội dung và SEO cơ bản. Chatbot AI, loyalty hay automation nâng cao có thể để phase 2.</p>
<h2>3. Chuẩn bị dữ liệu mẫu và quy trình thật</h2>
<p>Developer cần dữ liệu thật để thiết kế đúng. Nếu bạn làm CRM, hãy chuẩn bị danh sách lead mẫu, trạng thái lead, quy trình chăm sóc, người phụ trách và báo cáo mong muốn. Nếu làm app booking, cần ca làm, dịch vụ, giá, thời lượng, chính sách hủy lịch.</p>
<p>Dữ liệu thật giúp tránh tình trạng giao diện nhìn đẹp nhưng không dùng được trong vận hành.</p>
<h2>4. Thống nhất tiêu chí nghiệm thu</h2>
<p>Tiêu chí nghiệm thu nên rõ trước khi bắt đầu. Ví dụ:</p>
<ul><li>form liên hệ gửi email thành công</li><li>admin tạo/sửa/xóa bài viết được</li><li>website đạt tốc độ tải tốt trên mobile</li><li>khách đặt lịch và admin nhận thông báo</li><li>dữ liệu được backup định kỳ</li></ul>
<p>Khi tiêu chí rõ, cả hai bên dễ làm việc hơn và ít tranh luận cảm tính.</p>
<h2>5. Hỏi về bảo trì sau bàn giao</h2>
<p>Một sản phẩm số không kết thúc ở ngày bàn giao. Bạn cần hỏi rõ: ai deploy, ai giữ tài khoản cloud/domain, lỗi production xử lý thế nào, có tài liệu hướng dẫn không, có gói bảo trì không.</p>
<p>Chi phí rẻ ban đầu nhưng không có bảo trì có thể đắt hơn rất nhiều khi website lỗi đúng lúc chạy chiến dịch.</p>
<h2>Kết luận</h2>
<p>Thuê dev tốt không chỉ là tìm người code giỏi. Đó là tìm người giúp bạn làm rõ bài toán, giữ scope thực tế và xây hệ thống có thể vận hành lâu dài. Chuẩn bị càng rõ, tiền bỏ ra càng đi vào giá trị thật.</p>`,
      coverUrl: "/images/blog/thue-lap-trinh-vien-lam-website-app.webp",
      coverAlt:
        "Bàn làm việc với checklist thuê lập trình viên làm website app và dashboard scope dự án",
      tags: JSON.stringify(["Thuê Developer", "Website", "App", "Startup"]),
      categoryId: product?.id,
      readTime: "8 phút đọc",
    },
    {
      slug: "chi-phi-thiet-ke-website-da-nang",
      title: "Chi phí thiết kế website chuyên nghiệp tại Đà Nẵng gồm những gì?",
      excerpt:
        "Phân tích các hạng mục tạo nên chi phí website: UX/UI, frontend, backend, CMS, SEO, hosting, bảo trì và những phần không nên cắt giảm.",
      content: `<h2>Vì sao báo giá website chênh lệch rất lớn?</h2>
<p>Khi tìm dịch vụ thiết kế website tại Đà Nẵng, bạn có thể thấy mức giá từ vài triệu đến vài chục triệu, thậm chí cao hơn. Sự khác biệt nằm ở phạm vi công việc, mức độ tuỳ biến và trách nhiệm sau khi website lên production.</p>
<p>Một website giới thiệu đơn giản khác hoàn toàn với website có CMS, blog SEO, landing page dịch vụ, form đặt lịch, tích hợp CRM và dashboard quản trị.</p>
<h2>Những hạng mục chính trong chi phí website</h2>
<p>Chi phí chuyên nghiệp thường gồm:</p>
<ul><li>tư vấn cấu trúc nội dung và định vị thương hiệu</li><li>thiết kế UI/UX cho desktop và mobile</li><li>frontend responsive, tối ưu tốc độ</li><li>backend hoặc CMS để quản trị nội dung</li><li>form liên hệ, email notification, chống spam</li><li>SEO kỹ thuật: metadata, sitemap, robots, schema</li><li>triển khai hosting, domain, SSL</li><li>bảo trì, backup và cập nhật sau launch</li></ul>
<p>Nếu báo giá chỉ nói "thiết kế website" mà không tách hạng mục, bạn nên hỏi kỹ để tránh thiếu phần quan trọng.</p>
<h2>Website rẻ thường thiếu gì?</h2>
<p>Website rẻ không phải lúc nào cũng xấu, nhưng thường bị cắt bớt các phần ít thấy bằng mắt:</p>
<ul><li>không có chiến lược nội dung</li><li>giao diện dùng template khó khác biệt</li><li>tốc độ mobile chưa tốt</li><li>thiếu schema và sitemap</li><li>admin khó dùng</li><li>không có tracking chuyển đổi</li><li>không có quy trình backup</li></ul>
<p>Những phần này chỉ lộ vấn đề sau khi bạn chạy quảng cáo, làm SEO hoặc cần cập nhật nội dung thường xuyên.</p>
<h2>Khi nào nên đầu tư nhiều hơn?</h2>
<p>Bạn nên đầu tư website nghiêm túc nếu website là kênh tạo khách hàng chính, cần SEO dài hạn, có nhiều dịch vụ, có blog, có case study hoặc cần kết nối hệ thống khác như CRM, booking, email marketing.</p>
<p>Với thương hiệu cá nhân như Trần Công Tiến, website không chỉ là profile. Nó là trung tâm nhận diện, nơi Google hiểu bạn là ai, bạn làm gì và vì sao khách hàng nên tin.</p>
<h2>Cách tối ưu ngân sách</h2>
<p>Không nhất thiết phải làm tất cả ngay từ đầu. Cách tốt hơn là chia phase:</p>
<ul><li>Phase 1: trang chủ, dịch vụ, giới thiệu, liên hệ, SEO nền</li><li>Phase 2: blog, case study, tài nguyên tải về</li><li>Phase 3: automation, CRM, dashboard nâng cao</li></ul>
<p>Chia phase giúp bạn có website sớm, đo dữ liệu thật và đầu tư tiếp vào phần tạo ra khách hàng.</p>
<h2>Kết luận</h2>
<p>Chi phí website chuyên nghiệp không chỉ mua giao diện đẹp. Bạn đang đầu tư vào hệ thống bán hàng, uy tín thương hiệu và khả năng tăng trưởng dài hạn trên Google.</p>`,
      coverUrl: "/images/blog/chi-phi-thiet-ke-website-da-nang.webp",
      coverAlt:
        "Workspace thiết kế website chuyên nghiệp tại Đà Nẵng với mockup landing page và bảng chi phí",
      tags: JSON.stringify(["Thiết kế website", "Đà Nẵng", "SEO", "Chi phí"]),
      categoryId: product?.id,
      readTime: "8 phút đọc",
    },
    {
      slug: "tu-y-tuong-den-san-pham-app-launch",
      title: "Từ ý tưởng đến sản phẩm: quy trình biến một app thành bản launch đầu tiên",
      excerpt:
        "Quy trình thực tế để đi từ ý tưởng mơ hồ đến app có thể launch: discovery, flow, prototype, backend, QA và iteration sau phát hành.",
      content: `<h2>Ý tưởng tốt cần được biến thành hệ thống rõ ràng</h2>
<p>Nhiều founder bắt đầu bằng một ý tưởng hay, nhưng ý tưởng chưa phải sản phẩm. Sản phẩm cần có người dùng cụ thể, luồng thao tác rõ, dữ liệu vận hành, giao diện dễ hiểu và backend đủ ổn định.</p>
<p>Quy trình đúng giúp giảm cảm tính. Thay vì hỏi "app này có hay không", ta hỏi "người dùng nào sẽ mở app, họ làm gì trong 3 phút đầu và kết quả họ nhận được là gì".</p>
<h2>Bước 1: Làm rõ bài toán</h2>
<p>Trước khi thiết kế màn hình, cần viết ra vấn đề. Người dùng đang làm việc đó bằng cách nào? Cách cũ tốn thời gian ở đâu? Nếu có app, chỉ số nào sẽ tốt hơn: tiết kiệm thời gian, tăng booking, giảm lỗi nhập liệu hay tăng tỷ lệ chốt lead?</p>
<p>Một bài toán rõ giúp toàn bộ team quyết định nhanh hơn khi phải chọn giữa hai tính năng.</p>
<h2>Bước 2: Vẽ user flow</h2>
<p>User flow là đường đi của người dùng. Với app đặt lịch, flow có thể là: chọn dịch vụ, chọn nhân sự, chọn giờ, nhập thông tin, xác nhận, nhận nhắc lịch. Với app CRM, flow có thể là: tạo lead, gán người phụ trách, cập nhật trạng thái, ghi chú, xem báo cáo.</p>
<p>Flow tốt giúp phát hiện thiếu sót trước khi code.</p>
<h2>Bước 3: Prototype trước khi build</h2>
<p>Prototype không cần hoàn hảo, nhưng cần đủ để click thử. Đây là lúc kiểm tra layout, thứ tự thông tin, trạng thái rỗng, lỗi và loading. Nếu người dùng thử prototype mà không hiểu bước tiếp theo, code sớm chỉ làm vấn đề tốn tiền hơn.</p>
<h2>Bước 4: Build theo module có ưu tiên</h2>
<p>Khi bắt đầu phát triển, hãy build module lõi trước. Auth, dữ liệu chính, dashboard admin, notification và deploy pipeline nên được làm chắc. Những phần như animation, filter nâng cao, export báo cáo có thể làm sau nếu chưa ảnh hưởng đến giá trị chính.</p>
<h2>Bước 5: Launch nhỏ, đo thật</h2>
<p>Launch đầu tiên nên phục vụ một nhóm người dùng giới hạn. Mục tiêu là học nhanh: họ có hoàn thành tác vụ không, kẹt ở đâu, tính năng nào không ai dùng, dữ liệu nào admin cần thêm.</p>
<p>Sau launch, roadmap nên dựa trên dữ liệu và phản hồi thật chứ không chỉ dựa vào cảm giác.</p>
<h2>Kết luận</h2>
<p>Biến ý tưởng thành app không phải là nhảy ngay vào code. Đó là quá trình chuyển bài toán thành flow, flow thành giao diện, giao diện thành hệ thống và hệ thống thành dữ liệu tăng trưởng.</p>`,
      coverUrl: "/images/blog/tu-y-tuong-den-san-pham-app-launch.webp",
      coverAlt:
        "Quy trình từ ý tưởng app đến prototype backend và launch sản phẩm đầu tiên",
      tags: JSON.stringify(["App Design", "Product", "Launch", "Startup"]),
      categoryId: product?.id,
      readTime: "8 phút đọc",
    },
    {
      slug: "ai-agent-cho-doanh-nghiep-nho",
      title: "AI Agent cho doanh nghiệp nhỏ: bắt đầu từ workflow, không phải model",
      excerpt:
        "Muốn AI Agent tạo giá trị thật, hãy bắt đầu từ quy trình lặp lại: chăm sóc lead, tìm tài liệu, tạo báo giá, hỗ trợ vận hành và kiểm duyệt.",
      content: `<h2>AI Agent không bắt đầu bằng câu hỏi dùng model nào</h2>
<p>Model quan trọng, nhưng không phải điểm bắt đầu. Với doanh nghiệp nhỏ, AI Agent chỉ đáng đầu tư khi nó giúp một workflow cụ thể nhanh hơn, ít lỗi hơn hoặc phục vụ khách hàng tốt hơn.</p>
<p>Nếu bắt đầu bằng model, bạn dễ tạo ra demo hay nhưng khó vận hành. Nếu bắt đầu bằng workflow, bạn sẽ biết AI cần đọc dữ liệu nào, gọi công cụ nào, khi nào cần người duyệt và đo hiệu quả ra sao.</p>
<h2>Chọn workflow có giá trị cao</h2>
<p>Workflow phù hợp để làm AI Agent thường có ba đặc điểm: lặp lại nhiều, có dữ liệu đầu vào rõ và có tiêu chí đúng/sai tương đối cụ thể.</p>
<p>Ví dụ:</p>
<ul><li>phân loại lead từ form website</li><li>soạn phản hồi khách hàng theo kịch bản</li><li>tìm kiếm tài liệu nội bộ</li><li>tạo báo giá nháp</li><li>tóm tắt cuộc họp</li><li>nhắc việc cho sales hoặc vận hành</li></ul>
<p>Đừng chọn workflow quá mơ hồ như "AI thay nhân viên tư vấn toàn bộ". Hãy bắt đầu bằng một tác vụ nhỏ nhưng lặp lại mỗi ngày.</p>
<h2>Dữ liệu và công cụ là phần lõi</h2>
<p>Một AI Agent tốt cần biết lấy dữ liệu ở đâu và hành động qua công cụ nào. Có thể là CRM, Google Sheet, database, email, Zalo, website CMS hoặc kho tài liệu nội bộ.</p>
<p>Ngoài ra cần logging để biết agent đã làm gì, dùng nguồn nào, kết quả ra sao. Không có log thì rất khó debug và cải thiện.</p>
<h2>Guardrails và human review</h2>
<p>Doanh nghiệp không nên để AI tự quyết mọi thứ ngay từ đầu. Những hành động có rủi ro như gửi báo giá, đổi trạng thái đơn hàng, cập nhật dữ liệu khách hàng nên có bước duyệt.</p>
<p>Guardrails gồm:</p>
<ul><li>giới hạn dữ liệu được truy cập</li><li>format câu trả lời</li><li>quy tắc không bịa thông tin</li><li>chuyển cho người thật khi thiếu dữ liệu</li><li>ghi lại toàn bộ hành động quan trọng</li></ul>
<h2>Đo hiệu quả AI Agent</h2>
<p>Các chỉ số nên theo dõi:</p>
<ul><li>thời gian tiết kiệm mỗi tác vụ</li><li>tỷ lệ hoàn thành không cần can thiệp</li><li>tỷ lệ câu trả lời cần sửa</li><li>số lead được xử lý nhanh hơn</li><li>chi phí vận hành mỗi tháng</li></ul>
<p>Nếu agent không cải thiện workflow, đó chỉ là tính năng trang trí.</p>
<h2>Kết luận</h2>
<p>AI Agent có thể rất mạnh cho doanh nghiệp nhỏ nếu bắt đầu đúng. Hãy chọn một workflow cụ thể, kết nối dữ liệu thật, đặt guardrails rõ và đo hiệu quả bằng con số.</p>`,
      coverUrl: "/images/blog/ai-agent-cho-doanh-nghiep-nho.webp",
      coverAlt:
        "Workflow AI Agent cho doanh nghiệp nhỏ kết nối CRM chat tài liệu và human review",
      tags: JSON.stringify(["AI Agent", "Automation", "Workflow", "CRM"]),
      categoryId: ai?.id,
      readTime: "9 phút đọc",
    },
    {
      slug: "chon-web-app-mobile-app-hay-landing-page",
      title: "Khi nào startup nên chọn web app, mobile app hay landing page trước?",
      excerpt:
        "Một khung ra quyết định giúp founder chọn đúng kênh đầu tiên: landing page để test nhu cầu, web app để vận hành nhanh, mobile app khi hành vi dùng lặp lại.",
      content: `<h2>Chọn sai nền tảng có thể làm startup chậm vài tháng</h2>
<p>Không phải ý tưởng nào cũng cần mobile app ngay. Cũng không phải sản phẩm nào chỉ cần landing page. Nền tảng đầu tiên nên phục vụ mục tiêu học nhanh nhất từ thị trường với chi phí hợp lý nhất.</p>
<p>Quyết định đúng giúp bạn launch sớm, đo nhu cầu thật và tránh build một hệ thống quá nặng khi chưa có bằng chứng.</p>
<h2>Khi nào nên bắt đầu bằng landing page</h2>
<p>Landing page phù hợp khi bạn cần kiểm tra nhu cầu, thu lead, chạy quảng cáo hoặc giải thích một dịch vụ mới. Nếu sản phẩm chưa cần người dùng đăng nhập và thao tác phức tạp, landing page là lựa chọn nhanh nhất.</p>
<p>Landing page tốt nên có:</p>
<ul><li>lời hứa giá trị rõ</li><li>vấn đề khách hàng đang gặp</li><li>cách bạn giải quyết</li><li>bằng chứng hoặc case study</li><li>form liên hệ/đặt lịch</li><li>tracking chuyển đổi</li></ul>
<h2>Khi nào nên chọn web app</h2>
<p>Web app phù hợp khi sản phẩm cần đăng nhập, quản trị dữ liệu, dashboard, báo cáo, phân quyền hoặc workflow nội bộ. Web app có lợi thế là deploy nhanh, dùng được trên nhiều thiết bị và dễ cập nhật.</p>
<p>Các sản phẩm như CRM, booking, dashboard quản lý, portal khách hàng, hệ thống nội bộ thường nên bắt đầu bằng web app.</p>
<h2>Khi nào mobile app là lựa chọn đúng</h2>
<p>Mobile app đáng làm khi hành vi dùng thường xuyên, cần push notification, camera, GPS, offline hoặc trải nghiệm mobile-native. Ví dụ app đặt dịch vụ lặp lại, app cộng đồng, marketplace mobile-first hoặc công cụ nhân viên dùng ngoài hiện trường.</p>
<p>Nếu người dùng chỉ dùng một lần để gửi form, mobile app thường là quá nặng.</p>
<h2>Một hướng thực tế: đi theo phase</h2>
<p>Nhiều dự án nên đi theo thứ tự: Landing page để test nhu cầu → web app để vận hành → mobile app khi đã có retention.</p>
<p>Cách này giúp founder không đốt ngân sách vào app trước khi biết người dùng có thật sự cần sản phẩm hay không.</p>
<h2>Kết luận</h2>
<p>Nền tảng tốt nhất không phải nền tảng hoành tráng nhất. Đó là nền tảng giúp bạn kiểm chứng giả định nhanh nhất, phục vụ người dùng đúng nhất và mở đường cho phase tiếp theo.</p>`,
      coverUrl: "/images/blog/chon-web-app-mobile-app-hay-landing-page.webp",
      coverAlt:
        "Ba lựa chọn web app mobile app landing page cho startup với decision tree sản phẩm",
      tags: JSON.stringify(["Web App", "Mobile App", "Landing Page", "Startup"]),
      categoryId: product?.id,
      readTime: "7 phút đọc",
    },
    {
      slug: "case-study-he-thong-booking-online-admin-dashboard",
      title: "Case study: cách xây một hệ thống booking online có admin dashboard",
      excerpt:
        "Phân tích cấu trúc một booking system thực tế: luồng đặt lịch, calendar, nhân sự, thông báo, dashboard doanh thu và những edge case cần xử lý.",
      content: `<h2>Bài toán của booking online</h2>
<p>Nhiều spa, clinic, studio hoặc dịch vụ tư vấn vẫn nhận lịch qua Zalo, điện thoại và ghi chú thủ công. Cách này chạy được khi ít lịch, nhưng dễ lỗi khi có nhiều nhân sự, nhiều khung giờ, đổi lịch, hủy lịch và cần báo cáo doanh thu.</p>
<p>Một hệ thống booking tốt không chỉ cho khách đặt lịch. Nó phải giúp admin vận hành dễ hơn.</p>
<h2>Luồng khách hàng</h2>
<p>Luồng cơ bản nên thật ngắn:</p>
<ol><li>chọn dịch vụ</li><li>chọn ngày giờ</li><li>nhập thông tin</li><li>xác nhận</li><li>nhận thông báo</li></ol>
<p>Nếu có nhiều nhân sự, hệ thống cần kiểm tra availability theo từng người. Nếu dịch vụ có thời lượng khác nhau, calendar phải chặn đúng khoảng thời gian.</p>
<h2>Dashboard admin</h2>
<p>Admin dashboard là trung tâm vận hành. Các phần cần có:</p>
<ul><li>danh sách booking theo ngày/tuần/tháng</li><li>trạng thái: mới, xác nhận, hoàn thành, hủy</li><li>bộ lọc theo nhân sự, dịch vụ, chi nhánh</li><li>thông tin khách hàng</li><li>ghi chú nội bộ</li><li>doanh thu dự kiến và thực tế</li></ul>
<p>Dashboard tốt giúp admin xử lý lịch trong vài giây thay vì lục lại tin nhắn.</p>
<h2>Thông báo và nhắc lịch</h2>
<p>Booking system nên có email hoặc SMS/Zalo reminder tuỳ ngân sách. Nhắc lịch giúp giảm tỷ lệ khách quên. Với dịch vụ có đặt cọc, hệ thống có thể tích hợp thanh toán để giảm no-show.</p>
<p>Quan trọng là mọi thông báo phải có log. Khi khách nói chưa nhận được tin, admin có thể kiểm tra trạng thái gửi.</p>
<h2>Edge case thường bị quên</h2>
<p>Những case cần nghĩ trước:</p>
<ul><li>hai khách chọn cùng slot cùng lúc</li><li>nhân sự nghỉ đột xuất</li><li>khách đổi lịch nhiều lần</li><li>dịch vụ kéo dài qua giờ nghỉ</li><li>admin tạo booking thủ công</li><li>timezone nếu có khách quốc tế</li><li>hoàn tiền hoặc hủy cọc</li></ul>
<p>Edge case không xử lý sớm sẽ làm hệ thống đẹp nhưng khó dùng thật.</p>
<h2>Kiến trúc gợi ý</h2>
<p>Với MVP, có thể dùng Next.js cho frontend/admin, database quan hệ cho lịch và booking, background job cho reminder, email/SMS provider cho thông báo. Phần quan trọng nhất là transaction khi giữ slot để tránh trùng lịch.</p>
<h2>Kết luận</h2>
<p>Một booking online tốt là sự kết hợp giữa UX đơn giản cho khách và dashboard chắc cho admin. Khi hai phần này khớp nhau, doanh nghiệp giảm thao tác thủ công và có dữ liệu để tối ưu vận hành.</p>`,
      coverUrl: "/images/blog/case-study-he-thong-booking-online-admin-dashboard.webp",
      coverAlt:
        "Hệ thống booking online với calendar admin dashboard và luồng đặt lịch trên điện thoại",
      tags: JSON.stringify(["Booking System", "Dashboard", "Case Study", "SaaS"]),
      categoryId: arch?.id,
      readTime: "9 phút đọc",
    },
    {
      slug: "dashboard-quan-tri-ra-quyet-dinh",
      title: "Dashboard quản trị tốt cần có gì để chủ doanh nghiệp ra quyết định nhanh hơn?",
      excerpt:
        "Dashboard không chỉ là biểu đồ đẹp. Nó cần KPI đúng, filter hữu ích, dữ liệu đáng tin và hành động tiếp theo rõ ràng.",
      content: `<h2>Dashboard tốt phải trả lời câu hỏi kinh doanh</h2>
<p>Nhiều dashboard thất bại vì hiển thị quá nhiều số nhưng không giúp ra quyết định. Chủ doanh nghiệp không cần thêm biểu đồ cho đẹp. Họ cần biết chuyện gì đang diễn ra, chỗ nào cần xử lý và hành động tiếp theo là gì.</p>
<p>Một dashboard tốt bắt đầu từ câu hỏi: mỗi sáng mở hệ thống, người quản lý cần biết điều gì để điều hành tốt hơn?</p>
<h2>Chọn KPI đúng</h2>
<p>KPI nên gắn với mục tiêu kinh doanh. Với sales, đó có thể là số lead mới, tỷ lệ chốt, doanh thu theo nguồn, thời gian phản hồi. Với booking, đó là số lịch hôm nay, tỷ lệ hủy, nhân sự đang quá tải, doanh thu theo dịch vụ.</p>
<p>Đừng đưa tất cả dữ liệu lên màn hình đầu tiên. Hãy chọn 5-7 chỉ số thật sự quan trọng.</p>
<h2>Filter và drill-down</h2>
<p>Dashboard cần cho phép lọc theo thời gian, trạng thái, nhân sự, nguồn khách, chi nhánh hoặc danh mục. Sau khi thấy số liệu tổng quan, người dùng cần đi sâu để biết nguyên nhân.</p>
<p>Ví dụ doanh thu giảm không đủ. Cần biết giảm ở chi nhánh nào, dịch vụ nào, nguồn khách nào và từ ngày nào.</p>
<h2>Dữ liệu phải đáng tin</h2>
<p>Dashboard đẹp nhưng dữ liệu sai sẽ làm mất niềm tin rất nhanh. Cần thống nhất định nghĩa chỉ số: "doanh thu" là đã thanh toán hay đơn tạo mới? "lead mới" tính từ form website hay cả nhập tay? "booking hoàn thành" do ai cập nhật?</p>
<p>Định nghĩa rõ giúp cả team nhìn cùng một sự thật.</p>
<h2>Hành động ngay trong dashboard</h2>
<p>Dashboard mạnh hơn khi không chỉ xem mà còn hành động. Ví dụ:</p>
<ul><li>gọi lại lead chưa phản hồi</li><li>xác nhận booking mới</li><li>đổi trạng thái đơn hàng</li><li>xuất báo cáo</li><li>gán nhân sự phụ trách</li></ul>
<p>Khi hành động nằm gần dữ liệu, tốc độ vận hành tăng đáng kể.</p>
<h2>Kết luận</h2>
<p>Dashboard quản trị tốt không phải là nơi khoe nhiều chart. Nó là công cụ giúp doanh nghiệp nhìn đúng vấn đề, ra quyết định nhanh và vận hành nhất quán hơn mỗi ngày.</p>`,
      coverUrl: "/images/blog/dashboard-quan-tri-ra-quyet-dinh.webp",
      coverAlt:
        "Dashboard quản trị với KPI chart bộ lọc CRM table và insight panel cho chủ doanh nghiệp",
      tags: JSON.stringify(["Dashboard", "CRM", "Analytics", "SaaS"]),
      categoryId: frontend?.id,
      readTime: "7 phút đọc",
    },
    {
      slug: "thiet-ke-ui-ux-truoc-khi-code",
      title: "Thiết kế UI/UX trước khi code: vì sao wireframe giúp tiết kiệm 30-50% thời gian?",
      excerpt:
        "Wireframe, user flow và trạng thái màn hình giúp team phát hiện vấn đề sớm, giảm sửa đi sửa lại trong giai đoạn code.",
      content: `<h2>Code sớm chưa chắc nhanh</h2>
<p>Nhiều dự án muốn tiết kiệm thời gian nên bỏ qua wireframe và nhảy thẳng vào code. Lúc đầu có vẻ nhanh, nhưng khi khách hàng xem bản chạy thử rồi muốn đổi flow, đổi layout, thêm trạng thái hoặc sửa logic, chi phí sửa trong code cao hơn nhiều so với sửa trong thiết kế.</p>
<p>UI/UX trước khi code không phải để làm màu. Nó là cách giảm rủi ro.</p>
<h2>Wireframe giúp nhìn thấy luồng sản phẩm</h2>
<p>Wireframe cho thấy người dùng đi từ đâu đến đâu, màn hình nào cần thông tin gì và hành động chính nằm ở đâu. Ở mức wireframe, mọi người có thể góp ý nhanh mà chưa bị phân tâm bởi màu sắc hay hiệu ứng.</p>
<p>Nếu flow sai, sửa wireframe chỉ mất vài phút. Nếu flow sai sau khi backend/frontend đã xong, sửa có thể kéo theo database, API và QA.</p>
<h2>Những trạng thái thường bị quên</h2>
<p>Một màn hình sản phẩm không chỉ có trạng thái lý tưởng. Cần thiết kế:</p>
<ul><li>empty state khi chưa có dữ liệu</li><li>loading state khi đang tải</li><li>error state khi lỗi</li><li>permission state khi không đủ quyền</li><li>success state sau khi hoàn thành</li><li>edge case khi dữ liệu quá dài hoặc quá nhiều</li></ul>
<p>Những trạng thái này quyết định app có dùng được trong thực tế hay không.</p>
<h2>Design system nhỏ giúp dev nhanh hơn</h2>
<p>Không cần design system quá lớn cho MVP, nhưng cần thống nhất button, input, card, modal, table, màu trạng thái và spacing. Khi component rõ, frontend ít phải đoán và sản phẩm nhất quán hơn.</p>
<p>Với dashboard, sự nhất quán còn quan trọng hơn vì người dùng sẽ thao tác lặp lại mỗi ngày.</p>
<h2>Tiết kiệm thời gian ở đâu?</h2>
<p>Wireframe giúp tiết kiệm thời gian ở ba điểm:</p>
<ul><li>giảm số lần đổi hướng khi code</li><li>giảm hiểu nhầm giữa khách hàng và developer</li><li>giúp chia task rõ hơn cho frontend/backend</li></ul>
<p>Con số 30-50% không đến từ việc thiết kế nhanh hơn code, mà từ việc tránh sửa sai sau khi đã build quá sâu.</p>
<h2>Kết luận</h2>
<p>Thiết kế trước khi code là khoản đầu tư nhỏ để giảm chi phí lớn. Với web/app nghiêm túc, flow và wireframe rõ là nền tảng cho tốc độ, chất lượng và trải nghiệm người dùng.</p>`,
      coverUrl: "/images/blog/thiet-ke-ui-ux-truoc-khi-code.webp",
      coverAlt:
        "Wireframe UI UX prototype và component library trước khi code sản phẩm web app",
      tags: JSON.stringify(["UI/UX", "Wireframe", "App Design", "Frontend"]),
      categoryId: frontend?.id,
      readTime: "8 phút đọc",
    },
    {
      slug: "tran-cong-tien-la-ai",
      title: "Trần Công Tiến là ai? Hành trình làm Full-stack Developer, App & AI Agent Builder",
      excerpt:
        "Bài viết định vị thương hiệu cá nhân Trần Công Tiến: cách tôi kết hợp tư duy sản phẩm, full-stack, app design và AI Agent để đồng hành cùng startup/doanh nghiệp.",
      content: `<h2>Tôi là Trần Công Tiến</h2>
<p>Tôi là Full-stack Developer và AI Agent Builder tại Đà Nẵng, tập trung vào việc giúp startup và doanh nghiệp biến ý tưởng thành sản phẩm số có thể vận hành thật.</p>
<p>Với tôi, code chỉ là một phần của sản phẩm. Một hệ thống tốt cần bắt đầu từ bài toán đúng, người dùng rõ, quy trình vận hành thực tế và khả năng đo lường sau khi launch.</p>
<h2>Vì sao tôi chọn hướng full-stack</h2>
<p>Full-stack cho tôi góc nhìn toàn diện: từ giao diện người dùng, backend, database, dashboard admin, deploy, SEO đến vận hành production. Khi hiểu toàn bộ dòng chảy, tôi có thể đưa ra quyết định tốt hơn cho sản phẩm thay vì chỉ tối ưu một lớp kỹ thuật.</p>
<p>Điều này đặc biệt quan trọng với startup và doanh nghiệp nhỏ, nơi tốc độ, ngân sách và tính thực dụng luôn phải cân bằng.</p>
<h2>Cách tôi làm sản phẩm</h2>
<p>Tôi thường bắt đầu bằng discovery: khách hàng đang gặp vấn đề gì, quy trình hiện tại ra sao, người dùng nào quan trọng nhất và version đầu tiên cần chứng minh điều gì.</p>
<p>Sau đó tôi chuyển bài toán thành flow, wireframe, kiến trúc kỹ thuật và roadmap theo phase. Mục tiêu là ship nhanh nhưng không tạo ra một hệ thống khó bảo trì sau vài tháng.</p>
<h2>Tôi làm những nhóm giải pháp nào?</h2>
<p>Các nhóm công việc tôi tập trung gồm:</p>
<ul><li>website thương hiệu và landing page có SEO</li><li>web app và admin dashboard</li><li>mobile app cho sản phẩm có hành vi dùng lặp lại</li><li>hệ thống booking, CRM, marketplace, portal nội bộ</li><li>AI Agent và automation cho workflow doanh nghiệp</li><li>tối ưu sản phẩm sau launch</li></ul>
<p>Điểm chung là tất cả đều hướng đến giá trị vận hành, không chỉ giao diện đẹp.</p>
<h2>AI Agent trong hướng đi của tôi</h2>
<p>Tôi tin AI Agent sẽ trở thành một lớp vận hành mới cho doanh nghiệp. Nhưng AI chỉ hữu ích khi gắn với workflow thật: chăm sóc lead, tìm tài liệu, tạo báo giá, nhắc việc, tổng hợp báo cáo hoặc hỗ trợ khách hàng.</p>
<p>Vì vậy, khi xây AI Agent, tôi ưu tiên dữ liệu, công cụ, guardrails và human review hơn là chạy theo demo hào nhoáng.</p>
<h2>Điều tôi muốn xây dựng với trancongtien.com</h2>
<p>Website trancongtien.com là nơi tôi hệ thống hóa kinh nghiệm, case study, quy trình làm việc và các góc nhìn thực tế về phát triển sản phẩm số.</p>
<p>Nếu bạn đang có ý tưởng web/app, cần xây MVP, cần dashboard quản trị hoặc muốn ứng dụng AI Agent vào quy trình, đây là nơi bạn có thể hiểu cách tôi suy nghĩ và làm việc trước khi chúng ta bắt đầu trao đổi.</p>
<h2>Kết luận</h2>
<p>Trần Công Tiến không chỉ là một cái tên trên portfolio. Đó là định vị tôi muốn xây dựng: một người đồng hành kỹ thuật có tư duy sản phẩm, giúp ý tưởng trở thành hệ thống có thể dùng, đo và phát triển lâu dài.</p>`,
      coverUrl: "/images/blog/tran-cong-tien-la-ai-fullstack-ai-agent-builder.webp",
      coverAlt:
        "Không gian làm việc của Trần Công Tiến với web app AI Agent code và sản phẩm số",
      tags: JSON.stringify([
        "Trần Công Tiến",
        "Tran Cong Tien",
        "Full-stack Developer",
        "AI Agent",
      ]),
      categoryId: product?.id,
      readTime: "7 phút đọc",
    },
  ];

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: { ...p, status: ContentStatus.PUBLISHED, authorId: admin.id },
      create: {
        ...p,
        status: ContentStatus.PUBLISHED,
        authorId: admin.id,
        publishedAt: new Date(),
      },
    });
  }

  const projects = [
    {
      slug: "fashion-move",
      title: "Fashion Move",
      category: "Marketplace",
      description:
        "Marketplace thời trang đa nền tảng cho seller đăng sản phẩm, chat realtime và quản lý đơn hàng.",
      content: caseStudyHtml({
        problem:
          "Seller cần một kênh bán hàng mobile-first, buyer cần trải nghiệm tìm kiếm và trao đổi nhanh.",
        solution:
          "Xây app Flutter, API NestJS, dashboard seller và realtime chat bằng Socket.io.",
        result:
          "Luồng đăng sản phẩm, chat và checkout được gom vào một trải nghiệm mượt trên mobile.",
      }),
      coverUrl: "/images/illustrations/projects-hero-devices.png",
      coverAlt:
        "Mockup marketplace thời trang Fashion Move trên mobile và dashboard web",
      features: JSON.stringify([
        "Seller dashboard",
        "Realtime chat",
        "Payment gateway",
        "Recommendation",
      ]),
      stack: JSON.stringify([
        "Flutter",
        "NestJS",
        "PostgreSQL",
        "AWS S3",
        "Socket.io",
      ]),
      role: "Full-stack Developer",
      timeframe: "03/2024 – 08/2024",
      platform: "iOS, Android, Web",
      tone: "bg-violet-50",
      sortOrder: 1,
    },
    {
      slug: "smart-booking",
      title: "Smart Booking System",
      category: "Booking",
      description:
        "Web app đặt lịch cho spa/clinic với quản lý nhân sự, nhắc lịch tự động và dashboard doanh thu.",
      content: caseStudyHtml({
        problem:
          "Dịch vụ có nhiều nhân sự, nhiều khung giờ và tỷ lệ khách quên lịch cao.",
        solution:
          "Xây booking flow, calendar multi-staff, email/SMS reminder và thanh toán online.",
        result:
          "Admin theo dõi lịch theo ngày, giảm thao tác thủ công và dễ mở rộng chi nhánh.",
      }),
      coverUrl: "/images/illustrations/services-devices.png",
      coverAlt:
        "Giao diện web app đặt lịch Smart Booking với calendar và dashboard doanh thu",
      features: JSON.stringify([
        "Calendar multi-staff",
        "SMS/Email reminders",
        "Stripe",
        "Analytics",
      ]),
      stack: JSON.stringify([
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Stripe",
        "Redis",
      ]),
      role: "Full Stack Developer",
      timeframe: "11/2023 – 02/2024",
      platform: "Web",
      tone: "bg-orange-50",
      sortOrder: 2,
    },
    {
      slug: "sales-crm",
      title: "Sales CRM Dashboard",
      category: "CRM / SaaS",
      description:
        "Dashboard CRM cho đội sales quản lý lead, pipeline, KPI và lịch sử chăm sóc khách hàng.",
      content: caseStudyHtml({
        problem:
          "Sales team cần nhìn rõ trạng thái lead và ưu tiên follow-up mỗi ngày.",
        solution: "Xây Kanban pipeline, KPI chart, RBAC và activity timeline.",
        result:
          "Quản lý có dashboard tổng quan, nhân viên có checklist lead cần xử lý.",
      }),
      coverUrl: "/images/illustrations/blog-hero-desk.png",
      coverAlt:
        "Dashboard Sales CRM hiển thị pipeline lead KPI và lịch sử chăm sóc khách hàng",
      features: JSON.stringify([
        "Kanban pipeline",
        "KPI charts",
        "RBAC",
        "Activity timeline",
      ]),
      stack: JSON.stringify(["React", "Node.js", "MongoDB", "Chart.js", "AWS"]),
      role: "Full Stack Developer",
      timeframe: "06/2023 – 10/2023",
      platform: "Web",
      tone: "bg-slate-900",
      sortOrder: 3,
    },
    {
      slug: "photo-booth",
      title: "Photo Booth App",
      category: "Mobile App",
      description:
        "Ứng dụng mobile chụp ảnh sự kiện, áp filter, lưu offline và in Bluetooth ngay tại booth.",
      content: caseStudyHtml({
        problem:
          "Sự kiện cần app chạy ổn định dù mạng yếu và in ảnh nhanh cho khách.",
        solution:
          "Xây app Flutter offline-first, lưu local, quản lý event pack và kết nối Bluetooth printer.",
        result:
          "Booth vận hành độc lập, ảnh được xử lý và in ngay tại điểm check-in.",
      }),
      coverUrl: "/images/illustrations/about-outdoors.png",
      coverAlt:
        "Ứng dụng Photo Booth mobile chụp ảnh sự kiện và in Bluetooth tại booth",
      features: JSON.stringify([
        "Camera filters",
        "Bluetooth printing",
        "Offline mode",
        "Event packs",
      ]),
      stack: JSON.stringify(["Flutter", "Dart", "Bluetooth", "Hive", "Provider"]),
      role: "Mobile Developer",
      timeframe: "01/2023 – 04/2023",
      platform: "Android, iOS",
      tone: "bg-rose-50",
      sortOrder: 4,
    },
    {
      slug: "ai-search",
      title: "AI Search Engine",
      category: "AI Agent",
      description:
        "AI Agent tìm kiếm tài liệu nội bộ bằng vector search, trả lời theo nguồn và hỗ trợ đội vận hành.",
      content: caseStudyHtml({
        problem:
          "Tài liệu nội bộ rải rác khiến nhân sự mất thời gian tìm quy trình và câu trả lời.",
        solution:
          "Xây ingestion pipeline, embedding, vector search và API trả lời có trích nguồn.",
        result:
          "Nhân sự có thể hỏi bằng ngôn ngữ tự nhiên và nhận câu trả lời gắn với tài liệu gốc.",
      }),
      coverUrl: "/images/illustrations/process-roadmap.png",
      coverAlt:
        "Sơ đồ AI Search Engine tìm kiếm tài liệu nội bộ bằng vector search",
      features: JSON.stringify([
        "Semantic search",
        "Ingestion pipeline",
        "OpenAI embeddings",
        "Docker deploy",
      ]),
      stack: JSON.stringify(["Python", "FastAPI", "Qdrant", "OpenAI", "Docker"]),
      role: "AI Engineer",
      timeframe: "09/2024 – 12/2024",
      platform: "Web",
      tone: "bg-cyan-50",
      sortOrder: 5,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: { ...project, status: ContentStatus.PUBLISHED },
      create: { ...project, status: ContentStatus.PUBLISHED },
    });
  }

  const services = [
    {
      slug: "kham-pha",
      number: "01",
      title: "Khám phá & Tư vấn",
      description: "Làm rõ bài toán, cơ hội và hướng giải pháp phù hợp.",
      items: JSON.stringify([
        "Phân tích yêu cầu",
        "Nghiên cứu thị trường",
        "Value Proposition",
        "Đề xuất kỹ thuật",
        "Ước lượng ngân sách",
      ]),
      color: "bg-violet-50 text-violet-600",
      sortOrder: 1,
    },
    {
      slug: "thiet-ke",
      number: "02",
      title: "Thiết kế UI/UX",
      description: "Wireframe, UI system và prototype xác thực trải nghiệm.",
      items: JSON.stringify([
        "User flow",
        "Wireframe",
        "UI Design",
        "Prototype",
        "Design system",
      ]),
      color: "bg-emerald-50 text-emerald-700",
      sortOrder: 2,
    },
    {
      slug: "phat-trien",
      number: "03",
      title: "Phát triển sản phẩm",
      description: "Web, Mobile và Backend với kiến trúc sạch.",
      items: JSON.stringify([
        "Web App",
        "Mobile App",
        "Backend API",
        "Tích hợp bên thứ ba",
        "Kiến trúc mở rộng",
      ]),
      color: "bg-blue-50 text-blue-600",
      sortOrder: 3,
    },
    {
      slug: "trien-khai",
      number: "04",
      title: "Triển khai & DevOps",
      description: "CI/CD, cloud, monitoring và bảo mật.",
      items: JSON.stringify([
        "CI/CD",
        "Cloud deploy",
        "Monitoring",
        "Bảo mật",
        "Performance",
      ]),
      color: "bg-orange-50 text-orange-700",
      sortOrder: 4,
    },
    {
      slug: "toi-uu",
      number: "05",
      title: "Tối ưu & Phát triển",
      description: "Analytics, iteration và đồng hành dài hạn.",
      items: JSON.stringify([
        "Analytics",
        "A/B testing",
        "Bảo trì",
        "Tối ưu chi phí",
        "Roadmap dài hạn",
      ]),
      color: "bg-pink-50 text-pink-700",
      sortOrder: 5,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: { ...s, status: ContentStatus.PUBLISHED },
      create: { ...s, status: ContentStatus.PUBLISHED },
    });
  }

  const steps = [
    {
      step: "01",
      title: "Khám phá",
      tasks: "Phân tích yêu cầu, nghiên cứu thị trường, phỏng vấn stakeholder.",
      time: "1–2 tuần",
      sortOrder: 1,
    },
    {
      step: "02",
      title: "Lập kế hoạch",
      tasks: "Đề xuất giải pháp, roadmap, ước lượng chi phí & rủi ro.",
      time: "1 tuần",
      sortOrder: 2,
    },
    {
      step: "03",
      title: "Thiết kế",
      tasks: "Wireframe, UI/UX Design, prototype tương tác.",
      time: "2–4 tuần",
      sortOrder: 3,
    },
    {
      step: "04",
      title: "Phát triển",
      tasks: "Frontend/Backend, tích hợp API, kiểm thử liên tục.",
      time: "4–12+ tuần",
      sortOrder: 4,
    },
    {
      step: "05",
      title: "Triển khai",
      tasks: "QA, production deploy, monitoring & bàn giao.",
      time: "1–2 tuần",
      sortOrder: 5,
    },
    {
      step: "06",
      title: "Tối ưu & Phát triển",
      tasks: "Analytics, bảo trì, iteration theo dữ liệu thực tế.",
      time: "Liên tục",
      sortOrder: 6,
    },
  ];

  for (const step of steps) {
    const existing = await prisma.processStep.findFirst({
      where: { step: step.step },
    });
    if (existing) {
      await prisma.processStep.update({
        where: { id: existing.id },
        data: { ...step, status: ContentStatus.PUBLISHED },
      });
    } else {
      await prisma.processStep.create({
        data: { ...step, status: ContentStatus.PUBLISHED },
      });
    }
  }

  const testimonials = [
    {
      quote:
        "Tiến giúp team làm rõ bài toán sản phẩm trước khi build. Fashion Move ra mắt đúng hạn.",
      name: "Nguyễn Minh Anh",
      role: "CEO, Fashion Move",
      sortOrder: 1,
    },
    {
      quote:
        "Quy trình rõ ràng, cập nhật minh bạch. Hệ thống booking ổn định ngay tuần đầu.",
      name: "Trần Hoàng Long",
      role: "Founder, ClinicBook",
      sortOrder: 2,
    },
    {
      quote:
        "CRM giúp sales tăng tốc theo dõi lead. Tư duy sản phẩm và kỹ thuật vững.",
      name: "Lê Thu Hà",
      role: "Head of Sales, GrowthOps",
      sortOrder: 3,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: t.name },
    });
    if (!existing) {
      await prisma.testimonial.create({
        data: { ...t, status: ContentStatus.PUBLISHED },
      });
    }
  }

  const resources = [
    {
      slug: "prd-template",
      title: "PRD Template",
      category: "Mẫu tài liệu",
      description: "Mẫu Product Requirements Document cho discovery và kickoff.",
      meta: "DOCX · 12 trang",
      free: true,
    },
    {
      slug: "product-ui-kit",
      title: "Product UI Kit",
      category: "UI Kit",
      description: "Bộ component Figma chuẩn SaaS cho web dashboard.",
      meta: "FIGMA · 80+ components",
      free: true,
    },
    {
      slug: "estimate-sheet",
      title: "Project Estimate Sheet",
      category: "Mẫu tài liệu",
      description: "Bảng ước lượng effort, rủi ro và chi phí.",
      meta: "XLSX · 4 sheet",
      free: true,
    },
  ];

  for (const r of resources) {
    await prisma.resource.upsert({
      where: { slug: r.slug },
      update: { ...r, status: ContentStatus.PUBLISHED },
      create: { ...r, status: ContentStatus.PUBLISHED },
    });
  }

  const faqs = [
    {
      question: "Thời gian triển khai một dự án trung bình là bao lâu?",
      answer:
        "MVP thường mất 6–12 tuần tùy phạm vi. Dự án phức tạp hơn có thể kéo dài 4–6 tháng với các cột mốc bàn giao rõ ràng theo sprint.",
      sortOrder: 1,
    },
    {
      question: "Chi phí tư vấn ban đầu như thế nào?",
      answer:
        "Buổi tư vấn khám phá 30 phút đầu tiên hoàn toàn miễn phí để làm rõ bài toán, hướng tiếp cận và ước lượng sơ bộ.",
      sortOrder: 2,
    },
    {
      question: "Có hỗ trợ bảo trì sau khi bàn giao không?",
      answer:
        "Có. Có thể chọn gói đồng hành theo tháng bao gồm monitoring, sửa lỗi ưu tiên và iteration tính năng nhỏ.",
      sortOrder: 3,
    },
    {
      question: "Làm việc từ xa hay onsite?",
      answer:
        "Chủ yếu remote (Đà Nẵng / toàn quốc). Có thể họp onsite theo tuần hoặc milestone nếu dự án yêu cầu.",
      sortOrder: 4,
    },
  ];
  for (const f of faqs) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (existing) {
      await prisma.faq.update({
        where: { id: existing.id },
        data: { ...f, status: ContentStatus.PUBLISHED },
      });
    } else {
      await prisma.faq.create({ data: { ...f, status: ContentStatus.PUBLISHED } });
    }
  }

  const values = [
    {
      title: "Tập trung vào giá trị",
      description:
        "Mỗi tính năng phải giải quyết bài toán thật của người dùng và business.",
      sortOrder: 1,
    },
    {
      title: "Minh bạch",
      description: "Cập nhật tiến độ, rủi ro và quyết định kỹ thuật rõ ràng, đúng hạn.",
      sortOrder: 2,
    },
    {
      title: "Chất lượng kỹ thuật",
      description: "Code sạch, kiến trúc bền và kiểm thử đủ để sản phẩm sống lâu.",
      sortOrder: 3,
    },
    {
      title: "Tốc độ có kiểm soát",
      description: "Ship nhanh nhưng không đánh đổi sự ổn định và trải nghiệm.",
      sortOrder: 4,
    },
    {
      title: "Đồng hành dài hạn",
      description: "Không dừng lại ở bàn giao — cùng tối ưu sau launch.",
      sortOrder: 5,
    },
    {
      title: "Học hỏi liên tục",
      description: "Công nghệ và sản phẩm thay đổi nhanh; học là mặc định.",
      sortOrder: 6,
    },
  ];
  for (const v of values) {
    const existing = await prisma.coreValue.findFirst({ where: { title: v.title } });
    if (existing) {
      await prisma.coreValue.update({
        where: { id: existing.id },
        data: { ...v, status: ContentStatus.PUBLISHED },
      });
    } else {
      await prisma.coreValue.create({ data: { ...v, status: ContentStatus.PUBLISHED } });
    }
  }

  const journeys = [
    {
      year: "2019",
      title: "Bắt đầu với Web Development",
      description: "Xây foundation HTML/CSS/JS và các dự án freelance nhỏ.",
      sortOrder: 1,
    },
    {
      year: "2020",
      title: "Chuyên sâu Frontend & React",
      description: "Làm việc với React ecosystem, UI system và tối ưu trải nghiệm.",
      sortOrder: 2,
    },
    {
      year: "2021",
      title: "Full-stack & Mobile",
      description: "Mở rộng Node.js, NestJS và Flutter cho sản phẩm end-to-end.",
      sortOrder: 3,
    },
    {
      year: "2022",
      title: "Full-stack Development",
      description: "Kết hợp frontend, backend và tư duy sản phẩm trong dự án startup.",
      sortOrder: 4,
    },
    {
      year: "2023",
      title: "Cloud, DevOps & Scale",
      description: "Triển khai AWS, CI/CD và kiến trúc sẵn sàng mở rộng.",
      sortOrder: 5,
    },
    {
      year: "2024–Nay",
      title: "Full-stack, App & AI Agent",
      description: "Đồng hành startup xây dựng website, app ứng dụng, AI Agent và tăng trưởng.",
      sortOrder: 6,
    },
  ];
  for (const j of journeys) {
    const existing = await prisma.journeyItem.findFirst({
      where: { year: j.year, title: j.title },
    });
    if (existing) {
      await prisma.journeyItem.update({
        where: { id: existing.id },
        data: { ...j, status: ContentStatus.PUBLISHED },
      });
    } else {
      await prisma.journeyItem.create({
        data: { ...j, status: ContentStatus.PUBLISHED },
      });
    }
  }

  console.log("Seed OK. Admin:", email, "/", password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
