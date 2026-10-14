# Haddar Bijoux: design brief

Date: 2026-10-13. Local preview; business facts await client approval.

## Guidance and scope

The six web-quality skills, theme-factory, and webapp-testing are installed locally. Impeccable was not cleared by the installation review; the named OpenAI frontend-skill was absent. Use the supplied design checklist. Existing Sites guidance supports local development; hosting remains Cloudflare Pages.

## Concept 1: Le registre du bijoutier

Idea: an open jeweler's register, with one oversized bracelet contour beside quiet catalogue labels.

```
HADDAR BIJOUX               COLLECTION  QUESTIONS  FR / AR
--------------------------------------------------------
BIJOUX EN OR       |        / oversized bracelet /      |
18 CARATS          |       / cropped pale-gold field / |
Plain explanation  |                                   |
[Write] [Browse]   |                        H B        |
--------------------------------------------------------
01 / COLLECTION          wide image    portrait image
--------------------------------------------------------
02 / SUR MESURE          01          02          03
```

Type: generous left-aligned Italiana headings and Jost labels in French; right-aligned Amiri display and Tajawal text in Arabic. Reverse the logical layout, not the letters or imagery.

Photography: client photos in flat rectangular fields, alternating wide and portrait crops. Until supplied, show labelled line illustrations without implying that they represent actual pieces.

Signature: a dramatically enlarged bracelet contour in the hero. Small numbers label sections only, never inventory, certifications, or years.

## Concept 2: Le ruban

Idea: a horizontal chain rhythm connects full-width editorial spreads.

```
HADDAR BIJOUX                                  FR / AR
-----------------------------------------------------
BIJOUX EN OR 18 CARATS                        [Write]
o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o
              LARGE WIDE CLIENT PHOTOGRAPH
caption                                      [Browse]
-----------------------------------------------------
BRACELETS                   LARGE WIDE PHOTOGRAPH
```

Type: broad French display lines and generously spaced Arabic compositions.
Photography: full-width client still lifes with strong edge crops.
Signature: one continuous decorative chain-link rule.

## Concept 3: La fiche de collection

Idea: oversized jeweler's paper labels frame each category like a gallery exhibit.

```
HADDAR BIJOUX                                  FR / AR
-----------------------------------------------------
| tall category tag |    BIJOUX EN OR
| client photo      |    18 CARATS
|                   |    [Write] [Browse]
|___________________|    collection notes
-----------------------------------------------------
| portrait tag |    | wide tag                        |
```

Type: large category names against compact gallery annotations, independently spaced for Arabic.
Photography: individual client pieces on quiet, untextured grounds.
Signature: an oversized open-outline label without simulated prices or hallmark stamps.

## Selection

Choose concept 1. It makes the object the visual anchor, works honestly before photography arrives, and keeps Instagram within immediate reach. The bracelet contour is the single bold gesture. All other elements use flat color, thin rules, restrained labels, and negative space.

Use `Haddar Bijoux — Palette.html` as the color source of truth, with rectangular buttons and self-hosted Italiana, Jost, Amiri, and Tajawal. The palette is intentionally light-only. Small text on pale gold uses ink because muted ink and deep gold fall just below AA there; all palette values remain unchanged.

Use plain CSS, native disclosures for the mobile menu and FAQs, and no motion. The sticky mobile CTA is a progressive enhancement; the hero and contact actions work without JavaScript.

## Content boundaries

- French home at / and derja home at /ar/.
- French legal templates only; Arabic footer explains their language.
- French and Arabic branded 404 pages; actual HTTP 404 handling is part of hosting verification.
- Every unresolved business field begins with [CONFIRMER]. Draft facts remain separate from approved facts.
- No invented case studies, team, reviews, address, phone, prices, stock, or policies.
- No analytics, form, tracking, remote assets, or generated product imagery.
- Production builds fail until required facts, domain, rights, and legal approval are resolved.
- At 375 x 667, both hero actions precede the artwork and remain visible. Desktop pairs the text with a tall pale-gold illustration. Mobile collection uses one column.
