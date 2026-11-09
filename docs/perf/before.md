# Lighthouse before

Measured against the gzip-enabled local static preview in installed Chrome. Mobile uses Lighthouse default simulated Slow 4G and 4x CPU; desktop uses its desktop preset. Median of 5 runs per route/profile (by performance score), so results are lab samples rather than field guarantees. Expected HTTP 404 documents are audited without changing their status; Lighthouse may stop without scores. INP requires field measurement and is not certified by TBT. Raw reports: .audit/lighthouse/before.

| Route | Profile |  P/A/B/S | LCP ms | CLS | TBT ms | JS transfer bytes | Total transfer bytes |
|---|---|---|---:|---:|---:|---:|---:|
| /politique-de-confidentialite/ | mobile | 100/100/100/100 | 1210 | 0.0000 | 0 | 0 | 46529 |
| /cookies/ | mobile | 70/100/100/100 | 1206 | 0.0000 | 4244 | 0 | 46308 |
| /conditions-generales/ | mobile | 100/100/100/100 | 1206 | 0.0000 | 0 | 0 | 46438 |
| /retours-et-remboursement/ | mobile | 100/100/100/100 | 1208 | 0.0000 | 0 | 0 | 46314 |
| /404/ | mobile | N/A/N/A/N/A/N/A | N/A | N/A | N/A | 0 | N/A |
| /ar/404/ | mobile | N/A/N/A/N/A/N/A | N/A | N/A | N/A | 0 | N/A |
| /politique-de-confidentialite/ | desktop | 100/100/100/100 | 329 | 0.0000 | 0 | 0 | 46529 |
| /cookies/ | desktop | 100/100/100/100 | 288 | 0.0000 | 0 | 0 | 46308 |
| /conditions-generales/ | desktop | 100/100/100/100 | 288 | 0.0000 | 0 | 0 | 46438 |
| /retours-et-remboursement/ | desktop | 100/100/100/100 | 288 | 0.0000 | 0 | 0 | 46314 |
| /404/ | desktop | N/A/N/A/N/A/N/A | N/A | N/A | N/A | 0 | N/A |
| /ar/404/ | desktop | N/A/N/A/N/A/N/A | N/A | N/A | N/A | 0 | N/A |
| / | mobile | 84/100/100/100 | 1658 | 0.0000 | 613 | 0 | 159835 |
| /ar/ | mobile | 98/100/100/100 | 2258 | 0.0000 | 0 | 0 | 260448 |
| / | desktop | 100/100/100/100 | 326 | 0.0000 | 0 | 0 | 217962 |
| /ar/ | desktop | 100/100/100/100 | 533 | 0.0000 | 0 | 0 | 318575 |

404 limitations and failed metrics are retained in the JSON report. Production domain, TLS, CDN, real images, real devices, and field INP require launch-time measurement.
