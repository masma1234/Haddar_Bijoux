# Audit after (round 3: final review, 9 November 2026)

Round 2 results remain below for history. Before/after screenshots for this round: `docs/screens/before/` (round 2 state) and `docs/screens/after/`.

## Changes and why
| Change | Why |
|---|---|
| Hero recropped to 750px inside the pillow; hero capped at 540px | Removes the showroom wall; keeps retina upscaling near 1.4x |
| Every real photo square (écrins tightened to the charm, lid and LED out of frame); all pairs 440px | One plate system; the écrin charms were tiny in frame |
| Owner photos at AVIF q60 (illustrations q52) | Leather grain and gold edges smoothed visibly at q52 on 2x screens |
| `content-visibility` removed from sections; kept only on plate and illustration pictures with exact ratio classes | Anchor links overshot by 400 to 500px and page height jumped 8488 to 6815px while scrolling; now targets land under the header and height is stable. Offscreen plates still do not compete with the hero |
| Hero image `decoding="async"` | A 2.2s main-thread task at hero load came from forced synchronous decode |
| Hero regrouped into one diagonal; label "Écrire sur Instagram" everywhere | Reviewer: four floating islands and two names for one action |
| Card label moved from above the title to the last line, aligned across the row | Removed an eyebrow (banned) |
| Tajawal Latin subset added to `/ar/` | Latin text on `/ar/` fell back to Arial |
| Arabic small text 15px, Arabic step numerals in Amiri | Legibility; Italiana's 1 read as I |
| Order bar slides in on phones (`@starting-style`) | It popped in abruptly |
| `undici` override (^8.12.2) plus dev patch overrides (fast-uri, body-parser, qs) | Production advisories 8 to 0; all advisories 21 to 7 (remaining 7 are dev-only and need major upgrades or have no fix) |
| Stale 8 Nov preview on :4321 stopped; preview stamps a build id; browser audits refuse a stale server; port clash reported | Audits were hitting old headers and CSP hashes |
| Preview server applies every `_headers` rule with Cloudflare's comma-join semantics | Local checks reflect the real header file |
| Dead `src/content/products` collection removed; image guards moved onto `src/data/images.ts` | The old "photo added through JSON" guard passed vacuously |
| New `scripts/visual-regression.mjs` (6 views vs `docs/visual-baseline/`) and `scripts/lighthouse-variance.mjs` | Missing regression and measurement tools |
| Claims register reconciled with the home page | Stale rows (draft marker, round-1 photos) corrected |

## Verification (round 3)
| Check | Result |
|---|---|
| Build, prerender (8 routes), budgets (JS 257 B, CSS 5.7 KB gzip), `astro check` 0 errors, 0 warnings, 0 hints | VERIFIED |
| Browser suite: 208 overflow checks, 16 axe WCAG 2.2 AA scans, touch targets, no-JS, Slow/Fast 3G, CTA in first view, sticky bar, localized 404 | VERIFIED, 0 errors |
| Keyboard (FR, AR) | VERIFIED |
| Visual regression, 6 views | VERIFIED: deterministic (3 runs at 0.000%); it flagged the intentional crop change (2.297%) before re-approval |
| Image contract, privacy, contrast, routing middleware, build guards (now testing the real manifest) | VERIFIED |
| Real scrolling: all 11 photos and illustrations load and render (390 FR, 1440 AR) | VERIFIED |
| Anchor links land under the header (1440 and 390) | VERIFIED |
| Cloudflare Pages runtime (`wrangler pages dev` 4.153.0) on `dist`: one `Cache-Control` per path, HSTS, CSP and COOP on all, 404s `no-store` + `noindex` in the right language, www redirect keeps path and query, no CSP violations, sticky bar works | VERIFIED locally; NOT TESTED on a real deployment |
| Production gate blocks on 17 open facts | VERIFIED (intended) |
| Independent finish review (fresh reviewer) | Full review: fix (7 applied, 1 declined: the footer shows the owner-confirmed legal name). Verdict pass: all resolved except the lock crop wall corner, which was then recropped (not re-scored) |
| Real devices, screen readers, field INP, real Cloudflare deploy | NOT TESTED |

