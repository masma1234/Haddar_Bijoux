# Release readiness (11 November 2026)

Branch `chore/final-audit-cleanup`. Performance numbers: `PERFORMANCE-FINAL.md`. Owner questions: `OWNER-DECISIONS.md`. Earlier audit: `FINAL-REPOSITORY-AUDIT.md`.

## Decisions

| | Decision | Why |
|---|---|---|
| **Staging** | **GO, once preview access is restricted** | Every technical gate passes locally and in Cloudflare's local Pages runtime. No remote staging exists yet: this machine is not signed in to Cloudflare. Enable the Access policy on previews before the first deploy. |
| **Production** | **NO-GO** | 17 owner facts are unconfirmed, so the production build stops itself. Photo and illustration publication rights, the Instagram handle and the domain are also open. |

## Gates

| Gate | Status | Evidence |
|---|---|---|
| Clean-clone build (fresh `git clone`, `pnpm install --frozen-lockfile`, `pnpm build`) | VERIFIED | Built 8 routes. CSP: 9 inline-script hashes, 0 missing, 0 stale. `src/data/security-headers.json` (used by `functions/_middleware.ts`) carries the same CSP as `dist/_headers`. |
| Type check | VERIFIED | `astro check`: 0 errors, 0 warnings |
| Visual regression | VERIFIED | 7 views, 0.000% difference. This proves stability only, not quality. |
| Design inspection, FR and AR at 320, 375, 768, 1024, 1440 | VERIFIED, one defect fixed | Between 760 and 999px the AI illustration cards (338px) were larger than the real photo plates (311px). Now 161px against 311px. A tablet baseline (`fr-768-band`) guards it. |
| Browser suite: overflow at 11 widths, axe WCAG 2.2 AA, touch targets, no-JS, slow network, 404s | VERIFIED | 0 errors |
| Keyboard, privacy (no third-party requests, cookies or storage), contrast, image integrity, routing middleware, build guards | VERIFIED | All pass |
| Cloudflare Pages runtime, local (`wrangler pages dev`, 4.153.0) on a staging build | VERIFIED locally | `scripts/verify-deployment.mjs`: 83 of 83 checks. Static and Function responses were tested separately. |
| Remote staging on Cloudflare | NOT TESTED | No Cloudflare sign-in on this machine |
| Real devices, screen readers, field INP | NOT TESTED | Desktop Chrome emulation only |
| Production dependencies | VERIFIED | `pnpm audit --prod`: 0 known vulnerabilities |
| Dev dependencies | PARTIAL | 7 advisories (5 high), all under `@lhci/cli` 0.15.1. A trial of 0.16.0 in a scratch clone leaves 1 (`basic-ftp`, no compatible fix). Not applied: it replaces Lighthouse 12 with 13 and would change the measuring tool mid-release. Do it on its own branch. |
| GitHub | PARTIAL | Default branch is `design/white-gold-redesign`; there is no `main`. No CI workflows, no check runs, no pull requests. The repository is public. |

## Design verdict

Coherent and distinctive: a white page, gold used only for thin frames and the button, real pieces first, the same layout mirrored in Arabic. Hierarchy, spacing and responsive behaviour hold at every tested width.

The ceiling is the photography, not the code. The photos are phone shots at most 1280px tall, shown upscaled about 1.4x on high-density screens, with neon cords, black boxes and a blue T-shirt in frame. An owner reshoot on a white or ivory ground is the only thing that lifts the site from "well made" to "luxury".

## Build targets

One script, three targets. The first line of the build log names the target.

| Target | How it is selected | Result |
|---|---|---|
| Local preview | `pnpm build` on a developer machine | Draft content, indexable headers (local only) |
| Staging | `pnpm build:staging`, or any build on Cloudflare Pages (`CF_PAGES=1`) without the production variable | Same draft content, plus `X-Robots-Tag: noindex, nofollow` on every static and Function response and `robots.txt` with `Disallow: /` |
| Production | `pnpm build:prod`, or `BUILD_TARGET=production` | Refuses to build while any `[CONFIRMER]` fact, legal approval, derja review or real domain is missing |

A Cloudflare build can never publish an indexable draft: without `BUILD_TARGET=production` it is staging, and with it the gate applies.

## Cloudflare Pages settings (from the current official docs)

| Setting | Value | Note |
|---|---|---|
| Build command | `pnpm build` | Pages has one command for all environments; the script picks the target from the environment |
| Output directory | `dist` | `functions/` at the root is picked up automatically |
| Node | `.node-version` in the repo (22.14.0) | The v3 build image reads this file |
| `PNPM_VERSION` | `12.11.2`, on Production and Preview | The image defaults to pnpm 10 and ignores `packageManager` and the lockfile version |
| `BUILD_TARGET` | `production`, on the **Production environment only** | Never set it on Preview |
| `PUBLIC_SITE_URL` | The confirmed `https://` domain, Production only | Without it the canonical URLs and sitemap use the `.invalid` placeholder, and the production gate fails |
| Production branch | Set it explicitly; Pages defaults to the first branch pushed | The GitHub default branch is `design/white-gold-redesign` |
| Automatic production deployments | **Off** until the owner approves | Settings > Builds & deployments |
| Preview branches | Custom: include `chore/*` and `design/*` only | |
| **Preview access** | **Settings > General > Enable access policy, before the first deploy** | Preview URLs are public by default. Cloudflare adds `noindex` to previews, but that does not restrict access. |

The Access policy covers preview deployments only. It does not cover the project's `*.pages.dev` production address or a custom domain; those need a separate Access application. So do not make a production deployment at all until launch.

## After the first protected preview deploy

Run `node scripts/verify-deployment.mjs <preview-url> --staging` from a signed-in session, then the Lighthouse scripts with `AUDIT_URL` set. Record the URL, the commit and the results in `STAGING-VERIFICATION.md`. That file does not exist yet because no staging deploy has happened.

## Rollback

- **Code:** nothing is merged. `design/white-gold-redesign` is untouched at `43011f6c`. To drop this work, close the pull request or delete the branch.
- **Cloudflare, once connected:** Deployments > pick the previous deployment > Rollback. Each deployment is immutable and keeps its own URL.
- **Staging switch:** remove `BUILD_TARGET` from an environment and its next build is a noindex staging build again.
