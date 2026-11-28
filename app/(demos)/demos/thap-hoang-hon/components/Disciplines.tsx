import s from "../brand.module.css";
import { DISCIPLINES } from "../data";

const ICONS = [
  <path key="a" d="M4 20V8l8-4 8 4v12M9 20v-6h6v6" />,
  <path key="b" d="M3 20h18M6 20V10l6-6 6 6v10M10 20v-5h4v5" />,
  <g key="c"><circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" /></g>,
  <path key="d" d="M4 4h16v16H4zM4 12h16M12 4v16" />,
  <path key="e" d="M3 12h4l2-6 4 12 2-6h6" />,
];

export function Disciplines() {
  return (
    <section id="nang-luc" className={s.disc} aria-labelledby="ds-h">
      <div className={s.discHead}>
        <div>
          <p className={s.mono}><i className={s.dash} />Năng lực</p>
          <h2 id="ds-h">Năm bộ môn. <em>Một đội, từ khảo sát tới chìa khoá.</em></h2>
        </div>
        <p className={s.discP}>Chúng tôi tự thi công phần việc quyết định chất lượng — bê tông, thép và vỏ bao che — và điều hành mọi hạng mục còn lại như thể chính mình làm.</p>
      </div>
      <ul className={s.deck} data-deck>
        {DISCIPLINES.map((d, i) => (
          <li key={d.t} className={s.dCard} data-dcard>
            <svg className={s.dIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">{ICONS[i]}</svg>
            <span className={s.dNum}>0{i + 1} / 05</span>
            <div className={s.dBody}>
              <h3>{d.t}</h3>
              <em>{d.i}</em>
              <p>{d.p}</p>
              <div className={s.chips}>{d.tags.map((t) => (<span key={t}>{t}</span>))}</div>
            </div>
          </li>
        ))}
      </ul>
      <p className={s.deckNo} aria-hidden="true"><span data-deckno>01</span> / 05</p>
    </section>
  );
}
