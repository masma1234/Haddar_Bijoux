# Codex implementation brief: Haddar Bijoux vitrine

You are Codex working INSIDE the EXISTING Haddar Bijoux repository. Your job is to IMPLEMENT, TEST, and REPORT a focused redesign, not merely produce a plan or mockup. The site is a small French/Arabic showcase for the Instagram account `@haddar_bijoux`: https://www.instagram.com/haddar_bijoux/. Browsing happens on Instagram; purchase inquiries go to https://ig.me/m/haddar_bijoux. Do not implement a shop, cart, checkout, or contact form.

## 0. Operating rules and instruction precedence

1. Read the repository's `AGENTS.md` and any nested `AGENTS.md` that apply BEFORE editing. Follow project instructions. Identify the real framework, routes, scripts, and deployment model. Do not assume Next.js, Astro, or Vite.
2. Inspect `git status`, the current branch, and recent commits. Protect all existing user changes: never reset, clean, force-push, overwrite unrelated work, or commit somebody else's uncommitted changes. If safe, make/use `fix/vitrine` and record a clean baseline commit. If the tree is dirty, keep the work reversible and explain the baseline limitation rather than committing unrelated changes.
3. Use the repository's package manager and established architecture. Avoid a framework migration, new third-party scripts, or unnecessary dependencies.
4. Preserve the locked color palette in `AGENTS.md`. `--gold-text: #7A5A2B` has been explicitly approved. The supplied palette swatch is a visual reference, NOT a screenshot of the broken live page, and is not permission to invent extra colors. If a contrast repair requires changing a locked palette color, STOP and request approval.
5. Do not invent testimonials, statistics, prices, guarantees, discounts, certifications, materials, hallmarks, addresses, legal identities, policies, or stock availability. The business is described by the owner as offering 18-carat gold jewelry; log that claim for owner confirmation without inferring a hallmark or purity certification. Any required but missing fact must be `NEEDS OWNER INPUT` in the gaps report. Use visible `[CONFIRMER]` only for REQUIRED unresolved information in development; fail production validation while such information remains. Optional fields may be omitted rather than filled with fake data.
6. No outside image generation, placeholder stock imagery, hotlinked Instagram pictures, hand-drawn/SVG jewelry, or fetching substitute assets. Do not edit the six source JPGs in place.
7. Discover installed skills before using them. If `web-quality-audit`, Impeccable (`critique`, `layout`, `typeset`, `polish`), or `webapp-testing` is available, read its `SKILL.md` and use it appropriately. If unavailable, use the project's existing tools plus Playwright, axe, and Lighthouse when possible, and explicitly report the skipped check. Do not pretend a tool ran.
8. Proceed autonomously within this brief. Ask only for a blocking safety conflict, a necessary palette change, deletion outside the agreed scope, a platform migration, or a domain/DNS change. For other missing facts, mark them and continue the safe portions of the build.

## 1. Image contract (MANDATORY, no substitutions)

Six REAL JPG FILES supplied with this task must be placed at these exact repository-relative paths:

```text
incoming/hero.jpg
incoming/bracelets.jpg
incoming/bracelets-personnalises.jpg
incoming/bracelets-assortis.jpg
incoming/boucles-oreilles.jpg
incoming/colliers.jpg
```

These are six distinct, AI-generated editorial illustrations of jewelry, supplied by the owner for use as illustrative website assets. They are NOT authenticated photographs of items currently sold. Each source is **1200x1200 (square)**. First check that each file exists, decodes, and has the expected dimensions; do not assume Codex can read the ChatGPT chat attachments unless the files have actually been copied into the repo. If a file is missing, display a minimal flat category frame in local development (no jewelry drawing), identify exactly which file is missing, and FAIL production asset validation. Never substitute a different image.

**Exact required image-to-component mapping:**

| Page location | Required source asset | Visible section/card | Link destination |
| --- | --- | --- | --- |
| Hero, right column | `incoming/hero.jpg` | Fine curved chain bracelet, alongside brand introduction | Hero CTA uses Instagram DM |
| Collection card 1 | `incoming/bracelets.jpg` | Bracelets / أساور | Instagram profile |
| Collection card 2 | `incoming/bracelets-personnalises.jpg` | Bracelets personnalisés / أساور على ذوقك | Instagram profile |
| Collection card 3 | `incoming/boucles-oreilles.jpg` | Boucles d'oreilles / خراص | Instagram profile |
| Collection card 4 | `incoming/colliers.jpg` | Colliers / سلاسل | Instagram profile |
| Sur mesure section, image column | `incoming/bracelets-assortis.jpg` | Two matching bracelets | Optional section CTA uses Instagram DM |

