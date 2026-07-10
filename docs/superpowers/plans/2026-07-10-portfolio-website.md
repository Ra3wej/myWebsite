# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, recruiter-focused React portfolio for Rawezh Ali Rashid that highlights current backend expertise and six verified published mobile applications.

**Architecture:** A Vite-built React single page reads immutable typed content from one data module and renders focused section components. CSS tokens and native browser APIs provide the editorial visual system and restrained progressive enhancement; Firebase Hosting serves the static `dist` output.

**Tech Stack:** React 19.2, TypeScript 6, Vite 8, plain CSS, Fontsource variable fonts, ESLint, Firebase Hosting configuration

## Global Constraints

- Do not run Flutter, Dart, or .NET commands.
- Do not create unit tests, integration tests, or test projects.
- Do not reveal Moonline Travel products, features, clients, metrics, or inferred achievements.
- Treat `docs/superpowers/specs/2026-07-10-portfolio-website-design.md` as the authoritative content and design reference.
- Public contact data is limited to `rawezh.5555@gmail.com` and Sulaymaniyah, Iraq.
- Use React with TypeScript in strict mode; no backend, router, global state library, contact form, CMS, blog, analytics, or deployment.
- Keep media content data-driven so later image/video changes do not require component edits.
- Meet WCAG 2.2 AA expectations and honor `prefers-reduced-motion`.
- Verify with lint, TypeScript/Vite production build, and manual browser inspection only.

## File Map

- `package.json`: scripts and dependency contract.
- `package-lock.json`: exact installed dependency graph.
- `vite.config.ts`: React plugin and build configuration.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: strict TypeScript configuration.
- `eslint.config.js`: TypeScript and React Hooks lint rules.
- `index.html`: metadata, application root, and structured data.
- `firebase.json`: static hosting, rewrites, and cache headers.
- `.gitignore`: generated and local files.
- `public/favicon.svg`: branded RA mark.
- `public/social-preview.svg`: local social-sharing art.
- `src/main.tsx`: application bootstrap and global font/style imports.
- `src/App.tsx`: section composition only.
- `src/types/portfolio.ts`: immutable content and media contracts.
- `src/data/portfolio.ts`: all public portfolio content and verified links.
- `src/components/layout/Header.tsx`: desktop/mobile anchor navigation.
- `src/components/layout/Section.tsx`: numbered semantic section shell.
- `src/components/layout/Footer.tsx`: compact footer.
- `src/components/ui/ArrowIcon.tsx`: reusable decorative arrow SVG.
- `src/components/ui/ExternalLink.tsx`: safe external-link primitive.
- `src/components/ui/ProjectMedia.tsx`: placeholder/image/video rendering.
- `src/components/ui/Reveal.tsx`: progressive reveal wrapper.
- `src/components/sections/Hero.tsx`: identity and primary actions.
- `src/components/sections/About.tsx`: current positioning and proof strip.
- `src/components/sections/Experience.tsx`: confidentiality-safe timeline.
- `src/components/sections/Capabilities.tsx`: grouped skills.
- `src/components/sections/Projects.tsx`: six work cards and store links.
- `src/components/sections/Education.tsx`: degree details.
- `src/components/sections/Contact.tsx`: direct email CTA.
- `src/hooks/useReveal.ts`: Intersection Observer enhancement.
- `src/styles/tokens.css`: color, type, spacing, radius, and motion variables.
- `src/styles/global.css`: reset, document defaults, accessibility, and shared layout.
- `src/styles/components.css`: navigation, UI primitives, and section presentation.
- `src/styles/responsive.css`: breakpoint-specific layout changes.

---

### Task 1: Establish the Vite React TypeScript foundation

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `eslint.config.js`
- Create: `.gitignore`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

**Interfaces:**
- Produces: `npm run dev`, `npm run lint`, and `npm run build` scripts; React root bootstrapping `<App />`.

- [ ] **Step 1: Create the package contract**

Use React `19.2.7`, React DOM `19.2.7`, Vite `8.1.3`, `@vitejs/plugin-react` `6.0.3`, and TypeScript `6.0.3`. Add Fontsource variable packages for Manrope and JetBrains Mono. Configure scripts exactly as:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

Install current stable ESLint, `typescript-eslint`, React Hooks, React Refresh, and React type packages; commit the generated lockfile.

