# Release readiness (11 November 2026)

Branch: `chore/final-audit-cleanup`
Base verified: `abe27a72`
Previous head: `af1913b7`
Target branch: `design/white-gold-redesign`

## Verdicts

| Environment | Verdict | Reason |
|---|---|---|
| **STAGING** | **READY FOR PROTECTED SETUP, NOT DEPLOYED. NO-GO to deploy until protection is verified on the real hostnames.** | Local gates, the protected-mode verifier and CI pass. No Cloudflare project exists. Access protection has only been proven against a local fake gate, never against Cloudflare. |
| **PRODUCTION** | **NO-GO** | Production facts, legal approval, native derja review, image permissions, the owner domain, and Instagram confirmation remain unresolved. The production build correctly refuses to publish. |

No Cloudflare deployment, domain change, visibility change, merge, or secret transfer was performed. No pull request exists yet (see Release references).

## Initial deployment safety procedure

Facts from Cloudflare's documentation, read on 11 November 2026:

- [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/): Cloudflare deploys automatically on every push to a branch, and previews are generated for any branch and for pull requests from the repository itself.
- [Branch build controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/): "Pages will default to setting your production environment to the branch you first push." The controls live under Settings > Builds, and the docs do not say they can be set while the project is being created. The defaults deploy on every commit to production and preview branches. Preview options are All non-Production branches, None, or Custom branches.
- [Preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/): the access policy "will only protect your preview deployments ... and not your *.pages.dev domain or custom domain". The docs name only the hash preview links and are silent about branch alias hostnames, so alias hostnames must be treated as unprotected until tested.
- [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/): a Direct Upload project can never be switched to Git integration, and the reverse is also true.
- [Service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/): a service token only works through a policy whose action is **Service Auth**. An Allow policy for named people does not admit a token. Strict service token mode (default for organizations created on or after 2026-10-05) answers 401 or 403. Otherwise Access redirects with 302 to a login page. `verify-deployment.mjs` accepts both.

Not read this session: the Pages [known issues](https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain) section on protecting `*.pages.dev` with Access. Read it before step 5.

Warning: `masma1234/Haddar_Bijoux` is a **public** GitHub repository (checked with the unauthenticated GitHub API). Its history already contains the owner photographs in `incoming/` and the unapproved legal drafts. Cloudflare Access does not change that. The owner must decide whether the repository becomes private before any real staging review. This session did not change visibility.

Procedure:

1. In the client-owned Cloudflare account, create a separate Pages project for staging. Do not attach the production custom domain.
2. Create an orphan branch in this repository, for example `staging-placeholder`, containing only a static page that says `STAGING PLACEHOLDER` (no Haddar text, legal pages, photographs, sitemap, or analytics). Push only that branch.
3. Connect the repository and choose `staging-placeholder` as the production branch. Because the first pushed branch defaults to production, and any later push builds a public preview, **push nothing else and open no pull request** until step 4 is done.
4. Immediately open Settings > Builds and set **Preview branches to None**. Leave `BUILD_TARGET=production` unset everywhere. Only the placeholder is reachable now.
5. Under Settings > General enable the Pages access policy for previews. In Cloudflare One, add self-hosted Access applications for `<project>.pages.dev`, `*.<project>.pages.dev` (verify the wildcard is accepted), and every staging custom hostname. Each needs two policies: an **Allow** policy for named tester identities only, and a **Service Auth** policy for one service token used by the verifier.
6. Run `node scripts/verify-deployment.mjs https://<placeholder-host> --protected --access-only --also-blocked=<other hostname>` for every hostname. `--access-only` runs only the Access checks (unauthenticated probes, made-up token, real token returns 200) and needs no Haddar content, so it works on the placeholder. Do not continue unless it exits 0. Exit 1 means Access is missing or the token is not accepted, and the message says which.
7. Set Preview branches to the narrow list `chore/*` and `design/*` (or keep None and deploy with Wrangler), then deploy the noindex staging build. Re-run the verifier on the real origin.
8. Keep production deployment tied to the placeholder branch until the owner approves the production checklist. Production needs a separate Access decision or an explicit approved public launch.

A Direct Upload project (deploying `dist/` with Wrangler and a scoped API token) avoids any Git window entirely, but it can never be switched to Git integration. Choose it only if the owner accepts that.

## Protected staging verification

`scripts/verify-deployment.mjs <origin> --staging --protected [--access-only] [--also-blocked=<other origin>]...` retains every existing check (83 on an unprotected local origin) and in protected mode:

