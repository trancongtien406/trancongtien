import styles from "../brand.module.css";

const IMG = "/images/demos/cho-ba-mien";

export function Story() {
  return (
    <section id="cau-chuyen" className={styles.sec} aria-labelledby="h-st">
      <div className={styles.split}>
        <div>
          <p className={styles.eyebrow}>Câu chuyện</p>
          <h2 id="h-st" className={styles.h2}>Một chợ quê dựng lại giữa phố</h2>
          <p className={styles.para}>Chợ Ba Miền bắt đầu từ chuyến xe đò chở chè Thái Nguyên, mè xửng Huế và nước dừa Bến Tre về một căn nhà nhỏ ở Sài Gòn. Người nhà, bạn bè ai nhận được cũng hỏi mua thêm.</p>
          <p className={styles.para}>Chúng tôi dựng siêu thị này để giữ cảm giác đi chợ: đi chầm chậm giữa các kệ, cầm gói chè lên ngửi, đọc nhãn, hỏi người bán. Chỉ khác là kệ nằm trong trình duyệt, và đơn hàng đến tận cửa.</p>
          <p className={styles.para}>Mỗi món đều có tên nhà làm, vùng trồng và hạn dùng rõ ràng. Món nào chưa đạt, chúng tôi không lên kệ.</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.sideImg} src={`${IMG}/sieu-thi-loi-di.webp`} alt="Lối đi giữa các kệ hàng (ảnh minh hoạ)" width={900} height={1200} loading="lazy" decoding="async" />
      </div>
    </section>
  );
}

export function Stats() {
  const S = [["12", "nhóm đặc sản chọn lọc"], ["38", "nhà sản xuất đối tác (minh hoạ)"], ["63", "tỉnh thành giao tới"], ["24 giờ", "giao nội thành trong ngày"]];
  return (
    <section className={styles.stats} aria-label="Con số nổi bật">
      <dl>
        {S.map(([n, l]) => (
          <div key={l}><dt>{n}</dt><dd>{l}</dd></div>
        ))}
      </dl>
    </section>
  );
}

const AISLES = [
  ["01", "Chè & đồ uống", "Chè búp, cà phê rang, nước dừa, trà sen. Hương thơm tập trung ở lối đầu tiên."],
  ["02", "Gia vị & nước chấm", "Nước mắm, mắm ruốc, muối tôm, ớt sa tế. Nhãn ghi độ đạm và hạn dùng."],
  ["03", "Bánh kẹo & mứt", "Mè xửng, bánh đậu xanh, bánh ép, mứt sen. Hộp nhỏ dễ làm quà."],
  ["04", "Gạo & khô", "Gạo ST25, khô cá lóc, cá thiều, tôm khô. Đóng hút chân không."],
];

