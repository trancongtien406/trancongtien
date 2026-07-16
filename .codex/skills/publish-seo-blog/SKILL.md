---
name: publish-seo-blog
description: Research useful Vietnamese SEO topics for trancongtien.com, generate matching cover images, upload them, and create reviewable blog drafts through MCP tools or the production API. Use for scheduled or manual blog-production runs for the Trần Công Tiến personal brand.
---

# Publish SEO Blog

Create one to three original, evidence-based Vietnamese blog drafts per run. Never edit `prisma/seed.ts` or write directly to the database.

## Required tools and environment

- Use web research for current claims and primary sources.
- Invoke the installed `imagegen` skill and use its built-in image tool for the cover.
- Prefer MCP tools when available: `list_recent_posts`, `upload_cover`, and `create_blog_draft`.
- If MCP tools are unavailable, read `CONTENT_AUTOMATION_TOKEN` from the environment and use `https://trancongtien.com` as the API origin. Never print or log the token.
- Read [references/api.md](references/api.md) before calling either MCP tools or the API.

## Workflow

1. Review the live blog and recent drafts through `list_recent_posts` or the authenticated API. Avoid duplicate search intent, titles, and slugs.
2. Select one topic from Full-stack/Web App, product development, UI/UX, AI Agent, automation, or a first-hand Trần Công Tiến case study.
3. Research current facts from primary sources. Write for readers first; do not manufacture experience, clients, metrics, quotes, or project results.
4. Produce a Vietnamese article with:
   - a specific title and slug;
   - a concise excerpt;
   - semantic HTML content with one clear topic, useful H2/H3 sections, and a practical conclusion;
   - 3–6 natural tags;
   - contextual internal links to relevant pages on trancongtien.com;
   - a natural author/entity mention only where relevant, without keyword stuffing.
5. Generate one wide, editorial cover image without text, logos, or watermarks. Match the article subject and the site's clean blue/coral visual language. Save the final image inside the workspace temporarily.
6. Upload the cover with accurate Vietnamese alt text using `upload_cover` or the production upload endpoint.
7. Create the post through `create_blog_draft` or the production posts endpoint. Always request `DRAFT`; the API also enforces `DRAFT` for automation tokens.
8. Verify the response includes the post ID, slug, cover URL, and `DRAFT` status.
9. Report the title, admin review path, cover URL, sources consulted, and any failure. Never claim success unless both API calls succeeded.

## Quality gate

Stop without publishing when research is insufficient, the image is misleading, the API token is unavailable, upload fails, or a substantially similar post already exists. Leave no partial post if the cover upload fails. Never switch to direct database access as a fallback.
