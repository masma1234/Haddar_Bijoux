// Replace markers only with client-confirmed information. Null means an optional channel is omitted.
export const business = {
  tradeName:'Haddar Bijoux', legalName:'Haddar_Bijoux', legalForm:'[CONFIRMER]',
  rne:'[CONFIRMER]', taxId:'[CONFIRMER]', address:'Old Medina of Sfax, Rue laadoul, Sfax 3000',
  phone:null as string|null, whatsapp:null as string|null, email:null as string|null,
  openingHours:null as string|null, responseTime:null as string|null,
  deliveryAreas:'[CONFIRMER]', deliveryDelays:'Modalités communiquées sur Instagram', paymentMethods:'Modalités communiquées sur Instagram',
  returnWindow:'7 jours à compter de la date du paiement', returnConditions:'[CONFIRMER]',
  personalizedExclusions:null as string|null, matchingExclusions:null as string|null,
  returnShipping:'[CONFIRMER]', refundMethod:'[CONFIRMER]', refundTiming:'[CONFIRMER]',
  returnContact:'Contacter @haddar_bijoux sur Instagram', exchangeTerms:'[CONFIRMER]', customizationOptions:'Personnalisation et bracelets assortis confirmés sur Instagram.',
  hallmarkDetails:null as string|null, material:'Or 18 carats',
  privacyContact:'[CONFIRMER]', hostingRetention:'[CONFIRMER]',
  privacyPolicy:'[CONFIRMER] Finalités, bases applicables, durées de conservation des échanges commerciaux, destinataires, transferts et modalités d’exercice des droits.',
  warrantyTerms:'Certificat de garantie fourni avec les bijoux.',
  commercialTerms:'[CONFIRMER] Confirmation de commande, prix et taxes, annulation, réclamations, médiation éventuelle et droit applicable.',
  returnLegalReview:'[CONFIRMER] Cette politique commerciale doit être validée au regard des droits légaux applicables. Les champs incomplets ne définissent aucune exclusion.',
  frenchLegalApproved:false, derjaReviewed:false,
  facts:{
    order:{fr:'Les commandes se font par message privé sur Instagram.',ar:'الطلبيات تتعمل في ميساج على إنستغرام.'},
    custom:{fr:'Bracelets personnalisés et bracelets assortis disponibles sur demande.',ar:'فما أساور على ذوقكم وأساور متناسقة متوفّرة على الطلب.'},
    process:{fr:'Écrivez-nous sur Instagram pour parler du modèle souhaité.',ar:'اكتبولنا على إنستغرام باش تحكيو على الموديل اللي تحبّوه.'},
    delivery:{fr:'Les modalités de paiement et de livraison sont communiquées sur Instagram.',ar:'تفاصيل الخلاص والتوصيل تلقاوها على إنستغرام.'},
    returns:{fr:'Vous pouvez retourner un bijou qui ne vous plaît pas dans les 7 jours suivant la date du paiement.',ar:'تنجموا ترجّعوا القطعة كان ما عجبتكمش في ظرف جمعة من نهار الخلاص.'},
    gold:{fr:'Tous nos bijoux sont en or 18 carats.',ar:'كل مجوهراتنا من الدهب عيار 18.'},
    hallmark:{fr:'Les bijoux sont accompagnés d’un certificat de garantie.',ar:'القطع الكل معاها شهادة ضمان.'},
  },
};
export const draft={tradeName:'Haddar Bijoux',handle:'@haddar_bijoux',instagram:'https://www.instagram.com/haddar_bijoux/',dm:'https://ig.me/m/haddar_bijoux'};
export const confirmed=(value:unknown):value is string=>typeof value==='string'&&value.length>0&&!value.includes('[CONFIRMER]');
