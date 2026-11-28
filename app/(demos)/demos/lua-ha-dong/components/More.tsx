import styles from "../brand.module.css";
import { Drop, Fabric } from "./Art";

export function Story() {
  return (
    <section id="cau-chuyen" className={styles.mSec} aria-labelledby="st-h">
      <div className={styles.mWrap}>
        <p className={styles.kicker}>Câu chuyện</p>
        <div className={styles.storyGrid}>
          <h2 id="st-h" className={styles.mH}>Từ một khung dệt ở Hà Đông, tới một xưởng in dưới mái nhà.</h2>
          <div className={styles.storyText}>
            <p>Năm 2015, ba người bạn làng nghề lụa Vạn Phúc quay lại sau vài năm đi làm xa, mang theo một cỗ máy in kỹ thuật số cũ và một cuốn sổ ghi công thức màu của bà. Họ muốn thử một điều: để hoa văn Việt có thể in lên lụa với độ sắc của máy, mà vẫn giữ cái mềm, cái mát của tơ tằm.</p>
            <p>Mười năm sau, xưởng tự pha mực, tự in, tự giặt thử từng lô. Mỗi tấm lụa đều đi qua bàn tay người kiểm màu trước khi cuộn lại. Chúng tôi không chạy theo số lượng; chúng tôi chạy theo việc tấm lụa hôm nay đẹp ra sao sau năm mươi lần giặt.</p>
            <p className={styles.sig}>Xưởng Lụa Hà Đông</p>
          </div>
        </div>
        <ul className={styles.numbers}>
          <li><b>2015</b><span>năm máy in đầu tiên chạy</span></li>
          <li><b>1.200</b><span>dpi, nét hoa không nhoè</span></li>
          <li><b>86</b><span>họa tiết gốc vẽ tay *</span></li>
          <li><b>50+</b><span>lần giặt thử mỗi lô</span></li>
        </ul>
        <p className={styles.fineM}>* Số liệu minh hoạ cho trang demo.</p>
      </div>
    </section>
  );
}

const SERVICES = [
  ["In lụa theo mẫu của bạn", "Gửi file thiết kế, chúng tôi in thử trên khổ nhỏ, chỉnh màu cùng bạn rồi mới chạy cả cuộn. Nhận từ 5 mét."],
  ["Pha mực riêng", "Mực phản ứng và mực thăng hoa pha theo mã màu bạn chọn, lưu công thức để lô sau ra đúng sắc."],
  ["Dệt và nhuộm lam", "Dệt mộc, nhuộm lam bằng chàm tự nhiên cho khăn, áo, rèm. Mỗi mẻ một sắc độ riêng."],
  ["May đo áo dài", "Thợ may nhà đo hai buổi, đường chỉ khâu tay phần cổ và nút. Hẹn thử đồ ngay tại xưởng."],
  ["Quà tặng doanh nghiệp", "Khăn lụa, hộp quà in logo kín đáo cho đối tác, từ 30 phần, có bản thử trước khi sản xuất."],
  ["Phục chế hoa văn", "Số hoá tà áo, tấm khăn cũ của gia đình thành họa tiết in được, giữ nguyên nét vẽ."],
];

