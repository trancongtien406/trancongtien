export const NAV = [
  { href: "#doi-xe", label: "Đội xe" },
  { href: "#tinh-gia", label: "Tính giá" },
  { href: "#cung-duong", label: "Cung đường" },
  { href: "#quy-trinh", label: "Quy trình" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export type Route = {
  id: string;
  name: string;
  km: number;
  kmNote: string;
  time: string;
  img: string;
  alt: string;
  w: number;
  h: number;
  text: string;
  bikes: string;
};

export const ROUTES: readonly Route[] = [
  {
    id: "son-tra", name: "Bán đảo Sơn Trà", km: 30, kmNote: "vòng quanh bán đảo", time: "Nửa ngày", img: "xe-bien-hoang-hon", w: 2000, h: 1422,
    alt: "Xe mô tô đỗ bên đường ven biển lúc hoàng hôn",
    text: "Đường uốn theo sườn núi, một bên là rừng, một bên là biển. Chạy chậm, dừng nhiều, đến đúng lúc nắng chiều đổ xuống mặt nước.",
    bikes: "Tay ga 125 Biển, Số 110 Gọn",
  },
  {
    id: "hai-van", name: "Đèo Hải Vân", km: 20, kmNote: "đoạn đèo", time: "Cả buổi", img: "deo-uon-luon", w: 2000, h: 1333,
    alt: "Xe mô tô đen đỗ bên đường đèo uốn lượn giữa đồi xanh",
    text: "Cua liên tiếp, dốc đều, sương dễ xuống sớm. Đây là cung đường dành cho xe có lực và phanh tốt, chạy đúng làn và giữ khoảng cách.",
    bikes: "Côn 150 Sprint, Tay ga 155 Đèo",
  },
  {
    id: "hoi-an", name: "Hội An ven biển", km: 30, kmNote: "một chiều từ trung tâm", time: "Cả ngày", img: "doan-xe-ven-bien", w: 2000, h: 1125,
    alt: "Nhóm xe máy dừng trên con đường dốc nhìn ra biển",
    text: "Đường ven biển phẳng, nhiều điểm để dừng. Hợp với xe số và tay ga: nhẹ tay lái, tiết kiệm xăng, chở được hành lý.",
    bikes: "Số 125 Bền, Tay ga 110 Phố",
  },
  {
    id: "ba-na", name: "Đường lên Bà Nà", km: 25, kmNote: "từ trung tâm", time: "Nửa ngày", img: "tren-may", w: 2000, h: 1333,
    alt: "Người lái xe băng qua đường núi phía trên biển mây",
    text: "Đường lên núi nhiều khúc quanh, nhiệt độ giảm dần theo độ cao. Mang áo mưa, kiểm phanh trước khi lên và xuống chậm.",
    bikes: "Tay ga 155 Đèo, Côn 175 Rally",
  },
];

export const STEPS = [
  { n: "01", t: "Chọn xe", d: "Lọc theo xe số, tay ga hoặc côn tay. Mỗi mẫu có thông số và giá ngày, giá tuần ngay trên thẻ." },
  { n: "02", t: "Tính giá", d: "Chọn số ngày, cách nhận xe, phụ kiện và bảo hiểm. Phiếu giá hiện từng dòng, cộng ra tổng." },
  { n: "03", t: "Gửi tư vấn", d: "Mở form tư vấn, dán bản tóm tắt vào ghi chú. Chúng tôi xác nhận xe, giờ nhận và tiền cọc." },
  { n: "04", t: "Nhận xe, đi", d: "Cùng kiểm xe, chụp ảnh hiện trạng, nhận mũ bảo hiểm rồi lên đường." },
] as const;

export const CHECKS = [
  "Phanh trước và sau ăn đều, không rung",
  "Lốp đủ hơi, gai còn rõ, không nứt hông",
  "Xích hoặc dây curoa căng vừa, đã tra dầu",
  "Đèn pha, đèn hậu, xi-nhan và còi hoạt động",
  "Nhớt máy và dầu phanh ở mức quy định",
  "Gương hai bên chỉnh được, không lỏng",
  "Bình xăng đầy hoặc ghi mức xăng khi giao",
  "Mũ bảo hiểm đúng size, quai cài chắc",
] as const;

export const FAQ = [
  {
    q: "Tôi cần mang giấy tờ gì để thuê xe?",
    a: "Giấy tờ tùy thân còn hạn (CCCD hoặc hộ chiếu) và giấy phép lái xe phù hợp với dung tích xe bạn chọn. Chúng tôi đối chiếu bản gốc khi giao xe và lưu ảnh chụp để làm thỏa thuận thuê.",
  },
  {
    q: "Khách nước ngoài có thuê được không?",
    a: "Bạn cần hộ chiếu và giấy phép lái xe. Việc giấy phép lái xe nước ngoài hoặc quốc tế có được công nhận hay không phụ thuộc quy định hiện hành, nên khách tự kiểm tra trước khi đặt. Khi tư vấn, chúng tôi sẽ nói rõ những giấy tờ cần mang theo.",
  },
  {
    q: "Tiền cọc là bao nhiêu, khi nào được hoàn?",
    a: "Tiền cọc thay đổi theo mẫu xe và hiện sẵn trên phiếu giá. Khoản này được hoàn khi bạn trả xe đúng hạn, nguyên trạng và đúng mức xăng đã thỏa thuận lúc nhận. Cọc không nằm trong tổng tiền thuê.",
  },
  {
    q: "Giá tuần được tính như thế nào?",
    a: "Mỗi 7 ngày được tính theo giá tuần, rẻ hơn 7 lần giá ngày. Số ngày lẻ còn lại tính theo giá ngày nhưng không vượt quá giá một tuần, nên thuê 6 ngày cũng chỉ trả bằng một tuần.",
  },
  {
    q: "Xe hỏng hoặc đổ xe giữa đường thì làm sao?",
    a: "Liên hệ cửa hàng theo thông tin ghi trong thỏa thuận. Gói bảo hiểm Trọn hành trình có hỗ trợ cứu hộ xe trong khu vực Đà Nẵng, Hội An và Huế; các gói còn lại xử lý theo điều khoản thuê.",
  },
  {
    q: "Tôi có thể chạy đèo Hải Vân hoặc đi Huế không?",
    a: "Được, nếu lộ trình nằm trong phạm vi thỏa thuận. Hãy báo trước điểm đến khi tư vấn để chúng tôi gợi ý xe phù hợp và dặn kỹ về đoạn đường, thời tiết.",
  },
] as const;

export const RENT_CHECKLIST = (deposit: string) => [
  { id: "id", t: "Giấy tờ tùy thân còn hạn", d: "CCCD hoặc hộ chiếu. Cửa hàng đối chiếu bản gốc, không giữ lại bản gốc." },
  { id: "gplx", t: "Giấy phép lái xe phù hợp dung tích xe", d: "Khách tự kiểm tra quy định hiện hành về hạng bằng lái. Khách nước ngoài cũng tự kiểm tra việc công nhận giấy phép lái xe của nước mình." },
  { id: "coc", t: `Tiền cọc ${deposit}`, d: "Chuyển khoản hoặc tiền mặt, hoàn lại khi trả xe nguyên trạng và đúng giờ." },
  { id: "suc-khoe", t: "Đủ tuổi, đủ tỉnh táo khi lái", d: "Không lái xe sau khi uống rượu bia. Đội mũ bảo hiểm cài quai ở mọi chặng." },
  { id: "kiem-xe", t: "Cùng kiểm xe lúc nhận", d: "Chụp ảnh các góc xe, đồng hồ km và mức xăng để hai bên cùng nắm hiện trạng." },
  { id: "tra-xe", t: "Trả xe đúng giờ, đúng mức xăng", d: "Muộn giờ trả sẽ tính thêm theo thỏa thuận; báo trước nếu cần gia hạn." },
] as const;
