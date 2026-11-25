"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";

const NAV = [
  ["#dip", "Dịp"],
  ["#vuon", "Khu vườn"],
  ["#bo-hoa", "Bó hoa"],
  ["#tay-nghe", "Tay nghề"],
  ["#hoi-dap", "Hỏi đáp"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

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
    <header className={s.header} data-solid={solid ? "1" : "0"}>
      <div className={s.headerRow}>
        <nav className={s.nav} aria-label="Điều hướng chính">
          {NAV.slice(0, 3).map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <a className={s.logoLink} href="#dau-trang" aria-label="Nở Rừng, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/hoa-tuoi/identity/logo-reversed.svg" alt="Nở Rừng" width={190} height={48} />
        </a>
        <nav className={`${s.nav} ${s.navRight}`} aria-label="Điều hướng phụ">
          {NAV.slice(3).map(([h, l]) => <a key={h} href={h}>{l}</a>)}
          <a className={`${s.btn} ${s.btnVerm} ${s.btnSm}`} href="#bo-hoa">Dựng bó hoa</a>
        </nav>
        <button ref={btn} type="button" className={s.menuBtn} aria-expanded={open} aria-controls="nr-menu" onClick={() => setOpen((v) => !v)}>
          <span className={s.menuIcon} aria-hidden="true" data-open={open ? "1" : "0"}><i /><i /></span>
          <span className={s.srOnly}>{open ? "Đóng menu" : "Mở menu"}</span>
        </button>
      </div>
      <div id="nr-menu" ref={panel} className={s.menuPanel} hidden={!open}>
        {NAV.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <a className={`${s.btn} ${s.btnVerm}`} href="#bo-hoa" onClick={() => setOpen(false)}>Dựng bó hoa</a>
      </div>
    </header>
  );
}
