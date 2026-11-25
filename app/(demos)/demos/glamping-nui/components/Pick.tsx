"use client";

import type { ReactNode } from "react";
import styles from "../brand.module.css";

export const PICK_EVENT = "glamping:pick";
export type PickDetail = { tent?: "moc" | "rung" | "may"; activity?: "bbq" | "trek" | "stars" | "atv" };

/** Nút chọn nhanh: gửi lựa chọn sang công cụ lên kế hoạch rồi cuộn tới đó (không lưu hay gửi dữ liệu). */
export function PickButton({ detail, children, className }: { detail: PickDetail; children: ReactNode; className?: string }) {
  return (
    <a
      className={className ?? `${styles.btn} ${styles.btnLine}`}
      href="#lap-ke-hoach"
      onClick={() => { window.dispatchEvent(new CustomEvent<PickDetail>(PICK_EVENT, { detail })); }}
    >
      {children}
    </a>
  );
}
