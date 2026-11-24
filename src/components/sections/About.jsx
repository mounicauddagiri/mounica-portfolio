import image from "../../../public/mounica.jpg";
import { profile, skills, education } from "../../data/portfolio";

const skillGroups = [
  { label: "AI", items: skills.ai },
  { label: "Frontend", items: skills.frontend },
  { label: "Backend", items: skills.backend },
];

export const About = () => (
  <section id="about" className="border-t border-line py-24 md:py-32">
    <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 md:grid-cols-[280px_1fr] md:gap-16">
      <img
        src={image}
        alt={`Portrait of ${profile.fullName}`}
        className="aspect-[4/5] w-full max-w-[280px] rounded-2xl border border-line object-cover"
      />
      <div>
        <h2 className="text-4xl font-bold tracking-[-0.03em] md:text-5xl">About me</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.about}</p>
        <dl className="mt-12 divide-y divide-line border-y border-line">
          {skillGroups.map((group) => (
            <div key={group.label} className="grid gap-2 py-5 sm:grid-cols-[140px_1fr]">
              <dt className="font-medium">{group.label}</dt>
              <dd className="text-muted">{group.items.join(", ")}</dd>
            </div>
          ))}
          {education.map((edu) => (
            <div key={edu.degree} className="grid gap-2 py-5 sm:grid-cols-[140px_1fr]">
              <dt className="font-medium">Education</dt>
              <dd>
                <p>
                  {edu.degree}, {edu.school}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {edu.years}
                  {edu.coursework && `. Coursework: ${edu.coursework}`}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);
