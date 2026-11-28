import styles from "../brand.module.css";

const HOW: [string, string, string][] = [
  ["01", "Thả tác phẩm vào", "Kéo ảnh, video hoặc poster đã thiết kế xong vào trình duyệt. Tệp ở lại trên máy bạn cho tới khi bạn đăng nhập."],
  ["02", "Chọn kiểu chuyển động", "Duyệt hơn 300 mẫu theo kiểu: băng chuyền, vòng, lưới, cuộn, trường, hiệu ứng lộ, vệt. Bấm một lần là thấy ngay kết quả với đúng tác phẩm của bạn."],
  ["03", "Tinh chỉnh vừa đủ", "Đổi tốc độ, độ sâu, màu nền, thêm chữ. Mọi tham số đều có giá trị mặc định đẹp, bạn chỉ chỉnh khi cần."],
  ["04", "Xuất và đăng", "Chọn tỉ lệ và độ phân giải theo nơi đăng. Một lần dựng, xuất đủ định dạng cho bảng tin, trang portfolio và buổi thuyết trình."],
];
export function How() {
  return (
    <section id="tm-how" className={styles.how} aria-labelledby="tm-h-how">
      <div className={styles.secHead} data-tm-reveal><p className={styles.eyebrow}>Cách hoạt động</p><h2 id="tm-h-how" className={styles.h2d}>Bốn bước,<br />không cần biết dựng phim.</h2></div>
      <ol data-tm-reveal>{HOW.map(([n, t, d]) => (<li key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></li>))}</ol>
    </section>
  );
}

const WHO: [string, string][] = [
  ["Nhà thiết kế độc lập", "Biến bộ poster, bìa album hoặc case study thành video giới thiệu trong một buổi chiều thay vì một tuần học phần mềm."],
  ["Studio và agency", "Dựng nhanh bản chuyển động cho pitch khách hàng. Lưu cấu hình làm mẫu riêng để cả nhóm dùng lại."],
  ["Thương hiệu thời trang, nội thất", "Đưa bộ ảnh lookbook lên bảng tin dưới dạng băng chuyền hoặc lưới chuyển động đồng bộ nhận diện."],
  ["Sinh viên và giảng viên", "Làm đồ án thiết kế trông chuyên nghiệp hơn, mở ngay trên trình duyệt, không cần máy cấu hình cao."],
];
export function Who() {
  return (
    <section className={styles.who} aria-labelledby="tm-h-who">
      <div className={styles.secHead} data-tm-reveal><p className={styles.eyebrow}>Dành cho ai</p><h2 id="tm-h-who" className={styles.h2d}>Cho những người đã thiết kế xong<br />và chỉ cần nó chuyển động.</h2></div>
      <ul data-tm-reveal>{WHO.map(([t, d]) => (<li key={t}><h3>{t}</h3><p>{d}</p></li>))}</ul>
    </section>
  );
}

const CMP: [string, string, string][] = [
  ["Thời gian cho bản dựng đầu tiên", "Dưới 5 phút", "Nửa ngày đến vài ngày"],
  ["Kỹ năng cần có", "Chỉ cần biết thiết kế", "Thành thạo phần mềm dựng, keyframe"],
  ["Thay đổi tác phẩm sau khi dựng", "Thả tệp mới, chuyển động giữ nguyên", "Dựng lại từ đầu"],
  ["Chi phí mỗi tháng", "Từ 0đ", "Giấy phép phần mềm và máy cấu hình cao"],
  ["Xuất nhiều tỉ lệ", "Một lần dựng, sáu tỉ lệ", "Mỗi tỉ lệ dựng riêng"],
];
export function Compare() {
  return (
    <section className={styles.cmp} aria-labelledby="tm-h-cmp">
      <div className={styles.secHead} data-tm-reveal><p className={styles.eyebrow}>So sánh</p><h2 id="tm-h-cmp" className={styles.h2d}>Thư Viện Chuyển Động<br />và cách làm truyền thống</h2></div>
      <div data-tm-reveal className={styles.table} role="table" aria-label="So sánh hai cách làm">
        <div role="row" className={styles.tr}><span role="columnheader" /><b role="columnheader">Thư Viện Chuyển Động</b><b role="columnheader">Dựng video truyền thống</b></div>
        {CMP.map(([a, b, c]) => (<div role="row" className={styles.tr} key={a}><span role="rowheader">{a}</span><span role="cell" className={styles.yes}>{b}</span><span role="cell">{c}</span></div>))}
      </div>
    </section>
  );
}

