import s from "../brand.module.css";

const stars = (() => {
  let seed = 7; const r = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  return Array.from({ length: 110 }).map(() => `${(r() * 100).toFixed(1)}vw ${(r() * 100).toFixed(1)}vh 0 ${r() < 0.2 ? 1 : 0}px rgba(255,244,220,${(0.3 + r() * 0.6).toFixed(2)})`).join(",");
})();

export function Starfield() {
  return (<><div className={s.stars} style={{ boxShadow: stars }} aria-hidden="true" /><div className={s.shoot} aria-hidden="true" /></>);
}

export function Night() {
  return (
    <section id="dem" className={s.night} aria-labelledby="nt-h">
      <Starfield />
      <svg className={s.eveStar} data-eve viewBox="-50 -50 100 100" aria-hidden="true">
        <defs><radialGradient id="th-eve"><stop offset="0" stopColor="#fffbe8" /><stop offset="1" stopColor="#e8c27a" stopOpacity="0" /></radialGradient></defs>
        <circle r="26" fill="url(#th-eve)" opacity=".5" />
        <path d="M0-30L3-3 30 0 3 3 0 30-3 3-30 0-3-3z" fill="#fff3cc" />
      </svg>
      <div className={s.nightText} data-night>
        <p className={s.mono}><i className={s.dash} />18:52 · Mặt trời lặn trên sông<i className={s.dash} /></p>
        <h2 id="nt-h">Rồi <em>sao hôm</em> xuất hiện.</h2>
      </div>
    </section>
  );
}
