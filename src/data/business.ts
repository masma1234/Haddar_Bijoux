// Replace markers only with client-confirmed information. Null means an optional channel is omitted.
export const business = {
  tradeName:'Haddar Bijoux', legalName:'Haddar_Bijoux', legalForm:'[CONFIRMER]',
  rne:'[CONFIRMER]', taxId:'[CONFIRMER]', address:'[CONFIRMER]',
  phone:null as string|null, whatsapp:null as string|null, email:null as string|null,
  openingHours:null as string|null, responseTime:null as string|null,
  deliveryAreas:'[CONFIRMER]', deliveryDelays:'Modalités communiquées sur Instagram', paymentMethods:'Modalités communiquées sur Instagram',
  returnWindow:'7 jours à compter de la date du paiement', returnConditions:'[CONFIRMER]',
  personalizedExclusions:'[CONFIRMER]', matchingExclusions:'[CONFIRMER]',
  returnShipping:'[CONFIRMER]', refundMethod:'[CONFIRMER]', refundTiming:'[CONFIRMER]',
  returnContact:'Contacter @haddar__bijoux sur Instagram', exchangeTerms:'[CONFIRMER]', customizationOptions:'[CONFIRMER]',
  hallmarkDetails:'[CONFIRMER]', material:'Or 18 carats (750/1000)',
  privacyContact:'[CONFIRMER]', hostingRetention:'[CONFIRMER]',
  privacyPolicy:'[CONFIRMER] Finalités, bases applicables, durées de conservation des échanges commerciaux, destinataires, transferts et modalités d’exercice des droits.',
  warrantyTerms:'[CONFIRMER] Étendue, durée, exclusions et procédure de mise en œuvre de la garantie.',
  commercialTerms:'[CONFIRMER] Confirmation de commande, prix et taxes, annulation, réclamations, médiation éventuelle et droit applicable.',
  returnLegalReview:'[CONFIRMER] Cette politique commerciale doit être validée au regard des droits légaux applicables. Les champs incomplets ne définissent aucune exclusion.',
  frenchLegalApproved:false, derjaReviewed:false,
  facts:{
    order:{fr:'Les commandes se font par message privé sur Instagram.',ar:'الطلبيات تتعمل في ميساج على إنستغرام.'},
    custom:{fr:'[CONFIRMER] Bracelets personnalisés et bracelets assortis sur demande.',ar:'[CONFIRMER] وفما زادة أساور على ذوقكم وأساور متناسقة لشخصين.'},
    process:{fr:'[CONFIRMER] Nous confirmons avec vous le modèle, le prix et le délai avant la commande.',ar:'[CONFIRMER] نأكدوا معاكم الموديل والثمن والوقت قبل ما تأكدوا الطلب.'},
    delivery:{fr:'Les modalités de paiement et de livraison sont communiquées sur Instagram.',ar:'تفاصيل الخلاص والتوصيل تلقاوها على إنستغرام.'},
    returns:{fr:'Vous pouvez retourner un bijou qui ne vous plaît pas dans les 7 jours suivant la date du paiement.',ar:'تنجموا ترجّعوا القطعة كان ما عجبتكمش في ظرف جمعة من نهار الخلاص.'},
    gold:{fr:'Tous nos bijoux sont en or 18 carats, soit 750 millièmes d’or.',ar:'كل مجوهراتنا من الدهب عيار 18، يعني 750 من 1000 دهب.'},
    hallmark:{fr:'Les bijoux sont accompagnés d’un certificat de garantie. Contactez-nous sur Instagram pour les détails du poinçon.',ar:'القطع الكل معاها شهادة ضمان. ابعثولنا على إنستغرام باش تعرفوا تفاصيل الدمغة.'},
  },
};
export const draft={tradeName:'Haddar Bijoux',handle:'@haddar__bijoux',instagram:'https://www.instagram.com/haddar__bijoux/',dm:'https://ig.me/m/haddar__bijoux'};
export const confirmed=(value:unknown):value is string=>typeof value==='string'&&value.length>0&&!value.includes('[CONFIRMER]');
