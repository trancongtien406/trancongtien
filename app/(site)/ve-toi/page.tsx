import { AboutPage } from "@/features/about/AboutPage";
import { getCoreValues } from "@/lib/content";
import { prisma } from "@/lib/db";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { aboutJourney, siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: `Về ${siteConfig.fullName}`,
  description: `${siteConfig.fullName} — solo Full-stack Developer tại Đà Nẵng, nhận freelance và hợp đồng dự án website, backend, mobile app, AI, CRM, booking và e-commerce.`,
  path: "/ve-toi",
  image: siteConfig.personImage,
  imageWidth: 1024,
  imageHeight: 1280,
});

export default async function Page() {
  const [values, setting] = await Promise.all([
    getCoreValues(),
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Về tôi", path: "/ve-toi" },
        ])}
      />
      <AboutPage
        cvUrl={setting?.cvUrl || siteConfig.cvUrl}
        values={values.map((v) => ({
          title: v.title,
          description: v.description,
        }))}
        journey={[...aboutJourney]}
      />
    </>
  );
}