- fails with exit code 2 and a clear message when `CF_ACCESS_CLIENT_ID` or `CF_ACCESS_CLIENT_SECRET` is missing;
- probes without credentials the home pages, a legal page, an owner photograph, the sitemap, the share card, a CSS file and a font, on the origin and on every `--also-blocked` origin. Blocked means 401, 403, or a 302 to `cloudflareaccess.com` or `/cdn-cgi/access/`, and a body that contains markup only the built site has (language link, collection card, Instagram link) is never accepted. The brand name alone is not used, because an Access login page may mention it;
- checks that a made-up service token is rejected;
- on any of those failures prints the results and a clear message, and exits 1 before any authenticated check runs;
- then checks the real token (a rejected token exits 1 with a hint about the Service Auth policy and token expiry) and runs all functional, header, cache, 404, robots, image, link, privacy and language-switch checks with the headers;
- loads a browser without credentials and requires that no staging content renders;
- sends the secret headers to the staging origin only (a Playwright route filter), never to other hosts, and never prints them.

Run only from a secure shell or CI secret store:

```powershell
$env:CF_ACCESS_CLIENT_ID = "<service-token-client-id>"
$env:CF_ACCESS_CLIENT_SECRET = "<service-token-client-secret>"
node scripts/verify-deployment.mjs https://<protected-host> --staging --protected --also-blocked=https://<other-host>
```

Local evidence (11 November 2026) against `scripts/access-gate-fixture.mjs`, a fake Access in front of the staging preview:

| Case | Result |
|---|---|
| No credentials in the environment | exit 2, clear message |
| Wrong secret | blocked checks pass, credentials check fails, exit 1, message names the status and the Service Auth policy |
| Right secret (302 mode and 403 strict mode) | 96 of 96 checks pass, exit 0, the secret appears nowhere in the output |
| `--access-only` with the right secret (both modes) | 10 of 10 pass, exit 0; against the unprotected origin exit 1 |
| `--protected` against the unprotected origin | every blocked check fails, "not protecting" message, exit 1 |
| Plain `--staging`, no gate | 83 of 83 checks pass |

This proves the verifier logic only. It does not prove that Cloudflare Access is configured correctly. The real hostnames still need the run in step 6 above.

## Local and CI results

The local baseline at `abe27a72` reported: clean install and staging build; Astro check 0 errors; build guards, routing, privacy, image integrity, browser, axe, keyboard and responsive checks verified; local Cloudflare Pages runtime 83 of 83; production dependency audit 0 vulnerabilities; development audit 7 advisories (5 high) in the pinned Lighthouse CI toolchain, kept as a separate non-production finding.

