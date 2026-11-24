import { profile, projects } from "../../data/portfolio";

const rowClass = "group -mx-4 grid gap-4 px-4 py-8 md:grid-cols-[1fr_1.2fr] md:gap-10";

// Projects with a link open GitHub; projects without one show as plain rows.
const ProjectRow = ({ link, children }) =>
  link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={`${rowClass} transition-colors hover:bg-panel`}>
      {children}
    </a>
  ) : (
    <div className={rowClass}>{children}</div>
  );

export const Projects = () => (
  <section id="projects" className="border-t border-line py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold tracking-[-0.03em] md:text-5xl">Projects</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Things I've built, from distributed systems to full-stack apps.
          </p>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted transition-colors hover:text-fg"
        >
          All repositories on GitHub
        </a>
      </div>
      <ul className="mt-12 divide-y divide-line border-y border-line">
        {projects.map((project) => (
          <li key={project.title}>
            <ProjectRow link={project.link}>
              <h3 className={`flex items-start gap-3 text-2xl font-semibold tracking-tight transition-colors ${project.link ? "group-hover:text-lilac" : ""}`}>
                {project.title}
                <svg
                  aria-hidden="true"
                  className={`mt-2 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 ${project.link ? "" : "hidden"}`}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </h3>
              <div>
                <p className="leading-relaxed text-muted">{project.description}</p>
                <p className="mt-4 text-sm text-fg/70">{project.tech.join(", ")}</p>
              </div>
              {project.link && <span className="sr-only">(opens on GitHub)</span>}
            </ProjectRow>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
