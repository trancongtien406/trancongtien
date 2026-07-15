import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og-image.png",
  imageWidth,
  imageHeight,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    path === "/"
      ? `${siteConfig.fullName} | ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;
  const imageUrl = new URL(image, siteConfig.url).toString();
  const resolvedImageWidth = imageWidth ?? (image === "/og-image.png" ? 1200 : undefined);
  const resolvedImageHeight = imageHeight ?? (image === "/og-image.png" ? 630 : undefined);

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
    icons: {
      icon: [
        { url: "/favicon.ico?v=20260714", sizes: "any" },
        { url: "/icon.png?v=20260714", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        {
          url: "/apple-icon.png?v=20260714",
          type: "image/png",
          sizes: "180x180",
        },
      ],
      shortcut: ["/favicon.ico?v=20260714"],
    },
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
          width: resolvedImageWidth,
          height: resolvedImageHeight,
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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
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
        url: `${siteConfig.url}/ve-toi`,
        mainEntityOfPage: `${siteConfig.url}/ve-toi`,
        image: {
          "@type": "ImageObject",
          url: personImage,
          contentUrl: personImage,
          width: 1024,
          height: 1280,
          caption: `${siteConfig.fullName} — ${siteConfig.tagline}`,
        },
        jobTitle: siteConfig.tagline,
        birthDate: siteConfig.birthDate,
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
          "Next.js",
          "Node.js",
          "NestJS",
          "Python",
          "Java",
          "Flutter",
          "BLoC",
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "CRM",
          "Booking Systems",
          "E-commerce",
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

export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: `${siteConfig.fullName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: { "@id": personId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: new URL(siteConfig.personImage, siteConfig.url).toString(),
    },
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
