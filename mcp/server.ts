import "dotenv/config";

import crypto from "crypto";
import express, { type Request, type Response, type NextFunction } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import * as z from "zod/v4";

const PORT = Number(process.env.MCP_PORT || 3100);
const SITE_ORIGIN = (process.env.SITE_ORIGIN || "https://trancongtien.com").replace(/\/$/, "");
const CONTENT_AUTOMATION_TOKEN = process.env.CONTENT_AUTOMATION_TOKEN || "";
const MCP_ACCESS_TOKEN = process.env.MCP_ACCESS_TOKEN || "";
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

/** Hosts ChatGPT / OpenAI commonly use for generated images. */
const DEFAULT_IMAGE_HOSTS = [
  "oaidalleapiprodscus.blob.core.windows.net",
  "files.oaiusercontent.com",
  "cdn.openai.com",
  "chatgpt.com",
];

const allowedImageHosts = new Set(
  [
    ...DEFAULT_IMAGE_HOSTS,
    ...(process.env.MCP_ALLOWED_IMAGE_HOSTS || "")
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean),
  ].map((h) => h.toLowerCase()),
);

type RecentPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  status?: string;
  readTime?: string;
  updatedAt?: string;
  coverUrl?: string | null;
  category?: { id?: string; name?: string; slug?: string } | null;
};

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

function requireEnv() {
  const missing = [
    !CONTENT_AUTOMATION_TOKEN ? "CONTENT_AUTOMATION_TOKEN" : "",
    !MCP_ACCESS_TOKEN ? "MCP_ACCESS_TOKEN" : "",
  ].filter(Boolean);

  if (missing.length) {
    throw new Error(`Missing required env: ${missing.join(", ")}`);
  }
}

function timingSafeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function getBearerToken(req: Request) {
  const auth = req.header("authorization") || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

function requireMcpAccess(req: Request, res: Response, next: NextFunction) {
  const routeToken = req.params.token;
  const token = (Array.isArray(routeToken) ? routeToken[0] : routeToken) || getBearerToken(req);
  if (!token || !timingSafeEqual(token, MCP_ACCESS_TOKEN)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

async function siteFetch(pathname: string, init?: RequestInit) {
  const res = await fetch(`${SITE_ORIGIN}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${CONTENT_AUTOMATION_TOKEN}`,
      ...(init?.headers || {}),
    },
  });

  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    throw new Error(`Website API ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

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
      return ".webp";
  }
}

function ensureFilename(filename: string, mime: string) {
  const base = filename.replace(/\.[a-z0-9]+$/i, "") || "cover";
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  return `${safe}${extensionForMime(mime)}`;
}

function decodeBase64Image(imageBase64: string) {
  const cleaned = imageBase64.replace(/^data:image\/[a-z0-9.+-]+;base64,/i, "");
  const bytes = Buffer.from(cleaned, "base64");
  if (!bytes.length) throw new Error("image_base64 is empty");
  if (bytes.length > MAX_IMAGE_BYTES) throw new Error("Image is larger than 10 MB");
  return bytes;
}

async function fetchAllowedImage(url: string) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:") {
    throw new Error("image_url must use HTTPS");
  }
  if (!allowedImageHosts.has(parsed.hostname.toLowerCase())) {
    throw new Error(
      `Host ${parsed.hostname} is not allowed. Prefer image_base64, or add the host to MCP_ALLOWED_IMAGE_HOSTS.`,
    );
  }

  const res = await fetch(parsed);
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`);

  const type = res.headers.get("content-type") || "";
  if (type && !type.startsWith("image/") && !type.includes("octet-stream")) {
    throw new Error(`image_url returned non-image content-type: ${type || "unknown"}`);
  }

  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length > MAX_IMAGE_BYTES) throw new Error("Image is larger than 10 MB");
  const sniffed = sniffImageMime(bytes);
  return {
    bytes,
    contentType: sniffed || (type.startsWith("image/") ? type.split(";")[0] : null) || "image/webp",
  };
}

function ensureCoverUrl(url: string) {
  const trimmed = url.trim();
  if (trimmed.startsWith("/api/uploads/")) return trimmed;
  if (trimmed.startsWith(`${SITE_ORIGIN}/api/uploads/`)) {
    return trimmed.slice(SITE_ORIGIN.length);
  }
  // Common agent mistake: pass absolute site URL without noticing
  try {
    const parsed = new URL(trimmed);
    if (parsed.pathname.startsWith("/api/uploads/")) {
      return parsed.pathname;
    }
  } catch {
    // ignore
  }
  throw new Error(
    "cover_url must be media.url from upload_cover (e.g. /api/uploads/...). Do not pass OpenAI/DALL-E URLs as cover_url.",
  );
}

async function uploadCover(input: {
  filename: string;
  mime_type?: string;
  alt: string;
  image_base64?: string;
  image_url?: string;
}) {
  const hasBase64 = Boolean(input.image_base64?.trim());
  const hasUrl = Boolean(input.image_url?.trim());
  if (hasBase64 === hasUrl) {
    throw new Error("Provide exactly one of image_base64 or image_url");
  }

  const image = hasBase64
    ? (() => {
        const bytes = decodeBase64Image(input.image_base64 || "");
        const sniffed = sniffImageMime(bytes);
        const contentType =
          sniffed ||
          (input.mime_type && input.mime_type.startsWith("image/")
            ? input.mime_type
            : "image/webp");
        return { bytes, contentType };
      })()
    : await fetchAllowedImage(input.image_url || "");

  const filename = ensureFilename(input.filename, image.contentType);
  const blob = new Blob([new Uint8Array(image.bytes)], { type: image.contentType });
  const form = new FormData();
  form.set("file", blob, filename);
  form.set("alt", input.alt);

  const data = (await siteFetch("/api/admin/upload", {
    method: "POST",
    body: form,
  })) as { media?: { id: string; url: string; alt: string; mimeType?: string } };

  if (!data.media?.url?.startsWith("/api/uploads/")) {
    throw new Error(`Upload succeeded but media.url is invalid: ${JSON.stringify(data)}`);
  }

  return {
    ...data,
    /** Convenience aliases so agents copy the right field into create_blog_draft */
    cover_url: data.media.url,
    cover_media_id: data.media.id,
  };
}

