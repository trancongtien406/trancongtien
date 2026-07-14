import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.personImage,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    path === "/"
      ? `${siteConfig.fullName} | ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;
  const imageUrl = new URL(image, siteConfig.url).toString();

  return {
    applicationName: siteConfig.brand,
    authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
    creator: siteConfig.fullName,
    publisher: siteConfig.brand,
    category: "technology",
    title: fullTitle,
    description,
    keywords: [
      siteConfig.fullName,
      siteConfig.name,
      siteConfig.brand,
      "Trần Công Tiến Full-stack Developer",
      "Tran Cong Tien Full-stack Developer",
      "Trần Công Tiến AI Agent",
      "Tran Cong Tien AI Agent",
      "thiết kế app ứng dụng",
      "thiết kế website Đà Nẵng",
      "lập trình web Đà Nẵng",
      "phát triển ứng dụng web mobile",
    ],
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.brand,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.fullName} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const personId = `${siteConfig.url}/#person`;
const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

export function siteIdentityJsonLd() {
  const personImage = new URL(siteConfig.personImage, siteConfig.url).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.fullName,
        alternateName: [siteConfig.name, siteConfig.brand],
        url: siteConfig.url,
        image: personImage,
        jobTitle: "Full-stack Developer",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        worksFor: { "@id": organizationId },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Đà Nẵng",
          addressCountry: "VN",
        },
        sameAs: Object.values(siteConfig.social),
        knowsAbout: [
          "Full-stack Development",
          "Web Development",
          "Mobile App Development",
          "App Design",
          "AI Agent Development",
          "AI Automation",
          "Cloud Infrastructure",
          "UI/UX Design",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": organizationId,
        name: siteConfig.brand,
        alternateName: [siteConfig.fullName, siteConfig.name],
        description: siteConfig.description,
        url: siteConfig.url,
        image: personImage,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        founder: { "@id": personId },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Đà Nẵng",
          addressCountry: "VN",
        },
        sameAs: Object.values(siteConfig.social),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.fullName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        inLanguage: siteConfig.language,
        publisher: { "@id": organizationId },
        author: { "@id": personId },
      },
    ],
  };
}

export const organizationJsonLd = siteIdentityJsonLd;

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
