export const siteConfig = {
  name: "Tran Cong Tien",
  fullName: "Trần Công Tiến",
  brand: "TRAN CONG TIEN",
  tagline: "Full-stack Developer & AI Agent Builder",
  description:
    "Full-stack developer tại Đà Nẵng chuyên thiết kế và phát triển website, ứng dụng web/mobile, hệ thống AI Agent và giải pháp số thực tế cho startup, doanh nghiệp.",
  url: "https://trancongtien.com",
  locale: "vi_VN",
  language: "vi",
  personImage: "/images/avatars/tran-cong-tien-full-stack-ai-agent.png",
  email: "trancongtien406@gmail.com",
  phone: "+84 382 802 406",
  phoneDisplay: "0382 802 406",
  location: "Đà Nẵng, Việt Nam",
  workingHours: "T2 – T6: 9:00 – 18:00",
  social: {
    facebook: "https://facebook.com/trancongtien406",
    linkedin: "https://linkedin.com/in/trancongtien406",
    github: "https://github.com/trancongtien406",
    youtube: "https://youtube.com/@trancongtien406",
    zalo: "https://zalo.me/0382802406",
    messenger: "https://m.me/trancongtien406",
  },
  stats: {
    projects: "20+",
    domains: "5+",
    years: "3+",
    satisfaction: "100%",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/quy-trinh", label: "Quy trình" },
  { href: "/ve-toi", label: "Về tôi" },
  { href: "/tai-nguyen", label: "Tài nguyên" },
  { href: "/blog", label: "Blog" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

export const footerLinks = {
  services: [
    { href: "/dich-vu#kham-pha", label: "Khám phá & Tư vấn" },
    { href: "/dich-vu#thiet-ke", label: "Thiết kế UI/UX" },
    { href: "/dich-vu#phat-trien", label: "Phát triển sản phẩm" },
    { href: "/dich-vu#trien-khai", label: "Triển khai & DevOps" },
    { href: "/dich-vu#toi-uu", label: "Tối ưu & Phát triển" },
  ],
  projects: [
    { href: "/du-an?cat=marketplace", label: "Marketplace" },
    { href: "/du-an?cat=booking", label: "Booking System" },
    { href: "/du-an?cat=crm", label: "CRM / SaaS" },
    { href: "/du-an?cat=mobile", label: "Mobile App" },
    { href: "/du-an?cat=ai", label: "AI Agent & Automation" },
  ],
  resources: [
    { href: "/blog", label: "Blog" },
    { href: "/tai-nguyen", label: "Templates" },
    { href: "/tai-nguyen#guides", label: "Hướng dẫn" },
    { href: "/tai-nguyen#ui-kit", label: "UI Kit" },
    { href: "/tai-nguyen#checklist", label: "Checklist" },
  ],
  about: [
    { href: "/ve-toi", label: "Giới thiệu" },
    { href: "/ve-toi#story", label: "Câu chuyện" },
    { href: "/ve-toi#journey", label: "Hành trình" },
    { href: "/quy-trinh", label: "Quy trình làm việc" },
    { href: "/lien-he", label: "Liên hệ" },
  ],
} as const;
