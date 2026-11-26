"use client";

import { useEffect, useId, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { HOURS } from "../data/restaurant";
import s from "../brand.module.css";

const SLOTS = ["11:00", "11:30", "12:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"] as const;
const WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const AREAS = [
  { id: "sanh", name: "Sảnh biển", desc: "Nhìn ra mặt nước, 2 đến 8 khách", min: 1, max: 8 },
  { id: "san-vuon", name: "Sân vườn", desc: "Gió thoáng, hợp nhóm gia đình, 2 đến 10 khách", min: 1, max: 10 },
  { id: "bep-lua", name: "Quầy bếp lửa", desc: "Ngồi sát bếp than, 1 đến 4 khách", min: 1, max: 4 },
  { id: "rieng", name: "Phòng riêng", desc: "Bàn tròn xoay, 6 đến 12 khách", min: 6, max: 12 },
] as const;

type Day = { key: string; d: Date; full: boolean };

// Lịch "kín" cố định theo ngày trong tháng.
const dayFull = (d: Date) => d.getDate() % 5 === 0;
const slotFull = (d: Date, i: number) => (d.getDate() * 3 + i * 7) % 6 === 0;
const fmt = (d: Date) => `${WD[d.getDay()]}, ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;

export function Reservation() {
  const uid = useId();
  const [days, setDays] = useState<Day[] | null>(null);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [guests, setGuests] = useState(4);
  const [area, setArea] = useState<string>("sanh");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const out: Day[] = [];
    const base = new Date();
    base.setHours(12, 0, 0, 0);
    for (let i = 1; i <= 10; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      out.push({ key: d.toISOString().slice(0, 10), d, full: dayFull(d) });
    }
    setDays(out);
  }, []);

  const day = days?.find((x) => x.key === dayKey) ?? null;
  const areaObj = AREAS.find((a) => a.id === area)!;
  const areaOk = guests >= areaObj.min && guests <= areaObj.max;
  const areaErr = !areaOk
    ? guests < areaObj.min
      ? `${areaObj.name} dành cho từ ${areaObj.min} khách. Hãy chọn khu vực khác hoặc tăng số khách.`
      : `${areaObj.name} nhận tối đa ${areaObj.max} khách. Hãy chọn khu vực rộng hơn.`
    : "";
  const ready = !!day && !!slot && areaOk;

  const text = ready ? `Yêu cầu đặt bàn: ${fmt(day!.d)} lúc ${slot}, ${guests} khách, khu ${areaObj.name}. Phiếu này chưa phải xác nhận giữ bàn.` : "";

  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied("Đã sao chép nội dung phiếu."); } catch { setCopied("Trình duyệt không cho sao chép tự động. Hãy chọn và sao chép thủ công."); }
  };

  return (
    <section id="dat-ban" className={`${s.section} ${s.reserve} ${s.noPrint}`} aria-labelledby="res-h">
      <div className={s.wrap}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Đặt bàn</span>
          <h2 id="res-h" className={`${s.display} ${s.h2}`}>Đặt bàn và tiệc đoàn, <span className={s.italic}>chọn giờ trước</span></h2>
          <p className={s.lead}>Chọn ngày, giờ, số khách và khu vực để có phiếu tóm tắt yêu cầu. Phiếu này chưa giữ bàn và trang không gửi thông tin đi đâu. Nhóm từ 10 khách dùng phòng riêng, cần chốt thực đơn và đặt cọc (xem chính sách bên dưới).</p>
        </div>
        <dl className={s.hours} data-bv="reveal">
          {HOURS.map((h) => (<div key={h.d}><dt>{h.d}</dt><dd>{h.t}</dd></div>))}
        </dl>
        <div className={s.resGrid}>
          <div className={s.panel} data-bv="reveal">
            <div className={s.fld}>
              <span id={`${uid}-d`} style={{ display: "block", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bv-gold)", marginBottom: 12 }}>Ngày (10 ngày tới)</span>
              {days ? (
                <div className={s.days} role="group" aria-labelledby={`${uid}-d`}>
                  {days.map((x) => (
                    <button key={x.key} type="button" className={s.day} aria-pressed={dayKey === x.key} disabled={x.full} aria-label={`${fmt(x.d)}${x.full ? ", đã kín chỗ" : ""}`} onClick={() => { setDayKey(x.key); setSlot(null); setCopied(""); }} data-testid={x.full ? "day-full" : "day"}>
                      <small>{WD[x.d.getDay()]}</small><b>{x.d.getDate()}</b>{x.full && <span className={s.full}>Kín</span>}
                    </button>
                  ))}
                </div>
              ) : <p className={s.hint}>Đang tải lịch…</p>}
            </div>

            <div className={s.fld}>
              <span id={`${uid}-s`} style={{ display: "block", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bv-gold)", marginBottom: 12 }}>Giờ</span>
              {day ? (
                <div className={s.slots} role="group" aria-labelledby={`${uid}-s`}>
                  {SLOTS.map((t, i) => {
                    const full = slotFull(day.d, i);
                    return <button key={t} type="button" className={s.slot} aria-pressed={slot === t} disabled={full} aria-label={`${t}${full ? ", đã kín chỗ" : ""}`} onClick={() => { setSlot(t); setCopied(""); }} data-testid={full ? "slot-full" : "slot"}>{t}</button>;
                  })}
                </div>
              ) : <p className={s.hint}>Chọn một ngày để xem các khung giờ còn chỗ.</p>}
            </div>

            <div className={s.fld}>
              <span id={`${uid}-n`} style={{ display: "block", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bv-gold)", marginBottom: 12 }}>Số khách</span>
              <div className={s.stepper} role="group" aria-labelledby={`${uid}-n`}>
                <button type="button" aria-label="Giảm một khách" disabled={guests <= 1} onClick={() => setGuests((g) => Math.max(1, g - 1))}>−</button>
                <output aria-live="polite" data-testid="res-guests">{guests} khách</output>
                <button type="button" aria-label="Tăng một khách" disabled={guests >= 12} onClick={() => setGuests((g) => Math.min(12, g + 1))}>+</button>
              </div>
            </div>

            <div className={s.fld} style={{ marginBottom: 0 }}>
              <span id={`${uid}-a`} style={{ display: "block", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bv-gold)", marginBottom: 12 }}>Khu vực</span>
              <div className={s.areas} role="group" aria-labelledby={`${uid}-a`}>
                {AREAS.map((a) => (
                  <button key={a.id} type="button" className={s.area} aria-pressed={area === a.id} aria-describedby={area === a.id && areaErr ? `${uid}-err` : undefined} onClick={() => { setArea(a.id); setCopied(""); }}>
                    <b>{a.name}</b><span>{a.desc}</span>
                  </button>
                ))}
              </div>
              {areaErr && <p className={s.fieldErr} id={`${uid}-err`} role="alert" data-testid="area-error">{areaErr}</p>}
            </div>
          </div>

          <aside className={s.ticket} aria-labelledby={`${uid}-tk`} data-bv="reveal" data-testid="ticket">
            <h3 id={`${uid}-tk`}>Phiếu yêu cầu đặt bàn</h3>
            {ready ? (
              <>
                <dl className={s.kv}>
                  <dt>Ngày</dt><dd data-testid="t-date">{fmt(day!.d)}</dd>
                  <dt>Giờ</dt><dd data-testid="t-time">{slot}</dd>
                  <dt>Khách</dt><dd>{guests} người</dd>
                  <dt>Khu vực</dt><dd>{areaObj.name}</dd>
                </dl>
                <span className={s.stamp}>Xem trước · chưa giữ bàn</span>
                <p className={s.ok}>Bàn chỉ được giữ khi nhà hàng xác nhận. Trang này không gửi thông tin đi đâu.</p>
                <div className={s.sheetActions}>
                  <a className={`${s.btn} ${s.btnInk}`} href={buildConsultHref("ben-vi")} data-testid="cta-consult">Chuyển sang form liên hệ</a>
                  <button type="button" className={`${s.btn} ${s.btnInkLine}`} onClick={copy}>Sao chép nội dung</button>
                </div>
                <p className={s.saved} role="status">{copied}</p>
              </>
            ) : (
              <div className={s.empty} role="status" data-testid="ticket-empty">
                <b>Chưa đủ thông tin</b>
                {!day ? "Chọn một ngày còn chỗ." : !slot ? "Chọn một khung giờ còn chỗ." : "Chọn khu vực phù hợp với số khách."}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
