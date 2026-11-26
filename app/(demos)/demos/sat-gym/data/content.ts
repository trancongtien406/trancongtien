export const IMG = "/images/demos/sat-gym";

export const NAV = [
  { href: "#chuong-trinh", label: "Chương trình" },
  { href: "#lich-lop", label: "Lịch lớp" },
  { href: "#huan-luyen-vien", label: "Huấn luyện viên" },
  { href: "#goi-tap", label: "Gói tập" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const PROGRAMS = [
  {
    n: "01", tag: "CROSSFIT WOD", title: "CrossFit WOD", img: "khoi-magie",
    alt: "Đám bột magie bay lên quanh đôi tay trong ánh sáng ngược",
    text: "Bài tập tổng hợp theo ngày: một phần kỹ thuật, một bài WOD theo nhịp AMRAP, EMOM hoặc tabata. Mỗi động tác có bản dễ hơn và bản khó hơn để bạn chọn mức kiểm soát được.",
    specs: ["Thanh tạ, kettlebell, xà, dây thừng", "60 phút", "Chia mức theo người"],
  },
  {
    n: "02", tag: "STRENGTH", title: "Strength: tập tạ có giáo án", img: "thanh-ta-day",
    alt: "Thanh tạ và dây thừng nằm trên sàn gỗ tối của phòng tập",
    text: "Squat, deadlift, đẩy vai, kéo với thanh tạ và rack. Mỗi buổi có một động tác chính, tăng tải từng bước nhỏ và dừng khi kỹ thuật bắt đầu rơi.",
    specs: ["Thanh tạ, rack, tạ tay", "60 phút", "Có nền tảng cơ bản"],
  },
  {
    n: "03", tag: "CONDITIONING", title: "Conditioning: thể lực và nhịp độ", img: "dia-ta",
    alt: "Đĩa tạ nằm trên thảm cao su tối, nhìn chéo từ trên xuống",
    text: "Tabata, EMOM, circuit ngắn. Tập cách chia sức, giữ kỹ thuật khi mệt và nghỉ đúng lúc. Mức tạ và số lần do bạn và huấn luyện viên chọn.",
    specs: ["Dây nhảy, kettlebell, thảm", "45 đến 60 phút", "Mọi trình độ"],
  },
  {
    n: "04", tag: "MOBILITY", title: "Mobility và phục hồi", img: "ban-chan",
    alt: "Đôi bàn chân trần nhón lên trên sàn tập tối",
    text: "Giãn cơ chủ động, mở hông, vai và cột sống ngực, tập thở. Nhẹ nhàng, hợp với ngày nghỉ giữa tuần hoặc khi bạn muốn cử động dễ chịu hơn.",
    specs: ["Thảm, con lăn, dây giãn", "45 phút", "Dễ vào"],
  },
  {
    n: "05", tag: "NGƯỜI MỚI", title: "Lớp làm quen cho người mới", img: "tay-xa",
    alt: "Bàn tay nắm thanh xà đỏ trước bức tường gạch",
    text: "Học tư thế, nhịp thở và cách dùng dụng cụ an toàn trước khi tăng độ khó. Phù hợp với người chưa từng tập tạ hoặc quay lại sau thời gian nghỉ dài.",
    specs: ["Thanh nhẹ, tạ tay, cơ thể", "45 đến 60 phút", "Sĩ số nhỏ hơn"],
  },
] as const;

/** Các bước thêm đĩa. plate = kg mỗi đĩa ở mỗi đầu thanh; total = tổng kg trên thanh sau bước đó (thanh 20 kg). */
export const LOAD_STEPS = [
  { plate: 0, total: 20, title: "Thanh trống", text: "Học tư thế, nhịp thở và đường đi của thanh trước khi nghĩ tới tạ." },
  { plate: 20, total: 60, title: "Một đĩa mỗi bên", text: "Chỉ tăng khi cả hiệp cuối vẫn đẹp như hiệp đầu." },
  { plate: 15, total: 90, title: "Thêm đĩa nhỏ hơn", text: "Nghỉ đủ giữa các hiệp. Mỏi cơ thì được, mất kỹ thuật thì dừng." },
  { plate: 10, total: 110, title: "Tải của riêng bạn", text: "Mỗi người một mức. Không so với người đứng cạnh." },
] as const;

export const GALLERY = [
  { n: "01", label: "SÀN TẬP", img: "san-don", alt: "Thanh tạ đen trắng nằm trên sàn nhà tập trải rộng", ratio: "3 / 2" },
  { n: "02", label: "DÂY THỪNG", img: "day-thung", alt: "Dây thừng treo trên tường xám trong nhà tập", ratio: "2 / 3", crop: true },
  { n: "03", label: "MAGIE", img: "tay-magie", alt: "Bàn tay phủ bột magie trước buổi tập", ratio: "2 / 3" },
  { n: "04", label: "XÀ NGOÀI TRỜI", img: "xa-ngoai", alt: "Hai cánh tay đang treo trên thanh xà ngoài trời", ratio: "3 / 2" },
  { n: "05", label: "KHO TẠ", img: "gia-ta", alt: "Giá đĩa tạ đặt trước bức tường gạch trắng", ratio: "3 / 2" },
] as const;

export const PLANS = [
  { id: "thu", name: "Buổi tập thử", price: 180000, per: "1 buổi", note: "Làm quen không gian, dụng cụ và cách một buổi tập diễn ra.", feats: ["1 lớp bất kỳ trong lịch", "HLV giới thiệu dụng cụ", "Trừ vào gói tháng nếu đăng ký trong 7 ngày"] },
  { id: "12", name: "Thẻ 12 buổi", price: 1550000, per: "12 buổi", note: "Dành cho người muốn tập đều nhưng không cố định giờ.", feats: ["Mọi lớp trong lịch tuần", "Dùng trong 8 tuần", "Đổi lớp theo tuần"] },
  { id: "thang", name: "Tháng mở", price: 1900000, per: "1 tháng", note: "Tập theo lịch lớp trong tháng, chọn lớp mỗi tuần.", feats: ["Không giới hạn lớp trong lịch", "Kèm đánh giá kỹ thuật ban đầu", "Tạm hoãn khi bận, theo điều kiện gói"], hot: true },
  { id: "quy", name: "Gói 3 tháng", price: 5100000, per: "3 tháng", note: "Một mức giá cho một quãng tập dài, thuận tiện cho người đã có thói quen.", feats: ["Như gói tháng mở", "Theo dõi tiến trình tải mỗi 4 tuần", "Ưu tiên chọn giờ lớp"] },
] as const;

export const FAQ = [
  { q: "Mình chưa từng tập tạ thì có vào được không?", a: "Được. Lớp làm quen và lớp Kỹ thuật dành cho người mới. Bạn bắt đầu bằng thanh nhẹ hoặc chỉ cơ thể, huấn luyện viên chỉnh từng động tác trước khi thêm tải." },
  { q: "CrossFit có hợp với người không khoẻ không?", a: "Mỗi động tác trong lớp có bản dễ hơn và bản khó hơn, bạn chọn mức kiểm soát được. Quan trọng là kỹ thuật và nhịp tập vừa sức, không phải so với người đứng cạnh." },
  { q: "Một lớp tối đa bao nhiêu người?", a: "Tối đa 14 người mỗi lớp thường, lớp làm quen cho người mới nhận ít hơn để huấn luyện viên chỉnh kỹ từng người. Số chỗ cụ thể từng lớp được xác nhận khi bạn đăng ký." },
  { q: "Buổi tập thử diễn ra thế nào?", a: "Bạn đến sớm khoảng 15 phút, trao đổi với huấn luyện viên về sức khoẻ và mục tiêu, vào lớp phù hợp rồi nói chuyện thêm sau buổi. Giá buổi thử được trừ vào gói tháng nếu bạn đăng ký trong 7 ngày." },
  { q: "Có cảnh báo gì khi tập không?", a: "Hãy khởi động trước, chọn mức tạ kiểm soát được và dừng nếu đau nhói, chóng mặt hoặc khó thở bất thường. Nếu bạn có bệnh tim, huyết áp, chấn thương hoặc đang mang thai, hãy hỏi bác sĩ trước khi tập cường độ cao." },
  { q: "Bài WOD gợi ý trên trang có thay cho huấn luyện viên không?", a: "Không. Đó là khung bài để bạn tham khảo, chưa tính đến thể trạng riêng của bạn. Huấn luyện viên sẽ xem lại kỹ thuật và mức tải trực tiếp." },
  { q: "Cần mang gì khi đến tập?", a: "Giày phẳng hoặc giày tập, quần áo thoải mái, khăn và chai nước. Magie, dây quấn cổ tay và dụng cụ cơ bản có sẵn để dùng." },
  { q: "Đặt lớp và huỷ lớp thế nào?", a: "Với thẻ buổi và gói tháng, bạn giữ chỗ trước cho lớp muốn tập. Cần huỷ thì báo trước ít nhất 4 giờ để người khác có chỗ. Điều kiện chi tiết từng gói tiệm xác nhận khi bạn trao đổi." },
  { q: "Giá ở đây có phải giá cuối cùng không?", a: "Đó là giá tham khảo để bạn hình dung. Mức giá, thời hạn và điều kiện từng gói được xác nhận khi bạn trao đổi trực tiếp với SẬT." },
] as const;

export const ABOUT_FOR = [
  { t: "Người mới bắt đầu", d: "Chưa từng tập tạ hoặc ngại phòng tập đông. Có lớp làm quen sĩ số nhỏ." },
  { t: "Người đi làm", d: "Lớp 06:00, 12:15 và sau giờ làm, 45 đến 60 phút, vào là tập ngay." },
  { t: "Người quay lại", d: "Nghỉ lâu rồi muốn tập lại từ mức nhẹ, tăng tải từng bước." },
  { t: "Người đã tập đều", d: "Muốn có giáo án strength rõ ràng và người chỉnh kỹ thuật." },
] as const;

/** Một buổi 60 phút, tính theo phút. */
export const SESSION = [
  { id: "don", label: "Đón và trao đổi", min: 5, text: "Chào huấn luyện viên, báo chấn thương hoặc chỗ đang đau, xem bảng bài trong ngày." },
  { id: "khoi", label: "Khởi động", min: 10, text: "Nâng nhiệt độ cơ thể, xoay khớp vai, hông, cổ tay, vài động tác nhẹ với chính bài sắp tập." },
  { id: "kt", label: "Kỹ thuật", min: 15, text: "Học hoặc ôn một động tác chính với thanh nhẹ. Huấn luyện viên chỉnh tư thế từng người." },
  { id: "wod", label: "Bài WOD", min: 20, text: "Bài chính theo nhịp AMRAP, EMOM hoặc tabata. Mức tạ và số lần chia theo từng người." },
  { id: "gian", label: "Giãn và hạ nhịp", min: 10, text: "Hạ nhịp tim, giãn các nhóm cơ vừa dùng, trao đổi nhanh về buổi tập." },
] as const;

export const BOARD = ["BÀI HÔM NAY", "AMRAP 12 PHÚT", "10 SQUAT TẠ TAY", "8 KÉO XÀ HỖ TRỢ", "12 SWING KETTLEBELL", "NGHỈ ĐÚNG LÚC"] as const;

export const ZONES = [
  { id: "rack", name: "Khu rack và thanh tạ", note: "Rack squat, bàn đẩy, thanh đòn và đĩa. Lớp strength tập ở đây, có chốt an toàn và chỗ để hạ tạ." },
  { id: "rig", name: "Khu xà và dây thừng", note: "Dàn xà treo, dây thừng leo, vòng treo. Có dây hỗ trợ và xà thấp cho người mới." },
  { id: "wod", name: "Sàn WOD", note: "Sàn rộng cho kettlebell, hộp nhảy, dây nhảy, máy chèo. Lớp conditioning chạy tabata ở đây." },
  { id: "mob", name: "Góc mobility", note: "Thảm, con lăn, dây giãn. Dùng cho lớp phục hồi và khởi động trước lớp." },
  { id: "don", name: "Quầy đón và tủ đồ", note: "Giữ đồ, nước uống, bảng lịch lớp và bảng bài trong ngày." },
] as const;

export const RULES = [
  "Đến sớm khoảng 10 phút, thay giày trong khu tập, không mang giày ngoài đường vào sàn.",
  "Báo cho huấn luyện viên về chấn thương, bệnh nền hoặc việc đang mang thai trước khi vào lớp.",
  "Hạ tạ có kiểm soát, không thả từ trên cao. Tháo đĩa, trả dụng cụ về đúng chỗ sau khi dùng.",
  "Luôn có người đứng bảo vệ khi tập tạ nặng ở rack. Khi chưa chắc, hỏi huấn luyện viên.",
  "Dừng ngay nếu đau nhói, chóng mặt, buồn nôn hoặc khó thở bất thường, rồi báo huấn luyện viên.",
  "Giữ yên lặng khi huấn luyện viên đang hướng dẫn. Tôn trọng chỗ tập của người khác.",
] as const;

export const WARM = [
  { t: "Nâng nhiệt độ", d: "2 đến 3 phút đi bộ nhanh, nhảy dây nhẹ hoặc chèo máy." },
  { t: "Xoay khớp", d: "Cổ tay, vai, hông, mắt cá. Mỗi khớp 10 vòng, chậm." },
  { t: "Động tác nền", d: "Squat không tạ, cầu hông, mèo bò, chống đẩy thấp." },
  { t: "Một hiệp thử", d: "Làm động tác đầu tiên của bài bằng tạ nhẹ hơn dự định." },
] as const;

export const TRIAL_STEPS = [
  { n: "1", t: "Nhắn SẬT", d: "Cho biết bạn đã tập gì, muốn tập gì và có chấn thương hay bệnh nền nào cần lưu ý." },
  { n: "2", t: "Chọn lớp trong lịch", d: "Huấn luyện viên gợi ý lớp hợp mức của bạn và xác nhận còn chỗ." },
  { n: "3", t: "Đến sớm 15 phút", d: "Tham quan sàn tập, nghe hướng dẫn dụng cụ, khởi động cùng cả lớp." },
  { n: "4", t: "Tập và trao đổi", d: "Sau buổi, huấn luyện viên nói về kỹ thuật và gợi ý gói phù hợp. Không ràng buộc." },
] as const;

export const BRING = ["Giày phẳng hoặc giày tập", "Quần áo thoải mái", "Khăn nhỏ và chai nước", "Băng cổ tay nếu bạn có (tiệm có sẵn để dùng)"] as const;
