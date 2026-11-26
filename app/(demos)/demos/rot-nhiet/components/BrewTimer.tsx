"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";

type Stage = { name: string; sec: number; water: number; hint: string };
type Recipe = { id: string; label: string; bean: string; dose: string; water: string; temp: string; stages: Stage[] };

const RECIPES: Recipe[] = [
  { id: "phin", label: "Phin", bean: "Nhiệt Đậm", dose: "20 g cà phê", water: "160 ml", temp: "92–95°C", stages: [
    { name: "Ủ cà phê", sec: 30, water: 40, hint: "Rót 40 ml nước, đậy nắp phin" },
    { name: "Nhỏ giọt", sec: 240, water: 160, hint: "Rót nốt nước, để cà phê nhỏ giọt" } ] },
  { id: "v60", label: "V60", bean: "Nhiệt Sáng", dose: "15 g cà phê", water: "250 ml", temp: "93°C", stages: [
    { name: "Ủ nở", sec: 30, water: 50, hint: "Rót 50 ml, xoay nhẹ cho bột thấm đều" },
    { name: "Rót lượt hai", sec: 45, water: 150, hint: "Rót vòng tròn đến 150 ml" },
    { name: "Rót lượt ba", sec: 45, water: 250, hint: "Rót đến 250 ml rồi dừng" },
    { name: "Chờ rút nước", sec: 45, water: 250, hint: "Đợi nước rút hết, khoảng 2:45 là xong" } ] },
  { id: "press", label: "French press", bean: "Nhiệt Vừa", dose: "1 phần cà phê", water: "15 phần nước", temp: "94°C", stages: [
    { name: "Ủ", sec: 240, water: 100, hint: "Đổ nước, khuấy nhẹ, đậy nắp" },
    { name: "Ấn chậm", sec: 30, water: 100, hint: "Ấn pit-tông xuống từ từ rồi rót ngay" } ] },
];
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Đồng hồ pha cà phê chạy thật: đếm từng giây theo công thức, nước và cà phê dâng lên trong bình theo tiến độ. */
export function BrewTimer() {
  const [rid, setRid] = useState("v60");
  const r = RECIPES.find((x) => x.id === rid)!;
  const total = r.stages.reduce((a, s) => a + s.sec, 0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const base = useRef(0);
  const startAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    startAt.current = performance.now();
    base.current = elapsed;
    const id = window.setInterval(() => {
      const e = base.current + (performance.now() - startAt.current) / 1000;
      if (e >= total) { setElapsed(total); setRunning(false); window.clearInterval(id); return; }
      setElapsed(e);
    }, 100);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, rid]);

  const pick = (id: string) => { setRid(id); setRunning(false); setElapsed(0); };
  let acc = 0;
  let idx = r.stages.length - 1;
  for (let i = 0; i < r.stages.length; i++) { acc += r.stages[i].sec; if (elapsed < acc) { idx = i; break; } }
  const done = elapsed >= total;
  const st = r.stages[idx];
  const stageStart = r.stages.slice(0, idx).reduce((a, s) => a + s.sec, 0);
  const prevWater = idx ? r.stages[idx - 1].water : 0;
  const waterNow = done ? st.water : prevWater + (st.water - prevWater) * Math.min(1, (elapsed - stageStart) / Math.max(1, st.sec * 0.6));
  const maxWater = Math.max(...r.stages.map((s) => s.water));
  const pour = waterNow / maxWater;      // nước trong phễu/phin
  const cup = elapsed / total;           // cà phê trong bình hứng
  const left = Math.max(0, total - elapsed);
  return (
    <section id="cach-pha" className={`${styles.section} ${styles.brewSection} ${styles.darkZone}`} aria-labelledby="rn-brew-h">
      <div className={styles.wrap}>
        <div className={styles.sectionHead} data-rn-reveal>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>06 / PHA TẠI NHÀ</span>
            <h2 id="rn-brew-h" className={`${styles.display} ${styles.h2}`}>Bấm giờ pha.</h2>
          </div>
          <div><p className={styles.lead}>Chọn cách pha, bấm bắt đầu. Đồng hồ đếm từng giây theo công thức đi kèm hạt, báo bước nào cần rót bao nhiêu nước.</p></div>
        </div>
        <div className={styles.brewGrid}>
          <div className={styles.brewLeft}>
            <div role="group" aria-label="Chọn cách pha" className={styles.chips}>
              {RECIPES.map((x) => <button key={x.id} type="button" className={styles.chipBtn} aria-pressed={x.id === rid} onClick={() => pick(x.id)} data-testid={`brew-${x.id}`}>{x.label}</button>)}
            </div>
            <dl className={styles.recipe}>
              <div><dt>Hạt</dt><dd>{r.bean}</dd></div>
              <div><dt>Liều</dt><dd>{r.dose}</dd></div>
              <div><dt>Nước</dt><dd>{r.water}</dd></div>
              <div><dt>Nhiệt độ nước</dt><dd>{r.temp}</dd></div>
            </dl>
            <div className={styles.clock} role="timer" aria-label={`Còn lại ${fmt(left)}`} data-testid="brew-clock">{fmt(left)}</div>
            <p className={styles.stageNow} data-testid="brew-stage">{done ? "Xong rồi. Thưởng thức thôi." : `${idx + 1}/${r.stages.length} · ${st.name}: ${st.hint}`}</p>
            <p className={styles.srOnly} role="status" aria-live="polite">{done ? "Đã pha xong" : running ? `Bước ${idx + 1}: ${st.name}. ${st.hint}` : ""}</p>
            <div className={styles.ctaRow}>
              <button type="button" className={`${styles.btn} ${styles.btnPaper}`} onClick={() => { if (done) setElapsed(0); setRunning((x) => !x); }} aria-pressed={running} data-testid="brew-toggle">{running ? "Tạm dừng" : done ? "Pha lại" : elapsed > 0 ? "Tiếp tục" : "Bắt đầu"}</button>
              <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => { setRunning(false); setElapsed(0); }} data-testid="brew-reset">Đặt lại</button>
            </div>
            <ol className={styles.stageList}>
              {r.stages.map((s, i) => (
                <li key={s.name} data-state={i < idx || done ? "done" : i === idx ? "now" : "next"}>
                  <b>{fmt(s.sec)}</b><span>{s.name}</span><em>{s.water} ml</em>
                </li>
              ))}
            </ol>
          </div>
          <figure className={styles.brewArt} aria-hidden="true">
            <svg viewBox="0 0 260 340">
              <defs>
                <clipPath id="rn-dripper"><path d="M50 40h160l-48 120h-64z" /></clipPath>
                <clipPath id="rn-carafe"><path d="M62 200h136l-10 110a14 14 0 0 1-14 12H86a14 14 0 0 1-14-12z" /></clipPath>
              </defs>
              <path d="M50 40h160l-48 120h-64z" fill="none" stroke="#f8f5ed" strokeWidth="5" strokeLinejoin="round" />
              <g clipPath="url(#rn-dripper)"><rect x="40" width="180" y={160 - 120 * pour} height={120 * pour + 2} fill="#e33c29" opacity=".85" /></g>
              <path d="M98 160h64v22h-64z" fill="none" stroke="#f8f5ed" strokeWidth="5" />
              <rect x="124" y="182" width="12" height={running ? 24 : 0} fill="#e33c29" rx="6" />
              <path d="M62 200h136l-10 110a14 14 0 0 1-14 12H86a14 14 0 0 1-14-12z" fill="none" stroke="#f8f5ed" strokeWidth="5" strokeLinejoin="round" />
              <g clipPath="url(#rn-carafe)"><rect x="60" width="140" y={322 - 118 * cup} height={118 * cup + 2} fill="#7a4524" /></g>
            </svg>
          </figure>
        </div>
      </div>
    </section>
  );
}
