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

  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      notifyEmail: process.env.NOTIFY_EMAIL || email,
      notifyPhone: process.env.NOTIFY_PHONE || "+84382802406",
      logoUrl: "/icon.png",
      faviconUrl: "/favicon.ico",
      seoTitle: "TRAN CONG TIEN | Product Engineering Studio",
      seoDescription:
        "Studio kỹ thuật sản phẩm giúp startup biến ý tưởng thành sản phẩm số thực tế.",
    },
  });

  const cats = [
    { name: "Tự duy sản phẩm", slug: "tu-duy-san-pham" },
    { name: "Kiến trúc hệ thống", slug: "kien-truc-he-thong" },
    { name: "Frontend", slug: "frontend" },
    { name: "AI & Sản phẩm", slug: "ai-san-pham" },
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

  const posts = [
    {
      slug: "kien-truc-microservices",
      title: "Kiến trúc Microservices cho startup: Khi nào nên và không nên?",
      excerpt:
        "Phân tích thực chiến về khi nào tách service mang lại giá trị, và khi nào monolith vẫn thông minh hơn.",
      content:
        "## Tổng quan\nMicroservices không phải mặc định cho mọi startup.\n\n## Khi nào nên\n- Team lớn, domain rõ\n- Scale độc lập\n\n## Khi nào không\n- MVP giai đoạn sớm\n- Team nhỏ",
      coverUrl: "/images/illustrations/services-devices.png",
      tags: JSON.stringify(["Kiến trúc", "Backend"]),
      categoryId: arch?.id,
      readTime: "8 phút đọc",
    },
    {
      slug: "nextjs-14-app-router",
      title: "Next.js App Router trong sản phẩm thật: Bài học sau 3 dự án",
      excerpt:
        "Những pattern hiệu quả với Server Components, caching và SEO khi dùng App Router ở production.",
      content:
        "## Server Components\nƯu tiên RSC cho trang nội dung.\n\n## Caching\nHiểu revalidate và force-dynamic khi có upload.",
      coverUrl: "/images/illustrations/blog-hero-desk.png",
      tags: JSON.stringify(["Next.js", "Frontend"]),
      categoryId: frontend?.id,
      readTime: "10 phút đọc",
    },
    {
      slug: "clean-code-product",
      title: "Clean Code không đủ: Tư duy sản phẩm trong từng pull request",
      excerpt:
        "Kết hợp kỹ thuật sạch với mục tiêu kinh doanh để mỗi thay đổi tạo ra giá trị đo được.",
      content: "## Outcome over output\nMỗi PR nên trả lời: giá trị người dùng là gì?",
      coverUrl: "/images/illustrations/process-roadmap.png",
      tags: JSON.stringify(["Clean Code", "Product"]),
      categoryId: product?.id,
      readTime: "7 phút đọc",
    },
    {
      slug: "ai-trong-product",
      title: "Đưa AI vào sản phẩm mà không phá UX",
      excerpt:
        "Checklist thực tế để tích hợp AI features có kiểm soát rủi ro, chi phí và trải nghiệm.",
      content: "## Nguyên tắc\nAI hỗ trợ, không thay thế quyết định chính của UX.",
      coverUrl: "/images/illustrations/projects-hero-devices.png",
      tags: JSON.stringify(["AI", "UX"]),
      categoryId: ai?.id,
      readTime: "9 phút đọc",
    },
    {
      slug: "mvp-roadmap",
      title: "Xây MVP trong 6 tuần: Khung làm việc tôi dùng với startup",
      excerpt:
        "Từ discovery đến launch — khung ưu tiên tính năng và tránh scope creep.",
      content: "## Tuần 1-2 Discovery\n## Tuần 3-5 Build\n## Tuần 6 Launch",
      coverUrl: "/images/illustrations/about-outdoors.png",
      tags: JSON.stringify(["MVP", "Startup"]),
      categoryId: product?.id,
      readTime: "6 phút đọc",
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
        "Marketplace thời trang kết nối seller và buyer với trải nghiệm realtime.",
      content:
        "## Bài toán\nKết nối người bán và người mua thời trang.\n\n## Giải pháp\nApp Flutter + NestJS API + Socket realtime.",
      coverUrl: "/images/illustrations/projects-hero-devices.png",
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
      role: "Product Engineer",
      timeframe: "03/2024 – 08/2024",
      platform: "iOS, Android, Web",
      tone: "bg-violet-50",
      sortOrder: 1,
    },
    {
      slug: "smart-booking",
      title: "Smart Booking System",
      category: "Booking",
      description: "Hệ thống đặt lịch thông minh cho spa, clinic và dịch vụ.",
      content: "## Booking flow\nCalendar multi-staff + Stripe + reminders.",
      coverUrl: "/images/illustrations/services-devices.png",
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
      description: "CRM theo dõi pipeline, KPI và dự báo doanh thu.",
      content: "## Dashboard\nKanban + charts + RBAC.",
      coverUrl: "/images/illustrations/blog-hero-desk.png",
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
      description: "App chụp ảnh sự kiện với filter và in Bluetooth.",
      content: "## Offline-first\nHive storage + Bluetooth printing.",
      coverUrl: "/images/illustrations/about-outdoors.png",
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
      category: "AI Solution",
      description: "Tìm kiếm ngữ nghĩa tài liệu nội bộ bằng vector DB.",
      content: "## Pipeline\nIngest → Embed → Qdrant → Rank.",
      coverUrl: "/images/illustrations/process-roadmap.png",
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
      color: "bg-emerald-50 text-emerald-600",
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
      color: "bg-orange-50 text-orange-600",
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
      color: "bg-pink-50 text-pink-600",
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
      title: "Product Engineering",
      description: "Kết hợp tư duy sản phẩm với kỹ thuật trong dự án startup.",
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
      title: "Product Engineering Studio",
      description: "Đồng hành startup từ ý tưởng đến sản phẩm và tăng trưởng.",
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
