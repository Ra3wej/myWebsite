# Background Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the sparse background crosshair with a professional, low-contrast architectural grid.

**Architecture:** Keep the existing `body::before` fixed decorative layer. Exchange its center-line gradients for repeated horizontal and vertical grid gradients, leaving the main radial atmosphere untouched.

**Tech Stack:** React, TypeScript, CSS, Vite.

## Global Constraints

- Change only `src/styles/global.css`.
- Use CSS gradients only; add no dependencies or bitmap assets.
- Do not add test code or run browser tests.

---

### Task 1: Refine the decorative background layer

**Files:**
- Modify: `src/styles/global.css:35-43`

**Interfaces:**
- Consumes: The existing fixed `body::before` pseudo-element.
- Produces: A static, non-interactive low-contrast grid behind the page content.

- [x] **Step 1: Replace the crosshair gradients**

```css
background:
  linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
background-size: 10rem 10rem;
```

- [x] **Step 2: Preserve the decorative-layer behavior**

Keep `position: fixed`, `inset: 0`, `z-index: -1`, `content: ''`, and `pointer-events: none` unchanged.

- [x] **Step 3: Inspect the changed CSS**

Run: `git diff -- src/styles/global.css`

Expected: Only the `body::before` background declaration gains repeated grid gradients and grid sizing.
