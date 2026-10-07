import { zoneSentence } from './company'

export type Question = { question: string; answer: string }

/** Réponses tirées du site actuel (pages « PVC armé ») et de la garantie Renolit. */
export const faq: Question[] = [
  {
    question: 'Qu’est-ce qu’une membrane armée ?',
    answer:
      'Un revêtement d’étanchéité de 1,5 mm (150/100e) : une trame en polyester haute résistance prise entre deux couches de PVC, avec un vernis de protection côté eau. Elle arrive en rouleaux de 25 mètres et se soude sur place, sur le fond et les parois du bassin.',
  },
  {
    question: 'Sur quels bassins peut-on la poser ?',
    answer:
      'Presque tous : béton, carrelage, peinture, coque polyester abîmée, panneaux métalliques ; formes rectangulaires, rondes ou libres, escaliers, débordements, très grands bassins. La structure est étudiée d’abord, car le type de paroi change la façon de poser.',
  },
  {
    question: 'Combien de temps dure le chantier ?',
    answer: 'Le remplacement d’une étanchéité en membrane armée se fait en 3 à 4 jours, hors travaux de maçonnerie éventuels.',
  },
  {
    question: 'Quelle garantie ?',
    answer:
      'La membrane est garantie 10 ans contre les défauts d’étanchéité par le fabricant. Les poses sont couvertes par l’assurance décennale de l’entreprise.',
  },
  {
    question: 'Combien de temps dure une membrane armée ?',
    answer: 'De 15 à 25 ans, selon l’entretien, l’exposition au soleil et le traitement de l’eau.',
  },
  {
    question: 'Peut-on chauffer l’eau ?',
    answer: 'Oui : la membrane convient aux bassins équipés d’une pompe à chaleur et aux bassins sous abri ou sous dôme.',
  },
  {
    question: 'Combien coûte une rénovation ?',
    answer:
      'Cela dépend de la taille et de la forme du bassin, de son état et de la finition choisie (unie, imprimée, en relief). Décrivez votre bassin : la réponse viendra avec un devis.',
  },
  {
    question: 'Intervenez-vous près de chez moi ?',
    answer: `Depuis Abeilhan, l’équipe se déplace principalement à ${zoneSentence}`,
  },
]
