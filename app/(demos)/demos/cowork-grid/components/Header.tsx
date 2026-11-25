"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { NAV } from "../data/content";
import { LiveClock } from "./LiveClock";

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const consult = buildConsultHref("cowork-grid");

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>("a,button")).concat(btn.current ? [btn.current] : []);
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", key); };
  }, [open]);

  return (
    <header className={`${s.header} ${solid ? s.headerSolid : ""}`}>
      <div className={`${s.wrap} ${s.headerRow}`}>
        <a className={s.logoLink} href="#top" aria-label="Ô Lưới, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/cowork-grid/identity/logo-horizontal.svg" alt="Ô Lưới" width={110} height={44} />
        </a>
        <nav className={s.nav} aria-label="Mục chính">
          {NAV.map((n, i) => <a key={n.href} href={n.href}><i>{String(i + 1).padStart(2, "0")}</i>{n.label}</a>)}
        </nav>
        <LiveClock className={s.headClock} />
        <div className={s.headerCta}>
          <MagneticButton strength={0.3} max={8}>
            <a className={`${s.btn} ${s.btnOrange} ${s.btnSm}`} href={consult}>Đặt lịch tham quan</a>
          </MagneticButton>
        </div>
        <button ref={btn} type="button" className={s.menuBtn} aria-expanded={open} aria-controls="cg-menu" onClick={() => setOpen((o) => !o)}>
          <span className={s.menuIcon} aria-hidden="true" />
          <span>{open ? "Đóng" : "Menu"}</span>
        </button>
      </div>
      {open && (
        <div ref={panel} id="cg-menu" className={s.menuPanel} role="dialog" aria-modal="true" aria-label="Menu">
          <ul>
            {NAV.map((n, i) => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}><span className={s.menuNo}>{String(i + 1).padStart(2, "0")}</span>{n.label}</a></li>
            ))}
          </ul>
          <LiveClock className={s.menuClock} />
          <a className={`${s.btn} ${s.btnOrange}`} href={consult} onClick={() => setOpen(false)}>Đặt lịch tham quan</a>
        </div>
      )}
    </header>
  );
}
