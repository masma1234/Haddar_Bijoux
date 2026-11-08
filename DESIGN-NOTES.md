# Haddar Bijoux design notes

Rationale and reference review: `DESIGN-DECISIONS.md`. Image placements: `IMAGE-AUDIT.md`.

## Direction

A quiet, image-led vitrine. Ivory and white surfaces, 1px hairlines, and gold reserved for links, small labels and the primary button. Images keep their own shape. The square illustrations sit in square frames, and the owner photographs share a 4:5 frame. Nothing is letterboxed, stretched or cropped through a piece.

## Type and scale

Italiana sets display text and the Latin brand name on both locales. Jost sets French text. On `/ar/`, Amiri sets Arabic headings (line height 1.35, no negative tracking) and Tajawal sets text. Sizes:
- H1: 52px to 96px.
- Section headings: 40px to 72px.
- Body text: 16px to 17px.
- Captions: 12px to 14px.

All fonts are self-hosted.

## Tokens and controls

Only the locked tokens in `AGENTS.md` are used. Buttons have a 1px corner radius, visible 2px focus and at least 44px tap targets. There are no gradients, shadows, glows, eyebrow labels, or scroll or entrance animations. Hover motion is limited to a 1.035 image scale on collection cards and a 4px arrow shift. All transitions are off under `prefers-reduced-motion`.

## Responsive behavior

**Desktop** layout, from top to bottom:
- Two hero columns.
- A gallery of real pieces: one feature beside a 2x2 grid.
- Four collection columns.
- Two columns each for Sur mesure and Commander.

**Below 1000px**, the gallery and collection use two columns, and the gallery feature becomes square.

**Below 900px:**
- The header is one 64px row with a menu icon.
- The hero stacks title, text, both buttons, then the image (capped at 560px).
- A sticky order bar appears once the hero buttons scroll away and hides over Commander.

**Below 700px**, Sur mesure and Commander stack.
