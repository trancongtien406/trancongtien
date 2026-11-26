"use client";

import { useEffect, useState } from "react";
import s from "../brand.module.css";
import { HAPPY, HOURS } from "../data/venue";

type Now = { day: number; min: number };
function vnNow(): Now {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Ho_Chi_Minh", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")), min: Number(get("hour")) * 60 + Number(get("minute")) };
}
const hm = (m: number) => `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}`;

/** Nến giờ mở cửa: thân nến ngắn dần từ giờ mở đến giờ đóng cửa của tối nay (giờ Việt Nam); ngoài giờ thì nến chưa thắp. */
export function Hours() {
  const [now, setNow] = useState<Now | null>(null);
  useEffect(() => {
    const t = () => setNow(vnNow());
    t();
    const id = window.setInterval(t, 30000);
    return () => window.clearInterval(id);
  }, []);
  const today = now ? HOURS.find((h) => h.d === now.day) : undefined;
  const lit = !!(now && today && now.min >= today.openMin && now.min < today.closeMin);
  const frac = lit && today && now ? 1 - (now.min - today.openMin) / (today.closeMin - today.openMin) : 1;
  const bodyH = 40 + 150 * frac;
  const state = !now ? "x" : lit ? "1" : "0";
  let msg = "Đang xem giờ mở cửa";
  if (now && today) {
    if (lit) msg = `Còn ${hm(today.closeMin - now.min)} nữa đến giờ đóng cửa ${today.close}`;
    else if (now.min < today.openMin) msg = `Nến sẽ thắp lúc ${today.open} tối nay`;
    else msg = "Nến đã tắt, hẹn bạn tối mai";
  }
  const hh = now && today && now.min >= 1020 && now.min < 1140 && now.day >= 1 && now.day <= 5;
  return (
    <section className={s.hours} id="gio-mo-cua" aria-labelledby="rv-hours-h" data-testid="hours">
      <div className={`${s.wrap} ${s.hoursGrid}`}>
        <div>
          <header className={s.secHead}>
            <p className={s.kicker}>Giờ mở cửa và happy hour</p>
            <h2 id="rv-hours-h" className={s.h2} data-rv="rv">Mở từ 17:00, nến thắp đến khuya.</h2>
            <p className={s.mutedP}>Mộc Vang ở {`Quận Ngũ Hành Sơn, Đà Nẵng`}. Bàn dưới 6 khách có thể ghé không cần hẹn; giờ đông cuối tuần nên đặt trước.</p>
          </header>
          <div className={s.happy} data-on={hh ? "1" : "0"} data-testid="happy">
            <p className={s.happyTag}>Happy hour</p>
            <p className={s.happyTime}>{HAPPY.time}</p>
            <p className={s.happyDays}>{HAPPY.days}</p>
            <p>{HAPPY.deal}</p>
            {hh ? <p className={s.happyNow}>Đang trong giờ happy hour</p> : null}
          </div>
          <table className={s.hoursTable}>
            <caption className={s.srOnly}>Giờ mở cửa theo ngày</caption>
            <tbody>
              {HOURS.map((h) => (
                <tr key={h.d} data-today={now?.day === h.d ? "1" : undefined}>
                  <th scope="row">{h.label}</th>
                  <td>{h.open} – {h.close}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figure className={s.candleClock} data-lit={state} role="status" aria-live="polite">
          <svg viewBox="0 0 160 300" aria-hidden="true" focusable="false" className={s.ccSvg}>
            <defs>
              <linearGradient id="rv-cc-wax" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#c9b79a" />
                <stop offset=".4" stopColor="#f1e5cf" />
                <stop offset="1" stopColor="#9c8a6c" />
              </linearGradient>
              <radialGradient id="rv-cc-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#ffb866" stopOpacity=".6" />
                <stop offset="1" stopColor="#d9822b" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g className={s.ccFlame} style={{ transform: `translateY(${190 - bodyH}px)` }}>
              <circle cx="80" cy="60" r="62" fill="url(#rv-cc-halo)" className={s.ccHalo} />
              <g className={s.flameOuter}><path d="M80 24C94 48 102 62 80 88 58 62 66 48 80 24z" fill="#ffb347" opacity=".9" /></g>
              <g className={s.flameInner}><path d="M80 50c7 11 9 18 0 30-9-12-7-19 0-30z" fill="#fff3d6" /></g>
            </g>
            <path d="M80 92v10" stroke="#3a1a10" strokeWidth="2.4" strokeLinecap="round" style={{ transform: `translateY(${190 - bodyH}px)` }} />
            <rect x="52" y={290 - bodyH} width="56" height={bodyH - 8} rx="5" fill="url(#rv-cc-wax)" className={s.ccBody} />
            <ellipse cx="80" cy="284" rx="52" ry="8" fill="#c08a4a" />
          </svg>
          <figcaption>
            <b>{!now ? "Nến giờ mở cửa" : lit ? "Nến đang thắp" : "Nến chưa thắp"}</b>
            <span>{msg}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