const Q: [string, string, string][] = [
  ["Tôi dựng được cả bộ 12 poster thành video giới thiệu trong 10 phút. Trước đây việc này tốn của tôi hai ngày.", "Mai Anh", "Nhà thiết kế đồ hoạ (minh hoạ)"],
  ["Trợ lý AI nối vào trình chỉnh sửa giúp cả nhóm dựng bản nháp trước cuộc họp. Phần tinh chỉnh vẫn do người thiết kế quyết.", "Quốc Bảo", "Giám đốc sáng tạo, agency (minh hoạ)"],
  ["Chuyển động giữ nguyên khi thay ảnh mới. Chúng tôi tái sử dụng một cấu hình cho cả bốn bộ sưu tập trong năm.", "Thu Hà", "Quản lý thương hiệu thời trang (minh hoạ)"],
];
export function Quotes() {
  return (
    <section className={styles.quotes} aria-labelledby="tm-h-q">
      <div className={styles.secHead} data-tm-reveal><p className={styles.eyebrow}>Người dùng nói gì</p><h2 id="tm-h-q" className={styles.h2d}>Làm xong sớm hơn, nhìn đẹp hơn.</h2></div>
      <ul data-tm-reveal>{Q.map(([q, n, r]) => (<li key={n}><blockquote>“{q}”</blockquote><p><b>{n}</b><span>{r}</span></p></li>))}</ul>
      <p className={styles.note}>Lời đánh giá minh hoạ, không phải của người dùng thật.</p>
    </section>
  );
}

const FAQ: [string, string][] = [
  ["Tôi có cần tạo tài khoản để dùng thử không?", "Không. Bạn mở trình chỉnh sửa, thả tệp và xuất bản 720p ngay. Dự án khi đó lưu trên chính trình duyệt của bạn. Tạo tài khoản miễn phí chỉ để đồng bộ giữa các thiết bị."],
  ["Tệp của tôi có bị tải lên máy chủ không?", "Ở chế độ Khách và Miễn phí, tệp được xử lý ngay trên trình duyệt. Chỉ khi bạn bật đồng bộ hoặc dùng trợ lý AI, các tệp bạn chọn mới được gửi đi, và bạn thấy rõ điều đó."],
  ["Tôi có dùng được phông chữ riêng của mình không?", "Có. Bạn có thể chọn trong hơn 1.900 phông chữ có sẵn hoặc tải phông của riêng mình (cần có bản quyền sử dụng)."],
  ["MCP là gì và tôi cần làm gì để dùng?", "MCP là giao thức cho phép một trợ lý AI điều khiển công cụ bên ngoài. Bạn dán địa chỉ kết nối của Thư Viện vào trợ lý, cấp quyền, rồi nhắn bằng lời thường để trợ lý thêm cảnh, đổi mẫu hay chèn nhạc."],
  ["Xuất tới độ phân giải nào?", "Gói Khách và Miễn phí xuất tối đa 720p MP4, 10 lần mỗi tháng. Gói Pro xuất không giới hạn tới 4K ở 60 khung hình mỗi giây, MP4 hoặc WebM."],
  ["Tôi có dùng sản phẩm cho dự án thương mại được không?", "Được. Sản phẩm bạn dựng thuộc về bạn. Các mẫu có sẵn đi kèm giấy phép cho phép dùng thương mại, trừ việc bán lại chính mẫu."],
  ["Hoàn tiền thế nào nếu tôi không hài lòng?", "Bạn được hoàn tiền đầy đủ trong 14 ngày kể từ lần thanh toán đầu tiên, chỉ cần gửi email tới bộ phận hỗ trợ."],
  ["Sản phẩm chạy trên thiết bị nào?", "Mọi trình duyệt hiện đại trên máy tính, máy tính bảng và điện thoại. Giao diện điện thoại được thiết kế riêng, không phải bản thu nhỏ của máy tính."],
];
export function Faq() {
  return (
    <section id="tm-faq" className={styles.faq} aria-labelledby="tm-h-faq">
      <div className={styles.secHead} data-tm-reveal><p className={styles.eyebrow}>Hỏi đáp</p><h2 id="tm-h-faq" className={styles.h2d}>Những điều hay được hỏi.</h2></div>
      <div className={styles.faqList} data-tm-reveal>
        {FAQ.map(([q, a], i) => (<details key={q} open={i === 0}><summary>{q}<i aria-hidden="true">+</i></summary><p>{a}</p></details>))}
      </div>
    </section>
  );
}

const LOG: [string, string, string][] = [
  ["Tháng 11/2026", "Trợ lý AI qua MCP", "Thêm cảnh, đổi mẫu, chèn nhạc nền bằng lời thường. Có nút hoàn tác cho mọi thay đổi của trợ lý."],
  ["Tháng 10/2026", "Uốn cong và lăng kính", "Hai hiệu ứng méo mới có thanh mức độ, áp dụng được cho cả cảnh."],
  ["Tháng 9/2026", "Giao diện điện thoại", "Thiết kế lại cho một tay: thư viện, tệp, dự án và chỉnh sửa nằm ở thanh dưới."],
  ["Tháng 8/2026", "Xuất 4K 60 khung/giây", "Dành cho gói Pro, hỗ trợ MP4 và WebM."],
  ["Tháng 6/2026", "Mười kiểu chuyển cảnh", "Nối nhiều mẫu thành một đoạn phim liền mạch."],
];
export function Changelog() {
  return (
    <section className={styles.log} aria-labelledby="tm-h-log">
      <div className={styles.secHead} data-tm-reveal><p className={styles.eyebrow}>Nhật ký cập nhật</p><h2 id="tm-h-log" className={styles.h2d}>Mỗi tháng thêm một chút.</h2></div>
      <ol data-tm-reveal>{LOG.map(([d, t, p]) => (<li key={t}><time>{d}</time><h3>{t}</h3><p>{p}</p></li>))}</ol>
    </section>
  );
}