- [ ] **Step 2: Configure Vite, TypeScript, and ESLint**

`vite.config.ts` must remain minimal:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

Enable `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`, `moduleResolution: "Bundler"`, and the React JSX transform. Enable recommended TypeScript, React Hooks, and React Refresh lint rules.

- [ ] **Step 3: Add bootstrap files**

`src/main.tsx` imports both variable font packages, the four CSS entry files, and renders `<App />` inside `<StrictMode>`. `src/App.tsx` initially renders a semantic `<main id="main-content">` with the text `Rawezh Ali Rashid`.

- [ ] **Step 4: Install dependencies and validate foundation**

Run: `npm install`

Run: `npm run lint`

Expected: exit code 0 and no lint errors.

Run: `npm run build`

Expected: exit code 0 and a generated `dist/index.html`.

- [ ] **Step 5: Commit**

```text
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json eslint.config.js .gitignore src/main.tsx src/App.tsx
git commit -m "chore: establish React portfolio foundation"
```

### Task 2: Define typed content and verified portfolio data

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/data/portfolio.ts`

**Interfaces:**
- Produces: `MediaAsset`, `Experience`, `CapabilityGroup`, `Project`, `profile`, `proofPoints`, `experiences`, `capabilities`, `projects`, and `education`.
- Consumed by: all section and media components.

- [ ] **Step 1: Define immutable content contracts**

Create these exact public shapes:

```ts
export type StorePlatform = 'App Store' | 'Google Play';

export type MediaAsset =
  | { readonly type: 'placeholder'; readonly label: string }
  | { readonly type: 'image'; readonly src: string; readonly alt: string; readonly width: number; readonly height: number }
  | { readonly type: 'video'; readonly src: string; readonly poster: string; readonly caption: string };

export interface StoreLink {
  readonly platform: StorePlatform;
  readonly href: string;
}

export interface Experience {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly confidential?: boolean;
}

export interface CapabilityGroup {
  readonly title: string;
  readonly summary: string;
  readonly skills: readonly string[];
}

export interface Project {
  readonly name: string;
  readonly category: string;
  readonly role: string;
  readonly summary: string;
  readonly technologies: readonly string[];
  readonly media: MediaAsset;
  readonly stores: readonly StoreLink[];
}
```

- [ ] **Step 2: Create immutable profile, experience, skills, education, and proof data**

Use the approved copy and facts from the design spec. Moonline must contain only C#/.NET Web API, PostgreSQL, Docker, Clean Architecture, and CQRS plus a direct confidentiality statement. Stack Solvers may use the complete verified responsibilities from the CV.

- [ ] **Step 3: Add all six projects and twelve verified links**

Create objects for Smart Health Tower, Vary Pharmacy, Roshnayi, Avera Pharmacy & Cosmetic, Harem Hospital, and Vary Healthcare. Roles and URLs must match the design spec exactly. Each media value begins as:

```ts
media: { type: 'placeholder', label: 'Personal project media coming soon' }
```

Use public, non-speculative summaries based on industry and confirmed role. Do not assign Moonline technologies to older mobile projects.

- [ ] **Step 4: Validate types and lint**

Run: `npm run lint`

Run: `npm run build`

Expected: both commands exit 0 with no TypeScript errors.

- [ ] **Step 5: Commit**

```text
git add src/types/portfolio.ts src/data/portfolio.ts
git commit -m "feat: add typed portfolio content"
```

### Task 3: Build accessible layout and UI primitives

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Section.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/ArrowIcon.tsx`
- Create: `src/components/ui/ExternalLink.tsx`
- Create: `src/components/ui/ProjectMedia.tsx`
- Create: `src/components/ui/Reveal.tsx`
- Create: `src/hooks/useReveal.ts`

**Interfaces:**
- Produces: `Header()`, `Section({ id, index, eyebrow, title, children })`, `Footer()`, `ExternalLink({ href, children, className, ariaLabel })`, `ProjectMedia({ media, projectName })`, and `Reveal({ children, className })`.

- [ ] **Step 1: Implement safe links and semantic section shell**

`ExternalLink` must render `target="_blank"` and `rel="noopener noreferrer"`. `Section` must render a semantic `<section id>` with an eyebrow, numbered label, heading, and child content; do not hardcode portfolio data inside it.

