import type { Metadata } from "next";
import { LabClient } from "./LabClient";

export const metadata: Metadata = {
  title: "Lab hiệu ứng (nội bộ)",
  description: "Trang thử nội bộ cho thư viện hiệu ứng hành vi.",
  robots: { index: false, follow: false },
};

export default function LabEffectsPage() {
  return <LabClient />;
}
