/* eslint-disable @next/next/no-img-element */
import s from "../brand.module.css";
import { CASE_CARDS } from "../data";
import { Starfield } from "./Night";

export function Case() {
  return (
    <section id="cong-trinh-chon" className={s.case} aria-labelledby="cs-h">
      <Starfield />
      <div className={s.caseTitle} data-casetitle>
        <p className={s.mono}><i className={s.dash} />Nghiên cứu điển hình · 2025</p>
        <h2 id="cs-h" data-ghost><span>Bên trong</span> <em>Ánh Hà</em></h2>
        <p className={s.caseHint}>Cuộn tiếp để đi xuyên qua công trình.</p>
      </div>
      <ul className={s.caseCards} data-cards>
        {CASE_CARDS.map((c, i) => (
          <li key={c.t} data-card={i} className={s.cc} style={{ "--x": `${c.x}vw`, "--y": `${c.y}vh`, "--w": `${c.w}vw` } as React.CSSProperties}>
            <img src={`/images/demos/thap-hoang-hon/${c.src}.webp`} style={{ objectPosition: c.pos }} width={900} height={1260} alt={`${c.t} (ảnh minh hoạ)`} loading="lazy" decoding="async" />
            <span>{c.f} · {c.t}</span>
          </li>
        ))}
      </ul>
      <aside className={s.preview} data-preview aria-label="Tóm tắt dự án Ánh Hà Riverside">
        <p className={s.mono}>Xem trước · Nhà ở · 2025</p>
        <h3>Ánh Hà Riverside</h3>
        <dl>
          <div><dt>Căn hộ</dt><dd>286</dd></div>
          <div><dt>Toà</dt><dd>3</dd></div>
          <div><dt>Thi công</dt><dd>26 tháng</dd></div>
          <div><dt>Chứng chỉ</dt><dd>LEED Platinum</dd></div>
        </dl>
        <a className={s.pillGhost} href="#cong-trinh">Xem công trình <span aria-hidden="true">↗</span></a>
      </aside>
      <div className={s.fig} aria-hidden="true"><span data-fig>FIG. 02 / 06</span><i><b data-figbar /></i></div>
    </section>
  );
}
