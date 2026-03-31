import type { RootStore } from '@/shared/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const ButtonBlockEmpty = () => {
  const isAuth = useSelector((state: RootStore) => state.user.isAuth)
  const [textButton, setTextButton] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      setTextButton('Перейти на главную')
    } else {
      setTextButton('Войти')
    }   
  }, [isAuth])

  const handleClick = () => {
    if (isAuth) {
      router.push('/')
    } else {
      router.push('/profile')
    }   
  }
    
  return (
    <button 
      type='button'
      className='to-main-button'
      onClick={handleClick}
    >
      <b className='user-select-none'>{textButton}</b>
    </button>
  )
}

export default ButtonBlockEmpty