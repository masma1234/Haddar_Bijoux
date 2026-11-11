# Final repository audit (11 November 2026)

Scope: the whole repository at branch `design/white-gold-redesign`, after the redesign and two earlier cleanups. No design or business behaviour was changed.

## Findings and fixes

| Finding | Fix |
|---|---|
| Audit scripts write reports and screenshots into `docs/` (`*-report.md/json`, `budgets.json`, `keyboard-interactions.json`, `perf/`, `screens/`). The earlier cleanup removed those files from Git, but every build and audit recreated them as untracked files. | Added them to `.gitignore`. They are generated output; regenerate with the `audit:*` and `test:*` scripts. |
| Five documents and two scripts pointed at files removed earlier (`DESIGN.md`, `IMAGE-AUDIT.md`, `privacy-report.md`, `reference/haddar-palette.html`). | References now point at files that exist (`CLAUDE.md`, `IMAGE-CREDITS.md`, `src/data/images.ts`) or at the command that produces the report. |
| Nothing else: no CSS class, dictionary key, icon or component is unused; no broken internal link or asset; `astro check` reports 0 errors and 0 warnings. | None needed. |

Retained on purpose: the 15 originals in `incoming/` (checksummed on every run), the generated derivatives in `public/incoming/` (the build needs them), `docs/archive/` (provenance), `.agents/` (vendored skills with licence), `docs/visual-baseline/` (regression baselines, largest file 1.2 MB).

Left untouched and untracked: `.vscode/` and one local HTML export dated 8 October in the project folder (not part of the project history).

## Security

| Check | Result |
|---|---|
| Secret scan of tracked files (keys, tokens, private keys, passwords) | Clean. Matches were the words "design token" only. |
| Machine paths or personal email in tracked files | None |
| `.env` files | Only `.env.example` (placeholder domain); `.env*` ignored |
| Production dependencies (`pnpm audit --prod`) | 0 known vulnerabilities |
| All dependencies | 7 remain (5 high, 1 moderate, 1 low), all in dev tools (`@lhci/cli` chain: tmp, extract-zip, basic-ftp, zod, uuid). They need major upgrades or have no fix, and never ship to visitors. |
| External links in built pages | Only `instagram.com/haddar_bijoux` and `ig.me/m/haddar_bijoux`; no `target="_blank"`; no third-party requests (privacy audit, 8 routes) |
| Security headers and Cloudflare routing | Unchanged since the verified local Pages rehearsal (docs/deployment.md) |

## Verification (this audit, on the final tree)

| Check | Result |
|---|---|
| Build and prerender checks, 8 routes; JS 257 B and CSS 6.5 KB gzip | Pass |
| `astro check` | 0 errors, 0 warnings |
| Visual regression, 6 views (FR and AR, phone and desktop) | Pass, 0.000% difference from baseline |
| Browser suite (overflow, axe WCAG 2.2 AA, touch targets, no-JS, slow network, 404s) | Pass, 0 errors |
| Keyboard, privacy, contrast, image contract, routing middleware | Pass |
| Build guards (5 rejection cases) | Pass |
| Production build (`--prod`) | Fails as designed: 17 owner facts unconfirmed. Expected guard, not a defect. |
| Real devices, live Cloudflare deployment, field performance | Not tested |

There is no linter configured in this project; none was added.

## Distribution note

The nine owner photographs and six AI illustrations in `incoming/` are published with the repository. The owner supplied them for the website; whether the owner also agrees to a public repository holding the originals is listed in OWNER-DECISIONS.md. The GitHub repository is public today (it answers without sign-in), so the originals are already publicly downloadable. Make it private if the owner has not agreed.
