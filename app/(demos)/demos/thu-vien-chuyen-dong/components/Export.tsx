"use client";
import { useState } from "react";
import styles from "../brand.module.css";
import { Poster } from "./Poster";

const RATIOS: [string, number][] = [["3:4", 3 / 4], ["4:5", 4 / 5], ["9:16", 9 / 16], ["1:1", 1], ["4:3", 4 / 3], ["16:9", 16 / 9]];
const RES = ["720p", "1080p", "2K", "4K"];
const FPS = ["24", "25", "30", "60"];

export function Export() {
  const [r, setR] = useState(5);
  const [res, setRes] = useState(3);
  const [fps, setFps] = useState(3);
  const ar = RATIOS[r][1];
  const pro = res >= 3 || fps >= 3;
  return (
    <section id="tm-export" className={styles.export} aria-labelledby="tm-h-exp">
      <div className={styles.expL}>
        <h2 id="tm-h-exp" className={styles.h2xl}>Làm một lần.<br />→ Gửi đi khắp nơi</h2>
        <div className={styles.chipRow}>
          <div className={styles.seg} role="group" aria-label="Tỉ lệ khung hình">{RATIOS.map(([n], i) => <button key={n} type="button" aria-pressed={r === i} onClick={() => setR(i)}>{n}</button>)}</div>
        </div>
        <div className={styles.chipRow}>
          <div className={styles.seg} role="group" aria-label="Độ phân giải">{RES.map((n, i) => <button key={n} type="button" aria-pressed={res === i} onClick={() => setRes(i)}>{n}</button>)}</div>
          <div className={styles.seg} role="group" aria-label="Tốc độ khung hình">{FPS.map((n, i) => <button key={n} type="button" aria-pressed={fps === i} onClick={() => setFps(i)}>{n}</button>)}</div>
          <span className={styles.fmt}>MP4 hoặc WebM</span>
        </div>
        <p className={styles.expNote} role="status">{pro ? "Độ phân giải 4K hoặc 60 khung/giây dành cho gói Pro." : "Xuất được ngay ở gói miễn phí."}</p>
        <div className={styles.expP}>
          <p>Dựng cho những nơi thiết kế được nhìn thấy: bảng tin, portfolio, case study, ngày ra mắt.</p>
          <p>Xuất theo định dạng mạng xã hội, tới 4K ở 60 khung/giây với gói Pro.</p>
        </div>
      </div>
      <div className={styles.expR}>
        <i className={styles.dash1} aria-hidden="true" /><i className={styles.dash2} aria-hidden="true" />
        <div className={styles.expFrame} style={{ aspectRatio: String(ar) }}>
          <div className={styles.expRing} aria-hidden="true">{Array.from({ length: 14 }, (_, i) => i).map((i) => <Poster key={i} v={i} flat style={{ ["--i" as string]: i }} />)}</div>
          <span className={styles.expTag}>{RATIOS[r][0]} · {RES[res]} · {FPS[fps]} fps</span>
        </div>
      </div>
    </section>
  );
}
