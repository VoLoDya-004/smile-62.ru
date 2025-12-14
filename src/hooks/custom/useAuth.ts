import { setUser } from '@/redux/UserSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useAuth = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      const { isAuth, userName, userId } = JSON.parse(storedAuth)
      if (isAuth && userId !== null) {
        dispatch(setUser({ userId, userName, isAuth }))
      }
    }
  }, [])
}