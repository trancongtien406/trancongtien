"use client";

import { useEffect, useId, useRef, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { CREAMS, DECOS, DEFAULT_STATE, FINISHES, FLAVORS, SIZES, TEXT_MAX, priceOf, recommendSize, type BuilderState } from "../data/builder";
import { fmtVnd } from "../data/menu";
import { CakePreview } from "./CakePreview";
import { burstAt } from "./Sprinkles";

const KEY = "mk-builder-v1";

export function Builder() {
  const [st, setSt] = useState<BuilderState>(DEFAULT_STATE);
  const [servTxt, setServTxt] = useState(String(DEFAULT_STATE.servings));
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const [bump, setBump] = useState(0);
  const id = useId();
  const prev = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const v = JSON.parse(raw) as Partial<BuilderState>;
        const merged: BuilderState = {
          flavor: FLAVORS.some((f) => f.id === v.flavor) ? (v.flavor as string) : DEFAULT_STATE.flavor,
          size: SIZES.some((x) => x.id === v.size) ? (v.size as string) : DEFAULT_STATE.size,
          servings: Number.isFinite(v.servings) ? Math.min(40, Math.max(1, Math.round(v.servings as number))) : DEFAULT_STATE.servings,
          cream: CREAMS.some((c) => c.id === v.cream) ? (v.cream as string) : DEFAULT_STATE.cream,
          finish: FINISHES.some((f) => f.id === v.finish) ? (v.finish as string) : DEFAULT_STATE.finish,
          text: typeof v.text === "string" ? v.text.slice(0, TEXT_MAX) : DEFAULT_STATE.text,
          decos: Array.isArray(v.decos) ? v.decos.filter((d) => DECOS.some((x) => x.id === d)) : DEFAULT_STATE.decos,
        };
        setSt(merged);
        setServTxt(String(merged.servings));
      }
    } catch { /* không có localStorage */ }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch { /* bỏ qua */ }
  }, [st]);

  const set = (patch: Partial<BuilderState>) => { setSt((p) => ({ ...p, ...patch })); setBump((b) => b + 1); setCopied(""); };
  const { lines, total, size, flavor, cream, finish } = priceOf(st);

  const servNum = Number(servTxt);
  const servValid = servTxt.trim() !== "" && Number.isInteger(servNum) && servNum >= 1 && servNum <= 40;
  const rec = servValid ? recommendSize(servNum) : null;
  const tooSmall = servValid && size.serves[1] < servNum;
  const overMax = servValid && servNum > 24;
  const servMsg = !servValid
    ? "Nhập số người từ 1 đến 40."
    : overMax
      ? `Với ${servNum} người, tiệm gợi ý chia thành 2 chiếc hoặc nhắn để được tư vấn riêng.`
      : tooSmall
        ? `Bánh ${size.label} đủ cho ${size.serves[0]} đến ${size.serves[1]} người, chưa đủ cho ${servNum} người.`
        : "";

  const onServ = (v: string) => {
    setServTxt(v);
    const n = Number(v);
    if (v.trim() !== "" && Number.isInteger(n) && n >= 1 && n <= 40) {
      set({ servings: n });
    }
  };
  const toggleDeco = (d: string) => set({ decos: st.decos.includes(d) ? st.decos.filter((x) => x !== d) : [...st.decos, d] });

  const summary = [
    "Yêu cầu bánh tại Mây Kẹo",
    `Vị bánh: ${flavor.label}`,
    `Size: ${size.label} (${size.serves[0]}-${size.serves[1]} người), cần cho ${servValid ? servNum : st.servings} người`,
    `Kem: ${cream.label}, ${finish.label.toLowerCase()}`,
    `Chữ viết: ${st.text.trim() || "không viết"}`,
    `Trang trí: ${st.decos.length ? st.decos.map((d) => DECOS.find((x) => x.id === d)?.label).join(", ") : "không"}`,
    `Giá tham khảo: ${fmtVnd(total)}`,
  ].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  };

  return (
    <div className={s.builder}>
      <div className={s.builderControls}>
        <fieldset className={s.fs}>
          <legend><span className={s.stepNo}>1</span>Vị bánh</legend>
          <div className={s.opts}>
            {FLAVORS.map((f) => (
              <label key={f.id} className={s.opt}>
                <input type="radio" name={`${id}-fl`} checked={st.flavor === f.id} onChange={() => set({ flavor: f.id })} />
                <span className={s.optBox}><i className={s.dot} style={{ background: f.sponge }} aria-hidden="true" /><b>{f.label}</b><small>{f.note}</small></span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={s.fs}>
          <legend><span className={s.stepNo}>2</span>Số người và size</legend>
          <div className={s.servRow}>
            <label htmlFor={`${id}-sv`} className={s.lbl}>Bánh cho bao nhiêu người?</label>
            <div className={s.stepper}>
              <button type="button" className={s.stepBtn} aria-label="Giảm số người" onClick={() => onServ(String(Math.max(1, (servValid ? servNum : st.servings) - 1)))}>−</button>
              <input id={`${id}-sv`} className={s.num} inputMode="numeric" type="text" pattern="[0-9]*" value={servTxt} onChange={(e) => onServ(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))} aria-invalid={!servValid || tooSmall || overMax} aria-describedby={`${id}-sm`} />
              <button type="button" className={s.stepBtn} aria-label="Tăng số người" onClick={() => onServ(String(Math.min(40, (servValid ? servNum : st.servings) + 1)))}>+</button>
            </div>
          </div>
          <div className={s.opts}>
            {SIZES.map((z) => (
              <label key={z.id} className={s.opt}>
                <input type="radio" name={`${id}-sz`} checked={st.size === z.id} onChange={() => set({ size: z.id })} />
                <span className={s.optBox}><b>{z.label}</b><small>{z.serves[0]} đến {z.serves[1]} người</small></span>
              </label>
            ))}
          </div>
          <div id={`${id}-sm`} className={s.msgWrap} aria-live="polite">
            {servMsg && (
              <p className={s.warn}>
                {servMsg}{" "}
                {rec && (tooSmall || overMax) && rec.id !== st.size && (
                  <button type="button" className={s.linkBtn} onClick={() => set({ size: rec.id })}>Chọn {rec.label}</button>
                )}
              </p>
            )}
            {!servMsg && rec && rec.id !== st.size && <p className={s.hint}>Gợi ý cho {servNum} người: {rec.label}. <button type="button" className={s.linkBtn} onClick={() => set({ size: rec.id })}>Chọn {rec.label}</button></p>}
          </div>
        </fieldset>

        <fieldset className={s.fs}>
          <legend><span className={s.stepNo}>3</span>Lớp kem</legend>
          <div className={s.swatches}>
            {CREAMS.map((c) => (
              <label key={c.id} className={s.swatch}>
                <input type="radio" name={`${id}-cr`} checked={st.cream === c.id} onChange={() => set({ cream: c.id })} />
                <span className={s.swatchBox}><i style={{ background: c.color }} aria-hidden="true" /><b>{c.label}</b></span>
              </label>
            ))}
          </div>
          <div className={s.opts}>
            {FINISHES.map((f) => (
              <label key={f.id} className={s.opt}>
                <input type="radio" name={`${id}-fi`} checked={st.finish === f.id} onChange={() => set({ finish: f.id })} />
                <span className={s.optBox}><b>{f.label}</b><small>{f.note}{f.extra ? ` · +${fmtVnd(f.extra)}` : ""}</small></span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={s.fs}>
          <legend><span className={s.stepNo}>4</span>Chữ viết lên bánh</legend>
          <label htmlFor={`${id}-tx`} className={s.lbl}>Lời chúc (tối đa {TEXT_MAX} ký tự, để trống nếu không viết)</label>
          <input id={`${id}-tx`} className={s.textIn} type="text" maxLength={TEXT_MAX} value={st.text} onChange={(e) => set({ text: e.target.value })} placeholder="Ví dụ: Chúc mừng sinh nhật Mai" autoComplete="off" aria-describedby={`${id}-tc`} />
          <p id={`${id}-tc`} className={s.hint}>{st.text.length}/{TEXT_MAX} ký tự{st.text.trim() ? ", phụ phí viết chữ +" + fmtVnd(20000) : ""}</p>
        </fieldset>

        <fieldset className={s.fs}>
          <legend><span className={s.stepNo}>5</span>Trang trí</legend>
          <div className={s.opts}>
            {DECOS.map((d) => (
              <label key={d.id} className={s.opt}>
                <input type="checkbox" checked={st.decos.includes(d.id)} onChange={() => toggleDeco(d.id)} />
                <span className={s.optBox}><b>{d.label}</b><small>{d.note} · +{fmtVnd(d.extra)}</small></span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className={s.builderSide} aria-label="Bản xem trước và tóm tắt">
        <div className={s.previewCard}>
          <div ref={prev} key={bump} className={s.previewStage} data-bump={bump > 0 ? "1" : "0"}>
            <CakePreview state={st} />
          </div>
        </div>
        <div className={s.summary}>
          <h3 className={`${s.display} ${s.summaryH}`}>Tóm tắt chiếc bánh</h3>
          <ul className={s.sumList}>
            {lines.map((l) => (
              <li key={l.label}><span>{l.label}</span><b>{fmtVnd(l.amount)}</b></li>
            ))}
          </ul>
          <p className={s.total}><span>Giá tham khảo</span><strong>{fmtVnd(total)}</strong></p>
          <p className={s.fine}>Giá tham khảo, tiệm sẽ báo giá chính thức khi xác nhận mẫu bánh. Công cụ này chỉ lưu trên trình duyệt của bạn.</p>
          <div className={s.sumBtns}>
            <button type="button" className={`${s.btn} ${s.btnWhite}`} onClick={() => burstAt(prev.current, 80)}>Thả confetti</button>
            <button type="button" className={`${s.btn} ${s.btnWhite}`} onClick={copy}>Sao chép tóm tắt</button>
          </div>
          <p className={s.hint} role="status" aria-live="polite">
            {copied === "ok" && "Đã sao chép tóm tắt, bạn có thể dán vào form tư vấn."}
            {copied === "fail" && "Chưa sao chép được. Hãy chọn và sao chép phần tóm tắt ở trên."}
          </p>
          <a className={`${s.btn} ${s.btnBig} ${s.btnChoco} ${s.sumCta}`} href={buildConsultHref("tiem-banh")} data-confetti="1">Gửi yêu cầu tư vấn</a>
        </div>
      </aside>
    </div>
  );
}
