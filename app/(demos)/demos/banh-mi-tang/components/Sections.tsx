import styles from "../brand.module.css";
import { Glitch } from "./Glitch";
import { Roundel } from "./Art";

const IMG = "/images/demos/banh-mi-tang";

function Pic({ src, alt, pos = "50% 50%", ratio = "4/3" }: { src: string; alt: string; pos?: string; ratio?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${IMG}/${src}`} alt={alt} width={800} height={680} loading="lazy" decoding="async" style={{ objectPosition: pos, aspectRatio: ratio }} />
  );
}

export function Story() {
  return (
    <section id="cau-chuyen" className={styles.story} aria-labelledby="story-h">
      <div className={styles.storyGrid}>
        <div className={styles.storyPic}>
          <Pic src="mon-tang-don.webp" alt="Bánh mì kẹp xếp tầng trên thớt gỗ" ratio="4/5" pos="40% 50%" />
          <span className={styles.stamp}>Từ 2019<br />Quận 3</span>
        </div>
        <div className={styles.storyCopy}>
          <span className={styles.kicker}>Câu chuyện</span>
          <Glitch as="h2" text="MỘT Ổ BÁNH. SÁU TẦNG VỊ." className={styles.sectionH} />
          <p id="story-h" className={styles.lead}>Bánh Mì Tầng bắt đầu từ một xe đẩy nhỏ trước cổng trường, với một ý nghĩ đơn giản: ổ bánh mì Việt nên được xếp có chủ đích, từng lớp một.</p>
          <p>Chúng tôi giữ cái giòn của vỏ bánh Sài Gòn, thêm miếng thịt ép sát chảo gang cho xém cạnh, phô mai chảy, hành tím ngâm chua ngọt và sốt bơ tỏi pha mỗi sáng. Không lớp nào là phụ, không lớp nào đứng ngoài.</p>
          <p>Sau năm năm, xe đẩy thành một quán hai tầng với bếp mở. Công thức vẫn thế: nướng tại chỗ, ép tại chỗ, đóng hộp khi khách đã sẵn sàng. Vì một ổ bánh ngon chỉ ngon trong mười phút đầu.</p>
          <ul className={styles.tickList}>
            <li>Bánh mì mè nướng bơ mỗi 90 phút</li>
            <li>Thịt xay tươi trong ngày, không đông lạnh</li>
            <li>Sốt tự pha, không dùng sốt đóng gói</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  ["6", "tầng vị trong mỗi ổ"],
  ["10–15", "phút từ lúc đặt đến lúc nhận"],
  ["1.200+", "ổ bánh ra lò mỗi ngày (minh hoạ)"],
  ["4,8★", "điểm đánh giá trung bình (minh hoạ)"],
];

export function Stats() {
  return (
    <section className={styles.stats} aria-label="Con số nổi bật">
      <dl>
        {STATS.map(([n, l]) => (
          <div key={l}>
            <dt>{n}</dt>
            <dd>{l}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const STEPS = [
  { n: "01", t: "Chọn tầng", d: "Chọn ổ bánh, mức thịt và sốt. Có thể bỏ hành, thêm phô mai, đổi sang gà giòn.", img: "mon-ga-gion.webp", pos: "50% 40%" },
  { n: "02", t: "Ép nóng", d: "Thịt vào chảo gang 220 độ, ép mỏng đến khi cạnh giòn xém. Bánh được nướng bơ cùng lúc.", img: "burger.webp", pos: "50% 60%" },
  { n: "03", t: "Xếp tầng", d: "Sáu lớp xếp theo đúng thứ tự, ghim que tre, gói giấy bạc kraft để giữ nhiệt.", img: "combo-ca-nha.webp", pos: "50% 50%" },
  { n: "04", t: "Giao tận tay", d: "Nhận tại quầy hoặc giao nội thành trong 25 phút. Hộp có lỗ thoát hơi để bánh không bị ỉu.", img: "khoai-sot.webp", pos: "50% 50%" },
];

export function Process() {
  return (
    <section id="quy-trinh" className={styles.process} aria-labelledby="proc-h">
      <div className={styles.secHead}>
        <span className={styles.kicker}>Quy trình</span>
        <Glitch as="h2" text="TỪ CHẢO ĐẾN TAY BẠN." className={styles.sectionH} />
        <p id="proc-h" className={styles.srOnly}>Bốn bước làm một ổ bánh</p>
      </div>
      <ol className={styles.steps}>
        {STEPS.map((s) => (
          <li key={s.n}>
            <div className={styles.stepImg}><Pic src={s.img} alt="" pos={s.pos} ratio="5/4" /></div>
            <b>{s.n}</b>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const TEAM = [
  ["Hoàng Minh", "Bếp trưởng", "Làm bánh mì từ năm 17 tuổi, giữ công thức sốt bơ tỏi gốc."],
  ["Thu Hà", "Quản lý cửa hàng", "Người đảm bảo mỗi hộp ra cửa còn nóng và đúng yêu cầu."],
  ["Quốc Bảo", "Phụ trách bếp chiên", "Chiên khoai hai lần, canh nhiệt dầu từng mẻ."],
  ["Ngọc Lan", "Pha chế trà sữa kem", "Nghĩ ra vị Oreo muối biển và dâu socola đặc."],
];

export function Team() {
  return (
    <section className={styles.team} aria-labelledby="team-h">
      <div className={styles.secHead}>
        <span className={styles.kicker}>Đội hình</span>
        <Glitch as="h2" text="ĐỘI HÌNH TRÊN SÂN." className={styles.sectionH} />
        <p id="team-h" className={styles.srOnly}>Đội ngũ Bánh Mì Tầng</p>
      </div>
      <ul className={styles.teamGrid}>
        {TEAM.map(([n, r, d], i) => (
          <li key={n}>
            <span className={styles.jersey}>{String(i + 7).padStart(2, "0")}</span>
            <h3>{n}</h3>
            <b>{r}</b>
            <p>{d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const PLANS = [
  { name: "Đội nhỏ", who: "2 người", price: "129.000đ", items: ["2 ổ Tầng Đôi", "1 khoai lớn", "2 trà sữa kem", "2 hũ sốt tự chọn"], hot: false },
  { name: "Cả hiệp", who: "4 người", price: "239.000đ", items: ["4 ổ Tầng Đôi hoặc Gà Giòn", "2 khoai khay chia", "4 trà sữa kem", "4 hũ sốt, tặng 1 khoai vừa"], hot: true },
  { name: "Tiệc nhóm", who: "8 người trở lên", price: "429.000đ", items: ["8 ổ tuỳ chọn", "4 khoai khay chia", "8 ly trà sữa", "Giao tận nơi miễn phí nội thành"], hot: false },
];

export function Plans() {
  return (
    <section id="combo-gia" className={styles.plans} aria-labelledby="plans-h">
      <div className={styles.secHead}>
        <span className={styles.kicker}>Combo & tiệc</span>
        <Glitch as="h2" text="CHỌN ĐỘI, CHỐT ĐƠN." className={styles.sectionH} />
        <p id="plans-h" className={styles.lead}>Ba cỡ combo xếp sẵn trong hộp giấy kraft, đặt trước một giờ là kịp cho buổi họp nhóm hay trận bóng cuối tuần.</p>
      </div>
      <ul className={styles.planGrid}>
        {PLANS.map((p) => (
          <li key={p.name} className={p.hot ? styles.planHot : undefined}>
            {p.hot && <span className={styles.flag}>Bán chạy nhất</span>}
            <h3>{p.name}</h3>
            <p className={styles.planWho}>{p.who}</p>
            <p className={styles.planPrice}>{p.price}</p>
            <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
            <a className={p.hot ? styles.btnOr : styles.btnLine} href="#dat-hang">Đặt combo này</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const SHOPS = [
  ["Quận 3 (cửa hàng gốc)", "128 Võ Văn Tần, Phường Võ Thị Sáu", "10:00 – 22:00", "Có chỗ ngồi 40 khách, bếp mở"],
  ["Bình Thạnh", "56 Xô Viết Nghệ Tĩnh, Phường 21", "10:00 – 22:30", "Có bãi giữ xe máy, mở thêm khung đêm"],
  ["Thủ Đức", "21 Võ Văn Ngân, Phường Linh Chiểu", "09:30 – 22:00", "Gần ký túc xá, giảm 10% cho sinh viên"],
];

export function Shops() {
  return (
    <section id="cua-hang" className={styles.shops} aria-labelledby="shops-h">
      <div className={styles.secHead}>
        <span className={styles.kicker}>Cửa hàng</span>
        <Glitch as="h2" text="SÂN NHÀ, SÂN KHÁCH." className={styles.sectionH} />
        <p id="shops-h" className={styles.srOnly}>Ba cửa hàng minh hoạ</p>
      </div>
      <ul className={styles.shopGrid}>
        {SHOPS.map(([n, a, h, note]) => (
          <li key={n}>
            <h3>{n}</h3>
            <address>{a}</address>
            <p><b>Giờ mở cửa</b> {h}</p>
            <p>{note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const REVIEWS = [
  ["Phương Anh", "Sinh viên", "Vỏ bánh giòn, thịt ép cháy cạnh đúng kiểu mình thích. Sốt bơ tỏi không bị ngấy."],
  ["Đức Long", "Nhân viên văn phòng", "Đặt combo 4 người cho cả phòng, hộp ra còn nóng, khoai vẫn giòn sau 20 phút giao."],
  ["Mai Trâm", "Chủ quán cà phê", "Trà sữa kem Oreo đặc đến mức ống hút cắm đứng được. Sẽ đặt thêm cho buổi sinh nhật."],
];

export function Reviews() {
  return (
    <section className={styles.reviews} aria-labelledby="rev-h">
      <div className={styles.secHead}>
        <span className={styles.kicker}>Khách nói gì</span>
        <Glitch as="h2" text="KHÁN GIẢ LÊN TIẾNG." className={styles.sectionH} />
        <p id="rev-h" className={styles.srOnly}>Đánh giá của khách (nội dung minh hoạ)</p>
      </div>
      <ul className={styles.revGrid}>
        {REVIEWS.map(([n, r, q]) => (
          <li key={n}>
            <p className={styles.stars} aria-label="5 sao">★★★★★</p>
            <blockquote>{q}</blockquote>
            <cite>{n} <small>· {r}</small></cite>
          </li>
        ))}
      </ul>
      <p className={styles.fineLine}>Đánh giá trên là nội dung minh hoạ, không phải khách hàng thật.</p>
    </section>
  );
}

const FAQ = [
  ["Bánh mì ở đây có gì khác bánh mì thường?", "Ổ bánh được nướng bơ, thịt ép sát chảo gang cho xém cạnh, rồi xếp sáu lớp theo thứ tự cố định để vị không lẫn vào nhau. Mỗi lớp được làm riêng, ghép cuối cùng."],
  ["Thời gian chờ là bao lâu?", "Nhận tại quầy mất 10–15 phút. Giao nội thành khoảng 25–35 phút tuỳ giờ cao điểm. Combo nhóm từ 8 người nên đặt trước một giờ."],
  ["Có món chay hoặc không cay không?", "Có. Tầng Đơn chay dùng chả nấm và phô mai, mọi loại sốt cay đều có thể đổi sang sốt bơ tỏi. Hãy ghi chú trong phần đặt hàng."],
  ["Tôi có thể đổi lớp nhân không?", "Được. Bạn có thể bỏ hành, thêm phô mai, đổi thịt sang gà giòn hoặc thêm lớp trứng ốp la với phụ phí 8.000đ."],
  ["Giao hàng tính phí thế nào?", "Miễn phí cho đơn từ 150.000đ trong bán kính 5 km. Đơn nhỏ hơn thu 15.000đ. Phí này chỉ là ví dụ minh hoạ."],
  ["Có nhận đặt tiệc, sự kiện công ty không?", "Có. Gói Tiệc nhóm phục vụ từ 8 người, báo giá riêng từ 30 phần trở lên. Gửi yêu cầu qua form bên dưới."],
  ["Thanh toán bằng gì?", "Tiền mặt, chuyển khoản QR và các ví điện tử phổ biến. Đây là trang minh hoạ nên form đặt hàng bên dưới không thu tiền thật."],
];

export function Faq() {
  return (
    <section id="hoi-dap" className={styles.faq} aria-labelledby="faq-h">
      <div className={styles.faqGrid}>
        <div className={styles.faqHead}>
          <span className={styles.kicker}>Hỏi nhanh</span>
          <Glitch as="h2" text="HỎI ĐÁP." className={styles.sectionH} />
          <p id="faq-h" className={styles.lead}>Chưa thấy câu bạn cần? Gọi cửa hàng hoặc nhắn qua form đặt hàng.</p>
        </div>
        <div className={styles.faqList}>
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BigFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.fWrap}>
        <div>
          <Roundel size={56} />
          <p className={styles.fBig}>GHÉ TẦNG, MANG VỀ TẦNG.</p>
        </div>
        <address className={styles.fAddr}>
          <b>Cửa hàng gốc (minh hoạ)</b>
          <span>128 Võ Văn Tần, Quận 3, TP. Hồ Chí Minh</span>
          <span>Mở cửa 10:00–22:00 mỗi ngày</span>
          <span>Đặt bàn nhóm: 0900 000 000</span>
          <span>xinchao@banhmitang.example</span>
        </address>
        <a className={styles.btnOr} href="#top">Về đầu trang</a>
      </div>
      <div className={styles.fCols}>
        <nav aria-label="Sơ đồ trang">
          <b>Sơ đồ trang</b>
          <a href="#thuc-don">Thực đơn</a>
          <a href="#cau-chuyen">Câu chuyện</a>
          <a href="#combo-gia">Combo & tiệc</a>
          <a href="#cua-hang">Cửa hàng</a>
          <a href="#hoi-dap">Hỏi đáp</a>
          <a href="#dat-hang">Đặt hàng</a>
        </nav>
        <nav aria-label="Mạng xã hội">
          <b>Theo dõi</b>
          <a href="#top">Facebook</a>
          <a href="#top">Instagram</a>
          <a href="#top">TikTok</a>
        </nav>
        <div>
          <b>Giờ cao điểm</b>
          <span>11:30 – 13:00</span>
          <span>17:30 – 20:00</span>
          <span>Đặt trước để không phải chờ</span>
        </div>
      </div>
      <p className={styles.fFine}>© 2026 Bánh Mì Tầng. Trang minh hoạ thiết kế. Tên thương hiệu, địa chỉ, giá, đánh giá và món ăn chỉ là ví dụ, không phải cửa hàng thật. Ảnh: Pexels.</p>
    </footer>
  );
}
