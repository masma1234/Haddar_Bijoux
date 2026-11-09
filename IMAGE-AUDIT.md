# Image audit

Inventory of `incoming/` on 9 November 2026: 15 files, no subfolders. No file was added since the 8 November audit. No two files are byte-identical.

Originals are never modified. `scripts/check-image-contract.mjs` checks the SHA-256 of all 15 files on every run:
- AI files: checked against `SHA256SUMS.txt`.
- Owner photos: checked against the hashes in the table at the end of this file.

`scripts/generate-assets.mjs` builds the derivatives in `public/incoming/` from the manifest `src/data/images.ts`. For each image it writes AVIF and WebP at each listed width, plus a JPG fallback.

Two changes in this round:
- The crop is now part of the manifest. A derivative is rebuilt when the original or the manifest changes.
- Derivatives that no manifest entry produces any more are deleted.

## Provenance

- **The six `.jpg` files** are AI-generated illustrations supplied by the owner. Evidence: `IMAGE-CREDITS.md`, `docs/archive/HADDAR_CODEX_README.md` and `SHA256SUMS.txt`.
- **The nine `.jpeg` files** have no EXIF or ICC data, and their long edge is 1280px. This is consistent with export through a messaging app.
- On 8 November 2026 the owner confirmed that the nine `.jpeg` files show real Haddar Bijoux pieces, supplied for the site. No photographer is named, and none is invented.

## Owner photographs (real pieces)

Sharpness is the sharp `stats().sharpness` value. It is relative: higher means more edge detail. Every real photo sits inside the gold liner, and only real photos do.

| File | Size, sharpness | Visible subject | Use | Crop (left, top, w x h) | Widths |
|---|---|---|---|---|---|
| `fruit.jpeg` | 1047x1280, 2.07 | Three cord bracelets on an ivory pillow: heart padlock (pink twisted cord), pineapple (orange), corn-textured khomsa (yellow) | **Hero** (eager, `fetchpriority=high`), both share cards | 140, 298, 750x750 square, entirely inside the pillow: leather and the three pieces only, no showroom wall (0 dark pixels in the top-left corner, checked). | 480, 750 |
| `lock.jpeg` | 924x1280, 1.23 | Heart padlock charm, pink twisted cord, ivory pillow | Plate, pillow pair | 124, 300, 800x800 (clear of the wall corner) | 480, 800 |
| `ananas.jpeg` | 961x1280, 1.42 | Pineapple charm, orange cord, ivory pillow | Plate, pillow pair | 68, 265, 800x800 | 480, 800 |
| `houta_zoom.jpeg` | 960x1280, 1.69 | Openwork fish charm with a blue stone, in an open champagne box with a light, held in a hand | Plate, écrin pair | 155, 320, 660x660: charm centred, lid and LED out of frame | 480, 660 |
| `khomsa.jpeg` | 1061x1280, 1.33 | Openwork khomsa charm, black cord, in an open champagne box, held in a hand | Plate, écrin pair | 220, 390, 660x660 | 480, 660 |
| `coeur_yed.jpeg` (top panel) | 720x1280 collage, 0.77 | Heart charm on a pink cord, worn on a wrist | Plate, wrist pair ("Au poignet") | 60, 0, 630x630 | 480, 630 |
| `coeur_yed.jpeg` (bottom panel) | same file | Same heart charm on a red cord, worn | Plate, wrist pair | 60, 646, 630x630. The seam (y 638 to 641) is excluded. | 480, 630 |

**Captions** give the motif name, then what is visible:

| Piece | French | Derja |
|---|---|---|
| Hero | Cadenas cœur, ananas et maïs | قفل قلب، أناناس وذرة |
| Padlock | Cadenas cœur / Cordon rose torsadé | قفل قلب / خيط وردي مفتول |
| Pineapple | Ananas / Cordon orange | أناناس / خيط برتقالي |
| Fish | Poisson / Détail bleu, dans un écrin | حوتة / نقطة زرقاء، في علبة |
| Khomsa | Khomsa / Cordon noir, dans un écrin | خمسة / خيط أكحل، في علبة |
| Hearts | Cœur / Cordon rose, porté and Cordon rouge, porté | قلب / خيط وردي، ملبوس and خيط أحمر، ملبوس |

**Alt text** (FR and AR in `src/data/images.ts`) describes only the motif, the cord colour and the setting. It makes no claim about carat, price or stock. "Doré" is avoided for real pieces because it suggests gold plating in French.

**Deep links.** Each plate has a stable id, so a story or a message can link to one piece:

