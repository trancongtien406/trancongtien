"use client";
import { useEffect, useState } from "react";
import styles from "../brand.module.css";

/** Hiện dần các phần tử [data-r] khi cuộn tới. Trạng thái ẩn chỉ đặt trong effect (SSR/no-JS vẫn đủ nội dung). */
export function RevealRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-r]"));
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) { (e.target as HTMLElement).dataset.r = "1"; io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -8% 0px" });
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.95) { el.dataset.r = "0"; io.observe(el); }
    }
    return () => io.disconnect();
  }, []);
  return <>{children}</>;
}

export function Accordion({ items, idp }: { items: { q: string; a: string }[]; idp: string }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={styles.acc}>
      {items.map((f, i) => (
        <div key={f.q} className={styles.accItem} data-open={open === i ? "1" : "0"}>
          <h3><button type="button" aria-expanded={open === i} aria-controls={`${idp}-a${i}`} id={`${idp}-q${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span><i aria-hidden="true">{open === i ? "−" : "+"}</i>
          </button></h3>
          <div id={`${idp}-a${i}`} role="region" aria-labelledby={`${idp}-q${i}`} hidden={open !== i}><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  );
}

export function ContactForm() {
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [type, setType] = useState("Nhận diện thương hiệu");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const er: Record<string, string> = {};
    if (String(f.get("ten") || "").trim().length < 2) er.ten = "Vui lòng nhập tên của bạn.";
    if (!/^\S+@\S+\.\S+$/.test(String(f.get("email") || ""))) er.email = "Email chưa đúng định dạng.";
    if (String(f.get("loi") || "").trim().length < 20) er.loi = "Hãy kể ngắn về dự án (ít nhất 20 ký tự).";
    setErrs(er);
    if (!Object.keys(er).length) setSent(true);
  };
  if (sent) return <div className={styles.ok} role="status"><b>Đã nhận.</b> Cảm ơn bạn, mình sẽ trả lời trong vòng 48 giờ làm việc. <button type="button" onClick={() => setSent(false)}>Gửi thêm</button></div>;
  return (
    <form className={styles.form} noValidate onSubmit={submit}>
      <label className={styles.fld}><span>Tên bạn</span><input name="ten" autoComplete="name" aria-invalid={!!errs.ten} />{errs.ten && <em role="alert">{errs.ten}</em>}</label>
      <label className={styles.fld}><span>Email</span><input name="email" type="email" autoComplete="email" aria-invalid={!!errs.email} />{errs.email && <em role="alert">{errs.email}</em>}</label>
      <fieldset className={styles.chips}>
        <legend>Bạn cần gì?</legend>
        {["Nhận diện thương hiệu", "Website", "Ứng dụng", "Chuyển động"].map((t) => (
          <label key={t}><input type="radio" name="loai" value={t} checked={type === t} onChange={() => setType(t)} /><span>{t}</span></label>
        ))}
      </fieldset>
      <label className={`${styles.fld} ${styles.wide}`}><span>Kể về dự án</span><textarea name="loi" rows={4} aria-invalid={!!errs.loi} />{errs.loi && <em role="alert">{errs.loi}</em>}</label>
      <button type="submit" className={styles.send}>GỬI YÊU CẦU <span aria-hidden="true">↗</span></button>
    </form>
  );
}

export function Newsletter() {
  const [s, setS] = useState<"" | "ok" | "err">("");
  return (
    <form className={styles.news} noValidate onSubmit={(e) => { e.preventDefault(); const v = String(new FormData(e.currentTarget).get("nl") || ""); if (/^\S+@\S+\.\S+$/.test(v)) { setS("ok"); e.currentTarget.reset(); } else setS("err"); }}>
      <label htmlFor="mn-nl">Một thư mỗi tháng: mẫu thử, ghi chú nghề, không quảng cáo.</label>
      <div><input id="mn-nl" name="nl" type="email" placeholder="email@ban.vn" autoComplete="email" /><button type="submit">ĐĂNG KÝ</button></div>
      <p role="status">{s === "ok" ? "Đã đăng ký, cảm ơn bạn." : s === "err" ? "Email chưa đúng định dạng." : ""}</p>
    </form>
  );
}
