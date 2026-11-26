"use client";

import { useEffect, useState } from "react";
import { Odometer } from "@/features/showroom/effects";
import s from "../brand.module.css";

const VN = 7 * 3600e3;
const S = 17 * 3600;
const E = 19 * 3600;

const HOURS = [
  { d: "Thứ Hai đến thứ Năm", t: "17:00 – 00:00", dows: [1, 2, 3, 4] },
  { d: "Thứ Sáu và thứ Bảy", t: "17:00 – 01:00", dows: [5, 6] },
  { d: "Chủ nhật", t: "17:00 – 00:00", dows: [0] },
];

const OFFERS = [
  { k: "Cocktail cổ điển", v: "110.000₫", d: "Đồng giá sáu ly cổ điển trong khung 17:00–19:00." },
  { k: "Mocktail", v: "-20%", d: "Năm ly không cồn giảm một phần năm giá niêm yết." },
  { k: "Món nhắm", v: "Đĩa đôi", d: "Gọi hai món nhắm bất kỳ, tặng một phần bắp rang trứng muối." },
];

/** Thời gian theo giờ Việt Nam (UTC+7), không phụ thuộc múi giờ máy khách. */
function calc(ms: number) {
  const d = new Date(ms + VN);
  const dow = d.getUTCDay();
  const sec = d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();
  const wk = dow >= 1 && dow <= 5;
  if (wk && sec >= S && sec < E) return { live: true, left: E - sec, dow };
  let add = 0;
  for (let k = 0; k < 8; k++) {
    const dd = (dow + k) % 7;
    const start = k * 86400 + S;
    if (dd >= 1 && dd <= 5 && start > sec) { add = start - sec; break; }
  }
  return { live: false, left: add, dow };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Happy() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => { if (!document.hidden) setNow(Date.now()); };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  const c = now === null ? null : calc(now);
  const left = c?.left ?? 0;
  const parts = c ? [Math.floor(left / 3600), Math.floor((left % 3600) / 60), left % 60].map(pad) : ["--", "--", "--"];
  const label = ["giờ", "phút", "giây"];
  return (
    <section className={s.happy} id="happy-hour" aria-label="Giờ mở cửa và happy hour">
      <div className={s.wrap}>
        <div className={s.happyGrid}>
          <div>
            <p className={s.kicker}>Giờ mở cửa &amp; happy hour</p>
            <h2 className={s.h2} data-tm="lit">Mở từ chiều, happy hour hai tiếng đầu</h2>
            <p className={s.mutedP}>Quầy mở cửa từ 17:00. Happy hour chạy từ 17:00 đến 19:00, thứ Hai đến thứ Sáu. Gọi ly cuối trước giờ đóng cửa 30 phút.</p>
            <ul className={s.hours}>
              {HOURS.map((h) => (
                <li key={h.d} className={s.hoursRow} data-today={c && h.dows.includes(c.dow) ? "1" : undefined}>
                  <span>{h.d}</span><b>{h.t}</b>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.clock} data-live={c?.live ? "1" : undefined} data-fx-own="happy-clock">
            <p className={s.clockHead} role="status" aria-live="off">
              {c === null ? "Đang xem giờ" : c.live ? "Happy hour đang diễn ra, còn" : "Happy hour tiếp theo bắt đầu sau"}
            </p>
            <div className={s.clockDigits} role="timer" aria-label={c ? `${parts[0]} giờ ${parts[1]} phút ${parts[2]} giây` : "Đang tính"}>
              {parts.map((p, i) => (
                <div key={label[i]} className={s.clockCell}>
                  <span className={s.clockNum} aria-hidden="true">
                    {p.split("").map((ch, k) => <i key={`${k}${ch}`} className={s.digit}>{ch}</i>)}
                  </span>
                  <small>{label[i]}</small>
                </div>
              ))}
            </div>
            <p className={s.clockFoot}>{c && !c.live && c.dow !== undefined ? "Tính theo giờ Việt Nam, 17:00 các ngày thứ Hai đến thứ Sáu." : "Ưu đãi áp dụng khi gọi tại quầy hoặc tại bàn."}</p>
          </div>
        </div>
        <ul className={s.offers}>
          {OFFERS.map((o) => (
            <li key={o.k} className={s.offer} data-tm="lit">
              <b className={s.offerV}>{o.k === "Cocktail cổ điển" ? <><Odometer value={110000} duration={1.4} />₫</> : o.v}</b>
              <span className={s.offerK}>{o.k}</span>
              <p>{o.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
