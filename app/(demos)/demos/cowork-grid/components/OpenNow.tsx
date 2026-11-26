"use client";

import { useEffect, useState } from "react";
import s from "../brand.module.css";
import { HOURS } from "../data/content";
import { vnNow } from "../lib/seatmap";

const pad = (n: number) => String(n).padStart(2, "0");

type Slot = { open: number; close: number } | null;
const slotOf = (day: number): Slot => {
  const h = HOURS.find((x) => x.days.includes(day));
  return h ? { open: h.open, close: h.close } : null;
};

/** Trạng thái mở/đóng cửa theo giờ Đà Nẵng, tính từ bảng giờ. Trước khi hydrate chỉ hiện nhãn trung tính. */
export function openState(now: { day: number; hour: number; minute: number }) {
  const t = now.hour + now.minute / 60;
  const sl = slotOf(now.day);
  if (sl && t >= sl.open && t < sl.close) return { open: true, text: `Đang mở cửa, đóng lúc ${pad(sl.close)}:00` };
  if (sl && t < sl.open) return { open: false, text: `Chưa mở cửa, mở lúc ${pad(sl.open)}:00 hôm nay` };
  const next = slotOf((now.day + 1) % 7);
  return { open: false, text: next ? `Đã đóng cửa, mở lại ${pad(next.open)}:00 ngày mai` : "Đã đóng cửa" };
}

export function OpenBadge({ className }: { className?: string }) {
  const [st, setSt] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    const f = () => setSt(openState(vnNow()));
    f();
    const id = window.setInterval(f, 30000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className={`${s.openBadge} ${className ?? ""}`} data-open={st ? (st.open ? "1" : "0") : undefined} role="status">
      <i aria-hidden="true" />
      {st ? st.text : "Giờ mở cửa: xem bảng bên dưới"}
    </span>
  );
}

/** Bảng giờ mở cửa; dòng của hôm nay được tô và hiện nhãn "HÔM NAY". */
export function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => { setToday(vnNow().day); }, []);
  return (
    <table className={`${s.tbl} ${s.hoursTbl}`}>
      <caption>Giờ mở cửa</caption>
      <thead><tr><th scope="col">Ngày</th><th scope="col">Giờ</th><th scope="col">Dành cho</th></tr></thead>
      <tbody>
        {HOURS.map((h) => (
          <tr key={h.label} data-today={today !== null && h.days.includes(today) ? "1" : undefined}>
            <th scope="row">{h.label}{today !== null && h.days.includes(today) && <em> · HÔM NAY</em>}</th>
            <td>{pad(h.open)}:00 – {pad(h.close)}:00</td>
            <td>{h.who}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
