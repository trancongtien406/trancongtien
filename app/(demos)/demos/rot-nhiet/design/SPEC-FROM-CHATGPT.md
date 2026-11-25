# Đặc tả từ ChatGPT (rút gọn phần đã dùng) - LP-04 Rót Nhiệt Coffee

Nguồn: một đoạn chat riêng (tab riêng) trả lời prompt mẫu trong `docs/showroom/CHATGPT-SPEC-PROMPT.md`, điền ID LP-04 / cafe / `/demos/rot-nhiet`. ChatGPT trả bản "Implementation Specification V1.0" gồm 20 mục; dưới đây chỉ giữ phần đã dùng và ghi rõ chỗ KHÔNG theo.

## Đã dùng
- Thương hiệu: RÓT NHIỆT COFFEE (ROT NHIET COFFEE ROASTERS). Slogan "Rang thật. Vị thật. Nhiệt thật."; hero "RÓT NHIỆT." + "Đánh thức vị giác."; câu chuyện 120 chữ (dùng nguyên văn ở section Manifesto).
- Palette: Paper #F8F5ED, Heat Red #E33C29, Ink #1D1D1B, Print Gray #D8D3C8, error #A82519. Quy tắc AA: chữ đỏ chỉ cho tiêu đề lớn; nút chính nền Ink chữ Paper; chữ nhỏ trên nền đỏ phải nằm trong khối Paper/Ink.
- Logo: symbol 128x128 = khung đỏ + tách + tia nhiệt 7 đỉnh + đường đế; wordmark dựng bằng path; biến thể primary/horizontal/symbol/mono/reversed/favicon.
- Section: Header, Kinetic Poster Hero, Heat Strip (trôi theo cuộn), Interactive Menu, Coffee Selector (nền đỏ), Beans (3 hồ sơ B01-B03), From Bean To Cup (4 bước), Manifesto (nền Ink), FAQ 8 câu (mọi câu đóng, chỉ mở 1), Final poster + Footer.
- Menu: 12 món gốc M01-M12 + 6 món bổ sung M13-M18 (đủ 18 món, chia hết lưới 3 cột). Lọc 4 nhóm AND, thứ tự sortOrder; khay: `lineKey = productId:temperature`, tối đa 9 ly/dòng, 30 ly/khay, localStorage `rn:tray:v1` (chỉ lưu id/nhiệt độ/số lượng, tính giá lại từ catalog), drawer là dialog modal, làm trống có xác nhận, hoàn tất KHÔNG tạo đơn.
- Motion: "Living Poster" - hero choreography ngắn (<1.4s), Heat Strip trôi theo cuộn (scroll moment 1), Manifesto sáng dần theo từng từ (scroll moment 2), tem đóng dấu; reduced-motion tắt hết, nội dung hiện đủ.
- Copy tiếng Việt: dùng phần lớn nguyên văn (hero, menu, selector, FAQ, footer), có chỉnh nhẹ.

## Không theo / thay đổi có chủ ý
- Spec để font Anybody wdth 100; thực tế dùng wdth 82 (chữ poster chặt hơn) và line-height >= 1.1 (spec ghi 0.95 nhưng AGENT-RULES yêu cầu >= 1.1 và dấu tiếng Việt cần chỗ).
- Spec dùng Coffee Selector 3 câu (vị / thói quen / dụng cụ) với ma trận F/H/T. Bản làm: 3 câu (vị / cách pha quen dùng gồm Phin, Máy espresso, Pour-over, Cold Brew / thêm gì: đen, sữa, ngọt dịu) cùng ý tưởng cộng điểm cố định, hoà điểm ưu tiên câu 1; xem `data/selector.ts`. Lý do: câu "dụng cụ" của spec có đáp án "chưa có dụng cụ" khó ánh xạ sang cách pha minh hoạ.
- Spec nói "không có nút Thêm vào khay cho hạt" - giữ nguyên (hạt không có nút mua).
- Spec gợi ý trang Credits link "Về Portfolio": bỏ, thay bằng nút "Làm web như thế này" trỏ `buildConsultHref('rot-nhiet')` (đúng AGENT-RULES, link thoát phải đi qua hàm này).
- Spec thêm demo notice riêng cao 32px: bỏ, vì layout chung `/demos` đã có `DemoNotice`; nhãn "Demo · thương hiệu minh hoạ" vẫn nằm ở thanh meta hero và footer.
- Spec nói "dùng @gsap/react": repo chỉ có `gsap`, dùng `gsap.matchMedia()` + cleanup.
- Giả định của ChatGPT về repo (Tailwind, route, v.v.) không dùng; đã đối chiếu thực tế repo.
