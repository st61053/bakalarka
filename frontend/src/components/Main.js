import {
    Routes,
    Route
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Items from "./Items";

const Main = ({ items }) => {

    return (
        <main>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/items" element={<Items items={items} />} />
            </Routes>
        </main>
    );
}

export default Main;