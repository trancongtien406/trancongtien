"use client";

import { useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center bg-gradient-to-b from-rose-50 to-surface">
      <Container className="py-16 text-center">
        <div className="mx-auto mb-6 flex justify-center">
          <Logo showText={false} size={56} />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-500">
          500 — Error
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
          Đã xảy ra lỗi không mong muốn
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-ink-muted">
          Hệ thống gặp sự cố tạm thời. Bạn có thể thử lại, hoặc quay lại sau ít
          phút.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-ink-subtle">Mã: {error.digest}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Thử lại</Button>
          <Button href="/" variant="secondary">
            Về trang chủ
          </Button>
        </div>
      </Container>
    </div>
  );
}
