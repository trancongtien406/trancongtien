import styles from "../brand.module.css";

const VALUES = [
  ["Bắt đầu từ bài toán", "Mỗi dự án mở đầu bằng một câu hỏi: kết quả nào đo được sau 90 ngày? Công nghệ chỉ là phương tiện."],
  ["Mẫu thử trước, cam kết sau", "Chúng tôi dựng bản chạy được trong hai tuần để bạn tự thấy giá trị trước khi đầu tư lớn."],
  ["An toàn là tính năng", "Dữ liệu, phân quyền và kiểm thử rào chắn cho AI được thiết kế từ ngày đầu, không phải việc vá sau."],
  ["Bàn giao để bạn tự đi tiếp", "Mã nguồn, tài liệu và buổi đào tạo đi kèm. Bạn sở hữu sản phẩm, không bị khoá vào chúng tôi."],
];
const MILESTONES: [string, string][] = [["2019", "Thành lập tại Đà Nẵng với 4 người"], ["2021", "Sản phẩm AI đầu tiên cho ngành y tế"], ["2023", "Mở rộng đội ngũ kỹ sư học máy"], ["2025", "Ra mắt bộ sản phẩm Atom cho doanh nghiệp"], ["2026", "Đồng hành hơn 50 dự án ở 9 ngành"]];

export function About() {
  return (
    <section id="vc-company" className={styles.sec} aria-labelledby="vc-h-about">
      <div className={styles.secHead} data-vc-in>
        <p className={styles.eyebrow}>Công ty</p>
        <h2 id="vc-h-about" className={styles.h2big}>Chúng tôi không bán AI. Chúng tôi giúp bạn dùng AI để làm ra thứ thật sự có ích.</h2>
      </div>
      <div className={styles.aboutGrid}>
        <div className={styles.prose} data-vc-in>
          <p>Vô Cực Lab là studio sản phẩm số và AI đặt tại Đà Nẵng. Đội ngũ gồm kỹ sư phần mềm, kỹ sư học máy, nhà thiết kế và chuyên viên chiến lược, làm việc chung một bàn thay vì chuyền việc qua nhiều bên.</p>
          <p>Chúng tôi từng thấy quá nhiều dự án AI dừng ở bản trình diễn đẹp mắt nhưng không bao giờ ra khỏi phòng họp. Vì vậy cách làm của chúng tôi luôn đi từ bài toán kinh doanh, qua mẫu thử có người dùng thật, rồi mới tới hệ thống vận hành lâu dài.</p>
          <p>Khách hàng của chúng tôi trải dài từ startup đang tìm sản phẩm phù hợp thị trường đến doanh nghiệp lớn cần đưa AI vào quy trình sẵn có mà vẫn giữ được an toàn và kiểm soát chi phí.</p>
        </div>
        <ol className={styles.values} data-vc-in>
          {VALUES.map(([t, d], i) => (
            <li key={t}><span>{String(i + 1).padStart(2, "0")}</span><b>{t}</b><p>{d}</p></li>
          ))}
        </ol>
      </div>
      <ol className={styles.timeline} aria-label="Hành trình công ty" data-vc-in>
        {MILESTONES.map(([y, t]) => (<li key={y}><b>{y}</b><span>{t}</span></li>))}
      </ol>
    </section>
  );
}

const STEPS: [string, string, string][] = [
  ["Khám phá", "1 tuần", "Phỏng vấn các bên liên quan, rà soát dữ liệu hiện có, xác định chỉ số thành công và rủi ro lớn nhất."],
  ["Thiết kế", "1–2 tuần", "Luồng người dùng, nguyên mẫu bấm được và kiến trúc kỹ thuật. Bạn xem và chốt trước khi viết mã."],
  ["Mẫu thử", "2 tuần", "Bản chạy thật với dữ liệu thật ở quy mô nhỏ. Kiểm thử cùng 5 đến 10 người dùng đầu tiên."],
  ["Xây dựng", "4–10 tuần", "Phát triển theo chu kỳ hai tuần, bản demo cuối mỗi chu kỳ, kiểm thử tự động và đánh giá mô hình liên tục."],
  ["Vận hành", "Liên tục", "Triển khai, giám sát, đo đạc theo chỉ số đã chốt và cải tiến theo dữ liệu sử dụng thực tế."],
];

