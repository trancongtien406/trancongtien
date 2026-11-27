import { LandingPage, landingMetadata } from "@/features/landing/LandingPage";

const PATH = "/lap-trinh-app-mobile-flutter";

export const metadata = landingMetadata(PATH);

export default function Page() {
  return <LandingPage path={PATH} />;
}
