export const FACTS = [
  { k: "Giá từ", v: "150.000 ₫", d: "một lần tắm, chó dưới 3 kg" },
  { k: "Giờ mở cửa", v: "8:00 – 19:00", d: "nghỉ Thứ Hai, Chủ nhật đến 17:00" },
  { k: "Nhận bé", v: "Từ 3 tháng", d: "đã tiêm phòng, hẹn trước" },
] as const;

export const INFO_STRIP = ["Chó và mèo tách khu", "Nhận bé đã tiêm phòng", "Có đưa đón nội thành", "Báo giá trước khi làm"];

export const ABOUT_POINTS = [
  { t: "Hai khu riêng", d: "Khu chó có bàn tắm inox và bồn lớn; khu mèo yên tĩnh, ít tiếng ồn, sấy ở mức gió nhẹ." },
  { t: "Làm chậm, nghỉ giữa chừng", d: "Bé căng thẳng thì dừng, cho nghỉ và uống nước. Quá hoảng thì hẹn lượt khác, không ép." },
  { t: "Báo trước giá và thời gian", d: "Xem lông xong mới báo giá chính xác, bạn đồng ý rồi tiệm mới làm." },
] as const;

export const STEPS = [
  { n: "01", t: "Tiếp nhận và kiểm tra", mins: "10 – 15 phút", d: "Xem sổ tiêm phòng, nghe bạn kể về tính cách và chỗ bé không thích bị chạm. Kiểm tra lông và da bên ngoài, chốt dịch vụ, giá và giờ đón.", photo: "corgi-chai-long", pos: "50% 88%", alt: "Chú corgi thè lưỡi khi được chải lông", color: "yellow" },
  { n: "02", t: "Chải và gỡ rối", mins: "10 – 30 phút", d: "Chải từng lớp từ ngọn tới gốc trước khi cho xuống nước, vì lông rối gặp nước sẽ siết chặt hơn. Nút quá chặt thì tỉa gọn thay vì kéo giật.", photo: "meo-cam-luoc", pos: "50% 38%", alt: "Chú mèo cam ngồi thư giãn khi được chải lông", color: "white" },
  { n: "03", t: "Tắm bọt", mins: "20 – 30 phút", d: "Nước ấm vừa phải, sữa tắm dịu nhẹ chọn theo lông, xả thật sạch để không còn xà phòng trên da. Lông bẩn nhiều thì tắm hai lượt.", photo: "cun-tam-uot", pos: "50% 38%", alt: "Chú cún poodle nhỏ ướt sũng trong bồn tắm", color: "blue" },
  { n: "04", t: "Sấy khô", mins: "20 – 40 phút", d: "Thấm khăn, sấy từng lớp bằng máy gió ấm, vừa sấy vừa chải cho lông suôn và bông. Luôn có người đứng cạnh bé, nghỉ khi bé mệt.", photo: "cho-long-trang", pos: "50% 38%", alt: "Chú chó lông trắng xù được chải lông trên sàn gỗ", color: "white" },
  { n: "05", t: "Hoàn thiện", mins: "15 – 45 phút", d: "Tỉa gọn mặt, chân, bụng nếu bạn chọn gói tỉa; cắt móng, lau tai ngoài, xịt thơm dịu và chụp ảnh khoe boss. Tiệm nhắn khi bé sẵn sàng về nhà.", photo: "lhasa-khan-trum", pos: "50% 38%", alt: "Chú chó Lhasa Apso trùm khăn trắng sau khi tắm", color: "yellow" },
] as const;

export const INTAKE = [
  { t: "Tiêm phòng", tag: "Bắt buộc", d: "Mang sổ tiêm phòng (hoặc ảnh sổ) còn hiệu lực: phòng dại và các bệnh thường gặp theo tuổi của chó, mèo. Bé chưa tiêm đủ mũi chưa nhận tắm, để tránh lây chéo giữa các bé trong tiệm." },
  { t: "Tuổi và sức khoẻ", tag: "Báo trước", d: "Nhận bé từ 3 tháng tuổi. Bé lớn tuổi, đang mang thai, có bệnh tim hoặc hô hấp: báo trước để tiệm làm nhẹ và ngắn, và nên hỏi bác sĩ thú y của bé trước khi đặt lịch." },
  { t: "Chưa nhận khi", tag: "Hẹn lại", d: "Bé đang ốm, nôn, tiêu chảy, có vết thương hở, nghi ve ghẻ hoặc bệnh ngoài da. Tiệm chỉ chăm sóc lông và vệ sinh, không chẩn đoán hay điều trị; bé khoẻ lại thì hẹn lại." },
  { t: "Khi đến tiệm", tag: "Nên làm", d: "Cho bé đi vệ sinh trước, không cho ăn no ngay trước giờ hẹn, mang theo dây dắt hoặc lồng vận chuyển, và cho biết bé nhát, hay cắn hoặc hay cào." },
] as const;

