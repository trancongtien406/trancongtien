"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton, SplitWords } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { MAX_GUESTS, TIMES, ZONES, formatDate, summaryLines, todayISO, validateReserve, type ReserveErrors, type ZoneId } from "../lib/reserve";

export function Reserve() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [zone, setZone] = useState<ZoneId | "">("");
  const [drink, setDrink] = useState("");
  const [errors, setErrors] = useState<ReserveErrors>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState<"ok" | "fail" | null>(null);
  const [today, setToday] = useState("");
  const head = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(todayISO());
    const on = (e: Event) => setDrink(String((e as CustomEvent).detail ?? ""));
    window.addEventListener("tm:pick", on);
    return () => window.removeEventListener("tm:pick", on);
  }, []);

  const input = { date, time, guests, zone, drink };
  const touch = () => { setDone(false); setCopied(null); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er = validateReserve(input, today || todayISO());
    setErrors(er);
    if (Object.keys(er).length) { setDone(false); return; }
    setDone(true);
    requestAnimationFrame(() => head.current?.focus());
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(["Tầng Mây · yêu cầu đặt bàn", ...summaryLines(input)].join("\n"));
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  };
  const zoneName = ZONES.find((z) => z.id === zone)?.name;

  return (
    <section className={s.reserve} id="dat-ban" aria-label="Tóm tắt đặt bàn">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Giữ chỗ</p>
          <SplitWords as="h2" className={s.h2} trigger="view">Giữ một chỗ trên Tầng Mây</SplitWords>
          <p className={s.mutedP}>Chọn ngày, giờ, số khách và khu vực. Bản tóm tắt giúp bạn gửi yêu cầu rõ ràng; bên mình sẽ phản hồi về khả năng sắp xếp.</p>
        </header>
        <div className={s.resGrid}>
          <form className={s.resForm} onSubmit={submit} noValidate>
            <div className={s.rowTwo}>
              <div className={s.fld}>
                <label htmlFor="tm-date">Ngày ghé</label>
                <input id="tm-date" type="date" min={today || undefined} value={date} aria-invalid={errors.date ? true : undefined} aria-describedby={errors.date ? "tm-date-e" : undefined} onChange={(e) => { setDate(e.target.value); touch(); }} />
                {errors.date ? <p id="tm-date-e" className={s.err}>{errors.date}</p> : null}
              </div>
              <div className={s.fld}>
                <label htmlFor="tm-time">Giờ mong muốn</label>
                <select id="tm-time" value={time} aria-invalid={errors.time ? true : undefined} aria-describedby={errors.time ? "tm-time-e" : undefined} onChange={(e) => { setTime(e.target.value); touch(); }}>
                  <option value="">Chọn giờ</option>
                  {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time ? <p id="tm-time-e" className={s.err}>{errors.time}</p> : null}
              </div>
            </div>
            <div className={s.fld}>
              <span className={s.lbl} id="tm-guest-l">Số khách</span>
              <div className={s.stepper} role="group" aria-labelledby="tm-guest-l">
                <button type="button" aria-label="Giảm số khách" disabled={guests <= 1} onClick={() => { setGuests((g) => Math.max(1, g - 1)); touch(); }}>−</button>
                <output aria-live="polite"><b>{guests}</b> khách</output>
                <button type="button" aria-label="Tăng số khách" disabled={guests >= MAX_GUESTS} onClick={() => { setGuests((g) => Math.min(MAX_GUESTS, g + 1)); touch(); }}>+</button>
              </div>
              {guests >= 9 ? <p className={s.hint}>Nhóm từ 9 khách: bên mình sẽ trao đổi riêng về cách sắp xếp chỗ.</p> : null}
            </div>
            <fieldset className={s.fld} aria-invalid={errors.zone ? true : undefined} aria-describedby={errors.zone ? "tm-zone-e" : undefined}>
              <legend className={s.lbl}>Khu vực</legend>
              <div className={s.zonePick}>
                {ZONES.map((z) => (
                  <label key={z.id} className={s.zoneOpt}>
                    <input type="radio" name="tm-zone" value={z.id} checked={zone === z.id} onChange={() => { setZone(z.id); touch(); }} />
                    <span><b>{z.name}</b><small>{z.note}</small></span>
                  </label>
                ))}
              </div>
              {errors.zone ? <p id="tm-zone-e" className={s.err}>{errors.zone}</p> : null}
            </fieldset>
            {drink ? (
              <p className={s.drinkNote}>Ly muốn thử: <b>{drink}</b> <button type="button" className={s.linkBtn} onClick={() => { setDrink(""); touch(); }}>Bỏ</button></p>
            ) : null}
            <MagneticButton>
              <button type="submit" className={`${s.btn} ${s.btnPink}`}>Xem tóm tắt đặt bàn</button>
            </MagneticButton>
          </form>
          <div className={s.ticketCol} aria-live="polite">
            {done ? (
              <div className={s.ticket}>
                <h3 ref={head} tabIndex={-1} className={s.ticketHead}>Yêu cầu của bạn</h3>
                <dl className={s.ticketList}>
                  <div><dt>Ngày</dt><dd>{formatDate(date)}</dd></div>
                  <div><dt>Giờ</dt><dd>{time}</dd></div>
                  <div><dt>Số khách</dt><dd>{guests}</dd></div>
                  <div><dt>Khu vực</dt><dd>{zoneName}</dd></div>
                  {drink ? <div><dt>Muốn thử</dt><dd>{drink}</dd></div> : null}
                </dl>
                <p className={s.ticketNote}>Đây là bản tóm tắt để gửi kèm yêu cầu, chưa phải xác nhận giữ chỗ. Chỗ ngồi được xác nhận sau khi bên mình phản hồi.</p>
                <div className={s.ticketBtns}>
                  <a className={`${s.btn} ${s.btnCyan}`} href={buildConsultHref("bar-mai-thuong")}>Gửi yêu cầu đặt bàn</a>
                  <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={copy}>Sao chép tóm tắt</button>
                </div>
                <p className={s.hint} role="status">{copied === "ok" ? "Đã sao chép tóm tắt." : copied === "fail" ? "Không sao chép được, bạn có thể chọn và chép thủ công." : " "}</p>
              </div>
            ) : (
              <div className={`${s.ticket} ${s.ticketEmpty}`}>
                <p>Điền ngày, giờ và khu vực rồi bấm “Xem tóm tắt đặt bàn”. Tấm vé tóm tắt sẽ hiện ở đây.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
