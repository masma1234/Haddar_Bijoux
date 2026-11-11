# Business claims and approvals

Source: the supplied build brief and the client's message of 13 October 2026. Client statements are recorded as confirmations, not independent documentary verification. All mutable facts are in src/data/business.ts.

| Visible fact or business statement | Status | Source / remaining check |
|---|---|---|
| Public brand: Haddar Bijoux | Confirmed for this preview | Client brief |
| Legal name: Haddar_Bijoux | Client confirmed | Latest client reply; legal form and registration remain pending |
| Instagram: @haddar_bijoux | Owner answer of 8 November 2026 | https://www.instagram.com/haddar_bijoux/. Conflicts with the earlier record of @haddar__bijoux; see OWNER-DECISIONS.md |
| Orders happen by Instagram message | Client confirmed | Latest reply and brief; all public contact routes use Instagram |
| Payment and delivery details are provided on Instagram | Client confirmed | Latest reply; no payment method, price, delivery deadline or free delivery promise is invented |
| Bracelets, earrings and necklaces are the categories shown | Brief supplied | Client should check the six category labels against the current range |
| Category labels "Classiques" and "Sur demande" on the illustrated families | Brief supplied | No stock is promised. The custom offer itself is confirmed (next row), so it carries no draft marker |
| Personalized and matching bracelets are available on request | Client confirmed | Owner confirmation |
| All jewelry is 18-carat gold | Client confirmed | Owner confirmation; no 750/1000 claim is added |
| All jewelry has a warranty certificate | Client confirmed | Owner confirmation; no duration or scope is inferred |
| An unwanted piece may be returned within seven days of payment | Client confirmed | Latest reply; payment date is the starting point, not delivery date |
| Return requests go to the brand on Instagram | Client confirmed channel | No other contact channel was supplied |
| Warranty duration, coverage, exclusions and process | Pending | business.warrantyTerms |
| Hallmark details, origin and fabrication | Pending / omitted | business.hallmarkDetails; no origin or handmade claim appears |
| Return condition, exclusions, shipping costs, refund method/timing and exchanges | Pending | Individual business.ts fields; no exclusion is implied by an empty field |
| Legal form, RNE and tax ID | Pending | Confirm applicability |
| Public address: Old Medina of Sfax, Rue laadoul, Sfax 3000 | Client confirmed | Owner confirmation |
| Delivery areas and customization options | Pending | business.ts |
| Privacy contact, retention, legal bases and commercial terms | Pending legal review | business.ts policy fields |
| Phone, WhatsApp, email, opening hours and response-time promise | Omitted | Instagram is the supplied public contact. Null fields do not render links or promises |
| Photos of real pieces | Owner confirmed, 8 November 2026 | Six owner photographs (seven crops): the hero and six plates. Captions name the motif and what is visible (cord colour, box, worn); no price, stock, carat or material is stated per piece. Five AI illustrations are labelled one by one; the AI hero illustration is unused (IMAGE-CREDITS.md) |

Plain prompts such as “choose”, “write to us”, and “view the collection” describe actions, not claims of quality or availability. French and derja dictionary translations of the claims above have the same approval status. The derja copy still requires a native speaker's review.

No team, testimonials, reviews, counters, case studies, awards, fabricated prices, guarantees beyond the stated certificate, or claims of stock are published. Production is gated on confirmation and legal review.

## Home page statements (9 November 2026 redesign)

Every factual sentence on the home page maps to a row above. None adds a fact.

| Home page text | Source row | Status |
|---|---|---|
| "Bijoux en or 18 carats. Médina de Sfax." | 18-carat gold; public address | Confirmed |
| "Les bijoux sont accompagnés d’un certificat de garantie." (hero, Commander) | Warranty certificate | Confirmed. Duration and scope stay pending and are not shown |
| "Les commandes se font par message privé sur Instagram." | Orders by message | Confirmed |
| "Les modalités de paiement et de livraison sont communiquées sur Instagram." | Payment and delivery on Instagram | Confirmed |
| "Vous pouvez retourner un bijou qui ne vous plaît pas dans les 7 jours suivant la date du paiement." plus a link to the returns page | Seven-day return | Confirmed. The returns page still shows [CONFIRMER] for conditions, costs and refunds |
| "Rue Laadoul, médina de Sfax, 3000 Sfax" (AR: "Rue Laadoul، المدينة العتيقة، صفاقس 3000") | Public address | Confirmed fact, reworded per language. Owner to confirm the wording (OWNER-DECISIONS.md) |

The production gate (`node scripts/build.mjs --prod`) still fails on the pending rows: legal form, RNE, tax ID, delivery areas, return conditions, shipping, refunds, exchanges, privacy contact and policy, hosting retention, commercial terms, legal review, French legal approval, native derja review and the production domain. Nothing was weakened to pass it.

