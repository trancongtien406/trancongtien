import { siteConfig } from "@/lib/site";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { Photo } from "./Photo";

export function Journey() {
  const steps = [
    { n: "01", file: "hoang-hon-bien", alt: "Hoàng hôn trên biển, một chiếc thuyền nhỏ ngoài khơi", h: "Cập bến lúc rạng sáng", p: "Thuyền nhỏ vào bờ khi trời chưa nắng. Tôm, mực, ghẹ được chọn ngay tại bến, đi thẳng về bể của nhà hàng.", pos: "55% 50%" },
    { n: "02", file: "ca-tuoi-da", alt: "Cá tươi xếp trên đá lạnh với cành thông xanh", h: "Chọn tươi tại quầy đá", p: "Mỗi sáng bếp trưởng xếp quầy đá theo hàng về trong ngày. Khách chỉ món nào, bếp làm món đó, không bày sẵn.", pos: "50% 50%" },
    { n: "03", file: "bep-lua", alt: "Ngọn lửa bốc cao trên chảo trong căn bếp tối", h: "Lên bếp lửa, ra bàn nóng", p: "Nướng than, rang me, hấp sả. Lửa lớn, nhanh tay để vị ngọt của hải sản còn nguyên rồi mới mang ra bàn.", pos: "50% 40%" },
  ];
  return (
    <section id="tu-ben-toi-ban" className={`${s.section} ${s.journey} ${s.noPrint}`} aria-labelledby="journey-h">
      <div className={s.wrap}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Từ bến tới bàn</span>
          <h2 id="journey-h" className={`${s.display} ${s.h2}`}>Ba chặng ngắn, <span className={s.italic}>một vị tươi</span></h2>
          <p className={s.lead}>Bến Vị theo một ý đơn giản: càng ít chặng trung gian, hải sản càng giữ được vị biển.</p>
        </div>
        <ol className={s.arches}>
          {steps.map((st) => (
            <li key={st.n} className={s.arch} data-bv="reveal">
              <div className={s.archImg}><Photo file={st.file} alt={st.alt} sizes="(max-width: 960px) 90vw, 30vw" pos={st.pos} /></div>
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
          <h2 id="space-h" className={`${s.display} ${s.h2}`}>Gỗ tối, gốm thủ công, <span className={s.italic}>tiếng lửa tí tách</span></h2>
          <p className={s.lead}>Bàn dài cho nhóm đông, quầy bếp lửa cho hai ba người, sảnh hướng biển cho buổi chiều tà. Đĩa gốm để nổi bật màu của món, ánh đèn vàng ấm để mọi người ngồi lại lâu hơn.</p>
        </div>
        <div className={s.mosaic}>
          <figure className={`${s.tile} ${s.t1}`} data-bv="tile"><Photo file="ban-tiec-go" alt="Bàn gỗ nhìn từ trên, nhiều đĩa hải sản và ly đồ uống" sizes="(max-width: 960px) 96vw, 54vw" pos="50% 55%" /><figcaption className={s.tcap}>Bàn tiệc</figcaption></figure>
          <figure className={`${s.tile} ${s.t2}`} data-bv="tile"><Photo file="hau-da-lanh" alt="Hàu mở vỏ xếp trên đá lạnh" sizes="(max-width: 960px) 46vw, 30vw" pos="50% 45%" /></figure>
          <figure className={`${s.tile} ${s.t3}`} data-bv="tile"><Photo file="xien-nuong" alt="Xiên hải sản nướng trên đĩa trắng cùng chén nước chấm" sizes="(max-width: 960px) 46vw, 30vw" pos="50% 25%" /><figcaption className={s.tcap}>Nướng than</figcaption></figure>
          <figure className={`${s.tile} ${s.t4}`} data-bv="tile"><Photo file="nghe-so" alt="Nghêu tươi xếp dày, vỏ nâu xám" sizes="(max-width: 960px) 46vw, 26vw" /></figure>
          <figure className={`${s.tile} ${s.t5}`} data-bv="tile"><Photo file="tom-sot" alt="Tôm sốt cam trên đĩa gốm đen, đũa đang gắp" sizes="(max-width: 960px) 46vw, 20vw" pos="62% 50%" /></figure>
        </div>
        <dl className={s.facts} data-bv="reveal">
          <div><dt><b>Sảnh biển</b></dt><dd><span>Bàn nhìn ra mặt nước, hợp nhóm 2 đến 8 khách.</span></dd></div>
          <div><dt><b>Quầy bếp lửa</b></dt><dd><span>Ngồi sát bếp than, tối đa 4 khách mỗi lượt.</span></dd></div>
          <div><dt><b>Phòng riêng</b></dt><dd><span>Bàn tròn xoay cho 6 đến 12 khách, đặt trước.</span></dd></div>
        </dl>
      </div>
    </section>
  );
}

const FAQ = [
  ["Giá trên trang có cố định không?", "Giá trên trang là giá tham khảo và thay đổi theo ngày, chưa gồm thuế và phí phục vụ. Giá chính thức được xác nhận khi bạn gọi món."],
  ["Bộ ghép thực đơn tính thế nào?", "Công cụ chọn số món chính theo số khách, thêm một món rau, một món khai vị, và từ 4 khách thì thêm cơm hoặc lẩu. Món hợp khẩu vị bạn chọn được ưu tiên, tổng luôn nằm trong ngân sách đã đặt. Kết quả chỉ là gợi ý để tham khảo."],
  ["Đặt bàn ở đây có giữ chỗ ngay không?", "Chưa. Phần đặt bàn chỉ tạo phiếu tóm tắt trên trình duyệt, không gửi đi đâu và không lưu thông tin cá nhân. Bàn chỉ được giữ khi nhà hàng xác nhận."],
  ["Tôi dị ứng hải sản vỏ cứng thì sao?", "Hãy bật tuỳ chọn tránh tôm cua ghẹ và nghêu sò ốc trong bộ ghép thực đơn. Bạn nên báo dị ứng cho nhân viên khi đặt bàn."],
  ["Một website như thế này làm trong bao lâu?", "Tuỳ phạm vi, thường vài tuần cho phần thiết kế, nội dung và tích hợp đặt bàn thật. Bạn có thể gửi yêu cầu tư vấn để nhận đề xuất theo ngành của mình."],
] as const;

export function Faq() {
  return (
    <section id="hoi-dap" className={`${s.section} ${s.faq} ${s.noPrint}`} aria-labelledby="faq-h">
      <div className={s.wrap}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Hỏi đáp</span>
          <h2 id="faq-h" className={`${s.display} ${s.h2}`}>Trước khi <span className={s.italic}>ngồi vào bàn</span></h2>
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
        <span className={s.eyebrow}>Bạn cũng có nhà hàng?</span>
        <h2 id="close-h" className={`${s.display} ${s.h2}`}>Một website khiến người ta <span className={s.italic}>thèm đặt bàn</span></h2>
        <p className={s.lead}>Ảnh món, thực đơn tương tác và đặt bàn nằm chung một trải nghiệm. Gửi yêu cầu để làm bản dành riêng cho nhà hàng của bạn.</p>
        <div className={s.heroCtas}>
          <a className={`${s.btn} ${s.btnGold}`} href={buildConsultHref("ben-vi")}>Nhận tư vấn website nhà hàng</a>
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
            <p>Vị biển, trọn cuộc vui.<br />Hải sản tươi, nướng lửa, ven biển Đà Nẵng.</p>
          </div>
          <div>
            <h4>Trang</h4>
            <ul>
              <li><a href="#tu-ben-toi-ban">Từ bến tới bàn</a></li>
              <li><a href="#mon-noi-bat">Món nổi bật</a></li>
              <li><a href="#ghep-thuc-don">Ghép thực đơn</a></li>
              <li><a href="#dat-ban">Đặt bàn</a></li>
            </ul>
          </div>
          <div>
            <h4>Nhà hàng</h4>
            <ul>
              <li>Ven biển Đà Nẵng</li>
              <li>Phục vụ trưa và tối</li>
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
