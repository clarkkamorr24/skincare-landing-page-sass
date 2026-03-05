# D1 Skincare

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Architecture & Conventions](#architecture--conventions)
- [Features](#features)
- [Tech Stack](#tech-stack)

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### Installation

```bash
git clone <repository-url>
cd skincare-landing-page-sass
npm install
```

### Running the Dev Server

```bash
npm run dev
```

This will:

1. Create the `dist/` directory structure
2. Copy HTML, assets, and JS into `dist/`
3. Start the Sass watcher (compiles on every save)
4. Launch BrowserSync at `http://localhost:3000` with live reload

### Production Build

```bash
npm run build
```

Compiles SCSS (compressed, no source maps) and copies all assets into `dist/`.

---

## Available Scripts

| Script           | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `npm run dev`    | Start development server with live reload + Sass watch  |
| `npm run build`  | Production build to `dist/`                             |
| `npm run scss`   | Watch SCSS files and compile on change                  |
| `npm run serve`  | Start BrowserSync dev server from `dist/`               |
| `npm run copy`   | Copy HTML, JS, and assets to `dist/`                    |
| `npm run clean`  | Remove the `dist/` directory                            |

---

## Project Structure

```
skincare-sass/
├── src/
│   ├── index.html              # Main HTML page
│   ├── js/
│   │   └── app.js              # Application JavaScript
│   ├── scss/
│   │   ├── main.scss           # Entry point — imports all partials
│   │   ├── abstracts/          # Design tokens & utilities (no CSS output)
│   │   │   ├── _variables.scss # Colors, fonts, spacing, breakpoints, z-index
│   │   │   ├── _mixins.scss    # Reusable style patterns (responsive, layout, typography)
│   │   │   └── _functions.scss # Helper functions (rem, em, spacing, z)
│   │   ├── base/               # Global base styles
│   │   │   ├── _reset.scss     # CSS reset / normalize
│   │   │   └── _typography.scss# Base typographic rules
│   │   ├── layout/             # Structural layout styles
│   │   │   ├── _grid.scss      # Grid system utilities
│   │   │   └── _sections.scss  # Shared section layout patterns
│   │   ├── components/         # BEM component partials (one file per component)
│   │   │   ├── _header.scss
│   │   │   ├── _hero.scss
│   │   │   ├── _announcement-bar.scss
│   │   │   ├── _buttons.scss
│   │   │   ├── _cta-banner.scss
│   │   │   ├── _routine.scss
│   │   │   ├── _trust-badges.scss
│   │   │   ├── _how-it-works.scss
│   │   │   ├── _results.scss
│   │   │   ├── _promo-banner.scss
│   │   │   ├── _benefits.scss
│   │   │   ├── _get-the-set.scss
│   │   │   ├── _ingredients.scss
│   │   │   ├── _formulas.scss
│   │   │   ├── _testimonials.scss
│   │   │   ├── _newsletter.scss
│   │   │   └── _footer.scss
│   │   └── pages/              # Page-specific overrides
│   │       └── _home.scss
│   └── assets/
│       └── images/             # Product photos, icons, banners
├── dist/                       # Compiled output (git-ignored)
├── package.json
├── .gitignore
└── README.md
```

---

## Architecture & Conventions

### SCSS Organization (7-1 Pattern)

The stylesheet architecture follows a simplified **7-1 pattern**, where partial files are organized by responsibility and imported through a single entry point (`main.scss`):

| Layer          | Purpose                                  | Outputs CSS? |
| -------------- | ---------------------------------------- | ------------ |
| **abstracts/** | Variables, mixins, functions             | No           |
| **base/**      | Reset, typography, global defaults       | Yes          |
| **layout/**    | Grid system, section containers          | Yes          |
| **components/**| Self-contained UI blocks                 | Yes          |
| **pages/**     | Page-specific style overrides            | Yes          |

### BEM Naming Convention

All class names follow the **Block Element Modifier (BEM)** methodology:

```
.block                    → .site-header
.block__element           → .site-header__logo
.block--modifier          → .site-header--scrolled
```

Each component lives in its own partial file (e.g., `_header.scss` contains all `.site-header` rules), keeping styles modular and easy to locate.

### Design Tokens

All design values are centralized in `_variables.scss`:

- **Colors**: Semantic naming (`$color-primary`, `$color-bg-dark`, `$color-secondary`)
- **Typography**: Font families, weights, and a modular size scale (`$font-size-xs` through `$font-size-7xl`)
- **Spacing**: An 8px base unit with a consistent scale (`$spacing-xs` through `$spacing-4xl`)
- **Breakpoints**: Mobile-first breakpoints (`$breakpoint-sm` through `$breakpoint-2xl`)
- **Z-index**: Named layers to prevent stacking conflicts (`$z-index-sticky`, `$z-index-modal`, etc.)

### Reusable Mixins

`_mixins.scss` provides common patterns to reduce repetition:

- `respond-to('md')` / `respond-below('lg')` — media query shortcuts
- `heading-style()` / `body-text()` — typographic presets
- `container` / `section-padding` — layout containers
- `flex-center` / `flex-between` — flexbox shortcuts
- `button-base` — shared button foundation
- `overlay()` / `image-cover` — visual utilities

### Helper Functions

`_functions.scss` provides unit conversion and token lookup:

- `rem($px)` / `em($px)` — px to rem/em conversion
- `spacing($multiplier)` — spacing scale calculator
- `z('layer')` — z-index map lookup with warning for unknown layers

### JavaScript (Object-Literal Module Pattern)

`app.js` organizes functionality into discrete **object-literal modules**, each with a single `init()` method called on `document.ready`:

| Module                | Responsibility                                          |
| --------------------- | ------------------------------------------------------- |
| `TestimonialCarousel` | Flickity carousel for video testimonial cards           |
| `MobileNav`           | Hamburger toggle, outside-click dismiss, Escape key     |
| `StickyHeader`        | Adds scrolled class on scroll past threshold            |
| `AnnouncementBar`     | Dismiss/close the top promo banner                      |
| `Marquee`             | Pause trust-badge marquee animation on hover            |
| `SmoothScroll`        | Animated scroll for anchor links                        |

---

## Features

### Implemented Sections

- **Announcement Bar** — Dismissible top banner with free shipping message
- **Sticky Header** — Logo, hamburger menu, CTA button, and cart icon with item count; adds shadow on scroll
- **Mobile Navigation** — Slide-open nav with outside-click and Escape key to close
- **Hero Section** — Full-width hero with headline, CTA, star rating, and testimonial quote
- **CTA Banner** — Highlighted pill-style message bar
- **Simple Routine** — Two-column layout with product image, description, and feature checklist
- **Trust Badges** — Three-column grid showcasing product benefits with images
- **How It Works** — Three-step visual guide with step numbers, product images, and instructions
- **Results Section** — Text-focused section with guarantee messaging
- **Quote Banner** — Full-width image with overlay and pull quote
- **Trust Marquee** — Infinite scrolling ticker with trust signals; pauses on hover
- **Daily Benefits** — Three-card grid with images, titles, and descriptions
- **Get The Set** (x2) — Two-column product set CTA with perks checklist and add-to-cart button
- **Ingredients** — Six-item grid showcasing key ingredients with source labels
- **Three Perfect Formulas** — Alternating content/image rows for each product
- **Text Testimonials** — Three-card testimonial grid with star ratings and reviewer info
- **Video Testimonials** — Four-card carousel-ready grid with play buttons, mute toggle, product info, and add-to-cart
- **Newsletter** — Email signup form with social media links
- **Footer** — Multi-column link layout with copyright and legal disclaimer

### Responsive Design

- Mobile-first approach using `respond-to()` mixin
- Foundation XY Grid for flexible layouts
- Breakpoints: 640px / 768px / 1024px / 1200px / 1440px

### Accessibility

- Semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`)
- ARIA labels on interactive elements (menu toggle, cart, play buttons)
- `aria-expanded` state management on mobile nav
- Keyboard support (Escape to close mobile nav)
- Focus-visible outlines on buttons

---

## Tech Stack

| Tool              | Purpose                                |
| ----------------- | -------------------------------------- |
| **Sass**          | CSS preprocessing and architecture     |
| **Foundation**    | Responsive grid and utility classes    |
| **Flickity**      | Touch-friendly carousels               |
| **jQuery**        | DOM manipulation and event handling    |
| **BrowserSync**   | Live reload development server         |
| **cpx2**          | File copying for build pipeline        |
| **concurrently**  | Parallel npm script execution          |
