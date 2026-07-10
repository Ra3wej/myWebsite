# Immersive Systems Portfolio Design

Date: 2026-07-11  
Status: Approved direction; pending written-spec review

## Objective

Transform the existing systems-editorial portfolio into an immersive, game-like technical experience that immediately feels authored, memorable, and ambitious. Popular React animation and 3D packages will provide a signature WebGL hero, scroll-driven choreography, tactile project interactions, and an optional full-screen exploration mode.

The redesign must still communicate the same verified professional facts. Spectacle is allowed to be bold; invented career claims, fake product screenshots, inaccessible content, and fragile navigation are not.

## User Direction

The user explicitly superseded the original restrained-motion direction and granted broad creative control, including permission to make the site feel like a 3D game. The selected direction is therefore the most ambitious option: an **immersive systems universe** built around one coherent visual metaphor rather than a collection of unrelated effects.

## Creative Thesis: The Systems Core

The portfolio represents Rawezh as a builder who connects backend services, data, infrastructure, and mobile products. The site visualizes that idea as a living computational world:

- An obsidian environment contains a luminous metallic core.
- Orbiting service nodes represent backend, data, infrastructure, and mobile delivery.
- Animated packets travel across curved connections and react to pointer movement.
- The camera and lighting respond to the page's scroll progress.
- Editorial panels behave like precise glass-and-metal system interfaces.
- Project cards feel like collectible mission records rather than conventional portfolio tiles.

The visual result should feel closer to a premium game title screen or cinematic developer tool than a standard personal website, while the underlying content remains a readable single-page portfolio.

## Visual Language

### Palette

- Base: near-black obsidian with subtle blue-black depth.
- Primary energy: molten bronze and warm gold, evolving the current `#bd9567` accent.
- Secondary signal: restrained electric cyan for data paths, active state, and depth separation.
- Rare alert accent: ultraviolet used only in the 3D world and project-media gradients.
- Text: warm off-white with cool gray secondary copy.
- Surfaces: translucent black glass, thin metallic borders, soft internal highlights, and controlled bloom.

The favicon and social preview will be updated to the same bronze/cyan system so the current electric-lime mismatch disappears.

### Typography

Manrope and JetBrains Mono remain because they already suit the editorial/technical identity. Their presentation becomes more dramatic:

- The hero name is split into individually animated words without adding a text-splitting dependency.
- Large headings use masked vertical reveals and slight depth shifts.
- Mono labels act as diagnostics, coordinates, mission IDs, and section states.
- Body copy remains stable and never continuously moves.

### Texture and Depth

The existing architectural grid remains and becomes part of the world. It can gain slow perspective drift, illuminated intersections, grain, and section-specific color washes. Effects must preserve text contrast and use transforms/opacity where possible instead of continuously repainting large blurred layers.

## Experience Design

### 1. Entry and Header

The page is visible immediately; there is no blocking loader. A short non-blocking boot choreography reveals the wordmark, navigation, hero diagnostics, name, and actions in sequence.

The fixed header gains:

- A thin scroll-progress rail.
- An active-section marker.
- A glass surface that becomes denser after leaving the hero.
- Motion-driven link indicators and a more tactile mobile menu.

Anchor navigation remains native after React mounts and never depends on Lenis. Smooth scrolling is progressive enhancement.

### 2. Hero: Live Systems Core

The hero becomes a full-viewport composition with real HTML content layered over one lazy-loaded React Three Fiber canvas.

The 3D scene contains:

- A faceted metallic core with animated energy seams.
- Four orbiting domain nodes labeled through adjacent HTML diagnostics: Backend, Data, Infrastructure, Mobile.
- Curved data routes with traveling packet lights.
- Sparse particles and depth fog used for scale, not as a generic particle wallpaper.
- Bronze key lighting, cyan rim lighting, bloom, vignette, and subtle film grain.
- Pointer-responsive camera parallax and gentle inertial rotation.
- A scroll transition that pulls the camera through the lattice as the visitor leaves the hero.

The existing professional statement, current role, stack, and email CTA remain semantic HTML. The canvas is decorative by default and cannot replace or obscure that information.

The secondary action becomes **Launch system**. It opens the optional exploration mode instead of merely scrolling to work.

### 3. Optional System Playground

Launch system opens a full-screen, escapable dialog that expands the hero scene into a small interactive control room.

Visitors can:

- Orbit the core with pointer drag or keyboard controls.
- Focus each domain node to reveal concise, already-public capability information.
- Trigger packet bursts between nodes.
- Activate a short “stabilize network” interaction by lighting all four domains.
- Exit at any time with a visible control or `Escape`.

The interaction is intentionally small and deterministic. It does not add scores, user accounts, persistence, sound, physics, enemies, or invented career data. On touch devices it simplifies to tap-to-focus. Reduced-motion users receive a static domain map inside the same dialog.

### 4. About and Proof

The about section emerges from the hero's data tunnel. Proof metrics count up once and settle. Each proof tile has pointer-responsive depth, a moving highlight, and a subtle diagnostic trace. The values remain visible without animation.

