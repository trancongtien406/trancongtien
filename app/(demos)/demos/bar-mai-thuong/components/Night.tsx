"use client";

import { useEffect, useState } from "react";
import s from "../brand.module.css";

const STAGES = [
  { from: 17, id: "hoang-hon", name: "Hoàng hôn", sign: "HAPPY HOUR", tone: "amber", time: "17:00 – 19:00", mood: "Trời còn sáng, gió từ biển lên. Đèn tắt gần hết, ghế sân thượng được ưu tiên.", music: "Lounge, acoustic, bossa nhẹ", push: "Cocktail cổ điển đồng giá và mocktail giảm giá." },
  { from: 19, id: "len-den", name: "Lên đèn", sign: "LÊN ĐÈN", tone: "cyan", time: "19:00 – 21:00", mood: "Thành phố sáng đèn, bảng neon bật. Quán đông dần, hợp bữa tối nhẹ và buổi hẹn.", music: "Funk, disco, soul nhẹ", push: "Ly signature và đĩa món nhắm chia cho cả bàn." },
  { from: 21, id: "dem-day", name: "Đêm đầy", sign: "NEON NIGHT", tone: "pink", time: "21:00 – 23:00", mood: "Giờ sôi nhất. Nhạc to dần, các bàn nhóm và góc neon kín chỗ vào cuối tuần.", music: "House, dance, synth (cuối tuần); synth, funk (giữa tuần)", push: "Bàn nhóm, tháp cocktail chia ly và món nhắm nóng." },
  { from: 23, id: "khuya", name: "Khuya", sign: "LAST CALL", tone: "violet", time: "23:00 – đóng cửa", mood: "Nhạc chậm lại, đèn dịu. Gọi ly cuối trước giờ đóng cửa 30 phút.", music: "Mellow, lounge, downtempo", push: "Ly có khói, mocktail trà và nước ấm cho đường về." },
] as const;

const stageOf = (h: number) => (h >= 23 ? 3 : h >= 21 ? 2 : h >= 19 ? 1 : 0);
const fmt = (h: number) => { const hh = Math.floor(h) % 24; return `${String(hh).padStart(2, "0")}:${h % 1 ? "30" : "00"}`; };

function windows() {
  let a = 7;
  const r = () => { a = (a * 1664525 + 1013904223) % 4294967296; return a / 4294967296; };
  const out: { x: number; y: number; k: number }[] = [];
  for (let i = 0; i < 70; i++) out.push({ x: 20 + Math.floor(r() * 740), y: 250 + Math.floor(r() * 110), k: r() });
  return out;
}
const WIN = windows();
const STARS = Array.from({ length: 26 }, (_, i) => ({ x: (i * 97) % 780 + 10, y: ((i * 53) % 150) + 12, r: i % 4 === 0 ? 1.8 : 1.1 }));

export function Night() {
  const [h, setH] = useState(19);
  useEffect(() => {
    const d = new Date(Date.now() + 7 * 3600e3);
    const hr = d.getUTCHours() + (d.getUTCMinutes() >= 30 ? 0.5 : 0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setH(hr >= 17 ? hr : hr < 1 ? 24 : 19);
  }, []);
  const st = stageOf(h);
  const S = STAGES[st];
  const t = (h - 17) / 7;
  const r2 = (v: number) => Math.round(v * 100) / 100;
  const sx = r2(70 + t * 660);
  const sy = r2(270 - Math.sin(Math.PI * t) * 190);
  const lit = r2(Math.min(1, 0.12 + t * 1.05));
  return (
    <section className={s.night} id="nhip-dem" aria-label="Một đêm trên mái">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Một đêm trên mái</p>
          <h2 className={s.h2} data-tm="lit">Từ hoàng hôn đến giờ đóng cửa, quán đổi nhịp bốn lần</h2>
          <p className={s.mutedP}>Kéo thanh giờ để xem ánh sáng, bảng neon, nhạc và ưu đãi trên quầy thay đổi theo từng khung giờ.</p>
        </header>
        <div className={s.nightGrid}>
          <div className={s.scene} data-stage={st} aria-hidden="true">
            {STAGES.map((x, i) => <div key={x.id} className={`${s.sky} ${s[`sky${i}` as keyof typeof s]}`} data-on={i === st ? "1" : undefined} />)}
            <svg viewBox="0 0 800 420" className={s.sceneSvg} focusable="false">
              {STARS.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#fff" opacity={r2(Math.max(0, (t - 0.25) * 1.4) * (i % 2 ? 0.9 : 0.55))} />)}
              <circle cx={sx} cy={sy} r={st === 0 ? 30 : 20} fill={st === 0 ? "#ffb84d" : "#e8e9ff"} opacity={0.95} className={s.sun} />
              <circle cx={sx} cy={sy} r={st === 0 ? 62 : 44} fill={st === 0 ? "#ffb84d" : "#9b5cff"} opacity={0.18} />
              <path d="M0 420V300L40 300 40 262 78 262 78 288 120 288 120 236 168 236 168 292 214 292 214 270 260 270 260 306 310 306 310 252 352 252 352 296 410 296 410 244 462 244 462 288 512 288 512 266 566 266 566 306 620 306 620 232 668 232 668 290 720 290 720 258 764 258 764 300 800 300V420Z" fill="#0a0b16" />
              {WIN.map((w, i) => w.k < lit ? <rect key={i} x={w.x} y={w.y} width="4" height="6" fill={i % 5 === 0 ? "#00e5ff" : "#ffb84d"} opacity={0.85} /> : null)}
              <rect x="300" y="332" width="200" height="12" fill="#12142a" />
              <rect x="310" y="300" width="4" height="34" fill="#1d2040" /><rect x="486" y="300" width="4" height="34" fill="#1d2040" />
              <path d="M310 302Q400 330 490 302" fill="none" stroke="#ffb84d" strokeWidth="1.5" opacity={0.4 + lit * 0.5} />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => <circle key={i} cx={322 + i * 26} cy={r2(308 + Math.sin((i / 6) * Math.PI) * 14)} r="3" fill="#ffd9a0" opacity={0.3 + lit * 0.7} />)}
            </svg>
            <div className={`${s.sign} ${s[`sign_${S.tone}` as keyof typeof s]}`} key={S.id}>{S.sign}</div>
            <div className={s.sceneTime}>{fmt(h)}</div>
          </div>
          <div className={s.nightPanel}>
            <label className={s.nightLabel} htmlFor="tm-hour">Giờ trong đêm <b>{fmt(h)}</b></label>
            <input id="tm-hour" className={s.range} type="range" min={17} max={24} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} aria-valuetext={`${fmt(h)}, khung ${S.name}`} />
            <div className={s.rangeTicks} aria-hidden="true"><span>17:00</span><span>19:00</span><span>21:00</span><span>23:00</span><span>00:00</span></div>
            <div className={s.stageBtns} role="group" aria-label="Chọn khung giờ">
              {STAGES.map((x, i) => (
                <button key={x.id} type="button" className={s.stageBtn} aria-pressed={i === st} onClick={() => setH(x.from)}>{x.name}</button>
              ))}
            </div>
            <div className={s.stageInfo} aria-live="polite">
              <h3 className={s.h3}>{S.name} <small>{S.time}</small></h3>
              <p>{S.mood}</p>
              <dl>
                <div><dt>Nhạc</dt><dd>{S.music}</dd></div>
                <div><dt>Trên quầy</dt><dd>{S.push}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
