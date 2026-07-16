# Blog automation contract

Prefer MCP tools when available:

- `list_categories` — pick `category_slug`.
- `list_recent_posts` — avoid duplicates.
- `create_blog_draft` — **preferred one-step write**: pass `image_url` (ChatGPT image HTTPS URL) + article fields + `category_slug`. Server uploads cover and creates DRAFT.
- `upload_cover` — optional; skip if ChatGPT returns `Resource not found` for it.

## Production API fallback

Origin: `https://trancongtien.com`

```http
Authorization: Bearer <CONTENT_AUTOMATION_TOKEN>
```

## Create draft (preferred)

MCP `create_blog_draft` fields:

- `title`, `slug`, `excerpt`, `content`, `cover_alt`, `tags`
- `category_slug` (required)
- `image_url` (required) — ChatGPT-generated image HTTPS URL
- `read_time` (optional)

## Known category slugs

- `tu-duy-san-pham`
- `kien-truc-he-thong`
- `frontend`
- `ai-san-pham`

## ChatGPT `Resource not found`

If ChatGPT says `Resource not found: Blog_TranCongTien.upload_cover`, that is a connector routing bug on ChatGPT's side. Reconnect the MCP connector / start a new chat, and call `create_blog_draft` with `image_url` instead of a separate `upload_cover`.
