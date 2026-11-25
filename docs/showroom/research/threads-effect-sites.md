# Hiệu ứng web được chia sẻ nhiều - thư viện công thức cho 20 landing ngành nghề

Ngày nghiên cứu: 2026-11-25. Chỉ ĐỌC. Không like/follow/bình luận/đăng, không đăng nhập, không tải tệp.

## 0. CẢNH BÁO QUAN TRỌNG (đọc trước)

1. **Threads đã YÊU CẦU ĐĂNG NHẬP** trong trình duyệt tích hợp (trang tìm kiếm chỉ hiện nút "Log in", không có bài nào). Theo quy tắc, tôi KHÔNG nhập mật khẩu và dừng PHẦN 1. Vì vậy **mục (1) KHÔNG phải bảng bài Threads**; không có handle, like, trả lời nào được ghi, và tôi không bịa số liệu "độ phổ biến" của Threads. Dữ liệu Threads cũ nằm ở `04-threads-showcase-table.md` (phiên khác đã đăng nhập).
2. Thay thế theo yêu cầu: dùng nguồn công khai - **Awwwards (Sites of the Day, danh mục Food & Drink)** làm "bảng bài được cộng đồng chia sẻ/tôn vinh", rồi phân tích kỹ 16 trang.
3. Cách phân tích kỹ thuật: Chrome headless (Playwright) mở từng trang ở 1440x900, cuộn bằng bánh xe chuột (để Lenis/virtual scroll chạy), chụp 5-6 khung, rồi (a) kiểm tra biến toàn cục (gsap, Lenis, THREE...), (b) đếm thuộc tính CSS trong stylesheet, (c) tìm dấu vết thư viện trong các tệp JS tải về. Đây là kiểm tra CHỈ ĐỌC; không sao chép mã/tài nguyên/văn bản. Ảnh trong `shots/` là ảnh chụp màn hình dùng để nghiên cứu nội bộ, không đưa lên sản phẩm.
4. **Độ tin cậy.** Dấu vết thư viện lấy bằng regex trên bundle nên có thể dương tính giả: "SplitText/tách chữ" (15/16 trang) và "WebGPU" (5/16) khá lỏng; `gsap`, `Lenis`, `three` đáng tin hơn (được xác nhận qua biến toàn cục hoặc class `lenis` trên `<html>` ở nhiều trang). Phần "cách hoạt động" là SUY LUẬN của tôi từ ảnh chụp + dấu vết kỹ thuật + mô tả của Awwwards; không phải đọc mã nguồn trang. Cần mở trang tự xem chuyển động khi triển khai thật.
5. Môi trường headless dùng WebGL phần mềm (swiftshader) nên khung 3D/hiệu năng thật trên máy người dùng có thể khác.

---

## (1) Bảng "bài được chia sẻ" - NGUỒN THAY THẾ (Awwwards, không phải Threads)

Mức phổ biến = ngày được chọn Site of the Day (SOTD) hoặc có trong danh mục Food & Drink trang 1 (Awwwards không hiển thị like công khai trong danh sách tôi đọc). Cột "Đã phân tích" = có hồ sơ ở mục (2). Mô tả bằng lời của tôi dựa trên mô tả/ảnh.

