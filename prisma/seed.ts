import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";
import {
  ContentStatus,
  PrismaClient,
} from "../lib/generated/prisma/client";
import { buildSeedProjects } from "./seed-projects-data";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
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
      cvUrl:
        "https://trancongtien.com/api/uploads/1784029250032-Tien-Tran-Cong.pdf",
    },
  });

  const cats = [
    { name: "Tư duy sản phẩm", slug: "tu-duy-san-pham" },
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
        "Không gian làm việc của Trần Công Tiến tại Đà Nẵng với laptop lập trình và bảng workflow AI Agent",
      tags: JSON.stringify([
        "Trần Công Tiến",
        "Tran Cong Tien",
        "Full-stack Developer",
        "AI Agent",
      ]),
      categoryId: product?.id,
      readTime: "7 phút đọc",
      publishedAt: new Date("2026-08-13T09:00:00+07:00"),
    },
    {
      slug: "rag-cho-doanh-nghiep-tra-cuu-tai-lieu-noi-bo",
      title: "Xây hệ thống RAG tra cứu tài liệu nội bộ: vì sao chunking và trích dẫn quan trọng hơn chọn LLM",
      excerpt:
        "Kinh nghiệm triển khai RAG thực tế cho doanh nghiệp SME: tách đoạn giữ ngữ cảnh, hybrid search, phân quyền tài liệu và bắt buộc trả về nguồn trích dẫn.",
      content: `<h2>RAG thất bại hiếm khi vì model yếu</h2>
<p>Nhiều doanh nghiệp thử làm trợ lý tra cứu SOP, hợp đồng, bảng giá hoặc tài liệu kỹ thuật nội bộ nhưng nhanh chóng bỏ cuộc vì AI trả lời chung chung hoặc bịa số liệu. Nguyên nhân phổ biến nhất không nằm ở việc chọn model nào, mà nằm ở pipeline xử lý dữ liệu đầu vào và bước truy xuất (retrieval).</p>
<p>Nếu đoạn văn bản đưa vào prompt bị cắt cụt bảng biểu, thiếu tiêu đề mục hoặc lẫn tài liệu đã hết hạn, ngay cả model mạnh nhất cũng không thể trả lời chính xác.</p>
<h2>1. Chunking theo cấu trúc thay vì cắt cứng theo ký tự</h2>
<p>Cắt văn bản mỗi 500 ký tự là cách nhanh nhất để phá vỡ ngữ nghĩa. Một bảng báo giá hoặc quy trình phê duyệt khi bị cắt đôi sẽ mất hoàn toàn điều kiện áp dụng.</p>
<ul><li>Ưu tiên tách theo heading (H1, H2, H3) và giữ nguyên bảng biểu hoặc chuyển bảng sang Markdown có tiêu đề cột</li><li>Đính kèm metadata vào mỗi chunk: tên tài liệu, phiên bản, phòng ban, ngày cập nhật, đường dẫn gốc</li><li>Dùng overlap hợp lý (10–15%) cho văn bản dài để không đứt mạch lập luận</li></ul>
<h2>2. Hybrid Search đánh bại Vector Search thuần</h2>
<p>Vector search mạnh về ngữ nghĩa nhưng hay bỏ sót mã sản phẩm, mã hợp đồng, tên riêng hoặc số hiệu văn bản. Kết hợp BM25 (full-text search trên PostgreSQL hoặc công cụ search) với vector similarity rồi rerank lại top kết quả giúp độ chính xác tăng rõ rệt.</p>
<p>Với hầu hết doanh nghiệp SME dưới vài trăm nghìn đoạn văn bản, PostgreSQL kèm pgvector và full-text index đã đủ nhanh, gọn và dễ vận hành mà chưa cần thêm một vector database riêng.</p>
<h2>3. Phân quyền tài liệu ngay ở tầng truy vấn</h2>
<p>Tài liệu nhân sự, bảng lương hay hợp đồng khách hàng VIP không thể để mọi nhân viên đều hỏi ra được. Phân quyền phải được lọc ngay trong câu truy vấn retrieval theo vai trò (RBAC) hoặc phòng ban, tuyệt đối không trông chờ vào câu lệnh prompt kiểu "đừng tiết lộ nếu người dùng không có quyền".</p>
<h2>4. Bắt buộc trích dẫn nguồn và biết nói "không tìm thấy"</h2>
<p>Một hệ thống RAG đáng tin trong doanh nghiệp phải luôn trả kèm tên tài liệu, mục/trang trích dẫn và link mở thẳng bản gốc. Khi điểm tương đồng thấp hoặc thiếu dữ liệu, hệ thống nên trả lời rõ là chưa có thông tin trong kho tài liệu thay vì cố đoán.</p>
<h2>Kết luận</h2>
<p>Muốn RAG thực sự được nhân sự dùng mỗi ngày, hãy đầu tư 70% công sức vào làm sạch tài liệu, chunking theo cấu trúc, hybrid search, phân quyền và trích dẫn nguồn. Khi dữ liệu đầu vào sạch và truy xuất đúng, câu trả lời sẽ tự nhiên sắc nét và đáng tin hơn rất nhiều.</p>`,
      coverUrl: "/images/blog/rag-cho-doanh-nghiep-tra-cuu-tai-lieu-noi-bo.webp",
      coverAlt:
        "Minh họa hệ thống RAG doanh nghiệp tách chunk tài liệu nội bộ, tìm kiếm ngữ nghĩa và trích dẫn nguồn",
      tags: JSON.stringify(["RAG", "AI Agent", "PostgreSQL", "Enterprise AI"]),
      categoryId: ai?.id,
      readTime: "9 phút đọc",
      publishedAt: new Date("2026-09-02T09:00:00+07:00"),
    },
    {
      slug: "mcp-model-context-protocol-tich-hop-ai-vao-crm",
      title: "MCP (Model Context Protocol) trong thực tế: kết nối AI Agent với CRM và database an toàn",
      excerpt:
        "Cách dùng chuẩn MCP để chuẩn hóa lớp công cụ cho AI Agent: tách biệt quyền đọc/ghi, kiểm soát schema đầu vào và tránh viết lại connector cho từng model.",
      content: `<h2>Bài toán tích hợp công cụ trước khi có MCP</h2>
<p>Khi xây AI Agent cho doanh nghiệp, phần tốn công nhất không phải gọi API model mà là kết nối AI với hệ thống đang chạy: CRM, bảng booking, database đơn hàng, kho tài liệu hay CMS. Trước đây, mỗi khi đổi giao diện chat hoặc đổi nhà cung cấp model, team thường phải viết lại lớp tool-calling và xử lý xác thực.</p>
<p>Model Context Protocol (MCP) giải quyết đúng điểm nghẽn này bằng một giao thức chuẩn giữa AI client và các server cung cấp tài nguyên (resources) cùng công cụ (tools).</p>
<h2>1. Thiết kế MCP tools theo nghiệp vụ, không phơi trần SQL</h2>
<p>Sai lầm phổ biến khi kết nối AI với database là cấp thẳng một tool chạy câu lệnh SQL tự do. Cách đó vừa nguy hiểm vừa dễ sinh lỗi truy vấn.</p>
<ul><li>Tạo các tool hẹp, rõ mục đích: ví dụ <code>search_leads</code>, <code>get_booking_slots</code>, <code>create_draft_quote</code></li><li>Validate toàn bộ tham số bằng Zod hoặc JSON Schema trước khi chạm vào database</li><li>Trả về dữ liệu đã được chọn lọc (chỉ các cột cần thiết), tránh đổ hàng nghìn dòng JSON làm tràn context</li></ul>
<h2>2. Tách rõ công cụ chỉ đọc và công cụ có tác động ghi</h2>
<p>Với các thao tác đọc như tra cứu lịch sử khách hàng hay tổng hợp doanh thu tuần, Agent có thể tự chạy ngay. Nhưng với thao tác ghi như đổi trạng thái lead, gửi email khách hàng hay hủy đơn, hãy thiết kế bước xác nhận (human-in-the-loop) hoặc chỉ tạo bản nháp (draft) để nhân sự bấm duyệt.</p>
<h2>3. Audit log cho từng lần gọi tool</h2>
<p>Mỗi lời gọi MCP tool cần lưu lại: ai kích hoạt, gọi tool nào, tham số đầu vào là gì, mất bao nhiêu mili-giây và kết quả thành công hay lỗi. Khi vận hành thật, audit log là thứ giúp bạn kiểm soát rủi ro và tối ưu tốc độ phản hồi nhanh nhất.</p>
<h2>Kết luận</h2>
<p>MCP không làm AI thông minh hơn một cách thần kỳ, nhưng nó biến việc tích hợp AI vào CRM và dữ liệu nội bộ trở nên có kỷ luật, tái sử dụng được và an toàn hơn hẳn cho môi trường production.</p>`,
      coverUrl: "/images/blog/mcp-model-context-protocol-tich-hop-ai-vao-crm.webp",
      coverAlt:
        "Kiến trúc MCP Model Context Protocol kết nối AI Agent với CRM, cơ sở dữ liệu và lớp bảo mật",
      tags: JSON.stringify(["MCP", "AI Agent", "CRM", "Backend"]),
      categoryId: ai?.id,
      readTime: "8 phút đọc",
      publishedAt: new Date("2026-09-14T09:00:00+07:00"),
    },
    {
      slug: "danh-gia-kiem-soat-chi-phi-ai-agent-production",
      title: "Đưa AI Agent lên production: kiểm soát chi phí token, latency và giảm hallucination",
      excerpt:
        "Những kỹ thuật thực chiến để AI Agent chạy ổn định trên production: routing model theo độ khó, caching, structured output và bộ test eval tự động.",
      content: `<h2>Khoảng cách giữa bản demo và hệ thống chạy thật</h2>
<p>Một AI Agent chạy thử trên máy với 5 câu hỏi mẫu thường rất ấn tượng. Nhưng khi đưa lên production phục vụ hàng trăm lượt mỗi ngày, ba vấn đề lập tức xuất hiện: hóa đơn API tăng vọt, thời gian chờ 10–15 giây khiến người dùng thoát trang và thỉnh thoảng Agent trả lời sai sự thật một cách rất tự tin.</p>
<h2>1. Model Routing: không dùng model đắt nhất cho mọi tác vụ</h2>
<p>Không phải bước nào trong workflow cũng cần model suy luận nặng nhất. Hãy chia tầng rõ ràng:</p>
<ul><li>Tác vụ phân loại intent, trích xuất JSON, tóm tắt ngắn: dùng model nhỏ, nhanh và chi phí thấp</li><li>Tác vụ lập luận nhiều bước, viết báo cáo phân tích sâu: mới chuyển sang model mạnh hơn</li><li>Tận dụng prompt caching cho phần system prompt và hướng dẫn nghiệp vụ lặp lại</li></ul>
<h2>2. Ép kiểu dữ liệu đầu ra (Structured Output)</h2>
<p>Khi Agent cần truyền dữ liệu sang bước code tiếp theo (ví dụ tạo lead, chọn gói dịch vụ hoặc tính báo giá), luôn yêu cầu JSON tuân theo schema chặt chẽ và kiểm tra lại phía server. Điều này loại bỏ gần hết lỗi parse và buộc model chỉ chọn trong tập giá trị hợp lệ.</p>
<h2>3. Xây bộ Eval nhỏ nhưng chạy mỗi khi sửa prompt</h2>
<p>Đừng sửa prompt theo cảm giác. Chỉ cần chuẩn bị 30–50 tình huống thật (gồm cả câu hỏi bẫy, thiếu thông tin và ngoại lệ) kèm tiêu chí chấm điểm rõ ràng. Mỗi lần chỉnh prompt hoặc đổi model, chạy lại bộ eval để chắc chắn sửa chỗ này không làm hỏng chỗ khác.</p>
<h2>4. Giới hạn vòng lặp và theo dõi latency từng bước</h2>
<p>Luôn đặt <code>maxSteps</code> cho agent loop, timeout cho từng tool call và stream phản hồi ra giao diện để người dùng thấy tiến trình ngay thay vì nhìn màn hình trắng. Đồng thời ghi metric chi phí token theo từng tính năng để biết workflow nào đang mang lại ROI tốt nhất.</p>
<h2>Kết luận</h2>
<p>Đưa AI Agent lên production là bài toán kỹ thuật phần mềm nghiêm túc: đo lường, tối ưu chi phí, kiểm soát sai số và có phương án dự phòng. Làm chắc bốn điểm trên sẽ giúp hệ thống AI của bạn bền bỉ và dễ mở rộng.</p>`,
      coverUrl: "/images/blog/danh-gia-kiem-soat-chi-phi-ai-agent-production.webp",
      coverAlt:
        "Dashboard giám sát AI Agent trên production với biểu đồ latency, chi phí token và guardrail bảo vệ",
      tags: JSON.stringify(["AI Agent", "LLMOps", "Production", "Performance"]),
      categoryId: ai?.id,
      readTime: "8 phút đọc",
      publishedAt: new Date("2026-09-25T09:00:00+07:00"),
    },
    {
      slug: "thiet-ke-database-postgresql-cho-saas-da-chi-nhanh",
      title: "Thiết kế database PostgreSQL cho SaaS đa chi nhánh: multi-tenant, index và migration an toàn",
      excerpt:
        "Các nguyên tắc thiết kế lược đồ PostgreSQL cho web app B2B/SaaS: cô lập dữ liệu theo tenant, composite index đúng thứ tự và migration không gây downtime.",
      content: `<h2>Vì sao thiết kế database quyết định tuổi thọ của SaaS</h2>
<p>Ở giai đoạn đầu, nhiều hệ thống chỉ làm cho 1 cửa hàng hoặc 1 doanh nghiệp. Nhưng chỉ sau 6 tháng khi có thêm chi nhánh thứ hai hoặc bán cho khách hàng mới, toàn bộ truy vấn và báo cáo phải đập đi viết lại nếu cấu trúc dữ liệu không tính trước yếu tố multi-tenant.</p>
<h2>1. Chọn mô hình Multi-tenant thực dụng cho giai đoạn đầu</h2>
<p>Với hầu hết SaaS SME (booking, CRM, quản lý phòng khám, F&B), mô hình <strong>Shared Database + Shared Schema kèm cột <code>tenantId</code> / <code>branchId</code></strong> là lựa chọn cân bằng nhất giữa chi phí, tốc độ phát triển và dễ bảo trì migration.</p>
<ul><li>Mọi bảng dữ liệu nghiệp vụ đều có <code>tenantId</code> bắt buộc (NOT NULL)</li><li>Luôn truyền <code>tenantId</code> từ session đã xác thực ở server, không bao giờ tin giá trị gửi từ client</li><li>Có thể bật Row Level Security (RLS) của PostgreSQL như lớp bảo vệ thứ hai chống rò rỉ dữ liệu chéo</li></ul>
<h2>2. Đánh Composite Index theo đúng mẫu truy vấn thật</h2>
<p>Đừng chỉ đánh index đơn lẻ lên <code>createdAt</code> hay <code>status</code>. Khi hệ thống lọc danh sách đơn hàng hoặc lịch hẹn của một chi nhánh theo trạng thái và ngày, composite index dạng <code>(tenantId, status, createdAt DESC)</code> sẽ giúp PostgreSQL tìm dữ liệu nhanh hơn hàng chục lần khi bảng lớn lên hàng triệu dòng.</p>
<h2>3. Quy tắc Migration không làm sập production</h2>
<p>Khi hệ thống đã có người dùng thật, hãy tuân theo mô hình <strong>Expand and Contract</strong>:</p>
<ol><li>Thêm cột mới cho phép NULL trước (không khóa bảng lâu)</li><li>Deploy code ghi song song cả cột cũ và cột mới, sau đó backfill dữ liệu theo từng lô nhỏ</li><li>Chuyển code sang đọc cột mới rồi mới xóa cột cũ ở đợt deploy sau</li></ol>
<h2>4. Dùng Ledger thay vì ghi đè số dư</h2>
<p>Với ví liệu trình, tồn kho vật tư hay công nợ khách hàng, đừng chỉ lưu một con số <code>balance</code> rồi cộng trừ trực tiếp. Hãy lưu bảng giao dịch (ledger) bất biến và dùng transaction khi cập nhật để luôn đối soát và audit được mọi biến động.</p>
<h2>Kết luận</h2>
<p>Một lược đồ PostgreSQL sạch sẽ, có <code>tenantId</code> nhất quán, index đúng truy vấn và quy trình migration kỷ luật sẽ giúp SaaS của bạn mở rộng từ 1 lên hàng trăm chi nhánh mà không rơi vào cảnh "vừa chạy vừa vá".</p>`,
      coverUrl: "/images/blog/thiet-ke-database-postgresql-cho-saas-da-chi-nhanh.webp",
      coverAlt:
        "Sơ đồ kiến trúc cơ sở dữ liệu PostgreSQL multi-tenant cho SaaS đa chi nhánh với lớp cô lập dữ liệu",
      tags: JSON.stringify(["PostgreSQL", "SaaS", "Database", "Kiến trúc"]),
      categoryId: arch?.id,
      readTime: "9 phút đọc",
      publishedAt: new Date("2026-10-04T09:00:00+07:00"),
    },
    {
      slug: "idempotency-va-webhook-thanh-toan-payos-vnpay",
      title: "Xử lý webhook thanh toán (PayOS, VNPay) không trùng đơn: Idempotency và đối soát giao dịch",
      excerpt:
        "Cách xây luồng thanh toán online đáng tin cậy tại Việt Nam: xác thực chữ ký, chống xử lý trùng webhook, lưu raw event và cơ chế đối soát tự động.",
      content: `<h2>Thanh toán online lỗi thường xảy ra ở những chỗ ít ngờ nhất</h2>
<p>Khách đã chuyển khoản thành công qua VietQR/PayOS nhưng đơn hàng vẫn ở trạng thái "chờ thanh toán", hoặc ngược lại cổng thanh toán gửi webhook 2 lần khiến hệ thống cộng tiền/cấp gói 2 lần. Đây là hai lỗi kinh điển nếu luồng thanh toán chỉ xử lý theo kiểu gọi API đơn giản.</p>
<h2>1. Không bao giờ tin redirect từ trình duyệt khách hàng</h2>
<p>Trang "Thanh toán thành công" mà khách được chuyển hướng về chỉ dùng để hiển thị giao diện. Người dùng có thể đóng tab ngay sau khi quét QR, hoặc tự sửa tham số trên URL. Nguồn sự thật duy nhất để cập nhật trạng thái đơn hàng phải là <strong>Webhook phía server</strong> đã xác thực chữ ký HMAC/checksum.</p>
<h2>2. Idempotency là bắt buộc với mọi Webhook</h2>
<p>Cổng thanh toán có thể gửi lại cùng một webhook nhiều lần khi mạng chập chờn hoặc server phản hồi chậm. Để đảm bảo xử lý 1 lần hay 5 lần đều cho đúng 1 kết quả:</p>
<ul><li>Tạo bảng <code>PaymentWebhookEvent</code> với ràng buộc UNIQUE trên <code>providerEventId</code> hoặc <code>transactionReference</code></li><li>Thực hiện kiểm tra và cập nhật trạng thái đơn hàng trong cùng một database transaction</li><li>Chỉ chuyển trạng thái từ <code>PENDING</code> sang <code>PAID</code> bằng điều kiện có kiểm soát (state machine), bỏ qua nếu đơn đã hoàn tất</li></ul>
<h2>3. Lưu nguyên văn payload và trả HTTP 200 sớm</h2>
<p>Luôn lưu raw payload (đã ẩn thông tin nhạy cảm nếu có) để dễ điều tra khi đối soát với kế toán. Với các tác vụ nặng sau khi thanh toán như xuất PDF hóa đơn hay gửi email, hãy đẩy sang hàng đợi xử lý bất đồng bộ thay vì làm chậm phản hồi webhook.</p>
<h2>4. Có job đối soát dự phòng</h2>
<p>Đề phòng trường hợp webhook bị rớt do sự cố mạng, hãy có một cron job định kỳ kiểm tra các đơn <code>PENDING</code> quá 5–10 phút bằng API truy vấn trạng thái giao dịch từ cổng thanh toán để tự động đồng bộ lại.</p>
<h2>Kết luận</h2>
<p>Hệ thống thanh toán tốt không phải hệ thống không bao giờ gặp lỗi mạng, mà là hệ thống vẫn giữ đúng số tiền và đúng trạng thái đơn hàng ngay cả khi mạng rớt hoặc webhook bị gửi lặp nhiều lần.</p>`,
      coverUrl: "/images/blog/idempotency-va-webhook-thanh-toan-payos-vnpay.webp",
      coverAlt:
        "Minh họa luồng xử lý webhook thanh toán PayOS VNPay với lớp chống trùng lặp idempotency và bảng đối soát",
      tags: JSON.stringify(["Payment", "PayOS", "Webhook", "Backend"]),
      categoryId: arch?.id,
      readTime: "8 phút đọc",
      publishedAt: new Date("2026-10-12T09:00:00+07:00"),
    },
    {
      slug: "modular-monolith-hay-microservices-cho-team-nho",
      title: "Modular Monolith vs Microservices: kiến trúc nào giúp team 2–5 người ship nhanh và bền?",
      excerpt:
        "Phân tích thực tế chi phí vận hành, tốc độ phát triển và cách tổ chức Modular Monolith để sẵn sàng tách service khi thực sự cần.",
      content: `<h2>Bẫy Microservices ở giai đoạn quá sớm</h2>
<p>Nhiều startup chỉ có 2–4 lập trình viên nhưng lại bắt đầu bằng 6–8 microservices riêng biệt, kèm message broker, API gateway và pipeline CI/CD phức tạp. Hệ quả là thay vì dành thời gian xây tính năng cho khách hàng, cả team mất nửa tuần chỉ để debug một lỗi gọi chéo giữa hai service và đồng bộ schema.</p>
<h2>Vì sao Modular Monolith là điểm xuất phát tối ưu</h2>
<p>Modular Monolith không phải là "code rối cục" (Big Ball of Mud). Đó là một ứng dụng deploy chung một đơn vị, nhưng bên trong được chia ranh giới nghiệp vụ rõ ràng theo từng module độc lập (ví dụ: <code>leads</code>, <code>bookings</code>, <code>payments</code>, <code>partners</code>).</p>
<ul><li><strong>Tốc độ ship cao:</strong> Một PR có thể sửa trọn luồng từ database đến UI, test tích hợp dễ dàng và deploy trong một bước</li><li><strong>Transaction đơn giản:</strong> Dùng trực tiếp ACID transaction của PostgreSQL thay vì phải xử lý Saga hay distributed lock phức tạp</li><li><strong>Chi phí hạ tầng thấp:</strong> Một VPS hoặc cụm container gọn nhẹ đủ phục vụ hàng chục nghìn người dùng mỗi ngày</li></ul>
<h2>3 nguyên tắc giữ Modular Monolith không bị rối</h2>
<ol><li><strong>Giao tiếp qua public interface của module:</strong> Module A không import trực tiếp truy vấn nội bộ của Module B, mà gọi qua service/facade đã định nghĩa</li><li><strong>Tách rõ quyền sở hữu bảng dữ liệu:</strong> Mỗi module chịu trách nhiệm ghi cho nhóm bảng của mình</li><li><strong>Tránh phụ thuộc vòng tròn:</strong> Kiểm soát hướng phụ thuộc giữa core domain và các module tiện ích</li></ol>
<h2>Khi nào mới thực sự nên tách Microservice?</h2>
<p>Chỉ nên tách một phần ra thành service riêng khi có lý do rõ ràng: khác biệt lớn về tài nguyên phần cứng (ví dụ worker xử lý video/AI nặng cần GPU), khác ngôn ngữ bắt buộc, hoặc quy mô tổ chức đã lên nhiều team độc lập bị dẫm chân nhau khi release.</p>
<h2>Kết luận</h2>
<p>Kiến trúc tốt nhất là kiến trúc phù hợp với quy mô team và giai đoạn kinh doanh. Với team 2–5 người, một Modular Monolith kỷ luật sẽ giúp bạn ra sản phẩm nhanh gấp đôi mà vẫn giữ được đường lui sạch sẽ để mở rộng về sau.</p>`,
      coverUrl: "/images/blog/modular-monolith-hay-microservices-cho-team-nho.webp",
      coverAlt:
        "So sánh kiến trúc Modular Monolith gọn gàng và Microservices phân tán cho team phát triển nhỏ",
      tags: JSON.stringify(["Architecture", "Modular Monolith", "Microservices", "System Design"]),
      categoryId: arch?.id,
      readTime: "8 phút đọc",
      publishedAt: new Date("2026-10-20T09:00:00+07:00"),
    },
    {
      slug: "toi-uu-core-web-vitals-nextjs-app-router",
      title: "Tối ưu Core Web Vitals cho Next.js App Router: LCP, INP, CLS từ dự án thực tế",
      excerpt:
        "Checklist tối ưu hiệu năng thực tế trên Next.js App Router: giảm JS phía client, tối ưu ảnh hero LCP, chống nhảy layout CLS và cải thiện độ mượt phản hồi INP.",
      content: `<h2>Tốc độ trang ảnh hưởng trực tiếp tới SEO và tỷ lệ chuyển đổi</h2>
<p>Một website dịch vụ hay landing page đẹp nhưng mất 4–5 giây mới hiện nội dung chính trên 4G sẽ mất phần lớn khách hàng trước khi họ kịp đọc dòng đầu tiên. Core Web Vitals (LCP, INP, CLS) là thước đo khách quan nhất để biết người dùng thật đang trải nghiệm trang web mượt hay chậm.</p>
<h2>1. Tối ưu LCP (Largest Contentful Paint) dưới 2.5 giây</h2>
<p>Phần tử LCP thường là ảnh hero hoặc tiêu đề lớn ở màn hình đầu tiên.</p>
<ul><li>Luôn chuyển ảnh sang định dạng WebP/AVIF đúng kích thước hiển thị và khai báo thuộc tính <code>sizes</code> chuẩn xác trong <code>next/image</code></li><li>Đánh dấu preload/priority cho duy nhất ảnh hero trên màn hình đầu, tránh lazy-load nhầm ảnh LCP</li><li>Tối ưu font chữ bằng <code>next/font</code> để tránh tải font từ domain ngoài gây chặn render</li></ul>
<h2>2. Giảm CLS (Cumulative Layout Shift) về gần 0</h2>
<p>Nhảy bố cục khiến người dùng bấm nhầm nút là trải nghiệm rất khó chịu. Cách xử lý triệt để là luôn định rõ <code>aspect-ratio</code> hoặc <code>width/height</code> cho mọi khung ảnh, video, banner và dùng skeleton cùng kích thước với nội dung thật cho các khối tải động.</p>
<h2>3. Cải thiện INP (Interaction to Next Paint) bằng Server Components</h2>
<p>Điểm mạnh lớn nhất của Next.js App Router là mặc định render trên Server. Hãy giữ các trang nội dung, bài blog, bảng dữ liệu tĩnh ở Server Component, chỉ đẩy phần thực sự cần tương tác (bộ lọc, modal, form) sang Client Component nhỏ gọn. Giảm bundle JavaScript phía trình duyệt sẽ giúp mọi cú bấm nút phản hồi gần như tức thì.</p>
<h2>4. Đo bằng dữ liệu thật thay vì chỉ nhìn máy cá nhân</h2>
<p>Đừng chỉ kiểm tra trên MacBook mạng cáp quang. Hãy test bằng Lighthouse ở chế độ Mobile Slow 4G, theo dõi Chrome DevTools Performance và xem dữ liệu trường (field data) trong Google Search Console.</p>
<h2>Kết luận</h2>
<p>Tối ưu Core Web Vitals trên Next.js App Router không cần các thủ thuật phức tạp. Chỉ cần tận dụng đúng Server Components, tối ưu ảnh hero, khóa kích thước khung hiển thị và giữ bundle client tinh gọn, website sẽ vừa đạt điểm xanh vừa mang lại cảm giác nhanh rõ rệt cho khách hàng.</p>`,
      coverUrl: "/images/blog/toi-uu-core-web-vitals-nextjs-app-router.webp",
      coverAlt:
        "Màn hình laptop tối ưu hiệu năng Core Web Vitals LCP INP CLS trên Next.js App Router",
      tags: JSON.stringify(["Next.js", "Core Web Vitals", "Performance", "Frontend"]),
      categoryId: frontend?.id,
      readTime: "8 phút đọc",
      publishedAt: new Date("2026-10-29T09:00:00+07:00"),
    },
    {
      slug: "flutter-vs-react-native-2026-chon-stack-mobile-app",
      title: "Flutter hay React Native cho app doanh nghiệp? So sánh thực tế hiệu năng, chi phí và bảo trì",
      excerpt:
        "Góc nhìn thực tế từ các dự án mobile app thương mại: khi nào chọn Flutter, khi nào chọn React Native dựa trên đội ngũ, tính năng phần cứng và lộ trình bảo trì.",
      content: `<h2>Không có framework nào thắng tuyệt đối — chỉ có lựa chọn đúng bối cảnh</h2>
<p>Khi startup hoặc doanh nghiệp cần làm app cho cả iOS và Android, câu hỏi đầu tiên hầu như luôn là chọn Flutter hay React Native. Cả hai đều đã đủ trưởng thành để chạy các sản phẩm hàng triệu người dùng. Quyết định đúng phụ thuộc vào đặc thù sản phẩm và đội ngũ của bạn.</p>
<h2>1. Khi nào Flutter là lựa chọn vượt trội</h2>
<ul><li>Sản phẩm đòi hỏi giao diện đồng nhất tuyệt đối giữa iOS và Android, nhiều animation mượt hoặc custom UI đặc thù</li><li>App vận hành hiện trường cần độ ổn định cao, xử lý offline-first, camera, quét mã hoặc kết nối thiết bị ngoại vi như máy in Bluetooth</li><li>Doanh nghiệp muốn một bộ công cụ thống nhất (widget, routing, state) ít phụ thuộc thư viện bên thứ ba dễ vỡ khi nâng cấp OS</li></ul>
<h2>2. Khi nào React Native hợp lý hơn</h2>
<ul><li>Team của bạn đã rất mạnh về TypeScript/React/Next.js và muốn chia sẻ logic validation, API types hoặc nhân sự giữa web và mobile</li><li>Sản phẩm cần tận dụng hệ sinh thái JavaScript/Expo để đẩy bản cập nhật giao diện nhanh (OTA updates) cho các luồng thương mại điện tử hay nội dung</li></ul>
<h2>3. Chi phí ẩn thường bị bỏ qua khi làm Mobile App</h2>
<p>Code giao diện chỉ chiếm một phần chi phí. Dù chọn Flutter hay React Native, bạn vẫn cần dự trù công sức cho:</p>
<ul><li>Quy trình duyệt App Store và Google Play (chính sách quyền riêng tư, thanh toán in-app, tài khoản test)</li><li>Cơ chế push notification, deep link và theo dõi crash trên nhiều dòng máy Android tầm trung</li><li>Chiến lược tương thích ngược API khi người dùng chưa chịu cập nhật lên phiên bản app mới</li></ul>
<h2>Kết luận</h2>
<p>Nếu cần hiệu năng đồ họa ổn định, UI nhất quán và vận hành offline chắc chắn, Flutter là lựa chọn rất đáng tin. Nếu team đã sẵn nền tảng TypeScript/React mạnh và ưu tiên chia sẻ nguồn lực web–mobile, React Native sẽ giúp đi nhanh hơn. Quan trọng nhất vẫn là kiến trúc sạch và kỷ luật release.</p>`,
      coverUrl: "/images/blog/flutter-vs-react-native-2026-chon-stack-mobile-app.webp",
      coverAlt:
        "So sánh phát triển ứng dụng di động đa nền tảng Flutter và React Native trên iOS và Android",
      tags: JSON.stringify(["Flutter", "React Native", "Mobile App", "Frontend"]),
      categoryId: frontend?.id,
      readTime: "8 phút đọc",
      publishedAt: new Date("2026-11-06T09:00:00+07:00"),
    },
    {
      slug: "he-thong-design-token-va-component-cho-web-app",
      title: "Xây Design System gọn nhẹ với Tailwind CSS cho web app: đủ dùng, không over-engineer",
      excerpt:
        "Cách tổ chức design token màu sắc, typography, spacing và bộ component lõi trên Tailwind CSS giúp web app nhất quán mà không tốn hàng tháng dựng thư viện.",
      content: `<h2>Đừng tốn 2 tháng xây Design System trước khi có người dùng</h2>
<p>Một thái cực là không có chuẩn giao diện nào — mỗi trang một kiểu nút, mỗi form một kiểu báo lỗi. Thái cực ngược lại là over-engineer một thư viện component đồ sộ khi sản phẩm còn chưa launch. Điểm ngọt cho startup và SME là một <strong>Lightweight Design System</strong> xây trực tiếp trên CSS variables và Tailwind CSS.</p>
<h2>1. Chốt bộ Semantic Tokens thay vì gọi màu cứng</h2>
<p>Thay vì rải <code>text-slate-600</code> hay <code>bg-indigo-600</code> khắp 50 file, hãy định nghĩa lớp token theo ngữ nghĩa trong file CSS gốc:</p>
<ul><li><strong>Surface & Border:</strong> <code>--surface</code>, <code>--surface-soft</code>, <code>--border</code></li><li><strong>Text hierarchy:</strong> <code>--ink</code> (tiêu đề), <code>--ink-muted</code> (nội dung), <code>--ink-subtle</code> (nhãn phụ)</li><li><strong>Brand & Status:</strong> <code>--brand</code>, <code>--brand-soft</code>, <code>--success</code>, <code>--warning</code>, <code>--danger</code></li></ul>
<p>Khi cần tinh chỉnh nhận diện thương hiệu hoặc thêm chế độ nền tối sau này, bạn chỉ cần sửa một chỗ thay vì tìm kiếm thay thế hàng trăm dòng.</p>
<h2>2. Chuẩn hóa 8 component xuất hiện ở 90% màn hình</h2>
<p>Với hầu hết web app quản trị hoặc SaaS, chỉ cần làm thật kỹ 8 khối nền tảng trước: Button, Input/Select, Badge trạng thái, Card, Table, Modal/Drawer, Toast thông báo và Empty/Error State. Mọi màn hình mới đều lắp ghép từ 8 khối này.</p>
<h2>3. Quy tắc khoảng cách và mật độ thông tin</h2>
<p>Dashboard doanh nghiệp cần đủ thoáng để dễ quét mắt nhưng không quá loãng khiến người dùng phải cuộn liên tục. Thống nhất thang spacing (4px/8px), bo góc (<code>rounded-xl</code>, <code>rounded-2xl</code>) và thứ bậc tiêu đề giúp toàn bộ sản phẩm trông sắc nét như có đội ngũ thiết kế chuyên nghiệp đứng sau.</p>
<h2>Kết luận</h2>
<p>Design System tốt không phải thứ để trưng bày trên Storybook, mà là bộ quy ước gọn nhẹ giúp developer dựng màn hình mới trong nửa giờ với chất lượng thẩm mỹ đồng đều trên toàn sản phẩm.</p>`,
      coverUrl: "/images/blog/he-thong-design-token-va-component-cho-web-app.webp",
      coverAlt:
        "Hệ thống design token, bảng màu và thư viện UI component gọn nhẹ xây dựng bằng Tailwind CSS",
      tags: JSON.stringify(["Design System", "Tailwind CSS", "UI/UX", "Frontend"]),
      categoryId: frontend?.id,
      readTime: "7 phút đọc",
      publishedAt: new Date("2026-11-15T09:00:00+07:00"),
    },
    {
      slug: "seo-ky-thuat-cho-website-dich-vu-va-saas",
      title: "SEO kỹ thuật cho website dịch vụ & SaaS: cấu trúc URL, Schema JSON-LD và nội dung chuyển đổi",
      excerpt:
        "Khung triển khai Technical SEO thực tế cho website B2B/SaaS: kiến trúc cụm chủ đề, JSON-LD chuẩn xác, sitemap động và biến traffic tự nhiên thành lead thật.",
      content: `<h2>Traffic nhiều không có ý nghĩa nếu không tạo ra khách hàng</h2>
<p>Nhiều website viết hàng chục bài blog chung chung để kéo lượt xem nhưng gần như không mang về yêu cầu tư vấn nào. Với website dịch vụ hoặc SaaS, SEO kỹ thuật và chiến lược nội dung phải đi cùng phễu chuyển đổi ngay từ đầu.</p>
<h2>1. Kiến trúc URL và cụm chủ đề (Topic Cluster)</h2>
<p>Thay vì đăng bài rời rạc, hãy tổ chức website thành hai lớp liên kết chặt chẽ:</p>
<ul><li><strong>Trang tiền (Money pages):</strong> Trang dịch vụ, trang giải pháp theo ngành, trang báo giá/ước tính chi phí — tối ưu cho từ khóa có ý định mua hàng cao</li><li><strong>Trang kiến thức & case study (Blog / Dự án):</strong> Trả lời câu hỏi chuyên sâu, chứng minh năng lực thực chiến và dẫn liên kết nội bộ tự nhiên về trang dịch vụ tương ứng</li></ul>
<h2>2. Triển khai Schema JSON-LD đúng bản chất trang</h2>
<p>Google và các công cụ tìm kiếm AI hiểu trang web nhanh hơn nhiều khi có dữ liệu có cấu trúc sạch sẽ: <code>Organization</code> & <code>Person</code> cho thương hiệu, <code>BreadcrumbList</code> cho phân cấp điều hướng, <code>BlogPosting</code> cho bài viết, <code>CreativeWork</code> cho dự án và <code>FAQPage</code> khi có mục hỏi đáp thật.</p>
<h2>3. Sitemap động, Canonical và Robots không để sót lỗi</h2>
<p>Đảm bảo mọi bài viết hoặc dự án mới publish đều tự động xuất hiện trong <code>sitemap.xml</code>, không để các trang filter/admin bị index nhầm và kiểm tra canonical URL nhất quán (có hoặc không có www, dùng HTTPS).</p>
<h2>4. Chuyển đổi ngay trong ngữ cảnh bài đọc</h2>
<p>Người đọc một bài chuyên sâu về chi phí làm website hay xây hệ thống booking đang có nhu cầu rất sát. Một khối CTA gọn gàng dẫn sang công cụ ước tính chi phí hoặc form đặt lịch tư vấn ở cuối bài sẽ chuyển đổi tốt hơn nhiều so với banner quảng cáo chung chung.</p>
<h2>Kết luận</h2>
<p>SEO kỹ thuật sạch sẽ là nền móng giúp Google và AI search hiểu rõ bạn làm gì và giỏi lĩnh vực nào. Khi kết hợp với nội dung thực chiến và lộ trình chuyển đổi hợp lý, website sẽ trở thành kênh tạo lead bền vững mỗi tháng.</p>`,
      coverUrl: "/images/blog/seo-ky-thuat-cho-website-dich-vu-va-saas.webp",
      coverAlt:
        "Sơ đồ SEO kỹ thuật cho website dịch vụ và SaaS gồm cấu trúc sitemap, schema JSON-LD và tăng trưởng traffic",
      tags: JSON.stringify(["SEO", "Technical SEO", "SaaS", "Growth"]),
      categoryId: product?.id,
      readTime: "8 phút đọc",
      publishedAt: new Date("2026-11-24T09:00:00+07:00"),
    },
  ];

  const baseDate = new Date("2026-06-10T09:00:00+07:00").getTime();
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const publishedAt =
      "publishedAt" in p && p.publishedAt
        ? p.publishedAt
        : new Date(baseDate + i * 7 * 24 * 60 * 60 * 1000);
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {
        ...p,
        publishedAt,
        status: ContentStatus.PUBLISHED,
        authorId: admin.id,
      },
      create: {
        ...p,
        status: ContentStatus.PUBLISHED,
        authorId: admin.id,
        publishedAt,
      },
    });
  }

  const projects = buildSeedProjects(caseStudyHtml);
  const projectSlugs = projects.map((p) => p.slug);

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: { ...project, status: ContentStatus.PUBLISHED },
      create: { ...project, status: ContentStatus.PUBLISHED },
    });
  }

  // Ẩn dự án seed cũ không còn trong bộ chọn lại.
  await prisma.project.updateMany({
    where: {
      slug: { notIn: projectSlugs },
      status: ContentStatus.PUBLISHED,
    },
    data: { status: ContentStatus.DRAFT },
  });

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

  await prisma.journeyItem.deleteMany();

  const journeys = [
    {
      year: "2021",
      title: "Bắt đầu đại học và xây nền tảng công nghệ",
      description:
        "Bắt đầu hành trình đại học, làm quen với lập trình và xây dựng nền tảng cho con đường phát triển phần mềm.",
      sortOrder: 1,
    },
    {
      year: "2023",
      title: "Bắt đầu làm website với Next.js",
      description:
        "Chính thức làm sản phẩm từ website, tập trung Next.js, React, TypeScript và trải nghiệm người dùng.",
      sortOrder: 2,
    },
    {
      year: "Tiếp theo",
      title: "Mở rộng sang Backend và Database",
      description:
        "Phát triển API và hệ thống backend với Node.js, NestJS, Python, Java; làm việc với PostgreSQL, MySQL và MongoDB.",
      sortOrder: 3,
    },
    {
      year: "Mở rộng năng lực",
      title: "Phát triển Mobile App với Flutter",
      description:
        "Mở rộng năng lực sang Flutter, Dart và BLoC để có thể xây dựng sản phẩm đa nền tảng từ đầu đến cuối.",
      sortOrder: 4,
    },
    {
      year: "Hiện tại",
      title: "Full-stack, Mobile và AI",
      description:
        "Ứng dụng Python vào AI và hướng tới vai trò solo developer, đồng hành cùng startup và cá nhân xây CRM, booking, e-commerce, landing page và sản phẩm theo yêu cầu.",
      sortOrder: 5,
    },
  ];
  for (const j of journeys) {
    await prisma.journeyItem.create({
      data: { ...j, status: ContentStatus.PUBLISHED },
    });
  }

  const solutions = [
    {
      slug: "spa",
      title: "Giải pháp số cho Spa & Beauty",
      industry: "Spa & Beauty",
      excerpt:
        "Gom đặt lịch, hồ sơ khách, membership và ca nhân viên vào một hệ thống — giảm sót lịch, tăng tái sử dụng dịch vụ.",
      heroTitle: "Giảm lịch hẹn thủ công, giữ dữ liệu khách hàng ở một nơi",
      heroDescription:
        "Website đặt lịch và bảng điều khiển được thiết kế quanh quy trình thật của spa: đặt lịch → phục vụ → chăm sóc lại → gia hạn membership.",
      problems: [
        "Đặt lịch phân tán trên Messenger, Zalo và sổ tay",
        "Khó xem lịch trống theo kỹ thuật viên / phòng",
        "Không có lịch sử dịch vụ và sở thích khách tập trung",
        "Nhắc lịch và remarketing làm thủ công",
        "Báo cáo doanh thu theo dịch vụ / nhân viên thiếu tin cậy",
      ],
      capabilities: [
        "Website giới thiệu dịch vụ & gói",
        "Đặt lịch online theo ca",
        "CRM khách hàng & lịch sử dịch vụ",
        "Membership / thẻ liệu trình",
        "Xếp ca nhân viên",
        "Nhắc lịch tự động",
        "Bảng doanh thu & công suất",
      ],
      packageItems: ["Website thương hiệu", "Module đặt lịch", "Admin vận hành", "CRM khách"],
    },
    {
      slug: "real-estate",
      title: "Giải pháp số cho bất động sản",
      industry: "Bất động sản",
      excerpt:
        "Nguồn hàng, lead quảng cáo và follow-up sales nằm trên một pipeline — biết khách đang quan tâm căn nào và cần gọi lại khi nào.",
      heroTitle: "Biến nguồn hàng và lead thành quy trình bán có thể theo dõi",
      heroDescription:
        "Landing dự án, kho hàng và CRM giúp đội sales không bỏ sót lead từ ads, fanpage hay môi giới.",
      problems: [
        "Nguồn hàng nằm rải rác trên Excel và chat",
        "Lead từ quảng cáo dễ thất thoát",
        "Sales không có lịch sử chăm sóc chung",
        "Báo cáo pipeline làm tay cuối tuần",
        "Tài liệu dự án / pháp lý khó chia sẻ có kiểm soát",
      ],
      capabilities: [
        "Landing page dự án",
        "Kho hàng / inventory",
        "Thu & định tuyến lead",
        "CRM bán hàng",
        "Nhắc follow-up",
        "Thư viện tài liệu",
        "Bảng pipeline & KPI",
      ],
      packageItems: ["Website / landing dự án", "Kho hàng", "CRM lead", "Dashboard sales"],
    },
    {
      slug: "construction",
      title: "Giải pháp số cho xây dựng",
      industry: "Xây dựng",
      excerpt:
        "Theo dõi mốc dự án, tài liệu, báo cáo hiện trường và rủi ro chậm tiến độ trong một không gian làm việc chung.",
      heroTitle: "Theo dõi tiến độ mà không ghép dữ liệu từ nhiều nhóm chat",
      heroDescription:
        "Văn phòng và hiện trường nhìn cùng nguồn sự thật: mốc, sự cố, tài liệu phiên bản và báo cáo ngày.",
      problems: [
        "Tiến độ cập nhật qua nhiều nhóm Zalo",
        "Tài liệu / bản vẽ khó kiểm soát phiên bản",
        "Báo cáo hiện trường làm tay",
        "Khó nhìn sớm rủi ro chậm tiến độ",
        "Phân quyền giữa chủ đầu tư – thầu – giám sát còn lỏng",
      ],
      capabilities: [
        "Không gian dự án theo vai trò",
        "Theo dõi mốc & tiến độ",
        "Quản lý tài liệu",
        "Báo cáo hiện trường",
        "Theo dõi sự cố",
        "Phân quyền",
        "Bảng quản lý điều hành",
      ],
      packageItems: ["Website doanh nghiệp", "Cổng dự án", "Bảng tiến độ", "Module tài liệu"],
    },
    {
      slug: "clinic",
      title: "Giải pháp số cho phòng khám & thẩm mỹ",
      industry: "Y tế & Thẩm mỹ",
      excerpt:
        "Đặt lịch khám, hồ sơ khách/bệnh án nhẹ, nhắc tái khám và quản lý liệu trình trong một hệ thống gọn cho phòng khám tư.",
      heroTitle: "Giảm hàng chờ thủ công, giữ liệu trình và tái khám có kiểm soát",
      heroDescription:
        "Phù hợp phòng khám da liễu, nha khoa, thẩm mỹ viện cần đặt lịch theo bác sĩ/kỹ thuật viên và theo dõi liệu trình.",
      problems: [
        "Đặt lịch trùng / sót ca bác sĩ",
        "Hồ sơ khách nằm rời trên giấy và Zalo",
        "Khó nhắc tái khám đúng liệu trình",
        "Doanh thu theo dịch vụ không rõ",
        "Không có kênh đặt lịch ngoài giờ hành chính",
      ],
      capabilities: [
        "Website đặt lịch theo bác sĩ",
        "Hồ sơ khách / liệu trình",
        "Nhắc tái khám",
        "Quản lý gói dịch vụ",
        "Phân quyền lễ tân – bác sĩ",
        "Báo cáo doanh thu",
        "Tích hợp Zalo OA (tuỳ chọn)",
      ],
      packageItems: ["Website phòng khám", "Đặt lịch", "Hồ sơ liệu trình", "Admin vận hành"],
    },
    {
      slug: "fnb",
      title: "Giải pháp số cho F&B / nhà hàng",
      industry: "F&B",
      excerpt:
        "Menu online, đặt bàn / order, quản lý chi nhánh và chương trình khách hàng thân thiết trên một nền tảng.",
      heroTitle: "Đặt bàn và vận hành chi nhánh gọn hơn, dữ liệu khách không bị mất",
      heroDescription:
        "Dành cho chuỗi nhỏ và nhà hàng muốn số hoá menu, đặt chỗ và chăm sóc khách quay lại.",
      problems: [
        "Đặt bàn qua điện thoại dễ trùng",
        "Menu thay đổi khó đồng bộ đa kênh",
        "Không có dữ liệu khách quay lại",
        "Báo cáo theo chi nhánh làm tay",
        "Chương trình ưu đãi khó kiểm soát",
      ],
      capabilities: [
        "Website / menu digital",
        "Đặt bàn online",
        "Quản lý chi nhánh",
        "Khách hàng thân thiết",
        "Ưu đãi & voucher",
        "Bảng doanh thu",
        "Tích hợp giao vận (tuỳ chọn)",
      ],
      packageItems: ["Website nhà hàng", "Đặt bàn", "Loyalty cơ bản", "Admin đa chi nhánh"],
    },
    {
      slug: "education",
      title: "Giải pháp số cho trung tâm đào tạo",
      industry: "Giáo dục",
      excerpt:
        "Tuyển sinh, lớp học, điểm danh, học phí và portal học viên — thay cho Excel và nhóm chat rời.",
      heroTitle: "Quản lý tuyển sinh và lớp học trên một hệ thống",
      heroDescription:
        "Phù hợp trung tâm ngoại ngữ, kỹ năng, luyện thi cần theo dõi lead đăng ký đến học phí và chuyên cần.",
      problems: [
        "Lead tư vấn khoá học dễ thất thoát",
        "Xếp lớp / lịch học cập nhật thủ công",
        "Theo dõi học phí còn lệch số",
        "Phụ huynh / học viên khó xem lịch",
        "Báo cáo tuyển sinh không realtime",
      ],
      capabilities: [
        "Landing khoá học",
        "CRM tuyển sinh",
        "Quản lý lớp & lịch",
        "Điểm danh",
        "Theo dõi học phí",
        "Portal học viên",
        "Báo cáo tuyển sinh",
      ],
      packageItems: ["Website trung tâm", "CRM tuyển sinh", "Quản lý lớp", "Portal học viên"],
    },
    {
      slug: "ecommerce",
      title: "Giải pháp số cho bán lẻ / thương mại điện tử",
      industry: "Thương mại điện tử",
      excerpt:
        "Website bán hàng, quản lý đơn, kho nhẹ và chăm sóc khách sau mua — phù hợp SME chưa cần nền tảng quá nặng.",
      heroTitle: "Bán hàng online có kiểm soát đơn và tồn kho",
      heroDescription:
        "Xây storefront và admin vận hành gọn: danh mục, đơn hàng, trạng thái giao, và lịch sử khách.",
      problems: [
        "Bán trên nhiều kênh nhưng số liệu lệch",
        "Đơn hàng xử lý thủ công dễ sót",
        "Tồn kho không đồng bộ",
        "Chăm sóc sau bán thiếu quy trình",
        "Khó mở rộng khi đơn tăng",
      ],
      capabilities: [
        "Storefront / catalogue",
        "Giỏ hàng & thanh toán",
        "Quản lý đơn",
        "Kho hàng nhẹ",
        "CRM sau bán",
        "Mã giảm giá",
        "Bảng doanh thu",
      ],
      packageItems: ["Website bán hàng", "Admin đơn & kho", "CRM cơ bản", "Tích hợp thanh toán"],
    },
    {
      slug: "logistics",
      title: "Giải pháp số cho logistics & giao nhận",
      industry: "Logistics",
      excerpt:
        "Tạo vận đơn, theo dõi trạng thái giao, đối soát và cổng khách hàng — giảm Excel và gọi điện xác nhận.",
      heroTitle: "Theo dõi vận đơn và đối soát rõ ràng hơn cho đội giao nhận",
      heroDescription:
        "Phù hợp đơn vị giao hàng nội thành / liên tỉnh muốn cổng tạo đơn và cập nhật trạng thái realtime.",
      problems: [
        "Tạo vận đơn thủ công dễ sai",
        "Khách không tự tra cứu được trạng thái",
        "Đối soát COD chậm",
        "Điều phối tài xế còn dựa vào chat",
        "Báo cáo hiệu suất tuyến thiếu dữ liệu",
      ],
      capabilities: [
        "Cổng tạo vận đơn",
        "Theo dõi trạng thái",
        "Phân công tài xế",
        "Đối soát COD",
        "Thông báo khách",
        "Bảng hiệu suất",
        "API đối tác (tuỳ chọn)",
      ],
      packageItems: ["Cổng khách hàng", "Module vận đơn", "Đối soát", "Dashboard điều phối"],
    },
    {
      slug: "hospitality",
      title: "Giải pháp số cho khách sạn & homestay",
      industry: "Lưu trú",
      excerpt:
        "Đặt phòng, quản lý tồn phòng, giá theo mùa và chăm sóc khách trước/sau check-in trên một hệ thống gọn.",
      heroTitle: "Đặt phòng và tồn phòng rõ ràng — bớt phụ thuộc OTA thuần tuý",
      heroDescription:
        "Giúp homestay, boutique hotel có kênh trực tiếp + admin vận hành lịch phòng và giá.",
      problems: [
        "Phụ thuộc OTA, tỉ lệ hoa hồng cao",
        "Tồn phòng cập nhật lệch kênh",
        "Đặt phòng trực tiếp vẫn qua chat",
        "Giá theo mùa / cuối tuần khó quản",
        "Thiếu dữ liệu khách quay lại",
      ],
      capabilities: [
        "Website đặt phòng",
        "Quản lý tồn phòng",
        "Giá theo mùa",
        "Xác nhận & thanh toán cọc",
        "CRM khách lưu trú",
        "Báo cáo công suất",
        "Đồng bộ kênh (tuỳ chọn)",
      ],
      packageItems: ["Website đặt phòng", "Admin phòng & giá", "CRM khách", "Báo cáo công suất"],
    },
    {
      slug: "fitness",
      title: "Giải pháp số cho phòng gym & yoga",
      industry: "Thể thao & Sức khoẻ",
      excerpt:
        "Gói membership, check-in, lịch PT/lớp và gia hạn tự động — giảm sót thu phí và tăng giữ chân hội viên.",
      heroTitle: "Membership và lịch lớp trên một hệ thống vận hành",
      heroDescription:
        "Phù hợp phòng gym, yoga, pilates cần quản lý gói, điểm danh và lịch huấn luyện viên.",
      problems: [
        "Thu phí membership theo dõi trên Excel",
        "Check-in hội viên thủ công",
        "Lịch PT / lớp dễ trùng",
        "Nhắc gia hạn làm tay",
        "Không đo được tỷ lệ giữ chân",
      ],
      capabilities: [
        "Website gói tập",
        "Membership & gia hạn",
        "Check-in hội viên",
        "Lịch lớp / PT",
        "Nhắc gia hạn",
        "CRM hội viên",
        "Bảng doanh thu gói",
      ],
      packageItems: ["Website CLB", "Membership", "Check-in & lịch lớp", "Admin vận hành"],
    },
    {
      slug: "agency",
      title: "Giải pháp số cho agency & studio dịch vụ",
      industry: "Agency & Studio",
      excerpt:
        "Pipeline dự án, báo giá, theo dõi milestone và cổng khách xem tiến độ — giảm email vòng và file rời.",
      heroTitle: "Quản lý dự án dịch vụ và trải nghiệm khách chuyên nghiệp hơn",
      heroDescription:
        "Dành cho agency marketing, studio thiết kế, team outsource cần CRM deal + workspace dự án.",
      problems: [
        "Deal và dự án nằm rời trên nhiều tool",
        "Khách hỏi tiến độ phải trả lời thủ công",
        "Báo giá / phiên bản hợp đồng khó theo dõi",
        "Workload team không nhìn chung",
        "Thiếu dữ liệu để tối ưu bán lại",
      ],
      capabilities: [
        "CRM pipeline",
        "Báo giá & phiên bản",
        "Workspace dự án",
        "Cổng khách xem tiến độ",
        "Phân công task",
        "Thư viện tài sản",
        "Báo cáo doanh thu dự án",
      ],
      packageItems: ["Website agency", "CRM deal", "Cổng dự án", "Cổng khách"],
    },
    {
      slug: "sme-ops",
      title: "Giải pháp số cho vận hành SME",
      industry: "Doanh nghiệp vừa & nhỏ",
      excerpt:
        "Nội bộ hoá quy trình: phê duyệt, hồ sơ nhân sự nhẹ, công việc và báo cáo điều hành — thay quy trình chat.",
      heroTitle: "Đưa quy trình nội bộ lên hệ thống thay vì nhóm chat",
      heroDescription:
        "Phù hợp SME 10–100 người cần công cụ gọn: yêu cầu nội bộ, phê duyệt, theo dõi việc và dashboard quản lý.",
      problems: [
        "Phê duyệt chi phí / nghỉ phép qua chat",
        "Công việc không có nguồn theo dõi chung",
        "Hồ sơ nhân sự / tài liệu nội bộ rời",
        "Quản lý thiếu số liệu realtime",
        "Onboarding nhân sự mới chậm",
      ],
      capabilities: [
        "Portal nội bộ",
        "Quy trình phê duyệt",
        "Quản lý công việc",
        "Thư viện tài liệu",
        "Hồ sơ nhân sự nhẹ",
        "Thông báo nội bộ",
        "Dashboard điều hành",
      ],
      packageItems: ["Portal nội bộ", "Module phê duyệt", "Công việc & báo cáo", "Thư viện tài liệu"],
    },
  ];
  for (const [sortOrder, solution] of solutions.entries()) {
    await prisma.solution.upsert({
      where: { slug: solution.slug },
      update: {
        ...solution,
        problems: JSON.stringify(solution.problems),
        capabilities: JSON.stringify(solution.capabilities),
        packageItems: JSON.stringify(solution.packageItems),
        sortOrder,
        status: ContentStatus.PUBLISHED,
      },
      create: {
        ...solution,
        problems: JSON.stringify(solution.problems),
        capabilities: JSON.stringify(solution.capabilities),
        packageItems: JSON.stringify(solution.packageItems),
        sortOrder,
        status: ContentStatus.PUBLISHED,
      },
    });
  }

  const partners = [
    {
      code: "CTV001",
      name: "Nguyễn Minh Anh",
      company: "CTV Đà Nẵng",
      email: "ctv001@trancongtien.com",
      phone: "0901000001",
      type: "REFERRAL" as const,
      commissionRate: 10,
    },
    {
      code: "CTV002",
      name: "Trần Hoàng Long",
      company: "Sales Partner miền Trung",
      email: "ctv002@trancongtien.com",
      phone: "0901000002",
      type: "SALES" as const,
      commissionRate: 12,
    },
    {
      code: "AGY001",
      name: "Lê Thu Hà",
      company: "Agency Digital Partner",
      email: "agy001@trancongtien.com",
      phone: "0901000003",
      type: "AGENCY" as const,
      commissionRate: 15,
    },
    {
      code: "CTV003",
      name: "Phạm Quốc Bảo",
      company: "CTV TP.HCM",
      email: "ctv003@trancongtien.com",
      phone: "0901000004",
      type: "REFERRAL" as const,
      commissionRate: 10,
    },
    {
      code: "CTV004",
      name: "Võ Thanh Tâm",
      company: "CTV Hà Nội",
      email: "ctv004@trancongtien.com",
      phone: "0901000005",
      type: "SALES" as const,
      commissionRate: 11,
    },
  ];
  for (const partner of partners) {
    await prisma.partner.upsert({
      where: { code: partner.code },
      update: {
        name: partner.name,
        company: partner.company,
        email: partner.email,
        phone: partner.phone,
        type: partner.type,
        status: "APPROVED",
        commissionRate: partner.commissionRate,
        ownershipDays: 30,
        approvedAt: new Date(),
      },
      create: {
        ...partner,
        status: "APPROVED",
        ownershipDays: 30,
        approvedAt: new Date(),
      },
    });
  }

  console.log("Seed OK. Admin:", email, "/", password);
  console.log(`Solutions: ${solutions.length}`);
  console.log("Pilot partners: CTV001, CTV002, CTV003, CTV004, AGY001");

  const { seedEstimator } = await import("./seed-estimator");
  await seedEstimator(prisma);
  console.log("Estimator catalog seeded (products, features, questions, pricing).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
