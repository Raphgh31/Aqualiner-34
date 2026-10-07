import { motion } from 'motion/react'
import styles from './SplitWords.module.css'

const ease = [0.22, 1, 0.36, 1] as const

/** Les mots montent depuis leur ligne de base, l'un après l'autre (entrée du hero uniquement). */
export default function SplitWords({ text, delay = 0, step = 0.07 }: { text: string; delay?: number; step?: number }) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className={styles.mot}>
            <motion.span
              className={styles.interieur}
              initial={{ y: '108%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.95, ease, delay: delay + index * step }}
            >
              {word}
            </motion.span>
          </span>{' '}
        </span>
      ))}
    </>
  )
}
