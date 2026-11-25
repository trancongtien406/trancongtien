import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rong Dam · Tours in Da Nang, Hoi An, Ba Na and Hue",
  description:
    "Central Vietnam tours in a travel-notebook style, bilingual VI/EN: trip suggestions by interest, hour-by-hour itineraries, a hand-drawn map and a cost estimate by group size. Prices are for reference.",
  alternates: {
    canonical: "/demos/rong-dam/en",
    languages: { "vi-VN": "/demos/rong-dam", en: "/demos/rong-dam/en", "x-default": "/demos/rong-dam" },
  },
  openGraph: {
    title: "Rong Dam · A little further, a little more to tell",
    description: "Central Vietnam trips in a travel-notebook style: Da Nang, Hoi An, Ba Na and Hue.",
    type: "website",
    locale: "en_GB",
    images: [{ url: "/images/demos/rong-dam/identity/og-image.webp", width: 1200, height: 630, alt: "Rong Dam, a little further, a little more to tell" }],
  },
};

/** Bản tiếng Anh: bọc lang="en" (root layout của site cố định lang="vi"). */
export default function RongDamEnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" data-lang="en" style={{ display: "contents" }}>
      {children}
    </div>
  );
}
