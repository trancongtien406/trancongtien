# ART-DIRECTION — Bến Vị

Hướng: culinary cinematic. Nền xanh biển đậm ấm, ánh vàng cát, ảnh món là **đĩa tròn** đối lập chữ serif bên trái; tờ thực đơn dạng giấy (vân chấm, viền đôi, đường chấm dẫn giá) nổi trên nền tối. Hình khối đặc trưng: tròn (đĩa), vòm (arch), đường mảnh vàng.

Desktop 1440
1. Header sticky mờ: logo ngang đảo màu, nav 5 mục, nút vàng "Đặt bàn".
2. Hero 6/6: trái eyebrow + H1 serif 2 dòng (dòng 2 italic vàng) + 2 CTA + 3 số liệu; phải đĩa tròn 700px có vòng chữ quay chậm, 2 chip.
3. Từ bến tới bàn: 3 vòm ảnh 4:5 so le (lệch 0/64/128px), số, tiêu đề, vạch vàng.
4. Món nổi bật: danh sách 4 món cuộn bên trái, chồng đĩa tròn 600px sticky bên phải, đổi theo mục đang ở giữa màn hình.
5. Ghép thực đơn: bảng điều khiển 5/12 + tờ thực đơn giấy 7/12.
6. Không gian: mosaic 12 cột gồm ảnh chữ nhật, vòm, tròn; 3 khu vực.
7. Đặt bàn: form 7/12 (ngày, giờ, số khách, khu vực) + phiếu giấy sticky 5/12.
8. Hỏi đáp (details), kết, footer 4 cột.

Mobile 390: hero xếp dọc (chữ rồi đĩa 86vw), CTA full width; vòm xếp dọc; món nổi bật hiện mỗi món kèm đĩa tròn riêng (không sticky); composer và đặt bàn xếp dọc; mosaic 2 cột; footer 2 cột. Header chỉ logo + nút Đặt bàn.

Motion (GSAP, chỉ transform/opacity): hero 0-1.6s: chữ trồi theo dòng, đĩa xoay -14° về 0 và hạ xuống, vòng chữ hiện, chip trồi; vòng chữ quay 80s. Cuộn 1: chồng đĩa xoay -8..8° theo cuộn; đĩa đổi bằng opacity/scale (IntersectionObserver). Cuộn 2: ảnh không gian scale 1.25→1. Reveal section, vạch vàng scaleX. Reduced-motion: không hiệu ứng, nội dung hiện đủ; chỉ ẩn chờ reveal khi GSAP chạy.

Tương tác
- Ghép thực đơn: số khách 1-12, ngân sách 400k-6tr, khẩu vị nhiều lựa chọn, tránh hải sản vỏ cứng. Luật: ceil(khách/2.5) món chính (tối đa 6) + 1 rau + 1 khai vị + cơm/lẩu từ 4 khách; ưu tiên khớp khẩu vị rồi giá thấp; không vượt ngân sách, dành chỗ cho món bắt buộc; thiếu ngân sách thì cảnh báo. Bớt/thêm món, in (print CSS), lưu localStorage (try/catch).
- Đặt bàn: 10 ngày tới; ngày có số ngày chia hết cho 5 là "Kín"; khung giờ kín theo công thức mẫu; khu vực có giới hạn số khách (lỗi cạnh ô); phiếu xem trước + dấu "chưa giữ bàn"; CTA → buildConsultHref('ben-vi'); sao chép nội dung.
