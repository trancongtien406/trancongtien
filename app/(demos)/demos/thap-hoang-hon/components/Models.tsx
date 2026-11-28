import s from "../brand.module.css";
import { MODELS } from "../data";

export function Models() {
  return (
    <section id="hop-dong" className={s.models} aria-labelledby="md-h">
      <div className={s.secHead}>
        <p className={s.mono}><i className={s.dash} />Hình thức hợp tác</p>
        <h2 id="md-h">Ba cách làm việc, <em>một cam kết như nhau.</em></h2>
      </div>
      <ul className={s.modelGrid}>
        {MODELS.map((m) => (
          <li key={m.t} className={m.hot ? s.modelHot : ""} data-reveal>
            {m.hot && <span className={s.badge}>Phổ biến nhất</span>}
            <h3>{m.t}</h3><b>{m.p}</b><p>{m.d}</p>
            <ul>{m.f.map((x) => (<li key={x}>{x}</li>))}</ul>
            <a className={m.hot ? s.gold : s.pillGhost} href="#lien-he">Trao đổi hình thức này</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
