import { LandingPage, landingMetadata } from "@/features/landing/LandingPage";

const PATH = "/ai-agent-tu-dong-hoa";

export const metadata = landingMetadata(PATH);

export default function Page() {
  return <LandingPage path={PATH} />;
}
