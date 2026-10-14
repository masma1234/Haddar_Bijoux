# Static routing checks

- /: passed
- /ar/: passed
- /unknown/: passed
- /ar/unknown/: passed
- /404/: passed
- /ar/404/: passed
- www apex redirect preserves path and query: passed

These tests exercise the actual middleware with mocked Pages assets. Browser checks independently verify local HTTP behavior. An actual Cloudflare Pages staging deployment remains required before launch.
