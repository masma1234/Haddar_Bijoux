# Haddar Bijoux design notes

## Direction

The redesign uses a restrained editorial layout with ivory and white as the dominant
surfaces, fine hairlines, and gold only for small details, links, and primary actions.
The six supplied images are framed as contained 3:4 editorial panels so square artwork
is not cropped or stretched.

## Type and scale

French uses self-hosted Italiana for display text and Jost for interface text. Arabic
uses Amiri for display text and Tajawal for interface text. The hero type scales from
56px to 107px, section headings from 45px to 85px, and body text remains between 13px
and 18px. Spacing uses the existing fluid gutter and section scale.

## Tokens and controls

Only the locked tokens in `AGENTS.md` are used. Buttons have a 1px corner radius,
visible keyboard focus, and minimum 44px tap targets. There are no gradients, shadows,
glows, or scroll animations. The mobile action bar disappears while Commander is in
view and respects reduced motion.

## Responsive behavior

The desktop layout uses two hero columns and four equal collection columns. Collection
cards become a two-column grid on narrow screens. The hero stacks in the required order:
title, description, both actions, then the image. The Sur mesure section stays a
two-column layout when space permits and uses the separate matching-bracelets image.
