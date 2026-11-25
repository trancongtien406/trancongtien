import { FAQ, POLICIES } from "../data/content";
import styles from "../brand.module.css";

export function Faq() {
  return (
    <section className={styles.faq} id="hoi-dap" aria-labelledby="faq-h">
      <div className={styles.faqLeft}>
        <p className={styles.eyebrow}>07 / Những điều cần biết</p>
        <h2 id="faq-h" className={styles.h2}>Trước khi đến Hiên.</h2>
        <p className={styles.lead}>Chính sách lưu trú, viết ngắn để dễ đọc.</p>
        <dl className={styles.policies}>
          {POLICIES.map((p) => (<div key={p.t}><dt>{p.t}</dt><dd>{p.d}</dd></div>))}
        </dl>
      </div>
      <div className={styles.faqRight}>
        <h3 className={styles.h3}>Câu hỏi thường gặp</h3>
        {FAQ.map((f, i) => (
          <details key={f.q} className={styles.qa} open={i === 0}>
            <summary><span>{f.q}</span><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 8l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
