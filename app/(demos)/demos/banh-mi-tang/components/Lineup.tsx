import styles from "../brand.module.css";

import { Glitch } from "./Glitch";

const MAINS = [
  { name: "TẦNG ĐƠN", desc: "Một lớp thịt ép nóng, phô mai, dưa leo muối, sốt bơ tỏi.", prices: [["Mình tôi", "52.000đ"], ["Đôi", "79.000đ"], ["Ba lớp", "99.000đ"]], img: "mon-tang-don.webp", alt: "Bánh mì kẹp phô mai, ba chỉ, cà chua và hành tím trên thớt gỗ" },
  { name: "GÀ GIÒN SỐT ỚT", desc: "Đùi gà tẩm bột chiên xù, sốt ớt chua ngọt, rau củ ngâm.", prices: [["Mình tôi", "58.000đ"], ["Đôi", "89.000đ"], ["Ba lớp", "109.000đ"]], img: "mon-ga-gion.webp", alt: "Bánh mì kẹp gà chiên giòn với ba chỉ và xà lách" },
  { name: "COMBO CẢ NHÀ", desc: "Hai ổ Tầng Đôi, khoai lớn, hai trà sữa kem và hai hũ sốt.", prices: [["Hai người", "129.000đ"], ["Bốn người", "239.000đ"], ["Tiệc nhóm", "429.000đ"]], img: "combo-ca-nha.webp", alt: "Combo bánh mì kẹp, khoai chiên và nước ngọt trên nền cam" },
] as const;

const SIDES = [
  { name: "KHOAI GIỜ NGHỈ", desc: "Khoai que cắt dày, chiên hai lần, rắc muối ớt.", prices: [["Vừa", "29.000đ"], ["Lớn", "39.000đ"], ["Khay chia", "59.000đ"]], img: "khoai-gio-nghi.webp", alt: "Khoai chiên trong thố giấy cùng các hũ sốt" },
  { name: "KHOAI SỐT TRỨNG MUỐI", desc: "Khoai chiên phủ sốt trứng muối béo mặn, hành phi.", prices: [["Vừa", "45.000đ"], ["Lớn", "59.000đ"], ["Khay chia", "79.000đ"]], img: "khoai-sot.webp", alt: "Khoai chiên phủ sốt hồng trong hộp giấy" },
  { name: "TRÀ SỮA KEM OREO", desc: "Trà sữa xay, kem tươi, vụn Oreo, sốt caramel.", prices: [["Vừa", "49.000đ"], ["Lớn", "59.000đ"], ["Ly mang đi", "65.000đ"]], img: "tra-sua-oreo.webp", alt: "Ly trà sữa kem vụn Oreo có nắp vòm" },
] as const;

function Row({ items, id }: { items: readonly { name: string; desc: string; prices: readonly (readonly [string, string])[]; img: string; alt: string }[]; id: string }) {
  return (
    <ul className={styles.cards} aria-labelledby={id}>
      {items.map((m) => (
        <li key={m.name} className={styles.mcard}>
          <div className={styles.mimg}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/demos/banh-mi-tang/${m.img}`} alt={m.alt} width={800} height={680} loading="lazy" decoding="async" />
          </div>
          <h3 className={styles.mname}>{m.name}</h3>
          <p className={styles.mdesc}>{m.desc}</p>
          <dl className={styles.mprice}>
            {m.prices.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <a className={styles.btnLine} href="#dat-hang">Đặt ngay</a>
        </li>
      ))}
    </ul>
  );
}

export function Lineup() {
  return (
    <section id="thuc-don" className={styles.lineup} aria-labelledby="lineup-h">
      <Glitch as="h2" text="THỰC ĐƠN." className={styles.lineupH} />
      <p id="lineup-h" className={styles.srOnly}>Thực đơn Bánh Mì Tầng</p>
      <Row items={MAINS} id="lineup-h" />
      <Row items={SIDES} id="lineup-h" />
    </section>
  );
}
