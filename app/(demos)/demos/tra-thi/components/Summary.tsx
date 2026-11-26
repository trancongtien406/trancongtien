"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import s from "../brand.module.css";
import { SETS, SLOTS, TEAS, recommendSet, vnd } from "../data/tea";
import { buildConsultHref } from "@/features/showroom/consultation";
import { InkReveal, InkTitle } from "./Ink";

const CONSULT = buildConsultHref("tra-thi");

export function Summary() {
  const uid = useId();
  const [people, setPeople] = useState(2);
  const [slot, setSlot] = useState<string | null>(null);
  const [setId, setSetId] = useState<string | null>(null);
  const [teaId, setTeaId] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const area = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const h = (e: Event) => { const id = (e as CustomEvent<string>).detail; if (TEAS.some((t) => t.id === id)) setTeaId(id); };
    window.addEventListener("tt:session", h);
    return () => window.removeEventListener("tt:session", h);
  }, []);

  const rec = recommendSet(people);
  const set = SETS.find((x) => x.id === setId) ?? rec;
  const fits = people >= set.min && people <= set.max;
  const tea = TEAS.find((t) => t.id === teaId);
  const pots = Math.ceil(people / 3);
  const est = tea ? pots * tea.price + set.setup : null;
  const slotLabel = SLOTS.find((x) => x.id === slot)?.label;

  const text = useMemo(() => [
    "Tịch Trà · Tóm tắt buổi thưởng trà",
    `Số người: ${people}`,
    `Khung giờ mong muốn: ${slotLabel ?? "chưa chọn"}`,
    `Bộ trà: ${set.name} (${set.seats})`,
    `Trà: ${tea ? tea.name : "chưa chọn, cần gợi ý"}`,
    `Số ấm dự kiến: ${pots}`,
    est !== null ? `Ước tính tham khảo: ${vnd(est)}` : "Ước tính tham khảo: cần chọn trà",
    note.trim() ? `Ghi chú: ${note.trim()}` : "",
  ].filter(Boolean).join("\n"), [people, slotLabel, set, tea, pots, est, note]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied("ok"); }
    catch {
      try { setCopied("fail"); } catch { /* */ }
    }
    window.setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className={`${s.wrap} ${s.summary}`}>
      <div className={s.sumHead}>
        <p className={s.kicker}>Đặt bàn, đặt phòng trà</p>
        <InkTitle as="h2" className={s.h2}>Chọn số người, khung giờ và bộ trà.</InkTitle>
        <p className={s.lead}>Bộ trà tính một lần mỗi bàn, ấm tính theo số người (3 người một ấm). Bản tóm tắt này chưa phải đặt chỗ: chỗ chỉ được giữ sau khi chúng tôi xác nhận lại.</p>
        <InkReveal className={s.sumImg}>
          <Image src="/images/demos/tra-thi/bo-chen-1200.webp" alt="Bộ chén và bát gốm xếp trên mặt bàn tối" width={2000} height={1333} sizes="(max-width: 900px) 92vw, 34vw" className={s.cover} loading="lazy" />
        </InkReveal>
      </div>

      <form className={s.sumForm} onSubmit={(e) => e.preventDefault()}>
        <fieldset className={s.fieldset}>
          <legend>Số người</legend>
          <div className={s.stepper} role="group" aria-label="Số người">
            <button type="button" aria-label="Giảm số người" onClick={() => { setPeople((p) => Math.max(1, p - 1)); setSetId(null); }} disabled={people <= 1}>−</button>
            <output aria-live="polite">{people}</output>
            <button type="button" aria-label="Tăng số người" onClick={() => { setPeople((p) => Math.min(8, p + 1)); setSetId(null); }} disabled={people >= 8}>+</button>
          </div>
        </fieldset>
        <fieldset className={s.fieldset}>
          <legend>Khung giờ mong muốn</legend>
          <div className={s.radioGrid}>
            {SLOTS.map((o) => (
              <label key={o.id} className={s.radio}><input type="radio" name="slot" value={o.id} checked={slot === o.id} onChange={() => setSlot(o.id)} /><span><b>{o.label}</b></span></label>
            ))}
          </div>
        </fieldset>
        <fieldset className={s.fieldset}>
          <legend>Bộ trà</legend>
          <div className={s.radioGrid}>
            {SETS.map((o) => (
              <label key={o.id} className={s.radio}>
                <input type="radio" name="set" value={o.id} checked={set.id === o.id} onChange={() => setSetId(o.id)} />
                <span><b>{o.name}</b><small>{o.seats}. {o.desc}</small></span>
              </label>
            ))}
          </div>
          {!fits && <p className={s.fieldErr} role="alert">Bộ này dành cho {set.seats}; với {people} người, nên chọn {rec.name}.</p>}
        </fieldset>
        <div className={s.field}>
          <label htmlFor={`${uid}-tea`}>Trà</label>
          <select id={`${uid}-tea`} value={teaId} onChange={(e) => setTeaId(e.target.value)}>
            <option value="">Chưa chọn, cần gợi ý</option>
            {TEAS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className={s.field}>
          <label htmlFor={`${uid}-note`}>Điều bạn muốn chia sẻ thêm</label>
          <textarea ref={area} id={`${uid}-note`} rows={3} maxLength={200} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ví dụ: cần chỗ yên tĩnh, thích trà ít chát" />
        </div>
      </form>

      <div className={s.ticket} aria-live="polite">
        <span className={s.seal} aria-hidden="true">Tịch</span>
        <p className={s.ticketTag}>Tóm tắt buổi thưởng trà</p>
        <h3 className={s.ticketTitle}>{people} người{slotLabel ? `, ${slotLabel.split(",")[0].toLowerCase()}` : ""}</h3>
        <dl className={s.ticketList}>
          <div><dt>Khung giờ</dt><dd>{slotLabel ?? "Chưa chọn"}</dd></div>
          <div><dt>Bộ trà</dt><dd>{set.name}</dd></div>
          <div><dt>Trà</dt><dd>{tea ? tea.name : "Cần gợi ý"}</dd></div>
          <div><dt>Số ấm dự kiến</dt><dd>{pots}</dd></div>
          <div><dt>Ước tính tham khảo</dt><dd>{est !== null ? vnd(est) : "Chọn trà để tính"}</dd></div>
        </dl>
        {note.trim() && <p className={s.ticketNote}>{note.trim()}</p>}
        <div className={s.ticketBtns}>
          <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={copy} disabled={!slot}>Sao chép tóm tắt</button>
          <a className={`${s.btn} ${s.btnPrimary}`} href={CONSULT} data-cursor="Gửi">Trao đổi về buổi trà</a>
        </div>
        {!slot && <p className={s.fine}>Chọn khung giờ để sao chép bản tóm tắt.</p>}
        <p className={s.fine} role="status">{copied === "ok" ? "Đã sao chép. Dán vào ô ghi chú của form liên hệ." : copied === "fail" ? "Không sao chép được tự động. Hãy chép tay nội dung bên trên." : "Sao chép rồi dán vào ô ghi chú của form liên hệ. Giá chỉ để tham khảo."}</p>
      </div>
    </div>
  );
}
