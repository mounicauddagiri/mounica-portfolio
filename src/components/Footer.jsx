import { profile } from "../data/portfolio";

export const Footer = () => (
  <footer className="border-t border-line py-10">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted">
      <p>© {new Date().getFullYear()} {profile.fullName}</p>
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
        GitHub
      </a>
    </div>
  </footer>
);
