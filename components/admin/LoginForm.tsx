"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/common/Logo";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@trancongtien.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Đăng nhập thất bại");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1220] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl"
      >
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-center font-display text-2xl font-bold text-ink">
          Admin Login
        </h1>
        <p className="mt-1 text-center text-sm text-ink-muted">
          Quản lý nội dung & đặt lịch tư vấn
        </p>
        <label className="mt-6 block text-sm font-medium">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Mật khẩu
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 h-11 w-full rounded-xl bg-brand font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
