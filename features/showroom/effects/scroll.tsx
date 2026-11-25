"use client";

import { Children, useEffect, useId, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { clamp, gsap, markReady, observeInView, on, prefersReducedMotion, safeId, useFx } from "./core";

type Common = { as?: ElementType; className?: string; style?: CSSProperties };

/* ------------------------------------------------------------------ 4. ParallaxLayer */

export type ParallaxLayerProps = Common & {
  children: ReactNode;
  /** px dịch tối đa mỗi chiều (âm = ngược chiều) */
  distance?: number;
  /** chỉ bật từ độ rộng này trở lên (tắt trên mobile) */
  minWidth?: number;
};

export function ParallaxLayer({ children, as, className, style, distance = 60, minWidth = 768 }: ParallaxLayerProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;
  useFx(ref, (el) => {
    const mm = gsap.matchMedia();
    mm.add(`(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`, () => {
      gsap.fromTo(el, { y: -distance }, {
        y: distance, ease: "none",
        scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
      });
      el.setAttribute("data-fx-ready", "1");
    });
    markReady(el, "static");
    return () => mm.revert();
  }, [distance, minWidth]);
  return <Tag ref={ref} className={className} style={{ willChange: "transform", ...style }} data-fx="ParallaxLayer">{children}</Tag>;
}

/* ------------------------------------------------------------------ 5. PinnedHorizontalScroll */

export type PinnedHorizontalScrollProps = {
  /** mỗi con trực tiếp là một panel */
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  style?: CSSProperties;
  /** độ rộng tối thiểu để bật pin; dưới ngưỡng = cuộn ngang tự nhiên hoặc xếp dọc */
  minWidth?: number;
  mobile?: "scroll" | "stack";
  /** nhân quãng cuộn dọc dành cho chuyển động ngang */
  scrollFactor?: number;
  label?: string;
};

export function PinnedHorizontalScroll({ children, className, trackClassName, style, minWidth = 900, mobile = "scroll", scrollFactor = 1, label = "Thư viện cuộn ngang" }: PinnedHorizontalScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const uid = safeId(useId());
  const cls = `fxph${uid}`;
  useFx(ref, (el) => {
    const viewport = el.querySelector<HTMLElement>("[data-fx-viewport]")!;
    const track = el.querySelector<HTMLElement>("[data-fx-track]")!;
    const mm = gsap.matchMedia();
    mm.add(`(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`, () => {
      viewport.style.overflow = "hidden";
      el.style.minHeight = "100svh";
      el.style.display = "flex";
      el.style.alignItems = "center";
      const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: el, pin: true, scrub: true, start: "top top", end: () => "+=" + dist() * scrollFactor, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      const st = tween.scrollTrigger!;
      const offs = [
        // Tab tới panel ngoài khung: cuộn trang tới đúng tiến độ thay vì để trình duyệt cuộn ngang viewport.
        on(track, "focusin", (e) => {
          const t = (e.target as HTMLElement).closest<HTMLElement>("[data-fx-panel]");
          if (!t || !dist()) return;
          const p = clamp(t.offsetLeft / dist(), 0, 1);
          window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: "instant" });
        }),
        on(viewport, "scroll", () => { viewport.scrollLeft = 0; }),
      ];
      el.setAttribute("data-fx-mode", "pinned");
      return () => {
        offs.forEach((f) => f());
        viewport.style.overflow = ""; el.style.minHeight = ""; el.style.display = ""; el.style.alignItems = "";
      };
    });
    mm.add(`(max-width: ${minWidth - 1}px), (prefers-reduced-motion: reduce)`, () => { el.setAttribute("data-fx-mode", "native"); });
    markReady(el);
    return () => mm.revert();
  }, [minWidth, scrollFactor]);

  const panels = Children.toArray(children);
  return (
    <section ref={ref} className={`${cls} ${className ?? ""}`} style={style} data-fx="PinnedHorizontalScroll">
      <style>{`
        .${cls} [data-fx-viewport]{overflow-x:auto;width:100%;scrollbar-width:thin}
        .${cls} [data-fx-track]{display:flex;width:max-content;will-change:transform}
        .${cls} [data-fx-panel]{flex:0 0 auto}
        ${mobile === "stack" ? `@media (max-width:${minWidth - 1}px){.${cls} [data-fx-viewport]{overflow:visible}.${cls} [data-fx-track]{flex-direction:column;width:auto}}` : ""}
      `}</style>
      <div data-fx-viewport="" tabIndex={0} role="region" aria-label={label}>
        <div data-fx-track="" className={trackClassName}>
          {panels.map((c, i) => <div key={i} data-fx-panel="">{c}</div>)}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 6. StickyChapters */

export type Chapter = { id?: string; content: ReactNode; visual: ReactNode };
export type StickyChaptersProps = {
  chapters: Chapter[];
  /** độ rộng dưới ngưỡng này: một cột, phần hình dính phía trên */
  breakpoint?: number;
  columns?: string;
  stickyTop?: string;
  /** hình ở cột phải thay vì trái */
  visualRight?: boolean;
  className?: string;
  visualClassName?: string;
  chapterClassName?: string;
  onChange?: (index: number) => void;
};

export function StickyChapters({ chapters, breakpoint = 768, columns = "1fr 1fr", stickyTop = "0px", visualRight = true, className, visualClassName, chapterClassName, onChange }: StickyChaptersProps) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef(onChange);
  useEffect(() => { cb.current = onChange; });
  const cls = `fxsc${safeId(useId())}`;
  useFx(ref, (el) => {
    const visuals = Array.from(el.querySelectorAll<HTMLElement>("[data-fx-visual]"));
    const chaps = Array.from(el.querySelectorAll<HTMLElement>("[data-fx-chapter]"));
    const reduced = prefersReducedMotion();
    let active = 0;
    const set = (i: number, animate: boolean) => {
      visuals.forEach((v, k) => {
        const on_ = k === i;
        v.setAttribute("aria-hidden", on_ ? "false" : "true");
        if (!animate || reduced) gsap.set(v, { opacity: on_ ? 1 : 0, y: 0 });
        else gsap.to(v, { opacity: on_ ? 1 : 0, y: on_ ? 0 : (k < i ? -16 : 16), duration: 0.6, ease: "power2.out", overwrite: true });
      });
      chaps.forEach((c, k) => c.setAttribute("data-active", k === i ? "true" : "false"));
      el.setAttribute("data-active", String(i));
    };
    set(0, false);
    const offs = chaps.map((c, i) => observeInView(c, (v) => {
      if (v && i !== active) { active = i; set(i, true); cb.current?.(i); }
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 }));
    markReady(el, reduced ? "static" : "1");
    return () => { offs.forEach((f) => f()); gsap.killTweensOf(visuals); };
  }, [chapters.length]);
  return (
    <div ref={ref} className={`${cls} ${className ?? ""}`} data-fx="StickyChapters">
      <style>{`
        .${cls}{display:grid;grid-template-columns:${columns}}
        .${cls} [data-fx-col]{position:sticky;top:${stickyTop};height:100svh;align-self:start;display:grid;order:${visualRight ? 2 : 1}}
        .${cls} [data-fx-visual]{grid-area:1/1;min-height:0}
        .${cls} [data-fx-chapters]{order:${visualRight ? 1 : 2}}
        .${cls} [data-fx-chapter]{min-height:100svh;display:flex;flex-direction:column;justify-content:center}
        @media (max-width:${breakpoint - 1}px){
          .${cls}{grid-template-columns:1fr}
          .${cls} [data-fx-col]{order:1;height:42svh;z-index:1}
          .${cls} [data-fx-chapters]{order:2}
          .${cls} [data-fx-chapter]{min-height:70svh}
        }`}</style>
      <div data-fx-col="">
        {chapters.map((c, i) => (
          <div key={c.id ?? i} data-fx-visual="" className={visualClassName} style={{ opacity: i === 0 ? 1 : 0 }} aria-hidden={i === 0 ? "false" : "true"}>{c.visual}</div>
        ))}
      </div>
      <div data-fx-chapters="">
        {chapters.map((c, i) => (
          <div key={c.id ?? i} id={c.id} data-fx-chapter="" className={chapterClassName}>{c.content}</div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 17. StackingCards */

export type StackingCardsProps = Common & {
  children: ReactNode;
  /** khoảng cách dính từ mép trên viewport */
  top?: string;
  /** px mỗi thẻ lệch xuống so với thẻ trước khi dính */
  offset?: number;
  /** thẻ phía dưới thu nhỏ thêm mỗi lớp (0 = tắt) */
  scaleStep?: number;
  cardClassName?: string;
};

export function StackingCards({ children, as, className, style, top = "6rem", offset = 18, scaleStep = 0.04, cardClassName }: StackingCardsProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;
  const cards = Children.toArray(children);
  useFx(ref, (el) => {
    const wraps = Array.from(el.querySelectorAll<HTMLElement>("[data-fx-card]"));
    markReady(el, prefersReducedMotion() ? "static" : "1");
    if (prefersReducedMotion() || !scaleStep || wraps.length < 2) return;
    const last = wraps[wraps.length - 1];
    wraps.forEach((w, i) => {
      if (i === wraps.length - 1) return;
      const inner = w.firstElementChild as HTMLElement;
      gsap.to(inner, {
        scale: 1 - (wraps.length - 1 - i) * scaleStep, transformOrigin: "50% 0%", ease: "none",
        scrollTrigger: { trigger: wraps[i + 1], start: "top bottom", endTrigger: last, end: `top ${getComputedStyle(last).top}`, scrub: true },
      });
    });
  }, [cards.length, scaleStep]);
  return (
    <Tag ref={ref} className={className} style={style} data-fx="StackingCards">
      {cards.map((c, i) => (
        <div key={i} data-fx-card="" className={cardClassName} style={{ position: "sticky", top: `calc(${top} + ${i * offset}px)` }}>
          <div>{c}</div>
        </div>
      ))}
    </Tag>
  );
}

