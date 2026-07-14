import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd, organizationJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { ToastProvider } from "@/components/common/ToastProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.brand,
    description: siteConfig.description,
    path: "/",
  }),
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${plusJakarta.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full flex flex-col bg-surface text-ink font-sans">
        <JsonLd data={organizationJsonLd()} />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
