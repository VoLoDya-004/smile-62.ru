import { useSelector } from 'react-redux'
import type { RootStore } from '@/redux'
import ButtonMainNav from '../Button/ButtonMainNav'


interface IBlockEmptyProps {
  textUp: string
  textDown: string
}


const BlockEmpty = ({ textUp, textDown }: IBlockEmptyProps) => {
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
    
    
  return (
    <div className={`block-empty ${isDarkTheme ? 'dark-theme' : ''}`}>
      <b className='block-empty__str-up'>{textUp}</b>
      <div className='block-empty__str-bottom'>{textDown}</div>
      <ButtonMainNav />
    </div>
  )
}

export default BlockEmpty
