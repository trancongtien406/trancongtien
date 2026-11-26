"use client";

import { useState } from "react";
import s from "../brand.module.css";
import { FLIGHTS, type Flight as FlightT } from "../data/venue";
import { vnd } from "../data/wines";

const COLOR: Record<string, [string, string]> = {
  "sui-1": ["#f1dc96", "#d9b95c"],
  "trang-1": ["#e6d57a", "#c9b24e"],
  "trang-2": ["#e2c060", "#c39a38"],
  "hong-1": ["#eea0ad", "#cf6f84"],
  "do-1": ["#b3314a", "#7d1630"],
  "do-2": ["#8c1a36", "#5b0c22"],
  "do-3": ["#5a0f26", "#2e0614"],
};
const colorOf = (g: FlightT["glasses"][number]) => COLOR[`${g.kind}-${g.body}`] ?? COLOR["do-2"];

/** Khay thử rượu: chọn một set, các ly nhỏ trên khay gỗ được rót đầy lần lượt từ trái sang phải (ly 1 nhẹ nhất). */
export function Flight() {
  const [id, setId] = useState(FLIGHTS[0].id);
  const f = FLIGHTS.find((x) => x.id === id)!;
  const n = f.glasses.length;
  const gap = n === 4 ? 92 : 112;
  const x0 = 200 - ((n - 1) * gap) / 2;
  return (
    <section className={s.flight} id="thu-ruou" aria-labelledby="rv-flight-h" data-testid="flight">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Set thử rượu</p>
          <h2 id="rv-flight-h" className={s.h2} data-rv="rv">Ba ly nhỏ, ba cách nhìn một phong cách.</h2>
          <p className={s.mutedP}>Mỗi set là ba hoặc bốn ly 60 ml, sắp từ nhẹ đến đậm để vị giác đi một đường thẳng. Chọn set rồi xem khay được rót.</p>
        </header>
        <div className={s.flightGrid}>
          <div className={s.flightPick} role="radiogroup" aria-label="Chọn set thử rượu">
            {FLIGHTS.map((x) => (
              <button key={x.id} type="button" role="radio" aria-checked={x.id === id} className={s.flightOpt} onClick={() => setId(x.id)}>
                <span className={s.flightName}>{x.name}</span>
                <span className={s.flightSub}>{x.sub}</span>
                <span className={s.flightPrice}>{vnd(x.price)}</span>
              </button>
            ))}
          </div>
          <div className={s.flightBoard}>
            <svg viewBox="0 0 400 250" className={s.flightSvg} aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="rv-wood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7a4b26" />
                  <stop offset="1" stopColor="#4a2814" />
                </linearGradient>
                {f.glasses.map((g, i) => {
                  const [a, b] = colorOf(g);
                  return (
                    <linearGradient key={`${id}-${i}`} id={`rv-fl-${id}-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor={a} />
                      <stop offset="1" stopColor={b} />
                    </linearGradient>
                  );
                })}
                <clipPath id="rv-cup"><path d="M-22 -70H22C24 -30 14 -6 0 0C-14 -6 -24 -30 -22 -70z" /></clipPath>
              </defs>
              <rect x="20" y="168" width="360" height="52" rx="8" fill="url(#rv-wood)" stroke="#c08a4a" strokeOpacity=".5" />
              <path d="M40 186H360M40 202H360" stroke="#2e180c" strokeWidth="1" opacity=".6" />
              {f.glasses.map((g, i) => (
                <g key={`${id}-${i}`} transform={`translate(${x0 + i * gap} 160)`}>
                  <g clipPath="url(#rv-cup)">
                    <rect className={s.flightLiquid} x="-30" y="-48" width="60" height="50" fill={`url(#rv-fl-${id}-${i})`} style={{ animationDelay: `${0.25 + i * 0.35}s` }} />
                  </g>
                  <path d="M-22 -70H22C24 -30 14 -6 0 0C-14 -6 -24 -30 -22 -70z" fill="rgba(240,228,207,.07)" stroke="#e8d3ac" strokeWidth="1.6" />
                  <path d="M0 0V8M-14 10c8 5 20 5 28 0" fill="none" stroke="#e8d3ac" strokeWidth="1.6" strokeLinecap="round" />
                  <text y="38" textAnchor="middle" fontSize="15" fill="#e2b678" fontFamily="serif">{i + 1}</text>
                </g>
              ))}
            </svg>
            <ol className={s.flightList} data-testid="flight-list">
              {f.glasses.map((g, i) => (
                <li key={`${id}-${i}`}><b>{i + 1}</b><span>{g.label}</span></li>
              ))}
            </ol>
            <p className={s.mutedSmall}>{f.note}</p>
            <a className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} href="#dat-ban">Đặt bàn và gọi {f.name.toLowerCase()}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
