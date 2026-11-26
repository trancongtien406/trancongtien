"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { HOURS, OPEN_RULE, SLOT_DAYS, SLOT_TIMES } from "../data/care";
import { OpenNow } from "./OpenNow";
import { WagButton } from "./WagButton";
import s from "../brand.module.css";

const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

/** Chọn khung giờ mong muốn: chỉ tạo tóm tắt trong trình duyệt, việc đặt lịch thật đi qua form tư vấn. */
export function Booking() {
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const dayObj = SLOT_DAYS.find((d) => d.id === day);
  const rule = day === null ? null : OPEN_RULE[day];
  const ok = useMemo(() => (t: string) => !rule || toMin(t) <= rule.last, [rule]);
  const pickDay = (id: number) => { setDay(id); setTime((t) => (t && OPEN_RULE[id] && toMin(t) > OPEN_RULE[id]!.last ? null : t)); };
  return (
    <section id="dat-lich" className={s.booking} aria-labelledby="book-h">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.chipWhite}>Lịch hẹn và giờ mở cửa</p>
          <h2 id="book-h" className={`${s.display} ${s.h2} ${s.onBlue}`}>Hẹn trước để bé có chỗ, không phải chờ lâu</h2>
          <p className={`${s.lead} ${s.onBlue}`}>Tiệm nhận bé theo khung giờ hẹn. Chọn ngày và giờ mong muốn, rồi gửi yêu cầu tư vấn để tiệm xác nhận lại với bạn.</p>
        </header>
        <div className={s.bookGrid}>
          <div className={s.hoursCard}>
            <div className={s.hoursHead}>
              <h3 className={`${s.display} ${s.h3}`}>Giờ mở cửa</h3>
              <div className={s.hoursPhoto}>
                <Image src="/images/demos/pet-vui/yorkie-khan-xanh-600.webp" alt="Chú Yorkshire ướt được quấn trong chiếc khăn xanh nhạt" fill sizes="96px" loading="lazy" style={{ objectFit: "cover", objectPosition: "50% 40%" }} />
              </div>
            </div>
            <OpenNow />
            <table className={s.hoursTable}>
              <caption className={s.srOnly}>Giờ mở cửa trong tuần</caption>
              <tbody>
                {HOURS.map((h) => (
                  <tr key={h.d} data-open={h.open ? "1" : "0"}><th scope="row">{h.d}</th><td>{h.t}</td></tr>
                ))}
              </tbody>
            </table>
            <p className={s.hoursNote}>Khung giờ vào tiệm cuối cùng là 16:30 (Chủ nhật là 15:00), để bé còn đủ thời gian làm xong trước giờ đóng cửa.</p>
          </div>
          <div className={s.slotCard}>
            <h3 className={`${s.display} ${s.h3}`}>Chọn khung giờ mong muốn</h3>
            <fieldset className={s.fs}>
              <legend className={s.slotLegend}>Ngày</legend>
              <div className={s.chipRow}>
                {SLOT_DAYS.map((d) => (
                  <label key={d.id} className={s.opt}>
                    <input type="radio" name="pv-slot-day" checked={day === d.id} onChange={() => pickDay(d.id)} />
                    <span className={s.optBody}>{d.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={s.fs}>
              <legend className={s.slotLegend}>Giờ vào tiệm</legend>
              <div className={s.chipRow}>
                {SLOT_TIMES.map((t) => (
                  <label key={t} className={s.opt}>
                    <input type="radio" name="pv-slot-time" checked={time === t} disabled={!ok(t)} onChange={() => setTime(t)} />
                    <span className={s.optBody}>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <p className={s.slotSum} role="status">
              {dayObj && time ? <>Khung giờ mong muốn: <b>{dayObj.label}, {time}</b>. Tiệm sẽ xác nhận lại khi bạn gửi yêu cầu.</> : "Chọn ngày và giờ để xem tóm tắt khung hẹn."}
            </p>
            <div className={s.planActions}>
              <WagButton href={buildConsultHref("pet-vui")} tone="red">Gửi yêu cầu đặt lịch</WagButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