function createServer() {
  const server = new McpServer({
    name: "trancongtien-blog-automation",
    version: "1.2.0",
  });

  server.registerTool(
    "list_categories",
    {
      title: "List blog categories",
      description:
        "List available blog categories (id, name, slug). Always call this before create_blog_draft and pass category_id or category_slug.",
      inputSchema: {},
      annotations: {
        readOnlyHint: true,
        openWorldHint: true,
      },
    },
    async () => {
      const data = (await siteFetch("/api/admin/categories")) as {
        categories?: CategoryRow[];
      };
      const categories = data.categories || [];
      return {
        content: [{ type: "text", text: JSON.stringify({ categories }, null, 2) }],
        structuredContent: { categories },
      };
    },
  );

  server.registerTool(
    "list_recent_posts",
    {
      title: "List recent blog posts",
      description: "Read recent posts so the scheduled writer can avoid duplicate topics and internal-link naturally.",
      inputSchema: {
        limit: z.number().int().min(1).max(50).default(20),
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: true,
      },
    },
    async ({ limit }) => {
      const data = (await siteFetch("/api/admin/posts")) as { posts?: RecentPost[] };
      const posts = (data.posts || []).slice(0, limit).map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        status: post.status,
        readTime: post.readTime,
        updatedAt: post.updatedAt,
        coverUrl: post.coverUrl || null,
        category: post.category
          ? {
              id: post.category.id || null,
              name: post.category.name || null,
              slug: post.category.slug || null,
            }
          : null,
      }));

      return {
        content: [{ type: "text", text: JSON.stringify({ posts }, null, 2) }],
        structuredContent: { posts },
      };
    },
  );

  server.registerTool(
    "upload_cover",
    {
      title: "Upload cover image",
      description:
        "Upload a ChatGPT-generated cover. Pass image_url (HTTPS URL of the generated image). Returns cover_url like /api/uploads/.... Prefer skipping this tool and passing image_url directly to create_blog_draft instead.",
      inputSchema: {
        filename: z.string().min(3).describe("e.g. cover-seo-nextjs.png"),
        alt: z.string().min(3).describe("Vietnamese alt text"),
        image_url: z.string().min(8).describe("HTTPS URL of the ChatGPT-generated image"),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    async (input) => {
      const data = await uploadCover({
        filename: input.filename,
        alt: input.alt,
        image_url: input.image_url,
        mime_type: "image/png",
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                cover_url: data.cover_url,
                cover_media_id: data.cover_media_id,
                media: data.media,
              },
              null,
              2,
            ),
          },
        ],
        structuredContent: data,
      };
    },
  );

  server.registerTool(
    "create_blog_draft",
    {
      title: "Create blog draft",
      description:
        "PREFERRED one-step draft creator. Pass category_slug + image_url (ChatGPT image HTTPS URL) + article fields. Server uploads the cover and creates a DRAFT. Do not require a separate upload_cover call.",
      inputSchema: {
        title: z.string().min(10).max(120),
        slug: z.string().min(3).max(120),
        excerpt: z.string().min(40).max(220),
        content: z.string().min(800),
        cover_alt: z.string().min(3),
        tags: z.array(z.string().min(1).max(40)).min(1).max(12),
        category_slug: z.string().min(1).describe("From list_categories, e.g. frontend"),
        image_url: z
          .string()
          .min(8)
          .describe("HTTPS URL of ChatGPT-generated cover image"),
        read_time: z.string().min(3).max(30).optional(),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    async (input) => {
      const uploaded = await uploadCover({
        filename: `${input.slug}-cover.png`,
        mime_type: "image/png",
        alt: input.cover_alt,
        image_url: input.image_url,
      });

      const data = (await siteFetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt,
          content: input.content,
          coverUrl: uploaded.cover_url,
          coverMediaId: uploaded.cover_media_id,
          coverAlt: input.cover_alt,
          tags: input.tags,
          readTime: input.read_time || "5 phút đọc",
          categorySlug: input.category_slug,
          status: "DRAFT",
        }),
      })) as Record<string, unknown>;

      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        structuredContent: data,
      };
    },
  );

  return server;
}

async function handleMcp(req: Request, res: Response) {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on("close", () => {
    transport.close();
    server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}

requireEnv();

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "16mb" }));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "trancongtien-blog-mcp",
    tools: ["list_categories", "list_recent_posts", "upload_cover", "create_blog_draft"],
  });
});

app.post("/mcp", requireMcpAccess, handleMcp);
app.post("/mcp/:token", requireMcpAccess, handleMcp);
app.get(["/mcp", "/mcp/:token"], (_req, res) => {
  res.status(405).json({ error: "Method not allowed" });
});
app.delete(["/mcp", "/mcp/:token"], (_req, res) => {
  res.status(405).json({ error: "Method not allowed" });
});

app.listen(PORT, () => {
  console.log(`trancongtien blog MCP listening on :${PORT}`);
});
