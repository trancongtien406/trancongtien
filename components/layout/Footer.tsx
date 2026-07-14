import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Container } from "@/components/common/Container";
import {
  IconFacebook,
  IconGithub,
  IconLinkedin,
  IconYoutube,
} from "@/components/common/SocialIcons";
import { footerLinks, siteConfig } from "@/lib/site";

const socialIcons = [
  { href: siteConfig.social.facebook, label: "Facebook", Icon: IconFacebook },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: IconLinkedin },
  { href: siteConfig.social.github, label: "GitHub", Icon: IconGithub },
  { href: siteConfig.social.youtube, label: "YouTube", Icon: IconYoutube },
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-footer text-slate-300">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="dark" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Full-stack Developer & AI Agent Builder — đồng hành cùng
              startup và doanh nghiệp xây dựng sản phẩm số bền vững.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialIcons.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-brand hover:bg-brand hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-3">
            <FooterColumn title="Dịch vụ" links={footerLinks.services} />
            <FooterColumn title="Dự án" links={footerLinks.projects} />
            <FooterColumn title="Tài nguyên" links={footerLinks.resources} />
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Liên hệ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
            <div className="mt-6">
              <FooterColumn title="Về tôi" links={footerLinks.about.slice(0, 4)} />
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/chinh-sach-bao-mat" className="text-slate-400 hover:text-white">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan" className="text-slate-400 hover:text-white">
              Điều khoản sử dụng
            </Link>
            <a
              href="#top"
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-brand hover:text-white"
              aria-label="Lên đầu trang"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
