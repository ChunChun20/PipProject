import "./Register.scss"
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Register = () => {
    const [inputs,setInputs] = useState({
        username:"",
        email:"",
        password:"",
        name:""
    })


    const [err,setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (event) => {
        setInputs(prev => ({...prev,[event.target.name]:event.target.value}))
    }

    const handleClick = async (event) => {
        event.preventDefault()

    try {
            await axios.post("http://localhost:8080/api/auth/register",inputs)
            navigate("/login")
    }catch(err){
setError(err.response.data)
    }

    }

    return (
        <div className="register"><div className="card">
            <div className="left">
                <h1>Hello</h1>
                <p>Amogus</p>
                <span>Already have an account?</span>
                <Link to="/login">
                <button>Login</button>
                </Link>
            </div>
            <div className="right">
                <h1>Register</h1>
                <form action="">
                    <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                    <input type="text" placeholder="email" name="email" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    <input type="text" placeholder="Name" name="name" onChange={handleChange}/>

                    {/*show error type if there is an error*/}
                    { err && err}
                    <button onClick={handleClick}>Register</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Register