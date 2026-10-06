# Refonte aqualiner34.fr — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le nouveau site vitrine d'Aqualiner 34 (6 pages + fiches projets) décrit dans la spec, déployable sur GitHub Pages.

**Architecture:** SPA Vite/React en `HashRouter`, pages chargées à la demande, contenus typés dans `src/content`, images pré-générées par un script `sharp` dans `public/media` avec un manifeste JSON, deux shaders WebGL natifs isolés dans `src/webgl`.

**Tech Stack:** Vite 8, React 19, TypeScript, React Router 7 (`react-router-dom`), Framer Motion, Lenis, Vitest, sharp, fontTools (sous-ensembles de polices).

**Spec:** `docs/superpowers/specs/2026-10-06-refonte-aqualiner34-design.md`

## Global Constraints

- Langue du site : français ; ton précis, sans superlatifs ; aucune information non sourcée (inconnues = `null`, rendues « À préciser »).
- `vite.config.ts` : `base: './'` ; routeur : `HashRouter`.
- Animations : Framer Motion sous `<MotionConfig reducedMotion="user">` ; pas d'`initial={false}` sur l'`AnimatePresence` des pages ; un élément avec son propre `whileHover` n'hérite plus des variantes du parent.
- Palette exacte : chaux `#F2EEE6`, pierre `#E3DCCD`, encre `#151A1C`, anthracite `#1C2427`, gris `#59605F`, brique `#A3402A`.
- Polices : Newsreader (opsz 24-72, wght 300-500) et Archivo (wdth 100-125, wght 300-700), auto-hébergées, sous-ensemble latin + français.
- Interdits visuels : dégradés violets, verre dépoli, émojis en icônes, mise en page entièrement centrée, coins arrondis et ombres.
- Images : uniquement les photos de chantiers réels de l'audit ; photos n° 3, 4, 5 fournies exclues.
- Avant tout push : `npm run build` sans erreur + contrôle navigateur à 1440 px et 390 px.

## Review Focus

- WebGL indisponible (ou contexte perdu) : l'image statique reste affichée, aucune erreur bloquante — test `webgl/support.test.ts`.
- « Réduire les animations » activé : pas de Lenis, pas de zoom du hero, shader figé — vérification navigateur avec `emulateMedia({ reducedMotion: 'reduce' })` (tâche 9).
- Champ de formulaire contenant `&`, `?`, `#`, retours à la ligne ou accents : l'e-mail préparé reste intact — test `buildMailto` (tâche 8).
- Lien profond vers un projet inexistant (`#/realisations/inconnu`) : page 404 de projet, pas d'écran blanc — test `getProject` (tâche 3) + vérification navigateur.
- Retour arrière du navigateur après une transition de projet : la page précédente se ré-affiche à sa position, l'overlay de transition n'est pas resté à l'écran — vérification navigateur (tâche 7).

---