**Hard acceptance check:** all six images are used in these six placements on BOTH locales; no card reuses the hero, the matching bracelets image appears in Sur mesure rather than replacing a collection card, and the original source files remain untouched. The source collage or palette swatch must never be rendered as a product image.

Build a centralized, typed image manifest (for example `src/data/images.ts`, adjusted to the actual framework) containing stable `id`, original file, generated formats, intrinsic dimensions, FR alt, AR alt, `source: 'ai'`, `credit`, and `rights/status`. Suggested truthful alt texts:

- hero FR: `Bracelet à chaîne dorée délicate, visuel généré pour illustration`; AR: `سوار بسلسلة ذهبية رقيقة، صورة توضيحية مولّدة`
- bracelets FR: `Bracelet à maillons ovales dorés, visuel d'illustration`; AR: `سوار بروابط بيضاوية ذهبية، صورة توضيحية`
- bracelets-personnalises FR: `Bracelet doré avec barrette rectangulaire sans gravure, visuel d'illustration`; AR: `سوار ذهبي بلوحة مستطيلة من غير نقش، صورة توضيحية`
- bracelets-assortis FR: `Deux bracelets dorés assortis, visuel d'illustration`; AR: `زوز أساور ذهبية متناسقة، صورة توضيحية`
- boucles-oreilles FR: `Paire de petites créoles dorées, visuel d'illustration`; AR: `زوج خراص مدوّرة ذهبية، صورة توضيحية`
- colliers FR: `Collier à chaîne fine et pendentif rond doré, visuel d'illustration`; AR: `سلسلة رقيقة بقلادة مدوّرة ذهبية، صورة توضيحية`

These descriptions concern the VISUAL only, not proof of the material or availability of the illustrated model. Record in `IMAGE-CREDITS.md`: filenames, AI-generated illustrative origin, received from project owner via ChatGPT, no claim that these are inventory photos, and `rights: owner review required` unless usage rights have been independently established. Never fabricate a photographer, brand license, or external source.

**Aspect-ratio requirement:** the supplied pictures are square while the website's image FRAMES are 3:4 portrait. Use a 3:4 frame with `object-fit: contain` and a neutral approved background by default, or create lossless/sensible padded portrait derivatives using only the original imagery. Never blindly apply `object-fit: cover` if it clips a chain, clasp, pendant, or earring. Inspect each image at 375, 768, and 1440 px. If a verified safe crop works for a particular image, document its focal position. Do not stretch the square image into 3:4.

Generate optimized AVIF and WebP variants WITH the original JPG as fallback using existing repository tooling (or a small local image-processing utility). Create a responsive `<picture>` or framework equivalent with `srcset`, meaningful `sizes`, `width`/`height`, and reserved frame aspect ratio. HERO only: `loading="eager"`, `fetchpriority="high"`, and a correctly matched preload if beneficial. All other photos: `loading="lazy"`, `decoding="async"`. Avoid a preload that causes duplicate downloads. Do not load six 1200 px JPGs at mobile card size. Keep derivative names deterministic.

## 2. Phase 1: read and measure BEFORE editing

Inventory real routes and locales, rendering mode (static/SSR/SPA), components, public assets, CSS variables, images, fonts, scripts, forms, analytics, embeds, cookies/storage, network requests, sitemap, robots, metadata, and deployed-host constraints. Use the app itself to identify actual problems; do not mistake the supplied color-swatch image for a site screenshot.

Run the existing project. Capture baseline screenshots at widths 375, 768, and 1440 into `docs/screens/before/` when a runnable environment exists. Test JS-disabled rendering. On each available route, attempt mobile and desktop Lighthouse plus one slow-network profile. Capture LCP, CLS, TBT, JS transfer, image transfer, request count, and note test conditions. INP cannot be reliably measured from a single local Lighthouse lab run; never present TBT as measured INP. Run available skill audits and write `AUDIT-BEFORE.md` with Pass/Partial/Fail/N-A and specific evidence. If some checks cannot run, write `NOT RUN` with the exact reason and continue.

## 3. Phase 2: implement the focused vitrine

