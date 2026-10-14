# Third-party inventory

| Category | Origin | Current behavior |
|---|---|---|
| Page-load requests | None outside the site's own origin | CSS, scripts, fonts, icons and social cards are local |
| Instagram profile link | https://www.instagram.com | Navigation only after a user follows a link |
| Instagram message link | https://ig.me | Navigation only after a user follows a link |
| Structured-data vocabulary | https://schema.org | A JSON-LD identifier, not a network request |
| Hosting target | Cloudflare Pages | Not deployed; CDN/host processing and logging require review before launch |

No Instagram embeds, feed widgets, remote fonts, social SDKs, frames, chat, analytics, CAPTCHA, hotlinked product images or service worker. Phone, WhatsApp and map links are absent because no public numbers or address were provided.

The asset build reads installed Fontsource packages from node_modules. It does not fetch fonts during a browser visit. Package installation contacts the package registry during development only. Lighthouse/Playwright are development tools, not shipped website code.

See privacy-report.md for actual browser request and storage checks. Recheck the hosted origin after deployment, including host-level settings such as Cloudflare analytics or injected scripts.
