# Adding owner photographs

Every image on the site comes from one manifest, `src/data/images.ts`. The originals stay untouched in `incoming/`.

1. Put the owner's file in `incoming/`. Never edit or overwrite an original.
2. Add an entry to `src/data/images.ts` with the `photo(...)` helper. It takes:
   - the derivative id
   - the file name
   - the crop (`left`, `top`, `width`, `height` in source pixels; the crop size is the largest derivative, so it is never upscaled)
   - the FR and AR alt text
   - the motif caption
   - one line on what is visible (cord colour, box, worn)
3. Describe only what is visible. No carat, price, stock, origin or handmade claim per piece.
4. Place it in `src/components/Home.astro`, or add it to `pairs` in the manifest.
5. Run `node scripts/build.mjs`. It regenerates the AVIF and WebP derivatives, and removes the ones nothing uses any more.
6. With the preview running, run the browser checks and `node --experimental-strip-types scripts/check-image-contract.mjs`.

## Guards

`scripts/image-rules.mjs` runs on every build, preview and production. The build stops if any image lacks:
- either alt text
- a credit
- a rights statement
- for a real photograph, its FR and AR captions

A credit or rights statement that still contains `[CONFIRMER]` also stops the build. `npm run test:guards` proves these rules reject what they must.

## Provenance

- Gold liner: real photographs only.
- AI illustrations: no liner and a visible "Visuel d’illustration" label, and they stay smaller than the real plates.
- The image contract check enforces both.
- Never use an image the owner did not supply, and never present an AI image as a real piece.
