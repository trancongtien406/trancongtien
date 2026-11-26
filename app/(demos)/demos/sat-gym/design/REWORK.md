# REWORK — SẬT Gym (2026-11-25)

## (a) Đề tài trước/sau
Trước: "phòng tập" chung chung, trọng tâm là Workout Picker + đồng hồ tabata; thiếu hồ sơ box (loại lớp, người đứng lớp, thiết bị, quy định, đăng ký tập thử); hero chỉ là chữ SẬT + khẩu hiệu.
Sau: website một box CrossFit và strength ở Quận Ngũ Hành Sơn, Đà Nẵng. Hero: CTA "Đăng ký tập thử" + "Xem lịch lớp tuần"; 3 sự thật: buổi tập thử 180.000 ₫, tối đa 14 người/lớp, lớp 06:00 đến 20:00 mỗi ngày. Picker chỉ còn là section "Thử một bài WOD". Không hứa giảm cân/kết quả; an toàn nói thận trọng.

## (b) Section (13)
Hero · Về SẬT (cho ai) · Chương trình 5 loại lớp (CrossFit WOD, Strength, Conditioning, Mobility, Người mới) · Lịch lớp tuần · Huấn luyện viên theo vai trò (vector) · Một buổi 60 phút (đồng hồ + bảng bài) · Tăng tải (thanh tạ) · Thử một bài WOD · Thiết bị và không gian (sơ đồ sàn) · Quy định, khởi động, an toàn · Gói tập và giá · Hỏi đáp (9) · Đăng ký tập thử (4 bước) · Footer.

## (c) Đã làm
data/content.ts mở rộng (chương trình, FAQ, buổi tập, khu sàn, quy định, bước đăng ký); components/Gym.tsx mới; Sections/Hero/Header/page/layout/meta cập nhật; gallery còn 5 ảnh (ban-chan chuyển sang chương trình Mobility). credits.json giữ 13 ảnh.

## (d) Hiệu ứng (node scripts/showroom-effects-matrix.mjs sat-gym)
Trước: đại trà 5 VƯỢT (ClipReveal, ParallaxLayer, ScrollScrubText, VelocityMarquee, ScrollProgress); chữ ký thư viện 4.
Sau: đại trà 1 (ScrollProgress); chữ ký thư viện 5 (TextScramble, Counter, CustomCursor, StackingCards, GrainOverlay). Bỏ: ClipReveal, ParallaxLayer, ScrollScrubText, VelocityMarquee.
Ngôn ngữ chuyển động chính: ĐÓNG DẤU / hạ tạ (khối rơi từ trên, chạm, nảy; ảnh quét ngang như tấm bê tông), thay fade-up.
Chữ ký riêng:
1. OutlineText (components/OutlineText.tsx): chữ rỗng viền khổng lồ tô axit theo cuộn/chuột.
2. Timer (components/Timer.tsx): đồng hồ tabata/EMOM chạy thật.
3. Barbell (components/Barbell.tsx): thanh tạ SVG nâng theo cuộn, đĩa trượt vào, kg 20 đến 110.
4. SessionClock (components/Gym.tsx): đồng hồ buổi 60 phút qua 5 chặng, bấm chặng để nhảy.
5. FloorPlan (components/Gym.tsx): sơ đồ sàn tập, khu chọn được "đóng dấu".
6. Shake (components/Shake.tsx): nút CTA rung có kiểm soát.
