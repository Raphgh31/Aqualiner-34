import type { MediaId } from './media'

type TeamMember = {
  name: string
  role: string
  photo: MediaId
}

type Town = {
  name: string
  /** Latitude et longitude approximatives, pour la carte schématique. */
  lat: number
  lon: number
  /** Ville citée comme secteur d'intervention sur le site actuel ou dans la presse. */
  main?: boolean
}

export const company = {
  name: 'Aqualiner 34',
  baseline: 'Rénovation et construction de piscines en membrane armée',
  phone: { href: 'tel:+33622856095', display: '06 22 85 60 95' },
  email: 'contact@aqualiner34.fr',
  address: { street: '9 rue Clément Ader', postalCode: '34290', city: 'Abeilhan', region: 'Hérault' },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aqualiner+34+9+rue+Cl%C3%A9ment+Ader+34290+Abeilhan',
  founded: '2008-11-01',
  publisher: 'Jean-Philippe Pagnon',
  team: [
    { name: 'Jean-Philippe Pagnon', role: 'Dirigeant commercial', photo: 'equipe-jean-philippe' },
    { name: 'Wladimir Dubreuil', role: 'Dirigeant technique', photo: 'equipe-wladimir' },
    { name: 'Daniel', role: 'Dirigeant technique', photo: 'equipe-daniel' },
  ] satisfies TeamMember[],
  workshop: { name: 'Abeilhan', lat: 43.4517, lon: 3.2958 },
  towns: [
    { name: 'Béziers', lat: 43.3442, lon: 3.2158, main: true },
    { name: 'Agde', lat: 43.3108, lon: 3.4758, main: true },
    { name: 'Pézenas', lat: 43.4594, lon: 3.4233, main: true },
    { name: 'Narbonne', lat: 43.1839, lon: 3.0042, main: true },
    { name: "Clermont-l'Hérault", lat: 43.6275, lon: 3.4322, main: true },
    { name: 'Sète', lat: 43.4028, lon: 3.6928 },
    { name: 'Saint-Chinian', lat: 43.4222, lon: 2.9469 },
    { name: 'Valras-Plage', lat: 43.2483, lon: 3.2914 },
    { name: 'Vias', lat: 43.3122, lon: 3.4172 },
    { name: 'Marseillan', lat: 43.3567, lon: 3.5289 },
    { name: 'Gignac', lat: 43.6522, lon: 3.5508 },
    { name: 'Lodève', lat: 43.7317, lon: 3.3194 },
    { name: 'Montpellier', lat: 43.6108, lon: 3.8767 },
  ] satisfies Town[],
  /** Engagements tirés du site actuel et de l'entretien de 2017. */
  commitments: [
    {
      title: 'Des engagements tenus',
      text: 'Un travail soigné, la ponctualité et le respect de ce qui a été convenu : c’est ainsi que les deux fondateurs décrivent le respect du client.',
    },
    {
      title: 'Disponibles pendant le chantier',
      text: 'Une question pendant les travaux ? L’équipe vous répond tout au long de l’intervention.',
    },
    {
      title: 'Un chantier rendu propre',
      text: 'Les outils sont retirés, les abords nettoyés : on vous rend un jardin, pas un chantier.',
    },
  ],
  labels: [
    { title: 'Pro Piscine', text: 'Label de la Fédération des professionnels de la piscine (badge « entreprise engagée 2014 »).' },
    { title: 'Assurance décennale', text: 'Toutes les poses sont couvertes par la garantie décennale.' },
    { title: 'Garantie fabricant', text: 'Membrane armée garantie 10 ans contre les défauts d’étanchéité.' },
  ],
  press: {
    title: 'L’Activité Piscine, n° 105',
    date: '2017-09-01',
    headline: 'Aqua Liner 34, rénovations et constructions',
    image: 'presse-2017',
    quote: 'Nous sommes capables de quasiment tout reproduire.',
    quoteAuthor: 'Jean-Philippe Pagnon, à propos des motifs sur mesure',
  },
} as const

export type Company = typeof company

export const zoneSentence = 'Béziers, Agde, Pézenas, Narbonne, Clermont-l’Hérault, Sète, Saint-Chinian, Valras, Vias, Marseillan, Gignac, Lodève et jusqu’aux abords de Montpellier.'
