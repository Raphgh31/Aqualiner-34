import type { Question } from '../../content/faq'
import styles from './Faq.module.css'

/** Données structurées FAQPage, avec « < » échappé pour ne jamais fermer la balise script. */
function jsonLd(questions: Question[]) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/** Questions fréquentes : des volets natifs (<details>), utilisables au clavier et sans script. */
export default function Faq({ questions }: { questions: Question[] }) {
  return (
    <div className={styles.faq}>
      {questions.map((item) => (
        <details key={item.question} className={styles.question}>
          <summary>
            <span>{item.question}</span>
            <span className={styles.signe} aria-hidden="true" />
          </summary>
          <p className="texte">{item.answer}</p>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(questions) }} />
    </div>
  )
}
