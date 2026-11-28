import s from "../brand.module.css";
import { Logo } from "./Logo";

export function About() {
  return (
    <section id="gioi-thieu" className={s.about} aria-labelledby="ab-h">
      <p className={s.tagSm}><Logo size={16} light={false} /> Về Ví Nguồn</p>
      <h2 id="ab-h" className={s.aboutP} data-words>
        <em>Chúng tôi tin tương lai của ngân hàng là số hoá,</em> minh bạch và đặt khách hàng lên trước. <span className={s.hl}>Nền tảng của chúng tôi giúp các tổ chức tài chính</span> chuyển vận hành truyền thống thành trải nghiệm số liền mạch, nâng cao niềm tin, hiệu quả và đổi mới ở mọi cấp độ.
      </h2>
    </section>
  );
}
