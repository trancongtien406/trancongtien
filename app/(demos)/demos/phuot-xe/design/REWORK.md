# REWORK — Vọt (2026-11-25)
(a) Đề tài trước: đúng ngành thuê xe nhưng công cụ "chọn xe + tính giá" gần như là cả trang; hero là slogan, thiếu giao nhận/phụ kiện, điều kiện thuê, bảo hiểm và sự cố thành section riêng; dùng 7 hiệu ứng đại trà. Sau: website CỬA HÀNG CHO THUÊ XE MÁY VÀ MÔ TÔ ở Quận Hải Châu, Đà Nẵng; công cụ là một section ("Ước tính giá"). Giữ tên Vọt, đen-vàng, chữ nghiêng, đồng hồ tốc độ, đường đua.
(b) Section: Hero (Cho thuê xe máy & mô tô · Quận Hải Châu; 4 sự thật: 8 mẫu, từ 130.000 ₫/ngày, nhận trả 07:00–21:00, giao tận nơi từ 50.000 ₫) · Về cửa hàng (giờ, ngôn ngữ, phạm vi) · Đội xe (8 mẫu, thông số, giá ngày/tuần) · Ước tính giá (công cụ + điều kiện) · Cung đường gợi ý (Sơn Trà, Hải Vân, Hội An, Bà Nà) · Giao nhận và phụ kiện (4 cách nhận, 6 phụ kiện) · Điều kiện thuê (giấy tờ, tuổi/bằng, cọc, cách tính ngày, xăng, huỷ, quy định lái) · Bảo hiểm và sự cố (3 gói + 4 bước) · Cách đặt xe (4 đèn xuất phát) · Kiểm xe 8 điểm · Hỏi đáp (9, gồm khách nước ngoài bằng tiếng Anh, không khẳng định pháp lý GPLX) · Đặt xe.
(c) Nội dung đổi: data/content.ts (SHOP, TERMS, INCIDENT, FAQ, NAV, STEPS), Hero.tsx, Sections.tsx (Manifesto thành "Về cửa hàng", Handover, Terms, Cover mới, Closing), RouteLine.tsx mới, CSS. CTA: "Chọn xe ngay", "Đặt xe". Liên hệ `.example`, 0236 000 0000; giá tham khảo.
(d) Hiệu ứng (ma trận thư viện): trước đại trà 7/2 VƯỢT (ClipReveal, ParallaxLayer, ScrollScrubText, VelocityMarquee, MagneticButton, SVGPathDraw, ScrollProgress) | sau đại trà 2/2 (VelocityMarquee, MagneticButton), chữ ký thư viện 4 (Counter, Odometer, TiltCard, ShineSweep). Bỏ: ClipReveal, ParallaxLayer, ScrollScrubText, SVGPathDraw, ScrollProgress.
Chữ ký riêng:
- Speedometer (components/Speedometer.tsx): kim đồng hồ quay theo tiến độ cuộn, rung theo vận tốc.
- SpeedLines (components/SpeedLines.tsx): vạch tốc độ đậm theo vận tốc cuộn (--vx-v).
- RoadDivider (components/RoadDivider.tsx): xe lướt ngang giữa các section, kéo vệt vàng.
- StartLights (components/StartLights.tsx): 4 đèn xuất phát sáng lần lượt rồi GO!, dùng cho 4 bước đặt xe.
- Preloader cờ caro (≤1.1s, lần đầu/phiên).
- RouteLine (components/RouteLine.tsx): đường nhựa tô đen theo cuộn dọc cung đường (thay SVGPathDraw).
- Ảnh mở bằng nhát cắt chéo `data-vx="cut"` (components/Motion.tsx, thay ClipReveal).
Ngôn ngữ chuyển động chính: CẮT CHÉO và NGHIÊNG (skew, slash) theo tốc độ cuộn.
