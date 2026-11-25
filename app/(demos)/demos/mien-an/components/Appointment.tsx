"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { BUFFER_MINUTES, CLOSE_MINUTES, LEAD_MINUTES, RESOURCES, RITUALS, WINDOW_DAYS } from "../data/rituals";
import type { Pressure, Scent } from "../data/types";
import { formatMinutes, formatVnd } from "../lib/format";
import { getAvailableSlots, isDateInWindow } from "../lib/slots";
import { addDays, describeDate, getVnNow, type VnNow } from "../lib/vietnam-time";
import { Check, Symbol } from "./Icons";
import { useMienAn } from "./Provider";
import styles from "../brand.module.css";

type Errors = Partial<Record<"ritual" | "date" | "time" | "ack", string>>;
type Preview = { id: string; ritualId: string; date: string; start: number; end: number; resourceId: string; price: number; pressure: Pressure; scent: Scent };

const MSG = {
  ritual: "Hãy chọn nghi thức bạn muốn trải nghiệm.",
  date: "Hãy chọn một ngày để xem các khung giờ.",
  time: "Hãy chọn một khung giờ.",
  stale: "Khung giờ này không còn phù hợp với lựa chọn hiện tại. Vui lòng chọn lại.",
  ack: "Hãy xác nhận bạn đã hiểu ghi chú về bản tóm tắt.",
};

