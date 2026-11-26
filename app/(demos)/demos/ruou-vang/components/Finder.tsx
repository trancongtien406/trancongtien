"use client";

import { useRef, useState } from "react";
import { CursorSpotlight } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { BUDGETS, FOODS, KINDS, MOODS, vnd, type FoodKey, type MoodKey, type WineKind } from "../data/wines";
import { BODY_LABEL, SWEET_LABEL, pair, validate, type PairInput, type PairResult } from "../lib/pairing";
import { TIMES, buildSummary, todayISO, validateReserve } from "../lib/reserve";

type Props = { consultHref: string };

const BODIES = [{ v: 0, l: "Chưa rõ" }, { v: 1, l: "Nhẹ" }, { v: 2, l: "Vừa" }, { v: 3, l: "Đậm" }] as const;
const SWEETS = [{ v: -1, l: "Chưa rõ" }, { v: 0, l: "Khô" }, { v: 1, l: "Bán khô" }, { v: 2, l: "Ngọt nhẹ" }] as const;
const BLANK: PairInput = { food: null, mood: null, kind: "any", body: 0, sweet: -1, budget: "any" };

export function Finder({ consultHref }: Props) {
  const [input, setInput] = useState<PairInput>(BLANK);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PairResult[] | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const head = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof PairInput>(k: K, v: PairInput[K]) => { setError(null); setInput((c) => ({ ...c, [k]: v })); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(input);
    setError(err);
    if (err) { setResults(null); return; }
    setResults(pair(input));
    setPicked([]);
    requestAnimationFrame(() => head.current?.focus());
  };
  const reset = () => { setInput(BLANK); setError(null); setResults(null); setPicked([]); };
  const toggle = (name: string) => setPicked((c) => (c.includes(name) ? c.filter((x) => x !== name) : [...c, name]));

  return (
    <section className={s.finder} id="chon-vang" aria-label="Chọn vang theo món và dịp">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Gợi ý ly theo món</p>
          <h2 className={s.h2} data-rv="rv">Bạn gọi món gì, mình gợi ý ly đó.</h2>
          <p className={s.mutedP}>Chọn món, dịp và khẩu vị. Công cụ đưa ra ba phong cách vang hợp nhất, kèm món đi cùng. Gợi ý theo kiểu nho, không theo nhãn hiệu. Dành cho khách từ 18 tuổi.</p>
        </header>
        <div className={s.finderGrid}>
          <CursorSpotlight className={s.console} radius={380} color="rgba(240,180,100,0.1)">
            <form className={s.consoleForm} onSubmit={submit} noValidate>
              <fieldset className={s.field} aria-describedby={error ? "rv-food-err" : undefined}>
                <legend><span className={s.num}>01</span> Món bạn định gọi</legend>
                <div className={s.chips}>
                  {FOODS.map((f) => (
                    <button key={f.key} type="button" className={s.chip} aria-pressed={input.food === f.key} onClick={() => set("food", input.food === f.key ? null : (f.key as FoodKey))}>{f.label}</button>
                  ))}
                </div>
                {error ? <p id="rv-food-err" className={s.err} role="alert">{error}</p> : null}
              </fieldset>
              <fieldset className={s.field}>
                <legend><span className={s.num}>02</span> Dịp <small>không bắt buộc</small></legend>
                <div className={s.chips}>
                  {MOODS.map((m) => (
                    <button key={m.key} type="button" className={s.chip} aria-pressed={input.mood === m.key} onClick={() => set("mood", input.mood === m.key ? null : (m.key as MoodKey))}>{m.label}</button>
                  ))}
                </div>
              </fieldset>
              <fieldset className={s.field}>
                <legend><span className={s.num}>03</span> Loại vang</legend>
                <div className={s.seg}>
                  {([{ id: "any", label: "Bất kỳ" }, ...KINDS.map((k) => ({ id: k.id, label: k.short }))] as { id: WineKind | "any"; label: string }[]).map((k) => (
                    <label key={k.id} className={s.segItem}>
                      <input type="radio" name="rv-kind" value={k.id} checked={input.kind === k.id} onChange={() => set("kind", k.id)} />
                      <span>{k.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className={s.twoCol}>
                <fieldset className={s.field}>
                  <legend><span className={s.num}>04</span> Độ đậm</legend>
                  <div className={s.seg}>
                    {BODIES.map((b) => (
                      <label key={b.v} className={s.segItem}><input type="radio" name="rv-body" checked={input.body === b.v} onChange={() => set("body", b.v as PairInput["body"])} /><span>{b.l}</span></label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className={s.field}>
                  <legend><span className={s.num}>05</span> Khô hay ngọt</legend>
                  <div className={s.seg}>
                    {SWEETS.map((b) => (
                      <label key={b.v} className={s.segItem}><input type="radio" name="rv-sweet" checked={input.sweet === b.v} onChange={() => set("sweet", b.v as PairInput["sweet"])} /><span>{b.l}</span></label>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className={s.field}>
                <label htmlFor="rv-budget" className={s.lbl}><span className={s.num}>06</span> Ngân sách mỗi chai</label>
                <select id="rv-budget" className={s.select} value={input.budget} onChange={(e) => set("budget", e.target.value)}>
                  {BUDGETS.map((b) => (<option key={b.key} value={b.key}>{b.label}</option>))}
                </select>
              </div>
              <div className={s.formActs}>
                <button type="submit" className={`${s.btn} ${s.btnGold}`}>Tìm ba gợi ý</button>
                <button type="button" className={s.linkBtn} onClick={reset}>Làm lại</button>
              </div>
            </form>
          </CursorSpotlight>

          <div className={s.results} aria-live="polite">
            {results ? (
              <>
                <h3 ref={head} tabIndex={-1} className={s.h3}>Ba gợi ý cho bàn của bạn</h3>
                <ol className={s.resultList}>
                  {results.map((r, i) => {
                    const on = picked.includes(r.wine.name);
                    return (
                      <li key={r.wine.id} className={s.result} data-top={i === 0 || undefined}>
                        <div className={s.resultHead}>
                          <span className={s.rank} aria-hidden="true">{i + 1}</span>
                          <div>
                            <h4 className={s.resultName}>{r.wine.name}</h4>
                            <p className={s.resultMeta}>{KINDS.find((k) => k.id === r.wine.kind)!.label} · độ đậm {BODY_LABEL[r.wine.body]} · {SWEET_LABEL[r.wine.sweet]}</p>
                          </div>
                          <span className={s.fit}><b>{r.percent}</b>%<small>hợp</small></span>
                        </div>
                        <ul className={s.reasons}>{r.reasons.map((x) => (<li key={x}>{x}</li>))}</ul>
                        <p className={s.dish}><b>Món đi cùng</b> {r.dish}</p>
                        <p className={s.resultPrice}>
                          Giá tham khảo: {r.wine.glass ? <>{vnd(r.wine.glass)} một ly · </> : null}{vnd(r.wine.bottle)} một chai
                          {r.overBudget ? <em> · vượt ngân sách bạn chọn</em> : null}
                        </p>
                        <button type="button" className={s.pickBtn} aria-pressed={on} onClick={() => toggle(r.wine.name)}>{on ? "Đã thêm vào bàn" : "Thêm vào bàn"}</button>
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <div className={s.empty}>
                <p className={s.emptyTitle}>Chưa có gợi ý</p>
                <p>Chọn ít nhất một món rồi bấm Tìm ba gợi ý. Các mục còn lại để &ldquo;Chưa rõ&rdquo; cũng được.</p>
              </div>
            )}
          </div>
        </div>
        <Reserve picked={picked} consultHref={consultHref} />
      </div>
    </section>
  );
}

function Reserve({ picked, consultHref }: { picked: string[]; consultHref: string }) {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const out = useRef<HTMLPreElement>(null);

  const make = (e: React.FormEvent) => {
    e.preventDefault();
    const er = validateReserve({ guests, date, time }, todayISO());
    setErrors(er);
    setCopied("");
    if (Object.keys(er).length) { setSummary(null); return; }
    setSummary(buildSummary({ guests, date, time, picks: picked }));
    requestAnimationFrame(() => out.current?.focus());
  };
  const copy = async () => {
    if (!summary) return;
    try { await navigator.clipboard.writeText(summary); setCopied("ok"); }
    catch {
      const r = document.createRange();
      if (out.current) { r.selectNodeContents(out.current); const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(r); }
      setCopied("fail");
    }
  };

  return (
    <div className={s.reserve} id="dat-ban">
      <div className={s.reserveCopy}>
        <p className={s.kicker}>Đặt bàn</p>
        <h3 className={s.h2}>Tóm tắt bàn của bạn</h3>
        <p className={s.mutedP}>Chọn số khách, ngày và giờ mong muốn. Những ly bạn đã thêm vào bàn sẽ nằm trong tóm tắt. Gửi yêu cầu thật qua form tư vấn ở bước cuối.</p>
        <p className={s.age}>Dành cho khách từ 18 tuổi. Hãy thưởng thức có trách nhiệm.</p>
      </div>
      <form className={s.reserveForm} onSubmit={make} noValidate>
        <div className={s.field}>
          <span className={s.lbl} id="rv-guests-l">Số khách</span>
          <div className={s.stepper} role="group" aria-labelledby="rv-guests-l">
            <button type="button" aria-label="Giảm số khách" onClick={() => setGuests((g) => Math.max(1, g - 1))}>−</button>
            <output aria-live="polite">{guests}</output>
            <button type="button" aria-label="Tăng số khách" onClick={() => setGuests((g) => Math.min(12, g + 1))}>+</button>
          </div>
          {errors.guests ? <p className={s.err} role="alert">{errors.guests}</p> : null}
        </div>
        <div className={s.twoCol}>
          <div className={s.field}>
            <label className={s.lbl} htmlFor="rv-date">Ngày</label>
            <input id="rv-date" type="date" className={s.input} min={todayISO()} value={date} onChange={(e) => { setDate(e.target.value); setErrors((c) => ({ ...c, date: "" })); }} aria-invalid={errors.date ? true : undefined} aria-describedby={errors.date ? "rv-date-err" : undefined} />
            {errors.date ? <p id="rv-date-err" className={s.err} role="alert">{errors.date}</p> : null}
          </div>
          <div className={s.field}>
            <label className={s.lbl} htmlFor="rv-time">Giờ</label>
            <select id="rv-time" className={s.select} value={time} onChange={(e) => { setTime(e.target.value); setErrors((c) => ({ ...c, time: "" })); }} aria-invalid={errors.time ? true : undefined} aria-describedby={errors.time ? "rv-time-err" : undefined}>
              <option value="">Chọn giờ</option>
              {TIMES.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
            {errors.time ? <p id="rv-time-err" className={s.err} role="alert">{errors.time}</p> : null}
          </div>
        </div>
        <p className={s.pickedLine}>{picked.length ? <>Đã thêm vào bàn: {picked.join("; ")}.</> : "Chưa thêm ly nào vào bàn; bạn vẫn có thể tạo tóm tắt."}</p>
        <button type="submit" className={`${s.btn} ${s.btnGold}`}>Tạo tóm tắt</button>
        {summary ? (
          <div className={s.summary}>
            <pre ref={out} tabIndex={-1} className={s.summaryText}>{summary}</pre>
            <div className={s.summaryActs}>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={copy}>Sao chép tóm tắt</button>
              <a className={`${s.btn} ${s.btnGold} ${s.btnSm}`} href={consultHref}>Gửi yêu cầu đặt bàn</a>
            </div>
            <p className={s.copyMsg} role="status">{copied === "ok" ? "Đã sao chép. Dán vào ô ghi chú ở form tư vấn." : copied === "fail" ? "Không sao chép tự động được; nội dung đã được bôi chọn, hãy nhấn Ctrl/Cmd + C." : " "}</p>
            <p className={s.mutedSmall}>Tóm tắt này chỉ được tạo trên trình duyệt của bạn; chưa có yêu cầu nào được gửi đi.</p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
