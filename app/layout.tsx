import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd, siteIdentityJsonLd, buildMetadata } from "@/lib/seo";
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
  verification: {
    other: {
      "msvalidate.01": "1F727722FDD48782B6C231BAB19AA707",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    try {
      var theme = localStorage.getItem("theme");
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (theme === "dark" || (!theme && prefersDark)) {
        document.documentElement.dataset.theme = "dark";
      } else {
        document.documentElement.dataset.theme = "light";
      }
    } catch (_) {
      document.documentElement.dataset.theme = "light";
    }
  `;

  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="min-h-full flex flex-col bg-surface text-ink font-sans">
        <JsonLd data={siteIdentityJsonLd()} />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
