"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "../brand.module.css";

/**
 * Cờ caro quét qua màn hình lúc vào trang (tổng 1.0s, chỉ lần đầu trong phiên): biểu tượng V bật ra,
 * rồi 6 dải caro trượt đi xen kẽ hai hướng để lộ trang. Click hoặc phím bất kỳ để bỏ qua.
 * Chỉ mount bằng JS (no-JS không bị chặn), reduced-motion không hiện, có bộ hẹn an toàn.
 */
export const INTRO_KEY = "vx-intro";
const BARS = 6;

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(INTRO_KEY) === "1"; } catch { /* riêng tư */ }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!show || !el) return;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* riêng tư */ }
      setShow(false);
    };
    const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
    const mark = el.querySelector<HTMLElement>("[data-mark]");
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(mark, { scale: 0.6, opacity: 0, skewX: -14 }, { scale: 1, opacity: 1, skewX: 0, duration: 0.28, ease: "back.out(2)" }, 0)
      .to(mark, { x: "140vw", skewX: -24, duration: 0.34, ease: "power3.in" }, 0.36)
      .to(bars, { xPercent: (i) => (i % 2 ? -101 : 101), duration: 0.42, ease: "power3.inOut", stagger: 0.04 }, 0.5);
    const skip = () => tl.progress(1);
    window.addEventListener("keydown", skip);
    const safety = window.setTimeout(finish, 2200);
    return () => { window.clearTimeout(safety); window.removeEventListener("keydown", skip); tl.kill(); };
  }, [show]);
  if (!show) return null;
  return (
    <div ref={ref} className={s.preloader} aria-hidden="true" data-fx="Preloader" onClick={() => { try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* */ } setShow(false); }}>
      {Array.from({ length: BARS }, (_, i) => <span key={i} data-bar="" className={s.preBar} style={{ top: `${(i * 100) / BARS}%`, height: `${100 / BARS + 0.4}%` }} />)}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-mark="" className={s.preMark} src="/images/demos/phuot-xe/identity/symbol.svg" alt="" width={120} height={120} />
    </div>
  );
}
