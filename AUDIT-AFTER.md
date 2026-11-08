# Audit after refinement

Branch `design/premium-refinement`. Before state: `AUDIT-BEFORE.md`. Screenshots: `docs/screens/after/` (FR and AR at 320, 375, 768, 1024 and 1440; first view and full page). Run `node scripts/screens.mjs after` with the preview server running to reproduce them.

## What changed
- **Owner photos added.** A gallery of real pieces ("Les bracelets cordon" / "أساور بالخيط") now sits directly after the hero: one large feature and four single pieces, with motif captions. A worn shot sits beside the Commander button. Six of the nine new photos are used; see `IMAGE-AUDIT.md`.
- **No letterboxing.** All images use frames that match their shape: 1:1 for the illustrations, 4:5 for the photos.
- **Six original placements preserved** on both locales. The illustrations carry an "illustration" caption next to the real photos.
- **Image pipeline.** `src/data/images.ts` is now the single manifest. `scripts/generate-assets.mjs` builds the AVIF, WebP and JPG derivatives from it (there was no generator before). A new `Picture.astro` replaces six duplicated `<picture>` blocks.
- **Header.** One 64px row on mobile with a visible menu icon that animates to a cross. The menu closes after choosing a section and on Escape.
- **Eyebrow labels removed.** The duplicated brand line in the hero is gone.
- **Arabic page.** The brand name now uses Italiana instead of the Times fallback. Arabic headings have no negative tracking and line height 1.35.
- **Tablet layout.** Sur mesure and Commander stay two-column down to 700px. The stacked hero image is capped at 560px.
- **Sticky order bar** appears only after the hero buttons scroll away, and hides over Commander.
- **Footer** links to the four legal pages that exist (it pointed at a 404 before).
- **`/cookies/`** no longer claims a dark theme.
- **Instagram handle** is `@haddar_bijoux` everywhere, per the owner's answer. See `OWNER-DECISIONS.md` item 1.
- **Performance.** `content-visibility: auto` on below-fold sections. `/ar/` no longer preloads Amiri (108 KB) and preloads Italiana (11 KB) instead.
- **Removed:** the unused `JewelDrawing.astro` (banned SVG jewelry drawing). Added `scripts/screens.mjs`. `check-image-contract.mjs` now also verifies the six photos on both locales.

## Measurements (Lighthouse 12.6.1, local preview, one run each)

| Page | Profile | P/A/BP/SEO before to after | LCP before to after | CLS | TBT | Transfer before to after |
|---|---|---|---:|---:|---:|---:|
| `/` | mobile | 100/100/100/100 to 100/100/100/100 | 1661 to 1663 ms | 0 | 0 | 165 to 160 KB |
| `/ar/` | mobile | 99/100/100/100 to 98/100/100/100 | 2262 to 2274 ms | 0 | 0 | 262 to 260 KB |
| `/` | desktop | 100 all to 100 all | 370 to 378 ms | 0.00002 | 0 | 165 to 218 KB |
| `/ar/` | desktop | 100 all to 100 all | 512 to 547 ms | 0.0004 | 0 | 262 to 319 KB |

The four legal pages score 100 in every category on both profiles (LCP about 1.2 s mobile). The 404 pages return HTTP 404, so Lighthouse does not score them. `scripts/perf-report.mjs` reports: "All scored routes meet requested lab targets" (score ≥95, LCP ≤2500 ms, CLS ≤0.02, TBT ≤100 ms).

The page now holds six more photographs at about the same transfer weight on mobile, because the photos load lazily and in small sizes.

Before the `content-visibility` change, `/ar/` mobile LCP measured **2579 ms**, which failed the target. That is why the change was made. JS is 451 B gzip (Header menu plus order-bar script). CSS is 5.1 KB gzip.

INP is **not measured**. There is no field data, and TBT is not INP.

## Verification

| Check | Result |
|---|---|
| Production build (`node scripts/build.mjs`) plus prerender checks on 8 routes | VERIFIED |
| `astro check` | VERIFIED: 0 errors (baseline had 2) |
| Image contract: 6 illustrations and 6 photos on both locales, originals' SHA-256 unchanged | VERIFIED |
| Browser suite (`audit-browser.mjs`): 208 viewport overflow checks, 16 axe WCAG 2.2 AA scans (0 violations), keyboard pass, no-JS rendering, Slow/Fast 3G, hero CTA in first view at 375x667 and 1440x900, sticky bar hidden over Commander, localized 404 status | VERIFIED, 0 errors |
| Keyboard review (skip link, menu by Tab/Enter, Escape closes) | VERIFIED |
| Privacy: no third-party requests, cookies, storage or service workers on 8 routes | VERIFIED |
| Palette tokens and contrast | VERIFIED |
| Build guards (production blocked by `[CONFIRMER]`, alt text and rights checks) | VERIFIED |
| Routing middleware tests | VERIFIED |
| Visual review at 320, 375, 768, 1024 and 1440, FR and AR; menu open, sticky bar, legal page | VERIFIED by screenshot inspection |
| Real devices, real screen reader, 200% browser zoom by hand | NOT TESTED |
| Reference sites on desktop: Cartier, Pandora, Swarovski | NOT TESTED (HTTP 403) |
| Production deployment, CDN, TLS | NOT TESTED |

## Security
- CSP stays strict (`script-src 'self'` plus generated hashes, `style-src 'self'`). The new inline scripts are hashed automatically by `postbuild.mjs`.
- No secrets in the repo, no forms, no `target="_blank"`. JSON-LD escapes `<`.
- **`pnpm audit`: PARTIAL.** Production dependencies: 8 advisories (4 high, 4 moderate), all in `undici` <8.12.2, pulled in by `astro`. `undici` runs only at build time. The site is static HTML, so visitors never load it. Dev dependencies add advisories in `@lhci/cli` (tmp, extract-zip, basic-ftp, zod, body-parser, qs, uuid) and `@astrojs/check` (fast-uri). Not fixed here: a fix needs a dependency update and a new lockfile. Next step: update `astro` to a release that depends on `undici` ≥8.12.2 (or add a pnpm override), then rerun the build and the checks.

## Impeccable detector
- Cream background: the owner-locked palette. Kept.
- "Cramped padding" on sections: a false positive. `content-visibility` skips layout in the detector's headless render; the sections have 72 to 136px padding.
- 8.5px wordmark subline: fixed, now 11px.

## Unresolved
- `/ar/` mobile LCP is 2274 ms, close to the 2500 ms limit. Remaining cost: Amiri (110 KB) loads for the first Arabic heading, which sits just below the hero. Subsetting Amiri to the glyphs actually used would remove most of it.
- Derja captions, gallery copy and alt text need a native speaker's review (`derjaReviewed: false`).
- Owner items: `OWNER-DECISIONS.md`.
