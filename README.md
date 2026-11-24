# Mounica Uddagiri — Portfolio

My personal portfolio: a full-stack developer building the interfaces where people and AI work together.

**Live site:** https://mounicauddagiri.github.io/mounica-portfolio

## Highlights

- **Ask about my work panel.** Visitors ask questions about my projects, skills and experience. The panel shows each step (parse, search, rank), streams the answer, and cites the section it came from. If nothing matches, it says so instead of guessing.
- **AI section.** My work across LLMs and prompting, RAG and vector search, AI agents, and AI interfaces.
- **Content separate from code.** All text lives in one data file, so I can update projects and experience without touching components.
- **Responsive and accessible.** Works on mobile, has visible keyboard focus, and respects reduced-motion settings.

## Tech stack

| Area | Tech |
|---|---|
| Framework | React 19, Vite 6 |
| Styling | Tailwind CSS v4 with a custom theme (`@theme` tokens), Inter and JetBrains Mono fonts |
| Search in the ask panel | Custom JavaScript retrieval: tokenizing, stemming, synonym expansion, IDF-weighted ranking and intent detection, all in the browser |
| Contact form | EmailJS |
| Code quality | ESLint with React Hooks rules |
| Deployment | GitHub Pages via `gh-pages` |

## Skills shown in this project

- **Frontend engineering:** component design, React hooks (`useState`, `useEffect`, `useRef`), data-driven rendering
- **AI interface patterns:** streaming responses, visible agent steps, clickable citations, honest "not found" answers
- **Information retrieval:** keyword search, term weighting, synonym matching and ranking
- **UI and visual design:** a design-token system, typography and motion that respects user settings
- **Accessibility:** semantic HTML, screen-reader announcements (`aria-live`), labelled form fields, keyboard focus
- **Build and deployment:** Vite builds, environment variables, GitHub Pages

## Project structure

```
src/
  data/portfolio.js       All site content: profile, skills, experience, projects, AI section, suggested questions
  lib/ask.js              Search behind the ask panel
  lib/skillGroups.js      Skill rows shown in About me
  components/AskPanel.jsx The "Ask about my work" panel
  components/sections/    Home, AI, Projects, Experience, About, Contact
  index.css               Theme colors, fonts and animations
```

## Run locally

```bash
npm install
npm run dev
```

The contact form needs EmailJS keys in a `.env` file (not committed):

```
VITE_SERVICE_ID=...
VITE_TEMPLATE_ID=...
VITE_PUBLIC_kEY=...
```

## Update content

Edit `src/data/portfolio.js`. New projects, jobs and skills appear on the page and become searchable in the ask panel automatically.

## Deploy

```bash
npm run deploy
```

This builds the site and publishes it to GitHub Pages.
