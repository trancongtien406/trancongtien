"use client";

import { useState } from "react";
import { FLAGS, POLICY, RULES, type FlagId } from "../data/content";
import { Divider } from "./Art";
import styles from "../brand.module.css";

const IDS: FlagId[] = ["xanh", "vang", "do"];

function Flag({ id, on }: { id: FlagId; on: boolean }) {
  const c = FLAGS[id].color;
  return (
    <svg viewBox="0 0 90 120" className={styles.flagSvg} aria-hidden="true" data-on={on ? "1" : "0"}>
      <path d="M16 112 V8" stroke="var(--rs-cream)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="16" cy="8" r="6" fill="var(--rs-cream)" />
      <g className={styles.flagCloth}>
        <path d="M20 14 C 38 6, 54 24, 82 14 V62 C 54 72, 38 54, 20 62Z" fill={c} stroke="var(--rs-cream)" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/**
 * Ba mức quyết định của huấn luyện viên (cờ xanh, vàng, đỏ): mỗi cờ phấp phới, chọn cờ thì hiện biển trông ra sao,
 * buổi học đổi thế nào và lịch được xử lý ra sao. Đây là quy ước nội bộ của trường, không thay cảnh báo của chính quyền.
 */
export function Safety() {
  const [id, setId] = useState<FlagId>("xanh");
  const f = FLAGS[id];
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
    <section id="an-toan" className={styles.safety} aria-labelledby="at-title">
      <Divider fill="var(--rs-orange)" className={styles.dividerTop} />
      <div className={styles.wrap}>
        <p className={styles.kickerLight} data-rs="reveal">An toàn và dời lịch khi biển động</p>
        <h2 id="at-title" className={`${styles.h2} ${styles.h2Light}`} data-rs="reveal">Biển quyết định, <span className={styles.scriptSun}>chúng tôi nói thật</span></h2>
        <p className={`${styles.lede} ${styles.ledeLight}`} data-rs="reveal">Quy định dưới đây áp dụng cho mọi buổi học. Mỗi sáng huấn luyện viên trưởng nhìn biển và chọn một trong ba mức.</p>

        <div className={styles.safetyGrid}>
          <ul className={styles.rules}>
            {RULES.map((r, i) => (
              <li key={r.t} data-rs="reveal"><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><div><h3>{r.t}</h3><p>{r.d}</p></div></li>
            ))}
          </ul>

          <div className={styles.flagBox} data-rs="reveal">
            <h3 className={styles.flagH}>Ba mức của huấn luyện viên</h3>
            <div className={styles.flagTabs} role="radiogroup" aria-label="Chọn mức để xem cách xử lý">
              {IDS.map((k, i) => (
                <button key={k} type="button" role="radio" aria-checked={k === id} tabIndex={k === id ? 0 : -1} className={styles.flagTab} onClick={() => setId(k)} onKeyDown={(e) => move(e, i)}>
                  <Flag id={k} on={k === id} />
                  <b>{FLAGS[k].label}</b>
                </button>
              ))}
            </div>
            <dl className={styles.flagInfo} aria-live="polite">
              <div><dt>Biển</dt><dd>{f.sea}</dd></div>
              <div><dt>Buổi học</dt><dd>{f.act}</dd></div>
              <div><dt>Lịch</dt><dd>{f.move}</dd></div>
            </dl>
            <p className={styles.fineLight}>Đây là quy ước nội bộ của trường. Không thay thế cảnh báo và cờ hiệu chính thức trên bãi biển; bạn luôn cần làm theo hướng dẫn đó.</p>
          </div>
        </div>

        <h3 className={styles.policyH} data-rs="reveal">Chính sách dời lịch</h3>
        <ul className={styles.policy}>
          {POLICY.map((p) => (
            <li key={p.t} data-rs="reveal"><h4>{p.t}</h4><p>{p.d}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
