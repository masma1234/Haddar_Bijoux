# Prerender verification

All eight routes contain their page content, navigation, heading, metadata, and applicable JSON-LD in raw HTML. No JavaScript was executed for these checks.

| Route | Language | Title chars | Description chars | Result |
|---|---|---:|---:|---|
| / | fr / ltr | 38 | 135 | Pass |
| /ar/ | ar / rtl | 35 | 131 | Pass |
| /politique-de-confidentialite/ | fr / ltr | 31 | 144 | Pass |
| /cookies/ | fr / ltr | 35 | 141 | Pass |
| /conditions-generales/ | fr / ltr | 36 | 136 | Pass |
| /retours-et-remboursement/ | fr / ltr | 40 | 134 | Pass |
| /404/ | fr / ltr | 32 | 41 | Pass |
| /ar/404/ | ar / rtl | 31 | 31 | Pass |

Native navigation, language links, and photo links remain usable without JavaScript. The mobile contact bar is progressively added with JavaScript; its absence does not remove the hero or contact actions. Browser checks are reported separately.

The Cloudflare Pages middleware only selects already-built 404 HTML and returns a 404 status, and redirects www to apex. It does not render page content. No form handler is shipped. French-only legal pages deliberately omit a nonexistent Arabic hreflang alternate.
