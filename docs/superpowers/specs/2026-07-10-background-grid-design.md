# Background Grid Design

## Goal

Make the portfolio background feel more deliberate and professional without competing with its content.

## Chosen approach

Replace the existing central crosshair with a fixed, very low-contrast architectural grid. Retain the current warm upper-right and cool lower-left radial lighting so the portfolio keeps its established atmosphere.

## Implementation

The change is limited to `src/styles/global.css`. The `body::before` pseudo-element will render wide horizontal and vertical grid intervals using semi-transparent linear gradients. The layer stays behind all content, cannot receive input, and uses opacity values low enough to preserve text and surface contrast.

## Constraints

- CSS-only; no asset or dependency additions.
- No browser testing and no test code.
- Respect reduced-motion behavior; the texture is static.
