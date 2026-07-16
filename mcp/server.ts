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
const allowedImageHosts = new Set(
  (process.env.MCP_ALLOWED_IMAGE_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean),
);

type RecentPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  status?: string;
  readTime?: string;
  updatedAt?: string;
  category?: { name?: string } | null;
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
      `Host ${parsed.hostname} is not in MCP_ALLOWED_IMAGE_HOSTS. Use image_base64 or add this host to the allowlist.`,
    );
  }

  const res = await fetch(parsed);
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`);

  const type = res.headers.get("content-type") || "";
  if (!type.startsWith("image/")) {
    throw new Error(`image_url returned non-image content-type: ${type || "unknown"}`);
  }

  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length > MAX_IMAGE_BYTES) throw new Error("Image is larger than 10 MB");
  return { bytes, contentType: type.split(";")[0] || "image/webp" };
}

function ensureCoverUrl(url: string) {
  if (url.startsWith("/api/uploads/")) return url;
  if (url.startsWith(`${SITE_ORIGIN}/api/uploads/`)) return url.slice(SITE_ORIGIN.length);
  throw new Error("cover_url must be a media URL returned by upload_cover");
}

async function uploadCover(input: {
  filename: string;
  mime_type: string;
  alt: string;
  image_base64?: string;
  image_url?: string;
}) {
  const hasBase64 = Boolean(input.image_base64);
  const hasUrl = Boolean(input.image_url);
  if (hasBase64 === hasUrl) {
    throw new Error("Provide exactly one of image_base64 or image_url");
  }

  const image = hasBase64
    ? { bytes: decodeBase64Image(input.image_base64 || ""), contentType: input.mime_type }
    : await fetchAllowedImage(input.image_url || "");

  const blob = new Blob([image.bytes], { type: image.contentType });
  const form = new FormData();
  form.set("file", blob, input.filename);
  form.set("alt", input.alt);

  return siteFetch("/api/admin/upload", {
    method: "POST",
    body: form,
  });
}

function createServer() {
  const server = new McpServer({
    name: "trancongtien-blog-automation",
    version: "1.0.0",
  });

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
        category: post.category?.name || null,
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
        "Upload a generated cover image to trancongtien.com. Prefer image_base64. image_url only works for allowlisted hosts.",
      inputSchema: {
        filename: z.string().min(3),
        mime_type: z.enum(["image/webp", "image/png", "image/jpeg", "image/avif"]).default("image/webp"),
        alt: z.string().min(3),
        image_base64: z.string().optional(),
        image_url: z.string().url().optional(),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    async (input) => {
      const data = (await uploadCover(input)) as { media?: { id: string; url: string; alt: string } };
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        structuredContent: data,
      };
    },
  );

  server.registerTool(
    "create_blog_draft",
    {
      title: "Create blog draft",
      description:
        "Create a DRAFT blog post on trancongtien.com from researched SEO content. Publishing still requires admin review.",
      inputSchema: {
        title: z.string().min(10).max(120),
        slug: z.string().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
        excerpt: z.string().min(40).max(220),
        content: z.string().min(800),
        cover_url: z.string().min(3),
        cover_alt: z.string().min(3),
        tags: z.array(z.string().min(1).max(40)).min(1).max(12),
        read_time: z.string().min(3).max(30).default("5 phút đọc"),
        category_id: z.string().nullable().optional(),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
    },
    async (input) => {
      const data = (await siteFetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt,
          content: input.content,
          coverUrl: ensureCoverUrl(input.cover_url),
          coverAlt: input.cover_alt,
          tags: input.tags,
          readTime: input.read_time,
          categoryId: input.category_id || null,
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
  res.json({ ok: true, service: "trancongtien-blog-mcp" });
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
