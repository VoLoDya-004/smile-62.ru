import Accordion from "./Accordion"
import Button from "../../Button/Button"
import ButtonLoad from "../../Button/ButtonLoad"
import ButtonCross from "../../Button/ButtonCross"
import { forwardRef, useState } from "react"
import { createPortal } from "react-dom"


const FiltersMenu = forwardRef(({handleToggleFilters}, ref) => {
    const [actions, setActions] = useState({
        action1: false,
        action2: false,
        action3: false,
        action4: false,
        action5: false,
        action6: false,
        action7: false,
        action8: false,
    })

    const handleCheckboxChange = (e) => {
        setActions({...actions, [e.target.name]: e.target.checked})
    }


    return createPortal(
        <section ref={ref} className="filterMenu">
            <div className="filterMenu__title">
                <b>Фильтры</b>
                <ButtonCross
                    className="support__header_titleBtn"
                    onClick={handleToggleFilters}
                />
            </div>
            <Accordion title="Акции">
                <label>
                    <div className="accordion__item">
                        <input 
                            type="checkbox" 
                            name="action1"
                            checked={actions.action1}
                            onChange={handleCheckboxChange}
                        />
                        Без акции
                    </div>
                </label>
                <label>
                    <div className="accordion__item">
                        <input 
                            type="checkbox" 
                            name="action2"
                            checked={actions.action2}
                            onChange={handleCheckboxChange}
                        />
                        Акция 1-10%
                    </div>
                </label>
                <label>
                    <div className="accordion__item">
                        <input 
                            type="checkbox" 
                            name="action3"
                            checked={actions.action3}
                            onChange={handleCheckboxChange}
                        />
                        Акция 10-20%
                    </div>
                </label>
                <label>
                    <div className="accordion__item">
                        <input 
                            type="checkbox" 
                            name="action4"
                            checked={actions.action4}
                            onChange={handleCheckboxChange}
                        />
                        Акция больше 20%
                    </div>
                </label>
            </Accordion>
            <Accordion title="Цена">
                <div className="accordion__price">
                    <div className="accordion__inputBlock">
                        <input 
                            id="accordion__input"
                            className="accordion__input" 
                            type="number" 
                            min="1" 
                            max="1000000" 
                            placeholder="от..." 
                        />
                    </div>
                    <div className="accordion__inputBlock">
                        <input 
                            id="accordion__input"
                            className="accordion__input" 
                            type="number" 
                            min="1" 
                            max="1000000" 
                            placeholder="до..." 
                        />
                    </div>
                </div>
                <label>
                    <div className="accordion__item">
                        <input 
                            type="checkbox" 
                            name="action5"
                            checked={actions.action5}
                            onChange={handleCheckboxChange}
                        />
                        <span style={{marginBottom: "3px"}}>
                            Меньше 15&nbsp;000 &#8381;
                        </span>
                    </div>
                </label>
                <label>
                    <div className="accordion__item">
                        <input 
                            type="checkbox" 
                            name="action6"
                            checked={actions.action6}
                            onChange={handleCheckboxChange}
                        />
                        <span style={{marginBottom: "3px"}}>
                            От 15&nbsp;000 &#8381; до 50&nbsp;000 &#8381;
                        </span>
                    </div>
                </label>
                <label>
                    <div className="accordion__item">
                        <input 
                            type="checkbox" 
                            name="action7"
                            checked={actions.action7}
                            onChange={handleCheckboxChange}
                        />
                        <span style={{marginBottom: "3px"}}>
                            От 50&nbsp;000 &#8381; до 100&nbsp;000 &#8381;
                        </span>
                    </div>
                </label>
                <label>
                    <div className="accordion__item">
                        <input 
                            type="checkbox" 
                            name="action8"
                            checked={actions.action8}
                            onChange={handleCheckboxChange}
                        />
                        <span style={{marginBottom: "3px"}}>
                            Больше 100&nbsp;000 &#8381;
                        </span>
                    </div>
                </label>
            </Accordion>
            <div className="accordion__btn">
                <Button
                    className="form__registration_btn"
                    id="AccordionBtnApply"
                    //onClick={}
                >
                    Применить
                </Button>
                <ButtonLoad
                    className="load-more__btnForward"
                    id="AccordionBtnOff"
                    style={{width: "150px", borderRadius: "5px", fontSize: "13px"}}
                    //onClick={}
                >
                    <b>Сбросить</b>
                </ButtonLoad>
            </div>
        </section>,
        document.getElementById("filterMenu")
    )
})

export default FiltersMenu