| # | Trang | Tác giả/agency (công khai) | Mô tả ngắn | URL | Phổ biến | Đã phân tích |
|---|---|---|---|---|---|---|
| 1 | Two26 Studio | ZzStudio | Studio branding, chữ lớn cam + nhân vật minh hoạ, chữ sáng dần | https://two26.studio/ | SOTD 24/11/2026 | P16 |
| 2 | La boite à slides | Sparkk | Agency PowerPoint, 3D kính + nền đổi màu | https://laboiteaslides.fr/ | SOTD 23/11 | P11 |
| 3 | Artemii Lebedev | Artemii Lebedev | Trang studio nổi tiếng | (tên + awwwards.com/sites/artemii-lebedev-1) | SOTD 22/11 | - |
| 4 | Night Drive / Threejs-Punk Drive | Anderson Mancini Santos | Game đua xe WebGPU/Three.js | https://www.threejspunk.com/ | SOTD 21/11 | P14 |
| 5 | 197 Historias Ilustradas | ++hellohello | Không gian tưởng niệm, chân dung dạng đám mây | https://www.197historiasilustradas.com/en | SOTD 20/11 | P12 |
| 6 | Carter Ogunsola | Carter Ogunsola | Portfolio cá nhân | https://www.carterogunsola.com (đã có ở 04) | SOTD 19/11 | - |
| 7 | PSP Production | Lynksen | Hãng sản xuất | awwwards.com/sites/psp-production | SOTD 18/11 | - |
| 8 | Sweet Tape | bikebear | Băng dính "có tình cảm", bán hàng | https://sweet-tape.com/ | SOTD 17/11 | (đã có ở 04) |
| 9 | Bulletproof | Bulletproof | Agency thương hiệu | awwwards.com/sites/bulletproof | SOTD 16/11 | - |
| 10 | SANTAL | The First The Last | Kiến trúc | https://santalarch.com | SOTD 15/11 | (đã có ở 04) |
| 11 | Preymaker | DashDigital | Trang sản phẩm/game | awwwards.com/sites/preymaker | SOTD 14/11 | - |
| 12 | Delta Cafés | Bürocratik | Thương hiệu cà phê | https://deltacafes.com | SOTD 13/11 | (đã có ở 03/04) |
| 13 | AUGE Experience | AUGE | Studio trải nghiệm số | awwwards.com/sites/auge-experience | SOTD 12/11 | - |
| 14 | Cyera AI Guardian | Active Theory | Sản phẩm AI, 3D | awwwards.com/sites/cyera-ai-guardian | SOTD 11/11 | - |
| 15 | Creative Reference Library | Bimo Tri | Thư viện tham chiếu | awwwards.com/sites/creative-reference-library | SOTD 10/11 | - |
| 16 | ZIRKA Interceptor | Qream | Trang sản phẩm 3D | awwwards.com/sites/zirka-interceptor | SOTD 09/11 | - |
| 17 | Extrafazant | Dylan Brouwer | Portfolio | https://extrafazant.nl | SOTD 08/11 | (đã có ở 04) |
| 18 | Justin Jefferson | LayerTwo | Trang vận động viên | awwwards.com/sites/justin-jefferson | SOTD 07/11 | - |
| 19 | ViV | Sam Dallyn | Quản lý nghệ sĩ + sản xuất ảnh, bố cục collage | https://vivmgmt.com/ | SOTD 06/11 | P13 |
| 20 | Agrumea Farm | Studio K95 | Mứt/pesto Sicilia, băng chuyền lọ 3D | https://www.agrumeafarm.it/en | SOTD 05/11 + Food&Drink | P1 |
| 21 | Grail | denormalized | Sản phẩm số | awwwards.com/sites/grail | SOTD 04/11 | - |
| 22 | DeepBook | HOLOGRAPHIK | Sản phẩm tài chính/crypto | awwwards.com/sites/deepbook | SOTD 03/11 | - |
| 23 | Grids | Obys | Thí nghiệm lưới/bố cục | https://grids03.obys.agency/ | SOTD 02/11 | thử mở: 403, bỏ |
| 24 | Dont Look up game | Marcelo Reis Melo | Game | awwwards.com/sites/dont-look-up-game | SOTD 01/11 | - |
| 25 | MECHA | widelab.co | Tự động hoá công nghiệp | https://mecha-xyz.webflow.io/ | SOTD 31/10 | - |
| 26 | Spyker Cars | The Brink Agency | Siêu xe, "một ngày sở hữu" điện ảnh | https://spykercars.com/ | SOTD 30/10 | P2 |
| 27 | Unbelievably Crap | Liubomyr Ulytskyi | Portfolio HUD/dithering 3D | https://www.unbelievablycrap.com/ | SOTD 29/10 | P15 |
| 28 | G. Colombel Portfolio | Guillaume Colombel | Portfolio | awwwards.com/sites/g-colombel-portfolio-2026 | SOTD 28/10 | - |
| 29 | Awards Racing | Angelica P. | Trò chơi/đua | awwwards.com/sites/awards-racing | SOTD 27/10 | - |
| 30 | A24 (concept) | Ravi Klaassens | Phim A24 dạng đĩa 3D | https://a24.raviklaassens.com/ | SOTD 26/10 | P7 |
| 31 | Forge Automotive | 12 Studio | Atelier xe tuỳ chỉnh | https://forgeautomotive.co.uk/ | SOTD 25/10 | P8 |
| 32 | Thunderbuns | Studio Kogel | Chuỗi burger, đường viền răng cưa + tia sét | https://thunder-buns.com/ | Food&Drink | P3 |
| 33 | PHIN PHIN | Helena Dang | Quán cà phê Sài Gòn bịa: nhỏ giọt, khuấy, đá ghế | https://phin.helenadang.work/ | Food&Drink | P4 |
| 34 | King River Wagyu | The Start | Bò wagyu Úc, đỏ-đen, hộp 3D | https://kingriver.com.au/ | Food&Drink | P5 |
| 35 | The Candy Vault | Olya Black | Cửa hàng kẹo (Wix), chữ cong + khối hình | https://www.thecandyvault.com.au/ | Food&Drink | P6 |
| 36 | Dialed Coffee | OFF+BRAND | Cold brew chức năng, lon 3D + đổi màu | https://www.dialedcoffee.com/ | Food&Drink | P9 |
| 37 | Hozon | AEStudio | Landing app dưa muối, chữ lớn + lát dưa + bong bóng | https://aestudio.studio/hozon | Food&Drink | P10 |
| 38 | Stone Groove Spirits | stonegroove | Whiskey "âm nhạc", cổng 21+ | https://stonegroovespirits.com/ | Food&Drink | bị chặn cổng tuổi, không phân tích |
| 39 | Le Delizie Del Tartufo, Dialed, Moonshiners, Netties Bees, Hozon, Impasto Forno Antico, Siglitos, TÒPAS, Carnilove, Lajoya... | nhiều | Bao bì/ẩm thực | awwwards.com/websites/food-drink/ | Food&Drink | chỉ ghi tên |

Ghi chú: không có số like/trả lời Threads nào (xem mục 0). Danh sách còn thiếu so với mục tiêu 30-50 vì tôi dồn thời gian cho phần phân tích; ~38 mục ở trên đủ làm nguồn.

---

## (2) 16 HỒ SƠ PHÂN TÍCH TRANG

Quy ước: Độ khó 1-5. Hiệu năng: Nhẹ / Vừa / Nặng. "Phát hiện" = từ biến toàn cục/CSS/bundle (xem cảnh báo độ tin cậy). Ảnh: `shots/<slug>-N.jpg`.

### P1. Agrumea Farm - băng chuyền lọ nghiêng + chữ chạy theo vòng cung
- Nguồn: https://www.agrumeafarm.it/en | ảnh: `shots/agrumea-1..5.jpg`
- Phát hiện: gsap + ScrollTrigger + Lenis (class `lenis` trên html), three.js, canvas x10, Nuxt, View Transitions; mask 24, backdrop-filter, @property, reduced-motion 12 chỗ. Chiều cao trang = 900px (cuộn ảo, không có cuộn tài liệu).
- Cảm giác: tươi, ngon, thủ công; sản phẩm như "treo" quay quanh.
- Cách hoạt động (suy luận): cuộn/vuốt không tạo cuộn trang mà xoay một băng chuyền; các lọ 3D xếp theo cung tròn, lọ ở giữa rõ nét, hai bên nghiêng + mờ (depth of field giả). Dòng chữ chạy theo đường cong lớn phía sau. Con trỏ có nhãn "Discover the product".
- Tự cài: băng chuyền bằng GSAP: mỗi item có `rotation` và `x/y` theo công thức vòng cung theo biến `progress`, `filter: blur()` tăng theo khoảng cách tới tâm; wheel/drag cập nhật progress qua `gsap.quickTo`; chữ cong dùng SVG `<textPath>` + animate `startOffset`.
- Kích hoạt: cuộn ảo/vuốt/kéo. Độ khó 4. Hiệu năng: Vừa-Nặng (nhiều canvas).
- Hợp ngành: tiệm bánh, tiệm hoa, trang sức vàng, wine bar (bộ sưu tập sản phẩm 5-8 món).
- Rủi ro: trang không cuộn thật nên mất cuộn tự nhiên/anchor/SEO nếu làm toàn trang - chỉ dùng cho 1 section; reduced-motion phải hiện lưới tĩnh; chữ tiếng Việt trên textPath cần kiểm tra dấu (font Latin-ext).

