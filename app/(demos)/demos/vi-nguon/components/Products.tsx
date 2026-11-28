import s from "../brand.module.css";
import { PRODUCTS } from "../data";

export function Products() {
  return (
    <section id="san-pham" className={s.products} aria-labelledby="pd-h">
      <div className={s.secHead}>
        <p className={s.tagSm}>Sản phẩm</p>
        <h2 id="pd-h" className={s.h2l}>Một nền tảng, <em>mọi dòng tiền.</em></h2>
        <p className={s.lead}>Từ ví cá nhân tới hạ tầng thanh toán cho ngân hàng, các sản phẩm của Ví Nguồn chia sẻ chung một lõi dữ liệu.</p>
      </div>
      <ul className={s.prodGrid}>
        {PRODUCTS.map((p, i) => (
          <li key={p.t} data-reveal>
            <span className={s.prodIco} aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">{[<rect key="a" x="3" y="6" width="18" height="12" rx="3" />, <path key="b" d="M4 20V9l8-5 8 5v11zM9 20v-6h6v6" />, <g key="c"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></g>, <path key="d" d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />, <g key="e"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></g>, <path key="f" d="M4 19V5M4 19h16M8 15l4-4 3 3 5-6" />][i]}</svg></span>
            <p className={s.mini}>{p.tag}</p><h3>{p.t}</h3><p>{p.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
