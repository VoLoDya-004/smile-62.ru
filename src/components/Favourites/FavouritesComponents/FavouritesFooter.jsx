


export default function FavouritesFooter({total}) {
    const priceFormatter = new Intl.NumberFormat()

    return (
        <>
        <div className="favouritesBox__footer">
            <div className="favouritesBox__footer_title">{total.count} ед.</div>
            <div>{priceFormatter.format(total.price)} руб.</div>
        </div>
        </>
    )
}