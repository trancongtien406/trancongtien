"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { Gem } from "./Gem";

const STONES = [
  { id: "sap", name: "Sapphire", hue: 218, sat: 72, base: 18000000, note: "Xanh thẫm, sáng sâu" },
  { id: "aqua", name: "Aquamarine", hue: 188, sat: 62, base: 9000000, note: "Xanh biển nhạt, trong" },
  { id: "morg", name: "Morganite", hue: 22, sat: 66, base: 12000000, note: "Hồng champagne, ấm" },
  { id: "dia", name: "Kim cương", hue: 205, sat: 18, base: 52000000, note: "Không màu, lửa mạnh" },
];

export function Lab() {
  const [id, setId] = useState("sap");
  const [ct, setCt] = useState(1.2);
  const s = STONES.find((x) => x.id === id) ?? STONES[0];
  const price = Math.round((s.base * Math.pow(ct, 1.7)) / 100000) * 100000;
  return (
    <div className={styles.lab}>
      <div className={styles.labStage}>
        <div style={{ transform: `scale(${0.62 + ct * 0.13})`, transition: "transform .5s cubic-bezier(.2,.7,.2,1)" }} className={styles.labGem}>
          <Gem hue={s.hue} sat={s.sat} label={`Viên ${s.name} minh hoạ ${ct.toFixed(1)} carat`} />
        </div>
        <p className={styles.labHint} aria-hidden="true">Di chuyển con trỏ để nghiêng viên đá</p>
      </div>
      <div className={styles.labCtl}>
        <fieldset>
          <legend>Loại đá</legend>
          <div className={styles.stones}>
            {STONES.map((x) => (
              <label key={x.id}>
                <input type="radio" name="tt-stone" checked={id === x.id} onChange={() => setId(x.id)} />
                <span><i style={{ background: `hsl(${x.hue} ${x.sat}% 55%)` }} aria-hidden="true" /><b>{x.name}</b><small>{x.note}</small></span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className={styles.carat}>
          <label htmlFor="tt-ct">Trọng lượng <output htmlFor="tt-ct">{ct.toFixed(1)} ct</output></label>
          <input id="tt-ct" type="range" min="0.5" max="3" step="0.1" value={ct} onChange={(e) => setCt(Number(e.target.value))} />
        </div>
        <p className={styles.est}>Giá tham khảo <b>{price.toLocaleString("vi-VN")}đ</b><small>Con số giả định để minh hoạ, không phải bảng giá thật.</small></p>
      </div>
    </div>
  );
}
