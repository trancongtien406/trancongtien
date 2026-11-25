# Thư viện hiệu ứng hành vi (`@/features/showroom/effects`)

Chỉ làm HÀNH VI, không ép thẩm mỹ: mọi thành phần nhận `className`/`style`/CSS variables. Import: `import { SplitWords, ClipReveal } from "@/features/showroom/effects"`.
Quy ước chung: `"use client"`, `gsap.context` + cleanup, nội dung hiện đủ khi SSR/no-JS (trạng thái ẩn ban đầu chỉ đặt trong layout effect), `prefers-reduced-motion` = trạng thái cuối không chuyển động, chỉ animate transform/opacity/clip-path/filter. Mỗi gốc có `data-fx="Tên"` và `data-fx-ready` ("1" | "static" | "css"). Trang thử: `/demos/lab-effects` (noindex, không trong registry). Tiện ích lõi (`core.ts`): `prefersReducedMotion`, `hasFinePointer`, `useFx`, `useFxLayout`, `observeInView`, `whenFontsReady`, `srOnly`.
Giá: nhẹ = chỉ listener/IO; vừa = gsap tween/ScrollTrigger; nặng hơn = vòng rAF (luôn tự dừng khi ẩn).

## 1. SplitWords / SplitLines (`SplitReveal`)
`<SplitWords as="h1" className=…>Chuỗi</SplitWords>`; props `mode`, `trigger="view|load"`, `duration`, `stagger`, `delay`, `from`, `padY`, `wordClassName`. Tách theo TỪ (không tách ký tự, NBSP giữ nguyên, NFC), mặt nạ có đệm dọc để dấu Ệ/Ử không bị cắt. Lines: đo dòng sau `document.fonts.ready`, tính lại lúc phát nên an toàn khi resize. Chi phí: vừa. Reduced: hiện chữ ngay. Ngành: mọi hero/tiêu đề (editorial, studio, tour).

## 2. TextScramble
`<TextScramble trigger="view|load|hover" wordStagger duration charset>chữ</TextScramble>`. Giải mã từng từ, ký tự dấu giữ theo grapheme, chữ cuối đúng NFC; bản đọc cho trình đọc màn hình tách riêng (`srOnly`). Chi phí: nhẹ (cập nhật ~30fps). Reduced: chữ cuối. Gợi ý: công nghệ, game, an ninh, phòng thí nghiệm. Dùng font mono để không giật bề ngang.

## 3. ClipReveal
`<ClipReveal variant="inset|circle|polygon" from="bottom|top|left|right|center" origin duration innerScale>…<img/></ClipReveal>`. Một lần khi vào khung, ảnh con phóng từ `innerScale` về 1; dùng phần tử ngoài không clip để IntersectionObserver hoạt động. Chi phí: nhẹ. Reduced: hiện đủ. Gợi ý: ảnh sản phẩm, kiến trúc, thời trang, ẩm thực.

## 4. ParallaxLayer
`<ParallaxLayer distance={60} minWidth={768}>` đặt trong khối `overflow:hidden`, cao hơn khối vài chục px. translateY theo cuộn (scrub), trigger là phần tử cha. Tắt dưới `minWidth` và khi reduced. Chi phí: vừa. Không dùng cho chữ. Gợi ý: ảnh nền hero, du lịch, nội thất.

## 5. PinnedHorizontalScroll
`<PinnedHorizontalScroll minWidth={900} mobile="scroll|stack" scrollFactor label>{panels}</PinnedHorizontalScroll>` (mỗi con trực tiếp = một panel). Desktop: ghim + cuộn dọc → ngang; Tab vào panel ngoài khung sẽ cuộn trang tới đúng tiến độ. Dưới ngưỡng hoặc reduced: viewport cuộn ngang tự nhiên (focus được, có `role=region`) hoặc xếp dọc (`mobile="stack"`). Chi phí: vừa. `data-fx-mode="pinned|native"`. Gợi ý: dự án, quy trình, lịch trình.

## 6. StickyChapters
`<StickyChapters chapters={[{content, visual}]} breakpoint columns stickyTop visualRight onChange>`. Cột hình dính, đổi hình theo chương đang ở giữa khung (IO, không scroll listener). Mobile: một cột, hình dính phía trên (42svh). Layout là CSS scoped tối thiểu, ghi đè bằng className. `data-active` trên gốc. Chi phí: nhẹ. Reduced: đổi tức thì. Gợi ý: kể chuyện sản phẩm, quy trình, dịch vụ nhiều bước.