- [ ] **Step 2: Implement project media variants**

Use an exhaustive `switch (media.type)`. Placeholder renders layered decorative shapes with `aria-hidden="true"`; image renders intrinsic dimensions and `loading="lazy"`; video renders native controls, no autoplay, a poster, caption, and source fallback link.

- [ ] **Step 3: Implement progressive reveal behavior**

`useReveal` returns a ref and boolean visibility state. It must immediately mark content visible when Intersection Observer is unavailable or reduced motion is requested, observe once with a small positive threshold, and disconnect after reveal. Rendered page content must remain readable without animation.

- [ ] **Step 4: Implement accessible navigation**

Header anchors target existing section IDs. Mobile menu uses a real `<button>`, `aria-expanded`, `aria-controls`, Escape-to-close behavior, closes after an anchor is selected, and returns focus to its trigger when dismissed with Escape. Header includes a visible-on-focus skip link to `#main-content`.

- [ ] **Step 5: Validate**

Run: `npm run lint`

Run: `npm run build`

Expected: both commands exit 0.

- [ ] **Step 6: Commit**

```text
git add src/components src/hooks
git commit -m "feat: add accessible portfolio primitives"
```

### Task 4: Implement all portfolio sections and composition

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/About.tsx`
- Create: `src/components/sections/Experience.tsx`
- Create: `src/components/sections/Capabilities.tsx`
- Create: `src/components/sections/Projects.tsx`
- Create: `src/components/sections/Education.tsx`
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: typed exports from `src/data/portfolio.ts` and primitives from Task 3.
- Produces: complete semantic single-page document with IDs `about`, `experience`, `skills`, `work`, and `contact`.

- [ ] **Step 1: Build hero and about sections**

Hero renders the approved name, title, statement, support copy, `mailto:` CTA, work anchor, and location. About renders the career progression copy and four proof points; use one `h1` in the hero and section-level `h2` headings afterward.

- [ ] **Step 2: Build experience and capabilities sections**

Experience maps typed timeline entries and visibly marks Moonline as confidential without exposing details. Capabilities maps four groups in the approved backend-first order and uses tags without scores or progress bars.

- [ ] **Step 3: Build selected-work section**

Render six numbered project articles. Each article includes name, category, role, summary, known technology tags, `ProjectMedia`, and both verified store links. Keep all details visible; do not add modals or accordions.

- [ ] **Step 4: Build education and contact sections**

Education renders UOS, College of Commerce — IT, Bachelor's degree, 2018–2022. Contact renders one large direct email link, public location, and no form or phone.

- [ ] **Step 5: Compose the app**

`App.tsx` order must be Header, main containing Hero/About/Experience/Capabilities/Projects/Education/Contact, then Footer. Navigation IDs and section IDs must match exactly.

- [ ] **Step 6: Validate**

Run: `npm run lint`

Run: `npm run build`

Expected: both commands exit 0; rendered content contains six projects and twelve store links.

- [ ] **Step 7: Commit**

```text
git add src/App.tsx src/components/sections
git commit -m "feat: compose recruiter-focused portfolio"
```

### Task 5: Apply the systems-editorial visual system

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/components.css`
- Create: `src/styles/responsive.css`

**Interfaces:**
- Consumes: class names from Tasks 3 and 4.
- Produces: dark editorial UI from 320px through wide desktop sizes.

- [ ] **Step 1: Define design tokens**

Set exact CSS custom properties for near-black background, raised charcoal surfaces, warm off-white text, muted gray, electric lime accent, borders, Manrope/JetBrains Mono families, fluid spacing, container width, radii, shadows, and motion timing.

- [ ] **Step 2: Add reset and global accessibility styles**

Use `box-sizing: border-box`, smooth anchor scrolling only when reduced motion is not requested, readable line lengths, visible `:focus-visible` outlines, a skip-link pattern, semantic selection colors, and body overflow protection. Content must be visible before JavaScript enhancement.

- [ ] **Step 3: Style layout and sections**

Implement sticky header, large fluid hero type, proof grid, timeline rails, skill grids, asymmetric project articles, CSS-generated media compositions, oversized contact treatment, and compact footer. Use thin architecture-inspired connector lines as backgrounds without imitating a terminal.

