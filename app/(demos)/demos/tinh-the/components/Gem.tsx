"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "../brand.module.css";
import { FACETS } from "./facets";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Interactive Prism: viên đá nghiêng 3D theo con trỏ (gsap.quickTo) và mỗi mặt cắt được tô lại theo hướng sáng
 * (dot(pháp tuyến, ánh sáng)), cộng quầng phản sáng và dải cầu vồng conic đi theo con trỏ.
 */
export function Gem({ hue, sat, label, float = false }: { hue: number; sat: number; label: string; float?: boolean }) {
  const tilt = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const tone = useRef({ hue, sat });
  const paintRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    tone.current = { hue, sat };
    paintRef.current();
  }, [hue, sat]);

  useEffect(() => {
    const el = tilt.current;
    const root = svg.current;
    if (!el || !root) return;
    const polys = Array.from(root.querySelectorAll<SVGPolygonElement>("polygon[data-f]"));
    const light = { x: -0.35, y: -0.5 };
    const paint = () => {
      const { hue: h, sat: s } = tone.current;
      polys.forEach((p, i) => {
        const f = FACETS[i];
        const b = f.nx * light.x + f.ny * light.y + f.nz * 0.62;
        const base = clamp((b + 0.25) / 1.45, 0, 1);
        const spec = Math.pow(clamp(b, 0, 1), 7);
        const l = 14 + 56 * base + 26 * spec + (f.seed - 5) * 1.1;
        p.style.fill = `hsl(${h} ${clamp(s - spec * 30, 5, 100)}% ${clamp(l, 8, 96)}%)`;
      });
      el.style.setProperty("--gx", `${50 + light.x * 40}%`);
      el.style.setProperty("--gy", `${50 + light.y * 40}%`);
      el.style.setProperty("--ang", `${Math.round(light.x * 120 + light.y * 60)}deg`);
    };
    paintRef.current = paint;
    paint();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3.out" });
    gsap.set(el, { transformPerspective: 900, transformOrigin: "50% 50%" });
    const zone = (el.closest("section") as HTMLElement | null) ?? el;
    let visible = true;
    const io = new IntersectionObserver((es) => { visible = es[0]?.isIntersecting ?? true; });
    io.observe(zone);

    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      const r = el.getBoundingClientRect();
      const nx = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth * 0.45), -1, 1);
      const ny = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight * 0.45), -1, 1);
      ry(nx * 24);
      rx(-ny * 24);
      gsap.to(light, { x: nx, y: ny, duration: 0.5, ease: "power2.out", overwrite: true, onUpdate: paint });
    };
    const onLeave = () => {
      ry(0); rx(0);
      gsap.to(light, { x: -0.35, y: -0.5, duration: 1.2, ease: "power2.out", overwrite: true, onUpdate: paint });
    };
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    const fl = float ? gsap.to(el.parentElement, { y: -12, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" }) : null;
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      io.disconnect();
      gsap.killTweensOf(light);
      gsap.killTweensOf(el);
      fl?.kill();
    };
  }, [float]);

  return (
    <div className={styles.gemFloat}>
      <div ref={tilt} className={styles.gemTilt}>
        <svg ref={svg} viewBox="-100 -100 200 200" role="img" aria-label={label} focusable="false">
          <polygon points="-96,0 -68,-68 0,-96 68,-68 96,0 68,68 0,96 -68,68" fill="#0b0e14" opacity=".6" transform="scale(1.04)" />
          {FACETS.map((f, i) => (
            <polygon key={i} data-f="" points={f.points} stroke="rgba(255,255,255,.35)" strokeWidth=".6" strokeLinejoin="round" style={{ fill: `hsl(${hue} ${sat}% ${28 + f.seed * 4}%)` }} />
          ))}
        </svg>
        <i className={styles.gemGlint} aria-hidden="true" />
        <i className={styles.gemRainbow} aria-hidden="true" />
      </div>
    </div>
  );
}