export function Services() {
  return (
    <section id="dich-vu" className={`${styles.mSec} ${styles.mGreen}`} aria-labelledby="sv-h">
      <div className={styles.mWrap}>
        <p className={styles.kicker}>Dịch vụ</p>
        <h2 id="sv-h" className={styles.mH}>Việc xưởng làm được cho bạn.</h2>
        <ul className={styles.svGrid}>
          {SERVICES.map(([t, d], i) => (
            <li key={t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const MATERIALS = [
  ["Lụa tơ tằm", "Mềm, mát, rũ đẹp. Hợp áo dài, khăn choàng.", "Nặng 14–19 momme", "variant:sen"],
  ["Lụa pha cotton", "Thoáng và bền hơn, ít nhăn. Hợp đầm, sơ mi.", "Tơ 60% · cotton 40%", "variant:truc"],
  ["Lụa xước", "Bề mặt có vân nổi, cầm chắc tay, in rất sắc.", "Dệt vân chéo", "variant:lam"],
  ["Vải lanh tơ", "Nhẹ như sương, hợp rèm, khăn quàng mỏng.", "Lanh 55% · tơ 45%", "variant:cuc"],
] as const;

export function Materials() {
  return (
    <section id="chat-lieu" className={styles.mSec} aria-labelledby="ml-h">
      <div className={styles.mWrap}>
        <p className={styles.kicker}>Chất liệu</p>
        <h2 id="ml-h" className={styles.mH}>Chọn tấm lụa trước, rồi mới chọn hoa.</h2>
        <ul className={styles.matGrid}>
          {MATERIALS.map(([t, d, s, v]) => (
            <li key={t}>
              <div className={styles.matImg}><Fabric variant={v.split(":")[1] as "sen"} alt={`Mẫu ${t}, ảnh minh hoạ`} /></div>
              <h3>{t}</h3>
              <p>{d}</p>
              <em>{s}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const WORKERS = [
  ["Bà Thu", "Thợ pha mực", "40 năm nhuộm chàm, giữ cuốn sổ công thức màu của xưởng."],
  ["Anh Quân", "Trưởng xưởng in", "Căn từng mét vải qua đầu in, nói 'hoa phải khớp tới sợi'."],
  ["Chị Mai", "Thiết kế hoa văn", "Vẽ tay mọi họa tiết gốc rồi số hoá trên máy tính bảng."],
  ["Anh Hải", "Kiểm màu & giặt thử", "Giặt thử 50 lần, chỉ lô nào không phai mới được cuộn."],
];

export function Craft() {
  return (
    <section id="nghe-nhan" className={styles.mSec} aria-labelledby="cr-h">
      <div className={styles.mWrap}>
        <p className={styles.kicker}>Người làm</p>
        <h2 id="cr-h" className={styles.mH}>Những bàn tay giữ màu cho tấm lụa.</h2>
        <ul className={styles.crew}>
          {WORKERS.map(([n, r, d]) => (
            <li key={n}>
              <div className={styles.seal} aria-hidden="true"><Drop size={22} color="#fbfaf5" /></div>
              <h3>{n}</h3>
              <b>{r}</b>
              <p>{d}</p>
            </li>
          ))}
        </ul>
        <p className={styles.fineM}>Tên và vai trò là minh hoạ, không phải người thật.</p>
      </div>
    </section>
  );
}

const REVIEWS = [
  ["Khăn lụa giặt máy hơn chục lần mà màu vẫn y như ngày đầu. Cầm lên mềm và mát tay lắm.", "Thu Hà", "Khăn choàng lụa hoa sen"],
  ["Họ in đúng họa tiết gia đình mình vẽ, lên lụa đẹp hơn mong đợi. Mình đặt thêm 20 mét làm rèm.", "Minh Tâm", "Dịch vụ in lụa theo mẫu"],
  ["Áo dài may đo hai buổi là xong, đường chỉ gọn, thợ tư vấn chọn màu rất có gu.", "Lan Phương", "Bộ áo dài lụa in số"],
];

export function Reviews() {
  return (
    <section id="danh-gia" className={`${styles.mSec} ${styles.mGreen}`} aria-labelledby="rv-h">
      <div className={styles.mWrap}>
        <p className={styles.kicker}>Khách hàng nói</p>
        <h2 id="rv-h" className={styles.mH}>Mặc một lần, nhớ cả mùa.</h2>
        <ul className={styles.revs}>
          {REVIEWS.map(([q, n, p]) => (
            <li key={n}>
              <blockquote>“{q}”</blockquote>
              <p><b>{n}</b><span>{p}</span></p>
            </li>
          ))}
        </ul>
        <p className={styles.fineM}>Lời đánh giá và tên khách là minh hoạ cho trang demo.</p>
      </div>
    </section>
  );
}

const PLANS = [
  ["In thử", "350.000đ", "một lần, trừ vào đơn sau", ["Khổ A3 hoặc 1 mét thử", "Chỉnh màu cùng thợ in", "Giao trong 3 ngày", "Giữ file màu cho lô sau"]],
  ["In lô", "từ 280.000đ / mét", "tính theo khổ và chất liệu", ["Từ 5 mét, khổ 1,4 m", "Mực phản ứng bền màu", "Kiểm màu và giặt thử mỗi lô", "Bảo hành màu 12 tháng"], true],
  ["Đối tác", "báo giá riêng", "cho thương hiệu và nhà may", ["Từ 200 mét mỗi mã", "Pha mực theo mã màu riêng", "Quản lý công thức màu", "Giao nhận theo đợt"]],
] as const;

export function Plans() {
  return (
    <section id="bang-gia" className={styles.mSec} aria-labelledby="pl-h">
      <div className={styles.mWrap}>
        <p className={styles.kicker}>Bảng giá in lụa</p>
        <h2 id="pl-h" className={styles.mH}>Từ một mét thử, tới cả cuộn.</h2>
        <ul className={styles.plans}>
          {PLANS.map(([n, p, sub, perks, hot]) => (
            <li key={n} className={hot ? styles.planHot : ""}>
              {hot ? <em>Phổ biến nhất</em> : null}
              <h3>{n}</h3>
              <p className={styles.planP}>{p}</p>
              <span>{sub}</span>
              <ul>{perks.map((x) => <li key={x}>{x}</li>)}</ul>
              <a href="#lien-he" className={styles.planBtn}>Nhận báo giá</a>
            </li>
          ))}
        </ul>
        <p className={styles.fineM}>Giá minh hoạ, không phải bảng giá thật.</p>
      </div>
    </section>
  );
}
