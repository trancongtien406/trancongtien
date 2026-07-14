import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = {
  params: Promise<{ filename: string }>;
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

function isSafeFilename(filename: string) {
  return (
    !!filename &&
    filename !== "." &&
    filename !== ".." &&
    !filename.includes("/") &&
    !filename.includes("\\")
  );
}

async function findUploadFile(filename: string) {
  const candidates = [
    path.join(process.cwd(), "uploads", filename),
    path.join(process.cwd(), "public", "uploads", filename),
  ];

  for (const filePath of candidates) {
    try {
      const info = await stat(filePath);
      if (info.isFile()) return filePath;
    } catch {
    }
  }

  return null;
}

export async function GET(_req: Request, { params }: Props) {
  const { filename } = await params;

  if (!isSafeFilename(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = await findUploadFile(filename);
  if (!filePath) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const body = await readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const safeDownloadName = path.basename(filePath).replace(/"/g, "");

  return new NextResponse(body, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": `inline; filename="${safeDownloadName}"`,
      "Content-Type": contentTypes[ext] || "application/octet-stream",
    },
  });
}
