import s from "../brand.module.css";

export function Contact() {
  return (
    <section className={s.cta} id="lien-he" data-shape="cta" data-chap="lien-he" aria-labelledby="dh-cta">
      <h2 id="dh-cta" className={s.ctaH}>Cùng làm thương hiệu <br />của bạn <em>chuyển động<i>.</i></em></h2>
      <p className={s.heroSmall}>Cho tôi biết bạn cần gì. Tôi trả lời trong vòng 24 giờ.</p>
      <div className={s.heroBtns}>
        <a className={s.pill} href="#bat-dau">Bắt đầu dự án</a>
        <a className={`${s.pill} ${s.pillGhost}`} href="https://zalo.me/" rel="noopener noreferrer">Nhắn qua Zalo</a>
      </div>
      <footer className={s.footer}>
        <div><h3>Liên hệ</h3><p>xinchao@dunghinhminh.example</p><p>Zalo: 090 000 0000</p><p>Gọi: 024 0000 0000</p></div>
        <div><h3>Trang</h3><a href="#du-an">Dự án</a><a href="#dich-vu">Dịch vụ</a><a href="#gioi-thieu">Giới thiệu</a><a href="#bat-dau">Liên hệ</a></div>
        <div><h3>Mạng xã hội</h3><a href="#top">Instagram</a><a href="#top">Behance</a><a href="#top">LinkedIn</a></div>
        <div className={s.footR}><p>© 2026 Dựng Hình Minh</p><p>Hà Nội, làm việc từ xa cả nước</p><a href="#top">Về đầu trang</a></div>
        <p className={s.disc}>Trang minh hoạ thiết kế. Thương hiệu, dự án, đánh giá và số liệu là giả định; ảnh lấy từ Pexels (xem CREDITS).</p>
      </footer>
    </section>
  );
}
