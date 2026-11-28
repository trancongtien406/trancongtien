import s from "../brand.module.css";
import { VOICES } from "../data";

export function Voices() {
  return (
    <section id="danh-gia" className={s.voices} aria-labelledby="vo-h">
      <div className={s.secHead}>
        <p className={s.mono}><i className={s.dash} />Chủ đầu tư nói gì</p>
        <h2 id="vo-h">Lời của người <em>đã nhận chìa khoá.</em></h2>
      </div>
      <ul className={s.voiceGrid}>
        {VOICES.map((v) => (
          <li key={v.a} data-reveal><blockquote>“{v.q}”</blockquote><p><b>{v.a}</b><span>{v.r}</span></p></li>
        ))}
      </ul>
      <p className={s.note}>Lời đánh giá là nội dung minh hoạ cho thương hiệu giả định.</p>
    </section>
  );
}
