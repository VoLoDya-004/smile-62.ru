

export default function Search() {
    const theme = localStorage.getItem("theme")

    
    if (theme === "dark-theme") {
    return (
        <div className="search">
		    <div className="search__line">
			    <input id="search__line_line" type="search" placeholder="Искать здесь..." className="dark-theme"/>
			    <button id="search__line_button">
                    <img src="/src/assets/images/icons/poisk.png" alt="поиск" style={{width: "20px", pointerEvents: "none"}} />
                </button>
		    </div>
		</div>
    )}
    else {
        return (
            <div className="search">
                <div className="search__line">
                    <input id="search__line_line" type="search" placeholder="Искать здесь..."/>
                    <button id="search__line_button">
                        <img src="/src/assets/images/icons/poisk.png" alt="поиск" style={{width: "20px", pointerEvents: "none"}} />
                    </button>
                </div>
            </div>
        )
    }
}