Preserve working infrastructure, routing, translation setup, build pipeline, SEO facilities, and any legitimate existing owner assets. Remove from the site interface only the explicitly out-of-scope sections (case studies, team, testimonials, counters, FAQ, dark mode toggle, forms, map, checkout, thank-you page, and unneeded policy pages). Before deleting an existing route or file, check imports/inbound links and preserve unrelated project data. Keep one landing page per locale, a single French legal/privacy page `/mentions-legales`, and a branded real-404 experience. Keep the existing locale structure where compatible, preferably `/` and `/ar/`. Arabic legal content is not published pending a qualified review.

### Required site hierarchy and appearance

- **Visual direction:** ivory and white dominate. Gold is used for fine details and primary CTAs, never large tan backgrounds or full-screen gold panels. Spacious, restrained luxury editorial art direction; one distinctive typographic gesture only. Use precisely the colors allowed by `AGENTS.md`. No gradients, glow, loud animation, fake jewelry vector drawings, giant numbers, decorative arrows, arbitrary captions, or staggered product cards.
- **Header:** 64px tall, fixed or sticky as verified appropriate, opaque `--bg` background, fine `--line` bottom border; `Haddar Bijoux` wordmark; FR / عربي locale switch; Instagram profile link; in-page links to Collection, Sur mesure, Commander. Make mobile navigation compact and keyboard operable without overflow.
- **Hero:** desktop two columns, text LEFT, required `hero.jpg` RIGHT in a 3:4 visual frame with height capped around `80svh`; text vertically centered. H1 `Haddar Bijoux`, ideally Italiana if a licensed, self-hostable font asset is available, otherwise a visually similar existing local fallback and document the deviation. Desktop H1 roughly 4-5rem with responsive clamp; under it the short 18-carat line, a single description, and two clear CTAs. Mobile order: H1, description, BOTH buttons, THEN hero image. Primary CTA must be visible without scrolling at 375x667 AND 1440x900. Header must not obscure anchors.
- **Collection `#collection`:** exactly FOUR equal aligned cards in this order: Bracelets, Bracelets personnalisés, Boucles d'oreilles, Colliers. 4 columns desktop, 2x2 at mobile widths where feasible, approximately 24px gap desktop. Each has a 3:4 media frame containing its EXACT mapped source, title and a modest factual/non-misleading descriptor. Entire card = one semantic link to Instagram PROFILE. No card numbering, oversized arrows, or mock pricing. Beneath the grid, print the supplied illustration disclaimer (localized) in subtle text.
- **Sur mesure `#sur-mesure`:** restrained `--panel` band, two columns where space permits, title, owner-provided copy and three steps on one side; REQUIRED `bracelets-assortis.jpg` on the other. Keep two-bracelet image visibly distinct from the four cards. Do not claim customization details that are not owner-confirmed.
- **Commander `#commander`:** simple centered title, one line, one strong DM button, and always-LTR `@haddar_bijoux`. No form, embed, or shopping cart.
- **Mobile sticky CTA:** one action button, no taller than 56px plus device safe-area; hidden on desktop; automatically hides when Commander is visible and must not cover content, keyboard focus, or footer/legal links. Minimize JS and disable nonessential animation for reduced motion.
- **Footer:** wordmark, `/mentions-legales` link, neutral copyright. Display no unsupported business details.
- **Buttons:** rectangular 0-2px corner radius. Primary: approved gold fill with ink text; hover: `--gold-text` fill with ivory text ONLY if contrast checker verifies the combinations. Secondary: thin ink border and obvious focus. All tap targets at least 44x44 CSS pixels.

Keep the complete existing copy below in typed FR and Tunisian derja dictionaries, not scattered literal strings in components. Keep `dir="rtl"` for Arabic page, but preserve Latin handle, URLs and numerals in LTR runs. If a full exact translation has not been provided for a minor UI label, use a neutral explicit `TRANSLATION REVIEW` note in development rather than inventing idiomatic business copy. Plan native review before launch.

**French text**

