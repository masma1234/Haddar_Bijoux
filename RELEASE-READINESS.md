# Release readiness (11 November 2026)

Branch: `chore/final-audit-cleanup`
Base verified: `abe27a72`
Target branch: `design/white-gold-redesign`

## Verdicts

| Environment | Verdict | Reason |
|---|---|---|
| **STAGING** | **NO-GO until protected** | Local gates pass, but no remote Cloudflare deployment has been made. A Pages preview is public by default, and preview noindex is not access control. |
| **PRODUCTION** | **NO-GO** | Production facts, legal approval, native derja review, image permissions, the owner domain, and Instagram confirmation remain unresolved. The production build correctly refuses to publish. |

No Cloudflare deployment, domain change, visibility change, merge, or secret transfer was performed.

## Initial deployment safety procedure

Cloudflare's [Git integration documentation](https://developers.cloudflare.com/pages/configuration/git-integration/) says that connecting a repository automatically creates previews and deploys pushes. Its [preview deployment documentation](https://developers.cloudflare.com/pages/configuration/preview-deployments/) says previews are public by default, adds `X-Robots-Tag: noindex`, and explicitly notes that the preview access policy does not protect the project `*.pages.dev` domain or custom domains.

Before connecting this repository:

1. In the client-owned Cloudflare account, create a separate Pages project for staging. Do not attach the production custom domain.
2. Set automatic production deployments to off, and set the production branch deliberately. Restrict preview branches to `chore/*` and `design/*`.
3. Use a harmless placeholder first deployment. The placeholder must contain only a static `STAGING PLACEHOLDER` page, with no Haddar text, legal pages, owner photographs, illustrations, sitemap, or analytics. This can be a temporary protected branch or a separate client-owned placeholder repository.
4. Before uploading any Haddar build, enable **Settings > General > Enable access policy** for Pages previews.
5. Add a Cloudflare Access self-hosted application for every hostname that can serve the project: the preview aliases, the project `*.pages.dev` hostname, and any staging custom hostname. Use an allow policy for named tester identities only. Cloudflare's [Access web application documentation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/) describes this identity-aware proxy.
6. Verify an unauthenticated request is blocked on each hostname, then verify an authenticated tester request. Do not proceed if any hostname returns staging HTML without authentication.
7. Deploy the noindex staging build only after those checks pass. Never set `BUILD_TARGET=production` in Preview. Keep `BUILD_TARGET=production` and the confirmed `PUBLIC_SITE_URL` restricted to the Production environment.
8. Keep automatic production deployment disabled until the owner approves the production checklist. Production requires a separate Access decision or an explicit approved public launch.

The harmless placeholder is the first deployment safety boundary. It prevents an accidental Pages `*.pages.dev` publication from exposing unapproved content while Access policies are being configured.

## Protected staging verification

`scripts/verify-deployment.mjs` retains the existing HTTP, headers, cache, localized 404, robots, sitemap, image, browser, language-switch, CSP, privacy, and Instagram-link checks. For an Access-protected preview it now:

- requires `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET` from the process environment;
- checks the same origin without credentials and fails unless it is blocked;
- checks the origin with Cloudflare Access service-token headers;
- runs the browser checks with those headers in a Playwright context;
- never prints credential values.

Run only from a secure shell or CI secret store:

```powershell
$env:CF_ACCESS_CLIENT_ID = "<service-token-client-id>"
$env:CF_ACCESS_CLIENT_SECRET = "<service-token-client-secret>"
node scripts/verify-deployment.mjs https://<protected-preview-host> --staging --protected
```

The command fails clearly when either variable is absent, rejected, or when the unauthenticated request receives the staging page. Do not put these values in `.env`, GitHub logs, a commit, or this report.

## Local and CI results

The local baseline at `abe27a72` reported:

- clean dependency install and staging build: verified;
- TypeScript and Astro check: 0 errors, 0 warnings;
- build guards, routing, privacy, image integrity, browser, WCAG axe, keyboard, and responsive checks: verified;
- local Cloudflare Pages runtime: 83 of 83 checks;
- production dependency audit: 0 known vulnerabilities;
- development dependency audit: 7 advisories, including 5 high, all in the pinned Lighthouse CI toolchain. This is retained as a separate non-production finding and is not silently treated as a production defect.

This branch adds `.github/workflows/ci.yml`. The workflow uses Node from `.node-version` and pnpm `12.11.2`, installs with `--frozen-lockfile`, builds staging, runs all repository guards and browser checks, and runs production and development dependency audits separately. It requires no Cloudflare credentials for pull requests. GitHub Actions passed for commit `d3af5e39` in [run 43032662468](https://github.com/masma1234/Haddar_Bijoux/actions/runs/43032662468).

## Final regression and typography check

The approved white-and-gold design, French layout, Arabic RTL layout, supplied images, and existing performance budgets were not redesigned or replaced. The existing Arabic mobile measurement is approximately 2.48 seconds. The generated Arabic font CSS already uses self-hosted Arabic subsets, `font-display: swap`, and a fallback stack; Amiri is intentionally not preloaded because it is below the fold. No additional subsetting or preload was applied because it risks missing Arabic glyphs and would optimize a lab number rather than the approved typography.

## Unresolved owner decisions

- Confirm the legal text and French legal approval.
- Obtain native derja review.
- Confirm publication rights and credits for every supplied owner photograph and illustration.
- Confirm the Instagram handle and owner-controlled domain.
- Decide whether the staging hostname may be shared with named testers.
- Confirm Cloudflare account, billing, recovery, Access identity, and domain ownership.
- Decide when production may become public.

## Exact next steps for Cloudflare

1. Owner creates or confirms the client-owned Cloudflare account, Pages project, domain zone, and Access identity policy.
2. Owner confirms the placeholder deployment plan and named testers.
3. Configure Pages build command `pnpm build`, output `dist`, Node `.node-version`, and pnpm `12.11.2`.
4. Turn off automatic production deployments. Configure Preview without `BUILD_TARGET=production`.
5. Deploy the harmless placeholder, configure Access for previews, `*.pages.dev`, and staging custom hostnames, then verify unauthorized and authorized requests.
6. Push this branch and wait for the GitHub CI check to pass.
7. Deploy the noindex Haddar staging build only after Access verification, then run `verify-deployment.mjs --staging --protected` and record the real URL, commit, and output privately.
8. Resolve every owner decision, run `pnpm build:prod`, review the production artifact, and obtain explicit launch approval.
9. Only after approval, configure the production branch, confirmed `PUBLIC_SITE_URL`, custom domain, DNS, HTTPS, and the production Access/public exposure decision.

## Release references

- Branch: `chore/final-audit-cleanup`
- Verified base commit: `abe27a72`
- Pushed commits: `d884d836`, `d3af5e39`
- Draft pull request link: [compare and open a draft PR](https://github.com/masma1234/Haddar_Bijoux/compare/design/white-gold-redesign...chore/final-audit-cleanup?expand=1)
- Remote staging: not tested
