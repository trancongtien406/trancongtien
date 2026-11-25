/** Enum key → nhãn tiếng Việt (dùng value=KEY trong form/select). */

export const PARTNER_TYPE_OPTIONS = [
  { value: "REFERRAL", label: "Giới thiệu (Referral)" },
  { value: "SALES", label: "Bán hàng (Sales)" },
  { value: "AGENCY", label: "Đại lý / Agency" },
] as const;

export const PARTNER_STATUS_OPTIONS = [
  { value: "APPLIED", label: "Đã nộp đơn" },
  { value: "APPROVED", label: "Đã duyệt" },
  { value: "SUSPENDED", label: "Tạm khoá" },
  { value: "REJECTED", label: "Từ chối" },
] as const;

export const LEAD_STATUS_OPTIONS = [
  { value: "NEW", label: "Mới" },
  { value: "CONTACTED", label: "Đã liên hệ" },
  { value: "QUALIFIED", label: "Đủ điều kiện" },
  { value: "MEETING", label: "Họp tư vấn" },
  { value: "PROPOSAL", label: "Đề xuất" },
  { value: "NEGOTIATION", label: "Thương lượng" },
  { value: "WON", label: "Thành công" },
  { value: "LOST", label: "Không thành công" },
] as const;

export const LEAD_PRIORITY_OPTIONS = [
  { value: "LOW", label: "Thấp" },
  { value: "NORMAL", label: "Bình thường" },
  { value: "HIGH", label: "Cao" },
  { value: "URGENT", label: "Khẩn cấp" },
] as const;

export const LEAD_SOURCE_OPTIONS = [
  { value: "WEBSITE", label: "Website" },
  { value: "PARTNER", label: "Đối tác" },
  { value: "REFERRAL", label: "Giới thiệu chung" },
  { value: "ORGANIC", label: "Organic" },
  { value: "SOCIAL", label: "Mạng xã hội" },
  { value: "OUTBOUND", label: "Outbound" },
  { value: "EXISTING_CUSTOMER", label: "Khách cũ" },
  { value: "ESTIMATOR", label: "Máy ước tính" },
  { value: "OTHER", label: "Khác" },
] as const;

export const LEAD_SCORE_BAND_OPTIONS = [
  { value: "HOT", label: "Nóng (HOT)" },
  { value: "WARM", label: "Ấm (WARM)" },
  { value: "COLD", label: "Lạnh (COLD)" },
] as const;

export const PAYMENT_STATUS_OPTIONS = [
  { value: "PENDING", label: "Chờ nhận" },
  { value: "RECEIVED", label: "Đã nhận" },
  { value: "REFUNDED", label: "Hoàn tiền" },
  { value: "CANCELLED", label: "Huỷ" },
] as const;

export const COMMISSION_STATUS_OPTIONS = [
  { value: "PENDING", label: "Chờ ghi nhận" },
  { value: "EARNED", label: "Đã ghi nhận" },
  { value: "PAID", label: "Đã trả" },
  { value: "CANCELLED", label: "Huỷ" },
] as const;

export const PROPOSAL_STATUS_OPTIONS = [
  { value: "DRAFT", label: "Nháp" },
  { value: "SENT", label: "Đã gửi" },
  { value: "ACCEPTED", label: "Đã chấp nhận" },
  { value: "REJECTED", label: "Từ chối" },
  { value: "CANCELLED", label: "Huỷ" },
] as const;

export const CONTENT_STATUS_OPTIONS = [
  { value: "DRAFT", label: "Nháp" },
  { value: "PUBLISHED", label: "Đã xuất bản" },
  { value: "ARCHIVED", label: "Lưu trữ" },
] as const;

const LABEL_MAP: Record<string, string> = Object.fromEntries(
  [
    ...LEAD_SOURCE_OPTIONS,
    ...LEAD_STATUS_OPTIONS,
    ...LEAD_PRIORITY_OPTIONS,
    ...LEAD_SCORE_BAND_OPTIONS,
    ...PAYMENT_STATUS_OPTIONS,
    ...COMMISSION_STATUS_OPTIONS,
    ...PROPOSAL_STATUS_OPTIONS,
    ...CONTENT_STATUS_OPTIONS,
    ...PARTNER_STATUS_OPTIONS,
    // Partner type sau cùng để REFERRAL = loại đối tác
    ...PARTNER_TYPE_OPTIONS,
  ].map((item) => [item.value, item.label]),
);

export function enumLabel(value: string | null | undefined, fallback?: string) {
  if (!value) return fallback || "—";
  return LABEL_MAP[value] || fallback || value;
}
