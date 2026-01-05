import ButtonMainNav from '@/shared/ui/buttons/ButtonMainNav'
import styles from './BlockEmpty.module.scss'

interface IBlockEmptyProps {
  textUp: string
  textDown: string
}

const BlockEmpty = ({ textUp, textDown }: IBlockEmptyProps) => {
  const {
    'block-empty': blockEmpty,
    'block-empty__str-up': blockEmptyUp,
    'block-empty__str-bottom': blockEmptyDown
  } = styles
    
  return (
    <div className={blockEmpty}>
      <b className={blockEmptyUp}>{textUp}</b>
      <div className={blockEmptyDown}>{textDown}</div>
      <ButtonMainNav />
    </div>
  )
}

export default BlockEmpty
