"use client";

import { useState } from "react";
import { SLOT_INFO, WEEKLY, type SlotId } from "../data/content";
import { Divider } from "./Art";
import styles from "../brand.module.css";

const IDS: SlotId[] = ["som", "sang", "chieu"];

/** Điểm trên cung nắng (bezier bậc 2) tại t trong 0..1, hệ toạ độ 0 0 800 300. */
function onArc(t: number) {
  const u = 1 - t;
  return { x: u * u * 60 + 2 * u * t * 400 + t * t * 740, y: u * u * 262 + 2 * u * t * -176 + t * t * 262 };
}

/**
 * Lịch học theo khung giờ: chọn khung thì mặt trời trượt dọc cung nắng tới đúng giờ tập trung
 * (05:30, 08:00, 15:30), bầu trời đổi màu, thẻ bên cạnh đổi giờ tập trung, giờ kết thúc, hợp với ai.
 */
export function Schedule() {
  const [id, setId] = useState<SlotId>("som");
  const s = SLOT_INFO[id];
  const p = onArc(s.t);
  const move = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % IDS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i + IDS.length - 1) % IDS.length;
    else return;
    e.preventDefault();
    setId(IDS[n]);
    (e.currentTarget.parentElement?.querySelectorAll("button")[n] as HTMLElement | undefined)?.focus();
  };
  return (
    <section id="lich-hoc" className={styles.schedule} aria-labelledby="lh-title">
      <Divider fill="var(--rs-orange)" className={styles.dividerTop} />
      <div className={styles.wrap}>
        <p className={styles.kickerLight} data-rs="reveal">Lịch học theo khung giờ</p>
        <h2 id="lh-title" className={`${styles.h2} ${styles.h2Light}`} data-rs="reveal">Sáng sớm, sáng hay <span className={styles.scriptSun}>chiều muộn?</span></h2>
        <p className={`${styles.lede} ${styles.ledeLight}`} data-rs="reveal">Trường mở ba khung giờ mỗi ngày. Chọn một khung để xem giờ tập trung và hợp với ai. Giờ thật được huấn luyện viên chốt theo thuỷ triều, gió và ánh sáng từng ngày.</p>

        <div className={styles.slotGrid}>
          <div className={styles.sky} data-slot={id}>
            <span className={`${styles.skyBg} ${styles.skyDawn}`} aria-hidden="true" />
            <span className={`${styles.skyBg} ${styles.skyMorn}`} aria-hidden="true" />
            <span className={`${styles.skyBg} ${styles.skyEve}`} aria-hidden="true" />
            <svg viewBox="0 0 800 300" className={styles.skySvg} role="img" aria-label={`Mặt trời trên cung nắng tại khung ${s.label.toLowerCase()}, tập trung ${s.gather}`}>
              <path d="M60 262 Q 400 -176 740 262" fill="none" stroke="var(--rs-cream)" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" opacity=".7" />
              {IDS.map((k) => {
                const q = onArc(SLOT_INFO[k].t);
                return (
                  <g key={k} opacity={k === id ? 1 : 0.55}>
                    <circle cx={q.x} cy={q.y} r="7" fill="var(--rs-cream)" />
                    <text x={q.x} y={q.y + 30} textAnchor="middle" className={styles.skyTick}>{SLOT_INFO[k].gather}</text>
                  </g>
                );
              })}
              <g className={styles.skySun} style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                {Array.from({ length: 12 }, (_, i) => <path key={i} d="M-5 -46 L0 -70 L5 -46Z" fill="var(--rs-sun)" transform={`rotate(${i * 30})`} />)}
                <circle r="38" fill="var(--rs-orange)" />
                <circle r="24" fill="var(--rs-sun)" />
              </g>
              <path d="M0 262 Q 100 244 200 262 T 400 262 T 600 262 T 800 262 V300 H0Z" fill="var(--rs-teal)" />
              <path d="M0 280 Q 100 266 200 280 T 400 280 T 600 280 T 800 280 V300 H0Z" fill="var(--rs-deep)" />
            </svg>
          </div>

          <div className={styles.slotInfo}>
            <div className={styles.slotTabs} role="radiogroup" aria-label="Khung giờ học">
              {IDS.map((k, i) => (
                <button key={k} type="button" role="radio" aria-checked={k === id} tabIndex={k === id ? 0 : -1} className={styles.slotTab} onClick={() => setId(k)} onKeyDown={(e) => move(e, i)}>
                  <b>{SLOT_INFO[k].label}</b><small>{SLOT_INFO[k].gather}</small>
                </button>
              ))}
            </div>
            <div className={styles.slotCard} aria-live="polite">
              <p className={styles.slotBig}>Tập trung <b>{s.gather}</b></p>
              <p className={styles.slotEnd}>Kết thúc {s.end}</p>
              <dl>
                <div><dt>Hợp với</dt><dd>{s.who}</dd></div>
                <div><dt>Ghi nhớ</dt><dd>{s.note}</dd></div>
              </dl>
            </div>
          </div>
        </div>

        <div className={styles.weekly} data-rs="reveal">
          <h3 className={styles.weeklyH}>Lịch lớp thường kỳ</h3>
          <ul>
            {WEEKLY.map((w) => (
              <li key={w.cls}>
                <b>{w.cls}</b>
                <span>{w.slot}</span>
                <span>{w.day}</span>
              </li>
            ))}
          </ul>
          <p className={styles.fineLight}>Giờ và điểm tập trung được xác nhận khi đặt lịch. Mùa nhiều sóng, huấn luyện viên có thể đề nghị dịch giờ hoặc đổi buổi.</p>
        </div>
      </div>
    </section>
  );
}
