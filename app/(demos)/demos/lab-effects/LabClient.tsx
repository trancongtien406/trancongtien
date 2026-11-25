"use client";

import { useState } from "react";
import {
  AudioWaveVisualizer, BlobMorph, CanvasParticles, ClipReveal, Counter, CurtainReveal, CursorSpotlight, CustomCursor, DraggableGallery,
  GrainOverlay, ImageHoverDistort, InfiniteHorizontalMarqueeImages, MagneticButton, NumberTicker, Odometer, ParallaxLayer,
  PinnedHorizontalScroll, ScrollProgress, ScrollScrubText, ShineSweep, SlotText, SplitLines, SplitWords, StackingCards, StickyChapters,
  SVGPathDraw, TextScramble, TiltCard, VelocityMarquee,
} from "@/features/showroom/effects";

/* Giao diện trung tính, chỉ để kiểm hành vi bằng mắt. */
const C = { bg: "#f4f4f2", ink: "#1b1b1b", line: "#c9c9c4", a: "#3b5bdb", b: "#e8590c", c: "#2f9e44" };
const sec: React.CSSProperties = { padding: "56px 16px", borderTop: `1px solid ${C.line}`, maxWidth: 960, margin: "0 auto", overflowX: "clip" };
const h2: React.CSSProperties = { font: "600 13px/1.2 ui-monospace, Menlo, monospace", letterSpacing: ".04em", textTransform: "uppercase", margin: "0 0 20px", color: "#555" };
const box = (bg: string, h = 160): React.CSSProperties => ({ background: bg, height: h, borderRadius: 8, display: "grid", placeItems: "center", color: "#fff", font: "600 18px system-ui" });
const btn: React.CSSProperties = { font: "500 15px system-ui", padding: "12px 22px", minHeight: 44, border: `1px solid ${C.ink}`, borderRadius: 999, background: "transparent", color: C.ink, cursor: "pointer" };

const stripes = (a: string, b: string) =>
  "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='600' height='400' fill='${a}'/><g stroke='${b}' stroke-width='14'>${Array.from({ length: 16 }, (_, i) => `<path d='M${i * 40 - 100} 400L${i * 40 + 200} 0'/>`).join("")}</g><circle cx='300' cy='200' r='90' fill='${b}'/></svg>`);
const IMG = [stripes("#3b5bdb", "#dbe4ff"), stripes("#e8590c", "#ffe8cc"), stripes("#2f9e44", "#d3f9d8"), stripes("#862e9c", "#f3d9fa")];

