# ART-DIRECTION — Rừng Thức

Ý tưởng: trang là MỘT NGÀY-ĐÊM. Cuộn xuống = thời gian trôi: hero chạng vạng sương, hành trình ngang từ 06:00 tới 21:00 (trời đổi màu, mặt trời lặn, trăng và sao hiện), rồi các phần còn lại ở đêm: nền trang tối dần, sao dày lên, lửa trại ở cuối.

## Section (desktop / mobile)
1. Header cố định: logo ngang, 5 liên kết neo, nút "Lên lịch chuyến đi" (magnetic). Mobile: nút menu 48px, nav thả xuống, Esc đóng + trả focus. Thanh tiến độ cuộn màu lửa ở mép trên.
2. Hero (min 100svh): ảnh sương núi + 3 lớp silhouette SVG (đồi xa, rừng giữa, thông gần) + 2 dải sương trôi + lửa SVG nhấp nháy + tàn lửa canvas. Chữ trái 2 dòng khổng lồ; thẻ đếm ngược hoàng hôn góc phải trên (mobile: dưới CTA).
3. Tuyên ngôn: tiêu đề tách từ + đoạn chữ sáng dần theo cuộn (scrub) + ghi chú viền cam.
4. Hành trình ngày-đêm (SIGNATURE): desktop ghim 100svh, track ngang 1 bảng giới thiệu + 7 thẻ; đồng hồ 06:00→21:00 góc trái; trời, đồi, mặt trời/trăng, sao đổi theo tiến độ; thanh mốc ở đáy bấm được. Mobile/reduced: timeline dọc có đường dọc và chấm màu theo phase.
5. Chỗ nghỉ: 3 thẻ lều có đỉnh mái nhọn (clip-path), thẻ giữa hạ thấp như triền đồi, TiltCard + ClipReveal ảnh.
6. Hoạt động: dải chữ viền chạy theo vận tốc cuộn (có nút dừng), 4 thẻ icon nét + spotlight cam theo con trỏ, banner ảnh parallax.
7. Lửa trại: ảnh vòm cung reveal tròn, tàn lửa canvas bay trên ảnh, ánh lửa chập chờn, ảnh phụ xoay nghiêng.
8. Lên kế hoạch: form (đêm, lều, người, hoạt động) + tổng chi phí + lịch trình từng ngày + sao chép tóm tắt + nút tới form tư vấn.
9. Giải đáp: accordion 5 câu (details name).
10. Kết: lửa SVG + tàn lửa + câu "Có một khu rừng đang chờ bạn." Footer riêng, link Ảnh & ghi công, dòng ký tên.

## Hiệu ứng (ghi vị trí)
Riêng: pinned day-night journey (Journey.tsx), tàn lửa canvas (Embers.tsx, hero + lửa trại + kết), lửa SVG (Fire.tsx), đếm ngược hoàng hôn tính theo ngày (Countdown.tsx + lib/sun.ts), nền trang sáng→tối + sao (Skybox.tsx), hero choreography theo mốc ms (Hero.tsx), con trỏ làm các lớp hero trượt ngang theo độ sâu.
Thư viện: SplitWords (tiêu đề), ParallaxLayer (5 lớp hero + banner), ClipReveal (ảnh lều, lửa trại), ScrollScrubText (tuyên ngôn), TiltCard (thẻ lều), CursorSpotlight (thẻ hoạt động), VelocityMarquee, MagneticButton (CTA), ScrollProgress.
Reduced-motion: nền cố định #0f2a1d, hero/tiêu đề hiện đủ, không pin, không canvas động (một khung), lửa/sương đứng yên. Mobile: ít hạt (26), không pin, parallax tắt dưới 768.
