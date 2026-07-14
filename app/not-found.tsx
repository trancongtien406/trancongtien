import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-gradient-to-b from-brand-soft/40 to-surface">
      <Container className="py-16 text-center">
        <div className="mx-auto mb-6 flex justify-center">
          <Logo showText={false} size={56} />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
          404 — Not Found
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
          Trang bạn tìm không tồn tại
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-ink-muted">
          Đường dẫn có thể đã đổi hoặc nội dung đã được gỡ. Hãy quay về trang chủ
          hoặc xem blog / dự án mới nhất.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" iconLeft={<Home className="size-4" />}>
            Về trang chủ
          </Button>
          <Button href="/blog" variant="secondary" iconLeft={<Search className="size-4" />}>
            Xem Blog
          </Button>
          <Link href="/lien-he" className="text-sm font-semibold text-brand hover:underline">
            Liên hệ hỗ trợ
          </Link>
        </div>
      </Container>
    </div>
  );
}
