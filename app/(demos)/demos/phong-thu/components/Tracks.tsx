"use client";

import { useEffect, useRef, useState } from "react";
import { TextScramble, CursorSpotlight } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { TRACKS, vnd } from "../data/content";
import { getKind } from "../lib/estimator";
import { clamp01, hash } from "../lib/frame";
import { Fader } from "./Fader";
import { ClipWave, Vu } from "./Viz";

const db = (v: number) => (v <= 0 ? "−∞ dB" : `${(20 * Math.log10(v / 75)).toLocaleString("vi-VN", { maximumFractionDigits: 1, signDisplay: "exceptZero" })} dB`.replace("-", "−"));

function Row({ t, i, anySolo, solo, onSolo }: { t: (typeof TRACKS)[number]; i: number; anySolo: boolean; solo: boolean; onSolo: () => void }) {
  const [v, setV] = useState(72 - i * 3);
  const [mute, setMute] = useState(false);
  const off = mute || (anySolo && !solo);
  const lvl = useRef({ v: 0, off: false });
  useEffect(() => { lvl.current = { v, off }; });
  const k = getKind(t.kind);
  return (
    <li className={s.track} data-off={off || undefined} data-solo={solo || undefined}>
      <div className={s.trName}>
        <span className={`${s.mono} ${s.trCh}`}>{t.ch} · {t.tag}</span>
        <h3 className={s.h3}><TextScramble trigger="view" duration={0.8}>{t.name}</TextScramble></h3>
        <p className={s.trDesc}>{t.desc}</p>
        <ul className={s.trInc}>{t.inc.map((x) => (<li key={x}>{x}</li>))}</ul>
      </div>
      <div className={s.trClip} aria-hidden="true"><ClipWave seed={t.seed} gain={v / 100} muted={off} className={s.trCanvas} /></div>
      <div className={s.trCtl}>
        <div className={s.trBtns}>
          <button type="button" className={s.msBtn} aria-pressed={mute} aria-label={`Tắt tiếng kênh ${t.name}`} onClick={() => setMute((m) => !m)}>M</button>
          <button type="button" className={s.msBtn} aria-pressed={solo} aria-label={`Nghe riêng kênh ${t.name}`} onClick={onSolo} data-solo-btn>S</button>
        </div>
        <Fader value={v} onChange={setV} label={`Mức kênh ${t.name}`} valueText={db} className={s.trFader} />
        <output className={`${s.mono} ${s.trDb}`}>{db(v)}</output>
        <Vu className={s.trVu} seed={t.seed} level={() => { const { v: g, off: o } = lvl.current; return o ? 0.02 : clamp01((g / 100) * (0.55 + 0.45 * hash(Math.floor(performance.now() / 120) + t.seed))); }} />
      </div>
      <p className={s.trPrice}><span className={s.mono}>Giá tham khảo</span><b>Từ {vnd(k.rateEng)}</b><span>mỗi giờ{k.rateSelf ? `, tự thu từ ${vnd(k.rateSelf)}` : ""}</span></p>
    </li>
  );
}

export function Tracks() {
  const [solo, setSolo] = useState<string | null>(null);
  return (
    <CursorSpotlight className={s.mixerWrap} radius={340} color="rgba(255,138,31,0.10)">
      <ol className={s.tracks} aria-label="Các kênh dịch vụ">
        {TRACKS.map((t, i) => (
          <Row key={t.kind} t={t} i={i} anySolo={solo !== null} solo={solo === t.kind} onSolo={() => setSolo((c) => (c === t.kind ? null : t.kind))} />
        ))}
      </ol>
      <p className={s.mixHint}>Kéo fader, bấm M để tắt tiếng, S để nghe riêng một kênh. Giá hiển thị là giá tham khảo theo giờ.</p>
    </CursorSpotlight>
  );
}
