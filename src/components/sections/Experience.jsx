import { experience } from "../../data/portfolio";
import { slug } from "../../lib/slug";

export const Experience = () => (
  <section id="experience" className="border-t border-line py-24 md:py-32">
    <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_2fr]">
      <h2 className="text-4xl font-bold tracking-[-0.03em] md:text-5xl">Experience</h2>
      <ol className="relative border-l border-line">
        {experience.map((job, i) => (
          <li
            key={`${job.company}-${job.period}`}
            id={`job-${slug(`${job.company} ${job.period}`)}`}
            className="relative -mr-4 rounded-r-lg pb-12 pl-8 pr-4 last:pb-0"
          >
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
                i === 0 ? "bg-accent shadow-[0_0_12px_rgb(139_92_246)]" : "bg-muted/50"
              }`}
            />
            <p className="text-sm text-muted">{job.period}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">
              {job.role} <span className="font-normal text-muted">at</span> {job.company}
            </h3>
            <p className="mt-2 max-w-xl leading-relaxed text-muted">{job.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
