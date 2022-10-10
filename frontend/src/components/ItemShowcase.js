//import { useState, useEffect } from "react";

// components
import ItemDetails from "./ItemDetails";

const ItemShowcase = ({items}) => {
    
    return (
        <div className="showcase">
            {items ? items.map(item => (
                <ItemDetails item={item} key={item._id} />
            )) : <div className="loading"></div> }

        </div>
    );
}

export default ItemShowcase;