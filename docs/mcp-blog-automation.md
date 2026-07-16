# ChatGPT scheduled blog automation

This repo runs two separate apps from the same codebase:

- Website app: Next.js, exposed at `https://trancongtien.com`, local port `3000`.
- MCP app: ChatGPT automation server, exposed at `https://mcp.trancongtien.com`, local port `3100`.

ChatGPT can research and draft the post, generate a cover image, then call the MCP server to upload the image and create a draft in `trancongtien.com`.

The MCP server does not need an OpenAI API key. The writing and image generation happen inside ChatGPT. The server only receives the final content/image and sends it to the website API.

## Environment

Set these on the VPS:

```bash
SITE_ORIGIN=https://trancongtien.com
CONTENT_AUTOMATION_TOKEN=replace-with-long-random-internal-token
WEB_PORT=3000
MCP_ACCESS_TOKEN=replace-with-different-long-random-external-token
MCP_PORT=3100
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
curl http://127.0.0.1:3000
curl http://127.0.0.1:3100/health
```

## Nginx

Expose the website and MCP app on separate domains:

```nginx
server {
  server_name trancongtien.com www.trancongtien.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
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
    proxy_pass http://127.0.0.1:3100;
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

Use this prompt for the daily 08:00 ChatGPT scheduled task:

```text
Moi ngay luc 08:00 Asia/Ho_Chi_Minh, hay nghien cuu 2-3 chu de blog SEO cho trancongtien.com voi muc tieu tang do phu khi tim "Tran Cong Tien".

Quy trinh:
1. Dung tool list_recent_posts de tranh trung lap chu de.
2. Chon 2-3 chu de co y dinh tim kiem ro rang, lien quan toi Tran Cong Tien, lap trinh web, MERN, Next.js, SEO, portfolio ca nhan, san pham so, freelancer/developer.
3. Viet moi bai bang tieng Viet, giong tu nhien, chuyen sau, khong nhoi tu khoa. Moi bai co title, slug, excerpt, tags, read_time va content HTML/TipTap-friendly.
4. Tao cover image phu hop cho tung bai. Neu co the truyen image_base64 vao tool, dung upload_cover. Neu chi co image URL, chi dung upload_cover khi host da duoc allowlist.
5. Goi create_blog_draft de tao ban nhap. Khong publish.
6. Cuoi cung bao cao ngan gon cac draft da tao: title, slug, va ly do SEO.

Rang buoc SEO:
- Moi bai nen co cum tu "Tran Cong Tien" mot cach tu nhien trong title hoac doan mo dau khi phu hop.
- Uu tien internal link den /ve-toi, /blog, va cac bai lien quan neu thay hop ly.
- Khong sao chep noi dung nguon. Neu dung thong tin moi, tom tat va ghi nguon trong bai.
```
