/** Care Navigator: dữ liệu và luật điều hướng bảo thủ. Không phải thuật toán lâm sàng, không chẩn đoán. */
export type CareNeed = "pain" | "orthodontics" | "whitening" | "restoration" | "extraction" | "checkup" | "unsure";
export type CareFlag = "breathing" | "bleeding" | "severe_trauma" | "severe_swelling" | "swelling" | "fever" | "severe_pain" | "dental_trauma" | "none" | "unknown";
export type CareOutcome = "emergency" | "urgent" | "assessment" | "planned";

export const NEEDS: { id: CareNeed; label: string; service: string; serviceId: string; prepare: string; hint: string }[] = [
  { id: "pain", label: "Đau hoặc ê buốt răng", service: "Khám đánh giá răng miệng", serviceId: "pain", hint: "Khám đau, ê buốt", prepare: "Ghi lại vị trí khó chịu, thời điểm bắt đầu và điều làm cảm giác thay đổi (nóng, lạnh, nhai, về đêm)." },
  { id: "orthodontics", label: "Tìm hiểu chỉnh nha", service: "Tư vấn chỉnh nha", serviceId: "orthodontics", hint: "Tư vấn chỉnh nha", prepare: "Chuẩn bị mục tiêu của bạn và các câu hỏi về thời gian, chi phí, phương án và những giới hạn." },
  { id: "whitening", label: "Tìm hiểu tẩy trắng", service: "Tư vấn thẩm mỹ răng", serviceId: "whitening", hint: "Tư vấn tẩy trắng", prepare: "Chia sẻ tiền sử ê buốt, các phục hình đang có và mong muốn của bạn. Mức thay đổi màu răng khác nhau ở mỗi người." },
  { id: "restoration", label: "Kiểm tra răng cần trám", service: "Khám phục hồi", serviceId: "restoration", hint: "Tư vấn phục hồi", prepare: "Ghi lại vị trí răng cần kiểm tra và thông tin những lần điều trị trước đây." },
  { id: "extraction", label: "Tìm hiểu nhổ răng", service: "Tư vấn đánh giá răng", serviceId: "extraction", hint: "Tư vấn nhổ răng", prepare: "Chuẩn bị thông tin thuốc đang dùng, dị ứng và bệnh sử để trao đổi trực tiếp với bác sĩ thật." },
  { id: "checkup", label: "Khám định kỳ", service: "Khám tổng quát", serviceId: "checkup", hint: "Khám tổng quát", prepare: "Mang theo hồ sơ nha khoa cũ nếu có và ghi lại những điều bạn muốn hỏi." },
  { id: "unsure", label: "Tôi chưa biết nên chọn gì", service: "Khám tổng quát", serviceId: "checkup", hint: "Khám tổng quát", prepare: "Ghi lại các câu hỏi và mối quan tâm của bạn, bác sĩ sẽ giúp bạn sắp xếp thứ tự." },
];

export const FLAGS: { id: CareFlag; label: string; group: "emergency" | "urgent" | "exclusive" }[] = [
  { id: "breathing", label: "Khó thở hoặc khó nuốt", group: "emergency" },
  { id: "bleeding", label: "Chảy máu nhiều không cầm được", group: "emergency" },
  { id: "severe_trauma", label: "Chấn thương nghiêm trọng vùng mặt hoặc hàm", group: "emergency" },
  { id: "severe_swelling", label: "Sưng nhiều trong miệng hoặc sưng lan vùng mắt, cổ", group: "emergency" },
  { id: "swelling", label: "Sưng vùng má hoặc nướu", group: "urgent" },
  { id: "fever", label: "Sốt kèm vấn đề răng miệng", group: "urgent" },
  { id: "severe_pain", label: "Đau nhiều hoặc đau ngày càng tăng", group: "urgent" },
  { id: "dental_trauma", label: "Răng vĩnh viễn bị bật khỏi ổ hoặc răng bị gãy do chấn thương", group: "urgent" },
  { id: "none", label: "Không có dấu hiệu nào kể trên", group: "exclusive" },
  { id: "unknown", label: "Tôi không chắc", group: "exclusive" },
];

const EMERGENCY_FLAGS: CareFlag[] = ["breathing", "bleeding", "severe_trauma", "severe_swelling"];
const URGENT_FLAGS: CareFlag[] = ["swelling", "fever", "severe_pain", "dental_trauma"];

export function resolveCareOutcome(need: CareNeed, flags: CareFlag[]): CareOutcome {
  if (flags.some((f) => EMERGENCY_FLAGS.includes(f))) return "emergency";
  if (flags.some((f) => URGENT_FLAGS.includes(f))) return "urgent";
  if (flags.length === 0 || flags.includes("unknown") || need === "pain" || need === "extraction" || need === "restoration" || need === "unsure") return "assessment";
  if (flags.length !== 1 || flags[0] !== "none") return "assessment";
  return "planned";
}

export const OUTCOMES: Record<CareOutcome, { title: string; copy: string; tone: "danger" | "warn" | "info" | "ok" }> = {
  emergency: { title: "Cần được hỗ trợ cấp cứu ngay", tone: "danger", copy: "Bạn đã chọn dấu hiệu có thể cần được hỗ trợ y tế khẩn cấp. Hãy đến cơ sở cấp cứu ngay hoặc gọi 115 nếu cần hỗ trợ cấp cứu tại Việt Nam. Không dùng lịch hẹn trên website này để trì hoãn việc tìm kiếm chăm sóc thực tế." },
  urgent: { title: "Nên liên hệ nha khoa thật sớm", tone: "warn", copy: "Một số dấu hiệu bạn chọn cần được đánh giá sớm bởi người có chuyên môn. Hãy liên hệ cơ sở nha khoa thật để được hướng dẫn. Nếu răng vĩnh viễn bị bật khỏi ổ do chấn thương, cần tìm hỗ trợ nha khoa ngay." },
  assessment: { title: "Nên trao đổi trực tiếp với bác sĩ", tone: "info", copy: "Công cụ không có đủ thông tin để định hướng chắc chắn. Hãy trao đổi trực tiếp với bác sĩ nha khoa về những điều bạn đang gặp phải. Dưới đây là những gì bạn có thể chuẩn bị trước." },
  planned: { title: "Tìm hiểu hướng chăm sóc dự kiến", tone: "ok", copy: "Dựa trên nhu cầu bạn chọn, dưới đây là nhóm dịch vụ bạn có thể tìm hiểu. Kết quả không xác định bệnh lý, không loại trừ vấn đề sức khỏe và không có nghĩa là bạn có thể trì hoãn thăm khám." },
};
