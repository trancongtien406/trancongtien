export type RitualGoal = "relax" | "body" | "face" | "head" | "feet" | "full";
export type Pressure = "light" | "medium";
export type Scent = "natural" | "unscented";

export type Ritual = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  priceVnd: number;
  goals: RitualGoal[];
  primaryGoal: RitualGoal;
  pressures: Pressure[];
  pressureLabel: string;
  usesHotStone: boolean;
  supportsUnscented: boolean;
  image: string;
  imageAlt: string;
  suitableFor: string;
  steps: { label: string; minutes: number }[];
  notes: string[];
};

export type RitualFinderAnswers = {
  goal: RitualGoal | null;
  maxDuration: 45 | 60 | 90 | 120 | null;
  pressure: Pressure | "any";
  avoidHotStone: boolean;
  unscented: boolean;
};

export type BookingResource = {
  id: string;
  name: string;
  therapist: string;
  supportedRitualIds: string[];
};

export type MockBusyInterval = {
  id: string;
  resourceId: string;
  /** độ lệch ngày so với hôm nay (theo giờ Việt Nam) */
  dayOffset: number;
  startMinutes: number;
  endMinutes: number;
};
