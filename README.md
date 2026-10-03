<div align="center">

<img src="src/assets/Barsh%20Dashboard%20Template.png" alt="Brash Dashboard Template — admin dashboard built with Vite and TanStack" width="100%" />

<h1>Brash Dashboard Template</h1>

<p><strong>A modern, responsive admin dashboard template built with React, Vite, TanStack Router and Tailwind CSS v4.</strong><br/>
Light &amp; dark mode, full RTL support, English/Persian localization, and 15+ reusable components — ready to build on.</p>

<p>
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="TanStack Router" src="https://img.shields.io/badge/TanStack-Router-FF4154?style=flat-square" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux&logoColor=white" />
</p>

</div>

---

## Why this template

Most dashboard starters hand you a pile of pages and leave the hard parts — theming, direction, state, routing — for you to wire up. Brash ships those decisions already made, in a structure that stays readable as the app grows:

- **Feature-first structure** — every screen lives in `src/features/<name>`, routes stay thin
- **Type-safe file-based routing** with automatic code splitting via TanStack Router
- **Theme, direction and language persist** across reloads and are applied before first paint
- **Compound components** (Card, Tabs, Accordion) instead of prop-explosion APIs
- **No UI framework lock-in** — Tailwind v4 tokens, Headless UI, and plain React

## Features

### Core

| | |
| --- | --- |
| 🎨 **Light / dark / system theme** | Persisted in `localStorage`, applied at startup to avoid flashes |
| 🌈 **Custom primary color** | Driven by the `--color-primary` CSS variable at runtime |
| 🌍 **RTL &amp; LTR** | Document direction toggling with `ltr:` / `rtl:` Tailwind variants throughout |
| 🗣 **i18n (EN / FA)** | `i18next` + `react-i18next` with the bundled Shabnam font for Persian |
| 📱 **Responsive shell** | Collapsible vertical sidebar, sticky header, command-style search trigger |
| ⚡ **Fast by default** | Vite 8, automatic route code splitting, `defaultPreload: 'intent'` |

### Screens included

- **Dashboard** — revenue area chart, monthly goal radial, sales by category, task distribution, weekly activity, KPI cards
- **Apps** — Chat, To-Do List, Task Management board
- **Data** — sortable/filterable tables, pagination, charts gallery, icon browser
- **Components** — cards, tabs, accordions, modals, notifications
- **Elements** — buttons, loaders, popovers, tooltips, pagination
- **Forms** — inputs, selects, checkbox &amp; radio, date picker
- **Auth pages** — login, register, forgot password, reset password, email verification (each in *basic* and *cover* layouts), plus a lock screen

## Tech Stack

| Area | Choice |
| --- | --- |
| Framework | React 18 + TypeScript (strict) |
| Build | Vite 8 |
| Routing | TanStack Router (file-based, auto code-splitting) |
| Styling | Tailwind CSS v4 + `@tailwindcss/typography` |
| State | Redux Toolkit + React Redux |
| Forms | TanStack Form with Zod / Valibot validation |
| Charts | Recharts |
| Tables | TanStack Table |
| Drag &amp; drop | `@dnd-kit` |
| UI primitives | Headless UI, Floating UI, Tippy, React Select, React DayPicker |
| Feedback | Sonner toasts, React Spinners |
| Icons | Lucide React |
| Tooling | ESLint 10, Prettier, Vitest |

## Getting Started

**Requirements:** Node.js 20+ and npm 9+ (developed on Node 22).

```bash
git clone git@github.com:hamedfazile21/dashboard-template.git
cd dashboard-template
npm install
npm run dev
```

Open **http://localhost:3000**.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run generate-routes` | Regenerate `routeTree.gen.ts` from `src/routes` |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier and apply ESLint fixes |
| `npm run check` | Verify formatting without writing |
| `npm run test` | Run Vitest |

## Project Structure