| Piece | Link |
|---|---|
| Padlock | `/#cordon-cadenas` |
| Pineapple | `/#cordon-ananas` |
| Fish | `/#cordon-poisson` |
| Khomsa | `/#cordon-khomsa` |
| Pink cord heart | `/#cordon-coeur-rose` |
| Red cord heart | `/#cordon-coeur-rouge` |

The same ids work on `/ar/`.

## AI illustrations (1200 x 1200 JPG)

| File | Visible subject | Use |
|---|---|---|
| `bracelets.jpg` | Oval-link chain bracelet | Collection card "Bracelets" |
| `bracelets-personnalises.jpg` | Chain bracelet with a blank bar | Collection card "Bracelets personnalisés" |
| `boucles-oreilles.jpg` | Pair of small hoops | Collection card "Boucles d’oreilles" |
| `colliers.jpg` | Fine chain with a round pendant | Collection card "Colliers" |
| `bracelets-assortis.jpg` | Two matching chain bracelets | Sur mesure, captioned "Visuel d’illustration" |
| `hero.jpg` | Fine chain bracelet on ivory paper | **Not used** (see Excluded) |

The illustrations sit only in the ivory band. They have no gold liner, and the band's intro says they are illustrations. Each alt text also says "illustration". Derivative widths are 480, 800 and 1200.

## Excluded

| File | Reason |
|---|---|
| `hero.jpg` (AI) | The hero now shows real pieces (`fruit.jpeg`), as the brief asks for the strongest imagery there. A second fine chain bracelet would repeat `bracelets.jpg`. The share cards now use the real trio too. The change can be reversed in `src/components/Home.astro`. |
| `houta.jpeg` | Same piece and box as `houta_zoom.jpeg`, shot from further away (sharpness 1.17). The fish is smaller in frame. |
| `mais.jpeg` | Corn khomsa on a teal velvet pillow. It is sharp (2.06), but the piece is already in the hero, and the saturated teal fights the white page. |
| `fruit2.jpeg` | Corn khomsa and pineapple on the same teal pillow. Both pieces are already shown. |

**Round 3 (9 November 2026):** every real photo is now a square plate (one plate system; pairs at 440px), recropped so the charm is centred and the showroom wall, box lid and LED fall outside the frame.

## Delivery

| Image | Weight |
|---|---|
| Hero AVIF | 22.4 KB (480w), 46.7 KB (750w, native crop) |
| Plates, native-width AVIF | 22.9 to 42.7 KB |

Owner photos are encoded at AVIF quality 60 (illustrations at 52): at 52 the leather grain and gold edges smoothed visibly on 2x screens. No derivative is ever larger than its crop, so no detail is invented.

Plates and illustrations load lazily. The hero is the only high-priority image, and the image contract checks this. Below 1100px the hero is sized from the viewport height, so the order button stays in the first view on phones.

## Limitations

- **Resolution.** The photos are at most 1280px tall. On 2x screens:
  - The desktop hero (518 CSS px of image) upscales the 750px crop by about 1.38. The tighter crop removes the wall; the hero was capped at 540px so the upscale did not grow.
  - The écrin plates (540 CSS px) upscale by about 1.2.
  - Higher-resolution originals would fix this (`OWNER-DECISIONS.md`).
- **Backgrounds vary**: showroom pillow, champagne box on white satin, a wrist. The page groups them in pairs by setting. The photos are not edited or recoloured.

## Owner photo checksums (SHA-256)

```
d6e2dd783ed76e55bd4fdd2005052be4e65cf62cb6b27fdb4baedd9d0cc5c8af  incoming/ananas.jpeg
8bc4abf2d75d54c19ec3c89ce0be681d8406552d6b28120ea2f71d6d4f1a2dd6  incoming/coeur_yed.jpeg
bdd7b89fce09c0a262671b7f00df0f6f4a7ab892233f84e13f9d32ffaa5f1487  incoming/fruit.jpeg
f4c341d1ccc2c4785c29b1c8bbd3fd68a5693ff00bd0fc09bf5184a0ae147e3d  incoming/fruit2.jpeg
342c5092721d9a05e87ce78d55604b87fba61bc03fadb55a146e6202c570f8ec  incoming/houta.jpeg
fb70188d2c5103dffe486c6fb42212f4681a3eb1d1715b71363a90ec5109ab44  incoming/houta_zoom.jpeg
23296d58d744a6154442b12ebf9e8385b69abfc4496d4cb530f654a9ad545325  incoming/khomsa.jpeg
88571876296e2838fb6e5f82cb2fb8a8c1d7654b315e170863a9c2a7ae631f63  incoming/lock.jpeg
5f3b1ae6e296a659382bf30acd9c2ce8ca1360eb3e679874db22ce0627fa4d46  incoming/mais.jpeg
```