- [ ] **Step 4: Add responsive layouts**

At narrow widths use one-column cards, large touch targets, wrapping CTAs, and mobile navigation. At tablet and desktop widths progressively introduce two-column content, alternating project layouts, and expanded whitespace without horizontal scrolling.

- [ ] **Step 5: Add reduced-motion behavior**

Under `@media (prefers-reduced-motion: reduce)`, disable smooth scrolling and nonessential transitions; force reveal elements into their final visible state.

- [ ] **Step 6: Validate**

Run: `npm run lint`

Run: `npm run build`

Expected: both commands exit 0 and generated CSS is included in the production bundle.

- [ ] **Step 7: Commit**

```text
git add src/styles
git commit -m "feat: apply systems editorial design"
```

### Task 6: Add metadata, branded assets, and Firebase Hosting configuration

**Files:**
- Modify: `index.html`
- Create: `public/favicon.svg`
- Create: `public/social-preview.svg`
- Create: `firebase.json`
- Create: `README.md`

**Interfaces:**
- Produces: crawlable metadata, local brand assets, and Firebase-ready `dist` hosting behavior.

- [ ] **Step 1: Add document metadata**

Set language `en`, title `Rawezh Ali Rashid — Backend & Mobile Developer`, concise description, theme color, favicon, Open Graph fields, Twitter card fields, and public-only `Person` JSON-LD. Do not add a canonical URL until a production domain exists.

- [ ] **Step 2: Create local SVG brand assets**

Create a minimal RA monogram favicon and a 1200×630 dark editorial social-preview SVG using the site palette and approved title. Do not embed external images or fonts in SVG.

- [ ] **Step 3: Configure Firebase Hosting**

Use this behavior:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }],
    "headers": [
      {
        "source": "/assets/**",
        "headers": [{ "key": "Cache-Control", "value": "public,max-age=31536000,immutable" }]
      },
      {
        "source": "/index.html",
        "headers": [{ "key": "Cache-Control", "value": "no-cache" }]
      }
    ]
  }
}
```

- [ ] **Step 4: Document maintenance and deployment**

README must explain local commands, content location, exact `MediaAsset` examples for adding an image or video, production build output, and later Firebase steps without creating or guessing a project ID.

- [ ] **Step 5: Validate**

Run: `npm run lint`

Run: `npm run build`

Expected: both exit 0; `dist` contains HTML, hashed assets, favicon, and social preview.

- [ ] **Step 6: Commit**

```text
git add index.html public firebase.json README.md
git commit -m "feat: prepare portfolio for discovery and Firebase"
```

### Task 7: Perform final manual verification and remediation

**Files:**
- Modify: only files implicated by verification findings.

**Interfaces:**
- Produces: production-ready local build with evidence for lint, compilation, layout, accessibility, links, and console behavior.

- [ ] **Step 1: Run clean static verification**

Run: `npm run lint`

Expected: exit code 0.

Run: `npm run build`

Expected: exit code 0 with production assets generated in `dist`.

- [ ] **Step 2: Inspect production preview in the browser**

Run `npm run preview -- --host 127.0.0.1`, then inspect at approximately 375px, 768px, 1440px, and 1920px widths. Confirm no horizontal overflow, clipped text, overlapping sections, or unstable media dimensions.

- [ ] **Step 3: Verify interaction and accessibility**

Use keyboard only to traverse skip link, navigation, email CTA, project store links, and mobile menu. Confirm logical focus order, visible focus rings, Escape-to-close, descriptive labels, semantic heading order, and readable contrast. Emulate reduced motion and confirm reveals are disabled while all content stays visible.

- [ ] **Step 4: Verify content and resilience**

Confirm Moonline copy contains no protected work detail; six projects and twelve links match the spec; no phone, neighborhood, social links, old CV, form, fake metric, or console error appears. Confirm content remains visible if reveal classes or Intersection Observer enhancement are unavailable.

- [ ] **Step 5: Fix findings and rerun verification**

Apply only evidence-backed fixes. Rerun `npm run lint` and `npm run build` after every remediation batch until both exit 0.

- [ ] **Step 6: Commit final remediation**

```text
git add -A
git commit -m "fix: complete portfolio verification"
```
