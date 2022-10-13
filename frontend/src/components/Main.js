import {
    Routes,
    Route
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Items from "./Items";

const Main = ({ items }) => {

    return (
        <main>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/items" element={<Items />} />
                <Route path="/inventory" element={<Inventory />} />
            </Routes>
        </main>
    );
}

export default Main;