import { useState, memo, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Context } from '../../contexts/context'
import type { RootStore } from '../../redux'
import type { ICategory } from '../../types/types'


const ButtonNav = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('Context must be used within a Provider')
    }
    const { 
        setSelectedCategory, 
        setCurrentPage,  
        categories, 
        selectedCategory,
        setSearchParams
    } = context

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const [toggle, setToggle] = useState<string>('')
    const [image, setImage] = useState<string>('/images/icons/nav.png')
    const [visible, setVisible] = useState<string>('none')

    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const categoryFromUrl = searchParams.get('category')
        if (categoryFromUrl) {
            const categoryId = parseInt(categoryFromUrl)
            if (!isNaN(categoryId)) {
                setSelectedCategory(categoryId)
                setSelectedCategory(categoryId)
            } else {
                setSelectedCategory(0)
                setSelectedCategory(0)
            }
        }
    }, [searchParams, setSelectedCategory])

    function nav() {
        if (location.pathname !== '/') {
            navigate('/')
        }
        if (toggle === '') {
            setToggle('navbar')
            setImage('/images/icons/cross.png')
            setVisible('block')
            document.getElementById('blackout')?.classList.add('blackout')
            document.body.classList.add('modal-open')
        } else {
            setToggle('')
            setImage('/images/icons/nav.png')
            setVisible('none')
            document.getElementById('blackout')?.classList.remove('blackout')
            document.body.classList.remove('modal-open')
        }
    }

    useEffect(() => {
        const handlePointerUp = (e: PointerEvent) => {
            let container = document.querySelector('.navbar')
            let navigationBtn = document.querySelector('[data-js-nav-button]')

            if (container && navigationBtn) {
                if ((!container.contains(e.target as Node)) && 
                    (!navigationBtn.contains(e.target as Node))
                ) {
                    setVisible('none')
                    setToggle('')
                    document.body.classList.remove('modal-open')
                    document.getElementById('blackout')?.classList.remove('blackout')
                    setImage('/images/icons/nav.png')
                } else {
                    setToggle('navbar')                  
                    setImage('/images/icons/cross.png')
                    setVisible('block')
                    document.body.classList.add('modal-open')
                    document.getElementById('blackout')?.classList.add('blackout')
                }
            }
        }

        document.addEventListener('pointerup', handlePointerUp)
        
        return () => {
            document.removeEventListener('pointerup', handlePointerUp)
        }
    }, [])

    const handleCategorySelect = (id: number) => {
        if (selectedCategory === id) {
            return
        }
        
        const newSearchParams = new URLSearchParams(searchParams)
        
        if (id === 0) {
            newSearchParams.delete('category')
        } else {
            newSearchParams.set('category', id.toString())
        }
        
        setSearchParams(newSearchParams)
        
        setCurrentPage(1)
        setSelectedCategory(id)
        setVisible('none')
        setToggle('')
        document.body.classList.remove('modal-open')
        document.getElementById('blackout')?.classList.remove('blackout')
        setImage('/images/icons/nav.png')
    }

    const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

    useEffect(() => {
      const handleResize = () => {
        setViewportHeight(window.innerHeight)
        setViewportWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
      handleResize()

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    const navbarHeight = viewportWidth < 1001 
        ? viewportHeight - 146
        : viewportHeight - 86

    useEffect(() => {
        if (toggle === 'navbar') {
            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key === 'Tab') {
                    const navbar = document.querySelector('.navbar') as HTMLElement
                    const navButton = 
                        document.querySelector('[data-js-nav-button]') as HTMLElement
                    
                    if (!navbar || !navButton) return
                    
                    const focusableElements = [
                        navButton,
                        ...Array.from(navbar.querySelectorAll(
                            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                        )) as HTMLElement[]
                    ]
                    
                    if (focusableElements.length === 0) return
                    
                    const firstElement = focusableElements[0]
                    const lastElement = focusableElements[focusableElements.length - 1]
                    
                    if (!focusableElements.includes(document.activeElement as HTMLElement)) {
                        e.preventDefault()
                        if (e.shiftKey) {
                            lastElement.focus()
                        } else {
                            firstElement.focus()
                        }
                    }
                    else if (document.activeElement === lastElement && !e.shiftKey) {
                        e.preventDefault()
                        firstElement.focus()
                    }
                    else if (document.activeElement === firstElement && e.shiftKey) {
                        e.preventDefault()
                        lastElement.focus()
                    }
                }
                
                if (e.key === 'Escape') {
                    setToggle('')
                    setImage('/images/icons/nav.png')
                    setVisible('none')
                    document.getElementById('blackout')?.classList.remove('blackout')
                    document.body.classList.remove('modal-open')
                }
            }
            
            document.addEventListener('keydown', handleTabKey)
            
            const timer = setTimeout(() => {
                const navButton = 
                    document.querySelector('[data-js-nav-button]') as HTMLElement
                if (navButton) {
                    navButton.focus()
                }
            }, 100)
            
            return () => {
                document.removeEventListener('keydown', handleTabKey)
                clearTimeout(timer)
            }
        }
    }, [toggle])


    return (
        <>
        <div className='nav'>
            <button 
                type='button'
                className='nav__button' 
                data-js-nav-button
                onClick={nav} 
                aria-label={visible === 'block' ? 
                    'Закрыть меню категорий товаров' : 
                    'Открыть меню категорий товаров'
                }
            >
                <img 
                    src={image} 
                    alt='Категории товаров'
                    className='nav__img'
                />
            </button>
        </div>
        
        <aside 
            className={isDarkTheme ? `${toggle} dark-theme` : toggle}
            data-js-navbar
            style={{height: `${navbarHeight}px`}}
            aria-hidden={visible === 'block' ? 'false' : 'true'}
            aria-label='Список категории товаров'
        >
            {categories.map((cat: ICategory) => (
                <button
                    key={cat.id}
                    className={`
                        navbar__item ${visible} 
                        ${selectedCategory === cat.id ? 
                            'navbar__item_active' : 
                            'navbar__item_passive'
                        }
                        ${isDarkTheme ? ' dark-theme' : ''}
                    `}
                    id={cat.label}
                    onClick={() => handleCategorySelect(cat.id)}
                >
                    {cat.label}
                </button>
            ))}
        </aside>
        </>
    )
}

export default memo(ButtonNav)









