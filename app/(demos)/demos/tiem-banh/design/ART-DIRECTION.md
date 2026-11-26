# ART-DIRECTION — Mây Kẹo

Khái niệm: một quầy kẹo/đồ chơi. Mọi vật đều có viền sô-cô-la dày 3px, bóng cứng dịch xuống 5px (nhìn như nhãn dán nổi), bo tròn lớn (28-56px), nền pastel đậm đổi theo từng section thay vì một nền kem.

Section (desktop 1440 / mobile 390):
1. Header: viên thuốc nổi (paper) logo + 5 link + nút hồng. Mobile: logo + nút + nút menu tròn, panel thả xuống, Escape đóng.
2. Hero (peach): trái = nhãn "Tiệm bánh ngọt làm tay", H1 chữ nảy theo từ (dòng 2 trắng viền choco), lead, 2 CTA (CTA chính magnetic + confetti), dòng "Sáng nay có [SlotText]". Phải = ảnh bánh trong khung blob viền dày (parallax trong khung), tem tròn chữ xoay, polaroid macaron, 4 nhãn dán kéo-thả. Nền: cốm rơi canvas, con trỏ đẩy cốm, bấm bung thêm. Đáy hero: kem chảy SVG (peach) rơi xuống dải choco chạy chữ tên món (velocity theo cuộn). Mobile: xếp dọc, ảnh 86vw.
3. Tủ bánh (mint): chip lọc, lưới 4 cột (1 cột dạng hàng ngang trên mobile), 16 thẻ màu luân phiên butter/pink/lilac/paper, tranh vẽ SVG từng món, tilt 3D + glare, wobble tranh khi hover, bật lên theo lô khi cuộn.
4. Dải ảnh (hồng đậm): marquee ảnh vô hạn, nhanh lên khi cuộn.
5. Cake Builder (pink): trái 5 bước (fieldset), phải bản vẽ SVG sticky + tóm tắt giá + nút. Mobile: bản vẽ dính trên cùng, tóm tắt cuối.
6. Một ngày ở tiệm (butter): 3 ý + bảng nhãn dán: 4 polaroid ảnh + 6 nhãn dán kéo, xoay bằng tay nắm, bàn phím.
7. Cách đặt bánh (peach): 3 thẻ chồng dính (StackingCards) có số khổng lồ viền choco.
8. Tuyên ngôn (choco): chữ sáng dần theo cuộn + ảnh mở vòng tròn (ClipReveal).
9. Hỏi đáp (mint), Kết (pink, chữ khổng lồ + confetti), Footer choco với kem chảy hồng ở mép trên.

Hiệu ứng (>=6 có chủ đích): chữ nảy theo từ (riêng), cốm rơi + tương tác + confetti burst (riêng), kem chảy SVG (riêng), nhãn dán kéo/xoay/dán xuống (riêng), wobble hover có kiểm soát (riêng), TiltCard + glare, MagneticButton, ParallaxLayer, SlotText, VelocityMarquee (chữ và ảnh), StackingCards, ScrollScrubText, ClipReveal, bản vẽ bánh "thạch" khi đổi lựa chọn + nến nhấp nháy. Touch: tắt tilt/magnetic/repel; reduced-motion: không animation, nội dung đủ.

## Cập nhật REWORK (2026-11-25)
Xem `REWORK.md`. Thứ tự section: Hero (dải 3 sự thật), Tủ bánh 4 nhóm + lưới ảnh, Tủ kính xoay, Giờ ra lò, Bảng giá + cắt bánh, Dựng bánh, Thiệp & thổi nến, Bánh theo mùa, Đặt bánh 3 bước, Giao nhận & bảo quản, Một ngày ở tiệm, FAQ, Closing. Chuyển động chính: nảy (back.out/elastic). Mobile: cắt bánh lên trên bảng giá, tủ kính cao 270px, lưới ảnh 2 cột.
