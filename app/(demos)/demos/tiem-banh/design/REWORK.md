# REWORK — Mây Kẹo (2026-11-25)

## (a) Đề tài trước và sau
Trước: tiệm bánh nhưng trọng tâm là Cake Builder; tủ bánh lẫn đồ uống, không có bảng giá theo size, giờ ra lò, bánh theo mùa/dịp, thiệp & chữ, giao nhận, bảo quản, dị ứng, đặt cọc. Hero là khẩu hiệu vui, closing đẩy công cụ.
Sau: website một tiệm bánh ngọt ở Quận Hải Châu, Đà Nẵng. Hero: "Bánh kem sinh nhật và bánh ngọt làm tay mỗi sáng", CTA Đặt bánh sinh nhật / Xem tủ bánh, ba sự thật: bán 7:00–21:00, bánh kem từ 320.000₫, đặt bánh trước 2 ngày. Cake Builder còn là một section ("Dựng bánh sinh nhật theo ý bạn").

## (b) Section thật của ngành
Hero · Tủ bánh theo 4 nhóm (Bánh kem 6, Bánh lạnh 6, Bánh mì & croissant 5, Cookie & macaron 4) + ảnh · Tủ kính xoay · Giờ ra lò (5 mẻ, đếm ngược) · Bánh sinh nhật theo size (bảng giá, phụ thu vị, báo trước, cắt bánh theo cuộn) · Dựng bánh (Builder) · Thiệp & chữ viết + thổi nến · Bánh theo mùa & dịp (6 thẻ, báo trước 2–5 ngày) · Đặt bánh 3 bước · Giao nhận & bảo quản & dị ứng + giờ bán + đặt cọc 50% · Một ngày ở tiệm · FAQ (7 câu) · Closing · Footer (Quận Hải Châu, giờ bán).

## (c) Kế hoạch nội dung
data/menu.ts: bỏ đồ uống, 4 nhóm mới, thêm 7 món (tiramisu, panna cotta, cheesecake, brioche, bánh mì sữa, cookie socola muối, macaron lẻ). Component mới: Shelf, Oven, Slice, Candles, Info (Seasons, Care). Ảnh cũ của dải marquee chuyển thành lưới ảnh tĩnh dưới tủ bánh (credits giữ đủ 12 ảnh). Giá tham khảo; liên hệ `.example`.

## (d) Hiệu ứng trước/sau (node scripts/showroom-effects-matrix.mjs tiem-banh)
Trước: đại trà 5/2 (ClipReveal, ParallaxLayer, ScrollScrubText, VelocityMarquee, MagneticButton) + TiltCard, StackingCards, InfiniteHorizontalMarqueeImages, SlotText.
Sau: đại trà 2/2 (MagneticButton, ScrollProgress) + chữ ký thư viện TiltCard, StackingCards, BlobMorph, SlotText.
Bỏ: ClipReveal, ParallaxLayer, ScrollScrubText, VelocityMarquee (cả dải marquee ảnh).
Chữ ký riêng: (1) Lò nướng đếm giờ (vòng tiến độ, ổ bánh nở, mẻ tiếp theo theo giờ Việt Nam), (2) Cắt bánh theo cuộn (các lát tách ra, đổi size đổi số lát), (3) Tủ kính xoay 3D kéo/nút/phím, thả tay nảy về ngăn, (4) Thổi nến (nến tắt lần lượt, khói, confetti), (5) BounceWords hero, cốm rơi, nhãn dán kéo-xoay (giữ).
Ngôn ngữ chuyển động chính: NẢY (back.out, elastic) và xoay; không fade-up.
