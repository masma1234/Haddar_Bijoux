# Build guard verification

- Production build with missing facts: rejected as required
- Current image manifest (12 images): accepted
- Missing Arabic alt: rejected as required
- Missing French alt: rejected as required
- Missing rights statement: rejected as required
- Credit still marked [CONFIRMER]: rejected as required
- Real photo without Arabic caption: rejected as required

The image rules (scripts/image-rules.mjs) run inside scripts/check-placeholders.mjs on every build, preview and production. They cover every image in src/data/images.ts, which is the only image source the pages use.
