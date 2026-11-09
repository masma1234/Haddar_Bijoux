# Haddar Bijoux: design system

The project's requirements (locked palette, fonts, bans, facts, image rules, process) are recorded verbatim in `PRODUCT.md`, `CLAUDE.md` and `AGENTS.md`. They win over this file. This file records the design system built on them; details and measurements are in `DESIGN-NOTES.md`, rationale in `DESIGN-DECISIONS.md`.

## World: the presentation tray
A white page on which each real piece is laid on the centre axis, the way gold is laid out on a white cloth to be offered. Only jewelry sits on the axis.

## Tokens (from CLAUDE.md; none added)
| Token | Value | Use |
|---|---|---|
| `--panel` | #FFFFFF | Page ground, header, footer, order bar |
| `--bg` | #F7F5F1 | The ivory band only (illustrated families, custom service) |
| `--ink` | #2A241E | Text, focus ring, secondary button |
| `--ink-soft` | #6E6459 | Captions, intros, labels |
| `--gold` | #B68A4E | 1px lines (liner, axis, rules), primary button fill, selection, scrollbar |
| `--gold-text` | #7A5A2B | Links, handle, step numbers |
| `--line` | #E4DCCB | Hairlines |

## Type
Italiana for the brand name and display text, Jost for text (FR). Amiri for headings and piece names, Tajawal for text including Latin runs (AR). Display never above 6rem. Arabic small text 15px.

## Components
- **Liner:** 1px gold frame, 10px white mat (7px on phones). Real photographs only.
- **Plate:** square photo in a liner, motif name (display face) and one detail line below. Pairs of 440px columns with a short gold axis rule between them (a 40px horizontal rule on phones).
- **Illustration card:** square AI image without liner, title, descriptor, then "Visuel d'illustration" as the last line; always smaller than every plate.
- **Buttons:** 52px tall, 1px radius. Primary gold fill with ink text; secondary ink outline. One label for the one action: "Écrire sur Instagram".
- **Facts table:** ruled `dl` closing the page; every value is an owner-confirmed sentence.

## Motion
One load moment (the two halves of the name settle toward the piece). Otherwise motion answers the visitor only: nav underline, arrow shift, illustration zoom on hover devices, order bar slide-in on phones. All off under `prefers-reduced-motion`.

## Rules that keep it honest
Never place an illustration in a liner. Never invent a fact, price, stock or material per piece. Never upscale a derivative beyond its crop. Anchor links must land under the header (no layout that changes size while scrolling).
