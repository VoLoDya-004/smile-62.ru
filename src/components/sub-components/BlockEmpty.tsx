import { useSelector } from 'react-redux'
import type { RootStore } from '../../redux'
import ButtonMainNav from '../Button/ButtonMainNav'


interface IBlockEmptyProps {
  text1: string
  text2: string
}


const BlockEmpty = ({text1, text2}: IBlockEmptyProps) => {
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
    
    
  return (
    <div className={`block-empty ${isDarkTheme ? 'dark-theme' : ''}`}>
      <b className='block-empty__str-up'>{text1}</b><br/>
      <div className='block-empty__str-bottom'>{text2}</div><br/>
      <ButtonMainNav />
    </div>
  )
}

export default BlockEmpty