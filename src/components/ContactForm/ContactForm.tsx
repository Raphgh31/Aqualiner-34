import { useId, useState, type FormEvent } from 'react'
import { company } from '../../content/company'
import { buildMailto, demandText, type ContactData } from '../../lib/mailto'
import Plaque from '../Plaque/Plaque'
import styles from './ContactForm.module.css'

const PROJETS = [
  { value: 'renovation', label: 'Rénovation', hint: 'Fuite, liner usé, revêtement à refaire' },
  { value: 'construction', label: 'Construction', hint: 'Un nouveau bassin' },
  { value: 'motif', label: 'Motif sur mesure', hint: 'Croix, gecko, logo au fond du bassin' },
  { value: 'equipement', label: 'Local technique ou équipement', hint: 'Filtration, traitement, sécurité' },
  { value: 'autre', label: 'Autre demande', hint: 'Dites-nous tout dans le message' },
] as const

const FORMES = ['Rectangulaire', 'Ronde ou ovale', 'Forme libre', 'Je ne sais pas']
const REVETEMENTS = ['Liner', 'Membrane armée', 'Carrelage ou mosaïque', 'Peinture', 'Coque polyester', 'Je ne sais pas']

type Field = 'projet' | 'commune' | 'nom' | 'contact' | 'email'
type Errors = Partial<Record<Field, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form: FormData): Errors {
  const errors: Errors = {}
  const value = (name: string) => String(form.get(name) ?? '').trim()
  if (!value('projet')) errors.projet = 'Choisissez le type de projet.'
  if (!value('commune')) errors.commune = 'Indiquez la commune du bassin.'
  if (!value('nom')) errors.nom = 'Indiquez votre nom.'
  if (!value('telephone') && !value('email')) errors.contact = 'Indiquez un téléphone ou un e-mail pour recevoir la réponse.'
  if (value('email') && !EMAIL.test(value('email'))) errors.email = 'Cette adresse e-mail semble incomplète.'
  return errors
}

/** Choix en plaques : de vrais boutons radio, cochés au clavier comme à la souris. */
function Choix({ name, options, value, onChange }: { name: string; options: readonly { value: string; label: string; hint?: string }[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.choix}>
      {options.map((option) => (
        <label key={option.value} className={styles.plaque} data-actif={value === option.value || undefined}>
          <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="visuellement-cache" />
          <span className={styles.libelle}>{option.label}</span>
          {option.hint && <span className={styles.aide}>{option.hint}</span>}
        </label>
      ))}
    </div>
  )
}

/**
 * Formulaire guidé : le projet, le bassin, la commune, les coordonnées. Le site n'a pas de serveur : la demande
 * s'ouvre dans la messagerie du visiteur, prête à partir, et peut aussi être copiée.
 */
