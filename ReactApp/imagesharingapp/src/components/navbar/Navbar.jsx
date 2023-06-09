import "./navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

import homelogo from "../../assets/lgoo1.png";

import SearchBar from "../searchBar/SearchBar";
import "./options.scss";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { currentUser } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.name;

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await logout();
      console.log("Logout successful");
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="navbar">
      <div className="home">
        <Link to="/">
          {" "}
          <img class="homelogo" src={homelogo} alt="home" />
        </Link>
      </div>
      <div className="left">
        <div className="search">
          <SearchBar />
        </div>
      </div>
      <div className="right">
        <div className="addPost">
          <Link to="/createPost">
            <button>make a post</button>
          </Link>
        </div>
        <div className="user">
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={handleDropdownToggle}>
              <img
                src={"http://localhost:3000/" + currentUser.profilePic}
                alt=""
              />
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                <Link id="profile" to={`/profile/${username}`}>
                  my profile
                </Link></li>
                <li>
                  <Link id="changePhoto" to="/updateProfile">
                    change&nbsp;photo
                  </Link>
                </li>
                <li>
                  <Link id="logoutButton" onClick={handleLogout}>
                    log&nbsp;out
                  </Link>
                  {/* <button type="button" ></button> */}
                </li>
              </ul>
            )}
          </div>
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
