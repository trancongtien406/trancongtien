# ART-DIRECTION — Miên An Wellness

Hướng: Organic luxury, vòm cong, editorial, slow living. Mỗi section khác vai trò; "vòm" là motif xuyên suốt (hero, story, closing, mốc hành trình, success).

| # | Section | Desktop 1440 | Mobile 390 |
|---|---|---|---|
| 0 | Ribbon + Header | Ribbon tối "Miên An — Spa & wellness · Nhẹ nhàng, có chủ đích" + link Về portfolio; header sticky 88px, logo trái, nav giữa, CTA phải | Ribbon xuống dòng; header 72px, nút Menu mở dialog modal toàn màn (serif 32px, số thứ tự) |
| 1 | Hero | Bất đối xứng: chữ 5 cột trái (H1 3 dòng, dòng cuối italic), ảnh vòm 480x640 phải với viền vòm mảnh lệch 14px (không chip nhãn trên ảnh) | Một cột: eyebrow, H1, mô tả, 2 CTA, ảnh vòm, caption; không chữ đè ảnh |
| 2 | Philosophy | Căn giữa 850px, ký hiệu 40px, 3 nguyên tắc 3 cột kẻ trên | 3 nguyên tắc xếp dọc, số trái |
| 3 | Signature Rituals (linen) | Tiêu đề 7 cột + mô tả 4 cột; lưới 3x2 ảnh 4:5, cột giữa lệch xuống 56px; "Xem nghi thức" mở dialog | 1 cột (2 cột từ 640px) |
| 4 | Ritual Finder (olive) | Giới thiệu 4 cột sticky + bảng ivory 7 cột; 3 bước + kết quả; vòm ký hiệu mờ phía sau | Giới thiệu trước, bảng sau |
| 5 | Story | Ảnh vòm 5 cột trái, văn bản 6 cột phải, trích dẫn nghiêng, ảnh chi tiết 220px | Ảnh, rồi chữ, rồi ảnh chi tiết |
| 6 | Sanctuary (linen) | Gallery 7/5 cột: 1 ảnh lớn 3:4 + 2 ảnh nhỏ 4:3; lightbox | Ảnh lớn, hai ảnh nhỏ 2 cột |
| 7 | Journey | 4 cột, đường nối ngang, mốc vòm đánh số | Timeline dọc |
| 8 | Appointment (linen) | Form 7 cột + tóm tắt olive sticky 4 cột | Form rồi tóm tắt |
| 9 | FAQ | Tiêu đề 4 cột + accordion 7 cột, mở một mục | Dọc |
| 10 | Closing | Khung vòm lớn (viền kép) chứa lời mời | Vòm nhỏ hơn |
| 11 | Footer (olive) | 4/3/3/2 cột + dải CTA "trao đổi về dự án" + dòng ký tên | 2 cột liên kết |

## Motion: The Slow Bloom (GSAP + ScrollTrigger, progressive enhancement)
- Hero ~2s xếp chồng: header không animate (tránh CLS), eyebrow 150ms, 3 dòng H1 mask-reveal (yPercent) 300/440/580ms, ảnh opacity + scale 1.06 -> 1 (180ms, 1.45s), mô tả 1.0s, CTA 1.18s, caption 1.5s. Không tách ký tự (an toàn dấu tiếng Việt).
- Moment 1 "Unfolding Story": ảnh vòm parallax nhẹ -12% (scrub 0.6, chỉ >=1024px), chữ reveal một lần, ảnh chi tiết trễ 200ms. Không pin.
- Moment 2 "Sanctuary Reveal": ảnh lớn clip-path từ dưới, ảnh nhỏ opacity+y 24px, stagger 120ms, một lần.
- Hover: ảnh thẻ scale 1.035 (500ms), mũi tên link +4px, CTA đổi sang Forest — tất cả trong `(hover:hover) and (pointer:fine)`.
- Reduced-motion: GSAP không chạy, CSS animation ~0ms, nội dung hiện đủ. Không có JS: nội dung server-render vẫn đủ. GSAP nạp bằng dynamic import trong effect, cleanup bằng gsap.context().revert().

## Tương tác
- Ritual Finder: rule engine thuần (goal, thời lượng tối đa, áp lực, tránh đá ấm, không hương liệu), điểm 60 + 20G + 10P + round(10D/T), sắp theo điểm, giá, ID; tối đa 1 chính + 2 phụ; trạng thái rỗng không tự nới lỏng điều kiện; focus chuyển vào tiêu đề bước, aria-live báo tiến độ.
- Appointment Preview: 14 ngày theo giờ Việt Nam (Intl, không toISOString), giờ mở 09:00–20:00, bước 30 phút, đệm 15 phút, 2 phòng (mỗi phòng một kỹ thuật viên), lịch bận cố định theo độ lệch ngày, lead time 60 phút cho hôm nay; chọn nghi thức/ngày/giờ/KTV/áp lực/hương liệu; bắt buộc xác nhận "lịch mô phỏng"; kiểm lại slot khi tạo; success không nói "đặt thành công"; CTA chính đi `buildConsultHref('mien-an')`. Không gửi dữ liệu, không localStorage.
