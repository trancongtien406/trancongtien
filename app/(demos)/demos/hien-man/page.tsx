import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { TimeOfDay } from "./components/TimeOfDay";
import { RoomTable } from "./components/RoomTable";
import { VillaWalk } from "./components/VillaWalk";
import { Dining } from "./components/Dining";
import { Location } from "./components/Location";
import { Curtain } from "./components/Curtain";
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
        <Rooms />
        <RoomTable />
        <Planner />
        <TimeOfDay />
        <Amenities />
        <VillaWalk />
        <Dining />
        <Experiences />
        <Location />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
      <Curtain />
    </StayProvider>
  );
}
