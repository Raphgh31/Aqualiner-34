// Inventaire des images du site.
// Toutes viennent du site actuel aqualiner34.fr (médiathèque Wix « 55988d_ ») :
// photos de chantiers de l'entreprise, sauf mention contraire dans `origin`.
// `crop` : fractions de l'image source (gauche, haut, largeur, hauteur).
// `sizes` : jeu de largeurs générées (voir SIZES dans build-images.mjs).

const wix = (uri) => `https://static.wixstatic.com/media/${uri}`

const SITE = 'Photographie de chantier Aqualiner 34, publiée sur aqualiner34.fr'
const SCAN = 'Scan du nuancier Renolit Alkorplan Touch, publié sur aqualiner34.fr (recadré)'

const DRY_LEFT = { left: 0.03, top: 0.11, width: 0.6, height: 0.58 }
const WET_RIGHT = { left: 0.71, top: 0.02, width: 0.27, height: 0.68 }
const DRY_RIGHT = { left: 0.36, top: 0.11, width: 0.6, height: 0.58 }
const WET_LEFT = { left: 0.01, top: 0.02, width: 0.27, height: 0.68 }

/** @type {Array<{id: string, uri: string, alt: string, sizes: 'plein'|'large'|'moyen'|'natif', crop?: {left:number, top:number, width:number, height:number}, flatten?: string, origin?: string, date?: string | null}>} */
export const MEDIA = [
  // — Croix occitane (juillet 2018)
  {
    id: 'croix-occitane',
    uri: '55988d_601fa2e6158a4dd39992bdd71232ebe6~mv2.jpg',
    sizes: 'plein',
    alt: "Bassin rectangulaire en membrane anthracite, une grande croix occitane claire soudée au fond ; margelles en pierre claire, gazon d'un côté, gravier blanc et plantes de l'autre.",
  },
  {
    id: 'croix-occitane-portrait',
    uri: '55988d_601fa2e6158a4dd39992bdd71232ebe6~mv2.jpg',
    sizes: 'large',
    crop: { left: 0.255, top: 0, width: 0.43, height: 1 },
    alt: 'La croix occitane soudée au fond du bassin, vue plongeante sur la membrane anthracite.',
  },
  {
    id: 'croix-occitane-escalier',
    uri: '55988d_9d0211488f974cad9c64b872f824632c~mv2.jpg',
    sizes: 'plein',
    alt: "Le même bassin vu depuis l'angle de l'escalier : banquette immergée et marches habillées de membrane, eau sombre et margelles claires.",
  },

  // — Gecko et tonneaux (mars et avril 2022)
  {
    id: 'gecko-tonneaux',
    uri: '55988d_f8216fff2beb42f495acda24ecf193f2~mv2.jpg',
    sizes: 'plein',
    alt: "Terrasse avec tonneaux et lame d'eau ; dans le bassin à membrane sombre, une banquette imprimée bois et un gecko clair au fond.",
  },
  {
    id: 'gecko-tonneaux-eau',
    uri: '55988d_f8216fff2beb42f495acda24ecf193f2~mv2.jpg',
    sizes: 'plein',
    crop: { left: 0.05, top: 0.3, width: 0.9, height: 0.7 },
    alt: "La banquette imprimée bois et le gecko vus à travers l'eau, sous la lame d'eau.",
  },
  {
    id: 'gecko-tonneaux-nuit',
    uri: '55988d_e7d426273fe34a7695078fbb7199c563~mv2.jpg',
    sizes: 'large',
    alt: "Le même bassin de nuit : éclairage coloré, lame d'eau illuminée et reflets sur la terrasse.",
  },

  // — Au pied du château (rénovation)
  {
    id: 'chateau-ancien',
    uri: '55988d_af955ffa52cd40acad57b17502bcc685~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: "L'ancien bassin avant travaux : revêtement bleu pâle décoloré et taché, dallage autour.",
  },
  {
    id: 'chateau-avant',
    uri: '55988d_22934fa35f234f5198d90eb70aaa6aab~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: "Le bassin vidé, l'ancien revêtement à nu ; derrière la clôture, les tours du château.",
  },
  {
    id: 'chateau-membrane',
    uri: '55988d_e8e1e0c73afb4544bfe8acbe31576a28~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'La membrane armée bleu foncé posée sur le fond et les parois, avant la mise en eau.',
  },
  {
    id: 'chateau-pose',
    uri: '55988d_308b3df86ded46cf9412013634f9bb63~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'La membrane posée, photographiée depuis le même coin que le bassin vidé, château en arrière-plan.',
  },
  {
    id: 'chateau-apres',
    uri: '55988d_9a4d1df50ad844258fd65a71477c1e06~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: "Le bassin rénové et rempli, membrane bleu foncé ; au-dessus des arbres, une tour du château.",
  },

  // — Escalier d'angle (rénovation)
  {
    id: 'angle-avant',
    uri: '55988d_8048905795154fbf89286ec0e1ffa40b~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: "Avant : l'escalier d'angle en mosaïque, ancien revêtement délavé.",
  },
  {
    id: 'angle-vide',
    uri: '55988d_f49791b4f4ad4b11a1eabb502f9996f9~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'Le bassin vidé et nettoyé avant la pose, un tonneau posé sur la margelle.',
  },
  {
    id: 'angle-pose',
    uri: '55988d_0a7f2e2a902546ae8f7322863c551a08~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'Pendant la pose : les premiers lés de membrane gris clair sur les parois.',
  },
  {
    id: 'angle-escalier',
    uri: '55988d_996dcd8fa4ff46a19deb6aa0295c655c~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: "L'escalier d'angle habillé de membrane, sous l'eau.",
  },
  {
    id: 'angle-apres',
    uri: '55988d_d1584d34836740328426a78ddab2b92d~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'Après : le bassin en forme libre rempli, membrane gris-bleu, un jet de refoulement en marche.',
  },
  {
    id: 'angle-reflets',
    uri: '55988d_a63abda349434b8084ef8af0ed803c59~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'Reflets du soleil sur la membrane du bassin rénové.',
  },
  {
    id: 'angle-fontaine',
    uri: '55988d_efa0b349c68342e382170276161fa20f~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'Fontaine en forme de dauphin et demi-tonneau au bord du bassin rénové.',
  },

  // — Couloir de nage (juin 2018)
  {
    id: 'couloir',
    uri: '55988d_096d58e1e04e4b1d97e766ddc1c47289~mv2.jpg',
    sizes: 'plein',
    crop: { left: 0.06, top: 0, width: 0.94, height: 0.8 },
    alt: "Long bassin étroit au ras d'une pelouse, membrane claire, olivier taillé et haie de végétation méditerranéenne.",
  },
  {
    id: 'couloir-plage',
    uri: '55988d_155081a7f09840009a1615ddf107300e~mv2.jpg',
    sizes: 'large',
    alt: "Les marches en largeur à l'extrémité du couloir de nage, eau turquoise sur membrane claire.",
  },

  // — Escalier roman (juin 2018)
  {
    id: 'roman',
    uri: '55988d_6a024bda69cd468f8e70c1f82f2fbdf2~mv2.jpg',
    sizes: 'large',
    alt: 'Escalier roman en demi-cercle habillé de membrane bleu foncé, margelles couleur sable.',
  },
  {
    id: 'roman-bassin',
    uri: '55988d_c9bb7ab7febd4e55bcf1b217966144f0~mv2.jpg',
    sizes: 'large',
    crop: { left: 0, top: 0.04, width: 0.86, height: 0.72 },
    alt: 'Le bassin aux bouts arrondis vu de côté, escalier roman à gauche, reflets des arbres.',
  },

  // — Nocturne (avril 2018)
  {
    id: 'nocturne',
    uri: '55988d_030369b7d5784621869599efccdb2b43~mv2.jpg',
    sizes: 'large',
    alt: "Le bassin de nuit : éclairage bleu, jets d'eau et ruban lumineux le long de la margelle.",
  },
  {
    id: 'nocturne-jour',
    uri: '55988d_4a9b9e1fe7ad449e9c3423d19b3b0b4e~mv2.jpg',
    sizes: 'large',
    alt: 'Le même bassin de jour : membrane sombre, bordure noire, jets en marche.',
  },

  // — Bleu profond (juin 2018)
  {
    id: 'bleu',
    uri: '55988d_09db7827efb242439a85aa48e71823a3~mv2.jpg',
    sizes: 'large',
    alt: 'Membrane bleu foncé, un motif clair au fond et une échelle inox.',
  },
  {
    id: 'bleu-escalier',
    uri: '55988d_84fec566b25948e3b250541bcf8d3547~mv2.jpg',
    sizes: 'large',
    alt: 'Escalier roman immergé dans un bassin à membrane bleue, margelles claires.',
  },

  // — Nuit turquoise
  {
    id: 'nuit-turquoise',
    uri: '55988d_8973ebede51b42efa1f9aa8b91dfc106~mv2.jpg',
    sizes: 'large',
    date: null,
    alt: 'Bassin aux courbes libres éclairé de nuit, escalier immergé, palmiers, cycas et oranger, gravier blanc.',
  },

  // — Savoir-faire
  {
    id: 'soudure',
    uri: '55988d_5d08274921f04f289d52cfdd592e1adc~mv2.jpg',
    sizes: 'plein',
    crop: { left: 0, top: 0.11, width: 1, height: 0.89 },
    alt: "Un poseur soude à l'air chaud la membrane ardoise sur le haut d'une paroi, un rouleau presseur à la main ; en bas, un motif gecko déjà en place.",
  },
  {
    id: 'soudure-mains',
    uri: '55988d_5d08274921f04f289d52cfdd592e1adc~mv2.jpg',
    sizes: 'large',
    crop: { left: 0, top: 0.11, width: 0.62, height: 0.89 },
    alt: "Les mains du poseur : la buse du pistolet à air chaud et le rouleau presseur sur la membrane.",
  },
  {
    id: 'gecko-paroi',
    uri: '55988d_f9eea60277d04842a4a5e6fdb9f81686~mv2.jpg',
    sizes: 'large',
    date: null,
    alt: 'Gecko tribal découpé dans une membrane blanche marbrée et soudé sur une paroi en membrane ardoise, bassin encore vide.',
  },
  {
    id: 'local-technique',
    uri: '55988d_610b018dcdcc405f860c432017f8daa4~mv2.jpg',
    sizes: 'large',
    date: null,
    alt: 'Local technique : filtre à sable, pompe, électrolyseur et vannes raccordés.',
  },
  {
    id: 'skimmer',
    uri: '55988d_5920169328f3433397ddafd830e93644~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'Un skimmer neuf posé dans sa tranchée, avant le remblai.',
  },
  {
    id: 'escalier-beton',
    uri: '55988d_12c0f85036e74e269c10fa82ca41099b~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: "Un escalier d'angle en béton brut, avant la pose de la membrane.",
  },
  {
    id: 'escalier-membrane',
    uri: '55988d_7417caa5acaa4bcda3b6d64d618bfd37~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: "Un escalier d'angle habillé de membrane gris clair, angles et nez de marche soudés.",
  },

  // — Motifs
  {
    id: 'motif-croix-noire',
    uri: '55988d_1a2dd6bd0e4c47d4851320be5ca845ff~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: "Croix occitane blanche soudée sur une membrane noire, sous l'eau et ses reflets.",
  },
  {
    id: 'motif-poisson',
    uri: '55988d_7a2c6077b4e3495b862733a3a4828ad3~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'Poisson stylisé en membrane claire soudé sur un fond bleu.',
  },
  {
    id: 'motif-croix-bleue',
    uri: '55988d_dd39022c6fb543fcad30c7218a7a45a4~mv2.jpg',
    sizes: 'natif',
    date: null,
    alt: 'Croix occitane bleu soutenu sur une membrane bleu clair, bassin vide avant la mise en eau.',
  },
  {
    id: 'motif-croix-blanche',
    uri: '55988d_1d46deb5737548f4886a30f5d268c786~mv2.jpg',
    sizes: 'large',
    alt: 'Croix occitane blanche au fond d’un bassin à membrane bleue, escalier roman.',
  },
  {
    id: 'motif-gecko-fond',
    uri: '55988d_0cef454291b64f83921814f174792ead~mv2.jpg',
    sizes: 'large',
    alt: 'Bassin à bordure de carrelage sombre, un gecko soudé au fond, terrasse et pergola.',
  },
  {
    id: 'motif-lion',
    uri: '55988d_f2fbf4b231de476b9bb29b0a2049b79a~mv2.png',
    sizes: 'moyen',
    date: null,
    flatten: '#eff2f1',
    origin: 'Dessin de motif « lion tribal » (2016), publié sur aqualiner34.fr',
    alt: 'Dessin noir d’une tête de lion tribale, préparé pour être découpé dans la membrane.',
  },

  // — Carnet de chantier
  { id: 'carnet-lagon', uri: '55988d_08398beb950843129a5d5002583205cc~mv2.jpg', sizes: 'large', alt: "Bassin à l'eau turquoise sur membrane claire, dallage en pierre irrégulière et pelouse." },
  { id: 'carnet-lagon-2', uri: '55988d_6f351134c82d4a73b6edd65f8e2e4399~mv2.jpg', sizes: 'large', alt: 'Le même bassin vu de près : angle rentrant, marches et eau claire.' },
  { id: 'carnet-sureleve', uri: '55988d_a538df33e5ef46c58c5878b0c1178795~mv2.jpg', sizes: 'large', alt: 'Bassin surélevé à bords droits, membrane bleu-vert, végétation et pots fleuris au premier plan.' },
  { id: 'carnet-long', uri: '55988d_54f363a10b8d4d14880fe0c719bd83c4~mv2.jpg', sizes: 'large', alt: 'Long bassin rectangulaire, eau bleu vif, margelles et bains de soleil blancs.' },
  { id: 'carnet-banquette', uri: '55988d_423304a41ec146008c6a7e4438b639ad~mv2.jpg', sizes: 'large', alt: 'Banquette et marches immergées, membrane grise, robot nettoyeur au fond.' },
  { id: 'carnet-banquette-2', uri: '55988d_8b758e6d7ec64ad0ae3095eb3730737f~mv2.jpg', sizes: 'large', alt: 'Le même bassin vu dans sa longueur, plage immergée le long de la margelle.' },
  { id: 'carnet-terrasse-bois', uri: '55988d_1733ed57beea430b83f88e8f49113e6a~mv2.jpg', sizes: 'large', alt: 'Bassin rectangulaire à membrane sombre et bordure ardoise, terrasse en bois et plantes.' },
  { id: 'carnet-marches', uri: '55988d_6d8a4ff18fb34547b7ee6a70d0b8d762~mv2.jpg', sizes: 'large', alt: "Marches d'angle immergées, membrane claire, eau très transparente." },
  { id: 'carnet-matelas', uri: '55988d_29204e48431948eca59499a20cfee9e9~mv2.jpg', sizes: 'large', alt: 'Bassin bleu vif, matelas gonflable et frite de piscine, margelles claires.' },
  { id: 'carnet-plage', uri: '55988d_9c80293734894ce0a8bc0341d3350a2a~mv2.jpg', sizes: 'large', alt: 'Plage immergée en angle, ombre des arbres sur l’eau claire.' },
  { id: 'carnet-rampe', uri: '55988d_f15084645445414c8dbb8040376c0af2~mv2.jpg', sizes: 'large', alt: 'Bassin bleu vu depuis la plage, rampe inox et dallage terre cuite.' },
  { id: 'carnet-escalier-droit', uri: '55988d_b72b780c3a31428788bb5a0da121a8a6~mv2.jpg', sizes: 'large', alt: "Escalier droit habillé de membrane, skimmer et margelles en pierre." },
  { id: 'carnet-tomettes', uri: '55988d_d201ea59bc1641e2a6b84888741943f9~mv2.jpg', sizes: 'large', alt: 'Bassin rectangulaire bordé de tomettes, eau turquoise, pergola et végétation.' },
  { id: 'carnet-bois-clair', uri: '55988d_b939f2434832440ba5d4dd11c8afb763~mv2.jpg', sizes: 'large', date: null, alt: 'Bassin à membrane claire, large marche immergée, terrasse en lames imitation bois.' },
  { id: 'carnet-margelles-grises', uri: '55988d_4a9f4d35b42748a3974ba2291a69bcdb~mv2.jpg', sizes: 'large', alt: 'Bassin à membrane claire, margelles grises et escalier droit dans la longueur.' },
  { id: 'carnet-pinede', uri: '55988d_53cd3596312e4dc09ed242f4d2dc9c02~mv2.jpg', sizes: 'natif', date: '2018-05-16', alt: 'Bassin turquoise entouré d’une terrasse en bois, pinède et canisses en arrière-plan.' },
  { id: 'carnet-mer', uri: '55988d_84e3fc4381304702b9315b1f33c2718e~mv2.jpg', sizes: 'natif', date: null, alt: 'Bassin turquoise entre deux palmiers, au-dessus d’une plage et de la mer.' },
  { id: 'carnet-abri', uri: '55988d_8dcba611c4b6452caaa2af267abc7901~mv2.jpg', sizes: 'natif', date: null, alt: 'Bassin sous abri vitré, membrane claire, dallage en pierre.' },
  { id: 'carnet-residence', uri: '55988d_57dbb9ebb270453ebcb64f135d0a9dc4~mv2.jpg', sizes: 'natif', date: null, alt: 'Grand bassin collectif bordé de transats bleus, en bord de jardin.' },
  { id: 'carnet-haricot', uri: '55988d_422b05118095452cb9adfb95a17ae9d4~mv2.jpg', sizes: 'natif', date: null, alt: 'Bassin en forme de haricot, eau claire et margelles en pierre.' },
  { id: 'carnet-palmier', uri: '55988d_6b0812af9d604abd8c943afbfa3c1d53~mv2.jpg', sizes: 'natif', date: null, alt: 'Bassin en forme libre sous les palmiers, dallage en pierre irrégulière.' },
  { id: 'carnet-banquette-sombre', uri: '55988d_1539876062ed461382fb7500c0398611~mv2.jpg', sizes: 'natif', date: null, alt: 'Membrane gris foncé, banquette et marches en angle, margelles blanches.' },
  { id: 'carnet-transats', uri: '55988d_0bf7331d490b4bd28962d13d7649bb11~mv2.jpg', sizes: 'natif', date: null, alt: 'Bassin rectangulaire, transats orange et façade ocre.' },
  { id: 'carnet-colonnes', uri: '55988d_656fcbc65ff54b5b85655d9e8178d047~mv2.jpg', sizes: 'natif', date: null, alt: 'Bassin aux eaux très claires devant une maison à colonnes.' },
  { id: 'carnet-chantier', uri: '55988d_26379fadc92140db9d73a4f3ad269cc3~mv2.jpg', sizes: 'natif', date: null, alt: 'Grand bassin vidé en cours de rénovation, escalier en largeur.' },

  // — Matières : nuancier 3D Touch (scans recadrés)
  { id: 'texture-ardoise', uri: '55988d_5b868e9a06d24023bc018f9db24afdcb~mv2.png', sizes: 'moyen', crop: DRY_LEFT, origin: SCAN, date: null, alt: 'Membrane 3D Touch aspect ardoise, gris-bleu veiné, à sec.' },
  { id: 'texture-ardoise-eau', uri: '55988d_5b868e9a06d24023bc018f9db24afdcb~mv2.png', sizes: 'moyen', crop: WET_RIGHT, origin: SCAN, date: null, alt: "Membrane aspect ardoise sous l'eau : bleu profond et reflets." },
  { id: 'texture-sable', uri: '55988d_16e413e2f0004fcfb0234dece5e23f9a~mv2.png', sizes: 'moyen', crop: DRY_RIGHT, origin: SCAN, date: null, alt: 'Membrane 3D Touch aspect sable, beige grainé, à sec.' },
  { id: 'texture-sable-eau', uri: '55988d_16e413e2f0004fcfb0234dece5e23f9a~mv2.png', sizes: 'moyen', crop: WET_LEFT, origin: SCAN, date: null, alt: "Membrane aspect sable sous l'eau : eau claire et dorée." },
  { id: 'texture-pierre', uri: '55988d_0419493a769249bfb067265b29d91bc0~mv2.png', sizes: 'moyen', crop: DRY_RIGHT, origin: SCAN, date: null, alt: 'Membrane 3D Touch aspect pierre, ocre et brun nuancés, à sec.' },
  { id: 'texture-pierre-eau', uri: '55988d_0419493a769249bfb067265b29d91bc0~mv2.png', sizes: 'moyen', crop: WET_LEFT, origin: SCAN, date: null, alt: "Membrane aspect pierre sous l'eau : vert et ocre mêlés." },
  { id: 'texture-pierre-jaune', uri: '55988d_7348df2af2e34b4f8bf0176a9d875f52~mv2.png', sizes: 'moyen', crop: DRY_RIGHT, origin: SCAN, date: null, alt: 'Membrane 3D Touch aspect pierre jaune, grain clair, à sec.' },
  { id: 'texture-pierre-jaune-eau', uri: '55988d_7348df2af2e34b4f8bf0176a9d875f52~mv2.png', sizes: 'moyen', crop: WET_LEFT, origin: SCAN, date: null, alt: "Membrane aspect pierre jaune sous l'eau : vert d'eau lumineux." },
  { id: 'texture-beton-gris', uri: '55988d_30c98cec37964caaabfdefee5652fdeb~mv2.png', sizes: 'moyen', crop: DRY_LEFT, origin: SCAN, date: null, alt: 'Membrane 3D Touch aspect béton gris, texture minérale, à sec.' },
  { id: 'texture-beton-gris-eau', uri: '55988d_30c98cec37964caaabfdefee5652fdeb~mv2.png', sizes: 'moyen', crop: WET_RIGHT, origin: SCAN, date: null, alt: "Membrane aspect béton gris sous l'eau : gris perle et reflets." },
  { id: 'texture-marbre-blanc', uri: '55988d_00614cc9b9914832aca54a38b1f585d9~mv2.png', sizes: 'moyen', crop: DRY_LEFT, origin: SCAN, date: null, alt: 'Membrane 3D Touch aspect marbre blanc, veines fines, à sec.' },
  { id: 'texture-marbre-blanc-eau', uri: '55988d_00614cc9b9914832aca54a38b1f585d9~mv2.png', sizes: 'moyen', crop: WET_RIGHT, origin: SCAN, date: null, alt: "Membrane aspect marbre blanc sous l'eau : bleu très pâle." },

  // — L'atelier
  { id: 'equipe-jean-philippe', uri: '55988d_6cc9e9d501884f9d8a4f96a3824c45b2~mv2.jpg', sizes: 'natif', date: null, alt: 'Portrait de Jean-Philippe Pagnon.' },
  { id: 'equipe-wladimir', uri: '55988d_06c533bc122b4d70962bb30ebf4b256f~mv2.jpg', sizes: 'natif', date: null, alt: 'Portrait de Wladimir Dubreuil.' },
  { id: 'equipe-daniel', uri: '55988d_ec4ded18da3949398da9abda183083c2~mv2.jpg', sizes: 'natif', date: null, alt: 'Portrait de Daniel, dirigeant technique.' },
  { id: 'presse-2017', uri: '55988d_63e223d539f547e4bb38fbbb27303f1f~mv2.jpg', sizes: 'natif', date: '2017-09-01', origin: "Page du magazine L'Activité Piscine n° 105 (septembre 2017), publiée sur aqualiner34.fr", alt: "Double page du magazine L'Activité Piscine de septembre 2017 : article « Aqua Liner 34, rénovations et constructions »." },
  { id: 'label-pro-piscine', uri: '55988d_5f54b5444c004b85ade0211ffddcc775~mv2.jpg', sizes: 'natif', date: null, origin: 'Badge Pro Piscine (Fédération des professionnels de la piscine), publié sur aqualiner34.fr', alt: 'Badge Propiscines, Fédération des professionnels de la piscine, entreprise engagée 2014.' },
].map((entry) => ({ origin: SITE, ...entry, source: wix(entry.uri) }))

// Masques de la surface de l'eau pour le rendu WebGL du hero (polygones en fractions de l'image).
export const MASKS = [
  {
    id: 'croix-occitane',
    polygon: [[0.372, 0.065], [0.652, 0.06], [0.7, 0.3], [0.755, 0.55], [0.8, 0.8], [0.83, 1], [0.02, 1], [0.06, 0.88], [0.135, 0.7], [0.255, 0.46], [0.33, 0.22]],
  },
  {
    id: 'croix-occitane-escalier',
    polygon: [[0.172, 0.245], [0.645, 0.088], [1, 0.405], [1, 1], [0.372, 1], [0.3, 0.73], [0.245, 0.5]],
  },
]
