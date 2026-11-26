# REWORK — Kim Nguyệt (2026-11-25)

## (a) Đề tài trước và sau
Trước: trang "trang sức vàng" lấy công cụ cấu hình (Configurator) làm trung tâm, hero chỉ có khẩu hiệu "Vẻ đẹp lưu dấu thời gian", chỉ có 4 dòng sản phẩm, không có giờ mở cửa, dịch vụ khắc chữ/sửa/thu đổi, chính sách, và tuổi vàng chỉ giải thích 10K/14K/18K.
Sau: website của MỘT tiệm kim hoàn cụ thể ở Quận Hải Châu, Đà Nẵng. Hero nêu loại hình (tiệm kim hoàn), khu vực, đối tượng (cặp đôi chuẩn bị cưới, người tìm quà, người làm lại món vàng cũ), CTA "Đặt làm trang sức" / "Xem danh mục" và 3 sự thật: tuổi vàng 10K–24K, mở 9:00–20:00 mỗi ngày, nhẫn trơn vàng 10K từ 4,0 triệu (tính từ bảng đơn giá tham khảo). Configurator đổi tên thành "Ước tính giá món trang sức", chỉ còn là MỘT section.

## (b) Section thật của ngành
Hero · Dải thông tin · Về tiệm (3 nhóm khách) · Danh mục 5 nhóm (nhẫn cưới & đính hôn, dây chuyền & mặt dây, bông tai, lắc & vòng, theo yêu cầu; giá "từ") · Nhẫn xoay 3D · Tuổi vàng 10K/14K/18K/24K · Cách tính giá (công thức, 3 bảng: đơn giá theo tuổi vàng, công theo nhóm, đá; cân tiểu ly) · Ước tính giá (Configurator) · Dịch vụ (thiết kế theo yêu cầu, khắc chữ, sửa chữa/đánh bóng/nới size, thu đổi; xem thử khắc chữ; thước nới size) · Quy trình đặt làm 5 bước (đường kẻ vàng) · Bảo quản & bảo hành & chính sách (bảo hành, đặt cọc, thu đổi, phiếu) · Giờ mở cửa (bảng đèn) · FAQ 9 câu · Đặt làm & liên hệ · Footer.

## (c) Kế hoạch nội dung
data/content.ts viết lại (ABOUT, PRODUCTS 4 nhóm + CUSTOM, SERVICES, STEPS 5 bước, KARATS +24K, POLICIES, HOURS, FAQ 9 câu); pricing.ts chỉ xuất thêm LABOR_BASE, PURITY_24K. Đơn giá vàng 24K tham khảo 4.000.000 ₫/g, người dùng nhập được, nói rõ KHÔNG phải giá thời gian thực. Không bịa chứng thư, viện kiểm định, tên người, số khách/năm kinh nghiệm; liên hệ `.example`, `0236 000 0000`; bảo hành/thu đổi viết điều kiện chung.

## (d) Hiệu ứng trước/sau (node scripts/showroom-effects-matrix.mjs kim-hoan)
Trước: đại trà 6/2 (SplitWords, ParallaxLayer, ScrollScrubText, VelocityMarquee, SVGPathDraw, ScrollProgress) + chữ ký thư viện Counter, CustomCursor, ShineSweep, GrainOverlay, NumberTicker.
Sau: đại trà 2/2 (SVGPathDraw, ScrollProgress) + chữ ký thư viện Counter, CustomCursor, ShineSweep, GrainOverlay, NumberTicker.
Bỏ: SplitWords (h2), ParallaxLayer (nền giới thiệu, liên hệ), ScrollScrubText (tuyên ngôn), VelocityMarquee (dải chữ, thay bằng dải thông tin tĩnh), parallax ảnh sản phẩm, fade-up `rise`.
Chữ ký riêng (code của landing, không dùng ở landing khác):
1. Hộp trang sức mở nắp (Intro.tsx + CSS): mở đầu trang 1,15s.
2. Nhẫn xoay 3D bằng 40 mảnh CSS (Ring3D.tsx).
3. Ánh vàng theo con trỏ GoldGlare (Glare.tsx) và chữ ánh kim GoldShimmer (Shimmer.tsx), lấp lánh đá GemSparkle (Sparkle.tsx, canvas).
4. Cân tiểu ly (Scale.tsx): kéo trọng lượng, đòn cân lắc rồi cân bằng, quả cân 10/5/2/1/0,5 g tách theo trọng lượng, tiền vàng + công tính theo đơn giá nhập được.
5. Khắc chữ (Engrave.tsx): dải mặt trong nhẫn trải phẳng, từng chữ được khắc lần lượt kèm đầu mũi khắc chạy theo.
6. Thước nới/thu size (SizeGauge.tsx): hai vòng chồng nhau, nét đứt cỡ hiện tại, vàng cỡ muốn đổi, kết luận nới/thu và chu vi thêm/bớt.
7. Bảng đèn giờ mở cửa (OpenSign.tsx): đèn vàng bật khi đang mở (giờ Việt Nam), hàng của hôm nay tô sáng.
8. Đường kẻ vàng quy trình (Motion.tsx): vẽ theo cuộn, thắp từng nút; thanh hàm lượng vàng theo tuổi K kéo dài.
Ngôn ngữ chuyển động chính: ÁNH KIM VÀ TỦ KÍNH. Tiêu đề được dải ánh kim quét từ trái sang phải (clip-path + sáng chói rồi dịu); ảnh sản phẩm "mở tủ kính" từ giữa ra hai bên; khối nội dung sáng dần như bật đèn tủ kính (không trượt, không fade-up stagger). Khác bar-mai-thuong (neon nhấp nháy) và các trang tối khác.
