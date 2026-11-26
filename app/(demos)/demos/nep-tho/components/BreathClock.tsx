"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";

/**
 * "Nhịp xe trượt": mô phỏng một bài đẩy chân trên máy Reformer theo hơi thở.
 * Hít: xe trượt đẩy ra, lò xo giãn. Thở ra: xe về chậm, lò xo co. Ba nhịp độ, 8 lượt.
 * Chỉ chạy khi bấm Bắt đầu; tự dừng khi tab ẩn hoặc rời khung. Reduced-motion: xe đứng yên, chỉ đổi chữ và đếm lượt.
 */
const TEMPOS = [
  { id: "slow", label: "Chậm · hít 4, thở 6", inn: 4, out: 6 },
  { id: "mid", label: "Vừa · hít 3, thở 5", inn: 3, out: 5 },
  { id: "fast", label: "Nhanh · hít 2, thở 3", inn: 2, out: 3 },
] as const;
const REPS = 8;
const TRAVEL = 240;
const SPRING = "M0 30 l12 -14 l12 28 l12 -28 l12 28 l12 -28 l12 28 l12 -28 l12 28 l12 -14";
const ease = (t: number) => t * t * (3 - 2 * t);

export function BreathClock() {
  const [tempo, setTempo] = useState<(typeof TEMPOS)[number]["id"]>("slow");
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const car = useRef<SVGGElement>(null);
  const spring = useRef<SVGPathElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const secs = useRef<HTMLElement>(null);
  const reps = useRef<HTMLElement>(null);
  const meter = useRef<HTMLElement>(null);
  const raf = useRef(0);
  const acc = useRef(0);
  const last = useRef(0);
  const tp = TEMPOS.find((t) => t.id === tempo)!;

  const paint = useCallback((t: number, reduced: boolean) => {
    const cyc = tp.inn + tp.out; const c = t % cyc; const rep = Math.floor(t / cyc);
    const inhale = c < tp.inn;
    const p = inhale ? ease(c / tp.inn) : 1 - ease((c - tp.inn) / tp.out);
    if (!reduced) {
      car.current?.setAttribute("transform", `translate(${(p * TRAVEL).toFixed(1)} 0)`);
      spring.current?.style.setProperty("transform", `scaleX(${(0.35 + p * 0.65 + 0.0).toFixed(3)})`);
    }
    if (label.current) label.current.textContent = inhale ? "Hít vào, đẩy ra" : "Thở ra, kéo về";
    if (secs.current) secs.current.textContent = String(Math.ceil(inhale ? tp.inn - c : cyc - c));
    if (reps.current) reps.current.textContent = `Lượt ${Math.min(REPS, rep + 1)}/${REPS}`;
    if (meter.current) meter.current.style.transform = `scaleX(${(t / (cyc * REPS)).toFixed(4)})`;
    root.current?.setAttribute("data-phase", inhale ? "in" : "out");
  }, [tp]);

  const stop = useCallback(() => { cancelAnimationFrame(raf.current); raf.current = 0; setRunning(false); }, []);

  useEffect(() => {
    if (!running) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = (tp.inn + tp.out) * REPS;
    last.current = performance.now();
    const tick = (now: number) => {
      acc.current += Math.min(0.1, (now - last.current) / 1000); last.current = now;
      if (acc.current >= total) { acc.current = 0; setFinished(true); stop(); return; }
      paint(acc.current, reduced);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    const onVis = () => { if (document.hidden) stop(); };
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) stop(); }, { threshold: 0 });
    if (root.current) io.observe(root.current);
    return () => { cancelAnimationFrame(raf.current); document.removeEventListener("visibilitychange", onVis); io.disconnect(); };
  }, [running, paint, stop, tp]);

  const start = () => {
    acc.current = 0; setFinished(false);
    car.current?.setAttribute("transform", "translate(0 0)");
    setRunning(true);
  };

  return (
    <div className={styles.breathClock} ref={root} data-nt="breath" data-phase="idle" data-running={running ? "1" : "0"}>
      <div className={styles.tempoRow} role="group" aria-label="Nhịp độ">
        {TEMPOS.map((t) => (
          <button key={t.id} type="button" className={styles.tempoBtn} aria-pressed={tempo === t.id} disabled={running} onClick={() => setTempo(t.id)}>{t.label}</button>
        ))}
      </div>
      <div className={styles.railBox}>
        <svg className={styles.railSvg} viewBox="0 0 420 90" aria-hidden="true">
          <line x1="14" y1="76" x2="406" y2="76" className={styles.railLine} />
          <rect x="6" y="22" width="12" height="54" rx="4" className={styles.railStop} />
          <g transform="translate(18 18)"><path ref={spring} d={SPRING} className={styles.railSpring} style={{ transform: "scaleX(0.35)" }} /></g>
          <g ref={car} transform="translate(0 0)">
            <rect x="74" y="34" width="96" height="34" rx="17" className={styles.railCar} />
            <rect x="96" y="44" width="52" height="8" rx="4" className={styles.railCarMark} />
          </g>
        </svg>
        <div className={styles.breathText} aria-hidden="true">
          <span ref={label}>{finished ? "Xong 8 lượt" : "Sẵn sàng"}</span>
          <b ref={secs}>{finished ? "✓" : "–"}</b>
          <i ref={reps}>{finished ? "Chậm rãi, hoàn thành" : `${REPS} lượt hít thở`}</i>
        </div>
        <div className={styles.breathMeter} aria-hidden="true"><i ref={meter} /></div>
      </div>
      <div className={styles.breathCtl}>
        {running
          ? <button type="button" className={`${styles.btn} ${styles.btnAccent}`} onClick={stop} data-nt="breath-stop">Dừng</button>
          : <button type="button" className={`${styles.btn} ${styles.btnAccent}`} onClick={start} data-nt="breath-start">{finished ? "Tập lại 8 lượt" : "Bắt đầu 8 lượt"}</button>}
      </div>
      <p className={styles.srOnly} role="status" aria-live="polite">{running ? `Đã bắt đầu: ${tp.label}, ${REPS} lượt.` : finished ? "Đã xong 8 lượt." : ""}</p>
    </div>
  );
}
