# ART-DIRECTION — Ráng Sóng Surf Club

Phong cách: retro in ấn thập niên 70. Nền màu phẳng (vàng sa mạc, teal đậm, cam, nâu), hình khối bo cong, vòng cung đồng tâm (vòm ảnh viền cam/vàng/teal/nâu), mặt trời lớn có tia, sọc cầu vồng nâu-cam-vàng, hạt film grain toàn trang. Chữ Paytone One tròn dày + Pacifico viết tay làm nhấn.

## Section (desktop / mobile)
1. Header: viên thuốc nâu cố định, logo ngang đảo màu, 6 liên kết, nút cam; mobile: nút tròn cam mở menu toàn màn hình (dialog, Escape, bẫy Tab).
2. Hero (nền vàng sa mạc): 2 cột (chữ / vòm ảnh + mặt trời sau vòm + tem quay). Dưới cùng: 5 lớp sóng chuyển động + ván lướt trượt theo đường chấm nét. Mobile: chữ trên, vòm ảnh dưới, 3 lớp sóng.
3. Băng chữ: hai dải chéo nhau (cam / vàng), chữ hoa Paytone + sao 4 cánh; nút Dừng chạy chữ.
4. Tuyên ngôn (teal đậm): dải chữ cong theo sóng (textPath), đoạn văn sáng dần theo cuộn, vòm ảnh bóng người lướt.
5. Khoá học (vàng): tiêu đề + ảnh ván tròn; 6 thẻ màu (cam, teal đậm, vàng nhạt, nâu) kéo ngang được, nút Trước/Sau; giá tham khảo.
6. Một buổi bốn bước (cam): đường sóng nét nâu vẽ theo cuộn nối 4 số; 4 vòm ảnh so le (so le ở desktop, 1-2 cột ở mobile).
7. Lesson Planner (teal đậm): biểu mẫu thẻ vàng 4 nhóm chọn (2x2) + thẻ kết quả vàng nhạt (khoá, giá, thứ tự bài học theo buổi, ghi chú tuổi/giờ, checklist có tiến độ) + nút "Trao đổi lịch" (buildConsultHref).
8. Mùa sóng (vàng): vòng 12 tia nắng (độ dài = mức sóng thường gặp), đồng hồ nước ở tâm dâng theo tháng, chip tháng, thẻ chi tiết, ghi chú dạng khung nét đứt.
9. FAQ (nâu): 7 mục details/summary, ảnh tròn.
10. CTA cuối: ảnh bọt sóng vàng phủ teal, tiêu đề lớn, nút cam, tem quay.
11. Footer (teal đậm): 4 sọc, dải ảnh, logo, liên kết (có "Ảnh & ghi công"), liên hệ `.example`, ký tên.

## Hiệu ứng (≥6 có chủ đích; ký hiệu in đậm)
Thư viện: SplitWords (h1 hero), **VelocityMarquee** (băng chữ, 2 dải ngược chiều, nút Dừng), ScrollScrubText (tuyên ngôn), ClipReveal (ảnh vòm/tròn, 8 chỗ), ParallaxLayer (ảnh hero), DraggableGallery (khoá học), SVGPathDraw (đường sóng quy trình, scroll), GrainOverlay (film grain toàn trang, nhấp nháy steps), MagneticButton (CTA chính), ShineSweep (CTA cuối), ScrollProgress (vòng tiến độ).
Riêng: **Wave SVG** nhiều lớp chạy ngang (CSS translateX), biên độ (scaleY) đọc `--rs-amp` do Motion tính từ tiến độ hero + vận tốc cuộn; **mặt trời lên theo cuộn** (nhô lên khi tải bằng gsap, rồi translateY/scale/quay theo `--rs-hp`, `--rs-sy`); **tem tròn quay theo cuộn** (textPath trên vòng tròn, quay 0.24deg mỗi px + quay chậm nền); **ván lướt SVG trượt theo đường sóng** (getPointAtLength + góc tiếp tuyến, bù tỉ lệ khi svg co giãn); **chữ cong theo sóng** (textPath, startOffset chạy theo cuộn, đường nhấp nhô); **đồng hồ nước/thuỷ triều** (mực nước + sóng chạy trong đĩa tháng); đường sóng nét vẽ theo cuộn; hero choreography ~3s (mặt trời, vòm ảnh mở clip-path, nhãn, tiêu đề tách từ, mô tả, nút, tem nảy), có tua nhanh khi cuộn sớm.
Reduced-motion: Motion ở chế độ tĩnh, sóng/tia nắng/tem đứng yên, mọi khối hiện đủ. Mobile: ẩn 2/5 lớp sóng; không có hiệu ứng con trỏ nặng (MagneticButton chỉ pointer fine). Chỉ animate transform/opacity/clip-path.
