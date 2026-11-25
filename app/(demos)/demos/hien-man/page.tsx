import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Scenes } from "./components/Scenes";
import { Rooms } from "./components/Rooms";
import { Amenities } from "./components/Amenities";
import { Experiences } from "./components/Experiences";
import { Planner } from "./components/Planner";
import { Faq } from "./components/Faq";
import { Closing } from "./components/Closing";
import { Footer } from "./components/Footer";
import { Motion } from "./components/Motion";
import { StayProvider } from "./components/Provider";

export default function HienManPage() {
  return (
    <StayProvider>
      <Header />
      <main id="main">
        <Hero />
        <Story />
        <Scenes />
        <Rooms />
        <Amenities />
        <Experiences />
        <Planner />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </StayProvider>
  );
}
