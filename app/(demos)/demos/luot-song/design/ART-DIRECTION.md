# ART-DIRECTION — Ráng Sóng Surf Club

Phong cách: retro in ấn thập niên 70. Nền màu phẳng (vàng sa mạc, teal đậm, cam, nâu), hình khối bo cong, vòng cung đồng tâm (vòm ảnh viền cam/vàng/teal/nâu), mặt trời lớn có tia, sọc cầu vồng nâu-cam-vàng, hạt film grain toàn trang. Chữ Paytone One tròn dày + Pacifico viết tay làm nhấn.

## Section (desktop / mobile)
1. Header: viên thuốc nâu cố định, logo ngang đảo màu, 6 liên kết (Khoá học, Một buổi học, Lịch học, Giá và đồ, An toàn, Hỏi đáp), nút cam "Đặt lịch học"; mobile: nút tròn cam mở menu toàn màn hình (dialog, Escape, bẫy Tab).
2. Hero (vàng sa mạc): 2 cột (chữ / vòm ảnh + mặt trời sau vòm + tem quay). Chữ: nhãn "Trường dạy lướt sóng · Quận Sơn Trà, Đà Nẵng", h1 "Học lướt sóng từ buổi đầu tiên.", mô tả đối tượng, 2 nút (Đặt buổi trải nghiệm, Xem khoá học và giá), 3 thẻ sự thật. Dưới: 5 lớp sóng + ván lướt trượt theo đường chấm nét. Mobile: chữ trên, vòm ảnh dưới, 3 lớp sóng.
3. Băng chữ (nâu): hai dải chéo cam/vàng, chạy theo vận tốc cuộn, nội dung là danh mục dịch vụ; nút Dừng.
4. Về trường (teal đậm): dải chữ cong theo sóng, giới thiệu, 4 thông tin (địa điểm, nhóm, mỗi buổi, dụng cụ), vòm ảnh bóng người lướt.
5. Khoá học (vàng): 6 thẻ màu kéo ngang (Buổi trải nghiệm, Khoá 3, 5, 10 buổi, Lớp trẻ em, Thuê ván và đồ) + nút Trước/Sau, giá tham khảo.
6. Một buổi học khoảng 2 giờ (cam): đồng hồ buổi học (phao chạy 0 → 120 phút dọc đường sóng theo cuộn), 4 bước so le với ảnh vòm, nhãn phút từng bước.
7. Lịch học (nâu): thẻ trời có cung nắng (mặt trời trượt theo khung giờ, đổi màu trời), 3 nút khung giờ, thẻ giờ tập trung/kết thúc/hợp với ai, bảng lịch lớp thường kỳ.
8. Giá và đồ (vàng): bảng giá, thuê ván và đồ, giá đã gồm/chưa gồm, đồ cần mang (thẻ kem viền nâu).
9. Chọn khoá phù hợp (teal đậm): biểu mẫu 4 nhóm (trình độ, tuổi, số buổi 1/3/5/10, khung giờ) + thẻ kết quả (khoá, giá, thứ tự bài học, checklist) + "Trao đổi lịch".
10. Mùa sóng (vàng): vòng 12 tia nắng, đồng hồ nước theo tháng, thẻ chi tiết, ghi chú không phải dự báo.
11. Đội ngũ (cam): 4 thẻ vai trò với huy hiệu vector.
12. An toàn (teal đậm): 6 quy định, hộp ba cờ biển (xanh/vàng/đỏ phấp phới), 3 thẻ chính sách dời lịch.
13. Hỏi đáp (nâu): 10 mục, ảnh tròn.
14. Đặt lịch (ảnh bọt sóng phủ teal): 4 bước đặt lịch, nút "Đặt lịch học" (buildConsultHref) + ShineSweep, tem quay.
15. Footer (teal đậm): 4 sọc, dải ảnh, logo, liên kết đủ section, liên hệ `.example`, ký tên.

## Hiệu ứng
Thư viện đại trà giữ 2: VelocityMarquee (băng dịch vụ), ParallaxLayer (ảnh hero). Thư viện chữ ký: DraggableGallery (thẻ khoá học), ShineSweep (nút đặt lịch), GrainOverlay (film grain).
Riêng: sóng SVG nhiều lớp (biên độ theo vận tốc cuộn), mặt trời theo cuộn, tem tròn quay, ván lướt trượt theo đường sóng, chữ cong theo sóng, hero "sóng đẩy chữ vào bờ", đồng hồ buổi học, cung nắng chọn khung giờ, ba cờ biển, đồng hồ nước theo tháng. Chi tiết và file: REWORK.md.
Reduced-motion: Motion ở chế độ tĩnh, sóng/tia nắng/tem/cờ đứng yên, mọi khối hiện đủ, đồng hồ buổi học hiện 120 phút. Mobile: ẩn 2/5 lớp sóng; không hiệu ứng con trỏ. Chỉ animate transform/opacity/clip-path.
