"use client";

import { useEffect, useState } from "react";
import s from "../brand.module.css";
import { NAV } from "../data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  return (
    <header className={`${s.header} ${solid ? s.headerSolid : ""}`}>
      <a className={s.logo} href="#top" aria-label="Tháp Hoàng Hôn, về đầu trang"><i aria-hidden="true">✦</i><span>Tháp Hoàng Hôn</span></a>
      <nav className={s.nav} aria-label="Điều hướng chính">
        {NAV.slice(0, 4).map((n) => (<a key={n.href} href={n.href}>{n.label}</a>))}
      </nav>
      <a className={s.pill} href="#lien-he">Bắt đầu dự án <span aria-hidden="true">→</span></a>
      <button type="button" className={s.burger} aria-expanded={open} aria-controls="th-menu" onClick={() => setOpen((v) => !v)}>
        <span className={s.srOnly}>{open ? "Đóng menu" : "Mở menu"}</span><i aria-hidden="true" /><i aria-hidden="true" />
      </button>
      <div id="th-menu" className={s.menu} data-open={open ? "1" : undefined} hidden={!open}>
        {NAV.map((n) => (<a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>))}
      </div>
    </header>
  );
}
