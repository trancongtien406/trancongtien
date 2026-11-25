"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { isValidEmail } from "@/lib/validation";

export function PartnerLoginForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <section className="border-b border-border bg-surface-muted py-16 sm:py-24">
      <Container className="max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          Cổng đối tác
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
          Đăng nhập chương trình giới thiệu
        </h1>
        <p className="mt-4 text-sm leading-7 text-ink-muted">
          Dùng mã partner và email đã được duyệt để đăng ký lead và theo dõi
          trạng thái được phép công khai.
        </p>
        <form
          className="mt-8 space-y-4 rounded-3xl border border-border bg-surface p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            if (!isValidEmail(email)) {
              setError("Email không hợp lệ");
              return;
            }
            setLoading(true);
            try {
              const res = await fetch("/api/partner/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, email }),
              });
              const result = (await res.json().catch(() => null)) as {
                error?: string;
              } | null;
              if (!res.ok) throw new Error(result?.error || "Đăng nhập thất bại");
              router.push("/doi-tac/bang-dieu-khien");
              router.refresh();
            } catch (err) {
              setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
            } finally {
              setLoading(false);
            }
          }}
        >
          <label className="block text-sm">
            Mã partner
            <input
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="mt-1.5 h-11 w-full rounded-xl border border-border px-3 uppercase outline-none focus:ring-2 focus:ring-brand/30"
              placeholder="CTV001"
            />
          </label>
          <label className="block text-sm">
            Email đăng ký
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <Button type="submit" size="lg" className="w-full">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
        <p className="mt-6 text-sm text-ink-muted">
          Chưa có mã?{" "}
          <Link href="/lien-he" className="font-semibold text-brand">
            Liên hệ để tham gia pilot
          </Link>
        </p>
      </Container>
    </section>
  );
}
