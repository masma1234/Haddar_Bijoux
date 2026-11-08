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
  caption?: Record<Locale, string>;
  /** Region of the original kept before resizing (used to drop the second panel of a two-photo collage). */
  extract?: { left: number; top: number; width: number; height: number };
  /** Output aspect ratio (width / height). Omitted: keep the original ratio. */
  ratio?: number;
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

// Real Haddar Bijoux pieces, confirmed by the owner on 2026-11-08. Cropped to 4:5 for a consistent gallery frame.
const photo = (id: string, file: string, size: [number, number], alt: [string, string], caption: [string, string], extra: Partial<SiteImage> = {}): SiteImage & { caption: Record<Locale, string> } => ({
  id, file, source: 'photo',
  credit: 'Photographie fournie par la propriétaire',
  rights: 'Pièces Haddar Bijoux, fournies par la propriétaire pour le site',
  alt: { fr: alt[0], ar: alt[1] }, caption: { fr: caption[0], ar: caption[1] },
  ratio: 4 / 5, width: size[0], height: size[1], widths: [480, 800, size[0]].filter((w, i, a) => w <= size[0] && a.indexOf(w) === i),
  ...extra,
});

export const images = {
  hero: ai('hero', 'Bracelet à chaîne dorée délicate, visuel généré pour illustration', 'سوار بسلسلة ذهبية رقيقة، صورة توضيحية مولّدة'),
  bracelets: ai('bracelets', 'Bracelet à maillons ovales dorés, visuel d’illustration', 'سوار بروابط بيضاوية ذهبية، صورة توضيحية'),
  personalized: ai('bracelets-personnalises', 'Bracelet doré avec barrette rectangulaire sans gravure, visuel d’illustration', 'سوار ذهبي بلوحة مستطيلة من غير نقش، صورة توضيحية'),
  matching: ai('bracelets-assortis', 'Deux bracelets dorés assortis, visuel d’illustration', 'زوز أساور ذهبية متناسقة، صورة توضيحية'),
  earrings: ai('boucles-oreilles', 'Paire de petites créoles dorées, visuel d’illustration', 'زوج خراص مدوّرة ذهبية، صورة توضيحية'),
  necklaces: ai('colliers', 'Collier à chaîne fine et pendentif rond doré, visuel d’illustration', 'سلسلة رقيقة بقلادة مدوّرة ذهبية، صورة توضيحية'),

  trio: photo('cordons-trio', 'fruit.jpeg', [1024, 1280],
    ['Trois bracelets Haddar Bijoux sur cordon, motifs cadenas cœur, ananas et maïs, posés sur un coussin ivoire', 'ثلاثة أساور Haddar Bijoux بالخيط، فيهم قفل على شكل قلب، أناناس وذرة، على مخدّة بيضاء'],
    ['Cadenas cœur, ananas et maïs', 'قفل قلب، أناناس وذرة']),
  lock: photo('cordon-cadenas', 'lock.jpeg', [924, 1155],
    ['Bracelet sur cordon rose torsadé, motif cadenas en forme de cœur', 'سوار بخيط وردي مفتول، فيه قفل على شكل قلب'],
    ['Cadenas cœur', 'قفل قلب']),
  pineapple: photo('cordon-ananas', 'ananas.jpeg', [960, 1200],
    ['Bracelet sur cordon orange, motif ananas', 'سوار بخيط برتقالي، فيه أناناس'],
    ['Ananas', 'أناناس']),
  fish: photo('cordon-poisson', 'houta_zoom.jpeg', [960, 1200],
    ['Bracelet à motif poisson ajouré avec un détail bleu, dans un écrin', 'سوار فيه حوتة مفرّغة بنقطة زرقاء، في علبة'],
    ['Poisson', 'حوتة']),
  hand: photo('cordon-khomsa', 'khomsa.jpeg', [1024, 1280],
    ['Bracelet sur cordon noir, motif khomsa ajouré, dans un écrin', 'سوار بخيط أكحل، فيه خمسة مفرّغة، في علبة'],
    ['Khomsa', 'خمسة']),
  // coeur_yed.jpeg is a two-photo collage; only the top panel (pink cord) is used.
  worn: photo('cordon-coeur-porte', 'coeur_yed.jpeg', [720, 630],
    ['Bracelet sur cordon rose avec un cœur, porté au poignet', 'سوار بخيط وردي فيه قلب، ملبوس في اليد'],
    ['Cœur, porté', 'قلب، ملبوس'],
    { extract: { left: 0, top: 0, width: 720, height: 630 }, ratio: undefined }),
} as const satisfies Record<string, SiteImage>;

export type ImageId = keyof typeof images;
/** Order of the photo gallery: first item is the large feature. */
export const gallery = [images.trio, images.lock, images.pineapple, images.fish, images.hand] as const;
