import s from "../brand.module.css";
import { Photo } from "./Photo";

export function Hero() {
  return (
    <section className={`${s.hero} ${s.grain} ${s.noPrint}`} aria-labelledby="hero-h">
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div>
          <span className={s.eyebrow} data-bv="fade">Nhà hàng hải sản · ven biển Đà Nẵng</span>
          <h1 id="hero-h" className={`${s.display} ${s.heroH1}`}>
            <span className={s.ln}><span data-bv="hl">Vị biển,</span></span>
            <span className={s.ln}><span data-bv="hl" className={s.italic}>trọn cuộc vui.</span></span>
          </h1>
          <p className={s.heroSub} data-bv="fade">
            Tôm cua mực về bến lúc sáng, lên bếp lửa lúc chiều. Chọn món theo số người, ngân sách và khẩu vị, rồi giữ một bàn nhìn ra biển.
          </p>
          <div className={s.heroCtas} data-bv="fade">
            <a className={`${s.btn} ${s.btnGold}`} href="#dat-ban">Xem trước đặt bàn</a>
            <a className={`${s.btn} ${s.btnLine}`} href="#ghep-thuc-don">Ghép thực đơn cho nhóm bạn</a>
          </div>
          <dl className={s.heroMeta} data-bv="fade">
            <div><dt className={s.srOnly}>Số món</dt><dd><b>18</b>món trên thực đơn</dd></div>
            <div><dt className={s.srOnly}>Bếp</dt><dd><b>Than</b>nướng bằng bếp lửa</dd></div>
            <div><dt className={s.srOnly}>Chỗ ngồi</dt><dd><b>4</b>khu vực chỗ ngồi</dd></div>
          </dl>
        </div>
        <div className={s.plateStage} data-bv="stage">
          <svg className={s.plateRing} data-bv="ring" viewBox="0 0 400 400" aria-hidden="true">
            <defs><path id="bv-ring" d="M200 200 m-176 0 a176 176 0 1 1 352 0 a176 176 0 1 1 -352 0" /></defs>
            <text fill="currentColor" fontSize="15" letterSpacing="6.2" fontWeight="600">
              <textPath href="#bv-ring">TƯƠI TỪ BIỂN · NƯỚNG BẾP LỬA · CHIA CÙNG NHAU · MỘT BÀN NHÌN RA BIỂN · </textPath>
            </text>
          </svg>
          <div className={s.plate} data-bv="plate">
            <Photo file="cua-hoang-de" alt="Cua sốt cam bày trên đĩa sứ trắng, càng cua đỏ cam" sizes="(max-width: 960px) 86vw, 640px" priority pos="45% 40%" />
          </div>
          <span className={`${s.chip} ${s.chipA}`} data-bv="chip">Cua rang me · giá tham khảo</span>
        </div>
      </div>
    </section>
  );
}