export function Process() {
  return (
    <section id="vc-process" className={styles.sec} aria-labelledby="vc-h-proc">
      <div className={styles.secHead} data-vc-in>
        <p className={styles.eyebrow}>Quy trình</p>
        <h2 id="vc-h-proc" className={styles.h2big}>Năm bước từ ý tưởng đến sản phẩm chạy thật</h2>
      </div>
      <ol className={styles.steps}>
        {STEPS.map(([t, d, p], i) => (
          <li key={t} data-vc-in>
            <span className={styles.stepN}>{String(i + 1).padStart(2, "0")}</span>
            <h3>{t}</h3>
            <em>{d}</em>
            <p>{p}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const ATOM: [string, string][] = [
  ["Atom Doanh nghiệp", "Trợ lý hỏi đáp trên tài liệu nội bộ, phân quyền theo phòng ban, có trích dẫn nguồn cho mọi câu trả lời."],
  ["Atom Tác tử", "Tác tử tự động hoá quy trình nhiều bước: đọc email, tra cứu hệ thống, tạo phiếu và hỏi người duyệt khi cần."],
  ["Atom Ý Định", "Phân tích ý định khách hàng từ cuộc gọi, tin nhắn và biểu mẫu để ưu tiên đúng người, đúng lúc."],
  ["Atom So Sánh", "So sánh nhiều mô hình ngôn ngữ trên cùng bộ câu hỏi của bạn về chất lượng, độ trễ và chi phí."],
  ["Atom Bản Đồ", "Phân tích không gian địa lý cho logistics và bán lẻ: vùng phủ, tuyến giao hàng, điểm đặt cửa hàng."],
  ["Atom Đội Đỏ", "Kiểm thử tấn công hệ thống AI: tiêm lệnh, rò rỉ dữ liệu, vượt rào chắn, kèm báo cáo cách khắc phục."],
];

export function Atom() {
  return (
    <section id="vc-atom" className={styles.sec} aria-labelledby="vc-h-atom">
      <div className={styles.secHead} data-vc-in>
        <p className={styles.eyebrow}>Atom AI</p>
        <h2 id="vc-h-atom" className={styles.h2big}>Bộ sản phẩm Atom: nền móng AI dùng ngay cho doanh nghiệp</h2>
      </div>
      <ul className={styles.atoms}>
        {ATOM.map(([t, d], i) => (
          <li key={t} data-vc-in>
            <span className={styles.atomDots} aria-hidden="true" style={{ ["--r" as string]: `${i * 40}deg` }} />
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const METRICS: [number, string, string][] = [[120, "+", "Sản phẩm số đã ra mắt"], [38, "", "Chuyên gia toàn thời gian"], [9, "", "Ngành đã phục vụ"], [96, "%", "Khách hàng quay lại hợp tác"]];

export function Metrics() {
  return (
    <section className={styles.metrics} aria-label="Con số nổi bật (minh hoạ)">
      <dl>
        {METRICS.map(([n, s, l]) => (
          <div key={l} data-vc-in><dt><b data-vc-count={n}>{n}</b>{s}</dt><dd>{l}</dd></div>
        ))}
      </dl>
      <p>Số liệu minh hoạ cho bản demo.</p>
    </section>
  );
}

const TEAM: [string, string, string, number][] = [
  ["Trần Minh Khôi", "Giám đốc điều hành", "TK", 250], ["Nguyễn Thảo Vy", "Trưởng nhóm sản phẩm", "TV", 285], ["Lê Quang Huy", "Kiến trúc sư AI", "QH", 215],
  ["Phạm Bảo Ngọc", "Giám đốc thiết kế", "BN", 310], ["Võ Đức Anh", "Trưởng nhóm hạ tầng", "ĐA", 235], ["Đặng Phương Linh", "Chiến lược ra thị trường", "PL", 270],
];

export function Team() {
  return (
    <section id="vc-team" className={styles.sec} aria-labelledby="vc-h-team">
      <div className={styles.secHead} data-vc-in>
        <p className={styles.eyebrow}>Đội ngũ</p>
        <h2 id="vc-h-team" className={styles.h2big}>Những người bạn sẽ làm việc cùng</h2>
      </div>
      <ul className={styles.team}>
        {TEAM.map(([n, r, i, h]) => (
          <li key={n} data-vc-in>
            <span className={styles.avatar} style={{ ["--h" as string]: h }} aria-hidden="true">{i}</span>
            <b>{n}</b><span>{r}</span>
          </li>
        ))}
      </ul>
      <p className={styles.note}>Tên và chức danh là nhân vật minh hoạ.</p>
    </section>
  );
}

const QUOTES: [string, string, string][] = [
  ["Nhóm dựng được bản chạy thật chỉ sau hai tuần. Lần đầu tiên ban giám đốc thấy AI giải quyết đúng việc của mình thay vì chỉ nghe thuyết trình.", "Chị Hạnh", "Giám đốc vận hành, chuỗi phòng khám (minh hoạ)"],
  ["Họ hỏi về chỉ số kinh doanh trước khi hỏi về công nghệ. Chi phí xử lý đơn của chúng tôi giảm gần một nửa sau quý đầu.", "Anh Thịnh", "Nhà sáng lập, nền tảng logistics (minh hoạ)"],
  ["Phần kiểm thử rào chắn và đội đỏ khiến bộ phận bảo mật của chúng tôi yên tâm cho phép đưa hệ thống vào chạy thật.", "Chị Mai", "Trưởng phòng công nghệ, ngân hàng số (minh hoạ)"],
];

export function Quotes() {
  return (
    <section className={styles.sec} aria-labelledby="vc-h-quotes">
      <div className={styles.secHead} data-vc-in>
        <p className={styles.eyebrow}>Khách hàng nói gì</p>
        <h2 id="vc-h-quotes" className={styles.h2big}>Kết quả được kể bằng lời khách hàng</h2>
      </div>
      <ul className={styles.quotes}>
        {QUOTES.map(([q, n, r]) => (
          <li key={n} data-vc-in><blockquote>“{q}”</blockquote><p><b>{n}</b><span>{r}</span></p></li>
        ))}
      </ul>
      <p className={styles.note}>Lời đánh giá minh hoạ, không phải của khách hàng thật.</p>
    </section>
  );
}

const POSTS: [string, string, string, string][] = [
  ["AI cho doanh nghiệp", "Vì sao 70% mẫu thử AI không bao giờ ra sản xuất", "Bốn lý do kỹ thuật và tổ chức, cùng danh sách kiểm tra trước khi bạn cam kết ngân sách.", "8 phút đọc"],
  ["Kỹ thuật", "Đánh giá mô hình ngôn ngữ trên dữ liệu tiếng Việt", "Chúng tôi dựng bộ câu hỏi 1.200 mục để so sánh chất lượng, độ trễ và chi phí giữa các mô hình.", "12 phút đọc"],
  ["Thiết kế", "Thiết kế giao diện cho tác tử AI: khi nào hỏi, khi nào tự làm", "Nguyên tắc giao quyền cho tác tử mà người dùng vẫn cảm thấy kiểm soát được.", "6 phút đọc"],
];

export function Insights() {
  return (
    <section id="vc-insights" className={styles.sec} aria-labelledby="vc-h-ins">
      <div className={styles.secHead} data-vc-in>
        <p className={styles.eyebrow}>Góc nhìn</p>
        <h2 id="vc-h-ins" className={styles.h2big}>Điều chúng tôi học được khi đưa AI vào thực tế</h2>
      </div>
      <ul className={styles.posts}>
        {POSTS.map(([tag, t, d, m]) => (
          <li key={t} data-vc-in><article><small>{tag} · {m}</small><h3>{t}</h3><p>{d}</p></article></li>
        ))}
      </ul>
      <p className={styles.note}>Bài viết minh hoạ cho bản demo.</p>
    </section>
  );
}
