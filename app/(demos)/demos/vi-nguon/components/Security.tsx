import s from "../brand.module.css";
import { SECURITY } from "../data";

export function Security() {
  return (
    <section id="bao-mat" className={s.security} aria-labelledby="sc-h">
      <div className={s.secL}>
        <p className={`${s.tagSm} ${s.tagOnDark}`}>Bảo mật & tuân thủ</p>
        <h2 id="sc-h" className={`${s.h2l} ${s.white}`}>Tiền của bạn được giữ <em>như thể của chúng tôi.</em></h2>
        <p className={`${s.lead} ${s.whiteSoft}`}>Bảo mật không phải một tính năng thêm vào, mà là cách chúng tôi thiết kế từng dòng mã và từng quy trình vận hành.</p>
        <div className={s.certs}><span>ISO 27001</span><span>PCI DSS</span><span>SOC 2</span></div>
      </div>
      <ul className={s.secGrid}>
        {SECURITY.map((x, i) => (<li key={x.t} data-reveal><b>0{i + 1}</b><h3>{x.t}</h3><p>{x.d}</p></li>))}
      </ul>
    </section>
  );
}
