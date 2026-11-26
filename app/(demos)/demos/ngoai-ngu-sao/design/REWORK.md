# REWORK — Mở Lời (2026-11-25)

## (a) Đề tài trước/sau
Trước: trang kiểu "app học tập", hero là chữ "Xin chào" đổi ngôn ngữ, trọng tâm là bài kiểm tra cấp độ + lịch lớp; không nói rõ trung tâm dạy gì cho ai, thiếu chương trình theo đối tượng, đội ngũ theo vai trò, ưu đãi/hoàn phí, cơ sở, quy trình đăng ký.
Sau: website của MỘT trung tâm ngoại ngữ ở Quận Hải Châu, Đà Nẵng. Hero: "Trung tâm ngoại ngữ Mở Lời, dạy [Tiếng Anh giao tiếp / IELTS / Tiếng Nhật JLPT / Tiếng Hàn sơ cấp]", CTA "Đăng ký học thử miễn phí" + "Nhận tư vấn lộ trình", 3 sự thật (tối đa 12 học viên; tại trung tâm hoặc trực tuyến; từ 2.400.000 ₫/khoá 24 buổi).

## (b) Section (13)
Hero · Giới thiệu và phương pháp · Chương trình (11, lọc ngôn ngữ x đối tượng) · Lộ trình lên cấp (4 lộ trình) · Đội ngũ theo vai trò · Thẻ từ vựng · Hội thoại mẫu · Lịch khai giảng + thời khoá biểu · Học phí (so sánh 3 gói, ưu đãi, hoàn phí) · Cơ sở vật chất · Quy trình đăng ký 4 bước · Kiểm tra đầu vào nhanh (chỉ một section) · FAQ (9) · Đăng ký học thử (tóm tắt -> buildConsultHref, không thu họ tên/SĐT).

## (c) Kế hoạch đã làm
data/center.ts (chương trình, lộ trình, gói, ưu đãi, hoàn phí, cơ sở, quy trình, FAQ); components Hero/About/Programs/Roadmap/Schedule/Pricing/Register/LevelTest/ClassContext; xoá Marquee, Languages, Path, Manifesto, Tools. Không có số học viên/điểm/tỉ lệ đỗ/bằng cấp. Chỉ giữ công cụ cũ ở dạng một section.

## (d) Hiệu ứng trước -> sau (node scripts/showroom-effects-matrix.mjs ngoai-ngu-sao)
Trước: đại trà 7 (SplitWords, ClipReveal, ParallaxLayer, ScrollScrubText, VelocityMarquee, MagneticButton, SVGPathDraw); chữ ký thư viện 3.
Sau: đại trà 2 (ScrollScrubText, SVGPathDraw); chữ ký thư viện 4 (TiltCard, ShineSweep, NumberTicker, SlotText). Riêng của landing: ProgramFilter (FLIP khi lọc), RoadmapCards (thẻ lên cấp + tính phần còn lại), OpeningCalendar + SeatMap (lịch khai giảng, sơ đồ sĩ số), PlanCompare (so sánh gói, giá nhảy số), FlipCards, ChatBubbles. Bỏ: KineticGreeting, VelocityMarquee, MagneticButton, ClipReveal, ParallaxLayer, SplitWords.
