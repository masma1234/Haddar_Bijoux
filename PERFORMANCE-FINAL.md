# Final performance measurements (11 November 2026)

## Conditions

- Lighthouse 12.6.1, headless Chrome on this Windows machine, against the local gzip preview (`scripts/serve.mjs`) of the final build.
- Mobile: simulated Slow 4G and 4x CPU slowdown. Desktop: Lighthouse desktop preset.
- Each figure is the median of 3 runs by performance score. Nothing else was running during the runs.
- These are lab numbers from one machine. The hosted site on Cloudflare, real phones and field INP are NOT TESTED.

## Results

| Page | Profile | Performance (3 samples) | Accessibility / Best practices / SEO | LCP | CLS | TBT | Transfer |
|---|---|---|---|---:|---:|---:|---:|
| `/` | mobile | 100 (99, 100, 100) | 100 / 100 / 100 | 1731 ms | 0.0001 | 0 ms | 183 KB |
| `/ar/` | mobile | 96 (95, 96, 100) | 100 / 100 / 100 | 2483 ms | 0.0023 | 0 ms | 293 KB |
| `/` | desktop | 100 | 100 / 100 / 100 | 426 ms | 0 | 0 ms | 181 KB |
| `/ar/` | desktop | 100 | 100 / 100 / 100 | 406 ms | 0 | 0 ms | 290 KB |
| 4 legal pages | mobile | 100 | 100 / 100 / 100 | 1206 to 1215 ms | 0 | 0 ms | 46 KB |
| 4 legal pages | desktop | 100 | 100 / 100 / 100 | 286 to 326 ms | 0 | 0 ms | 46 KB |

Targets were a score of at least 95, LCP at most 2.5 s, CLS at most 0.1 and TBT at most 100 ms. Every scored route meets them.

Two notes on the runs:
- In the 3-run pass the mobile run of `/politique-de-confidentialite/` failed with a Lighthouse tool error (`NO_NAVSTART`). Six fresh runs of that page then scored 100 each (LCP 1209 ms cold).
- One mobile sample of `/cookies/` errored the same way; its other two runs scored 100.

## Compared with 9 November

The site's rendering code is the same apart from one tablet-only CSS rule, so no real change was expected. The numbers agree within lab noise:

| Page (mobile) | LCP, 9 Nov | LCP, 11 Nov |
|---|---:|---:|
| `/` | 1505 ms | 1731 ms |
| `/ar/` | 2484 ms | 2483 ms |

## Payload

| Item | Size |
|---|---|
| JavaScript | 257 B gzip (one inline script, no external file) |
| CSS | 6.5 KB gzip, all stylesheets |
| Hero image | 22 KB (480w AVIF) on phones, 47 KB (750w) on desktop |
| Fonts at first paint | Italiana 11 KB plus Jost or Tajawal 10 KB, both preloaded |
| Third-party requests | None |

Caching, as served by Cloudflare's local Pages runtime: hashed CSS and fonts one year immutable, images one day with stale-while-revalidate, HTML revalidated on every visit.

## Cold and warm, and run-to-run variance

`scripts/lighthouse-variance.mjs`, mobile, on two pages with no JavaScript:

| Page | Runs | Performance | LCP cold | LCP warm | TBT |
|---|---|---|---:|---:|---:|
| `/cookies/` | 5 cold, 5 warm | 100 in all 10 | 1207 ms | 751 ms | 0 ms |
| `/politique-de-confidentialite/` | 3 cold, 3 warm | 100 in all 6 | 1209 ms | 752 ms | 0 ms |

Today's runs were stable. Lighthouse's own CPU benchmark stayed between 2859 and 3676. On 9 November it dipped to about 2490 during some runs, and those were the runs that produced false blocking time. The earlier variability therefore came from machine load, not from the site.

## Known thin margin

`/ar/` on mobile is 17 ms under the LCP limit. The Arabic heading font, Amiri (107 KB), downloads alongside the hero photo. Subsetting it is the fix. It needs a font tool that is not installed here (`brotli` for Python fontTools) and was not done.
