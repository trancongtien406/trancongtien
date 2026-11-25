"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import {
  BASE_MIN, BASE_PRICE, CHARMS, CHARM_MIN, CHARM_PRICE, LENGTHS, PATTERNS, SHAPES, SWATCHES, swatchById,
  type Charm, type Len, type Pattern, type Shape, type SwatchId,
} from "../data/content";
import { HandSVG, ShapeIcon } from "./HandSVG";
import s from "../brand.module.css";

type St = { shape: Shape | null; length: Len; color: SwatchId | null; pattern: Pattern; accent: SwatchId; charm: Charm; charmCount: number };
const INIT: St = { shape: null, length: "vua", color: null, pattern: "tron", accent: "trang", charm: "khong", charmCount: 2 };
const KEY = "np-builder-v1";
const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
const NB = " ";

function fmtMin(m: number) {
  const h = Math.floor(m / 60), r = m % 60;
  return h ? `${h} giờ${r ? `${NB}${r}${NB}phút` : ""}` : `${r}${NB}phút`;
}

export function Builder() {
  const [st, setSt] = useState<St>(INIT);
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState("");
  const tm = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSt({ ...INIT, ...JSON.parse(raw) });
    } catch { /* bỏ qua */ }
    setReady(true);
    const onPreset = (e: Event) => {
      const d = (e as CustomEvent).detail ?? {};
      setSt((p) => ({ ...p, ...("color" in d ? { color: d.color } : {}), ...("shape" in d ? { shape: d.shape } : {}), ...("length" in d ? { length: d.length } : {}), ...("pattern" in d ? { pattern: d.pattern } : {}), ...("charm" in d ? { charm: d.charm } : {}) }));
    };
    window.addEventListener("np:preset", onPreset);
    return () => window.removeEventListener("np:preset", onPreset);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch { /* bỏ qua */ }
  }, [st, ready]);

  const set = useCallback(<K extends keyof St>(k: K, v: St[K]) => setSt((p) => ({ ...p, [k]: v })), []);

  const missing = [!st.shape && "dáng móng", !st.color && "màu gốc"].filter(Boolean) as string[];
  const complete = missing.length === 0;
  const pat = PATTERNS.find((p) => p.id === st.pattern)!;
  const shp = SHAPES.find((p) => p.id === st.shape);
  const len = LENGTHS.find((p) => p.id === st.length)!;
  const cm = st.charm === "khong" ? 0 : st.charmCount;
  const base = st.color ? swatchById(st.color) : null;
  const acc = swatchById(st.accent);

  const plan = useMemo(() => {
    if (!complete || !shp || !base) return null;
    const lowK = BASE_PRICE + shp.price + len.price + pat.price + cm * CHARM_PRICE;
    const high = Math.ceil((lowK * 1.15) / 10) * 10;
    const mins = BASE_MIN + shp.min + len.min + pat.min + cm * CHARM_MIN;
    const charmName = CHARMS.find((c) => c.id === st.charm)!.name.toLowerCase();
    const steps = [
      "Làm sạch viền móng, dũa tạo dáng " + shp.name.toLowerCase(),
      ...(st.length === "dai" ? ["Đắp gel tạo độ dài, dũa lại form"] : st.length === "vua" ? ["Nối nhẹ phần đầu móng cho đủ độ dài vừa"] : []),
      "Phủ lớp nền, sấy đèn",
      `Lên màu gốc ${base.name.toLowerCase()}, hai lớp, sấy từng lớp`,
      ...(st.pattern === "ombre" ? [`Loang ombre sang ${acc.name.toLowerCase()}`] : []),
      ...(st.pattern === "french" ? [`Vẽ viền đầu móng màu ${acc.name.toLowerCase()}`] : []),
      ...(st.pattern === "cham" ? [`Chấm bi màu ${acc.name.toLowerCase()} từng móng`] : []),
      ...(st.pattern === "chrome" ? ["Tán bột chrome tráng gương"] : []),
      ...(cm ? [`Đính ${cm} charm ${charmName}`] : []),
      "Phủ lớp bóng cuối, sấy và dưỡng viền móng",
    ];
    return { low: lowK * 1000, high: high * 1000, mins, steps };
  }, [complete, shp, base, len, pat, cm, st.charm, st.length, st.pattern, acc]);

  const colors = Array(5).fill(base ? base.hex : "#f1c4b0") as string[];
  const summary = plan
    ? [
        "Bộ móng tại Chấm Chanh",
        `Dáng: ${shp!.name}, độ dài ${len.name.toLowerCase()}`,
        `Màu gốc: ${base!.name}`,
        `Hoạ tiết: ${pat.name}${pat.accent ? ` (màu phụ ${acc.name.toLowerCase()})` : ""}`,
        `Charm: ${cm ? `${cm} × ${CHARMS.find((c) => c.id === st.charm)!.name.toLowerCase()}` : "không"}`,
        `Thời gian ước tính: ${fmtMin(plan.mins)}`,
        `Giá tham khảo: ${money.format(plan.low)} – ${money.format(plan.high)}`,
        "Lưu ý: báo trước nếu bạn dị ứng hoá chất.",
      ].join("\n")
    : "";

  const copy = async () => {
    window.clearTimeout(tm.current);
    try { await navigator.clipboard.writeText(summary); setMsg("Đã sao chép bản tóm tắt."); }
    catch { setMsg("Chưa sao chép được. Hãy bôi đen và chép tay phần tóm tắt."); }
    tm.current = window.setTimeout(() => setMsg(""), 3500);
  };

  const swatchRow = (value: SwatchId | null, onPick: (v: SwatchId) => void, label: string) => (
    <div className={s.swatchesLg} role="radiogroup" aria-label={label}>
      {SWATCHES.map((c) => (
        <button key={c.id} type="button" role="radio" aria-checked={value === c.id} aria-label={c.name} title={c.name} className={s.swatch} data-on={value === c.id ? "1" : "0"} style={{ background: c.hex }} onClick={() => onPick(c.id)} />
      ))}
    </div>
  );

  return (
    <div className={s.builder} id="builder-tool">
      <div className={s.builderForm}>
        <fieldset className={s.fs}>
          <legend>1. Dáng móng <em>(bắt buộc)</em></legend>
          <div className={s.shapeGrid}>
            {SHAPES.map((x) => (
              <label key={x.id} className={s.opt} data-on={st.shape === x.id ? "1" : "0"}>
                <input type="radio" name="np-shape" checked={st.shape === x.id} onChange={() => set("shape", x.id)} />
                <ShapeIcon shape={x.id} />
                <b>{x.name}</b>
                <small>{x.note}</small>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className={s.fs}>
          <legend>2. Độ dài</legend>
          <div className={s.pills}>
            {LENGTHS.map((x) => (
              <label key={x.id} className={s.pill} data-on={st.length === x.id ? "1" : "0"}>
                <input type="radio" name="np-len" checked={st.length === x.id} onChange={() => set("length", x.id)} />{x.name}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className={s.fs}>
          <legend>3. Màu gốc <em>(bắt buộc)</em></legend>
          {swatchRow(st.color, (v) => set("color", v), "Màu gốc")}
          <p className={s.pickName}>{base ? base.name : "Chưa chọn màu"}</p>
        </fieldset>
        <fieldset className={s.fs}>
          <legend>4. Hoạ tiết</legend>
          <div className={s.pills}>
            {PATTERNS.map((x) => (
              <label key={x.id} className={s.pill} data-on={st.pattern === x.id ? "1" : "0"} title={x.note}>
                <input type="radio" name="np-pat" checked={st.pattern === x.id} onChange={() => set("pattern", x.id)} />{x.name}
              </label>
            ))}
          </div>
          <p className={s.hint}>{pat.note}</p>
          {pat.accent && (
            <div className={s.accentBox}>
              <p className={s.subLabel}>Màu phụ: {acc.name}</p>
              {swatchRow(st.accent, (v) => set("accent", v), "Màu phụ")}
            </div>
          )}
        </fieldset>
        <fieldset className={s.fs}>
          <legend>5. Charm</legend>
          <div className={s.pills}>
            {CHARMS.map((x) => (
              <label key={x.id} className={s.pill} data-on={st.charm === x.id ? "1" : "0"}>
                <input type="radio" name="np-charm" checked={st.charm === x.id} onChange={() => set("charm", x.id)} />{x.name}
              </label>
            ))}
          </div>
          {st.charm !== "khong" && (
            <div className={s.stepper} role="group" aria-label="Số móng đính charm">
              <button type="button" className={s.stepBtn} aria-label="Bớt một charm" disabled={st.charmCount <= 1} onClick={() => set("charmCount", st.charmCount - 1)}>−</button>
              <output aria-live="polite">{st.charmCount} móng đính charm</output>
              <button type="button" className={s.stepBtn} aria-label="Thêm một charm" disabled={st.charmCount >= 5} onClick={() => set("charmCount", st.charmCount + 1)}>+</button>
            </div>
          )}
        </fieldset>
      </div>

      <aside className={s.builderPreview} aria-label="Bộ móng của bạn">
        <div className={s.previewHand} data-built={complete ? "1" : "0"}>
          <div className={s.previewDots} aria-hidden="true" />
          <HandSVG
            colors={colors} accent={acc.hex} shape={st.shape ?? "vuong"} length={st.length} pattern={complete ? st.pattern : "tron"}
            charm={complete ? st.charm : "khong"} charmCount={cm} sparkle={complete}
            label={complete ? `Bàn tay xem trước: móng ${shp!.name.toLowerCase()}, màu ${base!.name.toLowerCase()}, hoạ tiết ${pat.name.toLowerCase()}` : "Bàn tay xem trước, chưa chọn dáng và màu"}
          />
        </div>
        {!plan ? (
          <div className={s.emptyPlan}>
            <p><b>Chưa đủ thông tin.</b> Còn thiếu: {missing.join(", ")}.</p>
            <p>Chọn xong hai mục này, bàn tay sẽ hiện đúng bộ móng và bạn sẽ thấy thời gian, giá tham khảo và các bước.</p>
          </div>
        ) : (
          <div className={s.plan}>
            <dl className={s.stats}>
              <div><dt>Thời gian</dt><dd>{fmtMin(plan.mins)}</dd></div>
              <div><dt>Giá tham khảo</dt><dd>{money.format(plan.low)} – {money.format(plan.high)}</dd></div>
            </dl>
            <h3 className={s.planH}>Các bước thực hiện</h3>
            <ol className={s.planSteps}>{plan.steps.map((x) => <li key={x}>{x}</li>)}</ol>
            <p className={s.allergy} role="note"><b>Dị ứng?</b> Báo trước nếu bạn dị ứng hoá chất, keo hoặc gel. Giá chưa gồm phụ phí thiết kế đặc biệt, tụi mình sẽ báo lại khi tư vấn.</p>
            <div className={s.planActions}>
              <a className={`${s.btn} ${s.btnPink} ${s.btnBig}`} href={buildConsultHref("nail-pop")}>Gửi yêu cầu tư vấn</a>
              <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={copy}>Sao chép tóm tắt</button>
            </div>
          </div>
        )}
        <div className={s.planFoot}>
          <p role="status" className={s.status}>{msg}</p>
          <button type="button" className={s.reset} onClick={() => { setSt(INIT); setMsg(""); }}>Làm lại từ đầu</button>
        </div>
      </aside>
    </div>
  );
}
