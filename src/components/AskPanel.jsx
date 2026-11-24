import { useEffect, useRef, useState } from "react";
import { askSuggestions } from "../data/portfolio";
import { ask } from "../lib/ask";

const STEP_COUNT = 3;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// How many steps, answer words and cited items there are to reveal.
const totals = (result) => ({
  steps: STEP_COUNT,
  words: result.intro.split(" ").length,
  items: result.results.length,
});

const startRun = (id, question) => {
  const result = ask(question);
  return { id, result, stage: prefersReducedMotion() ? totals(result) : { steps: 0, words: 0, items: 0 } };
};

const stepsFor = (r) => [
  { label: "parse", text: r.terms.length ? r.terms.slice(0, 4).join(", ") : `intent: ${r.intent ?? "unknown"}` },
  { label: "search", text: `${r.scanned} portfolio entries` },
  { label: "rank", text: r.found ? `${r.results.length} relevant` : "no match" },
];

// Briefly highlight the section a citation points to.
const flash = (href) => {
  const el = document.querySelector(href);
  if (!el) return;
  el.classList.remove("cite-flash");
  requestAnimationFrame(() => el.classList.add("cite-flash"));
};

export const AskPanel = () => {
  const [run, setRun] = useState(() => startRun(0, askSuggestions[0]));
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const { result, stage } = run;
  const total = totals(result);
  const done = stage.steps >= total.steps && stage.words >= total.words && stage.items >= total.items;

  useEffect(() => {
    // Keep the newest part of the answer in view while it streams.
    const box = scrollRef.current;
    if (box) box.scrollTop = box.scrollHeight;
    const t = totals(run.result);
    const s = run.stage;
    let next;
    let delay;
    if (s.steps < t.steps) {
      next = { ...s, steps: s.steps + 1 };
      delay = s.steps === 0 ? (run.id === 0 ? 900 : 250) : 420;
    } else if (s.words < t.words) {
      next = { ...s, words: s.words + 1 };
      delay = 35;
    } else if (s.items < t.items) {
      next = { ...s, items: s.items + 1 };
      delay = 200;
    } else {
      return;
    }
    const timer = setTimeout(() => setRun((r) => (r.id === run.id ? { ...r, stage: next } : r)), delay);
    return () => clearTimeout(timer);
  }, [run]);

  const submit = (question) => {
    if (!question.trim() || !done) return;
    setRun((r) => startRun(r.id + 1, question));
    setInput("");
  };

  const words = result.intro.split(" ");

  return (
    <figure className="relative flex flex-col rounded-2xl border border-line bg-panel/80 shadow-[0_30px_90px_-25px_rgb(139_92_246/0.55)] backdrop-blur">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <figcaption className="font-mono text-xs text-muted">Ask about my work</figcaption>
        <span className="w-[42px]" />
      </div>

      <div ref={scrollRef} className="h-[320px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed">
        <p>
          <span className="mr-3 text-muted">you</span>
          <span className="text-fg">{result.question}</span>
        </p>
        <ol className="mt-3 space-y-2">
          {stepsFor(result)
            .slice(0, stage.steps)
            .map((step) => (
              <li key={`${run.id}-${step.label}`} className="rise flex gap-3">
                <span className={result.found || step.label !== "rank" ? "text-emerald-400" : "text-muted"} aria-hidden="true">
                  {result.found || step.label !== "rank" ? "✓" : "–"}
                </span>
                <span className="w-14 shrink-0 text-lilac">{step.label}</span>
                <span className="text-muted">{step.text}</span>
              </li>
            ))}
        </ol>
        {stage.steps < STEP_COUNT && (
          <span className="caret mt-2 inline-block text-lilac" aria-hidden="true">
            ▍
          </span>
        )}

        {stage.steps >= STEP_COUNT && (
          <div
            className={`rise mt-4 rounded-lg border p-4 font-sans text-[15px] ${
              result.found ? "border-accent/40 bg-accent/10" : "border-line bg-white/[0.03]"
            }`}
          >
            <span className="mb-1 block font-mono text-xs text-lilac">agent</span>
            <p aria-hidden="true">
              {words.slice(0, stage.words).join(" ")}
              {stage.words < words.length && <span className="caret ml-0.5 text-lilac">▍</span>}
            </p>
            {stage.items > 0 && (
              <ul className="mt-3 space-y-2 text-[14px] leading-snug text-fg/90">
                {result.results.slice(0, stage.items).map((item, i) => (
                  <li key={`${run.id}-${item.href}`} className="rise flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lilac/60" aria-hidden="true" />
                    <span>
                      {item.text}{" "}
                      <a
                        href={item.href}
                        onClick={() => flash(item.href)}
                        title={item.label}
                        aria-label={`Source ${i + 1}: ${item.label}`}
                        className="ml-0.5 inline-grid h-5 min-w-5 place-items-center rounded bg-accent/25 px-1 align-[1px] font-mono text-[11px] text-lilac transition-colors hover:bg-accent hover:text-white"
                      >
                        {i + 1}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {done ? [result.intro, ...result.results.map((r) => r.text)].join(" ") : ""}
        </p>
      </div>

      <div className="border-t border-line p-4">
        <div className="flex flex-wrap gap-2">
          {askSuggestions.map((q) => (
            <button
              key={q}
              type="button"
              disabled={!done}
              onClick={() => submit(q)}
              className="rounded-full border border-line px-3 py-1 text-xs text-muted transition hover:border-accent/50 hover:text-fg disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
        >
          <label htmlFor="ask-input" className="sr-only">
            Ask a question about my work
          </label>
          <input
            id="ask-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={200}
            autoComplete="off"
            placeholder="Ask about my projects, skills or experience"
            className="min-w-0 flex-1 rounded-lg border border-line bg-ink/60 px-3 py-2 text-sm text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
          <button
            type="submit"
            disabled={!done || !input.trim()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:opacity-50"
          >
            Ask
          </button>
        </form>
        <p className="mt-3 text-xs text-muted/80">
          Runs in your browser, searching this site's content. No LLM involved.
        </p>
      </div>
    </figure>
  );
};