### P2. Spyker Cars - cuộn điện ảnh với ảnh lệch nhịp
- Nguồn: https://spykercars.com/ | ảnh: `shots/spyker-1..6.jpg` (đã bấm "Decline" cookie)
- Phát hiện: gsap + ScrollTrigger + Lenis (`lenis-autoToggle`), Next.js, Lottie, Draggable; clip-path 8, perspective, sticky 3, `@property` 91 (rất nhiều biến CSS đăng ký), video 5; trang cao ~9500px.
- Cảm giác: sang, chậm, như quảng cáo xe hơi.
- Cách hoạt động: hero video toàn màn hình với tiêu đề; các ảnh dọc/ngang xếp lệch trong bố cục tạp chí và trôi với tốc độ khác nhau (parallax chênh tốc); khối video có nút play chữ nhật trắng; ảnh khung trắng chồng lên ảnh nền (layer chồng). Footer chuyển sang menu chữ lớn.
- Tự cài: parallax qua `ScrollTrigger` + `y` khác nhau cho từng `data-speed`; Lenis `lerp` thấp (0.08) để mượt; video `autoplay muted playsinline`.
- Kích hoạt: cuộn. Độ khó 3. Hiệu năng: Vừa (video nặng).
- Hợp ngành: thuê xe máy phượt, car detailing, glamping, chủ đầu tư căn hộ ven biển.
- Rủi ro: video autoplay trên mobile/tiết kiệm dữ liệu; banner cookie che nội dung đầu; cần poster ảnh và tắt parallax khi reduced-motion.

### P3. Thunderbuns - viền răng cưa, tia sét, thẻ nghiêng, chạy chữ
- Nguồn: https://thunder-buns.com/ | ảnh: `shots/thunderbuns-1..6.jpg`
- Phát hiện: gsap + ScrollTrigger + Lenis, three.js (canvas x2), SVG 192 phần tử, clip-path 15, mask 32, view-transition 12, scroll-snap 9, `scroll-timeline` 3, perspective 6, text-stroke 3; reduced-motion 22.
- Cảm giác: ồn ào, vui, thương hiệu đồ ăn nhanh; xanh chanh - đen xanh rêu - hồng.
- Cách hoạt động: (1) dải chữ chạy ngang (marquee) mảnh ở mép trên; (2) các đường viền đáy section dạng răng cưa (zigzag) thay cho đường thẳng; (3) tia sét nét xanh vẽ rải rác bằng SVG, thấy nhấp nháy/lệch khi cuộn; (4) nhóm ảnh thẻ bo góc nghiêng nhẹ, xòe như quạt; (5) thẻ sản phẩm bánh chạy ngang (scroll-snap); (6) ảnh lưới người dùng với tia lấp lánh. Có chuyển trang.
- Tự cài: viền răng cưa = `clip-path: polygon(...)` lặp bằng `mask` SVG; thẻ xòe quạt = `rotate` tăng dần + `gsap.from` stagger; tia sét SVG `stroke-dashoffset`.
- Kích hoạt: cuộn + hover + tự chạy. Độ khó 3. Hiệu năng: Vừa.
- Hợp ngành: tiệm bánh ngọt, pet spa, nail studio, trung tâm ngoại ngữ (thương hiệu trẻ), thuê xe máy.
- Rủi ro: nhiều SVG -> nặng DOM; hiệu ứng "ồn" khó hợp ngành cao cấp; marquee cần `prefers-reduced-motion` dừng.

### P4. PHIN PHIN - câu chuyện cà phê Sài Gòn có tương tác (rất gần bối cảnh Việt Nam)
- Nguồn: https://phin.helenadang.work/ | ảnh: `shots/phin-1..6.jpg`
- Phát hiện: gsap + ScrollTrigger + Lenis, three.js + canvas x3, `animation-timeline` 2, feTurbulence (bộ lọc SVG tạo nhiễu/rung), text-stroke 3, sticky; class html: `has-3d`, `pin-brew`, `has-stir`, `has-soak`, `has-spin`; nút "Sound off".
- Cảm giác: hoài cổ, vui, đầy cá tính; mỗi section đổi hẳn màu nền (vàng - xanh dịu - đỏ - xanh dương).
- Cách hoạt động: mỗi "cảnh" ghim (pin) một bước pha cà phê: hạt nhỏ giọt, đồng hồ đếm 4:00 chạy theo cuộn, cuộn đến cảnh khuấy thì KÉO chuột để khuấy muỗng (drag-to-interact), chọn món bằng thẻ có dấu "PICKED", cuối cùng bấm "Knock 'em over" làm ghế đổ (vật lý nhẹ). Nền đổi màu theo section.
- Tự cài: `ScrollTrigger` pin + `scrub`, `gsap.utils.interpolate` cho màu nền; kéo bằng Pointer Events (không cần thư viện); ghế đổ có thể dùng CSS `rotate` + `gsap` (không cần vật lý thật).
- Kích hoạt: cuộn + kéo + bấm. Độ khó 4. Hiệu năng: Vừa.
- Hợp ngành: nhà trà (pha trà từng bước), tiệm bánh, quán rooftop bar cocktail (lắc/đổ), xưởng gốm (nặn bằng kéo), pet spa.
- Rủi ro: cần chế độ "không tương tác" cho mobile; âm thanh phải tắt mặc định; chữ lớn Latin-ext của font display phải hỗ trợ dấu tiếng Việt (trang này lấy chủ đề Việt nên có thể có - cần kiểm).

