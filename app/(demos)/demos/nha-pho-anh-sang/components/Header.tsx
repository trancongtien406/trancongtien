"use client";

import { useEffect, useRef } from "react";
import s from "../brand.module.css";

const NAV = [
  ["01", "Dự án", "#du-an"],
  ["02", "Kiến trúc", "#kien-truc"],
  ["03", "Căn hộ", "#can-ho"],
  ["04", "Vị trí", "#vi-tri"],
] as const;

/** Thanh đầu trang: trong suốt trên hero, sau hero ẩn khi cuộn xuống và hiện lại (nền kính) khi cuộn lên. */
export function Header() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = window.scrollY;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const end = document.querySelector<HTMLElement>("[data-hero-end]");
      const heroEnd = end ? end.getBoundingClientRect().top + y : window.innerHeight;
      const inHero = y < heroEnd - 120;
      el.dataset.solid = inHero ? "0" : "1";
      el.dataset.hide = !inHero && y > last + 2 ? "1" : y < last - 2 || inHero ? "0" : el.dataset.hide ?? "0";
      last = y;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <header ref={ref} className={s.header} data-hide="0" data-solid="0">
      <a href="#top" className={s.logo} aria-label="Nhà Phố Ánh Sáng, về đầu trang"><b>SÁNG</b><span>Nhà phố ánh sáng</span></a>
      <nav className={s.nav} aria-label="Điều hướng chính">
        {NAV.map(([n, t, h]) => (<a key={h} href={h}><i>{n}</i> {t}</a>))}
      </nav>
      <a className={s.headCta} href="#dat-lich">Đặt lịch xem</a>
    </header>
  );
}
