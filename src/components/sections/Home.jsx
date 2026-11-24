import { profile } from "../../data/portfolio";
import { AgentTrace } from "../AgentTrace";

export const Home = () => (
  <section id="home" className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-36">
    <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
    <div aria-hidden="true" className="glow pointer-events-none absolute inset-0" />
    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="rise text-lg text-lilac">{profile.greeting}</p>
        <h1
          className="rise mt-5 text-balance text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          {profile.headline}
        </h1>
        <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: "160ms" }}>
          {profile.intro}
        </p>
        <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
          <a
            href="#projects"
            className="rounded-lg bg-accent px-5 py-3 font-medium text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12),0_10px_30px_-10px_rgb(139_92_246/0.8)] transition hover:bg-violet-500"
          >
            See my projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-line px-5 py-3 font-medium text-fg transition hover:border-lilac/50 hover:bg-panel"
          >
            Get in touch
          </a>
        </div>
      </div>
      <div className="rise" style={{ animationDelay: "320ms" }}>
        <AgentTrace />
      </div>
    </div>
  </section>
);
