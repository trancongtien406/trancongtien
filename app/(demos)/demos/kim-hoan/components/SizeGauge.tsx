"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";

/** Ước lượng đường kính trong (mm) theo cỡ tay: 14 mm ở cỡ 8, mỗi cỡ thêm khoảng 0,4 mm. Chỉ để hình dung; cỡ thật đo tại tiệm. */
export const diameter = (size: number) => 14 + (size - 8) * 0.4;
const SCALE = 7.2;

/** Thước nới / thu cỡ nhẫn: hai vòng chồng nhau (cỡ hiện tại nét đứt, cỡ muốn đổi màu vàng). */
export function SizeGauge() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [cur, setCur] = useState(11);
  const [want, setWant] = useState(13);
  const d1 = diameter(cur);
  const d2 = diameter(want);
  const diff = want - cur;
  const circ = ((d2 - d1) * Math.PI).toFixed(1).replace(".", ",");
  const verdict = diff === 0 ? "Giữ nguyên cỡ" : diff > 0 ? `Nới ${diff} cỡ, chu vi thêm khoảng ${circ} mm` : `Thu ${-diff} cỡ, chu vi bớt khoảng ${circ.replace("-", "")} mm`;
  const hard = Math.abs(diff) > 2;
  return (
    <div className={styles.gauge} data-testid="gauge">
      <div className={styles.gaugeStage} aria-hidden="true">
        <svg viewBox="-110 -110 220 220" focusable="false">
          <circle r={(d1 / 2) * SCALE} className={styles.gCur} />
          <circle r={(d2 / 2) * SCALE} className={styles.gWant} style={{ transition: "r .5s cubic-bezier(.2,.8,.2,1)" }} />
          <path d="M-100 0H100M0 -100V100" stroke="rgba(239,230,210,.18)" strokeWidth="1" strokeDasharray="2 6" />
          <text x="0" y="6" textAnchor="middle" className={styles.gText}>{String(d2.toFixed(1)).replace(".", ",")} mm</text>
        </svg>
      </div>
      <div className={styles.gaugeCtl}>
        <div className={styles.rangeRow}>
          <label htmlFor={`${uid}-a`}>Cỡ hiện tại</label>
          <output htmlFor={`${uid}-a`}>{cur}</output>
          <input id={`${uid}-a`} type="range" min={8} max={20} step={1} value={cur} onChange={(e) => setCur(Number(e.target.value))} />
        </div>
        <div className={styles.rangeRow}>
          <label htmlFor={`${uid}-b`}>Cỡ muốn đổi</label>
          <output htmlFor={`${uid}-b`}>{want}</output>
          <input id={`${uid}-b`} type="range" min={8} max={20} step={1} value={want} onChange={(e) => setWant(Number(e.target.value))} />
        </div>
        <p className={styles.gVerdict} aria-live="polite" data-testid="gauge-verdict">{verdict}</p>
        <p className={styles.fsHint}>{hard ? "Đổi hơn 2 cỡ thường phải làm lại thành nhẫn; tiệm xem món rồi báo." : "Nới hoặc thu 1 – 2 cỡ thường làm được tuỳ độ dày thành nhẫn."} Số đo chỉ để hình dung, cỡ thật được đo trực tiếp tại tiệm.</p>
      </div>
    </div>
  );
}