### 5. Experience Timeline

The timeline becomes a vertical signal path:

- The line draws according to scroll progress.
- Entries activate as the line reaches them.
- Dates and technology tags arrive in staggered groups.
- The current role receives a pulsing but calm “live” marker.
- Confidential work stays explicitly marked and no private detail is introduced.

### 6. Capabilities Matrix

Capability cards become responsive system modules with shallow 3D tilt, pointer lighting, animated borders, and compact status details. Hovering a tag subtly routes energy to the card header. Keyboard focus receives the same visual emphasis without requiring pointer movement.

### 7. Project Mission Stack

Projects become the main scroll spectacle. On wide screens, project cards form a sticky stacking sequence: each new mission rises over the previous one with controlled scale, depth, and atmospheric color changes. This is not horizontal scroll hijacking; normal vertical scroll continues to drive the sequence.

Each card gains:

- Cursor-responsive perspective and lighting.
- A category-specific procedural hologram built with DOM/CSS/SVG, not another WebGL canvas.
- Animated mission number, role, technology chips, and store links.
- A media treatment that automatically upgrades to real images or video when supplied through the existing typed data model.
- A clear decorative label so procedural visuals cannot be mistaken for real product screenshots.

On mobile and reduced-motion configurations, projects use a normal single-column list with brief entrance transitions and no sticky stack.

### 8. Education and Contact Portal

Education becomes a compact archive record with orbital-line decoration and a controlled spotlight.

The contact section becomes a large portal-like finale: the grid converges toward the email CTA, the address underline sweeps into place, and the 3D world's colors return in the surrounding atmosphere. The mail link remains a normal `mailto:` control.

## Package Architecture

Every dependency has one job:

- `motion@12.42.2`: DOM reveals, layout transitions, gestures, scroll values, magnetic controls, active navigation, project stacking, and reduced-motion policy. Import from `motion/react` and use `LazyMotion` with `domAnimation` where possible.
- `three@0.185.1`: WebGL renderer and scene primitives. Keep Three on the `0.185.x` line because the selected post-processing version does not accept `0.186.x`.
- `@react-three/fiber@9.6.1`: React renderer for the Systems Core; its current peer range includes React 19.2.7.
- `@react-three/drei@10.7.7`: scene helpers, curves, adaptive performance tools, HTML overlays where needed, and reusable R3F utilities.
- `@react-three/postprocessing@3.0.4` with an explicit `postprocessing@6.39.2` pin: controlled bloom, vignette, noise, and chromatic finishing for the single 3D scene. The wrapper normally resolves the effect pipeline itself; the direct pin makes the Three compatibility boundary visible in the application lockfile.
- `lenis@1.3.25`: smooth native scrolling and anchor-aware interpolation. Configure `anchors: true`, prevent modal scroll capture with `data-lenis-prevent`, and do not instantiate it for reduced-motion users. It is removed if it makes anchor navigation, touch scrolling, or sticky project behavior less reliable.
- `@types/three`: TypeScript declarations as a development dependency.

GSAP, React Spring, AOS, Spline, Lottie, generic particle packages, tilt packages, icon packs, and `@react-three/rapier` will not be installed. Motion and R3F already cover the approved responsibilities; the playground has no collision mechanic that would justify a physics engine.

## Component Architecture

### New application-level modules

- `src/components/experience/ExperienceRoot.tsx`: owns reduced-motion policy, optional playground state, and shared pointer/scroll signals.
- `src/components/experience/SmoothScroll.tsx`: initializes and disposes Lenis without changing content ownership.
- `src/components/experience/ScrollProgress.tsx`: renders page and active-section progress.
- `src/components/experience/SystemPlayground.tsx`: native full-screen `<dialog>` and exploration controls.

### New visual modules

- `src/components/visuals/SystemCoreCanvas.tsx`: lazy-loaded canvas boundary, DPR limits, fallback, visibility pausing, and error containment.
- `src/components/visuals/SystemCoreScene.tsx`: lighting, camera, core, environment, and post-processing composition.
- `src/components/visuals/SystemCore.tsx`: core geometry and energy material.
- `src/components/visuals/ServiceOrbit.tsx`: domain nodes, arcs, packets, focus behavior, and activation state.
- `src/components/visuals/SceneFallback.tsx`: static CSS/SVG composition for loading, reduced motion, WebGL failure, or constrained devices.
- `src/components/visuals/VisualErrorBoundary.tsx`: contains canvas failures and replaces the scene with `SceneFallback`.
- `src/components/visuals/ProjectHologram.tsx`: deterministic DOM/SVG visual derived from project category and sequence.

### Enhanced reusable UI

- `src/components/ui/Reveal.tsx`: becomes a real Motion viewport reveal with variants and optional stagger configuration.
- `src/components/ui/MagneticLink.tsx`: pointer-aware control that preserves native anchor behavior and keyboard focus.
- `src/components/ui/TiltSurface.tsx`: reusable transform/spotlight wrapper with a static focus and touch state.
- `src/components/ui/CountUp.tsx`: one-time proof metric animation with an immediate reduced-motion value.

