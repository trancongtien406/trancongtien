import { siteConfig } from "@/lib/site";
import { buildConsultHref } from "@/features/showroom/consultation";
import { ClipReveal } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { Photo } from "./Photo";
import { Embers } from "./Embers";
import { FAQ, POLICIES } from "../data/restaurant";

export function Journey() {
  const steps = [
    { n: "01", file: "hoang-hon-bien", alt: "Hoàng hôn trên biển, một chiếc thuyền nhỏ ngoài khơi", h: "Cập bến lúc rạng sáng", p: "Thuyền nhỏ vào bờ khi trời chưa nắng. Tôm, mực, ghẹ được chọn ngay tại bến, đi thẳng về bể của nhà hàng.", pos: "55% 50%" },
    { n: "02", file: "ca-tuoi-da", alt: "Cá tươi xếp trên đá lạnh với cành thông xanh", h: "Chọn tươi tại quầy đá", p: "Mỗi sáng bếp trưởng xếp quầy đá theo hàng về trong ngày. Khách chỉ món nào, bếp làm món đó, không bày sẵn.", pos: "50% 50%" },
    { n: "03", file: "bep-lua", alt: "Ngọn lửa bốc cao trên chảo trong căn bếp tối", h: "Lên bếp lửa, ra bàn nóng", p: "Nướng than, rang me, hấp sả. Lửa lớn, nhanh tay để vị ngọt của hải sản còn nguyên rồi mới mang ra bàn.", pos: "50% 40%" },
  ];
  return (
    <section id="tu-ben-toi-ban" className={`${s.section} ${s.journey} ${s.noPrint}`} aria-labelledby="journey-h">
      <Embers />
      <div className={`${s.wrap} ${s.above}`}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Nguồn hải sản</span>
          <h2 id="journey-h" className={`${s.display} ${s.h2}`}>Từ bến tới bàn, <span className={s.italic}>qua bếp lửa</span></h2>
          <p className={s.lead}>Hải sản về theo từng chuyến thuyền nhỏ, nằm ở quầy đá trong ngày và lên bếp than khi bạn gọi. Càng ít chặng trung gian, vị biển càng còn nguyên.</p>
        </div>
        <ol className={s.arches}>
          {steps.map((st) => (
            <li key={st.n} className={s.arch} data-bv="reveal">
              <ClipReveal className={s.archImg} from="bottom" duration={1.2}><Photo file={st.file} alt={st.alt} sizes="(max-width: 960px) 90vw, 30vw" pos={st.pos} /></ClipReveal>
              <p className={s.archNo}>{st.n}</p>
              <h3>{st.h}</h3>
              <span className={s.rule} data-bv="rule" aria-hidden="true" />
              <p>{st.p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Space() {
  return (
    <section id="khong-gian" className={`${s.section} ${s.space} ${s.noPrint}`} aria-labelledby="space-h">
      <div className={s.wrap}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Không gian bàn tiệc</span>
          <h2 id="space-h" className={`${s.display} ${s.h2}`}>Sảnh biển, bếp lửa, <span className={s.italic}>và phòng riêng</span></h2>
          <p className={s.lead}>Bốn khu vực chỗ ngồi: sảnh hướng biển, sân vườn, quầy bếp lửa và phòng riêng. Bàn gỗ dài cho nhóm đông, đèn vàng ấm, đĩa gốm để nổi màu của món.</p>
        </div>
        <div className={s.mosaic}>
          <ClipReveal as="figure" className={`${s.tile} ${s.t1}`}><Photo file="ban-tiec-go" alt="Bàn gỗ nhìn từ trên, nhiều đĩa hải sản và ly đồ uống" sizes="(max-width: 960px) 96vw, 54vw" pos="50% 55%" /><figcaption className={s.tcap}>Bàn tiệc</figcaption></ClipReveal>
          <ClipReveal as="figure" className={`${s.tile} ${s.t2}`}><Photo file="hau-da-lanh" alt="Hàu mở vỏ xếp trên đá lạnh" sizes="(max-width: 960px) 46vw, 30vw" pos="50% 45%" /></ClipReveal>
          <ClipReveal as="figure" className={`${s.tile} ${s.t3}`}><Photo file="xien-nuong" alt="Xiên hải sản nướng trên đĩa trắng cùng chén nước chấm" sizes="(max-width: 960px) 46vw, 30vw" pos="50% 25%" /><figcaption className={s.tcap}>Nướng than</figcaption></ClipReveal>
          <ClipReveal as="figure" className={`${s.tile} ${s.t4}`}><Photo file="nghe-so" alt="Nghêu tươi xếp dày, vỏ nâu xám" sizes="(max-width: 960px) 46vw, 26vw" /></ClipReveal>
          <ClipReveal as="figure" className={`${s.tile} ${s.t5}`}><Photo file="tom-sot" alt="Tôm sốt cam trên đĩa gốm đen, đũa đang gắp" sizes="(max-width: 960px) 46vw, 20vw" pos="62% 50%" /></ClipReveal>
        </div>
        <dl className={s.facts} data-bv="reveal">
          <div><dt><b>Sảnh biển</b></dt><dd><span>Bàn nhìn ra mặt nước, hợp nhóm 2 đến 8 khách.</span></dd></div>
          <div><dt><b>Quầy bếp lửa</b></dt><dd><span>Ngồi sát bếp than, tối đa 4 khách mỗi lượt.</span></dd></div>
          <div><dt><b>Phòng riêng</b></dt><dd><span>Bàn tròn xoay cho 6 đến 12 khách, có màn hình trình chiếu, đặt trước và chốt thực đơn trước 1 ngày.</span></dd></div>
        </dl>
      </div>
    </section>
  );
}

export function Policies() {
  return (
    <section id="chinh-sach" className={`${s.section} ${s.policy} ${s.noPrint}`} aria-labelledby="pol-h">
      <div className={s.wrap}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Chính sách</span>
          <h2 id="pol-h" className={`${s.display} ${s.h2}`}>Những điều <span className={s.italic}>nên biết trước</span></h2>
        </div>
        <dl className={s.polGrid} data-bv="reveal">
          {POLICIES.map((p) => (<div key={p.h}><dt>{p.h}</dt><dd>{p.p}</dd></div>))}
        </dl>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={`${s.section} ${s.faq} ${s.noPrint}`} aria-labelledby="faq-h">
      <div className={s.wrap}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Hỏi đáp</span>
          <h2 id="faq-h" className={`${s.display} ${s.h2}`}>Câu hỏi <span className={s.italic}>thường gặp</span></h2>
        </div>
        <div className={s.faqList} data-bv="reveal">
          {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className={`${s.closing} ${s.noPrint}`} aria-labelledby="close-h">
      <div className={s.wrap}>
        <span className={s.eyebrow}>Quận Sơn Trà, Đà Nẵng</span>
        <h2 id="close-h" className={`${s.display} ${s.h2}`}>Một bàn nhìn ra biển <span className={s.italic}>đang chờ bạn</span></h2>
        <p className={s.lead}>Phục vụ trưa và tối mỗi ngày. Đặt bàn trước nếu đi nhóm từ 6 người, và báo dị ứng khi đặt để bếp chuẩn bị.</p>
        <div className={s.heroCtas}>
          <a className={`${s.btn} ${s.btnGold}`} href="#dat-ban">Đặt bàn</a>
          <a className={`${s.btn} ${s.btnLine}`} href="#thuc-don">Xem thực đơn</a>
          <a className={`${s.btn} ${s.btnLine}`} href={buildConsultHref("ben-vi")}>Chuyển sang form liên hệ</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={`${s.footer} ${s.noPrint}`}>
      <div className={s.wrap}>
        <div className={s.footGrid}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/ben-vi/identity/logo-reversed.svg" alt="Bến Vị" width={273} height={52} />
            <p>Vị biển, trọn cuộc vui.<br />Nhà hàng hải sản ven biển, Quận Sơn Trà, Đà Nẵng.</p>
          </div>
          <div>
            <h4>Trang</h4>
            <ul>
              <li><a href="#quay-hai-san">Quầy hải sản</a></li>
              <li><a href="#thuc-don">Thực đơn</a></li>
              <li><a href="#set-tiec">Set theo số người</a></li>
              <li><a href="#dat-ban">Đặt bàn</a></li>
              <li><a href="#chinh-sach">Chính sách</a></li>
            </ul>
          </div>
          <div>
            <h4>Nhà hàng</h4>
            <ul>
              <li>Quận Sơn Trà, Đà Nẵng</li>
              <li>Mở cửa 10:00 đến 22:00 mỗi ngày</li>
              <li>Đặt bàn: 0236 000 0000</li>
              <li>xinchao@benvi.example</li>
            </ul>
          </div>
          <div>
            <h4>Thông tin</h4>
            <ul>
              <li><a href="/demos/ben-vi/credits">Ảnh &amp; ghi công</a></li>
              <li><a href={buildConsultHref("ben-vi")}>Tư vấn website tương tự</a></li>
            </ul>
          </div>
        </div>
        <div className={s.footBase}>
          <span>Giá trên trang là giá tham khảo, thay đổi theo ngày.</span>
          <span>Website do {siteConfig.fullName} thiết kế.</span>
        </div>
      </div>
    </footer>
  );
}
