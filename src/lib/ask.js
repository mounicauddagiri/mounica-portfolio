// A small in-browser search over the portfolio data. It answers questions with
// entries from data/portfolio.js and cites the section each answer came from.
import { education, experience, projects, aiSkills } from "../data/portfolio";
import { skillGroups } from "./skillGroups";
import { slug } from "./slug";

const STOP = new Set(
  (
    "a an and are as at be been but by can could did do does doing for from had has have her hers how i im in " +
    "is it its me my of on or our she so tell than that the their them there these they this to use used uses " +
    "using was we were what whats when where which who why will with would you your yours mounica any some " +
    "about know show give list all ever"
  ).split(" ")
);

// Words that say what kind of answer is wanted rather than what it's about.
const INTENTS = {
  contact: ["contact", "email", "hire", "reach", "available", "message", "touch"],
  education: ["education", "degree", "study", "studied", "university", "school", "master", "college", "coursework"],
  job: ["work", "worked", "working", "job", "company", "companie", "employer", "career", "experience", "role"],
  project: ["project", "built", "build", "portfolio", "app", "application"],
  skill: ["skill", "stack", "tech", "technology", "technologie", "tool", "language", "framework"],
};

// Related terms, so "RAG" also finds pgvector and "frontend" finds React.
const SYNONYMS = {
  rag: ["retrieval", "vector", "embedding", "pgvector"],
  retrieval: ["rag"],
  ai: ["llm", "rag", "agent", "ml"],
  llm: ["language", "model", "prompt", "rag"],
  ml: ["ai", "regression"],
  agent: ["mcp", "langgraph"],
  frontend: ["react", "angular", "vue", "typescript", "interface", "ui"],
  ui: ["frontend", "interface", "react"],
  backend: ["java", "node", "python", "api", "fastapi"],
  database: ["mysql", "mongodb", "postgresql", "pgvector", "sql"],
  db: ["database", "mysql", "mongodb", "postgresql"],
  sql: ["mysql", "postgresql"],
  cloud: ["aws", "docker"],
  javascript: ["react", "node"],
  js: ["javascript", "react", "node"],
};