```text
src/
├── app/                  # i18n, Redux store, providers, startup sequence
├── assets/               # Fonts, logos, flags, illustrations, avatars, media
├── components/           # Shared UI primitives
│   ├── accordion/        # Compound accordion (provider + item/trigger/content)
│   ├── card/             # Compound card (header, media, title, action, footer…)
│   ├── tab/              # Compound tabs (list, trigger, content)
│   ├── layout/           # Sidebar, header, search trigger, settings panel
│   └── *.tsx             # input, select, checkbox, radio, textarea, dialog,
│                         # popover, tooltip, date-picker, pagination, toast…
├── features/             # One folder per screen/feature
│   ├── dashboard/        # Dashboard widgets and charts
│   ├── chat/ to-do-list/ task-management/
│   ├── tabels/ charts/ icons/
│   ├── components/ element/ form/
│   ├── login/ register/ reset/ forgot-password/ email-verification/ lock-screen/
│   └── theme/            # Theme slice, types, and startup initializers
├── helper/               # Toast and loader helpers
├── hooks/                # Typed Redux hooks, dialog state
├── locales/              # en/common.json, fa/common.json
├── routes/               # File-based routes (_layout = app shell, _page = auth)
├── styles/               # globals.css, theme.css, scrollbar.css
├── App.tsx               # Splash screen → startup → RouterProvider
└── main.tsx              # Redux Provider + root render
```

Both `#/*` and `@/*` are configured as path aliases for `./src/*`.

## Routing

Routes are file-based under `src/routes` and split into two pathless layout groups, so folder names like `_form` never show up in the URL:

**`_layout/`** — the app shell (sidebar + header):

| Group | Paths |
| --- | --- |
| Main | `/` |
| Projects | `/to-do-list`, `/chat`, `/task-management` |
| Components | `/cards`, `/tabs`, `/accordions`, `/modals`, `/notifications` |
| Elements | `/buttons`, `/loaders`, `/popovers`, `/tooltips`, `/pagination` |
| Forms | `/inputs`, `/select`, `/checkbox-and-radio`, `/date-picker` |
| Data | `/tables`, `/charts`, `/icons` |

**`_page/`** — standalone full-screen pages: `/login-basic`, `/login-cover`, `/register-basic`, `/register-cover`, `/forgotPassword-basic`, `/forgotPassword-cover`, `/reset-basic`, `/reset-cover`, `/emailVerification-basic`, `/emailVerification-cover`, `/lock-screen`.

`routeTree.gen.ts` is generated automatically by the Vite plugin during `dev` and `build`. If it ever drifts, run:

```bash
npm run generate-routes
```

## Theming

Theme state lives in the Redux `theme` slice (`src/features/theme/slice`) and is restored on boot by `src/app/startup.ts`, which runs before the first render behind the splash screen:

```ts
initializeTheme()              // light | dark | system  → toggles .dark on <html>
initializeThemePrimaryColor()  // sets the --color-primary CSS variable
initializeSystemDir()          // sets document.dir to ltr | rtl
initializeSystemLanguage()     // switches i18next to en | fa
```

Design tokens live in `src/styles/theme.css`; global utilities, font faces and scrollbar styling in `globals.css` and `scrollbar.css`. Because direction is a document-level attribute, build layouts with Tailwind's `ltr:` / `rtl:` variants rather than hard-coded `left` / `right`.

## Localization

Translations are registered in `src/app/i18n.ts` under the `common` namespace:

```text
src/locales/en/common.json
src/locales/fa/common.json
```

The catalogs ship as starters — add your keys to **both** files, then consume them:

```tsx
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()
return <h1>{t('name')}</h1>
```

Switching to Persian also flips the document direction and loads the bundled Shabnam font.

## Adding a Feature

1. Create `src/features/<feature-name>/` with the page component and any feature-local parts.
2. Add a route file under `src/routes/_layout/` (app shell) or `src/routes/_page/` (standalone) using `createFileRoute`.
3. Register the entry in `src/components/layout/data/sidebar-data.ts` so it appears in the sidebar.
4. Reuse primitives from `src/components` before adding new ones.
5. Run `npm run lint`, `npm run check`, and `npm run build` before shipping.

## Production Build

```bash
npm run build
npm run preview
```

The optimized output is written to `dist/` and can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, Nginx, S3…).

## Roadmap

- [ ] Expand the English and Persian translation catalogs to cover every screen
- [ ] Wire the settings panel to the theme slice (mode, primary color, direction, sidebar state)
- [ ] Add component tests with Vitest and Testing Library
- [ ] Publish a live demo

## Contributing

Issues and pull requests are welcome. Please run `npm run format` and `npm run build` before opening a PR.

## License

No license has been specified for this repository yet. Add a license file before publishing or distributing the template.

<div align="center">

**Built by [Hamed Fazeli](https://github.com/hamedfazile21)**

</div>
