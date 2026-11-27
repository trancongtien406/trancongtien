import { LandingPage, landingMetadata } from "@/features/landing/LandingPage";

const PATH = "/thiet-ke-website-da-nang";

export const metadata = landingMetadata(PATH);

export default function Page() {
  return <LandingPage path={PATH} />;
}
