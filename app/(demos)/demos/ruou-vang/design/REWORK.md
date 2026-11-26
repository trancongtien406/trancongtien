# REWORK — Mộc Vang (2026-11-25)

## (a) Đề tài trước và sau
Trước: trang "chậm lại một ly vang" lấy công cụ Chọn vang (Pairing Finder) và trải nghiệm rót/xoay ly làm trọng tâm; thiếu giờ mở cửa và happy hour, set thử rượu, bàn nhóm/sự kiện, mua mang về/quà tặng, quy định; hero chỉ có khẩu hiệu.
Sau: website của MỘT wine bar cụ thể ở Quận Ngũ Hành Sơn, Đà Nẵng. Hero nêu loại hình, khu vực, đối tượng (nhóm bạn, cặp đôi, họp mặt 2–12 người), CTA Đặt bàn / Xem danh sách vang và 3 sự thật: ly từ 150.000₫ (14 ly và chai), mở 17:00–23:00 với happy hour 17:00–19:00, dành cho khách từ 18 tuổi. Pairing Finder đổi tên "Gợi ý ly theo món", chỉ còn là một section.

## (b) Section thật của ngành
Hero · Dải thông tin · Câu chuyện · Bốn nhịp thưởng thức (rót) · Xoay ly · Bốn nhãn phong cách (lật) · Thực đơn 4 nhóm, 14 ly/chai, giá theo ly và chai · Set thử rượu (3 set, 60 ml mỗi ly) · Đồ nhắm + khay charcuterie 2–3 và 4–6 người · Giờ mở cửa & happy hour · Bàn nhóm & sự kiện thử rượu (3 gói) · Mua mang về & quà tặng (chai mang về −10%, hộp quà, thẻ quà) · Không gian · Gợi ý ly theo món + tóm tắt đặt bàn · Quy định (18 tuổi, uống có trách nhiệm, giữ bàn/cọc, mang rượu riêng, không gian chung) · FAQ 8 câu · Footer (giờ, liên hệ).

## (c) Kế hoạch nội dung
data/venue.ts mới (HOURS, HAPPY, INFO, FLIGHTS, BOARDS, EVENTS, TAKEAWAY, RULES, FAQ); Flight.tsx, Hours.tsx mới; Sections.tsx thêm Info/Events/Takeaway/Rules, viết lại Story/Plates/Faq/Footer; Hero/Header/layout/meta cập nhật. Tên vang theo kiểu nho ("kiểu Pinot Noir"), KHÔNG nhãn/nhà sản xuất thật; không đánh giá, không số khách; liên hệ `.example`; "Dành cho khách từ 18 tuổi" ở hero, thực đơn, quy định, footer.

## (d) Hiệu ứng trước/sau (node scripts/showroom-effects-matrix.mjs ruou-vang)
Trước: đại trà 6/2 (SplitWords, ClipReveal, ParallaxLayer, ScrollScrubText, VelocityMarquee, MagneticButton) + chữ ký thư viện CursorSpotlight, DraggableGallery, CanvasParticles, GrainOverlay.
Sau: đại trà 2/2 (SplitWords chỉ ở h1 hero, ParallaxLayer ở nền câu chuyện) + chữ ký thư viện CursorSpotlight, DraggableGallery, CanvasParticles, GrainOverlay.
Bỏ: ClipReveal (ảnh đồ nhắm), ScrollScrubText (tuyên ngôn), VelocityMarquee (dải chữ, thay bằng dải thông tin tĩnh), MagneticButton (mọi CTA), SplitWords ở mọi h2, fade-up của reveal.
Chữ ký riêng (code của landing):
1. Rèm nhung hai bên (Curtain.tsx): một lần mỗi phiên, ≤1,2s.
2. Đường rượu rót + ly dâng theo cuộn (Sections.tsx Pour + Motion.tsx).
3. Xoay ly bằng kéo, mặt vang nghiêng, thước "vang đã thở" (Swirl.tsx).
4. Nhãn chai lật 3D dẫn tới thực đơn (Labels.tsx).
5. Nến SVG nhấp nháy ba ngọn + ánh nến theo con trỏ (Candle.tsx, Motion.tsx).
6. MỚI: Khay thử rượu (Flight.tsx): chọn set, các ly 60 ml trên khay gỗ được rót đầy lần lượt từ trái sang phải, màu theo kiểu nho và độ đậm, danh sách thứ tự nhẹ đến đậm.
7. MỚI: Nến giờ mở cửa (Hours.tsx): thân nến ngắn dần từ giờ mở đến giờ đóng cửa tối nay (giờ Việt Nam), ngoài giờ thì nến chưa thắp; hàng hôm nay và khung happy hour sáng lên đúng giờ.
Ngôn ngữ chuyển động chính: VANG DÂNG. Mọi khối nội dung hiện từ đáy lên bằng mặt nạ mềm như mực vang dâng trong ly (CSS mask + biến --lv do GSAP tween), hero dùng mờ-nét (blur) thay trượt. Khác bar-mai-thuong (neon bật đèn) và kim-hoan (ánh kim quét ngang).
