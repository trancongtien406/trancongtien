# REWORK (2026-11-25) — Rót Nhiệt Coffee Roasters

## (a) Đánh giá đề tài
Trước: áp phích thương hiệu + công cụ (menu/khay/selector); thiếu giờ mở cửa, không gian quán, bán buôn/quà, nguồn hạt; nút "Làm web như thế này" lộ vai demo. Sau: quán cà phê rang xay ở Quận Sơn Trà, Đà Nẵng: uống tại quán, mua hạt 250g, bán buôn từ 5 kg, hộp quà.
## (b) Section thật của ngành
Hero (loại hình, khu vực, 3 sự thật) → dải thông tin → Menu 18 món + khay → Tìm gu → Hạt mang về → Độ rang → Từ hạt đến ly (nguồn hạt mức vùng, không nhãn nông trại/chứng nhận) → Bấm giờ pha → Quán + giờ mở cửa → Về quán → Bán buôn & quà tặng → FAQ 8 → liên hệ.
## (c) Kế hoạch nội dung
data/shop.ts (giờ, khu vực quán, bán buôn, quà), data/faq.ts viết lại; thêm RoastDial, BrewTimer, Grinder, Space, Wholesale.
## (d) Hiệu ứng trước/sau (ma trận: thư viện 0 → VM, MB, Odometer, ShineSweep)
Giữ đại trà: VelocityMarquee (dải giờ/giá), MagneticButton (CTA hero). Bỏ: dải scrub tự viết, manifesto sáng dần từng từ. Chữ ký: chọn độ rang đổi hạt (Odometer nhiệt độ), đồng hồ pha chạy thật (bình nước/cà phê dâng), máy xay theo cuộn (lưỡi quay, bột rơi, cốc đầy), trạng thái đang mở/đóng theo giờ VN + sơ đồ quán tương tác, ShineSweep trên hộp quà. Ngôn ngữ chuyển động: "rót" (chữ rơi như giọt, khối được rót xuống bằng clip-path từ mép trên, hover nhiệt dâng từ đáy thẻ).
Còn yếu: og-image.webp cũ còn nhãn "DEMO"; chưa chụp lại ảnh credits.
