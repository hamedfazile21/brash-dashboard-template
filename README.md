# Brash Dashboard Template

A modern, responsive React dashboard starter with reusable components, ready-made screens, theme support, and English/Persian localization. Use it as a foundation for admin panels, internal tools, SaaS products, and data-heavy applications.

## Highlights

- Dashboard shell with responsive sidebar, header, navigation, and theme controls
- Reusable UI primitives for buttons, cards, tabs, accordions, dialogs, popovers, tooltips, inputs, pagination, and more
- Example screens for chat, task management, tables, forms, icons, loaders, and pagination
- Authentication-oriented screens for login, registration, email verification, password reset, forgot password, and lock screen flows
- Light and dark themes powered by Tailwind CSS and Redux Toolkit
- English and Persian translations with RTL font support through `i18next`
- Charts and data visualizations with Recharts
- Drag-and-drop interactions with `@dnd-kit`
- Type-safe file-based routing with TanStack Router

## Tech Stack

- React 18 and TypeScript
- Vite
- TanStack Router
- Tailwind CSS v4
- Redux Toolkit and React Redux
- Form and validation utilities from TanStack Form, Zod, and Valibot
- Recharts, Lucide React, React Select, Sonner, and React DayPicker
- Vitest, ESLint, and Prettier

## Requirements

- Node.js 18+
- npm 9+

## Getting Started

Clone the repository, install dependencies, and start the development server:

```bash
git clone <repository-url>
cd brash-dashboard-template
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command                   | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `npm run dev`             | Start the Vite development server on port 3000 |
| `npm run build`           | Create a production build                      |
| `npm run preview`         | Preview the production build locally           |
| `npm run test`            | Run the Vitest test suite                      |
| `npm run lint`            | Check the project with ESLint                  |
| `npm run check`           | Check formatting with Prettier                 |
| `npm run format`          | Format files and apply ESLint fixes            |
| `npm run generate-routes` | Regenerate the TanStack Router route tree      |

## Project Structure

```text
src/
├── app/             # App startup, i18n, providers, and Redux store
├── components/      # Shared UI components and layout primitives
├── features/        # Feature-specific screens and components
├── hooks/           # Reusable React hooks
├── locales/         # English and Persian translation resources
├── routes/          # TanStack Router file-based routes
└── styles/          # Global styles, theme tokens, and scrollbar styles
```

The main dashboard is rendered from `src/features/dashboard`. Shared layout components live in `src/components/layout`, while reusable feature examples are grouped under `src/features`.

## Routes and Examples

The route tree includes the dashboard home and examples such as:

- `/` - Dashboard home
- `/chat` - Chat interface
- `/task-management` - Task management board
- `/to-do-list` - To-do list
- `/tables` - Data table examples
- `/form/inputs` - Input controls
- `/form/select` - Select controls
- `/form/date-picker` - Date picker
- `/element/buttons` - Button variants
- `/element/loaders` - Loading states
- `/element/popovers` - Popover examples
- `/element/tooltips` - Tooltip examples
- `/login/*`, `/register/*`, `/forgot-password/*`, `/reset/*` - Authentication examples

Route files are located in `src/routes`. After adding or moving a route, run `npm run generate-routes` when the generated route tree is not updated automatically.

## Theming and Localization

Theme state is managed in the Redux store and theme tokens are defined in `src/styles/theme.css`. Global Tailwind utilities and font setup are defined in `src/styles/globals.css`.

Translations are configured in `src/app/i18n.ts` and stored in:

```text
src/locales/en/common.json
src/locales/fa/common.json
```

To add a translation, update both resource files and use the `useTranslation` hook in a component. Persian support also includes the bundled Shabnam font and RTL styling hooks.

## Adding a Feature

1. Create a feature folder under `src/features`.
2. Add the page component and feature-specific components there.
3. Add a route under `src/routes` using `createFileRoute`.
4. Reuse shared components from `src/components` before introducing new primitives.
5. Run `npm run lint`, `npm run check`, and `npm run build` before shipping.

## Production Build

Build and preview the optimized application with:

```bash
npm run build
npm run preview
```

The generated output is written to `dist/`.

## License

No license has been specified for this repository yet. Add a license file before publishing or distributing the template.
