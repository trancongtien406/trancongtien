"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";

/** Màn hình tải: bộ đếm 0 -> 100, chấm đỏ giữa trang. Chỉ gắn sau khi hydrate nên SSR/không JS hiện đủ nội dung. */
export function Preloader() {
  const [on, setOn] = useState(false);
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1700);
      setN(Math.round(100 * (1 - Math.pow(1 - k, 2.2))));
      if (k < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setGone(true), 250);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  if (!on) return null;
  return (
    <div className={s.pre} data-gone={gone} aria-hidden="true">
      <span className={s.preDot} />
      <b className={s.preNum}>{n}</b>
    </div>
  );
}

const CHAPS: [string, string][] = [["top", "Mở đầu"], ["gioi-thieu", "Giới thiệu"], ["dich-vu", "Dịch vụ"], ["du-an", "Dự án"], ["quy-trinh", "Quy trình"], ["lien-he", "Liên hệ"]];

/** Thanh chương kiểu timeline phim: mã thời gian chạy + các mục, mục hiện tại có chấm đỏ. */
export function ChapterBar() {
  const [active, setActive] = useState("top");
  const tcRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t0 = performance.now();
    const pad = (v: number) => String(v).padStart(2, "0");
    const id = window.setInterval(() => {
      const ms = performance.now() - t0, sec = Math.floor(ms / 1000);
      if (tcRef.current) tcRef.current.textContent = `00:${pad(Math.floor(sec / 60) % 60)}:${pad(sec % 60)}:${pad(Math.floor((ms % 1000) / 41.7))}`;
    }, 83);
    const tick = () => {
      if (clockRef.current) clockRef.current.textContent = new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Ho_Chi_Minh" }).format(new Date());
    };
    tick();
    const cid = window.setInterval(tick, 20000);
    return () => { clearInterval(id); clearInterval(cid); };
  }, []);

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-chap]")];
    const vis = new Map<Element, number>();
    const io = new IntersectionObserver((en) => {
      en.forEach((e) => vis.set(e.target, e.isIntersecting ? e.intersectionRatio : 0));
      let best: HTMLElement | null = null, bv = 0;
      els.forEach((el) => { const v = vis.get(el) || 0; if (v > bv) { bv = v; best = el; } });
      if (best) setActive((best as HTMLElement).dataset.chap || "top");
    }, { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <div className={s.hud} role="navigation" aria-label="Các chương của trang">
      <span className={s.tc} ref={tcRef} aria-hidden="true">00:00:00:00</span>
      <ul>
        {CHAPS.map(([id, label]) => (
          <li key={id} data-on={active === id}><a href={`#${id}`} aria-current={active === id ? "true" : undefined}>{label}</a></li>
        ))}
      </ul>
      <span className={s.clock} aria-hidden="true">Bây giờ là <span ref={clockRef}>--:--</span> ở Hà Nội</span>
    </div>
  );
}
