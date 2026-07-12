# Mobile Responsive Portfolio Design

## Context

The portfolio has mobile breakpoints, but several desktop-oriented layout rules remain active on narrow screens. The most visible risks are the hero's large 3D scene, fixed-width visual elements, dense navigation/content rows, and long text values. The goal is to make the existing single-page experience usable on phones without removing its cinematic identity.

## Goals

- Support phone widths from 320px through 430px and tablet widths through 768px.
- Eliminate horizontal scrolling and clipped interactive content.
- Keep the 3D hero atmosphere visible as a low-opacity background layer.
- Preserve readable hierarchy, comfortable tap targets, and clear primary actions.
- Keep the existing desktop composition unchanged unless a responsive rule is required.
- Maintain the current navigation, command palette, playground, and section interactions.

## Non-goals

- Redesigning the visual language or content.
- Replacing the Three.js scene with a separate mobile illustration.
- Adding a test project or automated test suite.
- Reworking the desktop layout beyond shared sizing constraints.

## Responsive strategy

Use a CSS-first responsive pass with small component adjustments only where layout and interaction cannot be solved through styling.

### Global constraints

- Apply `min-width: 0` to grid/flex children that can contain long text.
- Use `overflow-wrap: anywhere` or safe text wrapping for emails, headings, labels, and tags.
- Keep page gutters and section spacing fluid with the existing design tokens, adding a small-phone floor where needed.
- Ensure media, canvases, decorative layers, and dialogs stay within the viewport.

### Header and navigation

- Keep the compact wordmark and hamburger menu at phone widths.
- Make the opened navigation panel span the usable viewport with safe gutters.
- Keep every navigation item at a comfortable touch height and close the menu after selection.
- Prevent the command-palette trigger and header contents from forcing a horizontal overflow.

### Hero

- Keep the 3D scene behind the content, but constrain it with fluid width/height values and reduce opacity on narrow screens.
- Disable pointer interaction on the decorative scene at phone widths so it cannot compete with scrolling or taps.
- Let the hero heading wrap naturally instead of preserving desktop `max-content` behavior.
- Stack the intro copy and actions; make primary actions full-width only where that improves tap usability.
- Keep telemetry and aside content readable without competing with the heading.

### Content sections

- Collapse multi-column section headings, timelines, proof cards, capability cards, projects, education, and contact metadata at the appropriate breakpoints.
- Ensure project media keeps a stable aspect ratio and project content can shrink inside its grid.
- Allow tags, store links, and external links to wrap without clipping.
- Reduce decorative padding and typography only at phone widths, preserving the existing visual rhythm.

### Interactive overlays

- Keep the system playground within the viewport with a scrollable console and one-column controls on phones.
- Preserve focus visibility and keyboard escape behavior for menus and dialogs.
- Respect reduced-motion preferences while adding no new motion behavior.

## Component scope

- `src/styles/responsive.css`: primary breakpoint and small-phone rules.
- `src/styles/components.css`: shared sizing/wrapping constraints where the base layout currently prevents shrinking.
- `src/styles/visuals.css`: hero scene and playground mobile containment.
- `src/styles/sections-enhanced.css`: any enhanced cards or decorative layouts that retain fixed geometry.
- `src/components/layout/Header.tsx`: only if mobile menu/command-palette layout needs a behavior-level adjustment.
- Other components only if verification identifies a concrete responsive behavior issue.

## Verification

Run the existing production build, then inspect the deployed/local app at 320px, 375px, 430px, and 768px viewport widths. Confirm:

1. No horizontal page overflow is present.
2. The header menu opens, closes, and remains tappable.
3. Hero heading, intro, CTAs, and aside content are readable.
4. All sections stack without clipped text or controls.
5. Project media and the 3D scene remain contained and visually subordinate.
6. The command palette/playground remain usable on a phone.
7. Desktop layout remains intact at a wide viewport.

