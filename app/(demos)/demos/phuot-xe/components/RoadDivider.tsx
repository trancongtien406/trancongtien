"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { BikeArt, type BikeKind } from "./BikeArt";

/**
 * Dải đường giữa hai section: một chiếc xe lướt ngang qua theo tiến độ cuộn (scrub), kéo theo vệt vàng.
 * Reduced-motion: xe đỗ yên ở bên phải, không vệt. Trang trí (aria-hidden).
 */
export function RoadDivider({ kind = "con", reverse = false }: { kind?: BikeKind; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const bike = useRef<HTMLDivElement>(null);
  useFxLayout(ref, (el) => {
    const b = bike.current;
    if (!b) return;
    if (prefersReducedMotion()) { gsap.set(b, { right: "8%", left: "auto" }); return; }
    const dir = reverse ? -1 : 1;
    const from = () => (dir === 1 ? -b.offsetWidth * 1.6 : el.offsetWidth + b.offsetWidth * 0.2);
    const to = () => (dir === 1 ? el.offsetWidth + b.offsetWidth * 0.2 : -b.offsetWidth * 1.6);
    gsap.fromTo(b, { x: from }, { x: to, ease: "none", scrollTrigger: { trigger: el, start: "top 98%", end: "bottom 2%", scrub: 0.35, invalidateOnRefresh: true } });
    ScrollTrigger.refresh();
  }, [reverse]);
  return (
    <div ref={ref} className={`${s.road} ${reverse ? s.roadRev : ""}`} aria-hidden="true" data-fx="RoadDivider">
      <span className={s.roadLine} />
      <div ref={bike} className={s.roadBike}>
        <i className={s.roadTrail} />
        <BikeArt kind={kind} className={s.roadArt} />
      </div>
    </div>
  );
}
