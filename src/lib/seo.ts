import { useEffect } from 'react'

const BRAND = 'Aqualiner 34'
const HOME_TITLE = `${BRAND} — Rénovation et construction de piscines, Hérault`

export function pageTitle(title?: string): string {
  return title ? `${title} — ${BRAND}` : HOME_TITLE
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.content = content
}

/** Titre et description de la page courante (le routeur à base de hash ne recharge pas le document). */
export function useSeo({ title, description }: { title?: string; description: string }) {
  useEffect(() => {
    const full = pageTitle(title)
    document.title = full
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
  }, [title, description])
}
