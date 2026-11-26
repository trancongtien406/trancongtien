import Image from "next/image";
import { Counter, SplitWords, TextScramble } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import {
  AMENITIES, BOOKING, CLOSING, COMMUNITY, FAQ, FOOT, IMG, MANIFESTO, MEET_ROWS, NAV, PLAN_CARDS, POLICY, PRICE_TABLE, ROOM_ROWS, RULES, TRIAL, VALUES, ZONES,
} from "../data/content";
import { CommunityCal } from "./CommunityCal";
import { HoursTable, OpenBadge } from "./OpenNow";
import { SeatPicker } from "./SeatPicker";
import { Workday } from "./Workday";

const CAPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/+";

function Head({ n, tag, title, lead, id }: { n: string; tag: string; title: string; lead?: string; id?: string }) {
  return (
    <header className={s.secHead}>
      <p className={s.secTag}><TextScramble charset={CAPS}>{`[ ${n} ] ${tag}`}</TextScramble></p>
      <span className={s.rule} data-cg-rule aria-hidden="true" />
      <h2 className={s.h2} id={id}><SplitWords as="span" stagger={0.05}>{title}</SplitWords></h2>
      {lead && <p className={s.secLead} data-cg-rise>{lead}</p>}
    </header>
  );
}

const TILE_C = 4, TILE_R = 3;
/** Khung ảnh che bằng lưới ô: các ô tan theo đường chéo khi vào khung (Motion đặt data-in). */
function TileFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`${s.tileFrame} ${className ?? ""}`} data-cg-tiles>
      {children}
      <span className={s.tiles} aria-hidden="true">
        {Array.from({ length: TILE_C * TILE_R }, (_, k) => {
          const r = Math.floor(k / TILE_C), c = k % TILE_C;
          return <i key={k} style={{ ["--d" as string]: `${(r + c) * 85 + (k % 3) * 25}ms` }} data-accent={k === 6 ? "1" : undefined} />;
        })}
      </span>
    </div>
  );
}

