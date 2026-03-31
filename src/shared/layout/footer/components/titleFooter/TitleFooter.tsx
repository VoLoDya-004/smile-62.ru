import styles from './TitleFooter.module.scss'

const TitleFooter = ({ children }: { children: string }) => (
  <h2 className={styles.title}>{children}</h2>
)

export default TitleFooter