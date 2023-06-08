import "./navbar.scss"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import homelogo from '../../assets/lgoo1.png'


const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="home">
                <Link to="/"> <img class='homelogo' src={homelogo} alt="home"/>
                </Link>
                </div>
                <div className="left">
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