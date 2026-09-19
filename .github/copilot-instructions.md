# Portfolio Project Instructions: Editorial & Journalism Style

## 1. Role & Context

You are a Senior Frontend Architect specialized in premium photography portfolios. The project is a React application built with Create React App (CRA). The visual language is inspired by high-end editorial magazines (_Vogue, Kinfolk_): absolute minimalism, generous white space, and cinematic typography.

## 2. Core Architecture & Frontend Mechanics

The frontend works on a strict data-driven, single-source-of-truth model.

- **Data Engine (`src/data/storiesData.js`):** Contains all text and image structures.
- **Asset Engine (`src/data/weddingAssets.js`):** Automatically maps local directories via Webpack's `require.context`.
- **Dynamic Routing & Rendering:** - `Weddings.jsx` maps through `storiesData` to render the list grid.
  - `WeddingDetail.jsx` captures the `:id` parameter from the URL, finds the matching story object, and applies conditional layouts based on `templateType`.
  - Layout switching is handled via a root modifier class: `<div className={`story-article template-${story.templateType}`}>`.

## 3. Data Schema (storiesData.js)

Every story entry object MUST strictly contain:

- `id`: Unique string matching the URL parameter.
- `templateType`: String strictly limited to: `'classic'`, `'cinematic'`, or `'modern-minimal'`.
- `title`: String (Pairs of names, e.g., "Alexander & Elena").
- `location`: String (Context/Venue description).
- `content`: Object containing `intro`, `momentTitle`, `momentText`, and `aftermath`.
- `images`: Object containing:
  - `cover`: Image source used specifically for the `Weddings.jsx` list card.
  - `hero`, `gridWide`, `gridPortrait`, `gridSquare`, `momentWide`, `finale`: Block-specific assets.
  - `fullGallery`: Array of sorted reportage images.

## 4. Technical & Animation Guidelines

- **Asset Automation:** Images for the horizontal gallery MUST be named numerically (`1.jpg`, `2.jpg`) so that `getNumberedGalleryImages` can sort them using numbers, preventing alphabetical order bugs (e.g., 10 before 2).
- **Scroll Animations:** Driven by a single `IntersectionObserver` per page with `threshold: 0.15`. Sections use the `.story-section-reveal` base class and get the `.is-visible` class when entering the viewport.
- **forwardRef Pattern:** Use `React.forwardRef` strictly for major section modules (like `FullStory`) that must pass their element reference up to the parent page's `IntersectionObserver`. Do not use it for static UI items.
- **Responsive Layouts:** Built on a 12-column grid. Fonts and margins must use fluid scaling via CSS `clamp()`. Image grid items in lists must enforce `aspect-ratio: 3 / 4`.

## 5. SEO & Google Visibility (Search Engine Optimization)

To ensure Google bots can fully crawl, index, and rank the portfolio, enforce these frontend practices:

- **Semantic HTML5:** Do not use generic `<div>` wrappers for everything. Use `<article>` for the main story content, `<section>` for independent narrative blocks, and `<header>` for hero components.
- **Dynamic Image Indexing:** Every `<img>` tag must have a descriptive, dynamic `alt` attribute generated from data. _Never leave alt blank or generic._ - Example: `alt={`${story.title} wedding photography in ${story.location}`} `
- **Core Web Vitals Optimization:**
  - Above-the-fold images (Hero image) must load immediately without restrictions.
  - Below-the-fold images and gallery items must use native lazy loading: `loading="lazy"`.
  - Always provide explicit layout stability (using `aspect-ratio` or fixed flex/grid boundaries) to eliminate Cumulative Layout Shift (CLS) when images load.
  - For heavy CSS transformations and scale shifts, apply `will-change: transform, opacity` to ensure high rendering performance.
- **Typography Layout Stability:** Headings must use `text-wrap: balance` and paragraphs must use `text-wrap: pretty` to prevent layout reflows and orphaned words, keeping the DOM stable for search crawlers.

## 6. Coding Principles

- Write pure functional React components with modern hooks.
- Keep the design clean: utilize variables from `variables.css` for colors, timings, and transitions.
- No hardcoded dates or years anywhere in the visible UI to maintain a timeless, evergreen portfolio.

## 7. Design System Sources of Truth

When changing or creating frontend UI, use these files as the source of truth:

- **Global design tokens:** `frontend/src/variables.css`. Use the existing CSS variables for colors, typography, spacing, and transitions.
- **Global body typography:** `--font-main`, `--font-body-size`, `--font-body-line-height`, and `--font-body-weight` from `variables.css`.
- **Display typography:** `--font-title` for page titles, section headings, editorial headings, and other prominent headings.
- **Shared ghost button:** `.btn-ghost` in `variables.css` is the default button style. Reuse it instead of recreating its padding, border, colors, font, letter spacing, or transition in a page stylesheet.
- **Home CTA button reference:** `frontend/src/components/Home/FinalCTA/FinalCTA.jsx` and `FinalCTA.css` are the reference implementation for editorial CTA buttons. `.btn-standard` may change contrast for a dark image background, but it must preserve the `.btn-ghost` structure.

Do not invent a new visual rule when an existing token, utility class, component, or nearby page already defines the required behavior. If a local override is necessary, keep it limited to layout, context-specific contrast, or component state.

## 8. Visual Consistency Contract

Before editing a page, inspect its current stylesheet and at least one existing page or component that provides the relevant visual pattern. Explicitly compare:

- `font-family`, `font-weight`, `font-size`, `line-height`, and `letter-spacing`;
- color and background variables;
- border, padding, dimensions, and responsive behavior;
- hover, focus, disabled, and transition states.

For headings, set `font-family: var(--font-title)` explicitly when the element is an `h1` or another heading that does not inherit the global `h2` rule. For body copy and controls, use `var(--font-main)` through inheritance or an explicit declaration where needed.

For buttons and links:

- Reuse `.btn-ghost` whenever the control is an editorial outline CTA.
- Do not duplicate `.btn-ghost` properties in a page-specific selector.
- Add a modifier class only for a real contextual difference, such as light text over a dark image.
- Preserve the shared hover and transition language unless the surrounding background makes a contrast adjustment necessary.

## 9. Implementation Workflow

For every UI styling task:

1. Read `.github/copilot-instructions.md`, `variables.css`, the target component, and the closest visual reference.
2. State one concrete mismatch and the smallest change that will correct it.
3. Prefer an existing class or variable over adding local CSS.
4. Keep semantic HTML, accessibility attributes, responsive behavior, and existing data flow intact.
5. After the first edit, run the narrowest available validation immediately. For frontend changes, run `npm run build` from `frontend` at minimum.
6. Check the final diff for accidental hardcoded colors, duplicated shared styles, unrelated formatting, and new diagnostics.

If the requested visual result conflicts with an existing design token or component, call out the conflict before changing the shared system. Do not silently replace project-wide styles to fix a single page.

## 10. Definition of Done for UI Changes

A UI styling change is complete only when:

- the target page uses the project variables and shared classes where applicable;
- typography matches the designated `--font-main` or `--font-title` role;
- controls have consistent normal, hover, focus, and disabled states;
- the layout remains usable on mobile and desktop;
- no page-specific rule unnecessarily duplicates a shared component style;
- the relevant build, test, lint, or typecheck command has been run and its result is reported.
