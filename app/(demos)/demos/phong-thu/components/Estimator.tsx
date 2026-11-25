"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MagneticButton, NumberTicker } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { vnd } from "../data/content";
import { KINDS, LIMITS, checklist, estimate, getKind, summary, type KindId } from "../lib/estimator";
import { clamp01 } from "../lib/frame";
import { Fader } from "./Fader";
import { Vu } from "./Viz";

function Field({ id, label, value, min, max, onChange, hint, unit }: { id: string; label: string; value: number; min: number; max: number; onChange: (v: number) => void; hint?: string; unit: string }) {
  return (
    <div className={s.field}>
      <div className={s.fieldHead}>
        <label htmlFor={id} className={s.fieldLabel}>{label}</label>
        <output className={`${s.mono} ${s.fieldVal}`} htmlFor={id}>{value} {unit}</output>
      </div>
      <div className={s.fieldRow}>
        <button type="button" className={s.stepBtn} aria-label={`Giảm ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
        <Fader id={id} value={value} min={min} max={max} onChange={onChange} label={label} valueText={(v) => `${v} ${unit}`} className={s.estFader} />
        <button type="button" className={s.stepBtn} aria-label={`Tăng ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
      </div>
      {hint && <p className={s.fieldHint}>{hint}</p>}
    </div>
  );
}

export function Estimator() {
  const uid = useId();
  const [kind, setKind] = useState<KindId | null>(null);
  const [hours, setHours] = useState(4);
  const [tracks, setTracks] = useState(4);
  const [people, setPeople] = useState(1);
  const [engineer, setEngineer] = useState(true);
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const resRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (kind && first.current) { first.current = false; resRef.current?.focus({ preventScroll: true }); }
  }, [kind]);

  const input = kind ? { kind, hours, tracks, people, engineer } : null;
  const r = input ? estimate(input) : null;
  const k = kind ? getKind(kind) : null;
  const list = input && r ? checklist(input, r) : [];
  const load = r ? clamp01((r.needHours / Math.max(1, hours)) * 0.8) : 0;
  const loadRef = useRef(0);
  useEffect(() => { loadRef.current = load; });

  const copy = async () => {
    if (!input || !r) return;
    try { await navigator.clipboard.writeText(summary(input, r, vnd)); setCopied("ok"); } catch { setCopied("fail"); }
    setTimeout(() => setCopied(""), 2600);
  };
  const href = buildConsultHref("phong-thu");

  return (
    <div className={s.est} data-pt="est">
      <form className={s.estIn} onSubmit={(e) => e.preventDefault()} aria-labelledby={`${uid}-t`} noValidate>
        <h3 id={`${uid}-t`} className={s.estTitle}><span className={s.mono}>INPUT</span> Buổi thu của bạn</h3>
        <fieldset className={s.kindSet} aria-describedby={kind ? undefined : `${uid}-kerr`}>
          <legend className={s.fieldLabel}>Loại buổi thu</legend>
          <div className={s.kindGrid}>
            {KINDS.map((x) => (
              <label key={x.id} className={s.kind} data-on={kind === x.id || undefined}>
                <input type="radio" name={`${uid}-kind`} value={x.id} checked={kind === x.id} onChange={() => { setKind(x.id); if (x.rateSelf === null) setEngineer(true); }} />
                <span className={s.mono}>{x.ch}</span>
                <b>{x.label}</b>
              </label>
            ))}
          </div>
          {!kind && <p id={`${uid}-kerr`} className={s.estErr} role="status">Chọn một loại buổi thu để xem ước tính.</p>}
        </fieldset>
        <div className={s.estFields} aria-disabled={!kind} data-off={!kind || undefined}>
          <Field id={`${uid}-h`} label="Số giờ đặt" value={hours} min={LIMITS.hours[0]} max={LIMITS.hours[1]} onChange={setHours} unit="giờ" hint={`Tối thiểu tính ${LIMITS.minBill} giờ; từ ${LIMITS.discountFrom} giờ giảm ${LIMITS.discountPct}%.`} />
          <Field id={`${uid}-t2`} label={k ? k.trackLabel : "Số track"} value={tracks} min={LIMITS.tracks[0]} max={LIMITS.tracks[1]} onChange={setTracks} unit="track" />
          {(!k || k.usesPeople) && <Field id={`${uid}-p`} label={k ? k.peopleLabel : "Số người"} value={people} min={LIMITS.people[0]} max={LIMITS.people[1]} onChange={setPeople} unit="người" />}
          <div className={s.field}>
            <div className={s.switchRow}>
              <span id={`${uid}-sw`} className={s.fieldLabel}>Cách thu</span>
              <button type="button" role="switch" aria-checked={r ? r.engineer : engineer} aria-labelledby={`${uid}-sw`} className={s.sw} disabled={!kind || !!r?.engineerForced} onClick={() => setEngineer((v) => !v)}>
                <span aria-hidden="true" className={s.swKnob} />
                <span className={s.swText}>{(r ? r.engineer : engineer) ? "Có engineer" : "Tự thu"}</span>
              </button>
            </div>
            {r?.engineerForced && <p className={s.fieldHint}>{r.notes[0]}</p>}
          </div>
        </div>
      </form>

      <div className={s.estOut} aria-live="polite">
        <h3 ref={resRef} tabIndex={-1} className={s.estTitle}><span className={s.mono}>OUTPUT</span> Ước tính tham khảo</h3>
        {!r || !k ? (
          <div className={s.estEmpty}>
            <p>Chưa có số liệu. Chọn loại buổi thu ở bên trái, sau đó kéo fader số giờ, số track và số người.</p>
            <span className={`${s.btn} ${s.btnHot}`} aria-disabled="true" data-disabled>Chọn loại buổi thu trước</span>
          </div>
        ) : (
          <>
            <p className={s.estCost}>
              <NumberTicker value={r.low} suffix=" ₫" className={s.costN} /> <span aria-hidden="true">đến</span>
              <span className={s.srOnly}> đến </span> <NumberTicker value={r.high} suffix=" ₫" className={s.costN} />
            </p>
            <p className={s.estBase}>Giá tham khảo cho {r.billHours} giờ tính phí, {r.engineer ? "có engineer" : "tự thu"}, chưa gồm thuế. Báo giá chính thức theo yêu cầu thực tế.</p>
            <div className={s.estRead}>
              <div><span className={s.mono}>Giờ nên dự trù</span><b><NumberTicker value={r.needHours} decimals={1} suffix=" giờ" /></b></div>
              <div><span className={s.mono}>Giờ bạn chọn</span><b>{hours} giờ</b></div>
              <div className={s.loadBox}>
                <span className={s.mono}>Độ chật của buổi thu</span>
                <Vu className={s.loadVu} segs={24} level={() => loadRef.current} />
              </div>
            </div>
            <p className={s.estFit} data-fit={r.fit}>
              {r.splitHint
                ? `Khối lượng này vượt một buổi tối đa ${LIMITS.hours[1]} giờ, nên chia thành hai buổi. Thu đủ theo ước tính khoảng ${vnd(r.needCost)}.`
                : r.fit === "ok" ? "Số giờ bạn chọn đủ cho khối lượng này." : `Nên thêm khoảng ${r.shortBy} giờ. Thu đủ theo ước tính khoảng ${vnd(r.needCost)}.`}
            </p>
            {r.notes.filter((n) => !r.engineerForced || n !== r.notes[0]).length > 0 && (
              <ul className={s.estNotes}>{r.notes.filter((n) => !r.engineerForced || n !== r.notes[0]).map((n) => (<li key={n}>{n}</li>))}</ul>
            )}
            <h4 className={s.h4}>Checklist chuẩn bị</h4>
            <ul className={s.checks}>{list.map((c) => (<li key={c}>{c}</li>))}</ul>
            <div className={s.estCta}>
              <MagneticButton><a className={`${s.btn} ${s.btnHot}`} href={href}>Gửi yêu cầu đặt lịch thu</a></MagneticButton>
              <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={copy}>Sao chép tóm tắt</button>
              <span className={s.srOnly} role="status">{copied === "ok" ? "Đã sao chép tóm tắt." : copied === "fail" ? "Không sao chép được." : ""}</span>
              {copied && <span className={s.copied} aria-hidden="true">{copied === "ok" ? "Đã sao chép" : "Không sao chép được"}</span>}
            </div>
            <p className={s.estSmall}>Bản tóm tắt này chỉ nằm trên trình duyệt của bạn, chưa phải xác nhận lịch. Yêu cầu đặt lịch được gửi qua biểu mẫu liên hệ.</p>
          </>
        )}
      </div>
    </div>
  );
}