### P5. King River Wagyu - sang trọng đỏ-đen, hộp 3D, chữ footer mờ rồi nét
- Nguồn: https://kingriver.com.au/ | ảnh: `shots/kingriver-1..6.jpg`
- Phát hiện: gsap + ScrollTrigger + Lenis, three.js + dấu vết postprocessing/pixi, swup (chuyển trang), canvas x2, video x5, sticky 5, scroll-snap, `animation-timeline` 1, reduced-motion 25.
- Cảm giác: trang trọng, điện ảnh, ấm.
- Cách hoạt động: hero video phong cảnh; section sản phẩm có hộp thịt 3D trôi/quay trên nền đỏ sẫm; tiêu đề chữ hoa serif; khối tin tức dạng thẻ; footer chữ "KING RIVER" cực lớn, có chữ bị làm mờ lần lượt rồi nét lại (blur-in từng chữ).
- Tự cài: chữ footer = từng `span` + `gsap.fromTo(filter:blur(20px)->0, opacity)` stagger khi vào khung nhìn; hộp 3D có thể thay bằng ảnh PNG xoay giả bằng sprite hoặc CSS 3D `rotateY`.
- Độ khó 3 (không 3D) / 5 (3D thật). Hiệu năng: Vừa-Nặng.
- Hợp ngành: wine bar, trang sức vàng, recording studio, rooftop bar (tông tối).
- Rủi ro: video + WebGL nặng trên 4G; contrast chữ đỏ trên nền đỏ sẫm có thể không đạt WCAG - phải đo.

### P6. The Candy Vault - Wix vẫn làm được hiệu ứng (khối hình + chữ cong)
- Nguồn: https://www.thecandyvault.com.au/ | ảnh: `shots/candyvault-1..6.jpg`
- Phát hiện: nền tảng Wix; nhiều CSS (clip-path 83, mask 225, mix-blend 30, view-transition 84, sticky), `animation-timeline` 3 (cuộn bằng CSS thuần), reduced-motion 26.
- Cảm giác: ngọt, vui, nhiều khối màu pastel.
- Cách hoạt động: tiêu đề hero chạy theo đường cong chữ "Fancy a sweet ra..." xoay theo cuộn; lưới 6 ô danh mục, mỗi ô là khối hình hữu cơ (blob/hoa/mây) màu pastel, hover ô đổi sang ảnh sản phẩm + nút Shop; thẻ sản phẩm tròn ảnh; thanh "It's Treat Time" với kẹo mút xếp tia.
- Tự cài: ô lưới hover = ảnh `clip-path: circle()` mở rộng; chữ cong bằng SVG textPath. Có thể làm CSS scroll-driven animation thuần (`animation-timeline: view()`).
- Độ khó 2. Hiệu năng: Nhẹ.
- Hợp ngành: tiệm bánh ngọt, tiệm hoa, pet spa, nail studio.
- Rủi ro: `animation-timeline` chưa hỗ trợ đủ ở Safari cũ -> cần fallback; blob hữu cơ nên là SVG nhẹ.

### P7. A24 (concept của Ravi Klaassens) - băng chuyền đĩa 3D
- Nguồn: https://a24.raviklaassens.com/ | ảnh: `shots/a24disc-1..5.jpg` (khung 6 không có)
- Phát hiện: gsap + ScrollTrigger + Lenis, three.js, WebGPU (dấu vết), Webflow, mask 40, scroll-snap 3, canvas x1; trang cao 900px (cuộn ảo).
- Cảm giác: tối giản, ấn tượng sưu tầm, "chạm vào đĩa".
- Cách hoạt động: các đĩa DVD tròn xếp ngang, đĩa được chọn lớn và xoay nghiêng nhẹ theo con trỏ; có nét vẽ tay vòng quanh đĩa đang chọn (một vòng SVG nét bút); thông tin phim thay đổi (chữ bên trái, trích đánh giá phía dưới).
- Tự cài: thay WebGL bằng ảnh tròn `border-radius:50%` + `perspective` + `rotateY` theo vị trí; nét vẽ tay bằng SVG path + `stroke-dashoffset` (không cần plugin trả phí, dùng CSS).
- Độ khó 3 (giả 2.5D) / 5 (3D thật). Hiệu năng: Vừa.
- Hợp ngành: recording studio (đĩa vinyl), xưởng gốm (đĩa/đĩa gốm), wine bar (chai), trang sức.
- Rủi ro: cuộn ảo làm mất cuộn tự nhiên/phím tắt; accessibility (carousel phải có nút trước/sau, focus).

### P8. Forge Automotive - ảnh làm mờ rồi nét, thanh tiến độ, section ghim
- Nguồn: https://forgeautomotive.co.uk/ | ảnh: `shots/forge-1..6.jpg` (bấm "Reject & Enter" ở cổng cookie)
- Phát hiện: gsap + ScrollTrigger + Lenis, Next.js, View Transitions (39 quy tắc), clip-path 15, sticky 14, `@property` 8, text-stroke không; cuộn ảo (900px).
- Cảm giác: "atelier" tối, sang, bóng loáng, chữ serif nhẹ.
- Cách hoạt động: mỗi dịch vụ là một "chương" (Bodystyling, Interior, Wheels, Exhaust...) hiện bằng chữ serif lớn; ảnh bên phải đang mờ nhiều rồi nét dần khi tới (blur-to-sharp), ảnh trượt/đẩy từ cạnh; đường kẻ mảnh ở đáy là thanh tiến độ; chuyển giữa chương bằng View Transitions; nền có hạt nhiễu (grain).
- Tự cài: `filter: blur(24px) -> 0` + `scale(1.08)->1` bằng ScrollTrigger; tiến độ = line `scaleX` theo `scrub`; grain = SVG feTurbulence tĩnh làm `background-image` (đã có R45).
- Độ khó 3. Hiệu năng: Vừa (blur lớn đắt trên mobile).
- Hợp ngành: car detailing, recording studio, trang sức vàng, wine bar.
- Rủi ro: blur lớn tốn GPU - giảm bán kính trên mobile; cuộn ảo như P7.

