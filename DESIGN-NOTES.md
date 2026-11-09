# Haddar Bijoux design notes

This file describes the design system as built. The rationale and research are in `DESIGN-DECISIONS.md`. Image placements are in `IMAGE-AUDIT.md`.

## Idea

The page is a white presentation tray. Each real piece sits on the centre axis, and everything else is set around it.

Two rules carry meaning:
- **The gold liner.** A 1px gold frame with a 10px white mat (7px on phones) appears only around photographs of real pieces.
- **The ivory band.** It holds only illustrated content: the four families and the custom service. Illustrations never get a liner.

## Colour (CLAUDE.md tokens, nothing added)

| Token | Role |
|---|---|
| `--panel` #FFFFFF | Page ground, header, footer, sticky bar |
| `--bg` #F7F5F1 | Ivory band only |
| `--ink` #2A241E | Text, focus ring, secondary button |
| `--ink-soft` #6E6459 | Captions, intros, labels |
| `--gold` #B68A4E | Liners, pair axis, step rules, nav hover underline, sticky bar top rule, primary button fill, scrollbar thumb, selection |
| `--gold-text` #7A5A2B | Links, handle, step numbers |
| `--line` #E4DCCB | Hairlines between rows and sections |

## Type

- **Italiana** sets:
  - the brand name (the H1 is split around the hero piece on desktop, 6rem at most)
  - section headings, from 2.5rem to 4.5rem
  - "Commander", from 3rem to 6rem
  - piece names, at 1.9rem
  - collection titles, at 1.6rem (1.3rem on phones)
  - the step numbers (Amiri on `/ar/`, where Italiana's "1" reads as "I")
- **Jost** sets text at 300, 400 and 500. Body text is 16 to 17px with a line height of 1.65.
- **On `/ar/`:**
  - Amiri sets headings and piece names (line height 1.35 to 1.5, no negative tracking).
  - Tajawal sets text (line height 1.85). Small Arabic text is 15px (Latin 13 to 14px) and Arabic intros are 17px, because Arabic letterforms read smaller at the same size.
  - The Latin brand name stays in Italiana.
  - The hero shows no Amiri text, so Amiri loads only on scroll.

## Layout

| Width | Layout |
|---|---|
| ≥1100px | **Hero tray.** Three columns: side field, piece (at most 540px), side field. Each side field keeps at least 250px. One diagonal: "Haddar" with the line and the order button at top-start; the two facts with "Bijoux" at bottom-end, all flush to the piece. RTL mirrors it. |
| <1100px | **Hero stacked.** Photo first. Its width is the smallest of 100%, 520px and (viewport height minus 348px), with a 240px floor, so the order button is in the first view at 375x667. Then the name (always left to right), the two-line text and the button. The "Voir les pièces" link is hidden. |
| <900px | Header is one static 56px row: wordmark, language, Instagram. No menu. The sticky order bar appears once the hero button scrolls away and hides over Commander. |
| <760px | The pairs stack in one column, at most 440px wide, and the axis rule is hidden. Sur mesure stacks. |
| <540px | The facts table stacks its label above its value. |

**Pieces.** Three pairs (pillow, écrin, wrist, the last under "Au poignet"), each separated by a short gold axis rule. One plate system: every real photo is a square crop and every pair uses 440px columns, so the plate edges share one vertical.

**Commander.** A centred close: heading, line, primary button, handle, then a facts table (`dl`). Every value in the table is a confirmed sentence from `business.ts`.

## Controls

- **Buttons:** 52px tall, 1px radius.
  - Primary: gold fill with ink text. On hover: gold-text fill with white text.
  - Secondary: ink outline. On hover: ink fill.
- **Text links:** gold-text, underlined, at least 44px tall. The arrow moves 4px on hover, mirrored on RTL.
- **Focus:** 2px ink outline with a 3px offset.

## Motion

- **On load:** the two halves of the name settle toward the piece (1.3s, opacity and a 0.12em shift, ease-out). This is the only load animation.
- **On hover:** the nav underline draws in, collection images scale to 1.04 (not on touch screens), and the arrows move.
- **On phones:** the order bar slides up from the bottom edge when it appears (`@starting-style`, 0.35s).
- **Scrolling:** no `content-visibility` on the home page. Its size estimates made the "Sur mesure" and "Commander" links overshoot by 400 to 500px and the scrollbar jump.
- **Reduced motion:** all transitions and the load animation are off under `prefers-reduced-motion`.
