import type { BookingResource, MockBusyInterval, Ritual, RitualGoal } from "./types";

const img = (n: string) => `/images/demos/mien-an/ma-${n}`;

export const RITUALS: readonly Ritual[] = [
  {
    id: "R01", slug: "an-nhien", name: "An Nhiên", subtitle: "Massage thư giãn toàn thân",
    description: "Những chuyển động nhẹ nhàng kết hợp dầu massage, dành cho những ngày bạn muốn thả lỏng và nghỉ ngơi.",
    durationMinutes: 60, priceVnd: 490000, goals: ["relax"], primaryGoal: "relax",
    pressures: ["light", "medium"], pressureLabel: "Nhẹ đến vừa", usesHotStone: false, supportsUnscented: true,
    image: img("an-nhien"), imageAlt: "Đôi tay xoa dầu massage trước khi chạm vào lưng khách trên khăn trắng",
    suitableFor: "Nhu cầu thư giãn toàn thân.",
    steps: [{ label: "Trao đổi", minutes: 5 }, { label: "Massage", minutes: 50 }, { label: "Nghỉ", minutes: 5 }],
    notes: ["Có thể lựa chọn dầu không hương liệu."],
  },
  {
    id: "R02", slug: "moc-nhiet", name: "Mộc Nhiệt", subtitle: "Liệu trình đá ấm",
    description: "Đá bazan nóng đặt dọc lưng và vai, kết hợp massage chậm, cho cảm giác ấm sâu và dễ chịu.",
    durationMinutes: 90, priceVnd: 790000, goals: ["body", "relax"], primaryGoal: "body",
    pressures: ["medium"], pressureLabel: "Vừa", usesHotStone: true, supportsUnscented: true,
    image: img("moc-nhiet"), imageAlt: "Cột đá bazan đen xếp chồng và vài hoa hồi khô trên nền khăn trắng",
    suitableFor: "Người yêu thích cảm giác ấm và thư giãn cơ thể.",
    steps: [{ label: "Chuẩn bị", minutes: 10 }, { label: "Chăm sóc", minutes: 70 }, { label: "Nghỉ", minutes: 10 }],
    notes: ["Không gợi ý cho người nhạy cảm với nhiệt."],
  },
  {
    id: "R03", slug: "thanh-moc", name: "Thanh Mộc", subtitle: "Chăm sóc da mặt dịu nhẹ",
    description: "Làm sạch, massage nhẹ và dưỡng ẩm trong một liệu trình chú trọng cảm giác dễ chịu của làn da.",
    durationMinutes: 60, priceVnd: 590000, goals: ["face"], primaryGoal: "face",
    pressures: ["light"], pressureLabel: "Nhẹ", usesHotStone: false, supportsUnscented: true,
    image: img("thanh-moc"), imageAlt: "Đĩa gỗ với cánh hoa hồng nhạt và nến nổi trên nền vải linen kem",
    suitableFor: "Nhu cầu chăm sóc da và thư giãn.",
    steps: [{ label: "Làm sạch", minutes: 10 }, { label: "Massage", minutes: 20 }, { label: "Dưỡng", minutes: 25 }, { label: "Nghỉ", minutes: 5 }],
    notes: ["Thành phần sản phẩm có thể thay đổi theo thời điểm; hãy báo trước nếu bạn có tiền sử dị ứng."],
  },
  {
    id: "R04", slug: "tinh-tam", name: "Tĩnh Tâm", subtitle: "Chăm sóc đầu, cổ và vai",
    description: "Một khoảng nghỉ ngắn với những chuyển động nhẹ nhàng tập trung vào vùng đầu, cổ và vai.",
    durationMinutes: 45, priceVnd: 350000, goals: ["head", "relax"], primaryGoal: "head",
    pressures: ["light", "medium"], pressureLabel: "Nhẹ đến vừa", usesHotStone: false, supportsUnscented: true,
    image: img("tinh-tam"), imageAlt: "Đôi tay thoa dầu ấm phía trên lưng, ánh sáng hổ phách dịu",
    suitableFor: "Người muốn dành một khoảng thời gian ngắn để nghỉ ngơi.",
    steps: [{ label: "Chuẩn bị", minutes: 5 }, { label: "Chăm sóc", minutes: 35 }, { label: "Nghỉ", minutes: 5 }],
    notes: [],
  },
  {
    id: "R05", slug: "duong-nguyen", name: "Dưỡng Nguyên", subtitle: "Liệu trình chăm sóc toàn diện",
    description: "Massage toàn thân rồi chăm sóc da mặt trong một lần, dành cho ngày bạn có hơn hai tiếng để nghỉ.",
    durationMinutes: 120, priceVnd: 1190000, goals: ["full", "relax", "body", "face"], primaryGoal: "full",
    pressures: ["light", "medium"], pressureLabel: "Nhẹ đến vừa", usesHotStone: false, supportsUnscented: true,
    image: img("duong-nguyen"), imageAlt: "Giường massage phủ khăn trắng cuộn, nến và lọ tinh dầu trên kệ gỗ tối",
    suitableFor: "Nhu cầu chăm sóc kết hợp.",
    steps: [{ label: "Chuẩn bị", minutes: 10 }, { label: "Cơ thể", minutes: 60 }, { label: "Da mặt", minutes: 40 }, { label: "Nghỉ", minutes: 10 }],
    notes: [],
  },
  {
    id: "R06", slug: "nhe-buoc", name: "Nhẹ Bước", subtitle: "Ngâm chân và massage bàn chân",
    description: "Bắt đầu với nước ấm, tiếp nối bằng những chuyển động nhẹ nhàng trên bàn chân, dành cho một khoảng nghỉ sau ngày dài.",
    durationMinutes: 45, priceVnd: 320000, goals: ["feet"], primaryGoal: "feet",
    pressures: ["light", "medium"], pressureLabel: "Nhẹ đến vừa", usesHotStone: false, supportsUnscented: true,
    image: img("nhe-buoc"), imageAlt: "Đôi bàn chân trong làn nước ấm xanh rêu, mặt nước gợn nhẹ",
    suitableFor: "Người muốn chăm sóc bàn chân.",
    steps: [{ label: "Ngâm chân", minutes: 10 }, { label: "Massage", minutes: 30 }, { label: "Nghỉ", minutes: 5 }],
    notes: ["Có thể bỏ bước ngâm nước ấm nếu không phù hợp."],
  },
];

