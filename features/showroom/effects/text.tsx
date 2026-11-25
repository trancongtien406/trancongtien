"use client";

import { Fragment, useEffect, useId, useRef, useState, type CSSProperties, type ElementType } from "react";
import {
  clamp, escapeHtml, gsap, markReady, nfc, observeInView, prefersReducedMotion, srOnly, useFx, useFxLayout, whenFontsReady, safeId,
} from "./core";

type Common = { as?: ElementType; className?: string; style?: CSSProperties };

/* ------------------------------------------------------------------ 1. SplitReveal */

export type SplitRevealProps = Common & {
  children: string;
  /** "words": mỗi từ lên lần lượt. "lines": đo dòng sau khi font tải, cả dòng lên cùng lúc. */
  mode?: "words" | "lines";
  trigger?: "view" | "load";
  duration?: number;
  /** giây giữa hai từ (words) hoặc hai dòng (lines) */
  stagger?: number;
  delay?: number;
  from?: "bottom" | "top";
  /** đệm dọc của mặt nạ để dấu tiếng Việt (Ệ, Ử, Ắ...) không bị cắt */
  padY?: string;
  wordClassName?: string;
  onDone?: () => void;
};

const WORD_SPLIT = /[ \t\n\r]+/; // không dùng \s: giữ NBSP giữa số và đơn vị

export function SplitReveal({
  children, as, className, style, mode = "words", trigger = "view", duration = 0.9, stagger, delay = 0,
  from = "bottom", padY = "0.18em", wordClassName, onDone,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const words = nfc(children).split(WORD_SPLIT).filter(Boolean);
  const step = stagger ?? (mode === "lines" ? 0.12 : 0.045);
  const Tag = (as ?? "div") as ElementType;

  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const wraps = Array.from(el.querySelectorAll<HTMLElement>("[data-fx-w]"));
    const inners = wraps.map((w) => w.firstElementChild as HTMLElement);
    gsap.set(inners, { yPercent: from === "bottom" ? 115 : -115 });
    let dead = false;
    const offs: Array<() => void> = [];
    const lineIndex = () => {
      let line = -1, last = -1e9;
      return wraps.map((w) => {
        const t = w.offsetTop;
        if (Math.abs(t - last) > 2) { line++; last = t; }
        return line;
      });
    };
    const play = () => {
      if (dead) return;
      const idx = mode === "lines" ? lineIndex() : null;
      gsap.to(inners, {
        yPercent: 0, duration, ease: "power3.out",
        delay: (i: number) => delay + (idx ? idx[i] : i) * step,
        onComplete: () => {
          gsap.set(inners, { clearProps: "transform" });
          wraps.forEach((w) => { w.style.overflow = "visible"; });
          onDone?.();
        },
      });
    };
    whenFontsReady().then(() => {
      if (dead) return;
      markReady(el);
      if (trigger === "load") play();
      else offs.push(observeInView(el, (v) => v && play(), { once: true }));
    });
    return () => { dead = true; offs.forEach((f) => f()); };
  }, [children, mode, trigger, duration, step, delay, from]);

  return (
    <Tag ref={ref} className={className} style={style} data-fx="SplitReveal">
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span
            data-fx-w=""
            className={wordClassName}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBlock: padY, marginBlock: `calc(${padY} * -1)` }}
          >
            <span style={{ display: "inline-block" }}>{w}</span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
export const SplitWords = (p: Omit<SplitRevealProps, "mode">) => <SplitReveal {...p} mode="words" />;
export const SplitLines = (p: Omit<SplitRevealProps, "mode">) => <SplitReveal {...p} mode="lines" />;

/* ------------------------------------------------------------------ 2. TextScramble */

const graphemes = (s: string): string[] => {
  const Seg = (Intl as unknown as { Segmenter?: new (l: string, o: object) => { segment(s: string): Iterable<{ segment: string }> } }).Segmenter;
  if (Seg) return Array.from(new Seg("vi", { granularity: "grapheme" }).segment(s), (x) => x.segment);
  return Array.from(s);
};

export type TextScrambleProps = Common & {
  children: string;
  trigger?: "view" | "load" | "hover";
  duration?: number;
  /** giây trễ giữa hai từ */
  wordStagger?: number;
  charset?: string;
};

