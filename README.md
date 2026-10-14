# Haddar Bijoux

A static Astro showcase in French and Tunisian derja. Contact, orders, payment and delivery discussion go through @haddar__bijoux. No checkout, account, analytics, cookie banner or form.

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
```

Audit scripts use locally installed Google Chrome. Set CHROME_PATH for the Lighthouse runner if needed. Playwright uses its chrome channel. Chrome is a development prerequisite, not a shipped dependency. Lighthouse raw reports and screenshots are saved under .audit; concise evidence is under docs.

## Main files

```text
src/
  data/business.ts           confirmed facts and launch gates
  i18n/fr.ts, ar.ts          typed interface dictionaries
  i18n/legal.ts             French legal templates using business facts
  content/products/*.json   bilingual catalogue and photo permissions
  assets/products/          client-supplied photos
  components/               reusable static page sections
  layouts/Base.astro        metadata, local fonts, header and footer
  pages/                    eight prerendered routes
  styles/global.css         supplied palette, RTL and responsive layout
public/                     generated fonts, icons, share cards, headers
functions/_middleware.ts    static 404 selection and www redirect
scripts/                    build and repeatable audits
docs/                       design, claims, review and audit records
```

Read [the design brief](docs/design-brief.md), [claims register](docs/claims-to-confirm.md), [photo workflow](docs/photos.md), [launch report](docs/launch-report.md) and [deployment guide](docs/deployment.md).

## Production gate

Copy .env.example to .env and supply the client-owned HTTPS apex domain. Keep ENABLE_CONTACT_FORM=false. Edit only confirmed facts in business.ts, resolve French legal review and native derja review, then run pnpm build:prod. It intentionally fails while required facts or approval markers remain. Preview builds warn.

The latest available Astro version at setup was 7.3.8. TypeScript 6.0.3 is pinned because the installed Astro checker explicitly rejects TypeScript 7. Dependencies beyond Astro, sitemap and Fontsource are development tools: Astro check/TypeScript for validation, sharp for local brand assets, Playwright/axe for browser audits and LHCI for Lighthouse. No frontend UI library is shipped.

The approved skills are project-local in .agents/skills. The skill installation record is retained. Impeccable and the unavailable curated frontend-skill were not installed. No additional plugin or MCP server was added.
