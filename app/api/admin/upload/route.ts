import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdminOrAutomation } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUploadDir, getUploadUrl, safeUploadName } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { user, mode } = await requireAdminOrAutomation(req);
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const alt = String(form.get("alt") || "");

    if (!file) {
      return NextResponse.json({ error: "Thiếu file" }, { status: 400 });
    }

    if (mode === "automation" && !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Automation chỉ được upload hình ảnh" },
        { status: 400 },
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File vượt quá 10 MB" }, { status: 413 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const safeName = safeUploadName(file.name);
    const dir = getUploadDir();
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, safeName), bytes);

    const url = getUploadUrl(safeName);
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url,
        alt: alt || file.name,
        mimeType: file.type || "application/octet-stream",
        size: bytes.length,
        uploadedById: user.id,
      },
    });

    return NextResponse.json({ ok: true, media });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
