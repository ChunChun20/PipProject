import "./Login.scss"
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";

const Login = () => {
    const [inputs,setInputs] = useState({
        username:"",
        password:"",

    })

    const [err,setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (event) => {
        setInputs(prev => ({...prev,[event.target.name]:event.target.value}))
    }


    const {login} = useContext(AuthContext);

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
           await login(inputs);
            navigate("/")
        }catch(err){
            setError(err.response.data);
        }

    }

    return (
        <div className="login">
            <div className="card">
            <div className="left">
            <form action="">
                    <h1>Login</h1>
                    <label  name="usernameLabel">Username</label>
                        <input type="text" name="username" onChange={handleChange}/>
                        <label name="passwordLabel">Password</label>
                        <input type="password" name="password" onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleLogin}>Enter</button>
                        </form>
            </div>
                <div className="right">
                    
                    <div><br></br>
                        <p><h1>Don't have an account?&nbsp;&nbsp;&nbsp;</h1></p>
                <Link to="/register">
                <button>Register</button>
                </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login