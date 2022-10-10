import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// components
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import RightSection from "./components/RightSection";

function App() {

  const [user, setUser] = useState(null)
  const [items, setItems] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/items')
      const json = await response.json()
      console.log(json)

      if (response.ok) {
        setItems(json.items)
        if ("username" in json) {
          setUser({ username: json.username, avatar: json.avatar })
        }
      }
    }

    fetchData()
  }, [])

  return (
    <Router>
      <div className="container">
        <Sidebar user={user} />
        <Main items={items} />
        <RightSection user={user} />
      </div>
    </Router>
  );
}

export default App;
