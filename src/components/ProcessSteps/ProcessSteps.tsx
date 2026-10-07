import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../lib/useMediaQuery'
import styles from './ProcessSteps.module.css'

type Step = { title: string; text: string }

type ProcessStepsProps = {
  steps: Step[]
  /** « soudure » : la ligne se trace au défilement et allume chaque étape ; « liste » : tout est affiché. */
  variant?: 'soudure' | 'liste'
}

/** Les étapes d'un chantier, reliées par une soudure tracée d'un seul trait. */
export default function ProcessSteps({ steps, variant = 'soudure' }: ProcessStepsProps) {
  const list = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const animated = variant === 'soudure' && !reduced
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 72%', 'end 55%'] })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [reached, setReached] = useState(animated ? -1 : steps.length)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!animated) return
    setReached(Math.floor(value * steps.length + 0.15))
  })

  return (
    <div ref={list} className={styles.etapes} data-variante={variant}>
      <span className={styles.soudure} aria-hidden="true">
        <motion.span className={styles.cordon} style={{ scaleY: animated ? draw : 1 }} />
      </span>
      <ol className={styles.liste}>
      {steps.map((step, index) => (
        <li key={step.title} className={styles.etape} data-atteinte={index <= reached || undefined}>
          <span className={`mesure ${styles.numero}`} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className={styles.titre}>{step.title}</h3>
            <p className={`texte ${styles.texte}`}>{step.text}</p>
          </div>
        </li>
      ))}
      </ol>
    </div>
  )
}
