import { aiIntro, aiSkills } from "../../data/portfolio";
import { slug } from "../../lib/slug";

export const AI = () => (
  <section id="ai" className="border-t border-line py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-6">
      <div className="max-w-3xl">
        <h2 className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">{aiIntro.title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{aiIntro.body}</p>
      </div>
      <ol className="relative mt-16 grid gap-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:before:absolute lg:before:inset-x-0 lg:before:top-5 lg:before:h-px lg:before:bg-gradient-to-r lg:before:from-line lg:before:via-accent/60 lg:before:to-accent lg:before:content-['']">
        {aiSkills.map((skill, i) => (
          <li key={skill.title} id={`ai-${slug(skill.title)}`} className="relative -m-3 rounded-xl p-3">
            <span
              className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border font-mono text-sm ${
                skill.highlight
                  ? "border-accent bg-accent text-white shadow-[0_0_24px_rgb(139_92_246/0.7)]"
                  : "border-accent/50 bg-ink text-lilac"
              }`}
            >
              {i + 1}
            </span>
            <h3 className={`mt-6 text-xl font-semibold tracking-tight ${skill.highlight ? "text-lilac" : ""}`}>
              {skill.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{skill.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {skill.tools.map((tool) => (
                <li
                  key={tool}
                  className={`rounded-md border px-2.5 py-1 text-sm ${
                    skill.highlight ? "border-accent/40 bg-accent/10 text-fg" : "border-line bg-panel text-fg/90"
                  }`}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
