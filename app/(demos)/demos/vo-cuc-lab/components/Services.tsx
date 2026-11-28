"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { field } from "../field";

gsap.registerPlugin(ScrollTrigger);

const SV = [
  { t: "Thiết kế sản phẩm", shape: 1, d: "Thiết kế sản phẩm trọn vòng: từ nghiên cứu người dùng, luồng UX đến hệ thống giao diện hoàn chỉnh, sẵn sàng bàn giao cho lập trình viên.", s: ["Nghiên cứu người dùng và chiến lược", "Luồng UX và wireframe", "Hệ thống UI và nguyên mẫu", "Design Ops và bàn giao"], tools: ["Fg", "Sk", "Xd", "Bl", "Pr", "Fm"] },
  { t: "Phát triển phần mềm", shape: 2, d: "Xây dựng sản phẩm vững, dễ mở rộng trên web và di động: từ giao diện mượt đến API đáng tin cậy và DevOps tự động.", s: ["Nền tảng frontend (React / Next)", "API và microservice (Node)", "Ứng dụng di động (Flutter)", "CI/CD và vận hành đám mây"], tools: ["Re", "Fl", "Nx", "Nd", "Dk", "Ts"] },
  { t: "Chiến lược ra thị trường", shape: 3, d: "Chiến lược ra thị trường dựa trên dữ liệu cho SaaS và AI: định vị rõ, giá hợp lý và vòng tăng trưởng lặp lại từ chân dung khách hàng đến phân tích sau ra mắt.", s: ["Chân dung khách hàng và phân khúc", "Định vị, câu chuyện và thông điệp", "Định giá và đóng gói", "Thu hút khách và nội dung"], tools: ["Hs", "Sf", "Ga", "Ap", "Mk", "Lk"] },
  { t: "Ứng dụng y tế", shape: 4, d: "Phần mềm y tế an toàn, tuân thủ quy định: từ khám từ xa đến kết nối hồ sơ bệnh án, thiết kế để kiểm toán được.", s: ["Tuân thủ và bảo vệ dữ liệu sức khoẻ", "Khám từ xa và cổng bệnh nhân", "Kết nối hồ sơ (FHIR / HL7)", "Nhật ký kiểm toán và phân quyền"], tools: ["Aw", "Gc", "Az", "Tw", "Sp", "Ok"] },
  { t: "Phát triển AI", shape: 5, d: "Xây AI sẵn sàng chạy thật: từ mẫu thử nhanh đến mô hình triển khai, có đánh giá chất lượng, giám sát và an toàn.", s: ["Ứng dụng LLM và tác tử (RAG / công cụ)", "Tinh chỉnh và tối ưu prompt", "Đánh giá, rào chắn và giám sát", "Pipeline thị giác, ngôn ngữ, giọng nói"], tools: ["Tf", "Pt", "Hf", "Ks", "Ll", "Vd"] },
  { t: "Phát triển IoT", shape: 6, d: "Từ firmware thiết bị đến thu nhận dữ liệu trên đám mây: hệ thống IoT an toàn, ổn định, cập nhật từ xa và dữ liệu thời gian thực.", s: ["Firmware nhúng và driver", "Kết nối BLE / Zigbee / LoRa", "Thu nhận MQTT và xử lý sự kiện", "Edge AI và cập nhật OTA"], tools: ["Mq", "Es", "Lr", "Gr", "Ar", "Ro"] },
];

export function Services() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPinned(true);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const desktop = () => window.innerWidth >= 900;
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top top", end: () => "+=" + window.innerHeight * 0.62 * SV.length, pin: pin.current, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: (s) => {
        const i = Math.min(SV.length - 1, Math.floor(s.progress * SV.length));
        setActive(i);
        field.shape = SV[i].shape;
        if (!desktop()) { field.x = 0.5; field.y = 0.36; field.s = 0.5; }
        else { field.x = 0.23; field.y = 0.5; field.s = 0.8; }
        field.o = 1;
      },
      onEnter: () => { field.shape = SV[0].shape; },
      onLeaveBack: () => { field.shape = 0; if (!desktop()) { field.x = 0.5; field.y = 0.47; field.s = 0.62; } },
      onLeave: () => { field.o = 0; },
      onEnterBack: () => { field.o = 1; },
    });
    stRef.current = st;
    return () => { st.kill(); stRef.current = null; };
  }, [pinned]);

  const pick = (i: number) => {
    const st = stRef.current;
    if (st) window.scrollTo({ top: st.start + ((i + 0.5) / SV.length) * (st.end - st.start), behavior: "smooth" });
    else setActive(i);
  };

  return (
    <section ref={root} id="vc-services" className={`${styles.svc} ${pinned ? styles.svcPinned : ""}`} aria-labelledby="vc-h-svc">
      <div ref={pin} className={styles.svcPin}>
        <div className={styles.svcHead}>
          <h2 id="vc-h-svc">Dịch vụ của chúng tôi</h2>
          <p>Chúng tôi mang đến giải pháp số trọn gói, giúp doanh nghiệp của bạn chuyển đổi và đổi mới ở mọi điểm chạm với khách hàng.</p>
        </div>
        <div className={styles.cardsWrap}>
          <ul className={styles.cards} style={{ ["--i" as string]: active }}>
            {SV.map((s, i) => (
              <li key={s.t} className={`${styles.card} ${!pinned || i === active ? styles.cardOn : ""}`}>
                <button type="button" aria-expanded={!pinned || i === active} onClick={() => pinned && pick(i)}>
                  <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.cardArrow} aria-hidden="true">↗</span>
                  <b className={styles.cardT}>{s.t}</b>
                  <span className={styles.cardBody}>
                    <span className={styles.cardD}>{s.d}</span>
                    <span className={styles.cols2}>
                      <span><small>Dịch vụ</small>{s.s.map((x) => <i key={x}>{x}</i>)}</span>
                      <span><small>Công cụ</small><span className={styles.tools}>{s.tools.map((x) => <u key={x}>{x}</u>)}</span></span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
