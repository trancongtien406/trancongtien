"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import s from "../brand.module.css";
import { FOODS, MOMENTS, MOODS, TEAS, fmtSec, pairTea, vnd, type Food, type Moment, type Mood, type Tea } from "../data/tea";
import { InkReveal, InkTitle } from "./Ink";

type Group<T extends string> = { legend: string; name: string; value: T | null; onChange: (v: T) => void; options: { id: T; label: string; hint?: string }[] };

function Radios<T extends string>({ legend, name, value, onChange, options }: Group<T>) {
  return (
    <fieldset className={s.fieldset}>
      <legend>{legend}</legend>
      <div className={s.radioGrid}>
        {options.map((o) => (
          <label key={o.id} className={s.radio}>
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} />
            <span><b>{o.label}</b>{o.hint ? <small>{o.hint}</small> : null}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ----------------------------- Đồng hồ pha trà ----------------------------- */
const R = 54, C = 2 * Math.PI * R;

function chime() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    [660, 880].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.22);
      g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + i * 0.22 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.22 + 0.9);
      o.connect(g).connect(ctx.destination); o.start(ctx.currentTime + i * 0.22); o.stop(ctx.currentTime + i * 0.22 + 1);
    });
    window.setTimeout(() => ctx.close().catch(() => {}), 1800);
  } catch { /* trình duyệt không hỗ trợ âm thanh */ }
}

function Timer({ tea }: { tea: Tea }) {
  const matcha = tea.kind.startsWith("Bột");
  const word = matcha ? "Đánh bọt" : "Nước";
  const [idx, setIdx] = useState(0);
  const [remain, setRemain] = useState(tea.steeps[0] * 1000);
  const [running, setRunning] = useState(false);
  const [sound, setSound] = useState(true);
  const [msg, setMsg] = useState("");
  const endAt = useRef(0);
  const soundRef = useRef(sound);
  useEffect(() => { soundRef.current = sound; }, [sound]);
  const total = tea.steeps[idx] * 1000;
  const last = idx === tea.steeps.length - 1;
  const finished = !running && remain <= 0;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const left = endAt.current - Date.now();
      if (left <= 0) {
        window.clearInterval(id);
        setRemain(0); setRunning(false);
        if (soundRef.current) chime();
        setMsg(last ? `Xong ${word.toLowerCase()} ${idx + 1}. Rót trà ra chén. Đây là lượt cuối.` : `Xong ${word.toLowerCase()} ${idx + 1}. Rót cạn trà ra chén, rồi bấm ${word.toLowerCase()} tiếp theo.`);
      } else setRemain(left);
    }, 100);
    return () => window.clearInterval(id);
  }, [running, idx, last, word]);

  const start = () => { endAt.current = Date.now() + remain; setRunning(true); setMsg(`Bắt đầu ${word.toLowerCase()} ${idx + 1}, ${fmtSec(tea.steeps[idx])}.`); };
  const pause = () => { setRemain(Math.max(0, endAt.current - Date.now())); setRunning(false); setMsg("Đã tạm dừng."); };
  const reset = () => { setRunning(false); setIdx(0); setRemain(tea.steeps[0] * 1000); setMsg("Đã đặt lại."); };
  const next = () => { const n = idx + 1; setIdx(n); setRemain(tea.steeps[n] * 1000); endAt.current = Date.now() + tea.steeps[n] * 1000; setRunning(true); setMsg(`Bắt đầu ${word.toLowerCase()} ${n + 1}, ${fmtSec(tea.steeps[n])}.`); };

  const secs = Math.ceil(remain / 1000);
  const prog = total ? 1 - remain / total : 0;
  return (
    <div className={s.timer} data-run={running ? "1" : "0"}>
      <div className={s.ringWrap}>
        <svg viewBox="0 0 120 120" className={s.ring} aria-hidden="true">
          <circle cx="60" cy="60" r={R} className={s.ringBg} />
          <circle cx="60" cy="60" r={R} className={s.ringFg} strokeDasharray={C} strokeDashoffset={C * (1 - prog)} />
        </svg>
        <div className={s.ringText}>
          <span className={s.ringNo}>{word} {idx + 1}/{tea.steeps.length}</span>
          <span className={s.ringNum} role="timer" aria-label={`Còn ${secs} giây`}>{String(Math.floor(secs / 60)).padStart(2, "0")}:{String(secs % 60).padStart(2, "0")}</span>
        </div>
        <svg viewBox="0 0 60 40" className={s.wisps} aria-hidden="true">
          <path d="M14 38C6 28 20 22 12 12S18 2 14 0" pathLength={1} />
          <path d="M30 38C22 28 38 22 30 12S36 2 30 0" pathLength={1} />
          <path d="M46 38C38 28 52 22 44 12S50 2 46 0" pathLength={1} />
        </svg>
      </div>
      <div className={s.timerBtns}>
        {!running && !finished && <button type="button" className={`${s.btn} ${s.btnPrimary}`} onClick={start}>{remain === total ? `Bắt đầu ${word.toLowerCase()} ${idx + 1}` : "Tiếp tục"}</button>}
        {running && <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={pause}>Tạm dừng</button>}
        {finished && !last && <button type="button" className={`${s.btn} ${s.btnPrimary}`} onClick={next}>{word} {idx + 2}: {fmtSec(tea.steeps[idx + 1])}</button>}
        {finished && last && <span className={s.doneMsg}>Đã đến lúc thưởng trà.</span>}
        <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={reset}>Đặt lại</button>
      </div>
      <label className={s.check}><input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} /><span>Chuông báo khi hết giờ</span></label>
      <p className={s.srOnly} role="status" aria-live="polite">{msg}</p>
      <p className={s.timerMsg} aria-hidden="true">{msg}</p>
    </div>
  );
}

