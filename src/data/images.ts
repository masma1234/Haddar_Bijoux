export type Locale = 'fr' | 'ar';

export interface EditorialImage {
  id: string;
  file: string;
  alt: Record<Locale, string>;
  credit: string;
  rights: string;
  source: 'ai';
  width: 1200;
  height: 1200;
}

const image = (id: string, file: string, fr: string, ar: string): EditorialImage => ({
  id,
  file,
  alt: { fr, ar },
  credit: 'Visuel généré fourni par la propriétaire',
  rights: 'Révision des droits par la propriétaire requise',
  source: 'ai',
  width: 1200,
  height: 1200,
});

export const images = {
  hero: image(
    'hero',
    'hero.jpg',
    'Bracelet à chaîne dorée délicate, visuel généré pour illustration',
    'سوار بسلسلة ذهبية رقيقة، صورة توضيحية مولّدة',
  ),
  bracelets: image(
    'bracelets',
    'bracelets.jpg',
    'Bracelet à maillons ovales dorés, visuel d’illustration',
    'سوار بروابط بيضاوية ذهبية، صورة توضيحية',
  ),
  personalized: image(
    'bracelets-personnalises',
    'bracelets-personnalises.jpg',
    'Bracelet doré avec barrette rectangulaire sans gravure, visuel d’illustration',
    'سوار ذهبي بلوحة مستطيلة من غير نقش، صورة توضيحية',
  ),
  matching: image(
    'bracelets-assortis',
    'bracelets-assortis.jpg',
    'Deux bracelets dorés assortis, visuel d’illustration',
    'زوز أساور ذهبية متناسقة، صورة توضيحية',
  ),
  earrings: image(
    'boucles-oreilles',
    'boucles-oreilles.jpg',
    'Paire de petites créoles dorées, visuel d’illustration',
    'زوج خراص مدوّرة ذهبية، صورة توضيحية',
  ),
  necklaces: image(
    'colliers',
    'colliers.jpg',
    'Collier à chaîne fine et pendentif rond doré, visuel d’illustration',
    'سلسلة رقيقة بقلادة مدوّرة ذهبية، صورة توضيحية',
  ),
} as const;

export type ImageId = keyof typeof images;
