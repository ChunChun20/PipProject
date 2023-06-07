import {db} from "../connect.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = (req,res) => {
    //Checking if the user already exists in the database

    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query,[req.body.username],(err,data) => {
        if(err) return res.status(500).json(err)
        // if data length == 0 we don't have a user with this name
        if(data.length) return res.status(409).json("User already exist")
            //Hashing the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password,salt)

            const query = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

            const values = [req.body.username,req.body.email,hashedPassword,req.body.name]

            db.query(query,[values],(err,data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("User created.");
            })
    })


}


export const login = (req,res) => {
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query,[req.body.username],(err,data) => {
        if (err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User does not exist!")

        // after executing the query we get an array with single user inside of it ,so we use data[0] to access its values
        const checkPassword = bcrypt.compareSync(req.body.password,data[0].password)
        if(!checkPassword) return res.status(400).json("Wrong password or username!")

        const token = jwt.sign({id:data[0].id},"secretkey");
        //using this to separate the password from the other use information
        const {password,...others} = data[0]

        //creating cookie to keep track of current logged user
        res.cookie("accessToken",token,{
            httpOnly:true,
            expires: new Date(Date.now() + 999999999)
        }).status(200).json(others)
    })


}


export const logout = (req,res) => {
    //deleting the cookie to logout the user
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out!")
}