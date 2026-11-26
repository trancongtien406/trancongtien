"use client";

import { useEffect, useState } from "react";
import { OPEN_RULE } from "../data/care";
import s from "../brand.module.css";

type State = { kind: "open" | "closed" | "last"; text: string };

function vnNow() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Ho_Chi_Minh", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, mins: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}
const hm = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

export function computeOpen(day: number, mins: number): State {
  const r = OPEN_RULE[day];
  if (!r) return { kind: "closed", text: "Hôm nay tiệm nghỉ, mở lại Thứ Ba lúc 8:00" };
  if (mins < r.from) return { kind: "closed", text: `Chưa mở cửa, mở lúc ${hm(r.from)}` };
  if (mins >= r.to) return { kind: "closed", text: "Đã đóng cửa hôm nay" };
  if (mins > r.last) return { kind: "last", text: `Đang mở, đã nhận bé cuối cho hôm nay (đóng lúc ${hm(r.to)})` };
  return { kind: "open", text: `Đang mở cửa, nhận bé đến ${hm(r.last)}` };
}

/** Đèn "Đang mở cửa" tính theo giờ Đà Nẵng (UTC+7), cập nhật mỗi phút. SSR chỉ hiện giờ chung. */
export function OpenNow({ className }: { className?: string }) {
  const [st, setSt] = useState<State | null>(null);
  useEffect(() => {
    const tick = () => { const n = vnNow(); setSt(computeOpen(n.day, n.mins)); };
    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className={`${s.openNow} ${className ?? ""}`} data-fx="OpenNow" data-state={st?.kind ?? "idle"}>
      <i aria-hidden="true" />
      <span>{st ? st.text : "Mở 8:00 – 19:00, nghỉ Thứ Hai"}</span>
    </p>
  );
}
