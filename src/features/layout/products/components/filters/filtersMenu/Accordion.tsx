import { useState, type ReactNode } from 'react'
import styles from './FiltersMenu.module.scss'
interface IAccordionProps {
  title: string
  children: ReactNode
}

const Accordion = ({ title, children }: IAccordionProps) => {
  const {
    'accordion': accordion,
    'accordion__header': accordionHeader,
    'accordion__content': accordionContent
  } = styles

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={accordion}>
      <button className={accordionHeader} onClick={toggle}>
        <h4 className='margin-null'>{title} {isOpen ? '▴' : '▾'}</h4>
      </button>
      {isOpen && 
        <div className={accordionContent}>
          {children}
        </div>
      }
    </div>
  )
}

export default Accordion