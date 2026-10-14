# Lighthouse before

Measured against the gzip-enabled local static preview in installed Chrome. Mobile uses Lighthouse default simulated Slow 4G and 4x CPU; desktop uses its desktop preset. One run per route/profile, so results are lab samples rather than field guarantees. Expected HTTP 404 documents are audited without changing their status; Lighthouse may stop without scores. INP requires field measurement and is not certified by TBT. Raw reports: .audit/lighthouse/before.

| Route | Profile |  P/A/B/S | LCP ms | CLS | TBT ms | JS transfer bytes | Total transfer bytes |
|---|---|---|---:|---:|---:|---:|---:|
| / | mobile | 100/100/100/100 | 1214 | 0.0000 | 0 | 0 | 41824 |
| /ar/ | mobile | 97/100/100/100 | 1810 | 0.0010 | 163 | 0 | 138522 |
| /politique-de-confidentialite/ | mobile | 100/100/100/100 | 1208 | 0.0000 | 0 | 0 | 38966 |
| /cookies/ | mobile | 100/100/100/100 | 1207 | 0.0000 | 0 | 0 | 38787 |
| /conditions-generales/ | mobile | 100/100/100/100 | 1211 | 0.0000 | 0 | 0 | 45524 |
| /retours-et-remboursement/ | mobile | 100/100/100/100 | 1209 | 0.0000 | 0 | 0 | 38808 |
| /404/ | mobile | N/A/N/A/N/A/N/A | N/A | N/A | N/A | 0 | N/A |
| /ar/404/ | mobile | N/A/N/A/N/A/N/A | N/A | N/A | N/A | 0 | N/A |
| / | desktop | 100/100/100/100 | 296 | 0.0000 | 0 | 0 | 41824 |
| /ar/ | desktop | 100/100/100/100 | 407 | 0.0002 | 13 | 0 | 138522 |
| /politique-de-confidentialite/ | desktop | 100/100/100/100 | 293 | 0.0000 | 0 | 0 | 38966 |
| /cookies/ | desktop | 100/100/100/100 | 291 | 0.0000 | 0 | 0 | 38787 |
| /conditions-generales/ | desktop | 100/100/100/100 | 292 | 0.0000 | 0 | 0 | 45524 |
| /retours-et-remboursement/ | desktop | 100/100/100/100 | 293 | 0.0000 | 0 | 0 | 38808 |
| /404/ | desktop | N/A/N/A/N/A/N/A | N/A | N/A | N/A | 0 | N/A |
| /ar/404/ | desktop | N/A/N/A/N/A/N/A | N/A | N/A | N/A | 0 | N/A |

404 limitations and failed metrics are retained in the JSON report. Production domain, TLS, CDN, real images, real devices, and field INP require launch-time measurement.
