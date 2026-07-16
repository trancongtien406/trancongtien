# Blog automation contract

Prefer MCP tools when available:

- `list_recent_posts` checks existing posts and drafts.
- `upload_cover` uploads a generated image and returns `media.url`.
- `create_blog_draft` creates a draft post. Use the URL returned by `upload_cover` as `cover_url`.

Use direct production API calls only when MCP tools are unavailable.

## Production API fallback

Origin: `https://trancongtien.com`

All requests must include:

```http
Authorization: Bearer <CONTENT_AUTOMATION_TOKEN>
```

## Upload cover

`POST /api/admin/upload` as `multipart/form-data`:

- `file`: generated image, maximum 10 MB
- `alt`: accurate Vietnamese alternative text

Use `media.url` from the JSON response as `coverUrl`.

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
  "categoryId": null
}
```

Automation authentication always forces `DRAFT`, even if another status is sent.

## Verification

A successful create returns HTTP 200 with `post`, `post.status` equal to `DRAFT`, and `source` equal to `automation`. Review at `/admin/posts/<post.id>`.