## 7. ScrollScrubText
`<ScrollScrubText dim={0.2} start end>đoạn văn</ScrollScrubText>`: từng từ sáng dần theo cuộn (scrub). Chi phí: vừa. Reduced: sáng đủ. Gợi ý: tuyên ngôn thương hiệu, giáo dục, NGO.

## 8. VelocityMarquee
`<VelocityMarquee mode="velocity|css" speed duration direction boost reverseOnScrollUp paused pauseOnHover controls gap>`. velocity: ticker gsap, tăng tốc theo vận tốc cuộn, chỉ chạy khi trong khung + tab hiện; css: keyframes thuần. Dừng khi hover/focus; `controls` thêm nút Dừng/Chạy (`aria-pressed`). Reduced: CSS thuần, dải thành nhiều dòng tĩnh, ẩn bản sao. Chi phí: nhẹ-vừa. Gợi ý: logo đối tác, khẩu hiệu, thực đơn.

## 9. Counter / Odometer
`<Counter value from duration decimals locale prefix suffix trigger/>` đếm số `vi-VN`; `<Odometer value duration/>` cột chữ số lăn, đổi `value` thì lăn lại. Bản đọc cho AT là số cuối. Chi phí: nhẹ. Reduced: số cuối. Gợi ý: thống kê, giá, đồng hồ (chỉ số có thật, xem quy tắc nhãn).

## 10. MagneticButton
`<MagneticButton strength max><a …/></MagneticButton>`: lớp ngoài giữ vùng bấm, chỉ lớp trong dịch (≤14px). Chỉ `(hover:hover) and (pointer:fine)`, tắt khi reduced. Chi phí: nhẹ. Lưu ý AGENT-RULES cấm magnetic ở demo cũ; dùng có chủ đích cho CTA chính, tối đa 1–2 nút.

## 11. CustomCursor
`<CustomCursor size hoverScale selector="[data-cursor]" hideNative zIndex/>` đặt một lần ở gốc trang. Phần tử `data-cursor="Xem"` làm chấm phóng to + nhãn. Chỉ pointer fine + không reduced; tự ẩn trong input/textarea/select/contenteditable (con trỏ hệ thống giữ nguyên); `hideNative` thêm `cursor:none` có loại trừ ô nhập. Màu: `--fx-cursor-color`. Chi phí: nhẹ (quickTo). Gợi ý: portfolio, studio, thời trang.

## 12. ImageHoverDistort
`<ImageHoverDistort strength frequency><img/></ImageHoverDistort>` SVG `feDisplacementMap` + `feTurbulence`, méo theo vận tốc con trỏ; `filter` chỉ gắn khi hover và gỡ khi nghỉ. Không WebGL. Chi phí: vừa khi hover (filter trên ảnh lớn đắt hơn: dùng ảnh ≤ 800px). Touch/reduced: tắt. Gợi ý: gallery, nhiếp ảnh, thời trang.

## 13. TiltCard
`<TiltCard max glare glareColor scale perspective>` nghiêng 3D theo con trỏ + vệt sáng. Pointer fine + không reduced. Chi phí: nhẹ. Gợi ý: thẻ gói dịch vụ, sản phẩm, thành viên.

## 14. CursorSpotlight
`<CursorSpotlight radius color>`: radial-gradient theo con trỏ (CSS var qua rAF), overlay `pointer-events:none`. Pointer fine. Chi phí: nhẹ. Gợi ý: thẻ tính năng tối, SaaS, game.

## 15. ShineSweep
`<ShineSweep trigger="hover|view|loop" color duration every>` vệt sáng chéo quét qua khối (`overflow:hidden`). Loop chỉ chạy trong khung. Reduced: không quét. Chi phí: nhẹ. Gợi ý: nút CTA, thẻ cao cấp, trang sức.

## 16. CurtainReveal
`{show && <CurtainReveal panels hold total oncePerSession color>logo</CurtainReveal>}`: rèm N cột kéo lên, tổng ≤1.2s (mặc định 1.1s, trần cứng), bỏ qua bằng click/phím bất kỳ, `oncePerSession` ghi sessionStorage (try/catch). Overlay chỉ mount bằng JS nên no-JS không bị chặn; reduced: không hiện; có bộ hẹn an toàn. `onDone`. Chi phí: nhẹ.

## 17. StackingCards
`<StackingCards top offset scaleStep>{cards}</StackingCards>`: thẻ `position:sticky` chồng dần, thẻ dưới thu nhỏ. Cha không được `overflow:hidden`. Reduced: sticky giữ, không scale. Chi phí: vừa. Gợi ý: bảng giá, quy trình, tính năng.