export const PICKUP = {
  t: "Đưa đón thú cưng",
  d: "Nhận và trả bé tại nhà trong các quận nội thành Đà Nẵng bằng xe có lồng riêng cho từng bé. Phí tính theo khoảng cách, báo khi đặt lịch; đặt trước ít nhất một ngày.",
  list: ["Một chiều hoặc hai chiều, chọn khi đặt", "Chó và mèo đi lồng riêng, không đi chung", "Tiệm nhắn khi xe đến và khi bé xong"],
} as const;

export const POLICIES = [
  { t: "Giữ lịch và huỷ lịch", d: "Giữ lịch không cần cọc với gói dưới 500.000 ₫; gói Tỉa và Spa cho bé trên 15 kg cọc 30%. Huỷ hoặc dời trước giờ hẹn 3 giờ thì không mất phí." },
  { t: "Đến trễ", d: "Trễ quá 20 phút, tiệm dời sang khung giờ gần nhất còn trống để bé không bị làm vội." },
  { t: "Giá và thời gian", d: "Giá trên trang là giá tham khảo. Giá chính xác báo sau khi xem lông của bé, trước khi bắt đầu làm." },
  { t: "Đón bé", d: "Đón trong 60 phút sau giờ hẹn. Quá giờ đó tiệm tính phụ phí giữ bé 30.000 ₫ mỗi giờ." },
] as const;

export const FAQ = [
  { q: "Bông Xù có khám hay điều trị bệnh cho bé không?", a: "Không. Bông Xù chỉ chăm sóc lông và vệ sinh: chải, tắm, sấy, tỉa gọn, spa. Nếu bé có bệnh da, vết thương, ngứa nhiều, rụng từng mảng hoặc vấn đề sức khoẻ, hãy hỏi bác sĩ thú y trước khi đặt lịch." },
  { q: "Bé chưa tiêm phòng đủ có tắm được không?", a: "Chưa. Tiệm chỉ nhận bé đã tiêm phòng còn hiệu lực để bảo vệ tất cả các bé trong tiệm. Bạn mang sổ tiêm hoặc ảnh sổ khi đến; bé tiêm đủ mũi thì đặt lại nhé." },
  { q: "Tắm một bé mất bao lâu?", a: "Tắm thơm thường 45 phút đến 2 giờ; tắm và tỉa gọn 90 phút đến 3 giờ; spa 80 phút đến 3 giờ. Bé to, lông dài, xoăn hoặc rối thì lâu hơn. Công cụ ước tính trên trang cho khoảng thời gian theo từng bé." },
  { q: "Bé nhát, sợ nước hoặc hay cắn thì sao?", a: "Tiệm làm chậm, cho bé làm quen với chỗ lạ trước, nghỉ khi bé căng thẳng. Bé hay cắn hoặc rất khó giữ thì cần hai người làm, phụ phí 50.000 ₫; bé quá hoảng thì dừng và hẹn lượt khác." },
  { q: "Mèo cũng tắm được ở đây à?", a: "Được. Mèo có khu yên tĩnh riêng, nước ấm, sấy ở mức gió nhẹ và không ở chung khu với chó. Hãy cho biết mèo nhát hay hay cào để tiệm chuẩn bị." },
  { q: "Bé có lông rối, vón cục thì tính sao?", a: "Gỡ rối tính thêm từ 60.000 ₫ tuỳ mức độ. Nút quá chặt, gỡ sẽ làm bé đau, thì tiệm hỏi bạn rồi tỉa gọn phần đó thay vì kéo giật." },
  { q: "Có đưa đón bé không?", a: "Có, trong các quận nội thành Đà Nẵng, phí theo khoảng cách và báo khi đặt lịch. Mỗi bé đi lồng riêng; chó và mèo không đi chung." },
  { q: "Tôi có thể ở lại xem bé tắm không?", a: "Bạn ngồi ở khu chờ và xem được qua cửa kính khu tắm. Tiệm không cho vào khu làm vì bé sẽ mất tập trung hoặc lo lắng khi thấy chủ." },
  { q: "Giá trong công cụ có chính xác không?", a: "Đó là giá tham khảo theo cân nặng, độ dài lông và tình trạng. Giá chính xác báo sau khi xem lông của bé, bạn đồng ý rồi tiệm mới bắt đầu." },
] as const;
