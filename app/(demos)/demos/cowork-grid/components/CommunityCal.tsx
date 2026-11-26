"use client";

import { useEffect, useMemo, useState } from "react";
import s from "../brand.module.css";
import { COMMUNITY } from "../data/content";
import { DAY_LABELS } from "../lib/seatmap";

type Cal = { y: number; m: number; today: number };

/** Ngày (1-31) rơi vào sự kiện nào trong tháng. dow: 0 = thứ hai. */
function eventsOn(y: number, m: number, d: number): string[] {
  const dow = (new Date(Date.UTC(y, m, d)).getUTCDay() + 6) % 7;
  const dim = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const out: string[] = [];
  if (dow === 3 && d <= 7) out.push("cafe");
  if (dow === 4 && d >= 8 && d <= 14) out.push("share");
  if (dow === 2) out.push("quiet");
  if (dow === 4 && d + 7 > dim) out.push("party");
  return out;
}

/**
 * Lịch cộng đồng: tự dựng tháng hiện tại (giờ Đà Nẵng), tô ô có sinh hoạt theo quy tắc lặp, hôm nay viền cam.
 * Bấm ô có sinh hoạt để xem chi tiết. Trước khi hydrate chỉ hiện danh sách quy tắc.
 */
export function CommunityCal() {
  const [cal, setCal] = useState<Cal | null>(null);
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => {
    const t = new Date(Date.now() + 7 * 3600 * 1000);
    setCal({ y: t.getUTCFullYear(), m: t.getUTCMonth(), today: t.getUTCDate() });
  }, []);

  const grid = useMemo(() => {
    if (!cal) return null;
    const first = (new Date(Date.UTC(cal.y, cal.m, 1)).getUTCDay() + 6) % 7;
    const dim = new Date(Date.UTC(cal.y, cal.m + 1, 0)).getUTCDate();
    const cells: (number | null)[] = Array(first).fill(null);
    for (let d = 1; d <= dim; d++) cells.push(d);
    while (cells.length % 7) cells.push(null);
    return cells;
  }, [cal]);

  const day = sel ?? null;
  const picked = cal && day ? eventsOn(cal.y, cal.m, day) : [];

  return (
    <div className={s.cal}>
      <div className={s.calMain}>
        <p className={s.calHead} translate="no">{cal ? `THÁNG ${String(cal.m + 1).padStart(2, "0")} / ${cal.y}` : "LỊCH THÁNG NÀY"}</p>
        <div className={s.calGrid} role="group" aria-label="Lịch sinh hoạt cộng đồng trong tháng">
          {DAY_LABELS.map((l) => <span key={l} className={s.calDow} aria-hidden="true">{l}</span>)}
          {grid?.map((d, i) => {
            if (d === null) return <span key={i} className={s.calCell} data-void="1" aria-hidden="true" />;
            const ev = eventsOn(cal!.y, cal!.m, d);
            const isToday = d === cal!.today;
            if (!ev.length) return <span key={i} className={s.calCell} data-today={isToday ? "1" : undefined}>{d}</span>;
            return (
              <button
                key={i} type="button" className={s.calCell} data-ev="1" data-today={isToday ? "1" : undefined} data-on={sel === d ? "1" : undefined}
                aria-pressed={sel === d} aria-label={`Ngày ${d}: ${ev.map((id) => COMMUNITY.events.find((e) => e.id === id)!.t).join(", ")}`}
                onClick={() => setSel((x) => (x === d ? null : d))}
              >
                {d}<i aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <div className={s.calDetail} aria-live="polite">
          {picked.length ? picked.map((id) => {
            const e = COMMUNITY.events.find((x) => x.id === id)!;
            return <p key={id}><b>{e.t}</b> · {e.time}<br />{e.d}</p>;
          }) : <p className={s.calHint}>Bấm vào ô có chấm cam để xem chi tiết buổi sinh hoạt.</p>}
        </div>
      </div>
      <ul className={s.calRules}>
        {COMMUNITY.events.map((e) => (
          <li key={e.id}>
            <span className={s.calRule}>{e.rule}</span>
            <b>{e.t}</b>
            <span className={s.calTime}>{e.time}</span>
            <p>{e.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
