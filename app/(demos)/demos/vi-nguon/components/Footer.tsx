import s from "../brand.module.css";
import { NAV } from "../data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.fTop}>
        <div className={s.fBrand}><p className={s.fLogo}><Logo size={34} /> Ví Nguồn</p><a href="mailto:chao@vinguon.example">chao@vinguon.example</a><a href="tel:+842873000058">028 7300 0058</a><p>12 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh (minh hoạ)</p></div>
        <nav aria-label="Chân trang"><b>Khám phá</b>{NAV.map((n) => (<a key={n.href} href={n.href}>{n.label}</a>))}</nav>
        <nav aria-label="Công ty"><b>Công ty</b><a href="#khach-hang">Khách hàng</a><a href="#goc-nhin">Góc nhìn</a><a href="#hoi-dap">Hỏi đáp</a><a href="#dang-ky">Tuyển dụng</a></nav>
        <nav aria-label="Mạng xã hội"><b>Theo dõi</b><a href="#top">LinkedIn</a><a href="#top">Facebook</a><a href="#top">YouTube</a></nav>
        <a className={s.toTop} href="#top" aria-label="Về đầu trang">↑</a>
      </div>
      <div className={s.fBot}><p>© 2026 Ví Nguồn. Trang minh hoạ cho doanh nghiệp giả định, mọi số liệu chỉ nhằm trình bày thiết kế. Ảnh từ Pexels.</p><a href="#top">Quyền riêng tư</a></div>
    </footer>
  );
}
