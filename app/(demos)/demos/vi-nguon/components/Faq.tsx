import s from "../brand.module.css";
import { FAQS } from "../data";

export function Faq() {
  return (
    <section id="hoi-dap" className={s.faq} aria-labelledby="fq-h">
      <div className={s.center}>
        <h2 id="fq-h" className={s.h2c}>Bạn có <em>thắc mắc?</em></h2>
        <p className={s.lead}>Những câu trả lời rõ ràng về ngân hàng, điều kiện và chi phí.</p>
      </div>
      <div className={s.faqList}>
        {FAQS.map((f) => (<details key={f.q} name="vn-faq"><summary>{f.q}<i aria-hidden="true" /></summary><p>{f.a}</p></details>))}
      </div>
    </section>
  );
}
