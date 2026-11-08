import { fr } from './fr';
import { ar } from './ar';
export type Locale = 'fr' | 'ar';
export const dictionary = (locale: Locale) => locale === 'ar' ? ar : fr;
export const homePath = (locale: Locale) => locale === 'ar' ? '/ar/' : '/';
export const legalPaths = ['/politique-de-confidentialite/','/cookies/','/conditions-generales/','/retours-et-remboursement/'];
