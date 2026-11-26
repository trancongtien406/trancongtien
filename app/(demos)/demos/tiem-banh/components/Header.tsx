"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";

const NAV = [
  ["#tu-banh", "Tủ bánh"],
  ["#bang-gia", "Bảng giá"],
  ["#mua-dip", "Theo mùa"],
  ["#giao-nhan", "Giao nhận"],
  ["#hoi-dap", "Hỏi đáp"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${s.header} ${s.noPrint}`}>
      <div className={s.headerPill}>
        <a className={s.logoLink} href="#dau-trang" aria-label="Mây Kẹo, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/tiem-banh/identity/logo-horizontal.svg" alt="Mây Kẹo" width={170} height={57} />
        </a>
        <nav className={s.nav} aria-label="Điều hướng chính">
          {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <a className={`${s.btn} ${s.btnPink} ${s.headerCta}`} href="#bang-gia">Đặt bánh</a>
        <button ref={btn} type="button" className={s.menuBtn} aria-expanded={open} aria-controls="mk-menu" onClick={() => setOpen((v) => !v)}>
          <span className={s.menuIcon} aria-hidden="true" data-open={open ? "1" : "0"}><i /><i /><i /></span>
          <span className={s.srOnly}>{open ? "Đóng menu" : "Mở menu"}</span>
        </button>
      </div>
      <div id="mk-menu" ref={panel} className={s.menuPanel} hidden={!open}>
        {NAV.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
      </div>
    </header>
  );
}
