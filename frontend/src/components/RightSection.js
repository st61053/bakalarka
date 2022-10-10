import steamLoginImg from '../assets/img/steam_login_img.png'

const RightSection = ({ user }) => {

    const hadleClick = () => {
        const sideMenu = document.querySelector("aside");
        sideMenu.style.display = 'block';
    }

    const handleLogin = async (e) => {
        window.open("http://localhost:4000/auth/steam", "_self");
    }


    return (
        <div className="right-section">
            <div className="top">
                <button id="menu-btn" onClick={hadleClick}>
                    <span className="material-icons-sharp">menu</span>
                </button>
                {user ?
                    <div className="profile-widget">
                        <div className="username">{user.username}</div>
                        <div className="profile-photo" >
                            <img src={user.avatar} alt="" />
                        </div>
                    </div>
                    : <div className="steam-login" onClick={handleLogin}>
                        <img src={steamLoginImg} alt="" />
                    </div>
                }

            </div>
        </div>
    );
}

export default RightSection;