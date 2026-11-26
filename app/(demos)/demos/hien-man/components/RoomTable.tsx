"use client";

import { useState } from "react";
import { ROOM_INFO } from "../data/content";
import { HOLIDAYS, SEASON_LABEL, SEASON_MULT, WEEKEND_MULT, formatVND, seasonOf } from "../lib/pricing";
import { ROOMS, getRoom, type RoomId } from "../lib/rooms";
import { formatVN } from "../lib/dates";
import { useStay } from "./Provider";
import styles from "../brand.module.css";

const round10k = (v: number) => Math.round(v / 10_000) * 10_000;
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/** Giá một đêm ngày thường theo mùa của từng loại phòng. */
function seasonPrices(room: RoomId) {
  const b = getRoom(room).basePrice;
  return {
    low: round10k(b * SEASON_MULT.low),
    shoulder: round10k(b * SEASON_MULT.shoulder),
    high: round10k(b * SEASON_MULT.high),
    holiday: round10k(b * SEASON_MULT.holiday),
  };
}

export function RoomTable() {
  const { room, setRoom } = useStay();
  const [month, setMonth] = useState<number | null>(null);
  const base = getRoom(room);
  const bars = MONTHS.map((m) => {
    const season = seasonOf(`2027-${String(m).padStart(2, "0")}-15`);
    const wk = round10k(base.basePrice * SEASON_MULT[season]);
    return { m, season, wk, we: round10k(base.basePrice * SEASON_MULT[season] * WEEKEND_MULT) };
  });
  const max = Math.max(...bars.map((b) => b.we));
  const sel = bars.find((b) => b.m === month) ?? null;
  const holidayMonths = new Map<number, string[]>();
  HOLIDAYS.forEach(([a, b, n]) => {
    const ms = new Set([Number(a.slice(5, 7)), Number(b.slice(5, 7))]);
    ms.forEach((m) => holidayMonths.set(m, [...(holidayMonths.get(m) ?? []), `${n}: ${formatVN(a)} đến ${formatVN(b)}`]));
  });

  return (
    <section className={styles.rt} id="bang-phong" aria-labelledby="rt-h">
      <div className={styles.rtHead} data-hm="rise">
        <p className={styles.eyebrow}>Bảng phòng và giá</p>
        <h2 id="rt-h" className={styles.h2}>Diện tích, giường, sức chứa và giá theo mùa.</h2>
        <p className={styles.lead}>Giá một phòng một đêm, ngày thường, chưa gồm phí dịch vụ 5% và phí vệ sinh. Đêm thứ sáu và thứ bảy cộng 18%. Giá tham khảo.</p>
      </div>
      <div className={styles.rtScroll} role="region" aria-label="Bảng phòng và giá theo mùa" tabIndex={0} data-hm="rise">
        <table className={styles.rtTable}>
          <thead>
            <tr>
              <th scope="col">Loại phòng</th><th scope="col">Diện tích</th><th scope="col">Giường</th><th scope="col">Sức chứa</th>
              <th scope="col" className={styles.num}>Mùa thấp</th><th scope="col" className={styles.num}>Mùa thường</th><th scope="col" className={styles.num}>Mùa cao</th><th scope="col" className={styles.num}>Lễ, Tết</th>
            </tr>
          </thead>
          <tbody>
            {ROOM_INFO.map((r) => {
              const p = seasonPrices(r.id);
              return (
                <tr key={r.id}>
                  <th scope="row"><b>{r.name}</b><small>{r.count}</small></th>
                  <td>{r.area}</td><td>{r.bed}</td><td>{r.cap}</td>
                  <td className={styles.num}>{formatVND(p.low)}</td><td className={styles.num}>{formatVND(p.shoulder)}</td><td className={styles.num}>{formatVND(p.high)}</td><td className={styles.num}>{formatVND(p.holiday)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.strip} data-hm="rise" data-testid="season-strip">
        <div className={styles.stripTop}>
          <h3 className={styles.h3}>Giá cả năm của một phòng</h3>
          <div className={styles.stripRooms} role="radiogroup" aria-label="Chọn loại phòng để xem giá theo tháng">
            {ROOMS.map((r) => (
              <label key={r.id} className={styles.stripRoom} data-on={room === r.id}>
                <input type="radio" name="strip-room" checked={room === r.id} onChange={() => setRoom(r.id)} />
                <span>{r.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className={styles.stripBars} role="group" aria-label={`Giá một đêm của ${base.name} theo tháng`}>
          {bars.map((b) => (
            <button
              key={b.m}
              type="button"
              className={styles.stripBar}
              data-season={b.season}
              aria-pressed={month === b.m}
              aria-label={`Tháng ${b.m}: ${SEASON_LABEL[b.season]}, ${formatVND(b.wk)} ngày thường, ${formatVND(b.we)} thứ sáu và thứ bảy`}
              onClick={() => setMonth(month === b.m ? null : b.m)}
            >
              <span className={styles.stripCol} style={{ transform: `scaleY(${b.wk / max})` }}>
                <i style={{ height: `${((b.we - b.wk) / b.wk) * 100}%` }} />
              </span>
              <span className={styles.stripM}>T{b.m}</span>
              {holidayMonths.has(b.m) ? <em className={styles.stripHol} aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
        <p className={styles.stripNote} role="status" aria-live="polite">
          {sel ? (
            <>
              <b>Tháng {sel.m}, {SEASON_LABEL[sel.season].toLowerCase()}:</b> {formatVND(sel.wk)} đêm thường, {formatVND(sel.we)} đêm thứ sáu và thứ bảy.
              {holidayMonths.has(sel.m) ? ` Có dịp lễ: ${holidayMonths.get(sel.m)!.join("; ")}.` : ""}
            </>
          ) : (
            "Bấm vào một tháng để xem giá. Phần màu sáng trên mỗi cột là mức cộng thêm cho đêm thứ sáu và thứ bảy; dấu thoi là tháng có dịp lễ, Tết."
          )}
        </p>
      </div>
    </section>
  );
}
