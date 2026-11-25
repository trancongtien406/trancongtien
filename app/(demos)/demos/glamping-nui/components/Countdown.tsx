"use client";

import { useEffect, useState } from "react";
import styles from "../brand.module.css";
import { hhmm, sunState, type SunState } from "../lib/sun";

const two = (n: number) => String(n).padStart(2, "0");

/** Đếm ngược tới hoàng hôn Đà Nẵng (tính theo ngày hiện tại, cập nhật mỗi giây, dừng khi tab ẩn). */
export function Countdown() {
  const [s, setS] = useState<SunState | null>(null);
  useEffect(() => {
    let id = 0;
    const tick = () => setS(sunState(Date.now()));
    const start = () => { tick(); id = window.setInterval(tick, 1000); };
    const vis = () => { window.clearInterval(id); if (!document.hidden) start(); };
    start();
    document.addEventListener("visibilitychange", vis);
    return () => { window.clearInterval(id); document.removeEventListener("visibilitychange", vis); };
  }, []);

  const rem = s ? Math.floor(s.remainingMs / 1000) : 0;
  const clock = s ? `${two(Math.floor(rem / 3600))}:${two(Math.floor((rem % 3600) / 60))}:${two(rem % 60)}` : "--:--:--";
  return (
    <div className={styles.countdown} data-testid="countdown">
      <div className={styles.cdTop}>
        <div>
          <p className={styles.cdLabel}>Khoảnh khắc hoàng hôn</p>
          {s && s.phase === "during" ? (
            <p className={styles.cdNow} role="status">Hoàng hôn đang bắt đầu</p>
          ) : (
            <p className={styles.cdClock} aria-label={s ? `Còn ${Math.floor(rem / 3600)} giờ ${Math.floor((rem % 3600) / 60)} phút tới hoàng hôn` : "Đang tính giờ hoàng hôn"}>
              <span aria-hidden="true">{clock}</span>
            </p>
          )}
        </div>
        <svg className={styles.cdIcon} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <path d="M6 34h36M12 34a12 12 0 0 1 24 0M24 12v6M10 20l4 4M38 20l-4 4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M14 41h20" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>
      <div className={styles.cdBar} aria-hidden="true"><span style={{ transform: `scaleX(${s ? s.progress : 0})` }} /></div>
      <p className={styles.cdFoot}>{s ? `Mặt trời lặn ở Đà Nẵng khoảng ${hhmm(s.sunsetMs)}. ` : ""}Mỗi ngày, ánh sáng kể một câu chuyện khác.</p>
    </div>
  );
}
