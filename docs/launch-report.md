# Haddar Bijoux launch report

Date: 14 October 2026. Status: built and tested local preview; not published. Production is intentionally blocked by unresolved facts and approvals.

## Implemented

- Astro 7.3.8 static output, strict TypeScript, pinned pnpm dependencies and plain CSS. All eight pages are prerendered: French and derja homepages, four French legal templates, and French/Arabic 404 documents.
- Editorial design selected in the design brief: one large bracelet outline, quiet typography, asymmetric desktop collection and one-column mobile layout. The colors and type treatment follow `Haddar Bijoux — Palette.html`, with flat fills and no gradients, shadows or animation.
- Local Italiana/Jost and Arabic-only Amiri/Tajawal fonts, WOFF2 subsets, two critical preloads per locale, swap and fallback metrics. Font licences are retained.
- Six category entries, three customization steps, gold information, five native FAQ disclosures, Instagram ordering, native mobile navigation and an unobtrusive mobile contact bar.
- Confirmed legal name Haddar_Bijoux and corrected @haddar__bijoux links. Confirmed 18-carat gold, warranty certificate, Instagram payment/delivery information and a seven-day return window starting on the payment date.
- Unique metadata, canonical/locale links, factual Organization and FAQ JSON-LD, breadcrumbs, sitemap, robots, custom icons and two flat social cards.
- No form, account, checkout, analytics, cookies, browser storage, embeds or third-party page-load requests.
- JSON-based photo workflow with permissions and bilingual alt validation, responsive AVIF/WebP, reserved image space, responsive hero preload and size guard, and lazy collection images.
- Cloudflare Pages security/cache headers and middleware for static localized 404 selection and www redirection. The middleware does not render Astro pages.

## Verification

| Check | Result / evidence |
|---|---|
| Preview build | Eight static routes; expected missing-fact and photo warnings |
| Strict type check | Zero errors and warnings; one nonblocking async-style suggestion in a test helper |
| Prerendered HTML | Eight routes, including exact home headings; prerender-report.md |
| Responsive layout | 208 width/orientation checks without horizontal overflow; browser-report.md |
| Hero actions | Both visible at 375x667 and 1440x900 in both languages |
| Axe | 16 scans across light and dark device preferences using WCAG 2/2.1/2.2 A and AA tags; zero violations. The approved light palette remains fixed in both preferences |
| Keyboard | Skip link, menu and FAQ tested; focus not hidden by the contact bar. Menu and skip-link focus screenshots visually reviewed |
| JavaScript disabled | All eight routes usable, including native navigation and FAQ |
| Slow/Fast 3G | Both homepages remain usable |
| Privacy | Zero third-party requests, cookies, local/session storage or service workers on all eight routes |
| Contrast | Actual text/background combinations pass AA; contrast-report.md |
| Budgets | 491 bytes gzip executable inline JavaScript; 5,056 bytes gzip CSS across bundles and both locale stylesheets |
| Lighthouse | Exact before/after values and target results in perf/after.md and perf/target-results.json |
| HTTP 404 | Local status, language, axe, responsive and privacy checks pass; Lighthouse refuses to score a 404 document |
| Cloudflare routing | Actual middleware tested with mocked Pages assets, including www path/query preservation; routing-report.md |
| Build safeguards | Missing facts, translated alt text and photo permissions correctly rejected; build-guards-report.md |
| Adding a photo | A temporary local fixture generated responsive AVIF/WebP through a JSON edit alone, then was removed and the original preview restored |

Lighthouse thresholds remain scores >=95, LCP <=2500ms, CLS <=0.02 and TBT <=100ms. Measurements are local lab samples. INP <=200ms is unverified without field interactions; no RUM was added. The original mobile baseline overlapped the end of a type check, so timing differences cannot be attributed solely to source changes.

## Deliberate adjustments and limits

- The palette is taken directly from `Haddar Bijoux — Palette.html`: `#F7F5F1`, `#FFFFFF`, `#B68A4E`, `#8F6B39`, `#EAE0CB`, `#2A241E`, `#6E6459`, and `#E4DCCB`. Muted ink and deep gold fall below 4.5:1 on pale gold, so small captions on that surface use brown ink. The separate dark palette and extra gold-text color were removed.
- Arabic legal translations are withheld pending legal approval. The Arabic footer links to French with a derja explanation. French legal pages omit nonexistent Arabic alternates.
- Main content and navigation work without JavaScript. The fixed mobile contact bar is a progressive enhancement; hero and contact buttons remain available without it.
- Contact forms are disabled and not implemented. ENABLE_CONTACT_FORM=true fails explicitly. No /merci route or submission handler is shipped.
- TypeScript 6.0.3 is pinned because the installed Astro checker rejects TypeScript 7.
- Cloudflare Function responses receive generated security headers directly, alongside the static _headers file.
- Six intentionally labelled line drawings remain. They are not photographs of actual inventory.
- Keyboard interaction and visual review were agent-operated. Human screen-reader testing, actual browser/OS zoom, native derja review and real-device safe-area checks remain launch tasks.

## Required before public launch

1. Confirm legal form, RNE/tax applicability, legal/public address status, delivery areas, customization process/options and hallmark details.
2. Confirm return conditions, exclusions, shipping costs, refund method/timing and exchanges. Have a lawyer review the seven-day-from-payment policy against applicable consumer rights.
3. Confirm warranty scope/duration, privacy rights contact, retention, processing/transfers and complete commercial terms. The certificate statement does not establish these details.
4. Obtain French legal approval and native derja review, then update the corresponding business.ts flags.
5. Supply a client-owned domain and set PUBLIC_SITE_URL. The current .invalid origin is deliberate. Configure DNS, HTTPS, www redirection including assets, and host privacy settings.
6. Supply client photographs, permission records and accurate bilingual descriptions. The build warns while illustration placeholders remain.
7. Run pnpm build:prod. Its present failure is expected and verified; do not remove the gate to publish incomplete information.
8. Validate on an actual Cloudflare Pages staging origin, real devices and assistive technology. Verify headers, caching, redirects, error routing and Instagram DM opening with and without the Instagram app.
9. Repeat privacy and performance checks after adding real photographs and hosting. No live domain, DNS/CDN path or field INP was verified.

The legal checklist covers Tunisian laws 2004-63, 2000-83 and 92-117, plus GDPR applicability assessment. It is a checklist for a lawyer, not legal advice. No testimonial, review, team, case study, price, stock level or unsupported manufacturing claim was invented.

## Handover

Start with README.md. Supporting documents: claims-to-confirm.md, photos.md, deployment.md, analytics.md, third-parties.md and keyboard-review.md.

The original skill allowlist was respected; repositories and commits remain in skill-installation-record.json. Impeccable was not cleared under the requested source-review policy, and the named curated OpenAI frontend-skill was absent. The supplied design checklist was used instead. No additional plugin or MCP server was installed.
