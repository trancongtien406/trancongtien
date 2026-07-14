"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Calendar, Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/90 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="Tran Cong Tien — Trang chủ" className="shrink-0">
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Điều hướng chính"
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-brand" : "text-ink-muted hover:text-ink",
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-brand" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/lien-he"
            size="sm"
            className="hidden sm:inline-flex"
            iconRight={<Calendar className="size-4" />}
          >
            Đặt lịch tư vấn
          </Button>
          <button
            type="button"
            aria-label={dark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
            onClick={() => setDark((v) => !v)}
            className="hidden size-10 items-center justify-center rounded-xl border border-border text-ink-muted transition hover:bg-surface-muted md:inline-flex"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-ink xl:hidden"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border bg-surface xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium",
                    active
                      ? "bg-brand-soft text-brand"
                      : "text-ink-muted hover:bg-surface-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button
              href="/lien-he"
              className="mt-2 w-full"
              iconRight={<Calendar className="size-4" />}
            >
              Đặt lịch tư vấn
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