function refId() {
  const raw = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()).slice(2);
  return `MA-${raw.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export function Appointment() {
  const { selection } = useMienAn();
  const [now, setNow] = useState<VnNow | null>(null);
  const [ritualId, setRitualId] = useState<string | null>(null);
  const [offset, setOffset] = useState<number | null>(null);
  const [resource, setResource] = useState<string>("auto");
  const [start, setStart] = useState<number | null>(null);
  const [pressure, setPressure] = useState<Pressure>("light");
  const [scent, setScent] = useState<Scent>("natural");
  const [ack, setAck] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [preview, setPreview] = useState<Preview | null>(null);
  const successHead = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Đồng hồ giờ Việt Nam chỉ có ở client (tránh lệch hydrate), nên khởi tạo sau khi mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setNow(getVnNow()), []);

  const ritual = RITUALS.find((r) => r.id === ritualId) ?? null;

  // nhận lựa chọn từ Ritual Finder / dialog
  useEffect(() => {
    if (!selection.ritualId) return;
    const r = RITUALS.find((x) => x.id === selection.ritualId);
    if (!r) return;
    // Đồng bộ lựa chọn từ Finder/dialog (nguồn bên ngoài) vào form.
    /* eslint-disable react-hooks/set-state-in-effect */
    setRitualId(r.id);
    setStart(null);
    setResource("auto");
    setPreview(null);
    setErrors({});
    setPressure(selection.pressure && r.pressures.includes(selection.pressure) ? selection.pressure : r.pressures[0]);
    setScent(selection.scent ?? "natural");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [selection]);

  const days = useMemo(() => (now ? Array.from({ length: WINDOW_DAYS }, (_, i) => addDays(now.date, i)) : []), [now]);

  const slotsFor = (off: number, rid: string | null, res: string) => {
    const r = RITUALS.find((x) => x.id === rid);
    if (!r || !now) return null;
    return getAvailableSlots(r, off, now, off === 0, res);
  };

  const daySlots = offset !== null ? slotsFor(offset, ritualId, resource) : null;
  const fullFlags = useMemo(
    () => (ritualId && now ? days.map((_, i) => (slotsFor(i, ritualId, resource) ?? []).length === 0) : days.map(() => false)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [days, ritualId, resource, now],
  );

  const chooseRitual = (id: string) => {
    const r = RITUALS.find((x) => x.id === id)!;
    setRitualId(id);
    setStart(null);
    setResource((cur) => (cur !== "auto" && !RESOURCES.find((x) => x.id === cur)?.supportedRitualIds.includes(id) ? "auto" : cur));
    setPressure((p) => (r.pressures.includes(p) ? p : r.pressures[0]));
    setErrors((e) => ({ ...e, ritual: undefined, time: undefined }));
  };
  const chooseDate = (i: number) => {
    setOffset(i);
    setStart(null);
    setErrors((e) => ({ ...e, date: undefined, time: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (!ritual) er.ritual = MSG.ritual;
    if (offset === null) er.date = MSG.date;
    else if (ritual && !isDateInWindow(offset)) er.date = MSG.date;
    if (ritual && offset !== null && start === null) er.time = MSG.time;
    if (!ack) er.ack = MSG.ack;
    // validate lại slot ngay lúc tạo
    let slot: { startMinutes: number; resourceId: string } | undefined;
    if (!er.ritual && !er.date && !er.time && ritual && offset !== null && start !== null) {
      slot = (slotsFor(offset, ritual.id, resource) ?? []).find((s) => s.startMinutes === start);
      if (!slot) er.time = MSG.stale;
    }
    setErrors(er);
    const firstKey = (["ritual", "date", "time", "ack"] as const).find((k) => er[k]);
    if (firstKey) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstKey}"] input`)?.focus();
      return;
    }
    if (!ritual || offset === null || start === null || !slot) return;
    setPreview({ id: refId(), ritualId: ritual.id, date: days[offset], start, end: start + ritual.durationMinutes, resourceId: slot.resourceId, price: ritual.priceVnd, pressure, scent });
    window.setTimeout(() => successHead.current?.focus(), 30);
  };

  const edit = () => setPreview(null);
  const fresh = () => {
    setPreview(null);
    setRitualId(null);
    setOffset(null);
    setStart(null);
    setResource("auto");
    setPressure("light");
    setScent("natural");
    setAck(false);
    setErrors({});
  };

  const res = (id: string) => RESOURCES.find((r) => r.id === id);
  const summaryRitual = preview ? RITUALS.find((r) => r.id === preview.ritualId)! : ritual;
  const todayClosed = offset === 0 && now && ritual && daySlots && daySlots.length === 0 && now.minutes + LEAD_MINUTES + ritual.durationMinutes + BUFFER_MINUTES > CLOSE_MINUTES;

  const consult = buildConsultHref("mien-an");

  return (
    <section id="appointment" className={`${styles.section} ${styles.linen}`} aria-labelledby="ap-heading">
      <div className={styles.container}>
        <div className={styles.apHead} data-reveal>
          <p className={styles.eyebrow}>Make time for yourself</p>
          <h2 id="ap-heading" tabIndex={-1} className={styles.h2} style={{ outline: "none" }}>
            Dành một khoảng thời gian <em>cho mình.</em>
          </h2>
          <p className={styles.lead}>Chọn nghi thức và khung giờ bạn mong muốn để xem trước một lịch hẹn tại Miên An.</p>
          <p className={styles.apDisclosure}>Chọn nghi thức và khung giờ để xem tóm tắt lịch hẹn. Bản tóm tắt chỉ lưu trên thiết bị của bạn, chưa phải yêu cầu đã gửi đi; bước này không cần thông tin cá nhân và không phát sinh thanh toán.</p>
        </div>

        <div className={styles.apGrid}>
          {preview && summaryRitual ? (
            <div className={styles.success} role="status" data-testid="ap-success">
              <div className={styles.successMark}><Check /></div>
              <p className={styles.code} data-testid="ap-code">{preview.id}</p>
              <h3 ref={successHead} tabIndex={-1} className={styles.h2} style={{ fontSize: "clamp(34px,4vw,52px)", outline: "none" }}>
                Khoảng thời gian dành riêng cho bạn.
              </h3>
              <p className={styles.successNote}>Tóm tắt lịch hẹn đã sẵn sàng trên thiết bị của bạn. Chưa có yêu cầu nào được gửi đến spa; để tiếp tục, hãy dùng nút liên hệ bên dưới.</p>
              <dl className={styles.facts}>
                <div><dt>Nghi thức</dt><dd>{summaryRitual.name} · {summaryRitual.subtitle}</dd></div>
                <div><dt>Ngày</dt><dd>{describeDate(preview.date).long}</dd></div>
                <div><dt>Giờ</dt><dd>{formatMinutes(preview.start)} – {formatMinutes(preview.end)} ({summaryRitual.durationMinutes}&nbsp;phút)</dd></div>
                <div><dt>Phòng</dt><dd>{res(preview.resourceId)?.name} · {res(preview.resourceId)?.therapist}</dd></div>
                <div><dt>Sở thích</dt><dd>Áp lực {preview.pressure === "light" ? "nhẹ" : "vừa"} · {preview.scent === "unscented" ? "không hương liệu" : "hương tự nhiên"}</dd></div>
                <div><dt>Chi phí dự kiến</dt><dd>{formatVnd(preview.price)} (giá tham khảo)</dd></div>
              </dl>
              <div className={styles.dialogActions}>
                <a href={consult} className={`${styles.btn} ${styles.btnPrimary}`} data-testid="ap-consult">Muốn website đặt lịch như thế này? Trao đổi về dự án <span aria-hidden="true">↗</span></a>
                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={edit}>Chỉnh sửa</button>
                <button type="button" className={styles.textBtn} onClick={fresh}>Tạo mới</button>
              </div>
            </div>
          ) : (
            <form ref={formRef} className={styles.apForm} onSubmit={submit} noValidate>
              <div className={`${styles.group} ${errors.ritual ? styles.fieldInvalid : ""}`} data-field="ritual">
                <fieldset className={styles.fieldset} aria-describedby={errors.ritual ? "e-ritual" : undefined}>
                  <legend className={styles.groupTitle}><span>01</span> Chọn nghi thức</legend>
                  <div className={styles.ritualOpts}>
                    {RITUALS.map((r) => (
                      <label key={r.id} className={styles.opt}>
                        <input type="radio" name="ritual" value={r.id} checked={ritualId === r.id} aria-invalid={!!errors.ritual} onChange={() => chooseRitual(r.id)} />
                        <span className={styles.optBox}>
                          <span className={styles.tick}><Check /></span>
                          <span className={styles.txt}><strong>{r.name}</strong><small>{r.durationMinutes}&nbsp;phút · {formatVnd(r.priceVnd)}</small></span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.ritual && <p id="e-ritual" className={styles.error} role="alert">{errors.ritual}</p>}
                </fieldset>
              </div>

              <div className={`${styles.group} ${errors.date ? styles.fieldInvalid : ""}`} data-field="date">
                <fieldset className={styles.fieldset} aria-describedby={errors.date ? "e-date" : undefined}>
                  <legend className={styles.groupTitle}><span>02</span> Chọn ngày</legend>
                  {now ? (
                    <div className={styles.days}>
                      {days.map((d, i) => {
                        const x = describeDate(d);
                        return (
                          <label key={d} className={`${styles.opt} ${styles.day}`}>
                            <input type="radio" name="date" value={d} checked={offset === i} aria-invalid={!!errors.date} onChange={() => chooseDate(i)} aria-label={`${x.long}${fullFlags[i] && ritualId ? ", đã kín lịch mẫu" : ""}`} />
                            <span className={styles.optBox}>
                              <span className={styles.wd}>{i === 0 ? "Hôm nay" : x.weekday}</span>
                              <span className={styles.dd}>{x.day}</span>
                              <span className={styles.mm}>{x.month}</span>
                              {ritualId && fullFlags[i] && <span className={styles.full}>Kín</span>}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <p className={styles.slotInfo}>Đang tải lịch…</p>
                  )}
                  {errors.date && <p id="e-date" className={styles.error} role="alert">{errors.date}</p>}
                </fieldset>
              </div>

              <div className={`${styles.group} ${errors.time ? styles.fieldInvalid : ""}`} data-field="time">
                <fieldset className={styles.fieldset} aria-describedby={errors.time ? "e-time" : undefined}>
                  <legend className={styles.groupTitle}><span>03</span> Khung giờ &amp; kỹ thuật viên</legend>
                  <div className={styles.therapists} role="radiogroup" aria-label="Kỹ thuật viên">
                    <label className={styles.opt}>
                      <input type="radio" name="resource" value="auto" checked={resource === "auto"} onChange={() => { setResource("auto"); setStart(null); }} />
                      <span className={`${styles.optBox} ${styles.compact}`}><span className={styles.tick}><Check /></span><span className={styles.txt}>Sắp xếp giúp tôi</span></span>
                    </label>
                    {RESOURCES.map((r) => {
                      const ok = !ritualId || r.supportedRitualIds.includes(ritualId);
                      return (
                        <label key={r.id} className={styles.opt}>
                          <input type="radio" name="resource" value={r.id} disabled={!ok} checked={resource === r.id} onChange={() => { setResource(r.id); setStart(null); }} />
                          <span className={`${styles.optBox} ${styles.compact}`}>
                            <span className={styles.tick}><Check /></span>
                            <span className={styles.txt}>{r.name}<small>{ok ? r.therapist : "Không thực hiện nghi thức này"}</small></span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {!ritual || offset === null ? (
                    <p className={styles.slotInfo}>{!ritual ? MSG.ritual : MSG.date}</p>
                  ) : daySlots && daySlots.length > 0 ? (
                    <div className={styles.slots} role="radiogroup" aria-label="Khung giờ khả dụng">
                      {daySlots.map((s) => (
                        <label key={s.startMinutes} className={styles.opt}>
                          <input type="radio" name="time" value={s.startMinutes} checked={start === s.startMinutes} aria-invalid={!!errors.time} onChange={() => { setStart(s.startMinutes); setErrors((e) => ({ ...e, time: undefined })); }} />
                          <span className={`${styles.optBox} ${styles.compact}`}>{formatMinutes(s.startMinutes)}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className={`${styles.slotInfo} ${styles.warn}`} role="status" data-testid="ap-full">
                      {todayClosed ? "Các khung giờ hôm nay đã kết thúc. Bạn có thể chọn ngày tiếp theo." : "Ngày này đã kín lịch. Hãy thử chọn ngày khác."}
                    </p>
                  )}
                  {errors.time && <p id="e-time" className={styles.error} role="alert">{errors.time}</p>}
                </fieldset>
              </div>

              <div className={styles.group}>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.groupTitle}><span>04</span> Sở thích chăm sóc</legend>
                  <div className={`${styles.options} ${styles.row}`} style={{ marginBottom: 10 }} role="radiogroup" aria-label="Mức áp lực">
                    {(["light", "medium"] as Pressure[]).map((p) => {
                      const ok = !ritual || ritual.pressures.includes(p);
                      return (
                        <label key={p} className={styles.opt}>
                          <input type="radio" name="pressure" value={p} disabled={!ok} checked={pressure === p} onChange={() => setPressure(p)} />
                          <span className={`${styles.optBox} ${styles.compact}`}><span className={styles.tick}><Check /></span><span className={styles.txt}>Áp lực {p === "light" ? "nhẹ" : "vừa"}</span></span>
                        </label>
                      );
                    })}
                  </div>
                  <div className={`${styles.options} ${styles.row}`} role="radiogroup" aria-label="Hương liệu">
                    {([["natural", "Hương tự nhiên"], ["unscented", "Không hương liệu"]] as [Scent, string][]).map(([v, l]) => (
                      <label key={v} className={styles.opt}>
                        <input type="radio" name="scent" value={v} checked={scent === v} onChange={() => setScent(v)} />
                        <span className={`${styles.optBox} ${styles.compact}`}><span className={styles.tick}><Check /></span><span className={styles.txt}>{l}</span></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className={styles.group} data-field="ack" style={{ marginBottom: 0 }}>
                <label className={styles.ack}>
                  <input type="checkbox" checked={ack} aria-invalid={!!errors.ack} aria-describedby={errors.ack ? "e-ack" : undefined} onChange={(e) => { setAck(e.target.checked); if (e.target.checked) setErrors((x) => ({ ...x, ack: undefined })); }} />
                  <span>Tôi hiểu bản tóm tắt này chưa phải yêu cầu đã gửi.</span>
                </label>
                {errors.ack && <p id="e-ack" className={styles.error} role="alert">{errors.ack}</p>}
              </div>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.apSubmit}`}>Tạo bản xem trước lịch hẹn</button>
            </form>
          )}

          <aside className={styles.apSide} aria-label="Tóm tắt lịch hẹn">
            <div className={styles.summary}>
              <Symbol className={styles.philoMark} />
              <h3>Tóm tắt lịch hẹn</h3>
              <p className={styles.sub}>Bản tóm tắt lưu trên thiết bị của bạn</p>
              <dl aria-live="polite">
                <div><dt>Nghi thức</dt>{summaryRitual ? <dd>{summaryRitual.name}</dd> : <dd className={styles.muted}>Chưa chọn</dd>}</div>
                <div><dt>Thời lượng</dt>{summaryRitual ? <dd>{summaryRitual.durationMinutes}&nbsp;phút</dd> : <dd className={styles.muted}>Chưa chọn</dd>}</div>
                <div><dt>Ngày</dt>{(preview ? preview.date : offset !== null ? days[offset] : null) ? <dd>{describeDate((preview ? preview.date : days[offset as number]) as string).long}</dd> : <dd className={styles.muted}>Chưa chọn</dd>}</div>
                <div><dt>Thời gian</dt>{(preview ? preview.start : start) !== null ? <dd>{formatMinutes((preview ? preview.start : start) as number)}</dd> : <dd className={styles.muted}>Chưa chọn</dd>}</div>
                <div><dt>Kỹ thuật viên</dt><dd>{preview ? res(preview.resourceId)?.therapist : resource === "auto" ? "Sắp xếp tự động" : res(resource)?.therapist}</dd></div>
                <div><dt>Chi phí dự kiến</dt><dd className={styles.price}>{summaryRitual ? formatVnd(summaryRitual.priceVnd) : "—"}</dd></div>
              </dl>
              <a className={styles.summaryLink} href={consult}>Muốn website như thế này? Trao đổi về dự án ↗</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
