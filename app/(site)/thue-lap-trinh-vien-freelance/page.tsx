import { LandingPage, landingMetadata } from "@/features/landing/LandingPage";

const PATH = "/thue-lap-trinh-vien-freelance";

export const metadata = landingMetadata(PATH);

export default function Page() {
  return <LandingPage path={PATH} />;
}
