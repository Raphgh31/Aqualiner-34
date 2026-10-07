# Product

<!-- impeccable:product-schema 1 -->

> Fiche établie sans entretien, à partir du brief écrit du client (qui demande explicitement de ne pas être sollicité pour valider chaque détail) et de l'audit du site actuel (`docs/audit/2026-10-06-audit-site-actuel.md`). Les points marqués *(déduit)* sont des inférences à confirmer.

## Platform

web

## Stack

Vite + React + TypeScript + React Router (`HashRouter`, `base: './'`) + Motion (ex-Framer Motion), déployé sur GitHub Pages par GitHub Actions — pile imposée par les préférences permanentes du client.

## Users

- Propriétaires d'une maison avec piscine dans l'Hérault et l'Aude (Béziers, Agde, Pézenas, Narbonne, Sète, Clermont-l'Hérault, Lodève…), dont le bassin fuit, dont le liner est percé ou fatigué, dont la peinture ou le carrelage est à refaire *(déduit de l'audit : 90 % de rénovation en 2017)*.
- Particuliers qui envisagent une construction en béton maçonné.
- Professionnels : campings, hôtels, restaurants, cabinets de kinésithérapie, collectivités.
- Situation type *(déduit)* : recherche locale sur téléphone ou ordinateur, comparaison de quelques artisans, envie de voir des chantiers réels avant d'appeler.

## Product Purpose

Le site vitrine d'Aqualiner 34 doit faire comprendre en quelques secondes qui est l'entreprise, ce qu'elle fait et comment la joindre, puis donner envie d'appeler ou d'écrire. Succès : des demandes de devis qualifiées (type de projet, bassin, commune) et des appels.

## Positioning

Un atelier local, fondé en 2008 par deux associés partis de rien, spécialiste de la membrane armée posée et soudée à la main sur place. Sa signature : des motifs découpés et soudés en fond de bassin (croix occitane, gecko, logos). Il rénove des bassins sans les reconstruire.

## Operating Context

- Chantier type : visite et diagnostic du support, vidange, préparation, pose de lés de membrane (rouleaux de 25 m), soudure à l'air chaud, PVC liquide, mise en eau ; 3 à 4 jours pour un remplacement d'étanchéité.
- Vocabulaire du métier : lé, soudure, margelle, skimmer, refoulement, bonde de fond, pièces à sceller, escalier roman, plage immergée, local technique.
- Matériaux : membrane armée 150/100 (Renolit Alkorplan 2000), membrane 3D Touch 200/100 (Alkorplan 3000), finitions unies et texturées (ardoise, sable, pierre, béton gris, marbre blanc).

## Capabilities and Constraints

- Coordonnées : 9 rue Clément Ader, 34290 Abeilhan — 06 22 85 60 95 — contact@aqualiner34.fr.
- Pas de serveur : le formulaire prépare un e-mail (lien `mailto:`) tant qu'aucun service de formulaire n'est branché.
- Garantie d'étanchéité fabricant : 10 ans (le site actuel affiche aussi 15 ans : à confirmer).
- Inconnus à ne pas inventer : communes, années et nature de chaque réalisation ; nom de famille de Daniel ; SIRET et forme juridique ; avis clients ; réseaux sociaux.

## Brand Commitments

- Nom : Aqualiner 34. Logo actuel rouge et gris (un « a » rouge en arabesque) ; aucun fichier vectoriel fourni.
- Exigences du brief : premium, humain, architectural, éditorial, sensoriel, contemporain ; jamais générique, jamais « généré par IA », jamais startup.
- Préférences permanentes du client : pas de dégradés violets, de verre dépoli, d'émojis en icônes, de mise en page entièrement centrée, ni de coins arrondis et d'ombres partout ; de vraies pages distinctes avec barre de navigation ; animations Motion respectant « réduire les animations ».

## Evidence on Hand

- ~30 photos réelles de chantiers (2018-2022, smartphone), dont une soudure à l'air chaud, des motifs croix occitane et gecko, une série avant/après au pied d'un château — téléchargées depuis le site actuel.
- Article *L'Activité Piscine*, n° 105, septembre 2017 (histoire des fondateurs, chiffres de la saison 2017).
- Labels : Pro Piscine (FPP, badge 2014), assurance décennale AXA.
- Nuancier fabricant scanné des finitions 3D Touch.
- **Absents, à ne pas fabriquer** : témoignages, notes, nombre de chantiers actuel, prix, certifications autres que celles listées.

## Product Principles

1. Montrer le travail réel avant d'en parler : chaque affirmation s'appuie sur une photo, une date ou une source.
2. La rénovation est la promesse principale ; la construction et les motifs complètent.
3. Les gens derrière l'entreprise sont visibles et nommés.
4. Un visiteur sur téléphone doit pouvoir appeler en un geste depuis n'importe quelle page.

## Accessibility & Inclusion

WCAG 2.1 AA visé ; respect de `prefers-reduced-motion` ; navigation clavier complète.
