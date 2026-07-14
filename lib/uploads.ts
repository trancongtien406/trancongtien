import path from "path";

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
