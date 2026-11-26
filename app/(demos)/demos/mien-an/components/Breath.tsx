"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";

const IN = 4;
const HOLD = 2;
const OUT = 6;
const CYCLE = IN + HOLD + OUT;
const PRESETS = [60, 180] as const;

const phaseAt = (t: number) => {
  const c = t % CYCLE;
  if (c < IN) return { name: "Hít vào", left: Math.ceil(IN - c), scale: 0.55 + 0.45 * (c / IN) };
  if (c < IN + HOLD) return { name: "Giữ nhẹ", left: Math.ceil(IN + HOLD - c), scale: 1 };
  return { name: "Thở ra", left: Math.ceil(CYCLE - c), scale: 1 - 0.45 * ((c - IN - HOLD) / OUT) };
};

/** Đồng hồ hít thở: hít 4 giây, giữ 2, thở ra 6. Vòng tròn nở/co chỉ khi không bật reduced-motion; chữ + số giây luôn có. */
export function Breath() {
  const [secs, setSecs] = useState<(typeof PRESETS)[number]>(180);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const orb = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    if (!running) return;
    const t0 = performance.now() - elapsed * 1000;
    let last = -1;
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      if (t >= secs) {
        setElapsed(secs); setRunning(false); setDone(true);
        if (orb.current) orb.current.style.transform = "scale(0.55)";
        return;
      }
      const p = phaseAt(t);
      if (orb.current) orb.current.style.transform = `scale(${p.scale})`;
      const whole = Math.floor(t * 4);
      if (whole !== last) { last = whole; setElapsed(t); }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    const stop = () => { if (document.hidden) { setRunning(false); } };
    document.addEventListener("visibilitychange", stop);
    return () => { cancelAnimationFrame(raf.current); document.removeEventListener("visibilitychange", stop); };
    // elapsed chỉ dùng để tiếp tục sau khi tạm dừng
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, secs]);

  const p = phaseAt(elapsed);
  const remain = Math.max(0, Math.ceil(secs - elapsed));
  const mm = `${Math.floor(remain / 60)}:${String(remain % 60).padStart(2, "0")}`;
  const idle = !running && elapsed === 0 && !done;

  const toggle = () => {
    if (done) { setDone(false); setElapsed(0); }
    setRunning((r) => !r);
  };
  const reset = () => { setRunning(false); setElapsed(0); setDone(false); if (orb.current) orb.current.style.transform = "scale(0.55)"; };

  return (
    <div className={styles.breath} data-testid="breath">
      <div className={styles.breathStage}>
        <div ref={orb} className={styles.breathOrb} style={{ transform: "scale(0.55)" }} aria-hidden="true" />
        <div className={styles.breathText} aria-hidden="true">
          <b>{idle ? "Sẵn sàng" : done ? "Xong" : p.name}</b>
          <span className={styles.num}>{idle ? `${secs / 60} phút` : done ? "0:00" : `${p.left} · ${mm}`}</span>
        </div>
      </div>
      <p className={styles.srOnly} role="status">{running ? "Đang chạy bài thở" : done ? "Bài thở đã kết thúc" : "Đã dừng"}</p>
      <div className={styles.breathCtl}>
        <div className={`${styles.options} ${styles.row}`} role="radiogroup" aria-label="Thời lượng bài thở">
          {PRESETS.map((s) => (
            <label key={s} className={styles.opt}>
              <input type="radio" name="breath-len" checked={secs === s} onChange={() => { setSecs(s); reset(); }} />
              <span className={`${styles.optBox} ${styles.compact}`}>{s / 60} phút</span>
            </label>
          ))}
        </div>
        <div className={styles.breathBtns}>
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={toggle} aria-pressed={running}>
            {running ? "Tạm dừng" : done ? "Thở lại" : elapsed > 0 ? "Tiếp tục" : "Bắt đầu thở"}
          </button>
          {!idle && <button type="button" className={styles.textBtn} onClick={reset}>Đặt lại</button>}
        </div>
      </div>
    </div>
  );
}
