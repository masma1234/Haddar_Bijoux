# Lighthouse after and comparison

Values are before to after. P/A/B/S means Performance / Accessibility / Best Practices / SEO. Installed Chrome, Lighthouse 12.6.1, gzip local static server. Mobile uses simulated Slow 4G with 4x CPU; desktop uses Lighthouse desktop-config. One sample per route/profile, with affected homepages rerun after their final label fix.

| Route | Profile | P/A/B/S before to after | LCP ms | CLS | TBT ms | JS gzip bytes | Page transfer bytes |
|---|---|---|---:|---:|---:|---:|---:|
| / | mobile | 100/100/100/100 to 100/100/100/100 | 1214 to 1223 | 0.0000 to 0.0000 | 0 to 0 | 491 to 491 | 41824 to 50248 |
| /ar/ | mobile | 97/100/100/100 to 100/100/100/100 | 1810 to 1820 | 0.0010 to 0.0010 | 163 to 0 | 491 to 491 | 138522 to 146944 |
| /politique-de-confidentialite/ | mobile | 100/100/100/100 to 100/100/100/100 | 1208 to 1209 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 38966 to 47331 |
| /cookies/ | mobile | 100/100/100/100 to 100/100/100/100 | 1207 to 1208 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 38787 to 47153 |
| /conditions-generales/ | mobile | 100/100/100/100 to 100/100/100/100 | 1211 to 1208 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 45524 to 54912 |
| /retours-et-remboursement/ | mobile | 100/100/100/100 to 100/100/100/100 | 1209 to 1209 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 38808 to 47173 |
| /404/ | mobile | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |
| /ar/404/ | mobile | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |
| / | desktop | 100/100/100/100 to 100/100/100/100 | 296 to 291 | 0.0000 to 0.0000 | 0 to 0 | 491 to 491 | 41824 to 50248 |
| /ar/ | desktop | 100/100/100/100 to 100/100/100/100 | 407 to 446 | 0.0002 to 0.0002 | 13 to 0 | 491 to 491 | 138522 to 146944 |
| /politique-de-confidentialite/ | desktop | 100/100/100/100 to 100/100/100/100 | 293 to 290 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 38966 to 47331 |
| /cookies/ | desktop | 100/100/100/100 to 100/100/100/100 | 291 to 309 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 38787 to 47153 |
| /conditions-generales/ | desktop | 100/100/100/100 to 100/100/100/100 | 292 to 331 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 45524 to 54912 |
| /retours-et-remboursement/ | desktop | 100/100/100/100 to 100/100/100/100 | 293 to 288 | 0.0000 to 0.0000 | 0 to 0 | 0 to 0 | 38808 to 47173 |
| /404/ | desktop | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |
| /ar/404/ | desktop | N/A/N/A/N/A/N/A to N/A/N/A/N/A/N/A | N/A to N/A | N/A to N/A | N/A to N/A | 0 to 0 | N/A to N/A |

## Interpretation

- Final numerical target misses on successful documents: 0. All failures, if any: [].
- HTTP 404 pages intentionally return 404 and noindex. Lighthouse rejects them before scoring. Their N/A entries are not passes. Separate browser, axe, privacy and routing reports cover them.
- Both homepages contain the same small executable inline script in both phases: 491 gzip bytes. External JavaScript transfer is zero; inline JavaScript travels inside HTML. JSON-LD is data, not executable application code. CSS across all bundles and locale font stylesheets totals 5056 gzip bytes.
- Corrections included pale-gold text contrast, accessible labels, minimum touch sizes, Windows-safe security-header parsing, and responsive hero-photo preloads for future real photos. A valid strict CSP adds header transfer overhead, explaining most page-weight growth.
- Timing changes include measurement noise. The original mobile baseline overlapped the end of the type checker; final Lighthouse measurements ran without other audit jobs. Do not attribute the entire Arabic TBT change to the small source edits.
- Lighthouse still flags optional opportunities around render-blocking local styles/fonts, dependency chains and layout work. The numerical targets pass; these diagnostics remain in the raw reports.
- INP under 200ms is not certified: there is no field traffic or RUM and TBT is not INP. Recheck production origin, real photos, actual devices, CDN and TLS before launch. No performance analytics was installed.

Raw reports: .audit/lighthouse/{before,after}/. Reproduce with pnpm audit:lighthouse before and pnpm audit:lighthouse after. LHCI config retains the requested thresholds and uses three runs when invoked.
