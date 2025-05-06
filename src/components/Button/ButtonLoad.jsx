import "../../JS/pagination"

export default function ButtonLoad({text}) {
    return (
        <div className="load-more">
            <button id="load-more__btn">{text}</button>
        </div>
    )
}