/* ----------------------------- Ghép trà ----------------------------- */
export function Pairing() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [moment, setMoment] = useState<Moment | null>(null);
  const [food, setFood] = useState<Food | null>(null);
  const [override, setOverride] = useState<string | null>(null);
  const [cups, setCups] = useState(1);
  const resRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const picks = useMemo(() => pairTea(mood, moment, food), [mood, moment, food]);
  const any = !!(mood || moment || food);

  const pickKey = picks.map((p) => p.tea.id).join(",");
  const [lastKey, setLastKey] = useState(pickKey);
  if (lastKey !== pickKey) { setLastKey(pickKey); setOverride(null); }

  useEffect(() => {
    const h = (e: Event) => { const id = (e as CustomEvent<string>).detail; if (TEAS.some((t) => t.id === id)) setOverride(id); };
    window.addEventListener("tt:brew", h);
    return () => window.removeEventListener("tt:brew", h);
  }, []);

  const tea: Tea | null = override ? TEAS.find((t) => t.id === override) ?? null : picks[0]?.tea ?? null;
  const reasons = picks.find((p) => p.tea.id === tea?.id)?.reasons ?? [];
  const alts = picks.filter((p) => p.tea.id !== tea?.id).slice(0, 2);

  const grams = tea ? Math.round(((tea.grams * cups) + Number.EPSILON) * 10) / 10 : 0;
  const ml = tea ? tea.ml * cups : 0;

  const toSession = useCallback(() => {
    if (!tea) return;
    window.dispatchEvent(new CustomEvent("tt:session", { detail: tea.id }));
    document.getElementById("buoi-tra")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, [tea]);

  return (
    <div className={`${s.wrap} ${s.pairing}`}>
      <div className={s.pairHead}>
        <p className={s.kicker}>Chọn trà và đồng hồ pha</p>
        <InkTitle as="h2" className={s.h2}>Chưa biết gọi trà nào? Chọn theo khẩu vị.</InkTitle>
        <p className={s.lead}>Chọn cảm giác, thời điểm và món ăn kèm để có gợi ý, rồi pha ở nhà theo đồng hồ từng nước: nhiệt độ, số gam, số giây.</p>
        <InkReveal className={s.pairImg}>
          <Image src="/images/demos/tra-thi/chen-den-1200.webp" alt="Chén gốm đen trên mặt đá xám" width={2000} height={3000} sizes="(max-width: 900px) 92vw, 30vw" className={s.cover} loading="lazy" />
        </InkReveal>
      </div>

      <form className={s.pairForm} onSubmit={(e) => e.preventDefault()} aria-describedby={`${uid}-note`}>
        <Radios legend="1. Tâm trạng" name="mood" value={mood} onChange={setMood} options={MOODS} />
        <Radios legend="2. Thời điểm" name="moment" value={moment} onChange={setMoment} options={MOMENTS} />
        <Radios legend="3. Dùng cùng" name="food" value={food} onChange={setFood} options={FOODS} />
        <div className={s.formFoot}>
          <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => { setMood(null); setMoment(null); setFood(null); setOverride(null); }} disabled={!any && !override}>Xoá lựa chọn</button>
          <p id={`${uid}-note`} className={s.fine}>Đây là gợi ý theo khẩu vị, không phải đánh giá về tác dụng sức khoẻ.</p>
        </div>
      </form>

      <div className={s.pairResult} ref={resRef} aria-live="polite">
        {!tea && (
          <div className={s.emptyBox}>
            <p className={s.emptyTitle}>{any ? "Chưa có trà khớp hoàn toàn." : "Chưa có gợi ý."}</p>
            <p>{any ? "Thử bỏ bớt một lựa chọn để xem các loại gần nhất." : "Hãy chọn ít nhất một mục ở bên trái, hoặc chọn một loại trong danh mục để xem cách pha."}</p>
          </div>
        )}
        {tea && (
          <div className={s.result} key={tea.id}>
            <p className={s.resultTag}>{override && !picks.some((p) => p.tea.id === tea.id) ? "Từ danh mục" : "Gợi ý cho bạn"}</p>
            <h3 className={s.resultName}>{tea.name}</h3>
            <p className={s.resultKind}><i className={s.swatch} style={{ background: tea.swatch }} />{tea.kind}</p>
            <p className={s.resultFlavor}>{tea.flavor}.</p>
            {reasons.length > 0 && <p className={s.reasons}>Vì: {reasons.join(", ")}.</p>}

            <div className={s.cupsRow}>
              <span id={`${uid}-cups`}>Số chén</span>
              <div className={s.stepper} role="group" aria-labelledby={`${uid}-cups`}>
                <button type="button" aria-label="Giảm số chén" onClick={() => setCups((c) => Math.max(1, c - 1))} disabled={cups <= 1}>−</button>
                <output aria-live="polite">{cups}</output>
                <button type="button" aria-label="Tăng số chén" onClick={() => setCups((c) => Math.min(6, c + 1))} disabled={cups >= 6}>+</button>
              </div>
            </div>

            <dl className={s.specs}>
              <div><dt>Nhiệt độ nước</dt><dd>{tea.tempC}&nbsp;°C</dd></div>
              <div><dt>Lượng trà khô</dt><dd>{String(grams).replace(".", ",")}&nbsp;g</dd></div>
              <div><dt>Lượng nước</dt><dd>{ml}&nbsp;ml</dd></div>
              <div><dt>Giá một ấm</dt><dd>{vnd(tea.price)}</dd></div>
            </dl>
            <p className={s.steepList}><span>Các nước pha</span>{tea.steeps.map((t, i) => <b key={i}>{i + 1}. {fmtSec(t)}</b>)}</p>
            <p className={s.brewNote}>{tea.note}</p>

            <Timer key={tea.id} tea={tea} />

            <div className={s.resultActions}>
              <button type="button" className={`${s.btn} ${s.btnPrimary}`} onClick={toSession}>Đưa vào buổi trà</button>
            </div>

            {alts.length > 0 && (
              <div className={s.alts}>
                <span>Hoặc thử</span>
                {alts.map((a) => <button key={a.tea.id} type="button" className={s.chip} onClick={() => setOverride(a.tea.id)}>{a.tea.name}</button>)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
