# Owner decisions needed

1. **Is a real photo right for the hero?** The first screen now shows your three cord bracelets (padlock heart, pineapple, corn khomsa), not the AI chain bracelet. The redesign brief asked for the strongest imagery there.
   - The AI image is still in `incoming/` and can come back with a one-line change in `src/components/Home.astro`.
   - The share cards shown when the link is posted also use the real photo now.
2. **Which Instagram handle is correct?** Every link uses `@haddar_bijoux` (one underscore), which matches the links in the redesign brief. `docs/archive/launch-report-2026-10-14.md` records an earlier confirmation of `@haddar__bijoux` (two underscores). Please open https://www.instagram.com/haddar_bijoux/ and confirm it is the shop account. If it is wrong, every order button fails.
3. **Can you send higher-resolution photos?** The photos are 1280px tall, so the hero and the box shots are slightly soft on large high-density screens. Originals straight from the phone camera would fix this. A clean shot of the corn khomsa on an ivory pillow would also let it appear on its own; the teal-pillow shots were left out.
4. **Are the names and captions right?**
   - Motif names in French: Cadenas cœur, Ananas, Maïs, Poisson, Khomsa, Cœur.
   - Cord details, as visible in the photos: rose torsadé, orange, noir, rose, rouge.
   - Gallery title: "Les bracelets cordon". Wrist pair: "Au poignet" / "في اليد".
   - Please correct any name you use differently on Instagram.
5. **Is the address written correctly?**
   - French page: "Rue Laadoul, médina de Sfax, 3000 Sfax".
   - Arabic page: "Rue Laadoul، المدينة العتيقة، صفاقس 3000". The street name is left in Latin letters because its Arabic spelling was not supplied.
   - Your record says "Old Medina of Sfax, Rue laadoul, Sfax 3000". The legal pages still use that text.
6. **Rights for the five AI illustrations.** `IMAGE-CREDITS.md` records them as owner-supplied with "owner review required". Please confirm you may publish them.
7. **Still open from before** (these block the production build): legal form, RNE, tax ID, privacy contact, return conditions and costs, refunds, warranty terms, French legal approval, native derja review of every Arabic string, and the production domain (`PUBLIC_SITE_URL`). See `docs/claims-to-confirm.md`.
