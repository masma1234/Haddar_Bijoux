# Add client photographs without changing code

1. Copy a client-supplied photograph into src/assets/products/. Use a clear filename such as bracelet-classique.jpg.
2. Edit the matching JSON in src/content/products/. Add image with a path relative to that JSON: ../../assets/products/bracelet-classique.jpg.
3. Set isPlaceholder to false. Keep exactly one hero entry true.
4. Fill credit with the photographer or client credit and rights with the actual written permission/licence and its scope. Keep supporting permission records in a private client-controlled location. Do not paste private contracts into public JSON.
5. Replace both alt.fr and alt.ar with accurate descriptions of the actual photo. Describe what is visible; do not invent a wearing context or manufacturing origin.
6. Run pnpm build, then the browser and Lighthouse checks. The schema rejects real photos without confirmed rights or either alt translation.

The hero uses eager AVIF/WebP output and high fetch priority. Collection images are lazy. A regular link opens each original photo without JavaScript. The layout reserves image space. The generated hero AVIF budget is checked during the build. Crop and visual suitability still need review for each supplied image.

Current six drawings are decorative, original SVG line work over the exact pale-gold token, labelled as illustrations. They do not portray specific stock. The build warns when they remain. No client photographs were scraped from Instagram.
