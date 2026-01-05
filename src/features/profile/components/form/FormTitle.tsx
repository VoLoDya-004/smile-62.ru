import styles from './Form.module.scss'

interface IFormTitleProps {
  children: string
}

const FormTitle = ({ children }: IFormTitleProps) => {
 
  return (
    <h2 className={styles.form__header}>
      {children}
    </h2>
  )
}

export default FormTitle