### Task 1: Socle du projet

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles/{tokens,base,fonts}.css`, `src/assets/fonts/*.woff2`, `scripts/fonts/subset.py`, `vitest.config.ts`, `CLAUDE.md`, `.github/workflows/deploy.yml`, `.gitignore`

**Interfaces:**
- Produces: jetons CSS `--chaux --pierre --encre --anthracite --gris --brique --brique-clair --marge --gouttiere --ease` ; familles `"Newsreader"` et `"Archivo"` ; scripts npm `dev`, `build`, `test`, `images`, `preview`.

- [ ] **Step 1:** Initialiser Vite React TS, installer `react-router-dom framer-motion lenis` et en dev `vitest sharp`.
- [ ] **Step 2:** Générer les polices avec `scripts/fonts/subset.py` (unicode `U+0000-00FF,U+0131,U+0152-0153,U+0178,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215`), déclarer les `@font-face` et précharger Archivo + Newsreader romain.
- [ ] **Step 3:** Écrire `src/smoke.test.ts` (`expect(1+1).toBe(2)`) ; `npm test` → PASS ; `npm run build` → OK.
- [ ] **Step 4:** Workflow Pages (`actions/upload-pages-artifact` + `actions/deploy-pages`, Node 22, `npm ci && npm run build`), `CLAUDE.md` du projet.
- [ ] **Step 5:** Commit `chore: socle Vite React TS, polices et déploiement`.

### Task 2: Chaîne d'images

**Files:**
- Create: `scripts/media.config.mjs`, `scripts/build-images.mjs`, `src/content/media.generated.json`, `src/components/Img/Img.tsx`, `src/components/Img/Img.module.css`, `src/content/media.ts`, `src/content/media.test.ts`

**Interfaces:**
- Produces: `type MediaId = keyof typeof manifest` ; `getMedia(id: MediaId): Media` avec `Media = { id; w; h; color; widths: number[]; alt: string; date: string | null }` ; `<Img id={MediaId} sizes="…" priority? className? alt? />` qui rend `<picture>` AVIF + WebP, `width/height`, `loading="lazy"` sauf `priority`, aplat `color` en fond.

- [ ] **Step 1:** Test `media.test.ts` : chaque entrée du manifeste a `w>0`, `h>0`, au moins une largeur, un `alt` non vide ne se terminant pas par `.jpg`.
- [ ] **Step 2:** `npm test` → FAIL (manifeste absent).
- [ ] **Step 3:** Script : téléchargement mis en cache dans `.cache/media` (ignoré par git), `rotate()`, recadrage optionnel `{left, top, width, height}` en fractions, largeurs `[640, 1024, 1600, 2400]` bornées à la largeur source, AVIF q50 + WebP q72, couleur dominante (`stats().dominant`), date EXIF. Sortie `public/media/<id>-<w>.<ext>`.
- [ ] **Step 4:** `npm run images && npm test` → PASS.
- [ ] **Step 5:** Commit `feat: chaîne d'images responsive (AVIF/WebP)`.

### Task 3: Contenus typés

**Files:**
- Create: `src/content/{company,projects,services,faq,finishes,motifs,timeline}.ts`, `src/content/projects.test.ts`, `src/content/format.ts`

**Interfaces:**
- Produces: `company` (nom, adresse, téléphone `0622856095`, affichage `06 22 85 60 95`, e-mail, fondation `2008-11-01`, équipe, zone) ; `type Project = { slug; number; title; cover: MediaId; nature: 'Rénovation' | 'Construction' | null; commune: string | null; finish: string; features: string[]; photographed: string | null; intro: string; blocks: ProjectBlock[]; beforeAfter?: { before: MediaId; after: MediaId } }` ; `projects: Project[]`, `getProject(slug): Project | undefined`, `getNextProject(slug): Project` ; `formatMonthYear('2018-07-31') === 'juillet 2018'`.

- [ ] **Step 1:** Tests : slugs uniques ; `getNextProject` du dernier renvoie le premier ; `getProject('inconnu')` est `undefined` ; tout `MediaId` cité existe ; aucun texte ne contient `TODO`, `lorem` ou `XX` ; `formatMonthYear` ci-dessus.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Rédiger les contenus à partir de l'audit uniquement (garantie 10 ans, 1,5 mm, 3 à 4 jours, 2008…).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: contenus typés et sourcés`.

### Task 4: Système de design et gabarit

**Files:**
- Create: `src/components/{Header,MobileMenu,Footer,Wordmark,PageTransition,Reveal,SplitLines,ArrowLink,Button,CursorLabel,SectionLabel,Seo}/…`, `src/lib/{useLenis,useMediaQuery,seo}.ts`, `src/lib/seo.test.ts`, `src/routes.tsx`

**Interfaces:**
- Produces: `<Reveal as? delay? />`, `<SplitLines text as delay? />`, `<ArrowLink to|href>`, `<Button to|href|type variant="solid"|"line">`, `<SectionLabel index="03">Le geste</SectionLabel>`, `useCursorLabel(label: string)` → props à étaler sur un élément, `useSeo({ title, description })`, `pageTitle(title?: string): string` (`'Réalisations — Aqualiner 34'`, accueil : `'Aqualiner 34 — Rénovation et construction de piscines, Hérault'`).

- [ ] **Step 1:** Test `seo.test.ts` pour `pageTitle`.
- [ ] **Step 2:** `npm test` → FAIL ; implémenter ; PASS.
- [ ] **Step 3:** En-tête (transparent sur hero, masqué en descente), menu plein écran, pied de page, transition de page (rideau anthracite + fondu, ≤ 700 ms), remise en haut de page à chaque navigation.
- [ ] **Step 4:** Vérification navigateur 1440/390 : navigation entre pages vides, focus visible, lien d'évitement.
- [ ] **Step 5:** Commit `feat: système de design et gabarit`.

### Task 5: Rendus WebGL

**Files:**
- Create: `src/webgl/{gl.ts,support.ts,support.test.ts,waterHero.ts,poolSim.ts}`, `src/components/WaterHero/…`, `src/components/Nuancier/…`

**Interfaces:**
- Produces: `canUseWebGL(): boolean` ; `createWaterHero(canvas, { images: [HTMLImageElement, HTMLImageElement], mask: HTMLImageElement, focus: [number, number] }) → { setProgress(p: number): void; destroy(): void }` ; `createPoolSim(canvas, { finish: Finish }) → { setFinish(f: Finish): void; pointer(x, y): void; destroy(): void }`.

- [ ] **Step 1:** Test `support.test.ts` : `canUseWebGL()` renvoie `false` quand `getContext` renvoie `null` (environnement jsdom).
- [ ] **Step 2:** Implémenter ; PASS.
- [ ] **Step 3:** Shaders : réfraction + caustiques masquées (hero), absorption par profondeur + caustiques + ondes (nuancier). Boucle suspendue hors écran (`IntersectionObserver`) et onglet masqué ; DPR ≤ 1,5 ; frame unique si mouvement réduit ; gestion `webglcontextlost`.
- [ ] **Step 4:** Vérification navigateur : console vide, rendu visible, repli image quand WebGL est forcé indisponible.
- [ ] **Step 5:** Commit `feat: eau WebGL du hero et nuancier`.

### Task 6: Accueil

**Files:**
- Create: `src/pages/Home/{Home.tsx,Home.module.css}` et sections `Hero`, `Manifeste`, `Renover`, `Geste`, `Selection`, `Signature`, `Couleur`, `Atelier`, `ContactBand`, `src/components/BeforeAfter/…`, `src/components/ProcessSteps/…`, `src/components/MotifStrip/…`

**Interfaces:**
- Consumes: Tasks 2-5.
- Produces: `<BeforeAfter before after labels caption />` (input range accessible), `<ProcessSteps steps variant="sticky"|"list" />`, `<MotifStrip items />` (glisser, clavier).

- [ ] **Step 1:** Construire les sections dans l'ordre de la spec.
- [ ] **Step 2:** Vérification navigateur 1440/390 de chaque section, console vide.
- [ ] **Step 3:** Commit `feat: page d'accueil`.

### Task 7: Réalisations et fiches projets

**Files:**
- Create: `src/pages/Realisations/…`, `src/pages/Projet/…`, `src/components/{ProjectIndex,Lightbox,NextProject}/…`

**Interfaces:**
- Consumes: `projects`, `getProject`, `getNextProject`, `<Img>`, `<BeforeAfter>`.

- [ ] **Step 1:** Index (image qui suit le curseur sur ordinateur, liste illustrée sur mobile), carnet de chantier avec visionneuse (Échap, flèches, focus piégé).
- [ ] **Step 2:** Fiche projet (hero, fiche, compositions, avant/après, projet suivant avec agrandissement), 404 de projet.
- [ ] **Step 3:** Vérification navigateur, dont retour arrière après transition.
- [ ] **Step 4:** Commit `feat: réalisations et fiches projets`.

### Task 8: Savoir-faire, services, atelier, contact, mentions, 404

**Files:**
- Create: `src/pages/{SavoirFaire,Services,Atelier,Contact,MentionsLegales,NotFound}/…`, `src/components/{MembraneDiagram,ZoneMap,Faq,ContactForm}/…`, `src/lib/mailto.ts`, `src/lib/mailto.test.ts`

**Interfaces:**
- Produces: `buildMailto(data: ContactData, to: string): string`.

- [ ] **Step 1:** Test `mailto.test.ts` : sujet `Demande de projet — Rénovation — Pézenas`, corps contenant `R&D ? #1` et un retour à la ligne correctement encodés (`decodeURIComponent` restitue l'original).
- [ ] **Step 2:** FAIL → implémenter → PASS.
- [ ] **Step 3:** Pages : éclaté de la membrane (SVG), matières à sec / sous l'eau, carte de zone, FAQ + JSON-LD `FAQPage`, chronologie et équipe, formulaire guidé avec `aria-live`.
- [ ] **Step 4:** Vérification navigateur 1440/390.
- [ ] **Step 5:** Commit `feat: pages savoir-faire, services, atelier, contact`.

### Task 9: Finitions, QA et livraison

**Files:**
- Modify: au besoin ; `index.html` (JSON-LD `HomeAndConstructionBusiness`, OG, `noindex` de préversion)

- [ ] **Step 1:** Passe mouvement réduit, clavier, contrastes, textes alternatifs, titres uniques par page.
- [ ] **Step 2:** `npm run build` ; mesurer le JS compressé de l'accueil (< 300 Ko).
- [ ] **Step 3:** Parcours complet Playwright à 1440 et 390 px, console vide.
- [ ] **Step 4:** Commit, push de la branche, PR en brouillon, abonnement aux événements de la PR.
