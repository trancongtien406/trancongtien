import s from "../brand.module.css";
import { Starfield } from "./Night";

export function Quote() {
  return (
    <section className={s.quote} aria-label="Lời một chủ đầu tư">
      <Starfield />
      <svg className={s.miniStar} viewBox="-20 -20 40 40" aria-hidden="true"><path d="M0-18L1.6-1.6 18 0 1.6 1.6 0 18-1.6 1.6-18 0-1.6-1.6z" fill="#fff3cc" /></svg>
      <figure data-quote>
        <blockquote><p>“Mọi nhà thầu chúng tôi phỏng vấn đều hứa đúng tiến độ. Chỉ Tháp Hoàng Hôn hứa luôn giờ nắng chiếu vào từng mặt đứng — rồi giữ đúng lời hứa ấy.”</p></blockquote>
        <figcaption><b>Nguyễn Hoài An</b><span>Giám đốc đầu tư, Quỹ Nhà Bến Sông (lời minh hoạ)</span></figcaption>
      </figure>
    </section>
  );
}