export function TextScramble({
  children, as, className, style, trigger = "view", duration = 0.7, wordStagger = 0.07,
  charset = "abcdefghijklmnopqrstuvwxyz0123456789#%&*+=",
}: TextScrambleProps) {
  const ref = useRef<HTMLElement>(null);
  const text = nfc(children);
  const Tag = (as ?? "span") as ElementType;

  useFx(ref, (el) => {
    const view = el.querySelector<HTMLElement>("[data-fx-view]");
    if (!view) return;
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const parts = text.split(/([ \t\n\r]+)/).map((p) => ({ ws: /^[ \t\n\r]+$/.test(p), g: graphemes(p) }));
    const wordIdx: number[] = [];
    parts.forEach((p, i) => { if (!p.ws) wordIdx.push(i); });
    const total = duration + wordStagger * Math.max(0, wordIdx.length - 1);
    const rnd = () => charset[(Math.random() * charset.length) | 0];
    const isLetter = (c: string) => /[\p{L}\p{N}]/u.test(c);
    const st = { t: 0 };
    let last = 0, tween: gsap.core.Tween | null = null;
    const render = () => {
      const out = parts.map((p, i) => {
        if (p.ws) return p.g.join("");
        const wi = wordIdx.indexOf(i);
        const wp = clamp((st.t - wi * wordStagger) / duration, 0, 1);
        const keep = Math.floor(wp * p.g.length);
        return p.g.map((c, k) => (k < keep || !isLetter(c) ? c : rnd())).join("");
      });
      view.textContent = out.join("");
    };
    const run = () => {
      tween?.kill();
      st.t = 0;
      tween = gsap.to(st, {
        t: total, duration: total, ease: "none",
        onUpdate: () => { const n = performance.now(); if (n - last > 33) { last = n; render(); } },
        onComplete: () => { view.textContent = text; },
      });
    };
    const offs: Array<() => void> = [];
    if (trigger === "view") offs.push(observeInView(el, (v) => v && run(), { once: true }));
    else if (trigger === "load") run();
    else {
      el.addEventListener("pointerenter", run);
      offs.push(() => el.removeEventListener("pointerenter", run));
    }
    markReady(el);
    return () => { offs.forEach((f) => f()); tween?.kill(); view.textContent = text; };
  }, [text, trigger, duration, wordStagger, charset]);

  return (
    <Tag ref={ref} className={className} style={style} data-fx="TextScramble">
      <span aria-hidden="true" data-fx-view="" dangerouslySetInnerHTML={{ __html: escapeHtml(text) }} />
      <span style={srOnly}>{text}</span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ 7. ScrollScrubText */

export type ScrollScrubTextProps = Common & {
  children: string;
  /** độ mờ ban đầu của từ chưa sáng */
  dim?: number;
  start?: string;
  end?: string;
};

export function ScrollScrubText({ children, as, className, style, dim = 0.2, start = "top 85%", end = "bottom 50%" }: ScrollScrubTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = nfc(children).split(WORD_SPLIT).filter(Boolean);
  const Tag = (as ?? "p") as ElementType;
  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const ws = el.querySelectorAll<HTMLElement>("[data-fx-w]");
    gsap.set(ws, { opacity: dim });
    gsap.to(ws, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start, end, scrub: true } });
    markReady(el);
  }, [children, dim, start, end]);
  return (
    <Tag ref={ref} className={className} style={style} data-fx="ScrollScrubText">
      {words.map((w, i) => (
        <Fragment key={i}>{i > 0 ? " " : null}<span data-fx-w="">{w}</span></Fragment>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ 9/26. Counter, Odometer, NumberTicker */

const fmt = (n: number, locale: string, decimals: number) =>
  new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

export type CounterProps = Common & {
  value: number;
  from?: number;
  duration?: number;
  decimals?: number;
  locale?: string;
  prefix?: string;
  suffix?: string;
  trigger?: "view" | "load";
  /** true: khi value đổi sau lần đầu thì tween sang giá trị mới (dùng cho NumberTicker) */
  animateOnChange?: boolean;
};

export function Counter({
  value, from = 0, duration = 1.4, decimals = 0, locale = "vi-VN", prefix = "", suffix = "", trigger = "view",
  as, className, style, animateOnChange = false,
}: CounterProps) {
  const ref = useRef<HTMLElement>(null);
  const cur = useRef<{ v: number; ran: boolean; tween: gsap.core.Tween | null }>({ v: value, ran: false, tween: null });
  const Tag = (as ?? "span") as ElementType;
  const finalText = prefix + fmt(value, locale, decimals) + suffix;

  useFxLayout(ref, (el) => {
    const view = el.querySelector<HTMLElement>("[data-fx-view]");
    if (!view) return;
    const show = (n: number) => { view.textContent = prefix + fmt(n, locale, decimals) + suffix; };
    const st = cur.current;
    if (prefersReducedMotion()) { show(value); st.v = value; markReady(el, "static"); return; }
    const tweenTo = (target: number, dur: number, startAt?: number) => {
      st.tween?.kill();
      const o = { n: startAt ?? st.v };
      el.setAttribute("data-dir", target >= o.n ? "up" : "down");
      st.tween = gsap.to(o, {
        n: target, duration: dur, ease: "power2.out",
        onUpdate: () => { st.v = o.n; show(o.n); },
        onComplete: () => { st.v = target; show(target); },
      });
    };
    const offs: Array<() => void> = [];
    if (!st.ran) {
      st.ran = true;
      show(from);
      st.v = from;
      if (trigger === "load") tweenTo(value, duration);
      else offs.push(observeInView(el, (v) => v && tweenTo(value, duration), { once: true }));
    } else if (animateOnChange) tweenTo(value, Math.min(duration, 0.9));
    else { st.v = value; show(value); }
    markReady(el);
    return () => { offs.forEach((f) => f()); st.tween?.kill(); };
  }, [value, from, duration, decimals, locale, prefix, suffix, trigger, animateOnChange]);

  return (
    <Tag ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }} data-fx="Counter">
      <span aria-hidden="true" data-fx-view="" dangerouslySetInnerHTML={{ __html: escapeHtml(finalText) }} />
      <span style={srOnly}>{finalText}</span>
    </Tag>
  );
}

/** Số tự tween khi `value` đổi (đồng hồ, tồn kho, giá...). Gắn data-dir="up|down" để consumer tô màu tuỳ ý. */
export const NumberTicker = (p: Omit<CounterProps, "animateOnChange" | "trigger">) => (
  <Counter {...p} trigger="load" animateOnChange from={p.from ?? p.value} />
);

export type OdometerProps = Common & {
  value: number;
  duration?: number;
  decimals?: number;
  locale?: string;
  trigger?: "view" | "load";
  /** cột chữ số cao 1em: chỉnh line-height của cha nếu font có dấu cao */
  digitClassName?: string;
};

export function Odometer({ value, duration = 1.3, decimals = 0, locale = "vi-VN", trigger = "view", as, className, style, digitClassName }: OdometerProps) {
  const ref = useRef<HTMLElement>(null);
  const ran = useRef(false);
  const Tag = (as ?? "span") as ElementType;
  const chars = Array.from(fmt(value, locale, decimals));
  const text = chars.join("");

  useFxLayout(ref, (el) => {
    const strips = Array.from(el.querySelectorAll<HTMLElement>("[data-fx-strip]"));
    const place = (s: HTMLElement, d: number) => { gsap.set(s, { y: 0, yPercent: -d * 10 }); s.dataset.cur = String(d); };
    const roll = (s: HTMLElement, i: number, n: number) => {
      const d = Number(s.dataset.d);
      gsap.to(s, { yPercent: -d * 10, duration, ease: "power3.out", delay: (n - 1 - i) * 0.07, onComplete: () => { s.dataset.cur = String(d); } });
    };
    if (prefersReducedMotion()) { strips.forEach((s) => place(s, Number(s.dataset.d))); markReady(el, "static"); return; }
    const offs: Array<() => void> = [];
    if (!ran.current) {
      ran.current = true;
      strips.forEach((s) => place(s, 0));
      const go = () => strips.forEach((s, i) => roll(s, i, strips.length));
      if (trigger === "load") requestAnimationFrame(go);
      else offs.push(observeInView(el, (v) => v && go(), { once: true }));
    } else {
      strips.forEach((s, i) => {
        if (s.dataset.cur === undefined) place(s, 0);
        roll(s, i, strips.length);
      });
    }
    markReady(el);
    return () => { offs.forEach((f) => f()); gsap.killTweensOf(strips); };
  }, [text, duration, trigger]);

  return (
    <Tag ref={ref} className={className} style={{ display: "inline-flex", fontVariantNumeric: "tabular-nums", ...style }} data-fx="Odometer">
      <span style={srOnly}>{text}</span>
      {chars.map((c, i) => {
        const key = chars.length - i; // khoá tính từ phải: hàng đơn vị luôn giữ nguyên cột
        if (!/[0-9]/.test(c)) return <span key={`s${key}`} aria-hidden="true">{c}</span>;
        const d = Number(c);
        return (
          <span key={`d${key}`} aria-hidden="true" className={digitClassName} style={{ display: "inline-block", height: "1em", lineHeight: 1, overflow: "hidden" }}>
            <span data-fx-strip="" data-d={d} style={{ display: "block", transform: `translateY(-${d * 10}%)` }}>
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n} style={{ display: "block", height: "1em", lineHeight: 1 }}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}

/* ------------------------------------------------------------------ 26b. SlotText */

export type SlotTextProps = Common & {
  words: string[];
  /** chỉ số đang hiện (điều khiển ngoài). Bỏ trống + có interval = tự đổi. */
  index?: number;
  /** ms giữa hai lần đổi tự động; 0 = không tự đổi */
  interval?: number;
  duration?: number;
};

export function SlotText({ words, index, interval = 2200, duration = 0.6, as, className, style }: SlotTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [auto, setAuto] = useState(0);
  const Tag = (as ?? "span") as ElementType;
  const list = words.map(nfc);
  const active = (index ?? auto) % list.length;
  const prev = useRef(active);
  const [initial] = useState(active); // style tĩnh: React không ghi đè opacity do gsap điều khiển
  const uid = useId();

  useEffect(() => {
    if (index !== undefined || interval <= 0 || list.length < 2 || prefersReducedMotion()) return;
    const el = ref.current;
    let timer = 0, visible = true;
    const tick = () => { if (visible && !document.hidden) setAuto((n) => n + 1); };
    timer = window.setInterval(tick, interval);
    const off = el ? observeInView(el, (v) => { visible = v; }, { rootMargin: "0px" }) : () => {};
    return () => { window.clearInterval(timer); off(); };
  }, [index, interval, list.length]);

  useFxLayout(ref, (el) => {
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-fx-item]"));
    const reduced = prefersReducedMotion();
    items.forEach((it, i) => gsap.set(it, { yPercent: i === prev.current ? 0 : 100, opacity: i === prev.current ? 1 : 0 }));
    markReady(el, reduced ? "static" : "1");
    return;
  }, [list.join("|")]);

  useFx(ref, (el) => {
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-fx-item]"));
    const from = prev.current;
    if (from === active) return;
    const a = items[from], b = items[active];
    if (prefersReducedMotion()) {
      items.forEach((it, i) => gsap.set(it, { yPercent: 0, opacity: i === active ? 1 : 0 }));
    } else {
      gsap.to(a, { yPercent: -100, opacity: 0, duration, ease: "power3.inOut" });
      gsap.fromTo(b, { yPercent: 100, opacity: 1 }, { yPercent: 0, opacity: 1, duration, ease: "power3.inOut" });
    }
    prev.current = active;
    return () => gsap.killTweensOf(items);
  }, [active, duration]);

  return (
    <Tag
      ref={ref} className={className} data-fx="SlotText" data-slot-id={safeId(uid)}
      style={{ display: "inline-grid", overflow: "hidden", verticalAlign: "bottom", ...style }}
    >
      <span style={srOnly}>{list[active]}</span>
      {list.map((w, i) => (
        <span
          key={w + i} data-fx-item="" aria-hidden="true"
          style={{ gridArea: "1 / 1", opacity: i === initial ? 1 : 0 }}
        >{w}</span>
      ))}
    </Tag>
  );
}

