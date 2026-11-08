# Browser verification

Installed Chrome, headless Playwright.

- Responsive overflow checks: 208 across all eight routes. Widths: 320, 360, 375, 390, 412, 768, 820, 1024, 1280, 1440, 1920, each in portrait and landscape, plus 667x375, 844x390, 1024x768. A 640px viewport covers the reflow equivalent of 1280px at 200%; 320px covers 400%. Real browser zoom and assistive-technology review remain manual launch checks.
- Palette checks: 16. All eight supplied tokens are asserted under light and dark device preferences on every route.
- Axe scans: 16, under light and dark device preferences on every route. The supplied light palette remains fixed in both preferences.
- JavaScript-disabled routes: 8.
- Network emulation: 4 runs across French and Arabic homepages, Slow 3G and Fast 3G.
- Keyboard interactions use Tab/Enter, skip link, native menu, and the sticky contact bar. Focus is checked against the sticky contact bar. This is an automated keyboard pass, not a human screen-reader audit.
- Hero CTAs checked at 375x667 and 1440x900 in both locales.
- HTTP status and language checked for known and unknown 404 paths.
- Errors: 0.



Full evidence: browser-report.json. Screenshots: .audit/screenshots/.
