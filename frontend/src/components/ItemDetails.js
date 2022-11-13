const ItemDetails = ({ item }) => {

    return (
        <div className="item-block">
            <img src={item.iconUrl} alt={item.name} />
            <h2 style={{ color: item.foregroundColour }}>{item.name}</h2>
            <h3>{(item.buyNowPrice / 100).toFixed(2)}€</h3>
        </div>
    );
}

export default ItemDetails;