// Single source for every image on the site. scripts/generate-assets.mjs reads this file
// to build the AVIF/WebP/JPG derivatives in public/incoming/; originals in incoming/ are never modified.
export type Locale = 'fr' | 'ar';

export interface SiteImage {
  id: string;
  file: string;
  source: 'ai' | 'photo';
  credit: string;
  rights: string;
  alt: Record<Locale, string>;
  /** Motif name shown under a real piece. */
  caption?: Record<Locale, string>;
  /** Second caption line: what is visible besides the motif. */
  detail?: Record<Locale, string>;
  /** Region of the original kept before resizing (crops the frame around the piece). */
  extract?: { left: number; top: number; width: number; height: number };
  /** Output width and height of the largest derivative. */
  width: number;
  height: number;
  widths: number[];
}

const ai = (id: string, fr: string, ar: string): SiteImage => ({
  id, file: `${id}.jpg`, source: 'ai',
  credit: 'Visuel généré fourni par la propriétaire',
  rights: 'Révision des droits par la propriétaire requise',
  alt: { fr, ar }, width: 1200, height: 1200, widths: [480, 800, 1200],
});

type Box = { left: number; top: number; width: number; height: number };
type Pair = [string, string];
// Real Haddar Bijoux pieces, confirmed by the owner on 2026-11-08. The crop is the output size.
// Every real photo is cropped square: one plate system on the tray, charm centred, box lids and lights out of frame.
const photo = (id: string, file: string, extract: Box, alt: Pair, caption: Pair, detail: Pair): SiteImage & { caption: Record<Locale, string>; detail: Record<Locale, string> } => ({
  id, file, source: 'photo',
  credit: 'Photographie fournie par la propriétaire',
  rights: 'Pièces Haddar Bijoux, fournies par la propriétaire pour le site',
  alt: { fr: alt[0], ar: alt[1] }, caption: { fr: caption[0], ar: caption[1] }, detail: { fr: detail[0], ar: detail[1] },
  extract, width: extract.width, height: extract.height,
  widths: [480, 800, extract.width].filter((w, i, a) => w <= extract.width && a.indexOf(w) === i),
});

export const images = {
  // AI illustrations: the jewelry families and the custom service. Always labelled as illustrations.
  bracelets: ai('bracelets', 'Bracelet à maillons ovales dorés, visuel d’illustration', 'سوار بروابط بيضاوية ذهبية، صورة توضيحية'),
  personalized: ai('bracelets-personnalises', 'Bracelet doré avec barrette rectangulaire sans gravure, visuel d’illustration', 'سوار ذهبي بلوحة مستطيلة من غير نقش، صورة توضيحية'),
  matching: ai('bracelets-assortis', 'Deux bracelets dorés assortis, visuel d’illustration', 'زوز أساور ذهبية متناسقة، صورة توضيحية'),
  earrings: ai('boucles-oreilles', 'Paire de petites créoles dorées, visuel d’illustration', 'زوج خراص مدوّرة ذهبية، صورة توضيحية'),
  necklaces: ai('colliers', 'Collier à chaîne fine et pendentif rond doré, visuel d’illustration', 'سلسلة رقيقة بقلادة مدوّرة ذهبية، صورة توضيحية'),

  // Hero: square crop inside the pillow, so only leather and the three pieces are in frame (no showroom wall).
  trio: photo('cordons-trio', 'fruit.jpeg', { left: 140, top: 298, width: 750, height: 750 },
    ['Trois bracelets Haddar Bijoux sur cordon, motifs cadenas cœur, ananas et maïs, posés sur un coussin ivoire', 'ثلاثة أساور Haddar Bijoux بالخيط، فيهم قفل على شكل قلب، أناناس وذرة، على مخدّة بيضاء'],
    ['Cadenas cœur, ananas et maïs', 'قفل قلب، أناناس وذرة'],
    ['Sur cordon rose, orange et jaune', 'على خيط وردي، برتقالي وأصفر']),
  lock: photo('cordon-cadenas', 'lock.jpeg', { left: 124, top: 300, width: 800, height: 800 },
    ['Bracelet sur cordon rose torsadé, motif cadenas en forme de cœur', 'سوار بخيط وردي مفتول، فيه قفل على شكل قلب'],
    ['Cadenas cœur', 'قفل قلب'], ['Cordon rose torsadé', 'خيط وردي مفتول']),
  pineapple: photo('cordon-ananas', 'ananas.jpeg', { left: 68, top: 265, width: 800, height: 800 },
    ['Bracelet sur cordon orange, motif ananas', 'سوار بخيط برتقالي، فيه أناناس'],
    ['Ananas', 'أناناس'], ['Cordon orange', 'خيط برتقالي']),
  fish: photo('cordon-poisson', 'houta_zoom.jpeg', { left: 155, top: 320, width: 660, height: 660 },
    ['Bracelet à motif poisson ajouré avec un détail bleu, dans un écrin', 'سوار فيه حوتة مفرّغة بنقطة زرقاء، في علبة'],
    ['Poisson', 'حوتة'], ['Détail bleu, dans un écrin', 'نقطة زرقاء، في علبة']),
  hand: photo('cordon-khomsa', 'khomsa.jpeg', { left: 220, top: 390, width: 660, height: 660 },
    ['Bracelet sur cordon noir, motif khomsa ajouré, dans un écrin', 'سوار بخيط أكحل، فيه خمسة مفرّغة، في علبة'],
    ['Khomsa', 'خمسة'], ['Cordon noir, dans un écrin', 'خيط أكحل، في علبة']),
  // coeur_yed.jpeg is a two-photo collage; each panel is cut out on its own so the seam never shows.
  wornPink: photo('cordon-coeur-rose', 'coeur_yed.jpeg', { left: 60, top: 0, width: 630, height: 630 },
    ['Bracelet sur cordon rose avec un cœur, porté au poignet', 'سوار بخيط وردي فيه قلب، ملبوس في اليد'],
    ['Cœur, cordon rose', 'قلب، خيط وردي'], ['Porté', 'ملبوس']),
  wornRed: photo('cordon-coeur-rouge', 'coeur_yed.jpeg', { left: 60, top: 646, width: 630, height: 630 },
    ['Bracelet sur cordon rouge avec un cœur, porté au poignet', 'سوار بخيط أحمر فيه قلب، ملبوس في اليد'],
    ['Cœur, cordon rouge', 'قلب، خيط أحمر'], ['Porté', 'ملبوس']),
} as const satisfies Record<string, SiteImage>;

export type ImageId = keyof typeof images;
/** Real pieces, shown in pairs: pillow, écrin, wrist. */
export const pairs = [[images.lock, images.pineapple], [images.fish, images.hand], [images.wornPink, images.wornRed]] as const;
