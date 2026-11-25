"use client";

import { useId, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, hasFinePointer, markReady, on, prefersReducedMotion, safeId, useFx } from "@/features/showroom/effects";
import styles from "../brand.module.css";

type Props = {
  className?: string;
  /** độ lệch (scale của feDisplacementMap) khi rê chuột */
  hover?: number;
  /** độ lệch tối đa khi cuộn nhanh */
  scrollPeak?: number;
  children: ReactNode;
  /** nhãn dùng cho kiểm thử */
  fx?: string;
  /** selector của khối cha lắng nghe chuột (khi có lớp phủ chữ che ảnh) */
  host?: string;
};

/**
 * Hiệu ứng riêng: sóng nước làm méo ảnh bằng SVG feTurbulence + feDisplacementMap.
 * Kích hoạt khi (1) rê chuột (chỉ pointer chuột), (2) cuộn nhanh (theo vận tốc), (3) sự kiện "lb:ripple".
 * `filter` chỉ gắn khi độ lệch > ngưỡng và gỡ khi nghỉ, nên ảnh đứng yên không tốn GPU.
 * Reduced-motion: tắt hẳn. Touch: chỉ còn nhịp cuộn rất nhẹ.
 */
export function WaterImage({ className, hover = 8, scrollPeak = 14, children, fx = "water", host }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fid = `lbw${safeId(useId())}`;
  useFx(ref, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const inner = el.querySelector<HTMLElement>("[data-water-inner]");
    const disp = el.querySelector<SVGFEDisplacementMapElement>("feDisplacementMap");
    const turb = el.querySelector<SVGFETurbulenceElement>("feTurbulence");
    if (!inner || !disp || !turb) return;
    const fine = hasFinePointer();
    const hostEl = (host ? el.closest<HTMLElement>(host) : null) ?? el;
    const big = el.clientWidth * el.clientHeight > 1_400_000;
    const hv = { h: 0 }, sv = { s: 0 }, imp = { i: 0 }, wob = { p: 0 };
    let on_ = false;
    const wobble = gsap.to(wob, { p: 1, duration: 1.7, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true });
    const apply = () => {
      const sc = hv.h * hover * (big ? 0.6 : 1) + sv.s * scrollPeak * (fine ? 1 : 0.4) + imp.i * scrollPeak;
      if (sc < 0.35) {
        if (on_) { inner.style.filter = ""; on_ = false; wobble.pause(); }
        disp.setAttribute("scale", "0");
        return;
      }
      if (!on_) { inner.style.filter = `url(#${fid})`; on_ = true; wobble.resume(); }
      disp.setAttribute("scale", sc.toFixed(2));
      const bx = 0.011 + 0.007 * Math.min(1, sc / 14) + 0.003 * wob.p;
      turb.setAttribute("baseFrequency", `${bx.toFixed(4)} ${(bx * 1.7).toFixed(4)}`);
    };
    const offs: Array<() => void> = [];
    if (fine) {
      offs.push(
        on(hostEl, "pointerenter", (e) => { if (e.pointerType === "touch") return; gsap.to(hv, { h: 1, duration: 0.4, ease: "power2.out", onUpdate: apply }); }),
        on(hostEl, "pointerleave", () => gsap.to(hv, { h: 0, duration: 0.7, ease: "power2.out", onUpdate: apply })),
      );
    }
    const impulse = () => {
      gsap.killTweensOf(imp);
      gsap.fromTo(imp, { i: 0.85 }, { i: 0, duration: 1.1, ease: "power2.out", onUpdate: apply });
    };
    offs.push(on(el, "lb:ripple" as keyof HTMLElementEventMap, impulse));
    const st = ScrollTrigger.create({
      trigger: el, start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 1600, 1);
        if (v > 0.06 && v > sv.s * 0.9) {
          gsap.to(sv, {
            s: v, duration: 0.14, overwrite: true, onUpdate: apply,
            onComplete: () => { gsap.to(sv, { s: 0, duration: 1.1, ease: "power2.out", onUpdate: apply }); },
          });
        }
      },
    });
    markReady(el);
    return () => { st.kill(); offs.forEach((f) => f()); wobble.kill(); inner.style.filter = ""; };
  }, [hover, scrollPeak, fid, host]);
  return (
    <div ref={ref} className={`${styles.water} ${className ?? ""}`} data-fx={fx} data-water="">
      <svg className={styles.waterSvg} width="0" height="0" aria-hidden="true" focusable="false">
        <filter id={fid} x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div data-water-inner="" className={styles.waterInner}>{children}</div>
    </div>
  );
}
