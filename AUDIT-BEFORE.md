# Audit before refinement

Baseline commit `45d2cd28` on branch `design/premium-refinement`, built with `pnpm build` and served by `scripts/serve.mjs`. Screenshots: `docs/screens/before/` (FR and AR at 320, 375, 768, 1024, 1440; first view and full page).

## Measured (Lighthouse 12.6.1, local preview, one run each)

| Page | Profile | Perf / A11y / BP / SEO | LCP | CLS | TBT | Transfer |
|---|---|---|---:|---:|---:|---:|
| `/` | mobile (Slow 4G, 4x CPU) | 100 / 100 / 100 / 100 | 1661 ms | 0 | 0 ms | 165 KB |
| `/ar/` | mobile | 99 / 100 / 100 / 100 | 2262 ms | 0 | 0 ms | 262 KB |
| `/` | desktop | 100 / 100 / 100 / 100 | 370 ms | 0.00002 | 0 ms | 165 KB |
| `/ar/` | desktop | 100 / 100 / 100 / 100 | 512 ms | 0.0002 | 0 ms | 262 KB |

Lab numbers were already good. The problems were visual, structural and factual.

## Problems found

### Visual
1. **Every image was letterboxed.** The six square illustrations sat in 3:4 frames with `object-fit: contain`, leaving white bands above and below on the ivory page. The hero looked like a broken image with a caption floating in the bottom band.
2. **The real photos in `incoming/` were not used.** Nine new owner files existed; none appeared on the site.
3. **Brand name shown three times in the first view:** wordmark, an uppercase "HADDAR BIJOUX" eyebrow, then the H1.
4. **Generic template chrome:** a tracked uppercase eyebrow above every heading, including "COMMANDER" above the heading "Commander".
5. **Collection header:** three-column intro left the eyebrow stranded in its own column.
6. **Arabic page:** the Latin H1 "Haddar Bijoux" and the wordmark fell back to Times because Italiana was not loaded on `/ar/`. Negative letter-spacing was also applied to Arabic headings, which harms letter joining.
7. **Off-palette glyph:** the "Voir la collection" button used a Unicode `↓` that rendered in a system font, not in the icon set.
8. **Tablet (768px)** was a stretched phone layout.

### Functional
9. **Mobile menu icon was invisible.** `.menu-lines` had no CSS: the menu was an empty 44px bar spanning the width under the header, making the mobile header about 115px tall.
10. **Mobile menu stayed open** after choosing a section, covering the content.
11. **Sticky mobile order bar showed on load**, duplicating the hero buttons directly above it.
12. **Broken footer link:** the footer linked only to `/mentions-legales/`, which is not built (404). The four real legal pages had no inbound link.
13. **False statement on `/cookies/`:** "Le thème clair ou sombre suit le réglage de votre appareil". The site is light only.
14. **Instagram handle mismatch:** code used `@haddar__bijoux`; project rules and the share image said `@haddar_bijoux`.
15. **No script generated the image derivatives** in `public/incoming/`. They could not be rebuilt.
16. `astro check`: 2 type errors.
17. Unused `JewelDrawing.astro`, a drawn SVG jewelry component banned by the project rules.

### Performance
18. The Arabic page preloaded Amiri (108 KB) for headings that are all below the fold. This made `/ar/` mobile LCP 2262 ms, close to the 2500 ms target.
