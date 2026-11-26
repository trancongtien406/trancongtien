"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";

const MAX = 14;

/**
 * Khắc chữ: dải mặt trong lòng nhẫn trải phẳng; từng chữ được "khắc" lần lượt, kèm đầu mũi khắc chạy theo.
 * Chỉ là xem thử dòng chữ trong trình duyệt, không gửi đi đâu.
 */
export function Engrave() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [text, setText] = useState("Mãi bên nhau");
  const [italic, setItalic] = useState(true);
  const [run, setRun] = useState(0);
  const chars = Array.from(text.normalize("NFC"));
  const step = Math.min(70, 1500 / Math.max(chars.length, 1));
  const tooLong = chars.length >= MAX;
  return (
    <div className={styles.engrave} data-testid="engrave">
      <div className={styles.engBand} aria-hidden="true">
        <svg viewBox="0 0 480 120" focusable="false">
          <defs>
            <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f3e2a0" />
              <stop offset=".45" stopColor="#c9a227" />
              <stop offset=".55" stopColor="#d9b640" />
              <stop offset="1" stopColor="#7a5f10" />
            </linearGradient>
          </defs>
          <rect x="6" y="14" width="468" height="92" rx="46" fill={`url(#${uid}-b)`} />
          <rect x="6" y="14" width="468" height="92" rx="46" fill="none" stroke="#5c4a12" strokeWidth="1.5" />
        </svg>
        <p key={run} className={styles.engText} data-italic={italic ? "1" : "0"} style={{ ["--n" as string]: chars.length }}>
          {chars.map((c, i) => (
            <span key={i} style={{ animationDelay: `${i * step}ms` }} data-kn-eng={i}>{c === " " ? " " : c}</span>
          ))}
          <i className={styles.stylus} style={{ animationDuration: `${Math.max(chars.length, 1) * step + 200}ms` }} />
        </p>
      </div>
      <div className={styles.engCtl}>
        <label htmlFor={`${uid}-t`}>Dòng chữ muốn khắc</label>
        <input id={`${uid}-t`} value={text} maxLength={MAX} onChange={(e) => { setText(e.target.value); setRun((n) => n + 1); }} aria-describedby={`${uid}-h`} />
        <p id={`${uid}-h`} className={styles.fsHint}>{tooLong ? `Đã đủ ${MAX} ký tự, giới hạn cho mặt trong nhẫn.` : `Tối đa ${MAX} ký tự, còn ${MAX - chars.length}.`}</p>
        <div className={styles.engActs}>
          <button type="button" className={styles.btnLine} onClick={() => setItalic((v) => !v)} aria-pressed={italic}>{italic ? "Chữ nghiêng" : "Chữ đứng"}</button>
          <button type="button" className={styles.btnLine} onClick={() => setRun((n) => n + 1)}>Khắc lại</button>
        </div>
      </div>
    </div>
  );
}
