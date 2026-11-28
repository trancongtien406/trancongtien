import s from "../brand.module.css";
import { FAQS } from "../data";

export function Faq() {
  return (
    <section id="hoi-dap" className={s.faq} aria-labelledby="fq-h">
      <div className={s.secHead}>
        <p className={s.mono}><i className={s.dash} />Hỏi đáp</p>
        <h2 id="fq-h">Những câu chủ đầu tư <em>hay hỏi trước tiên.</em></h2>
      </div>
      <div className={s.faqList}>
        {FAQS.map((f, i) => (
          <details key={f.q} open={i === 0} name="th-faq"><summary>{f.q}</summary><p>{f.a}</p></details>
        ))}
      </div>
    </section>
  );
}
