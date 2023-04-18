import mysql from "mysql"


//connecting to the database

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"pip"
})