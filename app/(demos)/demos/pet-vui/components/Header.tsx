"use client";

import { useEffect, useRef, useState } from "react";
import { WagButton } from "./WagButton";
import s from "../brand.module.css";

const NAV = [
  ["#dich-vu", "Dịch vụ"],
  ["#bang-gia", "Bảng giá"],
  ["#quy-trinh", "Quy trình"],
  ["#dat-lich", "Lịch hẹn"],
  ["#hoi-dap", "Hỏi đáp"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={s.header}>
      <div className={s.headerPill}>
        <a className={s.logoLink} href="#dau-trang" aria-label="Bông Xù, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/pet-vui/identity/logo-horizontal.svg" alt="Bông Xù" width={160} height={48} />
        </a>
        <nav className={s.nav} aria-label="Điều hướng chính">
          {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <span className={s.headerCta}><WagButton href="#dat-lich" tone="red">Đặt lịch</WagButton></span>
        <button ref={btn} type="button" className={s.menuBtn} aria-expanded={open} aria-controls="pv-menu" onClick={() => setOpen((v) => !v)}>
          <span className={s.menuIcon} aria-hidden="true" data-open={open ? "1" : "0"}><i /><i /><i /></span>
          <span className={s.srOnly}>{open ? "Đóng menu" : "Mở menu"}</span>
        </button>
      </div>
      <div id="pv-menu" ref={panel} className={s.menuPanel} hidden={!open}>
        {NAV.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <a href="#dat-lich" className={s.menuCta} onClick={() => setOpen(false)}>Đặt lịch cho bé</a>
      </div>
    </header>
  );
}
