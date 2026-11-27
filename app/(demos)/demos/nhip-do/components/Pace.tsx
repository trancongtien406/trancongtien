"use client";

import { useState } from "react";
import styles from "../brand.module.css";

const DIST = [{ k: 5, l: "5 km" }, { k: 10, l: "10 km" }, { k: 21.0975, l: "Bán marathon" }, { k: 42.195, l: "Marathon" }];

function pick(pace: number) {
  if (pace < 4.2) return { m: "Nhịp 02 Bứt", why: "Pace dưới 4:12/km hợp đôi nhẹ, đế cứng để giữ tốc độ." };
  if (pace < 6) return { m: "Nhịp 01 Tempo", why: "Pace trung bình, đệm vừa đủ cho buổi chạy tempo và đường dài." };
  if (pace < 7.5) return { m: "Nhịp 04 Hồi", why: "Pace nhẹ nhàng, ưu tiên đệm dày cho những buổi chạy phục hồi." };
  return { m: "Nhịp 04 Hồi", why: "Bắt đầu chậm là hoàn toàn ổn, đệm êm sẽ giúp bạn chạy đều hơn." };
}

export function Pace() {
  const [d, setD] = useState(10);
  const [h, setH] = useState(0);
  const [m, setM] = useState(55);
  const [s, setS] = useState(0);
  const secs = h * 3600 + m * 60 + s;
  const pace = secs > 0 ? secs / 60 / d : 0;
  const mm = Math.floor(pace);
  const ss = Math.round((pace - mm) * 60);
  const rec = pace ? pick(pace) : null;
  const num = (v: string, max: number) => Math.min(max, Math.max(0, Number(v) || 0));

  return (
    <div className={styles.paceBox}>
      <form className={styles.paceForm} onSubmit={(e) => e.preventDefault()} aria-label="Máy tính nhịp chạy">
        <label className={styles.f}><span>Cự ly</span>
          <select value={d} onChange={(e) => setD(Number(e.target.value))}>{DIST.map((x) => <option key={x.k} value={x.k}>{x.l}</option>)}</select>
        </label>
        <div className={styles.f3}>
          <label className={styles.f}><span>Giờ</span><input inputMode="numeric" value={h} onChange={(e) => setH(num(e.target.value, 9))} /></label>
          <label className={styles.f}><span>Phút</span><input inputMode="numeric" value={m} onChange={(e) => setM(num(e.target.value, 59))} /></label>
          <label className={styles.f}><span>Giây</span><input inputMode="numeric" value={s} onChange={(e) => setS(num(e.target.value, 59))} /></label>
        </div>
      </form>
      <div className={styles.paceOut} role="status" aria-live="polite">
        <p className={styles.paceLabel}>Nhịp của bạn</p>
        <p className={styles.paceNum}>{pace ? `${String(mm).padStart(2, "0")}:${String(ss === 60 ? 59 : ss).padStart(2, "0")}` : "--:--"}<small>/km</small></p>
        {rec ? <p className={styles.paceRec}><b>{rec.m}</b> {rec.why}</p> : <p className={styles.paceRec}>Nhập thời gian dự kiến để xem gợi ý.</p>}
      </div>
    </div>
  );
}
