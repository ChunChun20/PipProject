import "./navbar.scss"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";


const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

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
                    <img src={currentUser.profilePic} alt=""/>
                <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar