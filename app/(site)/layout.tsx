import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/floating/FloatingActions";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setting = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  const zaloUrl = setting?.zaloUrl || siteConfig.social.zalo;

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions zaloUrl={zaloUrl} />
    </>
  );
}
