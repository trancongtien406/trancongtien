# Blog automation contract

Prefer MCP tools when available:

- `list_categories` — pick `category_slug`.
- `list_recent_posts` — avoid duplicates.
- `create_blog_draft` — one-step write: article fields + `category_slug` + **`image_base64`** (preferred).
- `upload_cover` — optional; same `image_base64` / `image_url` rules.

## Cover image (critical)

ChatGPT-generated image **URLs are usually not fetchable** by the MCP server (401 internal auth, 404 expired links).

**Always prefer `image_base64`:**

- Encode the generated cover as base64, or `data:image/png;base64,...`
- Pass it to `create_blog_draft.image_base64`

Use `image_url` only when the URL is a **public HTTPS** link with no auth (rare for ChatGPT images).

## MCP `create_blog_draft` fields

Required:

- `title`, `slug`, `excerpt`, `content`, `cover_alt`, `tags`, `category_slug`
- `image_base64` **or** `image_url` (exactly one; prefer base64)

Optional:

- `read_time`

## Known category slugs

- `tu-duy-san-pham`
- `kien-truc-he-thong`
- `frontend`
- `ai-san-pham`

## Production API fallback

Origin: `https://trancongtien.com`

```http
Authorization: Bearer <CONTENT_AUTOMATION_TOKEN>
```

Upload: `POST /api/admin/upload` multipart (`file`, `alt`)  
Draft: `POST /api/admin/posts` JSON with `categorySlug`, `coverUrl` from upload.

## ChatGPT connector issues

- `Resource not found: ...upload_cover` — reconnect MCP connector; use `create_blog_draft` only.
- Image URL 401/404 — switch to **image_base64**.
