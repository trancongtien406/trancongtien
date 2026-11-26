"use client";

import { useEffect, useState } from "react";
import styles from "../brand.module.css";
import { DAY_NAME, HOURS, ZONES, fmtHM } from "../data/shop";

const vnNow = () => {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Ho_Chi_Minh", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"));
  return { day, min: (Number(g("hour")) % 24) * 60 + Number(g("minute")) };
};
const slotFor = (day: number) => HOURS.find((h) => h.days.includes(day))!;

/** Quán và giờ mở cửa: trạng thái đang mở/đã đóng tính theo giờ Việt Nam, dòng hôm nay được tô; sơ đồ quán có vùng đọc được bằng hover và bàn phím. */
export function Space() {
  const [now, setNow] = useState<{ day: number; min: number } | null>(null);
  const [zone, setZone] = useState<string>("bar");
  useEffect(() => {
    setNow(vnNow());
    const id = window.setInterval(() => { if (!document.hidden) setNow(vnNow()); }, 30000);
    return () => window.clearInterval(id);
  }, []);
  let status = "";
  let open = false;
  if (now) {
    const s = slotFor(now.day);
    open = now.min >= s.open && now.min < s.close;
    if (open) {
      const left = s.close - now.min;
      status = `Đang mở · đóng cửa lúc ${fmtHM(s.close)}${left <= 90 ? ` (còn ${Math.floor(left / 60) ? `${Math.floor(left / 60)} giờ ` : ""}${left % 60} phút)` : ""}`;
    } else if (now.min < s.open) {
      status = `Chưa mở · mở cửa lúc ${fmtHM(s.open)} hôm nay`;
    } else {
      const nx = slotFor((now.day + 1) % 7);
      status = `Đã đóng · mở lại lúc ${fmtHM(nx.open)} ngày mai`;
    }
  }
  const z = ZONES.find((x) => x.id === zone)!;
  return (
    <section id="quan" className={`${styles.section} ${styles.spaceSection}`} aria-labelledby="rn-space-h">
      <div className={styles.wrap}>
        <div className={styles.sectionHead} data-rn-reveal>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>07 / QUÁN VÀ GIỜ MỞ CỬA</span>
            <h2 id="rn-space-h" className={`${styles.display} ${styles.h2}`}>Ghé quán.</h2>
          </div>
          <div><p className={styles.lead}>Quán ở Quận Sơn Trà, Đà Nẵng: một quầy bar, một góc rang, bàn dài và dãy ghế cửa sổ. Chạm vào sơ đồ để xem từng khu.</p></div>
        </div>
        <div className={styles.spaceGrid}>
          <figure className={styles.plan}>
            <svg viewBox="0 0 600 340" role="group" aria-label="Sơ đồ mặt bằng quán, gồm năm khu">
              <rect x="10" y="10" width="580" height="320" className={styles.planWall} />
              {ZONES.map((it) => (
                <g key={it.id} role="button" tabIndex={0} aria-pressed={zone === it.id} aria-label={`${it.name}: ${it.desc}`} data-zone={it.id} data-on={zone === it.id ? "1" : "0"}
                  onClick={() => setZone(it.id)} onFocus={() => setZone(it.id)} onMouseEnter={() => setZone(it.id)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setZone(it.id); } }}>
                  <rect x={it.x} y={it.y} width={it.w} height={it.h} className={styles.planZone} />
                  <text x={it.x + 14} y={it.y + 28} className={styles.planText}>{it.name}</text>
                </g>
              ))}
              <path d="M356 330v-14M396 330v-14" className={styles.planDoor} />
              <text x="376" y="308" textAnchor="middle" className={styles.planDoorText}>Cửa vào</text>
            </svg>
            <figcaption className={styles.planCap} aria-live="polite" data-testid="plan-caption"><b>{z.name}.</b> {z.desc}</figcaption>
          </figure>
          <div className={styles.hoursBox}>
            <p className={`${styles.openBadge} ${open ? styles.openOn : ""}`} role="status" data-testid="open-status" data-open={now ? (open ? "1" : "0") : ""}>{now ? status : "Giờ mở cửa"}</p>
            <table className={styles.hoursTable}>
              <caption className={styles.srOnly}>Giờ mở cửa theo ngày</caption>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                  const s = slotFor(d);
                  return <tr key={d} data-today={now?.day === d ? "1" : "0"}><th scope="row">{DAY_NAME[d]}</th><td>{fmtHM(s.open)} – {fmtHM(s.close)}</td></tr>;
                })}
              </tbody>
            </table>
            <p className={styles.helper}>Quận Sơn Trà, Đà Nẵng · 0236 000 0000. Giờ tính theo giờ Việt Nam.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
