"use client";

import { useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/features/showroom/effects";
import styles from "../brand.module.css";

const N = 40;

/**
 * Nhẫn xoay 3D thuần CSS: 40 mảnh dải vàng xếp quanh trục (translateZ), xoay 12s/vòng (18s trên mobile).
 * Ánh sáng đứng yên: mỗi mảnh có độ tối/độ sáng chạy theo chu kỳ lệch pha (opacity), nên chiếc nhẫn xoay còn ánh sáng thì cố định.
 * Hover (pointer fine): dừng xoay và nghiêng theo con trỏ tối đa 8 độ. Reduced-motion: đứng yên.
 */
export function Ring3D() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (!hasFinePointer() || prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    ref.current.style.setProperty("--rx", `${(dy * 8).toFixed(2)}deg`);
    ref.current.style.setProperty("--rz", `${(dx * 8).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--rz", "0deg");
  };
  return (
    <div ref={ref} className={styles.ring3d} data-fx="Ring3D" onPointerMove={onMove} onPointerLeave={onLeave} role="img" aria-label="Chiếc nhẫn vàng gắn đá xoay chậm, nhìn từ phía trên">
      <div className={styles.rTilt}>
        <div className={styles.rSpin}>
          {Array.from({ length: N }, (_, i) => (
            <i key={i} className={styles.rSlice} style={{ ["--i" as string]: i }} />
          ))}
          <svg className={styles.rGem} viewBox="0 0 40 44" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="r3d-gem" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset=".5" stopColor="#dbeaf6" />
                <stop offset="1" stopColor="#8fb2d4" />
              </linearGradient>
            </defs>
            <path d="M8 12 L14 3 H26 L32 12 L20 41Z" fill="url(#r3d-gem)" stroke="#f1dd8a" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M8 12 H32 M14 3 L20 12 L26 3 M20 12 L20 41 M14 12 L20 41 L26 12" fill="none" stroke="#ffffff" strokeOpacity=".75" strokeWidth=".9" />
          </svg>
        </div>
      </div>
      <div className={styles.rShadow} />
    </div>
  );
}
