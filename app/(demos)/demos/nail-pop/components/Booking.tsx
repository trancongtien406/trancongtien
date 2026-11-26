"use client";

import { useMemo, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { BOOK_DAYS, BUSY, CLOSE_MIN, OPEN_MIN, SERVICES, SLOT_MIN, STUDIO } from "../data/content";
import s from "../brand.module.css";

const SLOTS = Array.from({ length: (CLOSE_MIN - OPEN_MIN) / SLOT_MIN }, (_, i) => OPEN_MIN + i * SLOT_MIN);
const hhmm = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

/**
 * Chọn khung giờ: dịch vụ quyết định cần mấy ô 30 phút liền nhau; ô nào đủ chỗ trống mới bấm được,
 * khối giờ sẽ tô màu theo màu đang chọn. Không gửi gì đi: kết quả chỉ là bản tóm tắt dẫn sang form tư vấn.
 */
export function Booking() {
  const [sid, setSid] = useState<string>(SERVICES[0].id);
  const [day, setDay] = useState(5);
  const [start, setStart] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [copied, setCopied] = useState("");
  const sv = SERVICES.find((x) => x.id === sid)!;
  const need = Math.ceil(sv.mins / SLOT_MIN);
  const busy = useMemo(() => new Set(BUSY[day]), [day]);
  const fits = (i: number) => i + need <= SLOTS.length && Array.from({ length: need }, (_, k) => !busy.has(i + k)).every(Boolean);
  const block = (i: number | null) => (i === null ? new Set<number>() : new Set(Array.from({ length: need }, (_, k) => i + k)));
  const shown = block(hover ?? start);
  const deposit = sid === "nail-art" || sid === "dap-gel";
  const free = SLOTS.filter((_, i) => fits(i)).length;

  const pickDay = (d: number) => { setDay(d); setStart(null); setHover(null); setCopied(""); };
  const pickService = (id: string) => { setSid(id); setStart(null); setHover(null); setCopied(""); };
  const end = start === null ? 0 : SLOTS[start] + need * SLOT_MIN;
  const summary = start === null ? "" : `Đặt lịch tại Chấm Chanh · ${BOOK_DAYS[day]}, ${hhmm(SLOTS[start])} – ${hhmm(end)} · ${sv.name} (${sv.time})${deposit ? ` · đặt cọc ${STUDIO.deposit}` : " · không cần đặt cọc"}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied("Đã sao chép tóm tắt."); }
    catch { setCopied("Chưa sao chép được, bạn hãy bôi đen đoạn trên và chép thủ công."); }
  };

  return (
    <section className={`${s.section} ${s.booking}`} id="dat-lich" aria-labelledby="np-bk">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.kicker}>Đặt lịch</p>
          <h2 id="np-bk" className={s.h2}>Chọn dịch vụ, chọn ngày, chọn giờ trống.</h2>
          <p className={s.lead}>Mỗi dịch vụ cần một khoảng giờ liền nhau, chỉ những giờ đủ chỗ mới bấm được. Tiệm mở {STUDIO.hours}. Bước cuối là gửi yêu cầu qua form tư vấn; tiệm xác nhận lại lịch.</p>
        </header>

        <div className={s.bkGrid} data-fx="SlotPicker" data-fx-ready="1">
          <div className={s.bkLeft}>
            <fieldset className={s.fs}>
              <legend>1. Dịch vụ</legend>
              <div className={s.pills}>
                {SERVICES.map((x) => (
                  <label key={x.id} className={s.pill} data-on={sid === x.id ? "1" : "0"}>
                    <input type="radio" name="bk-sv" checked={sid === x.id} onChange={() => pickService(x.id)} />
                    {x.name}
                  </label>
                ))}
              </div>
              <p className={s.hint}>Thời gian dự kiến {sv.time}, giữ chỗ {need * SLOT_MIN} phút. Giá tham khảo {sv.price}.</p>
            </fieldset>
            <fieldset className={s.fs}>
              <legend>2. Ngày trong tuần</legend>
              <div className={s.pills}>
                {BOOK_DAYS.map((d, i) => (
                  <label key={d} className={s.pill} data-on={day === i ? "1" : "0"}>
                    <input type="radio" name="bk-day" checked={day === i} onChange={() => pickDay(i)} />
                    {d}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className={s.bkRight}>
            <fieldset className={s.fs}>
              <legend>3. Giờ bắt đầu</legend>
              <p className={s.count} role="status">{free ? `${BOOK_DAYS[day]} còn ${free} giờ bắt đầu phù hợp.` : `${BOOK_DAYS[day]} không còn khung đủ ${need * SLOT_MIN} phút, hãy thử ngày khác.`}</p>
              <div className={s.slotGrid} onMouseLeave={() => setHover(null)}>
                {SLOTS.map((m, i) => {
                  const ok = fits(i);
                  const inBlock = shown.has(i);
                  return (
                    <button
                      key={m} type="button" className={s.slot2} data-busy={busy.has(i) ? "1" : "0"} data-ok={ok ? "1" : "0"} data-in={inBlock ? "1" : "0"} data-start={start === i ? "1" : "0"}
                      disabled={!ok} aria-pressed={start === i}
                      aria-label={`${hhmm(m)}${busy.has(i) ? ", đã có khách" : ok ? "" : ", không đủ thời gian liền"}`}
                      onMouseEnter={() => ok && setHover(i)} onFocus={() => ok && setHover(i)} onBlur={() => setHover(null)}
                      onClick={() => { setStart(i); setCopied(""); }}
                    >{hhmm(m)}</button>
                  );
                })}
              </div>
              <ul className={s.slotKey} aria-hidden="true">
                <li><i data-k="free" /> Còn trống</li><li><i data-k="pick" /> Giờ bạn chọn</li><li><i data-k="busy" /> Đã có khách</li>
              </ul>
            </fieldset>

            <div className={s.bkSum} aria-live="polite">
              {start === null ? <p>Chọn một giờ bắt đầu để xem tóm tắt lịch hẹn.</p> : (
                <>
                  <h3 className={s.h3}>{BOOK_DAYS[day]}, {hhmm(SLOTS[start])} – {hhmm(end)}</h3>
                  <p className={s.summaryTxt}>{summary}</p>
                  <p className={s.hint}>{deposit ? `Dịch vụ này cần đặt cọc ${STUDIO.deposit}, trừ vào tổng khi thanh toán.` : "Dịch vụ này không cần đặt cọc."} Tiệm xác nhận lại giờ khi nhận yêu cầu.</p>
                  <div className={s.planActions}>
                    <a className={`${s.btn} ${s.btnPink}`} href={buildConsultHref("nail-pop")} data-cursor="Gửi">Gửi yêu cầu đặt lịch →</a>
                    <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={copy}>Sao chép tóm tắt</button>
                  </div>
                  <p className={s.status} role="status">{copied}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
