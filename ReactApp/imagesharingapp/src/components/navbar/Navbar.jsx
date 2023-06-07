import "./navbar.scss"
import {Link, useLocation} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import SearchBar from "../searchBar/SearchBar";


const Navbar = () => {
    // const location = useLocation()
    // console.log(location.pathname)

    const { currentUser } = useContext(AuthContext);

    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.name;
    return (
        <div className="navbar">BlackNuts
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                <span>Images</span>
                </Link>
                <div className="search">

                    <SearchBar />
                </div>
            </div>
            <div className="right">
                <div className="addPost">
                    <Link to="/createPost">
                    <button>Add Image</button>
                    </Link>
                </div>
                <div className="user">
                    <Link to={`/profile/${username}`}>
                        <img src={"http://localhost:3000/" + currentUser.profilePic} alt=""/>
                    </Link>
                <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar