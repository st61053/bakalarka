const ItemDetails = ({ item }) => {

    return (
        <div className="item-block">
            <img src={item.image} alt={item.market_name} />
            <h2 style={{ color: "#" + item.border_color }}>{item.market_name}</h2>
            <h3>${item.prices.latest}</h3>
        </div>
    );
}

export default ItemDetails;