"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";

const NAV = [
  { href: "#dich-vu", t: "Dịch vụ" },
  { href: "#builder", t: "Thiết kế móng" },
  { href: "#cam-hung", t: "Cảm hứng" },
  { href: "#quy-trinh", t: "Quy trình" },
  { href: "#hoi-dap", t: "Hỏi đáp" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const consult = buildConsultHref("nail-pop");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>("a,button")).concat(btn.current!);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={s.header}>
      <div className={`${s.wrap} ${s.headerRow}`}>
        <a className={s.logoLink} href="#top" aria-label="Chấm Chanh, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/nail-pop/identity/logo-horizontal.svg" alt="" width={172} height={30} />
        </a>
        <nav className={s.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.t}</a>)}
        </nav>
        <div className={s.headerCta}>
          <MagneticButton strength={0.25} max={8}>
            <a className={`${s.btn} ${s.btnPink}`} href={consult}>Đặt lịch</a>
          </MagneticButton>
        </div>
        <button ref={btn} type="button" className={s.burger} aria-expanded={open} aria-controls="np-menu" aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen((v) => !v)}>
          <span aria-hidden="true" className={s.burgerBars} data-open={open ? "1" : "0"} />
        </button>
      </div>
      {open && (
        <div id="np-menu" ref={panel} className={s.menu}>
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.t}</a>)}
          <a className={`${s.btn} ${s.btnPink}`} href={consult}>Đặt lịch</a>
        </div>
      )}
    </header>
  );
}