- Hero line: `Bijoux en or 18 carats`
- Hero sentence: `Bracelets, boucles d'oreilles et colliers. Toutes les pièces sont sur Instagram, les commandes se font par message privé.`
- Hero CTAs: `Commander sur Instagram` -> DM; `Voir la collection` -> `#collection`
- Header nav: `Collection` / `Sur mesure` / `Commander`
- Collection: `Bracelets` / `Classiques`; `Bracelets personnalisés` / `Sur demande`; `Boucles d'oreilles`; `Colliers`. For the last two, do not fabricate extra product properties just to fill a layout; an unobtrusive generic exploration cue or no descriptor is acceptable if alignment is preserved.
- Disclaimer: `Visuels d'illustration. Les pièces réelles sont sur Instagram.`
- Sur mesure title: `Personnalisé ou assorti`
- Sur mesure description: `Un bracelet à votre goût, ou deux bracelets assortis pour offrir. Écrivez-nous en message privé, nous confirmons le modèle, le prix et le délai avant la commande.`
- Steps: `Choisissez` / `Écrivez-nous` / `Confirmez`
- Commander: title `Commander`; sentence `Toutes les pièces et les nouveautés sont sur Instagram.`; CTA `Écrire sur Instagram` -> DM.

**Tunisian Arabic / derja (flag for native review)**

- Hero line: `مجوهرات من الدهب عيار 18`
- Hero sentence: `أساور، خراص وسلاسل. القطع كل على إنستغرام والطلبيات تتعمل في ميساج.`
- Hero CTAs: `اطلبوا على إنستغرام` -> DM; `شوفوا المجموعة` -> `#collection`
- Header nav: `المجموعة` / `على ذوقك` / `اطلبوا`
- Collection: `أساور` / `كلاسيك`; `أساور على ذوقك` / `على الطلب`; `خراص`; `سلاسل`
- Disclaimer: `صور للتوضيح. القطع الحقيقية تلقاوها على إنستغرام.`
- Sur mesure title: `على ذوقك ولا متناسقة`
- Sur mesure description: `سوار على ذوقك، ولا زوز أساور متناسقين تهدوهم. ابعثولنا ميساج ونأكدوا معاكم الموديل والثمن والوقت قبل الطلب.`
- Steps: `اختاروا` / `اكتبولنا` / `أكدوا`
- Commander: title `اطلبوا`; sentence `القطع والجديد كل على إنستغرام.`; CTA `ابعثوا ميساج على إنستغرام` -> DM.

Prohibit the em dash character in user-visible copy, metadata, JSON-LD, and alt text. Make a concise `DESIGN-NOTES.md` describing visual direction, fonts/fallbacks, responsive type and spacing scale, corner radii, token mapping, and image framing. Only add animations if they never hide primary content and respect `prefers-reduced-motion`.

### Correct link behavior

Use normal `<a href>` anchors, not JS pseudo-links:
- All primary order buttons: `https://ig.me/m/haddar_bijoux`
- Header Instagram link and all four collection cards: `https://www.instagram.com/haddar_bijoux/`
- Hero secondary: local `#collection` anchor
- Internal locale links: matching language landing route and as much section context as feasible
- Footer legal link: `/mentions-legales` (French draft)

If using `target="_blank"`, also set `rel="noopener noreferrer"`. Never imply an Instagram deep link is guaranteed to work in every browser; graceful normal link navigation is sufficient.

## 4. Legal, privacy, accessibility, SEO, and performance

**Truth/owner data.** Make `src/data/business.ts` (or equivalent typed module for the actual framework) the single source for confirmed business details. Required unknown legal fields are unresolved owner inputs, not invented values. Keep `docs/claims-to-confirm.md` listing the 18-carat statement, customization promises, legal identity and jurisdiction, terms, contact options, and anything implied by the copy. Site is described as Instagram-only; do not display real products, verified gold purity, pricing, or delivery policies unless supplied.

**Privacy.** Implement without analytics, trackers, third-party embeds, remote runtime fonts, or hotlinked media. Create a Playwright-powered `scripts/audit-privacy.mjs` or equivalent to check initial-page loads for: no third-party network requests, no JS-created cookies, empty localStorage and sessionStorage, on all routes and both locales. Differentiate legitimate outgoing clicks from initial-page requests. Do not claim cookie-free until tests pass. No cookie banner is needed ONLY if the implemented site truly has no nonessential tracking. Do not add Google Analytics unless an owner ID and explicit consent requirements are separately supplied.

**Legal page.** Make `/mentions-legales` a visible, clearly marked French draft, sourcing legal fields from business data only. Jurisdiction Tunisia is an UNCONFIRMED working assumption, not a settled legal conclusion. If browsing official Tunisian sources is available, cite exact official resources with access dates in `docs/legal-notes.md`; if not, mark legal research unfinished and do not invent legal citations. Legal copy needs review by a qualified professional before publication. Do not ship an unreviewed Arabic legal translation.

