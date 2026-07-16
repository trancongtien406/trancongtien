import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdminOrAutomation } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUploadDir, getUploadUrl, safeUploadName } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function sniffImageMime(bytes: Buffer): string | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    bytes.length >= 12 &&
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  if (bytes.length >= 12 && bytes.toString("ascii", 4, 8) === "ftyp") {
    return "image/avif";
  }
  return null;
}

function extensionForMime(mime: string) {
  switch (mime) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/avif":
      return ".avif";
    default:
      return "";
  }
}

export async function POST(req: Request) {
  try {
    const { user, mode } = await requireAdminOrAutomation(req);
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const alt = String(form.get("alt") || "");

    if (!file) {
      return NextResponse.json({ error: "Thiếu file" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File vượt quá 10 MB" }, { status: 413 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const sniffed = sniffImageMime(bytes);
    const mimeType = sniffed || file.type || "application/octet-stream";

    if (mode === "automation") {
      if (!mimeType.startsWith("image/") && !sniffed) {
        return NextResponse.json(
          { error: "Automation chỉ được upload hình ảnh" },
          { status: 400 },
        );
      }
    }

    let originalName = file.name || "upload.bin";
    const ext = extensionForMime(mimeType);
    if (ext && !/\.(jpe?g|png|webp|avif|gif)$/i.test(originalName)) {
      originalName = `${originalName.replace(/\.[^.]+$/, "") || "cover"}${ext}`;
    }

    const safeName = safeUploadName(originalName);
    const dir = getUploadDir();
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, safeName), bytes);

    const url = getUploadUrl(safeName);
    const media = await prisma.media.create({
      data: {
        filename: originalName,
        url,
        alt: alt || originalName,
        mimeType: sniffed || mimeType,
        size: bytes.length,
        uploadedById: user.id,
      },
    });

    return NextResponse.json({
      ok: true,
      media,
      cover_url: media.url,
      cover_media_id: media.id,
    });
  } catch (error) {
    console.error("[admin/upload]", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
