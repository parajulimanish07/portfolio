

Build a production-ready, futuristic developer portfolio for **Manish Parajuli** that Claude Code can implement in a **Next.js** project (App Router, TypeScript). The site should feel modern and "AI-native" — dark, high-contrast, subtle motion, glowing accents, monospace/terminal touches — without sacrificing readability or accessibility.

Include a responsive project grid, detailed case-study pages, GitHub/live-demo links, a skills section, an experience timeline, and a contact CTA. Use accessible HTML, mobile-first layout, semantic sections, keyboard-friendly navigation, and clean component boundaries. Add implementation notes for reusable project cards, case-study routing, image optimization, metadata, and deployment (Vercel).

---

## Design Direction ("futuristic AI feel")
- Dark theme by default (with optional light mode toggle), near-black background (`#0a0a0f` range), one or two glowing accent colors (e.g. electric cyan/violet gradient) used sparingly for CTAs, hover states, and section dividers.
- Subtle animated gradient mesh or particle/grid background in the hero (CSS/canvas only — keep it lightweight, pause on reduced-motion preference).
- Monospace font (e.g. JetBrains Mono / Space Mono) for labels, tags, and code-styled elements; a clean sans-serif (e.g. Inter/Geist) for body copy.
- Terminal-style card or code-block decoration in the hero (e.g. a fake `$ whoami` prompt that types out Manish's roles).
- Micro-interactions: hover lift + glow on cards, smooth scroll, fade/slide-in on scroll (respect `prefers-reduced-motion`).
- Rounded-but-sharp UI language — soft corners, thin 1px borders with low-opacity glow, not overly rounded/bubbly.

---

## 1. Hero Section
- Heading: **"Hi, I'm Manish Parajuli"**
- Animated typing effect cycling through roles:
  - "Full-Stack Developer"
  - "React & NestJS Engineer"
  - "AI/ML Master's Student"
- Intro paragraph (editable placeholder, based on Manish's real background):
  > "Full-stack developer building production features with React, Next.js, and NestJS. Currently working as a full-stack developer at NMI in Sydney, and completing a Master's in Information Technology (Artificial Intelligence) at Macquarie University."
- CTA buttons: **"View Projects"** and **"Download Resume"** (link resume to a PDF in `/public`)
- Social links: GitHub, LinkedIn (`linkedin.com/in/parajuli-manish`), Email
- Terminal-style decoration element, e.g.:
  ```
  $ whoami
  > full-stack developer @ NMI
  > building with react.js + nestjs
  > based in Sydney, Australia
  ```

## 2. About Section
- Professional summary (real, not generic):
  > "I'm a full-stack developer currently working at NMI, where I build features across the stack — from React/Next.js frontends to NestJS backends, including SAP integration work and internal tooling. I previously worked as a Frontend Developer at Calcgen Nepal, and I'm now completing a Master's in IT (Artificial Intelligence) at Macquarie University."
- "Currently working at **NMI**"
- Tech stack visualization (icon row, not a chart)
- Stats: years coding, current role tenure, education status (e.g. "Master's in AI, in progress")
- Fun fact / personal touch (placeholder for Manish to fill in — e.g. a hobby, sport, or the futsal captaincy story)

## 3. Skills Section
Organize by category, icon grid with labels (no progress bars). Use Manish's actual stack — don't invent tools he hasn't used:

**Languages**
- JavaScript / TypeScript
- SQL
- Python *(currently learning)*

**Frontend**
- React.js
- Next.js
- Redux
- Tailwind CSS

**Backend**
- Node.js
- NestJS
- REST APIs
- GraphQL *(fundamentals)*

**Tools & Integrations**
- Git / GitHub
- Shopify (storefront development & customization)
- SAP integration
- ServiceNow / Active Directory

**Currently exploring**
- AI/ML tooling (tied to current Master's coursework)
- Deployment & CI/CD workflows (Vercel, GitHub Actions)

## 4. Projects Section
Featured projects (3–4). **Manish: replace the placeholders below with your actual project details, screenshots, and real outcomes/metrics — don't let Claude Code invent numbers.** Strong candidates from current work:
- SAP REX integration project (NMI)
- Shopify storefront feature/bug-fix work (NMI)
- Log UI / monitoring dashboard (NMI)
- CRM frontend work (Calcgen Nepal)

Each project card should show:
- Screenshot/mockup (top)
- Title + one-line description (bottom)
- Tech stack tags
- GitHub link and/or live demo link (omit if private/internal — note "Internal project" instead of a dead link)
- Star count only if actually open source
- One-line real outcome (e.g. "Reduced manual data entry by replacing a manual SAP sync step" — Manish to confirm actual impact)
- Link to a case-study page for deeper context

Card layout: image top, content bottom, hover = slight lift + shadow/glow.

## 5. Open Source Section (optional — include only if relevant)
- GitHub contribution graph embed (pull from Manish's GitHub username)
- Notable contributions list (leave empty/placeholder if none yet — don't fabricate)
- "View GitHub Profile" link

## 6. Blog/Writing Section (optional, can be marked "Coming Soon" if no posts yet)
- 3 recent article cards: title, excerpt, date, read time
- Link out to dev.to/Medium/personal blog

## 7. Case-Study Pages
For each featured project, generate a route (e.g. `/projects/[slug]`) with:
- Problem & user/business context
- Constraints and tradeoffs
- Architecture / data-flow diagram area (placeholder component, e.g. for the SAP REX integration flow)
- Screenshots or UI states
- Code/GitHub repo link (or "internal/private" note)
- Results, metrics, or lessons learned (Manish to fill in with real detail)

## 8. Experience Timeline
Vertical timeline, most recent first:

- **Full-Stack Developer — NMI, Sydney** (Feb 2026 – Present)
  Internship Feb–Apr 2026, transitioned to a casual full-stack role. Built a SAP REX integration, maintained and fixed bugs on the company Shopify site, and developed a log UI. Stack: React.js, NestJS.

- **Frontend Developer — Calcgen Nepal** (Jun 2023 – Apr 2024)
  Built and optimized web applications with React.js, Redux, and Next.js; designed reusable UI components and dynamic form templates for internal CRM systems; integrated REST APIs. Stack: React.js, Redux, Next.js.

- **Master of Information Technology (Artificial Intelligence) — Macquarie University** (2025 – 2027, expected)
  *(Optional: include as an education/timeline entry alongside work experience.)*

## 9. Contact Section
- Heading: **"Interested in working together?"**
- Email displayed prominently: `parajuli.manish07@gmail.com`
- Contact form: name, email, message
- Response time expectation (e.g. "I usually reply within 1–2 days")
- CTA copy covering full-time, freelance, and casual/contract inquiries
- LinkedIn link: `linkedin.com/in/parajuli-manish`

## 10. Claude Code Implementation Notes
- Framework: Next.js (App Router) + TypeScript + Tailwind CSS.
- Reusable components: `Hero`, `ProjectGrid`, `ProjectCard`, `CaseStudyPreview`, `SkillsCloud`, `ExperienceTimeline`, `ContactCTA`, `TerminalDecoration`.
- Store projects, skills, experience, and social links as typed placeholder data arrays (e.g. `data/projects.ts`, `data/experience.ts`) so Manish can edit content without touching layout code.
- Responsive breakpoints for mobile, tablet, and desktop; hamburger menu on mobile.
- Use `next/image` for all screenshots/mockups with proper `alt` text and lazy loading.
- SEO metadata (per-page `metadata` export) targeting: "Manish Parajuli portfolio", "full-stack developer Sydney", "React NestJS developer portfolio".
- Respect `prefers-reduced-motion` for all animations.
- Deployment: configure for Vercel with a `README.md` covering setup, env vars (if a contact form API is used), and build/deploy steps.
- Accessibility: semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`), visible focus states, sufficient color contrast against the dark background, alt text on all images.

---

### Notes for Manish before running this
- Fill in your real GitHub username and repo links. -> https://github.com/parajulimanish07
- Swap in actual screenshots for the NMI/Calcgen projects (or generic UI mockups if the work is private). -> its private
- Confirm whether SAP REX / Shopify / log UI projects can be shown publicly, or should be described without exposing proprietary code. -> private
- Add your resume PDF to `/public/resume.pdf` so the "Download Resume" button works.