"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";

const NAV = [
  { href: "#thuc-don", label: "Thực đơn" },
  { href: "#happy-hour", label: "Happy hour" },
  { href: "#khong-gian", label: "Không gian" },
  { href: "#su-kien", label: "Nhóm & sự kiện" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <a className={`${s.logo} ${className ?? ""}`} href="#top" aria-label="Tầng Mây, về đầu trang">
      <svg className={s.logoMark} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path className={s.logoCloud} d="M14 40c-5 0-7-7-2-9 1-9 11-12 17-7 3-8 17-8 19 3 8 0 9 13 0 13z" fill="none" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />
        <path className={s.logoLine} d="M16 49h32M23 56h18" fill="none" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
      <span className={s.logoWord} translate="no">
        <span className={s.logoA}>Tầng</span> <span className={`${s.logoB} ${s.flickLogo}`}>Mây</span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className={s.header}>
      <div className={s.headerIn}>
        <Logo />
        <nav className={s.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={s.navLink}>{n.label}</a>
          ))}
        </nav>
        <div className={s.headerCta}>
          <a className={`${s.btn} ${s.btnPink} ${s.btnSm}`} href="#dat-ban">Đặt bàn</a>
          <button ref={btn} type="button" className={s.burger} aria-expanded={open} aria-controls="tm-menu" aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen((v) => !v)}>
            <span aria-hidden="true" className={s.burgerBars} data-open={open || undefined} />
          </button>
        </div>
      </div>
      <div id="tm-menu" className={s.drawer} data-open={open || undefined} hidden={!open}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className={s.drawerLink} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
        <a href="#dat-ban" className={`${s.btn} ${s.btnPink}`} onClick={() => setOpen(false)}>Đặt bàn</a>
      </div>
    </header>
  );
}
