"use client";

import { useState } from "react";
import s from "../brand.module.css";
import { SUN_FACTS } from "../data";

export function Sun() {
  const [m, setM] = useState(17 * 60 + 40);
  const p = (m - 15 * 60) / (19.5 * 60 - 15 * 60);
  const a = Math.PI * (1 - p);
  const sx = 200 + Math.cos(a) * 170;
  const sy = 190 - Math.sin(a) * 150;
  const alt = Math.max(0, Math.sin(Math.PI * p) * 42 - 4);
  const warm = Math.sin(Math.PI * p);
  const hh = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  return (
    <section id="gio-vang" className={s.sun} aria-labelledby="su-h">
      <div className={s.sunText}>
        <p className={s.mono}><i className={s.dash} />Nghiệm thu giờ vàng</p>
        <h2 id="su-h">Lỗi nhỏ nhất <em>chỉ lộ ra lúc nắng xiên.</em></h2>
        <p>Một vết nối lệch ba milimét vô hình giữa trưa, nhưng hiện rõ khi mặt trời hạ thấp. Vì thế mọi mặt dựng đều được chúng tôi nghiệm thu bằng nắng thật. Kéo thanh trượt để xem toà nhà đổi màu theo giờ.</p>
        <ul className={s.facts}>{SUN_FACTS.map((x) => (<li key={x.l}><b>{x.v}</b><span>{x.l}</span></li>))}</ul>
      </div>
      <div className={s.sunViz}>
        <svg viewBox="0 0 400 260" role="img" aria-label={`Quỹ đạo mặt trời, lúc ${hh} cao ${alt.toFixed(0)} độ`}>
          <defs>
            <linearGradient id="th-gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={`hsl(${30 + (1 - warm) * 190} ${40 + warm * 40}% ${28 + warm * 34}%)`} /><stop offset="1" stopColor="#141b44" /></linearGradient>
          </defs>
          <path d="M30 190A170 150 0 0 1 370 190" fill="none" stroke="#e8c27a" strokeOpacity=".45" strokeDasharray="3 6" />
          <line x1="10" x2="390" y1="190" y2="190" stroke="#8f9bbd" strokeOpacity=".4" />
          <circle cx={sx} cy={sy} r="16" fill="#ffe4a0" opacity=".25" /><circle cx={sx} cy={sy} r="7" fill="#fff0c4" />
          <g transform="translate(150 70)">
            <rect width="100" height="120" fill="url(#th-gl)" stroke="#e8c27a" strokeOpacity=".4" />
            {Array.from({ length: 6 }).map((_, r) => Array.from({ length: 4 }).map((__, c2) => (<rect key={`${r}-${c2}`} x={8 + c2 * 23} y={8 + r * 18} width="17" height="12" fill={`rgba(255,${200 + ((r + c2) % 3) * 15},${130 + warm * 60},${0.25 + warm * 0.55})`} />)))}
          </g>
        </svg>
        <div className={s.sunCtl}>
          <label htmlFor="th-time">Giờ trong ngày <output htmlFor="th-time">{hh}</output></label>
          <input id="th-time" type="range" min={15 * 60} max={19 * 60 + 30} step={5} value={m} onChange={(e) => setM(Number(e.target.value))} />
          <dl><div><dt>Độ cao mặt trời</dt><dd>{alt.toFixed(1)}°</dd></div><div><dt>Màu kính</dt><dd>{warm > 0.8 ? "Vàng cam" : warm > 0.4 ? "Hổ phách" : "Xanh tím"}</dd></div></dl>
        </div>
      </div>
    </section>
  );
}
