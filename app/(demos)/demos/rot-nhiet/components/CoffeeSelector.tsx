"use client";

import { useRef, useState } from "react";
import styles from "../brand.module.css";
import { BEANS } from "../data/beans";
import { MENU_MAP, TEMP_LABEL, formatVnd } from "../data/menu";
import { QUESTIONS, recommend, type Answers } from "../data/selector";
import { Photo } from "./Photo";
import { useTray } from "./TrayProvider";

export function CoffeeSelector() {
  const [step, setStep] = useState(0); // 0 = bắt đầu, 1-3 = câu hỏi, 4 = kết quả
  const [ans, setAns] = useState<Answers>({});
  const [error, setError] = useState("");
  const { add, openTray } = useTray();
  const head = useRef<HTMLHeadingElement>(null);
  const focusHead = () => requestAnimationFrame(() => head.current?.focus());
  const q = step >= 1 && step <= 3 ? QUESTIONS[step - 1] : null;

  const next = () => {
    if (q && !ans[q.id]) { setError("Chọn một đáp án để đi tiếp."); return; }
    setError(""); setStep((s) => s + 1); focusHead();
  };
  const result = step === 4 ? recommend(ans) : null;
  const bean = result ? BEANS.find((b) => b.id === result.bean)! : null;

  return (
    <section id="tim-gu" className={`${styles.section} ${styles.selectorSection} ${styles.redZone}`} aria-labelledby="rn-sel-h">
      <div className={styles.wrap}>
        <div className={styles.selectorGrid}>
          <div className={styles.selectorIntro}>
            <span className={`${styles.label} ${styles.eyebrow}`}>02 / TÌM GU CÀ PHÊ</span>
            <h2 id="rn-sel-h" className={`${styles.display} ${styles.h2}`}>Gu của bạn?</h2>
            <p className={styles.lead}>Không cần hiểu hết về cà phê mới chọn được một ly ngon. Trả lời ba câu hỏi, Rót Nhiệt sẽ gợi ý một loại hạt và cách pha phù hợp với sở thích của bạn.</p>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.label}>{step === 0 ? "3 câu hỏi · Khoảng 30 giây" : step === 4 ? "Kết quả" : `0${step} / 03`}</span>
              <span className={styles.steps} aria-hidden="true">{[1, 2, 3].map((n) => <i key={n} className={step >= n ? styles.on : ""} />)}</span>
            </div>
            <div className={styles.panelBody}>
              {step === 0 && (
                <div className={styles.startBox}>
                  <h3 ref={head} tabIndex={-1} className={styles.question}>Ba câu hỏi. Một gu cà phê dành cho bạn.</h3>
                  <p>Gợi ý dựa trên ba lựa chọn của bạn.</p>
                  <div><button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => { setStep(1); focusHead(); }}>Bắt đầu tìm gu</button></div>
                </div>
              )}
              {q && (
                <form onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                  <fieldset className={styles.opts} aria-describedby={error ? "rn-sel-err" : undefined}>
                    <legend>
                      <h3 ref={head} tabIndex={-1} className={styles.question}>{q.title}</h3>
                      <p>{q.hint}</p>
                    </legend>
                    {q.options.map((o, i) => (
                      <label key={o.value} className={styles.opt}>
                        <input type="radio" name={`rn-${q.id}`} value={o.value} checked={ans[q.id] === o.value} onChange={() => { setAns((a) => ({ ...a, [q.id]: o.value })); setError(""); }} aria-invalid={!!error} />
                        <span className={styles.optFace}><span className={styles.optNum} aria-hidden="true">0{i + 1}</span><span><span className={styles.optLabel}>{o.label}</span><span className={styles.optSub}>{o.sub}</span></span></span>
                      </label>
                    ))}
                  </fieldset>
                  {error && <p id="rn-sel-err" className={styles.err} role="alert">{error}</p>}
                  <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
                </form>
              )}
              {result && bean && (
                <div>
                  <h3 ref={head} tabIndex={-1} className={styles.question}>Gu của bạn: {bean.name}</h3>
                  <div className={styles.resultBean}>
                    <div className={styles.resultBeanPhoto}><Photo name={bean.image} alt={bean.alt} sizes="(max-width: 900px) 90vw, 340px" size={600} /></div>
                    <dl className={styles.dl}>
                      <div><dt>Loại hạt</dt><dd>{bean.type} · {bean.region}</dd></div>
                      <div><dt>Hương vị</dt><dd>{bean.notes}</dd></div>
                      <div><dt>Cách pha gợi ý</dt><dd>{result.brew}</dd></div>
                      <div><dt>Túi {bean.weight}</dt><dd>{formatVnd(bean.priceVnd)} (giá tham khảo)</dd></div>
                    </dl>
                  </div>
                  <h4 className={styles.label} style={{ marginTop: 20 }}>Ly nên thử</h4>
                  <ul className={styles.sugList}>
                    {result.menuIds.map((id) => {
                      const m = MENU_MAP.get(id)!; const t = m.temperatures[m.temperatures.length - 1];
                      return (
                        <li key={id} className={styles.sug}>
                          <span><b>{m.name}</b> · {TEMP_LABEL[t]} · {formatVnd(m.priceVnd)}</span>
                          <button type="button" className={`${styles.btn} ${styles.btnPrimary} ${styles.addBtn}`} onClick={() => { if (add(id, t) === "ok") openTray(); }}>Thêm vào khay</button>
                        </li>
                      );
                    })}
                  </ul>
                  <p style={{ fontSize: 13, marginTop: 14 }}>Gợi ý dựa trên ba lựa chọn của bạn.</p>
                </div>
              )}
            </div>
            {step > 0 && (
              <div className={styles.panelFoot}>
                {step === 4 ? (
                  <>
                    <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => { setStep(0); setAns({}); setError(""); focusHead(); }}>Thử lại từ đầu</button>
                    <a className={`${styles.btn} ${styles.btnPrimary}`} href="#hat-ca-phe">Xem hạt này</a>
                  </>
                ) : (
                  <>
                    <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => { setError(""); setStep((s) => s - 1); focusHead(); }} disabled={step === 1 && false}>Quay lại</button>
                    <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={next}>{step === 3 ? "Xem gu của tôi" : "Câu tiếp theo →"}</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
