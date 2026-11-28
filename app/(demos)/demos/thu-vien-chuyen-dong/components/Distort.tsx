"use client";
import { useEffect, useState } from "react";
import styles from "../brand.module.css";
import { Poster } from "./Poster";

const MODES = ["Tắt", "Loé sáng", "Lăng kính", "Uốn cong"] as const;
type Mode = (typeof MODES)[number];

/** Bản đồ dịch chuyển (barrel) sinh bằng canvas: kênh R/G lệch theo lập phương khoảng cách tới tâm. */
function makeMap(): string {
  const n = 128, c = document.createElement("canvas"); c.width = c.height = n;
  const x = c.getContext("2d")!, im = x.createImageData(n, n);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const u = (i / (n - 1)) * 2 - 1, v = (j / (n - 1)) * 2 - 1, r2 = u * u + v * v;
    const k = (t: number) => Math.max(0, Math.min(255, 128 + 127 * t * (0.35 + r2 * 0.65)));
    const o = (j * n + i) * 4; im.data[o] = k(-u); im.data[o + 1] = k(-v); im.data[o + 2] = 128; im.data[o + 3] = 255;
  }
  x.putImageData(im, 0, 0);
  return c.toDataURL();
}

export function Distort() {
  const [mode, setMode] = useState<Mode>("Uốn cong");
  const [amt, setAmt] = useState(87);
  const [map, setMap] = useState("");
  useEffect(() => { setMap(makeMap()); }, []);
  const a = amt / 100;
  const filter = mode === "Uốn cong" && map ? "url(#tm-bend)" : mode === "Lăng kính" ? "url(#tm-prism)" : mode === "Loé sáng" ? "saturate(1.15)" : undefined;
  return (
    <section id="tm-distort" className={styles.distort} aria-labelledby="tm-h-distort" data-mode={mode}>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="tm-bend" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          {map && <feImage href={map} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="m" />}
          <feDisplacementMap in="SourceGraphic" in2="m" scale={a * 420} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feColorMatrix in="d" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="r" />
          <feOffset in="r" dx={a * 7} result="ro" />
          <feColorMatrix in="d" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="g" />
          <feColorMatrix in="d" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="b" />
          <feOffset in="b" dx={-a * 7} result="bo" />
          <feBlend in="ro" in2="g" mode="screen" result="rg" />
          <feBlend in="rg" in2="bo" mode="screen" />
        </filter>
        <filter id="tm-prism" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="r" />
          <feOffset in="r" dx={a * 22} dy={a * -4} result="ro" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="g" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="b" />
          <feOffset in="b" dx={-a * 22} dy={a * 4} result="bo" />
          <feBlend in="ro" in2="g" mode="screen" result="rg" />
          <feBlend in="rg" in2="bo" mode="screen" />
        </filter>
      </svg>
      <div className={styles.dGrid} style={{ filter }} aria-hidden="true">
        {Array.from({ length: 35 }, (_, i) => <div key={i}><Poster v={(i * 5 + (i >> 2)) % 8} flat /></div>)}
      </div>
      {mode === "Loé sáng" && <span className={styles.flare} style={{ opacity: 0.25 + a * 0.75 }} aria-hidden="true" />}
      <h2 id="tm-h-distort" className={styles.dH}>Bẻ cong<br /><span>mọi thứ</span></h2>
      <div className={styles.dCtl}>
        <div role="group" aria-label="Hiệu ứng méo" className={styles.pills}>
          {MODES.map((m) => <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>{m}</button>)}
        </div>
        <label className={styles.amount}>Mức độ<input type="range" min={0} max={100} value={amt} onChange={(e) => setAmt(+e.target.value)} aria-valuetext={`${amt} phần trăm`} /><output>{amt}%</output></label>
      </div>
    </section>
  );
}
