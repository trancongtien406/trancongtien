"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ImageHoverDistort } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { FIRING_FEE, SESSIONS, SLOTS, vnd, type Session } from "../data/data";
import { Engrave } from "./Engrave";

const CONSULT = buildConsultHref("gom-lo");
const MAX = 8;

export function Workshop() {
  const [sid, setSid] = useState<Session["id"] | "">("");
  const [people, setPeople] = useState(2);
  const [slot, setSlot] = useState<string>("");
  const [fire, setFire] = useState<"co" | "khong">("co");
  const [tried, setTried] = useState(false);
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");

  const sess = SESSIONS.find((x) => x.id === sid);
  const calc = useMemo(() => {
    if (!sess) return null;
    const base = sess.price * people;
    const fireFee = fire === "co" ? FIRING_FEE * people : 0;
    return { base, fireFee, total: base + fireFee };
  }, [sess, people, fire]);

  const notes = useMemo(() => {
    if (!sess) return [];
    const n: string[] = [];
    if (fire === "co") n.push("Thời gian nung và ngày lấy sản phẩm: tuỳ lò nung, trao đổi khi đặt.");
    else n.push(sess.id === "ve-men" ? "Vẽ men cần nung để ra màu thật. Nếu không nung, men chưa chảy và món chưa hoàn thiện." : "Không nung: bạn giữ phôi đất mộc, rất dễ vỡ, phù hợp để chụp ảnh và làm kỷ niệm, không dùng đựng đồ ăn.");
    n.push("Mặc quần áo thoải mái, móng tay ngắn. Xưởng có tạp dề.");
    if (people >= 6) n.push("Lớp từ 6 người trở lên nên đặt sớm để giữ chỗ.");
    return n;
  }, [sess, fire, people]);

  const text = sess && calc
    ? [
        `Buổi làm gốm: ${sess.name} (${sess.kind}), ${sess.minutes} phút`,
        `Số người: ${people}`,
        `Khung giờ: ${slot || "chưa chọn"}`,
        `Nung và hoàn thiện: ${fire === "co" ? "có" : "không"}`,
        `Chi phí tham khảo: ${vnd(calc.total)}`,
        ...notes,
      ].join("\n")
    : "";

  async function copy() {
    setTried(true);
    if (!sess || !slot) { setCopied(""); return; }
    try { await navigator.clipboard.writeText(text); setCopied("ok"); } catch { setCopied("fail"); }
  }

  return (
    <section id="buoi-lam-gom" className={s.workshop} aria-labelledby="ws-title">
      <div className={s.wrap}>
        <div className={s.wsHead}>
          <p className={s.hand}>Buổi làm gốm</p>
          <Engrave as="h2" id="ws-title" className={s.h2}>Chọn buổi, xem trước chi phí.</Engrave>
          <p className={s.lead}>Ba cách làm gốm, một lớp nhỏ tối đa {MAX} người. Chọn buổi bạn thích, số người và khung giờ, bên cạnh sẽ hiện bản tóm tắt để bạn đem đi hỏi hoặc gửi cho xưởng.</p>
        </div>

        <div className={s.wsGrid}>
          <div className={s.wsForm}>
            <fieldset className={s.fieldset}>
              <legend>1. Chọn cách làm</legend>
              <div className={s.sessGrid}>
                {SESSIONS.map((x) => (
                  <label key={x.id} className={`${s.sess} ${sid === x.id ? s.sessOn : ""}`} data-cursor="Chọn">
                    <input type="radio" name="session" value={x.id} checked={sid === x.id} onChange={() => { setSid(x.id); setCopied(""); }} />
                    <ImageHoverDistort className={s.sessImg} strength={30} frequency={0.016}>
                      <Image src={`/images/demos/gom-lo/${x.img.file}-600.webp`} alt={x.img.alt} fill sizes="(max-width: 700px) 90vw, 280px" style={{ objectFit: "cover" }} draggable={false} />
                    </ImageHoverDistort>
                    <span className={s.sessBody}>
                      <span className={s.sessKind}>{x.kind} · {x.minutes} phút</span>
                      <span className={s.sessName}>{x.name}</span>
                      <span className={s.sessBlurb}>{x.blurb}</span>
                      <ul>{x.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                      <span className={s.sessPrice}>{vnd(x.price)}<small>/người</small></span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={s.wsRow}>
              <fieldset className={s.fieldset}>
                <legend>2. Số người</legend>
                <div className={s.stepper}>
                  <button type="button" aria-label="Giảm số người" onClick={() => setPeople((p) => Math.max(1, p - 1))} disabled={people <= 1}>−</button>
                  <output aria-live="polite" aria-label={`${people} người`}>{people}</output>
                  <button type="button" aria-label="Tăng số người" onClick={() => setPeople((p) => Math.min(MAX, p + 1))} disabled={people >= MAX}>+</button>
                </div>
                <p className={s.fine}>{people >= MAX ? `Tối đa ${MAX} người một lớp; nhóm đông hơn trao đổi khi đặt.` : "Một lớp tối đa 8 người."}</p>
              </fieldset>

              <fieldset className={s.fieldset} aria-invalid={tried && !slot} aria-describedby={tried && !slot ? "slot-err" : undefined}>
                <legend>3. Khung giờ</legend>
                <div className={s.chips}>
                  {SLOTS.map((x) => (
                    <label key={x} className={`${s.chip} ${slot === x ? s.chipOn : ""}`}>
                      <input type="radio" name="slot" value={x} checked={slot === x} onChange={() => { setSlot(x); setCopied(""); }} />{x}
                    </label>
                  ))}
                </div>
                {tried && !slot && <p id="slot-err" className={s.err} role="alert">Chọn một khung giờ để hoàn tất bản tóm tắt.</p>}
              </fieldset>

              <fieldset className={s.fieldset}>
                <legend>4. Nung và hoàn thiện</legend>
                <div className={s.chips}>
                  <label className={`${s.chip} ${fire === "co" ? s.chipOn : ""}`}><input type="radio" name="fire" value="co" checked={fire === "co"} onChange={() => setFire("co")} />Có nung (+{vnd(FIRING_FEE)}/người)</label>
                  <label className={`${s.chip} ${fire === "khong" ? s.chipOn : ""}`}><input type="radio" name="fire" value="khong" checked={fire === "khong"} onChange={() => setFire("khong")} />Không nung</label>
                </div>
              </fieldset>
            </div>
          </div>

          <aside className={s.summary} aria-labelledby="sum-title" aria-live="polite">
            <p className={s.hand}>Tóm tắt buổi</p>
            <h3 id="sum-title" className={s.h3}>{sess ? `${sess.name} · ${sess.kind}` : "Chưa chọn buổi nào"}</h3>
            {!sess || !calc ? (
              <p className={s.sumEmpty}>Chọn một cách làm ở bên trái để xem thời lượng, chi phí tham khảo và lưu ý cho buổi của bạn.</p>
            ) : (
              <>
                <dl className={s.sumList}>
                  <div><dt>Thời lượng</dt><dd>{sess.minutes} phút</dd></div>
                  <div><dt>Số người</dt><dd>{people}</dd></div>
                  <div><dt>Khung giờ</dt><dd>{slot || "Chưa chọn"}</dd></div>
                  <div><dt>{people} × {vnd(sess.price)}</dt><dd>{vnd(calc.base)}</dd></div>
                  <div><dt>{fire === "co" ? `Nung và hoàn thiện, ${people} × ${vnd(FIRING_FEE)}` : "Nung và hoàn thiện"}</dt><dd>{fire === "co" ? vnd(calc.fireFee) : "Không"}</dd></div>
                </dl>
                <p className={s.sumTotal}><span>Chi phí tham khảo</span><b>{vnd(calc.total)}</b></p>
                <ul className={s.notes}>{notes.map((n) => <li key={n}>{n}</li>)}</ul>
                <div className={s.sumActions}>
                  <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={copy}>Chép bản tóm tắt</button>
                  <a className={s.btn} href={CONSULT}>Gửi tóm tắt cho xưởng</a>
                </div>
                <p className={s.fine} role="status">
                  {copied === "ok" ? "Đã chép vào bộ nhớ tạm." : copied === "fail" ? "Trình duyệt không cho chép. Bạn có thể bôi đen và sao chép tay." : "Bản tóm tắt chỉ nằm trên trình duyệt của bạn. Việc đặt chỗ diễn ra ở bước tư vấn."}
                </p>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
