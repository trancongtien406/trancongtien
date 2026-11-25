"use client";

import { useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { GLAZES, PATTERNS, SHAPES, type Pattern, type Shape } from "../lib/pot";
import { Engrave } from "./Engrave";
import { Pot } from "./Pot";

const CONSULT = buildConsultHref("gom-lo");
const SUGGEST: Record<Shape, string> = {
  bau: "Xoay Đất (bàn xoay), 120 phút",
  cao: "Xoay Đất (bàn xoay), 120 phút",
  lo: "Xoay Đất (bàn xoay), 120 phút",
  coc: "Chạm Đất (nặn tay), 90 phút, hoặc Xoay Đất",
  bat: "Chạm Đất (nặn tay), 90 phút",
};

export function Designer() {
  const [shape, setShape] = useState<Shape>("bau");
  const [bulge, setBulge] = useState(0.62);
  const [neck, setNeck] = useState(0.5);
  const [glazeId, setGlazeId] = useState("ngoc");
  const [pattern, setPattern] = useState<Pattern>("van");
  const [dip, setDip] = useState(false);
  const [msg, setMsg] = useState("");

  const glaze = GLAZES.find((g) => g.id === glazeId) ?? GLAZES[0];
  const sh = SHAPES.find((x) => x.id === shape) ?? SHAPES[0];
  const pt = PATTERNS.find((p) => p.id === pattern) ?? PATTERNS[0];
  const code = `DM-${sh.code}-${Math.round(bulge * 100)}-${Math.round(neck * 100)}-${glaze.code}-${pt.code}-${dip ? "N" : "K"}`;

  const reset = () => { setShape("bau"); setBulge(0.62); setNeck(0.5); setGlazeId("ngoc"); setPattern("van"); setDip(false); setMsg(""); };
  async function copy() {
    try { await navigator.clipboard.writeText(code); setMsg("Đã chép mã " + code); } catch { setMsg("Không chép được, bạn hãy ghi lại mã: " + code); }
  }

  return (
    <section id="nan-binh" className={s.designer} aria-labelledby="pd-title">
      <div className={s.wrap}>
        <div className={s.pdHead}>
          <div>
            <p className={s.hand}>Nặn bình</p>
            <Engrave as="h2" id="pd-title" className={s.h2}>Nặn thử một chiếc bình trước khi chạm đất thật.</Engrave>
          </div>
          <p className={s.lead}>Chọn dáng, kéo độ phình, phủ men và hoạ tiết. Chiếc bình quay trên bàn xoay sẽ đổi hình theo từng lựa chọn, kèm một mã để bạn đưa cho người hướng dẫn.</p>
        </div>

        <div className={s.pdGrid}>
          <div className={s.pdStage}>
            <Pot className={s.pdPot} shape={shape} bulge={bulge} neck={neck} glaze={glaze} pattern={pattern} dip={dip} onNudge={(d) => setBulge((b) => Math.min(1, Math.max(0, b + d)))} label={`Bình ${sh.name.toLowerCase()} men ${glaze.name.toLowerCase()}, hoạ tiết ${pt.name.toLowerCase()}`} />
            <p className={s.pdCode} aria-live="polite"><span>Mã sản phẩm</span><b>{code}</b></p>
          </div>

          <form className={s.pdForm} onSubmit={(e) => e.preventDefault()} aria-label="Tuỳ chỉnh chiếc bình">
            <fieldset className={s.fieldset}>
              <legend>Hình dáng</legend>
              <div className={s.chips}>
                {SHAPES.map((x) => (
                  <label key={x.id} className={`${s.chip} ${shape === x.id ? s.chipOn : ""}`} title={x.note}>
                    <input type="radio" name="shape" checked={shape === x.id} onChange={() => setShape(x.id)} />{x.name}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={s.sliders}>
              <label className={s.slider}>
                <span className={s.sliderTop}><span>Độ phình</span><output>{Math.round(bulge * 100)}%</output></span>
                <input className={s.range} type="range" min={0} max={100} value={Math.round(bulge * 100)} onChange={(e) => setBulge(Number(e.target.value) / 100)} aria-valuetext={`${Math.round(bulge * 100)} phần trăm`} />
              </label>
              <label className={s.slider}>
                <span className={s.sliderTop}><span>Cổ bình</span><output>{neck < 0.4 ? "Thắt" : neck > 0.6 ? "Mở" : "Vừa"}</output></span>
                <input className={s.range} type="range" min={0} max={100} value={Math.round(neck * 100)} onChange={(e) => setNeck(Number(e.target.value) / 100)} aria-valuetext={neck < 0.4 ? "Thắt" : neck > 0.6 ? "Mở" : "Vừa"} />
              </label>
            </div>

            <fieldset className={s.fieldset}>
              <legend>Men</legend>
              <div className={s.swatches}>
                {GLAZES.map((g) => (
                  <label key={g.id} className={`${s.swatch} ${glazeId === g.id ? s.swatchOn : ""}`}>
                    <input type="radio" name="glaze" checked={glazeId === g.id} onChange={() => setGlazeId(g.id)} />
                    <i style={{ background: `radial-gradient(circle at 32% 28%, ${g.lite}, ${g.base} 55%, ${g.dark})` }} aria-hidden="true" />
                    <span>{g.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={s.wsRow}>
              <fieldset className={s.fieldset}>
                <legend>Cách phủ men</legend>
                <div className={s.chips}>
                  <label className={`${s.chip} ${!dip ? s.chipOn : ""}`}><input type="radio" name="dip" checked={!dip} onChange={() => setDip(false)} />Phủ kín</label>
                  <label className={`${s.chip} ${dip ? s.chipOn : ""}`}><input type="radio" name="dip" checked={dip} onChange={() => setDip(true)} />Nhúng nửa thân</label>
                </div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <legend>Hoạ tiết</legend>
                <div className={s.chips}>
                  {PATTERNS.map((p) => (
                    <label key={p.id} className={`${s.chip} ${pattern === p.id ? s.chipOn : ""}`}>
                      <input type="radio" name="pattern" checked={pattern === p.id} onChange={() => setPattern(p.id)} />{p.name}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className={s.pdResult}>
              <p><b>Gợi ý buổi làm:</b> {SUGGEST[shape]}.</p>
              <p className={s.fine}>Màu men thật có thể lệch so với hình xem trước vì còn tuỳ lần nung.</p>
              <div className={s.sumActions}>
                <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={copy}>Chép mã</button>
                <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={reset}>Nặn lại từ đầu</button>
                <a className={s.btn} href={CONSULT}>Hỏi xưởng về bình này</a>
              </div>
              <p className={s.fine} role="status">{msg}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
