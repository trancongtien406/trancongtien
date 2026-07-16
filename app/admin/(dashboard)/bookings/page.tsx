import { Suspense } from "react";
import { BookingsManager } from "@/components/admin/BookingsManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = bookings.map((b) => ({
    id: b.id,
    name: b.name,
    email: b.email,
    phone: b.phone || "",
    projectType: b.projectType || "",
    budget: b.budget || "",
    timeline: b.timeline || "",
    message: b.message,
    status: b.status,
    scheduledAt: b.scheduledAt?.toLocaleString("vi-VN") || "",
    createdAt: b.createdAt.toLocaleString("vi-VN"),
  }));

  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Đang tải liên hệ...</p>}>
      <BookingsManager bookings={rows} />
    </Suspense>
  );
}
