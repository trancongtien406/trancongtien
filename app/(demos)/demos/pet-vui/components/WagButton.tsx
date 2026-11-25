import type { ReactNode } from "react";
import { MagneticButton } from "@/features/showroom/effects";
import s from "../brand.module.css";

/** Nút có đuôi vẫy: hover hoặc focus bàn phím thì đuôi hiện ra và vẫy (CSS thuần, chỉ pointer fine, tắt khi reduced-motion). */
export function WagButton({ href, children, tone = "blue", magnetic = false, className }: { href: string; children: ReactNode; tone?: "blue" | "red" | "yellow" | "white" | "ink"; magnetic?: boolean; className?: string }) {
  const a = (
    <a href={href} className={`${s.btn} ${s["btn_" + tone]} ${s.wag} ${className ?? ""}`}>
      <span>{children}</span>
      <svg className={s.tail} viewBox="0 0 60 60" aria-hidden="true" focusable="false">
        <path d="M6 52C26 54 44 44 44 26C44 16 36 10 28 14" fill="none" stroke="#14121a" strokeWidth="13" strokeLinecap="round" />
        <path d="M6 52C26 54 44 44 44 26C44 16 36 10 28 14" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </a>
  );
  return magnetic ? <MagneticButton strength={0.25} max={10}>{a}</MagneticButton> : a;
}
