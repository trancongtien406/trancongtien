"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const root = document.querySelector<HTMLElement>("[data-th-root]");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();
    const splits: SplitText[] = [];

    // cuộn mượt tới từng section
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id === "top" ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - (id === "th-form" ? 90 : 0);
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
    };
    root.addEventListener("click", onClick);

    const ctx = gsap.context(() => {
      mm.add("(pointer: fine)", () => {
        const ring = root.querySelector<HTMLElement>("[data-ring]");
        if (!ring) return;
        ring.dataset.on = "1";
        gsap.set(ring, { x: window.innerWidth * 0.6, y: window.innerHeight * 0.85 });
        const x = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
        const y = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });
        const mv = (e: PointerEvent) => { x(e.clientX - 12); y(e.clientY - 12); };
        window.addEventListener("pointermove", mv);
        return () => { window.removeEventListener("pointermove", mv); delete ring.dataset.on; };
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Đêm
        gsap.from("[data-eve]", { scale: 0.3, autoAlpha: 0, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: "#dem", start: "top 55%", once: true } });
        gsap.from("[data-night] > *", { y: 26, autoAlpha: 0, duration: 1.1, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: "#dem", start: "top 50%", once: true } });

        // Nghiên cứu điển hình: tiêu đề bóng đôi -> thẻ ảnh bay tới camera -> thẻ xem trước
        const cs = root.querySelector<HTMLElement>("#cong-trinh-chon");
        if (cs) {
          cs.dataset.anim = "1";
          const cards = gsap.utils.toArray<HTMLElement>("[data-card]", cs);
          const fig = cs.querySelector<HTMLElement>("[data-fig]");
          const bar = cs.querySelector<HTMLElement>("[data-figbar]");
          const mob = window.innerWidth < 760;
          gsap.set(cards, { xPercent: -50, yPercent: -50, z: -3200, autoAlpha: 0 });
          gsap.set("[data-preview]", { autoAlpha: 0, scale: 0.92, xPercent: -50, yPercent: -50 });
          gsap.from("[data-ghost] span, [data-ghost] em", { yPercent: 40, autoAlpha: 0, duration: 1.1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: cs, start: "top 60%", once: true } });
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: cs, start: "top top", end: "+=360%", pin: true, scrub: 0.8, anticipatePin: 1,
              onUpdate: (st) => {
                if (fig) fig.textContent = `FIG. 0${Math.min(6, 2 + Math.floor(st.progress * 5))} / 06`;
                if (bar) bar.style.transform = `scaleX(${st.progress})`;
              },
            },
          });
          tl.to("[data-casetitle]", { autoAlpha: 0, yPercent: -20, scale: 1.08, duration: 1.2 }, 0.9);
          cards.forEach((c, i) => {
            const t0 = 1.4 + i * 0.95;
            tl.to(c, { z: mob ? 700 : 1100, duration: 2.8 }, t0);
            tl.to(c, { autoAlpha: 1, duration: 0.5 }, t0 + 0.3);
            tl.to(c, { autoAlpha: 0, duration: 0.5 }, t0 + 2.3);
          });
          tl.to("[data-preview]", { autoAlpha: 1, scale: 1, duration: 0.9 }, 8.2);
          tl.to({}, { duration: 1 }, 9.1);
        }

        // Xưởng: chữ sáng dần theo từ; số đếm
        const wp = root.querySelector<HTMLElement>("[data-words]");
        if (wp) {
          const sp = new SplitText(wp, { type: "words" }); splits.push(sp);
          gsap.fromTo(sp.words, { opacity: 0.2 }, { opacity: 1, ease: "none", stagger: 0.08, scrollTrigger: { trigger: wp, start: "top 80%", end: "bottom 48%", scrub: true } });
        }
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((n) => {
          const v = Number(n.dataset.count); const o = { v: 0 };
          n.textContent = "0";
          gsap.to(o, { v, duration: 2, ease: "power3.out", onUpdate: () => { n.textContent = String(Math.round(o.v)); }, scrollTrigger: { trigger: "[data-stats]", start: "top 88%", once: true } });
        });

        // Bộ môn: dải thẻ kính 3D chạy theo cuộn
        const sec = root.querySelector<HTMLElement>("#nang-luc");
        const cardsD = gsap.utils.toArray<HTMLElement>("[data-dcard]", sec ?? undefined);
        if (sec && cardsD.length) {
          sec.dataset.anim = "1";
          const no = sec.querySelector<HTMLElement>("[data-deckno]");
          const N = cardsD.length;
          const place = (p: number) => {
            const cw = Math.min(window.innerWidth * 0.74, 340);
            cardsD.forEach((c, i) => {
              const d = i - p; const a = Math.abs(d);
              gsap.set(c, { x: d * cw * 1.02, z: -a * 140, rotationY: Math.max(-48, Math.min(48, -d * 30)), scale: 1 - Math.min(a, 2) * 0.05, autoAlpha: Math.max(0.18, 1 - Math.min(a, 2.2) * 0.3), zIndex: 10 - Math.round(a * 2) });
              c.classList.toggle("is-active", a < 0.5);
            });
            if (no) no.textContent = `0${Math.min(N, Math.round(p) + 1)}`;
          };
          place(0);
          ScrollTrigger.create({ trigger: sec, start: "top top", end: `+=${(N - 1) * 70 + 40}%`, pin: true, scrub: 0.6, anticipatePin: 1, onUpdate: (st) => place(Math.min(N - 1, st.progress * (N - 1) * 1.04)) });
          window.addEventListener("resize", () => place(0), { once: true });
        }

        // Trích dẫn, bước, thẻ: hiện lần lượt
        gsap.from("[data-quote] > *", { y: 30, autoAlpha: 0, stagger: 0.2, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: "[data-quote]", start: "top 75%", once: true } });
        ScrollTrigger.batch("[data-reveal]", { start: "top 90%", once: true, onEnter: (els) => gsap.from(els, { y: 34, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true }) });

        // Sao tám cánh
        gsap.fromTo("[data-bigstar]", { scale: 0.6, rotate: -30, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: "#lien-he", start: "top 70%", once: true } });
        gsap.to("[data-ringspin]", { rotation: 360, transformOrigin: "50% 50%", duration: 40, repeat: -1, ease: "none" });
      });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => { window.clearTimeout(t); root.removeEventListener("click", onClick); mm.revert(); ctx.revert(); splits.forEach((sp) => sp.revert()); delete root.querySelector<HTMLElement>("#cong-trinh-chon")?.dataset.anim; delete root.querySelector<HTMLElement>("#nang-luc")?.dataset.anim; };
  }, []);
  return null;
}
