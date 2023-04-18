import express from "express";
const app = express()
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import cors from "cors"
import cookieParser from "cookie-parser"


//MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)


app.listen(8080, ()=> {
    console.log("Working!")
})