### P9. Dialed Coffee - lon sản phẩm đổi biến thể + video cuộn + FAQ
- Nguồn: https://www.dialedcoffee.com/ | ảnh: `shots/dialed-1..5.jpg`
- Phát hiện: gsap + ScrollTrigger + Lenis, three.js, canvas x2, Webflow, mix-blend 12, sticky 5; trang ~8000px.
- Cảm giác: năng lượng, sạch, đồ uống hiệu năng cao.
- Cách hoạt động: hero chữ khổng lồ chồng lên lon nổi (chữ nằm sau/trước lon theo lớp), tờ giấy hoá đơn trôi; section biến thể: bấm thumbnail đổi màu lon + nền (đỏ/xanh/tím) có hạt cà phê rơi; section "pour" cuộn để đổ nước vào ly (video/scrub frame); FAQ accordion với chữ mờ dần khi không focus; giỏ hàng nổi.
- Tự cài: đổi biến thể = `gsap.to` đổi CSS variable `--bg` + crossfade ảnh lon; "pour" = chuỗi ảnh/video `currentTime` theo scrub (`video.currentTime = progress*duration`); FAQ = grid 0fr->1fr (R38).
- Độ khó 3. Hiệu năng: Vừa.
- Hợp ngành: skincare studio (chọn sản phẩm), tiệm bánh, quán rooftop bar, nhà trà, wine bar.
- Rủi ro: scrub video cần video keyframe dày (nặng); cần ảnh fallback.

### P10. Hozon - chữ khổng lồ + vật thể cắt rời, bong bóng nổi
- Nguồn: https://aestudio.studio/hozon | ảnh: `shots/hozon-1..6.jpg`
- Phát hiện: không có GSAP/Lenis (làm nhẹ bằng CSS/JS thường), canvas x1, mix-blend 5, mask; trang ~3400px. Trang song ngữ (có nút JA).
- Cảm giác: sạch, tươi, biên tập (editorial), serif nghiêng xen sans.
- Cách hoạt động: wordmark đen khổng lồ nằm GIỮA các lát dưa chuột cắt rời (PNG nền trong) - chữ đi qua phía trước/sau lát dưa nhờ xếp lớp; bong bóng nổi lơ lửng nhẹ (canvas); tiêu đề kiểu "A little time. / A lot of flavour." trộn chữ thẳng và nghiêng; mockup điện thoại; nền chuyển xanh nhạt ở cuối.
- Tự cài: xếp lớp bằng `z-index` hai tầng: chữ ở giữa hai lớp ảnh PNG; bong bóng = vài `div` tròn viền mỏng + CSS `@keyframes float`.
- Độ khó 1-2. Hiệu năng: Nhẹ. **Đây là hiệu ứng "rẻ mà sang" tốt nhất trong danh sách.**
- Hợp ngành: tiệm hoa, skincare studio, nhà trà, tiệm bánh, pet spa.
- Rủi ro: cần ảnh cắt nền chất lượng (PNG/WebP có alpha); chữ Việt có dấu lớn va vào vật thể - test.

### P11. La boite à slides - preloader tím, 3D kính, nền đổi màu theo cuộn
- Nguồn: https://laboiteaslides.fr/ | ảnh: `shots/laboite-1..6.jpg`
- Phát hiện: gsap + ScrollTrigger + Lenis, three.js + postprocessing, Nuxt, Swiper, Draggable, View Transitions, mask 87, perspective 7; cao ~17800px; reduced-motion không có quy tắc nào (0).
- Cảm giác: nghịch, năng động, chữ khổng lồ chạy ngang.
- Cách hoạt động: preloader nền tím với 2 hình tam giác nhỏ xoay; hero là cảnh 3D (mảnh kính trong suốt) nền xanh lá, rồi nền đổi sang xanh dương theo vị trí cuộn; thẻ tình huống khách hàng trượt ngang (ảnh bo góc); băng chữ lớn "DEPUIS 2002 • ISO 90..." chạy ngang (marquee) màu tím.
- Tự cài: đổi nền = ScrollTrigger gắn `onEnter` đổi CSS var `--bg` có `transition`; marquee R23/R24; mảnh kính thay bằng PNG/SVG trong suốt + blur.
- Độ khó 4 (3D) / 2 (đổi nền + marquee). Hiệu năng: Nặng.
- Hợp ngành: trung tâm ngoại ngữ, coworking, trường lướt sóng, lặn biển.
- Rủi ro: không có xử lý reduced-motion (trang này) - đừng học theo; 3D nặng.

### P12. 197 Historias Ilustradas - mở đầu chữ tối giản, chân dung tụ thành đám
- Nguồn: https://www.197historiasilustradas.com/en | ảnh: `shots/historias-1..6.jpg`
- Phát hiện: gsap + ScrollTrigger + Lenis, three.js (drei, WebGPU dấu vết), Next.js, scroll-snap 11, `@property` 38, View Transitions; trang cao 900px (cuộn ảo).
- Cảm giác: trầm, tĩnh, trang trọng; mở đầu chỉ có vài dòng chữ monospace và nút [ SKIP ].
- Cách hoạt động: chuỗi chữ giới thiệu lần lượt hiện/mờ như phụ đề (kịch bản theo cuộn hoặc tự chạy), sau đó đám chân dung nhỏ bay vào thành cụm trong WebGL, có thể khám phá.
- Tự cài: intro "chữ lần lượt" = timeline GSAP đơn giản, có nút Skip và lưu `sessionStorage` để chỉ chạy lần đầu; cụm ảnh = div tuyệt đối + `gsap` ngẫu nhiên.
- Độ khó 2 (intro) / 5 (3D). Hiệu năng: Vừa.
- Hợp ngành: chủ đầu tư căn hộ ven biển (câu chuyện dự án), xưởng gốm, trang sức (kể chuyện).
- Rủi ro: intro dài làm mất khách - luôn có Skip; chữ monospace Latin có thể thiếu dấu Việt.

