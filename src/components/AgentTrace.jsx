import { useEffect, useState } from "react";
import { projects } from "../data/portfolio";

// A short scripted run of a RAG agent answering a question about the
// projects in data/portfolio.js, so the answer stays true as you edit them.
const matches = projects
  .filter((p) => p.tech.some((t) => t.toLowerCase() === "java"))
  .map((p) => p.title);

const answer = matches.length
  ? `${new Intl.ListFormat("en", { type: "conjunction" }).format(matches)}.`
  : "None of them yet.";

const steps = [
  { kind: "user", text: "Which of your projects use Java?" },
  { kind: "step", label: "embed", text: "question → vector" },
  { kind: "step", label: "retrieve", text: `${projects.length} projects searched, ${matches.length} relevant` },
  { kind: "step", label: "tool", text: 'github.repos({ language: "java" })' },
  { kind: "step", label: "generate", text: "answer grounded in sources" },
  { kind: "answer", text: answer },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const AgentTrace = () => {
  const [reduced] = useState(prefersReducedMotion);
  const [count, setCount] = useState(reduced ? steps.length : 0);
  const done = count >= steps.length;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 900 : 650);
    return () => clearTimeout(t);
  }, [count, done]);

  return (
    <figure className="relative rounded-2xl border border-line bg-panel/80 shadow-[0_30px_90px_-25px_rgb(139_92_246/0.55)] backdrop-blur">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <figcaption className="font-mono text-xs text-muted">portfolio-agent</figcaption>
        {reduced ? (
          <span className="w-12" />
        ) : (
          <button
            type="button"
            onClick={() => setCount(0)}
            disabled={!done}
            className="w-12 text-right text-xs text-muted transition-colors hover:text-fg disabled:opacity-0"
          >
            Replay
          </button>
        )}
      </div>
      <ol className="min-h-[300px] space-y-3 p-5 font-mono text-[13px] leading-relaxed" aria-live="polite">
        {steps.slice(0, count).map((step, i) => (
          <li key={i} className="rise">
            {step.kind === "user" && (
              <p>
                <span className="mr-3 text-muted">you</span>
                <span className="text-fg">{step.text}</span>
              </p>
            )}
            {step.kind === "step" && (
              <p className="flex gap-3">
                <span className="text-emerald-400" aria-hidden="true">✓</span>
                <span className="w-16 shrink-0 text-lilac">{step.label}</span>
                <span className="text-muted">{step.text}</span>
              </p>
            )}
            {step.kind === "answer" && (
              <div className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-4 font-sans text-[15px] text-fg">
                <span className="mb-1 block font-mono text-xs text-lilac">agent</span>
                {step.text}
              </div>
            )}
          </li>
        ))}
        {!done && (
          <li className="text-lilac" aria-hidden="true">
            <span className="caret">▍</span>
          </li>
        )}
      </ol>
    </figure>
  );
};