## Performance (median of 3, Lighthouse 12.6.1, local preview)
| Page | Profile | Perf (samples) | LCP | CLS | Transfer |
|---|---|---|---:|---:|---:|
| `/` | mobile | 100 (99, 100, 100) | 1505 ms | 0.0001 | 181 KB |
| `/ar/` | mobile | 96 (95, 96, 98) | 2484 ms | 0.0023 | 291 KB |
| `/` | desktop | 100 | 424 ms | 0 | 180 KB |
| `/ar/` | desktop | 100 | 528 ms | 0.0023 | 290 KB |
| 4 legal pages | mobile and desktop | 100 | about 1.2 s / 0.29 s | 0 | 46 KB |

All scored routes meet the targets (score ≥95, LCP ≤2.5 s, CLS ≤0.02, TBT ≤100 ms) for the first time. `/ar/` mobile LCP is 16 ms under the limit; Amiri (107 KB) is the margin. Measured on the build before the final lock recrop (a below-fold image).

**Lab instability, investigated** (`docs/perf/variance.json`): on `/cookies/` (no JavaScript), 5 cold runs scored 100 with 0 ms TBT; warm runs scored 73 and 78 only when Lighthouse's own CPU benchmark fell from about 3700 to 2489 to 2904, with 700 to 830 ms tasks on a page with no script. The machine is intermittently contended (VS Code was the top CPU user), and headless Chrome rendered the first page of some sessions at 1 fps. Use medians; prefer CI for release numbers.

## Remaining
- Photography is the weakest part: neon cords, black écrins, a blue T-shirt, phone sources upscaled about 1.4x on retina. Only an owner reshoot (white or ivory ground, daylight, 3000px or more) fixes it.
- A fingertip shows at the left of the fish plate (source limit).
- `/ar/` mobile LCP has almost no margin.
- Owner decisions: `OWNER-DECISIONS.md`. Production stays blocked until they are answered.

---

# Audit after redesign (round 2)

**Branch:** `design/white-gold-redesign`.
**Before state:** `AUDIT-BEFORE.md`.
**Rationale:** `DESIGN-DECISIONS.md`.
**System:** `DESIGN-NOTES.md`.
**Images:** `IMAGE-AUDIT.md`.
**Screenshots:** `docs/screens/before/` and `docs/screens/after/`, FR and AR at 320, 375, 768, 1024 and 1440, first view and full page. Reproduce them with `node scripts/screens.mjs after` while the preview server runs.

## What changed

### Design
- **New direction: the presentation tray.**
  - White is the page ground. Ivory survives only as one band, which holds the illustrated content.
  - Gold appears as 1px lines and on the primary button.
  - On desktop the name "Haddar" and "Bijoux" sit on either side of the hero piece.
- **Real pieces lead.** The hero is the owner photo of three cord bracelets inside a gold liner. Six more real plates follow, in three pairs:
  - pillow pair: padlock heart, pineapple
  - écrin pair: fish, khomsa
  - wrist pair: the same heart on a pink cord and on a red cord
- **Honest provenance by design:**
  - Gold liner: real photographs only.
  - AI illustrations: no liner, smaller than every real plate, inside the ivory band, each labelled "Visuel d’illustration".
  - The AI hero image is no longer used.
- **Phones.** Photo first, then the name, the line and the order button, all in the first view at 375x667. Pairs stack, with a short gold rule between the two plates of a pair and wide space between pairs. The hamburger menu is gone.
- **Arabic.** The layout mirrors. The Latin name keeps its reading order. Amiri sets headings and piece names, and Tajawal sets text.
- **Commander** closes the page: a large heading, the order button, the handle, and a five-row facts table. Every value in it is an owner-confirmed sentence.

### Engineering
- `src/data/images.ts` now carries each crop, so a crop change rebuilds its derivatives. Orphan derivatives are pruned.
- The share cards show the real trio and are 54 to 56 KB JPEG (they were 331 KB PNG).
- Removed the header menu script. JavaScript went from 451 to 257 B gzip.
- Updated the checks to match the new structure:
  - `scripts/check-image-contract.mjs` now verifies the SHA-256 of all 15 originals, the five labelled illustrations, the seven photo crops on both locales, that no illustration is inside a liner, and that the hero photo is the only high-priority image.
  - `scripts/keyboard-review.mjs` tests Tab order to the order button instead of the removed menu.
  - `scripts/audit-browser.mjs` expects one hero button.
