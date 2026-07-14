import { MediaManager } from "@/components/admin/MediaManager";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <MediaManager
      items={media.map((m) => ({
        id: m.id,
        filename: m.filename,
        url: m.url,
        alt: m.alt,
        mimeType: m.mimeType,
        size: m.size,
        createdAt: m.createdAt.toLocaleString("vi-VN"),
      }))}
    />
  );
}
