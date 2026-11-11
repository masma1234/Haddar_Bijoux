# Haddar Bijoux

A static Astro showcase in French and Tunisian derja. Contact, orders, payment and delivery discussion go through @haddar_bijoux. The studio is at Rue laadoul, Sfax 3000. No checkout, account, analytics, cookie banner or form.

## Local use

Node 22.12 or newer is required. Dependencies are pinned with pnpm 12.11.2. If pnpm is not on your PATH, replace pnpm below with npx --yes pnpm@12.11.2.

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

The dev server is http://127.0.0.1:4321. For audits of the built output, stop dev and run pnpm preview in another terminal.

```sh
pnpm check
pnpm audit:prerender
pnpm audit:contrast
pnpm audit:privacy
pnpm audit:browser
pnpm audit:budgets
pnpm audit:lighthouse before
pnpm audit:lighthouse after
node scripts/check-image-contract.mjs   (with --experimental-strip-types)
node scripts/screens.mjs after          (preview server running)
node scripts/visual-regression.mjs      (add --update to approve new baselines)
node scripts/lighthouse-variance.mjs cookies/ 5 mobile
```

Lab scores vary between runs on a busy machine. `pnpm audit:lighthouse after --runs=3` keeps the median of three runs per route. Set `AUDIT_URL` when the preview server is not on port 4321.

Audit scripts use locally installed Google Chrome. Set CHROME_PATH for the Lighthouse runner if needed. Playwright uses its chrome channel. Chrome is a development prerequisite, not a shipped dependency. Lighthouse raw reports and screenshots are saved under .audit; concise evidence is under docs.

## Main files

```text
src/
  data/business.ts           confirmed facts and launch gates
  i18n/fr.ts, ar.ts          typed interface dictionaries
  i18n/legal.ts             French legal templates using business facts
  data/images.ts            image manifest: crops, alt text, captions, credits
  (incoming/ at the root holds the untouched owner originals)
  components/               reusable static page sections
  layouts/Base.astro        metadata, local fonts, header and footer
  pages/                    eight prerendered routes
  styles/global.css         supplied palette, RTL and responsive layout
public/                     generated fonts, icons, share cards, headers
functions/_middleware.ts    static 404 selection and www redirect
scripts/                    build and repeatable audits
docs/                       design, claims, review and audit records
```

Read [the project rules](CLAUDE.md), [final repository audit](FINAL-REPOSITORY-AUDIT.md), [claims register](docs/claims-to-confirm.md), [photo workflow](docs/photos.md), [owner decisions](OWNER-DECISIONS.md) and [deployment guide](docs/deployment.md).

## Production gate

Copy .env.example to .env and supply the client-owned HTTPS apex domain. Keep ENABLE_CONTACT_FORM=false. Edit only confirmed facts in business.ts, resolve French legal review and native derja review, then run pnpm build:prod. It intentionally fails while required facts or approval markers remain. Preview builds warn.

The latest available Astro version at setup was 7.3.8. TypeScript 6.0.3 is pinned because the installed Astro checker explicitly rejects TypeScript 7. Dependencies beyond Astro, sitemap and Fontsource are development tools: Astro check/TypeScript for validation, sharp for local brand assets, Playwright/axe for browser audits and LHCI for Lighthouse. No frontend UI library is shipped.

The approved skills are project-local in .agents/skills; their installation record and licence sit beside them in .agents/. Superseded October documents are in docs/archive/. Impeccable and the unavailable curated frontend-skill were not installed. No additional plugin or MCP server was added.
