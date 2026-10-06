import type { MediaId } from './media'

export type Service = {
  slug: string
  title: string
  text: string
  details: string[]
  image?: MediaId
}

/** Prestations décrites sur le site actuel (pages Accueil et Pose & rénovation) et dans l'entretien de 2017. */
export const services: Service[] = [
  {
    slug: 'etancheite',
    title: 'Refaire l’étanchéité',
    text: 'Liner percé, fuites, coque polyester abîmée, peinture à reprendre chaque printemps : l’ancien revêtement est remplacé par une membrane armée de 1,5 mm, soudée sur place. Le bassin est conservé.',
    details: [
      'Bassins en béton, carrelés, peints, coques polyester, panneaux métalliques',
      'Formes rondes, rectangulaires, libres, intérieures ou extérieures',
      '3 à 4 jours de chantier pour remplacer l’étanchéité',
    ],
    image: 'angle-pose',
  },
  {
    slug: 'transformer',
    title: 'Transformer le bassin',
    text: 'La rénovation est l’occasion de modifier le bassin : un escalier en dur, une banquette, un fond rehaussé, un spa intégré, des margelles neuves.',
    details: ['Escalier en dur, banquette, plage immergée', 'Rehausse de fond', 'Spa maçonné', 'Changement de margelles, pièces à sceller supplémentaires'],
    image: 'escalier-membrane',
  },
  {
    slug: 'construire',
    title: 'Construire',
    text: 'Des bassins en béton, en maçonnerie traditionnelle, livrés prêts à plonger : de la petite piscine au grand bassin, étanchés en membrane armée.',
    details: ['Maçonnerie traditionnelle', 'Étanchéité en membrane armée', 'Traitement automatique de l’eau en option'],
  },
  {
    slug: 'local-technique',
    title: 'Remettre à neuf le local technique',
    text: 'Pompe, filtre à sable, électrolyse au sel, régulation automatique du pH et du chlore : la filtration est remplacée ou automatisée.',
    details: ['Changement de pompe et de filtre à sable', 'Traitement au sel', 'pH et chlore automatiques'],
    image: 'local-technique',
  },
  {
    slug: 'reseau',
    title: 'Reprendre le réseau hydraulique',
    text: 'Canalisations, skimmers, projecteurs, bonde de fond, refoulements : le réseau est vérifié, et remplacé quand il le faut.',
    details: ['Canalisations', 'Skimmers et refoulements', 'Projecteurs et bonde de fond'],
    image: 'skimmer',
  },
  {
    slug: 'securite',
    title: 'Sécuriser',
    text: 'Un volet automatique ou une bâche, y compris sur un bassin ancien.',
    details: ['Volet automatique', 'Bâche de sécurité'],
  },
  {
    slug: 'professionnels',
    title: 'Pour les professionnels',
    text: 'Campings, hôtels, restaurants, cabinets de kinésithérapie, collectivités : les mêmes membranes, et votre logo soudé au fond du bassin si vous le souhaitez.',
    details: ['Bassins collectifs', 'Motifs et logos sur mesure', 'Membranes bicolores'],
    image: 'carnet-residence',
  },
]

/** Les cinq étapes d'une pose de membrane armée. */
export const steps = [
  {
    title: 'Étudier le support',
    text: 'Tout commence par la structure : béton, panneaux, coque ou carrelage, chaque paroi appelle une pose différente.',
  },
  {
    title: 'Préparer le bassin',
    text: 'Vidange, nettoyage, reprises de maçonnerie et pièces à sceller : le support doit être sain avant toute pose.',
  },
  {
    title: 'Poser les lés',
    text: 'La membrane arrive en rouleaux de 25 mètres. Chaque lé est découpé et ajusté sur place, au fond et sur les parois.',
  },
  {
    title: 'Souder',
    text: 'Les lés sont soudés entre eux à l’air chaud, puis les jonctions sont scellées au PVC liquide.',
  },
  {
    title: 'Mettre en eau',
    text: 'Le bassin se remplit et la membrane se tend. Les outils sont retirés, les abords nettoyés.',
  },
]

/** Fiche technique de la membrane, d'après les pages « PVC armé » du site actuel et la garantie Renolit. */
export const membrane = {
  layers: [
    { name: 'Vernis de protection', detail: 'côté eau, contre les taches' },
    { name: 'PVC', detail: 'couche supérieure, teintée ou imprimée' },
    { name: 'Trame polyester', detail: 'tissée, haute résistance' },
    { name: 'PVC', detail: 'couche inférieure' },
  ],
  specs: [
    { label: 'Épaisseur', value: '1,5 mm', note: 'membrane 150/100e ; 2 mm pour la gamme 3D Touch' },
    { label: 'Rouleaux', value: '25 m', note: 'lés soudés sur place' },
    { label: 'Assemblage', value: 'Air chaud', note: 'puis cordon de PVC liquide' },
    { label: 'Garantie', value: '10 ans', note: 'étanchéité, garantie du fabricant' },
    { label: 'Durée de vie', value: '15 à 25 ans', note: 'selon l’entretien et le traitement de l’eau' },
  ],
  treatments: ['Anti-UV, contre la décoloration', 'Fongicide et antibactérien, contre les algues', 'Antidérapant, pour les escaliers et les plages'],
  advantages: [
    'Elle épouse toutes les formes : escaliers droits ou romans, débordements, bassins très grands ou irréguliers.',
    'Elle convient aux bassins chauffés par pompe à chaleur et aux bassins sous abri.',
    'Elle accepte les robots et tous les traitements de l’eau, sel comme chlore.',
    'Elle se personnalise : teintes unies, reliefs 3D, membranes bicolores, motifs découpés.',
  ],
}
