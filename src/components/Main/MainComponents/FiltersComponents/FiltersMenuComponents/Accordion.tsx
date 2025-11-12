import { useState, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../../../../redux'


interface IAccordionProps {
  title: string
  children: ReactNode
}


const Accordion = ({title, children}: IAccordionProps) => {
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }


  return (
    <div className='accordion'>
      <button 
        className={`accordion__header ${isDarkTheme ? 'dark-theme' : ''}`} 
        onClick={toggle}
      >
        <h4 className='margin-null'>{title} {isOpen ? '▴' : '▾'}</h4>
      </button>
      {isOpen && 
        <div className={`accordion__content ${isDarkTheme ? 'dark-theme' : ''}`}>
          {children}
        </div>
      }
    </div>
  )
}

export default Accordion