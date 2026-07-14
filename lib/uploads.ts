import path from "path";
import { readFile, stat } from "fs/promises";

export function getUploadDir() {
  return path.join(/*turbopackIgnore: true*/ process.cwd(), "uploads");
}

export function getLegacyUploadDir() {
  return path.join(
    /*turbopackIgnore: true*/ process.cwd(),
    "public",
    "uploads",
  );
}

export function safeUploadName(filename: string) {
  return `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
}

export function getUploadUrl(filename: string) {
  return `/api/uploads/${filename}`;
}

export const uploadContentTypes: Record<string, string> = {
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

export function isSafeUploadFilename(filename: string) {
  return (
    !!filename &&
    filename !== "." &&
    filename !== ".." &&
    !filename.includes("/") &&
    !filename.includes("\\")
  );
}

export async function findUploadFile(filename: string) {
  const candidates = [
    path.join(getUploadDir(), filename),
    path.join(getLegacyUploadDir(), filename),
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

export async function readUploadFile(filename: string) {
  if (!isSafeUploadFilename(filename)) {
    return { status: 400 as const, error: "Invalid filename" };
  }

  const filePath = await findUploadFile(filename);
  if (!filePath) {
    return { status: 404 as const, error: "File not found" };
  }

  const body = await readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const safeDownloadName = path.basename(filePath).replace(/"/g, "");

  return {
    status: 200 as const,
    body,
    filename: safeDownloadName,
    contentType: uploadContentTypes[ext] || "application/octet-stream",
  };
}
