import { navLinks } from "./navLinks";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const close = () => setMenuOpen(false);

  return (
    <div
      aria-hidden={!menuOpen}
      className={`fixed inset-0 z-50 flex flex-col bg-ink/95 px-6 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
        menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex h-16 items-center justify-end">
        <button
          type="button"
          onClick={close}
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Close menu"
          className="-mr-2 p-2 text-3xl leading-none text-muted hover:text-fg"
        >
          &times;
        </button>
      </div>
      <ul className="mt-6 space-y-1">
        {navLinks.map((link, i) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={close}
              tabIndex={menuOpen ? 0 : -1}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
              className={`block py-3 text-4xl font-semibold tracking-tight transition-all duration-300 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
