"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { NAV } from "../data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const consult = buildConsultHref("phuot-xe");

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
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
        <a className={s.logoLink} href="#top" aria-label="Vọt, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/phuot-xe/identity/logo-reversed.svg" alt="Vọt Motor Rental" width={138} height={40} />
        </a>
        <nav className={s.nav} aria-label="Mục chính">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className={s.headerCta}>
          <MagneticButton strength={0.3} max={10}>
            <a className={`${s.btn} ${s.btnYellow} ${s.btnSm}`} href={consult}>Tư vấn thuê xe</a>
          </MagneticButton>
        </div>
        <button ref={btn} type="button" className={s.menuBtn} aria-expanded={open} aria-controls="vx-menu" onClick={() => setOpen((o) => !o)}>
          <span className={s.menuIcon} aria-hidden="true" />
          <span>{open ? "Đóng" : "Menu"}</span>
        </button>
      </div>
      <span className={s.headerStripe} aria-hidden="true" />
      {open && (
        <div ref={panel} id="vx-menu" className={s.menuPanel} role="dialog" aria-modal="true" aria-label="Menu">
          <ul>
            {NAV.map((n, i) => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}><span className={s.menuNo}>{String(i + 1).padStart(2, "0")}</span>{n.label}</a></li>
            ))}
          </ul>
          <a className={`${s.btn} ${s.btnYellow}`} href={consult} onClick={() => setOpen(false)}>Tư vấn thuê xe</a>
        </div>
      )}
    </header>
  );
}
