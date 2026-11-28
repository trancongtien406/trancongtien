import s from "../brand.module.css";
import { STEPS } from "../data";

export function Process() {
  return (
    <section id="quy-trinh" className={s.process} aria-labelledby="pr-h">
      <div className={s.processHead}>
        <p className={s.mono}><i className={s.dash} />Quy trình</p>
        <h2 id="pr-h">Sáu bước, <em>từ mảnh đất trống tới chìa khoá.</em></h2>
        <p>Mỗi bước có một người chịu trách nhiệm, một mốc để kiểm và một thứ bạn có thể cầm trên tay.</p>
      </div>
      <ol className={s.steps}>
        {STEPS.map((x) => (
          <li key={x.n} data-reveal>
            <span className={s.stepN}>{x.n}</span>
            <div><h3>{x.t}</h3><p>{x.d}</p></div>
            <span className={s.stepW}>{x.w}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
