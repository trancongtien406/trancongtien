"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let reg = false;
const gs = () => { if (!reg) { gsap.registerPlugin(ScrollTrigger); reg = true; } };

/**
 * InkReveal: ảnh "loang mực". Bốn vết mực (radial-gradient mềm biên) mở ra từ bốn tâm lệch nhau
 * bằng các biến CSS --i1..--i4 (gsap tween), rồi gỡ mặt nạ. Nội dung hiện đủ khi SSR/no-JS/reduced:
 * trạng thái ẩn chỉ được đặt trong layout effect.
 */
export function InkReveal({ children, className, style, delay = 0, duration = 1.7, trigger = "view", innerScale = 1.14 }: {
  children: ReactNode; className?: string; style?: CSSProperties; delay?: number; duration?: number; trigger?: "view" | "load"; innerScale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useIso(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) { el.setAttribute("data-ink", "static"); return; }
    gs();
    const inner = el.firstElementChild as HTMLElement | null;
    el.setAttribute("data-ink", "armed");
    gsap.set(el, { "--i1": 0, "--i2": 0, "--i3": 0, "--i4": 0 });
    if (inner) gsap.set(inner, { scale: innerScale });
    const play = () => {
      const tl = gsap.timeline({ delay, onComplete: () => { el.setAttribute("data-ink", "done"); gsap.set(el, { clearProps: "--i1,--i2,--i3,--i4" }); if (inner) gsap.set(inner, { clearProps: "transform" }); } });
      tl.to(el, { "--i1": 1.3, duration, ease: "power2.out" }, 0)
        .to(el, { "--i2": 1.3, duration: duration * 1.05, ease: "power2.out" }, 0.12)
        .to(el, { "--i3": 1.3, duration: duration * 0.95, ease: "power2.out" }, 0.24)
        .to(el, { "--i4": 1.3, duration: duration * 1.1, ease: "power2.out" }, 0.08);
      if (inner) tl.to(inner, { scale: 1, duration: duration * 1.3, ease: "power2.out" }, 0);
      return tl;
    };
    let tl: gsap.core.Timeline | null = null;
    let io: IntersectionObserver | null = null;
    if (trigger === "load") tl = play();
    else {
      io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { tl = play(); io?.disconnect(); } }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      io.observe(el);
    }
    // an toàn: nếu IO không bao giờ chạy (tab nền), vẫn mở sau 6s kể từ khi vào trang
    const safety = window.setTimeout(() => { if (el.getAttribute("data-ink") === "armed" && !tl) { tl = play(); } }, 9000);
    return () => { window.clearTimeout(safety); io?.disconnect(); tl?.kill(); };
  }, [delay, duration, trigger, innerScale]);
  return <div ref={ref} className={`${s.ink} ${className ?? ""}`} style={style} data-fx="InkReveal">{children}</div>;
}

/**
 * InkTitle: tiêu đề "mực thấm": từng từ mờ nhoè (blur + hạ độ đậm) rồi nét lại, lệch nhịp.
 * Tách theo TỪ (NBSP giữ nguyên) để dấu tiếng Việt không bao giờ bị cắt.
 */
export function InkTitle({ as = "h2", children, className, delay = 0, trigger = "view", stagger = 0.11 }: {
  as?: ElementType; children: string; className?: string; delay?: number; trigger?: "view" | "load"; stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;
  const words = children.normalize("NFC").split(/(?<=[ ])/u);
  useIso(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const ws = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    gsap.set(ws, { opacity: 0, filter: "blur(14px)", yPercent: 14, scaleX: 1.05 });
    const play = () => gsap.to(ws, { opacity: 1, filter: "blur(0px)", yPercent: 0, scaleX: 1, duration: 1.5, stagger, delay, ease: "power3.out", onComplete: () => { gsap.set(ws, { clearProps: "filter,transform" }); } });
    let tw: gsap.core.Tween | null = null;
    let io: IntersectionObserver | null = null;
    if (trigger === "load") tw = play();
    else { io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { tw = play(); io?.disconnect(); } }, { threshold: 0.3 }); io.observe(el); }
    const safety = window.setTimeout(() => { if (!tw) tw = play(); }, 10000);
    return () => { window.clearTimeout(safety); io?.disconnect(); tw?.kill(); };
  }, [children, delay, trigger, stagger]);
  return (
    <Tag ref={ref} className={className} data-fx="InkTitle">
      {words.map((w, i) => <span key={i} data-w="" style={{ display: "inline-block", whiteSpace: "pre" }}>{w}</span>)}
    </Tag>
  );
}

/** Lá trà trôi nhẹ theo cuộn (parallax nhiều tầng + xoay). Chỉ transform. Tắt khi reduced hoặc màn hẹp. */
export function LeafDrift({ className, leaves = 5 }: { className?: string; leaves?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gs();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const parent = el.parentElement!;
      el.querySelectorAll<HTMLElement>("[data-leaf]").forEach((l, i) => {
        const depth = 0.4 + (i % 3) * 0.45;
        gsap.fromTo(l, { yPercent: 40 * depth, rotate: -12 * depth }, { yPercent: -60 * depth, rotate: 22 * depth, ease: "none", scrollTrigger: { trigger: parent, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        gsap.to(l.firstElementChild, { x: (i % 2 ? 10 : -10), rotate: (i % 2 ? 5 : -5), duration: 4 + i, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
    });
    return () => mm.revert();
  }, []);
  const spots = [
    { l: "6%", t: "12%", w: 90, o: 0.5 }, { l: "88%", t: "24%", w: 120, o: 0.35 }, { l: "74%", t: "70%", w: 70, o: 0.5 },
    { l: "14%", t: "78%", w: 140, o: 0.28 }, { l: "46%", t: "6%", w: 60, o: 0.4 }, { l: "58%", t: "88%", w: 84, o: 0.35 },
  ].slice(0, leaves);
  return (
    <div ref={ref} className={`${s.leafLayer} ${className ?? ""}`} aria-hidden="true">
      {spots.map((p, i) => (
        <span key={i} data-leaf="" className={s.leaf} style={{ left: p.l, top: p.t, width: p.w, opacity: p.o }}>
          <svg viewBox="0 0 100 60" width="100%" fill="none">
            <path d="M3 30C22 4 62 0 97 30C62 60 22 56 3 30Z" fill="currentColor" />
            <path d="M3 30C34 28 66 30 97 30" stroke="#1c1f1d" strokeOpacity=".55" strokeWidth="1.4" />
            <path d="M34 29L48 14M52 29.5L66 17M44 29.5L56 44" stroke="#1c1f1d" strokeOpacity=".4" strokeWidth="1" />
          </svg>
        </span>
      ))}
    </div>
  );
}
