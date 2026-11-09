---
version: 1
slug: "src-components-home-astro"
primary_target: "src/components/Home.astro"
related_targets: ["src/pages/index.astro","src/pages/ar/index.astro"]
---

# Home (FR `/`, AR `/ar/`)

Mode: Persuade. Visitor arrives from the Instagram bio or a search, mostly on a phone. Job: see real pieces, understand gold 18 carats, Sfax, order by Instagram message, then send that message. Proof: owner photos of real pieces, the confirmed facts in `src/data/business.ts`. Constraints: CLAUDE.md palette, fonts and bans; no invented facts; AI illustrations always labelled.

Build path: code-led (CLAUDE.md forbids generating images; no comp).

## Direction contract

THESIS: The page is a white presentation tray. Each real piece is laid on the centre axis and everything else is set around it, the way gold is laid out on a white cloth to be offered. It refuses the split hero (copy left, product right) and the row of equal category cards as the page's structure.

OWN-WORLD: White #FFFFFF ground for all real-piece content; ivory #F7F5F1 only as the "cloth" band that holds the illustrated families and the custom service. Gold #B68A4E only as 1px lines: the liner that frames every real photograph, and the short axis rule between paired pieces. Gold-text for links and captions, ink for type. Italiana at display size, Jost 300/400/500 for text; Amiri headings and Tajawal text on /ar/. 1px-radius controls, gold-filled primary.

STORY: The visitor sees three real bracelets first and reads gold 18 carats, Sfax, order by message. Pieces follow in pairs (pillow, écrin, wrist). The ivory band shows the other families as labelled illustrations and the custom service. The page closes on a centred order block with the practical facts. Action: message on Instagram.

FIRST VIEWPORT: 1440x900: 64px white header. The trio photo, square, about 560px, sits on the centre axis inside its gold liner. "Haddar" at display size sits at the top of the start field, "Bijoux" at the bottom of the end field, a diagonal across the piece; no text crosses the photo. Start field, below "Haddar": the line "Bijoux en or 18 carats. Médina de Sfax.", the gold primary "Écrire sur Instagram", a text link to the pieces. End field, above "Bijoux": the photo caption and two facts. At 375x667: photo full-bleed square first, then the name on one line, the line, and the primary button inside the first view.

FORM: Candidate 7 of 7 (the gift tray, axial presentation). seed:0156afac23916be4. Raises from declined challengers: seed-packet rack, front promises and back instructs: the order block ends with a ruled facts table. Particle display, line weight encodes confidence: the gold liner is reserved for real photographs; illustrations carry no liner and a label. HyperCard stack, every card addressable: each real piece has a stable fragment id. Football kit, the crest never moves: the Latin brand lockup is identical on /ar/ while the layout mirrors. Plankton wake, light only where the visitor acts: motion answers hover and focus, plus one load reveal of the brand words. Accretion disk, the centre held for one thing: only jewelry sits on the axis.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Recorded adaptations (9 November 2026, round 3)
- Hero piece capped at 540px, not 560-600: keeps the 750px source crop near 1.4x on 2x screens.
- Hero caption sits under the photo: it names the piece on the axis, so it belongs to the piece, not to a side field.
- Primary label is "Écrire sur Instagram" everywhere (hero, custom, Commander, sticky bar): one action, one name.
- Every real photo is a square plate (hero 750px, pairs 440px): one plate system on the tray.

## Unresolved
- Owner: hero now shows a real photo instead of the AI illustration (reversible).
- Owner: motif names, derja review, Arabic address wording.
