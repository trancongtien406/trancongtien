"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/features/showroom/effects";
import s from "../brand.module.css";

const NAV = [
  { href: "#dich-vu", label: "Kênh thu" },
  { href: "#quy-trinh", label: "Quy trình" },
  { href: "#phong-thu", label: "Phòng thu" },
  { href: "#bang-gia", label: "Bảng giá" },
  { href: "#uoc-tinh", label: "Ước tính" },
  { href: "#dat-lich", label: "Đặt lịch" },
];

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" />
      {[14, 26, 40, 24, 48, 30, 18].map((h, i) => (
        <rect key={i} x={27 + i * 7.5} y={50 - h / 2} width="4.2" height={h} rx="2.1" fill="currentColor" className={s.markBar} style={{ ["--i" as string]: i }} />
      ))}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <a className={`${s.logo} ${className ?? ""}`} href="#top" aria-label="Tần Số Studio, về đầu trang">
      <Mark className={s.logoMark} />
      <span className={s.logoWord} translate="no"><b>Tần Số</b><i>Studio</i></span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className={s.header} data-pt="header">
      <div className={s.headerIn}>
        <Logo />
        <nav className={s.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => (<a key={n.href} href={n.href} className={s.navLink}>{n.label}</a>))}
        </nav>
        <span className={s.timecode} aria-hidden="true" data-pt="tc">00:00:00</span>
        <div className={s.headerCta}>
          <MagneticButton>
            <a className={`${s.btn} ${s.btnHot} ${s.btnSm}`} href="#uoc-tinh">Ước tính buổi thu</a>
          </MagneticButton>
          <button ref={btn} type="button" className={s.burger} aria-expanded={open} aria-controls="pt-menu" aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen((v) => !v)}>
            <span aria-hidden="true" className={s.burgerBars} data-open={open || undefined} />
          </button>
        </div>
      </div>
      <div id="pt-menu" className={s.drawer} hidden={!open}>
        {NAV.map((n) => (<a key={n.href} href={n.href} className={s.drawerLink} onClick={() => setOpen(false)}>{n.label}</a>))}
        <a href="#uoc-tinh" className={`${s.btn} ${s.btnHot}`} onClick={() => setOpen(false)}>Ước tính buổi thu</a>
      </div>
    </header>
  );
}
