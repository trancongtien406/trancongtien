# Đặc tả từ ChatGPT (rút gọn phần dùng được) · LP-10 Nét Lệch

Nguồn: một lượt trả lời dài của ChatGPT (chat "Đặc tả thi công Nét Lệch", 2026-11-25). Đã đọc đủ tới mục 8.2; phần JSON-LD và checklist cuối bị cắt ở ký tự 50.000 của DOM, phần đó tự viết lại theo AGENT-RULES.

## Dùng nguyên
- Tên NÉT LỆCH — Hair Studio. Slogan "Vẻ đẹp của sự khác biệt". Slogan phụ: KHÔNG CẦN GIỐNG AI. / Mỗi mái tóc, một tuyên ngôn. / Khác biệt không cần giải thích. / CUT. COLOR. CHARACTER.
- Giọng: câu ngắn, động từ mạnh, không cam kết kết quả. Cấm: "Phục hồi 100%", "Salon số 1", "Cam kết không hư tổn".
- Palette: Carbon Black #151515, Editorial Paper #F5F3EE, Concrete #E8E5DC, Acid Lime #D1FA39 (chữ trên lime luôn đen), muted #595954 / #B8B8B0. Bo góc 0, không shadow trang trí.
- Typography: Oswald 700 (display, tracking -0.045em), Archivo (body, label uppercase +0.12em).
- Cấu trúc: Header, Cover, Statement strip (lime), Manifesto, Lookbook, Craft (bảng editorial), Builder, People, Space, Process, FAQ, Final (lime), Footer.
- Hero: đường cắt chéo 14° (độ lệch = chiều cao × tan14° ≈ 24.9%).
- Giá tham khảo: Cắt 250k/45p, Nhuộm 650k/120p, Uốn 750k/150p, Chăm sóc 350k/45p. Hệ số độ dài 1.0/1.2/1.4, phút thêm cắt 0/5/10, dịch vụ khác 0/15/30. Stylist 1.00/1.15/1.30. Làm tròn từng dòng 1.000đ rồi cộng. Nhuộm + Uốn: cảnh báo, vô hiệu preview. Không chọn dịch vụ: preview disabled.
- Ca kiểm chuẩn: Cắt/Ngắn/Stylist 250.000đ 45p; Cắt/Vừa/Stylist 300.000đ 50p; Nhuộm/Dài/Senior 1.047.000đ 150p; Cắt+Nhuộm/Vừa/Stylist 1.080.000đ 185p; Cắt+Chăm sóc/Dài/Senior 966.000đ 130p; Uốn/Dài/Director 1.365.000đ 180p.
- Lọc lookbook: OR trong nhóm, AND giữa nhóm, giữ thứ tự dataset, aria-live số kết quả, dialog chi tiết (Escape, focus trap), CTA "Dùng kiểu này làm cảm hứng" hợp nhất dịch vụ gợi ý vào Builder.
- Preview lịch hẹn: dialog, "Tóm tắt lịch hẹn · chưa xác nhận", ngày/buổi tuỳ chọn, không slot giả, "Sao chép tóm tắt" (clipboard lỗi thì hiện text chọn tay).
- localStorage `nl:builder:v1`, validate khi hydrate.
- Motion: hero 1.5s (mask chéo ảnh, H1 từng dòng trượt lên, slogan, CTA, caption); scroll 1 lookbook contact sheet; scroll 2 closing lime quét chéo; hover chỉ trong hover:hover; reduced-motion hiện trạng thái cuối.
- SEO: noindex, follow; JSON-LD chỉ CreativeWork (hoặc WebPage), không LocalBusiness/Review/Offer.

## Đã đổi so với ChatGPT (và lý do)
- Ảnh: ChatGPT đòi chân dung có mặt (Soft Wolf, French Bob...). AGENT-RULES hạn chế mặt nhận diện, nên 8 kiểu lookbook được đặt lại theo ảnh stock thật có sẵn (gáy, sau lưng, cận tay/dụng cụ). Tên kiểu và nhãn dữ liệu đổi theo ảnh, không giữ mô tả sai ảnh.
- Stylist: không có ảnh chân dung, dùng đồ hoạ chữ/hình học tự vẽ thay vì ảnh người.
- Logo: viewBox 100×100 theo yêu cầu điều phối viên (ChatGPT đề xuất 160×120).
- Có thêm kỹ thuật "Tạo kiểu" (blow-dry) vì ảnh máy sấy.
- ChatGPT nhắc "Nguồn ảnh" ở footer: đã thành trang /credits.
