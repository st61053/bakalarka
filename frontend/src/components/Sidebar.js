import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const Sidebar = ({ user }) => {
  const hadleClick = () => {
    const sideMenu = document.querySelector("aside");
    sideMenu.style.display = "none";
  };

  const handleChangeActive = (e) => {
    console.log(document.getElementsByClassName("active")[0]);
    document.getElementsByClassName("active")[0].classList.remove("active");

    if (e.target.tagName === "H3" || e.target.tagName === "SPAN") {
      e.target.parentNode.classList.add("active");
    } else {
      e.target.classList.add("active");
    }
  };

  const handleSynchronize = async (e) => {
    const response = await fetch("http://localhost:4000/api/items/update");
    console.log(response);
  };

  const handleLogout = async (e) => {
    window.open("http://localhost:4000/auth/logout", "_self");
  };

  return (
    <aside>
      <div className="top">
        <div className="logo">
          <img src={logo} alt="" />
          <h2>STEAM-ITEMS</h2>
        </div>
        <div className="close" onClick={hadleClick}>
          <span className="material-icons-sharp">close</span>
        </div>
      </div>

      <div className="sidebar">
        <Link to="/dashboard" className="active" onClick={handleChangeActive}>
          <span className="material-icons-sharp">grid_view</span>
          <h3>Dashboard</h3>
        </Link>
        <Link to="/items" onClick={handleChangeActive}>
          <span className="material-icons-sharp">category</span>
          <h3>All items</h3>
        </Link>
        <Link to="/inventory" onClick={handleChangeActive}>
          <span className="material-icons-sharp">inventory_2</span>
          <h3>Inventory</h3>
        </Link>
        <a href="/#">
          <span className="material-icons-sharp">pie_chart</span>
          <h3>Graphs</h3>
        </a>
        <a href="/#">
          <span className="material-icons-sharp">store</span>
          <h3>Market</h3>
        </a>
        <a href="/#">
          <span className="material-icons-sharp">settings</span>
          <h3>Settings</h3>
        </a>
        <a href="/" onClick={handleSynchronize}>
          <span className="material-icons-sharp">sync_alt</span>
          <h3>Synchronize</h3>
        </a>
        {user && (
          <a className="logout" href="/#" onClick={handleLogout}>
            <span className="material-icons-sharp">logout</span>
            <h3>Logout</h3>
          </a>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