export const GOALS: { value: RitualGoal; label: string; hint: string }[] = [
  { value: "relax", label: "Thư giãn toàn thân", hint: "Thả lỏng, nghỉ ngơi" },
  { value: "body", label: "Chăm sóc cơ thể với hơi ấm", hint: "Đá ấm, chuyển động chậm" },
  { value: "face", label: "Chăm sóc da mặt", hint: "Làm sạch và dưỡng ẩm nhẹ" },
  { value: "head", label: "Thả lỏng đầu, cổ và vai", hint: "Một khoảng nghỉ ngắn" },
  { value: "feet", label: "Chăm sóc bàn chân", hint: "Ngâm chân, massage chân" },
  { value: "full", label: "Cả cơ thể và da mặt trong một buổi", hint: "Buổi dài, nhiều thời gian" },
];

export const DURATIONS = [45, 60, 90, 120] as const;

export const RESOURCES: readonly BookingResource[] = [
  { id: "ROOM-01", name: "Phòng An", therapist: "Kỹ thuật viên phòng An", supportedRitualIds: ["R01", "R02", "R04", "R06"] },
  { id: "ROOM-02", name: "Phòng Miên", therapist: "Kỹ thuật viên phòng Miên", supportedRitualIds: ["R01", "R03", "R04", "R05", "R06"] },
];

const m = (h: number, min = 0) => h * 60 + min;
export const BUSY: readonly MockBusyInterval[] = [
  { id: "b1", resourceId: "ROOM-01", dayOffset: 0, startMinutes: m(10), endMinutes: m(11, 15) },
  { id: "b2", resourceId: "ROOM-02", dayOffset: 0, startMinutes: m(13), endMinutes: m(14, 15) },
  { id: "b3", resourceId: "ROOM-01", dayOffset: 1, startMinutes: m(9), endMinutes: m(10, 45) },
  { id: "b4", resourceId: "ROOM-02", dayOffset: 1, startMinutes: m(9), endMinutes: m(10, 15) },
  { id: "b5", resourceId: "ROOM-02", dayOffset: 2, startMinutes: m(15), endMinutes: m(17, 15) },
  { id: "b6", resourceId: "ROOM-01", dayOffset: 3, startMinutes: m(9), endMinutes: m(20) },
  { id: "b7", resourceId: "ROOM-02", dayOffset: 3, startMinutes: m(9), endMinutes: m(20) },
  { id: "b8", resourceId: "ROOM-01", dayOffset: 5, startMinutes: m(16), endMinutes: m(18) },
  { id: "b9", resourceId: "ROOM-02", dayOffset: 5, startMinutes: m(16, 30), endMinutes: m(18, 30) },
  { id: "b10", resourceId: "ROOM-01", dayOffset: 8, startMinutes: m(12), endMinutes: m(14) },
  { id: "b11", resourceId: "ROOM-02", dayOffset: 8, startMinutes: m(12), endMinutes: m(14) },
  { id: "b12", resourceId: "ROOM-02", dayOffset: 12, startMinutes: m(9), endMinutes: m(12) },
];

export const OPEN_MINUTES = 9 * 60;
export const CLOSE_MINUTES = 20 * 60;
export const BUFFER_MINUTES = 15;
export const SLOT_STEP = 30;
export const LEAD_MINUTES = 60;
export const WINDOW_DAYS = 14;
