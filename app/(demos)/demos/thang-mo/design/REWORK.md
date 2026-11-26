# REWORK (2026-11-25) — Tháng Mơ

## (a) Đánh giá đề tài
Trước: trang là một cuốn "photobook cảm hứng": hero khẩu hiệu "Giữ lại một ngày, nhớ cả một đời", bốn "album của khách" (thực ra là sổ ảnh stock), ba gói chụp một dòng, FAQ chung chung, không nêu quận, giờ làm việc, bao gồm/không bao gồm, chính sách cọc/dời/mưa, trang phục và make-up. Chủ một studio ảnh cưới ở Đà Nẵng khó nhận ra đây là website của mình. Sau: website một studio ảnh cưới ở Quận Sơn Trà, Đà Nẵng với dịch vụ, gói chụp có số giờ/trang phục/ảnh chỉnh sửa/địa điểm loại hình/giá/bao gồm/không bao gồm, danh mục phong cách (biển, vườn, cổ điển, tối giản) thay cho "album của khách", quy trình 7 bước có thời gian, chính sách, FAQ 12 câu. Giữ tên Tháng Mơ, logo, palette giấy/cocoa, Playfair + Josefin, ImmersiveAlbum và Moodboard (nay chỉ là hai section). Không số cặp đôi, lời chứng thực, tên người, địa chỉ đường; SĐT 0236 000 0000.

## (b) Section thật của ngành
Hero (loại hình, quận, đối tượng, CTA "Đặt lịch tư vấn", 3 sự thật: gói từ 5.900.000 đ, giao ảnh 14–45 ngày, tư vấn 08:30–18:30 T2–T7) → Về studio → Dịch vụ (pre-wedding studio, ngoại cảnh, phóng sự cưới, album/ảnh in/file) → Gói chụp và giá + bảng Album, ảnh in và file → Danh mục phong cách (địa điểm hợp, giờ chụp, trang phục, mùa) → Trang phục và make-up (bảng theo gói) → Giờ chụp theo ánh sáng (công cụ) → Moodboard concept (công cụ) → Quy trình 7 bước + Lịch giao ảnh (công cụ) → Chính sách (cọc, huỷ, dời, thời tiết, giao ảnh, quyền dùng ảnh) → FAQ 12 câu → Đặt lịch.

## (c) Kế hoạch nội dung
data/content.ts (PACKAGES, PROCESS, FAQ viết lại), data/studio.ts mới (FACTS, SERVICES, ADDONS, WARDROBE, STYLE_INFO, POLICIES, SEASONS), Sections.tsx dựng lại, component mới GoldenHour.tsx, DeliveryPlanner.tsx, StyleGallery.tsx; page/layout/meta/Header đổi sang loại hình + khu vực; og-image dựng lại (tests/showroom/thang-mo/og.mjs), không chữ demo/minh hoạ. Ảnh: vẫn 11 ảnh stock, mỗi ảnh một lần trên trang chính, chú thích là "ảnh tham khảo", không nhận là ảnh studio đã chụp; credits.json không đổi.

## (d) Hiệu ứng trước/sau (ma trận: trước 0 thư viện, hiệu ứng đều code riêng; sau: đại trà 2 = ClipReveal, ScrollScrubText; chữ ký thư viện 1 = DraggableGallery)
Bỏ: scrub trôi dọc ba ảnh essay (xoá section), "ảnh đặt xuống" fade-up cho mọi khối (đổi ngôn ngữ).
Ngôn ngữ chuyển động chính: "đặt ảnh xuống bàn": khối vào bằng xoay rất nhẹ quanh mép trên + mờ dần, không trượt lên; hero như mở bìa album (tấm phủ giấy kéo lên). Khác cowork-grid (ô lưới), pet-vui, da-xanh, rong-dam.
Chữ ký:
1. Immersive Album lật trang toàn màn hình (rotateY, spread hai trang) — components/ImmersiveAlbum.tsx (có sẵn, nay mở từ thẻ phong cách).
2. Moodboard dán ảnh + bảng màu + tóm tắt — components/Moodboard.tsx, lib/moodboard.ts (có sẵn).
3. Đồng hồ giờ vàng: chọn mùa + kéo giờ, mặt trời chạy theo cung, nền trời đổi tông, gợi ý ánh sáng — components/GoldenHour.tsx (mới).
4. Lịch giao ảnh: ngày chụp + gói => thanh mốc và ngày nhận ảnh/album — components/DeliveryPlanner.tsx (mới).
5. Hero mở bìa album: tấm phủ giấy kéo lên, H1 trồi từng dòng, ảnh phụ xoay vào — Motion.tsx (có sẵn).
6. DraggableGallery cho danh mục phong cách (thư viện; StyleGallery.tsx chuyển click khi con trỏ bị bắt khi kéo).
