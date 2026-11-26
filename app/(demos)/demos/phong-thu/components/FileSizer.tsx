"use client";

import { useState } from "react";
import s from "../brand.module.css";
import { DELIVERY } from "../data/content";
import { Fader } from "./Fader";

const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
const size = (mb: number) => (mb >= 1000
  ? `${(mb / 1000).toLocaleString("vi-VN", { maximumFractionDigits: 2 })} GB`
  : `${mb.toLocaleString("vi-VN", { maximumFractionDigits: 1 })} MB`);

/** Máy tính dung lượng file giao: độ dài bài + số stem, tính từ bitrate thật của từng định dạng. */
export function FileSizer() {
  const [sec, setSec] = useState(210);
  const [stems, setStems] = useState(8);
  const mb = (kbps: number, n = 1) => (kbps * 1000 * sec * n) / 8 / 1e6;
  const rows = [
    ...DELIVERY.formats.map((f) => ({ id: f.id, name: f.name, note: f.note, v: mb(f.kbps) })),
    ...(stems > 0 ? [{ id: "stem", name: `Bộ stem WAV 24-bit (${stems} file)`, note: "Từng nhóm nhạc cụ hoặc giọng thành file riêng, để bạn tự phối lại hoặc gửi đơn vị khác.", v: mb(2304, stems) }] : []),
  ];
  const top = Math.max(...rows.map((r) => r.v));
  return (
    <div className={s.sizer} data-pt="sizer">
      <div className={s.sizerCtl}>
        <h3 className={s.estTitle}><span className={s.mono}>FILE</span> Dung lượng file giao</h3>
        <div className={s.field}>
          <div className={s.fieldHead}>
            <label htmlFor="pt-sz-len" className={s.fieldLabel}>Độ dài bài</label>
            <output className={`${s.mono} ${s.fieldVal}`} htmlFor="pt-sz-len">{mmss(sec)} phút</output>
          </div>
          <Fader id="pt-sz-len" value={sec} min={30} max={600} step={15} onChange={setSec} label="Độ dài bài" valueText={(v) => `${mmss(v)} phút`} className={s.estFader} />
        </div>
        <div className={s.field}>
          <div className={s.fieldHead}>
            <label htmlFor="pt-sz-stem" className={s.fieldLabel}>Số file stem</label>
            <output className={`${s.mono} ${s.fieldVal}`} htmlFor="pt-sz-stem">{stems} file</output>
          </div>
          <Fader id="pt-sz-stem" value={stems} min={0} max={24} step={1} onChange={setStems} label="Số file stem" valueText={(v) => `${v} file`} className={s.estFader} />
          <p className={s.fieldHint}>Stem là từng nhóm tiếng (giọng, trống, bass...) xuất riêng. Bản stereo tính cho 44.1 kHz hai kênh.</p>
        </div>
      </div>
      <ul className={s.sizerOut} aria-live="polite">
        {rows.map((r) => (
          <li key={r.id} className={s.sizerRow}>
            <div className={s.sizerHead}><b>{r.name}</b><span className={`${s.mono} ${s.sizerVal}`}>{size(r.v)}</span></div>
            <i className={s.sizerBar} aria-hidden="true"><em style={{ transform: `scaleX(${Math.max(0.02, r.v / top)})` }} /></i>
            <p>{r.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
