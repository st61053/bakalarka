import { useState, useEffect } from "react";
import Items from "./Items";

const Inventory = () => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items/inventory");
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setItems(json.items);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="inventory">
      <Items items={items} />
    </div>
  );
};

export default Inventory;
