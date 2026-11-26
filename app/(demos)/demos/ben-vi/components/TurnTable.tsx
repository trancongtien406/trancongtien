"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import s from "../brand.module.css";
import { CATCH, METHODS, ORDER_STEPS } from "../data/restaurant";
import { vnd } from "../data/menu";

const N = CATCH.length;
const STEP = 360 / N;

/**
 * Bàn xoay chọn món (chữ ký Bến Vị): các loại hải sản nằm trên mặt bàn xoay tròn, chọn loại nào thì bàn xoay
 * để loại đó về vị trí 12 giờ. Bên cạnh là phần gọi theo cân: số cân, cách chế biến, tạm tính.
 */
export function TurnTable() {
  const uid = useId();
  const ringRef = useRef<HTMLDivElement>(null);
  const turn = useRef(0);
  const [idx, setIdx] = useState(0);
  const [kg, setKg] = useState(1);
  const [methodId, setMethodId] = useState("nuong-than");

  const item = CATCH[idx];
  const method = METHODS.find((m) => m.id === methodId)!;
  const total = Math.round((item.perKg + method.fee) * kg);

  const select = (i: number) => {
    setIdx(i);
    const ring = ringRef.current;
    if (!ring) return;
    // góc đích gần nhất theo chiều ngắn
    const want = -i * STEP;
    let delta = ((want - turn.current) % 360 + 540) % 360 - 180;
    if (Math.abs(delta) < 0.01) delta = 0;
    const to = turn.current + delta;
    turn.current = to;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) ring.style.setProperty("--ring", String(to));
    else gsap.to(ring, { "--ring": to, duration: 1.1, ease: "power3.inOut", overwrite: true });
  };

  useEffect(() => () => { if (ringRef.current) gsap.killTweensOf(ringRef.current); }, []);

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (idx + dir + N) % N;
    select(next);
    requestAnimationFrame(() => (e.currentTarget.querySelector(`[data-i="${next}"]`) as HTMLElement | null)?.focus());
  };

  return (
    <section id="quay-hai-san" className={`${s.section} ${s.catchSec} ${s.noPrint}`} aria-labelledby="catch-h">
      <div className={s.wrap}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Quầy hải sản</span>
          <h2 id="catch-h" className={`${s.display} ${s.h2}`}>Chọn con bạn thích, <span className={s.italic}>gọi theo cân</span></h2>
          <p className={s.lead}>Hải sản về trong ngày, bán theo cân và nấu theo cách bạn chọn. Xoay bàn để xem từng loại, chọn số cân và cách chế biến để ước lượng chi phí trước khi ra quầy.</p>
        </div>

        <ol className={s.orderSteps} data-bv="reveal">
          {ORDER_STEPS.map((st) => (
            <li key={st.n}><span className={s.stepNo}>{st.n}</span><h3>{st.h}</h3><p>{st.p}</p></li>
          ))}
        </ol>

        <div className={s.ttGrid}>
          <div className={s.ttStage}>
            <div className={s.ttRing} ref={ringRef} role="radiogroup" aria-label="Loại hải sản" onKeyDown={onKey}>
              {CATCH.map((c, i) => {
                const a = (i * STEP * Math.PI) / 180;
                const x = 50 + 39 * Math.sin(a), y = 50 - 39 * Math.cos(a);
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={idx === i}
                    tabIndex={idx === i ? 0 : -1}
                    data-i={i}
                    className={s.ttToken}
                    style={{ left: `${x.toFixed(2)}%`, top: `${y.toFixed(2)}%` }}
                    onClick={() => select(i)}
                  >
                    <span className={s.ttTokenIn}>{c.short}</span>
                  </button>
                );
              })}
            </div>
            <div className={s.ttDisc} aria-live="polite">
              <p className={s.ttKicker}>Đang chọn</p>
              <p className={s.ttName} data-testid="tt-name">{item.name}</p>
              <p className={s.ttPrice}>{vnd(item.perKg)}<small>/kg · giá tham khảo</small></p>
            </div>
            <span className={s.ttPointer} aria-hidden="true" />
          </div>

          <div className={s.ttPanel} data-bv="reveal">
            <p className={s.ttNote}>{item.note}</p>
            <div className={s.fld}>
              <span className={s.lab} id={`${uid}-w`}>Số cân</span>
              <div className={s.stepper} role="group" aria-labelledby={`${uid}-w`}>
                <button type="button" aria-label="Giảm nửa cân" disabled={kg <= 0.5} onClick={() => setKg((v) => Math.max(0.5, Math.round((v - 0.5) * 10) / 10))}>−</button>
                <output aria-live="polite" data-testid="tt-kg">{String(kg).replace(".", ",")} kg</output>
                <button type="button" aria-label="Tăng nửa cân" disabled={kg >= 6} onClick={() => setKg((v) => Math.min(6, Math.round((v + 0.5) * 10) / 10))}>+</button>
              </div>
            </div>
            <fieldset className={s.fld}>
              <legend>Cách chế biến</legend>
              <div className={s.chips}>
                {METHODS.map((m) => (
                  <button key={m.id} type="button" className={s.chipBtn} aria-pressed={methodId === m.id} data-fit={item.best.includes(m.id) ? "1" : "0"} onClick={() => setMethodId(m.id)}>
                    {m.name}{item.best.includes(m.id) ? <span className={s.fitMark}> · hợp</span> : null}
                  </button>
                ))}
              </div>
              <p className={s.hint}>{method.note} Phí chế biến {vnd(method.fee)}/kg.</p>
            </fieldset>
            <div className={s.ttTotal}>
              <span>Tạm tính {String(kg).replace(".", ",")} kg {item.name.toLowerCase()}, {method.name.toLowerCase()}</span>
              <b data-testid="tt-total">{vnd(total)}</b>
            </div>
            <p className={s.fine2}>Giá tham khảo, thay đổi theo ngày; trọng lượng và giá chính thức được báo khi cân tại bàn. Chưa gồm thuế và phí phục vụ.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