- `scripts/lighthouse.mjs` gained `--runs=N` (median by performance score). `scripts/perf-report.mjs` now reports the runs and the samples, and no longer prints boilerplate from round 1.

### Security
- **Cache headers.** Removed the global `Cache-Control` from `public/_headers`. Pages comma-joins duplicate headers (confirmed in Cloudflare's docs), so the immutable assets would have been sent `max-age=0, …, immutable`. The middleware also stops forcing `max-age=0` on every response.
- **Images skip the function.** Added `/incoming/*` and `/*.jpg` to the `_routes.json` exclusions, so images no longer invoke the Pages function on every request. Added a 1-day cache with stale-while-revalidate for `/incoming/*`.
- **New headers:** `Strict-Transport-Security: max-age=31536000` (no `includeSubDomains` or `preload` until the domain is confirmed) and `Cross-Origin-Opener-Policy: same-origin`.

## Verification

| Check | Result |
|---|---|
| Production build (`node scripts/build.mjs`), prerender checks on 8 routes, budgets (JS 257 B, CSS 5.7 KB gzip) | VERIFIED |
| `astro check` | VERIFIED: 0 errors, 0 warnings. 1 hint in an existing test script. |
| Image contract: originals unchanged, illustrations labelled and unframed, photo crops on both locales | VERIFIED |
| Browser suite (`audit-browser.mjs`): 208 viewport overflow checks, 16 axe WCAG 2.2 AA scans (0 serious or critical), touch targets ≥44px, no-JS rendering, Slow/Fast 3G, hero button in first view at 375x667 and 1440x900 in both locales, sticky bar hidden over Commander, localized 404 status | VERIFIED: 0 errors. The first run caught a 22px-tall returns link, which was fixed. |
| Keyboard (skip link, Tab to the order button, visible outline) | VERIFIED, FR and AR |
| Privacy: no third-party requests, cookies, storage or service workers on 8 routes | VERIFIED |
| Palette tokens and contrast | VERIFIED: no colour added |
| Build guards; production gate blocked by `[CONFIRMER]` (`check-placeholders --prod` exits 1) | VERIFIED |
| Routing middleware tests | VERIFIED |
| Impeccable detector on the changed UI files | VERIFIED: 0 findings |
| Visual review at 320, 375, 768, 1024 and 1440, FR and AR | VERIFIED by screenshot inspection |
| Independent finish review (Impeccable finish reviewer, fresh context) | PARTIAL. See below. |
| Lighthouse | See Performance |
| Real devices, real screen reader, manual 200% zoom | NOT TESTED |
| Cloudflare deployment: headers, `_routes.json`, TLS | NOT TESTED. Check `curl -I` on `/`, `/_astro/…`, `/fonts/…` and `/incoming/…` after deploy. |
| Field INP | NOT TESTED: there is no field data, and TBT is not INP. |

## Finish review

The reviewer ran fresh, with no access to this conversation.

**Round 1: fix, with six material items.**
1. A visible illustration label on each family card.
2. Illustrations made smaller than every real plate.
3. Phone pair rhythm and the axis rule restored on phones.
4. A tighter hero crop.
5. Distinct captions for the wrist pair.
6. The repeated hero fact hidden on phones.

**Round 2 (verdict on those six):**
- Five resolved.
- The hero crop scored partial.
- One regression introduced by the fixes: card labels sat at four different heights.

**After round 2**, I moved the crop down (y 270) and put each card label on one shared line under the images. I checked both by screenshot myself. **The reviewer has not scored that last batch.**

**Still open on the crop.** A thin sliver of the showroom wall remains at the top-left corner of the hero photo. Cropping further brings the cords to the frame edge. This is a limit of the source photo: a cleaner shot from the owner would close it (`OWNER-DECISIONS.md`, item 3).

**Not done.** The Impeccable documenter step (rewriting `DESIGN.md`) was not run. `DESIGN.md` holds the owner's brief, and replacing it needs your choice. The built system is documented in `DESIGN-NOTES.md`.

## Performance

**Setup.** Lighthouse 12.6.1 on the local gzip preview:
- Mobile: simulated Slow 4G with 4x CPU.
- Desktop: the desktop preset.
- Baseline: medians of 5 runs for the home pages, single runs for the legal pages.
- After: medians of 3 runs for every route, from the final session, measured on the final build.
- Full table: `docs/perf/after.md`.

| Page | Profile | Perf before to after (after samples) | A/BP/SEO | LCP before to after | CLS after | Transfer before to after |
|---|---|---|---|---:|---:|---:|
| `/` | mobile | 84 to **99** (74, 99, 99) | 100/100/100 | 1658 to 1808 ms | 0.0001 | 156 to 224 KB |
| `/ar/` | mobile | 98 to **100** (100, 100, 100) | 100/100/100 | 2258 to 1735 ms | 0 | 254 to 311 KB |
| `/` | desktop | 100 to **100** | 100/100/100 | 326 to 406 ms | 0.0004 | 213 to 239 KB |
| `/ar/` | desktop | 100 to **100** | 100/100/100 | 533 to 367 ms | 0 | 311 to 327 KB |
| 4 legal pages | desktop | 100 to 100 | 100/100/100 | about 290 ms | 0 | 45 to 46 KB |
| 4 legal pages | mobile | 70 to 100 before; 71, 83, 100, 100 after | 100/100/100 | about 1205 ms | 0 | 45 to 46 KB |

**Result against the targets:**

| Target | Result | Detail |
|---|---|---|
| Score ≥95, LCP ≤2.5 s, CLS ≤0.1 on the home pages | VERIFIED | Lab medians, mobile and desktop |
| Mobile score ≥95 on all legal pages | FAILED in the median for `/cookies/` (71) and `/conditions-generales/` (83) | Both pages ship no JavaScript, yet show 0.7 to 2.8 s of TBT in some runs, and the same pages score 100 in other samples. This is lab noise on this machine. It is still reported as a miss, because a cleaner machine or CI run is needed to prove otherwise. |

**What moved:**
- **Home page transfer rose** (156 to 224 KB on mobile) because real photos now load. The hero is a 30 KB AVIF. The plates near the top are about 25 KB each and lazy-loaded.
- **`/ar/` mobile LCP** was 2409 ms in the earlier noisy session and 1735 ms in the final one. Expect it to vary between 1.4 and 2.4 s in the lab, because Amiri (107 KB) and the first plates compete with the hero for bandwidth.
- **INP is not measured**, because there is no field data.

## Dependencies

**`pnpm audit`** (via `npx pnpm@12.11.2`): PARTIAL, not fixed in this round.
- **Production dependencies:** 8 advisories (4 high, 4 moderate), all in `undici` <8.12.2, which `astro > unifont` pulls in. `undici` runs only at build time; visitors get static HTML.
- **All dependencies:** 21 advisories (10 high, 8 moderate, 3 low), mostly in the `@lhci/cli` dev tooling.
- **Next step:** upgrade `astro` to a release that depends on `undici` ≥8.12.2, or add a pnpm override. Then rerun the build and the checks.

## Remaining weaknesses

- **Photo resolution.** On 2x screens the hero (850px source) and the écrin plates (880px) are upscaled by about 1.4x and 1.2x. Original phone files would fix this.
- **Showroom backgrounds.** The pillow photos carry showroom background, and the photos vary in light. The page groups them by setting but does not edit them.
- **Fragment ids.** Each piece has a stable id (for example `/#cordon-khomsa`), but nothing on the page shares it yet. The ids are there for the owner's stories and messages.
- **Amiri** is 107 KB and loads as the first Arabic section nears the viewport. A subset of the Arabic block alone saves only about 28% and needs a new Python dependency (`brotli`), so it was not done.
- **Lab noise.** Lighthouse samples swing by up to 35 points between runs on this machine. Treat single numbers with care.
