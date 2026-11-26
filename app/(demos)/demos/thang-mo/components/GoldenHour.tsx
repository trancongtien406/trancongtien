"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";
import { SEASONS } from "../data/studio";

const T0 = 4 * 60 + 30, T1 = 19 * 60 + 30;
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

function light(t: number, rise: number, set: number): { name: string; tip: string; tone: number } {
  if (t < rise - 30 || t > set + 40) return { name: "Trời tối", tip: "Chưa đủ sáng cho ảnh ngoại cảnh. Phù hợp chụp trong studio có đèn.", tone: 0 };
  if (t < rise + 50) return { name: "Bình minh", tip: "Ánh sáng xanh dịu, bãi biển vắng người. Hợp phong cách Biển và Tối giản ngoài trời.", tone: 1 };
  if (t < rise + 150) return { name: "Nắng sớm", tip: "Ấm và mềm, bóng còn dài. Hợp Vườn và Biển, da lên màu đẹp.", tone: 2 };
  if (t < set - 150) return { name: "Nắng cao", tip: "Bóng gắt, dễ chói mắt. Nên chụp trong studio, dưới mái hiên hoặc nhà cổ.", tone: 3 };
  if (t < set - 35) return { name: "Giờ vàng", tip: "Ánh sáng ấm, mềm, ngược sáng đẹp. Khung giờ được đặt nhiều nhất cho ngoại cảnh.", tone: 4 };
  if (t <= set + 15) return { name: "Hoàng hôn", tip: "Trời chuyển cam và hồng, chỉ kéo dài vài chục phút. Cần đến địa điểm trước 30 phút.", tone: 5 };
  return { name: "Sau hoàng hôn", tip: "Trời xanh thẫm, ánh sáng yếu. Chỉ chụp gần khi có đèn bổ sung.", tone: 0 };
}

/** Đồng hồ giờ vàng: chọn mùa + kéo giờ, mặt trời chạy theo cung và gợi ý kiểu ánh sáng. Chỉ chạy trên trình duyệt. */
export function GoldenHour() {
  const [season, setSeason] = useState(1);
  const [t, setT] = useState(16 * 60 + 45);
  const id = useId();
  const s = SEASONS[season];
  const l = light(t, s.rise, s.set);
  const up = t >= s.rise && t <= s.set;
  const k = (t - s.rise) / (s.set - s.rise);
  const elev = up ? Math.sin(Math.PI * Math.min(1, Math.max(0, k))) : 0;
  const x = 40 + ((t - T0) / (T1 - T0)) * 520;
  const y = 150 - elev * 120;
  const xr = 40 + ((s.rise - T0) / (T1 - T0)) * 520, xs = 40 + ((s.set - T0) / (T1 - T0)) * 520;
  const gx0 = 40 + ((s.set - 120 - T0) / (T1 - T0)) * 520, gx1 = 40 + ((s.set - 35 - T0) / (T1 - T0)) * 520;
  const arc = `M ${xr} 150 Q ${(xr + xs) / 2} ${150 - 240} ${xs} 150`;
  return (
    <div className={styles.gh} data-tm="golden" data-tone={l.tone}>
      <div className={styles.ghCtl}>
        <fieldset className={styles.ghSeasons}>
          <legend>Thời điểm trong năm</legend>
          <div>
            {SEASONS.map((x2, i) => (
              <label key={x2.id} className={styles.ghOpt}><input type="radio" name={`${id}-s`} checked={season === i} onChange={() => setSeason(i)} /><span>{x2.label}</span></label>
            ))}
          </div>
        </fieldset>
        <div className={styles.ghRange}>
          <label htmlFor={`${id}-t`}>Giờ chụp: <b data-tm="golden-time">{hhmm(t)}</b></label>
          <input id={`${id}-t`} type="range" min={T0} max={T1} step={15} value={t} onChange={(e) => setT(Number(e.target.value))} aria-valuetext={`${hhmm(t)}, ${l.name}`} />
          <p className={styles.helper}>Kéo từ 04:30 đến 19:30.</p>
        </div>
      </div>
      <div className={styles.ghStage}>
        <svg viewBox="0 0 600 190" role="img" aria-label={`Cung mặt trời ${s.label}: mọc khoảng ${hhmm(s.rise)}, lặn khoảng ${hhmm(s.set)}`} className={styles.ghSvg}>
          <rect x={gx0} y="20" width={Math.max(0, gx1 - gx0)} height="130" className={styles.ghGold} />
          <line x1="20" y1="150" x2="580" y2="150" className={styles.ghLine} />
          <path d={arc} className={styles.ghArc} fill="none" />
          <text x={xr} y="172" textAnchor="middle" className={styles.ghTxt}>{hhmm(s.rise)}</text>
          <text x={xs} y="172" textAnchor="middle" className={styles.ghTxt}>{hhmm(s.set)}</text>
          <g style={{ transform: `translate(${x}px, ${y}px)` }} className={styles.ghSun}>
            <circle r="15" className={styles.ghSunC} data-up={up ? "1" : "0"} />
          </g>
        </svg>
        <p className={styles.ghLegend}><span aria-hidden="true" className={styles.ghSw} /> Dải vàng: khoảng 2 giờ trước đến 35 phút trước khi mặt trời lặn.</p>
      </div>
      <div className={styles.ghOut} aria-live="polite">
        <p className={styles.codeLine}>{hhmm(t)} · {s.label}</p>
        <p className={styles.ghName} data-tm="golden-name">{l.name}</p>
        <p className={styles.small}>{l.tip}</p>
        <p className={styles.small}>{s.note}</p>
        <p className={styles.helper}>Giờ mọc và lặn là ước tính trung bình cho Đà Nẵng, lệch vài phút mỗi ngày.</p>
      </div>
    </div>
  );
}
