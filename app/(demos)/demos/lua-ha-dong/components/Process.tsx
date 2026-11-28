"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "../brand.module.css";
import { prefersReduced, setupGsap } from "./lib";

const CARDS = [
  ["BẮT ĐẦU TỪ MỰC", "Mực thăng hoa và mực phản ứng được pha ngay tại xưởng, độ phủ sâu, giữ sắc qua nhiều lần giặt."],
  ["RỒI ĐẾN BẢN IN", "Hạt mực li ti phun lên vải qua đầu in số: nét sắc, chuyển sắc mượt, hoa văn khớp từng mét."],
  ["VÀ CUỐI CÙNG LÀ TẤM LỤA", "Lụa tơ tằm pha cotton mềm và thoáng, được định hình, cắt may trong xưởng, từ giọt đầu tiên tới mét cuối."],
] as const;

function Chars({ text, cls }: { text: string; cls: string }) {
  return (
    <>
      {text.split(" ").map((w, wi) => (
        <span key={wi} className={styles.cw} aria-hidden="true">
          {[...w.normalize("NFC")].map((c, i) => <span key={i} className={cls}>{c}</span>)}
          {" "}
        </span>
      ))}
    </>
  );
}

export function Process() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const drop = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const s = sec.current;
    const st = stage.current;
    if (!s || !st) return;
    if (prefersReduced()) {
      s.dataset.rm = "1";
      return;
    }
    setupGsap();
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(`.${styles.ch}`, s);
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.pcard}`, s);
      const tl = gsap.timeline({ scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      tl.fromTo(drop.current, { scale: 0.12, yPercent: 40 }, { scale: 16, yPercent: -10, ease: "power2.in", duration: 1.1, transformOrigin: "50% 100%" }, 0);
      tl.to(st, { "--bg": "#3d5233", duration: 0.01 }, 0.95);
      tl.set(drop.current, { opacity: 0 }, 1.1);
      tl.fromTo(chars, { yPercent: 110, rotate: 6 }, { yPercent: 0, rotate: 0, stagger: 0.02, duration: 0.5, ease: "power3.out" }, 1.1);
      tl.fromTo(`.${styles.pBody}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 1.5);
      cards.forEach((c, i) => {
        tl.fromTo(c, { xPercent: 70, yPercent: 30, rotate: 14, opacity: 0 }, { xPercent: i * 6, yPercent: i * -12, rotate: [-4, 3, -6][i], opacity: 1, duration: 0.7, ease: "power3.out" }, 1.5 + i * 0.7);
        if (i > 0) tl.to(cards[i - 1], { scale: 0.94, opacity: 0.7, duration: 0.5 }, 1.5 + i * 0.7);
      });
      tl.to({}, { duration: 0.7 }, 3.9);
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="quy-trinh" className={styles.procSec} aria-labelledby="proc-h">
      <div ref={stage} className={styles.procStage}>
        <svg ref={drop} className={styles.bigDrop} viewBox="0 0 200 260" aria-hidden="true">
          <path d="M100 0C100 0 24 110 24 178a76 76 0 0 0 152 0C176 110 100 0 100 0Z" fill="#3d5233" />
        </svg>
        <div className={styles.pText}>
          <h2 id="proc-h" className={styles.pH}>
            <span className={styles.srOnly}>Từ giọt mực tới mỗi tấm lụa</span>
            <span className={styles.pLine}><Chars text="TỪ GIỌT MỰC" cls={styles.ch} /></span>
            <span className={styles.pLine}><Chars text="TỚI MỖI TẤM LỤA" cls={styles.ch} /></span>
          </h2>
          <div className={styles.pBody}>
            <p>Mỗi tấm lụa của Lụa Hà Đông bắt đầu từ sắc tố. Từ hoá học của mực tới bản in kỹ thuật số chính xác, rồi mét vải cuối cùng, mọi công đoạn đều làm tại xưởng, để màu, độ rõ nét và nghề thủ công giữ đúng từ giọt đầu tiên.</p>
            <a className={styles.whiteBtn} href="#dac-trung">Tìm hiểu thêm</a>
          </div>
        </div>
        <ol className={styles.pCards}>
          {CARDS.map(([t, d]) => (
            <li key={t} className={styles.pcard}>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