### P13. ViV - bố cục collage ảnh + footer "màn kéo" xám
- Nguồn: https://vivmgmt.com/ | ảnh: `shots/viv-1..6.jpg`
- Phát hiện: gsap + ScrollTrigger + Lenis (có `swup-enabled`), View Transitions, Draggable (dấu vết), clip-path 3; cuộn ảo? chiều cao tài liệu 900px.
- Cảm giác: biên tập tạp chí, serif nghiêng, trắng sạch.
- Cách hoạt động: logo ViV khổng lồ bị ảnh chồng lên; hàng ảnh xếp so le rất dày theo chiều ngang, có thể kéo/ trượt; khi cuộn xuống, footer xám lộ ra phía sau nội dung (curtain reveal) với chữ ViV cực lớn ở đáy.
- Tự cài: footer curtain = nội dung chính `position:relative; z-index:2` + footer `position:sticky; bottom:0; z-index:1` (R46).
- Độ khó 2. Hiệu năng: Nhẹ.
- Hợp ngành: coworking, recording studio, trang sức, nail studio (lookbook).
- Rủi ro: ảnh chồng nhau ở mobile cần bố cục riêng.

### P14. Threejs-Punk Drive (Night Drive) - game WebGPU nhúng làm trang
- Nguồn: https://www.threejspunk.com/ | ảnh: `shots/threejspunk-1..2.jpg` (chỉ chụp được 2 khung)
- Phát hiện: gsap, three.js + WebGPU + postprocessing + rapier (vật lý), clip-path 68, `@keyframes` 45, canvas x3.
- Không phù hợp để học cho landing ngành (nặng, là game). Ghi nhận như mức trần của công nghệ. Chỉ lấy ý: menu HUD kiểu game, nút bo có clip-path chéo.
- Độ khó 5. Hiệu năng: Rất nặng. Hợp ngành: không dùng (chỉ gym/CrossFit nếu muốn khí chất "arcade", nhưng không khuyến nghị).

### P15. Unbelievably Crap - HUD, hạt chấm (dithering), nhân vật 3D
- Nguồn: https://www.unbelievablycrap.com/ | ảnh: `shots/unbcrap-1..4.jpg`
- Phát hiện: gsap + ScrollTrigger, three.js + ogl + pixi (dấu vết), canvas x11, mix-blend 8, perspective 8, `animation-timeline` 1; Webflow; reduced-motion 10.
- Cảm giác: kỹ thuật, quái, ngôn ngữ giao diện điều khiển.
- Cách hoạt động: nền đen với nhân vật dựng bằng điểm/lưới; chuyển sang nền trắng, hình đầu người trắng với dải chữ danh mục xếp dọc và hai hình chữ nhật đỏ xoay; nền chấm halftone/dithering làm "bản đồ"; thanh dưới có chuyển đổi chế độ.
- Tự cài ý tưởng 2D: halftone = `radial-gradient` lặp + `mask`; HUD = lưới CSS với font mono.
- Độ khó 4. Hiệu năng: Nặng (11 canvas). Hợp ngành: recording studio, gym/CrossFit (khí chất công nghiệp).
- Rủi ro: dễ khó đọc, không thân thiện SEO.

### P16. Two26 Studio - chữ sáng dần + nhãn "nhãn dán" trôi + đường vẽ dịch vụ
- Nguồn: https://two26.studio/ | ảnh: `shots/two26-1..6.jpg`
- Phát hiện: gsap + ScrollTrigger + Lenis (phát hiện qua bundle), MotionPath, Lottie, Webflow, mix-blend 8, will-change 48; video 7; nhiều SVG; nhưng 0 quy tắc reduced-motion trong CSS đọc được.
- Cảm giác: vui, thủ công, nhân vật nét tay + cam đậm.
- Cách hoạt động: (1) đoạn chữ lớn sáng dần từng từ theo cuộn (từ mờ cam nhạt sang đen); (2) các nhãn đen kiểu sticker ("Independent studio", "No funny business") trôi theo con trỏ/ngẫu nhiên đè lên chữ; (3) đường nét cam uốn lượn nối 5 dịch vụ (Brand identity, Web design, Illustration, Motion design...) được "vẽ" dần theo cuộn, mỗi nút dịch vụ có bong bóng mô tả; (4) lưới dự án thẻ bo góc.
- Tự cài: (1) R19 word highlight; (2) sticker = `div` tuyệt đối + `gsap.to` x/y/rotation ngẫu nhiên; (3) SVG path + `stroke-dasharray` + ScrollTrigger scrub, các nút ở vị trí `getPointAtLength`.
- Độ khó 3. Hiệu năng: Nhẹ-Vừa.
- Hợp ngành: trung tâm ngoại ngữ (lộ trình học vẽ đường), coworking, pet spa, nail studio, tiệm bánh (quy trình).
- Rủi ro: thiếu reduced-motion (không học theo); sticker che chữ gây khó đọc - giữ contrast; đường nét cần responsive viewBox.

---

## (3) HIỆU ỨNG LẶP LẠI NHIỀU NHẤT (xếp hạng, dựa trên 16 trang + danh sách Awwwards)

Số trong ngoặc là số trang trong mẫu 16 trang có dấu hiệu (độ tin cậy trung bình).

1. **GSAP + ScrollTrigger làm bộ máy chính** (15/16). Gần như mọi trang. Có sẵn công thức R02.
2. **Cuộn mượt Lenis** (13/16 phát hiện, 8 có class `lenis` trên html). Công thức R02.
3. **Hiện chữ theo dòng/từ/chữ (split text reveal, mask)** (~15/16 theo dấu vết, nhưng lỏng). Công thức R17/R18/R19.
4. **Sticky/pin chương theo cuộn** (13/16 có `position: sticky`). Công thức R27/R25.
5. **Mask + clip-path làm cửa sổ ảnh, viền răng cưa, bo hình** (15/16 có mask hoặc clip-path). Công thức R28.
6. **Cuộn ảo / không có cuộn tài liệu (900px) cho băng chuyền** (5/16: Agrumea, A24, Forge, Historias, Viv) - xu hướng mới, nhưng nguy cơ SEO/accessibility.
7. **Canvas WebGL / three.js** (10/16 có canvas; 10/16 có dấu vết three). Thường chỉ dùng cho MỘT vật thể hero.
8. **Đổi màu nền theo section/biến thể** (Phin Phin, La boite, Dialed, Hozon, Candy Vault).
9. **Marquee chữ/ảnh** (Thunderbuns, La boite, King River). R23/R24.
10. **Chuyển trang (swup/barba/View Transitions)** (6/16 có View Transitions, 2 có swup). R34.
11. **Parallax chênh tốc cho ảnh** (Spyker, ViV, Forge). R29.
12. **Blur-to-sharp / mờ vào** (Forge, King River footer). R18.
13. **Footer chữ cực lớn + curtain reveal** (ViV, King River, Two26 gợi ý). R46.
14. **Đường SVG "vẽ" theo cuộn** (Two26, Phin Phin nét, A24 vòng bút). Mới so với 05 (xem công thức mới ở mục 3b).
15. **Tương tác kéo/bấm lồng vào cuộn** (Phin Phin khuấy, Dialed đổi lon). Mới.
16. **mix-blend-mode** (12/16) và **backdrop-filter** (12/16) - phụ trợ, ít là điểm nhấn.
17. **Hạt nhiễu (grain)** (Forge, nhiều trang tối). R45.
18. **CSS scroll-driven animation (`animation-timeline`)** (4/16: Phin Phin, Candy Vault, Thunderbuns (scroll-timeline), A24/Unbcrap) - đang tăng, nên dùng có fallback.

