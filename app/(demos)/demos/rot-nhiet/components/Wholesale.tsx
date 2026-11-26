import { ShineSweep } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { GIFTS, WHOLESALE } from "../data/shop";
import { formatVnd } from "../data/menu";

export function Wholesale({ consultHref }: { consultHref: string }) {
  return (
    <section id="ban-buon" className={`${styles.section} ${styles.wsSection}`} aria-labelledby="rn-ws-h">
      <div className={styles.wrap}>
        <div className={styles.sectionHead} data-rn-reveal>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>09 / BÁN BUÔN VÀ QUÀ TẶNG</span>
            <h2 id="rn-ws-h" className={`${styles.display} ${styles.h2}`}>Lấy sỉ, tặng quà.</h2>
          </div>
          <div><p className={styles.lead}>Cho quán cà phê nhỏ, văn phòng và người mua quà. Giá sỉ từ 5 kg mỗi tháng; hộp quà có sẵn tại quán.</p></div>
        </div>
        <div className={styles.wsGrid}>
          <div className={styles.wsTable} data-testid="wholesale-table">
            <h3 className={styles.wsH}>Giá hạt theo kg</h3>
            <table>
              <caption className={styles.srOnly}>Giá hạt bán lẻ và bán buôn theo kg</caption>
              <thead><tr><th scope="col">Loại hạt</th><th scope="col">Bán lẻ / kg</th><th scope="col">Từ 5 kg / tháng</th></tr></thead>
              <tbody>
                {WHOLESALE.map((t) => (
                  <tr key={t.id}><th scope="row">{t.bean}</th><td>{formatVnd(t.retail)}</td><td><b>{formatVnd(t.wholesale)}</b></td></tr>
                ))}
              </tbody>
            </table>
            <ol className={styles.wsSteps}>
              <li><b>1</b> Gửi yêu cầu: loại hạt, số kg mỗi tháng, địa chỉ giao.</li>
              <li><b>2</b> Quán gửi mẫu thử để bạn chọn loại hạt và độ xay.</li>
              <li><b>3</b> Chốt giá, giao theo lịch hằng tuần trong Đà Nẵng.</li>
            </ol>
            <p className={styles.helper}>Giá tham khảo, chốt khi báo giá.</p>
          </div>
          <ul className={styles.gifts}>
            {GIFTS.map((g) => (
              <li key={g.id}>
                <ShineSweep trigger="hover" className={styles.giftShine} color="rgba(255,255,255,0.5)">
                  <div className={styles.gift}>
                    <span className={styles.label}>{g.id}</span>
                    <h3>{g.name}</h3>
                    <p>{g.desc}</p>
                    <p className={styles.giftPrice}>{g.price > 0 ? formatVnd(g.price) : "Báo giá"} <small>{g.note ?? "giá tham khảo"}</small></p>
                  </div>
                </ShineSweep>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.wsCta}>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href={consultHref}>Gửi yêu cầu bán buôn hoặc đặt quà</a>
          <span className={styles.helper}>Yêu cầu được nhận qua form tư vấn của Trần Công Tiến; website không thu tiền.</span>
        </div>
      </div>
    </section>
  );
}
