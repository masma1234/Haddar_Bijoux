# Image audit

All 15 files in `incoming/` (recursive; no subfolders). Originals are never modified. `scripts/generate-assets.mjs` builds derivatives into `public/incoming/` from the manifest `src/data/images.ts`: AVIF and WebP at each listed width, plus a JPG fallback. `scripts/check-image-contract.mjs` verifies the placements on both locales.

**Provenance.**
- The six `.jpg` files are AI-generated illustrations, documented in `IMAGE-CREDITS.md` and `HADDAR_CODEX_README.md` (checksums in `SHA256SUMS.txt`, all still matching).
- The nine `.jpeg` files have no EXIF or ICC data, and their long edge is 1280px, consistent with export through a messaging app. Their content reads as phone photographs.
- The owner confirmed on 8 November 2026 that the nine `.jpeg` files show real Haddar Bijoux pieces. Rights: supplied by the owner for the site.

## AI illustrations (1200 x 1200 JPG, square)

| File | Visible subject | Placement | Frame | Derivatives |
|---|---|---|---|---|
| `hero.jpg` | Fine chain bracelet, clasp and tag, on ivory paper | Hero, eager + `fetchpriority=high` | 1:1, no crop | 480/800/1200 |
| `bracelets.jpg` | Oval-link chain bracelet | Collection card 1 | 1:1 | same |
| `bracelets-personnalises.jpg` | Chain bracelet with a blank bar | Collection card 2 | 1:1 | same |
| `boucles-oreilles.jpg` | Pair of small hoops | Collection card 3 | 1:1 | same |
| `colliers.jpg` | Fine chain with a round pendant | Collection card 4 | 1:1 | same |
| `bracelets-assortis.jpg` | Two matching chain bracelets | Sur mesure | 1:1 | same |

Alt text is unchanged from the brief (FR and AR, each says "illustration"). The six placements are preserved on both locales.

## Owner photographs (real pieces)

| File | Size | Visible subject | Placement | Treatment | Caption FR / AR |
|---|---|---|---|---|---|
| `fruit.jpeg` | 1047x1280 | Three cord bracelets on an ivory pillow: heart padlock (pink twisted cord), pineapple (orange), corn-shaped khomsa (yellow) | Gallery feature | 4:5 at 1024x1280. Square crop on tablet and phone keeps all three. | Cadenas cœur, ananas et maïs / قفل قلب، أناناس وذرة |
| `lock.jpeg` | 924x1280 | Heart padlock charm, pink twisted cord, ivory pillow | Gallery | 4:5, 924x1155 | Cadenas cœur / قفل قلب |
| `ananas.jpeg` | 961x1280 | Pineapple charm, orange cord, ivory pillow | Gallery | 4:5, 960x1200 | Ananas / أناناس |
| `houta_zoom.jpeg` | 960x1280 | Openwork fish charm with a blue detail, in an open box, held in a hand | Gallery | 4:5, 960x1200 | Poisson / حوتة |
| `khomsa.jpeg` | 1061x1280 | Openwork khomsa charm, black cord, in an open box, held in a hand | Gallery | 4:5, 1024x1280 | Khomsa / خمسة |
| `coeur_yed.jpeg` | 720x1280 | Two-photo collage: heart charm on pink cord (top), then red cord (bottom), worn on a wrist | Commander | Top panel only (0,0 to 720x630), native ratio | Cœur, porté / قلب، ملبوس |

Derivative widths: 480 and 800, plus the cropped width. On a phone, a gallery tile downloads a 480w AVIF (9 to 13 KB). The feature downloads an 800w AVIF (about 33 KB).

Alt text describes only what is visible: motif, cord color, setting. It makes no claim about carat, material, price or stock. The word "doré" is avoided for the real pieces because it suggests gold plating in French.

## Excluded

| File | Reason |
|---|---|
| `houta.jpeg` | Same piece and box as `houta_zoom.jpeg`, shot from further away. The piece is smaller in frame. |
| `mais.jpeg` | Corn khomsa on a teal velvet pillow. The piece is already shown in the feature shot. The saturated teal fights the locked ivory palette next to the other tiles. |
| `fruit2.jpeg` | Corn khomsa and pineapple on the same teal pillow. Both pieces are already shown. |
| Bottom half of `coeur_yed.jpeg` | Same heart charm on a red cord. Using one panel avoids showing the collage seam. |

## Limitations
- The photos are 1280px tall at most. The desktop feature is shown at about 640 CSS px wide, so 2x screens upscale it slightly. Higher-resolution originals would fix this.
- The backgrounds vary: ivory pillow, dark box, grey wall. The gallery groups them by row (pillows on top, boxes below) rather than altering the photos.
