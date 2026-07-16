# Blog automation contract

Prefer MCP tools when available:

- `list_categories` returns category `id` / `slug` — **required** before creating a draft.
- `list_recent_posts` checks existing posts and drafts.
- `upload_cover` uploads a generated image and returns `cover_url` (`media.url`).
- `create_blog_draft` creates a draft post. Pass `cover_url` from `upload_cover` (never an OpenAI CDN URL). Pass `category_id` or `category_slug`.

Use direct production API calls only when MCP tools are unavailable.

## Production API fallback

Origin: `https://trancongtien.com`

All requests must include:

```http
Authorization: Bearer <CONTENT_AUTOMATION_TOKEN>
```

## List categories

`GET /api/admin/categories`

Response includes `{ categories: [{ id, name, slug, description }] }`.

## Upload cover

`POST /api/admin/upload` as `multipart/form-data`:

- `file`: generated image, maximum 10 MB
- `alt`: accurate Vietnamese alternative text

Use `media.url` or `cover_url` from the JSON response as `coverUrl`. Do **not** store OpenAI/DALL-E temporary URLs on the post.

## Create draft

`POST /api/admin/posts` as JSON:

```json
{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "content": "<p>...</p>",
  "coverUrl": "/api/uploads/...",
  "coverAlt": "...",
  "tags": ["..."],
  "status": "DRAFT",
  "readTime": "8 phút đọc",
  "categorySlug": "tu-duy-san-pham"
}
```

Automation authentication always forces `DRAFT`, and **requires** a valid category (`categoryId` or `categorySlug`) plus a cover from `/api/uploads/...`.

Known category slugs:

- `tu-duy-san-pham`
- `kien-truc-he-thong`
- `frontend`
- `ai-san-pham`

## Verification

A successful create returns HTTP 200 with `post`, `post.status` equal to `DRAFT`, `post.category`, and `adminHref` like `/admin/posts/<id>`.
