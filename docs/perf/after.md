# Lighthouse after and comparison

Values are before to after. P/A/B/S means Performance / Accessibility / Best Practices / SEO. Installed Chrome, Lighthouse 12.6.1, gzip local static server. Mobile uses simulated Slow 4G with 4x CPU; desktop uses Lighthouse desktop-config. Each value is the median by performance score of the runs counted in the Runs column (before/after); the after performance samples show the spread.

| Route | Profile | P/A/B/S before to after | Runs | After perf samples | LCP ms | CLS | TBT ms | JS gzip bytes | Page transfer bytes |
|---|---|---|---|---|---:|---:|---:|---:|---:|
| / | mobile | 84/100/100/100 to 99/100/100/100 | 5/3 | 74, 99, 99 | 1658 to 1808 | 0.0000 to 0.0001 | 613 to 0 | 257 to 257 | 159835 to 228924 |
| /ar/ | mobile | 98/100/100/100 to 100/100/100/100 | 5/3 | 100, 100, 100 | 2258 to 1735 | 0.0000 to 0.0000 | 0 to 0 | 257 to 257 | 260448 to 318443 |
| /politique-de-confidentialite/ | mobile | 100/100/100/100 to 100/100/100/100 | 1/3 | 100, 100, 100 | 1210 to 1205 | 0.0000 to 0.0000 | 0 to 41 | 0 to 0 | 46529 to 46972 |
| /cookies/ | mobile | 70/100/100/100 to 71/100/100/100 | 1/3 | 70, 71, 90 | 1206 to 1217 | 0.0000 to 0.0000 | 4244 to 2778 | 0 to 0 | 46308 to 46753 |
| /conditions-generales/ | mobile | 100/100/100/100 to 83/100/100/100 | 1/3 | 70, 83, 100 | 1206 to 1204 | 0.0000 to 0.0000 | 0 to 710 | 0 to 0 | 46438 to 46877 |
| /retours-et-remboursement/ | mobile | 100/100/100/100 to 100/100/100/100 | 1/3 | 79, 100, 100 | 1208 to 1205 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46314 to 46758 |
| /404/ | mobile | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | 1/3 | 0, 0, 0 | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |
| /ar/404/ | mobile | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | 1/3 | 0, 0, 0 | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |
| / | desktop | 100/100/100/100 to 100/100/100/100 | 5/3 | 100, 100, 100 | 326 to 406 | 0.0000 to 0.0004 | 0 to 0 | 257 to 257 | 217962 to 245019 |
| /ar/ | desktop | 100/100/100/100 to 100/100/100/100 | 5/3 | 100, 100, 100 | 533 to 367 | 0.0000 to 0.0000 | 0 to 0 | 257 to 257 | 318575 to 334538 |
| /politique-de-confidentialite/ | desktop | 100/100/100/100 to 100/100/100/100 | 1/3 | 100, 100, 100 | 329 to 287 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46529 to 46972 |
| /cookies/ | desktop | 100/100/100/100 to 100/100/100/100 | 1/3 | 100, 100, 100 | 288 to 288 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46308 to 46753 |
| /conditions-generales/ | desktop | 100/100/100/100 to 100/100/100/100 | 1/3 | 100, 100, 100 | 288 to 288 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46438 to 46877 |
| /retours-et-remboursement/ | desktop | 100/100/100/100 to 100/100/100/100 | 1/3 | 0, 100, 100 | 288 to 297 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 46314 to 46758 |
| /404/ | desktop | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | 1/3 | 0, 0, 0 | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |
| /ar/404/ | desktop | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | 1/3 | 0, 0, 0 | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |

## Interpretation

- Final numerical target misses on successful documents: 2. All failures, if any: [{"route":"/cookies/","profile":"mobile","scores":{"performance":71,"accessibility":100,"best-practices":100,"seo":100},"lcp":1216.7788,"cls":0,"tbt":2778.2212},{"route":"/conditions-generales/","profile":"mobile","scores":{"performance":83,"accessibility":100,"best-practices":100,"seo":100},"lcp":1204.4202,"cls":0,"tbt":710.0798}].
- HTTP 404 pages intentionally return 404 and noindex. Lighthouse rejects them before scoring. Their N/A entries are not passes. Separate browser, axe, privacy and routing reports cover them.
- Both homepages carry one small inline script: 257 gzip bytes. External JavaScript transfer is zero. JSON-LD is data, not executable code. CSS across all bundles and locale font stylesheets totals 5721 gzip bytes.
- Lab samples on this machine vary widely (see the samples column): pages with no JavaScript at all show several hundred milliseconds of TBT in some runs. TBT and the performance score are not reliable comparisons here; LCP, CLS and transfer are steadier.
- Lighthouse still flags optional opportunities around render-blocking local styles/fonts, dependency chains and layout work. These diagnostics remain in the raw reports.
- INP under 200ms is not certified: there is no field traffic or RUM and TBT is not INP. Recheck production origin, real photos, actual devices, CDN and TLS before launch. No performance analytics was installed.

Raw reports: .audit/lighthouse/{before,after}/. Reproduce with pnpm audit:lighthouse before and pnpm audit:lighthouse after. LHCI config retains the requested thresholds and uses three runs when invoked.
