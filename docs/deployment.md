# Deployment handover

No deployment, domain registration, GitHub publication or account change has been performed.

1. Register the domain in the client's name and account. Set the confirmed apex HTTPS origin in PUBLIC_SITE_URL. The .invalid origin is deliberately unusable as a public brand domain.
2. Complete business.ts, obtain French legal review and native derja review, and confirm image permissions. Run pnpm build:prod. Never bypass a failing gate to publish this draft.
3. Configure Cloudflare Pages from a client-owned repository with Node 22.12+ and pnpm 12.11.2. Build command: pnpm build:prod. Output: dist. Include the root functions directory. The middleware only routes already-prerendered HTML; Astro remains static.
4. Attach the custom apex domain and www alias, configure HTTPS and the client-controlled DNS. Middleware redirects www requests that reach it to the HTTPS apex. Configure a Cloudflare redirect rule covering www assets too, because asset paths are excluded from function invocation.
5. Ensure the build runs scripts/postbuild.mjs. It generates CSP hashes and the corresponding function header data. Deploy the matching output and functions together.
6. Recheck actual 404 statuses for /404/, /ar/404/, /unknown/ and /ar/unknown/. The middleware selects the existing French or Arabic static 404. French-only legal pages intentionally do not advertise nonexistent Arabic translations.
7. Inspect real response headers, certificate, redirects, cache behavior, robots.txt, sitemap and share cards. Confirm no host-level analytics, Zaraz or injected scripts were enabled. Rerun privacy, browser and Lighthouse audits against the hosted origin.
8. Keep the domain and hosting access with the client; document recovery and billing ownership privately. Do not commit credentials.

Cloudflare's [headers documentation](https://developers.cloudflare.com/pages/configuration/headers/) says generated Function responses need headers on the Response. The middleware therefore attaches the same generated security headers itself, while public/_headers covers static assets. Hashed CSS/font assets are immutable; HTML is revalidated. Headers and routing still require an actual Pages staging check before launch.

CI configuration lighthouserc.json tests successful content routes three times with unchanged 95/2.5s/0.02/100ms thresholds. scripts/lighthouse.mjs additionally attempts both genuine 404 documents in both profiles. Lighthouse rejects a 404 document before scoring, so those are verified with HTTP, accessibility, keyboard, privacy and responsive checks instead. Their status is never changed to obtain a score.

All configured origins in local Lighthouse reports are placeholders. A high local SEO score does not mean the preview is indexed, legally ready or production-ready.

## Local rehearsal (verified 9 November 2026)

`npx wrangler@4.153.0 pages dev dist --port 8788` runs Cloudflare's own Pages runtime on the built output with `functions/` and `dist/_routes.json`. It confirmed:
- one `Cache-Control` value per path (HTML: Pages default; `/_astro/*` and `/fonts/*`: immutable; `/incoming/*`: one day plus stale-while-revalidate)
- HSTS, CSP and COOP on every response
- localized 404s with `no-store` and `noindex`
- the www redirect keeping path and query
- no CSP violations in the browser

Images and share cards bypass the function (`_routes.json` excludes). A real deployment must still be checked with `curl -I` on the same paths.
