# Design decisions

Round 2, 9 November 2026, branch `design/white-gold-redesign`. Brief: a full redesign with creative freedom, white dominant and gold as the accent. The system as built is in `DESIGN-NOTES.md`.

## Constraints kept

**CLAUDE.md locks:**
- the palette, and no added colours
- the fonts
- the bans: gradients, pills, shadows, scroll animations, eyebrows, em dashes, third-party requests
- truthful facts
- owner-supplied images only

**How the brief fits these locks:**
- **Colour.** The brief allows adjusting tokens, but the locked palette already has the white and gold family. So white (`--panel`) became the page ground and ivory (`--bg`) moved to one band. No colour was added or changed. This satisfies both documents without overriding the owner's lock.
- **Images.** CLAUDE.md forbids generating images, so the build was code-led: no generated mock-ups or comps.

## Reference review

**Today's attempt.** Headless Chrome captured the home pages at 390 and 1440, kept in a scratch folder only.

| Site | Today |
|---|---|
| Cartier | HTTP 403 at both widths. Not reviewed today. |
| Pandora | HTTP 403 at both widths. Not reviewed today. |
| Swarovski | HTTP 403 at both widths. Not reviewed today. |
| Van Cleef & Arpels, desktop | Loaded. Observations below. |
| Van Cleef & Arpels, mobile | The capture timed out. |

Bot protection was not worked around.

**Van Cleef & Arpels desktop, observed today:**
- A centred serif wordmark.
- A product shot on white set beside a worn portrait.
- Small underlined text links.
- Very large white margins.
- After 6 seconds, several sections were still grey placeholders: a 9,075px page loading 24 scripts.

**8 November mobile notes** (from round 1; those captures were not kept):
- **Cartier:** one visual per screen, and a cookie sheet over the first view.
- **Pandora:** clear category entries, but the hero was still grey after 6 seconds.
- **Swarovski:** a floating chat button and an accessibility widget over the content.
- **Van Cleef & Arpels:** a cookie modal over the first view.

**Principles kept:**
- The piece is the subject of each screen.
- Products are shot on plain grounds, then shown worn for scale.
- Text is short.
- The wordmark is typographic.
- Links are quiet.

**Where Haddar can do better at its scale:**
- No cookie wall or placeholders: the first view is a real piece and arrives with the HTML.
- 257 bytes of JavaScript.
- One tap to an Instagram message from any screen.

No layout, code or asset was copied.

## Direction: the presentation tray

The direction came from Impeccable's direction step:
- My grounded candidates, ranked by resonance: the souk window, the écrin, the guarantee card, the amulet tradition, the bilingual shop sign, the Instagram DM, the gift tray.
- The skill's seed (`seed:0156afac23916be4`) assigned candidate 7, the gift tray. In Tunisia gold is laid out on a white cloth to be offered.

The brief asked me to choose with explicit criteria rather than through a decision page, so I checked the assignment against five criteria before building:

| Criterion | Tray | Split hero (the category default) |
|---|---|---|
| Real jewelry leads the first view | Yes: the piece is on the axis, at up to 600px | Yes, but beside the copy, as a template |
| White dominant, gold as an accent | White ground, gold only as 1px lines and the button | Same palette, but no use for gold |
| Honest about provenance | The liner marks real photos; illustrations sit unframed on ivory | Nothing tells them apart |
| Contact effortless on phones | The button is in the first view at 375x667 (bottom at 596px of 611 allowed) | Same, if built carefully |
| Works mirrored for `/ar/` | The axis is symmetric, so RTL mirrors naturally | Mirrors, with no gain |

**Challengers.** The seed's catalogue challengers were a particle-detector display, a HyperCard stack, plankton light, an accretion disk, a seed-packet rack and a football kit. All were declined: each lost on recognition by the audience and on clarity about the product. Each still lent one discipline to the tray:

