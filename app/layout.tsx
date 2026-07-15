import type { Metadata } from "next";
import { JsonLd, siteIdentityJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

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
      className="h-full antialiased"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="min-h-full flex flex-col bg-surface text-ink font-sans">
        <JsonLd data={siteIdentityJsonLd()} />
        {children}
      </body>
    </html>
  );
}
