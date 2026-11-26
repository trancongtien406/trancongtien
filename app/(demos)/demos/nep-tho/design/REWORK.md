# REWORK 2026-11-25 — Nếp Thở (theo REWORK-STANDARD)

## (a) Đánh giá đề tài trước
Đã là studio pilates & yoga nhưng hero chỉ có khẩu hiệu ("Tìm lại nhịp chuyển động"), không nêu khu vực, giá, giờ, CTA tập thử; thiếu buổi tập thử, quy định/đổi huỷ, thiết bị; HLV đặt tên riêng (An/Mây/Lam); câu "website không đặt lịch" nghe như bản mẫu; nhãn "Class Finder"; không có hiệu ứng thư viện, chuyển động kiểu "fade-up" (gần mien-an).

## (b) Section thật của ngành (13)
Hero (loại hình, Sơn Trà Đà Nẵng, 3 sự thật, CTA Đăng ký tập thử) · Thời khoá biểu tuần (lọc loại/cấp độ/HLV + thanh giờ) · Loại lớp (thẻ xếp chồng) · Tìm lớp phù hợp · Không gian & thiết bị · Nhịp xe trượt Reformer · Đội ngũ theo vai trò (vector) · Gói tập & giá · Buổi tập thử (+4 bước) · Quy định & thông tin · FAQ (10) · Đặt chỗ buổi đầu · Footer.

## (c) Thay đổi nội dung
data/content.ts viết lại (TRIAL, SPACE_GEAR, RULES, STUDIO_INFO, FAQ 10); HLV đổi sang vai trò (HLV Reformer / Yoga / Mat & Yoga, biểu tượng vector); hero mới; bỏ ribbon trừu tượng; chính sách đổi huỷ trước 6 giờ, hạn dùng gói; metadata theo quận Sơn Trà. Không thêm hồ sơ bịa (không số học viên, không đánh giá).

## (d) Hiệu ứng trước → sau (`node scripts/showroom-effects-matrix.mjs nep-tho`)
| | trước | sau |
|---|---|---|
| đại trà thư viện | 0 | 2 (ScrollProgress, SVGPathDraw) hạn mức PD, SP |
| chữ ký thư viện | 0 | 1 (StackingCards) |
| chữ ký riêng | hero nở, lịch nở | thanh giờ lọc lịch kèm biểu đồ số buổi/khung giờ; sơ đồ chỗ trong hộp thoại; "Nhịp xe trượt" Reformer (hít đẩy ra/thở kéo về, 3 nhịp độ, rAF tự dừng); hero "phồng" clip-path viên thuốc + dấu "thở" |
Ngôn ngữ chuyển động: phồng–xẹp (clip-path/scale/blur), không fade-up/trượt Y; khác mien-an (fade-up, đồng hồ thở tròn). Reduced-motion: tĩnh, nhịp xe trượt chỉ đổi chữ.