| Challenger | Discipline it lent |
|---|---|
| Seed-packet rack | Front shows, back instructs: Commander ends in a facts table. |
| Particle display | Line weight carries meaning: the liner is for real photographs only. |
| HyperCard | Every card is addressable: each piece has a fragment id. |
| Football kit | The crest never moves: the Latin name is identical on `/ar/`. |
| Plankton | Motion only where the visitor acts. |
| Accretion disk | The centre holds one thing: only jewelry sits on the axis. |

**Rejected:**
- **The split hero** (copy left, image right), the old layout and the category default.
- **A full-bleed photo with text on top.** Text over the photo fails contrast without a scrim, and scrims and gradients are banned.
- **A swipe carousel of pieces** on phones. It hides pieces and adds focus problems.
- **Arabic in Amiri on the French page.** CLAUDE.md allows Amiri on `/ar/` only.

## Decisions

- **Real photo in the hero.** The three-bracelet photo (`fruit.jpeg`) replaces the AI illustration. The brief asks for the strongest imagery in the hero, with the jewelry as the hero. The AI hero illustration is not a Haddar piece, so it needed a disclaimer in the first view. Reversible; see `OWNER-DECISIONS.md`.
- **The name split around the piece** on desktop. It is the one bold move. The rest stays quiet: centred section openings and hairline rows.
- **Pairs, not a grid.**
  - Pillow pair: lock and pineapple, 460px.
  - Écrin pair: fish and khomsa, 540px, larger because their charms are small in frame.
  - Wrist pair: the collage cut into two clean panels, 400px. Showing the same heart on pink and red cords is factual and shows scale.
- **The ivory band** holds the four families and Sur mesure. It makes "illustration" a place on the page, not only a caption.
- **Mobile header without a menu.** Three anchors on a short one-page site did not justify a hamburger. The sticky order bar carries the main action, and JavaScript fell from 451 to 257 bytes.
- **A facts table, not marketing copy.** Commander lists five rows: order, payment and delivery, gold and guarantee, return, address. Each value is an owner-confirmed sentence from `business.ts`. The returns row links to the full policy, which still shows its `[CONFIRMER]` gaps.
- **No invented copy.** New strings are labels and recombined confirmed facts: the hero line, the "Au poignet" heading, the family intro and the table labels. Arabic strings need the native derja review that already blocks production.

## Skills and tools

| Tool | Use |
|---|---|
| `frontend-design` | Loaded; its plan-review-build-critique loop shaped the process. |
| Impeccable 4.8 | `context`, `concept-seed`, `surface-brief` (contract in `.impeccable/surfaces/`), the craft floor, `detect` (0 findings on the changed files), and the finish reviewer subagent (see `AUDIT-AFTER.md`). Its separate verbs (critique, layout, typeset, adapt, polish, optimize, harden) were applied through the craft floor, my own critique rounds and the reviewer, not run one by one. |
| Playwright | The Playwright and Chrome DevTools MCP servers failed to connect this session. I used the project's own Playwright scripts with installed Chrome. |
| Lighthouse | Run through the project script, which now supports `--runs=N` medians. |
| axe | Run through the project's browser audit. |
| `pnpm audit` | Run through the README's pinned `npx pnpm@12.11.2`. |

## Round 3 (9 November 2026)
- **One plate system.** Every real photo is square and every pair shares 440px columns. The écrin crops were tightened to the charm, so the lid and LED are out of frame.
- **Hero crop inside the pillow.** The only way to drop the showroom wall without cutting a cord. The hero was capped at 540px so retina upscaling stays near 1.4x.
- **One diagonal in the hero.** "Haddar" with the line and button; the facts with "Bijoux".
- **One action, one label:** "Écrire sur Instagram".
- **Smoothness over a micro-optimisation.** Section-level `content-visibility` broke anchor links and the scrollbar. It now applies only to pictures whose size is fixed by their ratio class.
- **Unused images reviewed again.** `houta.jpeg` (wider duplicate of the fish), `mais.jpeg` and `fruit2.jpeg` (teal pillow, pieces already shown) still do not improve the page.
- **Footer legal name kept.** "Haddar_Bijoux" is the owner-confirmed legal name, so it was not restyled.
