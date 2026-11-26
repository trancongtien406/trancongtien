"use client";

import { useEffect, useMemo, useState } from "react";
import { STEP_DESC } from "../data/content";
import { CLOSE_MINUTES, BUFFER_MINUTES, OPEN_MINUTES, RITUALS } from "../data/rituals";
import { formatMinutes } from "../lib/format";
import styles from "../brand.module.css";

const ARRIVE = 10;
const TEA = 10;

export function Session() {
  const [rid, setRid] = useState("R01");
  const ritual = RITUALS.find((r) => r.id === rid)!;
  const latest = CLOSE_MINUTES - ritual.durationMinutes - BUFFER_MINUTES;
  const starts = useMemo(() => {
    const out: number[] = [];
    for (let t = OPEN_MINUTES; t <= latest; t += 30) out.push(t);
    return out;
  }, [latest]);
  const [start, setStart] = useState(14 * 60);
  const t0 = starts.includes(start) ? start : (starts.find((s) => s >= 14 * 60) ?? starts[starts.length - 1]);

  const steps = useMemo(
    () => [{ label: "Đón khách", minutes: ARRIVE }, ...ritual.steps, { label: "Trà & thanh toán", minutes: TEA }],
    [ritual],
  );
  const total = steps.reduce((n, s) => n + s.minutes, 0);
  const [min, setMin] = useState(0);
  const [playing, setPlaying] = useState(false);
  const m = Math.min(min, total);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setMin((v) => {
        if (v >= total) { setPlaying(false); return total; }
        return v + 1;
      });
    }, 140);
    return () => window.clearInterval(id);
  }, [playing, total]);

  let acc = 0;
  const idx = steps.findIndex((s) => { const hit = m < acc + s.minutes; acc += s.minutes; return hit; });
  const curIdx = idx === -1 ? steps.length - 1 : idx;
  const cur = steps[curIdx];
  const clock = (offset: number) => formatMinutes(t0 - ARRIVE + offset);
  let a2 = 0;
  const starts2 = steps.map((s) => { const v = a2; a2 += s.minutes; return v; });

  return (
    <section id="session" className={`${styles.section} ${styles.linen}`} aria-labelledby="session-title">
      <div className={styles.container}>
        <div className={styles.sessHead} data-reveal>
          <p className={styles.eyebrow}>Quy trình một buổi</p>
          <h2 id="session-title" className={styles.h2}>
            Từ lúc bước vào đến lúc <em>uống ly trà cuối.</em>
          </h2>
          <p className={styles.lead}>Chọn liệu trình và giờ hẹn, kéo thanh thời gian để xem từng phút của buổi diễn ra thế nào.</p>
        </div>

        <div className={styles.sessCtl} data-reveal>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Liệu trình</legend>
            <div className={`${styles.options} ${styles.row}`}>
              {RITUALS.map((r) => (
                <label key={r.id} className={styles.opt}>
                  <input type="radio" name="sess-ritual" value={r.id} checked={rid === r.id} onChange={() => { setRid(r.id); setMin(0); setPlaying(false); }} />
                  <span className={`${styles.optBox} ${styles.compact}`}>{r.name}<small className={styles.sessMin}>{r.durationMinutes}′</small></span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className={styles.sessSel}>
            <span className={styles.legend}>Giờ hẹn</span>
            <select value={t0} onChange={(e) => { setStart(Number(e.target.value)); }} aria-label="Giờ hẹn">
              {starts.map((s) => <option key={s} value={s}>{formatMinutes(s)}</option>)}
            </select>
          </label>
        </div>

        <div className={styles.sessBoard} data-reveal>
          <div className={styles.sessBar} aria-hidden="true">
            {steps.map((s, i) => (
              <span key={`${s.label}-${i}`} className={`${styles.sessSeg} ${i === curIdx ? styles.sessOn : ""} ${i < curIdx ? styles.sessDone : ""}`} style={{ flexGrow: s.minutes }}>
                <i>{s.label}</i>
              </span>
            ))}
            <span className={styles.sessHead2} style={{ left: `${(m / total) * 100}%` }} />
          </div>
          <div className={styles.sessScale} aria-hidden="true">
            {steps.map((s, i) => (
              <span key={`${s.label}-t${i}`} style={{ flexGrow: s.minutes }} className={styles.num}>{clock(starts2[i])}</span>
            ))}
          </div>
          <div className={styles.sessRow}>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary} ${styles.sessPlay}`} onClick={() => { if (m >= total) setMin(0); setPlaying((p) => !p); }} aria-pressed={playing}>
              {playing ? "Tạm dừng" : m >= total ? "Chạy lại" : "Chạy thử buổi này"}
            </button>
            <label className={styles.sessRange}>
              <span className={styles.srOnly}>Phút thứ mấy trong buổi</span>
              <input type="range" min={0} max={total} step={1} value={m} onChange={(e) => { setPlaying(false); setMin(Number(e.target.value)); }} aria-valuetext={`Phút ${m} trên ${total}, ${cur.label}`} />
            </label>
          </div>
          <div className={styles.sessNow} role="status" aria-live="off" data-testid="session-now">
            <p className={`${styles.sessClock} ${styles.num}`}>{clock(m)}</p>
            <div>
              <p className={styles.sessStepName}>{cur.label} · {cur.minutes}&nbsp;phút</p>
              <p className={styles.sessStepDesc}>{STEP_DESC[cur.label] ?? ""}</p>
              <p className={styles.sessMeta}>Phút {m}/{total} · hết buổi lúc {clock(total)} · giá {ritual.name}: {new Intl.NumberFormat("vi-VN").format(ritual.priceVnd)}&nbsp;₫</p>
            </div>
          </div>
          <p className={styles.sessFoot}>Đón khách trước giờ hẹn 10 phút. Sau liệu trình có 10 phút trà gừng và thanh toán; phòng được dọn 15 phút trước lịch kế tiếp.</p>
        </div>
      </div>
    </section>
  );
}
