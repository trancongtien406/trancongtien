"use client";

import { useId, useState } from "react";
import styles from "../brand.module.css";
import { HOURS } from "../data/content";

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const PRESETS = [
  { l: "Cắt", m: 50 }, { l: "Nhuộm", m: 120 }, { l: "Uốn hoặc duỗi", m: 150 }, { l: "Tẩy và nhuộm", m: 240 },
];

/** Thanh khung giờ: chọn thời lượng dịch vụ, thấy giờ bắt đầu muộn nhất trong ngày mở cửa 09:00–20:00. */
export function SlotBar() {
  const id = useId();
  const [dur, setDur] = useState(120);
  const { open, close, lastStart } = HOURS;
  const latest = Math.min(close - dur, lastStart);
  const ok = latest >= open;
  const span = close - open;
  const pct = (m: number) => `${((m - open) / span) * 100}%`;
  return (
    <div className={styles.slot} data-nl="slotbar">
      <div className={styles.slotHead}>
        <label htmlFor={`${id}-d`}>Thời lượng dịch vụ: <b data-nl="slot-dur">{dur >= 60 ? `${Math.floor(dur / 60)} giờ${dur % 60 ? ` ${dur % 60} phút` : ""}` : `${dur} phút`}</b></label>
        <input id={`${id}-d`} type="range" min={30} max={300} step={15} value={dur} onChange={(e) => setDur(Number(e.target.value))} aria-valuetext={`${dur} phút`} />
        <div className={styles.slotPre} role="group" aria-label="Chọn nhanh theo dịch vụ">
          {PRESETS.map((p) => <button key={p.l} type="button" className={styles.slotBtn} aria-pressed={dur === p.m} onClick={() => setDur(p.m)}>{p.l}</button>)}
        </div>
      </div>
      <div className={styles.slotBarWrap} aria-hidden="true">
        <span className={styles.slotDay} />
        {ok && <span className={styles.slotRun} style={{ left: pct(latest), width: `calc(${pct(latest + dur)} - ${pct(latest)})` }} />}
        {ok && <span className={styles.slotFree} style={{ left: 0, width: pct(latest) }} />}
        <span className={styles.slotTick} style={{ left: "0%" }}>09:00</span>
        <span className={styles.slotTick} style={{ left: "50%" }}>14:30</span>
        <span className={styles.slotTick} style={{ right: 0, left: "auto" }}>20:00</span>
      </div>
      <p className={styles.slotOut} aria-live="polite" data-nl="slot-out">
        {ok ? <>Bắt đầu muộn nhất <b>{hhmm(latest)}</b>, xong khoảng <b>{hhmm(latest + dur)}</b>. Khách đến từ 09:00 đều làm được.</> : <>Dịch vụ dài hơn thời gian mở cửa trong một ngày. Hãy chia thành hai buổi khi tư vấn.</>}
      </p>
      <p className={styles.note}>Khách cuối nhận lúc 18:30. Giờ cao điểm là cuối tuần và chiều tối, nên đặt trước.</p>
    </div>
  );
}
