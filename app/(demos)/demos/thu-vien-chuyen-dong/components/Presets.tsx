"use client";
import { useMemo, useState } from "react";
import styles from "../brand.module.css";
import { Poster } from "./Poster";

const CATS = ["Tất cả", "Băng chuyền", "Vòng", "Lưới", "Trường", "Lộ", "Vệt"] as const;
const PRESETS: [string, (typeof CATS)[number], number, string][] = [
  ["Băng chuyền 01", "Băng chuyền", 0, "28 mẫu phụ"], ["Băng chuyền 04", "Băng chuyền", 3, "12 mẫu phụ"], ["Băng chuyền 07", "Băng chuyền", 6, "9 mẫu phụ"],
  ["Vòng 03", "Vòng", 1, "10 thẻ"], ["Vòng 07", "Vòng", 4, "14 thẻ"], ["Vòng 11", "Vòng", 7, "20 thẻ"],
  ["Lưới 02", "Lưới", 2, "6 × 4 ô"], ["Lưới 05", "Lưới", 5, "3 × 3 ô"], ["Lưới 09", "Lưới", 0, "8 × 2 ô"],
  ["Trường 01", "Trường", 6, "48 thẻ"], ["Trường 04", "Trường", 3, "120 thẻ"],
  ["Lộ 03", "Lộ", 1, "5 lớp"], ["Lộ 06", "Lộ", 4, "8 lớp"],
  ["Vệt 02", "Vệt", 7, "3 vệt"], ["Vệt 05", "Vệt", 2, "6 vệt"],
];

export function Presets() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Tất cả");
  const list = useMemo(() => PRESETS.filter((p) => cat === "Tất cả" || p[1] === cat), [cat]);
  return (
    <section id="tm-presets" className={styles.presets} aria-labelledby="tm-h-pre">
      <div className={styles.secHead} data-tm-reveal>
        <p className={styles.eyebrow}>Thư viện mẫu</p>
        <h2 id="tm-h-pre" className={styles.h2d}>Hơn 300 mẫu chuyển động,<br />chọn là chạy.</h2>
      </div>
      <div className={styles.tabs} role="group" aria-label="Lọc theo kiểu chuyển động">
        {CATS.map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <ul className={styles.presetGrid} data-tm-reveal>
        {list.map(([n, , v, m], i) => (
          <li key={n} style={{ ["--d" as string]: `${i * 0.04}s` }}>
            <div className={styles.pThumb}><div className={styles.pStack}><Poster v={v} flat /><Poster v={v + 1} flat /><Poster v={v + 2} flat /></div></div>
            <b>{n}</b><span>{m}</span>
          </li>
        ))}
      </ul>
      <p className={styles.live} role="status">{list.length} mẫu đang hiển thị</p>
    </section>
  );
}
