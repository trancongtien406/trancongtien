import s from "../brand.module.css";
import { PARTNERS } from "../data";

export function Partners() {
  return (
    <section className={s.partners} aria-label="Đối tác và khách hàng">
      <p className={s.mini}>Đồng hành cùng hơn 240 tổ chức tài chính</p>
      <ul>{PARTNERS.map((p) => (<li key={p}>{p}</li>))}</ul>
    </section>
  );
}
