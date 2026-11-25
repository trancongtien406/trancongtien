"use client";

import { useRef } from "react";
import Image from "next/image";
import { ROOM_INFO } from "../data/content";
import { photoSrc } from "./Photo";
import { useStay } from "./Provider";
import styles from "../brand.module.css";

export function Rooms() {
  const { room, setRoom } = useStay();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const idx = Math.max(0, ROOM_INFO.findIndex((r) => r.id === room));
  const cur = ROOM_INFO[idx];

  function onKey(e: React.KeyboardEvent, i: number) {
    const n = ROOM_INFO.length;
    let t = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") t = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") t = (i - 1 + n) % n;
    else if (e.key === "Home") t = 0;
    else if (e.key === "End") t = n - 1;
    if (t >= 0) { e.preventDefault(); setRoom(ROOM_INFO[t].id); tabs.current[t]?.focus(); }
  }

  return (
    <section className={styles.rooms} id="phong" aria-labelledby="rooms-h">
      <div className={styles.roomsStage}>
        <div className={styles.roomsImgs}>
        {ROOM_INFO.map((r, i) => (
          <div key={r.id} className={styles.roomImg} data-on={i === idx} aria-hidden="true">
            <Image src={photoSrc(r.image)} alt="" fill sizes="100vw" quality={70} style={{ objectFit: "cover", objectPosition: r.pos }} />
          </div>
        ))}
        <div className={styles.roomsShade} aria-hidden="true" />
        </div>

        <div className={styles.roomsHead}>
          <p className={styles.eyebrowLight}>03 / Phòng nghỉ</p>
          <h2 id="rooms-h" className={styles.h2Light}>Những khoảng riêng.</h2>
        </div>

        <div className={styles.roomPlate} role="tabpanel" id="room-panel" aria-labelledby={`room-tab-${cur.id}`} data-hm="room-plate" key={cur.id}>
          <p className={styles.eyebrowLight}>{cur.kind}</p>
          <h3 className={styles.roomName}>{cur.name}</h3>
          <p className={styles.roomMeta}>{cur.meta}</p>
          <p className={styles.roomText}>{cur.text}</p>
          <ul className={styles.roomBul}>{cur.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          <div className={styles.roomFoot}>
            <p className={styles.roomFrom}>{cur.from}</p>
            <a className={styles.btnLight} href="#lich-gia">Xem lịch & tính chi phí</a>
          </div>
        </div>

        <div className={styles.roomTabs} role="tablist" aria-label="Loại phòng" aria-orientation="vertical">
          {ROOM_INFO.map((r, i) => (
            <button
              key={r.id}
              ref={(el) => { tabs.current[i] = el; }}
              type="button"
              role="tab"
              id={`room-tab-${r.id}`}
              aria-selected={i === idx}
              aria-controls="room-panel"
              tabIndex={i === idx ? 0 : -1}
              className={styles.roomTab}
              onClick={() => setRoom(r.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className={styles.roomTabNo}>0{i + 1}</span>
              <span className={styles.roomTabName}>{r.name}</span>
              <span className={styles.roomTabMeta}>{r.meta.split(" · ").slice(-1)[0]}</span>
            </button>
          ))}
        </div>
      </div>
      <p className={styles.legalBand}>Giá &ldquo;từ&rdquo; áp dụng cho đêm ngày thường mùa thấp. Giá, thông số phòng và tình trạng phòng chỉ mang tính tham khảo.</p>
    </section>
  );
}
