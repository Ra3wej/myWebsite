# Rawezh Ali Rashid — Portfolio

Modern single-page portfolio built with React, TypeScript, and Vite. It is designed as a static site and includes Firebase Hosting configuration.

## Requirements

- Node.js 22.12+ or Node.js 24 LTS+
- npm

Node.js 21 is end-of-life and cannot run the current Vite build toolchain.

## Local development

```bash
npm install
npm run dev
```

Quality and production commands:

```bash
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`.

## Updating portfolio content

All public resume, skills, experience, and project data lives in:

```text
src/data/portfolio.ts
```

Content contracts live in `src/types/portfolio.ts`. Keep Moonline Travel work details confidential.

## Adding project media later

Every project has a typed `media` field. Replace a placeholder with an image:

```ts
media: {
  type: 'image',
  src: '/media/smart-health-tower.webp',
  alt: 'Smart Health Tower appointment screen',
  width: 1600,
  height: 1000,
}
```

Or add a controlled video:

```ts
media: {
  type: 'video',
  src: '/media/vary-pharmacy-demo.mp4',
  poster: '/media/vary-pharmacy-poster.webp',
  caption: 'A short walkthrough of the Vary Pharmacy mobile experience.',
}
```

Place local files inside `public/media/`. Images should be WebP or AVIF with explicit dimensions. Videos do not autoplay.

## Firebase Hosting

`firebase.json` publishes the Vite `dist` folder, rewrites unknown routes to `index.html`, and applies long-lived caching to hashed assets.

When a Firebase project is ready:

```bash
npm run build
firebase login
firebase use --add
firebase deploy --only hosting
```

No Firebase project ID is stored in this repository. After a production domain is known, add an absolute canonical URL and absolute Open Graph image URL to `index.html`.