**Accessibility.** Aim at WCAG 2.2 AA. Verify at least 4.5:1 normal text, 3:1 large text and functional visual boundaries, 2px visible focus style with sufficient contrast, keyboard-only interaction, skip link, alt text, one H1, meaningful landmarks, headings in order, RTL/LTR correctness, 200% zoom and no focus traps. The `--gold-text`/ivory hover pair must PASS computed contrast or be flagged for owner-approved palette modification.

**SEO/rendering.** Prefer full static prerender/SSG if the existing stack can support it WITHOUT a migration. On every indexable route, real content and links must be visible in raw HTML with JavaScript off. Verify by fetching actual HTML and capturing JS-disabled pages. Use unique titles/descriptions, canonicals, hreflang `fr`, `ar`, `x-default`, robots, sitemap (real canonical URLs only), and Open Graph/Twitter metadata. Keep base URL in `SITE_URL`; do not silently choose/change a production domain. Derive a 1200x630 OG image from supplied source artwork by safe crop/padding (no unrelated generated art or invented product claims). `Organization` schema must reflect only confirmed facts. `JewelryStore` schema only with a verified public store address. Give the 404 route an actual HTTP 404 response whenever host/framework permits; clearly flag a host that always rewrites unknown routes to 200.

**Performance.** Responsive AVIF/WebP/JPG image delivery, correct intrinsic dimensions, no LCP lazy loading, efficient hero prioritization, self-hosted WOFF2 fonts if used, Arabic font code/assets only on AR as practical, `font-display: swap`, minimal JS (goal under 20KB gzipped) and immutable caching for hashed assets when host permits. Reserve layout space. Measure LCP <=2.5s, CLS <=0.1 (aim <=0.02), Lighthouse mobile >=95 per category, and field INP <=200ms when genuine field data exists. These are targets, NOT fabricated test results or universal release guarantees.

**Viewport testing.** At 320, 360, 375, 390, 412, 768, 1024, 1280, and 1440px, check both directions and relevant portrait/landscape layouts. No horizontal overflow, clipping, hidden CTAs, oversized gold blocks, or card staggering. Test 375x667 and 1440x900 above-fold primary CTA explicitly.

## 5. Verification and deliverables

Implement the following in a way compatible with the actual build system:

- `scripts/check-palette.mjs`: collect actual color declarations used in CSS, HTML inline styles and authored SVGs, normalize equivalent syntax, and fail on any COLOR TOKEN not in the exact approved `AGENTS.md` palette. Ignore photographic pixel colors and SVG geometry with no color. Do not add a new color merely to satisfy accessibility; report blocked contrast issue.
- Asset verification script or test: confirm existence, decoding and image dimensions for all six `incoming/*.jpg`; fail if any mapping is wrong, any picture is external, or a file is unused. Check expected rendered source at all six placements on each locale and portrait framing without jewelry clipping.
- Build-time owner-placeholder detection: fail production build if unresolved `[CONFIRMER]` required fields or `SITE_URL`-dependent canonical outputs are being published unsafely. Do not fail simply because an optional nullable field is absent.
- Automated scans for the em dash character in site copy/metadata, unapproved `gradient(` styles, decorative fake numbers, placeholder copy, oversized pill buttons, unknown colors, external embeds, and unsupported claims.
- Playwright (or existing equivalent): main route FR/AR, legal page, 404 status where possible, links, metadata, hreflang, images, privacy, keyboard navigation, and responsive screenshots. Run axe where available, and perform a manual keyboard pass.
- Rerun supported baseline measurements on matching environments. Put screenshots in `docs/screens/after/`, `AUDIT-AFTER.md` with before/after metrics and evidence, `IMAGE-CREDITS.md`, `DESIGN-NOTES.md`, `docs/claims-to-confirm.md`, and `docs/legal-notes.md`. Do not claim a screenshot or benchmark exists if its tool failed.

**Final response format:** Lead with `OPEN GAPS: ...` if any unresolved blockers exist, otherwise `NO OPEN GAPS VERIFIED`. Then give: `Summary | Files changed | Exact six-image placement audit | Before/after metrics (measured only) | Tests run and failures | Skills used or unavailable | NEEDS OWNER INPUT | Limitations`. Mark each major checklist category `Verified`, `Partial`, `Not done`, or `Not applicable` with a reason. Distinguish implementation completion from actual deployment.

**Do the work in the repository now.** Do not stop after a plan. Do not mark the project complete merely because it builds; verify the visual image mapping, responsive layouts, accessibility, privacy, and production build constraints.
