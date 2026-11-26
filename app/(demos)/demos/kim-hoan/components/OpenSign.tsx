"use client";

import { useEffect, useState } from "react";
import { HOURS } from "../data/content";
import styles from "../brand.module.css";

type Now = { day: number; min: number };

function vnNow(): Now {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Ho_Chi_Minh", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, min: Number(get("hour")) * 60 + Number(get("minute")) };
}
const toMin = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};

/** Bảng đèn cửa tiệm: đèn vàng bật khi đang mở cửa (giờ Việt Nam), hàng của hôm nay được tô sáng. */
export function OpenSign() {
  const [now, setNow] = useState<Now | null>(null);
  useEffect(() => {
    const t = () => setNow(vnNow());
    t();
    const id = window.setInterval(t, 30000);
    return () => window.clearInterval(id);
  }, []);
  const today = now ? HOURS.find((h) => h.d === now.day) : undefined;
  const open = !!(now && today && now.min >= toMin(today.open) && now.min < toMin(today.close));
  let msg = "Đang tải giờ mở cửa";
  if (now && today) {
    if (open) {
      const left = toMin(today.close) - now.min;
      msg = left <= 60 ? `Còn ${left} phút nữa đóng cửa` : `Đóng cửa lúc ${today.close}`;
    } else if (now.min < toMin(today.open)) msg = `Mở cửa lúc ${today.open} hôm nay`;
    else {
      const next = HOURS.find((h) => h.d === (now.day + 1) % 7)!;
      msg = `Mở lại lúc ${next.open} ngày mai`;
    }
  }
  return (
    <div className={styles.hours} data-testid="hours">
      <div className={styles.sign} data-open={now ? (open ? "1" : "0") : "x"} role="status">
        <span className={styles.signBulb} aria-hidden="true" />
        <div>
          <p className={styles.signMain}>{!now ? "Giờ mở cửa" : open ? "Đang mở cửa" : "Đã đóng cửa"}</p>
          <p className={styles.signSub}>{msg}</p>
        </div>
      </div>
      <table className={styles.hoursTable}>
        <caption className={styles.srOnly}>Giờ mở cửa theo ngày</caption>
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
  );
}
