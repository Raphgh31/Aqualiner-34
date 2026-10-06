# Aqualiner 34 — site vitrine

Refonte du site d'Aqualiner 34 (rénovation et construction de piscines en membrane armée, Abeilhan, Hérault). Répondre et rédiger en français.

## Commandes

- `npm run dev` — serveur de développement
- `npm test` — tests Vitest (contenus, images, utilitaires)
- `npm run build` — vérification TypeScript puis build Vite dans `dist/`
- `npm run images` — régénère `public/media/` et `src/content/media.generated.json` depuis `scripts/media.config.mjs` (télécharge les originaux dans `.cache/`)
- `python3 scripts/fonts/subset.py` — régénère `public/fonts/archivo.woff2` (prérequis : `pip install fonttools brotli`)

## Pile

Vite + React + TypeScript, React Router v8 en `HashRouter` (`base: './'`, GitHub Pages), Motion (`motion/react`, ex-Framer Motion) sous `MotionConfig reducedMotion="user"`, Lenis (défilement doux, ordinateur seulement), WebGL natif sans bibliothèque, CSS Modules + jetons dans `src/styles/tokens.css`.

## Règles de contenu

- **Ne jamais inventer** : chiffres, avis, communes, années, certifications. Toute inconnue est `null` dans `src/content/*.ts` et s'affiche « À préciser ».
- Sources des faits : `docs/audit/2026-10-06-audit-site-actuel.md` (site actuel, article *L'Activité Piscine* de septembre 2017, garantie Renolit).
- Photos : uniquement des chantiers réels d'Aqualiner. Ne pas réintroduire les images de banque ni les photos n° 3, 4 et 5 écartées dans l'audit.
- Typographie française : espace insécable avant `: ; ! ?` et à l'intérieur des guillemets « ».

## Direction artistique

Spec : `docs/superpowers/specs/2026-10-06-refonte-aqualiner34-design.md` (section 3). Contrat : `.impeccable/surfaces/`.

- « Signalétique de bassin » : on descend de la surface (0,00 m) jusqu'au fond. Jauge de profondeur, marquages rouges près de la surface et turquoise dans les sections profondes (`.profond`).
- Une seule police, Archivo, en trois largeurs (étendue pour les titres, condensée pour les chiffres, normale pour le texte).
- Interdits : surtitres au-dessus des titres, capitales décoratives, numérotation hors vraies séquences, ombres, dégradés décoratifs, verre dépoli, émojis, cartes arrondies, mise en page entièrement centrée.
- Mouvement : un moment orchestré par page, le reste répond aux gestes du visiteur. Pas d'`initial={false}` sur l'`AnimatePresence` des pages ; un élément avec son propre `whileHover` n'hérite plus des variantes du parent.

## Avant de pousser

1. `npm test` et `npm run build` sans erreur.
2. Vérifier chaque page modifiée dans un navigateur à 1440 px et à 390 px, console sans erreur, avec et sans « réduire les animations ».
3. Déploiement : workflow `.github/workflows/deploy.yml` sur `main` ; dans *Settings → Pages*, la source doit être « GitHub Actions ».
