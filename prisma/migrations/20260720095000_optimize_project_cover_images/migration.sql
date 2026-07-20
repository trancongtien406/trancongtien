UPDATE "Project"
SET "coverUrl" = CASE "coverUrl"
  WHEN '/images/illustrations/projects-hero-devices.png' THEN '/images/illustrations/projects-hero-devices.webp'
  WHEN '/images/illustrations/services-devices.png' THEN '/images/illustrations/services-devices.webp'
  WHEN '/images/illustrations/blog-hero-desk.png' THEN '/images/illustrations/blog-hero-desk.webp'
  WHEN '/images/illustrations/about-outdoors.png' THEN '/images/illustrations/about-outdoors.webp'
  WHEN '/images/illustrations/process-roadmap.png' THEN '/images/illustrations/process-roadmap.webp'
  ELSE "coverUrl"
END
WHERE "coverUrl" IN (
  '/images/illustrations/projects-hero-devices.png',
  '/images/illustrations/services-devices.png',
  '/images/illustrations/blog-hero-desk.png',
  '/images/illustrations/about-outdoors.png',
  '/images/illustrations/process-roadmap.png'
);
