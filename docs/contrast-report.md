# Palette and contrast audit

Source of truth: `Haddar Bijoux — Palette.html`.

| Foreground | Background | Contrast |
|---|---|---:|
| ink | bg | 14.08:1 |
| ink | panel | 15.33:1 |
| ink | goldPale | 11.70:1 |
| inkSoft | bg | 5.31:1 |
| inkSoft | panel | 5.78:1 |
| ink | gold | 4.92:1 |
| panel | goldDeep | 4.85:1 |

Large display text uses deep gold on ivory at 4.45:1 and on white at 4.85:1, above the 3:1 AA threshold for large text.

All combinations used for normal text meet 4.5:1. Muted ink on pale gold is 4.41:1 and deep gold on pale gold is 3.70:1, so neither is used for small text on pale-gold surfaces. Those captions use ink. Deep gold remains available for large display text, line art, decorative rules, icons, and the accessible white-on-deep-gold hover state.

The site deliberately uses this single light palette even when the device requests dark mode. No unapproved dark palette or extra gold-text color remains.
