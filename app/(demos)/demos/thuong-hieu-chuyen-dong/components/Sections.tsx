import s from "../brand.module.css";

export function Header() {
  return (
    <header className={s.header}>
      <a className={s.logo} href="#top" aria-label="Dựng Hình Minh, về đầu trang"><b>Dm</b><span>Hình Minh</span></a>
      <nav className={s.nav} aria-label="Chính">
        <a href="#du-an">Dự án</a>
        <a href="#dich-vu">Dịch vụ</a>
        <a href="#gioi-thieu">Giới thiệu</a>
        <a className={s.navCta} href="#lien-he">Liên hệ</a>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section className={s.hero} id="top" data-shape="sphere" data-chap="top" aria-labelledby="dh-h1">
      <p className={s.heroSmall}>Tôi thiết kế và dựng website, làm phim chuyển động cho thương hiệu, và phát triển ứng dụng, phần mềm.</p>
      <h1 id="dh-h1" className={s.h1}>Tôi làm thương hiệu<br /><em>chuyển động<i>.</i></em></h1>
      <div className={s.heroBtns}>
        <a className={s.pill} href="#du-an">Xem dự án</a>
        <a className={`${s.pill} ${s.pillGhost}`} href="#bat-dau">Bắt đầu dự án</a>
      </div>
      <div className={s.heroFoot}>
        <p><span className={s.dot} aria-hidden="true" /> Đang nhận dự án mới</p>
        <p className={s.scrollHint}>Cuộn xuống</p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className={s.about} id="gioi-thieu" data-shape="sphere" data-chap="gioi-thieu" aria-labelledby="dh-about">
      <p className={s.eyebrow}>Giới thiệu</p>
      <h2 id="dh-about" className={s.aboutH}>Tôi là Minh. Tôi thiết kế website của bạn, dựng phim cho thương hiệu và viết phần mềm cho công việc hằng ngày.</h2>
      <div className={s.aboutCols}>
        <p>Chín năm làm việc một mình giúp tôi giữ được thứ mà các studio lớn hay đánh mất: bạn nói chuyện thẳng với người làm ra sản phẩm. Không qua trung gian, không họp thừa, không báo giá mơ hồ.</p>
        <p>Tôi bắt đầu từ thiết kế đồ hoạ chuyển động, rồi học lập trình để biến những khung hình thành trang web chạy thật. Nhờ vậy mỗi dự án có đủ ba thứ: ý tưởng gọn, hình ảnh đẹp và mã nguồn sạch.</p>
        <ul className={s.aboutFacts}>
          <li><b>9 năm</b><span>làm thương hiệu và sản phẩm số</span></li>
          <li><b>120+</b><span>dự án đã bàn giao (số liệu minh hoạ)</span></li>
          <li><b>24 giờ</b><span>để bạn thấy bản chạy thử đầu tiên</span></li>
        </ul>
      </div>
    </section>
  );
}

const SERVICES: { id: string; shape: string; title: string; text: string; tags: string[]; link: string }[] = [
  { id: "dich-vu", shape: "browser", title: "Website", text: "Website tuỳ biến, tải nhanh, trông cao cấp và mang khách về cho bạn. Trang giới thiệu doanh nghiệp, cửa hàng online và trải nghiệm 3D như trang này.", tags: ["Website doanh nghiệp", "Landing page", "Cửa hàng online", "Làm lại website", "SEO và tốc độ", "3D và WebGL"], link: "Xem các website" },
  { id: "motion", shape: "play", title: "Phim chuyển động", text: "Phim giới thiệu thương hiệu, quảng cáo ngắn cho mạng xã hội và hoạt hình logo. Có kịch bản, dựng hình, âm thanh, giao file đúng chuẩn từng nền tảng.", tags: ["Phim thương hiệu", "Quảng cáo 15 giây", "Logo động", "Phim hướng dẫn"], link: "Xem các phim" },
  { id: "app", shape: "phone", title: "Ứng dụng", text: "Ứng dụng di động và web gọn gàng cho thương hiệu: đặt lịch, thành viên, bản đồ cửa hàng. Thiết kế giao diện, dựng và đưa lên cửa hàng ứng dụng.", tags: ["iOS và Android", "Ứng dụng web", "Thiết kế giao diện", "Thông báo đẩy"], link: "Xem các ứng dụng" },
  { id: "phan-mem", shape: "code", title: "Phần mềm", text: "Công cụ nội bộ và bảng điều khiển thay cho bảng tính: quản lý đơn, báo cáo, tích hợp thanh toán và tự động hoá việc lặp lại mỗi ngày.", tags: ["Bảng điều khiển", "Quản lý đơn hàng", "Tích hợp thanh toán", "Tự động hoá"], link: "Xem các phần mềm" },
];

export function Services() {
  return (
    <>
      {SERVICES.map((v, i) => (
        <section key={v.id} className={s.service} id={v.id} data-shape={v.shape} data-chap="dich-vu" aria-labelledby={`dh-sv-${i}`}>
          <div className={s.svText} data-rv="">
            <h2 id={`dh-sv-${i}`}>{v.title}</h2>
            <p>{v.text}</p>
            <ul className={s.tags}>{v.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            <a className={s.under} href="#du-an">{v.link}</a>
          </div>
          <p className={s.pager}><span>{i + 1} trên 4</span><i aria-hidden="true"><b style={{ width: `${(i + 1) * 25}%` }} /></i></p>
        </section>
      ))}
    </>
  );
}

const STEPS = [
  ["1", "Kể tôi nghe về doanh nghiệp", "Một cuộc gọi 20 phút hoặc vài dòng tin nhắn là đủ. Bạn bán gì, cho ai, và muốn khách nhớ điều gì về bạn."],
  ["2", "Xem bản chạy thử sau 24 giờ", "Tôi dựng bản xem thử chạy thật, không phải ảnh mô phỏng, rồi gửi đường dẫn cho bạn trong vòng một ngày."],
  ["3", "Chỉnh cho vừa ý", "Chỉnh chữ, ảnh và từng chi tiết cho đến khi thấy đúng là thương hiệu của bạn."],
  ["4", "Chỉ trả khi ưng ý", "Không tính tiền theo giờ. Nếu bạn yêu kết quả thì thanh toán và tôi bàn giao, còn không thì bạn không nợ gì."],
];

export function Process() {
  return (
    <section className={s.process} id="quy-trinh" data-shape="atom" data-chap="quy-trinh" aria-labelledby="dh-proc">
      <h2 id="dh-proc" className={s.h2p} data-rv="">Website của bạn, <br />lên sóng trong <em>24 giờ.</em></h2>
      <ol className={s.steps}>
        {STEPS.map(([n, t, d]) => (
          <li key={n} data-rv=""><span>{n}</span><h3>{t}</h3><p>{d}</p></li>
        ))}
      </ol>
    </section>
  );
}