**Quan sát chất lượng.** 4/16 trang không có quy tắc reduced-motion trong CSS đọc được (Dialed, Two26, La boite, Viv). Đó là điều KHÔNG nên bắt chước.

### (3b) Công thức MỚI so với 48 công thức R01-R48 (ý tưởng; tự cài bằng API thường)

- **N01. Băng chuyền cung tròn có depth-blur (từ P1).** Vị trí item theo `progress` trên cung; item xa mờ + nghiêng. gsap.quickTo + wheel/drag. Khó 4, Vừa.
- **N02. Chữ chạy theo đường cong (textPath) quay theo cuộn (P1, P6).** SVG textPath + animate `startOffset`. Khó 2, Nhẹ.
- **N03. Viền răng cưa/zigzag giữa section (P3).** `clip-path: polygon` hoặc `mask` lặp; đổi màu nền hai bên. Khó 2, Nhẹ.
- **N04. Thẻ ảnh xòe quạt (P3).** Mỗi thẻ `rotate` tăng dần + `y`; hover nâng. Khó 1, Nhẹ.
- **N05. Đường SVG vẽ theo cuộn nối các bước dịch vụ (P16).** `stroke-dashoffset` + nút ở `getPointAtLength`. Khó 3, Nhẹ.
- **N06. Sticker trôi đè chữ (P16).** div tuyệt đối + gsap ngẫu nhiên. Khó 1, Nhẹ.
- **N07. Cảnh ghim theo bước thao tác (pha cà phê, khuấy) (P4).** ScrollTrigger pin + scrub, thao tác kéo = Pointer Events. Khó 4, Vừa.
- **N08. Đổi nền toàn trang theo section (P4, P11).** onEnter đổi CSS var `--bg` có transition 600ms. Khó 1, Nhẹ.
- **N09. Chữ wordmark kẹp giữa hai lớp ảnh cắt rời (P10).** Hai tầng z-index; lát/ảnh PNG alpha. Khó 1-2, Nhẹ.
- **N10. Blur-to-sharp ảnh khi vào khung (P8).** `filter blur->0` + scale. Khó 2, Vừa.
- **N11. Chọn biến thể sản phẩm đổi màu nền + ảnh (P9).** Crossfade + `--bg`. Khó 2, Nhẹ.
- **N12. Scrub video theo cuộn (đổ nước) (P9).** `video.currentTime` theo progress; cần video keyframe dày. Khó 3, Vừa.
- **N13. Cuộn ảo 900px cho một section băng chuyền (P1, P7, P8, P12).** Chặn wheel trong khung, giữ cuộn trang bình thường ngoài khung. Khó 3, Vừa.
- **N14. Intro chữ lần lượt có nút Skip (P12).** Timeline GSAP, `sessionStorage` chỉ chạy lần đầu. Khó 1, Nhẹ.
- **N15. Nét vẽ tay quanh mục đang chọn (P7).** SVG path nét bút + dashoffset. Khó 2, Nhẹ.
- **N16. Halftone/dither bằng CSS (P15).** radial-gradient lặp + mask. Khó 2, Nhẹ.

---

## (4) GỢI Ý GHÉP HIỆU ỨNG ↔ NGÀNH (20 ngành)

Mã: R## = công thức ở `05-deepdive-c-motion-recipes.md`; N## = công thức mới mục 3b; P## = hồ sơ trang. Mỗi ngành 5 hiệu ứng; cố ý hạn chế lặp "đặc sản" giữa các ngành (mỗi N## đặc trưng chỉ dùng cho 1-2 ngành). Tất cả cần cổng reduced-motion (R01) và bản mobile nhẹ.

