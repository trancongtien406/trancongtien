"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DOCTORS, SERVICES, WEEKDAY_LONG, WEEKDAY_VI, addDays, eligibleDoctors, fmtDate, fmtTime, nowHCM, slotsForDay, weekday, type DoctorId } from "../data/schedule";
import { priceForService } from "../data/pricing";
import styles from "../brand.module.css";

const STATUS_TXT = { ok: "Có lịch", full: "Hết lịch", off: "Không làm việc", none: "" } as const;

export function Scheduler({ consultHref }: { consultHref: string }) {
  const [today, setToday] = useState<{ dateISO: string; minutes: number } | null>(null);
  const [serviceId, setServiceId] = useState("");
  const [doctorId, setDoctorId] = useState<DoctorId>("any");
  const [dateISO, setDateISO] = useState("");
  const [slot, setSlot] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [previewed, setPreviewed] = useState(false);
  const [error, setError] = useState("");
  const previewRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { setToday(nowHCM()); }, []);
  useEffect(() => {
    const onPre = (e: Event) => {
      const d = (e as CustomEvent<{ serviceId?: string; doctorId?: string }>).detail;
      if (d?.serviceId && SERVICES.some((s) => s.id === d.serviceId)) {
        setServiceId(d.serviceId);
        const ok = d.doctorId && eligibleDoctors(d.serviceId).some((x) => x.id === d.doctorId);
        setDoctorId(ok ? (d.doctorId as DoctorId) : "any");
        setSlot(null); setPreviewed(false); setError("");
      }
    };
    window.addEventListener("mc:scheduler", onPre);
    return () => window.removeEventListener("mc:scheduler", onPre);
  }, []);

  const days = useMemo(() => (today ? Array.from({ length: 14 }, (_, i) => addDays(today.dateISO, i)) : []), [today]);
  const earliest = (d: string) => (today && d === today.dateISO ? today.minutes + 60 : 0);
  const svc = SERVICES.find((s) => s.id === serviceId) ?? null;
  const docs = svc ? eligibleDoctors(svc.id) : [];

  const dayInfo = useMemo(() => {
    const m: Record<string, "ok" | "full" | "off" | "none"> = {};
    for (const d of days) m[d] = svc ? slotsForDay(svc.id, d, doctorId, earliest(d)).status : "none";
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, svc, doctorId, today]);

  const dayRes = svc && dateISO ? slotsForDay(svc.id, dateISO, doctorId, earliest(dateISO)) : null;
  const chosen = dayRes?.slots.find((s) => s.slot.start === slot) ?? null;
  const chosenDoctorId = chosen ? (doctorId === "any" ? chosen.doctors[0] : doctorId) : null;
  const chosenDoctor = DOCTORS.find((d) => d.id === chosenDoctorId) ?? null;

  const pickService = (id: string) => {
    setServiceId(id); setSlot(null); setPreviewed(false); setError("");
    if (doctorId !== "any" && !eligibleDoctors(id).some((d) => d.id === doctorId)) setDoctorId("any");
  };
  const pickDoctor = (id: DoctorId) => { setDoctorId(id); setSlot(null); setPreviewed(false); setError(""); };
  const pickDate = (d: string) => { setDateISO(d); setSlot(null); setPreviewed(false); setError(""); };
  const pickSlot = (s: number) => { setSlot(s); setPreviewed(false); setError(""); };
  const reset = () => { setServiceId(""); setDoctorId("any"); setDateISO(""); setSlot(null); setPreviewed(false); setError(""); setPage(0); };

  const preview = () => {
    if (!svc) return setError("Hãy chọn một nhu cầu chăm sóc để xem lịch hẹn.");
    if (!dateISO || slot === null) return setError("Hãy hoàn thành các lựa chọn trước khi xem tóm tắt lịch hẹn.");
    if (!chosen || !chosenDoctor) return setError("Khung giờ không còn phù hợp với lựa chọn hiện tại. Vui lòng chọn lại.");
    setError(""); setPreviewed(true);
    requestAnimationFrame(() => previewRef.current?.focus());
  };

  const price = svc ? priceForService(svc.id) : null;
  const safetyNote = svc && (svc.id === "pain" || svc.id === "extraction");
  const visibleDays = days.slice(page * 7, page * 7 + 7);

  return (
    <div className={styles.schedGrid}>
      <div className={styles.schedForm} data-mc="sched-form">
        <div className={styles.field}>
          <label htmlFor="mc-service">Dịch vụ</label>
          <select id="mc-service" value={serviceId} onChange={(e) => pickService(e.target.value)}>
            <option value="">Chọn dịch vụ</option>
            {SERVICES.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="mc-doctor">Bác sĩ</label>
          <select id="mc-doctor" value={doctorId} disabled={!svc} onChange={(e) => pickDoctor(e.target.value as DoctorId)}>
            <option value="any">Bất kỳ bác sĩ phù hợp</option>
            {docs.map((d) => (<option key={d.id} value={d.id}>{d.name} · {d.role}</option>))}
          </select>
          {!svc && <p className={styles.helper}>Hãy chọn một nhu cầu chăm sóc để xem lịch hẹn.</p>}
        </div>

        <div className={styles.field}>
          <div className={styles.fieldHead}>
            <span id="mc-date-l" className={styles.fieldLabel}>Ngày</span>
            <span className={styles.pager}>
              <button type="button" className={styles.pagerBtn} onClick={() => setPage(0)} disabled={page === 0} aria-label="Tuần này">Tuần này</button>
              <button type="button" className={styles.pagerBtn} onClick={() => setPage(1)} disabled={page === 1} aria-label="Tuần sau">Tuần sau</button>
            </span>
          </div>
          {!today ? <p className={styles.helper}>Đang tải lịch...</p> : (
            <div className={styles.dayRow} role="group" aria-labelledby="mc-date-l">
              {visibleDays.map((d) => {
                const st = dayInfo[d]; const wd = weekday(d);
                return (
                  <button key={d} type="button" className={styles.day} data-on={dateISO === d ? "1" : "0"} data-st={st} aria-pressed={dateISO === d} onClick={() => pickDate(d)} aria-label={`${WEEKDAY_LONG[wd]} ${fmtDate(d)}${st !== "none" ? ", " + STATUS_TXT[st] : ""}`}>
                    <span>{WEEKDAY_VI[wd]}</span><b>{fmtDate(d)}</b><i>{svc ? STATUS_TXT[st] : " "}</i>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.field}>
          <span id="mc-slot-l" className={styles.fieldLabel}>Khung giờ</span>
          <div className={styles.slotBox} aria-live="polite">
            {!svc && <p className={styles.helper}>Chọn dịch vụ để xem khung giờ.</p>}
            {svc && !dateISO && <p className={styles.helper}>Chọn một ngày để xem khung giờ.</p>}
            {dayRes?.status === "off" && <p className={styles.notice}>Ngày này không có lịch khám. Hãy thử ngày khác.</p>}
            {dayRes?.status === "full" && <p className={styles.notice}>Ngày này đã hết khung giờ.</p>}
            {dayRes?.status === "ok" && (
              <div className={styles.slotGrid} role="group" aria-labelledby="mc-slot-l">
                {dayRes.slots.map((s) => (
                  <button key={s.slot.start} type="button" className={styles.slot} data-on={slot === s.slot.start ? "1" : "0"} aria-pressed={slot === s.slot.start} onClick={() => pickSlot(s.slot.start)}>
                    {slot === s.slot.start && <span aria-hidden="true">✓ </span>}{fmtTime(s.slot.start)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {safetyNote && (
          <p className={styles.notice} role="note">Nếu bạn đang có triệu chứng, hãy liên hệ cơ sở nha khoa hoặc cấp cứu ngay, đừng chờ lịch hẹn này.</p>
        )}
        {error && <p className={styles.errorText} role="alert" id="mc-sched-err">{error}</p>}
        <div className={styles.panelActions}>
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={preview} aria-describedby={error ? "mc-sched-err" : undefined}>Xem trước lịch hẹn</button>
          <button type="button" className={styles.btnText} onClick={reset}>Đặt lại</button>
        </div>
        <p className={styles.panelFoot}>Phần này chỉ tóm tắt lựa chọn của bạn. Chưa có yêu cầu đặt lịch nào được gửi đến cơ sở y tế.</p>
      </div>

      <aside className={styles.preview} data-mc="sched-preview" aria-label="Tóm tắt lịch hẹn">
        <span className={styles.previewTag}>Tóm tắt lịch hẹn</span>
        <h3 ref={previewRef} tabIndex={-1} className={styles.previewTitle}>{previewed ? "Tóm tắt lịch hẹn đã sẵn sàng." : "Lịch của bạn"}</h3>
        <dl className={styles.previewList}>
          <div><dt>Dịch vụ</dt><dd>{svc ? svc.name : "Chưa chọn"}</dd></div>
          <div><dt>Bác sĩ</dt><dd>{chosenDoctor ? chosenDoctor.name : doctorId === "any" ? "Bất kỳ bác sĩ phù hợp" : DOCTORS.find((d) => d.id === doctorId)?.name}</dd></div>
          <div><dt>Ngày</dt><dd>{dateISO ? `${WEEKDAY_LONG[weekday(dateISO)]}, ${fmtDate(dateISO)}` : "Chưa chọn"}</dd></div>
          <div><dt>Thời gian</dt><dd>{chosen && svc ? `${fmtTime(chosen.slot.start)} đến ${fmtTime(chosen.slot.end)}` : "Chưa chọn"}</dd></div>
          <div><dt>Thời lượng dự kiến</dt><dd>{svc ? `${svc.duration} phút` : "Chưa chọn"}</dd></div>
          <div><dt>Chi phí tham khảo</dt><dd>{svc ? (price ?? "Chưa xác định") : "Chưa chọn"}</dd></div>
        </dl>
        {previewed && (
          <div className={styles.previewDone}>
            <p>Đây là bản tóm tắt lựa chọn của bạn. Chưa có yêu cầu đặt lịch nào được gửi đi.</p>
            <div className={styles.previewBtns}>
              <button type="button" className={styles.btnLight} onClick={() => setPreviewed(false)}>Chỉnh sửa lựa chọn</button>
              <button type="button" className={styles.btnLight} onClick={() => { setSlot(null); setPreviewed(false); }}>Thử lịch khác</button>
            </div>
          </div>
        )}
        <a className={styles.previewCta} href={consultHref} data-testid="consult-cta">Muốn website như thế này cho phòng khám của bạn? Nhận tư vấn <span aria-hidden="true">→</span></a>
        <p className={styles.previewNote}>Giá tham khảo, không phải báo giá điều trị.</p>
      </aside>
    </div>
  );
}
