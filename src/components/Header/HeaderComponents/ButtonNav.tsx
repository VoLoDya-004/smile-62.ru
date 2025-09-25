import { useState, memo, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../contexts/context'
import type { RootStore } from '../../../redux'
import type { ICategory } from '../../../types/types'


const ButtonNav = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('Context must be used within a Provider')
    }
    const { 
        setSelectedCategory, 
        setCurrentPage, 
        categories, 
        activeCategoryId, 
        setActiveCategoryId 
    } = context

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const [toggle, setToggle] = useState<string>('')
    const [image, setImage] = useState<string>('/images/icons/nav.png')
    const [visible, setVisible] = useState<string>('none')

    const navigate = useNavigate()

    function nav() {
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

    document.addEventListener('mouseup', function(e: MouseEvent) {
        let container = document.querySelector('.navbar')
        let navigationBtn = document.getElementById('nav__button')

        if (container && navigationBtn) {
            if ((!container.contains(e.target as Node)) && (!navigationBtn.contains(e.target as Node))) {
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
    })

    const handleCategorySelect = (id: number) => {
        setCurrentPage(1)
        navigate('/')
        setSelectedCategory(id)
        setActiveCategoryId(id)
        setVisible('none')
        setToggle('')
        document.body.classList.remove('modal-open')
        document.getElementById('blackout')?.classList.remove('blackout')
        setImage('/images/icons/nav.png')
    }


    return (
        <>
        <nav className='nav'>
            <button 
                id='nav__button' 
                onClick={nav} 
            >
                <img 
                    src={image} 
                    alt='img'
                    className='nav__img'
                />
            </button>
        </nav>
        
        <div className={isDarkTheme ? `${toggle} dark-theme` : toggle}>
            {categories.map((cat: ICategory) => (
                <div
                    key={cat.id}
                    className={`
                        navbar__item ${visible} 
                        ${activeCategoryId === cat.id ? 
                            'navbar__item_active' : 
                            'navbar__item'
                        }
                    `}
                    id={cat.label}
                    onClick={() => handleCategorySelect(cat.id)}
                >
                    {cat.label}
                </div>
            ))}
        </div>
        </>
    )
}

export default memo(ButtonNav)
