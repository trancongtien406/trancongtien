"use client";

import { useState } from "react";
import s from "../brand.module.css";

/** Công tắc cam nhúng trong tiêu đề, thay cho chữ "o". Bấm để bật, tuỳ chọn onChange (chạy cổng chuyển cảnh). */
export function Toggle({ label, onChange, size = "lg" }: { label: string; onChange?: (on: boolean) => void; size?: "lg" | "md" }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`${s.toggle} ${size === "md" ? s.toggleMd : ""}`}
      data-on={on}
      onClick={() => { const v = !on; setOn(v); onChange?.(v); }}
    >
      <span className={s.knob} />
    </button>
  );
}
