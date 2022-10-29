import { useState, useEffect } from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Items from "./Items";

const Main = () => {
    const [items, setItems] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
          const response = await fetch("/api/items/get");
          const json = await response.json();
          console.log(json);
    
          if (response.ok) {
            setItems(json.items);
          }
        };
    
        fetchItems();
      }, []);

    return (
        <main>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/items" element={<Items items={items}/>} />
                <Route path="/inventory" element={<Inventory />} />
            </Routes>
        </main>
    );
}

export default Main;