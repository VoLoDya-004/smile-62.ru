
import { useUIContextModals } from '@/shared/providers/UIProvider'
import Button from '@/shared/ui/buttons/Button'

const FavouritesClearString = () => {
  const { handleClearFavBtn } = useUIContextModals()

  return (
    <section className='clear-string'>
      <h1>Избранные товары</h1>
      <Button className='button-violet' onClick={handleClearFavBtn}>Очистить избранное</Button>
    </section>
  )
}

export default FavouritesClearString