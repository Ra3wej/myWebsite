# Rawezh Ali Rashid Portfolio Website Design

Date: 2026-07-10
Status: Ready for user review

## Objective

Build a modern, recruiter-focused single-page portfolio for Rawezh Ali Rashid, positioned as a **Backend & Mobile Developer**. The site must communicate current backend expertise, preserve strong published mobile work, respect Moonline Travel confidentiality, and remain easy to update with project images and videos later.

## Audience and Success Criteria

Primary audience: employers and recruiters hiring backend or backend-capable full-stack developers.

The site succeeds when a visitor can quickly understand:

- Rawezh currently works as a backend developer.
- He has 4+ years of professional development experience.
- He has shipped six verified Android and iOS applications.
- His current backend stack includes C#/.NET Web API, PostgreSQL, Docker, Clean Architecture, and CQRS.
- He can be contacted directly by email.

No claims, metrics, or Moonline product details may be invented.

## Approved Product Decisions

- React with TypeScript.
- Vite static build; no backend.
- Detailed single-page structure with anchor navigation.
- English only.
- Dark systems-editorial visual direction.
- Restrained motion with `prefers-reduced-motion` support.
- Typography-led hero; no portrait.
- Placeholder project media until personal images or video URLs are supplied.
- Direct email CTA; no contact form.
- Public contact data limited to email and Sulaymaniyah, Iraq.
- GitHub, LinkedIn, phone number, neighborhood, and old CV omitted.
- Firebase Hosting configuration included, but no deployment performed.

## Visual Direction

Use a mature systems-editorial aesthetic rather than a product gallery or terminal theme.

### Palette

- Background: near-black charcoal.
- Raised surfaces: slightly lighter charcoal.
- Primary text: warm off-white.
- Secondary text: muted gray.
- Accent: restrained electric lime.
- Dividers: low-contrast neutral lines.

All text and interactive states must meet WCAG 2.2 AA contrast expectations. Focus indicators must remain clearly visible.

### Typography

- Self-hosted Manrope variable font for display and body copy.
- Self-hosted JetBrains Mono variable font used sparingly for labels, dates, technology tags, and status text.
- Large fluid hero type using `clamp()`.
- Comfortable reading width for summaries and experience details.

### Layout

- Mobile-first responsive layout.
- Editorial grid with generous whitespace, thin dividers, section numbering, and subtle architecture-inspired connector lines.
- Project media uses fixed aspect ratios to prevent layout shift.
- Desktop layouts may use asymmetry; mobile layouts collapse to a clear single column.

### Motion

- CSS transitions and a small Intersection Observer reveal utility.
- Subtle section reveals, line growth, and card elevation only.
- No custom cursor, scroll hijacking, autoplay video, heavy 3D, canvas effects, or continuous decorative animation.
- Reduced-motion users receive immediate, static states.

## Page Structure

### 1. Header

- Compact wordmark using Rawezh's initials or name.
- Anchor links: About, Experience, Skills, Work, Contact.
- Sticky behavior with a readable solid/blurred background after scrolling.
- Keyboard-accessible mobile navigation.

### 2. Hero

- Name: Rawezh Ali Rashid.
- Title: Backend & Mobile Developer.
- Statement: “I build reliable backend systems and production mobile apps.”
- Supporting text connects current backend work with published mobile experience.
- Primary CTA: email Rawezh.
- Secondary CTA: view selected work.
- Small status line: based in Sulaymaniyah, Iraq.

### 3. Proof Strip

Display only verifiable facts:

- 4+ years of professional experience.
- 6 published applications.
- Android and iOS delivery.
- Backend and mobile expertise.

### 4. About / Now

Explain progression from full-stack mobile development into deeper backend architecture. Emphasize steady learning, production reliability, clean boundaries, and maintainable systems without vague hype.

### 5. Experience

#### Moonline Travel — Backend Developer

- February 2026–Present.
- Publicly approved topics only: C#/.NET Web API, PostgreSQL, Docker, Clean Architecture, and CQRS.
- State that work details remain confidential.
- Do not mention product names, features, clients, business metrics, or inferred achievements.

#### Stack Solvers Company — Full Stack Mobile Developer

- 2022–2025.
- Built Flutter applications and .NET APIs for healthcare, pharmacy, and education.
- Integrated SQL Server, Firebase Messaging, Firebase Auth, Twilio, REST APIs, local caching, secure token handling, background services, push notifications, and real-time chat.
- Collaborated with UI/UX designers.

### 6. Capabilities

Order skills by current relevance:

1. Backend: C#, .NET Web API, CQRS, Clean Architecture, JWT authentication, background services, REST APIs.
2. Data and infrastructure: PostgreSQL, SQL Server, Docker, Firebase.
3. Mobile: Flutter, Dart, Android, iOS, local storage, push notifications.
4. Tools and integrations: Git, Postman, FCM, Firebase Auth, Twilio, FIB Payments.

Avoid proficiency meters and percentage scores.

### 7. Selected Work

Render six detailed, data-driven project cards. Every card contains:

- Project name.
- Industry/category.
- Rawezh's role.
- Concise public contribution summary.
- Technology tags limited to known facts.
- Placeholder media panel.
- Verified App Store and Google Play links.

Projects and links:

1. Smart Health Tower — Full-Stack Developer
   - App Store: https://apps.apple.com/iq/app/smart-health-tower/id6444019538
   - Google Play: https://play.google.com/store/apps/details?id=smarthealth.group&hl=en
2. Vary Pharmacy — Full-Stack Developer
   - App Store: https://apps.apple.com/iq/app/vary-pharmacy/id6448043911
   - Google Play: https://play.google.com/store/apps/details?id=com.varypharmacy.vary_pharmacy&hl=en
