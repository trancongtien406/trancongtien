"use client";

import { useRef, useState } from "react";
import { CursorSpotlight, SplitWords } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { FLAVORS, vnd, type FlavorKey } from "../data/menu";
import { match, validate, type AlcoholPref, type MatchResult, type Strength } from "../lib/match";

const STRENGTHS: { id: Strength; label: string; hint: string }[] = [
  { id: "light", label: "Nhẹ", hint: "Dễ uống" },
  { id: "mid", label: "Vừa", hint: "Cân bằng" },
  { id: "strong", label: "Mạnh", hint: "Đậm, chậm" },
];
const ALC: { id: AlcoholPref; label: string }[] = [
  { id: "any", label: "Đều được" },
  { id: "yes", label: "Có cồn" },
  { id: "no", label: "Không cồn" },
];

export function Matcher() {
  const [flavors, setFlavors] = useState<FlavorKey[]>([]);
  const [strength, setStrength] = useState<Strength>("mid");
  const [alcohol, setAlcohol] = useState<AlcoholPref>("any");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const head = useRef<HTMLHeadingElement>(null);

  const toggle = (k: FlavorKey) => {
    setError(null);
    setFlavors((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = { flavors, strength, alcohol };
    const err = validate(input);
    setError(err);
    if (err) { setResults(null); return; }
    setResults(match(input));
    requestAnimationFrame(() => head.current?.focus());
  };
  const reset = () => { setFlavors([]); setStrength("mid"); setAlcohol("any"); setError(null); setResults(null); setPicked(null); };
  const pick = (name: string) => {
    setPicked(name);
    window.dispatchEvent(new CustomEvent("tm:pick", { detail: name }));
  };

  return (
    <section className={s.matcher} id="chon-ly" aria-label="Chọn ly theo vị">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Tìm vị của bạn</p>
          <SplitWords as="h2" className={s.h2} trigger="view">Tối nay bạn thuộc vị nào?</SplitWords>
          <p className={s.mutedP}>Không biết gọi gì? Cho tụi mình biết bạn thích ngọt, chua, đắng hay một chút khói. Ba gợi ý hợp nhất sẽ hiện ra, kèm lý do.</p>
        </header>
        <CursorSpotlight className={s.console} radius={360} color="rgba(0,229,255,0.12)">
          <form className={s.consoleForm} onSubmit={submit} noValidate>
            <fieldset className={s.field} aria-invalid={error ? true : undefined} aria-describedby={error ? "tm-flav-err" : undefined}>
              <legend><span className={s.step1}>01</span> Bạn thích vị nào? <small>Chọn nhiều được</small></legend>
              <div className={s.chips}>
                {FLAVORS.map((f) => (
                  <button key={f.key} type="button" className={s.chip} aria-pressed={flavors.includes(f.key)} onClick={() => toggle(f.key)}>
                    <b>{f.label}</b>
                    <span>{f.hint}</span>
                  </button>
                ))}
              </div>
              {error ? <p id="tm-flav-err" className={s.err} role="alert">{error}</p> : null}
            </fieldset>
            <fieldset className={s.field}>
              <legend><span className={s.step1}>02</span> Độ mạnh</legend>
              <div className={s.seg}>
                {STRENGTHS.map((x) => (
                  <label key={x.id} className={s.segItem}>
                    <input type="radio" name="tm-strength" value={x.id} checked={strength === x.id} onChange={() => setStrength(x.id)} disabled={alcohol === "no"} />
                    <span><b>{x.label}</b><small>{x.hint}</small></span>
                  </label>
                ))}
              </div>
              {alcohol === "no" ? <p className={s.hint}>Đồ uống không cồn nên độ mạnh không áp dụng.</p> : null}
            </fieldset>
            <fieldset className={s.field}>
              <legend><span className={s.step1}>03</span> Có cồn hay không?</legend>
              <div className={s.seg}>
                {ALC.map((x) => (
                  <label key={x.id} className={s.segItem}>
                    <input type="radio" name="tm-alc" value={x.id} checked={alcohol === x.id} onChange={() => setAlcohol(x.id)} />
                    <span><b>{x.label}</b></span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={s.formBtns}>
              <button type="submit" className={`${s.btn} ${s.btnCyan}`}>Tìm vị của tôi</button>
              <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={reset}>Làm lại</button>
            </div>
            <p className={s.hint}>Dành cho khách từ 18 tuổi với đồ uống có cồn.</p>
          </form>
          <div className={s.consoleOut} aria-live="polite">
            {results ? (
              <>
                <h3 ref={head} tabIndex={-1} className={s.outHead}>Ba ly hợp với bạn</h3>
                <ol className={s.results}>
                  {results.map((r, i) => (
                    <li key={r.drink.id} className={`${s.result} ${s[`tone_${r.drink.tone}` as keyof typeof s]}`} style={{ "--i": i } as React.CSSProperties}>
                      <div className={s.resTop}>
                        <span className={s.resRank}>{i + 1}</span>
                        <h4>{r.drink.name}</h4>
                        <span className={s.resPct}>{r.percent}%<small> hợp vị</small></span>
                      </div>
                      <div className={s.resBar} aria-hidden="true"><i style={{ width: `${r.percent}%` }} /></div>
                      <p className={s.resDesc}>{r.drink.desc}</p>
                      <ul className={s.why}>
                        {r.reasons.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                      <div className={s.resFoot}>
                        <span className={s.price}>{vnd(r.drink.price)} <small>Giá tham khảo</small></span>
                        <button type="button" className={s.linkBtn} aria-pressed={picked === r.drink.name} onClick={() => pick(r.drink.name)}>
                          {picked === r.drink.name ? "Đã thêm vào đặt bàn" : "Thêm vào đặt bàn"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <div className={s.empty}>
                <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M12 14h40c0 14-9 22-20 24-11-2-20-10-20-24ZM32 38v14M22 56h20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p>Chọn ít nhất một vị, rồi bấm “Tìm vị của tôi”. Ba gợi ý sẽ hiện ở đây.</p>
              </div>
            )}
          </div>
        </CursorSpotlight>
      </div>
    </section>
  );
}