`.github/workflows/ci.yml` uses Node from `.node-version` (22.14.0) and pnpm `12.11.2`, installs with `--frozen-lockfile`, builds staging, and runs type check, build guards, image integrity, routing, privacy, browser and accessibility checks, the deployment verifier against the local preview, and the verifier against the fake Access gate (including two negative cases that must fail). It then runs production and development dependency audits separately. It needs no Cloudflare secrets and does not build production, so the expected legal guards are never treated as defects. Results: [run 43033349932](https://github.com/masma1234/Haddar_Bijoux/actions/runs/43033349932) passed for `af1913b7`. [Run 43105771755](https://github.com/masma1234/Haddar_Bijoux/actions/runs/43105771755) passed for `9d26d1a5`, which added the verifier steps. The run for the commit that added `--access-only` is the next run on the branch and is reported with the push.

GitHub shows a single check, `validate`, on `af1913b7`, and no commit statuses. No Cloudflare or other deployment app is attached to the repository.

## Final regression and performance check

Measured on a fresh staging build:

- Visual regression against the approved baselines: 7 of 7 views, 0.000% differing pixels (French and Arabic at 375 and 1440 wide, pieces section, order section, 768 band). No design change was made.
- Arabic mobile LCP, three Lighthouse runs on the local preview: 2559, 2483 and 2486 ms. French: 1884, 1659 and 1807 ms. The LCP element is the hero photograph `cordons-trio-750.avif` in both languages, not text. On Arabic, time to first byte is about 450 ms and the rest is the photograph's load and render delay.
- Arabic first contentful paint is about 1.96 s against about 1.21 s in French, and the Arabic LCP is about 0.5 s after FCP, so the whole Arabic penalty is a first-paint delay. The two Arabic font preloads are small (Italiana latin 10 KB, Tajawal arabic 9 KB). Amiri (108 KB, the Arabic display font used for headings) is deliberately not preloaded.

Font experiment, Arabic home on mobile Lighthouse, three runs each, FCP / LCP in ms (resources blocked only in the test, nothing changed in the site):

| Variant | Runs |
|---|---|
| Baseline | 1813 / 2413, 1957 / 2482, 1957 / 2482 |
| Amiri blocked | 1209 / 1881, 1209 / 1881, 1207 / 1880 |
| Tajawal blocked | 1809 / 2112, 1810 / 2335, 1808 / 2260 |
| All fonts blocked | 1062 / 1733, 1058 / 1655, 1059 / 1731 |

Conclusion: the hero photograph is the LCP element, but the Amiri download is what holds back Arabic first paint, costing about 0.75 s of FCP and about 0.6 s of LCP in the lab. No font, image or layout change was made, because typography changes need owner approval and the Arabic copy is still waiting for native derja review. Options for the owner, safest first: (1) subset Amiri to the Arabic ranges the site actually uses, rebuilt after the derja text is final and checked with a missing-glyph test on every Arabic heading; (2) preload the Amiri subset so it downloads in parallel; (3) a fallback with `font-display: optional` for headings, which may leave some visitors on the fallback face and changes the approved look. Any of these needs a visual regression run and a real-device check before it is accepted.

## Build reproducibility (open item)

A clean checkout of `af1913b7` followed by `build:staging` leaves 29 tracked files modified. Eight are line endings on this Windows machine, and `src/data/security-headers.json` gains the staging `X-Robots-Tag` line, which is expected. The other 20 are the committed derivatives of the five AI illustrations (`bracelets`, `bracelets-personnalises`, `boucles-oreilles`, `colliers`, `bracelets-assortis`: the `.jpg` and the 480, 800 and 1200 AVIF files). A fresh generation produces different, smaller files (for example `colliers.jpg` is 225 KB committed and 69 KB regenerated). `generate-assets.mjs` regenerates by file modification time, which a fresh Cloudflare clone does not control, so the shipped illustration bytes are not guaranteed to match the committed or the measured ones. The owner photographs are unaffected, original hashes still pass, and the visual baselines match. Decision needed: regenerate once and commit the derivatives, or make generation unconditional. Neither was done, to avoid replacing images without approval.

## Unresolved owner decisions

- Confirm the legal text and French legal approval.
- Obtain native derja review.
- Confirm publication rights and credits for every supplied owner photograph and illustration.
- Confirm the Instagram handle and owner-controlled domain.
- Decide whether the staging hostname may be shared with named testers.
- Confirm Cloudflare account, billing, recovery, Access identity, and domain ownership.
- Decide whether the public GitHub repository, which contains the owner photographs and unapproved drafts, becomes private.
- Decide how to resolve the illustration derivative drift described above.
- Decide when production may become public.

## Exact next steps for Cloudflare

1. Owner creates or confirms the client-owned Cloudflare account, billing, recovery, Access identity provider and domain zone, and names the testers.
2. Owner decides repository visibility and whether to use Git integration (placeholder branch procedure) or Direct Upload.
3. Create the `staging-placeholder` orphan branch and the Pages project as in steps 1 to 4 above. Build command `pnpm build`, output `dist`, Node from `.node-version`, pnpm `12.11.2`. Set Preview branches to None immediately.
4. Configure Access (Allow policy for testers, Service Auth policy for one service token) on every hostname, including `*.<project>.pages.dev`.
5. Run `verify-deployment.mjs --staging --protected --also-blocked=...` against the placeholder. Stop on any failure.
6. Only then deploy the noindex Haddar staging build and re-run the verifier on the real origin. Record the URL, commit and output privately.
7. Resolve every owner decision, run `pnpm build:prod`, review the artifact, and obtain explicit launch approval.
8. After approval only, configure the production branch, confirmed `PUBLIC_SITE_URL`, custom domain, DNS, HTTPS, and the production Access or public exposure decision.

## Release references

- Branch: `chore/final-audit-cleanup`, 0 commits behind and 6 ahead of `design/white-gold-redesign` before this change.
- Earlier pushed commits: `d884d836`, `d3af5e39`, `af1913b7`.
- Draft pull request: none exists (checked through the GitHub API). The GitHub CLI is not installed and no token was used. Open it with [this compare link](https://github.com/masma1234/Haddar_Bijoux/compare/design/white-gold-redesign...chore/final-audit-cleanup?expand=1) and choose Create draft pull request. Do not merge.
- Remote staging: not deployed, not tested.
