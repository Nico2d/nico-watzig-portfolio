# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

-   `npm run dev` — start Next.js dev server at http://localhost:3000
-   `npm run build` — production build (executes Notion fetches at build time)
-   `npm run start` — serve the production build
-   `npm run format` — Prettier across the repo
-   `npm run lint-staged` — runs via the `pre-commit` hook (configured in `package.json`)

There is no test runner configured. There is no separate lint script — Prettier is the only formatter; type-checking happens implicitly through `next build`.

## Required environment variables

Create `.env.local` with:

-   `NOTION_TOKEN` — `token_v2` cookie value from a logged-in notion.so session (used as the auth cookie against Notion's private `api/v3` endpoints, not the public Notion API)
-   `BLOG_INDEX_ID` — id of the Notion page that contains the projects collection (32-char or 36-char form; `server-constants.js` normalizes it)
-   `RESEND_API_KEY` — used by `src/pages/api/send.ts` for the contact form

The README mentions `NOTION_API_KEY` / `NOTION_DATABASE_ID`, but the actual code reads `NOTION_TOKEN` / `BLOG_INDEX_ID` — the README is stale on this point.

## Architecture

### Routing model — Pages Router, not App Router

Despite the directory name suggesting "app routing," this project uses the **Next.js Pages Router** (`src/pages/`). `src/app/` only contains non-routing helpers (`fonts.ts`, `robots.ts`, `sitemap.ts`) that Next picks up as metadata files; do **not** add page components there. Real pages, `_app.tsx`, `_document.tsx`, and `pages/api/*` all live under `src/pages/`.

Path alias `@/*` → `src/*`, `@images/*` → `public/images/*` (see `tsconfig.json`).

### Notion as CMS — private API, not the official one

Project content is sourced from Notion via Notion's **private** `https://www.notion.so/api/v3` endpoints, authenticated with the `token_v2` cookie. The flow:

1. `src/lib/notion/rpc.ts` — thin wrapper that POSTs to `${API_ENDPOINT}/${fnName}` with the cookie header.
2. `getBlogIndex.ts` calls `loadPageChunk` for `BLOG_INDEX_ID`, locates a `collection_view_page`/`collection_view` block, then delegates to `getTableData` to resolve rows.
3. `getProjects.ts` filters by `postIsPublished` (see `src/lib/blog-helpers.ts`).
4. `getPageData.ts` fetches the block tree for an individual project page, returned as `post.content`.
5. `useNotionRender` (`src/hooks/useNotionRender.tsx`) walks that block tree and dispatches each block to a renderer in `src/lib/notion/renderers/*` (`NotionText`, `NotionImage`, `NotionCode`, `NotionList`, `NotionCallout`, etc.). Lists are aggregated via the `LIST_TYPES` set so consecutive list items render as a single `<ul>`/`<ol>`.

Project detail pages (`src/pages/projects/[slug].tsx`) use `getStaticProps` + `getStaticPaths` with `revalidate` (ISR). Unpublished posts redirect to `/projects`. Because of the private-API approach, breaking changes to Notion's internal block schema can break renderers — when a renderer misbehaves, inspect the raw block JSON before assuming the renderer logic is wrong.

### Landing page — parallax hero state

The home page (`src/pages/index.tsx`) wraps `HomeTemplate` in `ParallaxHeroProvider` (`src/stores/parallaxHero/`). The parallax hero uses a custom React context store (`ParallaxHeroContext` + `useParallaxHero`) plus the `useCountDistance` and `useParallaxFocus` hooks to coordinate scroll-driven layer transforms in `src/components/sections/landing/ParallaxHero/`. When changing scroll/parallax behavior, treat the provider as the single source of truth — individual layers should read state via `useParallaxHero`, not duplicate scroll listeners.

### Theming

`src/context/themeContext.tsx` wraps the app in `_app.tsx` (alongside `next-themes`). Tailwind is the styling system; Notion-rendered content has additional CSS in `src/styles/notion.css`.

### Contact form

`src/pages/contact.tsx` + `src/components/forms/ContactForm.tsx` use `react-hook-form` and POST to `/api/send`, which uses Resend with the `EmailTemplate` React component. Note `from`/`to` in `src/pages/api/send.ts` are still the Resend onboarding sandbox addresses — switch them before relying on the form for real delivery.

## Conventions worth knowing

-   TypeScript runs with `strict: false` but `strictNullChecks: true`. Don't assume full strictness.
-   Prettier config uses tabs (visible across the existing source). Don't reformat to spaces.
-   `src/lib/notion/server-constants.js` is intentionally CommonJS so it can be `require`d from build scripts without transpiling.
-   The `sharp` dependency exists for Next.js image optimization at build time on Vercel — don't replace it with a different image lib without checking the deploy target.
