import { CHECKLIST, EXCLUDED, INCLUDED, PRICES, RENTALS } from "../data/content";
import { Divider } from "./Art";
import styles from "../brand.module.css";

export function Pricing() {
  return (
    <section id="bang-gia" className={styles.pricing} aria-labelledby="bg-title">
      <Divider fill="var(--rs-brown)" className={styles.dividerTop} />
      <div className={styles.wrap}>
        <p className={styles.kickerDark} data-rs="reveal">Giá, bao gồm và đồ cần mang</p>
        <h2 id="bg-title" className={styles.h2} data-rs="reveal">Giá rõ ràng, <span className={styles.script}>mang gì cũng rõ</span></h2>
        <p className={styles.lede} data-rs="reveal">Giá tham khảo theo từng người, tính bằng đồng. Giá có thể điều chỉnh theo mùa và theo nhóm; mức cuối cùng được báo khi đặt lịch.</p>

        <div className={styles.priceGrid}>
          <div className={`${styles.pbox} ${styles.pboxMain}`} data-rs="reveal">
            <h3 className={styles.pboxH}>Bảng giá khoá học</h3>
            <table className={styles.priceTable}>
              <caption className={styles.srOnly}>Bảng giá các khoá học</caption>
              <thead><tr><th scope="col">Khoá</th><th scope="col">Thời lượng</th><th scope="col" className={styles.r}>Giá tham khảo</th></tr></thead>
              <tbody>
                {PRICES.map((p) => (
                  <tr key={p.name}><th scope="row">{p.name}</th><td>{p.len}</td><td className={styles.r}><b>{p.price}</b></td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pbox} data-rs="reveal">
            <h3 className={styles.pboxH}>Thuê ván và đồ</h3>
            <ul className={styles.rentList}>
              {RENTALS.map((r) => (
                <li key={r.name}><span>{r.name}</span><b>{r.price}</b></li>
              ))}
            </ul>
            <p className={styles.fineDark}>Đặt cọc ván bằng giấy tờ hoặc tiền mặt, trả lại khi giao ván.</p>
          </div>

          <div className={styles.pbox} data-rs="reveal">
            <h3 className={styles.pboxH}>Giá đã gồm</h3>
            <ul className={styles.tickList}>{INCLUDED.map((t) => <li key={t}>{t}</li>)}</ul>
            <h3 className={`${styles.pboxH} ${styles.pboxH2}`}>Chưa gồm</h3>
            <ul className={`${styles.tickList} ${styles.crossList}`}>{EXCLUDED.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>

          <div className={`${styles.pbox} ${styles.pboxBring}`} data-rs="reveal">
            <h3 className={styles.pboxH}>Đồ cần mang</h3>
            <ul className={styles.tickList}>{CHECKLIST.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className={styles.fineDark}>Muốn tick từng món? Dùng phần chọn khoá phù hợp bên dưới, có danh sách theo dõi chuẩn bị.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
