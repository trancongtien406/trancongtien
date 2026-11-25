# ART-DIRECTION — Nở Rừng (LP-17)

Ý tưởng: tạp chí hoa botanical đậm. Nền xanh rừng, nhấn đỏ cam và hồng sen; kem chỉ là màu chữ/thiệp/nút phụ. Tiêu đề Prata cỡ lớn, hình học lá/cánh làm ngôn ngữ chung (mặt nạ, blob, lá SVG, cánh rơi).

## Section (desktop / mobile)
1. Header: lưới 3 cột (nav trái, logo giữa kiểu masthead, nav phải + nút). Mobile: logo trái, nút menu tròn, panel dọc (Escape đóng, trả focus).
2. Hero: trái tiêu đề Prata 7.2rem + mô tả + 2 nút; phải ảnh mẫu đơn trong mặt nạ hoa 6 cánh, blob hồng sen morph phía sau, huy hiệu chữ chạy vòng (xoay theo cuộn), lá nhiều tầng trước/sau. Mobile: xếp dọc, ảnh sau nút, 2 lá.
3. Dải chữ đỏ cam (marquee velocity, viền lượn sóng bên dưới, nút Dừng chạy chữ).
4. Tuyên ngôn: chữ lớn + đoạn sáng dần theo cuộn; phải ảnh lá monstera trong mặt nạ chiếc lá, 2 cành lá parallax.
5. Dịp (#dip): bốn hàng lớn (Sinh nhật, Khai trương, Cưới, Xin lỗi) kèm bó hoa SVG; hover dội màu hồng sen từ đáy lên, bó nghiêng nhấc; nút đẩy dịp vào Builder.
6. Khu vườn (#vuon): nền hồng sen, gallery kéo ngang (quán tính, phím, nút), mỗi thẻ ảnh trong mặt nạ cánh/lá/chén tulip, con trỏ "Kéo".
7. Bouquet Builder (#bo-hoa): trái 5 nhóm điều khiển, phải sticky bó hoa SVG trong blob hồng sen, danh sách hoa, tổng giá (NumberTicker), thiệp kem nghiêng, 2 nút.
8. Tay nghề (#tay-nghe): 4 bước, ảnh trong mặt nạ xen kẽ trái phải, thân hoa SVG vẽ theo cuộn ở giữa (desktop).
9. Hỏi đáp: 5 mục details.
10. Kết (#dat-hoa): nền đỏ cam, tiêu đề khổng lồ, blob hồng sen morph, 2 nút (nút chính tới buildConsultHref).
11. Footer: logo, liên kết, liên hệ `.example`, ký tên thiết kế, "Ảnh & ghi công".

## Hiệu ứng (14)
Thư viện: BlobMorph (hero, kết), DraggableGallery, VelocityMarquee, ScrollScrubText, SVGPathDraw (scroll), ScrollProgress, MagneticButton (3 nút), CustomCursor (nhãn Kéo/Dựng), NumberTicker (giá).
Riêng: PetalMask (mặt nạ cánh hoa/lá nở: hero, tuyên ngôn, gallery, tay nghề), BloomText (chữ mọc như nụ: clip + scaleY theo từ), PetalRain (canvas cánh rơi, gió theo vận tốc cuộn), lá parallax nhiều tầng (data-leaf, scrub 0.8), hero timeline ~3s, huy hiệu chữ vòng xoay theo cuộn, hover dội màu hàng dịp, Builder bó hoa nảy khi đổi lựa chọn.
Reduced-motion: hiện đủ nội dung, không canvas/parallax/morph/quán tính. Touch: tắt con trỏ, magnetic; canvas 14 cánh; lá giảm 60% biên độ.
