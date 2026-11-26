"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";
import { NAV } from "../data/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
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
        <a className={s.logoLink} href="#top" aria-label="Đất Mơ, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/gom-lo/identity/logo-reversed.svg" alt="Đất Mơ" width={150} height={40} />
        </a>
        <nav className={s.nav} aria-label="Mục chính">
          {NAV.slice(0, 6).map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <a className={`${s.btn} ${s.btnSmall} ${s.headerCta}`} href="#buoi-lam-gom">Đặt chỗ workshop</a>
        <button ref={btn} type="button" className={s.menuBtn} aria-expanded={open} aria-controls="gl-menu" onClick={() => setOpen((o) => !o)}>
          <span className={s.menuIcon} aria-hidden="true" />
          <span>{open ? "Đóng" : "Mục lục"}</span>
        </button>
      </div>
      {open && (
        <div ref={panel} id="gl-menu" className={s.menuPanel} role="dialog" aria-modal="true" aria-label="Mục lục">
          <ul>
            {NAV.map((n, i) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)}><span className={s.menuNo}>{String(i + 1).padStart(2, "0")}</span>{n.label}</a>
              </li>
            ))}
          </ul>
          <a className={`${s.btn}`} href="#buoi-lam-gom" onClick={() => setOpen(false)}>Đặt chỗ workshop</a>
        </div>
      )}
    </header>
  );
}