export function Aisles() {
  return (
    <section id="ban-do" className={styles.sec} aria-labelledby="h-bd">
      <p className={styles.eyebrow}>Sơ đồ siêu thị</p>
      <h2 id="h-bd" className={styles.h2}>Bốn lối đi, không lạc đường</h2>
      <ul className={styles.aisles}>
        {AISLES.map(([n, t, d]) => (
          <li key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const GIFTS = [
  { t: "Hộp quà Tết Bắc", p: "389.000đ", d: "Chè búp, cốm, bánh đậu xanh, mứt sen. Hộp giấy gỗ thông.", img: "sp-0.webp" },
  { t: "Hộp quà Cố đô", p: "429.000đ", d: "Mè xửng, bánh ép, mắm ruốc, nước mắm Nam Ô. Gói giấy dó.", img: "sp-4.webp" },
  { t: "Giỏ quà Phương Nam", p: "549.000đ", d: "Cà phê, gạo ST25, khô cá lóc, nước dừa. Giỏ lục bình.", img: "sp-10.webp" },
];

export function Gifts() {
  return (
    <section id="qua-tang" className={`${styles.sec} ${styles.secTint}`} aria-labelledby="h-qt">
      <p className={styles.eyebrow}>Quà biếu</p>
      <h2 id="h-qt" className={styles.h2}>Bộ quà đóng sẵn cho mùa lễ</h2>
      <ul className={styles.gifts}>
        {GIFTS.map((g) => (
          <li key={g.t}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/${g.img}`} alt="" width={160} height={200} loading="lazy" decoding="async" />
            <div>
              <h3>{g.t}</h3>
              <p>{g.d}</p>
              <b>{g.p}</b>
            </div>
            <a className={styles.linkBtn} href="#dat-hang">Đặt bộ quà</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const MAKERS = [
  ["Hợp tác xã chè Tân Cương", "Thái Nguyên", "Sao tay từ búp non, thu hái sáng sớm."],
  ["Làng nghề mè xửng Thuận Thành", "Huế", "Gia đình làm ba đời, mè rang củi."],
  ["Xưởng nước mắm Nam Ô", "Đà Nẵng", "Ủ chượp 12 tháng trong thùng gỗ."],
  ["Vườn dừa xiêm Mỏ Cày", "Bến Tre", "Dừa chín tới, đóng chai trong ngày."],
  ["Nông trại cà phê Cư M'gar", "Đắk Lắk", "Hạt Robusta rang vừa, hậu socola."],
  ["Hội gạo sạch Sóc Trăng", "Sóc Trăng", "ST25 canh tác theo mùa nước nổi."],
];

export function Makers() {
  return (
    <section id="nha-lam" className={styles.sec} aria-labelledby="h-nl">
      <p className={styles.eyebrow}>Người làm ra món ngon</p>
      <h2 id="h-nl" className={styles.h2}>Biết tên người làm, biết nguồn gốc</h2>
      <ul className={styles.makers}>
        {MAKERS.map(([n, w, d]) => (
          <li key={n}>
            <small>{w}</small>
            <h3>{n}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ul>
      <p className={styles.fineLine}>Tên cơ sở trên đây chỉ là ví dụ minh hoạ.</p>
    </section>
  );
}

const REV = [
  ["Cô Lan, Quận 7", "Đặt hộp quà cho nhà ngoại. Chè thơm, mè xửng dẻo, gói rất cẩn thận."],
  ["Anh Quân, Hà Nội", "Lâu rồi mới tìm được nước mắm Nam Ô đúng vị. Giao hai ngày là tới."],
  ["Chị Thảo, Đà Lạt", "Thích nhất là dạo kệ 3D, như đi siêu thị thật. Giỏ hàng cập nhật liền."],
];

export function Reviews() {
  return (
    <section className={`${styles.sec} ${styles.secTint}`} aria-labelledby="h-rv">
      <p className={styles.eyebrow}>Khách hàng nói</p>
      <h2 id="h-rv" className={styles.h2}>Nhận hàng xong, họ viết lại</h2>
      <ul className={styles.reviews}>
        {REV.map(([n, q]) => (
          <li key={n}>
            <p className={styles.stars} aria-label="5 sao">★★★★★</p>
            <blockquote>{q}</blockquote>
            <cite>{n}</cite>
          </li>
        ))}
      </ul>
      <p className={styles.fineLine}>Đánh giá là nội dung minh hoạ, không phải khách hàng thật.</p>
    </section>
  );
}

const FAQ = [
  ["Hàng có được kiểm tra trước khi giao không?", "Có. Mỗi gói được kiểm hạn dùng, niêm phong và chụp ảnh trước khi đóng thùng. Món nào lỗi, bạn được đổi hoặc hoàn tiền trong 48 giờ."],
  ["Giao hàng mất bao lâu?", "Nội thành TP. Hồ Chí Minh và Hà Nội trong ngày nếu đặt trước 15:00. Các tỉnh khác 2–3 ngày làm việc."],
  ["Phí vận chuyển tính thế nào?", "Miễn phí cho đơn từ 300.000đ. Đơn nhỏ hơn thu 25.000đ nội thành và 35.000đ liên tỉnh (ví dụ minh hoạ)."],
  ["Hàng khô, hàng nước có bảo quản riêng không?", "Có. Nước mắm, nước dừa đóng thùng chống sốc, hàng khô hút chân không, mứt và bánh có gói hút ẩm."],
  ["Tôi có thể gói quà và gửi thiệp không?", "Được. Chọn bộ quà đóng sẵn hoặc ghi chú trong form đặt hàng, chúng tôi gói giấy dó và viết thiệp tay miễn phí."],
  ["Thanh toán bằng hình thức nào?", "Thanh toán khi nhận hàng, chuyển khoản QR và ví điện tử. Trang này là bản minh hoạ nên không thu tiền thật."],
  ["Có bán sỉ cho quán và cửa hàng không?", "Có. Từ 20kg mỗi lần đặt, chúng tôi báo giá sỉ riêng. Gọi hotline hoặc nhắn qua form."],
];

export function Faq() {
  return (
    <section id="hoi-dap" className={styles.sec} aria-labelledby="h-fq">
      <p className={styles.eyebrow}>Hỏi đáp</p>
      <h2 id="h-fq" className={styles.h2}>Những câu khách hay hỏi</h2>
      <div className={styles.faq}>
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer id="lien-he" className={styles.footer}>
      <div className={styles.fTop}>
        <div>
          <strong>Chợ Ba Miền</strong>
          <p>Siêu thị đặc sản trực tuyến. Hotline minh hoạ: 1900 0000 · 08:00–21:00 mỗi ngày.</p>
          <address>45 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh<br />xinchao@chobamien.example</address>
        </div>
        <nav aria-label="Sơ đồ trang">
          <b>Sơ đồ trang</b>
          <a href="#ba-mien">Ba miền</a>
          <a href="#dac-san">Quầy đặc sản</a>
          <a href="#qua-tang">Quà biếu</a>
          <a href="#giao-hang">Giao hàng</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <nav aria-label="Mạng xã hội">
          <b>Theo dõi</b>
          <a href="#top">Facebook</a>
          <a href="#top">Zalo</a>
          <a href="#top">YouTube</a>
        </nav>
      </div>
      <p className={styles.fine}>© 2026 Chợ Ba Miền. Trang minh hoạ thiết kế. Thương hiệu, sản phẩm, giá, đánh giá và thông tin liên hệ chỉ là ví dụ, không phải doanh nghiệp thật. Ảnh: Pexels.</p>
    </footer>
  );
}