export function LabClient() {
  const [curtain, setCurtain] = useState(0);
  const [leak, setLeak] = useState(true);
  const [ticker, setTicker] = useState(1280);
  const [slot, setSlot] = useState(0);
  const [wave, setWave] = useState(true);

  return (
    <div style={{ background: C.bg, color: C.ink, font: "17px/1.6 system-ui, sans-serif", minHeight: "100svh" }}>
      <ScrollProgress variant="bar" style={{ color: C.a }} />
      <ScrollProgress variant="ring" style={{ color: C.b }} />
      {curtain > 0 && <CurtainReveal key={curtain} color="#222"><span style={{ color: "#fff", font: "600 28px system-ui" }}>Đang vào trang</span></CurtainReveal>}
      {leak && <CustomCursor hideNative selector="[data-cursor]" style={{ color: C.b }} />}

      <header style={{ ...sec, borderTop: 0, paddingTop: 72 }}>
        <p style={h2}>lab-effects · nội bộ · noindex</p>
        <SplitWords as="h1" style={{ font: "700 clamp(34px,7vw,64px)/1.15 system-ui", margin: 0 }}>Thư viện hiệu ứng hành vi cho các landing</SplitWords>
        <p style={{ marginTop: 16 }}>Tiếng Việt thử dấu: Ắ Ằ Ẳ Ẵ Ặ Ế Ể Ễ Ệ Ố Ồ Ổ Ộ Ớ Ợ Ử Ữ Ự Đ — không được bị cắt.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button style={btn} data-testid="curtain-play" onClick={() => setCurtain((n) => n + 1)}>Phát lại Curtain</button>
          <button style={btn} data-testid="leak-toggle" onClick={() => setLeak((v) => !v)}>{leak ? "Gỡ nhóm kiểm rò rỉ" : "Gắn nhóm kiểm rò rỉ"}</button>
        </div>
      </header>

      <section style={sec} id="split" data-lab="SplitReveal">
        <h2 style={h2}>1 · SplitWords / SplitLines</h2>
        <SplitLines as="p" style={{ font: "500 28px/1.35 system-ui", margin: 0 }}>
          Chúng tôi dựng những trang web chậm rãi và chắc chắn, từng dòng chữ hiện lên đúng nhịp, giữ nguyên dấu tiếng Việt kể cả những chữ khó như nghiệm thu, ngược đường, Ếch ương ngồi dưới đáy giếng.
        </SplitLines>
      </section>

      <section style={sec} id="scramble" data-lab="TextScramble">
        <h2 style={h2}>2 · TextScramble</h2>
        <TextScramble as="p" style={{ font: "600 30px/1.3 ui-monospace, Menlo, monospace", margin: 0 }}>Giải mã từng từ một cách gọn gàng</TextScramble>
        <TextScramble as="p" trigger="hover" style={{ marginTop: 12 }}>Rê chuột vào dòng này để giải mã lại (hover)</TextScramble>
      </section>

      <section style={sec} id="clip" data-lab="ClipReveal">
        <h2 style={h2}>3 · ClipReveal (inset / circle / polygon)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <ClipReveal variant="inset" from="bottom" style={{ borderRadius: 8, overflow: "hidden" }}><img src={IMG[0]} alt="Mẫu sọc xanh" width={600} height={400} style={{ display: "block", width: "100%", height: "auto" }} /></ClipReveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <ClipReveal variant="circle" style={{ borderRadius: 8, overflow: "hidden" }}><img src={IMG[1]} alt="Mẫu sọc cam" width={600} height={400} style={{ display: "block", width: "100%", height: "auto" }} /></ClipReveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <ClipReveal variant="polygon" from="left" style={{ borderRadius: 8, overflow: "hidden" }}><img src={IMG[2]} alt="Mẫu sọc lục" width={600} height={400} style={{ display: "block", width: "100%", height: "auto" }} /></ClipReveal>
        </div>
      </section>

      <section style={sec} id="parallax" data-lab="ParallaxLayer">
        <h2 style={h2}>4 · ParallaxLayer (tắt dưới 768px / reduced)</h2>
        <div style={{ height: 320, overflow: "hidden", borderRadius: 8, position: "relative", background: "#222" }}>
          <ParallaxLayer distance={50} style={{ position: "absolute", inset: "-60px 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG[3]} alt="Mẫu sọc tím" width={600} height={400} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </ParallaxLayer>
        </div>
      </section>

      <section id="pinned" data-lab="PinnedHorizontalScroll" style={{ borderTop: `1px solid ${C.line}` }}>
        <PinnedHorizontalScroll minWidth={900} mobile="scroll" label="Ba panel cuộn ngang">
          {[C.a, C.b, C.c, "#862e9c"].map((c, i) => (
            <div key={i} style={{ ...box(c, 320), width: "min(80vw,520px)", margin: "0 12px", flex: "none" }}><a href="#pinned" style={{ color: "#fff" }}>Panel {i + 1}</a></div>
          ))}
        </PinnedHorizontalScroll>
      </section>

      <section style={{ ...sec, maxWidth: "none", padding: "0 16px" }} id="chapters" data-lab="StickyChapters">
        <h2 style={{ ...h2, padding: "40px 0 0", maxWidth: 960, margin: "0 auto 20px" }}>6 · StickyChapters</h2>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <StickyChapters
            stickyTop="0px"
            chapters={[0, 1, 2].map((i) => ({
              content: <div style={{ padding: "0 16px" }}><h3 style={{ margin: 0 }}>Chương {i + 1}</h3><p>Nội dung chương {i + 1}: cột hình bên cạnh đổi theo tiến độ cuộn.</p></div>,
              visual: <div style={{ ...box([C.a, C.b, C.c][i], 9999), height: "100%", borderRadius: 0 }}>Hình {i + 1}</div>,
            }))}
          />
        </div>
      </section>

      <section style={sec} id="scrub" data-lab="ScrollScrubText">
        <h2 style={h2}>7 · ScrollScrubText</h2>
        <ScrollScrubText style={{ font: "600 34px/1.3 system-ui", margin: 0 }}>Từng từ sáng dần theo nhịp cuộn của người đọc, không cần bấm gì cả, mọi thứ chỉ dựa vào vị trí cuộn trang.</ScrollScrubText>
      </section>

      <section style={{ ...sec, maxWidth: "none", padding: "40px 0" }} id="marquee" data-lab="VelocityMarquee">
        <h2 style={{ ...h2, paddingInline: 16 }}>8 · VelocityMarquee (cuộn nhanh để tăng tốc) + 25 · ảnh</h2>
        {leak && (
          <VelocityMarquee controls buttonClassName="fx-btn" label="Dải chữ" style={{ fontSize: 44, fontWeight: 700 }} gap="3rem">
            <span>Chạy chữ</span><span>•</span><span>Theo vận tốc cuộn</span><span>•</span><span>Dừng được</span><span>•</span>
          </VelocityMarquee>
        )}
        <div style={{ height: 24 }} />
        <InfiniteHorizontalMarqueeImages
          images={IMG.map((src, i) => ({ src, alt: `Ảnh mẫu ${i + 1}`, width: 600, height: 400 }))}
          imageHeight={120} gap="12px" duration={24}
        />
      </section>

      <section style={sec} id="counter" data-lab="Counter">
        <h2 style={h2}>9 · Counter / Odometer · 26 · NumberTicker / SlotText</h2>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", font: "700 48px/1.1 system-ui" }}>
          <Counter value={12840} suffix=" ca" />
          <Odometer value={2026} />
          <Odometer value={1234567} />
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", marginTop: 24, font: "700 40px/1.1 system-ui" }}>
          <NumberTicker value={ticker} suffix=" ₫" />
          <button style={btn} data-testid="ticker-btn" onClick={() => setTicker((v) => v + 1250)}>+1.250</button>
          <span style={{ font: "600 32px/1.1 system-ui" }}>Spa <SlotText words={["thư giãn", "phục hồi", "tận tâm"]} index={slot} interval={0} /></span>
          <button style={btn} data-testid="slot-btn" onClick={() => setSlot((v) => v + 1)}>Đổi chữ</button>
          <span style={{ font: "600 24px/1.1 system-ui" }}>Tự đổi: <SlotText words={["nhanh", "đẹp", "chắc"]} interval={1800} /></span>
        </div>
      </section>

      <section style={sec} id="pointer" data-lab="MagneticButton">
        <h2 style={h2}>10 · Magnetic · 13 · Tilt · 14 · Spotlight · 15 · Shine · 11 · [data-cursor]</h2>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <MagneticButton><a href="#pointer" style={{ ...btn, display: "inline-block", textDecoration: "none", lineHeight: "20px" }} data-cursor="Xem">Nút từ tính</a></MagneticButton>
          <TiltCard style={{ ...box(C.a, 180), width: 260, borderRadius: 14 }}><span data-cursor="Kéo">Thẻ nghiêng</span></TiltCard>
          <CursorSpotlight style={{ ...box("#222", 180), width: 260, borderRadius: 14 }}>Đèn rọi theo chuột</CursorSpotlight>
          <ShineSweep style={{ ...box(C.c, 120), width: 220, borderRadius: 14 }}>Vệt sáng (hover)</ShineSweep>
          <ShineSweep trigger="loop" every={2} style={{ ...box(C.b, 120), width: 220, borderRadius: 14 }}>Vệt sáng (loop)</ShineSweep>
        </div>
        <p><label>Ô nhập (con trỏ hệ thống phải hiện): <input aria-label="Thử nhập" defaultValue="Nhập thử" style={{ font: "16px system-ui", padding: 8 }} /></label></p>
      </section>

      <section style={sec} id="distort" data-lab="ImageHoverDistort">
        <h2 style={h2}>12 · ImageHoverDistort (SVG feDisplacementMap)</h2>
        <ImageHoverDistort style={{ maxWidth: 480, borderRadius: 8, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG[0]} alt="Mẫu sọc xanh để thử méo ảnh" width={600} height={400} style={{ display: "block", width: "100%", height: "auto" }} />
        </ImageHoverDistort>
      </section>

      <section style={sec} id="stack" data-lab="StackingCards">
        <h2 style={h2}>17 · StackingCards</h2>
        <StackingCards top="5rem" offset={16}>
          {[C.a, C.b, C.c, "#862e9c"].map((c, i) => <div key={i} style={{ ...box(c, 260), marginBottom: 24, borderRadius: 16 }}>Thẻ {i + 1}</div>)}
        </StackingCards>
      </section>

      <section style={sec} id="gallery" data-lab="DraggableGallery">
        <h2 style={h2}>18 · DraggableGallery (kéo, phím ←/→, nút)</h2>
        <DraggableGallery gap="12px" buttonClassName="fx-btn">
          {Array.from({ length: 8 }, (_, i) => <div key={i} style={{ ...box([C.a, C.b, C.c, "#862e9c"][i % 4], 200), width: 260 }}><a href="#gallery" style={{ color: "#fff" }}>Ảnh {i + 1}</a></div>)}
        </DraggableGallery>
      </section>

      <section style={sec} id="canvas" data-lab="CanvasParticles">
        <h2 style={h2}>19 · Canvas particles / bubbles / sparks · 20 · AudioWave</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
          {leak && (["particles", "bubbles", "sparks"] as const).map((m, i) => (
            <div key={m} style={{ position: "relative", height: 180, background: "#15171c", borderRadius: 8, color: [C.a, "#74c0fc", "#ffa94d"][i] }}>
              <CanvasParticles mode={m} count={m === "sparks" ? 50 : 40} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
          {leak && <div style={{ flex: 1, color: C.a }}><AudioWaveVisualizer playing={wave} /></div>}
          <button style={btn} data-testid="wave-btn" onClick={() => setWave((v) => !v)} aria-pressed={wave}>{wave ? "Dừng sóng" : "Phát sóng"}</button>
        </div>
      </section>

      <section style={sec} id="svg" data-lab="SVGPathDraw">
        <h2 style={h2}>21 · SVGPathDraw · 22 · BlobMorph · 23 · Grain</h2>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <SVGPathDraw viewBox="0 0 300 120" width={300} height={120} strokeWidth={4} style={{ color: C.a, maxWidth: "100%" }} mode="view">
            <path d="M10 100 C 60 10, 110 10, 150 60 S 240 110, 290 20" />
            <circle cx="150" cy="60" r="28" />
          </SVGPathDraw>
          <SVGPathDraw viewBox="0 0 300 60" width={300} height={60} strokeWidth={3} style={{ color: C.b, maxWidth: "100%" }} mode="scroll">
            <path d="M5 30 H295" />
          </SVGPathDraw>
          <BlobMorph width={200} height={200} style={{ color: C.c, maxWidth: "100%" }} />
          <div style={{ position: "relative", width: 200, height: 200, background: "#e9e5db", borderRadius: 8, overflow: "hidden" }}>
            <GrainOverlay opacity={0.35} animated /><span style={{ position: "relative", padding: 12, display: "block" }}>Hạt nhiễu</span>
          </div>
        </div>
      </section>

      <section style={{ ...sec, paddingBottom: 160 }} id="end">
        <h2 style={h2}>Hết</h2>
        <p>Cuối trang: thanh tiến độ phải đầy, vòng tiến độ ở góc phải dưới phải đầy.</p>
      </section>
    </div>
  );
}
