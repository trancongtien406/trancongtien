"use client";

import { useRef, useState } from "react";
import s from "../brand.module.css";
import { TEXT_MAX } from "../data/builder";
import { burstAt } from "./Sprinkles";

const COLORS = ["#FF6F98", "#6FD3A6", "#FFE27D", "#8E6BFF", "#FF9B54"];

/** Thiệp & chữ viết + thổi nến: chọn số nến, gõ lời chúc, bấm Thổi nến thì từng ngọn tắt lần lượt kèm khói và confetti. */
export function Candles() {
  const [count, setCount] = useState(5);
  const [msg, setMsg] = useState("Chúc mừng sinh nhật Mai");
  const [out, setOut] = useState<number>(0);
  const [blowing, setBlowing] = useState(false);
  const timers = useRef<number[]>([]);
  const btn = useRef<HTMLButtonElement>(null);
  const done = out >= count;

  const reset = () => { timers.current.forEach(clearTimeout); timers.current = []; setOut(0); setBlowing(false); };
  const blow = () => {
    if (blowing) return;
    if (done) { reset(); return; }
    setBlowing(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (let i = 0; i < count; i++) {
      timers.current.push(window.setTimeout(() => {
        setOut(i + 1);
        if (i === count - 1) { setBlowing(false); if (!reduce) burstAt(btn.current, 60); }
      }, reduce ? 0 : 160 * (i + 1)));
    }
  };
  const change = (d: number) => { reset(); setCount((c) => Math.min(9, Math.max(1, c + d))); };
  const W = 300;
  const gap = Math.min(34, 200 / count);
  const x0 = W / 2 - ((count - 1) * gap) / 2;
  return (
    <section className={`${s.sec} ${s.secMint}`} id="thiep-chu" aria-labelledby="h-card">
      <div className={s.wrap}>
        <div className={s.cardGrid}>
          <div>
            <span className={s.eyebrow}>Thiệp &amp; chữ viết</span>
            <h2 className={`${s.display} ${s.h2}`} id="h-card">Lời chúc viết tay trên bánh, thiệp nhỏ kèm hộp</h2>
            <ul className={s.optList}>
              <li><b>Chữ trên bánh</b><span>Viết bằng kem hoặc socola, tối đa {TEXT_MAX} ký tự. Phụ thu 20.000₫.</span></li>
              <li><b>Thiệp nhỏ</b><span>Thiệp giấy cỡ danh thiếp ghi lời chúc, tặng kèm mọi hộp bánh kem.</span></li>
              <li><b>Thiệp gập có hình</b><span>Thiệp gập A6 vẽ tay theo chủ đề sinh nhật, 15.000₫.</span></li>
              <li><b>Nến &amp; dao cắt</b><span>Nến sinh nhật số hoặc que, dao nhựa và đĩa giấy tặng kèm khi bạn báo trước.</span></li>
            </ul>
            <p className={s.fineNote}>Tiệm viết theo mẫu chữ tròn của tiệm. Tên riêng, chữ in hoa hoặc ký tự đặc biệt xin ghi rõ khi đặt.</p>
          </div>
          <div className={s.candleBox}>
            <div className={s.candleControls}>
              <label htmlFor="mk-msg" className={s.lbl}>Lời chúc trên thiệp</label>
              <input id="mk-msg" className={s.textIn} type="text" maxLength={TEXT_MAX} value={msg} onChange={(e) => setMsg(e.target.value)} />
              <div className={s.servRow}>
                <span className={s.lbl} id="mk-cl">Số nến</span>
                <div className={s.stepper} role="group" aria-labelledby="mk-cl">
                  <button type="button" className={s.stepBtn} aria-label="Bớt một nến" disabled={count <= 1} onClick={() => change(-1)}>−</button>
                  <output aria-live="polite"><b>{count}</b> nến</output>
                  <button type="button" className={s.stepBtn} aria-label="Thêm một nến" disabled={count >= 9} onClick={() => change(1)}>+</button>
                </div>
              </div>
            </div>
            <div className={s.candleStage}>
              <svg viewBox="0 0 300 210" className={s.candleSvg} role="img" aria-label={done ? `Đã thổi tắt ${count} nến` : `${count} nến đang cháy trên bánh`}>
                <ellipse cx="150" cy="190" rx="130" ry="14" fill="rgba(70,37,26,.2)" />
                <rect x="30" y="118" width="240" height="68" rx="18" fill="#F6D49B" stroke="#46251A" strokeWidth="4" />
                <path d="M30 138q20 18 40 0t40 0 40 0 40 0 40 0 40 0v-8q0-12-12-12H42q-12 0-12 12z" fill="#FFE3EC" stroke="#46251A" strokeWidth="4" strokeLinejoin="round" />
                {msg.trim() && <text x="150" y="168" textAnchor="middle" fontSize={Math.max(11, 20 - Math.max(0, msg.length - 14) * 0.5)} fontWeight="800" fill="#46251A" style={{ fontFamily: "var(--mk-display)" }}>{msg.trim()}</text>}
                {Array.from({ length: count }, (_, i) => {
                  const x = x0 + i * gap, off = i < out;
                  return (
                    <g key={i} transform={`translate(${x} 0)`}>
                      <rect x="-4.5" y="86" width="9" height="34" rx="3" fill={COLORS[i % COLORS.length]} stroke="#46251A" strokeWidth="2.5" />
                      <path d="M-4.5 98l9-5M-4.5 106l9-5M-4.5 114l9-5" stroke="#fff" strokeWidth="2" opacity=".7" />
                      {!off && <path className={s.flame} d="M0 66c5 7 8 12 0 20-8-8-5-13 0-20z" fill="#FFC933" stroke="#FF6F98" strokeWidth="2" style={{ animationDelay: `${i * 70}ms` }} />}
                      {off && <path className={s.smoke} d="M0 80c-7-8 7-14 0-24" fill="none" stroke="#46251A" strokeWidth="2.5" strokeLinecap="round" opacity=".5" />}
                    </g>
                  );
                })}
              </svg>
              <p className={s.cardMsg} aria-live="polite">{done ? "Tắt hết rồi! Ước một điều nào." : "Bấm Thổi nến để thử."}</p>
            </div>
            <button ref={btn} type="button" className={`${s.btn} ${s.btnBig} ${s.btnChoco}`} onClick={blow} disabled={blowing}>{done ? "Thắp lại nến" : "Thổi nến"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
