"use client";

import { useEffect, useState } from "react";
import s from "../brand.module.css";
import { LogoMark } from "./Header";

/**
 * Rèm nhung mở hai bên, MỘT lần mỗi phiên, tổng ≤ 1,2 s (giữ 0,22 s + mở 0,9 s), bỏ qua bằng click/phím.
 * Chỉ mount sau hydrate nên no-JS không bị chặn; prefers-reduced-motion thì không hiện.
 */
export function Curtain() {
  const [phase, setPhase] = useState<"off" | "closed" | "open">("off");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("rv-curtain") === "1") return;
      sessionStorage.setItem("rv-curtain", "1");
    } catch { /* không có sessionStorage thì vẫn chạy một lần */ }
    setPhase("closed");
    const t1 = window.setTimeout(() => setPhase("open"), 220);
    const t2 = window.setTimeout(() => setPhase("off"), 1180);
    const skip = () => { window.clearTimeout(t1); window.clearTimeout(t2); setPhase("off"); };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); window.removeEventListener("keydown", skip); window.removeEventListener("pointerdown", skip); };
  }, []);

  if (phase === "off") return null;
  return (
    <div className={s.curtain} data-phase={phase} data-rv="curtain" aria-hidden="true">
      <div className={`${s.curtainPanel} ${s.curtainL}`} />
      <div className={`${s.curtainPanel} ${s.curtainR}`} />
      <LogoMark className={s.curtainMark} />
    </div>
  );
}
