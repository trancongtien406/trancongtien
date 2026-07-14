import { AboutPage } from "@/features/about/AboutPage";
import { getCoreValues, getJourneyItems } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Về tôi",
  description: `Giới thiệu ${siteConfig.fullName} — Product Engineer tại Product Engineering Studio. Câu chuyện, giá trị cốt lõi và hành trình nghề nghiệp.`,
  path: "/ve-toi",
  image: "/images/avatars/portrait-hero.png",
});

export default async function Page() {
  const [values, journey] = await Promise.all([
    getCoreValues(),
    getJourneyItems(),
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
          name: siteConfig.fullName,
          jobTitle: "Product Engineer",
          worksFor: {
            "@type": "Organization",
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