/** Dải giờ mở cửa ngay sau hero: trạng thái mở/đóng theo giờ Đà Nẵng + bảng giờ + ba quy định thường hỏi nhất. */
export function HoursSection() {
  return (
    <section className={s.sec} id="gio-mo-cua" aria-labelledby="cg-hours">
      <div className={s.wrap}>
        <Head n="01" tag="GIỜ MỞ CỬA" title="Mở cửa khi nào, ai được vào." id="cg-hours" />
        <div className={s.hoursGrid}>
          <div>
            <p className={s.hoursStatus}><OpenBadge /></p>
            <HoursTable />
          </div>
          <ul className={s.hoursNotes} data-cg-cells>
            <li data-cg-cell><b>Thành viên tháng</b><p>Có thẻ ra vào, dùng chỗ của mình trong giờ mở cửa, bàn cố định và phòng riêng vào được cả Chủ nhật.</p></li>
            <li data-cg-cell><b>Khách ngày và dùng thử</b><p>Check-in ở quầy từ giờ mở cửa, nhận thẻ khách và trả lại khi ra về.</p></li>
            <li data-cg-cell data-cg-accent="1"><b>Ngoài giờ</b><p>Không làm việc qua đêm. Phòng họp đặt theo giờ trong khung giờ mở cửa.</p></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className={s.sec} id="gioi-thieu" aria-label="Giới thiệu">
      <div className={s.wrap}>
        <div className={s.manGrid}>
          <div className={s.manText}>
            <p className={s.secTag}><TextScramble charset={CAPS}>[ 02 ] GIỚI THIỆU</TextScramble></p>
            <p className={s.manP}>{MANIFESTO}</p>
          </div>
          <ul className={s.values} data-cg-cells>
            {VALUES.map((v, i) => (
              <li key={v.n} data-cg-cell data-cg-accent={i === 3 ? "1" : undefined} className={s.valueCell}>
                <span className={s.valueN}>{v.n}</span>
                <b>{v.t}</b>
                <p>{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Zones() {
  return (
    <section className={s.sec} id="khong-gian" aria-labelledby="cg-zones">
      <div className={s.wrap}>
        <Head n="04" tag="KHÔNG GIAN VÀ KHU VỰC" title="Bốn khu, bốn toạ độ." id="cg-zones" lead="Một tầng làm việc chia bốn khu A đến D và khu cà phê E. Chọn khu hợp với việc bạn làm, rồi xem đúng chỗ đó trên sơ đồ." />
        <div className={s.zoneGrid}>
          {ZONES.map((z, i) => (
            <article key={z.code} className={s.zone} data-i={i} data-cursor="Xem">
              <div className={s.zoneTop}>
                <span className={s.zoneCode}>{z.code}</span>
                <span className={s.zoneTag}>{z.tag}</span>
              </div>
              <TileFrame className={s.zoneImg}>
                <div className={s.zoneImgBox}>
                  <Image src={IMG(z.img, 1200)} alt={z.alt} fill sizes="(max-width: 768px) 92vw, 660px" className={s.cover} />
                </div>
              </TileFrame>
              <div className={s.zoneBody}>
                <h3>{z.name}</h3>
                <p>{z.text}</p>
                <a className={s.zoneLink} href="#so-do">Xem trên sơ đồ <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PickerSection() {
  return (
    <section className={s.sec} id="so-do" aria-labelledby="cg-pick">
      <div className={s.wrap}>
        <Head n="05" tag="SƠ ĐỒ CHỖ NGỒI" title="Chọn chỗ ngồi trên bản vẽ." id="cg-pick" lead="Cho biết số người, số ngày và loại chỗ. Sơ đồ tô sáng ô phù hợp, gợi ý gói và so sánh ba lựa chọn." />
        <SeatPicker />
      </div>
    </section>
  );
}

export function WorkdaySection() {
  return (
    <section className={s.sec} id="nhip-ngay" aria-labelledby="cg-day">
      <div className={s.wrap}>
        <Head n="06" tag="NHỊP NGÀY" title="Một ngày ở Ô Lưới." id="cg-day" lead="Đồng hồ theo giờ Đà Nẵng. Đường cong là mật độ thường gặp của khu mở hôm nay, để bạn chọn giờ ngồi hợp ý." />
        <Workday />
      </div>
    </section>
  );
}

const ICONS: Record<string, string> = {
  wifi: "M3 9a14 14 0 0 1 18 0M6 12.5a9.5 9.5 0 0 1 12 0M9 16a5 5 0 0 1 6 0M12 19.5h.01",
  coffee: "M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5zM16 10h2a2.5 2.5 0 0 1 0 5h-2M8 3v2M12 3v2",
  print: "M7 9V3h10v6M7 17H4V9h16v8h-3M7 14h10v7H7z",
  plug: "M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4",
  locker: "M5 3h14v18H5zM12 3v18M9 11v2M15 11v2",
  booth: "M6 3h12v18H6zM6 8h12M10 12h4",
  air: "M3 8h12a3 3 0 1 0-3-3M3 13h16a3 3 0 1 1-3 3M3 18h8",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
};

export function Amenities() {
  return (
    <section className={s.sec} id="tien-ich" aria-labelledby="cg-am">
      <div className={s.wrap}>
        <Head n="07" tag="TIỆN ÍCH VÀ QUY ĐỊNH" title="Có sẵn, và những quy ước chung." id="cg-am" />
        <ul className={s.amGrid} data-cg-cells>
          {AMENITIES.map((a, i) => (
            <li key={a.k} className={s.amCell} data-cg-cell data-cg-accent={i === 7 ? "1" : undefined}>
              <span className={s.amCode}>{String.fromCharCode(65 + (i % 4))}{Math.floor(i / 4) + 1}</span>
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true"><path d={ICONS[a.k]} /></svg>
              <b>{a.t}</b>
              <p>{a.d}</p>
            </li>
          ))}
        </ul>
        <div className={s.amBand}>
          <TileFrame className={s.amImg}>
            <div className={s.zoneImgBox}><Image src={IMG("ca-phe", 1200)} alt="Tách cà phê đen cạnh chuột máy tính trên mặt bàn gỗ" fill sizes="(max-width: 768px) 46vw, 380px" className={s.cover} /></div>
          </TileFrame>
          <TileFrame className={s.amImg}>
            <div className={s.zoneImgBox}><Image src={IMG("den-ban", 1200)} alt="Đèn bàn gỗ phát sáng cạnh chậu cỏ nhỏ" fill sizes="(max-width: 768px) 46vw, 380px" className={s.cover} /></div>
          </TileFrame>
          <TileFrame className={s.amImg}>
            <div className={s.zoneImgBox}><Image src={IMG("cay-xanh-cua-so", 1200)} alt="Hàng chậu cây bên cửa sổ lớn của văn phòng mở" fill sizes="(max-width: 768px) 46vw, 380px" className={s.cover} /></div>
          </TileFrame>
        </div>
        <h3 className={s.subHead}>Quy định thường hỏi</h3>
        <ul className={s.rules} data-cg-cells>
          {RULES.map((r, i) => (
            <li key={r.t} className={s.ruleCell} data-cg-cell data-cg-accent={i === 5 ? "1" : undefined}>
              <b>{r.t}</b>
              <p>{r.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Pricing() {
  const consult = buildConsultHref("cowork-grid");
  return (
    <section className={`${s.sec} ${s.light}`} id="gia" aria-labelledby="cg-price">
      <div className={s.wrap}>
        <Head n="03" tag="LOẠI CHỖ VÀ BẢNG GIÁ" title="Bốn loại chỗ, giá theo ngày, tuần, tháng." id="cg-price" lead="Giá chưa gồm VAT. Chi phí cụ thể được xác nhận khi bạn đặt lịch tham quan." />
        <div className={s.planGrid} data-cg-cells>
          {PLAN_CARDS.map((p) => (
            <article key={p.code} className={s.planCard} data-cg-cell data-feature={p.feature ? "1" : undefined}>
              {p.feature && <span className={s.beam} aria-hidden="true" />}
              <p className={s.planCode}>{p.code} / {p.name.toUpperCase()}{p.feature ? " · PHỔ BIẾN" : ""}</p>
              <h3>{p.name}</h3>
              <p className={s.planPrice}>
                {p.from && <small>từ </small>}<Counter value={Number(p.price.replace(/\./g, ""))} duration={1.3} className={s.planNum} />
                <span>{p.unit}</span>
              </p>
              <p className={s.planNote}>{p.note}</p>
              <ul>{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <p className={s.planFit}>Phù hợp: {p.fit}</p>
            </article>
          ))}
        </div>
        <table className={`${s.tbl} ${s.priceTbl}`}>
          <caption>Chỗ ngồi theo ngày, tuần, tháng</caption>
          <thead><tr><th scope="col">Loại chỗ</th><th scope="col">Theo ngày</th><th scope="col">Theo tuần</th><th scope="col">Theo tháng</th></tr></thead>
          <tbody>
            {PRICE_TABLE.map((r) => (
              <tr key={r.name}>
                <th scope="row">{r.name}<small>{r.extra}</small></th>
                <td data-l="Theo ngày">{r.day}</td><td data-l="Theo tuần">{r.week}</td><td data-l="Theo tháng">{r.month}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={s.tables}>
          <table className={s.tbl}>
            <caption>Phòng riêng, theo tháng</caption>
            <thead><tr><th scope="col">Phòng</th><th scope="col">Giá mỗi tháng</th></tr></thead>
            <tbody>{ROOM_ROWS.map((r) => <tr key={r.name}><th scope="row">{r.name}</th><td>{r.price}&nbsp;đ</td></tr>)}</tbody>
          </table>
          <table className={s.tbl}>
            <caption>Phòng họp, theo giờ</caption>
            <thead><tr><th scope="col">Phòng</th><th scope="col">Giá</th></tr></thead>
            <tbody>{MEET_ROWS.map((r) => <tr key={r.name}><th scope="row">{r.name}</th><td>{r.price}&nbsp;{r.unit}</td></tr>)}</tbody>
          </table>
        </div>
        <p className={s.priceNote}>Giá niêm yết, chưa gồm VAT. <a href={consult}>Hỏi giá theo nhu cầu của bạn</a></p>
      </div>
    </section>
  );
}

export function Trial() {
  const consult = buildConsultHref("cowork-grid");
  return (
    <section className={s.sec} id="dung-thu" aria-labelledby="cg-trial">
      <div className={s.wrap}>
        <Head n="08" tag="DÙNG THỬ 1 NGÀY" title={TRIAL.h} id="cg-trial" lead={TRIAL.p} />
        <div className={s.trialGrid}>
          <ol className={s.trialSteps} data-cg-cells>
            {TRIAL.steps.map((st, i) => (
              <li key={st.t} data-cg-cell data-cg-accent={i === 3 ? "1" : undefined}>
                <span className={s.stepN}>{String(i + 1).padStart(2, "0")}</span>
                <b>{st.t}</b>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
          <div className={s.trialRules}>
            <p className={s.pickTag}>[ ĐIỀU KIỆN ]</p>
            <ul>{TRIAL.rules.map((r) => <li key={r}>{r}</li>)}</ul>
            <a className={`${s.btn} ${s.btnOrange}`} href={consult}>Đăng ký dùng thử 1 ngày</a>
          </div>
        </div>
        <div className={s.trialImgs}>
          <TileFrame className={s.stairImg}>
            <div className={s.zoneImgBox}><Image src={IMG("cau-thang-be-tong", 1200)} alt="Cầu thang bê tông xoắn nhìn từ dưới lên" fill sizes="(max-width: 768px) 92vw, 440px" className={s.cover} /></div>
          </TileFrame>
          <TileFrame className={s.stairImg2}>
            <div className={s.zoneImgBox}><Image src={IMG("ghe-cam", 1200)} alt="Ghế cam quanh bàn họp gỗ sáng" fill sizes="(max-width: 768px) 92vw, 700px" className={s.cover} /></div>
          </TileFrame>
        </div>
      </div>
    </section>
  );
}

export function Community() {
  return (
    <section className={s.sec} id="cong-dong" aria-labelledby="cg-com">
      <div className={s.wrap}>
        <Head n="09" tag="CỘNG ĐỒNG VÀ SỰ KIỆN" title="Vài buổi nhẹ mỗi tháng." id="cg-com" lead={COMMUNITY.p} />
        <CommunityCal />
        <p className={s.priceNote}>{COMMUNITY.note}</p>
      </div>
    </section>
  );
}

export function Booking() {
  return (
    <section className={s.sec} id="dat-cho" aria-labelledby="cg-steps">
      <div className={s.wrap}>
        <Head n="10" tag="ĐẶT CHỖ VÀ THAM QUAN" title="Từ ghé xem đến ngồi làm." id="cg-steps" />
        <div className={s.steps}>
          <span className={s.stepsLine} data-cg-rule aria-hidden="true" />
          <ol className={s.stepList} data-cg-cells>
            {BOOKING.map((st) => (
              <li key={st.n} data-cg-cell>
                <span className={s.stepNode} aria-hidden="true" />
                <span className={s.stepN}>{st.n}</span>
                <b>{st.t}</b>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <ul className={s.policy} data-cg-cells>
          {POLICY.map((p) => (
            <li key={p.t} data-cg-cell className={s.ruleCell}><b>{p.t}</b><p>{p.d}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className={s.sec} id="hoi-dap" aria-labelledby="cg-faq">
      <div className={s.wrap}>
        <Head n="11" tag="HỎI ĐÁP" title="Câu hỏi thường gặp." id="cg-faq" />
        <div className={s.faq}>
          {FAQ.map((f, i) => (
            <details key={f.q} className={s.faqItem} data-cg-rise>
              <summary><span className={s.faqN}>{String(i + 1).padStart(2, "0")}</span><span>{f.q}</span><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  const consult = buildConsultHref("cowork-grid");
  return (
    <section className={`${s.sec} ${s.closing}`} id="lien-he" aria-labelledby="cg-close">
      <div className={s.wrap}>
        <p className={s.secTag}><TextScramble charset={CAPS}>{`[ ${CLOSING.kicker} ]`}</TextScramble></p>
        <h2 className={s.closeH} id="cg-close"><SplitWords as="span" stagger={0.05}>{CLOSING.h}</SplitWords></h2>
        <p className={s.secLead} data-cg-rise>{CLOSING.p}</p>
        <div className={s.closeCta} data-cg-rise>
          <a className={`${s.btn} ${s.btnOrange} ${s.btnLg}`} href={consult}>{CLOSING.cta} <span aria-hidden="true">↗</span></a>
          <a className={`${s.btn} ${s.btnLine}`} href="#dung-thu">Xem chính sách dùng thử</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.giant}>
          <p aria-hidden="true">Ô LƯỚI</p>
        </div>
        <div className={s.footGrid}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/cowork-grid/identity/logo-horizontal.svg" alt="Ô Lưới" width={110} height={44} />
            <p className={s.footLine}>Không gian làm việc chung ở Quận Hải Châu, Đà Nẵng.</p>
          </div>
          <nav aria-label="Chân trang">
            <p className={s.footHead}>Mục lục</p>
            <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
          </nav>
          <div>
            <p className={s.footHead}>Liên hệ</p>
            <ul>
              <li>{FOOT.area}</li>
              <li>{FOOT.contact}</li>
              <li>{FOOT.phone}</li>
              <li><a href={buildConsultHref("cowork-grid")}>Gửi yêu cầu tư vấn</a></li>
            </ul>
          </div>
        </div>
        <div className={s.footBase}>
          <span>© Ô Lưới · Giá chưa gồm VAT.</span>
          <span>Website do {siteConfig.fullName} thiết kế · <a href="/demos/cowork-grid/credits">Ảnh &amp; ghi công</a></span>
        </div>
      </div>
    </footer>
  );
}