## 18. DraggableGallery
`<DraggableGallery gap step friction showButtons prevLabel nextLabel label hideScrollbar>`: cuộn ngang native + kéo chuột có quán tính (chuột/bút; cảm ứng dùng cuộn native) + nút Trước/Sau (tự disabled ở hai đầu) + phím ←/→/Home/End khi viewport focus; chặn click sau khi kéo. Nút không có style: tự định dạng qua `buttonClassName` (đảm bảo ≥44px). Chi phí: nhẹ. Gợi ý: portfolio, sản phẩm, đánh giá có thật.

## 19. CanvasParticles
`<CanvasParticles mode="particles|bubbles|sparks" count≤60 color speed maxDpr/>` đặt trong khối `position:relative`; màu mặc định = `color` CSS của canvas. DPR ≤2, dừng khi tab ẩn/ngoài khung, reduced = một khung tĩnh. Chi phí: vừa. Gợi ý: spa/nước (bubbles), lò nướng/quán (sparks), công nghệ (particles).

## 20. AudioWaveVisualizer
`<AudioWaveVisualizer bars playing color mode="bars|line" height/>` sóng âm giả lập (tổng sin), không dùng micro/Web Audio, `playing=false` thì lặng dần. Cùng bộ chạy canvas như trên. Gợi ý: podcast, nhạc, phòng thu, ứng dụng nghe.

## 21. SVGPathDraw
`<SVGPathDraw mode="view|scroll" duration stagger viewBox …svgProps>paths…</SVGPathDraw>` vẽ nét bằng `pathLength=1` + dashoffset (không đo độ dài). Mặc định `fill=none stroke=currentColor`. Reduced: nét đầy đủ. Chi phí: nhẹ. Gợi ý: bản đồ lịch trình, chữ ký, sơ đồ quy trình.

## 22. BlobMorph
`<BlobMorph paths? count nodes seed duration …svgProps/>` biến hình giữa các path cùng cấu trúc (tự nội suy, không plugin); mặc định tự sinh blob xác định theo `seed` (`blobPath` xuất ra để dùng riêng). Tạm dừng ngoài khung. Màu `currentColor`. Reduced: path đầu. Chi phí: nhẹ-vừa. Gợi ý: nền hữu cơ cho spa, sức khoẻ, nghệ thuật.

## 23. GrainOverlay
`<GrainOverlay opacity size baseFrequency blendMode animated fixed/>` nhiễu SVG feTurbulence làm ảnh nền ô lặp (data URI, CSP `img-src data:` cho phép), `pointer-events:none`; `animated` nhấp nháy bằng CSS steps (transform), tắt khi reduced. Cha cần `position:relative`. Chi phí: nhẹ. Gợi ý: phim, thủ công, in ấn.

## 24. ScrollProgress
`<ScrollProgress variant="bar|ring" target? size fixed/>` thanh hoặc vòng tiến độ cuộn (cả trang hoặc một khối qua `target` selector); scroll listener passive + rAF; `role=progressbar` + `aria-valuenow`. Màu = `currentColor`. Reduced: vẫn cập nhật (thông tin, không chuyển động). Chi phí: nhẹ. Gợi ý: bài dài, blog, trang case study.

## 25. InfiniteHorizontalMarqueeImages
`<InfiniteHorizontalMarqueeImages images={[{src,alt,width,height}] imageHeight mode="css|velocity" …marquee props/>`: dải ảnh vô hạn dựa trên VelocityMarquee (mặc định CSS thuần, ảnh lazy). Hover/focus dừng; reduced: lưới xuống dòng tĩnh. Chi phí: nhẹ. Ảnh dùng `<img>` thường (đổi sang next/image bằng cách tự dựng children trong VelocityMarquee).

## 26. NumberTicker + SlotText
`<NumberTicker value suffix/>` tween số khi `value` đổi (đặt `data-dir="up|down"` để tô màu). `<SlotText words index? interval duration/>` đổi từ kiểu slot (cuộn dọc, ô rộng bằng từ dài nhất nhờ CSS grid); điều khiển ngoài qua `index` hoặc tự đổi theo `interval` (tạm dừng khi ngoài khung/tab ẩn; reduced: giữ từ đầu). Chi phí: nhẹ. Gợi ý: bảng giá trực tiếp, hero "Chúng tôi làm ___".