| # | Ngành | 5 hiệu ứng đề xuất (chữ ký ở in đậm) | Gợi ý hồn |
|---|---|---|---|
| 1 | Quán rooftop bar cocktail | **R10 spotlight theo con trỏ (ánh đèn đêm)**, R16 xem trước ảnh khi rê menu cocktail, R45 grain + gradient tối, N10 blur-to-sharp ảnh ly, R19 chữ sáng dần | Tối, neon ấm, ánh sáng. |
| 2 | Tiệm bánh ngọt | **N03 viền răng cưa/lượn sóng giữa section**, N04 thẻ bánh xòe quạt, R44 nút tim nảy, R26 xếp chồng thẻ, R06 chữ nút lăn | Pastel, vui, tròn. |
| 3 | Nhà trà | **N07 cảnh ghim pha trà từng bước**, R38 accordion mượt, N08 nền đổi theo loại trà, R29 parallax lá trà, R17 chữ theo dòng | Chậm, tĩnh. |
| 4 | Glamping | **R28 image reveal clip-path + zoom**, R25 cuộn ngang gallery lều, N10 blur-to-sharp, R30 progress đọc, R35 menu vòng tròn lan | Thiên nhiên, khoảng thở lớn. |
| 5 | Lặn biển/thể thao nước | **N12 scrub video đáy biển theo cuộn**, R24 marquee tăng tốc theo cuộn, R12 ánh bóng quét, R20 bộ đếm độ sâu, R18 mờ-nét | Chiều sâu, nước. |
| 6 | Thuê xe máy phượt | **N05 đường SVG vẽ tuyến đường theo cuộn**, R27 chương cuộn dính, R47 thanh CTA Gọi/Zalo, R14 gallery accordion xe, R20 counter km | Hành trình. |
| 7 | Tiệm hoa | **N09 chữ lớn kẹp giữa hoa cắt rời (kiểu Hozon)**, R29 parallax nhẹ, R33 trước/sau bó hoa, R13 overlay hướng chuột, R31 stagger danh sách | Nhẹ, sạch, nhiều khoảng trắng. |
| 8 | Gym/CrossFit | **N16 halftone/HUD**, R21 số lăn (kg/lần), R24 marquee velocity, R08 nút giữ để xác nhận (đặt lịch), R11 tilt thẻ HLV | Thô, mạnh. |
| 9 | Pet spa | **N06 sticker trôi đè chữ**, N04 thẻ xòe quạt thú cưng, R40 công tắc squish, R07 ripple bấm, R33 trước/sau lông | Vui, tròn, mềm. |
| 10 | Skincare studio | **N11 chọn biến thể đổi màu nền + sản phẩm**, R33 before/after slider, R18 mờ-nét, R12 glare nhẹ, R37 popover origin-aware | Sạch, khoa học, nhẹ. |
| 11 | Nail studio | **R11 tilt 3D thẻ mẫu móng**, R10 glow border, R44 nút tim lưu mẫu, R15 con trỏ tuỳ biến, R23 marquee từ khoá | Bóng, nhiều màu. |
| 12 | Trung tâm ngoại ngữ | **N05 lộ trình học đường vẽ nối cấp độ**, R20 counter học viên, R39 tab gạch chạy (A1-C1), R32 carousel scroll-snap mobile, R22 chữ đổi trạng thái | Rõ ràng, thân thiện. |
| 13 | Coworking | **R46 footer chữ khổng lồ + curtain (kiểu ViV)**, R36 navbar ẩn khi cuộn, R31 stagger gói giá, R37 dropdown, R09 border beam gói nổi bật | Gọn, chuyên nghiệp. |
| 14 | Car detailing | **N10 blur-to-sharp ảnh xe (kiểu Forge)**, R33 before/after sơn, R29 parallax chênh tốc (Spyker), R12 glare quét, R46 curtain | Bóng, sang. |
| 15 | Recording studio | **N15 nét vẽ tay + N16 halftone**, R16 xem trước khi rê danh sách nghệ sĩ, R24 marquee, R45 grain, R15 con trỏ tuỳ biến | Âm nhạc, tối. |
| 16 | Xưởng gốm | **N07 cảnh ghim nặn gốm (kéo để xoay bàn xoay)**, R14 gallery accordion, R28 image reveal, R04 nút từ tính, R45 grain | Thủ công, đất. |
| 17 | Trang sức vàng | **R12 glare/shine sweep vàng**, R11 tilt 3D, N01 băng chuyền cung tròn bộ sưu tập, R17 chữ theo dòng serif, R26 xếp chồng thẻ | Sang, vàng. |
| 18 | Wine bar | **R10 spotlight + N13 cuộn ảo chọn chai**, R45 grain, R43 preloader ngắn, R35 menu vòng tròn, R21 số lăn (năm) | Tối, đỏ rượu. |
| 19 | Trường lướt sóng | **R24 marquee velocity + N02 chữ chạy theo đường cong sóng**, R29 parallax sóng, R25 cuộn ngang khoá học, R20 counter, R18 mờ-nét | Biển, nhịp. |
| 20 | Chủ đầu tư căn hộ ven biển | **N14 intro chữ lần lượt có Skip**, R27 chương cuộn dính (vị trí/tiện ích), R28 image reveal, R30 progress, R34 view transitions | Sang, từ tốn. |

**Kiểm tra khác biệt.** Hiệu ứng "chữ ký" (in đậm) khác nhau giữa 20 ngành; R10 xuất hiện ở rooftop, nail, wine bar (đổi sắc thái: ánh đèn / viền / ánh chai). Các R chung (R01 reduced-motion, R47 CTA mobile, R36 navbar) dùng cho mọi landing nên không liệt kê lại. Đề xuất: mỗi landing chỉ chọn 3-4 hiệu ứng trong hàng của mình, không dùng cả 5.

---

## (5) GIỚI HẠN (trung thực)

- **Threads: không truy cập được** - trang yêu cầu đăng nhập; tôi không nhập mật khẩu. Không có bảng Threads, handle, like, trả lời mới. Nguồn Threads cũ: file 04.
- **Số lượng phân tích:** 16 trang đã thu thập ảnh + dữ liệu; 2 trang bị loại (Grids của Obys trả 403; Stone Groove Spirits bị cổng xác nhận tuổi 21+ - tôi không bấm xác nhận tuổi). Awwwards không trả URL ngoài cho nhiều trang qua công cụ đọc nên chỉ lấy URL của các trang đã phân tích; nhiều mục ở bảng (1) chỉ có tên + đường dẫn awwwards.
- **Không nhìn thấy chuyển động.** Chỉ có ảnh tĩnh (5-6 khung/trang); mô tả chuyển động là suy luận từ ảnh + dấu vết kỹ thuật. Chưa kiểm tra mobile thật, chưa đo FPS/LCP thật; WebGL phần mềm trong headless.
- **Dấu vết thư viện lấy bằng regex trên bundle** (có dương tính giả: SplitText, WebGPU, pixi, ogl, rive).
- Heavy trang (A24, Threejs-Punk, Unbelievably Crap, Dialed) làm trình duyệt headless sập khi chạy song song; các trang đó chỉ chụp được 2-5 khung; Threejs-Punk chỉ 2 khung.
- Banner cookie: Spyker (Decline) và Forge (Reject & Enter) đã được bấm từ chối để xem; không đồng ý gì khác.
- Ảnh trong `shots/` (tổng ~2.5MB, mỗi ảnh <400KB) là ảnh chụp trang của người khác, chỉ dùng nội bộ để tham chiếu; không đưa vào sản phẩm.
- Tôi không sao chép mã, tài nguyên, văn bản của các trang; chỉ mô tả ý tưởng bằng lời. Các URL ghi để chủ xem nguồn.
