"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";

const NAV = [
  { href: "#thuc-don", label: "Thực đơn" },
  { href: "#thu-ruou", label: "Set thử rượu" },
  { href: "#gio-mo-cua", label: "Giờ mở cửa" },
  { href: "#su-kien", label: "Sự kiện" },
];

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="25.5" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <path d="M22 15h20c0 13-2 21-10 23-8-2-10-10-10-23z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M23.3 24q4.35 2.6 8.7 0t8.7 0v-1.4c0 9-2.4 13.6-8.7 15.4-6.3-1.8-8.7-6.4-8.7-15.4z" fill="currentColor" opacity="0.9" />
      <path d="M32 38v12M25 50h14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <a className={`${s.logo} ${className ?? ""}`} href="#top" aria-label="Mộc Vang, về đầu trang">
      <LogoMark className={s.logoMark} />
      <span className={s.logoWord} translate="no">
        Mộc <em>Vang</em>
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
          <a className={`${s.btn} ${s.btnGold} ${s.btnSm}`} href="#dat-ban">Đặt bàn</a>
          <button ref={btn} type="button" className={s.burger} aria-expanded={open} aria-controls="rv-menu" aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen((v) => !v)}>
            <span aria-hidden="true" className={s.burgerBars} data-open={open || undefined} />
          </button>
        </div>
      </div>
      <div id="rv-menu" className={s.drawer} hidden={!open}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className={s.drawerLink} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
        <a href="#dat-ban" className={`${s.btn} ${s.btnGold}`} onClick={() => setOpen(false)}>Đặt bàn</a>
      </div>
    </header>
  );
}
