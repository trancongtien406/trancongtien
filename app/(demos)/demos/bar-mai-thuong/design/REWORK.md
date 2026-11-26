# REWORK — Tầng Mây (2026-11-25)

## (a) Đề tài trước và sau
Trước: trang "cảm hứng neon" với hai công cụ (chọn ly theo vị, tóm tắt đặt bàn) làm trung tâm; thiếu thực đơn theo nhóm đủ dày, giờ mở cửa/happy hour, sức chứa từng khu, bàn nhóm/sự kiện, quy định, liên hệ. Hero chỉ có khẩu hiệu "Chạm tầng mây, chạm vị đêm".
Sau: website của MỘT rooftop bar cụ thể ở Quận Sơn Trà, Đà Nẵng. Hero nêu loại hình, khu vực, đối tượng (nhóm bạn, cặp đôi, tiệc nhỏ), CTA Đặt bàn / Xem thực đơn và các sự thật: mở 17:00–00:00, happy hour 17:00–19:00 (thứ Hai–thứ Sáu), cocktail từ 140.000₫, từ 18 tuổi. Bộ chọn ly chỉ còn là một section ("Gợi ý ly theo vị").

## (b) Section thật của ngành
Hero · Dải thông tin (VelocityMarquee) · Giới thiệu (khu ngồi, thực đơn, âm nhạc) · Giờ mở cửa & Happy hour (đồng hồ đếm ngược) · Ly rót theo cuộn · 3 ly signature · Thực đơn 4 nhóm (Signature 8, Cổ điển 6, Không cồn 5, Đồ ăn nhẹ 6) · Bảng pha chế · Nguyên liệu · Gợi ý ly theo vị · Không gian & sức chứa (Sân thượng 40, Hiên kính 24, Quầy bar 8, Góc neon 18) · Một đêm trên mái (cảnh đổi theo giờ) · Nhạc theo tuần (thể loại chung, không tên DJ) · Bàn nhóm & sự kiện riêng (3 gói, mức chi tối thiểu tham khảo, cọc 30%) · Đặt bàn · Quy định & dress code · FAQ (8 câu) · Liên hệ · Footer.

## (c) Kế hoạch nội dung
data/menu.ts thêm `group` + 9 món (3 cổ điển, 2 mocktail, 4 món nhắm); Happy.tsx, Board.tsx, Night.tsx, Info.tsx (Events/Rules/Contact) mới; Sections.tsx viết lại giới thiệu, nhạc, FAQ, footer; Zones/Reserve cập nhật sức chứa và khung giờ 17:00–23:30; layout/meta cập nhật. Liên hệ `.example`, `0236 000 0000`; không tên DJ/nghệ sĩ, không đánh giá, không số khách.

## (d) Hiệu ứng trước/sau (node scripts/showroom-effects-matrix.mjs bar-mai-thuong)
Trước: đại trà 5/2 (SplitWords, ClipReveal, ScrollScrubText, VelocityMarquee, MagneticButton) + TiltCard, CursorSpotlight, GrainOverlay.
Sau: đại trà 2/2 (ScrollScrubText, VelocityMarquee) + chữ ký thư viện TiltCard, CursorSpotlight, GrainOverlay, Odometer (giá happy hour đếm lên).
Bỏ: SplitWords (mọi H2), ClipReveal (ảnh), MagneticButton (CTA), fade-up của reveal.
Chữ ký riêng (code của landing): (1) Ly rót theo cuộn (Pour + Motion), (2) Đồng hồ đếm ngược happy hour theo giờ Việt Nam (Happy.tsx), (3) Bảng "đang pha" bốn bước, vé chạy từ Đang pha sang Sẵn sàng (Board.tsx), (4) Đèn neon chuyển cảnh theo giờ: thanh kéo 17:00–00:00 đổi bầu trời, mặt trời/trăng, cửa sổ sáng, biển hiệu HAPPY HOUR → LÊN ĐÈN → NEON NIGHT → LAST CALL (Night.tsx), (5) Hero "đêm lên đèn" (neon châm lần lượt, đèn quét, cửa vòm).
Ngôn ngữ chuyển động chính: BẬT ĐÈN NEON (nhấp nháy rồi sáng ổn định) thay fade-up; không dùng stagger fade-up.
