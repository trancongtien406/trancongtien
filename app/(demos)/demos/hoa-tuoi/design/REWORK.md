# REWORK — Nở Rừng (2026-11-25)

## (a) Đề tài trước/sau
Trước: trang "tạp chí hoa" mà trọng tâm là Bouquet Builder + khẩu hiệu thơ; thiếu bảng giá, hoa cưới/sự kiện/khai trương, hoa định kỳ, thời gian báo trước, giao nhận, bảo quản, hoa theo mùa. Hero là khẩu hiệu "Hoa cho những điều đang nở", CTA là công cụ.
Sau: website một tiệm hoa tươi ở Quận Thanh Khê, Đà Nẵng. Hero: "Bó, lẵng và hoa hộp theo dịp", CTA "Đặt hoa" + "Xem bảng giá", 3 sự thật (bó từ 200.000 ₫; mở 7:00 đến 21:00; báo trước bó từ 3 giờ, lẵng/hộp 1 ngày). Builder chỉ còn là một section ("Dựng thử bó hoa"). Giao nhận mô tả chung, không hứa giờ.

## (b) Section thật của ngành (15)
Hero · Về tiệm · Bảng giá bó/lẵng/hộp · Hoa theo dịp (4) · Hoa trong tiệm (gallery) · Hoa theo mùa · Cưới, sự kiện, khai trương (+ đặt cọc/huỷ) · Hoa định kỳ · Dựng thử bó hoa · Thiệp và chữ · Báo trước và giao nhận · Cách tiệm làm một bó · Bảo quản hoa 7 ngày · Hỏi đáp (9) · Đặt hoa (4 bước) · Footer.

## (c) Đã làm
data/shop.ts (giá, báo trước, định kỳ, mùa, chăm hoa, cưới/sự kiện, chính sách); components/Shop.tsx + shop.module.css; Sections/Hero/Header/page viết lại; credits.json giữ nguyên 12 ảnh. Không có đánh giá/số khách/giải thưởng/địa chỉ/giờ giao. Trang vẫn noindex.

## (d) Hiệu ứng (node scripts/showroom-effects-matrix.mjs hoa-tuoi)
Trước: đại trà 5 VƯỢT (ScrollScrubText, VelocityMarquee, MagneticButton, SVGPathDraw, ScrollProgress); chữ ký thư viện 4.
Sau: đại trà 1 (SVGPathDraw); chữ ký thư viện 4 (CustomCursor, DraggableGallery, BlobMorph, NumberTicker). Bỏ: ScrollScrubText, VelocityMarquee, MagneticButton, ScrollProgress.
Ngôn ngữ chuyển động chính: NỞ / MỌC TỪ CUỐNG (clip-path từ đáy lên + scaleY), thay fade-up (data-rise, BloomText, tab giá).
Chữ ký riêng (code của landing, không landing khác dùng):
1. PetalMask (components/PetalMask.tsx): ảnh trong mặt nạ cánh hoa/lá nở từ nụ.
2. BloomText (components/BloomText.tsx): chữ mọc như nụ theo từ.
3. PetalRain (components/PetalRain.tsx): canvas cánh rơi, gió theo vận tốc cuộn.
4. LeadRuler (Shop.tsx): thước báo trước, nụ hoa trượt tới số ngày cần đặt.
5. RhythmCalendar (Shop.tsx): lịch 4 tuần hoa định kỳ, nụ nở đúng ngày nhận, giá nhảy số.
6. CardWriter (Shop.tsx): thiệp viết tay, chữ lan mực từng từ.
7. SeasonBloom (Shop.tsx): kéo tháng, loài trong mùa nở, ngoài mùa khép nụ.
8. VaseDays (Shop.tsx): bình hoa 7 ngày, nước đục dần và trong lại khi thay nước.
