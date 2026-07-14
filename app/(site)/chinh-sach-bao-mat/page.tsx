import { Container } from "@/components/common/Container";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Chính sách bảo mật",
  description: `Chính sách bảo mật thông tin của ${siteConfig.brand}.`,
  path: "/chinh-sach-bao-mat",
});

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
        Chính sách bảo mật
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
        <p>
          {siteConfig.brand} cam kết bảo vệ thông tin cá nhân bạn cung cấp qua
          form liên hệ, đăng ký nhận email hoặc các kênh liên lạc khác.
        </p>
        <h2 className="pt-2 font-display text-xl font-bold text-ink">
          Dữ liệu chúng tôi thu thập
        </h2>
        <p>
          Họ tên, email, số điện thoại, thông tin dự án và nội dung trao đổi —
          chỉ dùng để phản hồi yêu cầu và cải thiện dịch vụ.
        </p>
        <h2 className="pt-2 font-display text-xl font-bold text-ink">
          Cách sử dụng dữ liệu
        </h2>
        <p>
          Không bán dữ liệu cho bên thứ ba. Có thể dùng nhà cung cấp email/hosting
          uy tín để vận hành website, với thỏa thuận bảo mật phù hợp.
        </p>
        <h2 className="pt-2 font-display text-xl font-bold text-ink">
          Liên hệ
        </h2>
        <p>
          Mọi yêu cầu liên quan quyền riêng tư:{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-brand">
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </Container>
  );
}
