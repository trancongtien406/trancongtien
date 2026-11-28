import s from "../brand.module.css";
import { Scene } from "./Scene";

export function Header() {
  return (
    <header className={s.top}>
      <a className={s.who} href="#top">thảo nguyễn</a>
      <p className={s.intro}>Tôi thiết kế, sáng tạo và suy nghĩ.<br />Sống ở Sài Gòn.<br />Đây là portfolio của tôi.</p>
      <nav className={s.topNav} aria-label="Chính">
        <a href="#du-an">Dự án</a>
        <a href="#choi-dua" className={s.serif}>Chơi đùa</a>
        <a href="#gioi-thieu">Giới thiệu</a>
        <a href="#lien-he">Liên hệ</a>
      </nav>
    </header>
  );
}

export function About() {
  return (
    <section className={s.about} id="gioi-thieu" aria-labelledby="tm-about">
      <div className={s.secHead}><span>{"{01}"}</span><h2 id="tm-about">Giới thiệu</h2></div>
      <div className={s.aboutGrid}>
        <p className={s.statement}>Tôi là Thảo, nhà thiết kế làm việc giữa web, sách và hình ảnh động. Tôi thích những thứ <em>nhỏ, chậm và hơi lệch</em>, nơi một chi tiết đúng chỗ đáng giá hơn cả một khung hình đẹp.</p>
        <div className={s.aboutCol}>
          <figure className={s.portrait}><Scene kind="p6500631" alt="Chân dung đen trắng của nhà thiết kế" /></figure>
          <p>Tôi lớn lên giữa hai thành phố biển và học thiết kế đồ hoạ ở Sài Gòn. Từ đó tôi làm cho những thương hiệu nhỏ, nhà xuất bản độc lập và vài phòng tranh: nhận diện, trang web, sách ảnh, đôi khi một bộ tem dán.</p>
          <p>Mỗi dự án bắt đầu bằng việc đi bộ quanh nơi chốn của nó, chụp lại những gì người ta thường bỏ qua: bảng hiệu, chữ viết tay, vết sơn bong. Chúng trở thành chất liệu cho hình ảnh về sau.</p>
          <dl className={s.facts}>
            <div><dt>Sống tại</dt><dd>Sài Gòn, Việt Nam</dd></div>
            <div><dt>Làm việc với</dt><dd>Thương hiệu nhỏ, nhà xuất bản, phòng tranh</dd></div>
            <div><dt>Công cụ</dt><dd>Máy phim cũ, bút lông, Figma, Blender</dd></div>
            <div><dt>Đang nhận</dt><dd>Thiết kế web, nhận diện, sách ảnh</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  ["01", "Thiết kế web", "Trang giới thiệu, portfolio và cửa hàng nhỏ. Bố cục chậm, chữ to, ảnh chỉn chu, chạy nhẹ trên cả điện thoại cũ.", "Từ 25 triệu"],
  ["02", "Nhận diện thương hiệu", "Tên, biểu trưng chữ, bảng màu, bao bì và bộ quy tắc ngắn gọn để đội của bạn dùng được ngay.", "Từ 18 triệu"],
  ["03", "Thiết kế sách", "Bìa, dàn trang và chọn giấy cho sách ảnh, tập truyện, ấn phẩm thủ công in số lượng nhỏ.", "Từ 12 triệu"],
  ["04", "Minh hoạ", "Nét vẽ mực và bút lông cho bìa sách, bao bì, poster và những trang báo thích chất tay.", "Từ 3 triệu / hình"],
  ["05", "Nhiếp ảnh tư liệu", "Chụp ảnh phim và số cho lookbook, sản phẩm và ghi chép hành trình, giao ảnh đã chỉnh màu.", "Từ 6 triệu / buổi"],
];
export function Services() {
  return (
    <section className={s.block} id="dich-vu" aria-labelledby="tm-sv">
      <div className={s.secHead}><span>{"{04}"}</span><h2 id="tm-sv">Dịch vụ</h2></div>
      <ul className={s.svList}>
        {SERVICES.map(([n, t, d, p]) => (
          <li key={n}><b>{`{${n}}`}</b><h3>{t}</h3><p>{d}</p><span className={s.serif}>{p}</span></li>
        ))}
      </ul>
      <p className={s.fine}>Mức giá minh hoạ cho trang thiết kế.</p>
    </section>
  );
}

const STEPS = [
  ["Trò chuyện", "Một buổi cà phê hoặc cuộc gọi 30 phút để hiểu bạn cần gì và vì sao."],
  ["Đi bộ & ghi chép", "Tôi đến nơi chốn của dự án, chụp ảnh, nhặt chữ, phác các hướng đầu tiên."],
  ["Dàn dựng", "Hai hướng thiết kế được trình bày; bạn chọn một, tôi đào sâu và hoàn thiện."],
  ["Bàn giao", "Tệp gốc, hướng dẫn dùng và một buổi chỉ cách tự tiếp tục khi tôi không còn ở đó."],
];
export function Process() {
  return (
    <section className={`${s.block} ${s.sage}`} id="quy-trinh" aria-labelledby="tm-pr">
      <div className={s.secHead}><span>{"{05}"}</span><h2 id="tm-pr">Cách tôi làm việc</h2></div>
      <ol className={s.steps}>
        {STEPS.map(([t, d], i) => (
          <li key={t}><span className={s.stepN}>{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></li>
        ))}
      </ol>
    </section>
  );
}

const POSTS = [
  ["12.05.2026", "Ghi chép", "Vì sao tôi chụp bảng hiệu cũ trước khi vẽ chữ", "p33185291"],
  ["03.04.2026", "Quy trình", "Làm sách ảnh bằng ba loại giấy: chọn sao cho khỏi tiếc", "p32166667"],
  ["18.02.2026", "Suy nghĩ", "Trang web chậm không có nghĩa là trang web tệ", "p37798256"],
  ["29.12.2025", "Nhìn lại", "Năm cuốn sổ vẽ, bốn chuyến tàu và một chiếc máy phim hỏng", "p29731398"],
];
export function Journal() {
  return (
    <section className={s.block} id="nhat-ky" aria-labelledby="tm-jr">
      <div className={s.secHead}><span>{"{06}"}</span><h2 id="tm-jr">Nhật ký</h2></div>
      <ul className={s.jrList}>
        {POSTS.map(([d, t, h, k]) => (
          <li key={h}>
            <a href="#lien-he">
              <span className={s.serif}>{d}</span><span>{t}</span><strong>{h}</strong>
              <span className={s.jrImg}><Scene kind={k} alt="" /></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const CV = [
  ["2026", "Triển lãm nhóm “Chậm”", "Phòng tranh nhỏ, Đà Nẵng"],
  ["2025", "Giải Thiết kế sách độc lập, đề cử", "Hội sách Sài Gòn"],
  ["2024", "Nhà thiết kế chính, nhà xuất bản độc lập", "Làm việc từ xa"],
  ["2023", "Triển lãm “Đêm thứ Năm”, ảnh và in", "Không gian sáng tạo, Sài Gòn"],
  ["2022", "Tốt nghiệp thiết kế đồ hoạ", "Sài Gòn"],
];
export function Timeline() {
  return (
    <section className={s.block} id="hanh-trinh" aria-labelledby="tm-cv">
      <div className={s.secHead}><span>{"{07}"}</span><h2 id="tm-cv">Hành trình</h2></div>
      <ul className={s.cv}>
        {CV.map(([y, t, p]) => (<li key={t}><span className={s.serif}>{y}</span><strong>{t}</strong><span>{p}</span></li>))}
      </ul>
    </section>
  );
}

const QUOTES = [
  ["Thảo không chỉ làm cái bìa; cô ấy đọc cả bản thảo rồi mới vẽ. Cuốn sách ra đời có chữ của người viết và cả hơi thở của người thiết kế.", "Lan Anh", "Biên tập viên nhà xuất bản độc lập"],
  ["Trang web của chúng tôi chậm rãi, ít chữ và ai vào cũng nhớ. Khách bảo họ thấy như bước vào cửa hàng.", "Minh Quân", "Chủ xưởng gốm"],
  ["Làm việc với Thảo giống đi dạo cùng một người bạn tinh mắt. Cuối buổi, mình có cả một thương hiệu.", "Bảo Châu", "Nhà thiết kế thời trang"],
];
export function Quotes() {
  return (
    <section className={`${s.block} ${s.sage}`} id="loi-nhan" aria-labelledby="tm-q">
      <div className={s.secHead}><span>{"{08}"}</span><h2 id="tm-q">Lời nhắn</h2></div>
      <ul className={s.quotes}>
        {QUOTES.map(([q, n, r]) => (<li key={n}><blockquote>“{q}”</blockquote><p><b>{n}</b><span className={s.serif}>{r}</span></p></li>))}
      </ul>
      <p className={s.fine}>Lời nhắn minh hoạ, tên là giả định.</p>
    </section>
  );
}

const PACKS = [
  ["Một buổi", "Tư vấn và phác hướng", "2.500.000đ", ["Buổi gặp 90 phút", "Ghi chú hướng đi bằng ảnh", "Danh sách việc nên làm tiếp"]],
  ["Dự án nhỏ", "Một sản phẩm trọn vẹn", "từ 18.000.000đ", ["Nhận diện hoặc trang một màn hình", "Hai vòng chỉnh sửa", "Tệp gốc và hướng dẫn"]],
  ["Đồng hành", "Làm cùng bạn 3 tháng", "từ 45.000.000đ", ["Thiết kế web đầy đủ", "Ảnh và minh hoạ riêng", "Hỗ trợ sau ra mắt 30 ngày"]],
] as const;
export function Packages() {
  return (
    <section className={s.block} id="hop-tac" aria-labelledby="tm-pk">
      <div className={s.secHead}><span>{"{09}"}</span><h2 id="tm-pk">Hợp tác</h2></div>
      <ul className={s.packs}>
        {PACKS.map(([n, d, p, f]) => (
          <li key={n}><h3>{n}</h3><p className={s.serif}>{d}</p><strong>{p}</strong><ul>{f.map((x) => <li key={x}>{x}</li>)}</ul><a href="#lien-he">Hỏi về gói này →</a></li>
        ))}
      </ul>
      <p className={s.fine}>Giá minh hoạ cho trang thiết kế.</p>
    </section>
  );
}

const FAQ = [
  ["Bạn nhận dự án ở ngoài Sài Gòn không?", "Có. Phần lớn công việc làm từ xa; với dự án cần đi thực địa tôi sẽ báo trước chi phí đi lại."],
  ["Một dự án mất bao lâu?", "Trang web một màn hình khoảng 3 tuần, nhận diện đầy đủ 6 đến 8 tuần, sách ảnh tuỳ số trang, thường 2 đến 3 tháng."],
  ["Tôi có được sở hữu tệp gốc không?", "Có. Khi thanh toán xong, toàn bộ tệp gốc và quyền sử dụng thuộc về bạn, trừ phông chữ có bản quyền riêng sẽ được ghi rõ."],
  ["Bạn có làm theo mẫu có sẵn không?", "Tôi ít khi làm vậy. Nếu bạn cần nhanh và gọn, tôi có thể giới thiệu mẫu phù hợp thay vì làm mới."],
  ["Quy trình thanh toán thế nào?", "Đặt cọc 40%, 30% khi duyệt hướng thiết kế và 30% khi bàn giao. Có xuất hoá đơn."],
  ["Tôi chưa biết mình cần gì thì sao?", "Nhắn tôi cũng được. Một buổi trò chuyện đầu tiên miễn phí để cùng gọi tên điều bạn đang muốn làm."],
  ["Bạn có nhận thực tập hoặc học việc không?", "Mỗi năm tôi nhận một bạn học việc theo mùa hè. Hãy gửi vài trang sổ vẽ của bạn qua biểu mẫu bên dưới."],
];
export function Faq() {
  return (
    <section className={s.block} id="hoi-dap" aria-labelledby="tm-fq">
      <div className={s.secHead}><span>{"{10}"}</span><h2 id="tm-fq">Hỏi đáp</h2></div>
      <div className={s.faq}>
        {FAQ.map(([q, a], i) => (<details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footerBig}>
      <p className={s.serifHuge} aria-hidden="true">tản_mạn</p>
      <div className={s.fCols}>
        <p>thảo nguyễn<br />Nhà thiết kế, Sài Gòn.<br />Cập nhật 2026.</p>
        <nav aria-label="Sơ đồ trang"><b>Trang</b><a href="#top">Trang chủ</a><a href="#du-an">Dự án</a><a href="#choi-dua">Chơi đùa</a><a href="#gioi-thieu">Giới thiệu</a><a href="#dich-vu">Dịch vụ</a></nav>
        <nav aria-label="Thêm"><b>Thêm</b><a href="#nhat-ky">Nhật ký</a><a href="#hanh-trinh">Hành trình</a><a href="#hop-tac">Hợp tác</a><a href="#hoi-dap">Hỏi đáp</a><a href="#lien-he">Liên hệ</a></nav>
        <p><b>Nhắn tôi</b><br /><a href="mailto:xin.chao@thaonguyen.example">xin.chao@thaonguyen.example</a><br />Instagram / Behance / LinkedIn</p>
      </div>
      <p className={s.fine}>© 2026 Tản Mạn Ngoại Ảnh. Trang minh hoạ thiết kế: tên, dự án, giá và hình ảnh là giả định, ảnh từ Pexels.</p>
    </footer>
  );
}
