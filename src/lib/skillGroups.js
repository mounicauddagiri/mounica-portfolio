import { skills } from "../data/portfolio";

const LABELS = { ai: "AI", frontend: "Frontend", backend: "Backend", database: "Database", cloud: "Cloud" };
const ORDER = ["ai", "frontend", "backend", "database", "cloud"];

const keys = [...ORDER.filter((k) => skills[k]), ...Object.keys(skills).filter((k) => !ORDER.includes(k))];

// Skill rows shown in About me, in display order.
export const skillGroups = keys.map((key) => ({
  key,
  label: LABELS[key] ?? key[0].toUpperCase() + key.slice(1),
  items: skills[key],
}));
