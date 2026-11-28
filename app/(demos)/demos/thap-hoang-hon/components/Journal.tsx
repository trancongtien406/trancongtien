import s from "../brand.module.css";
import { POSTS } from "../data";

export function Journal() {
  return (
    <section id="nhat-ky" className={s.journal} aria-labelledby="jn-h">
      <div className={s.secHead}>
        <p className={s.mono}><i className={s.dash} />Nhật ký công trường</p>
        <h2 id="jn-h">Chuyện ở sau <em>hàng rào tôn.</em></h2>
      </div>
      <ul className={s.postGrid}>
        {POSTS.map((p, i) => (
          <li key={p.t} data-reveal>
            <article>
              <div className={s.postArt} style={{ "--h": `${200 + i * 28}` } as React.CSSProperties} aria-hidden="true" />
              <p className={s.mono}>{p.tag} · {p.d}</p>
              <h3>{p.t}</h3><p>{p.e}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
