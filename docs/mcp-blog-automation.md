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

Important: do **1 bài / lần**. Cover must reach the server as **image_base64** (preferred). ChatGPT image URLs are often auth-only (401) or expire (404).

```text
Moi ngay luc 08:00 Asia/Ho_Chi_Minh, tao DUNG 1 ban nhap blog SEO cho trancongtien.com.

Ban CO tool MCP. Khong dung som.

Quy trinh (1 bai):
1. Goi list_categories. Chon 1 category_slug (tu-duy-san-pham | kien-truc-he-thong | frontend | ai-san-pham).
2. Goi list_recent_posts. Chon 1 chu de khong trung.
3. Viet 1 bai tieng Viet: title, slug, excerpt, tags (3-6), content HTML (>=800 ky tu), cover_alt.
4. Tao 1 cover bang tinh nang tao anh ChatGPT.
5. Goi create_blog_draft MOT LAN voi:
   - category_slug
   - image_base64 = encode anh cover vua tao (uu tien; co the dung data:image/png;base64,...)
   - title, slug, excerpt, content, cover_alt, tags
   KHONG dung URL noi bo ChatGPT lam image_url (thuong 401).
   Chi dung image_url neu la HTTPS cong khai, khong can auth.
6. Bao cao khi co post.id va /admin/posts/<id>.

Chi thanh cong khi create_blog_draft tra ve post.id.
```

## Troubleshooting: cover image fails

| Symptom | Cause | Fix |
|--------|--------|-----|
| `401` on image_url | ChatGPT internal / signed URL | Use **image_base64** instead |
| `404` on files.oaiusercontent.com | Expired temporary link | Regenerate image, pass **image_base64** |
| `Host ... is not allowed` | URL host not allowlisted | Use **image_base64**, or add host to `MCP_ALLOWED_IMAGE_HOSTS` on VPS |

After code deploy: `pm2 restart trancongtien-mcp`

Default allowlisted hosts now include `files.openai.com`, `files.oaiusercontent.com`, `trancongtien.com`. **image_base64** is still the reliable path for scheduled ChatGPT runs.
