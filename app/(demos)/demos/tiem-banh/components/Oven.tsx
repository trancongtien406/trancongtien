"use client";

import { useEffect, useState } from "react";
import s from "../brand.module.css";

type Batch = { at: number; time: string; name: string; note: string };

const BATCHES: Batch[] = [
  { at: 6.5, time: "06:30", name: "Croissant bơ & brioche", note: "Mẻ đầu ngày, có sẵn lúc mở cửa." },
  { at: 8, time: "08:00", name: "Bánh mì sữa & donut hồng cốm", note: "Bột men ủ từ tối hôm trước." },
  { at: 10, time: "10:00", name: "Cookie bơ đậu phộng & socola muối", note: "Mẻ cookie ra lò khi còn mềm ở giữa." },
  { at: 13.5, time: "13:30", name: "Croissant hạnh nhân", note: "Mẻ chiều, hợp trà chiều." },
  { at: 16.5, time: "16:30", name: "Croissant bơ & brioche", note: "Mẻ cuối, hết mẻ là hết." },
];
const OPEN = 7;
const CLOSE = 21;

const VN = 7 * 3600e3;
const secOfDay = (ms: number) => { const d = new Date(ms + VN); return d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds(); };
const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (sec: number) => `${pad(Math.floor(sec / 3600))}:${pad(Math.floor((sec % 3600) / 60))}:${pad(sec % 60)}`;

export function Oven() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = window.setInterval(() => { if (!document.hidden) setNow(Date.now()); }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const sec = now === null ? null : secOfDay(now);
  let idx = -1; // chỉ số mẻ tiếp theo
  let left = 0;
  let ratio = 0;
  let tomorrow = false;
  if (sec !== null) {
    idx = BATCHES.findIndex((b) => b.at * 3600 > sec);
    if (idx === -1) { tomorrow = true; idx = 0; left = 86400 - sec + BATCHES[0].at * 3600; ratio = Math.min(1, (sec - BATCHES[BATCHES.length - 1].at * 3600) / (86400 - BATCHES[BATCHES.length - 1].at * 3600 + BATCHES[0].at * 3600)); }
    else {
      left = BATCHES[idx].at * 3600 - sec;
      const prevAt = idx === 0 ? BATCHES[BATCHES.length - 1].at * 3600 - 86400 : BATCHES[idx - 1].at * 3600;
      ratio = Math.max(0, Math.min(1, (sec - prevAt) / (BATCHES[idx].at * 3600 - prevAt)));
    }
  }
  const openNow = sec !== null && sec >= OPEN * 3600 && sec < CLOSE * 3600;
  const C = 2 * Math.PI * 70;
  const next = BATCHES[idx < 0 ? 0 : idx];
  const state = (i: number) => (sec === null ? "later" : tomorrow ? "done" : i < idx ? "done" : i === idx ? "next" : "later");
  return (
    <section className={`${s.sec} ${s.secButter}`} id="gio-ra-lo" aria-labelledby="h-oven">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Giờ ra lò</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-oven">Năm mẻ nướng mỗi ngày, tiệm bán từ 7:00 đến 21:00</h2>
          <p className={s.lead}>Muốn bánh còn ấm, ghé sau giờ ra lò vài phút. Hết mẻ nào là hết mẻ đó cho tới mẻ kế tiếp.</p>
        </div>
        <div className={s.ovenGrid}>
          <div className={s.ovenCard} data-fx-own="oven-timer">
            <div className={s.ovenArt} aria-hidden="true" style={{ "--rise": ratio } as React.CSSProperties}>
              <svg viewBox="0 0 200 200" className={s.ovenSvg}>
                <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(70,37,26,.18)" strokeWidth="14" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#FF6F98" strokeWidth="14" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - ratio)} transform="rotate(-90 100 100)" className={s.ovenArc} />
                <g className={s.loaf} style={{ transformOrigin: "100px 118px" }}>
                  <path d="M58 118c0-26 18-40 42-40s42 14 42 40z" fill="#E7A04C" stroke="#46251A" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M80 96l10 12M100 90l4 16M120 96l-6 12" stroke="#46251A" strokeWidth="4" strokeLinecap="round" />
                </g>
                <rect x="50" y="118" width="100" height="10" rx="5" fill="#46251A" />
              </svg>
            </div>
            <div className={s.ovenText} role="timer" aria-live="off" aria-label={sec === null ? "Đang tính giờ" : `Còn ${fmt(left)} tới mẻ ${next.name}`}>
              <p className={s.ovenHead}>{sec === null ? "Đang xem giờ lò" : tomorrow ? "Mẻ đầu ngày mai ra lò sau" : "Mẻ tiếp theo ra lò sau"}</p>
              <p className={s.ovenClock}>{sec === null ? "--:--:--" : fmt(left)}</p>
              <p className={s.ovenNext}><b>{next.time}</b> {next.name}</p>
              <p className={s.ovenOpen} data-open={openNow ? "1" : undefined}>{sec === null ? "" : openNow ? "Tiệm đang mở cửa" : "Tiệm đang đóng cửa, mở lại lúc 7:00"}</p>
            </div>
          </div>
          <ol className={s.batches}>
            {BATCHES.map((b, i) => (
              <li key={b.time} className={s.batch} data-state={state(i)}>
                <span className={s.batchTime}>{b.time}</span>
                <div><b>{b.name}</b><span>{b.note}</span></div>
                <i className={s.batchTick} aria-hidden="true">{state(i) === "done" ? "✓" : state(i) === "next" ? "…" : ""}</i>
              </li>
            ))}
          </ol>
        </div>
        <p className={s.fineNote}>Giờ ra lò tính theo giờ Việt Nam. Bánh kem, bánh lạnh và macaron làm sáng sớm, không theo mẻ này.</p>
      </div>
    </section>
  );
}
