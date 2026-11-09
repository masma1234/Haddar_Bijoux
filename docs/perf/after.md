# Lighthouse after and comparison

Values are before to after. P/A/B/S means Performance / Accessibility / Best Practices / SEO. Installed Chrome, Lighthouse 12.6.1, gzip local static server. Mobile uses simulated Slow 4G with 4x CPU; desktop uses Lighthouse desktop-config. Each value is the median by performance score of the runs counted in the Runs column (before/after); the after performance samples show the spread.

| Route | Profile | P/A/B/S before to after | Runs | After perf samples | LCP ms | CLS | TBT ms | JS gzip bytes | Page transfer bytes |
|---|---|---|---|---|---:|---:|---:|---:|---:|
| / | mobile | 99/100/100/100 to 100/100/100/100 | 3/3 | 99, 100, 100 | 1808 to 1506 | 0.0001 to 0.0001 | 0 to 0 | 257 to 257 | 228924 to 185728 |
| /ar/ | mobile | 100/100/100/100 to 96/100/100/100 | 3/3 | 95, 96, 98 | 1735 to 2485 | 0.0000 to 0.0023 | 0 to 0 | 257 to 257 | 318443 to 297883 |
| /politique-de-confidentialite/ | mobile | 100/100/100/100 to 100/100/100/100 | 3/3 | 100, 100, 100 | 1205 to 1208 | 0.0000 to 0.0000 | 41 to 0 | 0 to 0 | 46972 to 47309 |
| /cookies/ | mobile | 71/100/100/100 to 100/100/100/100 | 3/3 | 100, 100, 100 | 1217 to 1211 | 0.0000 to 0.0000 | 2778 to 0 | 0 to 0 | 46753 to 47089 |
| /conditions-generales/ | mobile | 83/100/100/100 to 100/100/100/100 | 3/3 | 100, 100, 100 | 1204 to 1208 | 0.0000 to 0.0000 | 710 to 0 | 0 to 0 | 46877 to 47213 |
| /retours-et-remboursement/ | mobile | 100/100/100/100 to 100/100/100/100 | 3/3 | 100, 100, 100 | 1205 to 1209 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46758 to 47094 |
| /404/ | mobile | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | 3/3 | 0, 0, 0 | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |
| /ar/404/ | mobile | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | 3/3 | 0, 0, 0 | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |
| / | desktop | 100/100/100/100 to 100/100/100/100 | 3/3 | 100, 100, 100 | 406 to 424 | 0.0004 to 0.0000 | 0 to 0 | 257 to 257 | 245019 to 184796 |
| /ar/ | desktop | 100/100/100/100 to 100/100/100/100 | 3/3 | 100, 100, 100 | 367 to 529 | 0.0000 to 0.0023 | 0 to 0 | 257 to 257 | 334538 to 296951 |
| /politique-de-confidentialite/ | desktop | 100/100/100/100 to 100/100/100/100 | 3/3 | 100, 100, 100 | 287 to 286 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46972 to 47309 |
| /cookies/ | desktop | 100/100/100/100 to 100/100/100/100 | 3/3 | 64, 100, 100 | 288 to 285 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46753 to 47089 |
| /conditions-generales/ | desktop | 100/100/100/100 to 100/100/100/100 | 3/3 | 100, 100, 100 | 288 to 287 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46877 to 47213 |
| /retours-et-remboursement/ | desktop | 100/100/100/100 to 100/100/100/100 | 3/3 | 0, 100, 100 | 297 to 288 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46758 to 47094 |
| /404/ | desktop | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | 3/3 | 0, 0, 0 | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |
| /ar/404/ | desktop | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | 3/3 | 0, 0, 0 | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |

## Interpretation

- Final numerical target misses on successful documents: 0. All failures, if any: [].
- HTTP 404 pages intentionally return 404 and noindex. Lighthouse rejects them before scoring. Their N/A entries are not passes. Separate browser, axe, privacy and routing reports cover them.
- Both homepages carry one small inline script: 257 gzip bytes. External JavaScript transfer is zero. JSON-LD is data, not executable code. CSS across all bundles and locale font stylesheets totals 6488 gzip bytes.
- Lab samples on this machine vary widely (see the samples column): pages with no JavaScript at all show several hundred milliseconds of TBT in some runs. TBT and the performance score are not reliable comparisons here; LCP, CLS and transfer are steadier.
- Lighthouse still flags optional opportunities around render-blocking local styles/fonts, dependency chains and layout work. These diagnostics remain in the raw reports.
- INP under 200ms is not certified: there is no field traffic or RUM and TBT is not INP. Recheck production origin, real photos, actual devices, CDN and TLS before launch. No performance analytics was installed.

Raw reports: .audit/lighthouse/{before,after}/. Reproduce with pnpm audit:lighthouse before and pnpm audit:lighthouse after. LHCI config retains the requested thresholds and uses three runs when invoked.
