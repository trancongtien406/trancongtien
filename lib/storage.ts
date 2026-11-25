import { randomUUID } from "crypto";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { resolveR2Settings } from "@/lib/config";
import { getUploadDir, getUploadUrl } from "@/lib/uploads";

type StoredObject = { key: string; url: string; provider: "r2" | "local" };

let r2Client: S3Client | undefined;
let r2ClientKey = "";

function objectKey(extension: string) {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `media/${year}/${month}/${randomUUID()}${extension}`;
}

export async function isR2Configured() {
  return Boolean(await resolveR2Settings());
}

export async function storeUpload(input: {
  bytes: Buffer;
  contentType: string;
  extension: string;
}): Promise<StoredObject> {
  const config = await resolveR2Settings();
  const key = objectKey(input.extension);

  if (config) {
    const clientKey = `${config.accountId}:${config.accessKeyId}:${config.bucket}`;
    if (!r2Client || r2ClientKey !== clientKey) {
      r2Client = new S3Client({
        region: "auto",
        endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        },
      });
      r2ClientKey = clientKey;
    }
    await r2Client.send(
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: key,
        Body: input.bytes,
        ContentType: input.contentType,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
    return { key, url: `${config.publicUrl}/${key}`, provider: "r2" };
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Cloudflare R2 chưa được cấu hình (Settings hoặc env)");
  }

  const filename = path.basename(key);
  const dir = getUploadDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), input.bytes);
  return { key: filename, url: getUploadUrl(filename), provider: "local" };
}
