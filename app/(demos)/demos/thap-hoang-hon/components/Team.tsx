import s from "../brand.module.css";
import { TEAM } from "../data";

export function Team() {
  return (
    <section id="doi-ngu" className={s.team} aria-labelledby="tm-h">
      <div className={s.secHead}>
        <p className={s.mono}><i className={s.dash} />Đội ngũ</p>
        <h2 id="tm-h">Những người <em>đứng trên công trường.</em></h2>
      </div>
      <ul className={s.teamGrid}>
        {TEAM.map((p) => (
          <li key={p.n} data-reveal>
            <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="none" stroke="#e8c27a" strokeOpacity=".5" /><circle cx="32" cy="32" r="22" fill="#1a2254" /><text x="32" y="38" textAnchor="middle" fill="#e8c27a" fontSize="16" fontFamily="serif">{p.i}</text></svg>
            <div><h3>{p.n}</h3><p>{p.r}</p><span>{p.y}</span></div>
          </li>
        ))}
      </ul>
    </section>
  );
}
