# Mobile Responsive Portfolio Implementation Plan

> **For agentic workers:** Execute this plan task-by-task with verification checkpoints. Do not add unit or integration test code; use the existing production build and browser inspection commands.

**Goal:** Make the portfolio usable from 320px phones through 768px tablets while preserving the 3D hero atmosphere as a contained, low-priority background layer.

**Architecture:** Keep the existing component structure and implement the fix primarily through shared shrink/wrap constraints and targeted phone breakpoints. Adjust only the hero visual containment and interactive overlays where CSS alone cannot express the intended mobile behavior.

**Tech Stack:** React 19, TypeScript, Vite, CSS, Three.js/React Three Fiber, npm.

## Global Constraints

- Support phone widths from 320px through 430px and tablet widths through 768px.
- Eliminate horizontal scrolling and clipped interactive content.
- Keep the 3D hero atmosphere visible as a low-opacity background layer.
- Preserve the current navigation, command palette, playground, and section interactions.
- Do not add a test project or automated test code.
- Do not run Flutter, Dart, or .NET commands.

## File map

- Modify `src/styles/components.css` for shared layout shrink, wrapping, and media constraints.
- Modify `src/styles/responsive.css` for the main tablet, phone, and small-phone breakpoint behavior.
- Modify `src/styles/visuals.css` for hero scene containment, capability-spectrum sizing, and playground behavior.
- Modify `src/styles/sections-enhanced.css` only if its project-orbit mobile rules still produce clipping after the shared rules are applied.
- Modify `src/components/layout/Header.tsx` only if browser verification exposes an interaction issue that cannot be fixed with CSS.

### Task 1: Add shared shrink and wrapping safeguards

**Files:**
- Modify `src/styles/components.css`

Add explicit `min-width: 0` to layout children that can contain long text, and make long interactive content wrap safely:

```css
.hero-content,
.hero-aside,
.section-heading > *,
.about-copy > *,
.timeline-entry > *,
.capability-card,
.project-card > *,
.education-card > *,
.contact-panel,
.contact-meta > * {
  min-width: 0;
}

.hero h1,
.section-heading h2,
.project-content h3,
.education-card h3,
.contact-email,
.tag-list,
.store-links,
.contact-meta {
  overflow-wrap: anywhere;
}

.button,
.external-link,
.hero-work-link {
  max-width: 100%;
}
```

Keep the existing desktop grids and visual tokens unchanged. Run `git diff --check` after the edit.

### Task 2: Strengthen tablet and phone layout rules

**Files:**
- Modify `src/styles/responsive.css`

At the existing `58rem` breakpoint, keep the navigation and one-column section changes, but add safe sizing for the fixed header and content containers:

```css
.site-header { min-width: 0; }
.wordmark { min-width: 0; }
.primary-navigation { min-width: 0; }
.hero-content,
.hero-aside,
.section,
.site-footer { min-width: 0; }
```

At the existing `40rem` breakpoint, ensure phone content uses fluid spacing and does not preserve desktop widths:

```css
html { scrollbar-gutter: auto; }
body { min-width: 0; }
.site-header { min-height: 4.35rem; }
.hero { padding-top: 7rem; }
.hero h1 { max-width: 100%; font-size: clamp(2.75rem, 14vw, 4.25rem); }
.hero-intro,
.section-heading,
.about-copy,
.timeline-entry,
.project-card,
.education-card { min-width: 0; }
.project-card { padding: 1rem; }
.project-content h3 { font-size: clamp(1.6rem, 9vw, 2.45rem); }
.contact-email { align-items: flex-start; font-size: clamp(1.25rem, 7vw, 2rem); }
```

Add a `max-width: 22.5rem` rule for very narrow phones that reduces gutters and media/card padding without hiding primary content:

```css
@media (max-width: 22.5rem) {
  :root { --gutter: .85rem; --section-space: 4.25rem; }
  .contact-panel,
  .project-card,
  .education-card { padding: 1rem; }
  .hero h1 { font-size: clamp(2.5rem, 14vw, 3.4rem); }
}
```

Preserve full-width buttons on phones and keep navigation touch targets at least 3rem tall.

### Task 3: Contain the hero visual and mobile overlays

**Files:**
- Modify `src/styles/visuals.css`

Remove the desktop `min-width: 42rem` constraint from `.hero-world` at tablet widths and replace it with fluid containment. On phones, keep the visual behind content with reduced opacity and no pointer interaction:

```css
@media (max-width: 58rem) {
  .hero-world {
    right: -10%;
    width: 82%;
    min-width: 0;
    opacity: .42;
    pointer-events: none;
  }
}

@media (max-width: 40rem) {
  .hero-world {
    top: 4.5rem;
    right: -24%;
    width: 118%;
    height: 24rem;
    opacity: .26;
    pointer-events: none;
  }

  .capability-spectrum__grid { grid-template-columns: 1fr; }
  .capability-spectrum__item { min-width: 0; }
}
```

Keep the playground console inside `calc(100vw - 2rem)` and preserve its existing scroll behavior; only adjust its phone padding or control spacing if browser inspection identifies clipping.

### Task 4: Inspect enhanced project orbit behavior

**Files:**
- Inspect and, only if needed, modify `src/styles/sections-enhanced.css`

At phone width, verify the project orbit dock, controls, and slides. If any child still expands the page, enforce `min-width: 0` on the slide/content wrappers and retain horizontal scrolling only on the intentionally scrollable dock. Do not change the project interaction model.

### Task 5: Build and verify responsive behavior

**Files:**
- No new files.

Run:

```powershell
npm run build
git diff --check
```

Use the browser at 320px, 375px, 430px, 768px, and a wide desktop viewport. Confirm the page has no horizontal overflow, the menu opens and closes, hero actions are usable, long content wraps, project media is contained, the 3D scene is subordinate, and the playground remains usable. Do not add test code.

### Task 6: Commit the implementation

After verification, stage only the responsive implementation files and commit:

```powershell
git add src/styles/components.css src/styles/responsive.css src/styles/visuals.css src/styles/sections-enhanced.css src/components/layout/Header.tsx
git commit -m "Improve mobile responsive layout"
```

Omit files that were inspected but not modified from the `git add` command.

