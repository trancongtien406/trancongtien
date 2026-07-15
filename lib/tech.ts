export type TechItem = {
  name: string;
  logo: string;
  color: string;
};

const TECH_BY_NAME: Record<string, Omit<TechItem, "name">> = {
  "Next.js": { logo: "/images/tech/nextjs.svg", color: "#000000" },
  React: { logo: "/images/tech/react.svg", color: "#61DAFB" },
  TypeScript: { logo: "/images/tech/typescript.svg", color: "#3178C6" },
  "Tailwind CSS": { logo: "/images/tech/tailwindcss.svg", color: "#06B6D4" },
  "Vue.js": { logo: "/images/tech/vue.svg", color: "#4FC08D" },
  Vue: { logo: "/images/tech/vue.svg", color: "#4FC08D" },
  "Node.js": { logo: "/images/tech/nodejs.svg", color: "#5FA04E" },
  NestJS: { logo: "/images/tech/nestjs.svg", color: "#E0234E" },
  Flutter: { logo: "/images/tech/flutter.svg", color: "#02569B" },
  PostgreSQL: { logo: "/images/tech/postgresql.svg", color: "#4169E1" },
  MongoDB: { logo: "/images/tech/mongodb.svg", color: "#47A248" },
  AWS: { logo: "/images/tech/aws.svg", color: "#FF9900" },
  Figma: { logo: "/images/tech/figma.svg", color: "#F24E1E" },
  Python: { logo: "/images/tech/python.svg", color: "#3776AB" },
  Laravel: { logo: "/images/tech/laravel.svg", color: "#FF2D20" },
  Redis: { logo: "/images/tech/redis.svg", color: "#FF4438" },
  Firebase: { logo: "/images/tech/firebase.svg", color: "#DD2C00" },
  Docker: { logo: "/images/tech/docker.svg", color: "#2496ED" },
  "GitHub Actions": {
    logo: "/images/tech/github-actions.svg",
    color: "#2088FF",
  },
  Nginx: { logo: "/images/tech/nginx.svg", color: "#009639" },
  Notion: { logo: "/images/tech/notion.svg", color: "#000000" },
  Jira: { logo: "/images/tech/jira.svg", color: "#0052CC" },
  Linear: { logo: "/images/tech/linear.svg", color: "#5E6AD2" },
  Dart: { logo: "/images/tech/dart.svg", color: "#0175C2" },
  OpenAI: { logo: "/images/tech/openai.svg", color: "#412991" },
  FastAPI: { logo: "/images/tech/fastapi.svg", color: "#009688" },
  "Chart.js": { logo: "/images/tech/chartjs.svg", color: "#FF6384" },
  Java: { logo: "/images/tech/java.svg", color: "#ED8B00" },
  MySQL: { logo: "/images/tech/mysql.svg", color: "#4479A1" },
  BLoC: { logo: "/images/tech/bloc.svg", color: "#00A7E1" },
};

export function getTech(name: string): TechItem {
  const found = TECH_BY_NAME[name];
  if (found) return { name, ...found };
  return {
    name,
    logo: "",
    color: "#64748B",
  };
}

export function resolveTechs(names: string[]): TechItem[] {
  return names.map(getTech);
}

export const ABOUT_TECHS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "Python",
  "Java",
  "Flutter",
  "Dart",
  "BLoC",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "OpenAI",
] as const;

export const PROCESS_TECH_GROUPS = [
  {
    group: "Frontend",
    items: ["Next.js", "React", "Vue", "Flutter"],
  },
  {
    group: "Backend",
    items: ["Node.js", "NestJS", "Python", "Laravel"],
  },
  {
    group: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
  },
  {
    group: "DevOps & Cloud",
    items: ["AWS", "Docker", "GitHub Actions", "Nginx"],
  },
  {
    group: "Design & Management",
    items: ["Figma", "Notion", "Jira", "Linear"],
  },
] as const;
