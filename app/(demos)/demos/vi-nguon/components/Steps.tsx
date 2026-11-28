import s from "../brand.module.css";
import { STEPS } from "../data";

export function Steps() {
  return (
    <section id="cach-hoat-dong" className={s.steps} aria-labelledby="stp-h">
      <div className={s.secHead}>
        <p className={s.tagSm}>Cách hoạt động</p>
        <h2 id="stp-h" className={s.h2l}>Từ đăng ký tới dòng tiền <em>đầu tiên trong một buổi chiều.</em></h2>
      </div>
      <ol className={s.stepList}>
        {STEPS.map((x) => (<li key={x.n} data-reveal><span>{x.n}</span><h3>{x.t}</h3><p>{x.d}</p></li>))}
      </ol>
    </section>
  );
}
