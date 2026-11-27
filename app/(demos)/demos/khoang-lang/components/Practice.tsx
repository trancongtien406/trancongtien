"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "../brand.module.css";

type Step = ["in" | "hold" | "out", number];
const PATTERNS: { id: string; name: string; steps: Step[]; desc: string }[] = [
  { id: "diu", name: "Êm dịu", steps: [["in", 4], ["out", 6]], desc: "Hít vào 4 giây, thở ra 6 giây. Dễ nhất để bắt đầu." },
  { id: "hop", name: "Thở hộp", steps: [["in", 4], ["hold", 4], ["out", 4], ["hold", 4]], desc: "Bốn nhịp bằng nhau, giữ đầu óc tập trung." },
  { id: "478", name: "4-7-8", steps: [["in", 4], ["hold", 7], ["out", 8]], desc: "Hít 4, giữ 7, thở ra 8. Hợp trước khi ngủ." },
];
const LABEL = { in: "Hít vào", hold: "Giữ", out: "Thở ra" } as const;
const MINUTES = [1, 3, 5];
const R = 118;
const C = 2 * Math.PI * R;

export function Practice() {
  const [pid, setPid] = useState("diu");
  const [minutes, setMinutes] = useState(1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState<{ label: string; n: number }>({ label: "Sẵn sàng", n: 0 });
  const [prog, setProg] = useState(0);
  const orb = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const last = useRef("");

  const pattern = PATTERNS.find((p) => p.id === pid) ?? PATTERNS[0];

  function stop(finished = false) {
    tlRef.current?.kill();
    tlRef.current = null;
    setRunning(false);
    setDone(finished);
    setPhase({ label: finished ? "Cảm ơn bạn" : "Sẵn sàng", n: 0 });
    if (orb.current) gsap.to(orb.current, { scale: 1, opacity: 1, duration: 0.8, ease: "sine.out", overwrite: true });
  }

  function start() {
    if (!orb.current) return;
    tlRef.current?.kill();
    setDone(false);
    setRunning(true);
    last.current = "";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = orb.current;
    const cycle = pattern.steps.reduce((a, s) => a + s[1], 0);
    const total = minutes * 60;
    const lo = reduce ? { opacity: 0.55 } : { scale: 0.68 };
    const hi = reduce ? { opacity: 1 } : { scale: 1.16 };
    gsap.set(el, reduce ? { scale: 1, opacity: 0.55 } : { scale: 0.68, opacity: 1 });
    const tl = gsap.timeline({
      repeat: -1,
      onUpdate: () => {
        const tt = tl.totalTime();
        if (tt >= total) return stop(true);
        let c = tt % cycle;
        let idx = 0;
        while (idx < pattern.steps.length - 1 && c >= pattern.steps[idx][1]) { c -= pattern.steps[idx][1]; idx++; }
        const [kind, dur] = pattern.steps[idx];
        const n = Math.max(1, Math.ceil(dur - c));
        const key = `${idx}-${n}`;
        if (key !== last.current) { last.current = key; setPhase({ label: LABEL[kind], n }); }
        setProg(tt / total);
      },
    });
    pattern.steps.forEach(([kind, dur]) => {
      if (kind === "in") tl.to(el, { ...hi, duration: dur, ease: "sine.inOut" });
      else if (kind === "out") tl.to(el, { ...lo, duration: dur, ease: "sine.inOut" });
      else tl.to({}, { duration: dur });
    });
    tlRef.current = tl;
  }

  useEffect(() => () => { tlRef.current?.kill(); }, []);

  return (
    <div className={styles.practice}>
      <div className={styles.stage}>
        <svg className={styles.ring} viewBox="0 0 260 260" aria-hidden="true">
          <circle cx="130" cy="130" r={R} fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="2" />
          <circle cx="130" cy="130" r={R} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - prog)} transform="rotate(-90 130 130)" />
        </svg>
        <div ref={orb} className={styles.orb} aria-hidden="true"><i /><i /><i /></div>
        <div className={styles.stageText} role="status" aria-live="polite">
          <b>{phase.label}</b>
          <span>{running ? phase.n : done ? "Hoàn tất" : "Bấm bắt đầu"}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <fieldset>
          <legend>Kiểu thở</legend>
          <div className={styles.seg}>
            {PATTERNS.map((p) => (
              <label key={p.id}>
                <input type="radio" name="kl-pattern" checked={pid === p.id} disabled={running} onChange={() => setPid(p.id)} />
                <span>{p.name}</span>
              </label>
            ))}
          </div>
          <p className={styles.segNote}>{pattern.desc}</p>
        </fieldset>
        <fieldset>
          <legend>Thời lượng</legend>
          <div className={styles.seg}>
            {MINUTES.map((m) => (
              <label key={m}>
                <input type="radio" name="kl-min" checked={minutes === m} disabled={running} onChange={() => setMinutes(m)} />
                <span>{m} phút</span>
              </label>
            ))}
          </div>
        </fieldset>
        {running ? (
          <button type="button" className={styles.btnGhost} onClick={() => stop(false)}>Dừng lại</button>
        ) : (
          <button type="button" className={styles.btn} onClick={start}>{done ? "Thở thêm một lượt" : "Bắt đầu thở"}</button>
        )}
        <p className={styles.segNote}>Bài tập mô phỏng để trải nghiệm giao diện, không thay thế tư vấn y tế hay tâm lý.</p>
      </div>
    </div>
  );
}
