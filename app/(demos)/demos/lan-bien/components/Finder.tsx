"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MagneticButton, SplitWords, gsap, prefersReducedMotion } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import {
  CERTS, EXPERIENCES, GOALS, recommend, toggleCert, validate,
  type Cert, type FinderErrors, type FinderInput, type Recommendation,
} from "../lib/finder";
import styles from "../brand.module.css";

const EMPTY: FinderInput = { experience: "", certs: [], goal: "" };

/** Bậc chương trình (không phải độ sâu): dùng cho thang hiển thị bên cạnh gợi ý. */
const LADDER = [
  { k: "snorkeling", t: "Mặt nước", d: "Snorkeling" },
  { k: "discover", t: "Làm quen", d: "Buổi thử có bình khí" },
  { k: "owd", t: "Nền tảng", d: "Khoá nhập môn" },
  { k: "aowd", t: "Mở rộng", d: "Cần có nền tảng" },
] as const;
const rungOf = (id: string) => (id === "reef" || id === "advisory" ? "aowd" : id);

export function Finder() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [v, setV] = useState<FinderInput>(EMPTY);
  const [errs, setErrs] = useState<FinderErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "result">("idle");
  const [res, setRes] = useState<Recommendation | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const out = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const href = buildConsultHref("lan-bien");

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (status !== "result" || !out.current || prefersReducedMotion()) return;
    const items = out.current.querySelectorAll("[data-stagger]");
    const t = gsap.fromTo(items, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power3.out", clearProps: "transform,opacity" });
    return () => { t.kill(); };
  }, [status, res]);

  const set = <K extends keyof FinderInput>(k: K, val: FinderInput[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrs((e) => { const n = { ...e }; delete n[k]; return n; });
    if (status === "result") { setStatus("idle"); setRes(null); }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er = validate(v);
    setErrs(er);
    if (Object.keys(er).length) {
      setStatus("idle"); setRes(null);
      const first = (["experience", "certs", "goal"] as const).find((k) => er[k]);
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>(`[data-group="${first}"] input`)?.focus());
      return;
    }
    setStatus("loading");
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const r = recommend(v);
      setRes(r);
      setStatus("result");
      if (r.courseId) window.dispatchEvent(new CustomEvent("lb:course", { detail: r.courseId }));
    }, prefersReducedMotion() ? 0 : 260);
  };

  const reset = () => {
    setV(EMPTY); setErrs({}); setRes(null); setStatus("idle");
    requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[data-group="experience"] input')?.focus());
  };

  const eid = (k: string) => `${uid}-${k}-err`;
  const group = (k: "experience" | "certs" | "goal") => ({
    "data-group": k, "aria-describedby": errs[k] ? eid(k) : undefined,
  });

  return (
    <section id="cong-cu" className={styles.finder} aria-labelledby="finder-title">
      <div className={styles.wrap}>
        <div className={styles.finderGrid}>
          <div className={styles.finderIntro} data-lb="reveal">
            <p className={styles.kicker}>Dive Level Finder</p>
            <h2 id="finder-title" className={styles.h2}><SplitWords as="span">Bạn đang ở tầng nào?</SplitWords></h2>
            <p className={styles.lede}>Không phải ai cũng bắt đầu từ cùng một điểm. Chia sẻ một chút về trải nghiệm, nền tảng hiện tại và điều bạn muốn khám phá. Tầng Xanh sẽ gợi ý chương trình để bạn tìm hiểu kỹ hơn trước khi trao đổi với hướng dẫn viên.</p>
            <p className={styles.finderNote}>Đây là công cụ định hướng ban đầu. Nó không đánh giá điều kiện sức khoẻ, không cấp phép lặn và không thay quyết định của hướng dẫn viên. Kết quả chỉ tính trong trình duyệt của bạn, chúng tôi không thu thập thông tin ở bước này.</p>
          </div>

          <form ref={form} className={styles.finderCard} onSubmit={submit} noValidate aria-busy={status === "loading"} data-lb="reveal">
            <fieldset className={styles.field} {...group("experience")}>
              <legend><span>1</span>Kinh nghiệm hiện tại của bạn</legend>
              <div className={styles.opts}>
                {EXPERIENCES.map((o) => (
                  <label key={o.value} className={styles.opt}>
                    <input type="radio" name="experience" value={o.value} checked={v.experience === o.value} onChange={() => set("experience", o.value)} aria-invalid={errs.experience ? true : undefined} aria-describedby={errs.experience ? eid("experience") : undefined} />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
              {errs.experience && <p id={eid("experience")} className={styles.err}>{errs.experience}</p>}
            </fieldset>

            <fieldset className={styles.field} {...group("certs")}>
              <legend><span>2</span>Chứng chỉ bạn đang có <small>(chọn được nhiều mục)</small></legend>
              <div className={styles.opts}>
                {CERTS.map((o) => (
                  <label key={o.value} className={`${styles.opt} ${styles.optCheck}`}>
                    <input type="checkbox" name="certs" value={o.value} checked={v.certs.includes(o.value)} onChange={() => set("certs", toggleCert(v.certs, o.value as Cert))} aria-invalid={errs.certs ? true : undefined} aria-describedby={errs.certs ? eid("certs") : undefined} />
                    <span>{o.label}{o.hint ? <small>{o.hint}</small> : null}</span>
                  </label>
                ))}
              </div>
              {errs.certs && <p id={eid("certs")} className={styles.err}>{errs.certs}</p>}
            </fieldset>

            <fieldset className={styles.field} {...group("goal")}>
              <legend><span>3</span>Điều bạn muốn khám phá</legend>
              <div className={styles.opts}>
                {GOALS.map((o) => (
                  <label key={o.value} className={styles.opt}>
                    <input type="radio" name="goal" value={o.value} checked={v.goal === o.value} onChange={() => set("goal", o.value)} aria-invalid={errs.goal ? true : undefined} aria-describedby={errs.goal ? eid("goal") : undefined} />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
              {errs.goal && <p id={eid("goal")} className={styles.err}>{errs.goal}</p>}
            </fieldset>

            <div className={styles.finderActions}>
              <button type="submit" className={`${styles.btn} ${styles.btnCoral}`} disabled={status === "loading"}>
                {status === "loading" ? "Đang xem gợi ý…" : "Xem gợi ý"}
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnText}`} onClick={reset}>Làm lại</button>
            </div>

            <div ref={out} className={styles.result} aria-live="polite" data-state={status}>
              {status === "result" && res && (
                <div className={styles.resultCard} data-result={res.id}>
                  <div className={styles.resultMain}>
                    <p className={styles.badge} data-stagger="">{res.needsReview ? "Cần trao đổi thêm" : "Gợi ý phù hợp để tìm hiểu"}</p>
                    <h3 className={styles.resultTitle} data-stagger="">{res.title}</h3>
                    <p className={styles.resultBlurb} data-stagger="">{res.blurb}</p>
                    <p className={styles.resultWhy} data-stagger=""><b>Vì sao có gợi ý này?</b> {res.why}</p>
                    <h4 data-stagger="">Danh sách chuẩn bị</h4>
                    <ul className={styles.prep}>
                      {res.prep.map((p) => <li key={p} data-stagger="">{p}</li>)}
                    </ul>
                    <p className={styles.resultFine} data-stagger="">Gợi ý này không xác nhận bạn đủ điều kiện sức khoẻ hoặc đủ điều kiện cho một buổi lặn cụ thể. Quyết định cuối cùng thuộc về hướng dẫn viên sau khi trao đổi với bạn.</p>
                    <div className={styles.resultCtas} data-stagger="">
                      <MagneticButton><a className={`${styles.btn} ${styles.btnCoral}`} href={href}>Trao đổi với Tầng Xanh</a></MagneticButton>
                      {res.courseId && <a className={`${styles.btn} ${styles.btnGhost}`} href="#khoa-hoc">Xem khoá học</a>}
                    </div>
                  </div>
                  <ol className={styles.ladder} aria-label="Vị trí gợi ý trong các chương trình" data-stagger="">
                    {LADDER.map((r, i) => (
                      <li key={r.k} data-on={rungOf(res.id) === r.k ? "1" : "0"} style={{ ["--i" as string]: i }}>
                        <b>{r.t}</b><small>{r.d}</small>
                      </li>
                    ))}
                    <li className={styles.ladderSide} data-on={res.id === "freediving" ? "1" : "0"}><b>Lặn tự do</b><small>Đào tạo riêng</small></li>
                  </ol>
                </div>
              )}
              {status === "loading" && <p className={styles.resultWait}>Đang xem gợi ý…</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
