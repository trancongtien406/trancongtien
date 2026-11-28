import s from "../brand.module.css";
import { POSTS } from "../data";

export function Insights() {
  return (
    <section id="goc-nhin" className={s.insights} aria-labelledby="in-h">
      <div className={s.secHead}>
        <p className={s.tagSm}>Góc nhìn</p>
        <h2 id="in-h" className={s.h2l}>Điều chúng tôi <em>học được mỗi tuần.</em></h2>
      </div>
      <ul className={s.postGrid}>
        {POSTS.map((p, i) => (
          <li key={p.t} data-reveal>
            <article>
              <div className={s.postArt} style={{ "--a": `${200 + i * 40}deg` } as React.CSSProperties} aria-hidden="true" />
              <p className={s.mini}>{p.tag} · {p.d}</p><h3>{p.t}</h3><p>{p.e}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
