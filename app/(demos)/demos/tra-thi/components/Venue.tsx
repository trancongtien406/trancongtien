import Image from "next/image";
import s from "../brand.module.css";
import { InkReveal, InkTitle } from "./Ink";
import { BITES, GEAR, HOURS, POLICIES, ROOMS, TAKEAWAY, vnd } from "../data/tea";

const P = "/images/demos/tra-thi";

/** Bánh trà và đồ ăn kèm: ba nhóm, mỗi nhóm có gợi ý loại trà đi cùng. */
export function Bites() {
  return (
    <section id="banh-tra" className={s.sectionBlock}>
      <div className={`${s.wrap} ${s.biteWrap}`}>
        <div className={s.biteHead}>
          <p className={s.kicker}>Bánh trà và đồ ăn kèm</p>
          <InkTitle as="h2" className={s.h2}>Chút ngọt, chút mặn cho mỗi ấm trà.</InkTitle>
          <p className={s.lead}>Đồ ăn dọn theo đĩa nhỏ, vừa ăn cho 2 đến 3 người. Mỗi nhóm có gợi ý loại trà đi cùng, nhân viên sẽ nhắc khi bạn gọi.</p>
        </div>
        <div className={s.biteCols}>
          {BITES.map((g) => (
            <div key={g.id} className={s.biteGroup}>
              <h3 className={s.h3}>{g.title}</h3>
              <p className={s.biteHint}>{g.hint}</p>
              <ul className={s.priceList}>
                {g.items.map((b) => (
                  <li key={b.name}>
                    <span><b>{b.name}</b><small>{b.note}</small></span>
                    <span className={s.priceNum}>{vnd(b.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Bàn nhóm và phòng trà riêng (đặt phòng). */
export function Rooms() {
  return (
    <section id="phong-tra" className={s.sectionBlock}>
      <div className={s.wrap}>
        <p className={s.kicker}>Phòng trà và bàn nhóm</p>
        <InkTitle as="h2" className={s.h2}>Buổi trà cho nhóm, từ 1 đến 10 người.</InkTitle>
        <p className={s.lead}>Ba kiểu chỗ ngồi. Phòng riêng phù hợp họp nhóm nhỏ, sinh nhật nhẹ, gặp gia đình hoặc tiếp khách. Chọn bộ trà theo số người ở bên dưới để có bản tóm tắt gửi kèm khi đặt.</p>
        <ul className={s.roomGrid}>
          {ROOMS.map((r, i) => (
            <li key={r.id} className={s.room}>
              <span className={s.roomNo} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={s.h3}>{r.name}</h3>
              <p className={s.roomSeats}>{r.seats}</p>
              <p>{r.detail}</p>
              <dl className={s.roomMeta}>
                <div><dt>Phụ phí</dt><dd>{r.fee}</dd></div>
                <div><dt>Đặt chỗ</dt><dd>{r.rule}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Trà đóng gói mang về và dụng cụ. */
export function Takeaway() {
  return (
    <section id="mang-ve" className={s.sectionBlock}>
      <div className={`${s.wrap} ${s.takeGrid}`}>
        <div>
          <p className={s.kicker}>Trà mang về</p>
          <InkTitle as="h2" className={s.h2}>Mang một ấm trà về nhà.</InkTitle>
          <p className={s.lead}>Trà khô đóng túi theo gam, kèm thẻ ghi nhiệt độ nước và số giây từng nước pha. Bạn có thể nếm thử tại bàn trước khi mua.</p>
        </div>
        <div>
          <h3 className={s.h3}>Trà khô đóng gói</h3>
          <ul className={s.priceList}>
            {TAKEAWAY.map((t) => (
              <li key={t.name}><span><b>{t.name}</b><small>Túi {t.pack}</small></span><span className={s.priceNum}>{vnd(t.price)}</span></li>
            ))}
          </ul>
          <h3 className={s.h3} style={{ marginTop: 36 }}>Dụng cụ</h3>
          <ul className={s.priceList}>
            {GEAR.map((t) => (
              <li key={t.name}><span><b>{t.name}</b></span><span className={s.priceNum}>{vnd(t.price)}</span></li>
            ))}
          </ul>
          <p className={s.fine}>Giá tham khảo, có thể đổi theo mùa vụ. Mỗi túi nên dùng trong 3 đến 4 tháng sau khi mở.</p>
        </div>
      </div>
    </section>
  );
}

/** Không gian và giờ mở cửa. */
export function Space() {
  return (
    <section id="khong-gian" className={s.space}>
      <div className={`${s.wrap} ${s.hoursGrid}`}>
        <div>
          <p className={s.kicker}>Không gian và giờ mở cửa</p>
          <InkTitle as="h2" className={s.h2}>Một căn phòng nhỏ, ánh sáng thấp.</InkTitle>
          <p className={s.lead} style={{ marginTop: 20 }}>
            Mặt bàn gỗ, đèn dịu, vài món gốm được chọn kỹ. Mỗi bàn có một bộ trà và nước đun tại bàn, để bạn tự rót khi muốn. Quán ở Quận Hải Châu, Đà Nẵng; địa chỉ cụ thể gửi khi bạn đặt chỗ.
          </p>
        </div>
        <dl className={s.hoursList}>
          {HOURS.map((h) => (
            <div key={h.day}><dt>{h.day}</dt><dd>{h.time}</dd></div>
          ))}
        </dl>
      </div>
      <div className={`${s.wrap} ${s.spaceGrid}`}>
        <figure className={s.spaceA}>
          <InkReveal className={s.spaceImg}><Image src={`${P}/ban-tra-den-1200.webp`} alt="Bàn trà gỗ có ấm, chén và đèn dầu nhỏ" width={2000} height={1600} sizes="(max-width: 900px) 92vw, 52vw" className={s.cover} loading="lazy" data-cursor="Ngắm" /></InkReveal>
          <figcaption><b>Bàn trà gỗ.</b> Mỗi bàn một bộ trà, đủ chỗ để ấm, chén và tay bạn.</figcaption>
        </figure>
        <figure className={s.spaceB}>
          <InkReveal className={s.spaceImg} delay={0.1}><Image src={`${P}/am-den-1200.webp`} alt="Ấm gốm đen nhìn từ trên xuống" width={2000} height={3000} sizes="(max-width: 900px) 60vw, 26vw" className={s.cover} loading="lazy" data-cursor="Ngắm" /></InkReveal>
          <figcaption><b>Ấm gốm giữ nhiệt.</b> Mỗi nước pha đều đủ nóng.</figcaption>
        </figure>
        <figure className={s.spaceC}>
          <InkReveal className={s.spaceImg} delay={0.2}><Image src={`${P}/bot-matcha-1200.webp`} alt="Bột trà xanh trong bát gốm xanh trên nền đen" width={2000} height={3000} sizes="(max-width: 900px) 60vw, 26vw" className={s.cover} loading="lazy" data-cursor="Ngắm" /></InkReveal>
          <figcaption><b>Bột trà đánh tại bàn.</b> Rây và đánh ngay khi bạn gọi.</figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Quy định, đặt cọc, huỷ. */
export function Rules() {
  return (
    <section id="quy-dinh" className={s.sectionBlock}>
      <div className={`${s.wrap} ${s.rulesGrid}`}>
        <div>
          <p className={s.kicker}>Quy định</p>
          <InkTitle as="h2" className={s.h2}>Đặt chỗ, đặt cọc và giữ yên lặng.</InkTitle>
        </div>
        <dl className={s.ruleList}>
          {POLICIES.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
