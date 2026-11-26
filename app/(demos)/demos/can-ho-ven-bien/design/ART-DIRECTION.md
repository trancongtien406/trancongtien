# Art direction: kiến trúc điện ảnh, navy và đồng
Ngôn ngữ: "bản vẽ kiến trúc" (mỗi section có nhãn Bản vẽ A-0x, đường kích thước, đường mảnh vẽ dần), khung hình điện ảnh nghiêm ngặt, chữ Spectral thanh mảnh.
## Section (desktop 1440 / mobile 390)
1. Hero: 2 cột 7/5; trái nhãn "Vọng Triều · Căn hộ ven biển · Đà Nẵng", h1 "Căn hộ 1 đến 3 phòng ngủ, mở cửa ra biển Đà Nẵng." (từng từ bật sáng như đèn cửa sổ), mô tả (loại hình, khu vực, đối tượng), 2 nút (Đặt lịch xem nhà mẫu, Xem mặt bằng căn hộ); phải ảnh tháp 3:4 mở từ dưới lên, đường kích thước T01-T36 vẽ bằng CSS, 3 lớp parallax. Dưới: 3 số (48 m², 2,98 tỷ, 36 tầng). Mobile: một cột, ảnh 4:5.
2. Tổng quan dự án (A-00): ScrollScrubText sáng dần từng từ + bảng 6 thông tin chung (loại hình, loại căn, hướng nhìn, bàn giao, dành cho, giấy tờ/tiến độ do đội tư vấn gửi) + ảnh tháp.
3. Bốn chương (StickyChapters): vị trí và kết nối, tiện ích, loại căn, hoàn thiện; mỗi chương một lớp nét kỹ thuật vẽ dần bằng CSS.
4. Tiện ích theo tầng (A-02b): mặt cắt tháp 36 tầng, dải đồng trượt tới nhóm tầng chọn (sân thượng, tầng căn hộ, tầng 6, tầng 5, sảnh và đỗ xe), mô tả đổi theo.
5. Khung nhìn: DraggableGallery 5 ảnh.
6. Mặt tiền theo giờ (A-05): SVG tháp 36 tầng, mặt trời/mặt trăng theo cung, nội suy màu theo giờ; thanh trượt + nút nhanh.
7. Loại căn (A-05b): 3 thẻ 1PN/2PN/3PN, sơ đồ nhỏ, diện tích sử dụng, ban công, số phòng, hợp với ai, giá tham khảo từ đến.
8. Mặt bằng (A-06, Floor Plan Explorer): SVG, phòng morph khi đổi loại căn, la bàn hướng nhìn theo tầng và hướng, giá tham khảo.
9. Chính sách thanh toán tham khảo (A-07): hai phương án chia đợt, vay annuity, đường dư nợ, công thức; "không phải tư vấn tài chính".
10. Hỏi đáp (A-08): 8 mục.
11. Đặt lịch tham quan nhà mẫu (A-09): chọn buổi (sáng/chiều/cuối tuần) và loại căn tạo lời nhắn, 4 bước, nút gửi qua form tư vấn + ShineSweep; tháp nét tĩnh làm nền. Footer.
Thước tầng cố định bên phải (≥1200px): T01 → T36 theo tiến độ cuộn.
## Motion
Hero ~2,8s: từng từ h1 bật sáng ngẫu nhiên (0,35s), ảnh mở từ dưới lên (0,2s), nhãn, mô tả, nút, số. Reveal theo lô. Con trỏ tuỳ chỉnh chỉ pointer fine. Reduced-motion: nội dung hiện đủ, nét hiện đầy đủ.
## Hiệu ứng dùng
Thư viện đại trà giữ 2: ParallaxLayer (hero), ScrollScrubText (tổng quan). Chữ ký thư viện: StickyChapters, Counter, CustomCursor, ShineSweep, DraggableGallery, NumberTicker. Riêng: cảnh mặt tiền theo giờ, morph mặt bằng, la bàn hướng nhìn, mặt cắt tháp, thước tầng, hero đèn cửa sổ, nét vẽ dần theo chương. Chi tiết: REWORK.md.
