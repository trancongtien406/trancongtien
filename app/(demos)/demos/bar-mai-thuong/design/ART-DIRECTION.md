# ART-DIRECTION · Tầng Mây

Ý tưởng: bảng hiệu neon trên mái nhà. Nền gần đen, mọi "ánh sáng" là ống neon (chữ, viền cửa vòm, vạch tiêu đề), đèn quét lia qua trời, skyline vẽ tay, ly cocktail SVG rót theo cuộn. Retro-futuristic: chữ rộng Unbounded, băng chuyền nghiêng chuyển sắc, vé đặt bàn có khuyết tròn.

Desktop (1440) theo thứ tự: Hero (chữ neon 7/12 + cửa vòm ảnh 5/12, skyline đáy, 2 đèn quét) · Băng chuyền hai tầng (outline neon hồng + dải gradient nghiêng, velocity) · Manifesto (scrub text + ảnh thành phố 4:5 + chip neon) · Ly rót (cao 250svh, nội dung dính 100svh, ly SVG bên phải) · "Ly của đêm" 3 thẻ so le, tilt, viền neon theo tone · Thực đơn 16 dòng (tab lọc, 4 thanh vị N/C/Đ/K, spotlight hồng) · Nguyên liệu 3 ảnh (đá/trái cây/khói) · Máy chọn ly (console cyan, scanline, spotlight cyan) · Không gian (danh sách 4 góc + ảnh đổi theo hover/focus) · Nhịp tuần · Đặt bàn (form + vé tóm tắt dính) · Hỏi đáp · Footer chữ neon khổng lồ.
Mobile (390): hero một cột, cửa vòm xuống dưới, nút full width; ly rót đưa lên trên, mô tả bước gọn; thực đơn đổi thanh vị sang ngang dưới mô tả; không gian xếp dọc kèm ảnh 16:10; menu hamburger có Escape + trả focus.

Hiệu ứng ký hiệu (bắt buộc): (1) neon nhấp nháy: chữ "tầng mây,", "vị đêm.", logo "Mây", viền cửa vòm, chữ footer; keyframe opacity tối đa 2-4 lần chớp mỗi 7-11 giây, chu kỳ lệch nhau, tắt khi reduced. (2) cursor spotlight: lớp fixed radial hồng+cyan 420px, blend screen, rAF, chỉ pointer fine + không reduced; thêm CursorSpotlight cục bộ ở thực đơn (hồng) và máy chọn ly (cyan). (3) marquee velocity: nền 55/40px/s, boost theo vận tốc cuộn, hàng 2 đảo chiều khi cuộn lên. (4) grain overlay fixed, animated, 7%.
Hiệu ứng riêng: ly cocktail SVG rót theo tiến độ cuộn (mực, dòng rót, lát cam, bước 01-03, đọc số %); hai đèn quét conic (clip-path + rotate) lệch pha và mờ dần theo cuộn; hero "châm đèn" (CSS: skyline nhô, đèn quét bật, chữ ignite lần lượt, cửa vòm mở, đoạn dẫn hiện); skyline trượt chậm theo cuộn; cửa sổ toà nhà nhấp nháy.
Từ thư viện: SplitWords (tiêu đề), ScrollScrubText, ClipReveal (ảnh), TiltCard (3 thẻ), MagneticButton (CTA), CursorSpotlight, VelocityMarquee, GrainOverlay.
Công cụ: Matcher (chip aria-pressed, radio, lỗi cạnh ô, kết quả stagger + thanh % chạy, focus vào tiêu đề, nút thêm ly vào đặt bàn qua sự kiện tm:pick); Đặt bàn (lỗi từng ô, stepper 1-12, gợi ý nhóm 9+, vé tóm tắt, sao chép, nút cuối buildConsultHref).
Reduced-motion: mọi animation tắt, ly đầy sẵn, marquee dạng tĩnh, spotlight tắt, nội dung hiện đủ.

## Cập nhật REWORK (2026-11-25)
Xem `REWORK.md`. Thứ tự section: Hero, Dải thông tin, Giới thiệu, Happy hour, Ly rót, Signature, Thực đơn, Bảng pha chế, Nguyên liệu, Gợi ý ly, Không gian, Một đêm trên mái, Nhạc theo tuần, Bàn nhóm & sự kiện, Đặt bàn, Quy định, FAQ, Liên hệ. Chuyển động chính: bật đèn neon (data-arm/data-lit trong Motion.tsx). Mobile: thanh giờ 44px, nút khung giờ wrap, bảng pha chế một cột.
