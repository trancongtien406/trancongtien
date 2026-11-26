"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NumberTicker, gsap, prefersReducedMotion } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import {
  BUDGETS, BUDGET_MAX, BUDGET_MIN, DEFAULT_STATE, FLOWERS, MAX_PICK, MESSAGES, MSG_MAX, OCCASIONS, PALETTES, SIZES,
  fmtVnd, messageFor, parseBudget, quote, type BuilderState, type OccasionId, type PaletteId, type SizeId,
} from "../data/flowers";
import { BouquetSvg } from "./BouquetSvg";

const KEY = "nr-builder-v1";
const isPreset = (n: number) => (BUDGETS as readonly number[]).includes(n);

export function Builder() {
  const [st, setSt] = useState<BuilderState>(DEFAULT_STATE);
  const [custom, setCustom] = useState(false);
  const [customTxt, setCustomTxt] = useState("");
  const [customErr, setCustomErr] = useState("");
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const [bump, setBump] = useState(0);
  const uid = useId();
  const preview = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const v = JSON.parse(raw) as Partial<BuilderState>;
        const next: BuilderState = {
          occasion: OCCASIONS.some((o) => o.id === v.occasion) ? (v.occasion as OccasionId) : DEFAULT_STATE.occasion,
          budget: typeof v.budget === "number" && v.budget >= BUDGET_MIN && v.budget <= BUDGET_MAX ? v.budget : DEFAULT_STATE.budget,
          palette: PALETTES.some((p) => p.id === v.palette) ? (v.palette as PaletteId) : DEFAULT_STATE.palette,
          flowers: Array.isArray(v.flowers) ? v.flowers.filter((f) => FLOWERS.some((x) => x.id === f)).slice(0, MAX_PICK) : [],
          size: SIZES.some((x) => x.id === v.size) ? (v.size as SizeId) : DEFAULT_STATE.size,
          msg: Number.isFinite(v.msg) ? Math.max(0, Math.floor(v.msg as number)) : 0,
        };
        setSt(next);
        if (!isPreset(next.budget)) { setCustom(true); setCustomTxt(String(next.budget)); }
      }
    } catch { /* không có localStorage */ }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch { /* bỏ qua */ }
  }, [st]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-pick-occasion]");
      const id = a?.dataset.pickOccasion as OccasionId | undefined;
      if (id && OCCASIONS.some((o) => o.id === id)) { setSt((p) => ({ ...p, occasion: id, msg: 0 })); setBump((b) => b + 1); setCopied(""); }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const set = (patch: Partial<BuilderState>) => { setSt((p) => ({ ...p, ...patch })); setBump((b) => b + 1); setCopied(""); };

  useEffect(() => {
    const el = preview.current;
    if (!el || bump === 0 || prefersReducedMotion()) return;
    const tw = gsap.fromTo(el, { scale: 0.93, rotate: -2, opacity: 0.55 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: "back.out(1.6)", overwrite: true });
    return () => { tw.kill(); };
  }, [bump]);

  const q = quote(st);
  const msg = messageFor(st);
  const occ = OCCASIONS.find((o) => o.id === st.occasion)!;
  const pal = PALETTES.find((p) => p.id === st.palette)!;
  const size = SIZES.find((x) => x.id === st.size)!;
  const full = st.flowers.length >= MAX_PICK;

  const toggleFlower = (id: string) => {
    if (st.flowers.includes(id)) set({ flowers: st.flowers.filter((x) => x !== id) });
    else if (!full) set({ flowers: [...st.flowers, id] });
  };

  const onCustom = (v: string) => {
    setCustomTxt(v);
    const r = parseBudget(v);
    if (r.ok) { setCustomErr(""); set({ budget: r.value }); } else { setCustomErr(r.error); }
  };

  const summary = [
    "Bó hoa tại Nở Rừng",
    `Dịp: ${occ.label}`,
    `Ngân sách: ${fmtVnd(st.budget)}`,
    `Tông màu: ${pal.label}`,
    `Kích cỡ: ${size.label}`,
    `Hoa: ${q.lines.map((l) => `${l.label} ${l.stems} cành`).join(", ")}${q.auto ? " (Nở Rừng gợi ý)" : ""}`,
    `Giá tham khảo: ${fmtVnd(q.total)}`,
    `Lời thiệp: ${msg}`,
  ].join("\n");

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied("ok"); } catch { setCopied("fail"); }
  };

  const budgetErrId = `${uid}-berr`;

  return (
    <div className={s.builder}>
      <div className={s.bControls}>
        <fieldset className={s.bField}>
          <legend>1. Dịp</legend>
          <div className={s.bChips} role="radiogroup" aria-label="Dịp tặng hoa">
            {OCCASIONS.map((o) => (
              <label key={o.id} className={s.bChip}>
                <input type="radio" name={`${uid}-occ`} checked={st.occasion === o.id} onChange={() => set({ occasion: o.id, msg: 0 })} />
                <span><b>{o.label}</b><small>{o.blurb}</small></span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={s.bField}>
          <legend>2. Ngân sách</legend>
          <div className={s.bChips} role="radiogroup" aria-label="Ngân sách">
            {BUDGETS.map((b) => (
              <label key={b} className={`${s.bChip} ${s.bChipSm} ${s.bChipRow}`}>
                <input type="radio" name={`${uid}-bud`} checked={!custom && st.budget === b} onChange={() => { setCustom(false); setCustomErr(""); set({ budget: b }); }} />
                <span><b>{b >= 1000000 ? "1 triệu" : `${b / 1000}k`}</b></span>
              </label>
            ))}
            <label className={`${s.bChip} ${s.bChipSm} ${s.bChipRow}`}>
              <input type="radio" name={`${uid}-bud`} checked={custom} onChange={() => { setCustom(true); if (!customTxt) setCustomTxt(String(st.budget)); }} />
              <span><b>Khác</b></span>
            </label>
          </div>
          {custom ? (
            <div className={s.bCustom}>
              <label htmlFor={`${uid}-cb`}>Ngân sách của bạn (VNĐ)</label>
              <input id={`${uid}-cb`} type="text" inputMode="numeric" autoComplete="off" value={customTxt} onChange={(e) => onCustom(e.target.value)} aria-invalid={customErr ? true : undefined} aria-describedby={customErr ? budgetErrId : undefined} placeholder="Ví dụ 650000 hoặc 650k" />
              {customErr ? <p id={budgetErrId} className={s.bErr} role="alert">{customErr}</p> : null}
            </div>
          ) : null}
        </fieldset>

        <fieldset className={s.bField}>
          <legend>3. Tông màu</legend>
          <div className={s.bChips} role="radiogroup" aria-label="Tông màu">
            {PALETTES.map((p) => (
              <label key={p.id} className={`${s.bChip} ${s.bChipSm} ${s.bChipRow}`}>
                <input type="radio" name={`${uid}-pal`} checked={st.palette === p.id} onChange={() => set({ palette: p.id })} />
                <span>
                  <i className={s.bSwatch} aria-hidden="true">{p.swatch.map((c) => <em key={c} style={{ background: c }} />)}</i>
                  <b>{p.label}</b>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={s.bField}>
          <legend>4. Loại hoa <small>(chọn tối đa {MAX_PICK}, bỏ trống để Nở Rừng gợi ý)</small></legend>
          <div className={s.bFlowers}>
            {FLOWERS.map((f) => {
              const on = st.flowers.includes(f.id);
              return (
                <label key={f.id} className={`${s.bChip} ${s.bChipSm}`} data-disabled={!on && full ? "1" : undefined}>
                  <input type="checkbox" checked={on} disabled={!on && full} onChange={() => toggleFlower(f.id)} />
                  <span><b>{f.label}</b><small>{f.note}</small></span>
                </label>
              );
            })}
          </div>
          {full ? <p className={s.bHint}>Đã chọn đủ {MAX_PICK} loại. Bỏ một loại để chọn loại khác.</p> : null}
        </fieldset>

        <fieldset className={s.bField}>
          <legend>5. Kích cỡ</legend>
          <div className={s.bChips} role="radiogroup" aria-label="Kích cỡ bó">
            {SIZES.map((z) => (
              <label key={z.id} className={s.bChip}>
                <input type="radio" name={`${uid}-size`} checked={st.size === z.id} onChange={() => set({ size: z.id })} />
                <span><b>{z.label}</b><small>{z.hint}</small></span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={s.bResult} aria-live="polite">
        <div className={s.bStage}>
          <div ref={preview} className={s.bPreview} data-testid="bouquet-preview">
            <BouquetSvg items={q.lines.map((l) => ({ kind: l.kind, stems: l.stems }))} palette={st.palette} size={st.size} seed={st.occasion} title={`Bó hoa ${size.label.toLowerCase()} tông ${pal.label.toLowerCase()} cho dịp ${occ.label.toLowerCase()}`} />
          </div>
        </div>

        <div className={s.bSheet}>
          <h3 className={s.bSheetTitle}>Danh sách hoa</h3>
          <ul className={s.bLines}>
            {q.lines.map((l) => (
              <li key={l.id}><span>{l.label} <em>× {l.stems} cành</em></span><span>{fmtVnd(l.sub)}</span></li>
            ))}
            <li><span>Lá xanh phụ</span><span>{fmtVnd(q.foliage)}</span></li>
            <li><span>Giấy gói và nơ</span><span>{fmtVnd(q.wrap)}</span></li>
          </ul>
          <p className={s.bTotal}>
            <span>Giá tham khảo</span>
            <strong data-testid="total"><NumberTicker value={q.total} suffix="&nbsp;₫" duration={0.6} /></strong>
          </p>
          {q.auto ? <p className={s.bHint}>Bạn chưa chọn loại hoa, Nở Rừng gợi ý bộ hoa hợp dịp {occ.label.toLowerCase()} và tông {pal.label.toLowerCase()}.</p> : null}
          {q.trimmed ? <p className={s.bNote} data-testid="note-trim">Đã giảm bớt số cành để vừa ngân sách {fmtVnd(st.budget)}.</p> : null}
          {q.tooLow ? <p className={`${s.bNote} ${s.bNoteWarn}`} data-testid="note-low" role="alert">Ngân sách {fmtVnd(st.budget)} chưa đủ cho bó {size.label.toLowerCase()} này (ít nhất khoảng {fmtVnd(q.minNeeded)}). Hãy tăng ngân sách, đổi cỡ nhỏ hơn hoặc chọn loại hoa rẻ hơn.</p> : null}
          {q.roomLeft ? <p className={s.bHint}>Ngân sách còn dư, bạn có thể chọn cỡ lớn hơn cho bó đầy đặn.</p> : null}

          <div className={s.bCard}>
            <p className={s.bCardLabel}>Lời thiệp</p>
            <p className={s.bCardText} data-testid="card-text">{msg}</p>
            <div className={s.bCardRow}>
              <span className={s.bCount} aria-label={`${msg.length} trên ${MSG_MAX} ký tự`}>{msg.length}/{MSG_MAX}</span>
              <button type="button" className={s.bLink} onClick={() => set({ msg: st.msg + 1 })} data-testid="card-next">Đổi lời khác ({(((st.msg % MESSAGES[st.occasion].length) + MESSAGES[st.occasion].length) % MESSAGES[st.occasion].length) + 1}/{MESSAGES[st.occasion].length})</button>
            </div>
          </div>

          <div className={s.bActions}>
            <a className={`${s.btn} ${s.btnVerm}`} href={buildConsultHref("hoa-tuoi")} data-testid="builder-cta">Nhắn tiệm về bó hoa này</a>
            <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={copy}>Chép bản tóm tắt</button>
          </div>
          <p className={s.bFoot} role="status">
            {copied === "ok" ? "Đã chép bản tóm tắt, bạn có thể dán vào tin nhắn." : copied === "fail" ? "Không chép được tự động. Bạn hãy chọn và chép bản tóm tắt bên dưới." : "Bản tóm tắt chỉ nằm trên trình duyệt của bạn. Giá và hoa theo mùa sẽ được tiệm xác nhận khi bạn nhắn."}
          </p>
          {copied === "fail" ? <textarea className={s.bTextarea} readOnly value={summary} rows={8} aria-label="Bản tóm tắt bó hoa" onFocus={(e) => e.currentTarget.select()} /> : null}
        </div>
      </div>
    </div>
  );
}
