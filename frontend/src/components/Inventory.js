import { useState, useEffect } from "react";
// components
import ItemShowcase from "./ItemShowcase";

const Inventory = () => {
  const [items, setItems] = useState(null);
  const [data, setData] = useState(null);

  const maxCountOfItemsOnPage = 12;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(maxCountOfItemsOnPage);

  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items/inventory");
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setItems(json.items);
        setData(json.items);
      }
    };

    fetchItems();
  }, []);

  function handleChange(event) {
    setStart(0);
    setEnd(maxCountOfItemsOnPage);
    setCurrPage(1);
    setItems(
      data.filter((item) =>
        item.market_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  }

  function handlePrev() {
    if (start <= 0) {
      setStart(0);
      setEnd(maxCountOfItemsOnPage);
    } else {
      if (end - start !== maxCountOfItemsOnPage) {
        setStart(start - maxCountOfItemsOnPage);
        setEnd(end - (end - start));
      } else {
        setStart(start - maxCountOfItemsOnPage);
        setEnd(end - maxCountOfItemsOnPage);
      }
    }
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  }

  function handleNext() {
    if (items) {
      if (items.length <= end + maxCountOfItemsOnPage) {
        if (end < items.length) {
          setStart(end);
        }
        setEnd(items.length);
      } else {
        setEnd(end + maxCountOfItemsOnPage);
        setStart(start + maxCountOfItemsOnPage);
      }
    }
    if (currPage < Math.ceil(items.length / maxCountOfItemsOnPage)) {
      setCurrPage(currPage + 1);
    }
  }

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <div className="control-bar">
        <i className="material-icons-sharp icon">search</i>
        <input
          name="filter-items"
          className="filter-items"
          onChange={handleChange}
        />
        <div className="control-move">
          <div className="prev" onClick={handlePrev}>
            <span className="material-icons-sharp">arrow_back_ios_new</span>
          </div>
          <div className="control-move-text" id="control-move-text">
            {currPage} of{" "}
            {items && Math.ceil(items.length / maxCountOfItemsOnPage)}
          </div>
          <div className="next" onClick={handleNext}>
            <span className="material-icons-sharp">arrow_forward_ios</span>
          </div>
        </div>
      </div>
      <ItemShowcase items={items && items.slice(start, end)} />
    </div>
  );
};

export default Inventory;
