import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getLegacyUploadDir, getUploadDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = {
  params: Promise<{ path: string[] }>;
};

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function resolveInside(root: string, segments: string[]) {
  const unsafe = segments.some(
    (segment) =>
      !segment ||
      segment === "." ||
      segment === ".." ||
      segment.includes("/") ||
      segment.includes("\\"),
  );
  if (unsafe) {
    return null;
  }
  return path.join(/*turbopackIgnore: true*/ root, ...segments);
}

async function findUploadFile(segments: string[]) {
  for (const root of [getUploadDir(), getLegacyUploadDir()]) {
    const filePath = resolveInside(root, segments);
    if (!filePath) continue;
    try {
      const info = await stat(filePath);
      if (info.isFile()) return filePath;
    } catch {
    }
  }
  return null;
}

export async function GET(_req: Request, { params }: Props) {
  const { path: segments } = await params;
  const filePath = await findUploadFile(segments);

  if (!filePath) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const body = await readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const filename = path.basename(filePath).replace(/"/g, "");

  return new NextResponse(body, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Content-Type": contentTypes[ext] || "application/octet-stream",
    },
  });
}