### Styles

- `src/styles/tokens.css`: adds energy colors, depth, motion durations, and surface tokens.
- `src/styles/global.css`: preserves the user's in-progress background grid and adds global atmosphere/fallback behavior.
- `src/styles/components.css`: keeps existing section layout rules and gains enhanced component states.
- `src/styles/experience.css`: owns canvas, playground, scroll progress, project stack, and visual-effect presentation.
- `src/styles/responsive.css`: adds reduced-complexity tablet/mobile layouts.

Existing content continues to live in `src/data/portfolio.ts`; animation and 3D modules do not duplicate career data.

## State and Data Flow

The static portfolio remains the source of truth. New state is intentionally small:

- `isPlaygroundOpen`: controls the optional full-screen experience.
- `activeDomain`: identifies the focused systems node.
- `activatedDomains`: tracks the four-node playground interaction for the current session only.
- `performanceTier`: `full`, `reduced`, or `static`, initially derived from reduced-motion preference, WebGL availability, and viewport; runtime feedback may downgrade it but never causes a disruptive automatic upgrade.
- Motion scroll values: drive presentation without being copied into React state on every frame.

The R3F canvas reads shared Motion values or normalized refs rather than causing React rerenders during scrolling. No global state library is required.

## Accessibility and Input

- All professional content and CTAs remain semantic HTML outside the canvas.
- Decorative canvas content is `aria-hidden` in the default hero.
- Playground domain controls have equivalent keyboard-focusable HTML controls and readable descriptions.
- The full-screen mode uses the native `<dialog>` top layer, restores focus to its launcher, and closes with `Escape`.
- Pointer, keyboard, and touch paths are supported.
- `MotionConfig reducedMotion="user"` is set at the root.
- Reduced-motion mode removes continuous rotation, parallax, sticky stacking, count-up interpolation, and smooth scrolling; it does not merely shorten them.
- Focus indicators, skip navigation, logical heading order, and mobile-menu behavior remain intact.
- No audio or vibration is introduced.

## Performance Strategy

- The 3D world is code-split and lazy-loaded after the semantic hero is available.
- Only one WebGL canvas exists.
- Canvas device pixel ratio is capped and adjusted through performance monitoring.
- The scene pauses when the document or hero is not visible and uses demand rendering when continuous animation is unnecessary.
- Geometry and materials are reused; procedural forms avoid large models and texture downloads.
- Post-processing is restrained and disabled on reduced/static tiers.
- Project visuals use DOM/SVG instead of per-card canvases.
- Mobile receives fewer particles, simpler geometry, no expensive depth effects, and no sticky project stack.
- The production build will be inspected to confirm that Three/R3F are emitted in a separate lazy chunk and the main content does not wait for it.

## Failure and Fallback Behavior

- A React error boundary contains WebGL initialization and runtime failures.
- Canvas loading displays the static Systems Core fallback without layout shift.
- Missing WebGL, shader failure, low runtime performance, or reduced motion selects the static tier.
- If Lenis fails or is disabled, native scrolling and hash anchors continue to work.
- Reveal and scroll effects use visible static CSS as their baseline; content visibility never depends on reaching an animation-complete state.
- Project media still follows the existing typed placeholder/image/video fallback behavior.
- External store and email links remain independent of animation state.

## Verification Strategy

Workspace instructions prohibit new unit or integration test code and prohibit Flutter, Dart, and .NET commands. Verification will therefore use:

- `npm run lint`.
- `npm run build`.
- Production bundle inspection for lazy 3D chunking.
- Manual browser review at wide desktop, laptop, tablet, and phone sizes.
- Keyboard-only navigation through header, CTAs, cards, store links, and playground.
- Pointer and touch interaction checks.
- Reduced-motion emulation and static-tier review.
- WebGL-unavailable/fallback review.
- Anchor navigation, sticky project stack, and native-scroll fallback checks.
- Console error/warning inspection.
- Visual checks at hero, experience, projects, and contact scroll positions.

## Acceptance Criteria

The redesign is complete only when:

1. The installed dependency stack includes Motion and a compatible Three/R3F/Drei setup.
2. The hero renders a distinctive interactive Systems Core on supported desktop browsers.
3. The optional playground opens, supports its four domain interactions, and closes accessibly.
4. Every major section has intentional Motion choreography rather than a generic repeated fade.
5. Project cards provide the designed sticky/depth experience on desktop and a clean static list on mobile/reduced motion.
6. The existing portfolio facts, confidentiality boundary, external links, and typed media behavior remain correct.
7. Reduced-motion, static fallback, and WebGL failure paths keep all content readable and actionable.
8. Lint and production build succeed.
9. Browser inspection shows no console errors at desktop and mobile sizes.
10. Existing user changes to the architectural background grid are preserved.

## Out of Scope

- New backend, database, authentication, analytics, or CMS.
- Fabricated application screenshots or private Moonline Travel details.
- Multiplayer, persistent game progress, scoring, physics simulation, or sound.
- Multiple WebGL canvases or downloaded 3D models.
- Firebase deployment.
- New unit or integration test code.
