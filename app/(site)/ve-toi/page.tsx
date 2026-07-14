import { AboutPage } from "@/features/about/AboutPage";
import { getCoreValues, getJourneyItems } from "@/lib/content";
import { prisma } from "@/lib/db";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Về tôi",
  description: `Giới thiệu ${siteConfig.fullName} — Full-stack Developer, thiết kế app ứng dụng và xây dựng AI Agent tại Đà Nẵng. Câu chuyện, giá trị cốt lõi và hành trình nghề nghiệp.`,
  path: "/ve-toi",
  image: siteConfig.personImage,
});

export default async function Page() {
  const [values, journey, setting] = await Promise.all([
    getCoreValues(),
    getJourneyItems(),
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${siteConfig.url}/#person`,
          name: siteConfig.fullName,
          alternateName: [siteConfig.name, siteConfig.brand],
          jobTitle: "Full-stack Developer",
          image: `${siteConfig.url}${siteConfig.personImage}`,
          worksFor: {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.brand,
          },
          url: `${siteConfig.url}/ve-toi`,
          email: siteConfig.email,
          sameAs: Object.values(siteConfig.social),
          address: {
            "@type": "PostalAddress",
            addressLocality: "Đà Nẵng",
            addressCountry: "VN",
          },
        }}
      />
      <AboutPage
        cvUrl={setting?.cvUrl || ""}
        values={values.map((v) => ({
          title: v.title,
          description: v.description,
        }))}
        journey={journey.map((j) => ({
          year: j.year,
          title: j.title,
          description: j.description,
        }))}
      />
    </>
  );
}
