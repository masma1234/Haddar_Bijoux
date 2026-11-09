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
