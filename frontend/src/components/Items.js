import { useState } from "react";
// components
import ItemShowcase from "./ItemShowcase";

const Items = ({ items }) => {

    const maxCountOfItemsOnPage = 12;

    const [data, setData] = useState(null)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(maxCountOfItemsOnPage)

    function handleChange(event) {
        setStart(0);
        setEnd(maxCountOfItemsOnPage);
        setData(items.filter(item => item.market_name.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    function handlePrev() {
        if (start <= 0) {
            setStart(0);
            setEnd(maxCountOfItemsOnPage);
        } else {
            if ((end - start) !== maxCountOfItemsOnPage) {
                setStart(start - maxCountOfItemsOnPage);
                setEnd(end - (end - start));
            } else {
                setStart(start - maxCountOfItemsOnPage);
                setEnd(end - maxCountOfItemsOnPage);
            }

        }
    }

    function handleNext() {
        if (data) {
            if (data.length <= (end + maxCountOfItemsOnPage)) {
                if (end < data.length) {
                    setStart(end);
                }
                setEnd(data.length);
            } else {
                setEnd(end + maxCountOfItemsOnPage);
                setStart(start + maxCountOfItemsOnPage);
            }
        } else {
            if (items) {
                if (items.length <= (end + maxCountOfItemsOnPage)) {
                    if (end < items.length) {
                        setStart(end);
                    }
                    setEnd(items.length);
                } else {
                    setEnd(end + maxCountOfItemsOnPage);
                    setStart(start + maxCountOfItemsOnPage);
                }
            }
        }

    }

    return (
        <div className="items">
            <h1>Items</h1>
            <div className="control-bar">
                <i className="material-icons-sharp icon">search</i>
                <input name="filter-items" className="filter-items" onChange={handleChange} />
                <div className="control-move">
                    <div className="prev" onClick={handlePrev}>
                        <span className="material-icons-sharp">arrow_back_ios_new</span>
                    </div>
                    <div className="control-move-text" id="control-move-text">1 of 7</div>
                    <div className="next" onClick={handleNext}>
                        <span className="material-icons-sharp">arrow_forward_ios</span>
                    </div>
                </div>
            </div>
            <ItemShowcase items={data ? data.slice(start, end) : items && items.slice(start, end)} />
        </div>
    );
}

export default Items;