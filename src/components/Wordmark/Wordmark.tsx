import styles from './Wordmark.module.css'

/** Logotype typographique provisoire : « aqualiner » large, « 34 » en chiffres de marquage. */
export default function Wordmark({ className }: { className?: string }) {
  return (
    <span className={[styles.wordmark, className].filter(Boolean).join(' ')}>
      <span className={styles.mot}>aqualiner</span>
      <span className={styles.numero}>34</span>
    </span>
  )
}