const stem = (t) => (t.length > 3 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t);

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/\.js\b/g, "")
    .split(/[^a-z0-9#+]+/)
    .filter(Boolean)
    .map(stem);

const firstSentence = (s) => (s.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? s).trim();
const withPeriod = (s) => (/[.!?]$/.test(s.trim()) ? s.trim() : `${s.trim()}.`);

const DOCS = [
  ...projects.map((p) => ({
    type: "project",
    title: p.title,
    text: `${p.title} ${p.description} ${p.tech.join(" ")}`,
    answer: `${p.title}: ${withPeriod(firstSentence(p.description))}`,
    href: `#project-${slug(p.title)}`,
    label: p.title,
  })),
  ...experience.map((j) => ({
    type: "job",
    title: `${j.role} ${j.company}`,
    text: `${j.role} ${j.company} ${j.description}`,
    answer: `${j.role} at ${j.company} (${j.period}). ${withPeriod(j.description)}`,
    href: `#job-${slug(`${j.company} ${j.period}`)}`,
    label: j.company,
  })),
  ...aiSkills.map((s) => ({
    type: "ai",
    title: s.title,
    text: `${s.title} ${s.description} ${s.tools.join(" ")}`,
    answer: `${s.title}: ${withPeriod(firstSentence(s.description))}`,
    href: `#ai-${slug(s.title)}`,
    label: s.title,
  })),
  ...skillGroups.map((g) => ({
    type: "skill",
    title: g.label,
    text: `${g.label} ${g.items.join(" ")}`,
    answer: `${g.label}: ${g.items.join(", ")}.`,
    href: `#skills-${g.key}`,
    label: `${g.label} skills`,
  })),
  ...education.map((e) => ({
    type: "education",
    title: e.degree,
    text: `${e.degree} ${e.school} ${e.coursework ?? ""}`,
    answer: `${e.degree}, ${e.school} (${e.years}).`,
    href: `#education-${slug(e.degree)}`,
    label: "Education",
  })),
].map((d) => ({ ...d, tokens: new Set(tokenize(d.text)), titleTokens: new Set(tokenize(d.title)) }));

const df = new Map();
for (const d of DOCS) for (const t of d.tokens) df.set(t, (df.get(t) ?? 0) + 1);
const idf = (t) => Math.log(1 + DOCS.length / (df.get(t) ?? DOCS.length));

const score = (doc, weights) => {
  let s = 0;
  for (const [t, w] of weights) {
    if (doc.tokens.has(t)) s += w * idf(t) * (doc.titleTokens.has(t) ? 1.5 : 1);
  }
  return s;
};

const toResult = (d) => ({ text: d.answer, href: d.href, label: d.label });
const ofType = (type) => DOCS.filter((d) => d.type === type);

export function ask(question) {
  const words = question.toLowerCase().replace(/\.js\b/g, "").split(/[^a-z0-9#+]+/).filter((w) => w.length > 1);
  const intents = [];
  const content = [];
  const shown = [];
  for (const w of words) {
    const t = stem(w);
    if (STOP.has(t) || STOP.has(w)) continue;
    const intent = Object.keys(INTENTS).find((k) => INTENTS[k].includes(t));
    if (intent) intents.push(intent);
    else {
      content.push(t);
      shown.push(w);
    }
  }
  const has = (i) => intents.includes(i);
  const base = { question: question.trim(), scanned: DOCS.length, terms: [...new Set(shown)], intent: intents[0] ?? null };
  const answer = (intro, docs) => ({ ...base, found: true, intro, results: docs.map(toResult) });

  const notFound = {
    ...base,
    found: false,
    intro: "I couldn't find that in my portfolio. Try asking about my projects, experience or skills, or send me a message.",
    results: [{ text: "Contact form", href: "#contact", label: "Contact" }],
  };

  if (has("contact")) {
    return {
      ...base,
      found: true,
      intro: "The quickest way to reach me is the contact form on this page.",
      results: [{ text: "Contact form", href: "#contact", label: "Contact" }],
    };
  }

  // Questions like "Where have you worked?" list a whole section.
  if (content.length === 0) {
    if (has("education")) return answer("Here's my education:", ofType("education"));
    if (has("job")) return answer("Here's where I've worked:", ofType("job"));
    if (has("project")) return answer("Here are the projects I've built:", ofType("project"));
    if (has("skill")) return answer("Here's my tech stack:", ofType("skill"));
    return notFound;
  }

  const weights = new Map();
  for (const t of content) {
    weights.set(t, 1);
    for (const syn of SYNONYMS[t] ?? []) if (!weights.has(syn)) weights.set(syn, 0.5);
  }

  // Entries that mention a word from the question beat ones that only match a
  // related term; related terms are used only when nothing matches directly.
  const rank = (pool) => {
    const scored = pool
      .map((d) => ({ d, s: score(d, weights), direct: content.some((t) => d.tokens.has(t)) }))
      .filter((x) => x.s > 0);
    const direct = scored.filter((x) => x.direct);
    return (direct.length ? direct : scored).sort((a, b) => b.s - a.s);
  };

  const type = ["project", "job", "education", "skill"].find(has);
  const pool = DOCS.filter((d) => d.type === type || (type === "skill" && d.type === "ai"));
  let ranked = type ? rank(pool).filter((x) => x.direct) : [];
  if (!ranked.length) ranked = rank(DOCS);
  if (!ranked.length) return notFound;

  const top = ranked[0].s;
  const hits = ranked.filter((x) => x.s >= top * 0.45).slice(0, 4).map((x) => x.d);
  const yes = /^(do|does|have|has|can|are|is|did)\b/i.test(question.trim()) ? "Yes. " : "";
  const lead = hits.every((d) => d.type === "project")
    ? "Here are the matching projects:"
    : hits.every((d) => d.type === "job")
      ? "Here are the matching roles:"
      : "Here's what I found:";
  return answer(`${yes}${lead}`, hits);
}