export default function ContactForm({ initialProjet }: { initialProjet?: string }) {
  const id = useId()
  const [projet, setProjet] = useState(PROJETS.some((p) => p.value === initialProjet) ? initialProjet! : '')
  const [forme, setForme] = useState('')
  const [revetement, setRevetement] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState<{ text: string; url: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const construction = projet === 'construction'

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Le premier champ à corriger reçoit le focus.
      const first = (['projet', 'commune', 'nom', 'contact', 'email'] as Field[]).find((field) => found[field])
      const target = first === 'contact' ? 'telephone' : first
      event.currentTarget.querySelector<HTMLElement>(`[name="${target}"]`)?.focus()
      return
    }
    const value = (name: string) => String(form.get(name) ?? '').trim()
    const data: ContactData = {
      projet: PROJETS.find((p) => p.value === projet)?.label ?? projet,
      forme: forme || undefined,
      revetement: construction ? undefined : revetement || undefined,
      dimensions: value('dimensions') || undefined,
      commune: value('commune'),
      nom: value('nom'),
      telephone: value('telephone') || undefined,
      email: value('email') || undefined,
      message: value('message') || undefined,
    }
    const url = buildMailto(data, company.email)
    setSent({ text: demandText(data), url })
    setCopied(false)
    window.location.href = url
  }

  const copy = async () => {
    if (!sent) return
    try {
      await navigator.clipboard.writeText(sent.text)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(' ') || undefined
  const count = Object.keys(errors).length

  return (
    <form className={styles.formulaire} onSubmit={onSubmit} noValidate aria-describedby={`${id}-note`}>
      <p id={`${id}-note`} className="petit secondaire">
        Les champs marqués d’un astérisque sont nécessaires pour vous répondre.
      </p>

      <fieldset className={styles.etape} aria-describedby={errors.projet ? `${id}-projet` : undefined}>
        <legend className="titre-sous">Votre projet *</legend>
        <Choix name="projet" options={PROJETS} value={projet} onChange={setProjet} />
        {errors.projet && (
          <p id={`${id}-projet`} className={styles.erreur}>
            {errors.projet}
          </p>
        )}
      </fieldset>

      <fieldset className={styles.etape}>
        <legend className="titre-sous">{construction ? 'Le bassin souhaité' : 'Votre bassin'}</legend>
        <p className={styles.question}>Sa forme</p>
        <Choix name="forme" options={FORMES.map((f) => ({ value: f, label: f }))} value={forme} onChange={setForme} />
        {!construction && (
          <>
            <p className={styles.question}>Son revêtement actuel</p>
            <Choix name="revetement" options={REVETEMENTS.map((r) => ({ value: r, label: r }))} value={revetement} onChange={setRevetement} />
          </>
        )}
        <div className={styles.champ}>
          <label htmlFor={`${id}-dimensions`}>Dimensions approximatives</label>
          <input id={`${id}-dimensions`} name="dimensions" type="text" placeholder="Par exemple 8 × 4 m" autoComplete="off" />
        </div>
      </fieldset>

      <fieldset className={styles.etape}>
        <legend className="titre-sous">Où, et comment vous répondre</legend>
        <div className={styles.champ}>
          <label htmlFor={`${id}-commune`}>Commune du bassin *</label>
          <input
            id={`${id}-commune`}
            name="commune"
            type="text"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.commune) || undefined}
            aria-describedby={describedBy(errors.commune && `${id}-commune-erreur`)}
          />
          {errors.commune && (
            <p id={`${id}-commune-erreur`} className={styles.erreur}>
              {errors.commune}
            </p>
          )}
        </div>
        <div className={styles.champ}>
          <label htmlFor={`${id}-nom`}>Nom *</label>
          <input
            id={`${id}-nom`}
            name="nom"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.nom) || undefined}
            aria-describedby={describedBy(errors.nom && `${id}-nom-erreur`)}
          />
          {errors.nom && (
            <p id={`${id}-nom-erreur`} className={styles.erreur}>
              {errors.nom}
            </p>
          )}
        </div>
        <div className={styles.paire}>
          <div className={styles.champ}>
            <label htmlFor={`${id}-telephone`}>Téléphone</label>
            <input
              id={`${id}-telephone`}
              name="telephone"
              type="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.contact) || undefined}
              aria-describedby={describedBy(`${id}-joindre`, errors.contact && `${id}-contact-erreur`)}
            />
          </div>
          <div className={styles.champ}>
            <label htmlFor={`${id}-email`}>E-mail</label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.contact || errors.email) || undefined}
              aria-describedby={describedBy(`${id}-joindre`, errors.contact && `${id}-contact-erreur`, errors.email && `${id}-email-erreur`)}
            />
            {errors.email && (
              <p id={`${id}-email-erreur`} className={styles.erreur}>
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <p id={`${id}-joindre`} className="petit secondaire">
          L’un des deux suffit.
        </p>
        {errors.contact && (
          <p id={`${id}-contact-erreur`} className={styles.erreur}>
            {errors.contact}
          </p>
        )}
        <div className={styles.champ}>
          <label htmlFor={`${id}-message`}>Votre message</label>
          <textarea id={`${id}-message`} name="message" rows={5} placeholder="L’état du bassin, ce que vous aimeriez, vos questions…" />
        </div>
      </fieldset>

      <div className={styles.envoi}>
        <Plaque type="submit" variant="rouge" fleche>
          Préparer l’e-mail
        </Plaque>
        <p className="petit secondaire">Votre messagerie s’ouvre avec la demande remplie ; vous la relisez et l’envoyez vous-même.</p>
      </div>

      <div className={styles.etat} aria-live="polite">
        {count > 0 && (
          <p className={styles.erreur}>
            {count === 1 ? 'Un point est à compléter' : `${count} points sont à compléter`} avant de préparer l’e-mail.
          </p>
        )}
        {sent && count === 0 && (
          <div className={styles.envoye}>
            <p className="titre-sous">Votre demande est prête.</p>
            <p className="texte">
              Elle vient de s’ouvrir dans votre messagerie : il ne reste qu’à l’envoyer. Rien ne s’est ouvert ? Copiez-la et envoyez-la à{' '}
              <a href={`mailto:${company.email}`}>{company.email}</a>, ou appelez le{' '}
              <a href={company.phone.href} className="chiffres">
                {company.phone.display}
              </a>
              .
            </p>
            <div className={styles.copie}>
              <button type="button" className={styles.copier} onClick={copy}>
                Copier la demande
              </button>
              <span className="petit">{copied ? 'Demande copiée.' : ''}</span>
            </div>
            <label className="visuellement-cache" htmlFor={`${id}-texte`}>
              Texte de la demande
            </label>
            <textarea id={`${id}-texte`} className={styles.texte} readOnly value={sent.text} rows={9} />
          </div>
        )}
      </div>
    </form>
  )
}
