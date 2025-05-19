

export default function BasketFooter({total}) {
    const priceFormatter = new Intl.NumberFormat()

    return (
        <>                           
        <div className="basketBox__footer">
            <div className="basketBox__footer_title">{total.count} ед.</div>
            <div>{priceFormatter.format(total.price)} руб.</div>
        </div>
        </>
    )
}