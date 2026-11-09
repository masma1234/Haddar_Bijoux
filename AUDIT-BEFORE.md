# Audit before redesign (round 2)

**Baseline.** Commit `ca193aef` on `design/premium-refinement`. It is the result of round 1, whose own before and after are in git history. The working tree was clean, so the new branch `design/white-gold-redesign` starts from that commit and needed no separate baseline commit.

**Screenshots.** `docs/screens/before/`: FR and AR at 320, 375, 768, 1024 and 1440, first view and full page.

## Measured (Lighthouse 12.6.1, local preview, home pages)

The first two full runs today were not usable:
- The first gave mobile `/` NO_FCP.
- Both showed a TBT of 3 to 7 seconds on pages that ship 451 bytes of JavaScript.

That is CPU contention on this machine, not the site. So `scripts/lighthouse.mjs` gained `--runs=N`, which keeps the median by performance score. The home baseline below is the median of 5 runs. The legal pages come from the last single run.

| Page | Profile | P/A/BP/SEO (median) | Performance samples | LCP | CLS | Transfer |
|---|---|---|---|---:|---:|---:|
| `/` | mobile | 84/100/100/100 | 78, 82, 84, 95, 100 | 1658 ms | 0 | 160 KB |
| `/ar/` | mobile | 98/100/100/100 | 55, 98, 98, 98, 100 | 2258 ms | 0 | 260 KB |
| `/` | desktop | 100/100/100/100 | 100 x5 | 326 ms | 0.00002 | 218 KB |
| `/ar/` | desktop | 100/100/100/100 | 94, 99, 100, 100, 100 | 533 ms | 0.0004 | 319 KB |

**Other measures:**
- JS: 451 B gzip.
- CSS: 5.1 KB gzip.
- Lab scores swing 20 points between runs today, so only large differences mean anything.

## Weaknesses found

### Design
1. **The first image was not jewelry Haddar sells.** The hero showed an AI chain bracelet with a disclaimer under it ("Visuels d’illustration"). The real pieces only started below the fold.
2. **No jewelry in the phone first view.** At 375x667 the first view held the name, two lines of text and two stacked buttons. The image started below them.
3. **Ivory everywhere.** The whole page sat on `#F7F5F1`, read as beige, and gold had no field to stand out from. The new brief asks for white to dominate.
4. **A template rhythm.**
   - The hero was a split: copy left, image right, two buttons.
   - Three sections repeated the same heading-left, intro-right row.
   - Two more sections were image-and-text splits.
5. **Real photos and illustrations were treated alike.** Same frames and same grid language, with only a small caption to tell them apart.
6. **Loose crops.** The pillow shots showed the showroom (teal velvet edge, brown wall, display stand), so the charm was small in frame.
7. **The collage panel's twin was discarded.** The second panel of `coeur_yed.jpeg` (same heart, red cord) was unused, although cut on its own it has no seam.
8. **A vague title.** "Les pièces à découvrir" said nothing.
9. **An English address** ("Old Medina of Sfax") on the French page.

### Function and code
10. **A hamburger menu for three anchors** on a one-page site: JavaScript and a tap for little gain.
11. **`scripts/generate-assets.mjs` ignored crop changes.** A derivative counted as fresh when it was newer than its original, so editing a crop in the manifest did not rebuild it. It also never removed derivatives no manifest entry used.

### Security and caching
12. **Contradictory `Cache-Control` on Cloudflare Pages.** `public/_headers` set `Cache-Control: max-age=0` on `/*` and `immutable` on `/_astro/*` and `/fonts/*`. Pages joins duplicate headers with a comma, so those assets would get both values. The middleware also copied the global `max-age=0` onto every response it handles.
13. **Images ran through the function.** `/incoming/*` was not excluded in `public/_routes.json`, so every image request invoked the Pages function. It returned `max-age=0`.
14. **Missing headers.** No `Strict-Transport-Security` and no `Cross-Origin-Opener-Policy`.
15. **`pnpm audit`.**
    - Production dependencies: 8 advisories (4 high, 4 moderate), all `undici` <8.12.2 via `astro > unifont`. Build time only.
    - All dependencies: 21 (10 high, 8 moderate, 3 low).

### Performance
16. **`/ar/` mobile LCP** is about 2.26 s, close to the 2.5 s limit.
