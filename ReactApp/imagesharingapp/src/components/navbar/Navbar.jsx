import "./navbar.scss"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";
import SearchBar from "../searchBar/SearchBar";


const Navbar = () => {
    // const location = useLocation()
    // console.log(location.pathname)

    const { currentUser } = useContext(AuthContext);

    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.name;

    const [err,setError] = useState(null)
    const navigate = useNavigate()

    const {logout} = useContext(AuthContext);


    const handleLogout = async (event) => {
        event.preventDefault()
        try{
            await logout();
            console.log('Logout successful');
            navigate("/login")



        }catch(err){
            setError(err.response.data);
        }

    }


    return (
        <div className="navbar">
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
                    <button type="button" onClick={handleLogout}>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar