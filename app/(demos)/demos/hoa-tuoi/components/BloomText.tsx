"use client";

import { Fragment, useRef, type CSSProperties, type ElementType } from "react";
import { gsap, markReady, observeInView, prefersReducedMotion, useFxLayout, whenFontsReady } from "@/features/showroom/effects";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  trigger?: "load" | "view";
  delay?: number;
  /** từ cần nhấn màu (khớp chính xác, đã bỏ dấu câu cuối) */
  accent?: string[];
  accentClassName?: string;
};

const SPLIT = /[ \t\n\r]+/;

/**
 * Chữ mọc như nụ nở: mỗi TỪ (không tách ký tự, giữ dấu tiếng Việt) bắt đầu bị cắt từ đáy
 * (clip-path inset 100%) và ép dẹt (scaleY 0.7), rồi nở lên cao đủ, vượt khung đệm để dấu Ệ Ử không bị xén.
 */
export function BloomText({ children, as, className, style, trigger = "view", delay = 0, accent = [], accentClassName }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "span") as ElementType;
  const words = children.normalize("NFC").split(SPLIT).filter(Boolean);

  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const ws = Array.from(el.querySelectorAll<HTMLElement>("[data-bw]"));
    gsap.set(ws, { clipPath: "inset(100% -8% -35% -8%)", scaleY: 0.72, y: "0.22em", opacity: 0, transformOrigin: "50% 100%" });
    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;
    const play = () => {
      whenFontsReady(1200).then(() => {
        if (cancelled) return;
        tl = gsap.timeline({ delay });
        tl.to(ws, { clipPath: "inset(-35% -8% -35% -8%)", scaleY: 1, y: 0, opacity: 1, duration: 0.95, ease: "power3.out", stagger: 0.08 });
      });
    };
    let off = () => {};
    if (trigger === "load") play();
    else off = observeInView(el, (v) => v && play(), { once: true, rootMargin: "0px 0px -10% 0px" });
    markReady(el);
    return () => { cancelled = true; off(); tl?.kill(); gsap.set(ws, { clearProps: "clipPath,transform,opacity" }); };
  }, [children, trigger, delay]);

  return (
    <Tag ref={ref} className={className} style={style} data-fx="BloomText">
      {words.map((w, i) => {
        const bare = w.replace(/[.,!?;:]+$/, "");
        const hot = accent.some((a) => a.replace(/[.,!?;:]+$/, "") === bare);
        return (
          <Fragment key={i}>
            {i > 0 ? " " : null}
            <span data-bw="" className={hot ? accentClassName : undefined} style={{ display: "inline-block" }}>{w}</span>
          </Fragment>
        );
      })}
    </Tag>
  );
}
