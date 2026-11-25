# ART-DIRECTION — Chấm Chanh
Nhận diện: pop art. Viền mực 3px, bóng cứng lệch (6px) thay cho blur, hình khối phẳng, chấm halftone chuyển động chậm (lớp chấm tịnh tiến 18px/2.6s, chỉ transform).

## Desktop (1440)
1. Header trắng viền đáy mực; nav pill; nút Đặt lịch (MagneticButton).
2. Hero 2 cột: trái chip + "MÓNG" + hộp vàng chanh nghiêng -2° chứa SlotText (XINH./CHẤT LỪ./CHẤM PHÁ./BẬT MOOD., 2.4s); phải đĩa vàng chanh halftone, bàn tay SVG (5 móng, dáng almond), ảnh dán nghiêng góc trên trái, thẻ swatch 12 màu + nút Trộn màu. Choreography: đĩa bật ra (back.out), tay trượt lên, 5 móng rơi lần lượt (stagger .09), chip lên.
3. Dải chữ vàng nghiêng -1.2° (VelocityMarquee tăng tốc theo cuộn, có nút dừng).
4. Dịch vụ: lưới 3 cột so le, thẻ color-flood (loang từ điểm con trỏ, 0.7s; thu về điểm rời 0.36s).
5. Công cụ Nail Design Builder: form 5 mục trái, thẻ đen sticky phải (bàn tay SVG + thời gian + giá khoảng + bước + ghi chú dị ứng + CTA).
6. Tuyên ngôn nền đen: ScrollScrubText + halftone hồng, viền răng cưa.
7. Moodboard nền cobalt: 5 ảnh so le cao thấp, ClipReveal + glitch màu (hồng/cyan lệch cắt lát ~0.6s khi vào khung lần đầu và khi hover).
8. Quy trình: ảnh tròn ClipReveal circle + ảnh nhỏ; 4 bước với đường hồng vẽ theo cuộn (SVGPathDraw scroll).
9. Hỏi đáp: accordion `<details>`; kết nền hồng halftone + bàn tay coffin chấm bi; footer đen.

## Mobile (390)
Hero xếp dọc (chữ rồi stage 1/1.35), swatch 6x2 (44px), thẻ dịch vụ 1 cột (không so le), flood bật/tắt khi chạm, form 1 cột, thẻ kết quả không sticky, moodboard 2 cột, menu toàn rộng nền vàng. Con trỏ tuỳ biến tắt trên cảm ứng.

## Hiệu ứng
Thư viện: SlotText, VelocityMarquee, ScrollScrubText, ClipReveal (inset + circle), MagneticButton, ScrollProgress, SVGPathDraw, CustomCursor (màu = màu đang chọn). Riêng: ColorFlood, bàn tay SVG + swatch picker đổi màu realtime (kèm Trộn màu), móng lấp lánh (sparkle 4 cánh), halftone chuyển động, GlitchImage, hero choreography GSAP, zigzag giữa section. Reduced-motion: mọi thứ ở trạng thái cuối, halftone đứng, flood không transition, lấp lánh tĩnh.
