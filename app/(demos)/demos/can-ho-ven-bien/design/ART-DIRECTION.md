# Art direction: kiến trúc điện ảnh, navy và đồng
Ngôn ngữ: "bản vẽ kiến trúc" (mỗi section có nhãn Bản vẽ A-0x, đường kích thước, đường mảnh vẽ dần), khung hình điện ảnh nghiêm ngặt, chữ Spectral thanh mảnh.
## Section (desktop 1440 / mobile 390)
1. Hero: 2 cột 7/5; trái tiêu đề SplitWords + mô tả + 2 nút; phải ảnh tháp 3:4 mở bằng ClipReveal, đường kích thước T01-T36 vẽ dần, 3 lớp parallax (chân trời xa, chân trời gần, sóng). Mobile: một cột, ảnh 4:5.
2. Ý tưởng: ScrollScrubText sáng dần từng từ, ảnh tháp ClipReveal từ phải.
3. Bốn chương (StickyChapters): cột chữ trái, hình dính phải (mobile: hình dính trên 42svh). Mỗi chương một lớp nét kỹ thuật vẽ dần bằng CSS stroke-dashoffset khi chương hiện: vòng tròn khoảng cách, mặt cắt tầng + hồ bơi, ba mặt bằng căn, ô vật liệu.
4. Khung nhìn: DraggableGallery 5 ảnh.
5. Mặt tiền theo giờ: SVG tháp 36 tầng, mặt trời/mặt trăng theo cung, nội suy màu bầu trời/mặt tiền/biển/đèn cửa sổ theo giờ; thanh trượt + nút nhanh; tự chạy 6h tới 17h36 một lần khi vào khung; lớp xa chạy parallax khi cuộn.
6. Mặt bằng (Floor Plan Explorer): SVG, phòng là rect được gsap nội suy khi đổi 1PN/2PN/3PN (0,95s power3.inOut), nét nội thất/nhãn/kích thước vẽ dần; hover/chạm/phím mũi tên từng phòng; la bàn hướng nhìn xoay và mở góc theo tầng + hướng, dải khung nhìn đổi đường chân trời.
7. Dự toán thanh toán: bảng đợt, phần vay xếp từ đợt cuối, annuity, đường dư nợ vẽ dần, công thức hiển thị.
8. Hỏi đáp, 9. Kết (tháp nét vẽ theo cuộn, nút từ tính + ShineSweep), Footer.
## Motion
Hero ~2,8s (nhãn 0,1s; mô tả 1,1s; nút 1,4s; số liệu 1,9s). Reveal theo lô. Con trỏ tuỳ chỉnh chỉ pointer fine. Reduced-motion: nội dung hiện đủ, nét hiện đầy đủ.
## Hiệu ứng dùng
Thư viện: SplitWords, ClipReveal, ParallaxLayer, StickyChapters, ScrollScrubText, SVGPathDraw (hero + kết), Counter, NumberTicker, DraggableGallery, ScrollProgress, MagneticButton, ShineSweep, CustomCursor. Riêng: cảnh mặt tiền theo giờ, morph mặt bằng, la bàn hướng nhìn theo tầng, nét vẽ dần theo chương, parallax SVG theo cuộn.
