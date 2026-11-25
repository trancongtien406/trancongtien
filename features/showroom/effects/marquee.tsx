"use client";

import { Children, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap, markReady, observeInView, on, prefersReducedMotion, safeId, useFx } from "./core";

/* ------------------------------------------------------------------ 8. VelocityMarquee */

export type VelocityMarqueeProps = {
  children: ReactNode;
  /** "velocity": JS, tăng tốc theo vận tốc cuộn. "css": thuần CSS (rẻ nhất, không phản ứng cuộn) */
  mode?: "velocity" | "css";
  /** px/giây ở tốc độ nền (velocity) */
  speed?: number;
  /** giây cho một vòng (css) */
  duration?: number;
  direction?: 1 | -1;
  /** hệ số khuếch đại vận tốc cuộn (0 = tắt) */
  boost?: number;
  /** đảo chiều khi cuộn lên */
  reverseOnScrollUp?: boolean;
  /** điều khiển ngoài; undefined = tự quản bằng nút (nếu controls) */
  paused?: boolean;
  pauseOnHover?: boolean;
  /** hiện nút Dừng/Chạy (WCAG 2.2.2) */
  controls?: boolean;
  gap?: string;
  className?: string;
  trackClassName?: string;
  buttonClassName?: string;
  style?: CSSProperties;
  pauseLabel?: string;
  playLabel?: string;
  label?: string;
};

export function VelocityMarquee({
  children, mode = "velocity", speed = 70, duration = 30, direction = 1, boost = 1, reverseOnScrollUp = false, paused, pauseOnHover = true,
  controls = false, gap = "2rem", className, trackClassName, buttonClassName, style, pauseLabel = "Dừng chạy chữ", playLabel = "Chạy chữ", label,
}: VelocityMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const isPaused = paused ?? userPaused;
  const cls = `fxmq${safeId(useId())}`;
  const state = useRef({ paused: isPaused });
  useEffect(() => { state.current.paused = isPaused; }, [isPaused]);

  useFx(ref, (el) => {
    const reduced = prefersReducedMotion();
    if (reduced) { markReady(el, "static"); return; }
    if (mode === "css") { markReady(el, "css"); return; }
    const track = el.querySelector<HTMLElement>("[data-fx-track]")!;
    const group = el.querySelector<HTMLElement>("[data-fx-group]")!;
    let w = group.offsetWidth, pos = 0, hover = false, inView = true, ticking = false;
    let lastY = window.scrollY, vel = 0, boostNow = 0;
    const tick = (_t: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 64) / 1000;
      const y = window.scrollY;
      const raw = dt > 0 ? (y - lastY) / dt : 0; // px/s
      lastY = y;
      vel += (raw - vel) * 0.12;
      boostNow += (Math.min(Math.abs(vel) / 1000, 5) * boost - boostNow) * 0.15;
      let dir = direction;
      if (reverseOnScrollUp && vel < -80) dir = (direction * -1) as 1 | -1;
      if (state.current.paused || (pauseOnHover && hover)) return;
      pos += dir * speed * (1 + boostNow) * dt;
      pos = ((pos % w) + w) % w;
      track.style.transform = `translate3d(${-pos}px,0,0)`;
    };
    const sync = () => {
      const want = inView && !document.hidden;
      if (want && !ticking) { lastY = window.scrollY; gsap.ticker.add(tick); ticking = true; }
      else if (!want && ticking) { gsap.ticker.remove(tick); ticking = false; }
    };
    const ro = new ResizeObserver(() => { w = group.offsetWidth || w; });
    ro.observe(group);
    const offs = [
      observeInView(el, (v) => { inView = v; sync(); }, { rootMargin: "100px" }),
      on(document, "visibilitychange", sync),
      on(el, "pointerenter", () => { hover = true; }),
      on(el, "pointerleave", () => { hover = false; }),
      on(el, "focusin", () => { hover = true; }),
      on(el, "focusout", () => { hover = false; }),
    ];
    sync();
    markReady(el, "velocity");
    return () => { offs.forEach((f) => f()); ro.disconnect(); if (ticking) gsap.ticker.remove(tick); track.style.transform = ""; };
  }, [mode, speed, direction, boost, reverseOnScrollUp, pauseOnHover]);

  const group = (k: number) => (
    <div key={k} data-fx-group="" aria-hidden={k > 0 ? true : undefined}>
      {Children.map(children, (c) => <div data-fx-item="">{c}</div>)}
    </div>
  );
  return (
    <div ref={ref} className={`${cls} ${className ?? ""}`} style={style} role="group" aria-label={label} data-fx="VelocityMarquee" data-paused={isPaused ? "true" : "false"}>
      <style>{`
        .${cls}{overflow:hidden;position:relative;--fx-gap:${gap}}
        .${cls} [data-fx-track]{display:flex;width:max-content;will-change:transform;${mode === "css" ? `animation:${cls}-run ${duration}s linear infinite;animation-direction:${direction === 1 ? "normal" : "reverse"};` : ""}}
        .${cls}[data-paused="true"] [data-fx-track]{animation-play-state:paused}
        ${pauseOnHover ? `.${cls}:hover [data-fx-track],.${cls}:focus-within [data-fx-track]{animation-play-state:paused}` : ""}
        .${cls} [data-fx-group]{display:flex;flex:none;align-items:center;justify-content:space-around;gap:var(--fx-gap);padding-right:var(--fx-gap);min-width:100vw}
        .${cls} [data-fx-item]{flex:none}
        @keyframes ${cls}-run{to{transform:translate3d(-50%,0,0)}}
        @media (prefers-reduced-motion:reduce){
          .${cls} [data-fx-track]{animation:none;transform:none!important;flex-wrap:wrap;width:auto}
          .${cls} [data-fx-group]{min-width:0;flex-wrap:wrap}
          .${cls} [data-fx-group][aria-hidden="true"]{display:none}
        }`}</style>
      <div data-fx-track="" className={trackClassName}>
        {group(0)}
        {group(1)}
      </div>
      {controls && (
        <button type="button" className={buttonClassName} aria-pressed={isPaused} onClick={() => setUserPaused((p) => !p)}>
          {isPaused ? playLabel : pauseLabel}
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ 25. InfiniteHorizontalMarqueeImages */

export type MarqueeImage = { src: string; alt: string; width?: number; height?: number };
export type InfiniteHorizontalMarqueeImagesProps = Omit<VelocityMarqueeProps, "children"> & {
  images: MarqueeImage[];
  /** chiều cao ảnh (px) */
  imageHeight?: number;
  imageClassName?: string;
};

export function InfiniteHorizontalMarqueeImages({ images, imageHeight = 160, imageClassName, mode = "css", ...rest }: InfiniteHorizontalMarqueeImagesProps) {
  return (
    <VelocityMarquee {...rest} mode={mode}>
      {images.map((im, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={im.src + i} src={im.src} alt={im.alt} className={imageClassName} loading="lazy" decoding="async"
          width={im.width} height={im.height ?? imageHeight} draggable={false}
          style={{ height: imageHeight, width: im.width && im.height ? (im.width / im.height) * imageHeight : "auto", display: "block" }}
        />
      ))}
    </VelocityMarquee>
  );
}

