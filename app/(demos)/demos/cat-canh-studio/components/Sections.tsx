import s from "../brand.module.css";
import { Toggle } from "./Toggle";

export function Nav() {
  return (
    <header className={s.navWrap}>
      <nav className={s.nav} aria-label="Chính">
        <a className={s.brandMark} href="#top"><i aria-hidden="true" /><b>Cất Cánh</b> Studio</a>
        <ul>
          <li><a href="#top">Trang chủ</a></li>
          <li><a href="#ung-dung">Ứng dụng</a></li>
          <li><a href="#mau">Bản mẫu</a></li>
          <li><a href="#bang-gia">Bảng giá</a></li>
          <li><a href="#hoi-dap">Hỏi đáp</a></li>
        </ul>
        <a className={s.navBtn} href="#lien-he">Cài đặt ngay</a>
      </nav>
    </header>
  );
}

/** Huy hiệu cố định góc phải dưới, như widget của trang gốc. */
export function Badge() {
  return (
    <a className={s.badge} href="#top" aria-label="Dựng bằng Cất Cánh Studio, đã có trên trình dựng web">
      <span><i aria-hidden="true" />Dựng bằng <b>Cất Cánh Studio</b></span>
      <small>Hiện đã có trên các trình dựng web</small>
    </a>
  );
}

const FAQ = [
  ["Cất Cánh Studio là gì?", "Cất Cánh Studio là bộ ứng dụng không cần code giúp bạn thêm chuyển động theo nhịp cuộn, cảnh 3D và các chi tiết tương tác tinh tế vào website. Mọi thao tác nằm ngay trong trình dựng web bạn đang dùng."],
  ["Tôi có cần biết lập trình để dùng các ứng dụng không?", "Không. Bạn kéo thả, chọn hiệu ứng và chỉnh thông số bằng thanh trượt. Nếu muốn đi sâu hơn, bạn vẫn có thể chèn đoạn mã riêng vào từng phần tử."],
  ["Bộ ứng dụng gồm những gì?", "Ba ứng dụng: Cảnh Ba Chiều để đưa cảnh 3D vào trang, Dòng Chuyển Động để gắn hiệu ứng cuộn, ghim và xuất hiện, và Bộ Hào Quang với ánh sáng, hạt, chất lỏng và kính."],
  ["Tôi có dùng được cho dự án của khách hàng không?", "Có. Giấy phép gói Chuyên Nghiệp và Studio cho phép dùng trong dự án của khách, không giới hạn số website. (Nội dung minh hoạ.)"],
  ["Ứng dụng có chạy nhẹ trên điện thoại không?", "Có. Hiệu ứng tự giảm độ phức tạp trên máy yếu, ngừng vẽ khi ngoài màn hình và tôn trọng cài đặt giảm chuyển động của hệ điều hành."],
  ["Có gói miễn phí không?", "Có gói Khởi Đầu miễn phí, đủ để thử một trang và xuất bản trên tên miền thử nghiệm. Gói trả phí dùng thử 14 ngày, không cần thẻ. (Nội dung minh hoạ.)"],
  ["Tôi bị kẹt thì được hỗ trợ thế nào?", "Bạn có thư viện hướng dẫn video, cộng đồng và hộp thư hỗ trợ trả lời trong một ngày làm việc. Gói Studio có thêm buổi tư vấn trực tiếp mỗi tháng."],
  ["Có làm giúp cả website không?", "Có. Đội Cất Cánh nhận dựng trọn gói trang giới thiệu, trang sản phẩm và trang chiến dịch. Xem các bản mẫu ở trên hoặc nhắn qua biểu mẫu liên hệ."],
];

export function Faq() {
  return (
    <section className={s.faq} id="hoi-dap" aria-labelledby="cc-faq">
      <p className={s.pillTag}><i aria-hidden="true" />Câu hỏi thường gặp</p>
      <h2 id="cc-faq" className={s.h2c}>Bạn còn <span>thắc mắc?</span></h2>
      <div className={s.faqList}>
        {FAQ.map(([q, a], i) => (
          <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  );
}

export function Ready() {
  return (
    <section className={s.ready} id="san-sang" aria-labelledby="cc-ready">
      <div className={s.readyGlow} aria-hidden="true" />
      <h2 id="cc-ready" className={s.readyH}>Sẵn sàng bay b<Toggle size="md" label="Công tắc trang trí" />ng?</h2>
      <a className={s.navBtn} href="#lien-he">Cài đặt ngay</a>
      <footer className={s.footer}>
        <div className={s.fBrand}>
          <p className={s.brandMark}><i aria-hidden="true" /><b>Cất Cánh</b> Studio</p>
          <p>Bộ ứng dụng chuyển động cho website. Số 12 Nguyễn Văn Linh, Hải Châu, Đà Nẵng.<br />chao@catcanh.example · 0236 000 0000</p>
        </div>
        <div><h3>Menu</h3><a href="#top">Trang chủ</a><a href="#cong-ty">Công ty</a><a href="#lien-he">Cài đặt ngay</a><a href="#hoi-dap">Trung tâm hỗ trợ</a></div>
        <div><h3>Ứng dụng</h3><a href="#ung-dung">Cảnh Ba Chiều</a><a href="#ung-dung">Dòng Chuyển Động</a><a href="#ung-dung">Bộ Hào Quang</a><a href="#bang-gia">Bảng giá</a></div>
        <div><h3>Tài nguyên</h3><a href="#bai-viet">Hướng dẫn</a><a href="#bai-viet">Tài liệu</a><a href="#bai-viet">Nhật ký thay đổi</a><a href="#hoi-dap">Điều khoản sử dụng</a><a href="#hoi-dap">Chính sách riêng tư</a></div>
        <div><h3>Mạng xã hội</h3><a href="#top">YouTube</a><a href="#top">TikTok</a><a href="#top">Instagram</a><a href="#top">LinkedIn</a></div>
        <p className={s.disc}>© 2026 Cất Cánh Studio. Trang minh hoạ thiết kế: thương hiệu, giá, số liệu và đánh giá đều là giả định.</p>
      </footer>
    </section>
  );
}
