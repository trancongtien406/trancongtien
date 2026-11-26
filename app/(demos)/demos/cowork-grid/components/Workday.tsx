"use client";

import { useEffect, useMemo, useState } from "react";
import s from "../brand.module.css";
import { DAY_BEATS } from "../data/content";
import { DAY_NAMES, HOURS_MAX, HOURS_MIN, density, vnNow } from "../lib/seatmap";
import { LiveClock } from "./LiveClock";

const W = 1000, H = 220, PAD_T = 18, PAD_B = 34;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Ngày làm việc chạy thật: đường mật độ thường gặp của hôm nay (giờ Đà Nẵng), kim "bây giờ" dịch theo đồng hồ,
 * và thẻ nhịp ngày đang diễn ra được tô cam. Đường được vẽ dần khi vào khung.
 */
export function Workday() {
  const [now, setNow] = useState<{ day: number; t: number } | null>(null);
  useEffect(() => {
    const f = () => {
      const n = vnNow();
      setNow({ day: n.day, t: n.hour + n.minute / 60 });
    };
    f();
    const id = window.setInterval(f, 15000);
    return () => window.clearInterval(id);
  }, []);
  const day = now?.day ?? 1;

  const { line, area } = useMemo(() => {
    const pts: [number, number][] = [];
    for (let t = HOURS_MIN; t <= HOURS_MAX; t += 0.25) {
      const lo = Math.floor(t), hi = Math.min(HOURS_MAX, lo + 1), f = t - lo;
      const d = density(day, lo) * (1 - f) + density(day, hi) * f;
      pts.push([((t - HOURS_MIN) / (HOURS_MAX - HOURS_MIN)) * W, PAD_T + (1 - d) * (H - PAD_T - PAD_B)]);
    }
    const l = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("");
    return { line: l, area: `${l}L${W} ${H - PAD_B}L0 ${H - PAD_B}Z` };
  }, [day]);

  const inRange = now && now.t >= HOURS_MIN && now.t <= HOURS_MAX;
  const pct = inRange ? ((now!.t - HOURS_MIN) / (HOURS_MAX - HOURS_MIN)) * 100 : null;
  const curBeat = now ? DAY_BEATS.findIndex((b) => now.t >= b.from && now.t < b.to) : -1;
  const peak = useMemo(() => {
    let best = HOURS_MIN, bv = 0;
    for (let h = HOURS_MIN; h <= HOURS_MAX; h++) { const v = density(day, h); if (v > bv) { bv = v; best = h; } }
    return best;
  }, [day]);

  return (
    <div className={s.workday}>
      <div className={s.wdHead}>
        <p className={s.wdClock}><LiveClock prefix="" seconds /></p>
        <p className={s.wdDay}>{DAY_NAMES[day]} · Đà Nẵng</p>
        <p className={s.wdPeak}>Khu mở đông nhất quanh {pad(peak)}:00</p>
      </div>
      <div className={s.wdChart} data-cg-rule role="img" aria-label={`Mật độ thường gặp trong ngày ${DAY_NAMES[day].toLowerCase()}, đông nhất quanh ${pad(peak)} giờ`}>
        <svg className={s.wdArea} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <path d={area} />
        </svg>
        <svg className={s.wdLine} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" fill="none" stroke="currentColor">
          <path d={line} />
        </svg>
        <ul className={s.wdAxis} aria-hidden="true">
          {Array.from({ length: HOURS_MAX - HOURS_MIN + 1 }, (_, i) => HOURS_MIN + i).map((h) => (
            <li key={h} data-major={h % 2 === 1 ? "1" : undefined}><span>{pad(h)}</span></li>
          ))}
        </ul>
        {pct !== null && (
          <div className={s.wdNeedle} style={{ left: `${pct}%` }} aria-hidden="true">
            <span>BÂY GIỜ {pad(Math.floor(now!.t))}:{pad(Math.floor((now!.t % 1) * 60))}</span>
          </div>
        )}
      </div>
      <ol className={s.beats}>
        {DAY_BEATS.map((b, i) => (
          <li key={b.t} data-now={i === curBeat ? "1" : undefined}>
            <span className={s.beatTime}>{pad(b.from)}:00 – {pad(b.to)}:00</span>
            <b>{b.t}</b>
            <span>{b.d}</span>
            {i === curBeat && <em>ĐANG DIỄN RA</em>}
          </li>
        ))}
      </ol>
    </div>
  );
}
