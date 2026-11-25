export type Month = { m: number; level: 1 | 2 | 3 | 4 | 5; title: string; text: string; newbie: string; skilled: string };

/** Mô tả CHUNG theo tháng, không phải dự báo. level: 1 = thường phẳng hoặc rất nhỏ, 5 = thường có nhiều đợt sóng lớn. */
export const MONTHS: Month[] = [
  { m: 1, level: 4, title: "Gió đông bắc còn rõ", text: "Thường có sóng vừa đến lớn, biển hay đổi trong ngày.", newbie: "Nên hỏi huấn luyện viên theo từng ngày, có thể học trên cát trước.", skilled: "Nhiều cơ hội có sóng cho người đã lướt." },
  { m: 2, level: 3, title: "Sóng bắt đầu dịu", text: "Thường vẫn có sóng, xen những ngày biển êm hơn.", newbie: "Có những ngày hợp để tập nếu biển êm.", skilled: "Còn nhiều buổi đáng ra nước." },
  { m: 3, level: 2, title: "Chuyển mùa", text: "Sóng thường nhỏ dần, nắng đẹp hơn.", newbie: "Thời điểm hay được chọn để học kỹ thuật cơ bản.", skilled: "Sóng nhỏ, hợp tập chi tiết kỹ thuật." },
  { m: 4, level: 2, title: "Biển êm hơn", text: "Thường sóng nhỏ, nhiều ngày nắng.", newbie: "Hợp tập sóng trắng và pop-up.", skilled: "Hợp chỉnh kỹ thuật ở sóng nhỏ." },
  { m: 5, level: 1, title: "Nắng nhiều, sóng ít", text: "Thường ít sóng, nhiều ngày gần như phẳng.", newbie: "Tập chèo ván, thăng bằng và pop-up trên cát là chính.", skilled: "Thường ít sóng để lướt." },
  { m: 6, level: 1, title: "Giữa hè", text: "Sóng thường nhỏ hoặc phẳng.", newbie: "Tập thăng bằng, chèo ván, làm quen nước.", skilled: "Thường ít cơ hội lướt." },
  { m: 7, level: 1, title: "Mặt biển hiền", text: "Thường phẳng hoặc sóng rất nhỏ.", newbie: "Luyện pop-up, làm quen biển không áp lực.", skilled: "Thường ít cơ hội lướt." },
  { m: 8, level: 2, title: "Khó đoán", text: "Sóng không ổn định, đôi lúc có đợt sóng nhỏ.", newbie: "Theo dõi điều kiện từng ngày cùng huấn luyện viên.", skilled: "Có thể có buổi, tuỳ ngày." },
  { m: 9, level: 2, title: "Sóng quay lại", text: "Sóng bắt đầu xuất hiện, thời tiết chuyển mùa.", newbie: "Có thể có buổi học hợp, tuỳ ngày.", skilled: "Sóng dần có lại." },
  { m: 10, level: 3, title: "Mùa mới", text: "Thời tiết biến động, sóng lớn dần.", newbie: "Cần đánh giá kỹ biển trước mỗi buổi.", skilled: "Sóng bắt đầu đáng ra nước." },
  { m: 11, level: 5, title: "Đông bắc rõ hơn", text: "Thường có nhiều sóng và biển mạnh hơn.", newbie: "Thường học trên cát hoặc chờ ngày biển êm.", skilled: "Mùa nhiều sóng cho người đã lướt." },
  { m: 12, level: 4, title: "Nhiều đợt sóng", text: "Có nhiều đợt sóng mạnh, biển thay đổi nhanh.", newbie: "Chọn ngày phù hợp, ưu tiên học trên bờ khi biển mạnh.", skilled: "Nhiều đợt sóng, cần chọn ngày." },
];
export const LEVEL_WORD = ["", "Thường phẳng hoặc rất nhỏ", "Thường sóng nhỏ", "Thường sóng vừa", "Thường sóng khá lớn", "Thường nhiều sóng lớn"];
