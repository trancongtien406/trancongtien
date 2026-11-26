"use client";

import { useRef, useState, type FormEvent } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { ShineSweep } from "@/features/showroom/effects";
import { INTERESTS, MODE, WHEN, WHO, CENTER } from "../data/center";
import { SLUG } from "../data/content";
import styles from "../brand.module.css";

type Pick = { who: string; interest: string; when: string; mode: string };

function Group({ name, legend, options, value, onChange, error, id }: { name: string; legend: string; options: readonly { id: string; label: string }[]; value: string; onChange: (v: string) => void; error?: string; id: string }) {
  return (
    <fieldset className={styles.regSet} aria-describedby={error ? `${id}-err` : undefined}>
      <legend>{legend}</legend>
      <div className={styles.regOpts}>
        {options.map((o) => (
          <div key={o.id} className={styles.regOpt}>
            <input id={`${id}-${o.id}`} type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} aria-invalid={error ? true : undefined} />
            <label htmlFor={`${id}-${o.id}`}>{o.label}</label>
          </div>
        ))}
      </div>
      {error && <p id={`${id}-err`} className={styles.err} role="alert">{error}</p>}
    </fieldset>
  );
}

export function Register() {
  const [v, setV] = useState<Pick>({ who: "", interest: "", when: "", mode: "" });
  const [errs, setErrs] = useState<Partial<Record<keyof Pick, string>>>({});
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState("");
  const out = useRef<HTMLDivElement>(null);
  const set = (k: keyof Pick) => (x: string) => { setV((p) => ({ ...p, [k]: x })); setErrs((e) => ({ ...e, [k]: undefined })); };
  const label = (list: readonly { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label ?? "";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: typeof errs = {};
    if (!v.who) er.who = "Hãy chọn người sẽ học.";
    if (!v.interest) er.interest = "Hãy chọn môn bạn quan tâm.";
    if (!v.when) er.when = "Hãy chọn khung giờ thuận tiện.";
    if (!v.mode) er.mode = "Hãy chọn hình thức học.";
    setErrs(er);
    if (Object.keys(er).length) { setSummary(""); document.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus(); return; }
    setSummary(`Đăng ký học thử tại Mở Lời · Người học: ${label(WHO, v.who)} · Môn: ${label(INTERESTS, v.interest)} · Giờ thuận tiện: ${label(WHEN, v.when)} · Hình thức: ${label(MODE, v.mode)}.`);
    setCopied("");
    window.setTimeout(() => out.current?.focus(), 30);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied("Đã chép tóm tắt."); }
    catch { setCopied("Chưa chép được, bạn hãy bôi đen đoạn trên và sao chép thủ công."); }
  };

  return (
    <section id="dang-ky" className={`${styles.panel} ${styles.panelYellow} ${styles.final}`} aria-labelledby="reg-title">
      <div className={styles.regGrid}>
        <div>
          <p className={styles.kicker}>Đăng ký học thử và tư vấn</p>
          <h2 id="reg-title" className={styles.hFinal}>Học thử một buổi miễn phí, rồi quyết định.</h2>
          <p className={styles.lede}>Cho chúng mình biết bạn quan tâm môn nào và rảnh lúc nào, tư vấn viên sẽ gợi ý lớp đúng cấp. Biểu mẫu này chỉ tạo bản tóm tắt; họ tên và số điện thoại bạn để lại ở form tư vấn.</p>
          <ul className={styles.contact}>
            <li><b>Địa điểm</b> {CENTER.area}</li>
            <li><b>Giờ làm việc</b> {CENTER.hours}</li>
            <li><b>Điện thoại</b> <span translate="no">0236 000 0000</span></li>
            <li><b>Email</b> <a href="mailto:xinchao@moloi.example">xinchao@moloi.example</a></li>
          </ul>
        </div>
        <form className={styles.regForm} onSubmit={submit} noValidate>
          <Group id="rg-who" name="who" legend="Ai sẽ học?" options={WHO} value={v.who} onChange={set("who")} error={errs.who} />
          <Group id="rg-int" name="interest" legend="Bạn quan tâm môn nào?" options={INTERESTS} value={v.interest} onChange={set("interest")} error={errs.interest} />
          <Group id="rg-when" name="when" legend="Khung giờ thuận tiện" options={WHEN} value={v.when} onChange={set("when")} error={errs.when} />
          <Group id="rg-mode" name="mode" legend="Hình thức học" options={MODE} value={v.mode} onChange={set("mode")} error={errs.mode} />
          <button type="submit" className={`${styles.btn} ${styles.btnNavy} ${styles.btnLg}`}>Tạo tóm tắt đăng ký</button>
          <div ref={out} tabIndex={-1} className={styles.regOut} aria-live="polite" data-has={summary ? "1" : "0"}>
            {summary ? (
              <>
                <h3 className={styles.h5}>Tóm tắt đăng ký của bạn</h3>
                <p className={styles.summaryText}>{summary}</p>
                <div className={styles.resultBtns}>
                  <ShineSweep trigger="loop" every={4} className={styles.shine}>
                    <a className={`${styles.btn} ${styles.btnNavy}`} href={buildConsultHref(SLUG)}>Gửi cho tư vấn viên</a>
                  </ShineSweep>
                  <button type="button" className={`${styles.btn} ${styles.btnGhostN}`} onClick={copy}>Chép tóm tắt</button>
                </div>
                <p className={styles.copied} role="status">{copied}</p>
              </>
            ) : <p className={styles.dim}>Chọn đủ bốn mục rồi bấm Tạo tóm tắt.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
