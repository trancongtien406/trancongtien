"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "../brand.module.css";

/**
 * Chuyển cảnh mực vào trang (tổng ~1.1s, chỉ lần đầu trong phiên): vòng ensō được vẽ bằng nét cọ,
 * con dấu hiện, rồi một lỗ mực mở rộng từ tâm để lộ trang. Bấm hoặc nhấn phím để bỏ qua.
 * Chỉ mount bằng JS nên no-JS không bị chặn; reduced-motion không hiện.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("tt-intro") === "1"; } catch { /* riêng tư */ }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!show || !el) return;
    const ring = el.querySelector<SVGPathElement>("[data-ring]");
    const seal = el.querySelector<HTMLElement>("[data-seal]");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      try { sessionStorage.setItem("tt-intro", "1"); } catch { /* riêng tư */ }
      setShow(false);
    };
    gsap.set(el, { "--hole": 0 });
    if (ring) gsap.set(ring, { strokeDasharray: 1, strokeDashoffset: 1 });
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(ring, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, 0)
      .fromTo(seal, { opacity: 0, scale: 1.25, rotate: -6 }, { opacity: 1, scale: 1, rotate: -3, duration: 0.3, ease: "power3.out" }, 0.28)
      .to(el.querySelector("[data-mark]"), { opacity: 0, duration: 0.2 }, 0.62)
      .to(el, { "--hole": 1.5, duration: 0.55, ease: "power2.in" }, 0.55);
    const skip = () => { tl.progress(1); };
    window.addEventListener("keydown", skip);
    const safety = window.setTimeout(finish, 2400);
    return () => { window.clearTimeout(safety); window.removeEventListener("keydown", skip); tl.kill(); };
  }, [show]);
  if (!show) return null;
  return (
    <div ref={ref} className={s.preloader} aria-hidden="true" data-fx="Preloader" onClick={() => { try { sessionStorage.setItem("tt-intro", "1"); } catch { /* */ } setShow(false); }}>
      <div data-mark="" className={s.preMark}>
        <svg viewBox="0 0 120 120" width="120" height="120" fill="none">
          <path data-ring="" d="M92 28A44 44 0 1 0 100 62" stroke="#e7e0d2" strokeWidth="5" strokeLinecap="round" pathLength={1} />
        </svg>
        <span data-seal="" className={s.sealBig}>Tịch</span>
      </div>
    </div>
  );
}
