import { business as b } from '../data/business';
export interface LegalSection {title:string; paragraphs?:string[]; fields?:[string,string][];}
export interface LegalDocument {slug:string; title:string; metaTitle:string; description:string; sections:LegalSection[];}
const field=(label:string,value:string|null):[string,string][]=>value ? [[label,value]] : [];
export const legalDocuments:LegalDocument[]=[
{slug:'politique-de-confidentialite',title:'Politique de confidentialité',metaTitle:'Confidentialité | Haddar Bijoux',description:'Consultez les informations sur la confidentialité du site Haddar Bijoux, les liens vers Instagram et les éléments à confirmer avant publication.',sections:[
{title:'Le fonctionnement du site',paragraphs:['Ce site présente des catégories de bijoux. Il ne propose ni compte, ni panier, ni formulaire de contact.','Le site ne dépose aucun cookie et n’utilise ni stockage local, ni stockage de session, ni outil de mesure d’audience.']},
{title:'Vos échanges sur Instagram',paragraphs:['Les boutons de contact ouvrent Instagram. Les échanges et les données transmises après ce clic sont traités sur cette plateforme selon ses propres conditions.']},
{title:'Responsable et contact',fields:[['Nom légal',b.legalName],['Contact pour vos droits',b.privacyContact],['Adresse du responsable',b.address]]},
{title:'Hébergement et journaux techniques',paragraphs:['Hébergement prévu : Cloudflare Pages. La configuration effective et les informations contractuelles doivent être vérifiées avant le lancement.'],fields:[['Conservation des journaux',b.hostingRetention]]},
{title:'Protection des données',paragraphs:[b.privacyPolicy]}
]},
{slug:'cookies',title:'Cookies et stockage',metaTitle:'Cookies et stockage | Haddar Bijoux',description:'Découvrez ce que le site Haddar Bijoux stocke dans votre navigateur : aucun cookie, aucun stockage local et aucun outil de mesure d’audience.',sections:[
{title:'Aucun stockage de suivi',paragraphs:['Le site ne dépose aucun cookie. Le stockage local et le stockage de session restent vides. Aucun outil de mesure d’audience n’est chargé.']},
{title:'Langue et apparence',paragraphs:['La langue dépend de l’adresse de la page. Le thème clair ou sombre suit le réglage de votre appareil. Aucun choix n’est enregistré par le site.']},
{title:'Liens externes',paragraphs:['Instagram n’est pas intégré à la page. Il s’ouvre uniquement lorsque vous suivez un lien. Son fonctionnement et ses cookies relèvent de sa propre politique.']},
{title:'Évolution du site',paragraphs:['Tout ajout de suivi ou de stockage nécessitera une mise à jour de cette page et une vérification des obligations applicables.']}
]},
{slug:'conditions-generales',title:'Conditions générales',metaTitle:'Conditions générales | Haddar Bijoux',description:'Retrouvez le cadre des commandes Haddar Bijoux sur Instagram, les informations de l’entreprise et les modalités qui restent à confirmer.',sections:[
{title:'Identité du professionnel',fields:[['Nom légal',b.legalName],['Forme juridique',b.legalForm],['RNE',b.rne],['Identifiant fiscal',b.taxId],['Adresse',b.address]]},
{title:'Commander',paragraphs:[b.facts.order.fr,b.facts.delivery.fr]},
{title:'Paiement, livraison et personnalisation',fields:[['Paiement',b.paymentMethods],['Zones de livraison',b.deliveryAreas],['Délais de livraison',b.deliveryDelays],['Personnalisation',b.customizationOptions]]},
{title:'Matériau et garantie',paragraphs:[b.facts.gold.fr,b.facts.hallmark.fr,b.warrantyTerms]},
{title:'Conditions de vente',paragraphs:[b.commercialTerms]}
]},
{slug:'retours-et-remboursement',title:'Retours et remboursement',metaTitle:'Retours et remboursement | Haddar Bijoux',description:'Consultez le délai de retour Haddar Bijoux, calculé depuis la date du paiement, et les modalités de remboursement restant à confirmer.',sections:[
{title:'Délai de retour',paragraphs:[b.facts.returns.fr],fields:[['Point de départ et délai',b.returnWindow]]},
{title:'Demander un retour',fields:[['Contact',b.returnContact]]},
{title:'Conditions et frais',fields:[['État et conditions de retour',b.returnConditions],...field('Pièces personnalisées',b.personalizedExclusions),...field('Pièces assorties',b.matchingExclusions),['Frais de retour',b.returnShipping]]},
{title:'Remboursement et échange',fields:[['Méthode de remboursement',b.refundMethod],['Délai de remboursement',b.refundTiming],['Échange',b.exchangeTerms]]},
{title:'Validation juridique',paragraphs:[b.returnLegalReview]}
]}
];
