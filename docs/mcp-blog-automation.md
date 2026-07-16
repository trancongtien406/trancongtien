# ChatGPT scheduled blog automation

This repo runs two separate apps from the same codebase:

- Website app: Next.js, exposed at `https://trancongtien.com`, local port `3342`.
- MCP app: ChatGPT automation server, exposed at `https://mcp.trancongtien.com`, local port `3343`.

ChatGPT can research and draft the post, generate a cover image, then call the MCP server to upload the image and create a draft in `trancongtien.com`.

The MCP server does not need an OpenAI API key. The writing and image generation happen inside ChatGPT. The server only receives the final content/image and sends it to the website API.

## Environment

Set these on the VPS:

```bash
SITE_ORIGIN=https://trancongtien.com
CONTENT_AUTOMATION_TOKEN=replace-with-long-random-internal-token
WEB_PORT=3342
MCP_ACCESS_TOKEN=replace-with-different-long-random-external-token
MCP_PORT=3343
MCP_ALLOWED_IMAGE_HOSTS=
```

Use different long random values for `CONTENT_AUTOMATION_TOKEN` and `MCP_ACCESS_TOKEN`.

`CONTENT_AUTOMATION_TOKEN` must also be set for the Next.js website process, because `/api/admin/posts` and `/api/admin/upload` verify it.

## PM2

Start or restart both processes:

```bash
npm install
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

Or restart only one app:

```bash
pm2 restart trancongtien-web
pm2 restart trancongtien-mcp
```

Check it locally on the VPS:

```bash
curl http://127.0.0.1:3342
curl http://127.0.0.1:3343/health
```

## Nginx

Expose the website and MCP app on separate domains:

```nginx
server {
  server_name trancongtien.com www.trancongtien.com;

  location / {
    proxy_pass http://127.0.0.1:3342;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

server {
  server_name mcp.trancongtien.com;

  location / {
    proxy_pass http://127.0.0.1:3343;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

With this config, the protected MCP URL is:

```text
https://mcp.trancongtien.com/mcp/<MCP_ACCESS_TOKEN>
```

If the ChatGPT connector setup lets you send an Authorization header, use this URL instead:

```text
https://mcp.trancongtien.com/mcp
Authorization: Bearer <MCP_ACCESS_TOKEN>
```

## Scheduled task prompt

Use this prompt for the daily 08:00 ChatGPT scheduled task.

Important: do **1 bài / lần**. Prefer **one** write tool call (`create_blog_draft` with `image_url`) to avoid ChatGPT MCP `Resource not found` on a separate `upload_cover`.

```text
Moi ngay luc 08:00 Asia/Ho_Chi_Minh, tao DUNG 1 ban nhap blog SEO cho trancongtien.com.

Ban CO tool MCP. Khong dung som. Neu tool bao "Resource not found": goi lai list_categories (refresh), roi tiep tuc bang create_blog_draft — KHONG bat buoc upload_cover.

Quy trinh (1 bai):
1. Goi list_categories. Chon 1 category_slug (tu-duy-san-pham | kien-truc-he-thong | frontend | ai-san-pham).
2. Goi list_recent_posts. Chon 1 chu de khong trung.
3. Viet 1 bai tieng Viet: title, slug, excerpt, tags (3-6), content HTML (>=800 ky tu), cover_alt.
4. Tao 1 cover bang tinh nang tao anh ChatGPT. Lay URL HTTPS cua anh.
5. Goi create_blog_draft MOT LAN voi:
   - category_slug
   - image_url = URL anh ChatGPT vua tao
   - title, slug, excerpt, content, cover_alt, tags
   (Tool se tu upload anh + tao DRAFT. Khong can goi upload_cover.)
6. Bao cao: title, slug, category_slug, post.id, /admin/posts/<id>.

Neu create_blog_draft loi: sua input roi goi lai. Chi thanh cong khi co post.id.
```

## Troubleshooting: `Resource not found: Blog_TranCongTien.upload_cover`

This is a **ChatGPT connector bug**, not a failure of your VPS upload API. ChatGPT keeps a stale internal route for some MCP tools; the `tools/call` never reaches `mcp.trancongtien.com`.

Fix on ChatGPT side:

1. Open a **new chat** (or new scheduled-task run).
2. In connector / Developer Mode settings: **refresh / reconnect** the MCP connector `Blog_TranCongTien`.
3. Avoid a separate `upload_cover` hop — use `create_blog_draft` with `image_url` (prompt above).
4. Confirm MCP is up: `curl https://mcp.trancongtien.com/health` should list the four tools.

If `list_categories` / `list_recent_posts` work but write tools fail with Resource not found, reconnect the connector before retrying.
