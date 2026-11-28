import type { Metadata } from "next";
import styles from "./brand.module.css";
import { PRODUCTS, REGION_LABEL, fmtVnd, type Region } from "./components/data";
import { Catalog } from "./components/Catalog";
import { Checkout, Newsletter } from "./components/CheckoutNews";
import { Aisles, Faq, Gifts, Makers, Reviews, SiteFooter, Stats, Story } from "./components/Sections";
import { StoreWalk } from "./components/StoreWalk";

export const metadata: Metadata = {
  alternates: { canonical: "/demos/cho-ba-mien" },
};

const REGIONS: { id: Region; alt: string; title: string; lead: string }[] = [
  { id: "bac", alt: "Hồ Gươm và tháp Rùa giữa Hà Nội, ảnh minh hoạ", title: "Miền Bắc", lead: "Chè búp, cốm mới, bánh đậu xanh, mứt sen: vị thanh, ngọt dịu, đóng gói theo mùa." },
  { id: "trung", alt: "Phố cổ Hội An với đèn lồng nhiều màu, ảnh minh hoạ", title: "Miền Trung", lead: "Mè xửng, mắm ruốc, bánh ép, nước mắm Nam Ô: đậm vị, cay mặn, để được lâu." },
  { id: "nam", alt: "Xuồng chèo trên kênh rạch miền Tây, ảnh minh hoạ", title: "Nam & Tây Nguyên", lead: "Nước dừa, gạo ST25, cà phê, khô cá lóc: hạt to, thơm nắng, ăn là nhớ." },
];

const STEPS = [
  ["01", "Dạo kệ", "Cuộn trang để đi bộ giữa các lối đặc sản, chấm tròn trắng báo món đang ở trước mặt."],
  ["02", "Thêm vào giỏ", "Bấm nút ở thẻ nổi phía dưới, giỏ cập nhật ngay trên thanh trên cùng."],
  ["03", "Nhận hàng", "Đóng thùng chống sốc, giao nội thành trong ngày, tỉnh khác 2–3 ngày."],
];

export default function Page() {
  return (
    <div className={styles.brand}>
      <a className={styles.skip} href="#ba-mien">Bỏ qua cảnh 3D, tới danh sách đặc sản</a>
      <StoreWalk />
      <main>
        <section id="ba-mien" className={styles.sec} aria-labelledby="h-bm">
          <p className={styles.eyebrow}>Ba lối đi, một giỏ hàng</p>
          <h2 id="h-bm" className={styles.h2}>Đặc sản ba miền, xếp ngay ngắn trên kệ</h2>
          <div className={styles.regions}>
            {REGIONS.map((r) => (
              <article key={r.id} className={styles.region}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.rimg} src={`/images/demos/cho-ba-mien/vung-${r.id}.webp`} alt={r.alt} width={900} height={620} loading="lazy" decoding="async" />
                <h3>{r.title}</h3>
                <p>{r.lead}</p>
                <ul className={styles.plist}>
                  {PRODUCTS.filter((p) => p.region === r.id).map((p) => (
                    <li key={p.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className={styles.pack} src={`/images/demos/cho-ba-mien/sp-${p.id}.webp`} alt="" width={46} height={58} loading="lazy" decoding="async" />
                      <span>
                        <strong>{p.name}</strong>
                        <small>{fmtVnd(p.price)} · {p.note}</small>
                      </span>
                    </li>
                  ))}
                </ul>
                <span className={styles.tag}>{REGION_LABEL[r.id]}</span>
              </article>
            ))}
          </div>
        </section>

        <Catalog />
        <Story />
        <Stats />
        <Aisles />
        <Gifts />
        <Makers />
        <section id="giao-hang" className={`${styles.sec} ${styles.secBlue}`} aria-labelledby="h-gh">
          <p className={styles.eyebrow}>Mua sắm không cần xếp hàng</p>
          <h2 id="h-gh" className={styles.h2}>Từ kệ 3D tới cửa nhà bạn</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.band} src="/images/demos/cho-ba-mien/sieu-thi-ke.webp" alt="Dãy kệ hàng đầy đồ khô và thực phẩm đóng gói (ảnh minh hoạ)" width={1400} height={700} loading="lazy" decoding="async" />
          <ol className={styles.steps}>
            {STEPS.map(([n, t, d]) => (
              <li key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>
        <Reviews />
        <Faq />
        <Checkout />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
