import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment"

export const getPosts =  (req,res) => {
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("Not logged in")

    jwt.verify(token,"secretkey",(err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid")


    const query = `SELECT p.*,u.id as userID FROM posts AS p JOIN users AS u ON (u.id = p.userID) ORDER BY date DESC`

    db.query(query,(err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
    })
}


export const addPosts =  (req,res) => {
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("Not logged in")

    jwt.verify(token,"secretkey",(err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid")


    const query = "INSERT INTO posts SET ?";

    const values = {
        desc: req.body.desc,
        img: req.body.img,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userId: userInfo.id}

    db.query(query,values,(err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post has been created")
    })
})
}


export const deletePost = (req, res) => {
    const postId = req.params.id;
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
       if (err) return res.status(403).json("Token is not valid");

        const query = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";
        const values = [postId,userInfo.id];

        db.query(query, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows ===  0) {
                return res.status(403).json("Post not found or user not authorized");
            }
            return res.status(200).json("Post has been deleted");
        });
   });
};