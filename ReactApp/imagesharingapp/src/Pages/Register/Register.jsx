import "./Register.scss"
import {Link} from "react-router-dom";
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

    const handleChange = (event) => {
        setInputs(prev => ({...prev,[event.target.name]:event.target.value}))
    }

    const handleClick = async (event) => {
        event.preventDefault()

    try {
            await axios.post("http://localhost:8080/api/auth/register",inputs)
    }catch(err){
setError(err.response.data)
    }

    }

    return (
        <div className="register">
            <div className="card">
            <div className="left">
                <form action="">
                    <label  name="nameLabel">Name</label>
                    <input type="text" name="name" onChange={handleChange}/>
                    <label  name="emailLabel">Email</label>
                    <input type="text" name="email" onChange={handleChange}/>
                    <label  name="usernameLabel">Username</label>
                    <input type="text" name="username" onChange={handleChange}/>
                    <label  name="passwordLabel">Password</label>
                    <input type="password" name="password" onChange={handleChange}/>
                   

                    {/*show error type if there is an error*/}
                    { err && err}
                    <button onClick={handleClick}>Register</button>
                </form>



            </div>
            <div className="right">
               
            <h1>Already have an account ?</h1>
                <Link to="/login">
                <button>Login</button>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default Register