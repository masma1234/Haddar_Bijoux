# Design decisions

## Reference review (8 November 2026)

Home pages captured with headless Chrome at 390px (mobile) and 1440px (desktop). Captures stayed in a scratch folder and were not added to the repo. Cartier, Pandora and Swarovski returned HTTP 403 to the desktop capture (bot protection), so their desktop review is **not done**. Van Cleef & Arpels was captured on both.

| | What works | Friction observed |
|---|---|---|
| Cartier (mobile) | One full-bleed visual per screen. Centered wordmark. Very few words. | Promo bar plus header take about 120px. A cookie sheet covers most of the first view. The hero video was still black after 6 seconds. |
| Pandora (mobile) | Clear category entry points (Charms, Bracelets, Rings). | The hero was still a grey placeholder after 6 seconds. The headline is uppercase and generic. |
| Swarovski (mobile) | Strong brand wordmark. Two clear buttons on the hero. | A floating chat button and an accessibility widget sit over the content. 45 scripts. |
| Van Cleef & Arpels | Product shot on a plain ground set beside a worn or lifestyle shot (split grid). Restrained serif wordmark. | A cookie modal covers the first view on both sizes. 36 scripts. |

**Shared principles worth keeping:** the jewelry is the subject of each screen. Products are shot on plain neutral grounds, then paired with a worn shot for scale. Text is short. The wordmark is typographic.

**What Haddar can do better within its scope:** no cookie wall, so the first view is the product. Static HTML with no loading placeholders: the hero image arrives with the page. One tap from any screen to an Instagram message. No layouts, code or assets were copied.

## Direction

Quiet, image-led vitrine inside the locked palette and fonts. The photographs carry the page; type and hairlines stay quiet around them.

- **Images keep their own shape.** The square illustrations sit in square frames. The real photos are cropped to a shared 4:5 frame (portrait, close to their native shape), and the worn shot keeps its own ratio. Nothing is letterboxed, stretched, or cropped through a piece.
- **The real pieces come first after the hero.** A gallery titled "Les bracelets cordon": one large group shot plus four single pieces, captioned with the motif only. Desktop shows the feature beside a 2x2 grid; tablet and phone show the feature square, then two columns.
- **Illustrations stay labelled.** The hero, the four collection cards and the Sur mesure image keep a small "Visuels d'illustration" caption. They are never presented as Haddar pieces.
- **A worn shot beside the order button.** The Commander section pairs the call to action with the only on-wrist photograph, which shows scale.
- **No eyebrows.** Each heading stands alone. The brand appears once in the first view as the H1, plus the wordmark.
- **Type:** Italiana for display and for the Latin brand name on both locales. Jost or Tajawal for text. Arabic headings in Amiri with no negative tracking and line height 1.35. Step numbers use the text face, because the sequence is real.
- **Motion:** answers the visitor only. Image scale of 1.035 on collection hover (not on touch screens), arrows shift 4px on hover, the menu icon turns into a cross. No scroll or entrance animation. All transitions are disabled under `prefers-reduced-motion`.
- **Mobile:** a single 64px header row with language, Instagram and a menu icon. The menu opens as large Italiana links and closes after a choice or on Escape. The order bar appears only once the hero buttons have scrolled away, and hides over Commander.
- **Speed:** `content-visibility: auto` on below-fold sections. Amiri is no longer preloaded. Italiana is preloaded on `/ar/` for the H1.

## Rejected
- **Real photos in the hero.** The existing brief fixes `hero.jpg` there. A change needs an explicit owner decision (see OWNER-DECISIONS.md).
- **Using `mais.jpeg`, `fruit2.jpeg` and `houta.jpeg`.** They repeat pieces already shown. See IMAGE-AUDIT.md.
- **Recoloring the photos** to match the palette. That would misrepresent the cord colors of real products.
