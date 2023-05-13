import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment"

export const getUser = (req, res) => {
    const token = req.cookies.accessToken;

    // if (!token) {
    //     return res.status(401).json("Not logged in");
    // }

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //     if (err) {
    //         return res.status(403).json("Token is not valid");
    //     }

        const userId = req.params.id;

        const query = 'SELECT id, username, email, name, profilePic FROM users WHERE id = ?';
        db.query(query, [userId], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json('User not found');
            }

            const user = result[0];

            return res.status(200).json(user);
        });
    // });
};
