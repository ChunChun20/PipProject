import "./navbar.scss"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";


const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                <span>Images</span>
                </Link>
                <div className="search">

                    <input type="text" placeholder="Search..."/>
                </div>
            </div>
            <div className="right">
                <div className="addPost">
                    <Link to="/createPost">
                    <button>Add Image</button>
                    </Link>
                </div>
                <div className="user">
                    <Link to={`/profile/${userId}`}>
                        <img src={currentUser.profilePic} alt=""/>
                    </Link>
                <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar