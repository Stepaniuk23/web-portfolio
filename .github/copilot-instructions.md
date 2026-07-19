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
