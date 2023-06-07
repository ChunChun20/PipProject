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
           console.log('Login successful');
           navigate("/")



        }catch(err){
            setError(err.response.data);
        }

    }

    return (
        <div className="login">
            <div className="card">
            <div className="left">
<h1>Hello</h1>
                <p>Hellow kiddo</p>
                <span>Don't have an account?</span>
                <Link to="/register">
                <button>Register</button>
                </Link>
            </div>
                <div className="right">
                    <h1>Login</h1>
                    <form action="">
                        <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        {err && err}

                            <button type="button" onClick={handleLogin}>Login</button>

                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login