3. Roshnayi — Front-End Developer
   - App Store: https://apps.apple.com/us/app/roshnayi/id6502692914
   - Google Play: https://play.google.com/store/apps/details?id=net.roshnayi.app&hl=en
4. Avera Pharmacy & Cosmetic — Full-Stack Developer
   - App Store: https://apps.apple.com/us/app/avera-pharmacy-cosmetic/id6753678916
   - Google Play: https://play.google.com/store/apps/details?id=com.avera.pharmacyapp
5. Harem Hospital — Full-Stack Developer
   - App Store: https://apps.apple.com/iq/app/harem-hospital/id6740174619
   - Google Play: https://play.google.com/store/apps/details?id=org.haremhospital.app&hl=en
6. Vary Healthcare — Full-Stack Developer
   - App Store: https://apps.apple.com/iq/app/vary-healthcare/id6471336461
   - Google Play: https://play.google.com/store/apps/details?id=com.varyhealthcare.app.varyhealthcare.vary_healthcare_app&hl=en_US

Project media uses a typed discriminated union supporting `placeholder`, `image`, and `video`. Updating media later should require changing data only, not component code. Video entries support a poster, caption, and accessible fallback link.

### 8. Education

- UOS — College of Commerce — IT.
- Bachelor's degree, 2018–2022.

### 9. Contact and Footer

- Direct `mailto:rawezh.5555@gmail.com` CTA.
- Sulaymaniyah, Iraq.
- Compact site credit and current year.
- No phone, social-profile placeholders, or nonfunctional controls.

## Technical Architecture

### Tooling

- Vite.
- React.
- TypeScript in strict mode.
- ESLint with React Hooks rules.
- Plain CSS organized around tokens and focused component/section files.
- Minimal runtime dependencies; use native browser APIs for scrolling and reveal behavior.

### Source Boundaries

- `src/data/portfolio.ts`: all resume, skill, experience, project, and link content.
- `src/types/portfolio.ts`: content and media contracts.
- `src/components/layout`: header, section shell, footer.
- `src/components/sections`: hero, about, experience, capabilities, projects, education, contact.
- `src/components/ui`: reusable button, tag, project media, and external-link primitives.
- `src/hooks/useReveal.ts`: isolated Intersection Observer behavior.
- `src/styles`: design tokens, global styles, utilities, and section styles.

Components remain pure and receive immutable typed props. Content does not live inside large JSX files. Side effects remain outside render.

### State and Data Flow

The site is mostly static. Portfolio data flows from typed data modules into section components. Local state is limited to mobile navigation. Project details remain visible without JavaScript state. No global state library is needed.

### Media Behavior

- Placeholder media is decorative but has meaningful project labeling nearby.
- Images require intrinsic dimensions, descriptive alternative text, lazy loading below the fold, and modern formats when supplied.
- Videos never autoplay; controls remain native and keyboard accessible.
- Missing or invalid optional media falls back to the styled placeholder.

### External Links

- Store links open in a new tab with `rel="noopener noreferrer"`.
- Buttons include visible platform names and accessible labels.
- Invalid or absent URLs are not rendered as controls.

## Accessibility

- Semantic landmarks and logical heading order.
- Skip-to-content link.
- Full keyboard operation.
- Strong visible focus states.
- Minimum practical touch target size.
- WCAG 2.2 AA color contrast.
- No information communicated by color alone.
- Reduced-motion media query and reveal fallback.
- Descriptive link text and alternative text.
- Mobile navigation manages expanded state and returns focus predictably.

## Performance

- Keep hero primarily text-based to protect Largest Contentful Paint.
- Self-host fonts and use only necessary weights.
- Reserve media dimensions to avoid Cumulative Layout Shift.
- Lazy-load below-fold media.
- Avoid animation libraries and large icon packages where native SVG/CSS is sufficient.
- Use Vite hashed production assets with long-lived immutable caching.
- Keep `index.html` on a short/no-cache policy so new deployments update promptly.

## SEO and Sharing

- Unique title and concise meta description.
- Add a canonical URL only after the Firebase or custom production domain is known.
- Open Graph and Twitter metadata.
- `Person`/profile structured data containing only public information.
- Semantic project headings and crawlable store links.
- Include a local branded favicon and social-preview image that can be replaced later.

## Firebase Hosting

Add `firebase.json` configured to:

- Publish `dist`.
- Ignore development files.
- Rewrite non-file routes to `index.html` for safe SPA behavior.
- Apply immutable caching to hashed assets.
- Avoid long caching for `index.html`.

Do not create or guess a Firebase project ID. Deployment remains a later user action.

## Error Handling and Resilience

- The static page has no network-dependent rendering and remains usable offline after initial asset load where browser cache permits.
- Missing media uses deterministic placeholders.
- Native video fallback text links to the supplied media source.
- Navigation remains functional if JavaScript-powered reveal behavior fails; content is visible by default and enhancement is progressive.
- External store failures do not break the page.

## Verification Strategy

Per workspace instructions, do not add unit or integration test code.

Verification will use:

- TypeScript compilation through the production build.
- ESLint.
- Vite production build.
- Manual browser checks at phone, tablet, laptop, and wide-desktop sizes.
- Keyboard-only navigation and visible-focus review.
- Reduced-motion review.
- External-link verification.
- Console-error review.
- Accessibility and performance inspection using available browser tooling.

No Flutter, Dart, or .NET commands will be run.

## Out of Scope

- Backend or database.
- Contact form processing.
- Authentication.
- CMS.
- Blog.
- Analytics.
- Firebase deployment or project creation.
- Updated downloadable CV.
- GitHub/LinkedIn integration.
- Real project media until supplied by Rawezh.
