# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build (also validates TypeScript)
npm run lint      # ESLint
```

No test framework is configured.

## Architecture

Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4. Instagram media downloader service at instadownload.me with utility tools.

### i18n System (Custom, No Library)

Two locales: `ko` (Korean), `en` (English). Default: `en`.

- `src/i18n/config.ts` — locale constants and `isValidLocale()` guard
- `src/i18n/dictionaries/{ko,en}.json` — all UI strings, SEO metadata, tool content
- `src/i18n/get-dictionary.ts` — dynamic import loader for server components
- `src/i18n/use-dictionary.tsx` — `DictionaryProvider` context + `useDictionary()` / `useLocale()` hooks for client components
- `src/middleware.ts` — redirects `/` to `/ko` or `/en` based on `Accept-Language`

**Pattern**: Server layout (`[lang]/layout.tsx`) loads dictionary via `getDictionary()`, wraps children in `DictionaryProvider`. All client components use `useDictionary()` hook — never import dictionaries directly.

### Route Structure

```
/[lang]                    — Main downloader page
/[lang]/privacy            — Privacy policy
/[lang]/terms              — Terms of service
/[lang]/tools              — Tools index (card grid)
/[lang]/tools/line-break   — Instagram line break generator
/[lang]/tools/blank-space  — Blank space character copier
/[lang]/tools/fonts        — Unicode font converter
/[lang]/tools/character-counter — Caption/bio limit checker
/[lang]/tools/image-resizer     — Canvas API image resizer
/[lang]/tools/reels-thumbnail   — Reels cover image extractor
/api/extract               — POST: Extract Instagram media from URL
/api/download              — GET: Download media file via CDN proxy
/api/proxy                 — GET: Proxy CDN images (CORS bypass, 24h cache)
```

All pages under `[lang]/` use `generateStaticParams()` for SSG. Invalid locales trigger `notFound()`.

### Media Extraction Flow

1. Frontend POSTs Instagram URL to `/api/extract`
2. `lib/url-parser.ts` validates and extracts shortcode
3. `lib/instagram.ts` orchestrates GraphQL API call using env credentials
4. `lib/instagram-graphql.ts` communicates with Instagram, transforms response to `ExtractedPost`
5. Frontend renders media cards with download buttons
6. Downloads go through `/api/download` which validates CDN host whitelist

### Key Conventions

- All page components are `"use client"` — use hooks for dictionary/locale access
- `[lang]/layout.tsx` handles: `<html lang>`, font selection (Noto Sans KR vs Inter), metadata generation, JSON-LD structured data, `DictionaryProvider`
- Tool pages follow consistent pattern: Header → gradient hero with back-link → tool UI → how-to section → Footer
- Proxy routes validate against allowed CDN hosts in `lib/constants.ts`
- TypeScript path alias: `@/*` maps to `src/*`

### Environment Variables

```
INSTAGRAM_DOC_ID   — GraphQL document ID
INSTAGRAM_LSD      — LSD token
INSTAGRAM_APP_ID   — App ID
```

### Styling

Purple/pink gradient accent colors. Fonts: Noto Sans KR (Korean pages), Inter (English pages), selected per-locale in `[lang]/layout.tsx`. Mobile-first responsive with `sm`/`md`/`lg` breakpoints.
