import { Container } from "@/components/common/Container";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Điều khoản sử dụng",
  description: `Điều khoản sử dụng website ${siteConfig.brand}.`,
  path: "/dieu-khoan",
});

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
        Điều khoản sử dụng
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
        <p>
          Khi truy cập website {siteConfig.brand}, bạn đồng ý sử dụng nội dung
          cho mục đích tham khảo hợp pháp và không sao chép hàng loạt vì mục
          đích thương mại khi chưa có sự đồng ý bằng văn bản.
        </p>
        <h2 className="pt-2 font-display text-xl font-bold text-ink">
          Nội dung & tài nguyên
        </h2>
        <p>
          Template và tài nguyên miễn phí được cấp phép sử dụng cá nhân/đội ngũ.
          Việc phân phối lại dưới dạng sản phẩm trả phí cần liên hệ trước.
        </p>
        <h2 className="pt-2 font-display text-xl font-bold text-ink">
          Giới hạn trách nhiệm
        </h2>
        <p>
          Thông tin trên blog và tài nguyên mang tính tham khảo. Quyết định áp
          dụng cho dự án cụ thể thuộc trách nhiệm của bạn hoặc thỏa thuận hợp
          đồng riêng.
        </p>
      </div>
    </Container>
  );
}
